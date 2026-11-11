import { type KpiQuery, type KpiReport, type UnitEconomicsSettings } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { FxService } from '../payments/fx.service.js';
export declare class KpisService {
    private readonly prisma;
    private readonly fx;
    private readonly audit;
    constructor(prisma: PrismaService, fx: FxService, audit: AuditService);
    settings(): Promise<UnitEconomicsSettings>;
    setSettings(adminId: string, settings: UnitEconomicsSettings): Promise<UnitEconomicsSettings>;
    report(q: KpiQuery): Promise<KpiReport>;
    private economics;
    private onTime;
    private firstPass;
    private repeatBuyers;
    private quoteConversion;
    private capacity;
    private claimRate;
    private inspectorAssignHours;
}
