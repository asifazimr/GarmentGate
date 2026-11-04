import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  type AdminBooking,
  AdminBookingSchema,
  AdminBookingsQuerySchema,
  type BookingReasonDto,
  BookingReasonSchema,
  type CapacityBookingSettings,
  type CapacityBookingSettingsDto,
  CapacityBookingSettingsSchema,
  type CapacityBookingStatus,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { BookingCodeSchema } from './booking-params.js';
import { BookingSettingsService } from './booking-settings.service.js';
import { BookingsService } from './bookings.service.js';

/** Staff: booking fee, deposit and cancellation policy; every booking with real identities. */
@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin/capacity-booking')
export class AdminBookingsController {
  constructor(
    private readonly settings: BookingSettingsService,
    private readonly bookings: BookingsService,
  ) {}

  @Get('settings')
  @ApiOkResponse({ standardSchema: CapacityBookingSettingsSchema })
  getSettings(): Promise<CapacityBookingSettings> {
    return this.settings.get();
  }

  @Put('settings')
  @ApiOkResponse({ standardSchema: CapacityBookingSettingsSchema })
  setSettings(
    @CurrentUser() admin: AuthenticatedUser,
    @Body(new ZodValidationPipe(CapacityBookingSettingsSchema)) dto: CapacityBookingSettingsDto,
  ): Promise<CapacityBookingSettings> {
    return this.settings.set(admin.id, dto);
  }

  @Get('bookings')
  @ApiOkResponse({ standardSchema: z.array(AdminBookingSchema) })
  list(
    @Query(new ZodValidationPipe(AdminBookingsQuerySchema))
    query: {
      status?: CapacityBookingStatus;
    },
  ): Promise<AdminBooking[]> {
    return this.bookings.adminList(query.status);
  }

  @Post('bookings/:code/cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  cancel(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(BookingCodeSchema)) code: string,
    @Body(new ZodValidationPipe(BookingReasonSchema)) dto: BookingReasonDto,
  ): Promise<void> {
    return this.bookings.adminCancel(admin.id, code, dto.reason);
  }

  @Post('bookings/:code/compensation')
  @HttpCode(HttpStatus.NO_CONTENT)
  compensation(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(BookingCodeSchema)) code: string,
  ): Promise<void> {
    return this.bookings.payCompensation(admin.id, code);
  }
}
