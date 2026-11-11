import { type CapacitySearchQuery, type CapacitySearchResponse } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { BookingSettingsService } from './booking-settings.service.js';
export declare class BookingSearchService {
    private readonly prisma;
    private readonly settings;
    constructor(prisma: PrismaService, settings: BookingSettingsService);
    search(query: CapacitySearchQuery): Promise<CapacitySearchResponse>;
}
