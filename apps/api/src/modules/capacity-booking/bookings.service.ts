import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  type OnModuleInit,
} from '@nestjs/common';
import {
  type AdminBooking,
  bookingPrice,
  type BookingNextAction,
  type BookingTerms,
  type BookingTermsQuery,
  type BuyerBooking,
  type CancellationSplit,
  type CancellationTier,
  cancellationSplit,
  type CapacityBookingActor,
  type CapacityBookingStatus,
  type CapacityWindow,
  centiToSam,
  cmtUnitPrice,
  type ConvertBookingDto,
  type ConvertedBooking,
  type CreateBookingDto,
  daysUntil,
  filterContactDetails,
  fullRefund,
  isoDate,
  type ManufacturerBooking,
  type MarkSentDto,
  minutesForPieces,
  type PaymentMethod,
  type PaymentStart,
  piecesForMinutes,
  samToCenti,
} from '@garmentgate/shared';
import { z } from 'zod';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { BuyerContext } from '../buyer/buyer-context.service.js';
import { identityForScrubbing, listedManufacturer } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import type { ManufacturerContext } from '../manufacturer/manufacturer-context.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { OrderHooks } from '../orders/order-hooks.js';
import { PaymentsService } from '../payments/payments.service.js';
import { releaseMinutes, reserveMinutes, reserveWholeWindow } from './allocation.js';
import { BookingSettingsService } from './booking-settings.service.js';

type Tx = Prisma.TransactionClient;

export const bookingInclude = {
  manufacturerProfile: {
    select: {
      id: true,
      publicCode: true,
      company: { select: { id: true, country: true, legalName: true } },
    },
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
  order: { select: { code: true, status: true } },
  rfq: { select: { code: true } },
  partnership: { select: { code: true } },
} satisfies Prisma.CapacityBookingInclude;
export type BookingRow = Prisma.CapacityBookingGetPayload<{ include: typeof bookingInclude }>;

const TiersSchema = z.array(z.object({ minDaysBefore: z.number(), refundBps: z.number() }));
const tiersOf = (b: { cancellationTiers: unknown }): CancellationTier[] =>
  TiersSchema.catch([]).parse(b.cancellationTiers);

const n = (v: bigint | number) => Number(v);
const DAY = 86_400_000;
const today = () => isoDate(new Date());
/** Booking statuses that still hold minutes and money. */
const LIVE: CapacityBookingStatus[] = ['HELD', 'CONFIRMED'];

/** Categories a line must make for a request in `categoryId`: itself, its parent or children. */
export async function relatedCategoryIds(
  prisma: PrismaService | Tx,
  categoryId: string,
): Promise<string[]> {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true, parentId: true, children: { select: { id: true } } },
  });
  if (!category) throw new NotFoundException('Category not found');
  return [
    category.id,
    ...(category.parentId ? [category.parentId] : []),
    ...category.children.map((c) => c.id),
  ];
}

/**
 * Capacity bookings: a buyer holds line minutes (reserved at once, so nobody else can take
 * them), the factory accepts, the deposit lands in escrow, and the booking is confirmed. Holds
 * that run out are released with a full refund. Confirmed bookings become orders (CMT directly,
 * full package through an invite-only RFQ), handing unused minutes back to the line.
 */
@Injectable()
export class BookingsService implements OnModuleInit {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: BookingSettingsService,
    private readonly payments: PaymentsService,
    private readonly codes: PublicCodeService,
    private readonly notifier: Notifier,
    private readonly audit: AuditService,
    private readonly orderHooks: OrderHooks,
  ) {}

  onModuleInit(): void {
    this.payments.onBookingDepositSettled((id) => this.onDepositSettled(id));
    // The booking follows its order: production, completion, cancellation.
    this.orderHooks.register({
      within: async (tx, order, to) => {
        const next: CapacityBookingStatus | null =
          to === 'IN_PRODUCTION'
            ? 'IN_PRODUCTION'
            : to === 'DELIVERED' || to === 'COMPLETED'
              ? 'COMPLETED'
              : to === 'CANCELLED'
                ? 'CANCELLED'
                : null;
        if (!next) return;
        await tx.capacityBooking.updateMany({
          where: {
            orderId: order.id,
            status: { in: ['CONFIRMED', 'IN_PRODUCTION'] },
          },
          data: {
            status: next,
            ...(next === 'CANCELLED' && {
              cancelledAt: new Date(),
              cancelledBy: 'SYSTEM',
              cancelReason: `Order ${order.code} was cancelled`,
            }),
          },
        });
      },
    });
  }

  // ── Holds ─────────────────────────────────────────────────────────────────

  /** Step 2 of the flow: price, deposit, hold length and cancellation policy for a window. */
  async terms(slotId: string, query: BookingTermsQuery): Promise<BookingTerms> {
    const settings = await this.settings.get();
    const slot = await this.bookableSlot(slotId);
    const free = slot.totalMinutes - slot.bookedMinutes;
    const minutes =
      query.kind === 'LINE'
        ? slot.bookedMinutes === 0
          ? slot.totalMinutes
          : 0
        : (query.minutes ?? free);
    if (minutes <= 0 || minutes > free)
      throw new ConflictException(
        query.kind === 'LINE'
          ? 'Part of this window is already booked'
          : 'Not that many minutes free',
      );
    const price = bookingPrice({
      minutes,
      factoryRateMinorPer100Min: slot.line.cmRateMinorPer100Min,
      feeBps: settings.bookingFeeBps,
      depositBps: settings.depositBps,
    });
    const quote = {
      minutes,
      currency: slot.line.currency,
      buyerRateMinorPer100Min: price.buyerRateMinorPer100Min,
      buyerAmountMinor: n(price.buyerAmountMinor),
      depositMinor: n(price.depositMinor),
      depositBps: settings.depositBps,
    };
    const window: CapacityWindow = {
      slotId: slot.id,
      lineId: slot.lineId,
      lineNumber: 1,
      startDate: isoDate(slot.startDate),
      endDate: isoDate(slot.endDate),
      totalMinutes: slot.totalMinutes,
      freeMinutes: free,
      fits: true,
      estimatedPieces: null,
      quote,
    };
    return {
      window,
      manufacturer: {
        publicCode: slot.line.manufacturerProfile.publicCode,
        country: slot.line.manufacturerProfile.company.country,
      },
      quote,
      holdHours: settings.holdHours,
      cancellationTiers: settings.cancellationTiers.map((t) => ({ ...t })),
    };
  }

  async create(ctx: BuyerContext, dto: CreateBookingDto): Promise<{ code: string }> {
    const settings = await this.settings.get();
    const slot = await this.bookableSlot(dto.slotId);
    const related = await relatedCategoryIds(this.prisma, dto.categoryId);
    if (!slot.line.categories.some((c) => related.includes(c.id)))
      throw new BadRequestException('This line doesn’t make that category');
    const note = dto.note ? filterContactDetails(dto.note) : null;
    const year = new Date().getUTCFullYear();

    const booking = await this.prisma.$transaction(async (tx) => {
      const minutes =
        dto.kind === 'LINE'
          ? await reserveWholeWindow(tx, slot.id)
          : (await reserveMinutes(tx, slot.id, dto.minutes ?? 0))
            ? (dto.minutes ?? 0)
            : 0;
      if (minutes === 0)
        throw new ConflictException('Those minutes were just booked by someone else: pick again');
      const price = bookingPrice({
        minutes,
        factoryRateMinorPer100Min: slot.line.cmRateMinorPer100Min,
        feeBps: settings.bookingFeeBps,
        depositBps: settings.depositBps,
      });
      const code = await this.codes.sequential(`CB-${String(year)}`, 5, tx);
      return tx.capacityBooking.create({
        data: {
          code,
          kind: dto.kind,
          buyerCompanyId: ctx.companyId,
          createdById: ctx.userId,
          manufacturerProfileId: slot.line.manufacturerProfileId,
          lineId: slot.lineId,
          categoryId: dto.categoryId,
          minutes,
          samPerPieceCenti: dto.samPerPiece === undefined ? null : samToCenti(dto.samPerPiece),
          startDate: slot.startDate,
          endDate: slot.endDate,
          currency: slot.line.currency,
          factoryRateMinorPer100Min: slot.line.cmRateMinorPer100Min,
          buyerRateMinorPer100Min: price.buyerRateMinorPer100Min,
          factoryAmountMinor: price.factoryAmountMinor,
          buyerAmountMinor: price.buyerAmountMinor,
          feeBps: settings.bookingFeeBps,
          depositBps: settings.depositBps,
          depositMinor: price.depositMinor,
          cancellationTiers: settings.cancellationTiers.map((t) => ({ ...t })),
          factoryShareBps: settings.factoryShareBps,
          note: dto.note ?? null,
          noteFiltered: note?.filtered ?? null,
          holdExpiresAt: new Date(Date.now() + settings.holdHours * 3_600_000),
          allocations: { create: { slotId: slot.id, minutes } },
        },
      });
    });

    await this.audit.log({
      actorUserId: ctx.userId,
      action: note?.flagged ? 'moderation.contact_filtered' : 'capacity.booking_held',
      entityType: 'CapacityBooking',
      entityId: booking.id,
      ...(note?.flagged && { metadata: { reasons: note.reasons } }),
    });
    await this.notifier.notify({
      to: { manufacturerProfileId: booking.manufacturerProfileId },
      type: 'ORDER_UPDATE',
      title: `Booking request ${booking.code}`,
      body: `${ctx.publicCode} wants ${booking.minutes.toLocaleString('en')} minutes on line ${slot.line.code}. Accept or decline before the hold runs out.`,
      link: { bookingCode: booking.code },
    });
    await this.notifier.notify({
      to: 'ADMINS',
      type: 'SYSTEM',
      title: `Capacity hold ${booking.code}`,
      body: `${ctx.publicCode} → ${slot.line.manufacturerProfile.publicCode}, ${booking.minutes.toLocaleString('en')} min`,
      link: { bookingCode: booking.code },
      email: false,
    });
    return { code: booking.code };
  }

  // ── Buyer ─────────────────────────────────────────────────────────────────

  async buyerList(ctx: BuyerContext): Promise<BuyerBooking[]> {
    await this.linkFullPackageOrders({ buyerCompanyId: ctx.companyId });
    const rows = await this.prisma.capacityBooking.findMany({
      where: { buyerCompanyId: ctx.companyId },
      orderBy: [{ startDate: 'asc' }, { createdAt: 'desc' }],
      take: 300,
      include: bookingInclude,
    });
    const settings = await this.settings.get();
    return Promise.all(rows.map((b) => this.buyerView(b, settings.convertLeadDays)));
  }

  async buyerGet(ctx: BuyerContext, code: string): Promise<BuyerBooking> {
    await this.linkFullPackageOrders({ buyerCompanyId: ctx.companyId });
    const settings = await this.settings.get();
    return this.buyerView(await this.buyerBooking(ctx, code), settings.convertLeadDays);
  }

  async payDeposit(ctx: BuyerContext, code: string, method: PaymentMethod): Promise<PaymentStart> {
    const booking = await this.buyerBooking(ctx, code);
    if (booking.status !== 'HELD' || booking.holdExpiresAt.getTime() <= Date.now())
      throw new ConflictException('This hold is no longer open');
    const { paid } = await this.payments.bookingDepositState(booking.id);
    return this.payments.startBookingDeposit(booking, booking.depositMinor - paid, method);
  }

  async markDepositSent(
    ctx: BuyerContext,
    code: string,
    paymentId: string,
    dto: MarkSentDto,
  ): Promise<void> {
    const booking = await this.buyerBooking(ctx, code);
    await this.payments.markBookingDepositSent(booking, paymentId, dto);
  }

  /** Free while held; the cancellation tiers apply once confirmed. */
  async cancelByBuyer(ctx: BuyerContext, code: string, reason: string): Promise<void> {
    const booking = await this.buyerBooking(ctx, code);
    if (booking.conversionMode)
      throw new ConflictException('This booking is already an order: cancel the order instead');
    if (booking.status === 'HELD') {
      await this.end(booking, 'CANCELLED', 'BUYER', reason, (paid) => fullRefund(paid));
      return;
    }
    if (booking.status !== 'CONFIRMED')
      throw new ConflictException('Only held or confirmed bookings can be cancelled');
    const daysBefore = daysUntil(isoDate(booking.startDate), today());
    await this.end(booking, 'CANCELLED', 'BUYER', reason, (paid) =>
      cancellationSplit({
        paidMinor: paid,
        daysBefore,
        tiers: tiersOf(booking),
        factoryShareBps: booking.factoryShareBps,
      }),
    );
  }

  // ── Factory ───────────────────────────────────────────────────────────────

  async factoryList(ctx: ManufacturerContext): Promise<ManufacturerBooking[]> {
    const rows = await this.prisma.capacityBooking.findMany({
      where: { manufacturerProfileId: ctx.profileId },
      orderBy: [{ status: 'asc' }, { holdExpiresAt: 'asc' }],
      take: 300,
      include: bookingInclude,
    });
    return Promise.all(rows.map((b) => this.factoryView(b)));
  }

  async factoryGet(ctx: ManufacturerContext, code: string): Promise<ManufacturerBooking> {
    return this.factoryView(await this.factoryBooking(ctx, code));
  }

  async accept(ctx: ManufacturerContext, code: string): Promise<void> {
    const booking = await this.factoryBooking(ctx, code);
    const { count } = await this.prisma.capacityBooking.updateMany({
      where: {
        id: booking.id,
        status: 'HELD',
        factoryAcceptedAt: null,
        holdExpiresAt: { gt: new Date() },
      },
      data: { factoryAcceptedAt: new Date() },
    });
    if (count !== 1) throw new ConflictException('This request is no longer open');
    await this.audit.log({
      actorUserId: ctx.userId,
      action: 'capacity.booking_accepted',
      entityType: 'CapacityBooking',
      entityId: booking.id,
    });
    await this.notifyBuyer(
      booking,
      `${booking.code}: factory accepted`,
      'Pay the deposit before the hold runs out to confirm your slot.',
    );
    await this.tryConfirm(booking.id);
  }

  async decline(ctx: ManufacturerContext, code: string, reason: string): Promise<void> {
    const booking = await this.factoryBooking(ctx, code);
    if (booking.status !== 'HELD' || booking.factoryAcceptedAt)
      throw new ConflictException('Only open requests can be declined');
    await this.end(booking, 'CANCELLED', 'FACTORY', reason, (paid) => fullRefund(paid));
  }

  // ── Staff ─────────────────────────────────────────────────────────────────

  async adminList(status: CapacityBookingStatus | undefined): Promise<AdminBooking[]> {
    const rows = await this.prisma.capacityBooking.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
      take: 1000,
      include: bookingInclude,
    });
    return Promise.all(
      rows.map(async (b) => {
        const { paid } = await this.payments.bookingDepositState(b.id);
        return {
          code: b.code,
          kind: b.kind,
          status: b.status,
          buyer: {
            code: b.buyerCompany.buyerProfile?.publicCode ?? '',
            name: b.buyerCompany.legalName,
          },
          manufacturer: {
            code: b.manufacturerProfile.publicCode,
            name: b.manufacturerProfile.company.legalName,
          },
          line: { code: b.line.code, name: b.line.name },
          minutes: b.minutes,
          startDate: isoDate(b.startDate),
          endDate: isoDate(b.endDate),
          currency: b.currency,
          factoryAmountMinor: n(b.factoryAmountMinor),
          buyerAmountMinor: n(b.buyerAmountMinor),
          depositMinor: n(b.depositMinor),
          depositPaidMinor: n(paid > 0n ? paid : b.depositPaidAt ? b.depositMinor : 0n),
          factoryAccepted: b.factoryAcceptedAt !== null,
          holdExpiresAt: b.holdExpiresAt.toISOString(),
          refundMinor: b.refundMinor === null ? null : n(b.refundMinor),
          compensationMinor:
            b.factoryCompensationMinor === null ? null : n(b.factoryCompensationMinor),
          compensationPaid: b.compensationPaidAt !== null,
          cancelledBy: b.cancelledBy,
          cancelReason: b.cancelReason,
          orderCode: b.order?.code ?? null,
          partnershipCode: b.partnership?.code ?? null,
          createdAt: b.createdAt.toISOString(),
        };
      }),
    );
  }

  /** Staff can end any live booking; the buyer gets everything back. */
  async adminCancel(adminId: string, code: string, reason: string): Promise<void> {
    const booking = await this.prisma.capacityBooking.findUnique({
      where: { code },
      include: bookingInclude,
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (!LIVE.includes(booking.status) || booking.conversionMode)
      throw new ConflictException('Only held or confirmed bookings can be cancelled');
    await this.end(booking, 'CANCELLED', 'STAFF', reason, (paid) => fullRefund(paid));
    await this.audit.log({
      actorUserId: adminId,
      action: 'capacity.booking_cancelled_by_staff',
      entityType: 'CapacityBooking',
      entityId: booking.id,
      metadata: { reason },
    });
  }

  async payCompensation(adminId: string, code: string): Promise<void> {
    const booking = await this.prisma.capacityBooking.findUnique({
      where: { code },
      include: bookingInclude,
    });
    if (!booking?.factoryCompensationMinor || booking.factoryCompensationMinor <= 0n)
      throw new NotFoundException('Nothing to pay for this booking');
    if (booking.compensationPaidAt) throw new ConflictException('Already paid');
    await this.payments.payBookingCompensation(
      adminId,
      booking,
      booking.manufacturerProfile.company.id,
      booking.factoryCompensationMinor,
    );
    await this.prisma.capacityBooking.update({
      where: { id: booking.id },
      data: { compensationPaidAt: new Date() },
    });
    await this.notifier.notify({
      to: { manufacturerProfileId: booking.manufacturerProfileId },
      type: 'PAYMENT_UPDATE',
      title: `${booking.code}: compensation paid`,
      body: 'Your share of the cancelled booking’s deposit is on its way.',
      link: { bookingCode: booking.code },
    });
  }

  // ── Conversion ────────────────────────────────────────────────────────────

  async convert(
    ctx: BuyerContext,
    code: string,
    dto: ConvertBookingDto,
  ): Promise<ConvertedBooking> {
    const booking = await this.buyerBooking(ctx, code);
    if (booking.status !== 'CONFIRMED' || booking.conversionMode)
      throw new ConflictException('Only confirmed bookings can be converted, once');
    const samCenti =
      dto.samPerPiece !== undefined ? samToCenti(dto.samPerPiece) : booking.samPerPieceCenti;
    const needed = samCenti === null ? null : minutesForPieces(dto.quantity, samCenti);
    if (needed !== null && needed > booking.minutes)
      throw new ConflictException(
        `${dto.quantity.toLocaleString('en')} pieces need ${needed.toLocaleString('en')} minutes; you booked ${booking.minutes.toLocaleString('en')}`,
      );
    const unused = needed === null ? 0 : booking.minutes - needed;
    const year = new Date().getUTCFullYear();

    if (dto.mode === 'CMT') {
      const sam = samCenti ?? samToCenti(dto.samPerPiece);
      const buyerUnit = cmtUnitPrice(sam, booking.buyerRateMinorPer100Min);
      const factoryUnit = cmtUnitPrice(sam, booking.factoryRateMinorPer100Min);
      const { paid } = await this.payments.bookingDepositState(booking.id);
      const buyerTotal = BigInt(buyerUnit) * BigInt(dto.quantity);
      // The booking deposit counts toward the order's deposit: never ask for less than was paid.
      const depositBps = Math.min(
        10_000,
        Math.max(booking.depositBps, Number((paid * 10_000n + buyerTotal - 1n) / buyerTotal)),
      );
      const spec = dto.specification ? filterContactDetails(dto.specification).filtered : null;
      const order = await this.prisma.$transaction(async (tx) => {
        const { count } = await tx.capacityBooking.updateMany({
          where: { id: booking.id, status: 'CONFIRMED', conversionMode: null },
          data: {
            conversionMode: 'CMT',
            convertedAt: new Date(),
            returnedMinutes: unused,
            samPerPieceCenti: sam,
          },
        });
        if (count !== 1) throw new ConflictException('This booking was just converted');
        const orderCode = await this.codes.sequential(`ORD-${String(year)}`, 5, tx);
        const created = await tx.order.create({
          data: {
            code: orderCode,
            buyerCompanyId: booking.buyerCompanyId,
            manufacturerProfileId: booking.manufacturerProfileId,
            title: `CMT: ${dto.title}`,
            specification: [
              `Capacity booking ${booking.code}: ${centiToSam(sam).toFixed(2)} SAM/pc`,
              spec,
            ]
              .filter(Boolean)
              .join('\n'),
            quantity: dto.quantity,
            buyerUnitPriceMinor: buyerUnit,
            manufacturerUnitPriceMinor: factoryUnit,
            buyerTotalMinor: buyerTotal,
            manufacturerTotalMinor: BigInt(factoryUnit) * BigInt(dto.quantity),
            currency: booking.currency,
            incoterm: dto.incoterm,
            destinationCountry: dto.destinationCountry,
            depositBps,
            requestedShipDate: booking.endDate,
            status: 'DRAFT',
          },
        });
        await tx.orderEvent.create({
          data: {
            orderId: created.id,
            toStatus: 'DRAFT',
            actorUserId: ctx.userId,
            note: `Converted from capacity booking ${booking.code} (CMT)`,
          },
        });
        await tx.capacityBooking.update({
          where: { id: booking.id },
          data: { orderId: created.id },
        });
        if (unused > 0) await releaseMinutes(tx, booking.id, unused);
        return created;
      });
      await this.payments.carryBookingDepositIntoOrder(booking, order);
      await this.afterConversion(
        booking,
        `Order ${order.code} (CMT) created from ${booking.code}.`,
        {
          orderCode: order.code,
        },
      );
      return { orderCode: order.code, rfqCode: null };
    }

    const description = filterContactDetails(dto.description);
    const rfq = await this.prisma.$transaction(async (tx) => {
      const { count } = await tx.capacityBooking.updateMany({
        where: { id: booking.id, status: 'CONFIRMED', conversionMode: null },
        data: {
          conversionMode: 'FULL_PACKAGE',
          convertedAt: new Date(),
          returnedMinutes: unused,
          ...(samCenti !== null && { samPerPieceCenti: samCenti }),
        },
      });
      if (count !== 1) throw new ConflictException('This booking was just converted');
      const rfqCode = await this.codes.sequential(`RFQ-${String(year)}`, 5, tx);
      const created = await tx.rfq.create({
        data: {
          code: rfqCode,
          buyerCompanyId: booking.buyerCompanyId,
          createdById: ctx.userId,
          categoryId: booking.categoryId,
          capacityBookingId: booking.id,
          title: dto.title,
          titleFiltered: filterContactDetails(dto.title).filtered,
          description: dto.description,
          descriptionFiltered: description.filtered,
          quantity: dto.quantity,
          currency: booking.currency,
          deadline: new Date(Date.now() + 5 * DAY),
          requiredDeliveryDate: booking.endDate,
          incoterm: dto.incoterm,
          destinationCountry: dto.destinationCountry,
          status: 'OPEN',
          publishedAt: new Date(),
          invitations: { create: { manufacturerProfileId: booking.manufacturerProfileId } },
        },
      });
      if (unused > 0) await releaseMinutes(tx, booking.id, unused);
      return created;
    });
    await this.notifier.notify({
      to: { manufacturerProfileId: booking.manufacturerProfileId },
      type: 'RFQ_INVITATION',
      title: `Full-package quote for ${booking.code}`,
      body: `${booking.buyerCompany.buyerProfile?.publicCode ?? ''} wants a full-package quote for the booked slot (${rfq.code}).`,
      link: { rfqCode: rfq.code },
    });
    await this.afterConversion(booking, `${rfq.code}: quote requested from the booked factory.`, {
      rfqCode: rfq.code,
    });
    return { orderCode: null, rfqCode: rfq.code };
  }

  /**
   * Full-package conversions become orders when the buyer accepts the factory's quote: link
   * the order to the booking and carry the deposit into it. Idempotent.
   */
  async linkFullPackageOrders(where: Prisma.CapacityBookingWhereInput = {}): Promise<number> {
    const pending = await this.prisma.capacityBooking.findMany({
      where: {
        ...where,
        conversionMode: 'FULL_PACKAGE',
        orderId: null,
        status: 'CONFIRMED',
        rfq: { orders: { some: {} } },
      },
      include: { rfq: { select: { orders: { select: { id: true, code: true }, take: 1 } } } },
    });
    let linked = 0;
    for (const b of pending) {
      const order = b.rfq?.orders[0];
      if (!order) continue;
      const { count } = await this.prisma.capacityBooking.updateMany({
        where: { id: b.id, orderId: null },
        data: { orderId: order.id },
      });
      if (count !== 1) continue;
      await this.payments.carryBookingDepositIntoOrder(b, order);
      linked += 1;
    }
    return linked;
  }

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  /** A deposit payment settled: confirm the booking, or refund it if the hold already ended. */
  async onDepositSettled(bookingId: string): Promise<void> {
    const booking = await this.prisma.capacityBooking.findUniqueOrThrow({
      where: { id: bookingId },
      include: bookingInclude,
    });
    const { paid } = await this.payments.bookingDepositState(booking.id);
    if (booking.status === 'CANCELLED' || booking.status === 'EXPIRED') {
      // Money arrived after the hold ended: send it all back.
      await this.payments.settleBookingCancellation(
        booking,
        booking.manufacturerProfile.company.id,
        fullRefund(paid),
        'Deposit arrived after the hold ended',
      );
      return;
    }
    if (paid >= booking.depositMinor && !booking.depositPaidAt) {
      await this.prisma.capacityBooking.update({
        where: { id: booking.id },
        data: { depositPaidAt: new Date() },
      });
      await this.tryConfirm(booking.id);
    }
  }

  /** Confirmed once the factory has accepted and the deposit is in escrow. */
  private async tryConfirm(bookingId: string): Promise<void> {
    const { count } = await this.prisma.capacityBooking.updateMany({
      where: {
        id: bookingId,
        status: 'HELD',
        factoryAcceptedAt: { not: null },
        depositPaidAt: { not: null },
      },
      data: { status: 'CONFIRMED', confirmedAt: new Date() },
    });
    if (count !== 1) return;
    const booking = await this.prisma.capacityBooking.findUniqueOrThrow({
      where: { id: bookingId },
      include: bookingInclude,
    });
    await this.notifyBuyer(
      booking,
      `${booking.code} confirmed`,
      'Your line time is booked. Convert it to an order before production starts.',
    );
    await this.notifier.notify({
      to: { manufacturerProfileId: booking.manufacturerProfileId },
      type: 'ORDER_UPDATE',
      title: `${booking.code} confirmed`,
      body: `The deposit is in escrow: line ${booking.line.code} is booked from ${isoDate(booking.startDate)}.`,
      link: { bookingCode: booking.code },
    });
  }

  /**
   * Ends a live booking: status first (conditionally, under the booking's lock, releasing the
   * minutes in the same transaction), then the money from escrow by `split`.
   */
  private async end(
    booking: BookingRow,
    status: 'CANCELLED' | 'EXPIRED',
    by: CapacityBookingActor,
    reason: string,
    split: (paid: bigint) => CancellationSplit,
  ): Promise<boolean> {
    const ended = await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "capacity_bookings" WHERE "id" = ${booking.id}::uuid FOR UPDATE`;
      const { count } = await tx.capacityBooking.updateMany({
        where: {
          id: booking.id,
          status: { in: status === 'EXPIRED' ? ['HELD'] : LIVE },
          conversionMode: null,
          ...(status === 'EXPIRED' && { holdExpiresAt: { lte: new Date() } }),
        },
        data: {
          status,
          cancelledAt: new Date(),
          cancelledBy: by,
          cancelReason: filterContactDetails(reason).filtered,
        },
      });
      if (count !== 1) return false;
      await releaseMinutes(tx, booking.id, 'ALL');
      return true;
    });
    if (!ended) {
      if (status === 'EXPIRED') return false;
      throw new ConflictException('This booking just changed: reload and try again');
    }
    const { paid } = await this.payments.bookingDepositState(booking.id);
    const parts = split(paid);
    try {
      await this.payments.settleBookingCancellation(
        booking,
        booking.manufacturerProfile.company.id,
        parts,
        reason,
      );
      await this.prisma.capacityBooking.update({
        where: { id: booking.id },
        data: { refundMinor: parts.refundMinor, factoryCompensationMinor: parts.factoryMinor },
      });
    } catch (error) {
      // The minutes are back on the line either way; staff settle the money by hand.
      this.logger.error({ err: error, booking: booking.code }, 'Booking refund failed');
      await this.notifier.notify({
        to: 'ADMINS',
        type: 'PAYMENT_UPDATE',
        title: `${booking.code}: refund failed`,
        body: 'The booking ended but its escrow could not be settled automatically.',
        link: { bookingCode: booking.code },
        email: false,
      });
    }

    const verb = status === 'EXPIRED' ? 'expired' : 'cancelled';
    const refund =
      parts.refundMinor > 0n
        ? ` ${String(parts.refundMinor)} ${booking.currency} will be refunded.`
        : '';
    await this.notifyBuyer(
      booking,
      `${booking.code} ${verb}`,
      `${reason}.${refund} The minutes went back to the line.`,
    );
    await this.notifier.notify({
      to: { manufacturerProfileId: booking.manufacturerProfileId },
      type: 'ORDER_UPDATE',
      title: `${booking.code} ${verb}`,
      body:
        parts.factoryMinor > 0n
          ? `Line ${booking.line.code} is free again. You receive ${String(parts.factoryMinor)} ${booking.currency} of the deposit.`
          : `Line ${booking.line.code} is free again for those dates.`,
      link: { bookingCode: booking.code },
    });
    return true;
  }

  /**
   * Run every minute: reminds before holds run out, expires the ones that did (minutes back,
   * full refund), and links full-package orders. Safe to run concurrently (conditional updates).
   */
  async sweep(now = new Date()): Promise<{ reminded: number; expired: number; linked: number }> {
    const settings = await this.settings.get();
    const soon = await this.prisma.capacityBooking.findMany({
      where: {
        status: 'HELD',
        reminderSentAt: null,
        holdExpiresAt: {
          gt: now,
          lte: new Date(now.getTime() + settings.reminderHours * 3_600_000),
        },
      },
      include: bookingInclude,
    });
    let reminded = 0;
    for (const b of soon) {
      const { count } = await this.prisma.capacityBooking.updateMany({
        where: { id: b.id, reminderSentAt: null },
        data: { reminderSentAt: now },
      });
      if (count !== 1) continue;
      reminded += 1;
      const hours = Math.max(
        1,
        Math.round((b.holdExpiresAt.getTime() - now.getTime()) / 3_600_000),
      );
      if (!b.depositPaidAt)
        await this.notifyBuyer(
          b,
          `${b.code}: hold ends in ${String(hours)} h`,
          'Pay the deposit to keep your line time, or it goes back to the factory.',
        );
      if (!b.factoryAcceptedAt)
        await this.notifier.notify({
          to: { manufacturerProfileId: b.manufacturerProfileId },
          type: 'ORDER_UPDATE',
          title: `${b.code}: answer within ${String(hours)} h`,
          body: 'Accept or decline the booking request before the hold runs out.',
          link: { bookingCode: b.code },
        });
    }

    const due = await this.prisma.capacityBooking.findMany({
      where: { status: 'HELD', holdExpiresAt: { lte: now } },
      include: bookingInclude,
    });
    let expired = 0;
    for (const b of due) {
      const reason = !b.factoryAcceptedAt
        ? 'The factory didn’t answer in time'
        : 'The deposit didn’t arrive in time';
      if (await this.end(b, 'EXPIRED', 'SYSTEM', reason, (paid) => fullRefund(paid))) expired += 1;
    }
    const linked = await this.linkFullPackageOrders();
    return { reminded, expired, linked };
  }

  // ── Views ─────────────────────────────────────────────────────────────────

  private async buyerView(b: BookingRow, convertLeadDays: number): Promise<BuyerBooking> {
    const { paid, pending } = await this.payments.bookingDepositState(b.id);
    // Once converted the escrow moved to the order: show the deposit as paid.
    const depositPaid = b.convertedAt && b.depositPaidAt ? b.depositMinor : paid;
    const used = b.minutes - b.returnedMinutes;
    const refundIfCancelled =
      b.status === 'HELD'
        ? depositPaid
        : b.status === 'CONFIRMED' && !b.conversionMode
          ? cancellationSplit({
              paidMinor: depositPaid,
              daysBefore: daysUntil(isoDate(b.startDate), today()),
              tiers: tiersOf(b),
              factoryShareBps: b.factoryShareBps,
            }).refundMinor
          : 0n;
    return {
      code: b.code,
      kind: b.kind,
      status: b.status,
      manufacturer: {
        publicCode: b.manufacturerProfile.publicCode,
        country: b.manufacturerProfile.company.country,
      },
      category: b.category,
      minutes: b.minutes,
      returnedMinutes: b.returnedMinutes,
      samPerPiece: b.samPerPieceCenti === null ? null : centiToSam(b.samPerPieceCenti),
      estimatedPieces:
        b.samPerPieceCenti === null ? null : piecesForMinutes(used, b.samPerPieceCenti),
      startDate: isoDate(b.startDate),
      endDate: isoDate(b.endDate),
      currency: b.currency,
      buyerRateMinorPer100Min: b.buyerRateMinorPer100Min,
      buyerAmountMinor: n(b.buyerAmountMinor),
      depositMinor: n(b.depositMinor),
      depositPaidMinor: n(depositPaid),
      depositPending: pending,
      factoryAccepted: b.factoryAcceptedAt !== null,
      holdExpiresAt: b.holdExpiresAt.toISOString(),
      convertBy: isoDate(new Date(b.startDate.getTime() - convertLeadDays * DAY)),
      cancellationTiers: tiersOf(b),
      refundIfCancelledMinor: n(refundIfCancelled),
      confirmedAt: b.confirmedAt?.toISOString() ?? null,
      cancelledAt: b.cancelledAt?.toISOString() ?? null,
      cancelledBy: b.cancelledBy,
      cancelReason: b.cancelReason,
      refundMinor: b.refundMinor === null ? null : n(b.refundMinor),
      conversionMode: b.conversionMode,
      order: b.order ? { code: b.order.code, status: b.order.status } : null,
      rfqCode: b.rfq?.code ?? null,
      partnershipCode: b.partnership?.code ?? null,
      note: b.note,
      nextAction: this.nextAction(b, depositPaid, pending),
      createdAt: b.createdAt.toISOString(),
    };
  }

  private nextAction(b: BookingRow, paid: bigint, pending: boolean): BookingNextAction | null {
    if (b.status === 'HELD') {
      if (paid < b.depositMinor) return pending ? 'AWAIT_PAYMENT_CHECK' : 'PAY_DEPOSIT';
      return 'AWAIT_FACTORY';
    }
    if (b.status === 'CONFIRMED') {
      if (b.order) return 'TRACK_ORDER';
      if (b.conversionMode === 'FULL_PACKAGE') return 'AWAIT_QUOTE';
      return 'CONVERT';
    }
    return b.status === 'IN_PRODUCTION' ? 'TRACK_ORDER' : null;
  }

  private async factoryView(b: BookingRow): Promise<ManufacturerBooking> {
    const { paid } = await this.payments.bookingDepositState(b.id);
    const used = b.minutes - b.returnedMinutes;
    const patterns = identityPatterns(identityOf(b.buyerCompany));
    return {
      code: b.code,
      kind: b.kind,
      status: b.status,
      buyer: { code: b.buyerCompany.buyerProfile?.publicCode ?? '' },
      line: b.line,
      category: b.category,
      minutes: b.minutes,
      returnedMinutes: b.returnedMinutes,
      samPerPiece: b.samPerPieceCenti === null ? null : centiToSam(b.samPerPieceCenti),
      estimatedPieces:
        b.samPerPieceCenti === null ? null : piecesForMinutes(used, b.samPerPieceCenti),
      startDate: isoDate(b.startDate),
      endDate: isoDate(b.endDate),
      currency: b.currency,
      factoryRateMinorPer100Min: b.factoryRateMinorPer100Min,
      factoryAmountMinor: n(b.factoryAmountMinor),
      accepted: b.factoryAcceptedAt !== null,
      depositPaid: b.depositPaidAt !== null || paid >= b.depositMinor,
      holdExpiresAt: b.holdExpiresAt.toISOString(),
      cancelledBy: b.cancelledBy,
      cancelReason: scrubText(b.cancelReason, patterns),
      compensationMinor: b.factoryCompensationMinor === null ? null : n(b.factoryCompensationMinor),
      orderCode: b.order?.code ?? null,
      partnershipCode: b.partnership?.code ?? null,
      note: scrubText(b.noteFiltered ?? b.note, patterns),
      createdAt: b.createdAt.toISOString(),
    };
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  /** An open, future window on an active line of a listed factory. */
  private async bookableSlot(slotId: string) {
    const slot = await this.prisma.capacitySlot.findFirst({
      where: {
        id: slotId,
        status: 'OPEN',
        endDate: { gte: new Date(`${today()}T00:00:00Z`) },
        line: { status: 'ACTIVE', manufacturerProfile: listedManufacturer },
      },
      include: {
        line: {
          include: {
            categories: { select: { id: true } },
            manufacturerProfile: {
              select: { publicCode: true, company: { select: { country: true } } },
            },
          },
        },
      },
    });
    if (!slot) throw new NotFoundException('That window isn’t available');
    return slot;
  }

  private async buyerBooking(ctx: BuyerContext, code: string): Promise<BookingRow> {
    const booking = await this.prisma.capacityBooking.findFirst({
      where: { code, buyerCompanyId: ctx.companyId },
      include: bookingInclude,
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  private async factoryBooking(ctx: ManufacturerContext, code: string): Promise<BookingRow> {
    const booking = await this.prisma.capacityBooking.findFirst({
      where: { code, manufacturerProfileId: ctx.profileId },
      include: bookingInclude,
    });
    if (!booking) throw new NotFoundException('Booking not found');
    return booking;
  }

  private async afterConversion(
    booking: BookingRow,
    body: string,
    link: { orderCode?: string; rfqCode?: string },
  ): Promise<void> {
    await this.notifier.notify({
      to: 'ADMINS',
      type: 'ORDER_UPDATE',
      title: `${booking.code} converted`,
      body,
      link,
      email: false,
    });
    if (link.orderCode)
      await this.notifier.notify({
        to: { manufacturerProfileId: booking.manufacturerProfileId },
        type: 'ORDER_UPDATE',
        title: `New order ${link.orderCode}`,
        body: `From booking ${booking.code}. GarmentGate will confirm the terms with you.`,
        link,
      });
  }

  private notifyBuyer(booking: BookingRow, title: string, body: string): Promise<void> {
    return this.notifier.notify({
      to: { companyId: booking.buyerCompanyId },
      type: 'ORDER_UPDATE',
      title,
      body,
      link: { bookingCode: booking.code },
    });
  }
}
