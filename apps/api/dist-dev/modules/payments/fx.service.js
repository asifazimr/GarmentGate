var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrencySchema } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
let FxService = class FxService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async rates(client = this.prisma) {
        const rows = await client.exchangeRate.findMany();
        const rates = { USD: '1' };
        for (const r of rows)
            rates[r.currency] = r.unitsPerUsd.toString();
        return rates;
    }
    async snapshot(currency, client = this.prisma) {
        const rates = await this.rates(client);
        const unitsPerUsd = rates[currency];
        if (!unitsPerUsd)
            throw new BadRequestException(`No exchange rate for ${currency}: set one in Finance → Rates`);
        return { rates, unitsPerUsd };
    }
    async update(adminId, rates) {
        const updates = CurrencySchema.options.flatMap((currency) => {
            const unitsPerUsd = currency === 'USD' ? '1' : rates[currency];
            return unitsPerUsd
                ? [
                    this.prisma.exchangeRate.upsert({
                        where: { currency },
                        create: { currency, unitsPerUsd, updatedById: adminId },
                        update: { unitsPerUsd, updatedById: adminId },
                    }),
                ]
                : [];
        });
        await this.prisma.$transaction(updates);
    }
};
FxService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], FxService);
export { FxService };
//# sourceMappingURL=fx.service.js.map