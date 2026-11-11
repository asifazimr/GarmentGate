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
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Patch, Put, Query, Res, StreamableFile, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { AdminLogisticsClaimSchema, LogisticsReportQuerySchema, LogisticsReportSchema, PublishShipmentUploadSchema, OpenClaimSchema, SettleClaimSchema, SubmitClaimSchema, CreatePartnerUserSchema, PartnerUserSchema, TrackingEventInputSchema, AdminLogisticsOrderSchema, AdminShipmentRowSchema, AdminShipmentSchema, CreateShipmentSchema, HubReceiptInputSchema, LogisticsDocumentTypeSchema, PresignHubPhotoSchema, UpdateLegSchema, UpdatePickupSchema, UpdateShipmentSchema, DutyRateInputSchema, DutyRateSchema, FreightOptionSchema, FreightQuoteRequestSchema, HubInputSchema, HubSchema, LogisticsMarginRuleInputSchema, LogisticsMarginRuleSchema, LogisticsPartnerInputSchema, LogisticsPartnerSchema, LogisticsSettingsSchema, SetHsCodeSchema, RateCardInputSchema, RateCardSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { UploadThrottle } from '../../common/throttle/limits.js';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { ClaimsService } from './claims.service.js';
import { FreightQuotesService } from './freight-quotes.service.js';
import { LogisticsAdminService } from './logistics-admin.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
import { OrderLogisticsService } from './order-logistics.service.js';
import { HubFlowService } from './hub-flow.service.js';
import { ClaimCodeSchema, ShipmentCodeSchema } from './logistics-params.js';
import { ShipmentsService } from './shipments.service.js';
import { TrackingService } from './tracking.service.js';
const id = new ZodValidationPipe(IdSchema);
let AdminLogisticsController = class AdminLogisticsController {
    admin;
    settings;
    quotes;
    orders;
    hubFlow;
    shipments;
    tracking;
    claims;
    constructor(admin, settings, quotes, orders, hubFlow, shipments, tracking, claims) {
        this.admin = admin;
        this.settings = settings;
        this.quotes = quotes;
        this.orders = orders;
        this.hubFlow = hubFlow;
        this.shipments = shipments;
        this.tracking = tracking;
        this.claims = claims;
    }
    listClaims() {
        return this.claims.list();
    }
    openClaim(user, dto) {
        return this.claims.open(user.id, dto);
    }
    submitClaim(user, code, dto) {
        return this.claims.submit(user.id, code, dto);
    }
    settleClaim(user, code, dto) {
        return this.claims.settle(user.id, code, dto);
    }
    report(q) {
        return this.claims.report(q);
    }
    partnerUsers(partnerId) {
        return this.admin.partnerUsers(partnerId);
    }
    createPartnerUser(user, partnerId, dto) {
        return this.admin.createPartnerUser(user.id, partnerId, dto);
    }
    shipmentEvent(user, code, dto) {
        return this.tracking.recordEvent({ userId: user.id, source: 'STAFF' }, code, null, dto);
    }
    publishUpload(user, code, uploadId, dto) {
        return this.shipments.publishUpload(user.id, code, uploadId, dto.buyerVisible);
    }
    payLeg(user, code, legId) {
        return this.tracking.payLeg(user.id, code, legId);
    }
    board() {
        return this.hubFlow.board();
    }
    updatePickup(user, pickupId, dto) {
        return this.hubFlow.updatePickup(user.id, pickupId, dto);
    }
    presignHubPhoto(user, dto) {
        return this.hubFlow.presignHubPhoto(user.id, dto);
    }
    receive(user, dto) {
        return this.hubFlow.receive(user.id, dto);
    }
    listShipments() {
        return this.shipments.list();
    }
    createShipment(user, dto) {
        return this.shipments.create(user.id, dto);
    }
    shipment(code) {
        return this.shipments.detail(code);
    }
    updateShipment(user, code, dto) {
        return this.shipments.update(user.id, code, dto);
    }
    updateLeg(user, code, legId, dto) {
        return this.shipments.updateLeg(user.id, code, legId, dto);
    }
    async document(user, code, type, res) {
        const { file, name } = await this.shipments.document(user.id, code, type);
        res.setHeader('Cache-Control', 'private, no-store');
        return new StreamableFile(file, {
            type: 'application/pdf',
            disposition: `inline; filename="${name}"`,
        });
    }
    setHsCode(user, code, dto) {
        return this.orders.setHsCode(user.id, code, dto.hsCode);
    }
    partners() {
        return this.admin.partners();
    }
    createPartner(user, dto) {
        return this.admin.savePartner(user.id, null, dto);
    }
    updatePartner(user, partnerId, dto) {
        return this.admin.savePartner(user.id, partnerId, dto);
    }
    hubs() {
        return this.admin.hubs();
    }
    createHub(user, dto) {
        return this.admin.saveHub(user.id, null, dto);
    }
    updateHub(user, hubId, dto) {
        return this.admin.saveHub(user.id, hubId, dto);
    }
    rateCards() {
        return this.admin.rateCards();
    }
    createRateCard(user, dto) {
        return this.admin.saveRateCard(user.id, null, dto);
    }
    updateRateCard(user, cardId, dto) {
        return this.admin.saveRateCard(user.id, cardId, dto);
    }
    retireRateCard(user, cardId) {
        return this.admin.retireRateCard(user.id, cardId);
    }
    margins() {
        return this.admin.marginRules();
    }
    createMargin(user, dto) {
        return this.admin.saveMarginRule(user.id, null, dto);
    }
    updateMargin(user, ruleId, dto) {
        return this.admin.saveMarginRule(user.id, ruleId, dto);
    }
    deleteMargin(user, ruleId) {
        return this.admin.deleteMarginRule(user.id, ruleId);
    }
    dutyRates() {
        return this.admin.dutyRates();
    }
    createDutyRate(user, dto) {
        return this.admin.saveDutyRate(user.id, null, dto);
    }
    updateDutyRate(user, rateId, dto) {
        return this.admin.saveDutyRate(user.id, rateId, dto);
    }
    deleteDutyRate(user, rateId) {
        return this.admin.deleteDutyRate(user.id, rateId);
    }
    getSettings() {
        return this.settings.get();
    }
    setSettings(user, dto) {
        return this.settings.set(user.id, dto);
    }
    preview(dto) {
        return this.quotes.quote(dto);
    }
};
__decorate([
    Get('claims'),
    ApiOkResponse({ standardSchema: z.array(AdminLogisticsClaimSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "listClaims", null);
__decorate([
    Post('claims'),
    ApiOperation({ summary: 'Open a claim on an order that left with GarmentGate' }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(OpenClaimSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "openClaim", null);
__decorate([
    Post('claims/:code/submit'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Record submitting the claim to the insurer' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(ClaimCodeSchema))),
    __param(2, Body(new ZodValidationPipe(SubmitClaimSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "submitClaim", null);
__decorate([
    Post('claims/:code/settle'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({
        summary: 'Settle or reject: compensation, insurer recovery and partner chargeback',
    }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(ClaimCodeSchema))),
    __param(2, Body(new ZodValidationPipe(SettleClaimSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "settleClaim", null);
__decorate([
    Get('reports'),
    ApiOkResponse({ standardSchema: LogisticsReportSchema }),
    __param(0, Query(new ZodValidationPipe(LogisticsReportQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "report", null);
__decorate([
    Get('partners/:id/users'),
    ApiOkResponse({ standardSchema: z.array(PartnerUserSchema) }),
    __param(0, Param('id', id)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "partnerUsers", null);
__decorate([
    Post('partners/:id/users'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({
        summary: 'Invite someone at a partner to the partner portal (password set by email)',
    }),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(CreatePartnerUserSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "createPartnerUser", null);
__decorate([
    Post('shipments/:code/events'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'A tracking update from staff; the first IN_TRANSIT is the departure' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(ShipmentCodeSchema))),
    __param(2, Body(new ZodValidationPipe(TrackingEventInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "shipmentEvent", null);
__decorate([
    Patch('shipments/:code/uploads/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({
        summary: 'Publish a reviewed (sanitized) partner upload to the buyer, or hide it',
    }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(ShipmentCodeSchema))),
    __param(2, Param('id', id)),
    __param(3, Body(new ZodValidationPipe(PublishShipmentUploadSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "publishUpload", null);
__decorate([
    Post('shipments/:code/legs/:id/payout'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Record paying the partner for a leg (payable → cash)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(ShipmentCodeSchema))),
    __param(2, Param('id', id)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "payLeg", null);
__decorate([
    Get('orders'),
    ApiOperation({ summary: 'Every order GarmentGate ships, with where its goods are' }),
    ApiOkResponse({ standardSchema: z.array(AdminLogisticsOrderSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "board", null);
__decorate([
    Patch('pickups/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(UpdatePickupSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "updatePickup", null);
__decorate([
    Post('hub-photos/uploads'),
    UploadThrottle(),
    ApiOperation({ summary: 'Presigned upload for a hub receiving photo' }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(PresignHubPhotoSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "presignHubPhoto", null);
__decorate([
    Post('hub-receipts'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(HubReceiptInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "receive", null);
__decorate([
    Get('shipments'),
    ApiOkResponse({ standardSchema: z.array(AdminShipmentRowSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "listShipments", null);
__decorate([
    Post('shipments'),
    ApiOperation({ summary: 'Put orders received at a hub on one shipment (one buyer)' }),
    ApiOkResponse({ standardSchema: z.object({ code: z.string() }) }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(CreateShipmentSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "createShipment", null);
__decorate([
    Get('shipments/:code'),
    ApiOkResponse({ standardSchema: AdminShipmentSchema }),
    __param(0, Param('code', new ZodValidationPipe(ShipmentCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "shipment", null);
__decorate([
    Patch('shipments/:code'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(ShipmentCodeSchema))),
    __param(2, Body(new ZodValidationPipe(UpdateShipmentSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "updateShipment", null);
__decorate([
    Patch('shipments/:code/legs/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(ShipmentCodeSchema))),
    __param(2, Param('id', id)),
    __param(3, Body(new ZodValidationPipe(UpdateLegSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "updateLeg", null);
__decorate([
    Get('shipments/:code/documents/:type'),
    ApiProduces('application/pdf'),
    ApiOperation({ summary: 'A GarmentGate-issued shipping document (per the shipper mode)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(ShipmentCodeSchema))),
    __param(2, Param('type', new ZodValidationPipe(LogisticsDocumentTypeSchema))),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "document", null);
__decorate([
    Patch('orders/:code/hs-code'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Set the order’s HS code (documents and duty estimates)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(SetHsCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "setHsCode", null);
__decorate([
    Get('partners'),
    ApiOkResponse({ standardSchema: z.array(LogisticsPartnerSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "partners", null);
__decorate([
    Post('partners'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(LogisticsPartnerInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "createPartner", null);
__decorate([
    Put('partners/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(LogisticsPartnerInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "updatePartner", null);
__decorate([
    Get('hubs'),
    ApiOkResponse({ standardSchema: z.array(HubSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "hubs", null);
__decorate([
    Post('hubs'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(HubInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "createHub", null);
__decorate([
    Put('hubs/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(HubInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "updateHub", null);
__decorate([
    Get('rate-cards'),
    ApiOkResponse({ standardSchema: z.array(RateCardSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "rateCards", null);
__decorate([
    Post('rate-cards'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(RateCardInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "createRateCard", null);
__decorate([
    Put('rate-cards/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(RateCardInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "updateRateCard", null);
__decorate([
    Delete('rate-cards/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "retireRateCard", null);
__decorate([
    Get('margins'),
    ApiOkResponse({ standardSchema: z.array(LogisticsMarginRuleSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "margins", null);
__decorate([
    Post('margins'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(LogisticsMarginRuleInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "createMargin", null);
__decorate([
    Put('margins/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(LogisticsMarginRuleInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "updateMargin", null);
__decorate([
    Delete('margins/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "deleteMargin", null);
__decorate([
    Get('duty-rates'),
    ApiOkResponse({ standardSchema: z.array(DutyRateSchema) }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "dutyRates", null);
__decorate([
    Post('duty-rates'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(DutyRateInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "createDutyRate", null);
__decorate([
    Put('duty-rates/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __param(2, Body(new ZodValidationPipe(DutyRateInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "updateDutyRate", null);
__decorate([
    Delete('duty-rates/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', id)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "deleteDutyRate", null);
__decorate([
    Get('settings'),
    ApiOkResponse({ standardSchema: LogisticsSettingsSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "getSettings", null);
__decorate([
    Put('settings'),
    ApiOkResponse({ standardSchema: LogisticsSettingsSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(LogisticsSettingsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "setSettings", null);
__decorate([
    Post('quote-preview'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Price a route from the rate cards, with cost and margin (staff)' }),
    ApiOkResponse({ standardSchema: z.array(FreightOptionSchema) }),
    __param(0, Body(new ZodValidationPipe(FreightQuoteRequestSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminLogisticsController.prototype, "preview", null);
AdminLogisticsController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin/logistics'),
    __metadata("design:paramtypes", [LogisticsAdminService,
        LogisticsSettingsService,
        FreightQuotesService,
        OrderLogisticsService,
        HubFlowService,
        ShipmentsService,
        TrackingService,
        ClaimsService])
], AdminLogisticsController);
export { AdminLogisticsController };
//# sourceMappingURL=admin-logistics.controller.js.map