import type { ManufacturerSearchQuery, ProductSearchQuery } from '@garmentgate/shared';
export declare function productFilter(query: ProductSearchQuery): string[];
export declare function productSort(sort: ProductSearchQuery['sort']): string[] | undefined;
export declare function manufacturerFilter(query: ManufacturerSearchQuery): string[];
export declare function manufacturerSort(sort: ManufacturerSearchQuery['sort']): string[] | undefined;
