import type { QuoteBadge } from './rfq.schema.js';

export interface RankableQuote {
  id: string;
  unitPriceMinor: number;
  leadTimeDays: number;
  /** 0–100 */
  performanceScore: number;
}

/** How much each factor counts towards "best value". */
export const VALUE_WEIGHTS = { price: 0.6, leadTime: 0.25, score: 0.15 } as const;

/**
 * Value score in [0, 1]: price and lead time relative to the best on offer, plus the factory's
 * performance score. Higher is better.
 */
export function valueScore(quote: RankableQuote, all: readonly RankableQuote[]): number {
  const minPrice = Math.min(...all.map((q) => q.unitPriceMinor));
  const minLead = Math.min(...all.map((q) => q.leadTimeDays));
  return (
    VALUE_WEIGHTS.price * (minPrice / quote.unitPriceMinor) +
    VALUE_WEIGHTS.leadTime * (minLead / quote.leadTimeDays) +
    VALUE_WEIGHTS.score * (Math.min(Math.max(quote.performanceScore, 0), 100) / 100)
  );
}

/**
 * Badges for the comparison table. Only awarded when there's something to compare (2+ quotes);
 * ties go to the lower price, then the shorter lead time.
 */
export function quoteBadges(quotes: readonly RankableQuote[]): Map<string, QuoteBadge[]> {
  const badges = new Map<string, QuoteBadge[]>(quotes.map((q) => [q.id, []]));
  if (quotes.length < 2) return badges;
  const award = (badge: QuoteBadge, winner: RankableQuote | undefined) => {
    if (winner) badges.get(winner.id)?.push(badge);
  };
  const byPrice = (a: RankableQuote, b: RankableQuote) =>
    a.unitPriceMinor - b.unitPriceMinor || a.leadTimeDays - b.leadTimeDays;

  award(
    'BEST_VALUE',
    [...quotes].sort((a, b) => valueScore(b, quotes) - valueScore(a, quotes) || byPrice(a, b))[0],
  );
  award('LOWEST_PRICE', [...quotes].sort(byPrice)[0]);
  award(
    'FASTEST',
    [...quotes].sort(
      (a, b) => a.leadTimeDays - b.leadTimeDays || a.unitPriceMinor - b.unitPriceMinor,
    )[0],
  );
  return badges;
}
