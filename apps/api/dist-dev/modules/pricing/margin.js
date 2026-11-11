export function pickCatalogRule(rules, category) {
    return mostSpecific(rules.filter((r) => r.companyId === null), category);
}
export function pickQuoteRule(rules, category, buyerCompanyId) {
    return (mostSpecific(rules.filter((r) => r.companyId === buyerCompanyId), category) ?? pickCatalogRule(rules, category));
}
function mostSpecific(rules, category) {
    return (rules.find((r) => r.categoryId === category.id) ??
        (category.parentId ? rules.find((r) => r.categoryId === category.parentId) : undefined) ??
        rules.find((r) => r.categoryId === null) ??
        null);
}
export function applyMarkup(manufacturerUnitPriceMinor, rule, discountBps = 0) {
    if (!rule)
        return manufacturerUnitPriceMinor;
    const markupBps = Math.max(0, rule.markupBps - discountBps);
    const marked = Math.round((manufacturerUnitPriceMinor * (10_000 + markupBps)) / 10_000);
    const floor = manufacturerUnitPriceMinor + (rule.minMarginPerUnitMinor ?? 0);
    return Math.max(marked, floor);
}
//# sourceMappingURL=margin.js.map