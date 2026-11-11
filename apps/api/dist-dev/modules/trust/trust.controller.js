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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddEvidenceSchema, AdminDisputeSummarySchema, OpenDisputeSchema, OrderReviewsSchema, PresignEvidenceSchema, PublicReviewSchema, ResolveDisputeSchema, SubmitReviewSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { DisputesService } from './disputes.service.js';
import { ReviewsService } from './reviews.service.js';
import { UploadThrottle } from '../../common/throttle/limits.js';
const FactoryCodeSchema = z.string().regex(/^MFR-[A-Z]{2}-\d{4,}$/, { error: 'Unknown factory' });
let OrderTrustController = class OrderTrustController {
    actors;
    reviews;
    disputes;
    constructor(actors, reviews, disputes) {
        this.actors = actors;
        this.reviews = reviews;
        this.disputes = disputes;
    }
    async orderReviews(user, code) {
        return this.reviews.forOrder(await this.actors.resolve(user.id), code);
    }
    async review(user, code, dto) {
        await this.reviews.submit(await this.actors.resolve(user.id), code, dto);
    }
    async dispute(user, code) {
        return this.disputes.forOrder(await this.actors.resolve(user.id), code);
    }
    async openDispute(user, code, dto) {
        return this.disputes.open(await this.actors.resolve(user.id), code, dto);
    }
    async presignEvidence(user, code, dto) {
        return this.disputes.presign(await this.actors.resolve(user.id), code, dto);
    }
    async addEvidence(user, code, dto) {
        await this.disputes.addEvidence(await this.actors.resolve(user.id), code, dto);
    }
};
__decorate([
    Get('reviews'),
    ApiOkResponse({ standardSchema: OrderReviewsSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderTrustController.prototype, "orderReviews", null);
__decorate([
    Post('reviews'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Review the other side of a completed order (once)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(SubmitReviewSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrderTrustController.prototype, "review", null);
__decorate([
    Get('dispute'),
    ApiOperation({ summary: 'The latest dispute on the order, as the caller may see it' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OrderTrustController.prototype, "dispute", null);
__decorate([
    Post('dispute'),
    ApiOperation({ summary: 'Buyer: open a dispute with a reason and evidence' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(OpenDisputeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrderTrustController.prototype, "openDispute", null);
__decorate([
    Post('dispute/uploads'),
    UploadThrottle(),
    ApiOperation({ summary: 'Presigned upload for dispute evidence (photo or PDF)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(PresignEvidenceSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrderTrustController.prototype, "presignEvidence", null);
__decorate([
    Post('dispute/evidence'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(CodeSchema))),
    __param(2, Body(new ZodValidationPipe(AddEvidenceSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], OrderTrustController.prototype, "addEvidence", null);
OrderTrustController = __decorate([
    ApiTags('trust'),
    ApiCookieAuth(),
    Controller('orders/:code'),
    __metadata("design:paramtypes", [ChatActorService,
        ReviewsService,
        DisputesService])
], OrderTrustController);
export { OrderTrustController };
let PublicReviewsController = class PublicReviewsController {
    reviews;
    constructor(reviews) {
        this.reviews = reviews;
    }
    list(code) {
        return this.reviews.publicReviews(code);
    }
};
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: PublicReviewSchema.array() }),
    __param(0, Param('code', new ZodValidationPipe(FactoryCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicReviewsController.prototype, "list", null);
PublicReviewsController = __decorate([
    ApiTags('catalog'),
    ApiCookieAuth(),
    Roles('BUYER', 'ADMIN'),
    Controller('manufacturers/:code/reviews'),
    __metadata("design:paramtypes", [ReviewsService])
], PublicReviewsController);
export { PublicReviewsController };
let AdminDisputesController = class AdminDisputesController {
    disputes;
    constructor(disputes) {
        this.disputes = disputes;
    }
    list() {
        return this.disputes.list();
    }
    assign(admin, id) {
        return this.disputes.assign(admin.id, id);
    }
    resolve(admin, id, dto) {
        return this.disputes.resolve(admin.id, id, dto);
    }
};
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: AdminDisputeSummarySchema.array() }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "list", null);
__decorate([
    Post(':id/assign'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Take the dispute on (OPEN → UNDER_REVIEW)' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "assign", null);
__decorate([
    Post(':id/resolve'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Resolve: outcome, optional refund from escrow, where the order goes' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Body(new ZodValidationPipe(ResolveDisputeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminDisputesController.prototype, "resolve", null);
AdminDisputesController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin/disputes'),
    __metadata("design:paramtypes", [DisputesService])
], AdminDisputesController);
export { AdminDisputesController };
//# sourceMappingURL=trust.controller.js.map