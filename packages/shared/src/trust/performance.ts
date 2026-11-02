/**
 * The manufacturer performance score, 0–100, from three signals:
 *
 * - reviews: average buyer rating (1–5), 40%
 * - on-time: share of orders shipped by the requested date, 30%
 * - QC: share of final inspections passed first time, 30%
 *
 * Each signal is smoothed towards a neutral prior so one early order can't make or break a
 * factory (a Bayesian average: the prior counts as a few observations). With no data at all
 * the score is the prior, and `confidence` says how much real data is behind it.
 */
export interface PerformanceInput {
  /** Average overall rating of published buyer reviews, 1–5. */
  ratingAverage: number | null;
  reviewCount: number;
  shipped: number;
  shippedOnTime: number;
  finalInspections: number;
  finalPassedFirstTime: number;
}

export interface PerformanceResult {
  score: number;
  onTimeBps: number | null;
  qcPassBps: number | null;
  /** 0–1: how much of the score comes from real data rather than the prior. */
  confidence: number;
}

const PRIOR = {
  rating: { value: 3.5, weight: 3 },
  onTime: { value: 0.8, weight: 3 },
  qc: { value: 0.8, weight: 3 },
};
const WEIGHTS = { rating: 0.4, onTime: 0.3, qc: 0.3 };

const smooth = (value: number, count: number, prior: { value: number; weight: number }) =>
  (value * count + prior.value * prior.weight) / (count + prior.weight);

export function performanceScore(input: PerformanceInput): PerformanceResult {
  const rating = smooth(input.ratingAverage ?? 0, input.reviewCount, PRIOR.rating);
  const onTimeRate = input.shipped > 0 ? input.shippedOnTime / input.shipped : 0;
  const qcRate =
    input.finalInspections > 0 ? input.finalPassedFirstTime / input.finalInspections : 0;
  const onTime = smooth(onTimeRate, input.shipped, PRIOR.onTime);
  const qc = smooth(qcRate, input.finalInspections, PRIOR.qc);
  // Ratings run 1–5: map to 0–1.
  const raw = WEIGHTS.rating * ((rating - 1) / 4) + WEIGHTS.onTime * onTime + WEIGHTS.qc * qc;
  const data = input.reviewCount + input.shipped + input.finalInspections;
  return {
    score: Math.round(Math.min(1, Math.max(0, raw)) * 100),
    onTimeBps: input.shipped > 0 ? Math.round(onTimeRate * 10_000) : null,
    qcPassBps: input.finalInspections > 0 ? Math.round(qcRate * 10_000) : null,
    confidence: data / (data + 9),
  };
}
