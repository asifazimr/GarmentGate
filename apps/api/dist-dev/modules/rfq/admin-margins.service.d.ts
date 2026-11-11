import type { MarginRule, MarginRuleDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
export declare class AdminMarginsService {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    list(): Promise<MarginRule[]>;
    create(adminId: string, dto: MarginRuleDto): Promise<{
        id: string;
    }>;
    update(adminId: string, id: string, dto: MarginRuleDto): Promise<void>;
    remove(adminId: string, id: string): Promise<void>;
    reprice(adminId: string, quoteId: string, buyerUnitPriceMinor: number): Promise<void>;
    private isDefault;
    private scope;
    private assertUniqueScope;
}
