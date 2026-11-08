import { Injectable } from '@nestjs/common';
import type Stripe from 'stripe';

type Handler = (event: Stripe.Event) => Promise<void>;

/**
 * Fans verified Stripe webhook events out to the features that care (payments handles
 * PaymentIntents itself; factory plans subscribe for Checkout, subscription and invoice events).
 * Keeps one webhook endpoint and one signing secret.
 */
@Injectable()
export class StripeEvents {
  private readonly handlers: Handler[] = [];

  on(handler: Handler): void {
    this.handlers.push(handler);
  }

  async emit(event: Stripe.Event): Promise<void> {
    for (const handler of this.handlers) await handler(event);
  }
}
