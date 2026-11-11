import { type KpiQuery, type KpiReport, type UnitEconomicsSettings } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { KpisService } from './kpis.service.js';
export declare class KpisController {
    private readonly kpis;
    constructor(kpis: KpisService);
    report(q: KpiQuery): Promise<KpiReport>;
    settings(): Promise<UnitEconomicsSettings>;
    setSettings(user: AuthenticatedUser, dto: UnitEconomicsSettings): Promise<UnitEconomicsSettings>;
}
