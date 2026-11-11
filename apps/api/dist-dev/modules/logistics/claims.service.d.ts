import { type AdminLogisticsClaim, type LogisticsReport, type LogisticsReportQuery, type OpenClaimDto, type SettleClaimDto, type SubmitClaimDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { FxService } from '../payments/fx.service.js';
import { LedgerService } from '../payments/ledger.service.js';
export declare class ClaimsService {
    private readonly prisma;
    private readonly ledger;
    private readonly fx;
    private readonly codes;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, ledger: LedgerService, fx: FxService, codes: PublicCodeService, notifier: Notifier, audit: AuditService);
    list(): Promise<AdminLogisticsClaim[]>;
    open(adminId: string, dto: OpenClaimDto): Promise<{
        code: string;
    }>;
    submit(adminId: string, code: string, dto: SubmitClaimDto): Promise<void>;
    settle(adminId: string, code: string, dto: SettleClaimDto): Promise<void>;
    report(q: LogisticsReportQuery): Promise<LogisticsReport>;
    private find;
    private view;
}
