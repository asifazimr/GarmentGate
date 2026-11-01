import { Injectable, NotFoundException } from '@nestjs/common';
import type { PublicManufacturer, PublicProduct } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MediaService } from '../media/media.service.js';
import {
  listedManufacturer,
  publicManufacturerInclude,
  publicProductInclude,
} from './catalog.queries.js';
import { toPublicManufacturer, toPublicProduct } from './public.serializer.js';

const PAGE_SIZE = 50;

/** Buyer-facing reads. Every result goes through the public serializers; nothing else is returned. */
@Injectable()
export class CatalogService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly media: MediaService,
  ) {}

  async manufacturers(filter: {
    category?: string | undefined;
    country?: string | undefined;
  }): Promise<PublicManufacturer[]> {
    const rows = await this.prisma.manufacturerProfile.findMany({
      where: {
        ...listedManufacturer,
        ...(filter.category && { categories: { some: { slug: filter.category } } }),
        ...(filter.country && {
          company: { ...listedManufacturer.company, country: filter.country },
        }),
      },
      include: publicManufacturerInclude,
      orderBy: { performanceScore: 'desc' },
      take: PAGE_SIZE,
    });
    const urls = await this.media.urlMap(rows.flatMap((r) => r.photos.map((p) => p.file)));
    return rows.map((r) => toPublicManufacturer(r, urls));
  }

  async manufacturer(publicCode: string): Promise<PublicManufacturer> {
    const row = await this.prisma.manufacturerProfile.findFirst({
      where: { ...listedManufacturer, publicCode },
      include: publicManufacturerInclude,
    });
    if (!row) throw new NotFoundException('Manufacturer not found');
    const urls = await this.media.urlMap(row.photos.map((p) => p.file));
    return toPublicManufacturer(row, urls);
  }

  async products(filter: {
    category?: string | undefined;
    manufacturer?: string | undefined;
  }): Promise<PublicProduct[]> {
    const rows = await this.prisma.product.findMany({
      where: {
        status: 'PUBLISHED',
        deletedAt: null,
        manufacturerProfile: {
          ...listedManufacturer,
          ...(filter.manufacturer && { publicCode: filter.manufacturer }),
        },
        ...(filter.category && {
          category: { OR: [{ slug: filter.category }, { parent: { slug: filter.category } }] },
        }),
      },
      include: publicProductInclude,
      orderBy: { updatedAt: 'desc' },
      take: PAGE_SIZE,
    });
    const urls = await this.media.urlMap(rows.flatMap((r) => r.images.map((i) => i.file)));
    return rows.map((r) => toPublicProduct(r, urls));
  }

  async product(id: string): Promise<PublicProduct> {
    const row = await this.prisma.product.findFirst({
      where: { id, status: 'PUBLISHED', deletedAt: null, manufacturerProfile: listedManufacturer },
      include: publicProductInclude,
    });
    if (!row) throw new NotFoundException('Product not found');
    const urls = await this.media.urlMap(row.images.map((i) => i.file));
    return toPublicProduct(row, urls);
  }
}
