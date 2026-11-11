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
import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AcceptQuoteResultSchema, BuyerRfqDetailSchema, BuyerRfqSummarySchema, PresignRfqFileSchema, PresignUploadResponseSchema, RFQ_FILE_MAX_BYTES, RfqCreatedSchema, RfqInputSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { FilesService } from '../storage/files.service.js';
import { BuyerRfqsService } from './buyer-rfqs.service.js';
import { UploadThrottle } from '../../common/throttle/limits.js';
const RfqCodeSchema = z.string().regex(/^RFQ-\d{4}-\d{4,}$/, { error: 'Unknown RFQ' });
let BuyerRfqsController = class BuyerRfqsController {
    context;
    rfqs;
    files;
    constructor(context, rfqs, files) {
        this.context = context;
        this.rfqs = rfqs;
        this.files = files;
    }
    async presign(user, dto) {
        const ctx = await this.context.verified(user.id);
        return this.files.reserveUpload({
            userId: user.id,
            companyId: ctx.companyId,
            purpose: 'TECH_PACK',
            folder: 'originals',
            fileName: dto.fileName,
            contentType: dto.contentType,
            sizeBytes: dto.sizeBytes,
            maxBytes: RFQ_FILE_MAX_BYTES,
        });
    }
    async create(user, dto) {
        return this.rfqs.create(await this.context.verified(user.id), dto);
    }
    async list(user) {
        return this.rfqs.list(await this.context.verified(user.id));
    }
    async detail(user, code) {
        return this.rfqs.detail(await this.context.verified(user.id), code);
    }
    async accept(user, code, quoteId) {
        return this.rfqs.accept(await this.context.verified(user.id), code, quoteId);
    }
};
__decorate([
    Post('uploads'),
    UploadThrottle(),
    ApiOperation({ summary: 'Presigned POST for a tech pack, sketch or reference image' }),
    ApiOkResponse({ standardSchema: PresignUploadResponseSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(PresignRfqFileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerRfqsController.prototype, "presign", null);
__decorate([
    Post(),
    ApiOperation({ summary: 'Publish an RFQ to matching factories' }),
    ApiOkResponse({ standardSchema: RfqCreatedSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(RfqInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerRfqsController.prototype, "create", null);
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: BuyerRfqSummarySchema.array() }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerRfqsController.prototype, "list", null);
__decorate([
    Get(':code'),
    ApiOperation({ summary: 'RFQ with offers to compare (GarmentGate prices, factory codes)' }),
    ApiOkResponse({ standardSchema: BuyerRfqDetailSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(RfqCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BuyerRfqsController.prototype, "detail", null);
__decorate([
    Post(':code/quotes/:quoteId/accept'),
    ApiOperation({ summary: 'Accept an offer: awards the RFQ and drafts the order' }),
    ApiOkResponse({ standardSchema: AcceptQuoteResultSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(RfqCodeSchema))),
    __param(2, Param('quoteId', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], BuyerRfqsController.prototype, "accept", null);
BuyerRfqsController = __decorate([
    ApiTags('rfqs'),
    ApiCookieAuth(),
    Roles('BUYER'),
    Controller('rfqs'),
    __metadata("design:paramtypes", [BuyerContextService,
        BuyerRfqsService,
        FilesService])
], BuyerRfqsController);
export { BuyerRfqsController };
//# sourceMappingURL=buyer-rfqs.controller.js.map