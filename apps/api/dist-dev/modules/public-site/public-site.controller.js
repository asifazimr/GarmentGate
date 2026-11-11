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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AdminLeadSchema, LeadInputSchema, PublicDirectorySchema, PublicPricingSchema, PublicStatsSchema, UpdateLeadSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Public, Roles } from '../auth/auth.decorators.js';
import { PublicSiteService } from './public-site.service.js';
let PublicSiteController = class PublicSiteController {
    site;
    constructor(site) {
        this.site = site;
    }
    stats() {
        return this.site.publicStats();
    }
    pricing() {
        return this.site.publicPricing();
    }
    directory() {
        return this.site.directory();
    }
    async lead(dto) {
        await this.site.createLead(dto);
    }
};
__decorate([
    Get('public/stats'),
    Public(),
    ApiOkResponse({ standardSchema: PublicStatsSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicSiteController.prototype, "stats", null);
__decorate([
    Get('public/pricing'),
    Public(),
    ApiOkResponse({ standardSchema: PublicPricingSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicSiteController.prototype, "pricing", null);
__decorate([
    Get('public/directory'),
    Public(),
    ApiOkResponse({ standardSchema: PublicDirectorySchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PublicSiteController.prototype, "directory", null);
__decorate([
    Post('leads'),
    Public(),
    Throttle({ default: { limit: 5, ttl: 10 * 60_000 } }),
    ApiOperation({ summary: 'Send an enquiry from the public website' }),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, Body(new ZodValidationPipe(LeadInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PublicSiteController.prototype, "lead", null);
PublicSiteController = __decorate([
    ApiTags('public'),
    Controller(),
    __metadata("design:paramtypes", [PublicSiteService])
], PublicSiteController);
export { PublicSiteController };
let AdminLeadsController = class AdminLeadsController {
    site;
    constructor(site) {
        this.site = site;
    }
    list() {
        return this.site.leads();
    }
    async update(user, id, dto) {
        await this.site.updateLead(user.id, id, dto);
    }
};
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: AdminLeadSchema.array() }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLeadsController.prototype, "list", null);
__decorate([
    Patch(':id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(z.uuid()))),
    __param(2, Body(new ZodValidationPipe(UpdateLeadSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLeadsController.prototype, "update", null);
AdminLeadsController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Controller('admin/leads'),
    Roles('ADMIN'),
    __metadata("design:paramtypes", [PublicSiteService])
], AdminLeadsController);
export { AdminLeadsController };
//# sourceMappingURL=public-site.controller.js.map