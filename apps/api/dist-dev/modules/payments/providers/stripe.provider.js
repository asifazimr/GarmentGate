var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
export const STRIPE_CLIENT = Symbol('STRIPE_CLIENT');
export function stripeClientFactory(config) {
    const key = config.get('STRIPE_SECRET_KEY', { infer: true });
    return key ? new Stripe(key, { maxNetworkRetries: 2 }) : null;
}
let StripeProvider = class StripeProvider {
    client;
    config;
    id = 'stripe';
    methods = ['CARD'];
    constructor(client, config) {
        this.client = client;
        this.config = config;
    }
    publishableKey() {
        const key = this.config.get('STRIPE_PUBLISHABLE_KEY', { infer: true });
        return typeof key === 'string' ? key : '';
    }
    enabled() {
        return this.client !== null && this.publishableKey() !== '';
    }
    api() {
        if (!this.client)
            throw new Error('Stripe is not configured');
        return this.client;
    }
    async start(input) {
        const intent = await this.api().paymentIntents.create({
            amount: Number(input.amountMinor),
            currency: input.currency.toLowerCase(),
            automatic_payment_methods: { enabled: true },
            description: `GarmentGate ${input.reference}`,
            metadata: {
                paymentId: input.paymentId,
                reference: input.reference,
                orderCode: input.orderCode,
            },
        }, { idempotencyKey: `pi:${input.paymentId}` });
        if (!intent.client_secret)
            throw new Error('Stripe returned no client secret');
        return {
            providerRef: intent.id,
            instructions: null,
            stripe: {
                clientSecret: intent.client_secret,
                publishableKey: this.publishableKey(),
            },
        };
    }
    async refund(input) {
        if (!input.providerRef)
            throw new Error('Card payment has no Stripe reference');
        const refund = await this.api().refunds.create({
            payment_intent: input.providerRef,
            amount: Number(input.amountMinor),
            metadata: { paymentId: input.refundPaymentId },
        }, { idempotencyKey: `refund:${input.refundPaymentId}` });
        return {
            providerRef: refund.id,
            confirmed: refund.status === 'succeeded' || refund.status === 'pending',
        };
    }
    event(rawBody, signature) {
        const secret = this.config.get('STRIPE_WEBHOOK_SECRET', { infer: true });
        if (!secret)
            throw new Error('STRIPE_WEBHOOK_SECRET is not set');
        return this.api().webhooks.constructEvent(rawBody, signature, secret);
    }
};
StripeProvider = __decorate([
    Injectable(),
    __param(0, Inject(STRIPE_CLIENT)),
    __metadata("design:paramtypes", [Object, ConfigService])
], StripeProvider);
export { StripeProvider };
//# sourceMappingURL=stripe.provider.js.map