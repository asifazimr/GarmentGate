import type Stripe from 'stripe';
type Handler = (event: Stripe.Event) => Promise<void>;
export declare class StripeEvents {
    private readonly handlers;
    on(handler: Handler): void;
    emit(event: Stripe.Event): Promise<void>;
}
export {};
