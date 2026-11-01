import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
  type FactoryPhotoDto,
  filterContactDetails,
  IMAGE_MAX_BYTES,
  type ManufacturerProduct,
  type ProductDto,
  type ReorderDto,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { fileWithRenditions, MediaService } from '../media/media.service.js';
import { applyMarkup, pickCatalogRule } from '../pricing/margin.js';
import { SearchService } from '../search/search.service.js';
import { FilesService } from '../storage/files.service.js';
import { type ManufacturerContext } from './manufacturer-context.service.js';
import { toOwnedImage } from './owned-image.js';

const MAX_IMAGES = 8;

const productInclude = {
  category: { select: { name: true } },
  // Manufacturer-facing: select their own price only. buyerUnitPriceMinor is never loaded here.
  priceTiers: {
    select: { minQty: true, manufacturerUnitPriceMinor: true },
    orderBy: { minQty: 'asc' },
  },
  images: { include: { file: fileWithRenditions }, orderBy: { sortOrder: 'asc' } },
} satisfies Prisma.ProductInclude;
type ProductRow = Prisma.ProductGetPayload<{ include: typeof productInclude }>;

@Injectable()
export class ManufacturerProductsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly media: MediaService,
    private readonly files: FilesService,
    private readonly search: SearchService,
  ) {}

  async list(ctx: ManufacturerContext): Promise<ManufacturerProduct[]> {
    const rows = await this.prisma.product.findMany({
      where: { manufacturerProfileId: ctx.profileId, deletedAt: null },
      include: productInclude,
      orderBy: { updatedAt: 'desc' },
    });
    const urls = await this.media.urlMap(rows.flatMap((r) => r.images.map((i) => i.file)));
    return rows.map((r) => this.toView(r, urls));
  }

  async get(ctx: ManufacturerContext, id: string): Promise<ManufacturerProduct> {
    const row = await this.find(ctx, id);
    const urls = await this.media.urlMap(row.images.map((i) => i.file));
    return this.toView(row, urls);
  }

  async create(ctx: ManufacturerContext, dto: ProductDto): Promise<ManufacturerProduct> {
    const tiers = await this.priceTiers(dto);
    const product = await this.prisma.product.create({
      data: {
        manufacturerProfileId: ctx.profileId,
        ...this.productData(dto),
        priceTiers: { create: tiers },
      },
    });
    await this.search.syncProduct(product.id);
    return this.get(ctx, product.id);
  }

  async update(
    ctx: ManufacturerContext,
    id: string,
    dto: ProductDto,
  ): Promise<ManufacturerProduct> {
    await this.find(ctx, id);
    const tiers = await this.priceTiers(dto);
    await this.prisma.$transaction([
      this.prisma.productPriceTier.deleteMany({ where: { productId: id } }),
      this.prisma.product.update({
        where: { id },
        data: { ...this.productData(dto), priceTiers: { create: tiers } },
      }),
    ]);
    await this.search.syncProduct(id);
    return this.get(ctx, id);
  }

  /** Soft delete: past RFQs and orders may still refer to it. */
  async remove(ctx: ManufacturerContext, id: string): Promise<void> {
    await this.find(ctx, id);
    await this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date(), status: 'ARCHIVED' },
    });
    await this.search.syncProduct(id);
  }

  async addImage(
    ctx: ManufacturerContext,
    id: string,
    dto: FactoryPhotoDto,
  ): Promise<ManufacturerProduct> {
    const product = await this.find(ctx, id);
    if (product.images.length >= MAX_IMAGES) {
      throw new BadRequestException(`A product can have up to ${MAX_IMAGES} images`);
    }
    const file = await this.files.confirmUpload(
      dto.fileId,
      ctx.companyId,
      'PRODUCT_IMAGE',
      IMAGE_MAX_BYTES,
    );
    await this.prisma.productImage.create({
      data: {
        productId: id,
        fileId: file.id,
        sortOrder: product.images.length,
        alt: dto.caption ? filterContactDetails(dto.caption).filtered : null,
      },
    });
    await this.media.enqueue(file.id);
    return this.get(ctx, id);
  }

  async removeImage(ctx: ManufacturerContext, id: string, imageId: string): Promise<void> {
    const product = await this.find(ctx, id);
    const image = product.images.find((i) => i.id === imageId);
    if (!image) throw new NotFoundException('Image not found');
    await this.files.remove(image.fileId);
  }

  async reorderImages(ctx: ManufacturerContext, id: string, dto: ReorderDto): Promise<void> {
    const product = await this.find(ctx, id);
    const owned = new Set(product.images.map((i) => i.id));
    if (dto.ids.length !== owned.size || dto.ids.some((imageId) => !owned.has(imageId))) {
      throw new BadRequestException('Send every image id exactly once');
    }
    await this.prisma.$transaction(
      dto.ids.map((imageId, sortOrder) =>
        this.prisma.productImage.update({ where: { id: imageId }, data: { sortOrder } }),
      ),
    );
  }

  // ── internals ─────────────────────────────────────────────────────────────

  private async find(ctx: ManufacturerContext, id: string): Promise<ProductRow> {
    const row = await this.prisma.product.findFirst({
      where: { id, manufacturerProfileId: ctx.profileId, deletedAt: null },
      include: productInclude,
    });
    if (!row) throw new NotFoundException('Product not found');
    return row;
  }

  private productData(dto: ProductDto) {
    const description = dto.description ? filterContactDetails(dto.description) : null;
    return {
      categoryId: dto.categoryId,
      title: filterContactDetails(dto.title).filtered,
      description: dto.description ?? null,
      descriptionFiltered: description?.filtered ?? null,
      fabric: dto.fabric ? filterContactDetails(dto.fabric).filtered : null,
      composition: dto.composition ? filterContactDetails(dto.composition).filtered : null,
      gsm: dto.gsm ?? null,
      moqPcs: dto.moqPcs,
      leadTimeDays: dto.leadTimeDays,
      currency: dto.currency,
      status: dto.status,
    };
  }

  /** Buyer prices are derived here from the margin rules; the manufacturer never sets or sees them. */
  private async priceTiers(dto: ProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
      select: { id: true, parentId: true },
    });
    if (!category) throw new BadRequestException('Unknown category');
    const rules = await this.prisma.marginRule.findMany({
      where: { active: true, companyId: null },
    });
    const rule = pickCatalogRule(rules, category);
    return dto.priceTiers.map((t) => ({
      minQty: t.minQty,
      manufacturerUnitPriceMinor: t.unitPriceMinor,
      buyerUnitPriceMinor: applyMarkup(t.unitPriceMinor, rule),
    }));
  }

  private toView(
    row: ProductRow,
    urls: Awaited<ReturnType<MediaService['urlMap']>>,
  ): ManufacturerProduct {
    return {
      id: row.id,
      title: row.title,
      categoryId: row.categoryId,
      categoryName: row.category.name,
      description: row.description,
      fabric: row.fabric,
      composition: row.composition,
      gsm: row.gsm,
      moqPcs: row.moqPcs,
      leadTimeDays: row.leadTimeDays,
      currency: row.currency,
      status: row.status,
      priceTiers: row.priceTiers.map((t) => ({
        minQty: t.minQty,
        unitPriceMinor: t.manufacturerUnitPriceMinor,
      })),
      images: row.images.map((i) => toOwnedImage({ ...i, caption: i.alt }, urls)),
      updatedAt: row.updatedAt.toISOString(),
    };
  }
}
