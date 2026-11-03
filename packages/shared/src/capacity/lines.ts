/** ISO weekdays: 1 = Monday … 7 = Sunday. */
export const WEEKDAYS = [1, 2, 3, 4, 5, 6, 7] as const;
export type Weekday = (typeof WEEKDAYS)[number];

const DAY = 86_400_000;

/** "2026-11-03" → that day at 00:00 UTC. */
export const dateOnly = (iso: string): Date => new Date(`${iso.slice(0, 10)}T00:00:00Z`);
export const isoDate = (d: Date): string => d.toISOString().slice(0, 10);

/** ISO weekday (1–7) of a UTC date. */
export const isoWeekday = (d: Date): Weekday => (((d.getUTCDay() + 6) % 7) + 1) as Weekday;

/** Every date from start to end, inclusive (UTC). */
export function datesBetween(start: Date, end: Date): Date[] {
  const out: Date[] = [];
  for (let t = start.getTime(); t <= end.getTime(); t += DAY) out.push(new Date(t));
  return out;
}

/** Working days between two dates, inclusive. */
export function workingDayCount(start: Date, end: Date, workingDays: readonly number[]): number {
  return datesBetween(start, end).filter((d) => workingDays.includes(isoWeekday(d))).length;
}

/** The SAM minutes a line can offer between two dates: daily capacity × working days. */
export function slotCapacityMinutes(
  line: { dailySamMinutes: number; workingDays: readonly number[] },
  start: Date,
  end: Date,
): number {
  return line.dailySamMinutes * workingDayCount(start, end, line.workingDays);
}

/** Pieces a number of minutes makes at a given SAM per piece (rounded down). */
export function piecesFor(minutes: number, samPerPiece: number): number {
  return samPerPiece > 0 ? Math.floor(minutes / samPerPiece) : 0;
}
