var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ConflictException, Injectable, NotFoundException, } from '@nestjs/common';
import { claimNetMinor, convertMinor, insuredValue, logisticsRevenue, settlementError, } from '@garmentgate/shared';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { identityForScrubbing } from '../catalog/catalog.queries.js';
import { identityOf, identityPatterns, scrubText } from '../catalog/public.serializer.js';
import { Notifier } from '../notifications/notifier.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { FxService } from '../payments/fx.service.js';
import { LedgerService } from '../payments/ledger.service.js';
const claimInclude = {
    shipment: { select: { code: true, mode: true } },
    order: {
        select: {
            code: true,
            buyerCompanyId: true,
            buyerCompany: { select: { buyerProfile: { select: { publicCode: true } } } },
        },
    },
    leg: {
        select: {
            id: true,
            sequence: true,
            costMinor: true,
            partnerId: true,
            partner: { select: { name: true } },
        },
    },
};
const DAY = 86_400_000;
let ClaimsService = class ClaimsService {
    prisma;
    ledger;
    fx;
    codes;
    notifier;
    audit;
    constructor(prisma, ledger, fx, codes, notifier, audit) {
        this.prisma = prisma;
        this.ledger = ledger;
        this.fx = fx;
        this.codes = codes;
        this.notifier = notifier;
        this.audit = audit;
    }
    async list() {
        const rows = await this.prisma.logisticsClaim.findMany({
            orderBy: { createdAt: 'desc' },
            include: claimInclude,
            take: 500,
        });
        return rows.map((c) => this.view(c));
    }
    async open(adminId, dto) {
        const order = await this.prisma.order.findUnique({
            where: { code: dto.orderCode },
            select: {
                id: true,
                code: true,
                quantity: true,
                buyerUnitPriceMinor: true,
                buyerCompanyId: true,
                manufacturerProfile: { select: { company: identityForScrubbing } },
                logisticsQuotes: { where: { status: 'ACCEPTED' }, select: { insured: true } },
                logisticsShipments: {
                    where: { active: true },
                    select: {
                        buyerShareMinor: true,
                        shipment: {
                            select: {
                                id: true,
                                currency: true,
                                departedAt: true,
                                legs: { select: { id: true, partner: { select: { name: true } } } },
                            },
                        },
                    },
                },
            },
        });
        if (!order)
            throw new NotFoundException('Order not found');
        const link = order.logisticsShipments[0];
        if (!link?.shipment.departedAt)
            throw new ConflictException('Claims are for orders that left with GarmentGate');
        const s = link.shipment;
        if (dto.legId && !s.legs.some((l) => l.id === dto.legId))
            throw new BadRequestException('That leg isn’t on this order’s shipment');
        if (dto.disputeId) {
            const dispute = await this.prisma.dispute.findUnique({
                where: { id: dto.disputeId },
                select: { orderId: true },
            });
            if (dispute?.orderId !== order.id)
                throw new BadRequestException('That dispute is about another order');
        }
        const insured = order.logisticsQuotes.some((q) => q.insured);
        const goods = BigInt(order.buyerUnitPriceMinor) * BigInt(order.quantity);
        const insuredValueMinor = insured ? insuredValue(goods + link.buyerShareMinor) : 0n;
        const patterns = [
            ...identityPatterns(identityOf(order.manufacturerProfile.company)),
            ...s.legs.flatMap((l) => l.partner
                ? identityPatterns({
                    legalName: l.partner.name,
                    tradeName: null,
                    website: null,
                    peopleNames: [],
                })
                : []),
        ];
        let code = '';
        try {
            await this.prisma.$transaction(async (tx) => {
                code = await this.codes.sequential(`CLM-${String(new Date().getUTCFullYear())}`, 5, tx);
                await tx.logisticsClaim.create({
                    data: {
                        code,
                        shipmentId: s.id,
                        orderId: order.id,
                        disputeId: dto.disputeId ?? null,
                        legId: dto.legId ?? null,
                        type: dto.type,
                        description: dto.description,
                        publicNote: scrubText(dto.publicNote ?? null, patterns),
                        currency: s.currency,
                        claimedMinor: BigInt(dto.claimedMinor),
                        insuredValueMinor,
                        createdById: adminId,
                    },
                });
            });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')
                throw new ConflictException('This order (or dispute) already has an open claim');
            throw error;
        }
        await this.audit.log({
            actorUserId: adminId,
            action: 'logistics.claim_opened',
            entityType: 'LogisticsClaim',
            entityId: code,
            metadata: { orderCode: order.code, type: dto.type, claimedMinor: dto.claimedMinor },
        });
        await this.notifier.notify({
            to: { companyId: order.buyerCompanyId },
            type: 'ORDER_UPDATE',
            title: `${order.code}: GarmentGate opened a claim (${code})`,
            body: 'We’re handling it with our insurer and partners and will update you on the order.',
            link: { orderCode: order.code },
        });
        return { code };
    }
    async submit(adminId, code, dto) {
        const { count } = await this.prisma.logisticsClaim.updateMany({
            where: { code, status: 'OPEN' },
            data: { status: 'SUBMITTED', insurerReference: dto.insurerReference },
        });
        if (count !== 1) {
            await this.find(code);
            throw new ConflictException('Only an open claim can be submitted');
        }
        await this.audit.log({
            actorUserId: adminId,
            action: 'logistics.claim_submitted',
            entityType: 'LogisticsClaim',
            entityId: code,
            metadata: { insurerReference: dto.insurerReference },
        });
    }
    async settle(adminId, code, dto) {
        const c = await this.find(code);
        const error = settlementError({
            claimedMinor: c.claimedMinor,
            insuredValueMinor: c.insuredValueMinor,
            legCostMinor: c.leg?.partnerId ? (c.leg.costMinor ?? 0n) : null,
        }, dto);
        if (error)
            throw new BadRequestException(error);
        const compensation = BigInt(dto.compensationMinor);
        const recovery = BigInt(dto.insurerRecoveryMinor);
        const chargeback = BigInt(dto.partnerChargebackMinor);
        const order = await this.prisma.order.findUniqueOrThrow({
            where: { id: c.orderId },
            select: {
                id: true,
                code: true,
                buyerCompanyId: true,
                manufacturerProfile: { select: { company: identityForScrubbing } },
            },
        });
        const patterns = identityPatterns(identityOf(order.manufacturerProfile.company));
        await this.prisma.$transaction(async (tx) => {
            await this.ledger.lockOrder(tx, order.id);
            const { count } = await tx.logisticsClaim.updateMany({
                where: { id: c.id, status: { in: ['OPEN', 'SUBMITTED'] } },
                data: {
                    status: dto.outcome,
                    compensationMinor: compensation,
                    insurerRecoveryMinor: recovery,
                    partnerChargebackMinor: chargeback,
                    resolution: dto.resolution,
                    ...(dto.publicNote !== undefined && { publicNote: scrubText(dto.publicNote, patterns) }),
                    settledById: adminId,
                    settledAt: new Date(),
                },
            });
            if (count !== 1)
                throw new ConflictException('This claim is already closed');
            if (dto.outcome === 'REJECTED')
                return;
            const { rates } = await this.fx.snapshot(c.currency, tx);
            const usd = (amount) => ({
                unitsPerUsd: rates[c.currency] ?? '1',
                amountUsdMinor: convertMinor(amount, c.currency, 'USD', rates),
            });
            if (compensation > 0n) {
                const payment = await tx.payment.create({
                    data: {
                        orderId: order.id,
                        direction: 'OUTBOUND',
                        purpose: 'REFUND',
                        amountMinor: compensation,
                        currency: c.currency,
                        method: 'BANK_TRANSFER',
                        provider: 'manual',
                        reference: `${c.code}-C`,
                        status: 'SUCCEEDED',
                        paidAt: new Date(),
                        confirmedById: adminId,
                        ...usd(compensation),
                    },
                });
                await this.ledger.post(tx, {
                    kind: 'CLAIM',
                    key: `claim-compensation:${c.id}`,
                    paymentId: payment.id,
                    currency: c.currency,
                    rates,
                    description: `${c.code}: compensation paid to the buyer`,
                    lines: [
                        {
                            account: 'PLATFORM_REVENUE',
                            companyId: null,
                            direction: 'DEBIT',
                            amountMinor: compensation,
                        },
                        {
                            account: 'PLATFORM_CASH',
                            companyId: null,
                            direction: 'CREDIT',
                            amountMinor: compensation,
                        },
                    ],
                });
            }
            if (recovery > 0n) {
                const payment = await tx.payment.create({
                    data: {
                        logisticsShipmentId: c.shipmentId,
                        direction: 'INBOUND',
                        purpose: 'INSURANCE_RECOVERY',
                        amountMinor: recovery,
                        currency: c.currency,
                        method: 'BANK_TRANSFER',
                        provider: 'manual',
                        reference: `${c.code}-R`,
                        payerReference: c.insurerReference,
                        status: 'SUCCEEDED',
                        paidAt: new Date(),
                        confirmedById: adminId,
                        ...usd(recovery),
                    },
                });
                await this.ledger.post(tx, {
                    kind: 'CLAIM',
                    key: `claim-recovery:${c.id}`,
                    paymentId: payment.id,
                    currency: c.currency,
                    rates,
                    description: `${c.code}: recovered from the insurer`,
                    lines: [
                        {
                            account: 'PLATFORM_CASH',
                            companyId: null,
                            direction: 'DEBIT',
                            amountMinor: recovery,
                        },
                        {
                            account: 'PLATFORM_REVENUE',
                            companyId: null,
                            direction: 'CREDIT',
                            amountMinor: recovery,
                        },
                    ],
                });
            }
            if (chargeback > 0n && c.leg?.partnerId) {
                await this.ledger.post(tx, {
                    kind: 'CLAIM',
                    key: `claim-chargeback:${c.id}`,
                    currency: c.currency,
                    rates,
                    description: `${c.code}: charged back to the partner`,
                    lines: [
                        {
                            account: 'PARTNER_PAYABLE',
                            companyId: null,
                            logisticsPartnerId: c.leg.partnerId,
                            direction: 'DEBIT',
                            amountMinor: chargeback,
                        },
                        {
                            account: 'PLATFORM_REVENUE',
                            companyId: null,
                            direction: 'CREDIT',
                            amountMinor: chargeback,
                        },
                    ],
                });
            }
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'logistics.claim_settled',
            entityType: 'LogisticsClaim',
            entityId: c.code,
            metadata: {
                outcome: dto.outcome,
                compensationMinor: dto.compensationMinor,
                insurerRecoveryMinor: dto.insurerRecoveryMinor,
                partnerChargebackMinor: dto.partnerChargebackMinor,
            },
        });
        await this.notifier.notify({
            to: { companyId: order.buyerCompanyId },
            type: 'ORDER_UPDATE',
            title: dto.outcome === 'SETTLED'
                ? `${order.code}: claim ${c.code} settled`
                : `${order.code}: claim ${c.code} closed`,
            body: compensation > 0n
                ? 'GarmentGate is sending your compensation; it appears under payments on the order.'
                : (scrubText(dto.resolution, patterns) ?? dto.resolution),
            link: { orderCode: order.code },
        });
    }
    async report(q) {
        const from = new Date(`${q.from}T00:00:00.000Z`);
        const to = new Date(new Date(`${q.to}T00:00:00.000Z`).getTime() + DAY);
        const [shipments, claims, open] = await Promise.all([
            this.prisma.logisticsShipment.findMany({
                where: { departedAt: { gte: from, lt: to } },
                select: {
                    departedAt: true,
                    currency: true,
                    mode: true,
                    buyerPriceMinor: true,
                    partnerCostMinor: true,
                    insuranceMinor: true,
                    legs: {
                        where: { partnerId: { not: null }, status: { not: 'CANCELLED' } },
                        select: {
                            partnerId: true,
                            costMinor: true,
                            paidAt: true,
                            partner: { select: { name: true } },
                        },
                    },
                },
            }),
            this.prisma.logisticsClaim.findMany({
                where: { settledAt: { gte: from, lt: to }, status: { in: ['SETTLED', 'REJECTED'] } },
                include: { shipment: { select: { mode: true } }, leg: { select: { partnerId: true } } },
            }),
            this.prisma.logisticsClaim.count({ where: { status: { in: ['OPEN', 'SUBMITTED'] } } }),
        ]);
        const settled = claims.filter((c) => c.status === 'SETTLED');
        const revenue = logisticsRevenue(shipments.flatMap((s) => s.departedAt
            ? [
                {
                    departedAt: s.departedAt,
                    currency: s.currency,
                    mode: s.mode,
                    buyerPriceMinor: s.buyerPriceMinor,
                    partnerCostMinor: s.partnerCostMinor,
                    insuranceMinor: s.insuranceMinor,
                },
            ]
            : []), settled.flatMap((c) => c.settledAt
            ? [
                {
                    settledAt: c.settledAt,
                    currency: c.currency,
                    mode: c.shipment.mode,
                    netMinor: claimNetMinor(c),
                },
            ]
            : []));
        const partners = new Map();
        const entry = (partnerId, name, currency) => {
            const key = `${partnerId}|${currency}`;
            let p = partners.get(key);
            if (!p) {
                p = { name, currency, legs: 0, cost: 0n, paid: 0n, chargeback: 0n };
                partners.set(key, p);
            }
            return p;
        };
        const names = new Map();
        for (const s of shipments)
            for (const l of s.legs) {
                if (!l.partnerId)
                    continue;
                names.set(l.partnerId, l.partner?.name ?? '');
                const p = entry(l.partnerId, l.partner?.name ?? '', s.currency);
                p.legs += 1;
                p.cost += l.costMinor ?? 0n;
                if (l.paidAt)
                    p.paid += l.costMinor ?? 0n;
            }
        for (const c of settled) {
            const partnerId = c.leg?.partnerId;
            if (!partnerId || c.partnerChargebackMinor === 0n)
                continue;
            let name = names.get(partnerId);
            if (name === undefined) {
                const row = await this.prisma.logisticsPartner.findUnique({
                    where: { id: partnerId },
                    select: { name: true },
                });
                name = row?.name ?? '';
                names.set(partnerId, name);
            }
            entry(partnerId, name, c.currency).chargeback += c.partnerChargebackMinor;
        }
        return {
            from: q.from,
            to: q.to,
            ...revenue,
            partners: [...partners]
                .map(([key, p]) => ({
                partnerId: key.split('|')[0] ?? '',
                name: p.name,
                currency: p.currency,
                legs: p.legs,
                costMinor: Number(p.cost),
                paidMinor: Number(p.paid),
                chargebackMinor: Number(p.chargeback),
                outstandingMinor: Number(p.cost - p.paid - p.chargeback),
            }))
                .sort((a, b) => a.name.localeCompare(b.name) || a.currency.localeCompare(b.currency)),
            claims: {
                open,
                settled: settled.length,
                rejected: claims.length - settled.length,
            },
        };
    }
    async find(code) {
        const c = await this.prisma.logisticsClaim.findUnique({
            where: { code },
            include: claimInclude,
        });
        if (!c)
            throw new NotFoundException('Claim not found');
        return c;
    }
    view(c) {
        return {
            id: c.id,
            code: c.code,
            type: c.type,
            status: c.status,
            orderCode: c.order.code,
            shipmentCode: c.shipment.code,
            buyerCode: c.order.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
            disputeId: c.disputeId,
            leg: c.leg
                ? {
                    id: c.leg.id,
                    sequence: c.leg.sequence,
                    partnerName: c.leg.partner?.name ?? null,
                    costMinor: c.leg.costMinor === null ? null : Number(c.leg.costMinor),
                }
                : null,
            description: c.description,
            publicNote: c.publicNote,
            currency: c.currency,
            claimedMinor: Number(c.claimedMinor),
            insuredValueMinor: Number(c.insuredValueMinor),
            insurerReference: c.insurerReference,
            compensationMinor: Number(c.compensationMinor),
            insurerRecoveryMinor: Number(c.insurerRecoveryMinor),
            partnerChargebackMinor: Number(c.partnerChargebackMinor),
            netMinor: Number(claimNetMinor(c)),
            resolution: c.resolution,
            createdAt: c.createdAt.toISOString(),
            settledAt: c.settledAt?.toISOString() ?? null,
        };
    }
};
ClaimsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        LedgerService,
        FxService,
        PublicCodeService,
        Notifier,
        AuditService])
], ClaimsService);
export { ClaimsService };
//# sourceMappingURL=claims.service.js.map