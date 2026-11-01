'use client';

import { Check, Clock, Hourglass, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { AppHeader } from '@/features/account/components/app-header';
import { homeFor, refreshUser, useMe } from '@/features/auth/api';
import { cn } from '@/lib/utils';

export function PendingStatus() {
  const t = useTranslations('pending');
  const router = useRouter();
  // Poll so the page moves on by itself once an admin decides.
  const me = useMe({ refetchInterval: 15_000 });
  const company = me.data?.company;

  useEffect(() => {
    if (!company || company.kycStatus === 'PENDING_REVIEW') return;
    void (async () => {
      const user = await refreshUser();
      if (user) {
        router.replace(homeFor(user));
        router.refresh();
      }
    })();
  }, [company, router]);

  const steps = [
    { key: 'account', state: 'done' },
    { key: 'submitted', state: 'done' },
    { key: 'review', state: 'current' },
    { key: 'ready', state: 'todo' },
  ] as const;

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-xl flex-1 px-4 py-10 sm:px-6 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-10"
        >
          <div className="space-y-4 text-center">
            <span className="bg-primary/10 text-primary mx-auto flex size-16 items-center justify-center rounded-full">
              <Hourglass className="size-8" aria-hidden="true" />
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-balance">{t('title')}</h1>
            <p className="text-muted-foreground text-pretty">{t('body')}</p>
          </div>

          <div className="bg-muted/40 rounded-2xl border p-5 text-center">
            <p className="text-muted-foreground text-sm">{t('code')}</p>
            {me.isPending ? (
              <Skeleton className="mx-auto mt-2 h-8 w-40" />
            ) : (
              <p className="mt-1 font-mono text-2xl font-semibold tracking-wider">
                {company?.publicCode ?? '—'}
              </p>
            )}
            <p className="text-muted-foreground mt-2 text-sm">
              {t('codeHint', {
                audience:
                  company?.type === 'MANUFACTURER'
                    ? t('audienceBuyers')
                    : t('audienceManufacturers'),
              })}
            </p>
          </div>

          <ol className="space-y-0" aria-label={t('title')}>
            {steps.map((step, i) => (
              <li key={step.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      'flex size-9 items-center justify-center rounded-full border-2',
                      step.state === 'done' && 'bg-primary border-primary text-primary-foreground',
                      step.state === 'current' && 'border-primary text-primary',
                      step.state === 'todo' && 'text-muted-foreground',
                    )}
                  >
                    {step.state === 'done' ? (
                      <Check className="size-4" aria-hidden="true" />
                    ) : step.state === 'current' ? (
                      <Clock className="size-4 motion-safe:animate-pulse" aria-hidden="true" />
                    ) : (
                      <Lock className="size-4" aria-hidden="true" />
                    )}
                  </span>
                  {i < steps.length - 1 ? (
                    <span
                      className={cn(
                        'w-0.5 flex-1',
                        step.state === 'done' ? 'bg-primary' : 'bg-border',
                      )}
                    />
                  ) : null}
                </div>
                <div className="pb-8">
                  <p
                    className={cn(
                      'pt-1.5 font-medium',
                      step.state === 'todo' && 'text-muted-foreground',
                    )}
                  >
                    {t(`timeline.${step.key}`)}
                  </p>
                  {step.key === 'review' ? (
                    <p className="text-muted-foreground text-sm" aria-live="polite">
                      {t('checking')}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          <p className="text-muted-foreground text-center text-sm">{t('help')}</p>
        </motion.div>
      </main>
    </div>
  );
}
