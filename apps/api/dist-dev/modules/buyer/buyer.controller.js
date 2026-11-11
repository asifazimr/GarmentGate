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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BuyerDashboardSchema, ProductRequestResultSchema, ProductRequestSchema, SavedIndexSchema, ShortlistItemInputSchema, ShortlistNameSchema, ShortlistSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { BuyerContextService } from './buyer-context.service.js';
import { BuyerDashboardService } from './dashboard.service.js';
import { ProductRequestsService } from './product-requests.service.js';
import { ShortlistsService } from './shortlists.service.js';
let BuyerController = class BuyerController {
    context;
    shortlists;
    requests;
    dashboard;
    constructor(context, shortlists, requests, dashboard) {
        this.context = context;
        this.shortlists = shortlists;
        this.requests = requests;
        this.dashboard = dashboard;
    }
    async getDashboard(user) {
        return this.dashboard.get(await this.context.verified(user.id));
    }
    async request(user, id, dto) {
        return this.requests.create(await this.context.verified(user.id), id, dto);
    }
    async lists(user) {
        return this.shortlists.list(await this.context.verified(user.id));
    }
    async saved(user) {
        return this.shortlists.savedIndex(await this.context.verified(user.id));
    }
    async create(user, dto) {
        return this.shortlists.create(await this.context.verified(user.id), dto.name);
    }
    async rename(user, id, dto) {
        await this.shortlists.rename(await this.context.verified(user.id), id, dto.name);
    }
    async remove(user, id) {
        await this.shortlists.remove(await this.context.verified(user.id), id);
    }
    async addItem(user, id, dto) {
        await this.shortlists.addItem(await this.context.verified(user.id), id, dto);
    }
    async removeItem(user, id, dto) {
        await this.shortlists.removeItem(await this.context.verified(user.id), id, dto);
    }
};
__decorate([
    Get('buyer/dashboard'),
    ApiOkResponse({ standardSchema: BuyerDashboardSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "getDashboard", null);
__decorate([
    Post('catalog/products/:id/request'),
    ApiOperation({ summary: 'Request a quote or order a sample of a catalog product' }),
    ApiOkResponse({ standardSchema: ProductRequestResultSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(ProductRequestSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "request", null);
__decorate([
    Get('shortlists'),
    ApiOkResponse({ standardSchema: ShortlistSchema.array() }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "lists", null);
__decorate([
    Get('shortlists/saved'),
    ApiOperation({ summary: 'Which lists contain which products and factories (for heart buttons)' }),
    ApiOkResponse({ standardSchema: SavedIndexSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "saved", null);
__decorate([
    Post('shortlists'),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(ShortlistNameSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "create", null);
__decorate([
    Patch('shortlists/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(ShortlistNameSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "rename", null);
__decorate([
    Delete('shortlists/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "remove", null);
__decorate([
    Post('shortlists/:id/items'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(ShortlistItemInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "addItem", null);
__decorate([
    Post('shortlists/:id/items/remove'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(ShortlistItemInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerController.prototype, "removeItem", null);
BuyerController = __decorate([
    ApiTags('buyer'),
    ApiCookieAuth(),
    Roles('BUYER'),
    Controller(),
    __metadata("design:paramtypes", [BuyerContextService,
        ShortlistsService,
        ProductRequestsService,
        BuyerDashboardService])
], BuyerController);
export { BuyerController };
//# sourceMappingURL=buyer.controller.js.map