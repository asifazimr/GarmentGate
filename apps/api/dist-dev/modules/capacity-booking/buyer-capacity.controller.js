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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingReasonSchema, BookingTermsQuerySchema, BookingTermsSchema, BuyerBookingSchema, BuyerCapacityOverviewSchema, CapacitySearchQuerySchema, CapacitySearchResponseSchema, ConvertBookingSchema, ConvertedBookingSchema, CreateBookingSchema, CreatePartnershipSchema, MarkSentSchema, PayBookingDepositSchema, PaymentStartSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { IdSchema } from '../orders/order-params.js';
import { BookingSearchService } from './booking-search.service.js';
import { BookingCodeSchema, PartnershipCodeSchema } from './booking-params.js';
import { BookingsService } from './bookings.service.js';
import { PartnershipsService } from './partnerships.service.js';
const Created = z.object({ code: z.string() });
let BuyerCapacityController = class BuyerCapacityController {
    context;
    search;
    bookings;
    partnerships;
    constructor(context, search, bookings, partnerships) {
        this.context = context;
        this.search = search;
        this.bookings = bookings;
        this.partnerships = partnerships;
    }
    async find(user, query) {
        await this.context.verified(user.id);
        return this.search.search(query);
    }
    async terms(user, id, query) {
        await this.context.verified(user.id);
        return this.bookings.terms(id, query);
    }
    async create(user, dto) {
        return this.bookings.create(await this.context.verified(user.id), dto);
    }
    async overview(user) {
        const ctx = await this.context.verified(user.id);
        const [bookings, partnerships] = await Promise.all([
            this.bookings.buyerList(ctx),
            this.partnerships.buyerList(ctx),
        ]);
        return { bookings, partnerships };
    }
    async get(user, code) {
        return this.bookings.buyerGet(await this.context.verified(user.id), code);
    }
    async deposit(user, code, dto) {
        return this.bookings.payDeposit(await this.context.verified(user.id), code, dto.method);
    }
    async depositSent(user, code, paymentId, dto) {
        await this.bookings.markDepositSent(await this.context.verified(user.id), code, paymentId, dto);
    }
    async cancel(user, code, dto) {
        await this.bookings.cancelByBuyer(await this.context.verified(user.id), code, dto.reason);
    }
    async convert(user, code, dto) {
        return this.bookings.convert(await this.context.verified(user.id), code, dto);
    }
    async partnership(user, dto) {
        return this.partnerships.request(await this.context.verified(user.id), dto);
    }
    async cancelPartnership(user, code, dto) {
        await this.partnerships.cancel(await this.context.verified(user.id), code, dto.reason);
    }
};
__decorate([
    Get('search'),
    ApiOperation({ summary: 'Open line time by category and dates (anonymized)' }),
    ApiOkResponse({ standardSchema: CapacitySearchResponseSchema }),
    __param(0, CurrentUser()),
    __param(1, Query(new ZodValidationPipe(CapacitySearchQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "find", null);
__decorate([
    Get('slots/:id/terms'),
    ApiOkResponse({ standardSchema: BookingTermsSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', new ZodValidationPipe(IdSchema))),
    __param(2, Query(new ZodValidationPipe(BookingTermsQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "terms", null);
__decorate([
    Post('bookings'),
    ApiOperation({ summary: 'Hold line minutes (reserved at once; the hold expires)' }),
    ApiOkResponse({ standardSchema: Created }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(CreateBookingSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "create", null);
__decorate([
    Get('bookings'),
    ApiOkResponse({ standardSchema: BuyerCapacityOverviewSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "overview", null);
__decorate([
    Get('bookings/:code'),
    ApiOkResponse({ standardSchema: BuyerBookingSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(BookingCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "get", null);
__decorate([
    Post('bookings/:code/deposit'),
    ApiOperation({ summary: 'Pay the deposit into escrow' }),
    ApiOkResponse({ standardSchema: PaymentStartSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(BookingCodeSchema))),
    __param(2, Body(new ZodValidationPipe(PayBookingDepositSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "deposit", null);
__decorate([
    Post('bookings/:code/deposit/:paymentId/sent'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(BookingCodeSchema))),
    __param(2, Param('paymentId', new ZodValidationPipe(IdSchema))),
    __param(3, Body(new ZodValidationPipe(MarkSentSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "depositSent", null);
__decorate([
    Post('bookings/:code/cancel'),
    HttpCode(HttpStatus.NO_CONTENT),
    ApiOperation({ summary: 'Cancel (free while held; the cancellation tiers once confirmed)' }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(BookingCodeSchema))),
    __param(2, Body(new ZodValidationPipe(BookingReasonSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "cancel", null);
__decorate([
    Post('bookings/:code/convert'),
    ApiOperation({ summary: 'Turn a confirmed booking into an order (CMT) or a quote request' }),
    ApiOkResponse({ standardSchema: ConvertedBookingSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(BookingCodeSchema))),
    __param(2, Body(new ZodValidationPipe(ConvertBookingSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "convert", null);
__decorate([
    Post('partnerships'),
    ApiOperation({ summary: 'Ask for the same minutes every month for 6–12 months' }),
    ApiOkResponse({ standardSchema: Created }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(CreatePartnershipSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "partnership", null);
__decorate([
    Post('partnerships/:code/cancel'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(PartnershipCodeSchema))),
    __param(2, Body(new ZodValidationPipe(BookingReasonSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BuyerCapacityController.prototype, "cancelPartnership", null);
BuyerCapacityController = __decorate([
    ApiTags('capacity-booking'),
    ApiCookieAuth(),
    Roles('BUYER'),
    Controller('capacity'),
    __metadata("design:paramtypes", [BuyerContextService,
        BookingSearchService,
        BookingsService,
        PartnershipsService])
], BuyerCapacityController);
export { BuyerCapacityController };
//# sourceMappingURL=buyer-capacity.controller.js.map