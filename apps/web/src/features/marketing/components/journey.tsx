'use client';

import {
  Boxes,
  ClipboardCheck,
  FileSignature,
  FileText,
  Lock,
  PackageCheck,
  Plane,
  Scale,
  Scissors,
  Search,
  Shirt,
  Warehouse,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { formatMoney } from '@/lib/format';
import { cn } from '@/lib/utils';

export const STAGES = [
  { key: 'request', Icon: FileText, status: 'DRAFT', escrow: 0 },
  { key: 'match', Icon: Search, status: 'DRAFT', escrow: 0 },
  { key: 'quote', Icon: Scale, status: 'DRAFT', escrow: 0 },
  { key: 'sample', Icon: Shirt, status: 'SAMPLING', escrow: 0 },
  { key: 'confirm', Icon: FileSignature, status: 'DEPOSIT_PENDING', escrow: 30 },
  { key: 'materials', Icon: Boxes, status: 'IN_PRODUCTION', escrow: 30 },
  { key: 'production', Icon: Scissors, status: 'IN_PRODUCTION', escrow: 30 },
  { key: 'inline', Icon: ClipboardCheck, status: 'IN_PRODUCTION', escrow: 30 },
  { key: 'final', Icon: ClipboardCheck, status: 'QC', escrow: 30 },
  { key: 'hub', Icon: Warehouse, status: 'READY_TO_SHIP', escrow: 100 },
  { key: 'freight', Icon: Plane, status: 'SHIPPED', escrow: 100 },
  { key: 'delivered', Icon: PackageCheck, status: 'DELIVERED', escrow: 100 },
] as const;

const ORDER_TOTAL = 3_600_000; // USD 36,000: an illustrative 6,000-piece order

/**
 * The twelve managed stages as a scroll story: the list scrolls while a sticky order card
 * follows along (status, progress, money in escrow). On small screens the list stands alone.
 */
export function JourneyStory() {
  const t = useTranslations('marketing.journey');
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    for (const el of items.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stage = STAGES[active] ?? STAGES[0];
  const progress = Math.round(((active + 1) / STAGES.length) * 100);
  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-xs tracking-[0.12em] text-white/50 uppercase">
                  {t('demo.order')}
                </p>
                <p className="mt-1 font-mono text-sm">ORD-2026-00042</p>
              </div>
              <StatusBadge domain="order" status={stage.status} />
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="bg-brand-gold/15 text-brand-gold flex size-12 items-center justify-center rounded-xl">
                <stage.Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs text-white/50">
                  {t('stagesLabel', { n: active + 1 })}
                </p>
                <p className="text-xl font-semibold tracking-[-0.02em]">
                  {t(`stages.${stage.key}.title`)}
                </p>
              </div>
            </div>
            <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="bg-brand-gold h-full rounded-full transition-[width] duration-500 ease-(--ease-out-expo) motion-reduce:transition-none"
                style={{ width: `${String(progress)}%` }}
              />
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm">
              <span className="flex items-center gap-2 text-white/70">
                {t('demo.factory')} <Badge variant="code">MFR-BD-0421</Badge>
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="text-brand-gold size-3.5" aria-hidden="true" />
                <span className="tabular">
                  {formatMoney((ORDER_TOTAL * stage.escrow) / 100, 'USD', locale)}
                </span>
                <span className="text-white/50">{t('demo.inEscrow')}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <ol className="relative grid gap-3">
        <span
          aria-hidden="true"
          className="absolute start-[1.375rem] top-4 bottom-4 w-px bg-white/10"
        />
        {STAGES.map(({ key, Icon }, i) => (
          <li
            key={key}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-index={i}
            className={cn(
              'relative flex gap-5 rounded-2xl border p-5 transition-colors duration-300',
              i === active
                ? 'border-white/20 bg-white/[0.07]'
                : 'border-transparent bg-transparent',
            )}
          >
            <span
              className={cn(
                'relative flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors',
                i <= active
                  ? 'bg-brand-gold text-brand-deep border-transparent'
                  : 'bg-brand-deep border-white/15 text-white/60',
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-white/45 uppercase">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-0.5 text-lg font-semibold tracking-[-0.015em]">
                {t(`stages.${key}.title`)}
              </h3>
              <p className="mt-1.5 leading-relaxed text-white/65">{t(`stages.${key}.body`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
