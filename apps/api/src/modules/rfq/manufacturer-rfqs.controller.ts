import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type ManufacturerQuote,
  ManufacturerQuoteSchema,
  type ManufacturerRfqDetail,
  ManufacturerRfqDetailSchema,
  type ManufacturerRfqSummary,
  ManufacturerRfqSummarySchema,
  type QuoteDto,
  QuoteInputSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { ManufacturerRfqsService } from './manufacturer-rfqs.service.js';

const RfqCodeSchema = z.string().regex(/^RFQ-\d{4}-\d{4,}$/, { error: 'Unknown RFQ' });

@ApiTags('manufacturer')
@ApiCookieAuth()
@Roles('MANUFACTURER')
@Controller('manufacturer/rfqs')
export class ManufacturerRfqsController {
  constructor(
    private readonly context: ManufacturerContextService,
    private readonly rfqs: ManufacturerRfqsService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'RFQ inbox: invited and matched requests (anonymised buyers)' })
  @ApiOkResponse({ standardSchema: ManufacturerRfqSummarySchema.array() })
  async inbox(@CurrentUser() user: AuthenticatedUser): Promise<ManufacturerRfqSummary[]> {
    return this.rfqs.inbox(await this.context.verified(user.id));
  }

  @Get(':code')
  @ApiOkResponse({ standardSchema: ManufacturerRfqDetailSchema })
  async detail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(RfqCodeSchema)) code: string,
  ): Promise<ManufacturerRfqDetail> {
    return this.rfqs.detail(await this.context.verified(user.id), code);
  }

  @Put(':code/quote')
  @ApiOperation({ summary: 'Submit or update your quote (your own price)' })
  @ApiOkResponse({ standardSchema: ManufacturerQuoteSchema })
  async quote(
    @CurrentUser() user: AuthenticatedUser,
    @Param('code', new ZodValidationPipe(RfqCodeSchema)) code: string,
    @Body(new ZodValidationPipe(QuoteInputSchema)) dto: QuoteDto,
  ): Promise<ManufacturerQuote> {
    return this.rfqs.submitQuote(await this.context.verified(user.id), code, dto);
  }
}
