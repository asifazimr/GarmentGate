import { chargeableGrams, type Cargo, type LogisticsModeValue } from './freight.js';

export interface ConsolidationPart extends Cargo {
  key: string;
}

/**
 * Shares one shipment's price between the orders in it, by chargeable weight (actual or
 * volumetric, whichever is greater). Largest-remainder rounding: the shares add up to the
 * total exactly, and ties go to the earlier part.
 */
export function consolidationSplit(
  totalMinor: bigint,
  mode: LogisticsModeValue,
  parts: readonly ConsolidationPart[],
): { key: string; amountMinor: bigint }[] {
  const shares = splitByWeights(
    totalMinor,
    parts.map((p) => BigInt(chargeableGrams(mode, p))),
  );
  return parts.map((p, i) => ({ key: p.key, amountMinor: shares[i] ?? 0n }));
}

/**
 * Splits `total` in proportion to `weights` with largest-remainder rounding (ties to the
 * earlier part); all-zero weights split evenly. The shares always add up to `total`.
 */
export function splitByWeights(total: bigint, weights: readonly bigint[]): bigint[] {
  if (weights.length === 0) return [];
  const sum = weights.reduce((a, w) => a + w, 0n);
  const basis = sum === 0n ? weights.map(() => 1n) : weights;
  const basisSum = sum === 0n ? BigInt(weights.length) : sum;
  const shares = basis.map((w, i) => ({
    i,
    floor: (total * w) / basisSum,
    rem: (total * w) % basisSum,
  }));
  let left = total - shares.reduce((a, s) => a + s.floor, 0n);
  const order = [...shares].sort((a, b) => (b.rem > a.rem ? 1 : b.rem < a.rem ? -1 : a.i - b.i));
  const extra = new Set<number>();
  for (const s of order) {
    if (left <= 0n) break;
    extra.add(s.i);
    left -= 1n;
  }
  return shares.map((s) => s.floor + (extra.has(s.i) ? 1n : 0n));
}

/**
 * Shares a combined price and its cost between orders by the same weights: cost shares first,
 * then the margin, so no order's price share is ever below its cost share.
 */
export function splitPriceAndCost(
  priceMinor: bigint,
  costMinor: bigint,
  weights: readonly bigint[],
): { priceMinor: bigint; costMinor: bigint }[] {
  const costs = splitByWeights(costMinor, weights);
  const margins = splitByWeights(priceMinor > costMinor ? priceMinor - costMinor : 0n, weights);
  return costs.map((c, i) => ({ costMinor: c, priceMinor: c + (margins[i] ?? 0n) }));
}

/** Combined cargo of several parts. */
export function combineCargo(parts: readonly Cargo[]): Cargo {
  return parts.reduce(
    (a, p) => ({
      weightGrams: a.weightGrams + p.weightGrams,
      volumeLitres: a.volumeLitres + p.volumeLitres,
    }),
    { weightGrams: 0, volumeLitres: 0 },
  );
}
