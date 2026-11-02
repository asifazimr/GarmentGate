import { Injectable } from '@nestjs/common';
import type { AdminOverview, OrderStatus } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { FxService } from '../payments/fx.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { buildOverview, monthsBetween, overviewStart } from './overview.js';

const ACTIVE: OrderStatus[] = [
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

/** The admin dashboard: platform numbers and the work waiting for staff. */
@Injectable()
export class AdminOverviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fx: FxService,
    private readonly payments: PaymentsService,
  ) {}

  async overview(months: number): Promise<AdminOverview> {
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
    const result = buildOverview(
      orders.flatMap((o) =>
        o.confirmedAt
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
          : [],
      ),
      rfqs.flatMap((r) =>
        r.publishedAt ? [{ publishedAt: r.publishedAt, converted: r._count.orders > 0 }] : [],
      ),
      rates,
      monthsBetween(from, now),
    );
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

  private async queues(): Promise<AdminOverview['queues']> {
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
}
