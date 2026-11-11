'use client';

import { useApproxMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';

/** "≈ €91.20" next to a price, in the visitor's display currency (nothing when it's the same). */
export function Approx({
  minor,
  currency = 'USD',
  className,
}: {
  minor: number;
  currency?: string;
  className?: string;
}) {
  const approx = useApproxMoney()(minor, currency);
  if (!approx) return null;
  return (
    <span className={cn('text-muted-foreground block text-sm font-normal', className)}>
      ≈ {approx}
    </span>
  );
}
