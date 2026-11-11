import { datesBetween, dateOnly, isoDate, isoWeekday, } from '@garmentgate/shared';
export function spread(total, n) {
    if (n <= 0)
        return [];
    const base = Math.floor(total / n);
    const extra = total - base * n;
    return Array.from({ length: n }, (_, i) => base + (i < extra ? 1 : 0));
}
export function lineCalendarDays(line, slots, from, days) {
    const start = dateOnly(from);
    const end = new Date(start.getTime() + (days - 1) * 86_400_000);
    const perDay = new Map();
    for (const slot of slots) {
        if (slot.status !== 'OPEN')
            continue;
        const working = datesBetween(slot.startDate, slot.endDate).filter((d) => line.workingDays.includes(isoWeekday(d)));
        const open = spread(slot.totalMinutes, working.length);
        const booked = spread(slot.bookedMinutes, working.length);
        working.forEach((d, i) => perDay.set(isoDate(d), { open: open[i] ?? 0, booked: booked[i] ?? 0, slotId: slot.id }));
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
//# sourceMappingURL=line-calendar.js.map