import { type AdminLead, type LeadDto, type PublicDirectory, type PublicPricing, type PublicStats, type UpdateLeadDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { BuyerPlusService } from '../plans/buyer-plus.service.js';
import { PlansService } from '../plans/plans.service.js';
export declare class PublicSiteService {
    private readonly prisma;
    private readonly payments;
    private readonly plans;
    private readonly plus;
    private readonly notifier;
    private readonly audit;
    private stats;
    private directoryCache;
    constructor(prisma: PrismaService, payments: PaymentsService, plans: PlansService, plus: BuyerPlusService, notifier: Notifier, audit: AuditService);
    publicStats(): Promise<PublicStats>;
    publicPricing(): Promise<PublicPricing>;
    directory(): Promise<PublicDirectory>;
    createLead(dto: LeadDto): Promise<void>;
    leads(): Promise<AdminLead[]>;
    updateLead(adminId: string, id: string, dto: UpdateLeadDto): Promise<void>;
}
