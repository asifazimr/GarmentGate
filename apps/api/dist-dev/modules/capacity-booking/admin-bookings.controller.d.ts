import { type AdminBooking, type BookingReasonDto, type CapacityBookingSettings, type CapacityBookingSettingsDto, type CapacityBookingStatus } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { BookingSettingsService } from './booking-settings.service.js';
import { BookingsService } from './bookings.service.js';
export declare class AdminBookingsController {
    private readonly settings;
    private readonly bookings;
    constructor(settings: BookingSettingsService, bookings: BookingsService);
    getSettings(): Promise<CapacityBookingSettings>;
    setSettings(admin: AuthenticatedUser, dto: CapacityBookingSettingsDto): Promise<CapacityBookingSettings>;
    list(query: {
        status?: CapacityBookingStatus;
    }): Promise<AdminBooking[]>;
    cancel(admin: AuthenticatedUser, code: string, dto: BookingReasonDto): Promise<void>;
    compensation(admin: AuthenticatedUser, code: string): Promise<void>;
}
