'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useIsClient } from '@/lib/client-hooks';
import { DURATION, EASE_OUT_EXPO } from '@/lib/motion';

/**
 * Soft fade-and-rise for page content. Used from each area's template.tsx, which Next remounts
 * on every navigation (no pathname read needed). Disabled under reduced motion by MotionConfig.
 *
 * Not on the first page load: server-rendered content must be visible on first paint (an
 * opacity-0 start would hold back Largest Contentful Paint until JavaScript runs).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const navigated = useIsClient();
  return (
    <motion.div
      initial={navigated ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
