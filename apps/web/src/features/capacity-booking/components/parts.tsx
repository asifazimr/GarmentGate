'use client';

import type { PaymentStart } from '@garmentgate/shared';
import { useFormatter, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { useNow } from '@/lib/client-hooks';
import { useMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';
import { useMarkDepositSent, useStartDeposit } from '../api';

/** "1 d 4 h", "3 h 12 min", "8 min" until `to`; ticks every 30 s. */
export function Countdown({ to, className }: { to: string; className?: string }) {
  const t = useTranslations('capacityBooking.countdown');
  const now = useNow(30_000);
  if (now === null) return null;
  const ms = new Date(to).getTime() - now;
  if (ms <= 0) return <span className={className}>{t('over')}</span>;
  const minutes = Math.floor(ms / 60_000);
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const label =
    days > 0
      ? t('days', { days, hours })
      : hours > 0
        ? t('hours', { hours, minutes: minutes % 60 })
        : t('minutes', { minutes: Math.max(1, minutes) });
  return (
    <time dateTime={to} className={cn('tabular', className)}>
      {label}
    </time>
  );
}

/** Booked vs free minutes of a window. */
export function AvailabilityBar({
  total,
  free,
  requested,
  label,
}: {
  total: number;
  free: number;
  requested?: number;
  label: string;
}) {
  const pct = (v: number) =>
    `${String(Math.min(100, Math.max(0, (v / Math.max(total, 1)) * 100)))}%`;
  const booked = total - free;
  return (
    <div
      className="bg-primary-soft relative h-2.5 overflow-hidden rounded-full"
      role="img"
      aria-label={label}
    >
      <span
        className="bg-border-strong absolute inset-y-0 start-0"
        style={{ width: pct(booked) }}
      />
      {requested && requested <= free ? (
        <span
          className="bg-primary absolute inset-y-0"
          style={{ insetInlineStart: pct(booked), width: pct(requested) }}
        />
      ) : null}
    </div>
  );
}

/**
 * Paying a booking's deposit by bank transfer: GarmentGate's account and the reference appear
 * at once, then "I've sent it" so staff look out for it. Staff confirm it against the statement.
 */
export function DepositPanel({ code, onSent }: { code: string; onSent?: () => void }) {
  const t = useTranslations('qc.pay');
  const tb = useTranslations('capacityBooking.deposit');
  const tc = useTranslations('common');
  const showMoney = useMoney();
  const start = useStartDeposit(code);
  const sent = useMarkDepositSent(code);
  const [payment, setPayment] = useState<PaymentStart | null>(null);
  const [reference, setReference] = useState('');
  const [error, setError] = useState<string | null>(null);

  const startPayment = start.mutateAsync;
  useEffect(() => {
    let cancelled = false;
    startPayment('BANK_TRANSFER')
      .then((p) => {
        if (!cancelled) setPayment(p);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : tc('networkError'));
      });
    return () => {
      cancelled = true;
    };
  }, [startPayment, tc]);

  const markSent = async () => {
    if (!payment) return;
    try {
      await sent.mutateAsync({ id: payment.paymentId, payerReference: reference });
      toast.success(t('sent'));
      onSent?.();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : tc('networkError'));
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">{tb('body')}</p>
      <FormAlert message={error} />
      {payment ? (
        <>
          <div className="bg-surface flex items-center justify-between gap-3 rounded-lg border p-3">
            <span className="text-muted-foreground text-sm">{t('amount')}</span>
            <span className="tabular text-lg font-semibold">
              {showMoney(payment.amountMinor, payment.currency)}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-xs">{t('reference')}</p>
            <Badge variant="code" className="text-sm">
              {payment.reference}
            </Badge>
          </div>
          {payment.instructions ? (
            <ul className="bg-card space-y-1 rounded-lg border p-3 text-sm">
              {payment.instructions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          <Field>
            <FieldLabel htmlFor={`ref-${code}`}>{t('yourReference')}</FieldLabel>
            <Input
              id={`ref-${code}`}
              value={reference}
              maxLength={80}
              onChange={(e) => setReference(e.target.value)}
            />
            <FieldDescription>{t('yourReferenceHint')}</FieldDescription>
          </Field>
          <Button disabled={sent.isPending} onClick={() => void markSent()}>
            {t('markSent')}
          </Button>
        </>
      ) : error ? null : (
        <div className="space-y-3" aria-busy="true" aria-label={t('loading')}>
          <Skeleton className="h-14 rounded-lg" />
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-24 rounded-lg" />
        </div>
      )}
    </div>
  );
}

/** "12,500 min" with the pieces it makes, when known. */
export function MinutesLabel({ minutes, pieces }: { minutes: number; pieces?: number | null }) {
  const t = useTranslations('capacityBooking');
  const format = useFormatter();
  return (
    <span className="tabular">
      {t('minutesValue', { minutes: format.number(minutes) })}
      {pieces ? (
        <span className="text-muted-foreground">
          {' '}
          · {t('piecesValue', { pieces: format.number(pieces) })}
        </span>
      ) : null}
    </span>
  );
}
