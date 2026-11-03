import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type CapacitySlot,
  type CapacitySlotDto,
  CapacitySlotInputSchema,
  CapacitySlotSchema,
  type CapacitySlotUpdateDto,
  CapacitySlotUpdateSchema,
  CLAIM_EVIDENCE_MAX_BYTES,
  type LineCalendar,
  type LineCalendarQuery,
  LineCalendarQuerySchema,
  LineCalendarSchema,
  type ManufacturerClaim,
  ManufacturerClaimSchema,
  type ManufacturerLine,
  ManufacturerLineSchema,
  type PresignClaimEvidenceDto,
  PresignClaimEvidenceSchema,
  type PresignUploadResponse,
  type ProductionLineDto,
  ProductionLineInputSchema,
  type SupplierClaimDto,
  SupplierClaimInputSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { UploadThrottle } from '../../common/throttle/limits.js';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { IdSchema } from '../orders/order-params.js';
import { FilesService } from '../storage/files.service.js';
import { ClaimsService } from './claims.service.js';
import { LinesService } from './lines.service.js';

/** A verified factory's production lines, booking windows and supplier claims. */
@ApiTags('capacity-booking')
@ApiCookieAuth()
@Roles('MANUFACTURER')
@Controller('manufacturer')
export class ManufacturerCapacityController {
  constructor(
    private readonly context: ManufacturerContextService,
    private readonly lines: LinesService,
    private readonly claims: ClaimsService,
    private readonly files: FilesService,
  ) {}

  // ── Lines ─────────────────────────────────────────────────────────────────

  @Get('lines')
  @ApiOkResponse({ standardSchema: z.array(ManufacturerLineSchema) })
  async listLines(@CurrentUser() user: AuthenticatedUser): Promise<ManufacturerLine[]> {
    return this.lines.list(await this.context.verified(user.id));
  }

  @Post('lines')
  @ApiOkResponse({ standardSchema: ManufacturerLineSchema })
  async createLine(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(ProductionLineInputSchema)) dto: ProductionLineDto,
  ): Promise<ManufacturerLine> {
    return this.lines.create(await this.context.verified(user.id), dto);
  }

  @Put('lines/:id')
  @ApiOkResponse({ standardSchema: ManufacturerLineSchema })
  async updateLine(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(ProductionLineInputSchema)) dto: ProductionLineDto,
  ): Promise<ManufacturerLine> {
    return this.lines.update(await this.context.verified(user.id), id, dto);
  }

  @Delete('lines/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteLine(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
  ): Promise<void> {
    await this.lines.remove(await this.context.verified(user.id), id);
  }

  @Get('capacity/lines-calendar')
  @ApiOperation({ summary: 'Day-by-day capacity, open and booked minutes per line' })
  @ApiOkResponse({ standardSchema: LineCalendarSchema })
  async calendar(
    @CurrentUser() user: AuthenticatedUser,
    @Query(new ZodValidationPipe(LineCalendarQuerySchema)) query: LineCalendarQuery,
  ): Promise<LineCalendar> {
    return this.lines.calendar(await this.context.verified(user.id), query);
  }

  // ── Booking windows ───────────────────────────────────────────────────────

  @Post('slots')
  @ApiOperation({ summary: 'Open a window on a line for capacity booking' })
  @ApiOkResponse({ standardSchema: CapacitySlotSchema })
  async openSlot(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(CapacitySlotInputSchema)) dto: CapacitySlotDto,
  ): Promise<CapacitySlot> {
    return this.lines.openSlot(await this.context.verified(user.id), dto);
  }

  @Patch('slots/:id')
  @ApiOkResponse({ standardSchema: CapacitySlotSchema })
  async updateSlot(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
    @Body(new ZodValidationPipe(CapacitySlotUpdateSchema)) dto: CapacitySlotUpdateDto,
  ): Promise<CapacitySlot> {
    return this.lines.updateSlot(await this.context.verified(user.id), id, dto);
  }

  @Delete('slots/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSlot(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
  ): Promise<void> {
    await this.lines.deleteSlot(await this.context.verified(user.id), id);
  }

  // ── Supplier claims ───────────────────────────────────────────────────────

  @Post('claims/uploads')
  @UploadThrottle()
  @ApiOperation({ summary: 'Presigned POST for supplier claim evidence (staff only see it)' })
  async presignEvidence(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(PresignClaimEvidenceSchema)) dto: PresignClaimEvidenceDto,
  ): Promise<PresignUploadResponse> {
    const ctx = await this.context.verified(user.id);
    return this.files.reserveUpload({
      userId: user.id,
      companyId: ctx.companyId,
      purpose: 'SUPPLIER_CLAIM_EVIDENCE',
      folder: 'claims',
      fileName: dto.fileName,
      contentType: dto.contentType,
      sizeBytes: dto.sizeBytes,
      maxBytes: CLAIM_EVIDENCE_MAX_BYTES,
    });
  }

  @Get('claims')
  @ApiOkResponse({ standardSchema: z.array(ManufacturerClaimSchema) })
  async listClaims(@CurrentUser() user: AuthenticatedUser): Promise<ManufacturerClaim[]> {
    return this.claims.list(await this.context.verified(user.id));
  }

  @Post('claims')
  @ApiOkResponse({ standardSchema: ManufacturerClaimSchema })
  async createClaim(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(SupplierClaimInputSchema)) dto: SupplierClaimDto,
  ): Promise<ManufacturerClaim> {
    return this.claims.create(await this.context.verified(user.id), dto);
  }

  @Delete('claims/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteClaim(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', new ZodValidationPipe(IdSchema)) id: string,
  ): Promise<void> {
    await this.claims.remove(await this.context.verified(user.id), id);
  }
}
