import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type BookingReasonDto,
  BookingReasonSchema,
  type BookingTerms,
  type BookingTermsQuery,
  BookingTermsQuerySchema,
  BookingTermsSchema,
  type BuyerBooking,
  BuyerBookingSchema,
  type BuyerCapacityOverview,
  BuyerCapacityOverviewSchema,
  type CapacitySearchQuery,
  CapacitySearchQuerySchema,
  type CapacitySearchResponse,
  CapacitySearchResponseSchema,
  type ConvertBookingDto,
  ConvertBookingSchema,
  type ConvertedBooking,
  ConvertedBookingSchema,
  type CreateBookingDto,
  CreateBookingSchema,
  type CreatePartnershipDto,
  CreatePartnershipSchema,
  type MarkSentDto,
  MarkSentSchema,
  type PayBookingDepositDto,
  PayBookingDepositSchema,
  type PaymentStart,
  PaymentStartSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { IdSchema } from '../orders/order-params.js';
import { BookingSearchService } from './booking-search.service.js';
import { BookingCodeSchema, PartnershipCodeSchema } from './booking-params.js';
import { BookingsService } from './bookings.service.js';
import { PartnershipsService } from './partnerships.service.js';

const Created = z.object({ code: z.string() });

/** Buyers: find open line time, hold it, pay the deposit, convert to an order. */
@ApiTags('capacity-booking')
@ApiCookieAuth()
@Roles('BUYER')
@Controller('capacity')
export class BuyerCapacityController {
  constructor(
    private readonly context: BuyerContextService,
    private readonly search: BookingSearchService,
    private readonly bookings: BookingsService,
    private readonly partnerships: PartnershipsService,
  ) {}

  @Get('search')
  @ApiOperation({ summary: 'Open line time by category and dates (anonymized)' })
  @ApiOkResponse({ standardSchema: CapacitySearchResponseSchema })
  async find(
    @CurrentUser() user: AuthenticatedUser,
    @Query(new ZodValidationPipe(CapacitySearchQuerySchema)) query: CapacitySearchQuery,
  ): Promise<CapacitySearchResponse> {
    await this.context.verified(user.id);
    return this.search.search(query);
  }

  @Get('slots/:id/terms')
  @ApiOkResponse({ standardSchema: BookingTermsSchema })
  async terms(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Query(new ZodValidationPipe(BookingTermsQuerySchema)) query: BookingTermsQuery,
  ): Promise<BookingTerms> {
    await this.context.verified(user.id);
    return this.bookings.terms(id, query);
  }

  @Post('bookings')
  @ApiOperation({ summary: 'Hold line minutes (reserved at once; the hold expires)' })
  @ApiOkResponse({ standardSchema: Created })
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(CreateBookingSchema)) dto: CreateBookingDto,
  ): Promise<{ code: string }> {
    return this.bookings.create(await this.context.verified(user.id), dto);
  }

  @Get('bookings')
  @ApiOkResponse({ standardSchema: BuyerCapacityOverviewSchema })
  async overview(@CurrentUser() user: AuthenticatedUser): Promise<BuyerCapacityOverview> {
    const ctx = await this.context.verified(user.id);
    const [bookings, partnerships] = await Promise.all([
      this.bookings.buyerList(ctx),
      this.partnerships.buyerList(ctx),
    ]);
    return { bookings, partnerships };
  }

  @Get('bookings/:code')
  @ApiOkResponse({ standardSchema: BuyerBookingSchema })
  async get(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(BookingCodeSchema)) code: string,
  ): Promise<BuyerBooking> {
    return this.bookings.buyerGet(await this.context.verified(user.id), code);
  }

  @Post('bookings/:code/deposit')
  @ApiOperation({ summary: 'Pay the deposit into escrow' })
  @ApiOkResponse({ standardSchema: PaymentStartSchema })
  async deposit(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(BookingCodeSchema)) code: string,
    @Body(new ZodValidationPipe(PayBookingDepositSchema)) dto: PayBookingDepositDto,
  ): Promise<PaymentStart> {
    return this.bookings.payDeposit(await this.context.verified(user.id), code, dto.method);
  }

  @Post('bookings/:code/deposit/:paymentId/sent')
  @HttpCode(HttpStatus.NO_CONTENT)
  async depositSent(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(BookingCodeSchema)) code: string,
    @Param('paymentId', new ZodValidationPipe(IdSchema)) paymentId: string,
    @Body(new ZodValidationPipe(MarkSentSchema)) dto: MarkSentDto,
  ): Promise<void> {
    await this.bookings.markDepositSent(await this.context.verified(user.id), code, paymentId, dto);
  }

  @Post('bookings/:code/cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Cancel (free while held; the cancellation tiers once confirmed)' })
  async cancel(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(BookingCodeSchema)) code: string,
    @Body(new ZodValidationPipe(BookingReasonSchema)) dto: BookingReasonDto,
  ): Promise<void> {
    await this.bookings.cancelByBuyer(await this.context.verified(user.id), code, dto.reason);
  }

  @Post('bookings/:code/convert')
  @ApiOperation({ summary: 'Turn a confirmed booking into an order (CMT) or a quote request' })
  @ApiOkResponse({ standardSchema: ConvertedBookingSchema })
  async convert(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(BookingCodeSchema)) code: string,
    @Body(new ZodValidationPipe(ConvertBookingSchema)) dto: ConvertBookingDto,
  ): Promise<ConvertedBooking> {
    return this.bookings.convert(await this.context.verified(user.id), code, dto);
  }

  @Post('partnerships')
  @ApiOperation({ summary: 'Ask for the same minutes every month for 6–12 months' })
  @ApiOkResponse({ standardSchema: Created })
  async partnership(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(CreatePartnershipSchema)) dto: CreatePartnershipDto,
  ): Promise<{ code: string }> {
    return this.partnerships.request(await this.context.verified(user.id), dto);
  }

  @Post('partnerships/:code/cancel')
  @HttpCode(HttpStatus.NO_CONTENT)
  async cancelPartnership(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(PartnershipCodeSchema)) code: string,
    @Body(new ZodValidationPipe(BookingReasonSchema)) dto: BookingReasonDto,
  ): Promise<void> {
    await this.partnerships.cancel(await this.context.verified(user.id), code, dto.reason);
  }
}
