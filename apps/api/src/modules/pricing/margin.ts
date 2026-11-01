export interface MarginRuleLike {
  id: string;
  markupBps: number;
  minMarginPerUnitMinor: number | null;
  categoryId: string | null;
  companyId: string | null;
}

/**
 * Picks the rule for a catalog price (no specific buyer): the product's category beats its
 * parent category, which beats the default rule (no category). Company-specific rules apply
 * to quotes for that buyer, not to the public catalog.
 */
export function pickCatalogRule<R extends MarginRuleLike>(
  rules: R[],
  category: { id: string; parentId: string | null },
): R | null {
  const generic = rules.filter((r) => r.companyId === null);
  return (
    generic.find((r) => r.categoryId === category.id) ??
    (category.parentId ? generic.find((r) => r.categoryId === category.parentId) : undefined) ??
    generic.find((r) => r.categoryId === null) ??
    null
  );
}

/** Buyer price in minor units: markup in basis points, never below the per-unit floor. */
export function applyMarkup(
  manufacturerUnitPriceMinor: number,
  rule: MarginRuleLike | null,
): number {
  if (!rule) return manufacturerUnitPriceMinor;
  const marked = Math.round((manufacturerUnitPriceMinor * (10_000 + rule.markupBps)) / 10_000);
  const floor = manufacturerUnitPriceMinor + (rule.minMarginPerUnitMinor ?? 0);
  return Math.max(marked, floor);
}
