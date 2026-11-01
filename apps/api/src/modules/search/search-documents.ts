import type { PublicManufacturer, PublicProduct } from '@garmentgate/shared';

/*
 * Meilisearch documents. Built ONLY from public serializer output (already anonymised and
 * scrubbed) plus numeric/filter fields. Never pass a database row in here.
 * Indexes contain only anonymised, buyer-safe fields (CLAUDE.md).
 */

export const PRODUCTS_INDEX = 'products';
export const MANUFACTURERS_INDEX = 'manufacturers';

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
}

export const PRODUCT_DOCUMENT_KEYS: readonly (keyof ProductDocument)[] = [
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
  'createdAt',
];

export const MANUFACTURER_DOCUMENT_KEYS: readonly (keyof ManufacturerDocument)[] = [
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
];

export function productDocument(
  product: PublicProduct,
  extra: {
    /** Category slug plus its parent's, so filtering by "tops" finds t-shirts. */
    categorySlugs: string[];
    certifications: string[];
    performanceScore: number;
    createdAt: Date;
  },
): ProductDocument {
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
    createdAt: Math.floor(extra.createdAt.getTime() / 1000),
  };
}

export function manufacturerDocument(
  m: PublicManufacturer,
  parentSlugs: string[],
): ManufacturerDocument {
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
  };
}

export const PRODUCT_INDEX_SETTINGS = {
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
  searchableAttributes: ['publicCode', 'headline', 'categoryNames', 'machinery', 'about'],
  filterableAttributes: ['categories', 'country', 'certifications', 'moqPcs', 'monthlyCapacityPcs'],
  sortableAttributes: ['performanceScore', 'monthlyCapacityPcs', 'moqPcs'],
  typoTolerance: { enabled: true, minWordSizeForTypos: { oneTypo: 4, twoTypos: 8 } },
  pagination: { maxTotalHits: 2000 },
};
