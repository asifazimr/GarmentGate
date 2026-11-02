'use client';

import { RotateCw, TriangleAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Appear } from './appear';

/** Shown when loading failed. Says what went wrong and always offers a retry. */
export function ErrorState({
  title,
  description,
  onRetry,
  retrying = false,
  size = 'default',
  className,
}: {
  title?: ReactNode;
  description?: ReactNode;
  onRetry?: () => void;
  retrying?: boolean;
  size?: 'default' | 'compact';
  className?: string;
}) {
  const t = useTranslations('patterns.error');
  return (
    <Appear
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center text-center',
        size === 'default' ? 'bg-card rounded-2xl border px-6 py-12 sm:py-16' : 'px-4 py-8',
        className,
      )}
    >
      <span
        className="bg-danger-soft text-danger-ink flex size-11 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        <TriangleAlert className="size-5" />
      </span>
      <h3 className="mt-4 text-base font-semibold tracking-[-0.01em]">{title ?? t('title')}</h3>
      <p className="text-muted-foreground mt-1.5 max-w-sm text-sm leading-relaxed text-pretty">
        {description ?? t('body')}
      </p>
      {onRetry ? (
        <Button variant="outline" className="mt-5" onClick={onRetry} disabled={retrying}>
          <RotateCw
            className={cn('size-4', retrying && 'animate-spin motion-reduce:animate-none')}
            aria-hidden="true"
          />
          {t('retry')}
        </Button>
      ) : null}
    </Appear>
  );
}
