'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Soft fade-and-rise for page content. Used from each area's template.tsx, which Next remounts
 * on every navigation (no pathname read needed). Disabled under reduced motion by MotionConfig.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
