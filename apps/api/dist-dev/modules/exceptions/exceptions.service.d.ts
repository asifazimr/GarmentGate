import { type OrderException, type ReplaceFactoryDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { OrdersService } from '../orders/orders.service.js';
import { FxService } from '../payments/fx.service.js';
import { LedgerService } from '../payments/ledger.service.js';
export declare class ExceptionsService {
    private readonly prisma;
    private readonly orders;
    private readonly ledger;
    private readonly fx;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, orders: OrdersService, ledger: LedgerService, fx: FxService, notifier: Notifier, audit: AuditService);
    list(now?: Date): Promise<OrderException[]>;
    sweep(now?: Date): Promise<number>;
    replaceFactory(adminId: string, code: string, dto: ReplaceFactoryDto): Promise<void>;
}
