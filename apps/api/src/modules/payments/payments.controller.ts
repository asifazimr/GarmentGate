import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  type RawBodyRequest,
  Req,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import {
  type BuyerPayments,
  BuyerPaymentsSchema,
  type ConfirmPaymentDto,
  ConfirmPaymentSchema,
  type FinanceInbox,
  FinanceInboxSchema,
  type FxRates,
  FxRatesSchema,
  type LedgerBalances,
  LedgerBalancesSchema,
  type ManufacturerPayouts,
  ManufacturerPayoutsSchema,
  type MarkSentDto,
  MarkSentSchema,
  type OrderFinance,
  OrderFinanceSchema,
  type PaymentStart,
  PaymentStartSchema,
  type PayoutDto,
  PayoutSchema,
  type PresignProofDto,
  PresignProofSchema,
  type PresignUploadResponse,
  type RefundDto,
  RefundSchema,
  type RejectPaymentDto,
  RejectPaymentSchema,
  type ReleaseSchedule,
  ReleaseScheduleSchema,
  type StartPaymentDto,
  StartPaymentSchema,
} from '@garmentgate/shared';
import type { Request } from 'express';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Public, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { FxService } from './fx.service.js';
import { PaymentsService } from './payments.service.js';
import { StripeProvider } from './providers/stripe.provider.js';

const CodeSchema = z.string().regex(/^ORD-\d{4}-\d{4,}$/, { error: 'Unknown order' });

/** Buyers pay (in GarmentGate's prices); factories see their payouts (in their own prices). */
@ApiTags('payments')
@ApiCookieAuth()
@Controller()
export class PaymentsController {
  constructor(
    private readonly actors: ChatActorService,
    private readonly payments: PaymentsService,
    private readonly stripe: StripeProvider,
  ) {}

  @Get('orders/:code/payments')
  @Roles('BUYER')
  @ApiOkResponse({ standardSchema: BuyerPaymentsSchema })
  async buyerPayments(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
  ): Promise<BuyerPayments> {
    return this.payments.buyerView(await this.actors.resolve(user.id), code);
  }

  @Post('orders/:code/payments')
  @Roles('BUYER')
  @ApiOperation({ summary: 'Pay the deposit or balance: bank transfer, letter of credit or card' })
  @ApiOkResponse({ standardSchema: PaymentStartSchema })
  async start(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(StartPaymentSchema)) dto: StartPaymentDto,
  ): Promise<PaymentStart> {
    return this.payments.start(await this.actors.resolve(user.id), code, dto);
  }

  @Post('orders/:code/payments/:id/sent')
  @Roles('BUYER')
  @HttpCode(HttpStatus.NO_CONTENT)
  async markSent(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(MarkSentSchema)) dto: MarkSentDto,
  ): Promise<void> {
    await this.payments.markSent(await this.actors.resolve(user.id), code, id, dto);
  }

  @Get('orders/:code/payouts')
  @Roles('MANUFACTURER')
  @ApiOkResponse({ standardSchema: ManufacturerPayoutsSchema })
  async orderPayouts(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
  ): Promise<ManufacturerPayouts> {
    return this.payments.manufacturerView(await this.actors.resolve(user.id), code);
  }

  @Get('manufacturer/payouts')
  @Roles('MANUFACTURER')
  @ApiOkResponse({ standardSchema: ManufacturerPayoutsSchema.array() })
  async payouts(@CurrentUser() user: AuthenticatedUser): Promise<ManufacturerPayouts[]> {
    return this.payments.manufacturerOverview(await this.actors.resolve(user.id));
  }

  /** Stripe → us. Authenticated by Stripe's signature, not a session. */
  @Post('payments/stripe/webhook')
  @Public()
  @SkipThrottle()
  @HttpCode(HttpStatus.OK)
  @ApiExcludeEndpoint()
  async stripeWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string | undefined,
  ) {
    if (!req.rawBody || !signature) throw new BadRequestException('Missing signature');
    let event;
    try {
      event = this.stripe.event(req.rawBody, signature);
    } catch {
      throw new BadRequestException('Invalid signature');
    }
    await this.payments.stripeEvent(event);
    return { received: true };
  }
}

/** Staff finance: confirm payments, release tranches, pay out, refund, reconcile. Shows margins. */
@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin/finance')
export class AdminFinanceController {
  constructor(
    private readonly payments: PaymentsService,
    private readonly fx: FxService,
  ) {}

  @Get('inbox')
  @ApiOkResponse({ standardSchema: FinanceInboxSchema })
  inbox(): Promise<FinanceInbox> {
    return this.payments.inbox();
  }

  @Get('balances')
  @ApiOkResponse({ standardSchema: LedgerBalancesSchema })
  balances(): Promise<LedgerBalances> {
    return this.payments.balances();
  }

  @Get('orders/:code')
  @ApiOkResponse({ standardSchema: OrderFinanceSchema })
  order(@Param('code', new ZodValidationPipe(CodeSchema)) code: string): Promise<OrderFinance> {
    return this.payments.orderFinance(code);
  }

  @Post('payments/:id/uploads')
  presignProof(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(PresignProofSchema)) dto: PresignProofDto,
  ): Promise<PresignUploadResponse> {
    return this.payments.presignProof(user.id, id, dto);
  }

  @Post('payments/:id/confirm')
  @HttpCode(HttpStatus.NO_CONTENT)
  confirm(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ConfirmPaymentSchema)) dto: ConfirmPaymentDto,
  ): Promise<void> {
    return this.payments.confirm(user.id, id, dto);
  }

  @Post('payments/:id/reject')
  @HttpCode(HttpStatus.NO_CONTENT)
  reject(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(RejectPaymentSchema)) dto: RejectPaymentDto,
  ): Promise<void> {
    return this.payments.reject(user.id, id, dto.reason);
  }

  @Post('releases/:id/approve')
  @HttpCode(HttpStatus.NO_CONTENT)
  approve(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.payments.approveRelease(user.id, id);
  }

  @Post('releases/:id/payout')
  @HttpCode(HttpStatus.NO_CONTENT)
  payout(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(PayoutSchema)) dto: PayoutDto,
  ): Promise<void> {
    return this.payments.payout(user.id, id, dto);
  }

  @Post('orders/:code/refunds')
  @HttpCode(HttpStatus.NO_CONTENT)
  refund(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(RefundSchema)) dto: RefundDto,
  ): Promise<void> {
    return this.payments.refund(user.id, code, dto);
  }

  @Get('schedule')
  schedule(): Promise<ReleaseSchedule> {
    return this.payments.releaseSchedule();
  }

  @Put('schedule')
  @HttpCode(HttpStatus.NO_CONTENT)
  setSchedule(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(ReleaseScheduleSchema)) dto: ReleaseSchedule,
  ): Promise<void> {
    return this.payments.setReleaseSchedule(user.id, dto);
  }

  @Get('rates')
  rates(): Promise<FxRates> {
    return this.fx.rates().then((r) => FxRatesSchema.parse(r));
  }

  @Put('rates')
  @HttpCode(HttpStatus.NO_CONTENT)
  setRates(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(FxRatesSchema)) dto: FxRates,
  ): Promise<void> {
    return this.fx.update(user.id, dto);
  }
}
