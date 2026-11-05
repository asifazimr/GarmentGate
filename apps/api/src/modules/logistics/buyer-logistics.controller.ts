import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type BuyerOrderLogistics,
  BuyerOrderLogisticsSchema,
  type BuyerShippingOption,
  BuyerShippingOptionSchema,
  type PayLogisticsDto,
  PayLogisticsSchema,
  type PaymentStart,
  PaymentStartSchema,
  type ShippingQuoteRequest,
  ShippingQuoteRequestSchema,
  type HandoverRequestDto,
  HandoverRequestSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { OrderLogisticsService } from './order-logistics.service.js';

/** The buyer's shipping step on an order: GarmentGate prices, the buyer chooses and pays. */
@ApiTags('logistics')
@ApiCookieAuth()
@Roles('BUYER')
@Controller('orders/:code/logistics')
export class BuyerLogisticsController {
  constructor(
    private readonly actors: ChatActorService,
    private readonly logistics: OrderLogisticsService,
  ) {}

  @Get()
  @ApiOkResponse({ standardSchema: BuyerOrderLogisticsSchema })
  async view(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
  ): Promise<BuyerOrderLogistics> {
    return this.logistics.view(await this.actors.resolve(user.id), code);
  }

  @Post('quotes')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Shipping prices for each mode the terms allow, with landed cost' })
  @ApiOkResponse({ standardSchema: z.array(BuyerShippingOptionSchema) })
  async quote(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(ShippingQuoteRequestSchema)) dto: ShippingQuoteRequest,
  ): Promise<BuyerShippingOption[]> {
    return this.logistics.quote(await this.actors.resolve(user.id), code, dto);
  }

  @Post('quotes/:id/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  async accept(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
  ): Promise<void> {
    await this.logistics.accept(await this.actors.resolve(user.id), code, id);
  }

  @Put('handover')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Use the buyer’s own forwarder: GarmentGate hands the cargo over at its hub (FCA)',
  })
  async handover(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(HandoverRequestSchema)) dto: HandoverRequestDto,
  ): Promise<void> {
    await this.logistics.handover(await this.actors.resolve(user.id), code, dto);
  }

  @Post('payments')
  @ApiOperation({ summary: 'Pay the shipping charge into escrow' })
  @ApiOkResponse({ standardSchema: PaymentStartSchema })
  async pay(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(PayLogisticsSchema)) dto: PayLogisticsDto,
  ): Promise<PaymentStart> {
    return this.logistics.pay(await this.actors.resolve(user.id), code, dto.method);
  }
}
