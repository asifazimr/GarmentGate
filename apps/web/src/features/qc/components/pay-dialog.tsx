'use client';

import type { BuyerPaymentPurpose, PaymentStart } from '@garmentgate/shared';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { useMoney } from '@/lib/use-money';
import { useMarkSent, useStartPayment } from '../api';

/**
 * Paying the deposit or the balance by bank transfer: GarmentGate's account details and the
 * reference appear as soon as the dialog opens, then "I've sent it" so staff look out for it.
 * Staff confirm it against the statement. Starting a bank transfer twice returns the same one.
 */
export function PayDialog({
  code,
  purpose,
  open,
  onClose,
}: {
  code: string;
  purpose: BuyerPaymentPurpose;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('qc.pay');
  const tc = useTranslations('common');
  const showMoney = useMoney();
  const start = useStartPayment(code);
  const sent = useMarkSent(code);
  const [payment, setPayment] = useState<PaymentStart | null>(null);
  const [reference, setReference] = useState('');
  const [error, setError] = useState<string | null>(null);

  const startPayment = start.mutateAsync;
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    startPayment({ purpose, method: 'BANK_TRANSFER' })
      .then((p) => {
        if (!cancelled) setPayment(p);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : tc('networkError'));
      });
    return () => {
      cancelled = true;
    };
  }, [open, purpose, startPayment, tc]);
  const close = () => {
    setPayment(null);
    setReference('');
    setError(null);
    onClose();
  };
  const markSent = async () => {
    if (!payment) return;
    try {
      await sent.mutateAsync({ id: payment.paymentId, dto: { payerReference: reference } });
      toast.success(t('sent'));
      close();
    } catch {
      setError(tc('networkError'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t(`title.${purpose}`)}</DialogTitle>
          <DialogDescription>{t(`body.${purpose}`)}</DialogDescription>
        </DialogHeader>
        <FormAlert message={error} />
        {payment ? (
          <div className="space-y-4">
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
              <FieldLabel htmlFor="pay-ref">{t('yourReference')}</FieldLabel>
              <Input
                id="pay-ref"
                value={reference}
                maxLength={80}
                onChange={(e) => setReference(e.target.value)}
              />
              <FieldDescription>{t('yourReferenceHint')}</FieldDescription>
            </Field>
          </div>
        ) : error ? null : (
          <div className="space-y-3" aria-busy="true" aria-label={t('loading')}>
            <Skeleton className="h-14 rounded-lg" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-24 rounded-lg" />
          </div>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            {tc('cancel')}
          </Button>
          <Button disabled={!payment || sent.isPending} onClick={() => void markSent()}>
            {t('markSent')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
