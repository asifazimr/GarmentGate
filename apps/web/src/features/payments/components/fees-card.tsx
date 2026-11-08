'use client';

import { type FeePurpose, type PaymentMethod, PaymentStartSchema } from '@garmentgate/shared';
import { useMutation } from '@tanstack/react-query';
import { Receipt } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useBuyerPayments } from '@/features/qc/api';
import { apiJson } from '@/lib/api';
import { useMoney } from '@/lib/use-money';
import { PaymentChooser } from './payment-chooser';

/**
 * The buyer's service fees on an order (business model: sampling fee credited on the bulk
 * order; inspection days, the first one free). Paid by transfer to GarmentGate; shipping waits
 * for them.
 */
export function FeesCard({ code }: { code: string }) {
  const t = useTranslations('fees');
  const format = useFormatter();
  const money = useMoney();
  const payments = useBuyerPayments(code);
  const [paying, setPaying] = useState<FeePurpose | null>(null);
  const start = useMutation({
    mutationFn: ({ purpose, method }: { purpose: FeePurpose; method: PaymentMethod }) =>
      apiJson(`/orders/${code}/fees/payments`, PaymentStartSchema, {
        method: 'POST',
        body: { purpose, method },
      }),
  });
  const startFee = start.mutateAsync;
  const begin = useCallback(
    (method: PaymentMethod) => startFee({ purpose: paying ?? 'SAMPLE_FEE', method }),
    [startFee, paying],
  );
  const p = payments.data;
  if (!p || (p.fees.length === 0 && p.sampleCreditMinor === 0)) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="size-4" aria-hidden="true" />
          {t('title')}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {p.fees.map((f) => (
          <section key={f.purpose} className="space-y-2" aria-label={t(`kinds.${f.purpose}`)}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold">{t(`kinds.${f.purpose}`)}</h3>
              <Badge variant={f.dueMinor === 0 ? 'success' : f.pending ? 'info' : 'warning'}>
                {f.dueMinor === 0
                  ? t('paid')
                  : f.pending
                    ? t('checking')
                    : t('due', { amount: money(f.dueMinor, p.currency) })}
              </Badge>
            </div>
            <ul className="text-muted-foreground space-y-1 text-sm">
              {f.items.map((item, i) => (
                <li key={`${item.createdAt}-${String(i)}`} className="flex justify-between gap-3">
                  <span>
                    {format.dateTime(new Date(item.createdAt), { dateStyle: 'medium' })}
                    {item.waived
                      ? ` · ${t(f.purpose === 'INSPECTION_FEE' ? 'free' : 'waived')}`
                      : ''}
                  </span>
                  <span className={item.waived ? 'tabular line-through' : 'tabular'}>
                    {money(item.amountMinor, p.currency)}
                  </span>
                </li>
              ))}
            </ul>
            {f.dueMinor > 0 && !f.pending && paying !== f.purpose ? (
              <Button size="sm" onClick={() => setPaying(f.purpose)}>
                {t('pay', { amount: money(f.dueMinor, p.currency) })}
              </Button>
            ) : null}
            {paying === f.purpose ? (
              <PaymentChooser
                code={code}
                idPrefix={`fee-${f.purpose.toLowerCase()}`}
                start={begin}
                onDone={() => {
                  setPaying(null);
                  void payments.refetch();
                }}
              />
            ) : null}
          </section>
        ))}
        {p.sampleCreditMinor > 0 ? (
          <p className="text-success-ink text-sm">
            {t('credited', { amount: money(p.sampleCreditMinor, p.currency) })}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
