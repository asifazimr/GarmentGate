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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Query, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminKycCompanyDetailSchema, KycStatusSchema, ApproveKycSchema, RejectKycSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { AdminKycService } from './admin-kyc.service.js';
let AdminKycController = class AdminKycController {
    adminKyc;
    constructor(adminKyc) {
        this.adminKyc = adminKyc;
    }
    list(status) {
        return this.adminKyc.list(status);
    }
    detail(id) {
        return this.adminKyc.detail(id);
    }
    approve(admin, id, dto) {
        return this.adminKyc.approve(admin.id, id, dto.note);
    }
    reject(admin, id, dto) {
        return this.adminKyc.reject(admin.id, id, dto.reason);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'Verification queue (defaults to companies pending review)' }),
    __param(0, Query('status', new ZodValidationPipe(KycStatusSchema.default('PENDING_REVIEW')))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminKycController.prototype, "list", null);
__decorate([
    Get(':id'),
    ApiOkResponse({ standardSchema: AdminKycCompanyDetailSchema }),
    __param(0, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminKycController.prototype, "detail", null);
__decorate([
    Post(':id/approve'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Verify the company and its documents; lists manufacturers' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(ApproveKycSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminKycController.prototype, "approve", null);
__decorate([
    Post(':id/reject'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Send the company back to onboarding with a reason' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(RejectKycSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminKycController.prototype, "reject", null);
AdminKycController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin/kyc/companies'),
    __metadata("design:paramtypes", [AdminKycService])
], AdminKycController);
export { AdminKycController };
//# sourceMappingURL=admin-kyc.controller.js.map