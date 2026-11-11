var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BUYER_DOCUMENTS, canAdvanceShipment, documentTypesFor, ShipperModeSchema, convertMinor, filterContactDetails, isoDate, splitByWeights, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityForScrubbing } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { Notifier } from '../notifications/notifier.service.js';
import { actorOf, OrdersService } from '../orders/orders.service.js';
import { FxService } from '../payments/fx.service.js';
import { LedgerService } from '../payments/ledger.service.js';
import { PaymentsService } from '../payments/payments.service.js';
import { ShipmentsService } from './shipments.service.js';
const BUYER_MESSAGE = {
    IN_TRANSIT: 'Your goods are on their way with GarmentGate.',
    AT_DESTINATION: 'Your goods have arrived at the destination.',
    CUSTOMS: 'Your goods are clearing customs.',
    OUT_FOR_DELIVERY: 'Your goods are out for delivery.',
    DELIVERED: 'Your goods were delivered. Please confirm receipt on the order.',
    EXCEPTION: 'There is a delay with your shipment; GarmentGate is on it.',
};
let TrackingService = class TrackingService {
    prisma;
    orders;
    payments;
    ledger;
    fx;
    shipments;
    notifier;
    audit;
    config;
    constructor(prisma, orders, payments, ledger, fx, shipments, notifier, audit, config) {
        this.prisma = prisma;
        this.orders = orders;
        this.payments = payments;
        this.ledger = ledger;
        this.fx = fx;
        this.shipments = shipments;
        this.notifier = notifier;
        this.audit = audit;
        this.config = config;
    }
    async recordEvent(by, shipmentCode, legId, dto) {
        const s = await this.prisma.logisticsShipment.findUnique({
            where: { code: shipmentCode },
            include: {
                legs: { include: { partner: { select: { name: true } } } },
                orders: {
                    where: { active: true },
                    include: {
                        order: {
                            select: { manufacturerProfile: { select: { company: identityForScrubbing } } },
                        },
                    },
                },
            },
        });
        if (!s)
            throw new NotFoundException('Shipment not found');
        if (s.historical)
            throw new ConflictException('This is a historical shipment (shipped on the factory’s booking): it can’t change');
        if (s.status === 'CANCELLED' || s.status === 'DELIVERED')
            throw new ConflictException('This shipment is closed');
        const leg = legId ? s.legs.find((l) => l.id === legId) : null;
        if (legId && !leg)
            throw new NotFoundException('Leg not found');
        if (dto.status && !canAdvanceShipment(s.status, dto.status))
            throw new ConflictException(`A ${s.status.toLowerCase()} shipment can’t become ${dto.status.toLowerCase()}`);
        if (!dto.status && !dto.legStatus && !dto.note && !dto.location)
            throw new BadRequestException('Say what happened');
        if (dto.status === 'IN_TRANSIT' && !s.departedAt)
            await this.depart(by.userId, s.id);
        const patterns = [
            ...s.orders.flatMap((o) => identityPatterns(identityOf(o.order.manufacturerProfile.company))),
            ...s.legs.flatMap((l) => l.partner
                ? identityPatterns({
                    legalName: l.partner.name,
                    tradeName: null,
                    website: null,
                    peopleNames: [],
                })
                : []),
        ];
        const occurredAt = dto.occurredAt ? new Date(dto.occurredAt) : new Date();
        await this.prisma.$transaction(async (tx) => {
            await tx.shipmentEvent.create({
                data: {
                    shipmentId: s.id,
                    legId: leg?.id ?? null,
                    status: dto.status ?? null,
                    source: by.source,
                    location: dto.location ? filterContactDetails(dto.location).filtered : null,
                    publicNote: scrubText(dto.note, patterns),
                    internalNote: dto.note,
                    occurredAt,
                    createdById: by.userId,
                },
            });
            if (leg && dto.legStatus)
                await tx.shipmentLeg.update({
                    where: { id: leg.id },
                    data: {
                        status: dto.legStatus,
                        ...(dto.legStatus === 'IN_TRANSIT' && !leg.departedAt && { departedAt: occurredAt }),
                        ...(dto.legStatus === 'COMPLETED' && { arrivedAt: occurredAt }),
                    },
                });
            if (dto.status)
                await tx.logisticsShipment.update({
                    where: { id: s.id },
                    data: {
                        status: dto.status,
                        ...(dto.status === 'DELIVERED' && { deliveredAt: occurredAt }),
                    },
                });
            if (dto.status === 'DELIVERED')
                await tx.shipmentLeg.updateMany({
                    where: { shipmentId: s.id, status: { not: 'CANCELLED' } },
                    data: { status: 'COMPLETED' },
                });
        });
        if (dto.status)
            await this.tellBuyer(s.id, dto.status);
    }
    async depart(userId, shipmentId) {
        const s = await this.prisma.logisticsShipment.findUniqueOrThrow({
            where: { id: shipmentId },
            include: {
                legs: true,
                orders: {
                    where: { active: true },
                    include: {
                        order: {
                            select: {
                                id: true,
                                code: true,
                                status: true,
                                buyerCompanyId: true,
                                buyerUnitPriceMinor: true,
                                quantity: true,
                                depositBps: true,
                            },
                        },
                    },
                },
            },
        });
        const carriage = s.legs.filter((l) => l.kind !== 'FACTORY_TO_HUB' && l.kind !== 'HUB_HANDOVER' && l.status !== 'CANCELLED');
        if (carriage.some((l) => !l.partnerId || l.costMinor === null))
            throw new ConflictException('Give every leg a partner and a cost before the goods leave');
        for (const { order } of s.orders) {
            if (order.status !== 'READY_TO_SHIP')
                throw new ConflictException(`${order.code} isn’t ready to ship`);
            if (!(await this.payments.balancePaid(order)))
                throw new ConflictException(`${order.code}: waiting for the buyer’s balance`);
            const quote = await this.prisma.logisticsQuote.findFirst({
                where: { orderId: order.id, status: 'ACCEPTED' },
            });
            const { paid } = await this.payments.orderChargeState(order.id, 'LOGISTICS');
            if (!quote || paid < quote.totalMinor)
                throw new ConflictException(`${order.code}: waiting for the buyer’s shipping payment`);
            if ((await this.payments.feesDue(order.id)) > 0n)
                throw new ConflictException(`${order.code}: waiting for the buyer’s sample or inspection fees`);
        }
        const totalCost = carriage.reduce((a, l) => a + (l.costMinor ?? 0n), 0n);
        const orderCosts = splitByWeights(totalCost, s.orders.map((o) => o.costShareMinor));
        await this.prisma.$transaction(async (tx) => {
            const { count } = await tx.logisticsShipment.updateMany({
                where: { id: s.id, departedAt: null },
                data: { departedAt: new Date() },
            });
            if (count !== 1)
                return;
            const { rates } = await this.fx.snapshot(s.currency, tx);
            for (const [i, { order }] of s.orders.entries()) {
                await this.ledger.lockOrder(tx, order.id);
                const paid = await this.logisticsPaid(tx, order.id);
                const cost = orderCosts[i] ?? 0n;
                const perLeg = splitByWeights(cost, carriage.map((l) => l.costMinor ?? 0n));
                const byPartner = new Map();
                carriage.forEach((l, j) => {
                    if (l.partnerId)
                        byPartner.set(l.partnerId, (byPartner.get(l.partnerId) ?? 0n) + (perLeg[j] ?? 0n));
                });
                const margin = paid - cost;
                if (paid === 0n && cost === 0n)
                    continue;
                await this.ledger.post(tx, {
                    kind: 'RELEASE',
                    key: `logistics-depart:${s.id}:${order.id}`,
                    orderId: order.id,
                    currency: s.currency,
                    rates,
                    description: `${s.code}: shipping for ${order.code} (partner costs and GarmentGate's margin)`,
                    lines: [
                        {
                            account: 'BUYER_ESCROW',
                            companyId: order.buyerCompanyId,
                            direction: 'DEBIT',
                            amountMinor: paid,
                        },
                        ...[...byPartner].map(([partnerId, amount]) => ({
                            account: 'PARTNER_PAYABLE',
                            companyId: null,
                            logisticsPartnerId: partnerId,
                            direction: 'CREDIT',
                            amountMinor: amount,
                        })),
                        margin >= 0n
                            ? {
                                account: 'PLATFORM_REVENUE',
                                companyId: null,
                                direction: 'CREDIT',
                                amountMinor: margin,
                            }
                            : {
                                account: 'PLATFORM_REVENUE',
                                companyId: null,
                                direction: 'DEBIT',
                                amountMinor: -margin,
                            },
                    ],
                });
            }
            await tx.logisticsShipment.update({
                where: { id: s.id },
                data: { partnerCostMinor: totalCost },
            });
        });
        for (const { order } of s.orders)
            await this.orders.advance(order.id, 'SHIPPED', s.mode === 'HANDOVER'
                ? `Handed over to the buyer’s forwarder at the GarmentGate hub (${s.code})`
                : `Left the hub on GarmentGate shipment ${s.code}`);
        await this.audit.log({
            actorUserId: userId,
            action: 'logistics.shipment_departed',
            entityType: 'LogisticsShipment',
            entityId: s.id,
        });
    }
    async logisticsPaid(tx, orderId) {
        const sum = await tx.payment.aggregate({
            where: { orderId, purpose: 'LOGISTICS', direction: 'INBOUND', status: 'SUCCEEDED' },
            _sum: { amountMinor: true },
        });
        return sum._sum.amountMinor ?? 0n;
    }
    async tellBuyer(shipmentId, status) {
        const message = BUYER_MESSAGE[status];
        if (!message)
            return;
        const s = await this.prisma.logisticsShipment.findUniqueOrThrow({
            where: { id: shipmentId },
            include: {
                orders: { where: { active: true }, include: { order: { select: { code: true } } } },
            },
        });
        for (const o of s.orders)
            await this.notifier.notify({
                to: { companyId: s.buyerCompanyId },
                type: 'ORDER_UPDATE',
                title: `${o.order.code}: ${status.replaceAll('_', ' ').toLowerCase()}`,
                body: message,
                link: { orderCode: o.order.code },
            });
    }
    async payLeg(adminId, code, legId) {
        const s = await this.prisma.logisticsShipment.findUnique({
            where: { code },
            include: { legs: true },
        });
        if (!s)
            throw new NotFoundException('Shipment not found');
        const leg = s.legs.find((l) => l.id === legId);
        if (!leg)
            throw new NotFoundException('Leg not found');
        if (!s.departedAt)
            throw new ConflictException('Partners are paid once the goods have left');
        if (!leg.partnerId || leg.costMinor === null)
            throw new ConflictException('This leg has no partner cost');
        if (leg.paidAt)
            throw new ConflictException('Already paid');
        const partnerId = leg.partnerId;
        const amount = leg.costMinor;
        await this.prisma.$transaction(async (tx) => {
            const { count } = await tx.shipmentLeg.updateMany({
                where: { id: leg.id, paidAt: null },
                data: { paidAt: new Date() },
            });
            if (count !== 1)
                throw new ConflictException('Already paid');
            const { rates } = await this.fx.snapshot(s.currency, tx);
            const payout = await tx.payment.create({
                data: {
                    logisticsShipmentId: s.id,
                    direction: 'OUTBOUND',
                    purpose: 'PAYOUT',
                    amountMinor: amount,
                    currency: s.currency,
                    method: 'BANK_TRANSFER',
                    provider: 'manual',
                    reference: `OUT-${s.code}-${String(leg.sequence)}`,
                    status: 'SUCCEEDED',
                    paidAt: new Date(),
                    confirmedById: adminId,
                    unitsPerUsd: rates[s.currency] ?? '1',
                    amountUsdMinor: convertMinor(amount, s.currency, 'USD', rates),
                },
            });
            await this.ledger.post(tx, {
                kind: 'PAYOUT',
                key: `logistics-payout:${leg.id}`,
                paymentId: payout.id,
                currency: s.currency,
                rates,
                description: `${s.code} leg ${String(leg.sequence)}: paid to the partner`,
                lines: [
                    {
                        account: 'PARTNER_PAYABLE',
                        companyId: null,
                        logisticsPartnerId: partnerId,
                        direction: 'DEBIT',
                        amountMinor: amount,
                    },
                    { account: 'PLATFORM_CASH', companyId: null, direction: 'CREDIT', amountMinor: amount },
                ],
            });
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'logistics.partner_paid',
            entityType: 'ShipmentLeg',
            entityId: leg.id,
            metadata: { amountMinor: Number(amount) },
        });
    }
    async buyerTracking(actor, code) {
        const shipment = await this.buyerShipment(actor, code);
        if (!shipment)
            return null;
        const s = await this.prisma.logisticsShipment.findUniqueOrThrow({
            where: { id: shipment.id },
            include: {
                legs: { orderBy: { sequence: 'asc' } },
                events: { orderBy: { occurredAt: 'desc' } },
                claims: { where: { orderId: shipment.orderId }, orderBy: { createdAt: 'asc' } },
            },
        });
        const main = s.legs.find((l) => l.kind === 'PORT_TO_PORT');
        const label = (l) => l.startsWith('HUB-') ? 'GarmentGate hub' : l === 'Buyer’s forwarder' ? 'Your forwarder' : l;
        return {
            shipmentCode: s.code,
            status: s.status,
            mode: s.mode,
            originCountry: s.originCountry,
            destinationCountry: s.destinationCountry,
            destinationPort: s.destinationPort,
            etd: s.etd ? isoDate(s.etd) : null,
            eta: s.eta ? isoDate(s.eta) : null,
            departedAt: s.departedAt?.toISOString() ?? null,
            deliveredAt: s.deliveredAt?.toISOString() ?? null,
            containerNumber: s.departedAt ? (main?.containerNumber ?? null) : null,
            transportDocNo: s.departedAt ? (main?.transportDocNo ?? null) : null,
            legs: s.legs.map((l) => ({
                kind: l.kind,
                status: l.status,
                from: label(l.fromLabel),
                to: label(l.toLabel),
            })),
            events: s.events.map((e) => ({
                occurredAt: e.occurredAt.toISOString(),
                status: e.status,
                location: e.location,
                note: e.publicNote,
            })),
            documents: s.departedAt
                ? documentTypesFor(ShipperModeSchema.parse(s.shipperMode), {
                    mode: s.mode,
                    insured: s.insuranceMinor > 0n,
                }).filter((t) => BUYER_DOCUMENTS.includes(t))
                : [],
            papers: await this.shipments.buyerPapers(s.id),
            claims: s.claims.map((c) => ({
                code: c.code,
                type: c.type,
                status: c.status,
                note: c.publicNote,
                compensationMinor: c.status === 'SETTLED' ? Number(c.compensationMinor) : null,
                currency: c.currency,
                createdAt: c.createdAt.toISOString(),
            })),
        };
    }
    async buyerDocument(actor, code, type) {
        const shipment = await this.buyerShipment(actor, code);
        if (!shipment)
            throw new NotFoundException('No shipment yet');
        if (!shipment.departedAt)
            throw new ConflictException('Documents are issued once the goods have left');
        if (!BUYER_DOCUMENTS.includes(type))
            throw new ForbiddenException();
        return this.shipments.document(actor.userId, shipment.code, type);
    }
    async buyerShipment(actor, code) {
        const order = await this.orders.load(actor, code);
        if (actorOf(actor) !== 'BUYER')
            throw new ForbiddenException('Tracking is the buyer’s view');
        const link = await this.prisma.logisticsShipmentOrder.findFirst({
            where: { orderId: order.id, active: true },
            include: { shipment: { select: { id: true, code: true, departedAt: true } } },
        });
        return link ? { ...link.shipment, orderId: order.id } : null;
    }
};
TrackingService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        OrdersService,
        PaymentsService,
        LedgerService,
        FxService,
        ShipmentsService,
        Notifier,
        AuditService,
        ConfigService])
], TrackingService);
export { TrackingService };
//# sourceMappingURL=tracking.service.js.map