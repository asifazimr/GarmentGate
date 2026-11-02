'use client';

import { ClipboardCheck, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Timeline } from '@/components/patterns/timeline';
import { Badge } from '@/components/ui/badge';
import { formatMoney } from '@/lib/format';

/**
 * Product preview in the hero: a live-looking order card built from real components, so the
 * marketing page shows the actual product rather than a screenshot that drifts out of date.
 */
export function HeroVisual() {
  const t = useTranslations('marketing.mock');
  const locale = useLocale();

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div
        aria-hidden="true"
        className="from-primary/25 absolute -inset-8 -z-10 rounded-[2.5rem] bg-radial-[at_60%_40%] via-transparent to-transparent blur-2xl"
      />
      <motion.div
        // Settles into place without fading, so it's painted on first load.
        initial={{ y: 24, rotate: -1 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-card rounded-2xl border p-5 shadow-xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-subtle-foreground text-xs font-medium tracking-wide uppercase">
              {t('order')}
            </p>
            <p className="font-mono text-sm font-semibold">ORD-2026-00017</p>
          </div>
          <StatusBadge domain="order" status="IN_PRODUCTION" />
        </div>
        <p className="mt-3 text-[0.9375rem] font-medium">{t('quantity')}</p>
        <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
          {t('factory')}
          <Badge variant="code">MFR-BD-0421</Badge>
        </div>

        <div className="mt-5">
          <div className="text-muted-foreground mb-1.5 flex justify-between text-xs">
            <span>{t('progress')}</span>
            <span className="tabular">62%</span>
          </div>
          <div className="bg-muted h-1.5 overflow-hidden rounded-full">
            <motion.div
              className="bg-primary h-full rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '62%' }}
              transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <Timeline
          className="mt-6"
          items={[
            { id: 'c', title: t('milestones.confirmed'), meta: 'Sep 20', state: 'done' },
            { id: 'f', title: t('milestones.fabric'), meta: 'Oct 4', state: 'done' },
            { id: 'cut', title: t('milestones.cutting'), meta: 'Oct 15', state: 'done' },
            { id: 's', title: t('milestones.sewing'), state: 'current' },
            { id: 'ship', title: t('milestones.shipping'), meta: 'Nov 22', state: 'upcoming' },
          ]}
        />

        <div className="bg-surface -mx-5 -mb-5 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-b-2xl border-t px-5 py-3.5 sm:-mx-6 sm:-mb-6 sm:px-6">
          <span className="text-success-ink inline-flex items-center gap-1.5 text-sm font-medium">
            <Lock className="size-3.5" aria-hidden="true" />
            <span className="tabular">{formatMoney(1170000, 'USD', locale)}</span>
            <span className="text-muted-foreground font-normal">{t('escrow')}</span>
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="bg-card absolute -end-3 -bottom-6 hidden items-center gap-3 rounded-xl border px-4 py-3 shadow-lg sm:flex lg:-end-8"
      >
        <span className="bg-success-soft text-success-ink flex size-9 items-center justify-center rounded-full">
          <ClipboardCheck className="size-4" aria-hidden="true" />
        </span>
        <span className="text-sm">
          <span className="block font-medium">{t('nextQc')}</span>
          <span className="text-muted-foreground text-xs">AQL 2.5 · Level II</span>
        </span>
      </motion.div>
    </div>
  );
}
