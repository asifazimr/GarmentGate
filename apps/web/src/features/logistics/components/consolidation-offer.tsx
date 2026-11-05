'use client';

import type { ConsolidationOption, GgIncoterm } from '@garmentgate/shared';
import { Boxes } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { useMoney } from '@/lib/use-money';
import {
  useAcceptConsolidation,
  useConsolidationCandidates,
  useConsolidationQuotes,
} from '../order-api';

/**
 * "Ship together": the buyer's other orders from the same country can share one shipment;
 * GarmentGate prices the combined cargo and shows each order's share and the saving.
 */
export function ConsolidationOffer({
  code,
  destinationCountry,
  destinationPort,
  incoterm,
  insured,
  onDone,
}: {
  code: string;
  destinationCountry: string;
  destinationPort: string;
  incoterm: GgIncoterm;
  insured: boolean;
  onDone: () => void;
}) {
  const t = useTranslations('logistics.together');
  const tm = useTranslations('logistics.modes');
  const format = useFormatter();
  const showMoney = useMoney();
  const candidates = useConsolidationCandidates(code, incoterm !== 'DDP');
  const quotes = useConsolidationQuotes();
  const accept = useAcceptConsolidation();
  const [picked, setPicked] = useState<string[]>([]);
  const [options, setOptions] = useState<ConsolidationOption[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  if (incoterm === 'DDP' || !candidates.data || candidates.data.length === 0) return null;

  const price = async () => {
    setError(null);
    try {
      setOptions(
        await quotes.mutateAsync({
          orderCodes: [code, ...picked],
          destinationCountry,
          destinationPort,
          incoterm,
          insured,
        }),
      );
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('failed'));
    }
  };
  const choose = async (o: ConsolidationOption) => {
    try {
      await accept.mutateAsync(o.code);
      toast.success(t('chosen'));
      onDone();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('failed'));
    }
  };

  return (
    <section
      className="bg-surface space-y-4 rounded-xl border p-4"
      aria-labelledby="together-heading"
    >
      <div>
        <h3 id="together-heading" className="flex items-center gap-2 font-semibold">
          <Boxes className="size-4" aria-hidden="true" />
          {t('title')}
        </h3>
        <p className="text-muted-foreground text-sm">{t('description')}</p>
      </div>
      <FormAlert message={error} />
      <ul className="space-y-2">
        {candidates.data.map((c) => (
          <li key={c.code} className="flex items-center gap-3">
            <Checkbox
              id={`with-${c.code}`}
              checked={picked.includes(c.code)}
              onCheckedChange={(v) => {
                setOptions(null);
                setPicked(v ? [...picked, c.code] : picked.filter((x) => x !== c.code));
              }}
            />
            <label
              htmlFor={`with-${c.code}`}
              className="flex min-h-11 flex-1 flex-wrap items-center gap-2 text-sm md:min-h-0"
            >
              <Badge variant="code">{c.code}</Badge>
              {c.title}
              <span className="text-muted-foreground">
                · {t('pieces', { count: c.quantity })} · {c.manufacturerCode}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <Button
        variant="outline"
        disabled={picked.length === 0 || quotes.isPending}
        onClick={() => void price()}
      >
        {quotes.isPending ? t('pricing') : t('price', { count: picked.length + 1 })}
      </Button>
      {options === null ? null : options.length === 0 ? (
        <p className="text-muted-foreground text-sm">{t('none')}</p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {options.map((o) => (
            <li key={o.code} className="bg-card space-y-3 rounded-xl border p-4 shadow-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{tm(o.mode)}</p>
                  <p className="text-muted-foreground text-xs">
                    {t('transit', { min: o.transitDaysMin, max: o.transitDaysMax })}
                  </p>
                </div>
                <p className="tabular text-lg font-semibold">
                  {showMoney(o.combinedTotalMinor, o.currency)}
                </p>
              </div>
              {o.savingMinor > 0 ? (
                <Badge variant="success">
                  {t('saving', { amount: showMoney(o.savingMinor, o.currency) })}
                </Badge>
              ) : null}
              <dl className="space-y-1 text-sm">
                {o.shares.map((s) => (
                  <div key={s.orderCode} className="flex justify-between gap-3">
                    <dt className="font-mono text-xs">{s.orderCode}</dt>
                    <dd className="tabular">{showMoney(s.totalMinor, o.currency)}</dd>
                  </div>
                ))}
              </dl>
              <p className="text-subtle-foreground text-xs">
                {t('validUntil', {
                  date: format.dateTime(new Date(o.validUntil), { dateStyle: 'medium' }),
                })}
              </p>
              <Button className="w-full" disabled={accept.isPending} onClick={() => void choose(o)}>
                {t('choose')}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
