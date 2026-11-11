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
var SubscriptionsService_1;
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { FxService } from '../payments/fx.service.js';
import { LedgerService } from '../payments/ledger.service.js';
import { STRIPE_CLIENT, StripeProvider } from '../payments/providers/stripe.provider.js';
import { StripeEvents } from '../payments/stripe-events.js';
export const LIVE = ['ACTIVE', 'PAST_DUE'];
export const planLabel = (t) => t === 'PLUS' ? 'GarmentGate Plus' : `${t.charAt(0)}${t.slice(1).toLowerCase()} plan`;
export function ownerWhere(owner) {
    return owner.kind === 'FACTORY'
        ? { manufacturerProfileId: owner.profileId }
        : { buyerCompanyId: owner.companyId };
}
export function ownerOf(row) {
    return row.manufacturerProfileId
        ? { kind: 'FACTORY', profileId: row.manufacturerProfileId }
        : { kind: 'BUYER', companyId: row.buyerCompanyId ?? '' };
}
function stripeStatus(s) {
    switch (s) {
        case 'active':
        case 'trialing':
            return 'ACTIVE';
        case 'past_due':
        case 'unpaid':
            return 'PAST_DUE';
        case 'incomplete':
        case 'paused':
            return 'INCOMPLETE';
        default:
            return 'CANCELED';
    }
}
const idOf = (x) => typeof x === 'string' ? x : (x?.id ?? null);
let SubscriptionsService = SubscriptionsService_1 = class SubscriptionsService {
    prisma;
    ledger;
    fx;
    notifier;
    audit;
    stripeProvider;
    stripeEvents;
    config;
    stripe;
    logger = new Logger(SubscriptionsService_1.name);
    handlers = new Map();
    constructor(prisma, ledger, fx, notifier, audit, stripeProvider, stripeEvents, config, stripe) {
        this.prisma = prisma;
        this.ledger = ledger;
        this.fx = fx;
        this.notifier = notifier;
        this.audit = audit;
        this.stripeProvider = stripeProvider;
        this.stripeEvents = stripeEvents;
        this.config = config;
        this.stripe = stripe;
    }
    onModuleInit() {
        this.stripeEvents.on((event) => this.stripeEvent(event));
    }
    onChange(kind, handler) {
        this.handlers.set(kind, handler);
    }
    async changed(owner) {
        await this.handlers.get(owner.kind)?.(owner);
    }
    cardEnabled() {
        return this.stripe !== null && this.stripeProvider.enabled();
    }
    live(owner, client = this.prisma) {
        return client.planSubscription.findFirst({
            where: { ...ownerWhere(owner), status: { in: LIVE } },
            orderBy: { createdAt: 'desc' },
        });
    }
    liveAll(owner) {
        return this.prisma.planSubscription.findMany({
            where: { ...ownerWhere(owner), status: { in: LIVE } },
        });
    }
    invoices(owner) {
        return this.prisma.planInvoice.findMany({
            where: { subscription: ownerWhere(owner) },
            orderBy: { paidAt: 'desc' },
            take: 24,
        });
    }
    async checkout(owner, p) {
        if (!this.stripe || !this.cardEnabled())
            throw new ConflictException('Card payments aren’t available yet: ask GarmentGate to set this up by bank transfer');
        if (p.amountUsdMinor <= 0)
            throw new ConflictException('This plan has no price set');
        const live = await this.live(owner);
        if (live?.source === 'STRIPE' && live.tier === p.tier && live.interval === p.interval)
            throw new ConflictException(`You already have the ${planLabel(p.tier)}`);
        const known = await this.prisma.planSubscription.findFirst({
            where: { ...ownerWhere(owner), stripeCustomerId: { not: null } },
            orderBy: { createdAt: 'desc' },
            select: { stripeCustomerId: true },
        });
        const ownerId = owner.kind === 'FACTORY' ? owner.profileId : owner.companyId;
        const customer = known?.stripeCustomerId ??
            (await this.stripe.customers.create({ name: p.customerName, email: p.email, metadata: { owner: `${owner.kind}:${ownerId}` } }, { idempotencyKey: `cus:${ownerId}` })).id;
        const row = await this.prisma.$transaction(async (tx) => {
            await tx.planSubscription.updateMany({
                where: { ...ownerWhere(owner), status: 'INCOMPLETE' },
                data: { status: 'CANCELED', canceledAt: new Date() },
            });
            return tx.planSubscription.create({
                data: {
                    ...(owner.kind === 'FACTORY'
                        ? { manufacturerProfileId: owner.profileId }
                        : { buyerCompanyId: owner.companyId }),
                    tier: p.tier,
                    interval: p.interval,
                    source: 'STRIPE',
                    amountUsdMinor: p.amountUsdMinor,
                    stripeCustomerId: customer,
                    createdById: p.userId,
                },
            });
        });
        const web = this.config.get('WEB_APP_URL', { infer: true }).replace(/\/$/, '');
        const session = await this.stripe.checkout.sessions.create({
            mode: 'subscription',
            customer,
            client_reference_id: row.id,
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: 'usd',
                        unit_amount: p.amountUsdMinor,
                        recurring: { interval: p.interval === 'YEAR' ? 'year' : 'month' },
                        product_data: { name: `GarmentGate ${planLabel(p.tier)}` },
                    },
                },
            ],
            metadata: { subscriptionId: row.id },
            subscription_data: { metadata: { subscriptionId: row.id } },
            success_url: `${web}${p.returnPath}?checkout=success`,
            cancel_url: `${web}${p.returnPath}?checkout=cancelled`,
        }, { idempotencyKey: `checkout:${row.id}` });
        if (!session.url)
            throw new Error('Stripe returned no Checkout URL');
        await this.prisma.planSubscription.update({
            where: { id: row.id },
            data: { stripeCheckoutSessionId: session.id },
        });
        await this.audit.log({
            actorUserId: p.userId,
            action: 'plans.checkout_started',
            entityType: 'PlanSubscription',
            entityId: row.id,
            metadata: { tier: p.tier, interval: p.interval, amountUsdMinor: p.amountUsdMinor },
        });
        return { url: session.url };
    }
    async cancel(owner, userId) {
        const live = await this.live(owner);
        if (!live)
            throw new ConflictException('There’s no paid plan to cancel');
        if (live.source !== 'STRIPE' || !live.stripeSubscriptionId)
            throw new ConflictException('GarmentGate set up this plan: ask your account manager to end it');
        if (live.cancelAtPeriodEnd)
            return;
        if (!this.stripe)
            throw new ConflictException('Card payments aren’t available right now');
        await this.stripe.subscriptions.update(live.stripeSubscriptionId, {
            cancel_at_period_end: true,
        });
        await this.prisma.planSubscription.update({
            where: { id: live.id },
            data: { cancelAtPeriodEnd: true },
        });
        await this.audit.log({
            actorUserId: userId,
            action: 'plans.cancel_requested',
            entityType: 'PlanSubscription',
            entityId: live.id,
        });
    }
    async grant(owner, p) {
        const live = await this.live(owner);
        if (live?.source === 'STRIPE')
            throw new ConflictException('This account pays by card: it cancels its subscription before staff set another plan');
        const endsAt = p.endsOn ? new Date(`${p.endsOn}T23:59:59.999Z`) : null;
        if (endsAt && endsAt.getTime() <= Date.now())
            throw new ConflictException('The grant would already have ended');
        const tier = p.tier;
        const created = await this.prisma.$transaction(async (tx) => {
            if (live)
                await tx.planSubscription.update({
                    where: { id: live.id },
                    data: { status: 'CANCELED', canceledAt: new Date() },
                });
            if (tier === null)
                return null;
            return tx.planSubscription.create({
                data: {
                    ...(owner.kind === 'FACTORY'
                        ? { manufacturerProfileId: owner.profileId }
                        : { buyerCompanyId: owner.companyId }),
                    tier,
                    source: 'MANUAL',
                    status: 'ACTIVE',
                    amountUsdMinor: p.paidUsdMinor ?? 0,
                    currentPeriodEnd: endsAt,
                    note: p.note,
                    bankReference: p.bankReference ?? null,
                    createdById: p.adminId,
                },
            });
        });
        if (created && p.paidUsdMinor)
            await this.book(created.id, {
                key: `sub-manual:${created.id}`,
                stripeInvoiceId: null,
                amountMinor: p.paidUsdMinor,
                periodEnd: endsAt,
                description: `${planLabel(created.tier)} paid by transfer ${p.bankReference ?? ''}`,
            });
        await this.audit.log({
            actorUserId: p.adminId,
            action: 'plans.granted',
            entityType: owner.kind === 'FACTORY' ? 'ManufacturerProfile' : 'Company',
            entityId: owner.kind === 'FACTORY' ? owner.profileId : owner.companyId,
            metadata: {
                tier,
                endsOn: p.endsOn ?? null,
                paidUsdMinor: p.paidUsdMinor ?? null,
                note: p.note,
            },
        });
        await this.changed(owner);
    }
    async expireGrants(now = new Date()) {
        const lapsed = await this.prisma.planSubscription.findMany({
            where: { source: 'MANUAL', status: { in: LIVE }, currentPeriodEnd: { lt: now } },
        });
        if (lapsed.length === 0)
            return [];
        await this.prisma.planSubscription.updateMany({
            where: { id: { in: lapsed.map((l) => l.id) }, status: { in: LIVE } },
            data: { status: 'CANCELED', canceledAt: now },
        });
        return lapsed.map(ownerOf);
    }
    async stripeEvent(event) {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;
                if (session.mode !== 'subscription')
                    return;
                const id = session.metadata?.subscriptionId ?? session.client_reference_id;
                const subscriptionId = idOf(session.subscription);
                if (!id || !subscriptionId)
                    return;
                await this.prisma.planSubscription.updateMany({
                    where: { id, source: 'STRIPE', stripeSubscriptionId: null },
                    data: { stripeSubscriptionId: subscriptionId },
                });
                return;
            }
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                await this.onSubscription(event.data.object, event.type === 'customer.subscription.deleted');
                return;
            case 'invoice.paid':
                await this.onInvoicePaid(event.data.object);
                return;
            case 'invoice.payment_failed': {
                const row = await this.rowForInvoice(event.data.object);
                if (!row)
                    return;
                await this.notifier.notify({
                    to: { companyId: await this.companyOf(ownerOf(row)) },
                    type: 'PAYMENT_UPDATE',
                    title: 'Your plan payment didn’t go through',
                    body: `Update your card within 7 days to keep ${planLabel(row.tier)}.`,
                });
                return;
            }
            default:
                return;
        }
    }
    async onSubscription(sub, deleted) {
        const row = await this.prisma.planSubscription.findFirst({
            where: {
                OR: [
                    { stripeSubscriptionId: sub.id },
                    ...(sub.metadata.subscriptionId ? [{ id: sub.metadata.subscriptionId }] : []),
                ],
                source: 'STRIPE',
            },
        });
        if (!row) {
            this.logger.warn({ subscription: sub.id }, 'Stripe subscription event for an unknown plan');
            return;
        }
        if (row.status === 'CANCELED' && row.stripeSubscriptionId === sub.id && !deleted)
            return;
        const status = deleted ? 'CANCELED' : stripeStatus(sub.status);
        const ends = sub.items.data.map((i) => i.current_period_end);
        const currentPeriodEnd = ends.length > 0 ? new Date(Math.max(...ends) * 1000) : null;
        const owner = ownerOf(row);
        const replaced = [];
        await this.prisma.$transaction(async (tx) => {
            if (status === 'ACTIVE' || status === 'PAST_DUE') {
                const others = await tx.planSubscription.findMany({
                    where: { ...ownerWhere(owner), status: { in: LIVE }, id: { not: row.id } },
                });
                for (const o of others) {
                    await tx.planSubscription.update({
                        where: { id: o.id },
                        data: { status: 'CANCELED', canceledAt: new Date() },
                    });
                    if (o.stripeSubscriptionId)
                        replaced.push(o.stripeSubscriptionId);
                }
            }
            await tx.planSubscription.update({
                where: { id: row.id },
                data: {
                    stripeSubscriptionId: sub.id,
                    status,
                    currentPeriodEnd,
                    cancelAtPeriodEnd: sub.cancel_at_period_end,
                    ...(status === 'CANCELED' && !row.canceledAt && { canceledAt: new Date() }),
                },
            });
        });
        for (const id of replaced)
            await this.stripe?.subscriptions.cancel(id, { prorate: true }).catch((err) => {
                this.logger.error({ err, id }, 'Could not cancel replaced plan');
            });
        await this.changed(owner);
    }
    async rowForInvoice(inv) {
        const details = inv.parent?.subscription_details;
        if (!details)
            return null;
        const subscriptionId = idOf(details.subscription);
        const id = details.metadata?.subscriptionId;
        if (!subscriptionId && !id)
            return null;
        return this.prisma.planSubscription.findFirst({
            where: {
                source: 'STRIPE',
                OR: [
                    ...(subscriptionId ? [{ stripeSubscriptionId: subscriptionId }] : []),
                    ...(id ? [{ id }] : []),
                ],
            },
        });
    }
    async onInvoicePaid(inv) {
        if (inv.amount_paid <= 0)
            return;
        const row = await this.rowForInvoice(inv);
        if (!row)
            return;
        if (inv.currency !== 'usd') {
            this.logger.error({ invoice: inv.id }, 'Plan invoice in an unexpected currency');
            await this.notifier.notify({
                to: 'ADMINS',
                type: 'PAYMENT_UPDATE',
                title: 'Plan invoice in an unexpected currency',
                body: `Stripe invoice ${inv.id} was paid in ${inv.currency.toUpperCase()}: book it by hand.`,
            });
            return;
        }
        const periodEnd = inv.lines.data[0]?.period.end;
        await this.book(row.id, {
            key: `sub-invoice:${inv.id}`,
            stripeInvoiceId: inv.id,
            amountMinor: inv.amount_paid,
            periodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            description: `${planLabel(row.tier)}, Stripe invoice ${inv.id}`,
        });
    }
    async book(subscriptionId, p) {
        await this.prisma.$transaction(async (tx) => {
            const { rates } = await this.fx.snapshot('USD', tx);
            const amount = BigInt(p.amountMinor);
            const posted = await this.ledger.post(tx, {
                kind: 'SUBSCRIPTION',
                key: p.key,
                currency: 'USD',
                rates,
                description: p.description,
                lines: [
                    { account: 'PLATFORM_CASH', companyId: null, direction: 'DEBIT', amountMinor: amount },
                    {
                        account: 'PLATFORM_REVENUE',
                        companyId: null,
                        direction: 'CREDIT',
                        amountMinor: amount,
                    },
                ],
            });
            if (!posted)
                return;
            await tx.planInvoice.create({
                data: {
                    subscriptionId,
                    stripeInvoiceId: p.stripeInvoiceId,
                    amountMinor: p.amountMinor,
                    currency: 'USD',
                    paidAt: new Date(),
                    periodEnd: p.periodEnd,
                },
            });
        });
    }
    async companyOf(owner) {
        if (owner.kind === 'BUYER')
            return owner.companyId;
        return (await this.prisma.manufacturerProfile.findUniqueOrThrow({
            where: { id: owner.profileId },
            select: { companyId: true },
        })).companyId;
    }
};
SubscriptionsService = SubscriptionsService_1 = __decorate([
    Injectable(),
    __param(8, Inject(STRIPE_CLIENT)),
    __metadata("design:paramtypes", [PrismaService,
        LedgerService,
        FxService,
        Notifier,
        AuditService,
        StripeProvider,
        StripeEvents,
        ConfigService, Object])
], SubscriptionsService);
export { SubscriptionsService };
//# sourceMappingURL=subscriptions.service.js.map