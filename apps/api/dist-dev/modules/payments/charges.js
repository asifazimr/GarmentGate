import { BuyerPlusSettingsSchema, convertMinor, DEFAULT_BUYER_PLUS_SETTINGS, discountedFee, DEFAULT_SERVICE_FEES, ServiceFeesSchema, } from '@garmentgate/shared';
export const SERVICE_FEES_KEY = 'service_fees';
export const BUYER_PLUS_KEY = 'buyer_plus';
export async function plusPerks(client, buyerCompanyId) {
    const profile = await client.buyerProfile.findUnique({
        where: { companyId: buyerCompanyId },
        select: { plusActive: true },
    });
    if (!profile?.plusActive)
        return null;
    const row = await client.platformSetting.findUnique({ where: { key: BUYER_PLUS_KEY } });
    const parsed = BuyerPlusSettingsSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_BUYER_PLUS_SETTINGS;
}
export async function serviceFees(client) {
    const row = await client.platformSetting.findUnique({ where: { key: SERVICE_FEES_KEY } });
    const parsed = ServiceFeesSchema.safeParse(row?.value);
    return parsed.success ? parsed.data : DEFAULT_SERVICE_FEES;
}
async function inCurrency(client, usdMinor, currency) {
    const rates = { USD: '1' };
    for (const r of await client.exchangeRate.findMany())
        rates[r.currency] = r.unitsPerUsd.toString();
    try {
        return convertMinor(BigInt(usdMinor), 'USD', currency, rates);
    }
    catch {
        return null;
    }
}
export async function chargeSample(tx, order, sampleId) {
    const fees = await serviceFees(tx);
    const base = await inCurrency(tx, fees.sampleFeeUsdMinor, order.currency);
    const plus = await plusPerks(tx, order.buyerCompanyId);
    const amount = base === null ? null : discountedFee(base, plus?.sampleDiscountBps ?? 0);
    await tx.orderCharge.create({
        data: {
            orderId: order.id,
            kind: 'SAMPLE_FEE',
            sampleId,
            currency: order.currency,
            amountMinor: amount ?? 0n,
            waived: amount === null || amount === 0n,
        },
    });
}
export async function chargeInspection(tx, order, inspectionId) {
    const fees = await serviceFees(tx);
    const amount = await inCurrency(tx, fees.inspectionFeeUsdMinor, order.currency);
    const first = fees.firstInspectionFree &&
        (await tx.orderCharge.count({
            where: { kind: 'INSPECTION_FEE', order: { buyerCompanyId: order.buyerCompanyId } },
        })) === 0;
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
//# sourceMappingURL=charges.js.map