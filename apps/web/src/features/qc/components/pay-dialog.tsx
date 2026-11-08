'use client';

import type { BuyerPaymentPurpose, PaymentMethod } from '@garmentgate/shared';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PaymentChooser } from '@/features/payments/components/payment-chooser';
import { useStartPayment } from '../api';

/**
 * Paying the deposit or the balance: by card through Stripe (when it's on) or by bank wire to
 * GarmentGate quoting the reference, then "I've sent it" for staff to confirm against the
 * statement. Starting the same method twice returns the same payment.
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
  const start = useStartPayment(code);
  const startPayment = start.mutateAsync;
  const begin = useCallback(
    (method: PaymentMethod) => startPayment({ purpose, method }),
    [startPayment, purpose],
  );
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t(`title.${purpose}`)}</DialogTitle>
          <DialogDescription>{t(`body.${purpose}`)}</DialogDescription>
        </DialogHeader>
        {open ? <PaymentChooser code={code} start={begin} idPrefix="pay" onDone={onClose} /> : null}
      </DialogContent>
    </Dialog>
  );
}
