import { type BuyerDashboard, type ProductRequestDto, type ProductRequestResult, type SavedIndex, type Shortlist, type ShortlistItemInput, type ShortlistNameDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { BuyerContextService } from './buyer-context.service.js';
import { BuyerDashboardService } from './dashboard.service.js';
import { ProductRequestsService } from './product-requests.service.js';
import { ShortlistsService } from './shortlists.service.js';
export declare class BuyerController {
    private readonly context;
    private readonly shortlists;
    private readonly requests;
    private readonly dashboard;
    constructor(context: BuyerContextService, shortlists: ShortlistsService, requests: ProductRequestsService, dashboard: BuyerDashboardService);
    getDashboard(user: AuthenticatedUser): Promise<BuyerDashboard>;
    request(user: AuthenticatedUser, id: string, dto: ProductRequestDto): Promise<ProductRequestResult>;
    lists(user: AuthenticatedUser): Promise<Shortlist[]>;
    saved(user: AuthenticatedUser): Promise<SavedIndex>;
    create(user: AuthenticatedUser, dto: ShortlistNameDto): Promise<{
        id: string;
    }>;
    rename(user: AuthenticatedUser, id: string, dto: ShortlistNameDto): Promise<void>;
    remove(user: AuthenticatedUser, id: string): Promise<void>;
    addItem(user: AuthenticatedUser, id: string, dto: ShortlistItemInput): Promise<void>;
    removeItem(user: AuthenticatedUser, id: string, dto: ShortlistItemInput): Promise<void>;
}
