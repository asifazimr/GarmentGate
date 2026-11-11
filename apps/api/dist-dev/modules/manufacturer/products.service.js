var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { filterContactDetails, IMAGE_MAX_BYTES, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { fileWithRenditions, MediaService } from '../media/media.service.js';
import { applyMarkup, pickCatalogRule } from '../pricing/margin.js';
import { PlansService } from '../plans/plans.service.js';
import { SearchService } from '../search/search.service.js';
import { FilesService } from '../storage/files.service.js';
import { toOwnedImage } from './owned-image.js';
const MAX_IMAGES = 8;
const productInclude = {
    category: { select: { name: true } },
    priceTiers: {
        select: { minQty: true, manufacturerUnitPriceMinor: true },
        orderBy: { minQty: 'asc' },
    },
    images: { include: { file: fileWithRenditions }, orderBy: { sortOrder: 'asc' } },
};
let ManufacturerProductsService = class ManufacturerProductsService {
    prisma;
    media;
    files;
    search;
    plans;
    constructor(prisma, media, files, search, plans) {
        this.prisma = prisma;
        this.media = media;
        this.files = files;
        this.search = search;
        this.plans = plans;
    }
    async list(ctx) {
        const rows = await this.prisma.product.findMany({
            where: { manufacturerProfileId: ctx.profileId, deletedAt: null },
            include: productInclude,
            orderBy: { updatedAt: 'desc' },
        });
        const urls = await this.media.urlMap(rows.flatMap((r) => r.images.map((i) => i.file)));
        return rows.map((r) => this.toView(r, urls));
    }
    async get(ctx, id) {
        const row = await this.find(ctx, id);
        const urls = await this.media.urlMap(row.images.map((i) => i.file));
        return this.toView(row, urls);
    }
    async create(ctx, dto) {
        if (dto.status !== 'DRAFT')
            await this.plans.assertCanList(ctx.profileId);
        const tiers = await this.priceTiers(ctx, dto);
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
    async update(ctx, id, dto) {
        const current = await this.find(ctx, id);
        const listed = (s) => s === 'PUBLISHED' || s === 'PENDING_REVIEW';
        if (listed(dto.status) && !listed(current.status))
            await this.plans.assertCanList(ctx.profileId, id);
        const tiers = await this.priceTiers(ctx, dto);
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
    async remove(ctx, id) {
        await this.find(ctx, id);
        await this.prisma.product.update({
            where: { id },
            data: { deletedAt: new Date(), status: 'ARCHIVED' },
        });
        await this.search.syncProduct(id);
    }
    async addImage(ctx, id, dto) {
        const product = await this.find(ctx, id);
        if (product.images.length >= MAX_IMAGES) {
            throw new BadRequestException(`A product can have up to ${MAX_IMAGES} images`);
        }
        const file = await this.files.confirmUpload(dto.fileId, ctx.companyId, 'PRODUCT_IMAGE', IMAGE_MAX_BYTES);
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
    async removeImage(ctx, id, imageId) {
        const product = await this.find(ctx, id);
        const image = product.images.find((i) => i.id === imageId);
        if (!image)
            throw new NotFoundException('Image not found');
        await this.files.remove(image.fileId);
    }
    async reorderImages(ctx, id, dto) {
        const product = await this.find(ctx, id);
        const owned = new Set(product.images.map((i) => i.id));
        if (dto.ids.length !== owned.size || dto.ids.some((imageId) => !owned.has(imageId))) {
            throw new BadRequestException('Send every image id exactly once');
        }
        await this.prisma.$transaction(dto.ids.map((imageId, sortOrder) => this.prisma.productImage.update({ where: { id: imageId }, data: { sortOrder } })));
    }
    async find(ctx, id) {
        const row = await this.prisma.product.findFirst({
            where: { id, manufacturerProfileId: ctx.profileId, deletedAt: null },
            include: productInclude,
        });
        if (!row)
            throw new NotFoundException('Product not found');
        return row;
    }
    productData(dto) {
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
    async priceTiers(ctx, dto) {
        const category = await this.prisma.category.findUnique({
            where: { id: dto.categoryId },
            select: { id: true, parentId: true },
        });
        if (!category)
            throw new BadRequestException('Unknown category');
        const rules = await this.prisma.marginRule.findMany({
            where: { active: true, companyId: null },
        });
        const rule = pickCatalogRule(rules, category);
        const { terms } = await this.plans.termsFor(ctx.profileId);
        return dto.priceTiers.map((t) => ({
            minQty: t.minQty,
            manufacturerUnitPriceMinor: t.unitPriceMinor,
            buyerUnitPriceMinor: applyMarkup(t.unitPriceMinor, rule, terms.markupDiscountBps),
        }));
    }
    toView(row, urls) {
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
};
ManufacturerProductsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        MediaService,
        FilesService,
        SearchService,
        PlansService])
], ManufacturerProductsService);
export { ManufacturerProductsService };
//# sourceMappingURL=products.service.js.map