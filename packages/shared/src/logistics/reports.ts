import { z } from 'zod';
import { type Currency, CurrencySchema } from '../catalog/product.schema.js';
import { type ShippingMode, ShippingModeSchema } from './logistics.schema.js';

/**
 * Logistics revenue, per currency (never mixed): what buyers paid for departed shipments, what
 * partners cost, the insurance premiums passed on to the insurer and the net cost of claims
 * settled in the period. Margin = revenue − partner cost − insurance − claims.
 */

export const LogisticsReportQuerySchema = z
  .object({ from: z.iso.date(), to: z.iso.date() })
  .refine((v) => v.from <= v.to, { error: 'The start must be before the end', path: ['to'] });
export type LogisticsReportQuery = z.infer<typeof LogisticsReportQuerySchema>;

const money = z.number().int();
const Figures = {
  currency: CurrencySchema,
  shipments: z.number().int(),
  revenueMinor: money,
  partnerCostMinor: money,
  insuranceMinor: money,
  claimsNetMinor: money,
  marginMinor: money,
  /** Margin as basis points of revenue (0 when there's no revenue). */
  marginBps: z.number().int(),
};

export const LogisticsReportSchema = z.object({
  from: z.iso.date(),
  to: z.iso.date(),
  totals: z.array(z.object(Figures)),
  months: z.array(z.object({ month: z.string(), ...Figures })),
  modes: z.array(z.object({ mode: ShippingModeSchema, ...Figures })),
  partners: z.array(
    z.object({
      partnerId: z.uuid(),
      name: z.string(),
      currency: CurrencySchema,
      legs: z.number().int(),
      costMinor: money,
      paidMinor: money,
      chargebackMinor: money,
      /** Cost not yet paid, less chargebacks. */
      outstandingMinor: money,
    }),
  ),
  claims: z.object({
    open: z.number().int(),
    settled: z.number().int(),
    rejected: z.number().int(),
  }),
});
export type LogisticsReport = z.infer<typeof LogisticsReportSchema>;
type FigureRow = z.infer<z.ZodObject<typeof Figures>>;

export interface ReportShipment {
  departedAt: Date;
  currency: Currency;
  mode: ShippingMode;
  buyerPriceMinor: bigint;
  partnerCostMinor: bigint;
  insuranceMinor: bigint;
}

export interface ReportClaim {
  settledAt: Date;
  currency: Currency;
  mode: ShippingMode;
  netMinor: bigint;
}

interface Acc {
  shipments: number;
  revenue: bigint;
  cost: bigint;
  insurance: bigint;
  claims: bigint;
}

const empty = (): Acc => ({ shipments: 0, revenue: 0n, cost: 0n, insurance: 0n, claims: 0n });

function figures(currency: Currency, a: Acc): FigureRow {
  const margin = a.revenue - a.cost - a.insurance - a.claims;
  return {
    currency,
    shipments: a.shipments,
    revenueMinor: Number(a.revenue),
    partnerCostMinor: Number(a.cost),
    insuranceMinor: Number(a.insurance),
    claimsNetMinor: Number(a.claims),
    marginMinor: Number(margin),
    marginBps: a.revenue === 0n ? 0 : Number((margin * 10_000n) / a.revenue),
  };
}

const monthOf = (d: Date) => d.toISOString().slice(0, 7);

/** Groups shipments (by departure) and settled claims into totals, months and modes. */
export function logisticsRevenue(
  shipments: readonly ReportShipment[],
  claims: readonly ReportClaim[],
): Pick<LogisticsReport, 'totals' | 'months' | 'modes'> {
  const totals = new Map<string, Acc>();
  const months = new Map<string, Acc>();
  const modes = new Map<string, Acc>();
  const bucket = (m: Map<string, Acc>, key: string) => {
    let a = m.get(key);
    if (!a) {
      a = empty();
      m.set(key, a);
    }
    return a;
  };
  for (const s of shipments) {
    for (const a of [
      bucket(totals, s.currency),
      bucket(months, `${monthOf(s.departedAt)}|${s.currency}`),
      bucket(modes, `${s.mode}|${s.currency}`),
    ]) {
      a.shipments += 1;
      a.revenue += s.buyerPriceMinor;
      a.cost += s.partnerCostMinor;
      a.insurance += s.insuranceMinor;
    }
  }
  for (const c of claims) {
    for (const a of [
      bucket(totals, c.currency),
      bucket(months, `${monthOf(c.settledAt)}|${c.currency}`),
      bucket(modes, `${c.mode}|${c.currency}`),
    ])
      a.claims += c.netMinor;
  }
  const split = (key: string): [string, Currency] => {
    const [head = '', currency = ''] = key.split('|');
    return [head, CurrencySchema.parse(currency)];
  };
  return {
    totals: [...totals]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([currency, a]) => figures(CurrencySchema.parse(currency), a)),
    months: [...months]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, a]) => {
        const [month, currency] = split(key);
        return { month, ...figures(currency, a) };
      }),
    modes: [...modes]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, a]) => {
        const [mode, currency] = split(key);
        return { mode: ShippingModeSchema.parse(mode), ...figures(currency, a) };
      }),
  };
}
