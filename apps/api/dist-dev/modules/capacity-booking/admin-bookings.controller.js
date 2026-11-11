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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminBookingSchema, AdminBookingsQuerySchema, BookingReasonSchema, CapacityBookingSettingsSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { BookingCodeSchema } from './booking-params.js';
import { BookingSettingsService } from './booking-settings.service.js';
import { BookingsService } from './bookings.service.js';
let AdminBookingsController = class AdminBookingsController {
    settings;
    bookings;
    constructor(settings, bookings) {
        this.settings = settings;
        this.bookings = bookings;
    }
    getSettings() {
        return this.settings.get();
    }
    setSettings(admin, dto) {
        return this.settings.set(admin.id, dto);
    }
    list(query) {
        return this.bookings.adminList(query.status);
    }
    cancel(admin, code, dto) {
        return this.bookings.adminCancel(admin.id, code, dto.reason);
    }
    compensation(admin, code) {
        return this.bookings.payCompensation(admin.id, code);
    }
};
__decorate([
    Get('settings'),
    ApiOkResponse({ standardSchema: CapacityBookingSettingsSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminBookingsController.prototype, "getSettings", null);
__decorate([
    Put('settings'),
    ApiOkResponse({ standardSchema: CapacityBookingSettingsSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(CapacityBookingSettingsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminBookingsController.prototype, "setSettings", null);
__decorate([
    Get('bookings'),
    ApiOkResponse({ standardSchema: z.array(AdminBookingSchema) }),
    __param(0, Query(new ZodValidationPipe(AdminBookingsQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminBookingsController.prototype, "list", null);
__decorate([
    Post('bookings/:code/cancel'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(BookingCodeSchema))),
    __param(2, Body(new ZodValidationPipe(BookingReasonSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminBookingsController.prototype, "cancel", null);
__decorate([
    Post('bookings/:code/compensation'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('code', new ZodValidationPipe(BookingCodeSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AdminBookingsController.prototype, "compensation", null);
AdminBookingsController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin/capacity-booking'),
    __metadata("design:paramtypes", [BookingSettingsService,
        BookingsService])
], AdminBookingsController);
export { AdminBookingsController };
//# sourceMappingURL=admin-bookings.controller.js.map