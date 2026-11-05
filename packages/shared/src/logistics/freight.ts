/**
 * Freight arithmetic, all in integers: weights in grams, volumes in litres (1 CBM = 1,000 L),
 * money in minor units. Quantities are in thousandths of the rate's unit so nothing is rounded
 * until the price.
 */

export const LOGISTICS_MODES = [
  'SAMPLE_COURIER',
  'DOMESTIC',
  'SEA_FCL',
  'SEA_LCL',
  'AIR',
  'DDP',
] as const;
export type LogisticsModeValue = (typeof LOGISTICS_MODES)[number];
export const RATE_UNITS = ['PER_KG', 'PER_CBM', 'PER_CONTAINER', 'FLAT'] as const;
export type RateUnitValue = (typeof RATE_UNITS)[number];
export const CONTAINER_TYPES = ['GP20', 'GP40', 'HC40'] as const;
export type ContainerTypeValue = (typeof CONTAINER_TYPES)[number];

/** Volumetric weight: kg charged per CBM (air 1:6000 → 167, courier 1:5000 → 200). */
export const VOLUMETRIC_KG_PER_CBM: Record<LogisticsModeValue, number> = {
  AIR: 167,
  DDP: 167,
  SAMPLE_COURIER: 200,
  DOMESTIC: 250,
  SEA_LCL: 1000,
  SEA_FCL: 1000,
};

/** Usable volume per container, in CBM (what a garment load realistically fits). */
export const CONTAINER_CBM: Record<ContainerTypeValue, number> = { GP20: 28, GP40: 58, HC40: 68 };

/** LCL is charged for at least one CBM. */
const LCL_MIN_MILLI = 1000;

export interface Cargo {
  weightGrams: number;
  volumeLitres: number;
}

const ceilDiv = (a: bigint, b: bigint): bigint => (a + b - 1n) / b;

/** Volumetric grams of a cargo for a mode. */
export function volumetricGrams(mode: LogisticsModeValue, volumeLitres: number): number {
  // litres / 1000 CBM × kg/CBM × 1000 g/kg = litres × kg/CBM
  return volumeLitres * VOLUMETRIC_KG_PER_CBM[mode];
}

/** Chargeable weight in grams: the greater of actual and volumetric. */
export function chargeableGrams(mode: LogisticsModeValue, cargo: Cargo): number {
  return Math.max(cargo.weightGrams, volumetricGrams(mode, cargo.volumeLitres));
}

/**
 * How many units the rate is applied to, in thousandths:
 * PER_KG chargeable kg; PER_CBM the greater of CBM and tonnes (W/M, at least 1 CBM for LCL);
 * PER_CONTAINER whole containers; FLAT one.
 */
export function chargeableMilliUnits(
  unit: RateUnitValue,
  mode: LogisticsModeValue,
  cargo: Cargo,
  containerType: ContainerTypeValue | null = null,
): number {
  switch (unit) {
    case 'PER_KG':
      return chargeableGrams(mode, cargo);
    case 'PER_CBM': {
      const wm = Math.max(cargo.volumeLitres, Math.ceil(cargo.weightGrams / 1000));
      return mode === 'SEA_LCL' ? Math.max(wm, LCL_MIN_MILLI) : wm;
    }
    case 'PER_CONTAINER': {
      const capacity = CONTAINER_CBM[containerType ?? 'GP40'] * 1000;
      return Math.max(1, Math.ceil(cargo.volumeLitres / capacity)) * 1000;
    }
    case 'FLAT':
      return 1000;
  }
}

export interface RateLike {
  unit: RateUnitValue;
  containerType: ContainerTypeValue | null;
  costMinor: number;
  minChargeMinor: number;
}

/** What the partner charges GarmentGate for this cargo: units × cost, never below the minimum. */
export function freightCost(rate: RateLike, mode: LogisticsModeValue, cargo: Cargo): bigint {
  const milli = chargeableMilliUnits(rate.unit, mode, cargo, rate.containerType);
  const cost = ceilDiv(BigInt(milli) * BigInt(rate.costMinor), 1000n);
  const min = BigInt(rate.minChargeMinor);
  return cost > min ? cost : min;
}

export interface LogisticsMarginRuleLike {
  mode: LogisticsModeValue | null;
  originCountry: string | null;
  destinationCountry: string | null;
  markupBps: number;
  minMarginMinor: number;
  active: boolean;
}

/**
 * The most specific active rule for a route: mode counts most, then destination, then origin.
 * A rule only applies if every field it sets matches.
 */
export function pickLogisticsMarginRule<R extends LogisticsMarginRuleLike>(
  rules: readonly R[],
  route: { mode: LogisticsModeValue; originCountry: string; destinationCountry: string },
): R | null {
  let best: R | null = null;
  let bestScore = -1;
  for (const r of rules) {
    if (!r.active) continue;
    if (r.mode !== null && r.mode !== route.mode) continue;
    if (r.originCountry !== null && r.originCountry !== route.originCountry) continue;
    if (r.destinationCountry !== null && r.destinationCountry !== route.destinationCountry)
      continue;
    const score =
      (r.mode !== null ? 4 : 0) +
      (r.destinationCountry !== null ? 2 : 0) +
      (r.originCountry !== null ? 1 : 0);
    if (score > bestScore) {
      best = r;
      bestScore = score;
    }
  }
  return best;
}

/** Buyer price for freight: cost plus markup (rounded up), and at least the minimum margin. */
export function applyLogisticsMargin(
  costMinor: bigint,
  rule: Pick<LogisticsMarginRuleLike, 'markupBps' | 'minMarginMinor'> | null,
): bigint {
  if (!rule) return costMinor;
  const marked = ceilDiv(costMinor * BigInt(10_000 + rule.markupBps), 10_000n);
  const floor = costMinor + BigInt(rule.minMarginMinor);
  return marked > floor ? marked : floor;
}

/** Cargo is insured for 110% of its CIF value (the usual marine-cargo basis). */
export function insuredValue(cifMinor: bigint): bigint {
  return ceilDiv(cifMinor * 11n, 10n);
}

/** Premium: insured value × rate, never below the minimum. */
export function insurancePremium(
  insuredValueMinor: bigint,
  rateBps: number,
  minPremiumMinor: number,
): bigint {
  const premium = ceilDiv(insuredValueMinor * BigInt(rateBps), 10_000n);
  const min = BigInt(minPremiumMinor);
  return premium > min ? premium : min;
}
