var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PerformanceService_1;
import { Injectable, Logger } from '@nestjs/common';
import { performanceScore } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { OrderHooks } from '../orders/order-hooks.js';
import { SearchService } from '../search/search.service.js';
const DAY = 86_400_000;
const avg = (values) => values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : null;
const x100 = (v) => (v === null ? null : Math.round(v * 100));
let PerformanceService = PerformanceService_1 = class PerformanceService {
    prisma;
    hooks;
    search;
    logger = new Logger(PerformanceService_1.name);
    constructor(prisma, hooks, search) {
        this.prisma = prisma;
        this.hooks = hooks;
        this.search = search;
    }
    onModuleInit() {
        this.hooks.register({
            after: async (order, to) => {
                if (to === 'SHIPPED' || to === 'COMPLETED' || to === 'READY_TO_SHIP')
                    await this.recompute(order.manufacturerProfileId);
            },
        });
    }
    async recompute(profileId) {
        try {
            await this.apply(profileId);
        }
        catch (error) {
            this.logger.error({ err: error, profileId }, 'Failed to recompute performance');
        }
    }
    async apply(profileId) {
        const [reviews, shipped, finals] = await Promise.all([
            this.prisma.review.findMany({
                where: {
                    manufacturerProfileId: profileId,
                    direction: 'BUYER_TO_MANUFACTURER',
                    status: 'PUBLISHED',
                },
                select: { qualityRating: true, communicationRating: true, deliveryRating: true },
            }),
            this.prisma.order.findMany({
                where: {
                    manufacturerProfileId: profileId,
                    OR: [
                        { hubReceipts: { some: {} } },
                        { logisticsShipments: { some: { shipment: { historical: true } } } },
                    ],
                },
                select: {
                    requestedShipDate: true,
                    hubReceipts: { select: { receivedAt: true }, take: 1, orderBy: { receivedAt: 'asc' } },
                    logisticsShipments: {
                        where: { shipment: { historical: true } },
                        select: { shipment: { select: { departedAt: true } } },
                        take: 1,
                    },
                },
            }),
            this.prisma.inspection.findMany({
                where: {
                    type: 'PRE_SHIPMENT',
                    result: { in: ['PASS', 'FAIL'] },
                    order: { manufacturerProfileId: profileId },
                },
                orderBy: { inspectedAt: 'asc' },
                select: { orderId: true, result: true },
            }),
        ]);
        const quality = avg(reviews.map((r) => r.qualityRating ?? 0));
        const communication = avg(reviews.map((r) => r.communicationRating ?? 0));
        const onTime = avg(reviews.map((r) => r.deliveryRating ?? 0));
        const overall = quality !== null && communication !== null && onTime !== null
            ? (quality + communication + onTime) / 3
            : null;
        const shipDate = (o) => o.hubReceipts[0]?.receivedAt ?? o.logisticsShipments[0]?.shipment.departedAt ?? null;
        const dated = shipped.filter((o) => o.requestedShipDate && shipDate(o));
        const shippedOnTime = dated.filter((o) => (shipDate(o)?.getTime() ?? Infinity) <= (o.requestedShipDate?.getTime() ?? 0) + DAY).length;
        const firstByOrder = new Map();
        for (const f of finals)
            if (!firstByOrder.has(f.orderId))
                firstByOrder.set(f.orderId, f.result);
        const firstPasses = [...firstByOrder.values()].filter((r) => r === 'PASS').length;
        const result = performanceScore({
            ratingAverage: overall,
            reviewCount: reviews.length,
            shipped: dated.length,
            shippedOnTime,
            finalInspections: firstByOrder.size,
            finalPassedFirstTime: firstPasses,
        });
        await this.prisma.manufacturerProfile.update({
            where: { id: profileId },
            data: {
                performanceScore: result.score,
                onTimeDeliveryBps: result.onTimeBps,
                qcPassBps: result.qcPassBps,
                reviewCount: reviews.length,
                ratingAvgX100: x100(overall),
                qualityAvgX100: x100(quality),
                communicationAvgX100: x100(communication),
                onTimeAvgX100: x100(onTime),
            },
        });
        await this.search.syncManufacturer(profileId);
    }
};
PerformanceService = PerformanceService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        OrderHooks,
        SearchService])
], PerformanceService);
export { PerformanceService };
//# sourceMappingURL=performance.service.js.map