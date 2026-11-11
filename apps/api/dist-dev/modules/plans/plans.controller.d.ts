import { type BuyerPlus, type BuyerPlusSettings, type GrantPlusDto, type PlusCheckoutDto, type AdminPlans, type FactoryPlan, type GrantPlanDto, type PlanCheckoutDto, type PlanSettings } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { BuyerPlusService } from './buyer-plus.service.js';
import { PlansService } from './plans.service.js';
export declare class FactoryPlanController {
    private readonly plans;
    private readonly context;
    constructor(plans: PlansService, context: ManufacturerContextService);
    mine(user: AuthenticatedUser): Promise<FactoryPlan>;
    checkout(user: AuthenticatedUser, dto: PlanCheckoutDto): Promise<{
        url: string;
    }>;
    cancel(user: AuthenticatedUser): Promise<void>;
}
export declare class AdminPlansController {
    private readonly plans;
    private readonly plus;
    constructor(plans: PlansService, plus: BuyerPlusService);
    plusSettings(): Promise<BuyerPlusSettings>;
    setPlusSettings(user: AuthenticatedUser, dto: BuyerPlusSettings): Promise<BuyerPlusSettings>;
    grantPlus(user: AuthenticatedUser, code: string, dto: GrantPlusDto): Promise<void>;
    list(): Promise<AdminPlans>;
    settings(): Promise<PlanSettings>;
    setSettings(user: AuthenticatedUser, dto: PlanSettings): Promise<PlanSettings>;
    grant(user: AuthenticatedUser, code: string, dto: GrantPlanDto): Promise<void>;
}
export declare class BuyerPlusController {
    private readonly plus;
    private readonly context;
    constructor(plus: BuyerPlusService, context: BuyerContextService);
    mine(user: AuthenticatedUser): Promise<BuyerPlus>;
    checkout(user: AuthenticatedUser, dto: PlusCheckoutDto): Promise<{
        url: string;
    }>;
    cancel(user: AuthenticatedUser): Promise<void>;
}
