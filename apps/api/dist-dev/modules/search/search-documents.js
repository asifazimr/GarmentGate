export const PRODUCTS_INDEX = 'products';
export const MANUFACTURERS_INDEX = 'manufacturers';
export const PRODUCT_DOCUMENT_KEYS = [
    'id',
    'title',
    'description',
    'categories',
    'categoryName',
    'fabric',
    'composition',
    'gsm',
    'moqPcs',
    'leadTimeDays',
    'currency',
    'minPrice',
    'maxPrice',
    'manufacturerCode',
    'country',
    'certifications',
    'performanceScore',
    'searchBoost',
    'createdAt',
];
export const MANUFACTURER_DOCUMENT_KEYS = [
    'id',
    'publicCode',
    'headline',
    'about',
    'categories',
    'categoryNames',
    'machinery',
    'country',
    'certifications',
    'moqPcs',
    'monthlyCapacityPcs',
    'performanceScore',
    'searchBoost',
];
export function productDocument(product, extra) {
    const prices = product.priceTiers.map((t) => t.unitPriceMinor);
    return {
        id: product.id,
        title: product.title,
        description: product.description,
        categories: [...new Set(extra.categorySlugs)],
        categoryName: product.category.name,
        fabric: product.fabric,
        composition: product.composition,
        gsm: product.gsm,
        moqPcs: product.moqPcs,
        leadTimeDays: product.leadTimeDays,
        currency: product.currency,
        minPrice: prices.length > 0 ? Math.min(...prices) : 0,
        maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
        manufacturerCode: product.manufacturerCode,
        country: product.country,
        certifications: [...new Set(extra.certifications)],
        performanceScore: extra.performanceScore,
        searchBoost: extra.searchBoost,
        createdAt: Math.floor(extra.createdAt.getTime() / 1000),
    };
}
export function manufacturerDocument(m, parentSlugs, searchBoost = 0) {
    return {
        id: m.publicCode,
        publicCode: m.publicCode,
        headline: m.headline,
        about: m.about,
        categories: [...new Set([...m.categories.map((c) => c.slug), ...parentSlugs])],
        categoryNames: m.categories.map((c) => c.name),
        machinery: m.capabilities.machinery.map((x) => x.type),
        country: m.country,
        certifications: [...new Set(m.certifications.map((c) => c.type))],
        moqPcs: m.capabilities.moqPcs,
        monthlyCapacityPcs: m.capabilities.monthlyCapacityPcs,
        performanceScore: m.scores.performanceScore,
        searchBoost,
    };
}
const RANKING_RULES = [
    'words',
    'typo',
    'proximity',
    'attribute',
    'sort',
    'searchBoost:desc',
    'exactness',
];
export const PRODUCT_INDEX_SETTINGS = {
    rankingRules: RANKING_RULES,
    searchableAttributes: [
        'title',
        'categoryName',
        'fabric',
        'composition',
        'description',
        'manufacturerCode',
    ],
    filterableAttributes: [
        'categories',
        'fabric',
        'country',
        'certifications',
        'gsm',
        'moqPcs',
        'minPrice',
        'leadTimeDays',
        'currency',
        'manufacturerCode',
    ],
    sortableAttributes: ['minPrice', 'moqPcs', 'leadTimeDays', 'performanceScore', 'createdAt'],
    typoTolerance: { enabled: true, minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 } },
    pagination: { maxTotalHits: 2000 },
};
export const MANUFACTURER_INDEX_SETTINGS = {
    rankingRules: RANKING_RULES,
    searchableAttributes: ['publicCode', 'headline', 'categoryNames', 'machinery', 'about'],
    filterableAttributes: ['categories', 'country', 'certifications', 'moqPcs', 'monthlyCapacityPcs'],
    sortableAttributes: ['performanceScore', 'monthlyCapacityPcs', 'moqPcs'],
    typoTolerance: { enabled: true, minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 } },
    pagination: { maxTotalHits: 2000 },
};
//# sourceMappingURL=search-documents.js.map