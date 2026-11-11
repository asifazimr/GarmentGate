import { type MarginRule, type MarginRuleDto, type RepriceQuoteDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { AdminMarginsService } from './admin-margins.service.js';
export declare class AdminMarginsController {
    private readonly margins;
    constructor(margins: AdminMarginsService);
    list(): Promise<MarginRule[]>;
    create(admin: AuthenticatedUser, dto: MarginRuleDto): Promise<{
        id: string;
    }>;
    update(admin: AuthenticatedUser, id: string, dto: MarginRuleDto): Promise<void>;
    remove(admin: AuthenticatedUser, id: string): Promise<void>;
    reprice(admin: AuthenticatedUser, id: string, dto: RepriceQuoteDto): Promise<void>;
}
