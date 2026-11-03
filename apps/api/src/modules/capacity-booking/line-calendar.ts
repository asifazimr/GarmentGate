import {
  datesBetween,
  dateOnly,
  isoDate,
  isoWeekday,
  type LineCalendarDay,
} from '@garmentgate/shared';

/** Splits `total` over `n` parts as evenly as integers allow (earlier parts get the remainder). */
export function spread(total: number, n: number): number[] {
  if (n <= 0) return [];
  const base = Math.floor(total / n);
  const extra = total - base * n;
  return Array.from({ length: n }, (_, i) => base + (i < extra ? 1 : 0));
}

export interface CalendarLine {
  dailySamMinutes: number;
  workingDays: readonly number[];
}

export interface CalendarSlot {
  id: string;
  startDate: Date;
  endDate: Date;
  totalMinutes: number;
  bookedMinutes: number;
  status: 'OPEN' | 'CLOSED';
}

/**
 * One line's days for the calendar: what it can make each day, what's open for booking and
 * what's booked. A slot's open and booked minutes are spread over its working days (bookings
 * reserve minutes in a window, not on a given day).
 */
export function lineCalendarDays(
  line: CalendarLine,
  slots: readonly CalendarSlot[],
  from: string,
  days: number,
): LineCalendarDay[] {
  const start = dateOnly(from);
  const end = new Date(start.getTime() + (days - 1) * 86_400_000);
  const perDay = new Map<string, { open: number; booked: number; slotId: string }>();
  for (const slot of slots) {
    if (slot.status !== 'OPEN') continue;
    const working = datesBetween(slot.startDate, slot.endDate).filter((d) =>
      line.workingDays.includes(isoWeekday(d)),
    );
    const open = spread(slot.totalMinutes, working.length);
    const booked = spread(slot.bookedMinutes, working.length);
    working.forEach((d, i) =>
      perDay.set(isoDate(d), { open: open[i] ?? 0, booked: booked[i] ?? 0, slotId: slot.id }),
    );
  }
  return datesBetween(start, end).map((d) => {
    const key = isoDate(d);
    const working = line.workingDays.includes(isoWeekday(d));
    const day = perDay.get(key);
    return {
      date: key,
      working,
      capacityMinutes: working ? line.dailySamMinutes : 0,
      openMinutes: day?.open ?? 0,
      bookedMinutes: day?.booked ?? 0,
      slotId: day?.slotId ?? null,
    };
  });
}
