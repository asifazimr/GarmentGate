import { type CapacityBookingSettings } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
export declare class BookingSettingsService {
    private readonly prisma;
    private readonly audit;
    constructor(prisma: PrismaService, audit: AuditService);
    get(): Promise<CapacityBookingSettings>;
    set(adminId: string, settings: CapacityBookingSettings): Promise<CapacityBookingSettings>;
}
