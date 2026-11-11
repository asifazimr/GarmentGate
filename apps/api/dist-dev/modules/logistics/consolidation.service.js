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
import { chargeableGrams, combineCargo, insuranceRequired, isoDate, modesFor, splitByWeights, splitPriceAndCost, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { FreightQuotesService } from './freight-quotes.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
import { OPEN_FOR_SHIPPING, OrderLogisticsService } from './order-logistics.service.js';
const DAY = 86_400_000;
const n = (v) => Number(v);
let ConsolidationService = class ConsolidationService {
    prisma;
    orderLogistics;
    quotes;
    settings;
    codes;
    audit;
    constructor(prisma, orderLogistics, quotes, settings, codes, audit) {
        this.prisma = prisma;
        this.orderLogistics = orderLogistics;
        this.quotes = quotes;
        this.settings = settings;
        this.codes = codes;
        this.audit = audit;
    }
    async candidates(actor, code) {
        const order = await this.orderLogistics.buyerOrder(actor, code);
        const rows = await this.prisma.order.findMany({
            where: {
                buyerCompanyId: order.buyerCompanyId,
                code: { not: order.code },
                status: { in: [...OPEN_FOR_SHIPPING] },
                currency: order.currency,
                manufacturerProfile: { company: { country: order.manufacturerProfile.company.country } },
                payments: { none: { purpose: 'LOGISTICS', status: { in: ['SUCCEEDED', 'PROCESSING'] } } },
            },
            orderBy: { createdAt: 'desc' },
            take: 20,
            select: {
                code: true,
                title: true,
                status: true,
                quantity: true,
                manufacturerProfile: { select: { publicCode: true } },
            },
        });
        return rows.map((o) => ({
            code: o.code,
            title: o.title,
            status: o.status,
            quantity: o.quantity,
            manufacturerCode: o.manufacturerProfile.publicCode,
        }));
    }
    async quote(actor, dto) {
        if (dto.incoterm === 'DDP')
            throw new BadRequestException('Duties-paid delivery is priced order by order');
        const orders = [];
        for (const code of dto.orderCodes) {
            const order = await this.orderLogistics.buyerOrder(actor, code);
            await this.orderLogistics.assertEditable(order);
            orders.push(order);
        }
        const [first] = orders;
        if (!first)
            throw new BadRequestException('Pick the orders');
        const origin = first.manufacturerProfile.company.country;
        if (orders.some((o) => o.manufacturerProfile.company.country !== origin || o.currency !== first.currency))
            throw new BadRequestException('Only orders from the same country, in the same currency, ship together');
        const settings = await this.settings.get();
        const cargos = await Promise.all(orders.map((o) => this.orderLogistics.cargo(o)));
        const combined = combineCargo(cargos);
        const goods = orders.map((o) => BigInt(o.buyerUnitPriceMinor) * BigInt(o.quantity));
        const totalGoods = goods.reduce((a, g) => a + g, 0n);
        const insured = dto.insured || insuranceRequired(dto.incoterm);
        const shipDate = isoDate(new Date(Date.now() + DAY));
        const year = new Date().getUTCFullYear();
        const priceFor = async (mode, cargo, goodsMinor) => (await this.quotes.quote({
            mode,
            originCountry: origin,
            originPort: null,
            destinationCountry: dto.destinationCountry,
            destinationPort: dto.destinationPort,
            weightGrams: Math.max(1, cargo.weightGrams),
            volumeLitres: cargo.volumeLitres,
            goodsValueMinor: insured ? Number(goodsMinor) : 0,
            currency: first.currency,
            shipDate,
        }))[0];
        await this.prisma.logisticsQuote.updateMany({
            where: { orderId: { in: orders.map((o) => o.id) }, status: 'OFFERED' },
            data: { status: 'SUPERSEDED' },
        });
        const options = [];
        for (const mode of modesFor(dto.incoterm, origin, dto.destinationCountry)) {
            const best = await priceFor(mode, combined, totalGoods);
            if (!best)
                continue;
            const freight = BigInt(best.freightPriceMinor);
            const insurance = insured ? BigInt(best.insurancePremiumMinor) : 0n;
            let separate = 0n;
            for (const i of orders.keys()) {
                const alone = await priceFor(mode, cargos[i] ?? combined, goods[i] ?? 0n);
                if (!alone || separate === null) {
                    separate = null;
                    continue;
                }
                separate +=
                    BigInt(alone.freightPriceMinor) + (insured ? BigInt(alone.insurancePremiumMinor) : 0n);
            }
            const weights = cargos.map((c) => BigInt(chargeableGrams(mode, c)));
            const freightShares = splitPriceAndCost(freight, BigInt(best.partnerCostMinor), weights);
            const insuranceShares = splitByWeights(insurance, goods);
            const validUntil = new Date(Date.now() + settings.quoteValidityDays * DAY);
            const consolidation = await this.prisma.$transaction(async (tx) => {
                const created = await tx.consolidation.create({
                    data: {
                        code: await this.codes.sequential(`CON-${String(year)}`, 5, tx),
                        buyerCompanyId: first.buyerCompanyId,
                        mode,
                        destinationCountry: dto.destinationCountry,
                        currency: first.currency,
                        separateTotalMinor: separate ?? 0n,
                        combinedTotalMinor: freight + insurance,
                    },
                });
                for (const [i, order] of orders.entries()) {
                    const share = freightShares[i] ?? { priceMinor: 0n, costMinor: 0n };
                    const ins = insuranceShares[i] ?? 0n;
                    const cargo = cargos[i] ?? { ...combined, estimated: true };
                    await tx.logisticsQuote.create({
                        data: {
                            orderId: order.id,
                            consolidationId: created.id,
                            mode,
                            incoterm: dto.incoterm,
                            originCountry: origin,
                            destinationCountry: dto.destinationCountry,
                            destinationPort: dto.destinationPort,
                            insured,
                            weightGrams: Math.max(1, cargo.weightGrams),
                            volumeLitres: cargo.volumeLitres,
                            cargoEstimated: cargo.estimated,
                            provider: best.provider,
                            rateCardId: best.rateCardId,
                            partnerId: best.partner?.id ?? null,
                            marginRuleName: best.marginRule,
                            currency: first.currency,
                            partnerCostMinor: share.costMinor,
                            freightMinor: share.priceMinor,
                            insuranceMinor: ins,
                            totalMinor: share.priceMinor + ins,
                            transitDaysMin: best.transitDaysMin,
                            transitDaysMax: best.transitDaysMax,
                            validUntil,
                        },
                    });
                }
                return created;
            });
            options.push({
                code: consolidation.code,
                mode,
                currency: first.currency,
                transitDaysMin: best.transitDaysMin,
                transitDaysMax: best.transitDaysMax,
                combinedTotalMinor: n(freight + insurance),
                separateTotalMinor: separate === null ? null : n(separate),
                savingMinor: separate === null ? 0 : Math.max(0, n(separate - freight - insurance)),
                shares: orders.map((o, i) => ({
                    orderCode: o.code,
                    freightMinor: n(freightShares[i]?.priceMinor ?? 0n),
                    insuranceMinor: n(insuranceShares[i] ?? 0n),
                    totalMinor: n((freightShares[i]?.priceMinor ?? 0n) + (insuranceShares[i] ?? 0n)),
                })),
                validUntil: validUntil.toISOString(),
            });
        }
        return options;
    }
    async accept(actor, code) {
        const consolidation = await this.prisma.consolidation.findUnique({
            where: { code },
            include: { quotes: { include: { order: { select: { code: true } } } } },
        });
        if (!consolidation)
            throw new NotFoundException('That shipping option is no longer available');
        const orders = [];
        for (const q of consolidation.quotes) {
            const order = await this.orderLogistics.buyerOrder(actor, q.order.code);
            await this.orderLogistics.assertEditable(order);
            orders.push(order);
        }
        if (orders.length < 2 || consolidation.quotes.some((q) => q.status !== 'OFFERED'))
            throw new NotFoundException('That shipping option is no longer available');
        if (consolidation.quotes.some((q) => q.validUntil.getTime() < Date.now()))
            throw new ConflictException('That price has expired: get new shipping prices');
        await this.prisma.$transaction(async (tx) => {
            for (const q of consolidation.quotes) {
                await tx.logisticsQuote.updateMany({
                    where: { orderId: q.orderId, status: 'ACCEPTED' },
                    data: { status: 'SUPERSEDED' },
                });
                const { count } = await tx.logisticsQuote.updateMany({
                    where: { id: q.id, status: 'OFFERED' },
                    data: { status: 'ACCEPTED', acceptedAt: new Date() },
                });
                if (count !== 1)
                    throw new ConflictException('That option just changed: get new prices');
                await tx.order.update({
                    where: { id: q.orderId },
                    data: {
                        incoterm: q.incoterm,
                        destinationCountry: q.destinationCountry,
                        destinationPort: q.destinationPort,
                    },
                });
            }
        });
        await this.audit.log({
            actorUserId: actor.userId,
            action: 'logistics.consolidation_accepted',
            entityType: 'Consolidation',
            entityId: consolidation.id,
            metadata: { orders: orders.map((o) => o.code) },
        });
    }
};
ConsolidationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        OrderLogisticsService,
        FreightQuotesService,
        LogisticsSettingsService,
        PublicCodeService,
        AuditService])
], ConsolidationService);
export { ConsolidationService };
//# sourceMappingURL=consolidation.service.js.map