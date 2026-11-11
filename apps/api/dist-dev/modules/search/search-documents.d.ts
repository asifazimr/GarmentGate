import type { PublicManufacturer, PublicProduct } from '@garmentgate/shared';
export declare const PRODUCTS_INDEX = "products";
export declare const MANUFACTURERS_INDEX = "manufacturers";
export interface ProductDocument {
    id: string;
    title: string;
    description: string | null;
    categories: string[];
    categoryName: string;
    fabric: string | null;
    composition: string | null;
    gsm: number | null;
    moqPcs: number;
    leadTimeDays: number;
    currency: string;
    minPrice: number;
    maxPrice: number;
    manufacturerCode: string;
    country: string;
    certifications: string[];
    performanceScore: number;
    searchBoost: number;
    createdAt: number;
}
export interface ManufacturerDocument {
    id: string;
    publicCode: string;
    headline: string | null;
    about: string | null;
    categories: string[];
    categoryNames: string[];
    machinery: string[];
    country: string;
    certifications: string[];
    moqPcs: number | null;
    monthlyCapacityPcs: number | null;
    performanceScore: number;
    searchBoost: number;
}
export declare const PRODUCT_DOCUMENT_KEYS: readonly (keyof ProductDocument)[];
export declare const MANUFACTURER_DOCUMENT_KEYS: readonly (keyof ManufacturerDocument)[];
export declare function productDocument(product: PublicProduct, extra: {
    categorySlugs: string[];
    certifications: string[];
    performanceScore: number;
    searchBoost: number;
    createdAt: Date;
}): ProductDocument;
export declare function manufacturerDocument(m: PublicManufacturer, parentSlugs: string[], searchBoost?: number): ManufacturerDocument;
export declare const PRODUCT_INDEX_SETTINGS: {
    rankingRules: string[];
    searchableAttributes: string[];
    filterableAttributes: string[];
    sortableAttributes: string[];
    typoTolerance: {
        enabled: boolean;
        minWordSizeForTypos: {
            oneTypo: number;
            twoTypos: number;
        };
    };
    pagination: {
        maxTotalHits: number;
    };
};
export declare const MANUFACTURER_INDEX_SETTINGS: {
    rankingRules: string[];
    searchableAttributes: string[];
    filterableAttributes: string[];
    sortableAttributes: string[];
    typoTolerance: {
        enabled: boolean;
        minWordSizeForTypos: {
            oneTypo: number;
            twoTypos: number;
        };
    };
    pagination: {
        maxTotalHits: number;
    };
};
