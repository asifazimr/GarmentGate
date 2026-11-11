import { PrismaService } from '../../../prisma/prisma.service.js';
import type { RateOption, RateRequest, ShippingRateProvider } from '../rate-provider.js';
export declare class ManualRateProvider implements ShippingRateProvider {
    private readonly prisma;
    readonly id = "manual";
    constructor(prisma: PrismaService);
    enabled(): boolean;
    quote(request: RateRequest): Promise<RateOption[]>;
}
