import { BadRequestException, Injectable } from '@nestjs/common';
import { type Currency, CurrencySchema, type FxRates, type UnitsPerUsd } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

type Client = PrismaService | Prisma.TransactionClient;

/**
 * Exchange rates as units per USD. Admins maintain them; every payment and ledger posting
 * stores the rate it used, so history never re-values when rates change.
 */
@Injectable()
export class FxService {
  constructor(private readonly prisma: PrismaService) {}

  async rates(client: Client = this.prisma): Promise<UnitsPerUsd> {
    const rows = await client.exchangeRate.findMany();
    const rates: UnitsPerUsd = { USD: '1' };
    for (const r of rows) rates[r.currency] = r.unitsPerUsd.toString();
    return rates;
  }

  /** The rates to use now, refusing if the currency has none. */
  async snapshot(
    currency: Currency,
    client: Client = this.prisma,
  ): Promise<{ rates: UnitsPerUsd; unitsPerUsd: string }> {
    const rates = await this.rates(client);
    const unitsPerUsd = rates[currency];
    if (!unitsPerUsd)
      throw new BadRequestException(`No exchange rate for ${currency}: set one in Finance → Rates`);
    return { rates, unitsPerUsd };
  }

  async update(adminId: string, rates: FxRates): Promise<void> {
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
}
