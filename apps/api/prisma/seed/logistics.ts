/**
 * Logistics demo data (used when LOGISTICS_ENABLED is on): a GarmentGate hub in Bangladesh,
 * a forwarder with a portal login and a trucker, an air rate card and margin, and
 * ORD-2026-00018: ready to ship, balance and air freight paid, packed, waiting for the
 * factory to book the pickup to the hub. The Playwright logistics journey starts there.
 */
import { insuredValue } from '@garmentgate/shared';
import type { PrismaClient } from '../../src/generated/prisma/client.js';
import { LOGISTICS_PARTNER } from './data.js';

const daysFromNow = (days: number) => new Date(Date.now() + days * 86_400_000);
const dateOnly = (days: number) =>
  new Date(`${daysFromNow(days).toISOString().slice(0, 10)}T00:00:00Z`);

export const LOGISTICS_ORDER = 'ORD-2026-00018';

export async function seedLogistics(
  prisma: PrismaClient,
  p: {
    admin: string;
    passwordHash: string;
    buyer: { companyId: string };
    factory: { profileId: string; userId: string };
    accounts: { cash: string; escrow: string };
  },
): Promise<void> {
  const forwarder = await prisma.logisticsPartner.create({
    data: { code: 'LP-0001', name: 'Bayline Cargo', kind: 'FORWARDER', country: 'BD' },
  });
  await prisma.logisticsPartner.create({
    data: { code: 'LP-0002', name: 'Ashulia Road Haulage', kind: 'TRUCKING', country: 'BD' },
  });
  await prisma.user.create({
    data: {
      ...LOGISTICS_PARTNER,
      passwordHash: p.passwordHash,
      role: 'PARTNER',
      emailVerifiedAt: new Date(),
      logisticsPartnerId: forwarder.id,
    },
  });
  await prisma.hub.create({
    data: {
      code: 'HUB-BD-01',
      name: 'GarmentGate Ashulia hub',
      country: 'BD',
      city: 'Ashulia',
      addressLine1: 'Plot 14, Baipail Road',
      port: 'BDDAC',
    },
  });
  const rateCard = await prisma.rateCard.create({
    data: {
      partnerId: forwarder.id,
      mode: 'AIR',
      originCountry: 'BD',
      destinationCountry: 'US',
      unit: 'PER_KG',
      costMinor: 380,
      currency: 'USD',
      transitDaysMin: 4,
      transitDaysMax: 7,
      validFrom: dateOnly(-30),
      validTo: dateOnly(180),
    },
  });
  await prisma.logisticsMarginRule.create({ data: { name: 'Default', markupBps: 1500 } });

  // The order: 3,000 polos, made, inspected and paid in full, flying to Los Angeles.
  const quantity = 3_000;
  const buyerUnit = 640;
  const manufacturerUnit = 520;
  const buyerTotal = BigInt(buyerUnit * quantity);
  const order = await prisma.order.create({
    data: {
      code: LOGISTICS_ORDER,
      buyerCompanyId: p.buyer.companyId,
      manufacturerProfileId: p.factory.profileId,
      title: 'Pique polo, 220 GSM',
      specification: 'Per approved PP sample. Two-button placket, flat-knit collar.',
      quantity,
      buyerUnitPriceMinor: buyerUnit,
      manufacturerUnitPriceMinor: manufacturerUnit,
      buyerTotalMinor: buyerTotal,
      manufacturerTotalMinor: BigInt(manufacturerUnit * quantity),
      currency: 'USD',
      incoterm: 'CPT',
      destinationCountry: 'US',
      destinationPort: 'USLAX',
      hsCode: '610510',
      depositBps: 3000,
      status: 'READY_TO_SHIP',
      confirmedAt: daysFromNow(-60),
      commissionBps: 400,
      commissionMinor: 0n,
    },
  });

  const cargo = { cartons: 120, grossWeightGrams: 780_000, volumeLitres: 4_800 };
  await prisma.orderPacking.create({
    data: { orderId: order.id, ...cargo, updatedById: p.factory.userId },
  });
  const partnerCost = BigInt(780 * 380); // 780 kg chargeable × $3.80
  const freight = (partnerCost * 11_500n) / 10_000n;
  const insurance = (insuredValue(buyerTotal + freight) * 30n) / 10_000n;
  const total = freight + insurance;
  await prisma.logisticsQuote.create({
    data: {
      orderId: order.id,
      status: 'ACCEPTED',
      mode: 'AIR',
      incoterm: 'CPT',
      originCountry: 'BD',
      destinationCountry: 'US',
      destinationPort: 'USLAX',
      insured: true,
      weightGrams: cargo.grossWeightGrams,
      volumeLitres: cargo.volumeLitres,
      cargoEstimated: false,
      provider: 'MANUAL',
      rateCardId: rateCard.id,
      partnerId: forwarder.id,
      marginRuleName: 'Default',
      currency: 'USD',
      partnerCostMinor: partnerCost,
      freightMinor: freight,
      insuranceMinor: insurance,
      totalMinor: total,
      transitDaysMin: 4,
      transitDaysMax: 7,
      validUntil: daysFromNow(14),
      acceptedAt: daysFromNow(-3),
    },
  });

  // Deposit, balance and shipping, all received into the buyer's escrow.
  const deposit = (buyerTotal * 3000n) / 10_000n;
  const payments = [
    ['DEPOSIT', deposit, -58],
    ['BALANCE', buyerTotal - deposit, -4],
    ['LOGISTICS', total, -2],
  ] as const;
  for (const [purpose, amount, days] of payments) {
    const payment = await prisma.payment.create({
      data: {
        orderId: order.id,
        direction: 'INBOUND',
        purpose,
        amountMinor: amount,
        currency: 'USD',
        method: 'BANK_TRANSFER',
        provider: 'manual',
        reference: `PAY-${LOGISTICS_ORDER}-${purpose[0] ?? 'X'}1`,
        status: 'SUCCEEDED',
        paidAt: daysFromNow(days),
        confirmedById: p.admin,
      },
    });
    await prisma.ledgerTransaction.create({
      data: {
        kind: 'DEPOSIT',
        currency: 'USD',
        description: `${purpose.toLowerCase()} received from the buyer`,
        idempotencyKey: `${LOGISTICS_ORDER}:${purpose.toLowerCase()}`,
        postedAt: daysFromNow(days),
        orderId: order.id,
        paymentId: payment.id,
        entries: {
          create: [
            { accountId: p.accounts.cash, direction: 'DEBIT', amountMinor: amount },
            { accountId: p.accounts.escrow, direction: 'CREDIT', amountMinor: amount },
          ],
        },
      },
    });
  }
}
