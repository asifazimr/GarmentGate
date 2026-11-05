import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import {
  type BuyerTracking,
  BuyerDocumentTypeSchema,
  BuyerTrackingSchema,
  type BookPickupDto,
  BookPickupSchema,
  type ConsolidationCandidate,
  ConsolidationCandidateSchema,
  type ConsolidationOption,
  ConsolidationOptionSchema,
  type ConsolidationQuoteRequest,
  ConsolidationQuoteRequestSchema,
  type FactoryOrderLogistics,
  FactoryOrderLogisticsSchema,
  type OrderPackingDto,
  OrderPackingInputSchema,
} from '@garmentgate/shared';
import type { Response } from 'express';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { CodeSchema } from '../orders/order-params.js';
import { ConsolidationService } from './consolidation.service.js';
import { TrackingService } from './tracking.service.js';
import { HubFlowService } from './hub-flow.service.js';
import { ConsolidationCodeSchema } from './logistics-params.js';

const code = new ZodValidationPipe(CodeSchema);

/**
 * The factory's side of a GarmentGate-shipped order (packing, pickup to a hub, carton
 * markings) and the buyer's "ship together" option.
 */
@ApiTags('logistics')
@ApiCookieAuth()
@Controller()
export class OrderShippingController {
  constructor(
    private readonly actors: ChatActorService,
    private readonly hubFlow: HubFlowService,
    private readonly consolidation: ConsolidationService,
    private readonly tracking: TrackingService,
  ) {}

  @Get('orders/:code/logistics/tracking')
  @Roles('BUYER')
  @ApiOperation({
    summary: 'GarmentGate tracking across every leg (null before a shipment exists)',
  })
  @ApiOkResponse({ standardSchema: BuyerTrackingSchema.nullable() })
  async track(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', code) orderCode: string,
  ): Promise<BuyerTracking | null> {
    return this.tracking.buyerTracking(await this.actors.resolve(user.id), orderCode);
  }

  @Get('orders/:code/logistics/documents/:type')
  @Roles('BUYER')
  @ApiProduces('application/pdf')
  async buyerDocument(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', code) orderCode: string,
    @Param('type', new ZodValidationPipe(BuyerDocumentTypeSchema))
    type: z.infer<typeof BuyerDocumentTypeSchema>,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { file, name } = await this.tracking.buyerDocument(
      await this.actors.resolve(user.id),
      orderCode,
      type,
    );
    res.setHeader('Cache-Control', 'private, no-store');
    return new StreamableFile(file, {
      type: 'application/pdf',
      disposition: `inline; filename="${name}"`,
    });
  }

  @Get('orders/:code/logistics/factory')
  @Roles('MANUFACTURER')
  @ApiOkResponse({ standardSchema: FactoryOrderLogisticsSchema })
  async factory(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', code) orderCode: string,
  ): Promise<FactoryOrderLogistics> {
    return this.hubFlow.factoryView(await this.actors.resolve(user.id), orderCode);
  }

  @Put('orders/:code/logistics/packing')
  @Roles('MANUFACTURER')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Factory: cartons, weights and volume as packed' })
  async packing(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', code) orderCode: string,
    @Body(new ZodValidationPipe(OrderPackingInputSchema)) dto: OrderPackingDto,
  ): Promise<void> {
    await this.hubFlow.savePacking(await this.actors.resolve(user.id), orderCode, dto);
  }

  @Post('orders/:code/logistics/pickup')
  @Roles('MANUFACTURER')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Factory: ask GarmentGate to collect the goods for one of its hubs' })
  async pickup(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', code) orderCode: string,
    @Body(new ZodValidationPipe(BookPickupSchema)) dto: BookPickupDto,
  ): Promise<void> {
    await this.hubFlow.bookPickup(await this.actors.resolve(user.id), orderCode, dto);
  }

  @Get('orders/:code/logistics/carton-markings')
  @Roles('MANUFACTURER', 'ADMIN')
  @ApiProduces('application/pdf')
  @ApiOperation({ summary: 'GarmentGate carton markings (hub, order, carton count; no buyer)' })
  async markings(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', code) orderCode: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { file, name } = await this.hubFlow.cartonMarkings(
      await this.actors.resolve(user.id),
      orderCode,
    );
    res.setHeader('Cache-Control', 'private, no-store');
    return new StreamableFile(file, {
      type: 'application/pdf',
      disposition: `inline; filename="${name}"`,
    });
  }

  @Get('orders/:code/logistics/consolidation-candidates')
  @Roles('BUYER')
  @ApiOkResponse({ standardSchema: z.array(ConsolidationCandidateSchema) })
  async candidates(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', code) orderCode: string,
  ): Promise<ConsolidationCandidate[]> {
    return this.consolidation.candidates(await this.actors.resolve(user.id), orderCode);
  }

  @Post('logistics/consolidations/quotes')
  @Roles('BUYER')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'One price for several orders shipped together, shared by weight' })
  @ApiOkResponse({ standardSchema: z.array(ConsolidationOptionSchema) })
  async consolidate(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(ConsolidationQuoteRequestSchema)) dto: ConsolidationQuoteRequest,
  ): Promise<ConsolidationOption[]> {
    return this.consolidation.quote(await this.actors.resolve(user.id), dto);
  }

  @Post('logistics/consolidations/:code/accept')
  @Roles('BUYER')
  @HttpCode(HttpStatus.NO_CONTENT)
  async acceptConsolidation(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(ConsolidationCodeSchema)) consolidationCode: string,
  ): Promise<void> {
    await this.consolidation.accept(await this.actors.resolve(user.id), consolidationCode);
  }
}
