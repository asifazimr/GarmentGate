/**
 * GarmentGate's commission: a share of the factory total withheld from the factory's payouts,
 * on top of the markup the buyer pays. Platform revenue on an order = markup + commission.
 */
export interface CommissionRule {
  commissionBps: number;
  repeatCommissionBps: number | null;
}

/** The rate for an order: the repeat rate when the buyer has ordered from this factory before. */
export function commissionRate(rule: CommissionRule | null, repeat: boolean): number {
  if (!rule) return 0;
  return repeat && rule.repeatCommissionBps !== null
    ? Math.min(rule.repeatCommissionBps, rule.commissionBps)
    : rule.commissionBps;
}

/** Commission in minor units, rounded half up, never more than the factory total. */
export function commissionAmount(manufacturerTotalMinor: bigint, bps: number): bigint {
  if (bps <= 0 || manufacturerTotalMinor <= 0n) return 0n;
  const amount = (manufacturerTotalMinor * BigInt(bps) + 5_000n) / 10_000n;
  return amount > manufacturerTotalMinor ? manufacturerTotalMinor : amount;
}
