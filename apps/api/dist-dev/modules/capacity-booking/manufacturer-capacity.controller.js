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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CapacitySlotInputSchema, CapacitySlotSchema, CapacitySlotUpdateSchema, CLAIM_EVIDENCE_MAX_BYTES, LineCalendarQuerySchema, LineCalendarSchema, ManufacturerClaimSchema, ManufacturerLineSchema, PresignClaimEvidenceSchema, ProductionLineInputSchema, SupplierClaimInputSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { UploadThrottle } from '../../common/throttle/limits.js';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { IdSchema } from '../orders/order-params.js';
import { FilesService } from '../storage/files.service.js';
import { ClaimsService } from './claims.service.js';
import { LinesService } from './lines.service.js';
let ManufacturerCapacityController = class ManufacturerCapacityController {
    context;
    lines;
    claims;
    files;
    constructor(context, lines, claims, files) {
        this.context = context;
        this.lines = lines;
        this.claims = claims;
        this.files = files;
    }
    async listLines(user) {
        return this.lines.list(await this.context.verified(user.id));
    }
    async createLine(user, dto) {
        return this.lines.create(await this.context.verified(user.id), dto);
    }
    async updateLine(user, id, dto) {
        return this.lines.update(await this.context.verified(user.id), id, dto);
    }
    async deleteLine(user, id) {
        await this.lines.remove(await this.context.verified(user.id), id);
    }
    async calendar(user, query) {
        return this.lines.calendar(await this.context.verified(user.id), query);
    }
    async openSlot(user, dto) {
        return this.lines.openSlot(await this.context.verified(user.id), dto);
    }
    async updateSlot(user, id, dto) {
        return this.lines.updateSlot(await this.context.verified(user.id), id, dto);
    }
    async deleteSlot(user, id) {
        await this.lines.deleteSlot(await this.context.verified(user.id), id);
    }
    async presignEvidence(user, dto) {
        const ctx = await this.context.verified(user.id);
        return this.files.reserveUpload({
            userId: user.id,
            companyId: ctx.companyId,
            purpose: 'SUPPLIER_CLAIM_EVIDENCE',
            folder: 'claims',
            fileName: dto.fileName,
            contentType: dto.contentType,
            sizeBytes: dto.sizeBytes,
            maxBytes: CLAIM_EVIDENCE_MAX_BYTES,
        });
    }
    async listClaims(user) {
        return this.claims.list(await this.context.verified(user.id));
    }
    async createClaim(user, dto) {
        return this.claims.create(await this.context.verified(user.id), dto);
    }
    async deleteClaim(user, id) {
        await this.claims.remove(await this.context.verified(user.id), id);
    }
};
__decorate([
    Get('lines'),
    ApiOkResponse({ standardSchema: z.array(ManufacturerLineSchema) }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "listLines", null);
__decorate([
    Post('lines'),
    ApiOkResponse({ standardSchema: ManufacturerLineSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(ProductionLineInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "createLine", null);
__decorate([
    Put('lines/:id'),
    ApiOkResponse({ standardSchema: ManufacturerLineSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(ProductionLineInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "updateLine", null);
__decorate([
    Delete('lines/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "deleteLine", null);
__decorate([
    Get('capacity/lines-calendar'),
    ApiOperation({ summary: 'Day-by-day capacity, open and booked minutes per line' }),
    ApiOkResponse({ standardSchema: LineCalendarSchema }),
    __param(0, CurrentUser()),
    __param(1, Query(new ZodValidationPipe(LineCalendarQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "calendar", null);
__decorate([
    Post('slots'),
    ApiOperation({ summary: 'Open a window on a line for capacity booking' }),
    ApiOkResponse({ standardSchema: CapacitySlotSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(CapacitySlotInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "openSlot", null);
__decorate([
    Patch('slots/:id'),
    ApiOkResponse({ standardSchema: CapacitySlotSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(CapacitySlotUpdateSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "updateSlot", null);
__decorate([
    Delete('slots/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "deleteSlot", null);
__decorate([
    Post('claims/uploads'),
    UploadThrottle(),
    ApiOperation({ summary: 'Presigned POST for supplier claim evidence (staff only see it)' }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(PresignClaimEvidenceSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "presignEvidence", null);
__decorate([
    Get('claims'),
    ApiOkResponse({ standardSchema: z.array(ManufacturerClaimSchema) }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "listClaims", null);
__decorate([
    Post('claims'),
    ApiOkResponse({ standardSchema: ManufacturerClaimSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(SupplierClaimInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "createClaim", null);
__decorate([
    Delete('claims/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerCapacityController.prototype, "deleteClaim", null);
ManufacturerCapacityController = __decorate([
    ApiTags('capacity-booking'),
    ApiCookieAuth(),
    Roles('MANUFACTURER'),
    Controller('manufacturer'),
    __metadata("design:paramtypes", [ManufacturerContextService,
        LinesService,
        ClaimsService,
        FilesService])
], ManufacturerCapacityController);
export { ManufacturerCapacityController };
//# sourceMappingURL=manufacturer-capacity.controller.js.map