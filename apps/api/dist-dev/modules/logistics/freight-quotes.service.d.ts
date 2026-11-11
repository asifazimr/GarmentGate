import { type FreightOption, type FreightQuoteRequest } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { FxService } from '../payments/fx.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
import { type ShippingRateProvider } from './rate-provider.js';
export declare class FreightQuotesService {
    private readonly prisma;
    private readonly settings;
    private readonly fx;
    private readonly providers;
    constructor(prisma: PrismaService, settings: LogisticsSettingsService, fx: FxService, providers: ShippingRateProvider[]);
    quote(request: FreightQuoteRequest): Promise<FreightOption[]>;
}
