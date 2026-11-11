import { ConfigService } from '@nestjs/config';
import { type AdminKycCompany, type AdminKycCompanyDetail, type KycStatus } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { MailService } from '../mail/mail.service.js';
import { SearchService } from '../search/search.service.js';
export declare class AdminKycService {
    private readonly prisma;
    private readonly notifier;
    private readonly mail;
    private readonly audit;
    private readonly config;
    private readonly search;
    constructor(prisma: PrismaService, notifier: Notifier, mail: MailService, audit: AuditService, config: ConfigService<Env, true>, search: SearchService);
    list(status: KycStatus): Promise<AdminKycCompany[]>;
    detail(companyId: string): Promise<AdminKycCompanyDetail>;
    approve(adminId: string, companyId: string, note?: string): Promise<void>;
    reject(adminId: string, companyId: string, reason: string): Promise<void>;
    private syncListing;
    private pending;
    private toListItem;
    private webUrl;
}
