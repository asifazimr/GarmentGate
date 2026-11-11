import { convertMinor, } from '@garmentgate/shared';
export const monthKey = (d) => d.toISOString().slice(0, 7);
export function overviewStart(now, months) {
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (months - 1), 1));
}
export function monthsBetween(from, now) {
    const out = [];
    const cursor = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), 1));
    const last = monthKey(now);
    while (monthKey(cursor) <= last) {
        out.push(monthKey(cursor));
        cursor.setUTCMonth(cursor.getUTCMonth() + 1);
    }
    return out;
}
export function buildOverview(orders, rfqs, rates, months) {
    const toUsd = (amount, currency) => rates[currency] ? convertMinor(amount, currency, 'USD', rates) : null;
    const series = new Map(months.map((month) => [
        month,
        {
            month,
            gmvUsdMinor: 0,
            markupUsdMinor: 0,
            commissionUsdMinor: 0,
            orders: 0,
            rfqs: 0,
            rfqsConverted: 0,
        },
    ]));
    const categories = new Map();
    const skippedCurrencies = new Set();
    let gmv = 0n;
    let markup = 0n;
    let commission = 0n;
    for (const o of orders) {
        const row = series.get(monthKey(o.confirmedAt));
        if (!row)
            continue;
        const g = toUsd(o.buyerTotalMinor, o.currency);
        const m = toUsd(o.buyerTotalMinor - o.manufacturerTotalMinor, o.currency);
        const c = toUsd(o.commissionMinor, o.currency);
        row.orders += 1;
        if (g === null || m === null || c === null) {
            skippedCurrencies.add(o.currency);
            continue;
        }
        gmv += g;
        markup += m;
        commission += c;
        row.gmvUsdMinor += Number(g);
        row.markupUsdMinor += Number(m);
        row.commissionUsdMinor += Number(c);
        const cat = categories.get(o.category) ?? { gmv: 0n, orders: 0 };
        categories.set(o.category, { gmv: cat.gmv + g, orders: cat.orders + 1 });
    }
    let converted = 0;
    for (const r of rfqs) {
        const row = series.get(monthKey(r.publishedAt));
        if (!row)
            continue;
        row.rfqs += 1;
        if (r.converted) {
            row.rfqsConverted += 1;
            converted += 1;
        }
    }
    const rfqCount = [...series.values()].reduce((a, r) => a + r.rfqs, 0);
    return {
        gmvUsdMinor: Number(gmv),
        markupUsdMinor: Number(markup),
        commissionUsdMinor: Number(commission),
        revenueUsdMinor: Number(markup + commission),
        confirmedOrders: [...series.values()].reduce((a, r) => a + r.orders, 0),
        rfqs: rfqCount,
        rfqsConverted: converted,
        conversionBps: rfqCount > 0 ? Math.round((converted / rfqCount) * 10_000) : 0,
        series: [...series.values()],
        topCategories: [...categories.entries()]
            .map(([name, v]) => ({ name, gmvUsdMinor: Number(v.gmv), orders: v.orders }))
            .sort((a, b) => b.gmvUsdMinor - a.gmvUsdMinor)
            .slice(0, 6),
        skippedCurrencies: [...skippedCurrencies],
    };
}
//# sourceMappingURL=overview.js.map