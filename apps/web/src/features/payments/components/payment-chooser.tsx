'use client';

import type { PaymentMethod, PaymentStart } from '@garmentgate/shared';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { useQueryClient } from '@tanstack/react-query';
import { CreditCard, Landmark } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { useBuyerPayments } from '@/features/qc/api';
import { ApiError } from '@/lib/api';
import { useMoney } from '@/lib/use-money';
import { BankTransferPanel } from './bank-transfer-panel';

const stripes = new Map<string, Promise<Stripe | null>>();
/** One Stripe.js instance per publishable key, loaded from Stripe only when a card is used. */
function stripeFor(key: string): Promise<Stripe | null> {
  let s = stripes.get(key);
  if (!s) {
    s = loadStripe(key);
    stripes.set(key, s);
  }
  return s;
}

/**
 * How the buyer pays GarmentGate for anything on an order (deposit, balance, shipping, fees):
 * by card through Stripe when it's switched on, or by bank wire to GarmentGate's account,
 * confirmed by staff. Both are channels into GarmentGate; the factory is never paid directly.
 */
export function PaymentChooser({
  code,
  start,
  idPrefix,
  onDone,
}: {
  code: string;
  start: (method: PaymentMethod) => Promise<PaymentStart>;
  idPrefix: string;
  onDone: () => void;
}) {
  const t = useTranslations('payments.choose');
  const methods = useBuyerPayments(code).data?.methods ?? [];
  const card = methods.includes('CARD');
  const [method, setMethod] = useState<'CARD' | 'BANK_TRANSFER' | null>(null);
  const chosen = method ?? (card ? null : 'BANK_TRANSFER');
  return (
    <div className="space-y-3">
      {card ? (
        <div role="radiogroup" aria-label={t('how')} className="grid gap-2 sm:grid-cols-2">
          {(
            [
              ['CARD', CreditCard],
              ['BANK_TRANSFER', Landmark],
            ] as const
          ).map(([m, Icon]) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={chosen === m}
              data-on={chosen === m}
              onClick={() => setMethod(m)}
              className="data-[on=true]:border-primary data-[on=true]:bg-primary-soft flex min-h-11 items-start gap-2 rounded-lg border p-3 text-start text-sm"
            >
              <Icon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>
                <span className="block font-medium">{t(`methods.${m}.title`)}</span>
                <span className="text-muted-foreground block text-xs">
                  {t(`methods.${m}.body`)}
                </span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
      {chosen === 'BANK_TRANSFER' ? (
        <BankTransferPanel code={code} start={start} idPrefix={idPrefix} onDone={onDone} />
      ) : chosen === 'CARD' ? (
        <CardPanel code={code} start={start} onDone={onDone} />
      ) : null}
    </div>
  );
}

function CardPanel({
  code,
  start,
  onDone,
}: {
  code: string;
  start: (method: PaymentMethod) => Promise<PaymentStart>;
  onDone: () => void;
}) {
  const tc = useTranslations('common');
  const [payment, setPayment] = useState<PaymentStart | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    start('CARD')
      .then((p) => {
        if (!cancelled) setPayment(p);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : tc('networkError'));
      });
    return () => {
      cancelled = true;
    };
  }, [start, tc]);
  const stripe = useMemo(
    () => (payment?.stripe ? stripeFor(payment.stripe.publishableKey) : null),
    [payment],
  );
  if (error) return <FormAlert message={error} />;
  if (!payment?.stripe || !stripe) return <Skeleton className="h-40 rounded-lg" />;
  return (
    <Elements stripe={stripe} options={{ clientSecret: payment.stripe.clientSecret }}>
      <CardForm code={code} payment={payment} onDone={onDone} />
    </Elements>
  );
}

function CardForm({
  code,
  payment,
  onDone,
}: {
  code: string;
  payment: PaymentStart;
  onDone: () => void;
}) {
  const t = useTranslations('payments.choose');
  const tc = useTranslations('common');
  const money = useMoney();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pay = async () => {
    if (!stripe || !elements) return;
    setPaying(true);
    setError(null);
    const result = await stripe.confirmPayment({ elements, redirect: 'if_required' });
    setPaying(false);
    if (result.error) {
      setError(result.error.message ?? tc('networkError'));
      return;
    }
    // Stripe's signed webhook settles it into escrow; refresh what the order shows.
    toast.success(t('cardDone'));
    void queryClient.invalidateQueries({ queryKey: ['orders', code] });
    void queryClient.invalidateQueries({ queryKey: ['payments', code] });
    onDone();
  };
  return (
    <div className="space-y-3 rounded-lg border p-3">
      <FormAlert message={error} />
      <PaymentElement />
      <Button className="w-full" disabled={!stripe || paying} onClick={() => void pay()}>
        {paying
          ? t('paying')
          : t('payCard', { amount: money(payment.amountMinor, payment.currency) })}
      </Button>
      <p className="text-muted-foreground text-xs">{t('cardNote')}</p>
    </div>
  );
}
