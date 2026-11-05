import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  type OnModuleInit,
} from '@nestjs/common';
import {
  type BuyerPaymentPurpose,
  type BuyerPayments,
  commissionAmount,
  commissionRate,
  type ConfirmPaymentDto,
  convertMinor,
  type Currency,
  DEFAULT_RELEASE_SCHEDULE,
  type FinanceInbox,
  type LedgerBalances,
  type ManufacturerPayouts,
  type MarkSentDto,
  type OrderFinance,
  type OrderStatus,
  type PaymentMethod,
  type PaymentStart,
  paymentPlan,
  type PayoutDto,
  type PresignProofDto,
  type PresignUploadResponse,
  type RefundDto,
  type ReleaseSchedule,
  ReleaseScheduleSchema,
  type ReleaseTrigger,
  releaseTranches,
  type StartPaymentDto,
  type NotificationLink,
} from '@garmentgate/shared';
import type Stripe from 'stripe';
import type { OrderRelease, Payment, Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import { OrderHooks } from '../orders/order-hooks.js';
import { pickQuoteRule } from '../pricing/margin.js';
import type { OrderRow } from '../orders/order-views.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
import { FxService } from './fx.service.js';
import { LedgerService } from './ledger.service.js';
import { ManualProvider } from './providers/manual.provider.js';
import type { PaymentProvider } from './providers/payment-provider.js';
import { StripeProvider } from './providers/stripe.provider.js';

const SCHEDULE_KEY = 'release_schedule';
/** The order status that makes each tranche due. */
const TRIGGER_AT: Partial<Record<OrderStatus, ReleaseTrigger>> = {
  IN_PRODUCTION: 'PRODUCTION_START',
  READY_TO_SHIP: 'QC_PASSED',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  COMPLETED: 'COMPLETED',
};
/** When the buyer may pay each part. */
const PAYABLE: Record<BuyerPaymentPurpose, readonly OrderStatus[]> = {
  DEPOSIT: ['DEPOSIT_PENDING'],
  BALANCE: ['IN_PRODUCTION', 'QC', 'READY_TO_SHIP'],
};
const DUE: Record<BuyerPaymentPurpose, readonly OrderStatus[]> = {
  DEPOSIT: ['DEPOSIT_PENDING'],
  BALANCE: ['READY_TO_SHIP'],
};
const OPEN = ['PENDING', 'PROCESSING'] as const;
const PURPOSE_LABEL: Record<Payment['purpose'], string> = {
  DEPOSIT: 'Deposit',
  BALANCE: 'Balance',
  SAMPLE_FEE: 'Sample fee',
  PAYOUT: 'Payout',
  REFUND: 'Refund',
  LOGISTICS: 'Shipping',
  INSURANCE_RECOVERY: 'Insurance recovery',
};
const PROOF_MAX_BYTES = 10 * 1024 * 1024;

const n = (v: bigint | number) => Number(v);

const payerInclude = {
  order: { select: { code: true, buyerCompanyId: true } },
  capacityBooking: { select: { code: true, buyerCompanyId: true } },
} as const;

/** Who paid and what for: an order, or a capacity booking's deposit. */
function payerOf(payment: {
  order: { code: string; buyerCompanyId: string } | null;
  capacityBooking: { code: string; buyerCompanyId: string } | null;
}): { companyId: string; code: string; link: NotificationLink } {
  if (payment.order)
    return {
      companyId: payment.order.buyerCompanyId,
      code: payment.order.code,
      link: { orderCode: payment.order.code },
    };
  if (payment.capacityBooking)
    return {
      companyId: payment.capacityBooking.buyerCompanyId,
      code: payment.capacityBooking.code,
      link: { bookingCode: payment.capacityBooking.code },
    };
  throw new Error('Payment without an order or a booking');
}
const iso = (d: Date | null) => d?.toISOString() ?? null;

/**
 * Money for orders. Buyers pay GarmentGate (deposit, then balance) into escrow; staff release
 * each tranche to the factory's payable when its milestone is reached, booking GarmentGate's
 * commission as revenue in the same step; payouts and refunds leave from there. Every movement
 * is a balanced ledger posting with a unique key, under a lock on the order.
 */
@Injectable()
export class PaymentsService implements OnModuleInit {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifier: Notifier,
    private readonly ledger: LedgerService,
    private readonly fx: FxService,
    private readonly manual: ManualProvider,
    private readonly stripe: StripeProvider,
    private readonly orders: OrdersService,
    private readonly hooks: OrderHooks,
    private readonly files: FilesService,
    private readonly storage: StorageService,
    private readonly audit: AuditService,
  ) {}

  onModuleInit(): void {
    this.hooks.register({
      within: (tx, order, to) => this.onTransition(tx, order, to),
    });
  }

  private providers(): PaymentProvider[] {
    return [this.manual, this.stripe];
  }

  private providerFor(method: PaymentMethod): PaymentProvider {
    const provider = this.providers().find((p) => p.methods.includes(method) && p.enabled());
    if (!provider)
      throw new BadRequestException(`${method.replace('_', ' ').toLowerCase()} isn’t available`);
    return provider;
  }

  private methods(): PaymentMethod[] {
    return this.providers().flatMap((p) => (p.enabled() ? [...p.methods] : []));
  }

  // ── Release schedule ──────────────────────────────────────────────────────

  private bookingSettled: ((bookingId: string) => Promise<void>) | null = null;

  /** Capacity booking deposits settle here too; the booking module reacts (confirms the booking). */
  onBookingDepositSettled(handler: (bookingId: string) => Promise<void>): void {
    this.bookingSettled = handler;
  }

  async releaseSchedule(
    client: PrismaService | Prisma.TransactionClient = this.prisma,
  ): Promise<ReleaseSchedule> {
    const row = await client.platformSetting.findUnique({ where: { key: SCHEDULE_KEY } });
    const parsed = ReleaseScheduleSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_RELEASE_SCHEDULE;
  }

  /** New confirmations use it; confirmed orders keep the schedule they were confirmed with. */
  async setReleaseSchedule(adminId: string, schedule: ReleaseSchedule): Promise<void> {
    const value: Prisma.InputJsonValue = schedule;
    await this.prisma.platformSetting.upsert({
      where: { key: SCHEDULE_KEY },
      create: { key: SCHEDULE_KEY, value },
      update: { value },
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'finance.schedule_updated',
      entityType: 'PlatformSetting',
      entityId: SCHEDULE_KEY,
      metadata: { schedule: value },
    });
  }

  /**
   * The commission for an order: the margin rule that prices the order's category for this
   * buyer, at its repeat rate when the buyer has completed an order with this factory before
   * (a reorder always counts).
   */
  private async commissionFor(
    tx: Prisma.TransactionClient,
    order: OrderRow,
    factoryTotal: bigint,
  ): Promise<{ commissionBps: number; commissionMinor: bigint; repeatOrder: boolean }> {
    const [category, rules, previous] = await Promise.all([
      this.orderCategory(tx, order.id),
      tx.marginRule.findMany({ where: { active: true } }),
      tx.order.count({
        where: {
          id: { not: order.id },
          buyerCompanyId: order.buyerCompanyId,
          manufacturerProfileId: order.manufacturerProfileId,
          status: 'COMPLETED',
        },
      }),
    ]);
    const rule = category
      ? pickQuoteRule(rules, category, order.buyerCompanyId)
      : (rules.find((r) => r.categoryId === null && r.companyId === order.buyerCompanyId) ??
        rules.find((r) => r.categoryId === null && r.companyId === null) ??
        null);
    const repeatOrder = order.reorderOfId !== null || previous > 0;
    const commissionBps = commissionRate(rule, repeatOrder);
    return {
      commissionBps,
      commissionMinor: commissionAmount(factoryTotal, commissionBps),
      repeatOrder,
    };
  }

  /** The order's category: from its RFQ, or for a reorder from the order it repeats. */
  private async orderCategory(
    tx: Prisma.TransactionClient,
    orderId: string,
  ): Promise<{ id: string; parentId: string | null } | null> {
    let id: string | null = orderId;
    for (let depth = 0; id && depth < 10; depth++) {
      const row: {
        reorderOfId: string | null;
        rfq: { category: { id: string; parentId: string | null } } | null;
      } | null = await tx.order.findUnique({
        where: { id },
        select: {
          reorderOfId: true,
          rfq: { select: { category: { select: { id: true, parentId: true } } } },
        },
      });
      if (row?.rfq) return row.rfq.category;
      id = row?.reorderOfId ?? null;
    }
    return null;
  }

  private async onTransition(
    tx: Prisma.TransactionClient,
    order: OrderRow,
    to: OrderStatus,
  ): Promise<void> {
    const now = new Date();
    if (
      to === 'DEPOSIT_PENDING' &&
      (await tx.orderRelease.count({ where: { orderId: order.id } })) === 0
    ) {
      // Snapshot the schedule and the commission: later edits don't change a confirmed order.
      const schedule = await this.releaseSchedule(tx);
      const factoryTotal = BigInt(order.manufacturerUnitPriceMinor) * BigInt(order.quantity);
      const commission = await this.commissionFor(tx, order, factoryTotal);
      await tx.order.update({ where: { id: order.id }, data: commission });
      // The factory is owed its total less the commission; the platform keeps markup + commission.
      const tranches = releaseTranches(
        BigInt(order.buyerUnitPriceMinor) * BigInt(order.quantity),
        factoryTotal - commission.commissionMinor,
        schedule.map((s) => s.bps),
      );
      await tx.orderRelease.createMany({
        data: schedule.map((s, i) => ({
          orderId: order.id,
          trigger: s.trigger,
          bps: s.bps,
          currency: order.currency,
          buyerMinor: tranches[i]?.buyerMinor ?? 0n,
          manufacturerMinor: tranches[i]?.manufacturerMinor ?? 0n,
          commissionMinor: tranches[i]?.commissionMinor ?? 0n,
        })),
      });
    }
    const trigger = TRIGGER_AT[to];
    if (trigger) {
      // Reaching a later milestone also makes any earlier tranche due.
      const flow: readonly ReleaseTrigger[] = [
        'PRODUCTION_START',
        'QC_PASSED',
        'SHIPPED',
        'DELIVERED',
        'COMPLETED',
      ];
      await tx.orderRelease.updateMany({
        where: {
          orderId: order.id,
          status: 'SCHEDULED',
          trigger: { in: flow.slice(0, flow.indexOf(trigger) + 1) },
        },
        data: { status: 'DUE', dueAt: now },
      });
    }
    if (to === 'DELIVERED') {
      // The buyer confirmed delivery: the delivery tranche goes to the factory without waiting
      // for staff, provided escrow holds it (otherwise it stays DUE for staff to sort out).
      const due = await tx.orderRelease.findMany({
        where: { orderId: order.id, status: 'DUE', trigger: 'DELIVERED' },
      });
      const parties = {
        buyerCompanyId: order.buyerCompanyId,
        manufacturerProfile: { companyId: order.manufacturerProfile.company.id },
      };
      for (const release of due) {
        const position = await this.ledger.orderPosition(order.id, tx);
        if (position.escrow < release.buyerMinor) continue;
        await this.releaseWithin(tx, { ...release, order: parties }, null);
      }
    }
    if (to === 'CANCELLED') {
      await tx.orderRelease.updateMany({
        where: { orderId: order.id, status: { in: ['SCHEDULED', 'DUE'] } },
        data: { status: 'CANCELLED' },
      });
      await tx.payment.updateMany({
        where: { orderId: order.id, direction: 'INBOUND', status: { in: [...OPEN] } },
        data: { status: 'CANCELLED' },
      });
    }
  }

  // ── Buyer ─────────────────────────────────────────────────────────────────

  /** Which parts of the plan are paid (succeeded inbound payments, by purpose). */
  private async paid(orderId: string, unit: number, quantity: number, depositBps: number) {
    const plan = paymentPlan(BigInt(unit) * BigInt(quantity), depositBps);
    const rows = await this.prisma.payment.groupBy({
      by: ['purpose'],
      where: { orderId, direction: 'INBOUND', status: 'SUCCEEDED' },
      _sum: { amountMinor: true },
    });
    const sum = (p: 'DEPOSIT' | 'BALANCE') =>
      rows.find((r) => r.purpose === p)?._sum.amountMinor ?? 0n;
    return {
      plan,
      depositPaid: sum('DEPOSIT'),
      balancePaid: sum('BALANCE'),
      deposit: sum('DEPOSIT') >= plan.deposit,
      balance: sum('BALANCE') >= plan.balance,
    };
  }

  async buyerView(actor: ChatActor, code: string): Promise<BuyerPayments> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) !== 'BUYER') throw new ForbiddenException('This is the buyer’s view');
    const payments = await this.prisma.payment.findMany({
      where: { orderId: order.id, purpose: { in: ['DEPOSIT', 'BALANCE', 'REFUND'] } },
      orderBy: { createdAt: 'asc' },
    });
    const state = await this.paid(
      order.id,
      order.buyerUnitPriceMinor,
      order.quantity,
      order.depositBps,
    );
    const total = BigInt(order.buyerUnitPriceMinor) * BigInt(order.quantity);
    const refunded = payments
      .filter((p) => p.purpose === 'REFUND' && p.status === 'SUCCEEDED')
      .reduce((a, p) => a + p.amountMinor, 0n);
    const paidTotal = state.depositPaid + state.balancePaid;
    const part = (purpose: BuyerPaymentPurpose, amount: bigint, paidAmount: bigint) => {
      const open = payments.find(
        (p) => p.purpose === purpose && (OPEN as readonly string[]).includes(p.status),
      );
      const status =
        paidAmount >= amount
          ? 'PAID'
          : open?.status === 'PROCESSING'
            ? 'PROCESSING'
            : DUE[purpose].includes(order.status)
              ? 'DUE'
              : 'NOT_DUE';
      return { purpose, amountMinor: n(amount), status, paymentId: open?.id ?? null } as const;
    };
    return {
      currency: order.currency,
      totalMinor: n(total),
      paidMinor: n(paidTotal),
      refundedMinor: n(refunded),
      outstandingMinor: n(total - paidTotal > 0n ? total - paidTotal : 0n),
      plan: [
        part('DEPOSIT', state.plan.deposit, state.depositPaid),
        part('BALANCE', state.plan.balance, state.balancePaid),
      ],
      payments: payments.map((p) => ({
        id: p.id,
        reference: p.reference ?? p.id,
        purpose:
          p.purpose === 'REFUND' ? 'REFUND' : p.purpose === 'BALANCE' ? 'BALANCE' : 'DEPOSIT',
        method: p.method,
        amountMinor: n(p.amountMinor),
        status: p.status,
        createdAt: p.createdAt.toISOString(),
        paidAt: iso(p.paidAt),
      })),
      methods: this.methods(),
      instructions: this.manual.bankLines(),
    };
  }

  /** Opens (or reuses) a payment for the deposit or balance with the chosen method. */
  async start(actor: ChatActor, code: string, dto: StartPaymentDto): Promise<PaymentStart> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) !== 'BUYER') throw new ForbiddenException('Only the buyer pays');
    if (!PAYABLE[dto.purpose].includes(order.status)) {
      throw new ConflictException(
        dto.purpose === 'DEPOSIT'
          ? 'The deposit is due once the order is confirmed'
          : 'The balance can be paid once production has started',
      );
    }
    const state = await this.paid(
      order.id,
      order.buyerUnitPriceMinor,
      order.quantity,
      order.depositBps,
    );
    const amount =
      dto.purpose === 'DEPOSIT'
        ? state.plan.deposit - state.depositPaid
        : state.plan.balance - state.balancePaid;
    if (amount <= 0n) throw new ConflictException('Already paid');
    const provider = this.providerFor(dto.method);

    const open = await this.prisma.payment.findFirst({
      where: {
        orderId: order.id,
        purpose: dto.purpose,
        direction: 'INBOUND',
        status: { in: [...OPEN] },
      },
    });
    if (open?.status === 'PROCESSING')
      throw new ConflictException('A payment is already on its way: we’ll confirm it shortly');
    if (open?.method === dto.method && open.amountMinor === amount && provider.id === 'manual') {
      return this.startResult(open, provider, order.code);
    }
    if (open)
      await this.prisma.payment.update({ where: { id: open.id }, data: { status: 'CANCELLED' } });

    const count = await this.prisma.payment.count({
      where: { orderId: order.id, purpose: dto.purpose },
    });
    const payment = await this.prisma.payment.create({
      data: {
        orderId: order.id,
        direction: 'INBOUND',
        purpose: dto.purpose,
        amountMinor: amount,
        currency: order.currency,
        method: dto.method,
        provider: provider.id,
        reference: `PAY-${order.code.slice(4)}-${dto.purpose === 'DEPOSIT' ? 'D' : 'B'}${String(count + 1)}`,
        status: 'PENDING',
      },
    });
    return this.startResult(payment, provider, order.code);
  }

  private async startResult(
    payment: Payment,
    provider: PaymentProvider,
    orderCode: string,
  ): Promise<PaymentStart> {
    const result = await provider.start({
      paymentId: payment.id,
      reference: payment.reference ?? payment.id,
      orderCode,
      amountMinor: payment.amountMinor,
      currency: payment.currency,
      method: payment.method,
    });
    if (result.providerRef && result.providerRef !== payment.providerRef) {
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { providerRef: result.providerRef },
      });
    }
    return {
      paymentId: payment.id,
      reference: payment.reference ?? payment.id,
      method: payment.method,
      amountMinor: n(payment.amountMinor),
      currency: payment.currency,
      instructions: result.instructions,
      stripe: result.stripe,
    };
  }

  /** The buyer says the transfer is on its way (staff still confirm receipt). */
  async markSent(
    actor: ChatActor,
    code: string,
    paymentId: string,
    dto: MarkSentDto,
  ): Promise<void> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) !== 'BUYER') throw new ForbiddenException('Only the buyer pays');
    const { count } = await this.prisma.payment.updateMany({
      where: { id: paymentId, orderId: order.id, provider: 'manual', status: 'PENDING' },
      data: { status: 'PROCESSING', payerReference: dto.payerReference ?? null },
    });
    if (count === 0) throw new NotFoundException('Payment not found');
    await this.notifyAdmins(
      `${order.code}: payment sent`,
      `Check the bank for ${order.buyerCompany.buyerProfile?.publicCode ?? ''}'s transfer`,
      { orderCode: order.code },
    );
  }

  // ── Other order charges (shipping) ────────────────────────────────────────

  /** Starts (or resumes) paying a separate order charge, e.g. GarmentGate's shipping. */
  async startOrderCharge(
    order: { id: string; code: string; currency: Currency },
    purpose: 'LOGISTICS',
    amount: bigint,
    method: PaymentMethod,
  ): Promise<PaymentStart> {
    if (amount <= 0n) throw new ConflictException('Already paid');
    const provider = this.providerFor(method);
    const open = await this.prisma.payment.findFirst({
      where: { orderId: order.id, purpose, direction: 'INBOUND', status: { in: [...OPEN] } },
    });
    if (open?.status === 'PROCESSING')
      throw new ConflictException('A payment is already on its way: we’ll confirm it shortly');
    if (open?.method === method && open.amountMinor === amount && provider.id === 'manual')
      return this.startResult(open, provider, order.code);
    if (open)
      await this.prisma.payment.update({ where: { id: open.id }, data: { status: 'CANCELLED' } });
    const count = await this.prisma.payment.count({ where: { orderId: order.id, purpose } });
    const payment = await this.prisma.payment.create({
      data: {
        orderId: order.id,
        direction: 'INBOUND',
        purpose,
        amountMinor: amount,
        currency: order.currency,
        method,
        provider: provider.id,
        reference: `PAY-${order.code.slice(4)}-L${String(count + 1)}`,
        status: 'PENDING',
      },
    });
    return this.startResult(payment, provider, order.code);
  }

  /** Whether the order's balance (and so its deposit) is paid in full. */
  async balancePaid(order: {
    id: string;
    buyerUnitPriceMinor: number;
    quantity: number;
    depositBps: number;
  }): Promise<boolean> {
    return (await this.paid(order.id, order.buyerUnitPriceMinor, order.quantity, order.depositBps))
      .balance;
  }

  /** Succeeded payments for one purpose of an order, and whether a transfer awaits staff. */
  async orderChargeState(
    orderId: string,
    purpose: 'LOGISTICS',
  ): Promise<{ paid: bigint; pending: boolean }> {
    const [sum, pending] = await Promise.all([
      this.prisma.payment.aggregate({
        where: { orderId, purpose, direction: 'INBOUND', status: 'SUCCEEDED' },
        _sum: { amountMinor: true },
      }),
      this.prisma.payment.count({
        where: { orderId, purpose, direction: 'INBOUND', status: 'PROCESSING' },
      }),
    ]);
    return { paid: sum._sum.amountMinor ?? 0n, pending: pending > 0 };
  }

  // ── Capacity booking deposits ─────────────────────────────────────────────

  /** Starts (or resumes) paying a booking's deposit into escrow. The caller checked the buyer. */
  async startBookingDeposit(
    booking: { id: string; code: string; currency: Currency },
    amount: bigint,
    method: PaymentMethod,
  ): Promise<PaymentStart> {
    if (amount <= 0n) throw new ConflictException('Already paid');
    const provider = this.providerFor(method);
    const open = await this.prisma.payment.findFirst({
      where: {
        capacityBookingId: booking.id,
        direction: 'INBOUND',
        status: { in: [...OPEN] },
      },
    });
    if (open?.status === 'PROCESSING')
      throw new ConflictException('A payment is already on its way: we’ll confirm it shortly');
    if (open?.method === method && open.amountMinor === amount && provider.id === 'manual')
      return this.startResult(open, provider, booking.code);
    if (open)
      await this.prisma.payment.update({ where: { id: open.id }, data: { status: 'CANCELLED' } });
    const count = await this.prisma.payment.count({ where: { capacityBookingId: booking.id } });
    const payment = await this.prisma.payment.create({
      data: {
        capacityBookingId: booking.id,
        direction: 'INBOUND',
        purpose: 'DEPOSIT',
        amountMinor: amount,
        currency: booking.currency,
        method,
        provider: provider.id,
        reference: `PAY-${booking.code}-D${String(count + 1)}`,
        status: 'PENDING',
      },
    });
    return this.startResult(payment, provider, booking.code);
  }

  async markBookingDepositSent(
    booking: { id: string; code: string },
    paymentId: string,
    dto: MarkSentDto,
  ): Promise<void> {
    const { count } = await this.prisma.payment.updateMany({
      where: {
        id: paymentId,
        capacityBookingId: booking.id,
        provider: 'manual',
        status: 'PENDING',
      },
      data: { status: 'PROCESSING', payerReference: dto.payerReference ?? null },
    });
    if (count === 0) throw new NotFoundException('Payment not found');
    await this.notifyAdmins(
      `${booking.code}: deposit sent`,
      'Check the bank and confirm it in Finance',
      {
        bookingCode: booking.code,
      },
    );
  }

  /** What a booking holds in escrow, and transfers still waiting for staff. */
  async bookingDepositState(bookingId: string): Promise<{ paid: bigint; pending: boolean }> {
    const [paid, pending] = await Promise.all([
      this.ledger.bookingEscrow(bookingId),
      this.prisma.payment.count({
        where: { capacityBookingId: bookingId, direction: 'INBOUND', status: 'PROCESSING' },
      }),
    ]);
    return { paid, pending: pending > 0 };
  }

  /**
   * Settles a cancelled or expired booking's escrow: the refund goes back to the buyer, the
   * factory's share to its payable and the rest to revenue, in one balanced posting per part.
   * Open deposit payments are cancelled. Idempotent per booking (posting keys).
   */
  async settleBookingCancellation(
    booking: { id: string; code: string; currency: Currency; buyerCompanyId: string },
    factoryCompanyId: string,
    split: { refundMinor: bigint; factoryMinor: bigint; platformMinor: bigint },
    reason: string,
  ): Promise<void> {
    const total = split.refundMinor + split.factoryMinor + split.platformMinor;
    await this.prisma.payment.updateMany({
      where: { capacityBookingId: booking.id, direction: 'INBOUND', status: { in: [...OPEN] } },
      data: { status: 'CANCELLED' },
    });
    if (total === 0n) return;
    const card = await this.prisma.payment.findFirst({
      where: {
        capacityBookingId: booking.id,
        direction: 'INBOUND',
        status: 'SUCCEEDED',
        method: 'CARD',
        amountMinor: { gte: split.refundMinor },
      },
    });
    let refundRef: string | null = null;
    let refundId: string | null = null;
    if (split.refundMinor > 0n) {
      const refund = await this.prisma.payment.create({
        data: {
          capacityBookingId: booking.id,
          direction: 'OUTBOUND',
          purpose: 'REFUND',
          amountMinor: split.refundMinor,
          currency: booking.currency,
          method: card ? 'CARD' : 'BANK_TRANSFER',
          provider: card ? 'stripe' : 'manual',
          reference: `REF-${booking.code}`,
          status: 'PENDING',
        },
      });
      refundId = refund.id;
      try {
        const result = await (card ? this.stripe : this.manual).refund({
          refundPaymentId: refund.id,
          providerRef: card?.providerRef ?? null,
          amountMinor: split.refundMinor,
          currency: booking.currency,
        });
        refundRef = result.providerRef;
      } catch (error) {
        await this.prisma.payment.update({
          where: { id: refund.id },
          data: {
            status: 'FAILED',
            failureReason: error instanceof Error ? error.message.slice(0, 300) : 'Refund failed',
          },
        });
        throw new ConflictException('The refund failed at the payment provider');
      }
    }
    await this.prisma.$transaction(async (tx) => {
      await this.ledger.lockBooking(tx, booking.id);
      const escrow = await this.ledger.bookingEscrow(booking.id, tx);
      if (escrow < total) throw new ConflictException(`Only ${String(escrow)} is in escrow`);
      const { rates } = await this.fx.snapshot(booking.currency, tx);
      const base = { capacityBookingId: booking.id, currency: booking.currency, rates };
      const fromEscrow = (amount: bigint) => ({
        account: 'BUYER_ESCROW' as const,
        companyId: booking.buyerCompanyId,
        direction: 'DEBIT' as const,
        amountMinor: amount,
      });
      if (refundId && split.refundMinor > 0n) {
        await tx.payment.update({
          where: { id: refundId },
          data: {
            status: 'SUCCEEDED',
            paidAt: new Date(),
            providerRef: refundRef,
            unitsPerUsd: rates[booking.currency] ?? '1',
            amountUsdMinor: convertMinor(split.refundMinor, booking.currency, 'USD', rates),
          },
        });
        await this.ledger.post(tx, {
          ...base,
          kind: 'REFUND',
          key: `booking-refund:${booking.id}`,
          paymentId: refundId,
          description: `${booking.code} refund: ${reason}`,
          lines: [
            fromEscrow(split.refundMinor),
            {
              account: 'PLATFORM_CASH',
              companyId: null,
              direction: 'CREDIT',
              amountMinor: split.refundMinor,
            },
          ],
        });
      }
      if (split.factoryMinor > 0n)
        await this.ledger.post(tx, {
          ...base,
          kind: 'RELEASE',
          key: `booking-compensation:${booking.id}`,
          description: `${booking.code} cancelled: the factory's share of the kept deposit`,
          lines: [
            fromEscrow(split.factoryMinor),
            {
              account: 'MANUFACTURER_PAYABLE',
              companyId: factoryCompanyId,
              direction: 'CREDIT',
              amountMinor: split.factoryMinor,
            },
          ],
        });
      if (split.platformMinor > 0n)
        await this.ledger.post(tx, {
          ...base,
          kind: 'COMMISSION',
          key: `booking-fee:${booking.id}`,
          description: `${booking.code} cancelled: GarmentGate's share of the kept deposit`,
          lines: [
            fromEscrow(split.platformMinor),
            {
              account: 'PLATFORM_REVENUE',
              companyId: null,
              direction: 'CREDIT',
              amountMinor: split.platformMinor,
            },
          ],
        });
    });
    if (split.refundMinor > 0n && !card)
      await this.notifyAdmins(
        `${booking.code}: refund to send`,
        `Send ${String(split.refundMinor)} ${booking.currency} back by bank transfer (REF-${booking.code})`,
        { bookingCode: booking.code },
      );
  }

  /** Staff paid the factory its share of a forfeited deposit. */
  async payBookingCompensation(
    adminId: string,
    booking: { id: string; code: string; currency: Currency },
    factoryCompanyId: string,
    amount: bigint,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await this.ledger.lockBooking(tx, booking.id);
      const { rates } = await this.fx.snapshot(booking.currency, tx);
      const payout = await tx.payment.create({
        data: {
          capacityBookingId: booking.id,
          direction: 'OUTBOUND',
          purpose: 'PAYOUT',
          amountMinor: amount,
          currency: booking.currency,
          method: 'BANK_TRANSFER',
          provider: 'manual',
          reference: `OUT-${booking.code}`,
          status: 'SUCCEEDED',
          paidAt: new Date(),
          confirmedById: adminId,
          unitsPerUsd: rates[booking.currency] ?? '1',
          amountUsdMinor: convertMinor(amount, booking.currency, 'USD', rates),
        },
      });
      const posted = await this.ledger.post(tx, {
        kind: 'PAYOUT',
        key: `booking-payout:${booking.id}`,
        capacityBookingId: booking.id,
        paymentId: payout.id,
        currency: booking.currency,
        rates,
        description: `${booking.code}: cancellation compensation paid to the factory`,
        lines: [
          {
            account: 'MANUFACTURER_PAYABLE',
            companyId: factoryCompanyId,
            direction: 'DEBIT',
            amountMinor: amount,
          },
          { account: 'PLATFORM_CASH', companyId: null, direction: 'CREDIT', amountMinor: amount },
        ],
      });
      if (!posted) throw new ConflictException('Already paid');
    });
  }

  /**
   * A booking became an order: its escrow moves to the order (the order's deposit counts it).
   * Two postings so each side's position stays right: out of the booking, into the order.
   */
  async carryBookingDepositIntoOrder(
    booking: { id: string; code: string; currency: Currency; buyerCompanyId: string },
    order: { id: string; code: string },
  ): Promise<bigint> {
    return this.prisma.$transaction(async (tx) => {
      await this.ledger.lockBooking(tx, booking.id);
      await this.ledger.lockOrder(tx, order.id);
      const amount = await this.ledger.bookingEscrow(booking.id, tx);
      if (amount <= 0n) return 0n;
      const { rates } = await this.fx.snapshot(booking.currency, tx);
      const escrow = (direction: 'DEBIT' | 'CREDIT') => ({
        account: 'BUYER_ESCROW' as const,
        companyId: booking.buyerCompanyId,
        direction,
        amountMinor: amount,
      });
      const cash = (direction: 'DEBIT' | 'CREDIT') => ({
        account: 'PLATFORM_CASH' as const,
        companyId: null,
        direction,
        amountMinor: amount,
      });
      await this.ledger.post(tx, {
        kind: 'HOLD',
        key: `booking-carry-out:${booking.id}`,
        capacityBookingId: booking.id,
        currency: booking.currency,
        rates,
        description: `${booking.code} deposit carried into ${order.code}`,
        lines: [escrow('DEBIT'), cash('CREDIT')],
      });
      await this.ledger.post(tx, {
        kind: 'DEPOSIT',
        key: `booking-carry-in:${booking.id}`,
        orderId: order.id,
        currency: booking.currency,
        rates,
        description: `Deposit from capacity booking ${booking.code}`,
        lines: [cash('DEBIT'), escrow('CREDIT')],
      });
      // The deposit payment now counts toward the order's deposit too.
      await tx.payment.updateMany({
        where: { capacityBookingId: booking.id, direction: 'INBOUND', status: 'SUCCEEDED' },
        data: { orderId: order.id },
      });
      return amount;
    });
  }

  // ── Settlement ───────────────────────────────────────────────────────────

  /**
   * Money arrived: mark the payment succeeded and move it into the buyer's escrow. Idempotent
   * (a replayed webhook or a double click posts nothing twice).
   */
  private async settle(
    paymentId: string,
    data: Prisma.PaymentUncheckedUpdateManyInput,
  ): Promise<boolean> {
    const payment = await this.prisma.payment.findUniqueOrThrow({
      where: { id: paymentId },
      include: {
        order: { select: { id: true, code: true, buyerCompanyId: true, status: true } },
        capacityBooking: { select: { id: true, code: true, buyerCompanyId: true } },
      },
    });
    const payer = payerOf(payment);
    const settled = await this.prisma.$transaction(async (tx) => {
      if (payment.orderId) await this.ledger.lockOrder(tx, payment.orderId);
      else if (payment.capacityBookingId)
        await this.ledger.lockBooking(tx, payment.capacityBookingId);
      const { rates } = await this.fx.snapshot(payment.currency, tx);
      const { count } = await tx.payment.updateMany({
        where: { id: payment.id, status: { in: [...OPEN] } },
        data: {
          ...data,
          status: 'SUCCEEDED',
          paidAt: new Date(),
          unitsPerUsd: rates[payment.currency] ?? '1',
          amountUsdMinor: convertMinor(payment.amountMinor, payment.currency, 'USD', rates),
        },
      });
      if (count === 0) return false;
      await this.ledger.post(tx, {
        kind: 'DEPOSIT',
        key: `payment:${payment.id}`,
        orderId: payment.orderId,
        capacityBookingId: payment.orderId ? null : payment.capacityBookingId,
        paymentId: payment.id,
        currency: payment.currency,
        description: `${PURPOSE_LABEL[payment.purpose]} ${payment.reference ?? ''} received into escrow`,
        rates,
        lines: [
          {
            account: 'PLATFORM_CASH',
            companyId: null,
            direction: 'DEBIT',
            amountMinor: payment.amountMinor,
          },
          {
            account: 'BUYER_ESCROW',
            companyId: payer.companyId,
            direction: 'CREDIT',
            amountMinor: payment.amountMinor,
          },
        ],
      });
      return true;
    });
    if (!settled) return false;

    await this.notifyCompany(
      payer.companyId,
      `${payer.code}: payment received`,
      `Thank you: ${payment.reference ?? ''} is in escrow.`,
      payer.link,
    );
    if (!payment.order) {
      if (payment.capacityBookingId && this.bookingSettled)
        await this.bookingSettled(payment.capacityBookingId);
      return true;
    }
    if (payment.purpose === 'DEPOSIT' && payment.order.status === 'DEPOSIT_PENDING') {
      const order = await this.prisma.order.findUniqueOrThrow({ where: { id: payment.order.id } });
      const state = await this.paid(
        order.id,
        order.buyerUnitPriceMinor,
        order.quantity,
        order.depositBps,
      );
      if (state.deposit)
        await this.orders.advance(
          order.id,
          'IN_PRODUCTION',
          `Deposit ${payment.reference ?? ''} received`,
        );
    }
    return true;
  }

  async presignProof(
    adminId: string,
    paymentId: string,
    dto: PresignProofDto,
  ): Promise<PresignUploadResponse> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: payerInclude,
    });
    if (!payment) throw new NotFoundException('Payment not found');
    // Proofs are staff-only; they're filed under the paying company.
    return this.files.reserveUpload({
      userId: adminId,
      companyId: payerOf(payment).companyId,
      purpose: 'PAYMENT_PROOF',
      folder: 'finance',
      fileName: dto.fileName,
      contentType: dto.contentType,
      sizeBytes: dto.sizeBytes,
      maxBytes: PROOF_MAX_BYTES,
    });
  }

  /** Staff confirm a bank transfer / LC arrived, with proof. */
  async confirm(adminId: string, paymentId: string, dto: ConfirmPaymentDto): Promise<void> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: payerInclude,
    });
    if (payment?.direction !== 'INBOUND') throw new NotFoundException('Payment not found');
    if (payment.provider !== 'manual')
      throw new BadRequestException('Card payments are confirmed by Stripe');
    if (!(OPEN as readonly string[]).includes(payment.status))
      throw new ConflictException('This payment is already settled');
    const duplicate = await this.prisma.payment.findFirst({
      where: { providerRef: dto.bankReference, id: { not: paymentId } },
    });
    if (duplicate)
      throw new ConflictException('That bank reference already settled another payment');
    const proof = await this.files.confirmUpload(
      dto.proofFileId,
      payerOf(payment).companyId,
      'PAYMENT_PROOF',
      PROOF_MAX_BYTES,
    );
    const settled = await this.settle(paymentId, {
      proofFileId: proof.id,
      confirmedById: adminId,
      providerRef: dto.bankReference,
    });
    if (!settled) throw new ConflictException('This payment is already settled');
    await this.audit.log({
      actorUserId: adminId,
      action: 'payment.confirmed',
      entityType: 'Payment',
      entityId: paymentId,
      metadata: { bankReference: dto.bankReference },
    });
  }

  async reject(adminId: string, paymentId: string, reason: string): Promise<void> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: payerInclude,
    });
    if (!payment) throw new NotFoundException('Payment not found');
    const { count } = await this.prisma.payment.updateMany({
      where: { id: paymentId, status: { in: [...OPEN] } },
      data: { status: 'FAILED', failureReason: reason },
    });
    if (count === 0) throw new ConflictException('This payment is already settled');
    const payer = payerOf(payment);
    await this.notifyCompany(
      payer.companyId,
      `${payer.code}: payment not received`,
      reason,
      payer.link,
    );
    await this.audit.log({
      actorUserId: adminId,
      action: 'payment.rejected',
      entityType: 'Payment',
      entityId: paymentId,
      metadata: { reason },
    });
  }

  /** Stripe webhooks (signature already verified). */
  async stripeEvent(event: Stripe.Event): Promise<void> {
    if (event.type !== 'payment_intent.succeeded' && event.type !== 'payment_intent.payment_failed')
      return;
    const intent = event.data.object;
    const payment = await this.prisma.payment.findFirst({
      where: { provider: 'stripe', providerRef: intent.id },
    });
    if (!payment) {
      this.logger.warn({ intent: intent.id }, 'Stripe event for an unknown payment');
      return;
    }
    if (event.type === 'payment_intent.payment_failed') {
      await this.prisma.payment.updateMany({
        where: { id: payment.id, status: { in: [...OPEN] } },
        data: {
          status: 'FAILED',
          failureReason: intent.last_payment_error?.message ?? 'Card payment failed',
        },
      });
      return;
    }
    if (
      intent.currency.toUpperCase() !== payment.currency ||
      BigInt(intent.amount_received) < payment.amountMinor
    ) {
      this.logger.error(
        { intent: intent.id, payment: payment.id },
        'Stripe amount or currency mismatch',
      );
      await this.notifyAdmins(
        'Card payment mismatch',
        `${payment.reference ?? ''}: Stripe reports ${String(intent.amount_received)} ${intent.currency}`,
        { paymentId: payment.id },
      );
      return;
    }
    await this.settle(payment.id, {});
  }

  // ── Releases, payouts, refunds (staff) ────────────────────────────────────

  /**
   * Releases one tranche: the factory's share moves from escrow to its payable and the
   * commission to revenue, in one database transaction. A tranche can only be released once:
   * its status moves DUE → RELEASED conditionally and both postings have unique keys.
   */
  async approveRelease(adminId: string, releaseId: string): Promise<void> {
    const release = await this.prisma.orderRelease.findUnique({
      where: { id: releaseId },
      include: {
        order: {
          select: {
            id: true,
            code: true,
            buyerCompanyId: true,
            manufacturerProfile: { select: { companyId: true } },
          },
        },
      },
    });
    if (!release) throw new NotFoundException('Release not found');
    await this.prisma.$transaction(async (tx) => {
      await this.releaseWithin(tx, release, adminId);
    });
    await this.notifyCompany(
      release.order.manufacturerProfile.companyId,
      `${release.order.code}: payment released`,
      `${String(release.bps / 100)}% of your order value is released and will be paid out shortly.`,
      { orderCode: release.order.code },
    );
    await this.audit.log({
      actorUserId: adminId,
      action: 'finance.release_approved',
      entityType: 'OrderRelease',
      entityId: release.id,
    });
  }

  /**
   * Moves one DUE tranche out of escrow inside the caller's transaction: the factory's share to
   * its payable, the commission to revenue. Throws if it isn't due or escrow is short.
   */
  private async releaseWithin(
    tx: Prisma.TransactionClient,
    release: Pick<
      OrderRelease,
      | 'id'
      | 'orderId'
      | 'currency'
      | 'trigger'
      | 'buyerMinor'
      | 'manufacturerMinor'
      | 'commissionMinor'
    > & { order: { buyerCompanyId: string; manufacturerProfile: { companyId: string } } },
    approvedById: string | null,
  ): Promise<void> {
    await this.ledger.lockOrder(tx, release.orderId);
    const { count } = await tx.orderRelease.updateMany({
      where: { id: release.id, status: 'DUE' },
      data: { status: 'RELEASED', releasedAt: new Date(), approvedById },
    });
    if (count !== 1) throw new ConflictException('This tranche isn’t due, or was already released');
    const position = await this.ledger.orderPosition(release.orderId, tx);
    if (position.escrow < release.buyerMinor) {
      throw new ConflictException(
        `Not enough in escrow: ${String(position.escrow)} held, ${String(release.buyerMinor)} needed`,
      );
    }
    const { rates } = await this.fx.snapshot(release.currency, tx);
    const base = { orderId: release.orderId, currency: release.currency, rates };
    await this.ledger.post(tx, {
      ...base,
      kind: 'RELEASE',
      key: `release:${release.id}`,
      description: `${release.trigger} tranche released to the factory`,
      lines: [
        {
          account: 'BUYER_ESCROW',
          companyId: release.order.buyerCompanyId,
          direction: 'DEBIT',
          amountMinor: release.manufacturerMinor,
        },
        {
          account: 'MANUFACTURER_PAYABLE',
          companyId: release.order.manufacturerProfile.companyId,
          direction: 'CREDIT',
          amountMinor: release.manufacturerMinor,
        },
      ],
    });
    if (release.commissionMinor > 0n) {
      await this.ledger.post(tx, {
        ...base,
        kind: 'COMMISSION',
        key: `commission:${release.id}`,
        description: `Commission on the ${release.trigger} tranche`,
        lines: [
          {
            account: 'BUYER_ESCROW',
            companyId: release.order.buyerCompanyId,
            direction: 'DEBIT',
            amountMinor: release.commissionMinor,
          },
          {
            account: 'PLATFORM_REVENUE',
            companyId: null,
            direction: 'CREDIT',
            amountMinor: release.commissionMinor,
          },
        ],
      });
    }
  }

  /** Records the bank transfer to the factory for a released tranche (optionally in another currency). */
  async payout(adminId: string, releaseId: string, dto: PayoutDto): Promise<void> {
    const release = await this.prisma.orderRelease.findUnique({
      where: { id: releaseId },
      include: {
        order: {
          select: { id: true, code: true, manufacturerProfile: { select: { companyId: true } } },
        },
      },
    });
    if (!release) throw new NotFoundException('Release not found');
    if (await this.prisma.payment.findFirst({ where: { providerRef: dto.bankReference } })) {
      throw new ConflictException('That bank reference is already recorded');
    }
    await this.prisma.$transaction(async (tx) => {
      await this.ledger.lockOrder(tx, release.orderId);
      const { count } = await tx.orderRelease.updateMany({
        where: { id: release.id, status: 'RELEASED' },
        data: { status: 'PAID', paidAt: new Date() },
      });
      if (count !== 1)
        throw new ConflictException('This tranche isn’t released, or was already paid');
      const settlementCurrency: Currency = dto.settlementCurrency ?? release.currency;
      const { rates } = await this.fx.snapshot(release.currency, tx);
      if (!rates[settlementCurrency])
        throw new BadRequestException(`No exchange rate for ${settlementCurrency}`);
      const payout = await tx.payment.create({
        data: {
          orderId: release.orderId,
          direction: 'OUTBOUND',
          purpose: 'PAYOUT',
          amountMinor: release.manufacturerMinor,
          currency: release.currency,
          method: 'BANK_TRANSFER',
          provider: 'manual',
          providerRef: dto.bankReference,
          reference: `OUT-${release.order.code.slice(4)}-${release.trigger}`,
          status: 'SUCCEEDED',
          paidAt: new Date(),
          confirmedById: adminId,
          releaseId: release.id,
          unitsPerUsd: rates[release.currency] ?? '1',
          amountUsdMinor: convertMinor(release.manufacturerMinor, release.currency, 'USD', rates),
          settlementCurrency: settlementCurrency === release.currency ? null : settlementCurrency,
          settlementAmountMinor:
            settlementCurrency === release.currency
              ? null
              : convertMinor(
                  release.manufacturerMinor,
                  release.currency,
                  settlementCurrency,
                  rates,
                ),
        },
      });
      await this.ledger.post(tx, {
        kind: 'PAYOUT',
        key: `payout:${release.id}`,
        orderId: release.orderId,
        paymentId: payout.id,
        currency: release.currency,
        rates,
        description: `${release.trigger} tranche paid to the factory`,
        lines: [
          {
            account: 'MANUFACTURER_PAYABLE',
            companyId: release.order.manufacturerProfile.companyId,
            direction: 'DEBIT',
            amountMinor: release.manufacturerMinor,
          },
          {
            account: 'PLATFORM_CASH',
            companyId: null,
            direction: 'CREDIT',
            amountMinor: release.manufacturerMinor,
          },
        ],
      });
    });
    await this.notifyCompany(
      release.order.manufacturerProfile.companyId,
      `${release.order.code}: payout sent`,
      `Bank reference ${dto.bankReference}.`,
      { orderCode: release.order.code },
    );
    await this.audit.log({
      actorUserId: adminId,
      action: 'finance.payout',
      entityType: 'OrderRelease',
      entityId: release.id,
      metadata: { bankReference: dto.bankReference },
    });
  }

  /**
   * Refunds unreleased escrow to the buyer: by card through Stripe when the money came by card,
   * otherwise by bank transfer that staff send. Only what's still in escrow can be refunded.
   */
  async refund(adminId: string, code: string, dto: RefundDto): Promise<void> {
    const order = await this.prisma.order.findUnique({
      where: { code },
      select: { id: true, code: true, currency: true, buyerCompanyId: true },
    });
    if (!order) throw new NotFoundException('Order not found');
    const amount = BigInt(dto.amountMinor);
    const card = await this.prisma.payment.findFirst({
      where: {
        orderId: order.id,
        direction: 'INBOUND',
        status: 'SUCCEEDED',
        method: 'CARD',
        amountMinor: { gte: amount },
      },
      orderBy: { paidAt: 'desc' },
    });
    const refund = await this.prisma.$transaction(async (tx) => {
      await this.ledger.lockOrder(tx, order.id);
      const position = await this.ledger.orderPosition(order.id, tx);
      const pending = await tx.payment.aggregate({
        where: { orderId: order.id, purpose: 'REFUND', status: { in: [...OPEN] } },
        _sum: { amountMinor: true },
      });
      const available = position.escrow - (pending._sum.amountMinor ?? 0n);
      if (amount > available)
        throw new ConflictException(`Only ${String(available)} is still in escrow`);
      const count = await tx.payment.count({ where: { orderId: order.id, purpose: 'REFUND' } });
      return tx.payment.create({
        data: {
          orderId: order.id,
          direction: 'OUTBOUND',
          purpose: 'REFUND',
          amountMinor: amount,
          currency: order.currency,
          method: card ? 'CARD' : 'BANK_TRANSFER',
          provider: card ? 'stripe' : 'manual',
          reference: `REF-${order.code.slice(4)}-${String(count + 1)}`,
          status: 'PENDING',
          failureReason: null,
          confirmedById: adminId,
        },
      });
    });

    const provider = card ? this.stripe : this.manual;
    let result;
    try {
      result = await provider.refund({
        refundPaymentId: refund.id,
        providerRef: card?.providerRef ?? null,
        amountMinor: amount,
        currency: order.currency,
      });
    } catch (error) {
      await this.prisma.payment.update({
        where: { id: refund.id },
        data: {
          status: 'FAILED',
          failureReason: error instanceof Error ? error.message.slice(0, 300) : 'Refund failed',
        },
      });
      throw new ConflictException('The refund failed at the payment provider');
    }

    await this.prisma.$transaction(async (tx) => {
      await this.ledger.lockOrder(tx, order.id);
      const { rates } = await this.fx.snapshot(order.currency, tx);
      await tx.payment.update({
        where: { id: refund.id },
        data: {
          status: 'SUCCEEDED',
          paidAt: new Date(),
          providerRef: result.providerRef,
          unitsPerUsd: rates[order.currency] ?? '1',
          amountUsdMinor: convertMinor(amount, order.currency, 'USD', rates),
        },
      });
      await this.ledger.post(tx, {
        kind: 'REFUND',
        key: `refund:${refund.id}`,
        orderId: order.id,
        paymentId: refund.id,
        currency: order.currency,
        rates,
        description: `Refund ${refund.reference ?? ''}: ${dto.reason}`,
        lines: [
          {
            account: 'BUYER_ESCROW',
            companyId: order.buyerCompanyId,
            direction: 'DEBIT',
            amountMinor: amount,
          },
          { account: 'PLATFORM_CASH', companyId: null, direction: 'CREDIT', amountMinor: amount },
        ],
      });
    });
    await this.notifyCompany(order.buyerCompanyId, `${order.code}: refund issued`, dto.reason, {
      orderCode: order.code,
    });
    await this.audit.log({
      actorUserId: adminId,
      action: 'finance.refund',
      entityType: 'Payment',
      entityId: refund.id,
      metadata: { amountMinor: dto.amountMinor, reason: dto.reason },
    });
  }

  // ── Views ─────────────────────────────────────────────────────────────────

  private payoutsView(
    order: {
      code: string;
      currency: Currency;
      manufacturerUnitPriceMinor: number;
      quantity: number;
      commissionBps: number;
      commissionMinor: bigint;
    },
    releases: Prisma.OrderReleaseGetPayload<{ include: { payout: true } }>[],
  ): ManufacturerPayouts {
    const released = releases.filter((r) => r.status === 'RELEASED' || r.status === 'PAID');
    return {
      orderCode: order.code,
      currency: order.currency,
      totalMinor: n(BigInt(order.manufacturerUnitPriceMinor) * BigInt(order.quantity)),
      commissionBps: order.commissionBps,
      commissionMinor: n(order.commissionMinor),
      netMinor: n(
        BigInt(order.manufacturerUnitPriceMinor) * BigInt(order.quantity) - order.commissionMinor,
      ),
      releasedMinor: n(released.reduce((a, r) => a + r.manufacturerMinor, 0n)),
      paidMinor: n(
        releases.filter((r) => r.status === 'PAID').reduce((a, r) => a + r.manufacturerMinor, 0n),
      ),
      schedule: releases.map((r) => ({
        id: r.id,
        trigger: r.trigger,
        bps: r.bps,
        amountMinor: n(r.manufacturerMinor),
        status: r.status,
        dueAt: iso(r.dueAt),
        releasedAt: iso(r.releasedAt),
        paidAt: iso(r.paidAt),
      })),
      payouts: releases.flatMap((r) =>
        r.payout
          ? [
              {
                reference: r.payout.reference ?? r.payout.id,
                amountMinor: n(r.payout.amountMinor),
                currency: r.payout.currency,
                settlementCurrency: r.payout.settlementCurrency,
                settlementAmountMinor:
                  r.payout.settlementAmountMinor === null
                    ? null
                    : n(r.payout.settlementAmountMinor),
                paidAt: iso(r.payout.paidAt),
              },
            ]
          : [],
      ),
    };
  }

  private readonly releaseOrder = {
    orderBy: { createdAt: 'asc' as const },
    include: { payout: true },
  };

  async manufacturerView(actor: ChatActor, code: string): Promise<ManufacturerPayouts> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) !== 'MANUFACTURER')
      throw new ForbiddenException('This is the factory’s view');
    const releases = await this.prisma.orderRelease.findMany({
      where: { orderId: order.id },
      ...this.releaseOrder,
    });
    return this.payoutsView(order, sortReleases(releases));
  }

  /** Every order's payout schedule for the signed-in factory. */
  async manufacturerOverview(actor: ChatActor): Promise<ManufacturerPayouts[]> {
    if (actorOf(actor) !== 'MANUFACTURER' || !actor.manufacturerProfileId)
      throw new ForbiddenException('Factories only');
    const orders = await this.prisma.order.findMany({
      where: { manufacturerProfileId: actor.manufacturerProfileId, releases: { some: {} } },
      orderBy: { createdAt: 'desc' },
      select: {
        code: true,
        currency: true,
        manufacturerUnitPriceMinor: true,
        quantity: true,
        commissionBps: true,
        commissionMinor: true,
        releases: this.releaseOrder,
      },
    });
    return orders.map((o) => this.payoutsView(o, sortReleases(o.releases)));
  }

  async orderFinance(code: string): Promise<OrderFinance> {
    const order = await this.prisma.order.findUnique({
      where: { code },
      include: {
        buyerCompany: {
          select: { legalName: true, buyerProfile: { select: { publicCode: true } } },
        },
        manufacturerProfile: {
          select: { publicCode: true, company: { select: { legalName: true } } },
        },
        releases: { orderBy: { createdAt: 'asc' } },
        payments: {
          orderBy: { createdAt: 'asc' },
          include: { proofFile: { select: { storageKey: true, originalFilename: true } } },
        },
        ledgerTransactions: {
          orderBy: { postedAt: 'asc' },
          include: { entries: { include: { account: { select: { type: true } } } } },
        },
      },
    });
    if (!order) throw new NotFoundException('Order not found');
    const position = await this.ledger.orderPosition(order.id);
    const buyerTotal = BigInt(order.buyerUnitPriceMinor) * BigInt(order.quantity);
    const manufacturerTotal = BigInt(order.manufacturerUnitPriceMinor) * BigInt(order.quantity);
    const sumPayments = (purposes: string[]) =>
      order.payments
        .filter((p) => purposes.includes(p.purpose) && p.status === 'SUCCEEDED')
        .reduce((a, p) => a + p.amountMinor, 0n);
    return {
      orderCode: order.code,
      status: order.status,
      currency: order.currency,
      buyer: {
        code: order.buyerCompany.buyerProfile?.publicCode ?? '',
        name: order.buyerCompany.legalName,
      },
      manufacturer: {
        code: order.manufacturerProfile.publicCode,
        name: order.manufacturerProfile.company.legalName,
      },
      buyerTotalMinor: n(buyerTotal),
      manufacturerTotalMinor: n(manufacturerTotal),
      marginMinor: n(buyerTotal - manufacturerTotal + order.commissionMinor),
      markupMinor: n(buyerTotal - manufacturerTotal),
      factoryCommissionMinor: n(order.commissionMinor),
      factoryCommissionBps: order.commissionBps,
      repeatOrder: order.repeatOrder,
      receivedMinor: n(sumPayments(['DEPOSIT', 'BALANCE'])),
      escrowMinor: n(position.escrow),
      releasedMinor: n(position.releasedToPayable),
      commissionMinor: n(position.revenue),
      payableMinor: n(position.payable),
      paidOutMinor: n(position.paidOut),
      refundedMinor: n(sumPayments(['REFUND'])),
      payments: await Promise.all(
        order.payments.map(async (p) => ({
          id: p.id,
          reference: p.reference ?? p.id,
          direction: p.direction,
          purpose: p.purpose,
          method: p.method,
          provider: p.provider ?? 'manual',
          amountMinor: n(p.amountMinor),
          currency: p.currency,
          status: p.status,
          paidAt: iso(p.paidAt),
          proofUrl: p.proofFile
            ? await this.storage.presignDownload(
                p.proofFile.storageKey,
                p.proofFile.originalFilename,
              )
            : null,
        })),
      ),
      releases: sortReleases(order.releases).map((r) => ({
        id: r.id,
        trigger: r.trigger,
        bps: r.bps,
        amountMinor: n(r.manufacturerMinor),
        buyerMinor: n(r.buyerMinor),
        commissionMinor: n(r.commissionMinor),
        status: r.status,
        dueAt: iso(r.dueAt),
        releasedAt: iso(r.releasedAt),
        paidAt: iso(r.paidAt),
        fundedEnough: position.escrow >= r.buyerMinor,
      })),
      ledger: order.ledgerTransactions.map((t) => ({
        id: t.id,
        kind: t.kind,
        description: t.description,
        currency: t.currency,
        postedAt: t.postedAt.toISOString(),
        unitsPerUsd: t.unitsPerUsd.toString(),
        amountUsdMinor: n(t.amountUsdMinor),
        entries: t.entries.map((e) => ({
          account: e.account.type,
          direction: e.direction,
          amountMinor: n(e.amountMinor),
        })),
      })),
    };
  }

  async inbox(): Promise<FinanceInbox> {
    const party = {
      select: {
        legalName: true,
        buyerProfile: { select: { publicCode: true } },
        manufacturerProfile: { select: { publicCode: true } },
      },
    } as const;
    const [payments, releases] = await Promise.all([
      this.prisma.payment.findMany({
        where: { direction: 'INBOUND', provider: 'manual', status: { in: [...OPEN] } },
        orderBy: [{ status: 'desc' }, { createdAt: 'asc' }],
        include: {
          order: { select: { code: true, buyerCompany: party } },
          capacityBooking: { select: { code: true, buyerCompany: party } },
        },
      }),
      this.prisma.orderRelease.findMany({
        where: { status: { in: ['DUE', 'RELEASED'] } },
        orderBy: { dueAt: 'asc' },
        include: {
          order: {
            select: {
              id: true,
              code: true,
              manufacturerProfile: {
                select: { publicCode: true, company: { select: { legalName: true } } },
              },
            },
          },
        },
      }),
    ]);
    const escrow = new Map<string, bigint>();
    for (const r of releases)
      if (!escrow.has(r.orderId))
        escrow.set(r.orderId, (await this.ledger.orderPosition(r.orderId)).escrow);
    const factory = (r: (typeof releases)[number]) => ({
      code: r.order.manufacturerProfile.publicCode,
      name: r.order.manufacturerProfile.company.legalName,
    });
    return {
      toConfirm: payments.flatMap((p) => {
        const owner = p.order ?? p.capacityBooking;
        if (!owner) return [];
        return [
          {
            paymentId: p.id,
            orderCode: owner.code,
            reference: p.reference ?? p.id,
            purpose: p.purpose,
            method: p.method,
            amountMinor: n(p.amountMinor),
            currency: p.currency,
            status: p.status,
            buyer: {
              code: owner.buyerCompany.buyerProfile?.publicCode ?? '',
              name: owner.buyerCompany.legalName,
            },
            payerReference: p.payerReference,
            createdAt: p.createdAt.toISOString(),
          },
        ];
      }),
      toRelease: releases
        .filter((r) => r.status === 'DUE')
        .map((r) => ({
          releaseId: r.id,
          orderCode: r.order.code,
          trigger: r.trigger,
          manufacturerMinor: n(r.manufacturerMinor),
          buyerMinor: n(r.buyerMinor),
          currency: r.currency,
          manufacturer: factory(r),
          fundedEnough: (escrow.get(r.orderId) ?? 0n) >= r.buyerMinor,
          dueAt: iso(r.dueAt),
        })),
      toPay: releases
        .filter((r) => r.status === 'RELEASED')
        .map((r) => ({
          releaseId: r.id,
          orderCode: r.order.code,
          manufacturerMinor: n(r.manufacturerMinor),
          currency: r.currency,
          manufacturer: factory(r),
          releasedAt: iso(r.releasedAt),
        })),
    };
  }

  /** Trial balance and reconciliation: debits = credits, cash = escrow + payable + revenue, cash = payments in − out. */
  async balances(): Promise<LedgerBalances> {
    const partners = new Map(
      (
        await this.prisma.logisticsPartner.findMany({
          select: { id: true, code: true, name: true },
        })
      ).map((p) => [p.id, p]),
    );
    const [accounts, rates, companies, payments] = await Promise.all([
      this.ledger.balances(),
      this.fx.rates(),
      this.prisma.company.findMany({
        select: {
          id: true,
          legalName: true,
          buyerProfile: { select: { publicCode: true } },
          manufacturerProfile: { select: { publicCode: true } },
        },
      }),
      this.prisma.payment.groupBy({
        by: ['currency', 'direction'],
        where: { status: 'SUCCEEDED' },
        _sum: { amountMinor: true },
      }),
    ]);
    const byId = new Map(companies.map((c) => [c.id, c]));
    const currencies = [...new Set(accounts.map((a) => a.currency))].sort();
    const sum = (currency: Currency, type: string) =>
      accounts
        .filter((a) => a.currency === currency && a.type === type)
        .reduce((x, a) => x + a.balance, 0n);
    const usd = (type: string) =>
      accounts
        .filter((a) => a.type === type)
        .reduce(
          (x, a) =>
            x + (rates[a.currency] ? convertMinor(a.balance, a.currency, 'USD', rates) : 0n),
          0n,
        );
    return {
      currencies: currencies.map((currency) => {
        const debits = accounts
          .filter((a) => a.currency === currency)
          .reduce((x, a) => x + a.debit, 0n);
        const credits = accounts
          .filter((a) => a.currency === currency)
          .reduce((x, a) => x + a.credit, 0n);
        const cash = sum(currency, 'PLATFORM_CASH');
        const escrow = sum(currency, 'BUYER_ESCROW');
        // Factories and logistics partners alike: what GarmentGate owes.
        const payable = sum(currency, 'MANUFACTURER_PAYABLE') + sum(currency, 'PARTNER_PAYABLE');
        const revenue = sum(currency, 'PLATFORM_REVENUE');
        const paymentsIn =
          payments.find((p) => p.currency === currency && p.direction === 'INBOUND')?._sum
            .amountMinor ?? 0n;
        const paymentsOut =
          payments.find((p) => p.currency === currency && p.direction === 'OUTBOUND')?._sum
            .amountMinor ?? 0n;
        return {
          currency,
          debitsMinor: n(debits),
          creditsMinor: n(credits),
          balanced: debits === credits,
          cashMinor: n(cash),
          escrowMinor: n(escrow),
          payableMinor: n(payable),
          revenueMinor: n(revenue),
          reconciled: cash === escrow + payable + revenue,
          paymentsNetMinor: n(paymentsIn - paymentsOut),
          cashMatchesPayments: cash === paymentsIn - paymentsOut,
        };
      }),
      accounts: accounts.map((a) => {
        const company = a.companyId ? byId.get(a.companyId) : undefined;
        const partner = a.logisticsPartnerId ? partners.get(a.logisticsPartnerId) : undefined;
        return {
          type: a.type,
          currency: a.currency,
          party: partner
            ? { code: partner.code, name: partner.name }
            : company
              ? {
                  code:
                    company.buyerProfile?.publicCode ??
                    company.manufacturerProfile?.publicCode ??
                    '',
                  name: company.legalName,
                }
              : null,
          balanceMinor: n(a.balance),
        };
      }),
      totalsUsdMinor: {
        cash: n(usd('PLATFORM_CASH')),
        escrow: n(usd('BUYER_ESCROW')),
        payable: n(usd('MANUFACTURER_PAYABLE') + usd('PARTNER_PAYABLE')),
        revenue: n(usd('PLATFORM_REVENUE')),
      },
      rates: Object.fromEntries(Object.entries(rates)),
    };
  }

  // ── Notifications ─────────────────────────────────────────────────────────

  private async notifyCompany(
    companyId: string,
    title: string,
    body: string,
    data: Record<string, string>,
  ): Promise<void> {
    await this.notifier.notify({
      to: { companyId },
      type: 'PAYMENT_UPDATE',
      title,
      body,
      link: data,
    });
  }

  private async notifyAdmins(
    title: string,
    body: string,
    data: Record<string, string>,
  ): Promise<void> {
    await this.notifier.notify({ to: 'ADMINS', type: 'PAYMENT_UPDATE', title, body, link: data });
  }
}

const TRIGGER_ORDER: readonly ReleaseTrigger[] = [
  'PRODUCTION_START',
  'QC_PASSED',
  'SHIPPED',
  'DELIVERED',
  'COMPLETED',
];
function sortReleases<T extends { trigger: ReleaseTrigger }>(rows: T[]): T[] {
  return [...rows].sort(
    (a, b) => TRIGGER_ORDER.indexOf(a.trigger) - TRIGGER_ORDER.indexOf(b.trigger),
  );
}
