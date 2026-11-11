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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AdminGigInspectorSchema, AdminInspectorApplicationSchema, CheckInSchema, FactoryLocationSchema, GigSettingsSchema, InspectorApplicationInputSchema, InspectorMeSchema, InspectorPayoutDetailsSchema, PayInspectorSchema, RateInspectionSchema, ReviewApplicationSchema, TaskSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Public, Roles } from '../auth/auth.decorators.js';
import { GigService } from './gig.service.js';
const id = new ZodValidationPipe(z.uuid());
const factoryCode = new ZodValidationPipe(z.string().regex(/^MFR-[A-Z]{2}-\d{4}$/));
let GigApplyController = class GigApplyController {
    gig;
    constructor(gig) {
        this.gig = gig;
    }
    apply(dto) {
        return this.gig.apply(dto);
    }
};
__decorate([
    Post('apply'),
    Public(),
    Throttle({ default: { limit: 5, ttl: 60_000 } }),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Apply to become a GarmentGate QC inspector (staff review it)' }),
    __param(0, Body(new ZodValidationPipe(InspectorApplicationInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GigApplyController.prototype, "apply", null);
GigApplyController = __decorate([
    ApiTags('gig'),
    Controller('inspectors'),
    __metadata("design:paramtypes", [GigService])
], GigApplyController);
export { GigApplyController };
let GigInspectorController = class GigInspectorController {
    gig;
    constructor(gig) {
        this.gig = gig;
    }
    tasks(user) {
        return this.gig.tasks(user.id);
    }
    claim(user, inspectionId) {
        return this.gig.claim(user.id, inspectionId);
    }
    checkIn(user, inspectionId, dto) {
        return this.gig.checkIn(user.id, inspectionId, dto);
    }
    me(user) {
        return this.gig.me(user.id);
    }
    setPayout(user, dto) {
        return this.gig.setPayout(user.id, dto);
    }
};
__decorate([
    Get('tasks'),
    ApiOkResponse({ standardSchema: z.array(TaskSchema) }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GigInspectorController.prototype, "tasks", null);
__decorate([
    Post('tasks/:id/claim'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GigInspectorController.prototype, "claim", null);
__decorate([
    Post('inspections/:id/check-in'),
    ApiOperation({ summary: 'GPS check-in at the factory (required before the report)' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(CheckInSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GigInspectorController.prototype, "checkIn", null);
__decorate([
    Get('me'),
    ApiOkResponse({ standardSchema: InspectorMeSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GigInspectorController.prototype, "me", null);
__decorate([
    Put('me/payout'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(InspectorPayoutDetailsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GigInspectorController.prototype, "setPayout", null);
GigInspectorController = __decorate([
    ApiTags('gig'),
    ApiCookieAuth(),
    Roles('INSPECTOR'),
    Controller('inspector'),
    __metadata("design:paramtypes", [GigService])
], GigInspectorController);
export { GigInspectorController };
let GigAdminController = class GigAdminController {
    gig;
    constructor(gig) {
        this.gig = gig;
    }
    settings() {
        return this.gig.settings();
    }
    setSettings(user, dto) {
        return this.gig.setSettings(user.id, dto);
    }
    applications() {
        return this.gig.applications();
    }
    review(user, appId, dto) {
        return this.gig.review(user.id, appId, dto);
    }
    inspectors() {
        return this.gig.inspectors();
    }
    verifyPayout(user, userId) {
        return this.gig.verifyPayout(user.id, userId);
    }
    setStatus(user, userId, dto) {
        return this.gig.setStatus(user.id, userId, dto.status);
    }
    pay(user, userId, dto) {
        return this.gig.pay(user.id, userId, dto);
    }
    rate(user, inspectionId, dto) {
        return this.gig.rate(user.id, inspectionId, dto.rating);
    }
    locate(user, code, dto) {
        return this.gig.setFactoryLocation(user.id, code, dto);
    }
};
__decorate([
    Get('gig/settings'),
    ApiOkResponse({ standardSchema: GigSettingsSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GigAdminController.prototype, "settings", null);
__decorate([
    Put('gig/settings'),
    ApiOkResponse({ standardSchema: GigSettingsSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(GigSettingsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GigAdminController.prototype, "setSettings", null);
__decorate([
    Get('gig/applications'),
    ApiOkResponse({ standardSchema: z.array(AdminInspectorApplicationSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GigAdminController.prototype, "applications", null);
__decorate([
    Post('gig/applications/:id/review'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(ReviewApplicationSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GigAdminController.prototype, "review", null);
__decorate([
    Get('gig/inspectors'),
    ApiOkResponse({ standardSchema: z.array(AdminGigInspectorSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GigAdminController.prototype, "inspectors", null);
__decorate([
    Post('gig/inspectors/:id/verify-payout'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GigAdminController.prototype, "verifyPayout", null);
__decorate([
    Post('gig/inspectors/:id/status'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(z.object({ status: z.enum(['ACTIVE', 'SUSPENDED']) })))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GigAdminController.prototype, "setStatus", null);
__decorate([
    Post('gig/inspectors/:id/pay'),
    ApiOperation({ summary: 'Record the weekly payout: everything earned and not yet paid' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(PayInspectorSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GigAdminController.prototype, "pay", null);
__decorate([
    Post('inspections/:id/rate'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(RateInspectionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GigAdminController.prototype, "rate", null);
__decorate([
    Put('manufacturers/:code/location'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Where the factory is (inspector task distance and GPS check-in)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', factoryCode)),
    __param(2, Body(new ZodValidationPipe(FactoryLocationSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GigAdminController.prototype, "locate", null);
GigAdminController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin'),
    __metadata("design:paramtypes", [GigService])
], GigAdminController);
export { GigAdminController };
//# sourceMappingURL=gig.controller.js.map