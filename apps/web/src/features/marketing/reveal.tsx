'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Fades content up as it scrolls into view, once. Instant under reduced motion.
 *
 * `above` (content visible on load, like the hero): a transform-only CSS slide that runs on
 * first paint, so the text is painted immediately rather than after JavaScript fades it in.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  above = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  above?: boolean;
}) {
  if (above)
    return (
      <div
        className={cn(
          'animate-in slide-in-from-bottom-3 fill-mode-both duration-700 ease-(--ease-out-expo) motion-reduce:animate-none',
          className,
        )}
        style={{ animationDelay: `${String(delay)}s` }}
      >
        {children}
      </div>
    );
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
