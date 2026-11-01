'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export interface StepInfo {
  label: string;
}

/** Numbered steps on desktop, a compact bar with "Step x of y" on mobile. */
export function StepProgress({
  steps,
  current,
  reached,
  onSelect,
}: {
  steps: StepInfo[];
  current: number;
  /** Highest step the user may jump to. */
  reached: number;
  onSelect: (index: number) => void;
}) {
  const t = useTranslations('onboarding');
  const percent = ((current + 1) / steps.length) * 100;

  return (
    <nav aria-label={t('title')} className="space-y-3">
      <div className="flex items-baseline justify-between sm:hidden">
        <p className="text-sm font-medium">{steps[current]?.label}</p>
        <p className="text-muted-foreground text-sm">
          {t('stepOf', { current: current + 1, total: steps.length })}
        </p>
      </div>
      <div
        className="bg-muted h-1.5 overflow-hidden rounded-full sm:hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percent)}
      >
        <div
          className="bg-primary h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="hidden items-center gap-2 sm:flex">
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          const clickable = index <= reached && !active;
          return (
            <li key={step.label} className="flex flex-1 items-center gap-2">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => onSelect(index)}
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'flex min-h-11 items-center gap-2 rounded-lg px-1 text-sm font-medium outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  active ? 'text-foreground' : 'text-muted-foreground',
                  clickable && 'hover:text-foreground',
                )}
              >
                <span
                  className={cn(
                    'flex size-7 shrink-0 items-center justify-center rounded-full border text-xs transition-colors',
                    done && 'bg-primary border-primary text-primary-foreground',
                    active && 'border-primary text-primary',
                  )}
                >
                  {done ? <Check className="size-4" aria-hidden="true" /> : index + 1}
                </span>
                {step.label}
              </button>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={cn('h-px flex-1', index < current ? 'bg-primary' : 'bg-border')}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
