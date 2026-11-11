import { type OnModuleInit } from '@nestjs/common';
import { type AdminPlans, type FactoryPlan, type GrantPlanDto, type PlanCheckoutDto, type PlanSettings, type PlanTerms, type PlanTier } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { SearchService } from '../search/search.service.js';
import { BuyerPlusService } from './buyer-plus.service.js';
import { SubscriptionsService } from './subscriptions.service.js';
export declare class PlansService implements OnModuleInit {
    private readonly prisma;
    private readonly subscriptions;
    private readonly buyerPlus;
    private readonly search;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, subscriptions: SubscriptionsService, buyerPlus: BuyerPlusService, search: SearchService, notifier: Notifier, audit: AuditService);
    onModuleInit(): void;
    settings(): Promise<PlanSettings>;
    setSettings(adminId: string, s: PlanSettings): Promise<PlanSettings>;
    termsFor(profileId: string): Promise<{
        tier: PlanTier;
        terms: PlanTerms;
    }>;
    assertCanList(profileId: string, exceptProductId?: string): Promise<void>;
    mine(ctx: ManufacturerContext): Promise<FactoryPlan>;
    checkout(ctx: ManufacturerContext, dto: PlanCheckoutDto): Promise<{
        url: string;
    }>;
    cancel(ctx: ManufacturerContext): Promise<void>;
    grant(adminId: string, code: string, dto: GrantPlanDto): Promise<void>;
    adminList(): Promise<AdminPlans>;
    applyTier(profileId: string, opts?: {
        force?: boolean;
    }): Promise<PlanTier>;
    private repriceCatalog;
    sweep(): Promise<{
        changed: number;
        announced: number;
    }>;
}
