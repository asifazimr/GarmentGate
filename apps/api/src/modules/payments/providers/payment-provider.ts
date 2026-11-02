import type { Currency, PaymentMethod } from '@garmentgate/shared';

export const PAYMENT_PROVIDERS = Symbol('PAYMENT_PROVIDERS');

export interface StartInput {
  paymentId: string;
  reference: string;
  orderCode: string;
  amountMinor: bigint;
  currency: Currency;
  method: PaymentMethod;
}

export interface StartResult {
  /** The provider's id for this payment (e.g. a Stripe PaymentIntent), if it has one. */
  providerRef: string | null;
  /** Bank transfer / LC: what to tell the payer. */
  instructions: string[] | null;
  /** Card: what the browser needs to confirm the payment. */
  stripe: { clientSecret: string; publishableKey: string } | null;
}

export interface RefundInput {
  refundPaymentId: string;
  /** The original inbound payment's provider reference. */
  providerRef: string | null;
  amountMinor: bigint;
  currency: Currency;
}

/** The provider settled the money asynchronously; `confirmed` means we can post it now. */
export interface RefundResult {
  providerRef: string | null;
  confirmed: boolean;
}

/**
 * A way buyers pay GarmentGate. Add a provider by implementing this and registering it in
 * PaymentsModule; the ledger, escrow and releases don't change.
 */
export interface PaymentProvider {
  readonly id: 'manual' | 'stripe';
  readonly methods: readonly PaymentMethod[];
  enabled(): boolean;
  start(input: StartInput): Promise<StartResult>;
  /** Manual providers can't move money themselves: staff do, then record it. */
  refund(input: RefundInput): Promise<RefundResult>;
}
