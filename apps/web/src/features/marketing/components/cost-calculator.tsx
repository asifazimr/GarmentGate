'use client';

import { type EstimateInput, type EstimateTerms, estimateOrder } from '@garmentgate/shared';
import { ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { formatMoney } from '@/lib/format';
import { useApproxMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';

/** Whole numbers from a text box, clamped; dollars become cents. */
const int = (v: string, min: number, max: number) => {
  const n = Math.round(Number(v.replace(',', '.')));
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : min;
};
const cents = (v: string, max: number) => {
  const n = Math.round(Number(v.replace(',', '.')) * 100);
  return Number.isFinite(n) ? Math.min(max, Math.max(0, n)) : 0;
};

/**
 * The cost calculator: inputs on the left, a live estimate and payment timeline on the right.
 * Opens with a realistic example so it shows what it does before anyone types.
 */
export function CostCalculator({ terms }: { terms: EstimateTerms }) {
  const t = useTranslations('marketing.calculator');
  const locale = useLocale();
  const format = useFormatter();
  const [form, setForm] = useState({
    quantity: '3000',
    price: '5.20',
    samples: '2',
    inspections: '2',
    freight: '1500',
    duty: '12',
    firstOrder: true,
    plus: false,
  });
  const input: EstimateInput = {
    quantity: int(form.quantity, 1, 10_000_000),
    unitPriceMinor: Math.max(1, cents(form.price, 100_000_000)),
    samples: int(form.samples, 0, 50),
    inspections: int(form.inspections, 0, 20),
    firstOrder: form.firstOrder,
    plus: form.plus,
    freightMinor: cents(form.freight, 1_000_000_000),
    dutyBps: Math.round(Math.min(100, Math.max(0, Number(form.duty) || 0)) * 100),
  };
  const e = estimateOrder(input, terms);
  const usd = (minor: number) => formatMoney(minor, 'USD', locale);
  const approx = useApproxMoney();
  const landedApprox = approx(e.landed, 'USD');
  const percent = format.number(terms.depositBps / 10_000, { style: 'percent' });
  const field = (
    key: 'quantity' | 'price' | 'samples' | 'inspections' | 'freight' | 'duty',
    label: string,
    hint?: string,
    step = '1',
  ) => (
    <Field>
      <FieldLabel htmlFor={`calc-${key}`}>{label}</FieldLabel>
      <Input
        id={`calc-${key}`}
        type="number"
        inputMode="decimal"
        min={0}
        step={step}
        value={form[key]}
        onChange={(ev) => setForm((f) => ({ ...f, [key]: ev.target.value }))}
      />
      {hint ? <FieldDescription>{hint}</FieldDescription> : null}
    </Field>
  );
  const rows: { label: string; value: number; strong?: boolean; show?: boolean }[] = [
    { label: t('rows.goods'), value: e.goods },
    { label: t('rows.samples'), value: e.sampleFees },
    { label: t('rows.sampleCredit'), value: -e.sampleCredit, show: e.sampleCredit > 0 },
    { label: t('rows.inspections'), value: e.inspectionFees },
    { label: t('rows.freight'), value: e.freight },
    { label: t('rows.toGarmentGate'), value: e.payableToGarmentGate, strong: true },
    { label: t('rows.duty'), value: e.duty },
  ];
  const steps: [string, number][] = [
    [t('timeline.samples'), e.sampleFees],
    [t('timeline.deposit', { percent }), e.deposit],
    [t('timeline.inspections'), e.inspectionFees],
    [t('timeline.balance'), e.balance],
    [t('timeline.freight'), e.freight],
    [t('timeline.duty'), e.duty],
  ];
  const timeline = steps.filter(([, value]) => value > 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
      <form
        className="bg-card grid content-start gap-5 rounded-2xl border p-6 shadow-xs sm:p-8"
        onSubmit={(ev) => ev.preventDefault()}
      >
        <h2 className="text-lg font-semibold">{t('inputs')}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {field('quantity', t('fields.quantity'))}
          {field('price', t('fields.unitPrice'), t('fields.unitPriceHint'), '0.01')}
          {field('samples', t('fields.samples'))}
          {field('inspections', t('fields.inspections'), t('fields.inspectionsHint'))}
          {field('freight', t('fields.freight'), t('fields.freightHint'), '0.01')}
          {field('duty', t('fields.duty'), t('fields.dutyHint'), '0.1')}
        </div>
        {(['firstOrder', 'plus'] as const).map((key) => (
          <label key={key} className="flex min-h-11 items-center gap-2.5 text-sm">
            <Checkbox
              checked={form[key]}
              onCheckedChange={(v) => setForm((f) => ({ ...f, [key]: v }))}
            />
            {t(`fields.${key}`)}
          </label>
        ))}
      </form>

      <div className="grid content-start gap-5" aria-live="polite">
        <div className="bg-brand-deep rounded-2xl p-6 text-white shadow-xl sm:p-8">
          <p className="font-mono text-xs tracking-[0.12em] text-white/60 uppercase">
            {t('rows.landed')}
          </p>
          <p className="font-display tabular mt-2 text-5xl">{usd(e.landed)}</p>
          {landedApprox ? (
            <p className="tabular mt-1 text-sm text-white/60">≈ {landedApprox}</p>
          ) : null}
          <p className="tabular mt-1 text-white/70">
            {usd(e.landedPerPiece)} {t('rows.perPiece')}
          </p>
          <dl className="mt-6 grid gap-2 border-t border-white/10 pt-4 text-sm">
            {rows
              .filter((r) => r.show !== false)
              .map(({ label, value, strong }) => (
                <div
                  key={label}
                  className={cn(
                    'flex justify-between gap-4',
                    strong && 'border-t border-white/10 pt-2 font-semibold',
                  )}
                >
                  <dt className={strong ? '' : 'text-white/70'}>{label}</dt>
                  <dd className="tabular">{usd(value)}</dd>
                </div>
              ))}
          </dl>
        </div>
        <div className="bg-card rounded-2xl border p-6 shadow-xs">
          <h2 className="font-semibold">{t('timeline.title')}</h2>
          <ol className="mt-4 grid gap-3 text-sm">
            {timeline.map(([label, value], i) => (
              <li key={label} className="flex items-center gap-3">
                <span className="bg-primary-soft text-primary-ink flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs">
                  {i + 1}
                </span>
                <span className="flex-1">{label}</span>
                <span className="tabular font-medium">{usd(value)}</span>
              </li>
            ))}
          </ol>
          <p className="text-muted-foreground mt-5 flex gap-2 text-sm">
            <Lock className="text-primary-ink mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {t('escrow')}
          </p>
        </div>
        <p className="text-muted-foreground text-xs">{t('disclaimer', { percent })}</p>
        <Button
          size="lg"
          className="justify-self-start"
          render={<Link href="/register?as=buyer" />}
        >
          {t('cta')}
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}
