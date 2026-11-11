import { type AdminGigInspector, type AdminInspectorApplication, type CheckInDto, type FactoryLocationDto, type GigSettings, type InspectorApplicationDto, type InspectorMe, type InspectorPayoutDetailsDto, type PayInspectorDto, type ReviewApplicationDto, type Task } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { AuthService } from '../auth/auth.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { FxService } from '../payments/fx.service.js';
import { LedgerService } from '../payments/ledger.service.js';
export declare class GigService {
    private readonly prisma;
    private readonly auth;
    private readonly ledger;
    private readonly fx;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, auth: AuthService, ledger: LedgerService, fx: FxService, notifier: Notifier, audit: AuditService);
    settings(): Promise<GigSettings>;
    setSettings(adminId: string, s: GigSettings): Promise<GigSettings>;
    apply(dto: InspectorApplicationDto): Promise<void>;
    applications(): Promise<AdminInspectorApplication[]>;
    review(adminId: string, id: string, dto: ReviewApplicationDto): Promise<void>;
    tasks(userId: string): Promise<Task[]>;
    claim(userId: string, inspectionId: string): Promise<void>;
    checkIn(userId: string, inspectionId: string, dto: CheckInDto): Promise<{
        distanceM: number;
    }>;
    assertCheckedIn(userId: string, inspectionId: string): Promise<void>;
    onReportFiled(inspectionId: string): Promise<void>;
    me(userId: string): Promise<InspectorMe>;
    setPayout(userId: string, dto: InspectorPayoutDetailsDto): Promise<void>;
    inspectors(): Promise<AdminGigInspector[]>;
    verifyPayout(adminId: string, userId: string): Promise<void>;
    setStatus(adminId: string, userId: string, status: 'ACTIVE' | 'SUSPENDED'): Promise<void>;
    rate(adminId: string, inspectionId: string, rating: number): Promise<void>;
    pay(adminId: string, userId: string, dto: PayInspectorDto): Promise<{
        paidUsdMinor: number;
    }>;
    setFactoryLocation(adminId: string, code: string, dto: FactoryLocationDto): Promise<void>;
    private activeProfile;
    private recentByFactory;
    payFor(userId: string | undefined): Promise<number | null>;
}
