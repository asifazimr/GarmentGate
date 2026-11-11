var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MediaService } from '../media/media.service.js';
import { listedManufacturer, publicManufacturerInclude, publicProductInclude, } from './catalog.queries.js';
import { toPublicManufacturer, toPublicProduct } from './public.serializer.js';
const PAGE_SIZE = 50;
let CatalogService = class CatalogService {
    prisma;
    media;
    constructor(prisma, media) {
        this.prisma = prisma;
        this.media = media;
    }
    async manufacturers(filter) {
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
    async manufacturer(publicCode) {
        const row = await this.prisma.manufacturerProfile.findFirst({
            where: { ...listedManufacturer, publicCode },
            include: publicManufacturerInclude,
        });
        if (!row)
            throw new NotFoundException('Manufacturer not found');
        const urls = await this.media.urlMap(row.photos.map((p) => p.file));
        return toPublicManufacturer(row, urls);
    }
    async products(filter) {
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
    async product(id) {
        const row = await this.prisma.product.findFirst({
            where: { id, status: 'PUBLISHED', deletedAt: null, manufacturerProfile: listedManufacturer },
            include: publicProductInclude,
        });
        if (!row)
            throw new NotFoundException('Product not found');
        const urls = await this.media.urlMap(row.images.map((i) => i.file));
        return toPublicProduct(row, urls);
    }
};
CatalogService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        MediaService])
], CatalogService);
export { CatalogService };
//# sourceMappingURL=catalog.service.js.map