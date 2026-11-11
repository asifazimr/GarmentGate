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
import { commissionAmount, lateness, needsDelayAlert, releaseTranches, REPLACEABLE_STATUSES, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { OrdersService } from '../orders/orders.service.js';
import { FxService } from '../payments/fx.service.js';
import { LedgerService } from '../payments/ledger.service.js';
const MAKING = ['IN_PRODUCTION', 'QC', 'READY_TO_SHIP'];
const stageLabel = (stage) => stage === 'SHIP_DATE' ? 'the ship date' : stage.toLowerCase().replaceAll('_', ' ');
const watchSelect = {
    id: true,
    code: true,
    status: true,
    currency: true,
    requestedShipDate: true,
    delayAlertedAt: true,
    buyerCompanyId: true,
    buyerCompany: { select: { legalName: true, buyerProfile: { select: { publicCode: true } } } },
    manufacturerProfile: {
        select: { publicCode: true, company: { select: { id: true, legalName: true } } },
    },
    milestones: { select: { stage: true, status: true, plannedAt: true } },
    hubReceipts: { select: { id: true }, take: 1 },
    _count: { select: { factoryChanges: true } },
};
let ExceptionsService = class ExceptionsService {
    prisma;
    orders;
    ledger;
    fx;
    notifier;
    audit;
    constructor(prisma, orders, ledger, fx, notifier, audit) {
        this.prisma = prisma;
        this.orders = orders;
        this.ledger = ledger;
        this.fx = fx;
        this.notifier = notifier;
        this.audit = audit;
    }
    async list(now = new Date()) {
        const [making, failed, rejected] = await Promise.all([
            this.prisma.order.findMany({ where: { status: { in: MAKING } }, select: watchSelect }),
            this.prisma.order.findMany({
                where: {
                    status: 'QC',
                    inspections: { some: { type: 'PRE_SHIPMENT', result: 'FAIL' } },
                },
                select: {
                    ...watchSelect,
                    inspections: {
                        where: { type: 'PRE_SHIPMENT', result: { in: ['PASS', 'FAIL'] } },
                        orderBy: { inspectedAt: 'desc' },
                        take: 1,
                        select: { result: true, inspectedAt: true },
                    },
                },
            }),
            this.prisma.order.findMany({
                where: { status: { in: ['SAMPLING', 'SAMPLE_APPROVED'] } },
                select: {
                    ...watchSelect,
                    samples: {
                        orderBy: { round: 'desc' },
                        take: 2,
                        select: { status: true, updatedAt: true },
                    },
                },
            }),
        ]);
        const base = (o) => ({
            orderCode: o.code,
            status: o.status,
            currency: o.currency,
            buyer: {
                code: o.buyerCompany.buyerProfile?.publicCode ?? 'BYR',
                name: o.buyerCompany.legalName,
            },
            manufacturer: {
                code: o.manufacturerProfile.publicCode,
                name: o.manufacturerProfile.company.legalName,
            },
            delayAlertedAt: o.delayAlertedAt?.toISOString() ?? null,
            factoryChanges: o._count.factoryChanges,
        });
        const rows = [];
        for (const o of making) {
            const late = lateness({ ...o, atHub: o.hubReceipts.length > 0 }, now);
            if (late && late.daysLate >= 7)
                rows.push({
                    ...base(o),
                    kind: 'DELAY',
                    daysLate: late.daysLate,
                    stage: late.stage,
                    since: null,
                });
        }
        for (const o of failed)
            if (o.inspections[0]?.result === 'FAIL')
                rows.push({
                    ...base(o),
                    kind: 'INSPECTION_FAILED',
                    daysLate: null,
                    stage: null,
                    since: o.inspections[0].inspectedAt?.toISOString() ?? null,
                });
        for (const o of rejected) {
            const rejectedRound = o.samples.find((s) => s.status === 'REJECTED');
            if (rejectedRound)
                rows.push({
                    ...base(o),
                    kind: 'SAMPLE_REJECTED',
                    daysLate: null,
                    stage: null,
                    since: rejectedRound.updatedAt.toISOString(),
                });
        }
        return rows.sort((a, b) => (b.daysLate ?? 0) - (a.daysLate ?? 0));
    }
    async sweep(now = new Date()) {
        const making = await this.prisma.order.findMany({
            where: { status: { in: MAKING } },
            select: watchSelect,
        });
        let alerted = 0;
        for (const o of making) {
            const late = lateness({ ...o, atHub: o.hubReceipts.length > 0 }, now);
            if (!late || !needsDelayAlert(late, o.delayAlertedAt, now))
                continue;
            const { count } = await this.prisma.order.updateMany({
                where: { id: o.id, delayAlertedAt: o.delayAlertedAt },
                data: { delayAlertedAt: now },
            });
            if (count !== 1)
                continue;
            const days = String(late.daysLate);
            const stage = stageLabel(late.stage);
            await this.notifier.notify({
                to: 'ADMINS',
                type: 'ORDER_UPDATE',
                title: `${o.code}: ${days} days late`,
                body: `${o.manufacturerProfile.publicCode} is ${days} days behind on ${stage}. Rework, discount, refund or another factory?`,
                link: { orderCode: o.code },
            });
            await this.notifier.notify({
                to: { companyId: o.manufacturerProfile.company.id },
                type: 'ORDER_UPDATE',
                title: `${o.code}: ${days} days behind plan`,
                body: `${stage[0]?.toUpperCase() ?? ''}${stage.slice(1)} is ${days} days late. Update the stage or tell GarmentGate your new date.`,
                link: { orderCode: o.code },
            });
            await this.notifier.notify({
                to: { companyId: o.buyerCompanyId },
                type: 'ORDER_UPDATE',
                title: `${o.code}: running late`,
                body: 'Production is behind plan. GarmentGate is on it and will update you with a new date.',
                link: { orderCode: o.code },
            });
            alerted += 1;
        }
        return alerted;
    }
    async replaceFactory(adminId, code, dto) {
        const order = await this.prisma.order.findUnique({
            where: { code },
            include: {
                manufacturerProfile: { select: { id: true, publicCode: true, companyId: true } },
                hubReceipts: { select: { id: true }, take: 1 },
                releases: true,
            },
        });
        if (!order)
            throw new NotFoundException('Order not found');
        if (!REPLACEABLE_STATUSES.includes(order.status) || order.hubReceipts.length > 0)
            throw new ConflictException('The goods are already with GarmentGate: too late to move');
        const next = await this.prisma.manufacturerProfile.findUnique({
            where: { publicCode: dto.manufacturerCode },
            select: {
                id: true,
                publicCode: true,
                companyId: true,
                company: { select: { kycStatus: true } },
            },
        });
        if (next?.company.kycStatus !== 'VERIFIED')
            throw new BadRequestException('Pick a verified factory');
        if (next.id === order.manufacturerProfileId)
            throw new BadRequestException('That is the current factory');
        if (dto.manufacturerUnitPriceMinor > order.buyerUnitPriceMinor)
            throw new BadRequestException('The new factory price is above what the buyer pays');
        const newTotal = BigInt(dto.manufacturerUnitPriceMinor) * BigInt(order.quantity);
        const commission = commissionAmount(newTotal, order.commissionBps);
        const remake = MAKING.includes(order.status);
        let funded = 0n;
        await this.prisma.$transaction(async (tx) => {
            await this.ledger.lockOrder(tx, order.id);
            const { count } = await tx.order.updateMany({
                where: { id: order.id, manufacturerProfileId: order.manufacturerProfileId },
                data: {
                    manufacturerProfileId: next.id,
                    manufacturerUnitPriceMinor: dto.manufacturerUnitPriceMinor,
                    manufacturerTotalMinor: newTotal,
                    commissionMinor: commission,
                    ...(remake && { status: 'IN_PRODUCTION', delayAlertedAt: null }),
                },
            });
            if (count !== 1)
                throw new ConflictException('The order just changed: try again');
            const released = order.releases.filter((r) => r.supersededAt === null && (r.status === 'RELEASED' || r.status === 'PAID'));
            funded = released.reduce((a, r) => a + r.buyerMinor, 0n);
            if (order.releases.length > 0) {
                const now = new Date();
                await tx.orderRelease.updateMany({
                    where: { orderId: order.id, supersededAt: null, status: { in: ['SCHEDULED', 'DUE'] } },
                    data: { status: 'CANCELLED', supersededAt: now },
                });
                await tx.orderRelease.updateMany({
                    where: { orderId: order.id, supersededAt: null },
                    data: { supersededAt: now },
                });
                const schedule = order.releases
                    .filter((r) => r.supersededAt === null)
                    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
                const seen = new Set();
                const plan = schedule.filter((r) => !seen.has(r.trigger) && seen.add(r.trigger));
                const tranches = releaseTranches(order.buyerTotalMinor, newTotal - commission, plan.map((r) => r.bps));
                const reached = (trigger) => trigger === 'PRODUCTION_START' &&
                    (order.status === 'IN_PRODUCTION' ||
                        order.status === 'QC' ||
                        order.status === 'READY_TO_SHIP');
                await tx.orderRelease.createMany({
                    data: plan.map((r, i) => ({
                        orderId: order.id,
                        trigger: r.trigger,
                        bps: r.bps,
                        currency: order.currency,
                        buyerMinor: tranches[i]?.buyerMinor ?? 0n,
                        manufacturerMinor: tranches[i]?.manufacturerMinor ?? 0n,
                        commissionMinor: tranches[i]?.commissionMinor ?? 0n,
                        manufacturerProfileId: next.id,
                        ...(reached(r.trigger) && { status: 'DUE', dueAt: new Date() }),
                    })),
                });
            }
            const change = await tx.orderFactoryChange.create({
                data: {
                    orderId: order.id,
                    fromProfileId: order.manufacturerProfileId,
                    toProfileId: next.id,
                    fromUnitPriceMinor: order.manufacturerUnitPriceMinor,
                    toUnitPriceMinor: dto.manufacturerUnitPriceMinor,
                    fundedMinor: funded,
                    reason: dto.reason,
                    createdById: adminId,
                },
            });
            if (funded > 0n) {
                const { rates } = await this.fx.snapshot(order.currency, tx);
                await this.ledger.post(tx, {
                    kind: 'COMMISSION',
                    key: `factory-change:${change.id}`,
                    orderId: order.id,
                    currency: order.currency,
                    rates,
                    description: `${order.code}: GarmentGate funds what the replaced factory already received`,
                    lines: [
                        {
                            account: 'PLATFORM_REVENUE',
                            companyId: null,
                            direction: 'DEBIT',
                            amountMinor: funded,
                        },
                        {
                            account: 'BUYER_ESCROW',
                            companyId: order.buyerCompanyId,
                            direction: 'CREDIT',
                            amountMinor: funded,
                        },
                    ],
                });
            }
            if (remake) {
                await this.orders.replanProduction(tx, order);
                if (order.status !== 'IN_PRODUCTION')
                    await tx.orderEvent.create({
                        data: {
                            orderId: order.id,
                            fromStatus: order.status,
                            toStatus: 'IN_PRODUCTION',
                            actorUserId: adminId,
                            note: 'Moved to another factory: production starts over',
                        },
                    });
            }
            await tx.pickupRequest.updateMany({
                where: { orderId: order.id, status: { in: ['REQUESTED', 'SCHEDULED'] } },
                data: { status: 'CANCELLED' },
            });
            await tx.orderPacking.deleteMany({ where: { orderId: order.id } });
        });
        await this.audit.log({
            actorUserId: adminId,
            action: 'order.factory_replaced',
            entityType: 'Order',
            entityId: order.id,
            metadata: {
                from: order.manufacturerProfile.publicCode,
                to: next.publicCode,
                fundedMinor: funded.toString(),
                reason: dto.reason,
            },
        });
        await this.notifier.notify({
            to: { companyId: order.manufacturerProfile.companyId },
            type: 'ORDER_UPDATE',
            title: `${order.code}: moved to another factory`,
            body: 'GarmentGate has moved this order. Contact GarmentGate about anything already made or paid.',
        });
        await this.notifier.notify({
            to: { companyId: next.companyId },
            type: 'ORDER_UPDATE',
            title: `${order.code}: a new order for you`,
            body: 'GarmentGate has placed this order with you. Check the specification and the production plan.',
            link: { orderCode: order.code },
        });
        await this.notifier.notify({
            to: { companyId: order.buyerCompanyId },
            type: 'ORDER_UPDATE',
            title: `${order.code}: moved to another verified factory`,
            body: `GarmentGate moved your order to ${next.publicCode} to keep it on track. Your price doesn’t change.`,
            link: { orderCode: order.code },
        });
    }
};
ExceptionsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        OrdersService,
        LedgerService,
        FxService,
        Notifier,
        AuditService])
], ExceptionsService);
export { ExceptionsService };
//# sourceMappingURL=exceptions.service.js.map