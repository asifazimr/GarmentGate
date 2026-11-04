import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  amountForMinutes,
  type BuyerPartnership,
  buyerRateFor,
  centiToSam,
  type CreatePartnershipDto,
  dateOnly,
  filterContactDetails,
  isoDate,
  type ManufacturerPartnership,
  partnershipDepositDue,
  partnershipMonths,
  samToCenti,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { BuyerContext } from '../buyer/buyer-context.service.js';
import { identityForScrubbing, listedManufacturer } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { reserveMinutes } from './allocation.js';
import { BookingSettingsService } from './booking-settings.service.js';
import { BookingsService, relatedCategoryIds } from './bookings.service.js';

const partnershipInclude = {
  manufacturerProfile: {
    select: { id: true, publicCode: true, company: { select: { country: true } } },
  },
  buyerCompany: {
    select: {
      id: true,
      ...identityForScrubbing.select,
      buyerProfile: { select: { publicCode: true } },
    },
  },
  line: { select: { id: true, code: true, name: true } },
  category: { select: { id: true, name: true } },
  bookings: {
    select: { code: true, status: true, startDate: true, endDate: true },
    orderBy: { startDate: 'asc' },
  },
} satisfies Prisma.CapacityPartnershipInclude;
type PartnershipRow = Prisma.CapacityPartnershipGetPayload<{ include: typeof partnershipInclude }>;

const month = (d: Date) => isoDate(d).slice(0, 7);

/**
 * Recurring partnerships: the same minutes on one line every month for 6–12 months. The factory
 * accepts against windows it has opened: each month's minutes are reserved at once (possibly
 * across several windows) as a PARTNERSHIP booking whose deposit falls due two weeks before the
 * month. From there each month behaves like any booking (reminders, expiry, conversion).
 */
@Injectable()
export class PartnershipsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: BookingSettingsService,
    private readonly bookings: BookingsService,
    private readonly codes: PublicCodeService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
  ) {}

  async request(ctx: BuyerContext, dto: CreatePartnershipDto): Promise<{ code: string }> {
    const settings = await this.settings.get();
    const line = await this.prisma.productionLine.findFirst({
      where: { id: dto.lineId, status: 'ACTIVE', manufacturerProfile: listedManufacturer },
      include: { categories: { select: { id: true } } },
    });
    if (!line) throw new NotFoundException('That line isn’t available');
    const related = await relatedCategoryIds(this.prisma, dto.categoryId);
    if (!line.categories.some((c) => related.includes(c.id)))
      throw new BadRequestException('This line doesn’t make that category');
    if (dto.startMonth <= month(new Date()))
      throw new BadRequestException('Start from next month at the earliest');
    const note = dto.note ? filterContactDetails(dto.note) : null;
    const year = new Date().getUTCFullYear();
    const partnership = await this.prisma.$transaction(async (tx) => {
      const code = await this.codes.sequential(`CP-${String(year)}`, 5, tx);
      return tx.capacityPartnership.create({
        data: {
          code,
          buyerCompanyId: ctx.companyId,
          createdById: ctx.userId,
          manufacturerProfileId: line.manufacturerProfileId,
          lineId: line.id,
          categoryId: dto.categoryId,
          monthlyMinutes: dto.monthlyMinutes,
          months: dto.months,
          startMonth: dateOnly(`${dto.startMonth}-01`),
          samPerPieceCenti: dto.samPerPiece === undefined ? null : samToCenti(dto.samPerPiece),
          currency: line.currency,
          factoryRateMinorPer100Min: line.cmRateMinorPer100Min,
          buyerRateMinorPer100Min: buyerRateFor(line.cmRateMinorPer100Min, settings.bookingFeeBps),
          note: dto.note ?? null,
          noteFiltered: note?.filtered ?? null,
        },
      });
    });
    await this.audit.log({
      actorUserId: ctx.userId,
      action: note?.flagged ? 'moderation.contact_filtered' : 'capacity.partnership_requested',
      entityType: 'CapacityPartnership',
      entityId: partnership.id,
    });
    await this.notifier.notify({
      to: { manufacturerProfileId: line.manufacturerProfileId },
      type: 'ORDER_UPDATE',
      title: `Partnership request ${partnership.code}`,
      body: `${ctx.publicCode} wants ${dto.monthlyMinutes.toLocaleString('en')} minutes a month on line ${line.code} for ${String(dto.months)} months.`,
    });
    return { code: partnership.code };
  }

  /**
   * Accepting reserves every month at once, in one transaction: if any month lacks open
   * minutes on the line, nothing is reserved and the factory is told which month to open.
   */
  async accept(ctx: ManufacturerContext, code: string): Promise<void> {
    const p = await this.factoryPartnership(ctx, code);
    if (p.status !== 'REQUESTED') throw new ConflictException('This request is no longer open');
    const settings = await this.settings.get();
    const now = new Date();
    const year = now.getUTCFullYear();
    await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.capacityPartnership.updateMany({
        where: { id: p.id, status: 'REQUESTED' },
        data: { status: 'ACTIVE', acceptedAt: now },
      });
      if (count !== 1) throw new ConflictException('This request is no longer open');
      for (const m of partnershipMonths(isoDate(p.startMonth), p.months)) {
        const windows = await tx.capacitySlot.findMany({
          where: {
            lineId: p.lineId,
            status: 'OPEN',
            startDate: { lte: dateOnly(m.end) },
            endDate: { gte: dateOnly(m.start) },
          },
          orderBy: { startDate: 'asc' },
        });
        let left = p.monthlyMinutes;
        const taken: { slotId: string; minutes: number }[] = [];
        for (const w of windows) {
          if (left === 0) break;
          const take = Math.min(left, w.totalMinutes - w.bookedMinutes);
          if (take <= 0) continue;
          if (!(await reserveMinutes(tx, w.id, take))) continue;
          taken.push({ slotId: w.id, minutes: take });
          left -= take;
        }
        if (left > 0)
          throw new ConflictException(
            `Open line ${p.line.code} for ${m.start.slice(0, 7)} first: ${left.toLocaleString('en')} more minutes are needed`,
          );
        // The partnership's agreed rates, even if the fee changed since it was requested.
        const buyerAmount = amountForMinutes(p.monthlyMinutes, p.buyerRateMinorPer100Min);
        const deposit = (buyerAmount * BigInt(settings.depositBps) + 9_999n) / 10_000n;
        const bookingCode = await this.codes.sequential(`CB-${String(year)}`, 5, tx);
        await tx.capacityBooking.create({
          data: {
            code: bookingCode,
            kind: 'PARTNERSHIP',
            partnershipId: p.id,
            buyerCompanyId: p.buyerCompanyId,
            createdById: p.createdById,
            manufacturerProfileId: p.manufacturerProfileId,
            lineId: p.lineId,
            categoryId: p.categoryId,
            minutes: p.monthlyMinutes,
            samPerPieceCenti: p.samPerPieceCenti,
            startDate: dateOnly(m.start),
            endDate: dateOnly(m.end),
            currency: p.currency,
            factoryRateMinorPer100Min: p.factoryRateMinorPer100Min,
            buyerRateMinorPer100Min: p.buyerRateMinorPer100Min,
            factoryAmountMinor: amountForMinutes(p.monthlyMinutes, p.factoryRateMinorPer100Min),
            buyerAmountMinor: buyerAmount,
            feeBps: settings.bookingFeeBps,
            depositBps: settings.depositBps,
            depositMinor: deposit < 1n ? 1n : deposit,
            cancellationTiers: settings.cancellationTiers.map((t) => ({ ...t })),
            factoryShareBps: settings.factoryShareBps,
            noteFiltered: p.noteFiltered,
            note: p.note,
            factoryAcceptedAt: now,
            holdExpiresAt: partnershipDepositDue(m.start, now, settings.holdHours),
            allocations: { create: taken },
          },
        });
      }
    });
    await this.audit.log({
      actorUserId: ctx.userId,
      action: 'capacity.partnership_accepted',
      entityType: 'CapacityPartnership',
      entityId: p.id,
    });
    await this.notifier.notify({
      to: { companyId: p.buyerCompanyId },
      type: 'ORDER_UPDATE',
      title: `Partnership ${p.code} accepted`,
      body: `${String(p.months)} months are reserved. Each month’s deposit is due two weeks before it starts.`,
    });
  }

  async decline(ctx: ManufacturerContext, code: string, reason: string): Promise<void> {
    const p = await this.factoryPartnership(ctx, code);
    const { count } = await this.prisma.capacityPartnership.updateMany({
      where: { id: p.id, status: 'REQUESTED' },
      data: { status: 'DECLINED', declineReason: filterContactDetails(reason).filtered },
    });
    if (count !== 1) throw new ConflictException('This request is no longer open');
    await this.notifier.notify({
      to: { companyId: p.buyerCompanyId },
      type: 'ORDER_UPDATE',
      title: `Partnership ${p.code} declined`,
      body: reason,
    });
  }

  /**
   * The buyer ends a partnership: open requests close; months still held or confirmed are
   * cancelled one by one (held: full refund; confirmed: the cancellation tiers).
   */
  async cancel(ctx: BuyerContext, code: string, reason: string): Promise<void> {
    const p = await this.prisma.capacityPartnership.findFirst({
      where: { code, buyerCompanyId: ctx.companyId },
      include: partnershipInclude,
    });
    if (!p) throw new NotFoundException('Partnership not found');
    const { count } = await this.prisma.capacityPartnership.updateMany({
      where: { id: p.id, status: { in: ['REQUESTED', 'ACTIVE'] } },
      data: { status: 'CANCELLED', cancelledAt: new Date() },
    });
    if (count !== 1) throw new ConflictException('This partnership has already ended');
    for (const b of p.bookings)
      if ((b.status === 'HELD' || b.status === 'CONFIRMED') && b.startDate > new Date())
        await this.bookings.cancelByBuyer(ctx, b.code, reason).catch(() => undefined);
    await this.notifier.notify({
      to: { manufacturerProfileId: p.manufacturerProfileId },
      type: 'ORDER_UPDATE',
      title: `Partnership ${p.code} cancelled`,
      body: `Months that hadn’t started are back on line ${p.line.code}.`,
    });
  }

  /** Active partnerships whose months are all over or ended become ENDED. */
  async endFinished(): Promise<number> {
    const active = await this.prisma.capacityPartnership.findMany({
      where: { status: 'ACTIVE' },
      select: { id: true, bookings: { select: { status: true } } },
    });
    let ended = 0;
    for (const p of active)
      if (p.bookings.every((b) => ['COMPLETED', 'CANCELLED', 'EXPIRED'].includes(b.status))) {
        await this.prisma.capacityPartnership.update({
          where: { id: p.id },
          data: { status: 'ENDED' },
        });
        ended += 1;
      }
    return ended;
  }

  async buyerList(ctx: BuyerContext): Promise<BuyerPartnership[]> {
    const rows = await this.prisma.capacityPartnership.findMany({
      where: { buyerCompanyId: ctx.companyId },
      orderBy: { createdAt: 'desc' },
      include: partnershipInclude,
    });
    return rows.map((p) => ({
      ...this.base(p, p.note),
      manufacturer: {
        publicCode: p.manufacturerProfile.publicCode,
        country: p.manufacturerProfile.company.country,
      },
      buyerRateMinorPer100Min: p.buyerRateMinorPer100Min,
      monthlyAmountMinor: Number(amountForMinutes(p.monthlyMinutes, p.buyerRateMinorPer100Min)),
    }));
  }

  async factoryList(ctx: ManufacturerContext): Promise<ManufacturerPartnership[]> {
    const rows = await this.prisma.capacityPartnership.findMany({
      where: { manufacturerProfileId: ctx.profileId },
      orderBy: { createdAt: 'desc' },
      include: partnershipInclude,
    });
    return rows.map((p) => ({
      ...this.base(
        p,
        scrubText(p.noteFiltered ?? p.note, identityPatterns(identityOf(p.buyerCompany))),
      ),
      buyer: { code: p.buyerCompany.buyerProfile?.publicCode ?? '' },
      line: p.line,
      factoryRateMinorPer100Min: p.factoryRateMinorPer100Min,
      monthlyAmountMinor: Number(amountForMinutes(p.monthlyMinutes, p.factoryRateMinorPer100Min)),
    }));
  }

  private base(p: PartnershipRow, note: string | null) {
    return {
      code: p.code,
      status: p.status,
      category: p.category,
      monthlyMinutes: p.monthlyMinutes,
      months: p.months,
      startMonth: month(p.startMonth),
      samPerPiece: p.samPerPieceCenti === null ? null : centiToSam(p.samPerPieceCenti),
      currency: p.currency,
      declineReason: p.declineReason,
      note,
      createdAt: p.createdAt.toISOString(),
      bookings: p.bookings.map((b) => ({
        code: b.code,
        status: b.status,
        startDate: isoDate(b.startDate),
        endDate: isoDate(b.endDate),
      })),
    };
  }

  private async factoryPartnership(
    ctx: ManufacturerContext,
    code: string,
  ): Promise<PartnershipRow> {
    const p = await this.prisma.capacityPartnership.findFirst({
      where: { code, manufacturerProfileId: ctx.profileId },
      include: partnershipInclude,
    });
    if (!p) throw new NotFoundException('Partnership not found');
    return p;
  }
}
