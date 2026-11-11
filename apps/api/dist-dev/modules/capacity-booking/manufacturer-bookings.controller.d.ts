import { type BookingReasonDto, type ManufacturerBooking, type ManufacturerBookingInbox } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ManufacturerContextService } from '../manufacturer/manufacturer-context.service.js';
import { BookingsService } from './bookings.service.js';
import { PartnershipsService } from './partnerships.service.js';
export declare class ManufacturerBookingsController {
    private readonly context;
    private readonly bookings;
    private readonly partnerships;
    constructor(context: ManufacturerContextService, bookings: BookingsService, partnerships: PartnershipsService);
    inbox(user: AuthenticatedUser): Promise<ManufacturerBookingInbox>;
    get(user: AuthenticatedUser, code: string): Promise<ManufacturerBooking>;
    accept(user: AuthenticatedUser, code: string): Promise<void>;
    decline(user: AuthenticatedUser, code: string, dto: BookingReasonDto): Promise<void>;
    acceptPartnership(user: AuthenticatedUser, code: string): Promise<void>;
    declinePartnership(user: AuthenticatedUser, code: string, dto: BookingReasonDto): Promise<void>;
}
