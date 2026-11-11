export const CAPACITY_ORDER_STATUSES = [
    'DEPOSIT_PENDING',
    'IN_PRODUCTION',
    'QC',
    'READY_TO_SHIP',
];
export function monthStart(month) {
    return new Date(`${month}-01T00:00:00Z`);
}
export function monthKey(date) {
    return date.toISOString().slice(0, 7);
}
export function addMonths(month, n) {
    const d = monthStart(month);
    d.setUTCMonth(d.getUTCMonth() + n);
    return monthKey(d);
}
export function buildCalendar(input) {
    const overrides = new Map(input.overrides.map((o) => [monthKey(o.month), o]));
    const booked = new Map();
    for (const order of input.orders) {
        if (!order.requestedShipDate)
            continue;
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
//# sourceMappingURL=capacity-calendar.js.map