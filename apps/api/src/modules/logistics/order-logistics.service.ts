import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  type BuyerOrderLogistics,
  type BuyerShippingOption,
  dutyRateFor,
  estimatedCargo,
  type HandoverRequestDto,
  insuranceRequired,
  isoDate,
  landedCost,
  modesFor,
  type OrderStatus,
  type PaymentMethod,
  type PaymentStart,
  ShippingIncotermSchema,
  type ShippingQuoteRequest,
} from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import type { LogisticsQuote } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import type { ChatActor } from '../chat/chat-actor.service.js';
import type { OrderRow } from '../orders/order-views.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { FreightQuotesService } from './freight-quotes.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';

/** Shipping can be chosen until the goods leave. */
export const OPEN_FOR_SHIPPING: readonly OrderStatus[] = [
  'DRAFT',
  'SAMPLING',
  'SAMPLE_APPROVED',
  'DEPOSIT_PENDING',
  'IN_PRODUCTION',
  'QC',
  'READY_TO_SHIP',
];
const DAY = 86_400_000;
const n = (v: bigint | number) => Number(v);

/**
 * The buyer's shipping step for an order: GarmentGate prices each mode from the rate cards
 * (plus margin and insurance), shows a landed-cost estimate, and charges the chosen option
 * into escrow before the goods ship. Buyers never see partners, costs or margins.
 */
@Injectable()
export class OrderLogisticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly orders: OrdersService,
    private readonly quotes: FreightQuotesService,
    private readonly settings: LogisticsSettingsService,
    private readonly payments: PaymentsService,
    private readonly audit: AuditService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async view(actor: ChatActor, code: string): Promise<BuyerOrderLogistics> {
    const order = await this.buyerOrder(actor, code);
    const [accepted, state, cargo] = await Promise.all([
      this.prisma.logisticsQuote.findFirst({ where: { orderId: order.id, status: 'ACCEPTED' } }),
      this.payments.orderChargeState(order.id, 'LOGISTICS'),
      this.cargo(order),
    ]);
    const total = accepted?.totalMinor ?? 0n;
    return {
      available: OPEN_FOR_SHIPPING.includes(order.status),
      editable: OPEN_FOR_SHIPPING.includes(order.status) && state.paid === 0n && !state.pending,
      destinationCountry: order.destinationCountry,
      destinationPort: order.destinationPort,
      hsCode: order.hsCode,
      cargo,
      accepted: accepted ? await this.option(order, accepted) : null,
      paidMinor: n(state.paid),
      outstandingMinor: n(total > state.paid ? total - state.paid : 0n),
      pending: state.pending,
      forwarder:
        accepted?.mode === 'HANDOVER' && accepted.forwarderName
          ? {
              name: accepted.forwarderName,
              contact: accepted.forwarderContact ?? '',
              reference: accepted.forwarderReference,
            }
          : null,
    };
  }

  /** Prices every mode the terms allow (the cheapest partner for each) and stores the offers. */
  async quote(
    actor: ChatActor,
    code: string,
    dto: ShippingQuoteRequest,
  ): Promise<BuyerShippingOption[]> {
    const order = await this.buyerOrder(actor, code);
    await this.assertEditable(order);
    const settings = await this.settings.get();
    const cargo = await this.cargo(order);
    const origin = order.manufacturerProfile.company.country;
    const insured = dto.insured || insuranceRequired(dto.incoterm);
    const goods = BigInt(order.buyerUnitPriceMinor) * BigInt(order.quantity);
    const dutyRates = order.hsCode
      ? await this.prisma.dutyRate.findMany({
          where: { destinationCountry: dto.destinationCountry },
        })
      : [];
    const duty = order.hsCode ? dutyRateFor(dutyRates, order.hsCode, dto.destinationCountry) : null;
    const shipDate = isoDate(
      new Date(Math.max(order.requestedShipDate?.getTime() ?? 0, Date.now() + DAY)),
    );

    const offers: Omit<LogisticsQuote, 'id' | 'createdAt' | 'acceptedAt' | 'status' | 'orderId'>[] =
      [];
    for (const mode of modesFor(dto.incoterm, origin, dto.destinationCountry)) {
      const [best] = await this.quotes.quote({
        mode,
        originCountry: origin,
        originPort: null,
        destinationCountry: dto.destinationCountry,
        destinationPort: dto.destinationPort,
        weightGrams: cargo.weightGrams,
        volumeLitres: cargo.volumeLitres,
        goodsValueMinor: insured ? Number(goods) : 0,
        currency: order.currency,
        shipDate,
      });
      if (!best) continue;
      const freight = BigInt(best.freightPriceMinor);
      const insurance = insured ? BigInt(best.insurancePremiumMinor) : 0n;
      let dutyEstimate = 0n;
      if (mode === 'DDP') {
        // GarmentGate pays the duty on a DDP shipment, so it must be estimable to offer one.
        if (!duty) continue;
        dutyEstimate = landedCost({
          goodsMinor: goods,
          freightMinor: freight,
          insuranceMinor: insurance,
          dutyRateBps: duty.rateBps,
          destinationCountry: dto.destinationCountry,
        }).dutyMinor;
      }
      offers.push({
        mode,
        incoterm: dto.incoterm,
        originCountry: origin,
        destinationCountry: dto.destinationCountry,
        destinationPort: dto.destinationPort,
        insured,
        weightGrams: cargo.weightGrams,
        volumeLitres: cargo.volumeLitres,
        cargoEstimated: cargo.estimated,
        provider: best.provider,
        rateCardId: best.rateCardId,
        partnerId: best.partner?.id ?? null,
        marginRuleName: best.marginRule,
        currency: order.currency,
        partnerCostMinor: BigInt(best.partnerCostMinor),
        freightMinor: freight,
        insuranceMinor: insurance,
        dutyEstimateMinor: dutyEstimate,
        totalMinor: freight + insurance + dutyEstimate,
        transitDaysMin: best.transitDaysMin,
        transitDaysMax: best.transitDaysMax,
        validUntil: new Date(Date.now() + settings.quoteValidityDays * DAY),
        consolidationId: null,
        forwarderName: null,
        forwarderContact: null,
        forwarderReference: null,
      });
    }

    const saved = await this.prisma.$transaction(async (tx) => {
      // Older offers stop being acceptable once the buyer asks again.
      await tx.logisticsQuote.updateMany({
        where: { orderId: order.id, status: 'OFFERED' },
        data: { status: 'SUPERSEDED' },
      });
      return Promise.all(
        offers.map((data) => tx.logisticsQuote.create({ data: { ...data, orderId: order.id } })),
      );
    });
    return Promise.all(saved.map((q) => this.option(order, q)));
  }

  /** Locks in one offer: it becomes the order's shipping terms and the charge to pay. */
  async accept(actor: ChatActor, code: string, quoteId: string): Promise<void> {
    const order = await this.buyerOrder(actor, code);
    await this.assertEditable(order);
    await this.prisma.$transaction(async (tx) => {
      const quote = await tx.logisticsQuote.findFirst({
        where: { id: quoteId, orderId: order.id, status: 'OFFERED' },
      });
      if (!quote) throw new NotFoundException('That shipping option is no longer available');
      if (quote.validUntil.getTime() < Date.now())
        throw new ConflictException('That price has expired: get new shipping prices');
      await tx.logisticsQuote.updateMany({
        where: { orderId: order.id, status: 'ACCEPTED' },
        data: { status: 'SUPERSEDED' },
      });
      await tx.logisticsQuote.update({
        where: { id: quote.id },
        data: { status: 'ACCEPTED', acceptedAt: new Date() },
      });
      // The chosen option sets the order's delivery terms (the purchase order follows them).
      await tx.order.update({
        where: { id: order.id },
        data: {
          incoterm: quote.incoterm,
          destinationCountry: quote.destinationCountry,
          destinationPort: quote.destinationPort,
        },
      });
    });
    await this.audit.log({
      actorUserId: actor.userId,
      action: 'logistics.quote_accepted',
      entityType: 'Order',
      entityId: order.id,
      metadata: { quoteId },
    });
  }

  /**
   * The buyer's own forwarder collects at GarmentGate's hub (FCA). It replaces any chosen
   * freight option; nothing to pay. The forwarder's details stay with GarmentGate staff, who
   * arrange the collection: the factory only ever delivers to the hub.
   */
  async handover(actor: ChatActor, code: string, dto: HandoverRequestDto): Promise<void> {
    const order = await this.buyerOrder(actor, code);
    await this.assertEditable(order);
    const cargo = await this.cargo(order);
    await this.prisma.$transaction(async (tx) => {
      await tx.logisticsQuote.updateMany({
        where: { orderId: order.id, status: { in: ['OFFERED', 'ACCEPTED'] } },
        data: { status: 'SUPERSEDED' },
      });
      await tx.logisticsQuote.create({
        data: {
          orderId: order.id,
          status: 'ACCEPTED',
          acceptedAt: new Date(),
          mode: 'HANDOVER',
          incoterm: 'FCA',
          originCountry: order.manufacturerProfile.company.country,
          destinationCountry: dto.destinationCountry,
          destinationPort: null,
          insured: false,
          weightGrams: cargo.weightGrams,
          volumeLitres: cargo.volumeLitres,
          cargoEstimated: cargo.estimated,
          provider: 'HANDOVER',
          currency: order.currency,
          partnerCostMinor: 0n,
          freightMinor: 0n,
          insuranceMinor: 0n,
          totalMinor: 0n,
          transitDaysMin: 0,
          transitDaysMax: 0,
          // Nothing is priced, so nothing expires.
          validUntil: new Date(Date.now() + 3650 * DAY),
          forwarderName: dto.forwarderName,
          forwarderContact: dto.forwarderContact,
          forwarderReference: dto.forwarderReference,
        },
      });
      await tx.order.update({
        where: { id: order.id },
        data: {
          incoterm: 'FCA',
          destinationCountry: dto.destinationCountry,
          destinationPort: null,
        },
      });
    });
    await this.audit.log({
      actorUserId: actor.userId,
      action: 'logistics.handover_chosen',
      entityType: 'Order',
      entityId: order.id,
      metadata: { forwarder: dto.forwarderName },
    });
  }

  async pay(actor: ChatActor, code: string, method: PaymentMethod): Promise<PaymentStart> {
    const order = await this.buyerOrder(actor, code);
    if (!OPEN_FOR_SHIPPING.includes(order.status))
      throw new ConflictException('This order has already shipped');
    const quote = await this.prisma.logisticsQuote.findFirst({
      where: { orderId: order.id, status: 'ACCEPTED' },
    });
    if (!quote) throw new ConflictException('Choose a shipping option first');
    const { paid } = await this.payments.orderChargeState(order.id, 'LOGISTICS');
    return this.payments.startOrderCharge(order, 'LOGISTICS', quote.totalMinor - paid, method);
  }

  /** Staff record the order's HS code (documents, duty estimates). */
  async setHsCode(adminId: string, code: string, hsCode: string): Promise<void> {
    const { count } = await this.prisma.order.updateMany({ where: { code }, data: { hsCode } });
    if (count !== 1) throw new NotFoundException('Order not found');
    await this.audit.log({
      actorUserId: adminId,
      action: 'logistics.hs_code_set',
      entityType: 'Order',
      entityId: code,
      metadata: { hsCode },
    });
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  async buyerOrder(actor: ChatActor, code: string): Promise<OrderRow> {
    const order = await this.orders.load(actor, code);
    if (actorOf(actor) !== 'BUYER') throw new ForbiddenException('Shipping is chosen by the buyer');
    return order;
  }

  async assertEditable(order: OrderRow): Promise<void> {
    if (!OPEN_FOR_SHIPPING.includes(order.status))
      throw new ConflictException('This order has already shipped');
    const state = await this.payments.orderChargeState(order.id, 'LOGISTICS');
    if (state.paid > 0n || state.pending)
      throw new ConflictException('Shipping is already paid: ask GarmentGate to change it');
  }

  /** Packed cargo once the factory gave packing details; estimated from the quantity before. */
  async cargo(order: { id: string; quantity: number }) {
    const packing = await this.prisma.orderPacking.findUnique({ where: { orderId: order.id } });
    if (packing)
      return {
        weightGrams: packing.grossWeightGrams,
        volumeLitres: packing.volumeLitres,
        estimated: false,
      };
    const settings = await this.settings.get();
    return { ...estimatedCargo(order.quantity, settings), estimated: true };
  }

  /** The buyer's view of a stored quote, with its landed-cost estimate. */
  async option(order: OrderRow, q: LogisticsQuote): Promise<BuyerShippingOption> {
    const goods = BigInt(order.buyerUnitPriceMinor) * BigInt(order.quantity);
    const rates = order.hsCode
      ? await this.prisma.dutyRate.findMany({ where: { destinationCountry: q.destinationCountry } })
      : [];
    const duty = order.hsCode ? dutyRateFor(rates, order.hsCode, q.destinationCountry) : null;
    const landed = landedCost({
      goodsMinor: goods,
      freightMinor: q.freightMinor,
      insuranceMinor: q.insuranceMinor,
      dutyRateBps: duty?.rateBps ?? null,
      destinationCountry: q.destinationCountry,
    });
    return {
      quoteId: q.id,
      mode: q.mode,
      incoterm: ShippingIncotermSchema.parse(q.incoterm),
      destinationCountry: q.destinationCountry,
      destinationPort: q.destinationPort,
      currency: q.currency,
      freightMinor: n(q.freightMinor),
      insuranceMinor: n(q.insuranceMinor),
      dutyEstimateMinor: n(q.dutyEstimateMinor),
      totalMinor: n(q.totalMinor),
      transitDaysMin: q.transitDaysMin,
      transitDaysMax: q.transitDaysMax,
      validUntil: q.validUntil.toISOString(),
      landedCost: {
        goodsMinor: n(landed.goodsMinor),
        freightMinor: n(landed.freightMinor),
        insuranceMinor: n(landed.insuranceMinor),
        valuation: landed.valuation,
        dutyRateBps: landed.dutyRateBps,
        dutyMinor: n(landed.dutyMinor),
        totalMinor: n(landed.totalMinor),
        perPieceMinor: Math.ceil(n(landed.totalMinor) / order.quantity),
      },
    };
  }
}
