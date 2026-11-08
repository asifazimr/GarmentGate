'use client';

import type { PaymentMethod, PaymentStart } from '@garmentgate/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError, apiSend } from '@/lib/api';
import { useMoney } from '@/lib/use-money';

/** The buyer says it sent the transfer (with its own bank reference); staff confirm it. */
export function useMarkPaymentSent(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payerReference }: { id: string; payerReference: string }) =>
      apiSend(`/orders/${code}/payments/${id}/sent`, { method: 'POST', body: { payerReference } }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders', code] }),
  });
}

/** Bank transfer to GarmentGate quoting the reference; staff confirm it from the statement. */
export function BankTransferPanel({
  code,
  start: startPayment,
  idPrefix,
  onDone,
}: {
  code: string;
  /** Opens (or reuses) the payment: deposit, balance, shipping or fees. */
  start: (method: PaymentMethod) => Promise<PaymentStart>;
  idPrefix: string;
  onDone: () => void;
}) {
  const t = useTranslations('qc.pay');
  const tc = useTranslations('common');
  const showMoney = useMoney();
  const sent = useMarkPaymentSent(code);
  const [payment, setPayment] = useState<PaymentStart | null>(null);
  const [reference, setReference] = useState('');
  const [error, setError] = useState<string | null>(null);
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
      onDone();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : tc('networkError'));
    }
  };
  return (
    <div className="space-y-3 rounded-lg border p-3">
      <FormAlert message={error} />
      {payment ? (
        <>
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">{t('amount')}</span>
            <span className="tabular font-semibold">
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
            <ul className="space-y-1">
              {payment.instructions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          <Field>
            <FieldLabel htmlFor={`${idPrefix}-ref`}>{t('yourReference')}</FieldLabel>
            <Input
              id={`${idPrefix}-ref`}
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
        <Skeleton className="h-28 rounded-lg" aria-label={t('loading')} />
      )}
    </div>
  );
}
