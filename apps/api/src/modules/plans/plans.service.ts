import {
  ConflictException,
  Injectable,
  NotFoundException,
  type OnModuleInit,
} from '@nestjs/common';
import {
  type AdminPlans,
  canListAnother,
  DEFAULT_PLAN_SETTINGS,
  type FactoryPlan,
  type GrantPlanDto,
  grantedTier,
  type PaidTier,
  PaidTierSchema,
  type PlanCheckoutDto,
  type PlanSettings,
  PlanSettingsSchema,
  type PlanTerms,
  type PlanTier,
  priceOf,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { applyMarkup, pickCatalogRule } from '../pricing/margin.js';
import { SearchService } from '../search/search.service.js';
import { BuyerPlusService } from './buyer-plus.service.js';
import { LIVE, SubscriptionsService } from './subscriptions.service.js';

const KEY = 'factory_plans';
const LISTED = {
  status: { in: ['PUBLISHED', 'PENDING_REVIEW'] },
  deletedAt: null,
} satisfies Prisma.ProductWhereInput;
const label = (t: PlanTier) => t.charAt(0) + t.slice(1).toLowerCase();

/**
 * Factory plans (Free / Pro / Premium) on top of the subscription engine. The tier in force
 * lives on the factory profile and drives the perks: listed-product limit, search boost, a
 * smaller markup on its prices and the RFQ head start.
 */
@Injectable()
export class PlansService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptions: SubscriptionsService,
    private readonly buyerPlus: BuyerPlusService,
    private readonly search: SearchService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  onModuleInit(): void {
    this.subscriptions.onChange('FACTORY', (owner) =>
      owner.kind === 'FACTORY' ? this.applyTier(owner.profileId) : Promise.resolve(),
    );
  }

  // ── Settings and terms ────────────────────────────────────────────────────

  async settings(): Promise<PlanSettings> {
    const row = await this.prisma.platformSetting.findUnique({ where: { key: KEY } });
    const parsed = PlanSettingsSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_PLAN_SETTINGS;
  }

  async setSettings(adminId: string, s: PlanSettings): Promise<PlanSettings> {
    const value = JSON.parse(JSON.stringify(s)) as Prisma.InputJsonValue;
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
    // Boosts and discounts may have changed: bring every paid factory in step.
    const paid = await this.prisma.manufacturerProfile.findMany({
      where: { planTier: { not: 'FREE' } },
      select: { id: true },
    });
    for (const p of paid) await this.applyTier(p.id, { force: true });
    return s;
  }

  /** The terms a factory is on right now. */
  async termsFor(profileId: string): Promise<{ tier: PlanTier; terms: PlanTerms }> {
    const [profile, settings] = await Promise.all([
      this.prisma.manufacturerProfile.findUniqueOrThrow({
        where: { id: profileId },
        select: { planTier: true },
      }),
      this.settings(),
    ]);
    return { tier: profile.planTier, terms: settings.tiers[profile.planTier] };
  }

  /** Refuses listing one more product above the plan's limit (drafts are free). */
  async assertCanList(profileId: string, exceptProductId?: string): Promise<void> {
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
      throw new ConflictException(
        `The ${label(tier)} plan lists up to ${String(terms.maxProducts)} products: upgrade, or unpublish one first`,
      );
  }

  // ── The factory's own plan ────────────────────────────────────────────────

  async mine(ctx: ManufacturerContext): Promise<FactoryPlan> {
    const owner = { kind: 'FACTORY', profileId: ctx.profileId } as const;
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

  async checkout(ctx: ManufacturerContext, dto: PlanCheckoutDto): Promise<{ url: string }> {
    const settings = await this.settings();
    const [company, user] = await Promise.all([
      this.prisma.company.findUniqueOrThrow({
        where: { id: ctx.companyId },
        select: { legalName: true },
      }),
      this.prisma.user.findUniqueOrThrow({ where: { id: ctx.userId }, select: { email: true } }),
    ]);
    return this.subscriptions.checkout(
      { kind: 'FACTORY', profileId: ctx.profileId },
      {
        tier: dto.tier,
        interval: dto.interval,
        amountUsdMinor: priceOf(settings.tiers[dto.tier], dto.interval),
        customerName: company.legalName,
        email: user.email,
        userId: ctx.userId,
        returnPath: '/manufacturer/plan',
      },
    );
  }

  cancel(ctx: ManufacturerContext): Promise<void> {
    return this.subscriptions.cancel({ kind: 'FACTORY', profileId: ctx.profileId }, ctx.userId);
  }

  /** Staff put a factory on a plan by hand (bank transfer, promotion) or back on Free. */
  async grant(adminId: string, code: string, dto: GrantPlanDto): Promise<void> {
    const profile = await this.prisma.manufacturerProfile.findUnique({
      where: { publicCode: code },
      select: { id: true },
    });
    if (!profile) throw new NotFoundException('Factory not found');
    await this.subscriptions.grant(
      { kind: 'FACTORY', profileId: profile.id },
      {
        tier: dto.tier === 'FREE' ? null : dto.tier,
        endsOn: dto.endsOn,
        paidUsdMinor: dto.paidUsdMinor,
        bankReference: dto.bankReference,
        note: dto.note,
        adminId,
      },
    );
  }

  /** Every plan, factory and buyer, for staff. */
  async adminList(): Promise<AdminPlans> {
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
    for (const g of groups) counts[g.planTier] = g._count._all;
    const mrr = rows
      .filter((r) => LIVE.includes(r.status))
      .reduce(
        (sum, r) =>
          sum +
          (r.interval === 'YEAR'
            ? Math.round(r.amountUsdMinor / 12)
            : r.interval === 'MONTH'
              ? r.amountUsdMinor
              : 0),
        0,
      );
    return {
      counts,
      mrrUsdMinor: mrr,
      subscriptions: rows.map((r) => ({
        id: r.id,
        account: r.manufacturerProfile
          ? {
              kind: 'FACTORY' as const,
              code: r.manufacturerProfile.publicCode,
              name: r.manufacturerProfile.company.legalName,
              country: r.manufacturerProfile.company.country,
            }
          : {
              kind: 'BUYER' as const,
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

  // ── Keeping the tier in step ──────────────────────────────────────────────

  /**
   * Works out the tier in force from the factory's live subscriptions and, when it changed,
   * applies it: profile, search boost (and the index), catalog buyer prices, a notification.
   */
  async applyTier(profileId: string, opts: { force?: boolean } = {}): Promise<PlanTier> {
    const now = new Date();
    const [profile, subs, settings] = await Promise.all([
      this.prisma.manufacturerProfile.findUniqueOrThrow({
        where: { id: profileId },
        select: { planTier: true, searchBoost: true, companyId: true },
      }),
      this.subscriptions.liveAll({ kind: 'FACTORY', profileId }),
      this.settings(),
    ]);
    const tier: PlanTier =
      subs
        .map((s) =>
          grantedTier(
            {
              tier: PaidTierSchema.parse(s.tier),
              status: s.status,
              currentPeriodEnd: s.currentPeriodEnd,
            },
            now,
          ),
        )
        .find((t): t is PaidTier => t !== null) ?? 'FREE';
    const boost = settings.tiers[tier].searchBoost;
    if (!opts.force && tier === profile.planTier && boost === profile.searchBoost) return tier;
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
        title:
          tier === 'FREE' ? 'You’re back on the Free plan' : `You’re on the ${label(tier)} plan`,
        body:
          tier === 'FREE'
            ? 'Listed products above the Free limit stay up, but you can’t list more until you upgrade.'
            : 'Your new plan’s perks apply from now on.',
      });
    return tier;
  }

  /** Catalog buyer prices carry the plan's markup discount: recompute them on a tier change. */
  private async repriceCatalog(profileId: string, discountBps: number): Promise<void> {
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

  /**
   * Every few minutes: ends lapsed staff grants, drops factories and buyers whose card plan
   * lapsed past the grace, and announces open RFQs to factories whose head-start wait is over.
   */
  async sweep(): Promise<{ changed: number; announced: number }> {
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
    for (const p of profiles) if ((await this.applyTier(p.id)) !== p.planTier) changed++;
    for (const b of buyers)
      if ((await this.buyerPlus.apply(b.companyId)) !== b.plusActive) changed++;

    // Claimed in one statement, so two sweeps never announce twice.
    const due = await this.prisma.$queryRaw<{ rfqId: string; manufacturerProfileId: string }[]>`
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
        if (!rfq || !companyId) continue;
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
}
