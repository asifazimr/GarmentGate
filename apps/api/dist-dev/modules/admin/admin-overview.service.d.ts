import type { AdminOverview } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { FxService } from '../payments/fx.service.js';
import { PaymentsService } from '../payments/payments.service.js';
export declare class AdminOverviewService {
    private readonly prisma;
    private readonly fx;
    private readonly payments;
    constructor(prisma: PrismaService, fx: FxService, payments: PaymentsService);
    overview(months: number): Promise<AdminOverview>;
    private queues;
}
