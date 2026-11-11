import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { type FxRates, FxRatesSchema } from '@garmentgate/shared';
import { Public } from '../auth/auth.decorators.js';
import { FxService } from './fx.service.js';

/**
 * Exchange rates (units per USD) for showing approximate amounts in a display currency, for
 * signed-in users and website visitors alike. Market-style reference rates only: nothing here
 * identifies anyone or reveals a margin.
 */
@ApiTags('payments')
@Controller('fx')
export class FxController {
  constructor(private readonly fx: FxService) {}

  @Get('rates')
  @Public()
  @ApiOperation({ summary: 'Reference exchange rates for display conversions' })
  @ApiOkResponse({ standardSchema: FxRatesSchema })
  async rates(): Promise<FxRates> {
    return FxRatesSchema.parse(await this.fx.rates());
  }
}
