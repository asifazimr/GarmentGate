import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Patch,
  Put,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import {
  type AdminLogisticsClaim,
  AdminLogisticsClaimSchema,
  type LogisticsReport,
  type LogisticsReportQuery,
  LogisticsReportQuerySchema,
  LogisticsReportSchema,
  type OpenClaimDto,
  type PublishShipmentUploadDto,
  PublishShipmentUploadSchema,
  OpenClaimSchema,
  type SettleClaimDto,
  SettleClaimSchema,
  type SubmitClaimDto,
  SubmitClaimSchema,
  type CreatePartnerUserDto,
  CreatePartnerUserSchema,
  type PartnerUser,
  PartnerUserSchema,
  type TrackingEventDto,
  TrackingEventInputSchema,
  type AdminLogisticsOrder,
  AdminLogisticsOrderSchema,
  type AdminShipment,
  type AdminShipmentRow,
  AdminShipmentRowSchema,
  AdminShipmentSchema,
  type CreateShipmentDto,
  CreateShipmentSchema,
  type HubReceiptDto,
  HubReceiptInputSchema,
  type LogisticsDocumentType,
  LogisticsDocumentTypeSchema,
  type PresignHubPhotoDto,
  PresignHubPhotoSchema,
  type PresignUploadResponse,
  type UpdateLegDto,
  UpdateLegSchema,
  type UpdatePickupDto,
  UpdatePickupSchema,
  type UpdateShipmentDto,
  UpdateShipmentSchema,
  type DutyRate,
  type DutyRateDto,
  DutyRateInputSchema,
  DutyRateSchema,
  type FreightOption,
  FreightOptionSchema,
  type FreightQuoteRequest,
  FreightQuoteRequestSchema,
  type Hub,
  type HubDto,
  HubInputSchema,
  HubSchema,
  type LogisticsMarginRule,
  type LogisticsMarginRuleDto,
  LogisticsMarginRuleInputSchema,
  LogisticsMarginRuleSchema,
  type LogisticsPartner,
  type LogisticsPartnerDto,
  LogisticsPartnerInputSchema,
  LogisticsPartnerSchema,
  type LogisticsSettings,
  LogisticsSettingsSchema,
  type RateCard,
  type RateCardDto,
  type SetHsCodeDto,
  SetHsCodeSchema,
  RateCardInputSchema,
  RateCardSchema,
} from '@garmentgate/shared';
import type { Response } from 'express';
import { z } from 'zod';
import { UploadThrottle } from '../../common/throttle/limits.js';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { CodeSchema, IdSchema } from '../orders/order-params.js';
import { ClaimsService } from './claims.service.js';
import { FreightQuotesService } from './freight-quotes.service.js';
import { LogisticsAdminService } from './logistics-admin.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
import { OrderLogisticsService } from './order-logistics.service.js';
import { HubFlowService } from './hub-flow.service.js';
import { ClaimCodeSchema, ShipmentCodeSchema } from './logistics-params.js';
import { ShipmentsService } from './shipments.service.js';
import { TrackingService } from './tracking.service.js';

const id = new ZodValidationPipe(IdSchema);

/** Staff: partners, hubs, rate cards (partner costs), freight margins, duty rates, settings. */
@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin/logistics')
export class AdminLogisticsController {
  constructor(
    private readonly admin: LogisticsAdminService,
    private readonly settings: LogisticsSettingsService,
    private readonly quotes: FreightQuotesService,
    private readonly orders: OrderLogisticsService,
    private readonly hubFlow: HubFlowService,
    private readonly shipments: ShipmentsService,
    private readonly tracking: TrackingService,
    private readonly claims: ClaimsService,
  ) {}

  // ── Claims and reports ──
  @Get('claims')
  @ApiOkResponse({ standardSchema: z.array(AdminLogisticsClaimSchema) })
  listClaims(): Promise<AdminLogisticsClaim[]> {
    return this.claims.list();
  }

  @Post('claims')
  @ApiOperation({ summary: 'Open a claim on an order that left with GarmentGate' })
  openClaim(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(OpenClaimSchema)) dto: OpenClaimDto,
  ): Promise<{ code: string }> {
    return this.claims.open(user.id, dto);
  }

  @Post('claims/:code/submit')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Record submitting the claim to the insurer' })
  submitClaim(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(ClaimCodeSchema)) code: string,
    @Body(new ZodValidationPipe(SubmitClaimSchema)) dto: SubmitClaimDto,
  ): Promise<void> {
    return this.claims.submit(user.id, code, dto);
  }

  @Post('claims/:code/settle')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Settle or reject: compensation, insurer recovery and partner chargeback',
  })
  settleClaim(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(ClaimCodeSchema)) code: string,
    @Body(new ZodValidationPipe(SettleClaimSchema)) dto: SettleClaimDto,
  ): Promise<void> {
    return this.claims.settle(user.id, code, dto);
  }

  @Get('reports')
  @ApiOkResponse({ standardSchema: LogisticsReportSchema })
  report(
    @Query(new ZodValidationPipe(LogisticsReportQuerySchema)) q: LogisticsReportQuery,
  ): Promise<LogisticsReport> {
    return this.claims.report(q);
  }

  @Get('partners/:id/users')
  @ApiOkResponse({ standardSchema: z.array(PartnerUserSchema) })
  partnerUsers(@Param('id', id) partnerId: string): Promise<PartnerUser[]> {
    return this.admin.partnerUsers(partnerId);
  }

  @Post('partners/:id/users')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Invite someone at a partner to the partner portal (password set by email)',
  })
  createPartnerUser(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) partnerId: string,
    @Body(new ZodValidationPipe(CreatePartnerUserSchema)) dto: CreatePartnerUserDto,
  ): Promise<void> {
    return this.admin.createPartnerUser(user.id, partnerId, dto);
  }

  @Post('shipments/:code/events')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'A tracking update from staff; the first IN_TRANSIT is the departure' })
  shipmentEvent(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(ShipmentCodeSchema)) code: string,
    @Body(new ZodValidationPipe(TrackingEventInputSchema)) dto: TrackingEventDto,
  ): Promise<void> {
    return this.tracking.recordEvent({ userId: user.id, source: 'STAFF' }, code, null, dto);
  }

  @Patch('shipments/:code/uploads/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Publish a reviewed (sanitized) partner upload to the buyer, or hide it',
  })
  publishUpload(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(ShipmentCodeSchema)) code: string,
    @Param('id', id) uploadId: string,
    @Body(new ZodValidationPipe(PublishShipmentUploadSchema)) dto: PublishShipmentUploadDto,
  ): Promise<void> {
    return this.shipments.publishUpload(user.id, code, uploadId, dto.buyerVisible);
  }

  @Post('shipments/:code/legs/:id/payout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Record paying the partner for a leg (payable → cash)' })
  payLeg(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(ShipmentCodeSchema)) code: string,
    @Param('id', id) legId: string,
  ): Promise<void> {
    return this.tracking.payLeg(user.id, code, legId);
  }

  // ── Board, pickups and hub receiving ──
  @Get('orders')
  @ApiOperation({ summary: 'Every order GarmentGate ships, with where its goods are' })
  @ApiOkResponse({ standardSchema: z.array(AdminLogisticsOrderSchema) })
  board(): Promise<AdminLogisticsOrder[]> {
    return this.hubFlow.board();
  }

  @Patch('pickups/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updatePickup(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) pickupId: string,
    @Body(new ZodValidationPipe(UpdatePickupSchema)) dto: UpdatePickupDto,
  ): Promise<void> {
    return this.hubFlow.updatePickup(user.id, pickupId, dto);
  }

  @Post('hub-photos/uploads')
  @UploadThrottle()
  @ApiOperation({ summary: 'Presigned upload for a hub receiving photo' })
  presignHubPhoto(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(PresignHubPhotoSchema)) dto: PresignHubPhotoDto,
  ): Promise<PresignUploadResponse> {
    return this.hubFlow.presignHubPhoto(user.id, dto);
  }

  @Post('hub-receipts')
  @HttpCode(HttpStatus.NO_CONTENT)
  receive(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(HubReceiptInputSchema)) dto: HubReceiptDto,
  ): Promise<void> {
    return this.hubFlow.receive(user.id, dto);
  }

  // ── Shipments ──
  @Get('shipments')
  @ApiOkResponse({ standardSchema: z.array(AdminShipmentRowSchema) })
  listShipments(): Promise<AdminShipmentRow[]> {
    return this.shipments.list();
  }

  @Post('shipments')
  @ApiOperation({ summary: 'Put orders received at a hub on one shipment (one buyer)' })
  @ApiOkResponse({ standardSchema: z.object({ code: z.string() }) })
  createShipment(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(CreateShipmentSchema)) dto: CreateShipmentDto,
  ): Promise<{ code: string }> {
    return this.shipments.create(user.id, dto);
  }

  @Get('shipments/:code')
  @ApiOkResponse({ standardSchema: AdminShipmentSchema })
  shipment(
    @Param('code', new ZodValidationPipe(ShipmentCodeSchema)) code: string,
  ): Promise<AdminShipment> {
    return this.shipments.detail(code);
  }

  @Patch('shipments/:code')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateShipment(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(ShipmentCodeSchema)) code: string,
    @Body(new ZodValidationPipe(UpdateShipmentSchema)) dto: UpdateShipmentDto,
  ): Promise<void> {
    return this.shipments.update(user.id, code, dto);
  }

  @Patch('shipments/:code/legs/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateLeg(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(ShipmentCodeSchema)) code: string,
    @Param('id', id) legId: string,
    @Body(new ZodValidationPipe(UpdateLegSchema)) dto: UpdateLegDto,
  ): Promise<void> {
    return this.shipments.updateLeg(user.id, code, legId, dto);
  }

  @Get('shipments/:code/documents/:type')
  @ApiProduces('application/pdf')
  @ApiOperation({ summary: 'A GarmentGate-issued shipping document (per the shipper mode)' })
  async document(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(ShipmentCodeSchema)) code: string,
    @Param('type', new ZodValidationPipe(LogisticsDocumentTypeSchema)) type: LogisticsDocumentType,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { file, name } = await this.shipments.document(user.id, code, type);
    res.setHeader('Cache-Control', 'private, no-store');
    return new StreamableFile(file, {
      type: 'application/pdf',
      disposition: `inline; filename="${name}"`,
    });
  }

  @Patch('orders/:code/hs-code')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Set the order’s HS code (documents and duty estimates)' })
  setHsCode(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(CodeSchema)) code: string,
    @Body(new ZodValidationPipe(SetHsCodeSchema)) dto: SetHsCodeDto,
  ): Promise<void> {
    return this.orders.setHsCode(user.id, code, dto.hsCode);
  }

  // ── Partners ──
  @Get('partners')
  @ApiOkResponse({ standardSchema: z.array(LogisticsPartnerSchema) })
  partners(): Promise<LogisticsPartner[]> {
    return this.admin.partners();
  }

  @Post('partners')
  @HttpCode(HttpStatus.NO_CONTENT)
  createPartner(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(LogisticsPartnerInputSchema)) dto: LogisticsPartnerDto,
  ): Promise<void> {
    return this.admin.savePartner(user.id, null, dto);
  }

  @Put('partners/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updatePartner(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) partnerId: string,
    @Body(new ZodValidationPipe(LogisticsPartnerInputSchema)) dto: LogisticsPartnerDto,
  ): Promise<void> {
    return this.admin.savePartner(user.id, partnerId, dto);
  }

  // ── Hubs ──
  @Get('hubs')
  @ApiOkResponse({ standardSchema: z.array(HubSchema) })
  hubs(): Promise<Hub[]> {
    return this.admin.hubs();
  }

  @Post('hubs')
  @HttpCode(HttpStatus.NO_CONTENT)
  createHub(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(HubInputSchema)) dto: HubDto,
  ): Promise<void> {
    return this.admin.saveHub(user.id, null, dto);
  }

  @Put('hubs/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateHub(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) hubId: string,
    @Body(new ZodValidationPipe(HubInputSchema)) dto: HubDto,
  ): Promise<void> {
    return this.admin.saveHub(user.id, hubId, dto);
  }

  // ── Rate cards ──
  @Get('rate-cards')
  @ApiOkResponse({ standardSchema: z.array(RateCardSchema) })
  rateCards(): Promise<RateCard[]> {
    return this.admin.rateCards();
  }

  @Post('rate-cards')
  @HttpCode(HttpStatus.NO_CONTENT)
  createRateCard(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(RateCardInputSchema)) dto: RateCardDto,
  ): Promise<void> {
    return this.admin.saveRateCard(user.id, null, dto);
  }

  @Put('rate-cards/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateRateCard(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) cardId: string,
    @Body(new ZodValidationPipe(RateCardInputSchema)) dto: RateCardDto,
  ): Promise<void> {
    return this.admin.saveRateCard(user.id, cardId, dto);
  }

  @Delete('rate-cards/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  retireRateCard(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) cardId: string,
  ): Promise<void> {
    return this.admin.retireRateCard(user.id, cardId);
  }

  // ── Margins ──
  @Get('margins')
  @ApiOkResponse({ standardSchema: z.array(LogisticsMarginRuleSchema) })
  margins(): Promise<LogisticsMarginRule[]> {
    return this.admin.marginRules();
  }

  @Post('margins')
  @HttpCode(HttpStatus.NO_CONTENT)
  createMargin(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(LogisticsMarginRuleInputSchema)) dto: LogisticsMarginRuleDto,
  ): Promise<void> {
    return this.admin.saveMarginRule(user.id, null, dto);
  }

  @Put('margins/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateMargin(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) ruleId: string,
    @Body(new ZodValidationPipe(LogisticsMarginRuleInputSchema)) dto: LogisticsMarginRuleDto,
  ): Promise<void> {
    return this.admin.saveMarginRule(user.id, ruleId, dto);
  }

  @Delete('margins/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteMargin(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) ruleId: string,
  ): Promise<void> {
    return this.admin.deleteMarginRule(user.id, ruleId);
  }

  // ── Duty rates ──
  @Get('duty-rates')
  @ApiOkResponse({ standardSchema: z.array(DutyRateSchema) })
  dutyRates(): Promise<DutyRate[]> {
    return this.admin.dutyRates();
  }

  @Post('duty-rates')
  @HttpCode(HttpStatus.NO_CONTENT)
  createDutyRate(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(DutyRateInputSchema)) dto: DutyRateDto,
  ): Promise<void> {
    return this.admin.saveDutyRate(user.id, null, dto);
  }

  @Put('duty-rates/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateDutyRate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) rateId: string,
    @Body(new ZodValidationPipe(DutyRateInputSchema)) dto: DutyRateDto,
  ): Promise<void> {
    return this.admin.saveDutyRate(user.id, rateId, dto);
  }

  @Delete('duty-rates/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteDutyRate(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) rateId: string,
  ): Promise<void> {
    return this.admin.deleteDutyRate(user.id, rateId);
  }

  // ── Settings and quote preview ──
  @Get('settings')
  @ApiOkResponse({ standardSchema: LogisticsSettingsSchema })
  getSettings(): Promise<LogisticsSettings> {
    return this.settings.get();
  }

  @Put('settings')
  @ApiOkResponse({ standardSchema: LogisticsSettingsSchema })
  setSettings(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(LogisticsSettingsSchema)) dto: LogisticsSettings,
  ): Promise<LogisticsSettings> {
    return this.settings.set(user.id, dto);
  }

  @Post('quote-preview')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Price a route from the rate cards, with cost and margin (staff)' })
  @ApiOkResponse({ standardSchema: z.array(FreightOptionSchema) })
  preview(
    @Body(new ZodValidationPipe(FreightQuoteRequestSchema)) dto: FreightQuoteRequest,
  ): Promise<FreightOption[]> {
    return this.quotes.quote(dto);
  }
}
