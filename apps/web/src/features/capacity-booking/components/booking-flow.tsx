'use client';

import { dateOnly, piecesForMinutes, samToCenti } from '@garmentgate/shared';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { useCategories } from '@/features/onboarding/api';
import { OptionalTag } from '@/features/onboarding/components/step-layout';
import { ApiError } from '@/lib/api';
import { useClientSearchParam } from '@/lib/client-hooks';
import { useMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';
import { useBookingTerms, useCreateBooking } from '../api';
import { AvailabilityBar, DepositPanel, MinutesLabel } from './parts';

const STEPS = ['slot', 'terms', 'pay'] as const;
type Step = (typeof STEPS)[number];

/** Book a window in three steps: how much of it, the terms (hold placed), the deposit. */
export function BookingFlow({ slotId }: { slotId: string }) {
  const t = useTranslations('capacityBooking.flow');
  const router = useRouter();
  const minutesParam = useClientSearchParam('minutes');
  const categoryParam = useClientSearchParam('category');
  const [step, setStep] = useState<Step>('slot');
  const [kind, setKind] = useState<'SLOT' | 'LINE'>('SLOT');
  const [minutesText, setMinutesText] = useState<string | null>(null);
  const [sam, setSam] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const minutesValue = minutesText ?? minutesParam ?? '';
  const minutes = Number(minutesValue) >= 60 ? Math.floor(Number(minutesValue)) : null;
  const terms = useBookingTerms(slotId, kind, kind === 'SLOT' ? minutes : null);
  const categories = useCategories();
  const create = useCreateBooking();
  const category = categoryId ?? categoryParam;
  const samValue = Number(sam) > 0 ? Number(sam) : null;

  const placeHold = async () => {
    if (!category) return;
    setError(null);
    try {
      const created = await create.mutateAsync({
        slotId,
        kind,
        ...(kind === 'SLOT' && minutes !== null && { minutes }),
        categoryId: category,
        ...(samValue !== null && { samPerPiece: samValue }),
        ...(note.trim() && { note: note.trim() }),
        acceptTerms: true,
      });
      setCode(created.code);
      setStep('pay');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('failed'));
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <ol className="flex gap-2" aria-label={t('progress')}>
        {STEPS.map((s, i) => {
          const done = STEPS.indexOf(step) > i;
          const current = step === s;
          return (
            <li
              key={s}
              aria-current={current ? 'step' : undefined}
              className={cn(
                'flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-sm',
                current && 'border-primary bg-primary-soft text-primary-ink font-medium',
                done && 'text-muted-foreground',
              )}
            >
              <span
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full border text-xs',
                  (done || current) && 'border-primary',
                )}
              >
                {done ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
              </span>
              <span className="truncate">{t(`steps.${s}`)}</span>
            </li>
          );
        })}
      </ol>
      <FormAlert message={error} />

      {terms.isPending && step !== 'pay' ? (
        <Skeleton className="h-72 rounded-xl" />
      ) : terms.isError && step !== 'pay' ? (
        terms.error instanceof ApiError && terms.error.status === 409 ? (
          <SlotStep
            unavailable={terms.error.message}
            {...{ kind, setKind, minutesValue, setMinutesText }}
          />
        ) : (
          <ErrorState onRetry={() => void terms.refetch()} retrying={terms.isFetching} />
        )
      ) : step === 'slot' && terms.data ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              <Badge variant="code">{terms.data.manufacturer.publicCode}</Badge>
              <WindowDates start={terms.data.window.startDate} end={terms.data.window.endDate} />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <AvailabilityBar
              total={terms.data.window.totalMinutes}
              free={terms.data.window.freeMinutes}
              requested={terms.data.quote.minutes}
              label={t('availability')}
            />
            <SlotStep
              {...{ kind, setKind, minutesValue, setMinutesText }}
              free={terms.data.window.freeMinutes}
            />
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="flow-category">{t('category')}</FieldLabel>
                  <Select
                    items={(categories.data ?? []).map((c) => ({ value: c.id, label: c.name }))}
                    value={category ?? null}
                    onValueChange={(v) => setCategoryId(v ?? null)}
                  >
                    <SelectTrigger id="flow-category" className="w-full">
                      <SelectValue placeholder={t('categoryPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {(categories.data ?? []).map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="flow-sam">
                    {t('sam')}
                    <OptionalTag />
                  </FieldLabel>
                  <Input
                    id="flow-sam"
                    inputMode="decimal"
                    value={sam}
                    onChange={(e) => setSam(e.target.value)}
                  />
                  <FieldDescription>
                    {samValue
                      ? t('pieces', {
                          pieces: piecesForMinutes(terms.data.quote.minutes, samToCenti(samValue)),
                        })
                      : t('samHint')}
                  </FieldDescription>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="flow-note">
                  {t('note')}
                  <OptionalTag />
                </FieldLabel>
                <Textarea
                  id="flow-note"
                  rows={2}
                  maxLength={1000}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <FieldDescription>{t('noteHint')}</FieldDescription>
              </Field>
            </FieldGroup>
            <div className="flex justify-end">
              <Button disabled={!category} onClick={() => setStep('terms')}>
                {t('next')}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : step === 'terms' && terms.data ? (
        <TermsStep
          terms={terms.data}
          accepted={accepted}
          setAccepted={setAccepted}
          pending={create.isPending}
          onBack={() => setStep('slot')}
          onConfirm={() => void placeHold()}
        />
      ) : step === 'pay' && code ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-wrap items-center gap-2">
              {t('heldTitle')}
              <Badge variant="code">{code}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <DepositPanel
              code={code}
              onSent={() => router.push(`/buyer/capacity/bookings/${code}`)}
            />
            <Button variant="ghost" render={<Link href={`/buyer/capacity/bookings/${code}`} />}>
              {t('payLater')}
            </Button>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function WindowDates({ start, end }: { start: string; end: string }) {
  const format = useFormatter();
  return (
    <span className="text-muted-foreground text-sm font-normal">
      {format.dateTimeRange(dateOnly(start), dateOnly(end), {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
      })}
    </span>
  );
}

function SlotStep({
  kind,
  setKind,
  minutesValue,
  setMinutesText,
  free,
  unavailable,
}: {
  kind: 'SLOT' | 'LINE';
  setKind: (k: 'SLOT' | 'LINE') => void;
  minutesValue: string;
  setMinutesText: (v: string) => void;
  free?: number;
  unavailable?: string;
}) {
  const t = useTranslations('capacityBooking.flow');
  return (
    <div className="space-y-3">
      <div role="radiogroup" aria-label={t('kind')} className="grid gap-2 sm:grid-cols-2">
        {(['SLOT', 'LINE'] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={kind === k}
            onClick={() => setKind(k)}
            className={cn(
              'rounded-lg border p-3 text-start text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              kind === k ? 'border-primary bg-primary-soft' : 'hover:border-border-strong',
            )}
          >
            <span className="block font-medium">{t(`kinds.${k}.title`)}</span>
            <span className="text-muted-foreground block text-xs">{t(`kinds.${k}.body`)}</span>
          </button>
        ))}
      </div>
      {kind === 'SLOT' ? (
        <Field data-invalid={!!unavailable}>
          <FieldLabel htmlFor="flow-minutes">{t('minutes')}</FieldLabel>
          <Input
            id="flow-minutes"
            inputMode="numeric"
            value={minutesValue}
            placeholder={free ? String(free) : ''}
            onChange={(e) => setMinutesText(e.target.value)}
          />
          {free ? (
            <FieldDescription>
              {t('upTo')} <MinutesLabel minutes={free} />
            </FieldDescription>
          ) : null}
          <FieldError>{unavailable}</FieldError>
        </Field>
      ) : unavailable ? (
        <p className="text-danger-ink text-sm">{unavailable}</p>
      ) : null}
    </div>
  );
}

function TermsStep({
  terms,
  accepted,
  setAccepted,
  pending,
  onBack,
  onConfirm,
}: {
  terms: NonNullable<ReturnType<typeof useBookingTerms>['data']>;
  accepted: boolean;
  setAccepted: (v: boolean) => void;
  pending: boolean;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const t = useTranslations('capacityBooking.flow');
  const format = useFormatter();
  const showMoney = useMoney();
  const q = terms.quote;
  const rows = [
    [t('minutes'), <MinutesLabel key="m" minutes={q.minutes} />],
    [t('rate'), showMoney(q.buyerRateMinorPer100Min, q.currency)],
    [t('total'), showMoney(q.buyerAmountMinor, q.currency)],
    [t('depositNow', { percent: q.depositBps / 100 }), showMoney(q.depositMinor, q.currency)],
  ] as const;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('termsTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <dl className="divide-y rounded-lg border">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 px-3 py-2 text-sm">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="tabular font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="space-y-2 text-sm">
          <p>{t('holdRule', { hours: terms.holdHours })}</p>
          <p className="font-medium">{t('cancellation')}</p>
          <ul className="text-muted-foreground list-disc space-y-1 ps-5">
            {terms.cancellationTiers.map((tier) => (
              <li key={tier.minDaysBefore}>
                {t('tier', {
                  days: tier.minDaysBefore,
                  percent: format.number(tier.refundBps / 10_000, { style: 'percent' }),
                })}
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground">{t('expiryRule')}</p>
        </div>
        <Field orientation="horizontal">
          <Checkbox id="flow-terms" checked={accepted} onCheckedChange={setAccepted} />
          <FieldLabel htmlFor="flow-terms" className="font-normal">
            {t('accept')}
          </FieldLabel>
        </Field>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
          <Button variant="outline" onClick={onBack}>
            {t('back')}
          </Button>
          <Button disabled={!accepted || pending} onClick={onConfirm}>
            {pending ? t('holding') : t('hold')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
