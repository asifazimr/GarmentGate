import { Injectable } from '@nestjs/common';
import type { BuyerDashboard } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { listedManufacturer, publicManufacturerInclude } from '../catalog/catalog.queries.js';
import { toPublicManufacturer } from '../catalog/public.serializer.js';
import { MediaService } from '../media/media.service.js';
import type { BuyerContext } from './buyer-context.service.js';

const CLOSED_ORDERS = ['COMPLETED', 'CANCELLED'] as const;

@Injectable()
export class BuyerDashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly media: MediaService,
  ) {}

  async get(ctx: BuyerContext): Promise<BuyerDashboard> {
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
          // Buyer-facing totals only.
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
          // Buyers only see offers released to them.
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

    const categoryIds =
      profile?.categories.flatMap((c) => [c.id, ...(c.parentId ? [c.parentId] : [])]) ?? [];
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
    const urls = await this.media.urlMap(
      recommendedRows.flatMap((r) => r.photos.map((p) => p.file)),
    );

    return {
      stats: {
        activeOrders,
        openRfqs,
        savedItems,
        inEscrow: held > 0 ? [{ currency: 'USD', amountMinor: held }] : [],
      },
      activeOrders: orders.map((o) => {
        const done = o.milestones.filter((m) => m.status === 'COMPLETED').length;
        const current =
          o.milestones.find((m) => m.status === 'IN_PROGRESS' || m.status === 'DELAYED') ??
          o.milestones.find((m) => m.status === 'PENDING');
        return {
          code: o.code,
          title: o.title,
          status: o.status,
          quantity: o.quantity,
          currency: o.currency,
          totalMinor: Number(o.buyerTotalMinor),
          manufacturerCode: o.manufacturerProfile.publicCode,
          progressPercent:
            o.milestones.length > 0 ? Math.round((done / o.milestones.length) * 100) : 0,
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
}
