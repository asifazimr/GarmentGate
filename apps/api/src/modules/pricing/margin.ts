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
  return mostSpecific(
    rules.filter((r) => r.companyId === null),
    category,
  );
}

/**
 * Picks the rule for a quote to a specific buyer: a rule negotiated with that buyer beats the
 * generic rules; within each group, category beats parent category beats "any category".
 */
export function pickQuoteRule<R extends MarginRuleLike>(
  rules: R[],
  category: { id: string; parentId: string | null },
  buyerCompanyId: string,
): R | null {
  return (
    mostSpecific(
      rules.filter((r) => r.companyId === buyerCompanyId),
      category,
    ) ?? pickCatalogRule(rules, category)
  );
}

function mostSpecific<R extends MarginRuleLike>(
  rules: R[],
  category: { id: string; parentId: string | null },
): R | null {
  return (
    rules.find((r) => r.categoryId === category.id) ??
    (category.parentId ? rules.find((r) => r.categoryId === category.parentId) : undefined) ??
    rules.find((r) => r.categoryId === null) ??
    null
  );
}

/**
 * Buyer price in minor units: markup in basis points, never below the per-unit floor. A factory
 * plan can take `discountBps` off the markup (down to zero); the floor still applies.
 */
export function applyMarkup(
  manufacturerUnitPriceMinor: number,
  rule: MarginRuleLike | null,
  discountBps = 0,
): number {
  if (!rule) return manufacturerUnitPriceMinor;
  const markupBps = Math.max(0, rule.markupBps - discountBps);
  const marked = Math.round((manufacturerUnitPriceMinor * (10_000 + markupBps)) / 10_000);
  const floor = manufacturerUnitPriceMinor + (rule.minMarginPerUnitMinor ?? 0);
  return Math.max(marked, floor);
}
