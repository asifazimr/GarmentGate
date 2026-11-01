import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type AcceptQuoteResult,
  AcceptQuoteResultSchema,
  type BuyerRfqDetail,
  BuyerRfqDetailSchema,
  type BuyerRfqSummary,
  BuyerRfqSummarySchema,
  type PresignRfqFileDto,
  PresignRfqFileSchema,
  type PresignUploadResponse,
  PresignUploadResponseSchema,
  RFQ_FILE_MAX_BYTES,
  type RfqCreated,
  RfqCreatedSchema,
  type RfqDto,
  RfqInputSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { FilesService } from '../storage/files.service.js';
import { BuyerRfqsService } from './buyer-rfqs.service.js';

const RfqCodeSchema = z.string().regex(/^RFQ-\d{4}-\d{4,}$/, { error: 'Unknown RFQ' });

@ApiTags('rfqs')
@ApiCookieAuth()
@Roles('BUYER')
@Controller('rfqs')
export class BuyerRfqsController {
  constructor(
    private readonly context: BuyerContextService,
    private readonly rfqs: BuyerRfqsService,
    private readonly files: FilesService,
  ) {}

  @Post('uploads')
  @ApiOperation({ summary: 'Presigned POST for a tech pack, sketch or reference image' })
  @ApiOkResponse({ standardSchema: PresignUploadResponseSchema })
  async presign(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(PresignRfqFileSchema)) dto: PresignRfqFileDto,
  ): Promise<PresignUploadResponse> {
    const ctx = await this.context.verified(user.id);
    return this.files.reserveUpload({
      userId: user.id,
      companyId: ctx.companyId,
      purpose: 'TECH_PACK',
      folder: 'originals',
      fileName: dto.fileName,
      contentType: dto.contentType,
      sizeBytes: dto.sizeBytes,
      maxBytes: RFQ_FILE_MAX_BYTES,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Publish an RFQ to matching factories' })
  @ApiOkResponse({ standardSchema: RfqCreatedSchema })
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(RfqInputSchema)) dto: RfqDto,
  ): Promise<RfqCreated> {
    return this.rfqs.create(await this.context.verified(user.id), dto);
  }

  @Get()
  @ApiOkResponse({ standardSchema: BuyerRfqSummarySchema.array() })
  async list(@CurrentUser() user: AuthenticatedUser): Promise<BuyerRfqSummary[]> {
    return this.rfqs.list(await this.context.verified(user.id));
  }

  @Get(':code')
  @ApiOperation({ summary: 'RFQ with offers to compare (GarmentGate prices, factory codes)' })
  @ApiOkResponse({ standardSchema: BuyerRfqDetailSchema })
  async detail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(RfqCodeSchema)) code: string,
  ): Promise<BuyerRfqDetail> {
    return this.rfqs.detail(await this.context.verified(user.id), code);
  }

  @Post(':code/quotes/:quoteId/accept')
  @ApiOperation({ summary: 'Accept an offer: awards the RFQ and drafts the order' })
  @ApiOkResponse({ standardSchema: AcceptQuoteResultSchema })
  async accept(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(RfqCodeSchema)) code: string,
    @Param('quoteId', ParseUUIDPipe) quoteId: string,
  ): Promise<AcceptQuoteResult> {
    return this.rfqs.accept(await this.context.verified(user.id), code, quoteId);
  }
}
