var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { chargeableMilliUnits, freightCost } from '@garmentgate/shared';
import { PrismaService } from '../../../prisma/prisma.service.js';
let ManualRateProvider = class ManualRateProvider {
    prisma;
    id = 'manual';
    constructor(prisma) {
        this.prisma = prisma;
    }
    enabled() {
        return true;
    }
    async quote(request) {
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
            chargeableMilliUnits: chargeableMilliUnits(card.unit, request.mode, cargo, card.containerType),
            costMinor: freightCost(card, request.mode, cargo),
            currency: card.currency,
            transitDaysMin: card.transitDaysMin,
            transitDaysMax: card.transitDaysMax,
        }));
    }
};
ManualRateProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ManualRateProvider);
export { ManualRateProvider };
//# sourceMappingURL=manual.provider.js.map