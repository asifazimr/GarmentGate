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
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManufacturerQuoteSchema, ManufacturerRfqDetailSchema, ManufacturerRfqSummarySchema, QuoteInputSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { ManufacturerRfqsService } from './manufacturer-rfqs.service.js';
const RfqCodeSchema = z.string().regex(/^RFQ-\d{4}-\d{4,}$/, { error: 'Unknown RFQ' });
let ManufacturerRfqsController = class ManufacturerRfqsController {
    context;
    rfqs;
    constructor(context, rfqs) {
        this.context = context;
        this.rfqs = rfqs;
    }
    async inbox(user) {
        return this.rfqs.inbox(await this.context.verified(user.id));
    }
    async detail(user, code) {
        return this.rfqs.detail(await this.context.verified(user.id), code);
    }
    async quote(user, code, dto) {
        return this.rfqs.submitQuote(await this.context.verified(user.id), code, dto);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'RFQ inbox: invited and matched requests (anonymised buyers)' }),
    ApiOkResponse({ standardSchema: ManufacturerRfqSummarySchema.array() }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManufacturerRfqsController.prototype, "inbox", null);
__decorate([
    Get(':code'),
    ApiOkResponse({ standardSchema: ManufacturerRfqDetailSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(RfqCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerRfqsController.prototype, "detail", null);
__decorate([
    Put(':code/quote'),
    ApiOperation({ summary: 'Submit or update your quote (your own price)' }),
    ApiOkResponse({ standardSchema: ManufacturerQuoteSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(RfqCodeSchema))),
    __param(2, Body(new ZodValidationPipe(QuoteInputSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerRfqsController.prototype, "quote", null);
ManufacturerRfqsController = __decorate([
    ApiTags('manufacturer'),
    ApiCookieAuth(),
    Roles('MANUFACTURER'),
    Controller('manufacturer/rfqs'),
    __metadata("design:paramtypes", [ManufacturerContextService,
        ManufacturerRfqsService])
], ManufacturerRfqsController);
export { ManufacturerRfqsController };
//# sourceMappingURL=manufacturer-rfqs.controller.js.map