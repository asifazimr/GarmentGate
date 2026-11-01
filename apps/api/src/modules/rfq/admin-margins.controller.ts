import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type MarginRule,
  type MarginRuleDto,
  MarginRuleInputSchema,
  MarginRuleSchema,
  type RepriceQuoteDto,
  RepriceQuoteSchema,
} from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { AdminMarginsService } from './admin-margins.service.js';

@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin')
export class AdminMarginsController {
  constructor(private readonly margins: AdminMarginsService) {}

  @Get('margins')
  @ApiOkResponse({ standardSchema: MarginRuleSchema.array() })
  list(): Promise<MarginRule[]> {
    return this.margins.list();
  }

  @Post('margins')
  create(
    @CurrentUser() admin: AuthenticatedUser,
    @Body(new ZodValidationPipe(MarginRuleInputSchema)) dto: MarginRuleDto,
  ): Promise<{ id: string }> {
    return this.margins.create(admin.id, dto);
  }

  @Put('margins/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(MarginRuleInputSchema)) dto: MarginRuleDto,
  ): Promise<void> {
    return this.margins.update(admin.id, id, dto);
  }

  @Delete('margins/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.margins.remove(admin.id, id);
  }

  @Patch('quotes/:id/price')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Override the buyer price of an offered quote' })
  reprice(
    @CurrentUser() admin: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(RepriceQuoteSchema)) dto: RepriceQuoteDto,
  ): Promise<void> {
    return this.margins.reprice(admin.id, id, dto.buyerUnitPriceMinor);
  }
}
