export interface MarginRuleLike {
    id: string;
    markupBps: number;
    minMarginPerUnitMinor: number | null;
    categoryId: string | null;
    companyId: string | null;
}
export declare function pickCatalogRule<R extends MarginRuleLike>(rules: R[], category: {
    id: string;
    parentId: string | null;
}): R | null;
export declare function pickQuoteRule<R extends MarginRuleLike>(rules: R[], category: {
    id: string;
    parentId: string | null;
}, buyerCompanyId: string): R | null;
export declare function applyMarkup(manufacturerUnitPriceMinor: number, rule: MarginRuleLike | null, discountBps?: number): number;
