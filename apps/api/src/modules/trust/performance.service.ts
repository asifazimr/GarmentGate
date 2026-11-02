import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';
import { performanceScore } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { OrderHooks } from '../orders/order-hooks.js';
import { SearchService } from '../search/search.service.js';

const DAY = 86_400_000;
const avg = (values: number[]) =>
  values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : null;
const x100 = (v: number | null) => (v === null ? null : Math.round(v * 100));

/**
 * Keeps each factory's public numbers current: performance score, on-time shipping, first-time
 * QC pass rate and review averages. Recalculated after shipping, completion, a final
 * inspection report and a buyer review; the search index follows.
 */
@Injectable()
export class PerformanceService implements OnModuleInit {
  private readonly logger = new Logger(PerformanceService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly hooks: OrderHooks,
    private readonly search: SearchService,
  ) {}

  onModuleInit(): void {
    this.hooks.register({
      after: async (order, to) => {
        if (to === 'SHIPPED' || to === 'COMPLETED' || to === 'READY_TO_SHIP')
          await this.recompute(order.manufacturerProfileId);
      },
    });
  }

  async recompute(profileId: string): Promise<void> {
    try {
      await this.apply(profileId);
    } catch (error) {
      this.logger.error({ err: error, profileId }, 'Failed to recompute performance');
    }
  }

  private async apply(profileId: string): Promise<void> {
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
          shipments: { some: { shippedAt: { not: null } } },
        },
        select: {
          requestedShipDate: true,
          shipments: { select: { shippedAt: true }, take: 1, orderBy: { createdAt: 'desc' } },
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
    const overall =
      quality !== null && communication !== null && onTime !== null
        ? (quality + communication + onTime) / 3
        : null;

    // Shipped by the end of the requested day counts as on time.
    const dated = shipped.filter((o) => o.requestedShipDate && o.shipments[0]?.shippedAt);
    const shippedOnTime = dated.filter(
      (o) =>
        (o.shipments[0]?.shippedAt?.getTime() ?? Infinity) <=
        (o.requestedShipDate?.getTime() ?? 0) + DAY,
    ).length;

    // First-time pass: the earliest reported final inspection of each order passed.
    const firstByOrder = new Map<string, string>();
    for (const f of finals) if (!firstByOrder.has(f.orderId)) firstByOrder.set(f.orderId, f.result);
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
}
