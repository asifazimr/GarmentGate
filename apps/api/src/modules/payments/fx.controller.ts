import { Controller, Get } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { type FxRates, FxRatesSchema } from '@garmentgate/shared';
import { Roles } from '../auth/auth.decorators.js';
import { FxService } from './fx.service.js';

/**
 * Exchange rates (units per USD) for showing approximate amounts in a user's display currency.
 * Market-style reference rates only: nothing here identifies anyone or reveals a margin.
 */
@ApiTags('payments')
@ApiCookieAuth()
@Roles('BUYER', 'MANUFACTURER', 'ADMIN')
@Controller('fx')
export class FxController {
  constructor(private readonly fx: FxService) {}

  @Get('rates')
  @ApiOperation({ summary: 'Reference exchange rates for display conversions' })
  @ApiOkResponse({ standardSchema: FxRatesSchema })
  async rates(): Promise<FxRates> {
    return FxRatesSchema.parse(await this.fx.rates());
  }
}
