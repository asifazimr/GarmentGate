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
import { FxService } from '../payments/fx.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { buildOverview, monthsBetween, overviewStart } from './overview.js';
const ACTIVE = [
    'SAMPLING',
    'SAMPLE_APPROVED',
    'DEPOSIT_PENDING',
    'IN_PRODUCTION',
    'QC',
    'READY_TO_SHIP',
    'SHIPPED',
    'DELIVERED',
    'DISPUTED',
];
let AdminOverviewService = class AdminOverviewService {
    prisma;
    fx;
    payments;
    constructor(prisma, fx, payments) {
        this.prisma = prisma;
        this.fx = fx;
        this.payments = payments;
    }
    async overview(months) {
        const now = new Date();
        const from = overviewStart(now, months);
        const [orders, rfqs, rates, byStatus, active, queues] = await Promise.all([
            this.prisma.order.findMany({
                where: { confirmedAt: { gte: from }, status: { not: 'CANCELLED' } },
                select: {
                    confirmedAt: true,
                    currency: true,
                    buyerTotalMinor: true,
                    manufacturerTotalMinor: true,
                    commissionMinor: true,
                    rfq: { select: { category: { select: { name: true } } } },
                },
            }),
            this.prisma.rfq.findMany({
                where: { publishedAt: { gte: from } },
                select: { publishedAt: true, _count: { select: { orders: true } } },
            }),
            this.fx.rates(),
            this.prisma.order.groupBy({ by: ['status'], _count: { _all: true } }),
            this.prisma.order.count({ where: { status: { in: ACTIVE } } }),
            this.queues(),
        ]);
        const result = buildOverview(orders.flatMap((o) => o.confirmedAt
            ? [
                {
                    confirmedAt: o.confirmedAt,
                    currency: o.currency,
                    buyerTotalMinor: o.buyerTotalMinor,
                    manufacturerTotalMinor: o.manufacturerTotalMinor,
                    commissionMinor: o.commissionMinor,
                    category: o.rfq?.category.name ?? null,
                },
            ]
            : []), rfqs.flatMap((r) => r.publishedAt ? [{ publishedAt: r.publishedAt, converted: r._count.orders > 0 }] : []), rates, monthsBetween(from, now));
        return {
            from: from.toISOString(),
            kpis: {
                gmvUsdMinor: result.gmvUsdMinor,
                revenueUsdMinor: result.revenueUsdMinor,
                markupUsdMinor: result.markupUsdMinor,
                commissionUsdMinor: result.commissionUsdMinor,
                confirmedOrders: result.confirmedOrders,
                activeOrders: active,
                rfqs: result.rfqs,
                rfqsConverted: result.rfqsConverted,
                conversionBps: result.conversionBps,
            },
            series: result.series,
            skippedCurrencies: result.skippedCurrencies,
            ordersByStatus: byStatus
                .map((s) => ({ status: s.status, count: s._count._all }))
                .sort((a, b) => b.count - a.count),
            topCategories: result.topCategories,
            queues,
        };
    }
    async queues() {
        const [kyc, certifications, flaggedMessages, openDisputes, inbox] = await Promise.all([
            this.prisma.company.count({ where: { kycStatus: 'PENDING_REVIEW', deletedAt: null } }),
            this.prisma.certification.count({ where: { status: 'PENDING' } }),
            this.prisma.message.count({ where: { flagged: true, moderationStatus: 'FLAGGED' } }),
            this.prisma.dispute.count({ where: { status: { in: ['OPEN', 'UNDER_REVIEW'] } } }),
            this.payments.inbox(),
        ]);
        return {
            kyc,
            certifications,
            flaggedMessages,
            paymentsToConfirm: inbox.toConfirm.length,
            releasesDue: inbox.toRelease.length,
            openDisputes,
        };
    }
};
AdminOverviewService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        FxService,
        PaymentsService])
], AdminOverviewService);
export { AdminOverviewService };
//# sourceMappingURL=admin-overview.service.js.map