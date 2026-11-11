import { ConfigService } from '@nestjs/config';
import type { PaymentMethod } from '@garmentgate/shared';
import Stripe from 'stripe';
import type { Env } from '../../../config/env.schema.js';
import type { PaymentProvider, RefundInput, RefundResult, StartInput, StartResult } from './payment-provider.js';
export declare const STRIPE_CLIENT: unique symbol;
export declare function stripeClientFactory(config: ConfigService<Env, true>): Stripe | null;
export declare class StripeProvider implements PaymentProvider {
    private readonly client;
    private readonly config;
    readonly id: "stripe";
    readonly methods: readonly PaymentMethod[];
    constructor(client: Stripe | null, config: ConfigService<Env, true>);
    private publishableKey;
    enabled(): boolean;
    private api;
    start(input: StartInput): Promise<StartResult>;
    refund(input: RefundInput): Promise<RefundResult>;
    event(rawBody: Buffer, signature: string): Stripe.Event;
}
