'use client';

import { type StatusDomain, type StatusOf, statusTone } from '@garmentgate/shared';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const DOT: Record<ReturnType<typeof statusTone>, string> = {
  neutral: 'bg-neutral-ink/60',
  info: 'bg-info',
  progress: 'bg-progress',
  warning: 'bg-warning',
  success: 'bg-success',
  danger: 'bg-destructive',
};

/**
 * The one way to show a status. Colour comes from the shared STATUS_TONES map, so
 * "In production" looks the same on every screen; the label comes from i18n.
 */
export function StatusBadge<D extends StatusDomain>({
  domain,
  status,
  className,
}: {
  domain: D;
  status: StatusOf<D>;
  className?: string;
}) {
  const t = useTranslations('statuses');
  const tone = statusTone(domain, status);
  const live = tone === 'progress';
  return (
    <Badge variant={tone} className={cn('ps-1.5', className)}>
      <span className="relative flex size-1.5" aria-hidden="true">
        {live ? (
          <span
            className={cn(
              'absolute inline-flex size-full rounded-full opacity-60 motion-safe:animate-ping',
              DOT[tone],
            )}
          />
        ) : null}
        <span className={cn('relative inline-flex size-1.5 rounded-full', DOT[tone])} />
      </span>
      {/* Keys are typed per domain in messages/en.json → statuses.<domain>.<STATUS>. */}
      {t(`${domain}.${status}` as Parameters<typeof t>[0])}
    </Badge>
  );
}
