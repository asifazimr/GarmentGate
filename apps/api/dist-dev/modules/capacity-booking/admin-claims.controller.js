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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminClaimSchema, AdminClaimsQuerySchema, RejectClaimSchema, ReviewClaimSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { IdSchema } from '../orders/order-params.js';
import { ClaimsService } from './claims.service.js';
let AdminClaimsController = class AdminClaimsController {
    claims;
    constructor(claims) {
        this.claims = claims;
    }
    list(query) {
        return this.claims.adminList(query.status);
    }
    verify(admin, id, dto) {
        return this.claims.verify(admin.id, id, dto.note);
    }
    reject(admin, id, dto) {
        return this.claims.reject(admin.id, id, dto);
    }
};
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: z.array(AdminClaimSchema) }),
    __param(0, Query(new ZodValidationPipe(AdminClaimsQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminClaimsController.prototype, "list", null);
__decorate([
    Post(':id/verify'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(ReviewClaimSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminClaimsController.prototype, "verify", null);
__decorate([
    Post(':id/reject'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(RejectClaimSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminClaimsController.prototype, "reject", null);
AdminClaimsController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin/claims'),
    __metadata("design:paramtypes", [ClaimsService])
], AdminClaimsController);
export { AdminClaimsController };
//# sourceMappingURL=admin-claims.controller.js.map