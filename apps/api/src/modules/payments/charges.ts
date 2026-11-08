import {
  type BuyerPlusSettings,
  BuyerPlusSettingsSchema,
  convertMinor,
  DEFAULT_BUYER_PLUS_SETTINGS,
  discountedFee,
  type Currency,
  DEFAULT_SERVICE_FEES,
  type ServiceFees,
  ServiceFeesSchema,
  type UnitsPerUsd,
} from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';

type Client = Prisma.TransactionClient;

export const SERVICE_FEES_KEY = 'service_fees';
export const BUYER_PLUS_KEY = 'buyer_plus';

/** The GarmentGate Plus terms when this buyer is a member, else null. */
export async function plusPerks(
  client: Client,
  buyerCompanyId: string,
): Promise<BuyerPlusSettings | null> {
  const profile = await client.buyerProfile.findUnique({
    where: { companyId: buyerCompanyId },
    select: { plusActive: true },
  });
  if (!profile?.plusActive) return null;
  const row = await client.platformSetting.findUnique({ where: { key: BUYER_PLUS_KEY } });
  const parsed = BuyerPlusSettingsSchema.safeParse(row?.value);
  return parsed.success ? parsed.data : DEFAULT_BUYER_PLUS_SETTINGS;
}

/** `platform_settings.service_fees`, or the business model's defaults. */
export async function serviceFees(client: Client): Promise<ServiceFees> {
  const row = await client.platformSetting.findUnique({ where: { key: SERVICE_FEES_KEY } });
  const parsed = ServiceFeesSchema.safeParse(row?.value);
  return parsed.success ? parsed.data : DEFAULT_SERVICE_FEES;
}

/** A USD fee in the order's currency at the reference rate (null when there's no rate). */
async function inCurrency(client: Client, usdMinor: number, currency: Currency) {
  const rates: UnitsPerUsd = { USD: '1' };
  for (const r of await client.exchangeRate.findMany())
    rates[r.currency] = r.unitsPerUsd.toString();
  try {
    return convertMinor(BigInt(usdMinor), 'USD', currency, rates);
  } catch {
    return null;
  }
}

/**
 * The buyer owes a sample fee for each sample it requests (business model: USD 30–150 per
 * sample, credited on the bulk order). Called inside the request's transaction.
 */
export async function chargeSample(
  tx: Client,
  order: { id: string; currency: Currency; buyerCompanyId: string },
  sampleId: string,
): Promise<void> {
  const fees = await serviceFees(tx);
  const base = await inCurrency(tx, fees.sampleFeeUsdMinor, order.currency);
  // GarmentGate Plus members pay less per sample.
  const plus = await plusPerks(tx, order.buyerCompanyId);
  const amount = base === null ? null : discountedFee(base, plus?.sampleDiscountBps ?? 0);
  await tx.orderCharge.create({
    data: {
      orderId: order.id,
      kind: 'SAMPLE_FEE',
      sampleId,
      currency: order.currency,
      // No rate for the order's currency: nothing GarmentGate can price, so nothing owed.
      amountMinor: amount ?? 0n,
      waived: amount === null || amount === 0n,
    },
  });
}

/**
 * One inspection day per inspection (business model: USD 150–300 a day). The buyer's first
 * inspection ever is free when the settings say so. Called inside the creating transaction.
 */
export async function chargeInspection(
  tx: Client,
  order: { id: string; currency: Currency; buyerCompanyId: string },
  inspectionId: string,
): Promise<void> {
  const fees = await serviceFees(tx);
  const amount = await inCurrency(tx, fees.inspectionFeeUsdMinor, order.currency);
  const first =
    fees.firstInspectionFree &&
    (await tx.orderCharge.count({
      where: { kind: 'INSPECTION_FEE', order: { buyerCompanyId: order.buyerCompanyId } },
    })) === 0;
  // GarmentGate Plus members can have every inspection free.
  const member = (await plusPerks(tx, order.buyerCompanyId))?.freeInspections ?? false;
  await tx.orderCharge.create({
    data: {
      orderId: order.id,
      kind: 'INSPECTION_FEE',
      inspectionId,
      currency: order.currency,
      amountMinor: amount ?? 0n,
      waived: first || member || amount === null || amount === 0n,
    },
  });
}
