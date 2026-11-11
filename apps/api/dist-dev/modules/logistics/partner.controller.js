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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Res, StreamableFile, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { AttachShipmentUploadSchema, PartnerDocumentTypeSchema, PartnerLegRefsSchema, PartnerLegSchema, PresignShipmentUploadSchema, TrackingEventInputSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { UploadThrottle } from '../../common/throttle/limits.js';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { IdSchema } from '../orders/order-params.js';
import { PartnerPortalService } from './partner-portal.service.js';
const id = new ZodValidationPipe(IdSchema);
let PartnerController = class PartnerController {
    portal;
    constructor(portal) {
        this.portal = portal;
    }
    legs(user) {
        return this.portal.legs(user.id);
    }
    leg(user, legId) {
        return this.portal.leg(user.id, legId);
    }
    accept(user, legId) {
        return this.portal.accept(user.id, legId);
    }
    refs(user, legId, dto) {
        return this.portal.updateRefs(user.id, legId, dto);
    }
    event(user, legId, dto) {
        return this.portal.event(user.id, legId, dto);
    }
    presign(user, legId, dto) {
        return this.portal.presign(user.id, legId, dto);
    }
    attach(user, legId, dto) {
        return this.portal.attach(user.id, legId, dto);
    }
    async document(user, legId, type, res) {
        const { file, name } = await this.portal.document(user.id, legId, type);
        res.setHeader('Cache-Control', 'private, no-store');
        return new StreamableFile(file, {
            type: 'application/pdf',
            disposition: `inline; filename="${name}"`,
        });
    }
};
__decorate([
    Get('legs'),
    ApiOkResponse({ standardSchema: z.array(PartnerLegSchema) }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "legs", null);
__decorate([
    Get('legs/:id'),
    ApiOkResponse({ standardSchema: PartnerLegSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "leg", null);
__decorate([
    Post('legs/:id/accept'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "accept", null);
__decorate([
    Patch('legs/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Carrier, tracking, container, B/L or AWB and dates' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(PartnerLegRefsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "refs", null);
__decorate([
    Post('legs/:id/events'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'A tracking update (status, place, note)' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(TrackingEventInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "event", null);
__decorate([
    Post('legs/:id/uploads'),
    UploadThrottle(),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(PresignShipmentUploadSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "presign", null);
__decorate([
    Post('legs/:id/files'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(AttachShipmentUploadSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "attach", null);
__decorate([
    Get('legs/:id/documents/:type'),
    ApiProduces('application/pdf'),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Param('type', new ZodValidationPipe(PartnerDocumentTypeSchema))),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "document", null);
PartnerController = __decorate([
    ApiTags('partner'),
    ApiCookieAuth(),
    Roles('PARTNER'),
    Controller('partner'),
    __metadata("design:paramtypes", [PartnerPortalService])
], PartnerController);
export { PartnerController };
//# sourceMappingURL=partner.controller.js.map