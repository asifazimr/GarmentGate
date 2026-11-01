import type { CapacityMonth } from '@garmentgate/shared';

/** Orders that still occupy factory capacity. */
export const CAPACITY_ORDER_STATUSES = [
  'PENDING_DEPOSIT',
  'CONFIRMED',
  'IN_PRODUCTION',
  'QUALITY_CHECK',
  'READY_TO_SHIP',
] as const;

export interface CapacityOverride {
  month: Date;
  availablePcs: number | null;
  externalBookedPcs: number;
  note: string | null;
}

export interface CapacityOrder {
  quantity: number;
  requestedShipDate: Date | null;
}

/** "2026-11" → first day of that month, UTC. */
export function monthStart(month: string): Date {
  return new Date(`${month}-01T00:00:00Z`);
}

export function monthKey(date: Date): string {
  return date.toISOString().slice(0, 7);
}

export function addMonths(month: string, n: number): string {
  const d = monthStart(month);
  d.setUTCMonth(d.getUTCMonth() + n);
  return monthKey(d);
}

/**
 * Builds `count` consecutive months starting at `from`. Available capacity is the month's
 * override or the profile default; platform bookings are active orders counted in the month
 * they are due to ship.
 */
export function buildCalendar(input: {
  from: string;
  count: number;
  defaultCapacity: number | null;
  overrides: CapacityOverride[];
  orders: CapacityOrder[];
}): CapacityMonth[] {
  const overrides = new Map(input.overrides.map((o) => [monthKey(o.month), o]));
  const booked = new Map<string, number>();
  for (const order of input.orders) {
    if (!order.requestedShipDate) continue;
    const key = monthKey(order.requestedShipDate);
    booked.set(key, (booked.get(key) ?? 0) + order.quantity);
  }

  return Array.from({ length: input.count }, (_, i) => {
    const month = addMonths(input.from, i);
    const override = overrides.get(month);
    return {
      month,
      availablePcs: override?.availablePcs ?? input.defaultCapacity ?? 0,
      isOverride: override?.availablePcs !== null && override?.availablePcs !== undefined,
      platformBookedPcs: booked.get(month) ?? 0,
      externalBookedPcs: override?.externalBookedPcs ?? 0,
      note: override?.note ?? null,
    };
  });
}
