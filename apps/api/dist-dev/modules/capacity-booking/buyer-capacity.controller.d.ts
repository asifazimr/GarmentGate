import { type BookingReasonDto, type BookingTerms, type BookingTermsQuery, type BuyerBooking, type BuyerCapacityOverview, type CapacitySearchQuery, type CapacitySearchResponse, type ConvertBookingDto, type ConvertedBooking, type CreateBookingDto, type CreatePartnershipDto, type MarkSentDto, type PayBookingDepositDto, type PaymentStart } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { BuyerContextService } from '../buyer/buyer-context.service.js';
import { BookingSearchService } from './booking-search.service.js';
import { BookingsService } from './bookings.service.js';
import { PartnershipsService } from './partnerships.service.js';
export declare class BuyerCapacityController {
    private readonly context;
    private readonly search;
    private readonly bookings;
    private readonly partnerships;
    constructor(context: BuyerContextService, search: BookingSearchService, bookings: BookingsService, partnerships: PartnershipsService);
    find(user: AuthenticatedUser, query: CapacitySearchQuery): Promise<CapacitySearchResponse>;
    terms(user: AuthenticatedUser, id: string, query: BookingTermsQuery): Promise<BookingTerms>;
    create(user: AuthenticatedUser, dto: CreateBookingDto): Promise<{
        code: string;
    }>;
    overview(user: AuthenticatedUser): Promise<BuyerCapacityOverview>;
    get(user: AuthenticatedUser, code: string): Promise<BuyerBooking>;
    deposit(user: AuthenticatedUser, code: string, dto: PayBookingDepositDto): Promise<PaymentStart>;
    depositSent(user: AuthenticatedUser, code: string, paymentId: string, dto: MarkSentDto): Promise<void>;
    cancel(user: AuthenticatedUser, code: string, dto: BookingReasonDto): Promise<void>;
    convert(user: AuthenticatedUser, code: string, dto: ConvertBookingDto): Promise<ConvertedBooking>;
    partnership(user: AuthenticatedUser, dto: CreatePartnershipDto): Promise<{
        code: string;
    }>;
    cancelPartnership(user: AuthenticatedUser, code: string, dto: BookingReasonDto): Promise<void>;
}
