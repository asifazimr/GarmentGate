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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Res, StreamableFile, } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { AddMilestoneMediaSchema, MilestoneUpdateSchema, OrderTransitionSchema, PresignOrderMediaSchema, ProductionStageSchema, ReorderOrderSchema, RequestSampleSchema, SampleDecisionSchema, ShipSampleSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from './order-params.js';
import { OrdersService } from './orders.service.js';
import { UploadThrottle } from '../../common/throttle/limits.js';
const SideSchema = z.object({ side: z.enum(['buyer', 'manufacturer']).optional() });
let OrdersController = class OrdersController {
    actors;
    orders;
    constructor(actors, orders) {
        this.actors = actors;
        this.orders = orders;
    }
    async list(user) {
        return this.orders.list(await this.actors.resolve(user.id));
    }
    async detail(user, code) {
        return this.orders.detail(await this.actors.resolve(user.id), code);
    }
    async transition(user, code, dto) {
        await this.orders.transition(await this.actors.resolve(user.id), code, dto);
    }
    async requestSample(user, code, dto) {
        await this.orders.requestSample(await this.actors.resolve(user.id), code, dto);
    }
    async shipSample(user, code, id, dto) {
        await this.orders.shipSample(await this.actors.resolve(user.id), code, id, dto);
    }
    async decideSample(user, code, id, dto) {
        await this.orders.decideSample(await this.actors.resolve(user.id), code, id, dto);
    }
    async updateMilestone(user, code, stage, dto) {
        await this.orders.updateMilestone(await this.actors.resolve(user.id), code, stage, dto);
    }
    async addMedia(user, code, stage, dto) {
        await this.orders.addMilestoneMedia(await this.actors.resolve(user.id), code, stage, dto);
    }
    async presign(user, code, dto) {
        return this.orders.presign(await this.actors.resolve(user.id), code, dto);
    }
    async reorder(user, code, dto) {
        return this.orders.reorder(await this.actors.resolve(user.id), code, dto);
    }
    async purchaseOrder(user, code, query, res) {
        const { file, name } = await this.orders.purchaseOrder(await this.actors.resolve(user.id), code, query.side);
        res.setHeader('Cache-Control', 'private, no-store');
        return new StreamableFile(file, {
            type: 'application/pdf',
            disposition: `inline; filename="${name}"`,
        });
    }
};
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "list", null);
__decorate([
    Get(':code'),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "detail", null);
__decorate([
    Post(':code/transition'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Move the order to its next status (validated by the state machine)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(OrderTransitionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "transition", null);
__decorate([
    Post(':code/samples'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Buyer: request a sample (starts or restarts sampling)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(RequestSampleSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "requestSample", null);
__decorate([
    Post(':code/samples/:id/ship'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Factory: the sample is on its way' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Param('id', new ZodValidationPipe(IdSchema))),
    __param(3, Body(new ZodValidationPipe(ShipSampleSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "shipSample", null);
__decorate([
    Post(':code/samples/:id/decision'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({
        summary: 'Buyer: approve the sample, or ask for changes with comments and photos',
    }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Param('id', new ZodValidationPipe(IdSchema))),
    __param(3, Body(new ZodValidationPipe(SampleDecisionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "decideSample", null);
__decorate([
    Post(':code/milestones/:stage'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Factory: update a production stage' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Param('stage', new ZodValidationPipe(ProductionStageSchema))),
    __param(3, Body(new ZodValidationPipe(MilestoneUpdateSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "updateMilestone", null);
__decorate([
    Post(':code/milestones/:stage/media'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Factory: attach an uploaded photo or video to a stage' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Param('stage', new ZodValidationPipe(ProductionStageSchema))),
    __param(3, Body(new ZodValidationPipe(AddMilestoneMediaSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "addMedia", null);
__decorate([
    Post(':code/uploads'),
    UploadThrottle(),
    ApiOperation({ summary: 'Presigned POST: factory production media, buyer sample photos' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(PresignOrderMediaSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "presign", null);
__decorate([
    Post(':code/reorder'),
    ApiOperation({ summary: 'Buyer: reorder a completed order (creates a draft)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(ReorderOrderSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "reorder", null);
__decorate([
    Get(':code/purchase-order'),
    ApiProduces('application/pdf'),
    ApiOperation({ summary: 'Your purchase order as a PDF (staff choose the side)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Query(new ZodValidationPipe(SideSchema))),
    __param(3, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], OrdersController.prototype, "purchaseOrder", null);
OrdersController = __decorate([
    ApiTags('orders'),
    ApiCookieAuth(),
    Controller('orders'),
    __metadata("design:paramtypes", [ChatActorService,
        OrdersService])
], OrdersController);
export { OrdersController };
//# sourceMappingURL=orders.controller.js.map