import { type BuyerPartnership, type CreatePartnershipDto, type ManufacturerPartnership } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { BuyerContext } from '../buyer/buyer-context.service.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { BookingSettingsService } from './booking-settings.service.js';
import { BookingsService } from './bookings.service.js';
export declare class PartnershipsService {
    private readonly prisma;
    private readonly settings;
    private readonly bookings;
    private readonly codes;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, settings: BookingSettingsService, bookings: BookingsService, codes: PublicCodeService, notifier: Notifier, audit: AuditService);
    request(ctx: BuyerContext, dto: CreatePartnershipDto): Promise<{
        code: string;
    }>;
    accept(ctx: ManufacturerContext, code: string): Promise<void>;
    decline(ctx: ManufacturerContext, code: string, reason: string): Promise<void>;
    cancel(ctx: BuyerContext, code: string, reason: string): Promise<void>;
    endFinished(): Promise<number>;
    buyerList(ctx: BuyerContext): Promise<BuyerPartnership[]>;
    factoryList(ctx: ManufacturerContext): Promise<ManufacturerPartnership[]>;
    private base;
    private factoryPartnership;
}
