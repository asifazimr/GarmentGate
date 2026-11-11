import type { Currency, PaymentMethod } from '@garmentgate/shared';
export declare const PAYMENT_PROVIDERS: unique symbol;
export interface StartInput {
    paymentId: string;
    reference: string;
    orderCode: string;
    amountMinor: bigint;
    currency: Currency;
    method: PaymentMethod;
}
export interface StartResult {
    providerRef: string | null;
    instructions: string[] | null;
    stripe: {
        clientSecret: string;
        publishableKey: string;
    } | null;
}
export interface RefundInput {
    refundPaymentId: string;
    providerRef: string | null;
    amountMinor: bigint;
    currency: Currency;
}
export interface RefundResult {
    providerRef: string | null;
    confirmed: boolean;
}
export interface PaymentProvider {
    readonly id: 'manual' | 'stripe';
    readonly methods: readonly PaymentMethod[];
    enabled(): boolean;
    start(input: StartInput): Promise<StartResult>;
    refund(input: RefundInput): Promise<RefundResult>;
}
