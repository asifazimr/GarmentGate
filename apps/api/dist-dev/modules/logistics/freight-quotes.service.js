var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { applyLogisticsMargin, convertMinor, dateOnly, insurancePremium, insuredValue, freightMode, pickLogisticsMarginRule, } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { FxService } from '../payments/fx.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
import { RATE_PROVIDERS } from './rate-provider.js';
let FreightQuotesService = class FreightQuotesService {
    prisma;
    settings;
    fx;
    providers;
    constructor(prisma, settings, fx, providers) {
        this.prisma = prisma;
        this.settings = settings;
        this.fx = fx;
        this.providers = providers;
    }
    async quote(request) {
        const [settings, rules, rates] = await Promise.all([
            this.settings.get(),
            this.prisma.logisticsMarginRule.findMany({ where: { active: true } }),
            this.fx.rates(),
        ]);
        const providers = this.providers.filter((p) => p.enabled());
        const options = (await Promise.all(providers.map((p) => p.quote({
            mode: request.mode,
            originCountry: request.originCountry,
            originPort: request.originPort,
            destinationCountry: request.destinationCountry,
            destinationPort: request.destinationPort,
            weightGrams: request.weightGrams,
            volumeLitres: request.volumeLitres,
            currency: request.currency,
            shipDate: dateOnly(request.shipDate),
        })))).flat();
        const partnerIds = [...new Set(options.flatMap((o) => (o.partnerId ? [o.partnerId] : [])))];
        const partners = new Map((await this.prisma.logisticsPartner.findMany({
            where: { id: { in: partnerIds } },
            select: { id: true, code: true, name: true },
        })).map((p) => [p.id, p]));
        const rule = pickLogisticsMarginRule(rules.map((r) => ({ ...r, mode: r.mode === null ? null : freightMode(r.mode) })), request);
        return options
            .flatMap((o) => {
            if (o.currency !== request.currency && (!rates[o.currency] || !rates[request.currency]))
                return [];
            const cost = convertMinor(o.costMinor, o.currency, request.currency, rates);
            const price = applyLogisticsMargin(cost, rule);
            const premium = request.goodsValueMinor > 0
                ? insurancePremium(insuredValue(BigInt(request.goodsValueMinor) + price), settings.insuranceRateBps, settings.minInsurancePremiumMinor)
                : 0n;
            return [
                {
                    provider: o.provider,
                    rateCardId: o.rateCardId,
                    partner: o.partnerId ? (partners.get(o.partnerId) ?? null) : null,
                    mode: o.mode,
                    currency: request.currency,
                    chargeableMilliUnits: o.chargeableMilliUnits,
                    unit: o.unit,
                    partnerCostMinor: Number(cost),
                    marginRule: rule?.name ?? null,
                    freightPriceMinor: Number(price),
                    insurancePremiumMinor: Number(premium),
                    transitDaysMin: o.transitDaysMin,
                    transitDaysMax: o.transitDaysMax,
                },
            ];
        })
            .sort((a, b) => a.freightPriceMinor - b.freightPriceMinor || a.transitDaysMin - b.transitDaysMin);
    }
};
FreightQuotesService = __decorate([
    Injectable(),
    __param(3, Inject(RATE_PROVIDERS)),
    __metadata("design:paramtypes", [PrismaService,
        LogisticsSettingsService,
        FxService, Array])
], FreightQuotesService);
export { FreightQuotesService };
//# sourceMappingURL=freight-quotes.service.js.map