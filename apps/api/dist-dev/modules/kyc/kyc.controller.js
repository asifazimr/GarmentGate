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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddCertificationSchema, AddCompanyDocumentSchema, PresignUploadResponseSchema, PresignUploadSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { KycService } from './kyc.service.js';
import { UploadThrottle } from '../../common/throttle/limits.js';
let KycController = class KycController {
    kyc;
    constructor(kyc) {
        this.kyc = kyc;
    }
    presign(user, dto) {
        return this.kyc.presignUpload(user.id, dto);
    }
    addDocument(user, dto) {
        return this.kyc.addDocument(user.id, dto);
    }
    removeDocument(user, id) {
        return this.kyc.removeDocument(user.id, id);
    }
    addCertification(user, dto) {
        return this.kyc.addCertification(user.id, dto);
    }
    removeCertification(user, id) {
        return this.kyc.removeCertification(user.id, id);
    }
    downloadUrl(user, fileId) {
        return this.kyc.downloadUrl(user, fileId);
    }
};
__decorate([
    Post('uploads'),
    UploadThrottle(),
    Roles('BUYER', 'MANUFACTURER'),
    ApiOperation({
        summary: 'Get a presigned POST to upload a document straight to storage',
        description: 'POST the file as multipart/form-data to `url`, with every entry of `fields` before `file`.',
    }),
    ApiOkResponse({ standardSchema: PresignUploadResponseSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(PresignUploadSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "presign", null);
__decorate([
    Post('documents'),
    Roles('BUYER', 'MANUFACTURER'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({
        summary: 'Attach an uploaded file as a business license, export registration, …',
    }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(AddCompanyDocumentSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "addDocument", null);
__decorate([
    Delete('documents/:id'),
    Roles('BUYER', 'MANUFACTURER'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "removeDocument", null);
__decorate([
    Post('certifications'),
    Roles('MANUFACTURER'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Attach an uploaded certificate (BSCI, WRAP, GOTS, …)' }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(AddCertificationSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "addCertification", null);
__decorate([
    Delete('certifications/:id'),
    Roles('MANUFACTURER'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "removeCertification", null);
__decorate([
    Get('files/:fileId/url'),
    ApiOperation({ summary: 'Short-lived download link (owner company or admin only)' }),
    __param(0, CurrentUser()),
    __param(1, Param('fileId', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "downloadUrl", null);
KycController = __decorate([
    ApiTags('kyc'),
    ApiCookieAuth(),
    Controller('kyc'),
    __metadata("design:paramtypes", [KycService])
], KycController);
export { KycController };
//# sourceMappingURL=kyc.controller.js.map