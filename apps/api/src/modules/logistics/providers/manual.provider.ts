import { Injectable } from '@nestjs/common';
import { chargeableMilliUnits, freightCost } from '@garmentgate/shared';
import { PrismaService } from '../../../prisma/prisma.service.js';
import type { RateOption, RateRequest, ShippingRateProvider } from '../rate-provider.js';

/**
 * Rates from the cards staff maintain: active, valid on the ship date, same mode, matching
 * the countries, and the port when the card names one. Costs are in the card's currency.
 */
@Injectable()
export class ManualRateProvider implements ShippingRateProvider {
  readonly id = 'manual';

  constructor(private readonly prisma: PrismaService) {}

  enabled(): boolean {
    return true;
  }

  async quote(request: RateRequest): Promise<RateOption[]> {
    const cards = await this.prisma.rateCard.findMany({
      where: {
        active: true,
        partner: { active: true },
        mode: request.mode,
        originCountry: request.originCountry,
        destinationCountry: request.destinationCountry,
        validFrom: { lte: request.shipDate },
        validTo: { gte: request.shipDate },
        AND: [
          {
            OR: [
              { originPort: null },
              ...(request.originPort ? [{ originPort: request.originPort }] : []),
            ],
          },
          {
            OR: [
              { destinationPort: null },
              ...(request.destinationPort ? [{ destinationPort: request.destinationPort }] : []),
            ],
          },
        ],
      },
    });
    const cargo = { weightGrams: request.weightGrams, volumeLitres: request.volumeLitres };
    return cards.map((card) => ({
      provider: this.id,
      rateCardId: card.id,
      partnerId: card.partnerId,
      mode: request.mode,
      unit: card.unit,
      containerType: card.containerType,
      chargeableMilliUnits: chargeableMilliUnits(
        card.unit,
        request.mode,
        cargo,
        card.containerType,
      ),
      costMinor: freightCost(card, request.mode, cargo),
      currency: card.currency,
      transitDaysMin: card.transitDaysMin,
      transitDaysMax: card.transitDaysMax,
    }));
  }
}
