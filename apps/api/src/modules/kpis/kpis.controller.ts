import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type KpiQuery,
  KpiQuerySchema,
  type KpiReport,
  KpiReportSchema,
  type UnitEconomicsSettings,
  UnitEconomicsSettingsSchema,
} from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { KpisService } from './kpis.service.js';

/** Staff: the Phase 1 KPIs, unit economics per order and the roadmap gates. */
@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin/kpis')
export class KpisController {
  constructor(private readonly kpis: KpisService) {}

  @Get()
  @ApiOperation({ summary: 'KPIs, contribution per order and gate progress for a period' })
  @ApiOkResponse({ standardSchema: KpiReportSchema })
  report(@Query(new ZodValidationPipe(KpiQuerySchema)) q: KpiQuery): Promise<KpiReport> {
    return this.kpis.report(q);
  }

  @Get('settings')
  @ApiOkResponse({ standardSchema: UnitEconomicsSettingsSchema })
  settings(): Promise<UnitEconomicsSettings> {
    return this.kpis.settings();
  }

  @Put('settings')
  @ApiOperation({ summary: 'Unit economics assumptions: payment fees, merchandising, reserve' })
  @ApiOkResponse({ standardSchema: UnitEconomicsSettingsSchema })
  setSettings(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(UnitEconomicsSettingsSchema)) dto: UnitEconomicsSettings,
  ): Promise<UnitEconomicsSettings> {
    return this.kpis.setSettings(user.id, dto);
  }
}
