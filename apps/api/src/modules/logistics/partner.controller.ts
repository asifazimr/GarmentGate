import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import {
  type AttachShipmentUploadDto,
  AttachShipmentUploadSchema,
  type PartnerLeg,
  PartnerDocumentTypeSchema,
  type PartnerLegRefsDto,
  PartnerLegRefsSchema,
  PartnerLegSchema,
  type PresignShipmentUploadDto,
  PresignShipmentUploadSchema,
  type PresignUploadResponse,
  type TrackingEventDto,
  TrackingEventInputSchema,
} from '@garmentgate/shared';
import type { Response } from 'express';
import { z } from 'zod';
import { UploadThrottle } from '../../common/throttle/limits.js';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { IdSchema } from '../orders/order-params.js';
import { PartnerPortalService } from './partner-portal.service.js';

const id = new ZodValidationPipe(IdSchema);

/** The partner portal: GarmentGate's bookings with this partner, and nothing about buyers or factories. */
@ApiTags('partner')
@ApiCookieAuth()
@Roles('PARTNER')
@Controller('partner')
export class PartnerController {
  constructor(private readonly portal: PartnerPortalService) {}

  @Get('legs')
  @ApiOkResponse({ standardSchema: z.array(PartnerLegSchema) })
  legs(@CurrentUser() user: AuthenticatedUser): Promise<PartnerLeg[]> {
    return this.portal.legs(user.id);
  }

  @Get('legs/:id')
  @ApiOkResponse({ standardSchema: PartnerLegSchema })
  leg(@CurrentUser() user: AuthenticatedUser, @Param('id', id) legId: string): Promise<PartnerLeg> {
    return this.portal.leg(user.id, legId);
  }

  @Post('legs/:id/accept')
  @HttpCode(HttpStatus.NO_CONTENT)
  accept(@CurrentUser() user: AuthenticatedUser, @Param('id', id) legId: string): Promise<void> {
    return this.portal.accept(user.id, legId);
  }

  @Patch('legs/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Carrier, tracking, container, B/L or AWB and dates' })
  refs(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) legId: string,
    @Body(new ZodValidationPipe(PartnerLegRefsSchema)) dto: PartnerLegRefsDto,
  ): Promise<void> {
    return this.portal.updateRefs(user.id, legId, dto);
  }

  @Post('legs/:id/events')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'A tracking update (status, place, note)' })
  event(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) legId: string,
    @Body(new ZodValidationPipe(TrackingEventInputSchema)) dto: TrackingEventDto,
  ): Promise<void> {
    return this.portal.event(user.id, legId, dto);
  }

  @Post('legs/:id/uploads')
  @UploadThrottle()
  presign(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) legId: string,
    @Body(new ZodValidationPipe(PresignShipmentUploadSchema)) dto: PresignShipmentUploadDto,
  ): Promise<PresignUploadResponse> {
    return this.portal.presign(user.id, legId, dto);
  }

  @Post('legs/:id/files')
  @HttpCode(HttpStatus.NO_CONTENT)
  attach(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) legId: string,
    @Body(new ZodValidationPipe(AttachShipmentUploadSchema)) dto: AttachShipmentUploadDto,
  ): Promise<void> {
    return this.portal.attach(user.id, legId, dto);
  }

  @Get('legs/:id/documents/:type')
  @ApiProduces('application/pdf')
  async document(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', id) legId: string,
    @Param('type', new ZodValidationPipe(PartnerDocumentTypeSchema))
    type: z.infer<typeof PartnerDocumentTypeSchema>,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { file, name } = await this.portal.document(user.id, legId, type);
    res.setHeader('Cache-Control', 'private, no-store');
    return new StreamableFile(file, {
      type: 'application/pdf',
      disposition: `inline; filename="${name}"`,
    });
  }
}
