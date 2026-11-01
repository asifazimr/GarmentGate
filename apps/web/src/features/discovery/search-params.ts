import { ProductSortSchema } from '@garmentgate/shared';
import { parseAsArrayOf, parseAsInteger, parseAsString, parseAsStringLiteral } from 'nuqs';

/**
 * Search state lives in the URL, so results can be shared, bookmarked and restored with Back.
 * Prices are integer minor units of USD, like the API.
 */
export const searchParsers = {
  q: parseAsString.withDefault(''),
  category: parseAsArrayOf(parseAsString).withDefault([]),
  fabric: parseAsArrayOf(parseAsString).withDefault([]),
  country: parseAsArrayOf(parseAsString).withDefault([]),
  cert: parseAsArrayOf(parseAsString).withDefault([]),
  gsmMin: parseAsInteger,
  gsmMax: parseAsInteger,
  moqMin: parseAsInteger,
  moqMax: parseAsInteger,
  priceMin: parseAsInteger,
  priceMax: parseAsInteger,
  leadTimeMax: parseAsInteger,
  sort: parseAsStringLiteral(ProductSortSchema.options).withDefault('relevance'),
  view: parseAsStringLiteral(['grid', 'list'] as const).withDefault('grid'),
  page: parseAsInteger.withDefault(1),
};

export const FILTER_KEYS = [
  'category',
  'fabric',
  'country',
  'cert',
  'gsmMin',
  'gsmMax',
  'moqMin',
  'moqMax',
  'priceMin',
  'priceMax',
  'leadTimeMax',
] as const;

export const PAGE_SIZE = 24;
export const SEARCH_CURRENCY = 'USD';
