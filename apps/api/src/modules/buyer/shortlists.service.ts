import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { SavedIndex, Shortlist, ShortlistItemInput } from '@garmentgate/shared';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import {
  listedManufacturer,
  publicManufacturerInclude,
  publicProductInclude,
} from '../catalog/catalog.queries.js';
import { toPublicManufacturer, toPublicProduct } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
import type { BuyerContext } from './buyer-context.service.js';

const DEFAULT_NAME = 'Favorites';
const MAX_LISTS = 30;

@Injectable()
export class ShortlistsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly media: MediaService,
  ) {}

  /** Every buyer company has a default "Favorites" list (heart buttons save there). */
  private async ensureDefault(ctx: BuyerContext): Promise<void> {
    const existing = await this.prisma.shortlist.findFirst({
      where: { companyId: ctx.companyId, isDefault: true },
    });
    if (existing) return;
    try {
      await this.prisma.shortlist.create({
        data: {
          companyId: ctx.companyId,
          name: DEFAULT_NAME,
          isDefault: true,
          createdById: ctx.userId,
        },
      });
    } catch (error) {
      // Created concurrently by another request: fine.
      if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'))
        throw error;
    }
  }

  async list(ctx: BuyerContext): Promise<Shortlist[]> {
    await this.ensureDefault(ctx);
    const lists = await this.prisma.shortlist.findMany({
      where: { companyId: ctx.companyId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
      include: {
        items: {
          orderBy: { createdAt: 'desc' },
          include: {
            // Only what buyers may see: published products from listed, verified factories.
            product: { include: publicProductInclude },
            manufacturerProfile: { include: publicManufacturerInclude },
          },
        },
      },
    });
    const files = lists.flatMap((l) =>
      l.items.flatMap((i) => [
        ...(i.product?.images.map((img) => img.file) ?? []),
        ...(i.manufacturerProfile?.photos.map((p) => p.file) ?? []),
      ]),
    );
    const urls = await this.media.urlMap(files);
    const visibleProduct = (p: { status: string; deletedAt: Date | null }) =>
      p.status === 'PUBLISHED' && p.deletedAt === null;
    return lists.map((l) => ({
      id: l.id,
      name: l.name,
      isDefault: l.isDefault,
      updatedAt: l.updatedAt.toISOString(),
      products: l.items.flatMap((i) =>
        i.product && visibleProduct(i.product)
          ? [{ itemId: i.id, product: toPublicProduct(i.product, urls) }]
          : [],
      ),
      manufacturers: l.items.flatMap((i) =>
        i.manufacturerProfile?.isListed
          ? [{ itemId: i.id, manufacturer: toPublicManufacturer(i.manufacturerProfile, urls) }]
          : [],
      ),
    }));
  }

  async savedIndex(ctx: BuyerContext): Promise<SavedIndex> {
    await this.ensureDefault(ctx);
    const lists = await this.prisma.shortlist.findMany({
      where: { companyId: ctx.companyId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
      select: {
        id: true,
        name: true,
        isDefault: true,
        items: {
          select: { productId: true, manufacturerProfile: { select: { publicCode: true } } },
        },
      },
    });
    const products: Record<string, string[]> = {};
    const manufacturers: Record<string, string[]> = {};
    for (const list of lists) {
      for (const item of list.items) {
        if (item.productId) (products[item.productId] ??= []).push(list.id);
        const code = item.manufacturerProfile?.publicCode;
        if (code) (manufacturers[code] ??= []).push(list.id);
      }
    }
    return {
      lists: lists.map((l) => ({ id: l.id, name: l.name, isDefault: l.isDefault })),
      products,
      manufacturers,
    };
  }

  async create(ctx: BuyerContext, name: string): Promise<{ id: string }> {
    const count = await this.prisma.shortlist.count({ where: { companyId: ctx.companyId } });
    if (count >= MAX_LISTS)
      throw new BadRequestException(`You can have up to ${String(MAX_LISTS)} lists`);
    try {
      const list = await this.prisma.shortlist.create({
        data: { companyId: ctx.companyId, name, createdById: ctx.userId },
      });
      return { id: list.id };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('You already have a list with that name');
      }
      throw error;
    }
  }

  async rename(ctx: BuyerContext, id: string, name: string): Promise<void> {
    await this.own(ctx, id);
    try {
      await this.prisma.shortlist.update({ where: { id }, data: { name } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('You already have a list with that name');
      }
      throw error;
    }
  }

  async remove(ctx: BuyerContext, id: string): Promise<void> {
    const list = await this.own(ctx, id);
    if (list.isDefault) throw new BadRequestException('Your Favorites list can’t be deleted');
    await this.prisma.shortlist.delete({ where: { id } });
  }

  async addItem(ctx: BuyerContext, listId: string, input: ShortlistItemInput): Promise<void> {
    await this.own(ctx, listId);
    let data: { productId: string } | { manufacturerProfileId: string };
    if ('productId' in input) {
      const product = await this.prisma.product.findFirst({
        where: {
          id: input.productId,
          status: 'PUBLISHED',
          deletedAt: null,
          manufacturerProfile: listedManufacturer,
        },
        select: { id: true },
      });
      if (!product) throw new NotFoundException('Product not found');
      data = { productId: product.id };
    } else {
      const profile = await this.prisma.manufacturerProfile.findFirst({
        where: { publicCode: input.manufacturerCode, ...listedManufacturer },
        select: { id: true },
      });
      if (!profile) throw new NotFoundException('Manufacturer not found');
      data = { manufacturerProfileId: profile.id };
    }
    try {
      await this.prisma.shortlistItem.create({ data: { shortlistId: listId, ...data } });
      await this.prisma.shortlist.update({
        where: { id: listId },
        data: { updatedAt: new Date() },
      });
    } catch (error) {
      // Already saved: adding twice is a no-op.
      if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'))
        throw error;
    }
  }

  /** Removes by target (product or factory code), matching how the heart buttons work. */
  async removeItem(ctx: BuyerContext, listId: string, input: ShortlistItemInput): Promise<void> {
    await this.own(ctx, listId);
    await this.prisma.shortlistItem.deleteMany({
      where:
        'productId' in input
          ? { shortlistId: listId, productId: input.productId }
          : { shortlistId: listId, manufacturerProfile: { publicCode: input.manufacturerCode } },
    });
  }

  private async own(ctx: BuyerContext, id: string) {
    const list = await this.prisma.shortlist.findFirst({ where: { id, companyId: ctx.companyId } });
    if (!list) throw new NotFoundException('List not found');
    return list;
  }
}
