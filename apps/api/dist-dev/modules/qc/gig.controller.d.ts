import { type AdminGigInspector, type AdminInspectorApplication, type CheckInDto, type FactoryLocationDto, type GigSettings, type InspectorApplicationDto, type InspectorMe, type InspectorPayoutDetailsDto, type PayInspectorDto, type RateInspectionDto, type ReviewApplicationDto, type Task } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { GigService } from './gig.service.js';
export declare class GigApplyController {
    private readonly gig;
    constructor(gig: GigService);
    apply(dto: InspectorApplicationDto): Promise<void>;
}
export declare class GigInspectorController {
    private readonly gig;
    constructor(gig: GigService);
    tasks(user: AuthenticatedUser): Promise<Task[]>;
    claim(user: AuthenticatedUser, inspectionId: string): Promise<void>;
    checkIn(user: AuthenticatedUser, inspectionId: string, dto: CheckInDto): Promise<{
        distanceM: number;
    }>;
    me(user: AuthenticatedUser): Promise<InspectorMe>;
    setPayout(user: AuthenticatedUser, dto: InspectorPayoutDetailsDto): Promise<void>;
}
export declare class GigAdminController {
    private readonly gig;
    constructor(gig: GigService);
    settings(): Promise<GigSettings>;
    setSettings(user: AuthenticatedUser, dto: GigSettings): Promise<GigSettings>;
    applications(): Promise<AdminInspectorApplication[]>;
    review(user: AuthenticatedUser, appId: string, dto: ReviewApplicationDto): Promise<void>;
    inspectors(): Promise<AdminGigInspector[]>;
    verifyPayout(user: AuthenticatedUser, userId: string): Promise<void>;
    setStatus(user: AuthenticatedUser, userId: string, dto: {
        status: 'ACTIVE' | 'SUSPENDED';
    }): Promise<void>;
    pay(user: AuthenticatedUser, userId: string, dto: PayInspectorDto): Promise<{
        paidUsdMinor: number;
    }>;
    rate(user: AuthenticatedUser, inspectionId: string, dto: RateInspectionDto): Promise<void>;
    locate(user: AuthenticatedUser, code: string, dto: FactoryLocationDto): Promise<void>;
}
