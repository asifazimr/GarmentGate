import { Injectable } from '@nestjs/common';
import {
  convertMinor,
  type Currency,
  DEFAULT_UNIT_ECONOMICS,
  gates,
  type KpiQuery,
  type KpiReport,
  type OrderEconomics,
  orderContribution,
  rateBps,
  type UnitEconomicsSettings,
  UnitEconomicsSettingsSchema,
  type UnitsPerUsd,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { FxService } from '../payments/fx.service.js';

const KEY = 'unit_economics';
const DAY = 86_400_000;
/** "Buyers ordering again within 6 months". */
const REPEAT_WINDOW = 183 * DAY;
const ACTIVE_WINDOW = 90 * DAY;
/** Fees the buyer pays GarmentGate for services (samples, inspection days). */
const FEE_PURPOSES = ['SAMPLE_FEE', 'INSPECTION_FEE'] as const;

const n = (v: bigint) => Number(v);

/**
 * The Phase 1 KPIs and unit economics (business model: KPIs, unit economics, roadmap gates).
 * Order-level money is in the order's currency; platform totals are in USD at GarmentGate's
 * reference rates (an order whose currency has no rate counts 0 in USD and is flagged).
 */
@Injectable()
export class KpisService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fx: FxService,
    private readonly audit: AuditService,
  ) {}

  async settings(): Promise<UnitEconomicsSettings> {
    const row = await this.prisma.platformSetting.findUnique({ where: { key: KEY } });
    const parsed = UnitEconomicsSettingsSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_UNIT_ECONOMICS;
  }

  async setSettings(
    adminId: string,
    settings: UnitEconomicsSettings,
  ): Promise<UnitEconomicsSettings> {
    const value: Prisma.InputJsonValue = { ...settings };
    await this.prisma.platformSetting.upsert({
      where: { key: KEY },
      create: { key: KEY, value },
      update: { value },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'kpis.settings_updated',
      entityType: 'PlatformSetting',
      entityId: KEY,
      metadata: value,
    });
    return settings;
  }

  async report(q: KpiQuery): Promise<KpiReport> {
    const from = new Date(`${q.from}T00:00:00.000Z`);
    const to = new Date(new Date(`${q.to}T00:00:00.000Z`).getTime() + DAY);
    const [settings, rates] = await Promise.all([this.settings(), this.fx.rates()]);
    const usd = (amount: bigint, currency: Currency) => {
      try {
        return convertMinor(amount, currency, 'USD', rates);
      } catch {
        return 0n;
      }
    };

    const economics = await this.economics(from, to, settings, rates);
    const last30 = await this.economics(new Date(to.getTime() - 30 * DAY), to, settings, rates);

    const [
      paidOrders,
      onTime,
      firstPass,
      repeat,
      quotes,
      activeFactories,
      capacity,
      claims,
      assignHours,
    ] = await Promise.all([
      this.prisma.order.count({
        where: {
          payments: {
            some: {
              purpose: 'DEPOSIT',
              direction: 'INBOUND',
              status: 'SUCCEEDED',
              paidAt: { lt: to },
            },
          },
        },
      }),
      this.onTime(from, to),
      this.firstPass(from, to),
      this.repeatBuyers(from, to),
      this.quoteConversion(from, to),
      this.prisma.manufacturerProfile.count({
        where: {
          company: { kycStatus: 'VERIFIED' },
          orders: { some: { createdAt: { gte: new Date(to.getTime() - ACTIVE_WINDOW), lt: to } } },
        },
      }),
      this.capacity(from, to),
      this.claimRate(from, to),
      this.inspectorAssignHours(from, to),
    ]);

    const gmv = economics.reduce((a, e) => a + usd(e.buyerGoods, e.currency), 0n);
    const gross = economics.reduce((a, e) => a + usd(e.c.grossRevenueMinor, e.currency), 0n);
    const contribution = economics.reduce((a, e) => a + usd(e.c.contributionMinor, e.currency), 0n);
    const monthly = last30.reduce((a, e) => a + usd(e.c.contributionMinor, e.currency), 0n);
    const positive = economics.filter((e) => e.c.contributionMinor > 0n).length;

    const report = {
      gmvUsdMinor: n(gmv),
      grossRevenueUsdMinor: n(gross),
      contributionUsdMinor: n(contribution),
      orders: economics.length,
      takeRateBps: gmv === 0n ? null : Number((gross * 10_000n) / gmv),
      contributionPerOrderUsdMinor:
        economics.length === 0 ? null : Math.round(n(contribution) / economics.length),
      positiveContributionBps: rateBps(positive, economics.length),
      onTimeBps: rateBps(onTime.onTime, onTime.shipped),
      shipped: onTime.shipped,
      firstPassBps: rateBps(firstPass.passed, firstPass.total),
      finalInspections: firstPass.total,
      repeatBuyerBps: rateBps(repeat.repeat, repeat.buyers),
      quoteToOrderBps: rateBps(quotes.accepted, quotes.offered),
      quotesOffered: quotes.offered,
      activeFactories,
      capacityUtilisationBps: rateBps(capacity.booked, capacity.total),
      claimRateBps: rateBps(claims.claimed, claims.delivered),
      delivered: claims.delivered,
      inspectorAssignHours: assignHours,
      paidOrders,
    };
    return {
      from: q.from,
      to: q.to,
      ...report,
      gates: gates({
        paidOrders,
        onTimeBps: report.onTimeBps,
        positiveContributionBps: report.positiveContributionBps,
        repeatBuyerBps: report.repeatBuyerBps,
        monthlyContributionUsdMinor: n(monthly),
        monthlyFixedCostsUsdMinor: settings.monthlyFixedCostsUsdMinor,
        workingCapitalLine: settings.workingCapitalLine,
      }),
      settings,
      economics: economics.map((e): OrderEconomics => ({
        orderCode: e.code,
        buyerCode: e.buyerCode,
        manufacturerCode: e.manufacturerCode,
        status: e.status,
        confirmedAt: e.confirmedAt.toISOString(),
        currency: e.currency,
        buyerPaysMinor: n(e.c.buyerPaysMinor),
        grossRevenueMinor: n(e.c.grossRevenueMinor),
        paymentFeesMinor: n(e.c.paymentFeesMinor),
        merchandisingMinor: n(e.c.merchandisingMinor),
        claimsReserveMinor: n(e.c.claimsReserveMinor),
        contributionMinor: n(e.c.contributionMinor),
        contributionUsdMinor: n(usd(e.c.contributionMinor, e.currency)),
      })),
    };
  }

  // ── Unit economics per order ──────────────────────────────────────────────

  /** Orders confirmed in [from, to), with what they earn GarmentGate before fixed costs. */
  private async economics(
    from: Date,
    to: Date,
    settings: UnitEconomicsSettings,
    rates: UnitsPerUsd,
  ) {
    const orders = await this.prisma.order.findMany({
      where: { confirmedAt: { gte: from, lt: to }, status: { not: 'CANCELLED' } },
      orderBy: { confirmedAt: 'desc' },
      select: {
        code: true,
        status: true,
        currency: true,
        confirmedAt: true,
        buyerTotalMinor: true,
        manufacturerTotalMinor: true,
        commissionMinor: true,
        buyerCompany: { select: { buyerProfile: { select: { publicCode: true } } } },
        manufacturerProfile: { select: { publicCode: true } },
        logisticsQuotes: { where: { status: 'ACCEPTED' }, select: { partnerCostMinor: true } },
        logisticsShipments: { where: { active: true }, select: { costShareMinor: true } },
        payments: {
          where: {
            direction: 'INBOUND',
            status: 'SUCCEEDED',
            purpose: { in: ['LOGISTICS', ...FEE_PURPOSES] },
          },
          select: { purpose: true, amountMinor: true },
        },
      },
    });
    return orders.map((o) => {
      const paid = (purposes: readonly string[]) =>
        o.payments
          .filter((p) => purposes.includes(p.purpose))
          .reduce((a, p) => a + p.amountMinor, 0n);
      const logisticsCharged = paid(['LOGISTICS']);
      // The actual partner cost once on a shipment; the quoted estimate before.
      const logisticsCost =
        o.logisticsShipments[0]?.costShareMinor ??
        (logisticsCharged > 0n ? (o.logisticsQuotes[0]?.partnerCostMinor ?? 0n) : 0n);
      let merchandising = 0n;
      try {
        merchandising = convertMinor(
          BigInt(settings.merchandisingUsdMinor),
          'USD',
          o.currency,
          rates,
        );
      } catch {
        merchandising = 0n;
      }
      return {
        code: o.code,
        status: o.status,
        currency: o.currency,
        confirmedAt: o.confirmedAt ?? new Date(0),
        buyerCode: o.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
        manufacturerCode: o.manufacturerProfile.publicCode,
        buyerGoods: o.buyerTotalMinor,
        c: orderContribution(
          {
            buyerGoodsMinor: o.buyerTotalMinor,
            factoryGoodsMinor: o.manufacturerTotalMinor,
            commissionMinor: o.commissionMinor,
            logisticsChargedMinor: logisticsCharged,
            logisticsCostMinor: logisticsCost,
            feesChargedMinor: paid(FEE_PURPOSES),
            feesCostMinor: 0n,
          },
          settings,
          merchandising,
        ),
      };
    });
  }

  // ── Operational KPIs ──────────────────────────────────────────────────────

  /** At GarmentGate's hub (or, before logistics, shipped) by the end of the requested day. */
  private async onTime(from: Date, to: Date) {
    const orders = await this.prisma.order.findMany({
      where: {
        requestedShipDate: { not: null },
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
    });
    let shipped = 0;
    let onTime = 0;
    for (const o of orders) {
      const at = o.hubReceipts[0]?.receivedAt ?? o.logisticsShipments[0]?.shipment.departedAt;
      if (!at || at < from || at >= to || !o.requestedShipDate) continue;
      shipped += 1;
      if (at.getTime() <= o.requestedShipDate.getTime() + DAY) onTime += 1;
    }
    return { shipped, onTime };
  }

  /** Orders whose first final inspection was reported in the period, and passed. */
  private async firstPass(from: Date, to: Date) {
    const finals = await this.prisma.inspection.findMany({
      where: {
        type: 'PRE_SHIPMENT',
        result: { in: ['PASS', 'FAIL'] },
        inspectedAt: { lt: to },
      },
      orderBy: { inspectedAt: 'asc' },
      select: { orderId: true, result: true, inspectedAt: true },
    });
    const first = new Map<string, { result: string; at: Date | null }>();
    for (const f of finals)
      if (!first.has(f.orderId)) first.set(f.orderId, { result: f.result, at: f.inspectedAt });
    const inPeriod = [...first.values()].filter((f) => f.at && f.at >= from);
    return {
      total: inPeriod.length,
      passed: inPeriod.filter((f) => f.result === 'PASS').length,
    };
  }

  /** Buyers with an order in the period who had ordered within the 6 months before it. */
  private async repeatBuyers(from: Date, to: Date) {
    const orders = await this.prisma.order.findMany({
      where: {
        confirmedAt: { gte: new Date(from.getTime() - REPEAT_WINDOW), lt: to },
        status: { not: 'CANCELLED' },
      },
      orderBy: { confirmedAt: 'asc' },
      select: { buyerCompanyId: true, confirmedAt: true },
    });
    const byBuyer = new Map<string, Date[]>();
    for (const o of orders) {
      if (!o.confirmedAt) continue;
      byBuyer.set(o.buyerCompanyId, [...(byBuyer.get(o.buyerCompanyId) ?? []), o.confirmedAt]);
    }
    let buyers = 0;
    let repeat = 0;
    for (const dates of byBuyer.values()) {
      const inPeriod = dates.filter((d) => d >= from);
      if (inPeriod.length === 0) continue;
      buyers += 1;
      if (
        inPeriod.some((d) => dates.some((e) => e < d && d.getTime() - e.getTime() <= REPEAT_WINDOW))
      )
        repeat += 1;
    }
    return { buyers, repeat };
  }

  private async quoteConversion(from: Date, to: Date) {
    const [offered, accepted] = await Promise.all([
      this.prisma.quote.count({ where: { offeredAt: { gte: from, lt: to } } }),
      this.prisma.quote.count({
        where: { offeredAt: { gte: from, lt: to }, status: 'ACCEPTED' },
      }),
    ]);
    return { offered, accepted };
  }

  /** Booked minutes over listed minutes, for booking windows starting in the period. */
  private async capacity(from: Date, to: Date) {
    const sums = await this.prisma.capacitySlot.aggregate({
      where: { startDate: { gte: from, lt: to } },
      _sum: { totalMinutes: true, bookedMinutes: true },
    });
    return { total: sums._sum.totalMinutes ?? 0, booked: sums._sum.bookedMinutes ?? 0 };
  }

  /** Orders delivered in the period that drew a dispute or a logistics claim. */
  private async claimRate(from: Date, to: Date) {
    const delivered = await this.prisma.order.findMany({
      where: { events: { some: { toStatus: 'DELIVERED', createdAt: { gte: from, lt: to } } } },
      select: { _count: { select: { disputes: true, logisticsClaims: true } } },
    });
    return {
      delivered: delivered.length,
      claimed: delivered.filter((o) => o._count.disputes + o._count.logisticsClaims > 0).length,
    };
  }

  /** Average hours from an inspection being opened to an inspector being assigned. */
  private async inspectorAssignHours(from: Date, to: Date): Promise<number | null> {
    const rows = await this.prisma.inspection.findMany({
      where: { assignedAt: { gte: from, lt: to } },
      select: { createdAt: true, assignedAt: true },
    });
    if (rows.length === 0) return null;
    const total = rows.reduce(
      (a, r) => a + Math.max(0, (r.assignedAt?.getTime() ?? 0) - r.createdAt.getTime()),
      0,
    );
    return Math.round((total / rows.length / 3_600_000) * 10) / 10;
  }
}
