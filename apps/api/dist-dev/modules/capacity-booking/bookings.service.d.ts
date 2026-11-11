import { type OnModuleInit } from '@nestjs/common';
import { type AdminBooking, type BookingTerms, type BookingTermsQuery, type BuyerBooking, type CapacityBookingStatus, type ConvertBookingDto, type ConvertedBooking, type CreateBookingDto, type ManufacturerBooking, type MarkSentDto, type PaymentMethod, type PaymentStart } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { BuyerContext } from '../buyer/buyer-context.service.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { OrderHooks } from '../orders/order-hooks.js';
import { PaymentsService } from '../payments/payments.service.js';
import { BookingSettingsService } from './booking-settings.service.js';
type Tx = Prisma.TransactionClient;
export declare const bookingInclude: {
    manufacturerProfile: {
        select: {
            id: true;
            publicCode: true;
            company: {
                select: {
                    id: true;
                    country: true;
                    legalName: true;
                };
            };
        };
    };
    buyerCompany: {
        select: {
            buyerProfile: {
                select: {
                    publicCode: true;
                };
            };
            country: true;
            legalName: true;
            tradeName: true;
            website: true;
            users: {
                select: {
                    firstName: true;
                    lastName: true;
                };
            };
            id: true;
        };
    };
    line: {
        select: {
            id: true;
            code: true;
            name: true;
        };
    };
    category: {
        select: {
            id: true;
            name: true;
        };
    };
    order: {
        select: {
            code: true;
            status: true;
        };
    };
    rfq: {
        select: {
            code: true;
        };
    };
    partnership: {
        select: {
            code: true;
        };
    };
};
export type BookingRow = Prisma.CapacityBookingGetPayload<{
    include: typeof bookingInclude;
}>;
export declare function relatedCategoryIds(prisma: PrismaService | Tx, categoryId: string): Promise<string[]>;
export declare class BookingsService implements OnModuleInit {
    private readonly prisma;
    private readonly settings;
    private readonly payments;
    private readonly codes;
    private readonly notifier;
    private readonly audit;
    private readonly orderHooks;
    private readonly logger;
    constructor(prisma: PrismaService, settings: BookingSettingsService, payments: PaymentsService, codes: PublicCodeService, notifier: Notifier, audit: AuditService, orderHooks: OrderHooks);
    onModuleInit(): void;
    terms(slotId: string, query: BookingTermsQuery): Promise<BookingTerms>;
    create(ctx: BuyerContext, dto: CreateBookingDto): Promise<{
        code: string;
    }>;
    buyerList(ctx: BuyerContext): Promise<BuyerBooking[]>;
    buyerGet(ctx: BuyerContext, code: string): Promise<BuyerBooking>;
    payDeposit(ctx: BuyerContext, code: string, method: PaymentMethod): Promise<PaymentStart>;
    markDepositSent(ctx: BuyerContext, code: string, paymentId: string, dto: MarkSentDto): Promise<void>;
    cancelByBuyer(ctx: BuyerContext, code: string, reason: string): Promise<void>;
    factoryList(ctx: ManufacturerContext): Promise<ManufacturerBooking[]>;
    factoryGet(ctx: ManufacturerContext, code: string): Promise<ManufacturerBooking>;
    accept(ctx: ManufacturerContext, code: string): Promise<void>;
    decline(ctx: ManufacturerContext, code: string, reason: string): Promise<void>;
    adminList(status: CapacityBookingStatus | undefined): Promise<AdminBooking[]>;
    adminCancel(adminId: string, code: string, reason: string): Promise<void>;
    payCompensation(adminId: string, code: string): Promise<void>;
    convert(ctx: BuyerContext, code: string, dto: ConvertBookingDto): Promise<ConvertedBooking>;
    linkFullPackageOrders(where?: Prisma.CapacityBookingWhereInput): Promise<number>;
    onDepositSettled(bookingId: string): Promise<void>;
    private tryConfirm;
    private end;
    sweep(now?: Date): Promise<{
        reminded: number;
        expired: number;
        linked: number;
    }>;
    private buyerView;
    private nextAction;
    private factoryView;
    private bookableSlot;
    private buyerBooking;
    private factoryBooking;
    private afterConversion;
    private notifyBuyer;
}
export {};
