import { type PublicManufacturer, type ManufacturerSearchQuery, type ManufacturerSearchResult, type ProductSearchQuery, type ProductSearchResult, type PublicProduct } from '@garmentgate/shared';
import { z } from 'zod';
import { SearchService } from '../search/search.service.js';
import { CatalogService } from './catalog.service.js';
declare const ManufacturerQuerySchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const ProductQuerySchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodString>;
    manufacturer: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare class CatalogController {
    private readonly catalog;
    private readonly search;
    constructor(catalog: CatalogService, search: SearchService);
    searchProducts(query: ProductSearchQuery): Promise<ProductSearchResult>;
    searchManufacturers(query: ManufacturerSearchQuery): Promise<ManufacturerSearchResult>;
    manufacturers(query: z.output<typeof ManufacturerQuerySchema>): Promise<PublicManufacturer[]>;
    manufacturer(code: string): Promise<PublicManufacturer>;
    products(query: z.output<typeof ProductQuerySchema>): Promise<PublicProduct[]>;
    product(id: string): Promise<PublicProduct>;
}
export {};
