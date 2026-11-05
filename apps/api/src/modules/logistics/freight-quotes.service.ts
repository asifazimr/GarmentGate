import { Inject, Injectable } from '@nestjs/common';
import {
  applyLogisticsMargin,
  convertMinor,
  dateOnly,
  type FreightOption,
  type FreightQuoteRequest,
  insurancePremium,
  insuredValue,
  freightMode,
  pickLogisticsMarginRule,
} from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { FxService } from '../payments/fx.service.js';
import { LogisticsSettingsService } from './logistics-settings.service.js';
import { RATE_PROVIDERS, type ShippingRateProvider } from './rate-provider.js';

/**
 * Prices freight: every enabled provider's options for the route, GarmentGate's margin (most
 * specific rule), and cargo insurance on 110% of CIF. Sorted cheapest first. This is the staff
 * view with costs; buyer-facing quotes are built from it without the cost or the margin.
 */
@Injectable()
export class FreightQuotesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settings: LogisticsSettingsService,
    private readonly fx: FxService,
    @Inject(RATE_PROVIDERS) private readonly providers: ShippingRateProvider[],
  ) {}

  async quote(request: FreightQuoteRequest): Promise<FreightOption[]> {
    const [settings, rules, rates] = await Promise.all([
      this.settings.get(),
      this.prisma.logisticsMarginRule.findMany({ where: { active: true } }),
      this.fx.rates(),
    ]);
    const providers = this.providers.filter((p) => p.enabled());
    const options = (
      await Promise.all(
        providers.map((p) =>
          p.quote({
            mode: request.mode,
            originCountry: request.originCountry,
            originPort: request.originPort,
            destinationCountry: request.destinationCountry,
            destinationPort: request.destinationPort,
            weightGrams: request.weightGrams,
            volumeLitres: request.volumeLitres,
            currency: request.currency,
            shipDate: dateOnly(request.shipDate),
          }),
        ),
      )
    ).flat();
    const partnerIds = [...new Set(options.flatMap((o) => (o.partnerId ? [o.partnerId] : [])))];
    const partners = new Map(
      (
        await this.prisma.logisticsPartner.findMany({
          where: { id: { in: partnerIds } },
          select: { id: true, code: true, name: true },
        })
      ).map((p) => [p.id, p]),
    );
    const rule = pickLogisticsMarginRule(
      rules.map((r) => ({ ...r, mode: r.mode === null ? null : freightMode(r.mode) })),
      request,
    );
    return options
      .flatMap((o) => {
        // Rate cards in another currency are converted at today's stored rate (or left out).
        if (o.currency !== request.currency && (!rates[o.currency] || !rates[request.currency]))
          return [];
        const cost = convertMinor(o.costMinor, o.currency, request.currency, rates);
        const price = applyLogisticsMargin(cost, rule);
        const premium =
          request.goodsValueMinor > 0
            ? insurancePremium(
                insuredValue(BigInt(request.goodsValueMinor) + price),
                settings.insuranceRateBps,
                settings.minInsurancePremiumMinor,
              )
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
      .sort(
        (a, b) => a.freightPriceMinor - b.freightPriceMinor || a.transitDaysMin - b.transitDaysMin,
      );
  }
}
