import type { PublicStats } from '@garmentgate/shared';
import { getFormatter, getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';

const KEYS = ['verifiedFactories', 'sourcingCountries', 'categories', 'inspections'] as const;

/** Live counts from the platform (totals only). Renders nothing when the API is unreachable. */
export async function StatsStrip({
  stats,
  inverted = false,
  keys = KEYS,
}: {
  stats: PublicStats | null;
  inverted?: boolean;
  keys?: readonly (keyof PublicStats)[];
}) {
  if (!stats) return null;
  const t = await getTranslations('marketing.common.stats');
  const format = await getFormatter();
  return (
    <dl
      className={cn(
        'grid grid-cols-2 gap-px overflow-hidden rounded-2xl border lg:grid-cols-4',
        inverted ? 'border-white/10 bg-white/10' : 'bg-border',
      )}
    >
      {keys.map((key) => (
        <div key={key} className={cn('px-6 py-7', inverted ? 'bg-brand-deep' : 'bg-card')}>
          <dt className={cn('text-sm', inverted ? 'text-white/60' : 'text-muted-foreground')}>
            {t(key)}
          </dt>
          <dd className="font-display tabular mt-2 text-4xl tracking-[-0.02em] sm:text-5xl">
            {format.number(stats[key])}
          </dd>
        </div>
      ))}
    </dl>
  );
}
