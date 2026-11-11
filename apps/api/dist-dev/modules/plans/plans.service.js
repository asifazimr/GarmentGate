var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { canListAnother, DEFAULT_PLAN_SETTINGS, grantedTier, PaidTierSchema, PlanSettingsSchema, priceOf, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { applyMarkup, pickCatalogRule } from '../pricing/margin.js';
import { SearchService } from '../search/search.service.js';
import { BuyerPlusService } from './buyer-plus.service.js';
import { LIVE, SubscriptionsService } from './subscriptions.service.js';
const KEY = 'factory_plans';
const LISTED = {
    status: { in: ['PUBLISHED', 'PENDING_REVIEW'] },
    deletedAt: null,
};
const label = (t) => t.charAt(0) + t.slice(1).toLowerCase();
let PlansService = class PlansService {
    prisma;
    subscriptions;
    buyerPlus;
    search;
    notifier;
    audit;
    constructor(prisma, subscriptions, buyerPlus, search, notifier, audit) {
        this.prisma = prisma;
        this.subscriptions = subscriptions;
        this.buyerPlus = buyerPlus;
        this.search = search;
        this.notifier = notifier;
        this.audit = audit;
    }
    onModuleInit() {
        this.subscriptions.onChange('FACTORY', (owner) => owner.kind === 'FACTORY' ? this.applyTier(owner.profileId) : Promise.resolve());
    }
    async settings() {
        const row = await this.prisma.platformSetting.findUnique({ where: { key: KEY } });
        const parsed = PlanSettingsSchema.safeParse(row?.value);
        return parsed.success ? parsed.data : DEFAULT_PLAN_SETTINGS;
    }
    async setSettings(adminId, s) {
        const value = JSON.parse(JSON.stringify(s));
        await this.prisma.platformSetting.upsert({
            where: { key: KEY },
            create: { key: KEY, value },
            update: { value },
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'plans.settings_updated',
            entityType: 'PlatformSetting',
            entityId: KEY,
            metadata: value,
        });
        const paid = await this.prisma.manufacturerProfile.findMany({
            where: { planTier: { not: 'FREE' } },
            select: { id: true },
        });
        for (const p of paid)
            await this.applyTier(p.id, { force: true });
        return s;
    }
    async termsFor(profileId) {
        const [profile, settings] = await Promise.all([
            this.prisma.manufacturerProfile.findUniqueOrThrow({
                where: { id: profileId },
                select: { planTier: true },
            }),
            this.settings(),
        ]);
        return { tier: profile.planTier, terms: settings.tiers[profile.planTier] };
    }
    async assertCanList(profileId, exceptProductId) {
        const [{ tier, terms }, listed] = await Promise.all([
            this.termsFor(profileId),
            this.prisma.product.count({
                where: {
                    manufacturerProfileId: profileId,
                    ...LISTED,
                    ...(exceptProductId && { id: { not: exceptProductId } }),
                },
            }),
        ]);
        if (!canListAnother(listed, terms))
            throw new ConflictException(`The ${label(tier)} plan lists up to ${String(terms.maxProducts)} products: upgrade, or unpublish one first`);
    }
    async mine(ctx) {
        const owner = { kind: 'FACTORY', profileId: ctx.profileId };
        const [settings, profile, sub, listed, invoices] = await Promise.all([
            this.settings(),
            this.prisma.manufacturerProfile.findUniqueOrThrow({
                where: { id: ctx.profileId },
                select: { planTier: true },
            }),
            this.subscriptions.live(owner),
            this.prisma.product.count({ where: { manufacturerProfileId: ctx.profileId, ...LISTED } }),
            this.subscriptions.invoices(owner),
        ]);
        return {
            tier: profile.planTier,
            terms: settings.tiers,
            rfqHeadStartHours: settings.rfqHeadStartHours,
            subscription: sub
                ? {
                    tier: PaidTierSchema.parse(sub.tier),
                    interval: sub.interval,
                    source: sub.source,
                    status: sub.status,
                    currentPeriodEnd: sub.currentPeriodEnd?.toISOString() ?? null,
                    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
                }
                : null,
            listedProducts: listed,
            invoices: invoices.map((i) => ({
                id: i.id,
                amountMinor: i.amountMinor,
                currency: i.currency,
                paidAt: i.paidAt.toISOString(),
                periodEnd: i.periodEnd?.toISOString() ?? null,
            })),
            cardEnabled: this.subscriptions.cardEnabled(),
        };
    }
    async checkout(ctx, dto) {
        const settings = await this.settings();
        const [company, user] = await Promise.all([
            this.prisma.company.findUniqueOrThrow({
                where: { id: ctx.companyId },
                select: { legalName: true },
            }),
            this.prisma.user.findUniqueOrThrow({ where: { id: ctx.userId }, select: { email: true } }),
        ]);
        return this.subscriptions.checkout({ kind: 'FACTORY', profileId: ctx.profileId }, {
            tier: dto.tier,
            interval: dto.interval,
            amountUsdMinor: priceOf(settings.tiers[dto.tier], dto.interval),
            customerName: company.legalName,
            email: user.email,
            userId: ctx.userId,
            returnPath: '/manufacturer/plan',
        });
    }
    cancel(ctx) {
        return this.subscriptions.cancel({ kind: 'FACTORY', profileId: ctx.profileId }, ctx.userId);
    }
    async grant(adminId, code, dto) {
        const profile = await this.prisma.manufacturerProfile.findUnique({
            where: { publicCode: code },
            select: { id: true },
        });
        if (!profile)
            throw new NotFoundException('Factory not found');
        await this.subscriptions.grant({ kind: 'FACTORY', profileId: profile.id }, {
            tier: dto.tier === 'FREE' ? null : dto.tier,
            endsOn: dto.endsOn,
            paidUsdMinor: dto.paidUsdMinor,
            bankReference: dto.bankReference,
            note: dto.note,
            adminId,
        });
    }
    async adminList() {
        const [groups, plus, rows] = await Promise.all([
            this.prisma.manufacturerProfile.groupBy({ by: ['planTier'], _count: { _all: true } }),
            this.prisma.buyerProfile.count({ where: { plusActive: true } }),
            this.prisma.planSubscription.findMany({
                where: { status: { not: 'INCOMPLETE' } },
                orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
                take: 500,
                include: {
                    invoices: { select: { amountMinor: true } },
                    manufacturerProfile: {
                        select: { publicCode: true, company: { select: { legalName: true, country: true } } },
                    },
                    buyerCompany: {
                        select: {
                            legalName: true,
                            country: true,
                            buyerProfile: { select: { publicCode: true } },
                        },
                    },
                },
            }),
        ]);
        const counts = { FREE: 0, PRO: 0, PREMIUM: 0, PLUS: plus };
        for (const g of groups)
            counts[g.planTier] = g._count._all;
        const mrr = rows
            .filter((r) => LIVE.includes(r.status))
            .reduce((sum, r) => sum +
            (r.interval === 'YEAR'
                ? Math.round(r.amountUsdMinor / 12)
                : r.interval === 'MONTH'
                    ? r.amountUsdMinor
                    : 0), 0);
        return {
            counts,
            mrrUsdMinor: mrr,
            subscriptions: rows.map((r) => ({
                id: r.id,
                account: r.manufacturerProfile
                    ? {
                        kind: 'FACTORY',
                        code: r.manufacturerProfile.publicCode,
                        name: r.manufacturerProfile.company.legalName,
                        country: r.manufacturerProfile.company.country,
                    }
                    : {
                        kind: 'BUYER',
                        code: r.buyerCompany?.buyerProfile?.publicCode ?? '',
                        name: r.buyerCompany?.legalName ?? '',
                        country: r.buyerCompany?.country ?? '',
                    },
                tier: r.tier,
                interval: r.interval,
                source: r.source,
                status: r.status,
                currentPeriodEnd: r.currentPeriodEnd?.toISOString() ?? null,
                cancelAtPeriodEnd: r.cancelAtPeriodEnd,
                amountUsdMinor: r.amountUsdMinor,
                paidUsdMinor: r.invoices.reduce((s, i) => s + i.amountMinor, 0),
                note: r.note,
                stripeSubscriptionId: r.stripeSubscriptionId,
                createdAt: r.createdAt.toISOString(),
            })),
        };
    }
    async applyTier(profileId, opts = {}) {
        const now = new Date();
        const [profile, subs, settings] = await Promise.all([
            this.prisma.manufacturerProfile.findUniqueOrThrow({
                where: { id: profileId },
                select: { planTier: true, searchBoost: true, companyId: true },
            }),
            this.subscriptions.liveAll({ kind: 'FACTORY', profileId }),
            this.settings(),
        ]);
        const tier = subs
            .map((s) => grantedTier({
            tier: PaidTierSchema.parse(s.tier),
            status: s.status,
            currentPeriodEnd: s.currentPeriodEnd,
        }, now))
            .find((t) => t !== null) ?? 'FREE';
        const boost = settings.tiers[tier].searchBoost;
        if (!opts.force && tier === profile.planTier && boost === profile.searchBoost)
            return tier;
        await this.prisma.manufacturerProfile.update({
            where: { id: profileId },
            data: { planTier: tier, searchBoost: boost },
        });
        await this.repriceCatalog(profileId, settings.tiers[tier].markupDiscountBps);
        await this.search.syncManufacturer(profileId);
        if (tier !== profile.planTier)
            await this.notifier.notify({
                to: { companyId: profile.companyId },
                type: 'PAYMENT_UPDATE',
                title: tier === 'FREE' ? 'You’re back on the Free plan' : `You’re on the ${label(tier)} plan`,
                body: tier === 'FREE'
                    ? 'Listed products above the Free limit stay up, but you can’t list more until you upgrade.'
                    : 'Your new plan’s perks apply from now on.',
            });
        return tier;
    }
    async repriceCatalog(profileId, discountBps) {
        const [rules, products] = await Promise.all([
            this.prisma.marginRule.findMany({ where: { active: true, companyId: null } }),
            this.prisma.product.findMany({
                where: { manufacturerProfileId: profileId, deletedAt: null },
                select: {
                    category: { select: { id: true, parentId: true } },
                    priceTiers: { select: { id: true, manufacturerUnitPriceMinor: true } },
                },
            }),
        ]);
        for (const p of products) {
            const rule = pickCatalogRule(rules, p.category);
            for (const t of p.priceTiers)
                await this.prisma.productPriceTier.update({
                    where: { id: t.id },
                    data: {
                        buyerUnitPriceMinor: applyMarkup(t.manufacturerUnitPriceMinor, rule, discountBps),
                    },
                });
        }
    }
    async sweep() {
        await this.subscriptions.expireGrants();
        const [profiles, buyers] = await Promise.all([
            this.prisma.manufacturerProfile.findMany({
                where: {
                    OR: [
                        { planTier: { not: 'FREE' } },
                        { subscriptions: { some: { status: { in: LIVE } } } },
                    ],
                },
                select: { id: true, planTier: true },
            }),
            this.prisma.buyerProfile.findMany({
                where: {
                    OR: [
                        { plusActive: true },
                        { company: { planSubscriptions: { some: { status: { in: LIVE } } } } },
                    ],
                },
                select: { companyId: true, plusActive: true },
            }),
        ]);
        let changed = 0;
        for (const p of profiles)
            if ((await this.applyTier(p.id)) !== p.planTier)
                changed++;
        for (const b of buyers)
            if ((await this.buyerPlus.apply(b.companyId)) !== b.plusActive)
                changed++;
        const due = await this.prisma.$queryRaw `
      UPDATE "rfq_invitations" i SET "notifiedAt" = now()
      FROM "rfqs" r
      WHERE r."id" = i."rfqId" AND i."notifiedAt" IS NULL AND i."visibleAt" <= now()
        AND i."visibleAt" > i."invitedAt" AND r."status" = 'OPEN' AND r."deadline" > now()
      RETURNING i."rfqId", i."manufacturerProfileId"`;
        if (due.length > 0) {
            const [rfqs, factories] = await Promise.all([
                this.prisma.rfq.findMany({
                    where: { id: { in: [...new Set(due.map((d) => d.rfqId))] } },
                    select: { id: true, code: true, quantity: true, deadline: true },
                }),
                this.prisma.manufacturerProfile.findMany({
                    where: { id: { in: [...new Set(due.map((d) => d.manufacturerProfileId))] } },
                    select: { id: true, companyId: true },
                }),
            ]);
            const rfqById = new Map(rfqs.map((r) => [r.id, r]));
            const companyOf = new Map(factories.map((f) => [f.id, f.companyId]));
            for (const d of due) {
                const rfq = rfqById.get(d.rfqId);
                const companyId = companyOf.get(d.manufacturerProfileId);
                if (!rfq || !companyId)
                    continue;
                await this.notifier.notify({
                    to: { companyId },
                    type: 'RFQ_INVITATION',
                    title: `New RFQ ${rfq.code}`,
                    body: `${rfq.quantity.toLocaleString('en')} pcs · quotes due ${rfq.deadline.toISOString().slice(0, 10)}`,
                    link: { rfqCode: rfq.code },
                });
            }
        }
        return { changed, announced: due.length };
    }
};
PlansService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        SubscriptionsService,
        BuyerPlusService,
        SearchService,
        Notifier,
        AuditService])
], PlansService);
export { PlansService };
//# sourceMappingURL=plans.service.js.map