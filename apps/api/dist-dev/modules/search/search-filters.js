const q = (value) => JSON.stringify(value);
const anyOf = (field, values) => values && values.length > 0 ? `${field} IN [${values.map(q).join(', ')}]` : null;
export function productFilter(query) {
    const filters = [
        anyOf('categories', query.category),
        anyOf('fabric', query.fabric),
        anyOf('country', query.country),
        ...(query.cert ?? []).map((c) => `certifications = ${q(c)}`),
        query.gsmMin !== undefined ? `gsm >= ${String(query.gsmMin)}` : null,
        query.gsmMax !== undefined ? `gsm <= ${String(query.gsmMax)}` : null,
        query.moqMin !== undefined ? `moqPcs >= ${String(query.moqMin)}` : null,
        query.moqMax !== undefined ? `moqPcs <= ${String(query.moqMax)}` : null,
        query.leadTimeMax !== undefined ? `leadTimeDays <= ${String(query.leadTimeMax)}` : null,
    ];
    if (query.priceMin !== undefined || query.priceMax !== undefined) {
        filters.push(`currency = ${q(query.currency)}`);
        if (query.priceMin !== undefined)
            filters.push(`minPrice >= ${String(query.priceMin)}`);
        if (query.priceMax !== undefined)
            filters.push(`minPrice <= ${String(query.priceMax)}`);
    }
    return filters.filter((f) => f !== null);
}
export function productSort(sort) {
    switch (sort) {
        case 'price_asc':
            return ['minPrice:asc'];
        case 'price_desc':
            return ['minPrice:desc'];
        case 'moq_asc':
            return ['moqPcs:asc'];
        case 'lead_time_asc':
            return ['leadTimeDays:asc'];
        case 'score_desc':
            return ['performanceScore:desc'];
        case 'newest':
            return ['createdAt:desc'];
        default:
            return undefined;
    }
}
export function manufacturerFilter(query) {
    return [
        anyOf('categories', query.category),
        anyOf('country', query.country),
        ...(query.cert ?? []).map((c) => `certifications = ${q(c)}`),
        query.moqMax !== undefined ? `moqPcs <= ${String(query.moqMax)}` : null,
    ].filter((f) => f !== null);
}
export function manufacturerSort(sort) {
    switch (sort) {
        case 'score_desc':
            return ['performanceScore:desc'];
        case 'capacity_desc':
            return ['monthlyCapacityPcs:desc'];
        case 'moq_asc':
            return ['moqPcs:asc'];
        default:
            return undefined;
    }
}
//# sourceMappingURL=search-filters.js.map