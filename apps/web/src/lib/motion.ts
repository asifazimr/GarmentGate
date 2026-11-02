/**
 * Shared motion tokens (CLAUDE.md: ease-out-expo, 150–300 ms for UI). Everything animated with
 * Motion goes through MotionConfig reducedMotion="user", so these never play for people who
 * asked for less motion.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const DURATION = { fast: 0.15, base: 0.22, slow: 0.3 } as const;
