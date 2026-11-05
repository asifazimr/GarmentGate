/**
 * Landed cost ESTIMATES: goods + freight + insurance + import duty. Duty is on the CIF value,
 * except in countries that value imports FOB (goods only). Real duty depends on the customs
 * ruling, trade agreements and local taxes, which the UI says.
 */

/** Countries that charge duty on the FOB value rather than CIF. */
export const FOB_VALUATION_COUNTRIES: readonly string[] = ['US', 'CA', 'AU', 'NZ'];

export interface DutyRateLike {
  hsPrefix: string;
  destinationCountry: string;
  rateBps: number;
}

/** The longest HS prefix matching `hsCode` for the country, or null if none is on file. */
export function dutyRateFor<R extends DutyRateLike>(
  rates: readonly R[],
  hsCode: string,
  destinationCountry: string,
): R | null {
  let best: R | null = null;
  for (const r of rates) {
    if (r.destinationCountry !== destinationCountry || !hsCode.startsWith(r.hsPrefix)) continue;
    if (!best || r.hsPrefix.length > best.hsPrefix.length) best = r;
  }
  return best;
}

export interface LandedCost {
  goodsMinor: bigint;
  freightMinor: bigint;
  insuranceMinor: bigint;
  /** What duty is charged on (CIF or FOB). */
  customsValueMinor: bigint;
  valuation: 'CIF' | 'FOB';
  dutyRateBps: number | null;
  dutyMinor: bigint;
  totalMinor: bigint;
}

export function landedCost(input: {
  goodsMinor: bigint;
  freightMinor: bigint;
  insuranceMinor: bigint;
  dutyRateBps: number | null;
  destinationCountry: string;
}): LandedCost {
  const valuation = FOB_VALUATION_COUNTRIES.includes(input.destinationCountry) ? 'FOB' : 'CIF';
  const customsValue =
    valuation === 'FOB'
      ? input.goodsMinor
      : input.goodsMinor + input.freightMinor + input.insuranceMinor;
  const duty =
    input.dutyRateBps === null ? 0n : (customsValue * BigInt(input.dutyRateBps) + 9_999n) / 10_000n;
  return {
    goodsMinor: input.goodsMinor,
    freightMinor: input.freightMinor,
    insuranceMinor: input.insuranceMinor,
    customsValueMinor: customsValue,
    valuation,
    dutyRateBps: input.dutyRateBps,
    dutyMinor: duty,
    totalMinor: input.goodsMinor + input.freightMinor + input.insuranceMinor + duty,
  };
}
