import { type CreatePartnerUserDto, type PartnerUser, type DutyRate, type DutyRateDto, type Hub, type HubDto, type LogisticsMarginRule, type LogisticsMarginRuleDto, type LogisticsPartner, type LogisticsPartnerDto, type RateCard, type RateCardDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { AuthService } from '../auth/auth.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
export declare class LogisticsAdminService {
    private readonly prisma;
    private readonly codes;
    private readonly audit;
    private readonly auth;
    constructor(prisma: PrismaService, codes: PublicCodeService, audit: AuditService, auth: AuthService);
    partners(): Promise<LogisticsPartner[]>;
    savePartner(adminId: string, id: string | null, dto: LogisticsPartnerDto): Promise<void>;
    partnerUsers(partnerId: string): Promise<PartnerUser[]>;
    createPartnerUser(adminId: string, partnerId: string, dto: CreatePartnerUserDto): Promise<void>;
    hubs(): Promise<Hub[]>;
    saveHub(adminId: string, id: string | null, dto: HubDto): Promise<void>;
    rateCards(): Promise<RateCard[]>;
    saveRateCard(adminId: string, id: string | null, dto: RateCardDto): Promise<void>;
    retireRateCard(adminId: string, id: string): Promise<void>;
    marginRules(): Promise<LogisticsMarginRule[]>;
    saveMarginRule(adminId: string, id: string | null, dto: LogisticsMarginRuleDto): Promise<void>;
    deleteMarginRule(adminId: string, id: string): Promise<void>;
    dutyRates(): Promise<DutyRate[]>;
    saveDutyRate(adminId: string, id: string | null, dto: DutyRateDto): Promise<void>;
    deleteDutyRate(adminId: string, id: string): Promise<void>;
    private ensure;
    private log;
}
