import { type AddEvidenceDto, type AdminDisputeSummary, type OpenDisputeDto, type OrderReviews, type PresignEvidenceDto, type PresignUploadResponse, type PublicReview, type ResolveDisputeDto, type SubmitReviewDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { DisputesService } from './disputes.service.js';
import { ReviewsService } from './reviews.service.js';
export declare class OrderTrustController {
    private readonly actors;
    private readonly reviews;
    private readonly disputes;
    constructor(actors: ChatActorService, reviews: ReviewsService, disputes: DisputesService);
    orderReviews(user: AuthenticatedUser, code: string): Promise<OrderReviews>;
    review(user: AuthenticatedUser, code: string, dto: SubmitReviewDto): Promise<void>;
    dispute(user: AuthenticatedUser, code: string): Promise<{
        dispute: import("@garmentgate/shared").BuyerDispute | import("@garmentgate/shared").ManufacturerDispute | import("@garmentgate/shared").AdminDispute | null;
    }>;
    openDispute(user: AuthenticatedUser, code: string, dto: OpenDisputeDto): Promise<{
        id: string;
    }>;
    presignEvidence(user: AuthenticatedUser, code: string, dto: PresignEvidenceDto): Promise<PresignUploadResponse>;
    addEvidence(user: AuthenticatedUser, code: string, dto: AddEvidenceDto): Promise<void>;
}
export declare class PublicReviewsController {
    private readonly reviews;
    constructor(reviews: ReviewsService);
    list(code: string): Promise<PublicReview[]>;
}
export declare class AdminDisputesController {
    private readonly disputes;
    constructor(disputes: DisputesService);
    list(): Promise<AdminDisputeSummary[]>;
    assign(admin: AuthenticatedUser, id: string): Promise<void>;
    resolve(admin: AuthenticatedUser, id: string, dto: ResolveDisputeDto): Promise<void>;
}
