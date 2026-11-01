import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CountryCodeSchema,
  type PublicManufacturer,
  PublicManufacturerSchema,
  type ManufacturerSearchQuery,
  ManufacturerSearchQuerySchema,
  type ManufacturerSearchResult,
  ManufacturerSearchResultSchema,
  type ProductSearchQuery,
  ProductSearchQuerySchema,
  type ProductSearchResult,
  ProductSearchResultSchema,
  type PublicProduct,
  PublicProductSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { Roles } from '../auth/auth.decorators.js';
import { SearchService } from '../search/search.service.js';
import { CatalogService } from './catalog.service.js';

const ManufacturerQuerySchema = z.object({
  category: z.string().max(80).optional(),
  country: CountryCodeSchema.optional(),
});
const ProductQuerySchema = z.object({
  category: z.string().max(80).optional(),
  manufacturer: z.string().max(20).optional(),
});

/** Anonymised catalog for buyers (and admins checking what buyers see). */
@ApiTags('catalog')
@ApiCookieAuth()
@Roles('BUYER', 'ADMIN')
@Controller()
export class CatalogController {
  constructor(
    private readonly catalog: CatalogService,
    private readonly search: SearchService,
  ) {}

  @Get('catalog/search')
  @ApiOperation({ summary: 'Instant product search with filters, facets and sorting' })
  @ApiOkResponse({ standardSchema: ProductSearchResultSchema })
  searchProducts(
    @Query(new ZodValidationPipe(ProductSearchQuerySchema)) query: ProductSearchQuery,
  ): Promise<ProductSearchResult> {
    return this.search.searchProducts(query);
  }

  @Get('catalog/manufacturers/search')
  @ApiOperation({ summary: 'Factory search (anonymised)' })
  @ApiOkResponse({ standardSchema: ManufacturerSearchResultSchema })
  searchManufacturers(
    @Query(new ZodValidationPipe(ManufacturerSearchQuerySchema)) query: ManufacturerSearchQuery,
  ): Promise<ManufacturerSearchResult> {
    return this.search.searchManufacturers(query);
  }

  @Get('manufacturers')
  @ApiOperation({ summary: 'Verified factories, anonymised (public codes only)' })
  @ApiOkResponse({ standardSchema: PublicManufacturerSchema.array() })
  manufacturers(
    @Query(new ZodValidationPipe(ManufacturerQuerySchema))
    query: z.output<typeof ManufacturerQuerySchema>,
  ): Promise<PublicManufacturer[]> {
    return this.catalog.manufacturers(query);
  }

  @Get('manufacturers/:code')
  @ApiOkResponse({ standardSchema: PublicManufacturerSchema })
  manufacturer(
    @Param('code', new ZodValidationPipe(z.string().regex(/^MFR-[A-Z]{2}-\d{4,}$/))) code: string,
  ): Promise<PublicManufacturer> {
    return this.catalog.manufacturer(code);
  }

  @Get('catalog/products')
  @ApiOkResponse({ standardSchema: PublicProductSchema.array() })
  products(
    @Query(new ZodValidationPipe(ProductQuerySchema)) query: z.output<typeof ProductQuerySchema>,
  ): Promise<PublicProduct[]> {
    return this.catalog.products(query);
  }

  @Get('catalog/products/:id')
  @ApiOkResponse({ standardSchema: PublicProductSchema })
  product(@Param('id', ParseUUIDPipe) id: string): Promise<PublicProduct> {
    return this.catalog.product(id);
  }
}
