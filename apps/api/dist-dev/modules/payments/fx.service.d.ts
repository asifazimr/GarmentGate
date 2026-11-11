import { type Currency, type FxRates, type UnitsPerUsd } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
type Client = PrismaService | Prisma.TransactionClient;
export declare class FxService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    rates(client?: Client): Promise<UnitsPerUsd>;
    snapshot(currency: Currency, client?: Client): Promise<{
        rates: UnitsPerUsd;
        unitsPerUsd: string;
    }>;
    update(adminId: string, rates: FxRates): Promise<void>;
}
export {};
