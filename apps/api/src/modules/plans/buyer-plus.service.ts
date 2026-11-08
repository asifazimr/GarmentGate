import { Injectable, NotFoundException, type OnModuleInit } from '@nestjs/common';
import {
  type BuyerPlus,
  type BuyerPlusSettings,
  BuyerPlusSettingsSchema,
  DEFAULT_BUYER_PLUS_SETTINGS,
  type GrantPlusDto,
  type PlusCheckoutDto,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { BuyerContext } from '../buyer/buyer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { BUYER_PLUS_KEY } from '../payments/charges.js';
import { SubscriptionsService } from './subscriptions.service.js';

/**
 * GarmentGate Plus for buyers, on top of the subscription engine. Membership in force is
 * `buyer_profiles.plusActive`; the perks (free inspections, cheaper samples, priority RFQs, a
 * dedicated merchandiser) are all staff-configurable in `platform_settings.buyer_plus`.
 */
@Injectable()
export class BuyerPlusService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptions: SubscriptionsService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  onModuleInit(): void {
    this.subscriptions.onChange('BUYER', (owner) =>
      owner.kind === 'BUYER' ? this.apply(owner.companyId) : Promise.resolve(),
    );
  }

  async settings(): Promise<BuyerPlusSettings> {
    const row = await this.prisma.platformSetting.findUnique({ where: { key: BUYER_PLUS_KEY } });
    const parsed = BuyerPlusSettingsSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_BUYER_PLUS_SETTINGS;
  }

  async setSettings(adminId: string, s: BuyerPlusSettings): Promise<BuyerPlusSettings> {
    const value: Prisma.InputJsonValue = { ...s };
    await this.prisma.platformSetting.upsert({
      where: { key: BUYER_PLUS_KEY },
      create: { key: BUYER_PLUS_KEY, value },
      update: { value },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'plus.settings_updated',
      entityType: 'PlatformSetting',
      entityId: BUYER_PLUS_KEY,
      metadata: value,
    });
    return s;
  }

  async mine(ctx: BuyerContext): Promise<BuyerPlus> {
    const owner = { kind: 'BUYER', companyId: ctx.companyId } as const;
    const [settings, profile, sub, invoices, company] = await Promise.all([
      this.settings(),
      this.prisma.buyerProfile.findUniqueOrThrow({
        where: { companyId: ctx.companyId },
        select: { plusActive: true },
      }),
      this.subscriptions.live(owner),
      this.subscriptions.invoices(owner),
      this.prisma.company.findUniqueOrThrow({
        where: { id: ctx.companyId },
        select: { merchandiserId: true },
      }),
    ]);
    const m = company.merchandiserId
      ? await this.prisma.user.findFirst({
          where: { id: company.merchandiserId, role: 'ADMIN', status: 'ACTIVE' },
          select: { firstName: true, lastName: true },
        })
      : null;
    return {
      active: profile.plusActive,
      settings,
      subscription: sub
        ? {
            interval: sub.interval,
            source: sub.source,
            status: sub.status,
            currentPeriodEnd: sub.currentPeriodEnd?.toISOString() ?? null,
            cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
          }
        : null,
      invoices: invoices.map((i) => ({
        id: i.id,
        amountMinor: i.amountMinor,
        currency: i.currency,
        paidAt: i.paidAt.toISOString(),
      })),
      merchandiser: m ? `${m.firstName} ${m.lastName}` : null,
      cardEnabled: this.subscriptions.cardEnabled(),
    };
  }

  async checkout(ctx: BuyerContext, dto: PlusCheckoutDto): Promise<{ url: string }> {
    const settings = await this.settings();
    const [company, user] = await Promise.all([
      this.prisma.company.findUniqueOrThrow({
        where: { id: ctx.companyId },
        select: { legalName: true },
      }),
      this.prisma.user.findUniqueOrThrow({ where: { id: ctx.userId }, select: { email: true } }),
    ]);
    return this.subscriptions.checkout(
      { kind: 'BUYER', companyId: ctx.companyId },
      {
        tier: 'PLUS',
        interval: dto.interval,
        amountUsdMinor:
          dto.interval === 'YEAR' ? settings.yearlyUsdMinor : settings.monthlyUsdMinor,
        customerName: company.legalName,
        email: user.email,
        userId: ctx.userId,
        returnPath: '/buyer/plus',
      },
    );
  }

  cancel(ctx: BuyerContext): Promise<void> {
    return this.subscriptions.cancel({ kind: 'BUYER', companyId: ctx.companyId }, ctx.userId);
  }

  async grant(adminId: string, code: string, dto: GrantPlusDto): Promise<void> {
    const profile = await this.prisma.buyerProfile.findUnique({
      where: { publicCode: code },
      select: { companyId: true },
    });
    if (!profile) throw new NotFoundException('Buyer not found');
    await this.subscriptions.grant(
      { kind: 'BUYER', companyId: profile.companyId },
      {
        tier: dto.plus ? 'PLUS' : null,
        endsOn: dto.endsOn,
        paidUsdMinor: dto.paidUsdMinor,
        bankReference: dto.bankReference,
        note: dto.note,
        adminId,
      },
    );
  }

  /** Recomputes membership from the live subscriptions; returns whether it's in force. */
  async apply(companyId: string): Promise<boolean> {
    const now = Date.now();
    const [profile, subs, settings] = await Promise.all([
      this.prisma.buyerProfile.findUniqueOrThrow({
        where: { companyId },
        select: {
          plusActive: true,
          publicCode: true,
          company: { select: { merchandiserId: true } },
        },
      }),
      this.subscriptions.liveAll({ kind: 'BUYER', companyId }),
      this.settings(),
    ]);
    // Same rule as factory plans: active, or past due within a week's grace.
    const active = subs.some((s) => {
      if (s.currentPeriodEnd === null) return true;
      const grace = (s.status === 'PAST_DUE' ? 7 : 1) * 86_400_000;
      return s.currentPeriodEnd.getTime() + grace > now;
    });
    if (active === profile.plusActive) return active;
    await this.prisma.buyerProfile.update({ where: { companyId }, data: { plusActive: active } });
    await this.notifier.notify({
      to: { companyId },
      type: 'PAYMENT_UPDATE',
      title: active ? 'Welcome to GarmentGate Plus' : 'Your GarmentGate Plus membership ended',
      body: active
        ? 'Your member benefits apply from now on.'
        : 'Fees go back to the standard rates for new samples and inspections.',
    });
    if (active && settings.merchandiser && !profile.company.merchandiserId)
      await this.notifier.notify({
        to: 'ADMINS',
        type: 'SYSTEM',
        title: `Assign a merchandiser to ${profile.publicCode}`,
        body: 'This buyer joined GarmentGate Plus, which includes a dedicated merchandiser.',
      });
    return active;
  }
}
