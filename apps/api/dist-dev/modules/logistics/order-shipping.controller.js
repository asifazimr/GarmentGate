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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Res, StreamableFile, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { BuyerDocumentTypeSchema, BuyerTrackingSchema, BookPickupSchema, ConsolidationCandidateSchema, ConsolidationOptionSchema, ConsolidationQuoteRequestSchema, FactoryOrderLogisticsSchema, OrderPackingInputSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema } from '../orders/order-params.js';
import { ConsolidationService } from './consolidation.service.js';
import { TrackingService } from './tracking.service.js';
import { HubFlowService } from './hub-flow.service.js';
import { ConsolidationCodeSchema } from './logistics-params.js';
const code = new ZodValidationPipe(CodeSchema);
let OrderShippingController = class OrderShippingController {
    actors;
    hubFlow;
    consolidation;
    tracking;
    constructor(actors, hubFlow, consolidation, tracking) {
        this.actors = actors;
        this.hubFlow = hubFlow;
        this.consolidation = consolidation;
        this.tracking = tracking;
    }
    async track(user, orderCode) {
        return this.tracking.buyerTracking(await this.actors.resolve(user.id), orderCode);
    }
    async buyerDocument(user, orderCode, type, res) {
        const { file, name } = await this.tracking.buyerDocument(await this.actors.resolve(user.id), orderCode, type);
        res.setHeader('Cache-Control', 'private, no-store');
        return new StreamableFile(file, {
            type: 'application/pdf',
            disposition: `inline; filename="${name}"`,
        });
    }
    async factory(user, orderCode) {
        return this.hubFlow.factoryView(await this.actors.resolve(user.id), orderCode);
    }
    async packing(user, orderCode, dto) {
        await this.hubFlow.savePacking(await this.actors.resolve(user.id), orderCode, dto);
    }
    async pickup(user, orderCode, dto) {
        await this.hubFlow.bookPickup(await this.actors.resolve(user.id), orderCode, dto);
    }
    async markings(user, orderCode, res) {
        const { file, name } = await this.hubFlow.cartonMarkings(await this.actors.resolve(user.id), orderCode);
        res.setHeader('Cache-Control', 'private, no-store');
        return new StreamableFile(file, {
            type: 'application/pdf',
            disposition: `inline; filename="${name}"`,
        });
    }
    async candidates(user, orderCode) {
        return this.consolidation.candidates(await this.actors.resolve(user.id), orderCode);
    }
    async consolidate(user, dto) {
        return this.consolidation.quote(await this.actors.resolve(user.id), dto);
    }
    async acceptConsolidation(user, consolidationCode) {
        await this.consolidation.accept(await this.actors.resolve(user.id), consolidationCode);
    }
};
__decorate([
    Get('orders/:code/logistics/tracking'),
    Roles('BUYER'),
    ApiOperation({
        summary: 'GarmentGate tracking across every leg (null before a shipment exists)',
    }),
    ApiOkResponse({ standardSchema: BuyerTrackingSchema.nullable() }),
    __param(0, CurrentUser()),
    __param(1, Param('code', code)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderShippingController.prototype, "track", null);
__decorate([
    Get('orders/:code/logistics/documents/:type'),
    Roles('BUYER'),
    ApiProduces('application/pdf'),
    __param(0, CurrentUser()),
    __param(1, Param('code', code)),
    __param(2, Param('type', new ZodValidationPipe(BuyerDocumentTypeSchema))),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], OrderShippingController.prototype, "buyerDocument", null);
__decorate([
    Get('orders/:code/logistics/factory'),
    Roles('MANUFACTURER'),
    ApiOkResponse({ standardSchema: FactoryOrderLogisticsSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', code)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderShippingController.prototype, "factory", null);
__decorate([
    Put('orders/:code/logistics/packing'),
    Roles('MANUFACTURER'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Factory: cartons, weights and volume as packed' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', code)),
    __param(2, Body(new ZodValidationPipe(OrderPackingInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrderShippingController.prototype, "packing", null);
__decorate([
    Post('orders/:code/logistics/pickup'),
    Roles('MANUFACTURER'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Factory: ask GarmentGate to collect the goods for one of its hubs' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', code)),
    __param(2, Body(new ZodValidationPipe(BookPickupSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrderShippingController.prototype, "pickup", null);
__decorate([
    Get('orders/:code/logistics/carton-markings'),
    Roles('MANUFACTURER', 'ADMIN'),
    ApiProduces('application/pdf'),
    ApiOperation({ summary: 'GarmentGate carton markings (hub, order, carton count; no buyer)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', code)),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrderShippingController.prototype, "markings", null);
__decorate([
    Get('orders/:code/logistics/consolidation-candidates'),
    Roles('BUYER'),
    ApiOkResponse({ standardSchema: z.array(ConsolidationCandidateSchema) }),
    __param(0, CurrentUser()),
    __param(1, Param('code', code)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderShippingController.prototype, "candidates", null);
__decorate([
    Post('logistics/consolidations/quotes'),
    Roles('BUYER'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'One price for several orders shipped together, shared by weight' }),
    ApiOkResponse({ standardSchema: z.array(ConsolidationOptionSchema) }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(ConsolidationQuoteRequestSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderShippingController.prototype, "consolidate", null);
__decorate([
    Post('logistics/consolidations/:code/accept'),
    Roles('BUYER'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(ConsolidationCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderShippingController.prototype, "acceptConsolidation", null);
OrderShippingController = __decorate([
    ApiTags('logistics'),
    ApiCookieAuth(),
    Controller(),
    __metadata("design:paramtypes", [ChatActorService,
        HubFlowService,
        ConsolidationService,
        TrackingService])
], OrderShippingController);
export { OrderShippingController };
//# sourceMappingURL=order-shipping.controller.js.map