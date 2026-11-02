'use client';

import type { PaymentStart } from '@garmentgate/shared';
import { Landmark } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
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
import { FormAlert } from '@/features/auth/components/form-alert';
import { formatMoney } from '@/lib/format';
import { useMarkSent, useStartPayment } from '../api';

/**
 * Paying the balance by bank transfer: GarmentGate's account details and the reference to
 * quote, then "I've sent it" so staff look out for it. Staff confirm it against the statement.
 */
export function PayBalanceDialog({
  code,
  open,
  onClose,
}: {
  code: string;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('qc.pay');
  const tc = useTranslations('common');
  const locale = useLocale();
  const start = useStartPayment(code);
  const sent = useMarkSent(code);
  const [payment, setPayment] = useState<PaymentStart | null>(null);
  const [reference, setReference] = useState('');
  const [error, setError] = useState<string | null>(null);

  const details = async () => {
    setError(null);
    try {
      setPayment(await start.mutateAsync({ purpose: 'BALANCE', method: 'BANK_TRANSFER' }));
    } catch {
      setError(tc('networkError'));
    }
  };
  const markSent = async () => {
    if (!payment) return;
    try {
      await sent.mutateAsync({ id: payment.paymentId, dto: { payerReference: reference } });
      toast.success(t('sent'));
      onClose();
    } catch {
      setError(tc('networkError'));
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('body')}</DialogDescription>
        </DialogHeader>
        <FormAlert message={error} />
        {payment ? (
          <div className="space-y-4">
            <div className="bg-surface flex items-center justify-between gap-3 rounded-lg border p-3">
              <span className="text-muted-foreground text-sm">{t('amount')}</span>
              <span className="tabular text-lg font-semibold">
                {formatMoney(payment.amountMinor, payment.currency, locale)}
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
        ) : (
          <p className="text-muted-foreground text-sm">{t('intro')}</p>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          {payment ? (
            <Button disabled={sent.isPending} onClick={() => void markSent()}>
              {t('markSent')}
            </Button>
          ) : (
            <Button disabled={start.isPending} onClick={() => void details()}>
              <Landmark />
              {t('showDetails')}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
