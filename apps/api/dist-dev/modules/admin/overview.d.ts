import { type Currency, type UnitsPerUsd } from '@garmentgate/shared';
export interface OverviewOrder {
    confirmedAt: Date;
    currency: Currency;
    buyerTotalMinor: bigint;
    manufacturerTotalMinor: bigint;
    commissionMinor: bigint;
    category: string | null;
}
export interface OverviewRfq {
    publishedAt: Date;
    converted: boolean;
}
export declare const monthKey: (d: Date) => string;
export declare function overviewStart(now: Date, months: number): Date;
export declare function monthsBetween(from: Date, now: Date): string[];
export declare function buildOverview(orders: OverviewOrder[], rfqs: OverviewRfq[], rates: UnitsPerUsd, months: string[]): {
    gmvUsdMinor: number;
    markupUsdMinor: number;
    commissionUsdMinor: number;
    revenueUsdMinor: number;
    confirmedOrders: number;
    rfqs: number;
    rfqsConverted: number;
    conversionBps: number;
    series: {
        month: string;
        gmvUsdMinor: number;
        markupUsdMinor: number;
        commissionUsdMinor: number;
        orders: number;
        rfqs: number;
        rfqsConverted: number;
    }[];
    topCategories: {
        name: string | null;
        gmvUsdMinor: number;
        orders: number;
    }[];
    skippedCurrencies: ("USD" | "EUR" | "GBP" | "BDT" | "INR" | "VND" | "TRY" | "PKR" | "CNY")[];
};
