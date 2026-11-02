'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useIsClient } from '@/lib/client-hooks';
import { DURATION, EASE_OUT_EXPO } from '@/lib/motion';

/**
 * Content that replaces a loading state fades and rises a few pixels instead of popping in.
 * A client wrapper, so server components (EmptyState, not-found) can use it with plain children.
 */
export function Appear({
  children,
  className,
  role,
}: {
  children: ReactNode;
  className?: string;
  role?: 'alert';
}) {
  // Server-rendered states (e.g. the 404) are shown as is; only client-side swaps animate.
  const swapped = useIsClient();
  return (
    <motion.div
      role={role}
      className={className}
      initial={swapped ? { opacity: 0, y: 4 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}
