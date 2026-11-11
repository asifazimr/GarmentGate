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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, Put, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MarginRuleInputSchema, MarginRuleSchema, RepriceQuoteSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { AdminMarginsService } from './admin-margins.service.js';
let AdminMarginsController = class AdminMarginsController {
    margins;
    constructor(margins) {
        this.margins = margins;
    }
    list() {
        return this.margins.list();
    }
    create(admin, dto) {
        return this.margins.create(admin.id, dto);
    }
    update(admin, id, dto) {
        return this.margins.update(admin.id, id, dto);
    }
    remove(admin, id) {
        return this.margins.remove(admin.id, id);
    }
    reprice(admin, id, dto) {
        return this.margins.reprice(admin.id, id, dto.buyerUnitPriceMinor);
    }
};
__decorate([
    Get('margins'),
    ApiOkResponse({ standardSchema: MarginRuleSchema.array() }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminMarginsController.prototype, "list", null);
__decorate([
    Post('margins'),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(MarginRuleInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminMarginsController.prototype, "create", null);
__decorate([
    Put('margins/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(MarginRuleInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminMarginsController.prototype, "update", null);
__decorate([
    Delete('margins/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminMarginsController.prototype, "remove", null);
__decorate([
    Patch('quotes/:id/price'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Override the buyer price of an offered quote' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(RepriceQuoteSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminMarginsController.prototype, "reprice", null);
AdminMarginsController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin'),
    __metadata("design:paramtypes", [AdminMarginsService])
], AdminMarginsController);
export { AdminMarginsController };
//# sourceMappingURL=admin-margins.controller.js.map