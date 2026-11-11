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
import { BuyerOrderLogisticsSchema, BuyerShippingOptionSchema, PayLogisticsSchema, PaymentStartSchema, ShippingQuoteRequestSchema, HandoverRequestSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { OrderLogisticsService } from './order-logistics.service.js';
let BuyerLogisticsController = class BuyerLogisticsController {
    actors;
    logistics;
    constructor(actors, logistics) {
        this.actors = actors;
        this.logistics = logistics;
    }
    async view(user, code) {
        return this.logistics.view(await this.actors.resolve(user.id), code);
    }
    async quote(user, code, dto) {
        return this.logistics.quote(await this.actors.resolve(user.id), code, dto);
    }
    async accept(user, code, id) {
        await this.logistics.accept(await this.actors.resolve(user.id), code, id);
    }
    async handover(user, code, dto) {
        await this.logistics.handover(await this.actors.resolve(user.id), code, dto);
    }
    async pay(user, code, dto) {
        return this.logistics.pay(await this.actors.resolve(user.id), code, dto.method);
    }
};
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: BuyerOrderLogisticsSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BuyerLogisticsController.prototype, "view", null);
__decorate([
    Post('quotes'),
    HttpCode(HttpStatus.OK),
    ApiOperation({ summary: 'Shipping prices for each mode the terms allow, with landed cost' }),
    ApiOkResponse({ standardSchema: z.array(BuyerShippingOptionSchema) }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(ShippingQuoteRequestSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerLogisticsController.prototype, "quote", null);
__decorate([
    Post('quotes/:id/accept'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Param('id', new ZodValidationPipe(IdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BuyerLogisticsController.prototype, "accept", null);
__decorate([
    Put('handover'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({
        summary: 'Use the buyer’s own forwarder: GarmentGate hands the cargo over at its hub (FCA)',
    }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(HandoverRequestSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerLogisticsController.prototype, "handover", null);
__decorate([
    Post('payments'),
    ApiOperation({ summary: 'Pay the shipping charge into escrow' }),
    ApiOkResponse({ standardSchema: PaymentStartSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(PayLogisticsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerLogisticsController.prototype, "pay", null);
BuyerLogisticsController = __decorate([
    ApiTags('logistics'),
    ApiCookieAuth(),
    Roles('BUYER'),
    Controller('orders/:code/logistics'),
    __metadata("design:paramtypes", [ChatActorService,
        OrderLogisticsService])
], BuyerLogisticsController);
export { BuyerLogisticsController };
//# sourceMappingURL=buyer-logistics.controller.js.map