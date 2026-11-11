import { type BuyerSourcingNeedsDto, type CompanyInfoDto, type ManufacturerCapabilitiesDto, type OnboardingState } from '@garmentgate/shared';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../../config/env.schema.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { PublicCodeService } from './public-code.service.js';
export declare class OnboardingService {
    private readonly prisma;
    private readonly notifier;
    private readonly codes;
    private readonly audit;
    private readonly logger;
    private readonly emailVerificationRequired;
    constructor(prisma: PrismaService, notifier: Notifier, codes: PublicCodeService, audit: AuditService, config: ConfigService<Env, true>);
    getState(userId: string): Promise<OnboardingState>;
    saveCompany(userId: string, dto: CompanyInfoDto): Promise<OnboardingState>;
    saveManufacturerProfile(userId: string, dto: ManufacturerCapabilitiesDto): Promise<OnboardingState>;
    saveBuyerProfile(userId: string, dto: BuyerSourcingNeedsDto): Promise<OnboardingState>;
    submit(userId: string): Promise<OnboardingState>;
    private loadUser;
    private assertCategoriesExist;
    private toState;
}
export declare function assertEditable(kycStatus: string): void;
