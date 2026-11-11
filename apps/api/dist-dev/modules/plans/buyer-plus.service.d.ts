import { type OnModuleInit } from '@nestjs/common';
import { type BuyerPlus, type BuyerPlusSettings, type GrantPlusDto, type PlusCheckoutDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { BuyerContext } from '../buyer/buyer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { SubscriptionsService } from './subscriptions.service.js';
export declare class BuyerPlusService implements OnModuleInit {
    private readonly prisma;
    private readonly subscriptions;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, subscriptions: SubscriptionsService, notifier: Notifier, audit: AuditService);
    onModuleInit(): void;
    settings(): Promise<BuyerPlusSettings>;
    setSettings(adminId: string, s: BuyerPlusSettings): Promise<BuyerPlusSettings>;
    mine(ctx: BuyerContext): Promise<BuyerPlus>;
    checkout(ctx: BuyerContext, dto: PlusCheckoutDto): Promise<{
        url: string;
    }>;
    cancel(ctx: BuyerContext): Promise<void>;
    grant(adminId: string, code: string, dto: GrantPlusDto): Promise<void>;
    apply(companyId: string): Promise<boolean>;
}
