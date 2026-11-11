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
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookingReasonSchema, ManufacturerBookingInboxSchema, ManufacturerBookingSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { BookingCodeSchema, PartnershipCodeSchema } from './booking-params.js';
import { BookingsService } from './bookings.service.js';
import { PartnershipsService } from './partnerships.service.js';
let ManufacturerBookingsController = class ManufacturerBookingsController {
    context;
    bookings;
    partnerships;
    constructor(context, bookings, partnerships) {
        this.context = context;
        this.bookings = bookings;
        this.partnerships = partnerships;
    }
    async inbox(user) {
        const ctx = await this.context.verified(user.id);
        const [bookings, partnerships] = await Promise.all([
            this.bookings.factoryList(ctx),
            this.partnerships.factoryList(ctx),
        ]);
        return { bookings, partnerships };
    }
    async get(user, code) {
        return this.bookings.factoryGet(await this.context.verified(user.id), code);
    }
    async accept(user, code) {
        await this.bookings.accept(await this.context.verified(user.id), code);
    }
    async decline(user, code, dto) {
        await this.bookings.decline(await this.context.verified(user.id), code, dto.reason);
    }
    async acceptPartnership(user, code) {
        await this.partnerships.accept(await this.context.verified(user.id), code);
    }
    async declinePartnership(user, code, dto) {
        await this.partnerships.decline(await this.context.verified(user.id), code, dto.reason);
    }
};
__decorate([
    Get('bookings'),
    ApiOkResponse({ standardSchema: ManufacturerBookingInboxSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ManufacturerBookingsController.prototype, "inbox", null);
__decorate([
    Get('bookings/:code'),
    ApiOkResponse({ standardSchema: ManufacturerBookingSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(BookingCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerBookingsController.prototype, "get", null);
__decorate([
    Post('bookings/:code/accept'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(BookingCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerBookingsController.prototype, "accept", null);
__decorate([
    Post('bookings/:code/decline'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(BookingCodeSchema))),
    __param(2, Body(new ZodValidationPipe(BookingReasonSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerBookingsController.prototype, "decline", null);
__decorate([
    Post('partnerships/:code/accept'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(PartnershipCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ManufacturerBookingsController.prototype, "acceptPartnership", null);
__decorate([
    Post('partnerships/:code/decline'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(PartnershipCodeSchema))),
    __param(2, Body(new ZodValidationPipe(BookingReasonSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ManufacturerBookingsController.prototype, "declinePartnership", null);
ManufacturerBookingsController = __decorate([
    ApiTags('capacity-booking'),
    ApiCookieAuth(),
    Roles('MANUFACTURER'),
    Controller('manufacturer'),
    __metadata("design:paramtypes", [ManufacturerContextService,
        BookingsService,
        PartnershipsService])
], ManufacturerBookingsController);
export { ManufacturerBookingsController };
//# sourceMappingURL=manufacturer-bookings.controller.js.map