import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  type BookingReasonDto,
  BookingReasonSchema,
  type ManufacturerBooking,
  type ManufacturerBookingInbox,
  ManufacturerBookingInboxSchema,
  ManufacturerBookingSchema,
} from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { BookingCodeSchema, PartnershipCodeSchema } from './booking-params.js';
import { BookingsService } from './bookings.service.js';
import { PartnershipsService } from './partnerships.service.js';

/** The factory's booking requests inbox: buyers appear as BYR- codes only. */
@ApiTags('capacity-booking')
@ApiCookieAuth()
@Roles('MANUFACTURER')
@Controller('manufacturer')
export class ManufacturerBookingsController {
  constructor(
    private readonly context: ManufacturerContextService,
    private readonly bookings: BookingsService,
    private readonly partnerships: PartnershipsService,
  ) {}

  @Get('bookings')
  @ApiOkResponse({ standardSchema: ManufacturerBookingInboxSchema })
  async inbox(@CurrentUser() user: AuthenticatedUser): Promise<ManufacturerBookingInbox> {
    const ctx = await this.context.verified(user.id);
    const [bookings, partnerships] = await Promise.all([
      this.bookings.factoryList(ctx),
      this.partnerships.factoryList(ctx),
    ]);
    return { bookings, partnerships };
  }

  @Get('bookings/:code')
  @ApiOkResponse({ standardSchema: ManufacturerBookingSchema })
  async get(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(BookingCodeSchema)) code: string,
  ): Promise<ManufacturerBooking> {
    return this.bookings.factoryGet(await this.context.verified(user.id), code);
  }

  @Post('bookings/:code/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  async accept(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(BookingCodeSchema)) code: string,
  ): Promise<void> {
    await this.bookings.accept(await this.context.verified(user.id), code);
  }

  @Post('bookings/:code/decline')
  @HttpCode(HttpStatus.NO_CONTENT)
  async decline(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(BookingCodeSchema)) code: string,
    @Body(new ZodValidationPipe(BookingReasonSchema)) dto: BookingReasonDto,
  ): Promise<void> {
    await this.bookings.decline(await this.context.verified(user.id), code, dto.reason);
  }

  @Post('partnerships/:code/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  async acceptPartnership(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(PartnershipCodeSchema)) code: string,
  ): Promise<void> {
    await this.partnerships.accept(await this.context.verified(user.id), code);
  }

  @Post('partnerships/:code/decline')
  @HttpCode(HttpStatus.NO_CONTENT)
  async declinePartnership(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(PartnershipCodeSchema)) code: string,
    @Body(new ZodValidationPipe(BookingReasonSchema)) dto: BookingReasonDto,
  ): Promise<void> {
    await this.partnerships.decline(await this.context.verified(user.id), code, dto.reason);
  }
}
