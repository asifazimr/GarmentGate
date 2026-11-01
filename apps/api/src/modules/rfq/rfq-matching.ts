import type { MatchReason } from '@garmentgate/shared';

export interface MatchableFactory {
  categories: { id: string; parentId: string | null }[];
  moqPcs: number | null;
  monthlyCapacityPcs: number | null;
}

export interface MatchableRfq {
  category: { id: string; parentId: string | null };
  quantity: number;
  deadline: Date;
  requiredDeliveryDate: Date | null;
  /** The factory was invited explicitly (e.g. a request from its catalog product). */
  invited: boolean;
  /** Catalog requests go to that product's factory only. */
  inviteOnly: boolean;
}

/** Production window assumed when the buyer gives no delivery date. */
export const DEFAULT_WINDOW_DAYS = 90;
const DAY = 86_400_000;

/**
 * Which RFQs reach which factories. Invited factories always see the RFQ. Otherwise a factory
 * must make the category (or its parent, or one of its sub-categories), take orders this
 * small (MOQ), and have the monthly capacity to make the quantity between the quote deadline
 * and the delivery date. Unknown MOQ or capacity doesn't rule a factory out.
 */
export function matchRfq(
  factory: MatchableFactory,
  rfq: MatchableRfq,
): { matched: boolean; reasons: MatchReason[] } {
  const reasons: MatchReason[] = [];
  if (rfq.invited) reasons.push('INVITED');

  const category = factory.categories.some(
    (c) =>
      c.id === rfq.category.id || c.id === rfq.category.parentId || c.parentId === rfq.category.id,
  );
  if (category) reasons.push('CATEGORY');

  const moq = factory.moqPcs === null || factory.moqPcs <= rfq.quantity;
  if (moq) reasons.push('MOQ');

  const end =
    rfq.requiredDeliveryDate?.getTime() ?? rfq.deadline.getTime() + DEFAULT_WINDOW_DAYS * DAY;
  const months = Math.max(1, Math.floor((end - rfq.deadline.getTime()) / (30 * DAY)));
  const capacity =
    factory.monthlyCapacityPcs === null || factory.monthlyCapacityPcs * months >= rfq.quantity;
  if (capacity) reasons.push('CAPACITY');

  const matched = rfq.invited || (!rfq.inviteOnly && category && moq && capacity);
  return { matched, reasons };
}
