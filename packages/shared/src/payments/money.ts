import type { Currency } from '../catalog/product.schema.js';

/** Minor-unit exponent per ISO 4217 currency (VND has none). */
export const CURRENCY_EXPONENT: Record<Currency, number> = {
  USD: 2,
  EUR: 2,
  GBP: 2,
  BDT: 2,
  INR: 2,
  VND: 0,
  TRY: 2,
  PKR: 2,
  CNY: 2,
};

/** A decimal string like "119.53" as an exact scaled integer. */
function parseDecimal(value: string): { units: bigint; scale: number } {
  const match = /^(\d+)(?:\.(\d+))?$/.exec(value.trim());
  if (!match) throw new Error(`Not a decimal: ${value}`);
  const fraction = match[2] ?? '';
  return { units: BigInt(`${match[1] ?? '0'}${fraction}`), scale: fraction.length };
}

/** a / b, rounded half away from zero, on integers. */
function divRound(a: bigint, b: bigint): bigint {
  const negative = a < 0n !== b < 0n;
  const [x, y] = [a < 0n ? -a : a, b < 0n ? -b : b];
  const q = (x + y / 2n) / y;
  return negative ? -q : q;
}

/**
 * Exchange rates as "units of the currency per 1 USD" (decimal strings, never floats), e.g.
 * { USD: "1", EUR: "0.92", BDT: "119.5" }. Stored with every money movement so it can be
 * re-valued exactly later.
 */
export type UnitsPerUsd = Partial<Record<Currency, string>>;

/** Converts minor units between currencies, exactly, rounding half away from zero once. */
export function convertMinor(
  amountMinor: bigint,
  from: Currency,
  to: Currency,
  rates: UnitsPerUsd,
): bigint {
  if (from === to) return amountMinor;
  const fromRate = rates[from];
  const toRate = rates[to];
  if (!fromRate || !toRate) throw new Error(`No exchange rate for ${from} or ${to}`);
  const f = parseDecimal(fromRate);
  const t = parseDecimal(toRate);
  if (f.units === 0n) throw new Error(`Zero exchange rate for ${from}`);
  // amount / 10^expFrom / (f / 10^fs) * (t / 10^ts) * 10^expTo
  const num = amountMinor * t.units * 10n ** BigInt(CURRENCY_EXPONENT[to] + f.scale);
  const den = f.units * 10n ** BigInt(CURRENCY_EXPONENT[from] + t.scale);
  return divRound(num, den);
}

/** Splits a total by basis points (summing to 10,000): floor each part, the remainder goes last. */
export function allocate(total: bigint, bps: readonly number[]): bigint[] {
  const sum = bps.reduce((a, b) => a + b, 0);
  if (sum !== 10_000) throw new Error(`Shares must add up to 100% (got ${String(sum / 100)}%)`);
  const parts = bps.map((b) => (total * BigInt(b)) / 10_000n);
  const used = parts.slice(0, -1).reduce((a, b) => a + b, 0n);
  parts[parts.length - 1] = total - used;
  return parts;
}

export interface Tranche {
  /** Taken from the buyer's escrow. */
  buyerMinor: bigint;
  /** Owed to the factory. */
  manufacturerMinor: bigint;
  /** GarmentGate's commission: buyerMinor − manufacturerMinor, never negative. */
  commissionMinor: bigint;
}

/**
 * Release tranches for an order. The commission is allocated first and the factory share is what
 * remains, so every tranche's commission is ≥ 0 and each column adds up to its total exactly.
 */
export function releaseTranches(
  buyerTotal: bigint,
  manufacturerTotal: bigint,
  bps: readonly number[],
): Tranche[] {
  if (manufacturerTotal > buyerTotal) throw new Error('The factory total exceeds the buyer total');
  const buyer = allocate(buyerTotal, bps);
  const commission = allocate(buyerTotal - manufacturerTotal, bps);
  return buyer.map((b, i) => {
    const c = commission[i] ?? 0n;
    return { buyerMinor: b, manufacturerMinor: b - c, commissionMinor: c };
  });
}

/** Deposit and balance of a buyer total. */
export function paymentPlan(
  buyerTotal: bigint,
  depositBps: number,
): { deposit: bigint; balance: bigint } {
  const deposit = (buyerTotal * BigInt(depositBps)) / 10_000n;
  return { deposit, balance: buyerTotal - deposit };
}
