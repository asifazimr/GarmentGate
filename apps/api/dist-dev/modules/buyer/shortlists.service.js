var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { listedManufacturer, publicManufacturerInclude, publicProductInclude, } from '../catalog/catalog.queries.js';
import { toPublicManufacturer, toPublicProduct } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
const DEFAULT_NAME = 'Favorites';
const MAX_LISTS = 30;
let ShortlistsService = class ShortlistsService {
    prisma;
    media;
    constructor(prisma, media) {
        this.prisma = prisma;
        this.media = media;
    }
    async ensureDefault(ctx) {
        const existing = await this.prisma.shortlist.findFirst({
            where: { companyId: ctx.companyId, isDefault: true },
        });
        if (existing)
            return;
        try {
            await this.prisma.shortlist.create({
                data: {
                    companyId: ctx.companyId,
                    name: DEFAULT_NAME,
                    isDefault: true,
                    createdById: ctx.userId,
                },
            });
        }
        catch (error) {
            if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'))
                throw error;
        }
    }
    async list(ctx) {
        await this.ensureDefault(ctx);
        const lists = await this.prisma.shortlist.findMany({
            where: { companyId: ctx.companyId },
            orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }],
            include: {
                items: {
                    orderBy: { createdAt: 'desc' },
                    include: {
                        product: { include: publicProductInclude },
                        manufacturerProfile: { include: publicManufacturerInclude },
                    },
                },
            },
        });
        const files = lists.flatMap((l) => l.items.flatMap((i) => [
            ...(i.product?.images.map((img) => img.file) ?? []),
            ...(i.manufacturerProfile?.photos.map((p) => p.file) ?? []),
        ]));
        const urls = await this.media.urlMap(files);
        const visibleProduct = (p) => p.status === 'PUBLISHED' && p.deletedAt === null;
        return lists.map((l) => ({
            id: l.id,
            name: l.name,
            isDefault: l.isDefault,
            updatedAt: l.updatedAt.toISOString(),
            products: l.items.flatMap((i) => i.product && visibleProduct(i.product)
                ? [{ itemId: i.id, product: toPublicProduct(i.product, urls) }]
                : []),
            manufacturers: l.items.flatMap((i) => i.manufacturerProfile?.isListed
                ? [{ itemId: i.id, manufacturer: toPublicManufacturer(i.manufacturerProfile, urls) }]
                : []),
        }));
    }
    async savedIndex(ctx) {
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
        const products = {};
        const manufacturers = {};
        for (const list of lists) {
            for (const item of list.items) {
                if (item.productId)
                    (products[item.productId] ??= []).push(list.id);
                const code = item.manufacturerProfile?.publicCode;
                if (code)
                    (manufacturers[code] ??= []).push(list.id);
            }
        }
        return {
            lists: lists.map((l) => ({ id: l.id, name: l.name, isDefault: l.isDefault })),
            products,
            manufacturers,
        };
    }
    async create(ctx, name) {
        const count = await this.prisma.shortlist.count({ where: { companyId: ctx.companyId } });
        if (count >= MAX_LISTS)
            throw new BadRequestException(`You can have up to ${String(MAX_LISTS)} lists`);
        try {
            const list = await this.prisma.shortlist.create({
                data: { companyId: ctx.companyId, name, createdById: ctx.userId },
            });
            return { id: list.id };
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('You already have a list with that name');
            }
            throw error;
        }
    }
    async rename(ctx, id, name) {
        await this.own(ctx, id);
        try {
            await this.prisma.shortlist.update({ where: { id }, data: { name } });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('You already have a list with that name');
            }
            throw error;
        }
    }
    async remove(ctx, id) {
        const list = await this.own(ctx, id);
        if (list.isDefault)
            throw new BadRequestException('Your Favorites list can’t be deleted');
        await this.prisma.shortlist.delete({ where: { id } });
    }
    async addItem(ctx, listId, input) {
        await this.own(ctx, listId);
        let data;
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
            if (!product)
                throw new NotFoundException('Product not found');
            data = { productId: product.id };
        }
        else {
            const profile = await this.prisma.manufacturerProfile.findFirst({
                where: { publicCode: input.manufacturerCode, ...listedManufacturer },
                select: { id: true },
            });
            if (!profile)
                throw new NotFoundException('Manufacturer not found');
            data = { manufacturerProfileId: profile.id };
        }
        try {
            await this.prisma.shortlistItem.create({ data: { shortlistId: listId, ...data } });
            await this.prisma.shortlist.update({
                where: { id: listId },
                data: { updatedAt: new Date() },
            });
        }
        catch (error) {
            if (!(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'))
                throw error;
        }
    }
    async removeItem(ctx, listId, input) {
        await this.own(ctx, listId);
        await this.prisma.shortlistItem.deleteMany({
            where: 'productId' in input
                ? { shortlistId: listId, productId: input.productId }
                : { shortlistId: listId, manufacturerProfile: { publicCode: input.manufacturerCode } },
        });
    }
    async own(ctx, id) {
        const list = await this.prisma.shortlist.findFirst({ where: { id, companyId: ctx.companyId } });
        if (!list)
            throw new NotFoundException('List not found');
        return list;
    }
};
ShortlistsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        MediaService])
], ShortlistsService);
export { ShortlistsService };
//# sourceMappingURL=shortlists.service.js.map