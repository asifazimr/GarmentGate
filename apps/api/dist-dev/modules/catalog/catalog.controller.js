var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CountryCodeSchema, PublicManufacturerSchema, ManufacturerSearchQuerySchema, ManufacturerSearchResultSchema, ProductSearchQuerySchema, ProductSearchResultSchema, PublicProductSchema, } from '@garmentgate/shared';
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
let CatalogController = class CatalogController {
    catalog;
    search;
    constructor(catalog, search) {
        this.catalog = catalog;
        this.search = search;
    }
    searchProducts(query) {
        return this.search.searchProducts(query);
    }
    searchManufacturers(query) {
        return this.search.searchManufacturers(query);
    }
    manufacturers(query) {
        return this.catalog.manufacturers(query);
    }
    manufacturer(code) {
        return this.catalog.manufacturer(code);
    }
    products(query) {
        return this.catalog.products(query);
    }
    product(id) {
        return this.catalog.product(id);
    }
};
__decorate([
    Get('catalog/search'),
    ApiOperation({ summary: 'Instant product search with filters, facets and sorting' }),
    ApiOkResponse({ standardSchema: ProductSearchResultSchema }),
    __param(0, Query(new ZodValidationPipe(ProductSearchQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "searchProducts", null);
__decorate([
    Get('catalog/manufacturers/search'),
    ApiOperation({ summary: 'Factory search (anonymised)' }),
    ApiOkResponse({ standardSchema: ManufacturerSearchResultSchema }),
    __param(0, Query(new ZodValidationPipe(ManufacturerSearchQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "searchManufacturers", null);
__decorate([
    Get('manufacturers'),
    ApiOperation({ summary: 'Verified factories, anonymised (public codes only)' }),
    ApiOkResponse({ standardSchema: PublicManufacturerSchema.array() }),
    __param(0, Query(new ZodValidationPipe(ManufacturerQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "manufacturers", null);
__decorate([
    Get('manufacturers/:code'),
    ApiOkResponse({ standardSchema: PublicManufacturerSchema }),
    __param(0, Param('code', new ZodValidationPipe(z.string().regex(/^MFR-[A-Z]{2}-\d{4,}$/)))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "manufacturer", null);
__decorate([
    Get('catalog/products'),
    ApiOkResponse({ standardSchema: PublicProductSchema.array() }),
    __param(0, Query(new ZodValidationPipe(ProductQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "products", null);
__decorate([
    Get('catalog/products/:id'),
    ApiOkResponse({ standardSchema: PublicProductSchema }),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CatalogController.prototype, "product", null);
CatalogController = __decorate([
    ApiTags('catalog'),
    ApiCookieAuth(),
    Roles('BUYER', 'ADMIN'),
    Controller(),
    __metadata("design:paramtypes", [CatalogService,
        SearchService])
], CatalogController);
export { CatalogController };
//# sourceMappingURL=catalog.controller.js.map