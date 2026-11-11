import type { PublicPricing } from '@garmentgate/shared';
import { Factory, Landmark, RotateCcw, ShoppingBag } from 'lucide-react';
import { getFormatter, getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';

const DEFAULT_SCHEDULE: PublicPricing['releaseSchedule'] = [
  { trigger: 'PRODUCTION_START', bps: 2500 },
  { trigger: 'SHIPPED', bps: 7000 },
  { trigger: 'CLAIM_WINDOW', bps: 500 },
];
const SHADES = ['bg-brand-gold', 'bg-primary', 'bg-white/70', 'bg-white/40', 'bg-white/25'];

/**
 * Escrow, drawn: buyer → GarmentGate escrow → factory, with the release schedule as a bar
 * whose shares come from the live settings. Pulses travel the line (still under reduced motion).
 */
export async function MoneyFlow({
  schedule,
}: {
  schedule: PublicPricing['releaseSchedule'] | null;
}) {
  const t = await getTranslations('marketing.money');
  const format = await getFormatter();
  const tranches = schedule && schedule.length > 0 ? schedule : DEFAULT_SCHEDULE;
  const pct = (bps: number) =>
    format.number(bps / 10_000, { style: 'percent', maximumFractionDigits: 1 });
  const node = (Icon: typeof Factory, label: string, accent = false) => (
    <div className="flex flex-col items-center gap-3 text-center">
      <span
        className={cn(
          'flex size-16 items-center justify-center rounded-2xl border',
          accent
            ? 'bg-brand-gold text-brand-deep border-transparent shadow-[0_0_40px_-8px] shadow-brand-gold'
            : 'border-white/15 bg-white/5 text-white',
        )}
      >
        <Icon className="size-7" aria-hidden="true" />
      </span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
  const wire = (
    <div
      aria-hidden="true"
      className="relative h-px min-w-8 flex-1 self-center bg-white/20 max-sm:hidden"
    >
      <span className="bg-brand-gold absolute top-1/2 size-2 -translate-y-1/2 rounded-full motion-safe:animate-[gg-flow_2.8s_linear_infinite]" />
    </div>
  );
  return (
    <div className="mt-14 grid gap-10">
      <style>{`@keyframes gg-flow { from { inset-inline-start: 0% } to { inset-inline-start: 100% } }`}</style>
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-4">
        {node(ShoppingBag, t('buyer'))}
        {wire}
        {node(Landmark, t('escrow'), true)}
        {wire}
        {node(Factory, t('factory'))}
      </div>
      <p className="text-center text-sm text-white/60">{t('pay')}</p>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <p className="font-mono text-xs tracking-[0.12em] text-white/50 uppercase">
          {t('release')}
        </p>
        <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-white/10">
          {tranches.map((r, i) => (
            <span
              key={r.trigger}
              className={cn('h-full', SHADES[i % SHADES.length])}
              style={{ width: `${String(r.bps / 100)}%` }}
            />
          ))}
        </div>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {tranches.map((r, i) => (
            <li key={r.trigger} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={cn('mt-1.5 size-2.5 shrink-0 rounded-full', SHADES[i % SHADES.length])}
              />
              <span>
                <span className="font-display tabular block text-3xl">{pct(r.bps)}</span>
                <span className="text-sm text-white/65">{t(`triggers.${r.trigger}`)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-3 text-sm text-white/70 sm:grid-cols-2">
        <p className="flex gap-3 rounded-xl border border-white/10 p-4">
          <Landmark className="text-brand-gold mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t('margin')}
        </p>
        <p className="flex gap-3 rounded-xl border border-white/10 p-4">
          <RotateCcw className="text-brand-gold mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t('refund')}
        </p>
      </div>
    </div>
  );
}
