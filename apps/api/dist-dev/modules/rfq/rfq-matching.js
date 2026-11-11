export const DEFAULT_WINDOW_DAYS = 90;
const DAY = 86_400_000;
export function matchRfq(factory, rfq) {
    const reasons = [];
    if (rfq.invited)
        reasons.push('INVITED');
    const category = factory.categories.some((c) => c.id === rfq.category.id || c.id === rfq.category.parentId || c.parentId === rfq.category.id);
    if (category)
        reasons.push('CATEGORY');
    const moq = factory.moqPcs === null || factory.moqPcs <= rfq.quantity;
    if (moq)
        reasons.push('MOQ');
    const end = rfq.requiredDeliveryDate?.getTime() ?? rfq.deadline.getTime() + DEFAULT_WINDOW_DAYS * DAY;
    const months = Math.max(1, Math.floor((end - rfq.deadline.getTime()) / (30 * DAY)));
    const capacity = factory.monthlyCapacityPcs === null || factory.monthlyCapacityPcs * months >= rfq.quantity;
    if (capacity)
        reasons.push('CAPACITY');
    const matched = rfq.invited || (!rfq.inviteOnly && category && moq && capacity);
    return { matched, reasons };
}
//# sourceMappingURL=rfq-matching.js.map