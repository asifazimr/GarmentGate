import { dateOnly, isoDate } from './lines.js';

const DAY = 86_400_000;

/** A step of the cancellation policy: cancelling at least `minDaysBefore` days ahead refunds `refundBps`. */
export interface CancellationTier {
  minDaysBefore: number;
  refundBps: number;
}

export interface CapacityBookingSettings {
  /** GarmentGate's fee on top of the factory's CM rate (800 = 8%). */
  bookingFeeBps: number;
  /** Part of the buyer amount paid up front into escrow. */
  depositBps: number;
  /** How long a hold lasts before it expires and the minutes go back. */
  holdHours: number;
  /** Remind the buyer (and the factory, if it hasn't answered) this long before a hold expires. */
  reminderHours: number;
  /** Convert to an order at least this many days before production starts. */
  convertLeadDays: number;
  /** Highest `minDaysBefore` first; the last tier starts at 0 days. */
  cancellationTiers: CancellationTier[];
  /** The factory's share of a deposit kept on cancellation; GarmentGate keeps the rest. */
  factoryShareBps: number;
}

export const DEFAULT_CAPACITY_BOOKING_SETTINGS: CapacityBookingSettings = {
  bookingFeeBps: 800,
  depositBps: 3000,
  holdHours: 48,
  reminderHours: 12,
  convertLeadDays: 7,
  cancellationTiers: [
    { minDaysBefore: 30, refundBps: 10_000 },
    { minDaysBefore: 14, refundBps: 5_000 },
    { minDaysBefore: 0, refundBps: 0 },
  ],
  factoryShareBps: 5_000,
};

const ceilDiv = (a: bigint, b: bigint): bigint => (a + b - 1n) / b;

/** The buyer's rate per 100 minutes: the factory's rate plus the booking fee, rounded up. */
export function buyerRateFor(factoryRateMinorPer100Min: number, feeBps: number): number {
  return Number(ceilDiv(BigInt(factoryRateMinorPer100Min) * BigInt(10_000 + feeBps), 10_000n));
}

/** minutes × rate per 100 minutes, rounded up to a whole minor unit. */
export function amountForMinutes(minutes: number, ratePer100Min: number): bigint {
  return ceilDiv(BigInt(minutes) * BigInt(ratePer100Min), 100n);
}

export interface BookingPrice {
  buyerRateMinorPer100Min: number;
  factoryAmountMinor: bigint;
  buyerAmountMinor: bigint;
  depositMinor: bigint;
}

/**
 * What a booking costs. The buyer amount is never below the factory amount (the fee is never
 * negative) and the deposit is at least one minor unit and never above the buyer amount.
 */
export function bookingPrice(input: {
  minutes: number;
  factoryRateMinorPer100Min: number;
  feeBps: number;
  depositBps: number;
}): BookingPrice {
  const buyerRate = buyerRateFor(input.factoryRateMinorPer100Min, input.feeBps);
  const factoryAmount = amountForMinutes(input.minutes, input.factoryRateMinorPer100Min);
  const buyerAmount = amountForMinutes(input.minutes, buyerRate);
  const deposit = ceilDiv(buyerAmount * BigInt(input.depositBps), 10_000n);
  return {
    buyerRateMinorPer100Min: buyerRate,
    factoryAmountMinor: factoryAmount,
    buyerAmountMinor: buyerAmount,
    depositMinor: deposit < 1n ? 1n : deposit > buyerAmount ? buyerAmount : deposit,
  };
}

/** SAM per piece in hundredths of a minute (12.5 → 1250). */
export const samToCenti = (samPerPiece: number): number => Math.round(samPerPiece * 100);
export const centiToSam = (centi: number): number => centi / 100;

/** Minutes needed for `pieces` at `samCenti` hundredths of a minute each, rounded up. */
export function minutesForPieces(pieces: number, samCenti: number): number {
  return Number(ceilDiv(BigInt(pieces) * BigInt(samCenti), 100n));
}

/** Whole pieces that fit in `minutes`. */
export function piecesForMinutes(minutes: number, samCenti: number): number {
  return samCenti > 0 ? Math.floor((minutes * 100) / samCenti) : 0;
}

/** Unit price of a CMT order: SAM per piece × rate per 100 minutes, rounded up. */
export function cmtUnitPrice(samCenti: number, ratePer100Min: number): number {
  return Number(ceilDiv(BigInt(samCenti) * BigInt(ratePer100Min), 10_000n));
}

/** Whole days from `today` until `start` (negative once it has started). Both ISO dates. */
export function daysUntil(start: string, today: string): number {
  return Math.round((dateOnly(start).getTime() - dateOnly(today).getTime()) / DAY);
}

/** The tier that applies `daysBefore` days ahead (the last tier when it has already started). */
export function tierFor(tiers: readonly CancellationTier[], daysBefore: number): CancellationTier {
  const sorted = [...tiers].sort((a, b) => b.minDaysBefore - a.minDaysBefore);
  return (
    sorted.find((t) => daysBefore >= t.minDaysBefore) ??
    sorted.at(-1) ?? { minDaysBefore: 0, refundBps: 0 }
  );
}

export interface CancellationSplit {
  refundMinor: bigint;
  factoryMinor: bigint;
  platformMinor: bigint;
}

/**
 * How a paid deposit is shared when the buyer cancels a confirmed booking: the tier's refund to
 * the buyer, then the kept part split between the factory (its share, rounded down) and
 * GarmentGate. The three parts always add up to what was paid.
 */
export function cancellationSplit(input: {
  paidMinor: bigint;
  daysBefore: number;
  tiers: readonly CancellationTier[];
  factoryShareBps: number;
}): CancellationSplit {
  const tier = tierFor(input.tiers, input.daysBefore);
  const refund = (input.paidMinor * BigInt(tier.refundBps)) / 10_000n;
  const kept = input.paidMinor - refund;
  const factory = (kept * BigInt(input.factoryShareBps)) / 10_000n;
  return { refundMinor: refund, factoryMinor: factory, platformMinor: kept - factory };
}

/** Everything back to the buyer: expiry, a factory decline, staff cancelling, or a hold dropped. */
export const fullRefund = (paidMinor: bigint): CancellationSplit => ({
  refundMinor: paidMinor,
  factoryMinor: 0n,
  platformMinor: 0n,
});

/** The calendar months of a partnership: first and last day of each. */
export function partnershipMonths(
  startMonth: string,
  months: number,
): { start: string; end: string }[] {
  const first = dateOnly(`${startMonth.slice(0, 7)}-01`);
  return Array.from({ length: months }, (_, i) => {
    const start = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + i, 1));
    const end = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + i + 1, 0));
    return { start: isoDate(start), end: isoDate(end) };
  });
}

/**
 * When the deposit for one partnership month is due: two weeks before the month starts, but
 * never sooner than a normal hold from now.
 */
export function partnershipDepositDue(monthStart: string, now: Date, holdHours: number): Date {
  const due = dateOnly(monthStart).getTime() - 14 * DAY;
  return new Date(Math.max(due, now.getTime() + holdHours * 3_600_000));
}
