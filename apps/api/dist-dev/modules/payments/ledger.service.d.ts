import { type Currency, type UnitsPerUsd } from '@garmentgate/shared';
import type { LedgerAccountType, LedgerTransactionKind, Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
type Tx = Prisma.TransactionClient;
export interface LedgerLine {
    account: LedgerAccountType;
    companyId: string | null;
    logisticsPartnerId?: string | null;
    direction: 'DEBIT' | 'CREDIT';
    amountMinor: bigint;
}
export interface Posting {
    kind: LedgerTransactionKind;
    key: string;
    orderId?: string | null;
    capacityBookingId?: string | null;
    paymentId?: string | null;
    currency: Currency;
    description: string;
    rates: UnitsPerUsd;
    lines: LedgerLine[];
}
export declare class UnbalancedPostingError extends Error {
}
export declare function normalBalance(type: LedgerAccountType, debit: bigint, credit: bigint): bigint;
export declare function checkPosting(lines: LedgerLine[]): void;
export declare class LedgerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    accountId(tx: Tx, type: LedgerAccountType, companyId: string | null, currency: Currency, logisticsPartnerId?: string | null): Promise<string>;
    post(tx: Tx, posting: Posting): Promise<boolean>;
    lockOrder(tx: Tx, orderId: string): Promise<void>;
    lockBooking(tx: Tx, bookingId: string): Promise<void>;
    bookingEscrow(bookingId: string, client?: Tx | PrismaService): Promise<bigint>;
    orderPosition(orderId: string, client?: Tx | PrismaService): Promise<{
        escrow: bigint;
        payable: bigint;
        revenue: bigint;
        cash: bigint;
        receivedIntoEscrow: bigint;
        releasedToPayable: bigint;
        paidOut: bigint;
    }>;
    balances(): Promise<{
        balance: bigint;
        id: string;
        type: LedgerAccountType;
        currency: Currency;
        companyId: string | null;
        logisticsPartnerId: string | null;
        debit: bigint;
        credit: bigint;
    }[]>;
}
export {};
