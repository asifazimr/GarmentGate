import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { PaymentMethod } from '@garmentgate/shared';
import Stripe from 'stripe';
import type { Env } from '../../../config/env.schema.js';
import type {
  PaymentProvider,
  RefundInput,
  RefundResult,
  StartInput,
  StartResult,
} from './payment-provider.js';

/** The Stripe API client, or null when Stripe isn't configured. Tests swap in a fake. */
export const STRIPE_CLIENT = Symbol('STRIPE_CLIENT');

export function stripeClientFactory(config: ConfigService<Env, true>): Stripe | null {
  const key = config.get('STRIPE_SECRET_KEY', { infer: true });
  return key ? new Stripe(key, { maxNetworkRetries: 2 }) : null;
}

/** Card payments from international buyers, via Stripe PaymentIntents and signed webhooks. */
@Injectable()
export class StripeProvider implements PaymentProvider {
  readonly id = 'stripe' as const;
  readonly methods: readonly PaymentMethod[] = ['CARD'];

  constructor(
    @Inject(STRIPE_CLIENT) private readonly client: Stripe | null,
    private readonly config: ConfigService<Env, true>,
  ) {}

  private publishableKey(): string {
    const key: unknown = this.config.get('STRIPE_PUBLISHABLE_KEY', { infer: true });
    return typeof key === 'string' ? key : '';
  }

  enabled(): boolean {
    return this.client !== null && this.publishableKey() !== '';
  }

  private api(): Stripe {
    if (!this.client) throw new Error('Stripe is not configured');
    return this.client;
  }

  async start(input: StartInput): Promise<StartResult> {
    const intent = await this.api().paymentIntents.create(
      {
        // Stripe also uses minor units, with the same zero-decimal currencies (e.g. VND).
        amount: Number(input.amountMinor),
        currency: input.currency.toLowerCase(),
        automatic_payment_methods: { enabled: true },
        description: `GarmentGate ${input.reference}`,
        metadata: {
          paymentId: input.paymentId,
          reference: input.reference,
          orderCode: input.orderCode,
        },
      },
      { idempotencyKey: `pi:${input.paymentId}` },
    );
    if (!intent.client_secret) throw new Error('Stripe returned no client secret');
    return {
      providerRef: intent.id,
      instructions: null,
      stripe: {
        clientSecret: intent.client_secret,
        publishableKey: this.publishableKey(),
      },
    };
  }

  async refund(input: RefundInput): Promise<RefundResult> {
    if (!input.providerRef) throw new Error('Card payment has no Stripe reference');
    const refund = await this.api().refunds.create(
      {
        payment_intent: input.providerRef,
        amount: Number(input.amountMinor),
        metadata: { paymentId: input.refundPaymentId },
      },
      { idempotencyKey: `refund:${input.refundPaymentId}` },
    );
    return {
      providerRef: refund.id,
      confirmed: refund.status === 'succeeded' || refund.status === 'pending',
    };
  }

  /** Verifies the signature and returns the event; throws on a forged or stale payload. */
  event(rawBody: Buffer, signature: string): Stripe.Event {
    const secret = this.config.get('STRIPE_WEBHOOK_SECRET', { infer: true });
    if (!secret) throw new Error('STRIPE_WEBHOOK_SECRET is not set');
    return this.api().webhooks.constructEvent(rawBody, signature, secret);
  }
}
