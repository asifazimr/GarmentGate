import { z } from 'zod';
import { CurrencySchema } from '../catalog/product.schema.js';

/**
 * Phase 1 KPIs and unit economics (business model: "Cost structure and unit economics",
 * "KPIs", "Go-to-market and roadmap"). Money stays in integer minor units; the platform totals
 * are in USD at GarmentGate's reference rates.
 */

// ── Unit economics assumptions (staff-editable) ──────────────────────────────

export const UnitEconomicsSettingsSchema = z.object({
  /** Gateway, bank and FX charges as a share of what the buyer pays (≈2.5%). */
  paymentFeeBps: z.number().int().min(0).max(2_000),
  /** Merchandising staff time per order, in USD minor units. */
  merchandisingUsdMinor: z.number().int().min(0).max(10_000_000),
  /** Set aside for refunds and rework, as a share of what the buyer pays (≈1%). */
  claimsReserveBps: z.number().int().min(0).max(2_000),
  /** Monthly fixed costs (people, tech, office), in USD minor units: the break-even bar. */
  monthlyFixedCostsUsdMinor: z.number().int().min(0).max(1_000_000_000),
  /** Gate 3: a working-capital (trade finance) line is in place. Set by staff. */
  workingCapitalLine: z.boolean(),
});
export type UnitEconomicsSettings = z.infer<typeof UnitEconomicsSettingsSchema>;

export const DEFAULT_UNIT_ECONOMICS: UnitEconomicsSettings = {
  paymentFeeBps: 250,
  merchandisingUsdMinor: 10_000,
  claimsReserveBps: 100,
  monthlyFixedCostsUsdMinor: 2_000_000,
  workingCapitalLine: false,
};

/** Rounds a share of an amount half up (USD 68.50 → 69.00). */
export function shareOf(amount: bigint, bps: number): bigint {
  return (amount * BigInt(bps) + 5_000n) / 10_000n;
}

export interface OrderMoney {
  /** What the buyer pays for the goods (GarmentGate's price). */
  buyerGoodsMinor: bigint;
  /** What GarmentGate pays the factory for them. */
  factoryGoodsMinor: bigint;
  /** GarmentGate's commission, withheld from the factory's payouts. */
  commissionMinor: bigint;
  /** Shipping the buyer pays, and what partners cost. */
  logisticsChargedMinor: bigint;
  logisticsCostMinor: bigint;
  /** Service fees the buyer pays (samples, inspections), and what delivering them cost. */
  feesChargedMinor: bigint;
  feesCostMinor: bigint;
}

export interface Contribution {
  buyerPaysMinor: bigint;
  grossRevenueMinor: bigint;
  paymentFeesMinor: bigint;
  merchandisingMinor: bigint;
  claimsReserveMinor: bigint;
  contributionMinor: bigint;
}

/**
 * One order's contribution before fixed costs: margin + commission + shipping and fee margins,
 * less payment fees, merchandising time and the claims reserve. `merchandisingMinor` is already
 * in the order's currency.
 */
export function orderContribution(
  m: OrderMoney,
  settings: Pick<UnitEconomicsSettings, 'paymentFeeBps' | 'claimsReserveBps'>,
  merchandisingMinor: bigint,
): Contribution {
  const buyerPays = m.buyerGoodsMinor + m.logisticsChargedMinor + m.feesChargedMinor;
  const gross =
    m.buyerGoodsMinor -
    m.factoryGoodsMinor +
    m.commissionMinor +
    (m.logisticsChargedMinor - m.logisticsCostMinor) +
    (m.feesChargedMinor - m.feesCostMinor);
  const paymentFees = shareOf(buyerPays, settings.paymentFeeBps);
  const reserve = shareOf(buyerPays, settings.claimsReserveBps);
  return {
    buyerPaysMinor: buyerPays,
    grossRevenueMinor: gross,
    paymentFeesMinor: paymentFees,
    merchandisingMinor,
    claimsReserveMinor: reserve,
    contributionMinor: gross - paymentFees - merchandisingMinor - reserve,
  };
}

/** A ratio in basis points, or null when there is nothing to measure yet. */
export function rateBps(numerator: number, denominator: number): number | null {
  return denominator === 0 ? null : Math.round((numerator * 10_000) / denominator);
}

// ── Gates (roadmap: prove local orders first, then unlock export, B2C and AI) ──

export interface GateInputs {
  paidOrders: number;
  onTimeBps: number | null;
  positiveContributionBps: number | null;
  repeatBuyerBps: number | null;
  /** Contribution of the last 30 days, and the monthly fixed costs (USD minor units). */
  monthlyContributionUsdMinor: number;
  monthlyFixedCostsUsdMinor: number;
  workingCapitalLine: boolean;
}

export const GATE_TARGETS = {
  paidOrders: 50,
  onTimeBps: 8_500,
  positiveContributionBps: 10_000,
  repeatBuyerBps: 3_000,
} as const;

export const GateCheckSchema = z.object({
  key: z.enum([
    'PAID_ORDERS',
    'ON_TIME',
    'POSITIVE_CONTRIBUTION',
    'REPEAT_BUYERS',
    'BREAK_EVEN',
    'WORKING_CAPITAL',
  ]),
  actual: z.number().nullable(),
  target: z.number().nullable(),
  met: z.boolean(),
});
export type GateCheck = z.infer<typeof GateCheckSchema>;

export const GateSchema = z.object({
  gate: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  checks: z.array(GateCheckSchema),
  met: z.boolean(),
});
export type Gate = z.infer<typeof GateSchema>;

const atLeast = (actual: number | null, target: number) => actual !== null && actual >= target;

/** Gate 1: 50 paid orders, 85%+ on time. Gate 2: positive margin per order, 30% repeat
 * buyers. Gate 3: monthly break-even and a working-capital line (staff tick it). */
export function gates(i: GateInputs): Gate[] {
  const g1: GateCheck[] = [
    {
      key: 'PAID_ORDERS',
      actual: i.paidOrders,
      target: GATE_TARGETS.paidOrders,
      met: i.paidOrders >= GATE_TARGETS.paidOrders,
    },
    {
      key: 'ON_TIME',
      actual: i.onTimeBps,
      target: GATE_TARGETS.onTimeBps,
      met: atLeast(i.onTimeBps, GATE_TARGETS.onTimeBps),
    },
  ];
  const g2: GateCheck[] = [
    {
      key: 'POSITIVE_CONTRIBUTION',
      actual: i.positiveContributionBps,
      target: GATE_TARGETS.positiveContributionBps,
      met: atLeast(i.positiveContributionBps, GATE_TARGETS.positiveContributionBps),
    },
    {
      key: 'REPEAT_BUYERS',
      actual: i.repeatBuyerBps,
      target: GATE_TARGETS.repeatBuyerBps,
      met: atLeast(i.repeatBuyerBps, GATE_TARGETS.repeatBuyerBps),
    },
  ];
  const g3: GateCheck[] = [
    {
      key: 'BREAK_EVEN',
      actual: i.monthlyContributionUsdMinor,
      target: i.monthlyFixedCostsUsdMinor,
      met:
        i.monthlyFixedCostsUsdMinor > 0 &&
        i.monthlyContributionUsdMinor >= i.monthlyFixedCostsUsdMinor,
    },
    { key: 'WORKING_CAPITAL', actual: null, target: null, met: i.workingCapitalLine },
  ];
  const all = (c: GateCheck[]) => c.every((x) => x.met);
  return [
    { gate: 1, checks: g1, met: all(g1) },
    { gate: 2, checks: g2, met: all(g2) },
    { gate: 3, checks: g3, met: all(g3) },
  ];
}

// ── The report ──────────────────────────────────────────────────────────────

export const KpiQuerySchema = z
  .object({ from: z.iso.date(), to: z.iso.date() })
  .refine((v) => v.from <= v.to, { error: 'The start must be before the end', path: ['to'] });
export type KpiQuery = z.infer<typeof KpiQuerySchema>;

const money = z.number().int();
const bps = z.number().int().nullable();

export const OrderEconomicsSchema = z.object({
  orderCode: z.string(),
  buyerCode: z.string(),
  manufacturerCode: z.string(),
  status: z.string(),
  confirmedAt: z.iso.datetime(),
  currency: CurrencySchema,
  buyerPaysMinor: money,
  grossRevenueMinor: money,
  paymentFeesMinor: money,
  merchandisingMinor: money,
  claimsReserveMinor: money,
  contributionMinor: money,
  contributionUsdMinor: money,
});
export type OrderEconomics = z.infer<typeof OrderEconomicsSchema>;

export const KpiReportSchema = z.object({
  from: z.iso.date(),
  to: z.iso.date(),
  /** Orders confirmed in the period, in USD at reference rates. */
  gmvUsdMinor: money,
  grossRevenueUsdMinor: money,
  contributionUsdMinor: money,
  orders: z.number().int(),
  takeRateBps: bps,
  /** Average contribution per order (USD minor units). */
  contributionPerOrderUsdMinor: money.nullable(),
  /** Share of the period's orders with a positive contribution. */
  positiveContributionBps: bps,
  onTimeBps: bps,
  shipped: z.number().int(),
  firstPassBps: bps,
  finalInspections: z.number().int(),
  repeatBuyerBps: bps,
  quoteToOrderBps: bps,
  quotesOffered: z.number().int(),
  activeFactories: z.number().int(),
  capacityUtilisationBps: bps,
  claimRateBps: bps,
  delivered: z.number().int(),
  /** Average hours from an inspection being opened to an inspector assigned. */
  inspectorAssignHours: z.number().nullable(),
  /** All time, up to the end of the period: orders whose deposit was paid. */
  paidOrders: z.number().int(),
  gates: z.array(GateSchema),
  settings: UnitEconomicsSettingsSchema,
  economics: z.array(OrderEconomicsSchema),
});
export type KpiReport = z.infer<typeof KpiReportSchema>;
