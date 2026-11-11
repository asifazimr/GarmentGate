var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { listedManufacturer, publicManufacturerInclude } from '../catalog/catalog.queries.js';
import { toPublicManufacturer } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
const CLOSED_ORDERS = ['COMPLETED', 'CANCELLED'];
let BuyerDashboardService = class BuyerDashboardService {
    prisma;
    media;
    constructor(prisma, media) {
        this.prisma = prisma;
        this.media = media;
    }
    async get(ctx) {
        const [orders, rfqs, savedItems, escrow, profile] = await Promise.all([
            this.prisma.order.findMany({
                where: { buyerCompanyId: ctx.companyId, status: { notIn: [...CLOSED_ORDERS] } },
                orderBy: { createdAt: 'desc' },
                take: 6,
                select: {
                    code: true,
                    title: true,
                    status: true,
                    quantity: true,
                    currency: true,
                    buyerTotalMinor: true,
                    requestedShipDate: true,
                    manufacturerProfile: { select: { publicCode: true } },
                    milestones: { select: { stage: true, status: true }, orderBy: { plannedAt: 'asc' } },
                },
            }),
            this.prisma.rfq.findMany({
                where: { buyerCompanyId: ctx.companyId, status: { in: ['DRAFT', 'OPEN'] } },
                orderBy: { createdAt: 'desc' },
                take: 6,
                select: {
                    code: true,
                    title: true,
                    status: true,
                    quantity: true,
                    deadline: true,
                    _count: { select: { quotes: { where: { status: { in: ['OFFERED', 'ACCEPTED'] } } } } },
                },
            }),
            this.prisma.shortlistItem.count({ where: { shortlist: { companyId: ctx.companyId } } }),
            this.prisma.escrowLedgerEntry.groupBy({
                by: ['direction'],
                where: { account: { type: 'BUYER_ESCROW', companyId: ctx.companyId, currency: 'USD' } },
                _sum: { amountMinor: true },
            }),
            this.prisma.buyerProfile.findUnique({
                where: { companyId: ctx.companyId },
                select: { categories: { select: { id: true, parentId: true } } },
            }),
        ]);
        const [activeOrders, openRfqs] = await Promise.all([
            this.prisma.order.count({
                where: { buyerCompanyId: ctx.companyId, status: { notIn: [...CLOSED_ORDERS] } },
            }),
            this.prisma.rfq.count({
                where: { buyerCompanyId: ctx.companyId, status: { in: ['DRAFT', 'OPEN'] } },
            }),
        ]);
        const credit = escrow.find((e) => e.direction === 'CREDIT')?._sum.amountMinor ?? 0n;
        const debit = escrow.find((e) => e.direction === 'DEBIT')?._sum.amountMinor ?? 0n;
        const held = Number(credit - debit);
        const categoryIds = profile?.categories.flatMap((c) => [c.id, ...(c.parentId ? [c.parentId] : [])]) ?? [];
        const recommendedRows = await this.prisma.manufacturerProfile.findMany({
            where: {
                ...listedManufacturer,
                ...(categoryIds.length > 0 && {
                    categories: {
                        some: { OR: [{ id: { in: categoryIds } }, { parentId: { in: categoryIds } }] },
                    },
                }),
            },
            include: publicManufacturerInclude,
            orderBy: { performanceScore: 'desc' },
            take: 3,
        });
        const urls = await this.media.urlMap(recommendedRows.flatMap((r) => r.photos.map((p) => p.file)));
        return {
            stats: {
                activeOrders,
                openRfqs,
                savedItems,
                inEscrow: held > 0 ? [{ currency: 'USD', amountMinor: held }] : [],
            },
            activeOrders: orders.map((o) => {
                const done = o.milestones.filter((m) => m.status === 'COMPLETED').length;
                const current = o.milestones.find((m) => m.status === 'IN_PROGRESS' || m.status === 'DELAYED') ??
                    o.milestones.find((m) => m.status === 'PENDING');
                return {
                    code: o.code,
                    title: o.title,
                    status: o.status,
                    quantity: o.quantity,
                    currency: o.currency,
                    totalMinor: Number(o.buyerTotalMinor),
                    manufacturerCode: o.manufacturerProfile.publicCode,
                    progressPercent: o.milestones.length > 0 ? Math.round((done / o.milestones.length) * 100) : 0,
                    currentMilestone: current?.stage ?? null,
                    shipBy: o.requestedShipDate?.toISOString() ?? null,
                };
            }),
            openRfqs: rfqs.map((r) => ({
                code: r.code,
                title: r.title,
                status: r.status,
                quantity: r.quantity,
                deadline: r.deadline.toISOString(),
                offers: r._count.quotes,
            })),
            recommended: recommendedRows.map((r) => toPublicManufacturer(r, urls)),
        };
    }
};
BuyerDashboardService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        MediaService])
], BuyerDashboardService);
export { BuyerDashboardService };
//# sourceMappingURL=dashboard.service.js.map