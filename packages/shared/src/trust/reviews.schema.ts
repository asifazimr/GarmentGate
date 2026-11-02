import { z } from 'zod';

/** How long after completion each side can leave a review. */
export const REVIEW_WINDOW_DAYS = 30;
/** Reviews stay hidden from the other side until both are in or this many days pass. */
export const REVIEW_BLIND_DAYS = 14;

export const ReviewDirectionSchema = z.enum(['BUYER_TO_MANUFACTURER', 'MANUFACTURER_TO_BUYER']);
export type ReviewDirection = z.infer<typeof ReviewDirectionSchema>;

const stars = z.coerce.number({ error: 'Pick a rating' }).int().min(1).max(5);

/**
 * One review per side per completed order. The three ratings mean, by direction:
 * buyer → factory: quality, communication, on-time delivery;
 * factory → buyer: clarity of specs, communication, on-time payment.
 */
export const SubmitReviewSchema = z.object({
  quality: stars,
  communication: stars,
  onTime: stars,
  comment: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .transform((v) => (v === '' ? undefined : v)),
});
export type SubmitReviewInput = z.input<typeof SubmitReviewSchema>;
export type SubmitReviewDto = z.output<typeof SubmitReviewSchema>;

/** Overall rating: the mean of the three, to one decimal. */
export function overallRating(r: { quality: number; communication: number; onTime: number }) {
  return Math.round(((r.quality + r.communication + r.onTime) / 3) * 10) / 10;
}

const ratings = {
  rating: z.number(),
  quality: z.number().int(),
  communication: z.number().int(),
  onTime: z.number().int(),
};

/** A review on an order, as a party sees it. The author is always a code, never a name. */
export const OrderReviewSchema = z.strictObject({
  direction: ReviewDirectionSchema,
  ...ratings,
  comment: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type OrderReview = z.infer<typeof OrderReviewSchema>;

/** Both sides' reviews on an order, and what the viewer can still do. */
export const OrderReviewsSchema = z.strictObject({
  mine: OrderReviewSchema.nullable(),
  /** The other side's review: null until both are in or the blind period ends. */
  theirs: OrderReviewSchema.nullable(),
  /** The other side has reviewed, but it's still hidden. */
  theirsPending: z.boolean(),
  canReview: z.boolean(),
  /** Last day to leave a review. */
  closesAt: z.iso.datetime().nullable(),
});
export type OrderReviews = z.infer<typeof OrderReviewsSchema>;

/** A buyer review on a factory's public profile: country of the buyer only. */
export const PublicReviewSchema = z.strictObject({
  buyerCountry: z.string().length(2),
  ...ratings,
  comment: z.string().nullable(),
  createdAt: z.iso.datetime(),
});
export type PublicReview = z.infer<typeof PublicReviewSchema>;

export const PublicRatingSchema = z.strictObject({
  average: z.number(),
  count: z.number().int(),
  quality: z.number(),
  communication: z.number(),
  onTime: z.number(),
});
export type PublicRating = z.infer<typeof PublicRatingSchema>;
