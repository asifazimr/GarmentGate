import { type OnModuleInit } from '@nestjs/common';
import { type BuyerPayments, type ConfirmPaymentDto, type Currency, type FinanceInbox, type LedgerBalances, type ManufacturerPayouts, type MarkSentDto, type OrderFinance, type PaymentMethod, type PaymentStart, type PayoutDto, type PresignProofDto, type PresignUploadResponse, type RefundDto, type ReleaseSchedule, type StartPaymentDto, type FeePurpose, type PayFeesDto, type ServiceFees } from '@garmentgate/shared';
import type Stripe from 'stripe';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { OrderHooks } from '../orders/order-hooks.js';
import { OrdersService } from '../orders/orders.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
import { BankAccountsService } from './bank-accounts.service.js';
import { FxService } from './fx.service.js';
import { LedgerService } from './ledger.service.js';
import { ManualProvider } from './providers/manual.provider.js';
import { StripeProvider } from './providers/stripe.provider.js';
export declare class PaymentsService implements OnModuleInit {
    private readonly prisma;
    private readonly notifier;
    private readonly ledger;
    private readonly fx;
    private readonly manual;
    private readonly stripe;
    private readonly orders;
    private readonly hooks;
    private readonly files;
    private readonly storage;
    private readonly audit;
    private readonly bankAccounts;
    private readonly logger;
    constructor(prisma: PrismaService, notifier: Notifier, ledger: LedgerService, fx: FxService, manual: ManualProvider, stripe: StripeProvider, orders: OrdersService, hooks: OrderHooks, files: FilesService, storage: StorageService, audit: AuditService, bankAccounts: BankAccountsService);
    onModuleInit(): void;
    private providers;
    private providerFor;
    private methods;
    private bookingSettled;
    onBookingDepositSettled(handler: (bookingId: string) => Promise<void>): void;
    releaseSchedule(client?: PrismaService | Prisma.TransactionClient): Promise<ReleaseSchedule>;
    setReleaseSchedule(adminId: string, schedule: ReleaseSchedule): Promise<void>;
    private commissionFor;
    private orderCategory;
    private onTransition;
    private paid;
    buyerView(actor: ChatActor, code: string): Promise<BuyerPayments>;
    fees(orderId: string): Promise<{
        purpose: "SAMPLE_FEE" | "INSPECTION_FEE";
        items: {
            id: string;
            createdAt: Date;
            currency: import("../../generated/prisma/enums.js").Currency;
            orderId: string;
            amountMinor: bigint;
            inspectionId: string | null;
            kind: import("../../generated/prisma/enums.js").OrderChargeKind;
            sampleId: string | null;
            waived: boolean;
        }[];
        charged: bigint;
        paid: bigint;
        due: bigint;
        pending: boolean;
    }[]>;
    feesDue(orderId: string): Promise<bigint>;
    payFees(actor: ChatActor, code: string, dto: PayFeesDto): Promise<PaymentStart>;
    serviceFees(): Promise<ServiceFees>;
    setServiceFees(adminId: string, fees: ServiceFees): Promise<ServiceFees>;
    releaseClaimWindows(now?: Date): Promise<number>;
    start(actor: ChatActor, code: string, dto: StartPaymentDto): Promise<PaymentStart>;
    private startResult;
    markSent(actor: ChatActor, code: string, paymentId: string, dto: MarkSentDto): Promise<void>;
    startOrderCharge(order: {
        id: string;
        code: string;
        currency: Currency;
    }, purpose: 'LOGISTICS' | FeePurpose, amount: bigint, method: PaymentMethod): Promise<PaymentStart>;
    balancePaid(order: {
        id: string;
        buyerUnitPriceMinor: number;
        quantity: number;
        depositBps: number;
    }): Promise<boolean>;
    orderChargeState(orderId: string, purpose: 'LOGISTICS' | FeePurpose): Promise<{
        paid: bigint;
        pending: boolean;
    }>;
    startBookingDeposit(booking: {
        id: string;
        code: string;
        currency: Currency;
    }, amount: bigint, method: PaymentMethod): Promise<PaymentStart>;
    markBookingDepositSent(booking: {
        id: string;
        code: string;
    }, paymentId: string, dto: MarkSentDto): Promise<void>;
    bookingDepositState(bookingId: string): Promise<{
        paid: bigint;
        pending: boolean;
    }>;
    settleBookingCancellation(booking: {
        id: string;
        code: string;
        currency: Currency;
        buyerCompanyId: string;
    }, factoryCompanyId: string, split: {
        refundMinor: bigint;
        factoryMinor: bigint;
        platformMinor: bigint;
    }, reason: string): Promise<void>;
    payBookingCompensation(adminId: string, booking: {
        id: string;
        code: string;
        currency: Currency;
    }, factoryCompanyId: string, amount: bigint): Promise<void>;
    carryBookingDepositIntoOrder(booking: {
        id: string;
        code: string;
        currency: Currency;
        buyerCompanyId: string;
    }, order: {
        id: string;
        code: string;
    }): Promise<bigint>;
    private settle;
    private creditSampleFees;
    presignProof(adminId: string, paymentId: string, dto: PresignProofDto): Promise<PresignUploadResponse>;
    confirm(adminId: string, paymentId: string, dto: ConfirmPaymentDto): Promise<void>;
    reject(adminId: string, paymentId: string, reason: string): Promise<void>;
    stripeEvent(event: Stripe.Event): Promise<void>;
    approveRelease(adminId: string, releaseId: string): Promise<void>;
    private releaseWithin;
    payout(adminId: string, releaseId: string, dto: PayoutDto): Promise<void>;
    refund(adminId: string, code: string, dto: RefundDto): Promise<void>;
    private payoutsView;
    private readonly releaseOrder;
    manufacturerView(actor: ChatActor, code: string): Promise<ManufacturerPayouts>;
    manufacturerOverview(actor: ChatActor): Promise<ManufacturerPayouts[]>;
    orderFinance(code: string): Promise<OrderFinance>;
    inbox(): Promise<FinanceInbox>;
    balances(): Promise<LedgerBalances>;
    private notifyCompany;
    private notifyAdmins;
}
