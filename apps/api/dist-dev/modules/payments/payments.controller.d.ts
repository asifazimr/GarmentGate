import { type RawBodyRequest } from '@nestjs/common';
import { type BuyerPayments, type ConfirmPaymentDto, type FinanceInbox, type FxRates, type LedgerBalances, type ManufacturerPayouts, type MarkSentDto, type OrderFinance, type PaymentStart, type PayoutDto, type PresignProofDto, type PresignUploadResponse, type RefundDto, type RejectPaymentDto, type ReleaseSchedule, type StartPaymentDto, type AdminBankAccount, type FactoryBankAccountDto, type FactoryBankAccountView, type ReviewBankAccountDto, type PayFeesDto, type ServiceFees } from '@garmentgate/shared';
import type { Request } from 'express';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ChatActorService } from '../chat/chat-actor.service.js';
import { FxService } from './fx.service.js';
import { BankAccountsService } from './bank-accounts.service.js';
import { StripeEvents } from './stripe-events.js';
import { PaymentsService } from './payments.service.js';
import { StripeProvider } from './providers/stripe.provider.js';
export declare class PaymentsController {
    private readonly actors;
    private readonly payments;
    private readonly stripe;
    private readonly bankAccounts;
    private readonly stripeEvents;
    constructor(actors: ChatActorService, payments: PaymentsService, stripe: StripeProvider, bankAccounts: BankAccountsService, stripeEvents: StripeEvents);
    buyerPayments(user: AuthenticatedUser, code: string): Promise<BuyerPayments>;
    payFees(user: AuthenticatedUser, code: string, dto: PayFeesDto): Promise<PaymentStart>;
    start(user: AuthenticatedUser, code: string, dto: StartPaymentDto): Promise<PaymentStart>;
    markSent(user: AuthenticatedUser, code: string, id: string, dto: MarkSentDto): Promise<void>;
    orderPayouts(user: AuthenticatedUser, code: string): Promise<ManufacturerPayouts>;
    payouts(user: AuthenticatedUser): Promise<ManufacturerPayouts[]>;
    bankAccount(user: AuthenticatedUser): Promise<FactoryBankAccountView | null>;
    setBankAccount(user: AuthenticatedUser, dto: FactoryBankAccountDto): Promise<void>;
    stripeWebhook(req: RawBodyRequest<Request>, signature: string | undefined): Promise<{
        received: boolean;
    }>;
}
export declare class AdminFinanceController {
    private readonly payments;
    private readonly fx;
    private readonly bankAccounts;
    constructor(payments: PaymentsService, fx: FxService, bankAccounts: BankAccountsService);
    bankAccountsList(): Promise<AdminBankAccount[]>;
    reviewBankAccount(user: AuthenticatedUser, id: string, dto: ReviewBankAccountDto): Promise<void>;
    inbox(): Promise<FinanceInbox>;
    balances(): Promise<LedgerBalances>;
    order(code: string): Promise<OrderFinance>;
    presignProof(user: AuthenticatedUser, id: string, dto: PresignProofDto): Promise<PresignUploadResponse>;
    confirm(user: AuthenticatedUser, id: string, dto: ConfirmPaymentDto): Promise<void>;
    reject(user: AuthenticatedUser, id: string, dto: RejectPaymentDto): Promise<void>;
    approve(user: AuthenticatedUser, id: string): Promise<void>;
    payout(user: AuthenticatedUser, id: string, dto: PayoutDto): Promise<void>;
    refund(user: AuthenticatedUser, code: string, dto: RefundDto): Promise<void>;
    schedule(): Promise<ReleaseSchedule>;
    setSchedule(user: AuthenticatedUser, dto: ReleaseSchedule): Promise<void>;
    fees(): Promise<ServiceFees>;
    setFees(user: AuthenticatedUser, dto: ServiceFees): Promise<ServiceFees>;
    rates(): Promise<FxRates>;
    setRates(user: AuthenticatedUser, dto: FxRates): Promise<void>;
}
