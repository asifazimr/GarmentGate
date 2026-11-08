import { randomInt } from 'node:crypto';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  type AdminGigInspector,
  type AdminInspectorApplication,
  type CheckInDto,
  convertMinor,
  DEFAULT_GIG_SETTINGS,
  distanceMeters,
  type FactoryLocationDto,
  type GigSettings,
  GigSettingsSchema,
  type InspectorApplicationDto,
  type InspectorMe,
  type InspectorPayoutDetailsDto,
  type PayInspectorDto,
  pickedForAudit,
  type ReviewApplicationDto,
  rotationAllows,
  shouldSuspend,
  type Task,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { AuthService } from '../auth/auth.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { FxService } from '../payments/fx.service.js';
import { LedgerService } from '../payments/ledger.service.js';

const KEY = 'gig';
const DAY = 86_400_000;
const ROTATION_WINDOW = 90 * DAY;
const OPEN_STATUSES = ['IN_PRODUCTION', 'QC'] as const;

/**
 * Gig QC inspectors (business model: gig economy layer). Applications are vetted and certified
 * by staff; approved inspectors take inspections from a task feed (by distance and skill, never
 * the same factory too often), check in by GPS at the factory, file the report and earn their
 * day rate (revenue → INSPECTOR_PAYABLE), paid weekly to staff-verified payout details. Staff
 * rate each report; low averages suspend; a sample of reports is flagged for re-inspection.
 */
@Injectable()
export class GigService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService,
    private readonly ledger: LedgerService,
    private readonly fx: FxService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  async settings(): Promise<GigSettings> {
    const row = await this.prisma.platformSetting.findUnique({ where: { key: KEY } });
    const parsed = GigSettingsSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_GIG_SETTINGS;
  }

  async setSettings(adminId: string, s: GigSettings): Promise<GigSettings> {
    const value: Prisma.InputJsonValue = { ...s };
    await this.prisma.platformSetting.upsert({
      where: { key: KEY },
      create: { key: KEY, value },
      update: { value },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'gig.settings_updated',
      entityType: 'PlatformSetting',
      entityId: KEY,
      metadata: value,
    });
    return s;
  }

  // ── Applications ──────────────────────────────────────────────────────────

  async apply(dto: InspectorApplicationDto): Promise<void> {
    const [user, pending] = await Promise.all([
      this.prisma.user.findUnique({ where: { email: dto.email }, select: { id: true } }),
      this.prisma.inspectorApplication.findFirst({
        where: { email: dto.email, status: 'PENDING' },
        select: { id: true },
      }),
    ]);
    // Same answer either way: never reveal whether an email has an account.
    if (user || pending) return;
    await this.prisma.inspectorApplication.create({ data: dto });
    await this.notifier.notify({
      to: 'ADMINS',
      type: 'SYSTEM',
      title: 'New inspector application',
      body: `${dto.firstName} ${dto.lastName}, ${dto.city}: ${String(dto.experienceYears)} years of QC.`,
    });
  }

  async applications(): Promise<AdminInspectorApplication[]> {
    const rows = await this.prisma.inspectorApplication.findMany({
      orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
      take: 500,
    });
    return rows.map((r) => ({
      id: r.id,
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email,
      phone: r.phone,
      country: r.country,
      city: r.city,
      experienceYears: r.experienceYears,
      inspectionTypes: r.inspectionTypes,
      about: r.about,
      status: r.status,
      reviewNote: r.reviewNote,
      createdAt: r.createdAt.toISOString(),
    }));
  }

  async review(adminId: string, id: string, dto: ReviewApplicationDto): Promise<void> {
    const app = await this.prisma.inspectorApplication.findUnique({ where: { id } });
    if (!app) throw new NotFoundException('Application not found');
    if (app.status !== 'PENDING') throw new ConflictException('Already reviewed');
    if (dto.decision === 'REJECT') {
      await this.prisma.inspectorApplication.update({
        where: { id },
        data: {
          status: 'REJECTED',
          reviewNote: dto.note,
          reviewedById: adminId,
          reviewedAt: new Date(),
        },
      });
      await this.audit.log({
        actorUserId: adminId,
        action: 'gig.application_rejected',
        entityType: 'InspectorApplication',
        entityId: id,
        metadata: { note: dto.note ?? null },
      });
      return;
    }
    // The inspector account, with the usual "set your password" email.
    const { id: userId } = await this.auth.createStaffUser(adminId, {
      email: app.email,
      firstName: app.firstName,
      lastName: app.lastName,
      role: 'INSPECTOR',
    });
    await this.prisma.$transaction([
      this.prisma.inspectorProfile.create({
        data: {
          userId,
          country: app.country,
          city: app.city,
          latitude: dto.latitude ?? null,
          longitude: dto.longitude ?? null,
          serviceRadiusKm: dto.serviceRadiusKm,
          inspectionTypes: app.inspectionTypes,
          certifiedAt: new Date(),
        },
      }),
      this.prisma.inspectorApplication.update({
        where: { id },
        data: {
          status: 'APPROVED',
          userId,
          reviewNote: dto.note,
          reviewedById: adminId,
          reviewedAt: new Date(),
        },
      }),
    ]);
    await this.audit.log({
      actorUserId: adminId,
      action: 'gig.application_approved',
      entityType: 'InspectorApplication',
      entityId: id,
      metadata: { userId },
    });
  }

  // ── The inspector's work ──────────────────────────────────────────────────

  async tasks(userId: string): Promise<Task[]> {
    const profile = await this.activeProfile(userId);
    const [settings, open, recent] = await Promise.all([
      this.settings(),
      this.prisma.inspection.findMany({
        where: {
          result: 'PENDING',
          inspectorId: null,
          type: { in: profile.inspectionTypes },
          order: { status: { in: [...OPEN_STATUSES] } },
        },
        include: {
          order: {
            select: {
              code: true,
              title: true,
              quantity: true,
              manufacturerProfileId: true,
              manufacturerProfile: {
                select: {
                  publicCode: true,
                  latitude: true,
                  longitude: true,
                  company: { select: { city: true, country: true } },
                },
              },
            },
          },
        },
      }),
      this.recentByFactory(userId),
    ]);
    const me =
      profile.latitude !== null && profile.longitude !== null
        ? { latitude: Number(profile.latitude), longitude: Number(profile.longitude) }
        : null;
    const pay = profile.dayRateUsdMinor ?? settings.dayRateUsdMinor;
    return open
      .flatMap((i): Task[] => {
        const f = i.order.manufacturerProfile;
        if (!rotationAllows(recent.get(i.order.manufacturerProfileId) ?? 0, settings)) return [];
        const there =
          f.latitude !== null && f.longitude !== null
            ? { latitude: Number(f.latitude), longitude: Number(f.longitude) }
            : null;
        const km = me && there ? Math.round(distanceMeters(me, there) / 100) / 10 : null;
        if (km !== null && km > profile.serviceRadiusKm) return [];
        // Without coordinates on either side, only the inspector's own country.
        if (km === null && f.company.country !== profile.country) return [];
        return [
          {
            inspectionId: i.id,
            type: i.type,
            orderCode: i.order.code,
            title: i.order.title,
            quantity: i.order.quantity,
            factory: { code: f.publicCode, city: f.company.city, country: f.company.country },
            distanceKm: km,
            scheduledAt: i.scheduledAt?.toISOString() ?? null,
            payUsdMinor: pay,
          },
        ];
      })
      .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  }

  async claim(userId: string, inspectionId: string): Promise<void> {
    const task = (await this.tasks(userId)).find((t) => t.inspectionId === inspectionId);
    if (!task) throw new ConflictException('This inspection isn’t available to you any more');
    const { count } = await this.prisma.inspection.updateMany({
      where: { id: inspectionId, inspectorId: null, result: 'PENDING' },
      data: { inspectorId: userId, assignedAt: new Date(), payUsdMinor: task.payUsdMinor },
    });
    if (count !== 1) throw new ConflictException('Someone just took this inspection');
    await this.audit.log({
      actorUserId: userId,
      action: 'gig.inspection_claimed',
      entityType: 'Inspection',
      entityId: inspectionId,
    });
  }

  /** The inspector is at the factory: GPS within the check-in radius. */
  async checkIn(
    userId: string,
    inspectionId: string,
    dto: CheckInDto,
  ): Promise<{ distanceM: number }> {
    const i = await this.prisma.inspection.findUnique({
      where: { id: inspectionId },
      include: {
        order: { select: { manufacturerProfile: { select: { latitude: true, longitude: true } } } },
      },
    });
    if (i?.inspectorId !== userId) throw new NotFoundException('Inspection not found');
    if (i.result !== 'PENDING') throw new ConflictException('The report is already filed');
    const f = i.order.manufacturerProfile;
    if (f.latitude === null || f.longitude === null)
      throw new ConflictException('GarmentGate hasn’t located this factory yet: tell staff');
    const { checkInRadiusM } = await this.settings();
    const distanceM = distanceMeters(dto, {
      latitude: Number(f.latitude),
      longitude: Number(f.longitude),
    });
    if (distanceM > checkInRadiusM)
      throw new ConflictException(
        `You’re ${String(Math.round(distanceM))} m from the factory: check in when you’re there`,
      );
    await this.prisma.inspection.update({
      where: { id: inspectionId },
      data: { checkedInAt: new Date(), checkInDistanceM: distanceM },
    });
    return { distanceM };
  }

  /** Called before a gig inspector's report is accepted: they must have checked in. */
  async assertCheckedIn(userId: string, inspectionId: string): Promise<void> {
    const profile = await this.prisma.inspectorProfile.findUnique({ where: { userId } });
    if (!profile) return; // staff inspectors and admins
    const i = await this.prisma.inspection.findUniqueOrThrow({
      where: { id: inspectionId },
      include: {
        order: { select: { manufacturerProfile: { select: { latitude: true } } } },
      },
    });
    if (i.order.manufacturerProfile.latitude !== null && !i.checkedInAt)
      throw new ConflictException('Check in at the factory before filing the report');
  }

  /** The report is filed: the inspector earns the day rate; some reports get re-inspected. */
  async onReportFiled(inspectionId: string): Promise<void> {
    const i = await this.prisma.inspection.findUniqueOrThrow({
      where: { id: inspectionId },
      include: { order: { select: { id: true, code: true } } },
    });
    if (!i.inspectorId || !i.payUsdMinor || i.earnedAt) return;
    const settings = await this.settings();
    const amount = BigInt(i.payUsdMinor);
    await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.inspection.updateMany({
        where: { id: i.id, earnedAt: null },
        data: {
          earnedAt: new Date(),
          auditRequested: pickedForAudit(randomInt(10_000), settings),
        },
      });
      if (count !== 1) return;
      const { rates } = await this.fx.snapshot('USD', tx);
      await this.ledger.post(tx, {
        kind: 'COMMISSION',
        key: `gig-earned:${i.id}`,
        orderId: i.order.id,
        currency: 'USD',
        rates,
        description: `${i.order.code}: inspection day owed to the inspector`,
        lines: [
          { account: 'PLATFORM_REVENUE', companyId: null, direction: 'DEBIT', amountMinor: amount },
          {
            account: 'INSPECTOR_PAYABLE',
            companyId: null,
            direction: 'CREDIT',
            amountMinor: amount,
          },
        ],
      });
    });
    const after = await this.prisma.inspection.findUniqueOrThrow({ where: { id: i.id } });
    if (after.auditRequested)
      await this.notifier.notify({
        to: 'ADMINS',
        type: 'QC_RESULT',
        title: `${i.order.code}: picked for a re-inspection`,
        body: 'A random check of a gig inspector’s report: send an in-house lead.',
        link: { orderCode: i.order.code },
      });
  }

  async me(userId: string): Promise<InspectorMe> {
    const profile = await this.prisma.inspectorProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('You’re not a gig inspector');
    const jobs = await this.prisma.inspection.findMany({
      where: { inspectorId: userId, payUsdMinor: { not: null } },
      orderBy: { createdAt: 'desc' },
      take: 200,
      include: { order: { select: { code: true } } },
    });
    const due = jobs
      .filter((j) => j.earnedAt && !j.paidAt)
      .reduce((a, j) => a + (j.payUsdMinor ?? 0), 0);
    const paid = jobs.filter((j) => j.paidAt).reduce((a, j) => a + (j.payUsdMinor ?? 0), 0);
    return {
      status: profile.status,
      city: profile.city,
      country: profile.country,
      serviceRadiusKm: profile.serviceRadiusKm,
      inspectionTypes: profile.inspectionTypes,
      rating: profile.ratingCount
        ? Math.round((profile.ratingSum / profile.ratingCount) * 10) / 10
        : null,
      ratingCount: profile.ratingCount,
      payout:
        profile.payoutMethod && profile.payoutName && profile.payoutAccount
          ? {
              method:
                profile.payoutMethod === 'BKASH' || profile.payoutMethod === 'NAGAD'
                  ? profile.payoutMethod
                  : 'BANK',
              name: profile.payoutName,
              accountMasked: `•••• ${profile.payoutAccount.slice(-4)}`,
              verified: profile.payoutVerifiedAt !== null,
            }
          : null,
      dueUsdMinor: due,
      paidUsdMinor: paid,
      jobs: jobs.map((j) => ({
        inspectionId: j.id,
        orderCode: j.order.code,
        type: j.type,
        inspectedAt: j.inspectedAt?.toISOString() ?? null,
        payUsdMinor: j.payUsdMinor,
        paid: j.paidAt !== null,
        rating: j.rating,
      })),
    };
  }

  async setPayout(userId: string, dto: InspectorPayoutDetailsDto): Promise<void> {
    const { count } = await this.prisma.inspectorProfile.updateMany({
      where: { userId },
      data: {
        payoutMethod: dto.method,
        payoutName: dto.name,
        payoutAccount: dto.account,
        // Changed details are checked again before any payout.
        payoutVerifiedAt: null,
      },
    });
    if (count !== 1) throw new NotFoundException('You’re not a gig inspector');
    await this.audit.log({
      actorUserId: userId,
      action: 'gig.payout_details_changed',
      entityType: 'InspectorProfile',
      entityId: userId,
    });
    await this.notifier.notify({
      to: 'ADMINS',
      type: 'PAYMENT_UPDATE',
      title: 'Inspector payout details to verify',
      body: 'An inspector changed where they’re paid. Payouts wait until staff verify it.',
    });
  }

  // ── Staff ─────────────────────────────────────────────────────────────────

  async inspectors(): Promise<AdminGigInspector[]> {
    const profiles = await this.prisma.inspectorProfile.findMany({
      orderBy: { createdAt: 'desc' },
    });
    const users = await this.prisma.user.findMany({
      where: { id: { in: profiles.map((p) => p.userId) } },
      select: { id: true, firstName: true, lastName: true, email: true },
    });
    const jobs = await this.prisma.inspection.groupBy({
      by: ['inspectorId'],
      where: { inspectorId: { in: profiles.map((p) => p.userId) } },
      _count: { _all: true },
    });
    const due = await this.prisma.inspection.groupBy({
      by: ['inspectorId'],
      where: {
        inspectorId: { in: profiles.map((p) => p.userId) },
        earnedAt: { not: null },
        paidAt: null,
      },
      _sum: { payUsdMinor: true },
    });
    return profiles.map((p) => {
      const u = users.find((x) => x.id === p.userId);
      return {
        userId: p.userId,
        name: u ? `${u.firstName} ${u.lastName}` : '',
        email: u?.email ?? '',
        status: p.status,
        city: p.city,
        country: p.country,
        certified: p.certifiedAt !== null,
        rating: p.ratingCount ? Math.round((p.ratingSum / p.ratingCount) * 10) / 10 : null,
        ratingCount: p.ratingCount,
        inspections: jobs.find((j) => j.inspectorId === p.userId)?._count._all ?? 0,
        dueUsdMinor: due.find((d) => d.inspectorId === p.userId)?._sum.payUsdMinor ?? 0,
        payout:
          p.payoutMethod && p.payoutName && p.payoutAccount
            ? {
                method:
                  p.payoutMethod === 'BKASH' || p.payoutMethod === 'NAGAD'
                    ? p.payoutMethod
                    : 'BANK',
                name: p.payoutName,
                account: p.payoutAccount,
                verified: p.payoutVerifiedAt !== null,
              }
            : null,
      };
    });
  }

  async verifyPayout(adminId: string, userId: string): Promise<void> {
    const { count } = await this.prisma.inspectorProfile.updateMany({
      where: { userId, payoutAccount: { not: null } },
      data: { payoutVerifiedAt: new Date() },
    });
    if (count !== 1) throw new NotFoundException('No payout details to verify');
    await this.audit.log({
      actorUserId: adminId,
      action: 'gig.payout_details_verified',
      entityType: 'InspectorProfile',
      entityId: userId,
    });
  }

  async setStatus(adminId: string, userId: string, status: 'ACTIVE' | 'SUSPENDED'): Promise<void> {
    const { count } = await this.prisma.inspectorProfile.updateMany({
      where: { userId },
      data: { status },
    });
    if (count !== 1) throw new NotFoundException('Inspector not found');
    await this.audit.log({
      actorUserId: adminId,
      action: `gig.inspector_${status.toLowerCase()}`,
      entityType: 'InspectorProfile',
      entityId: userId,
    });
  }

  /** Staff rate a filed report (1–5); a low average after enough ratings suspends. */
  async rate(adminId: string, inspectionId: string, rating: number): Promise<void> {
    const i = await this.prisma.inspection.findUnique({ where: { id: inspectionId } });
    if (!i?.inspectorId) throw new NotFoundException('Inspection not found');
    if (i.result === 'PENDING') throw new ConflictException('Rate it once the report is filed');
    const { count } = await this.prisma.inspection.updateMany({
      where: { id: inspectionId, rating: null },
      data: { rating },
    });
    if (count !== 1) throw new ConflictException('Already rated');
    const profile = await this.prisma.inspectorProfile.update({
      where: { userId: i.inspectorId },
      data: { ratingSum: { increment: rating }, ratingCount: { increment: 1 } },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'gig.inspection_rated',
      entityType: 'Inspection',
      entityId: inspectionId,
      metadata: { rating },
    });
    if (
      profile.status === 'ACTIVE' &&
      shouldSuspend({ sum: profile.ratingSum, count: profile.ratingCount }, await this.settings())
    ) {
      await this.prisma.inspectorProfile.update({
        where: { userId: profile.userId },
        data: { status: 'SUSPENDED' },
      });
      await this.notifier.notify({
        to: { userIds: [profile.userId] },
        type: 'SYSTEM',
        title: 'Your inspector account is paused',
        body: 'Recent reports were rated below GarmentGate’s bar. Staff will contact you about retraining.',
      });
    }
  }

  /** The weekly payout: everything earned and not yet paid, to verified details. */
  async pay(
    adminId: string,
    userId: string,
    dto: PayInspectorDto,
  ): Promise<{ paidUsdMinor: number }> {
    const profile = await this.prisma.inspectorProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Inspector not found');
    if (!profile.payoutVerifiedAt)
      throw new ConflictException('Verify the inspector’s payout details first');
    const due = await this.prisma.inspection.findMany({
      where: { inspectorId: userId, earnedAt: { not: null }, paidAt: null, payUsdMinor: { gt: 0 } },
    });
    if (due.length === 0) throw new ConflictException('Nothing is due');
    let total = 0;
    await this.prisma.$transaction(async (tx) => {
      const { rates } = await this.fx.snapshot('USD', tx);
      for (const i of due) {
        const { count } = await tx.inspection.updateMany({
          where: { id: i.id, paidAt: null },
          data: { paidAt: new Date(), payoutReference: dto.bankReference },
        });
        if (count !== 1) continue;
        const amount = BigInt(i.payUsdMinor ?? 0);
        const payment = await tx.payment.create({
          data: {
            orderId: i.orderId,
            direction: 'OUTBOUND',
            purpose: 'PAYOUT',
            amountMinor: amount,
            currency: 'USD',
            method: 'BANK_TRANSFER',
            provider: 'manual',
            reference: `GIG-${i.id.slice(-12)}`,
            payerReference: dto.bankReference,
            status: 'SUCCEEDED',
            paidAt: new Date(),
            confirmedById: adminId,
            unitsPerUsd: '1',
            amountUsdMinor: convertMinor(amount, 'USD', 'USD', rates),
          },
        });
        await this.ledger.post(tx, {
          kind: 'PAYOUT',
          key: `gig-paid:${i.id}`,
          orderId: i.orderId,
          paymentId: payment.id,
          currency: 'USD',
          rates,
          description: 'Inspection day paid to the inspector',
          lines: [
            {
              account: 'INSPECTOR_PAYABLE',
              companyId: null,
              direction: 'DEBIT',
              amountMinor: amount,
            },
            { account: 'PLATFORM_CASH', companyId: null, direction: 'CREDIT', amountMinor: amount },
          ],
        });
        total += Number(amount);
      }
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'gig.inspector_paid',
      entityType: 'InspectorProfile',
      entityId: userId,
      metadata: { paidUsdMinor: total, bankReference: dto.bankReference },
    });
    await this.notifier.notify({
      to: { userIds: [userId] },
      type: 'PAYMENT_UPDATE',
      title: 'GarmentGate paid you',
      body: `USD ${(total / 100).toFixed(2)} for your inspections (reference ${dto.bankReference}).`,
    });
    return { paidUsdMinor: total };
  }

  async setFactoryLocation(adminId: string, code: string, dto: FactoryLocationDto): Promise<void> {
    const { count } = await this.prisma.manufacturerProfile.updateMany({
      where: { publicCode: code },
      data: { latitude: dto.latitude, longitude: dto.longitude },
    });
    if (count !== 1) throw new NotFoundException('Factory not found');
    await this.audit.log({
      actorUserId: adminId,
      action: 'gig.factory_located',
      entityType: 'ManufacturerProfile',
      entityId: code,
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private async activeProfile(userId: string) {
    const profile = await this.prisma.inspectorProfile.findUnique({ where: { userId } });
    if (!profile) throw new ForbiddenException('The task feed is for gig inspectors');
    if (profile.status !== 'ACTIVE')
      throw new ForbiddenException('Your inspector account is paused');
    if (!profile.certifiedAt) throw new ForbiddenException('Finish your certification first');
    return profile;
  }

  /** How often this inspector inspected each factory in the rotation window. */
  private async recentByFactory(userId: string): Promise<Map<string, number>> {
    const rows = await this.prisma.inspection.findMany({
      where: { inspectorId: userId, createdAt: { gte: new Date(Date.now() - ROTATION_WINDOW) } },
      select: { order: { select: { manufacturerProfileId: true } } },
    });
    const m = new Map<string, number>();
    for (const r of rows)
      m.set(r.order.manufacturerProfileId, (m.get(r.order.manufacturerProfileId) ?? 0) + 1);
    return m;
  }

  /** Staff assigning a gig inspector: snapshot the pay as a claim would. */
  async payFor(userId: string | undefined): Promise<number | null> {
    if (!userId) return null;
    const profile = await this.prisma.inspectorProfile.findUnique({ where: { userId } });
    if (!profile) return null;
    return profile.dayRateUsdMinor ?? (await this.settings()).dayRateUsdMinor;
  }
}
