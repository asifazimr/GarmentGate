'use client';

import {
  type BuyerOrderLogistics,
  type BuyerShippingOption,
  GG_INCOTERMS,
  type GgIncoterm,
  insuranceRequired,
  type PaymentStart,
} from '@garmentgate/shared';
import { Clock, Info, Plane, Ship, Truck, Warehouse } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { ApiError } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { useMoney } from '@/lib/use-money';
import {
  useAcceptShipping,
  useMarkShippingSent,
  useOrderLogistics,
  useShippingQuotes,
  useStartShippingPayment,
} from '../order-api';
import { ConsolidationOffer } from './consolidation-offer';
import { OptionSelect } from './form-bits';
import { HandoverChosen, HandoverForm } from './handover';

const MODE_ICON = {
  AIR: Plane,
  SEA_FCL: Ship,
  SEA_LCL: Ship,
  DDP: Truck,
  DOMESTIC: Truck,
  SAMPLE_COURIER: Plane,
  HANDOVER: Warehouse,
};

/**
 * The buyer's shipping step: GarmentGate's price for each way of shipping (from its partners'
 * rates, never naming them), with a landed-cost estimate, then paying the chosen option into
 * escrow. Hidden once the order has shipped.
 */
export function ShippingCard({ code }: { code: string }) {
  const t = useTranslations('logistics.shipping');
  const logistics = useOrderLogistics(code);
  const [changing, setChanging] = useState(false);
  if (logistics.isPending) return <Skeleton className="h-40 rounded-xl" />;
  if (logistics.isError) return null;
  const l = logistics.data;
  if (!l.available && !l.accepted) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          {t('title')}
          {l.accepted ? (
            <Badge variant={l.outstandingMinor === 0 ? 'success' : 'warning'}>
              {l.outstandingMinor === 0 ? t('paid') : l.pending ? t('checking') : t('toPay')}
            </Badge>
          ) : null}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {l.accepted && !changing ? (
          l.accepted.mode === 'HANDOVER' ? (
            <HandoverChosen logistics={l} onChange={() => setChanging(true)} />
          ) : (
            <Chosen
              code={code}
              logistics={l}
              option={l.accepted}
              onChange={() => setChanging(true)}
            />
          )
        ) : (
          <Ways code={code} logistics={l} onDone={() => setChanging(false)} />
        )}
      </CardContent>
    </Card>
  );
}

/** GarmentGate's freight, or the buyer's own forwarder collecting at the hub. */
function Ways({
  code,
  logistics: l,
  onDone,
}: {
  code: string;
  logistics: BuyerOrderLogistics;
  onDone: () => void;
}) {
  const t = useTranslations('logistics.handover');
  const [way, setWay] = useState<'GARMENTGATE' | 'OWN'>(
    l.accepted?.mode === 'HANDOVER' ? 'OWN' : 'GARMENTGATE',
  );
  return (
    <div className="space-y-5">
      <div role="radiogroup" aria-label={t('way')} className="grid gap-2 sm:grid-cols-2">
        {(['GARMENTGATE', 'OWN'] as const).map((w) => (
          <button
            key={w}
            type="button"
            role="radio"
            aria-checked={way === w}
            onClick={() => setWay(w)}
            className="data-[on=true]:border-primary data-[on=true]:bg-primary-soft min-h-11 rounded-lg border p-3 text-start text-sm"
            data-on={way === w}
          >
            <span className="block font-medium">{t(`ways.${w}.title`)}</span>
            <span className="text-muted-foreground block text-xs">{t(`ways.${w}.body`)}</span>
          </button>
        ))}
      </div>
      {way === 'OWN' ? (
        <HandoverForm code={code} logistics={l} onDone={onDone} />
      ) : (
        <Chooser code={code} logistics={l} onDone={onDone} />
      )}
    </div>
  );
}

function Chooser({
  code,
  logistics: l,
  onDone,
}: {
  code: string;
  logistics: BuyerOrderLogistics;
  onDone: () => void;
}) {
  const t = useTranslations('logistics.shipping');
  const tw = useTranslations('rfq.wizard');
  const format = useFormatter();
  const quotes = useShippingQuotes(code);
  const accept = useAcceptShipping(code);
  const [country, setCountry] = useState(l.destinationCountry);
  const [port, setPort] = useState(l.destinationPort ?? '');
  const [incoterm, setIncoterm] = useState<GgIncoterm>('DAP');
  const [insure, setInsure] = useState(false);
  const [options, setOptions] = useState<BuyerShippingOption[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const required = insuranceRequired(incoterm);

  const getPrices = async () => {
    setError(null);
    try {
      setOptions(
        await quotes.mutateAsync({
          destinationCountry: country,
          destinationPort: port,
          incoterm,
          insured: insure || required,
        }),
      );
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('failed'));
    }
  };
  const choose = async (o: BuyerShippingOption) => {
    try {
      await accept.mutateAsync(o.quoteId);
      toast.success(t('chosen'));
      onDone();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('failed'));
    }
  };

  return (
    <div className="space-y-5">
      <FormAlert message={error} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field>
          <FieldLabel htmlFor="sh-country">{t('destination')}</FieldLabel>
          <CountrySelect
            id="sh-country"
            value={country}
            onChange={setCountry}
            placeholder={t('choose')}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="sh-port">{t('port')}</FieldLabel>
          <Input
            id="sh-port"
            value={port}
            placeholder="DEHAM"
            className="font-mono uppercase"
            onChange={(e) => setPort(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="sh-incoterm">{t('incoterm')}</FieldLabel>
          <OptionSelect
            id="sh-incoterm"
            value={incoterm}
            onChange={(v) => {
              const match = GG_INCOTERMS.find((x) => x === v);
              if (match) setIncoterm(match);
            }}
            options={GG_INCOTERMS.map((i) => ({
              value: i,
              label: `${i} · ${tw(`incoterms.${i}`)}`,
            }))}
          />
        </Field>
        <Field orientation="horizontal" className="sm:self-end sm:pb-2">
          <Checkbox
            id="sh-insure"
            checked={insure || required}
            disabled={required}
            onCheckedChange={setInsure}
          />
          <FieldLabel htmlFor="sh-insure" className="font-normal">
            {required ? t('insuredIncluded') : t('insure')}
          </FieldLabel>
        </Field>
      </div>
      <p className="text-muted-foreground flex items-start gap-1.5 text-xs">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        {t('cargoBasis', {
          kg: format.number(l.cargo.weightGrams / 1000, { maximumFractionDigits: 0 }),
          cbm: format.number(l.cargo.volumeLitres / 1000, { maximumFractionDigits: 1 }),
        })}
      </p>
      <Button onClick={() => void getPrices()} disabled={quotes.isPending || !country}>
        {quotes.isPending ? t('pricing') : t('getPrices')}
      </Button>

      {options === null ? null : options.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          {incoterm === 'DDP' ? t('noDdp') : t('none')}
        </p>
      ) : (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {options.map((o) => (
            <li key={o.quoteId}>
              <OptionCard option={o} hsCode={l.hsCode}>
                <Button
                  className="w-full"
                  disabled={accept.isPending}
                  onClick={() => void choose(o)}
                >
                  {t('choose')}
                </Button>
              </OptionCard>
            </li>
          ))}
        </ul>
      )}
      <ConsolidationOffer
        code={code}
        destinationCountry={country}
        destinationPort={port}
        incoterm={incoterm}
        insured={insure || required}
        onDone={onDone}
      />
    </div>
  );
}

function OptionCard({
  option: o,
  hsCode,
  children,
}: {
  option: BuyerShippingOption;
  hsCode: string | null;
  children?: React.ReactNode;
}) {
  const t = useTranslations('logistics.shipping');
  const tm = useTranslations('logistics.modes');
  const format = useFormatter();
  const showMoney = useMoney();
  const money = (minor: number) => showMoney(minor, o.currency);
  const Icon = MODE_ICON[o.mode];
  const lc = o.landedCost;
  return (
    <div className="bg-card flex h-full flex-col gap-3 rounded-xl border p-4 shadow-xs">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="flex items-center gap-1.5 font-medium">
            <Icon className="size-4" aria-hidden="true" />
            {tm(o.mode)}
          </p>
          <p className="text-muted-foreground flex items-center gap-1 text-xs">
            <Clock className="size-3" aria-hidden="true" />
            {t('transit', { min: o.transitDaysMin, max: o.transitDaysMax })}
          </p>
        </div>
        <p className="tabular text-end text-lg font-semibold">{money(o.totalMinor)}</p>
      </div>
      <dl className="space-y-1 text-sm">
        <Row label={t('freight')} value={money(o.freightMinor)} />
        {o.insuranceMinor > 0 ? (
          <Row label={t('insurance')} value={money(o.insuranceMinor)} />
        ) : null}
        {o.dutyEstimateMinor > 0 ? (
          <Row label={t('dutyDdp')} value={money(o.dutyEstimateMinor)} />
        ) : null}
      </dl>
      <details className="bg-surface rounded-lg border px-3 py-2 text-sm">
        <summary className="cursor-pointer font-medium">
          {t('landed', { amount: money(lc.perPieceMinor) })}{' '}
          <Badge variant="neutral" className="ms-1">
            {t('estimate')}
          </Badge>
        </summary>
        <dl className="mt-2 space-y-1">
          <Row label={t('goods')} value={money(lc.goodsMinor)} />
          <Row label={t('freight')} value={money(lc.freightMinor)} />
          <Row label={t('insurance')} value={money(lc.insuranceMinor)} />
          <Row
            label={
              lc.dutyRateBps === null
                ? t('dutyUnknown')
                : t('duty', {
                    rate: format.number(lc.dutyRateBps / 10_000, {
                      style: 'percent',
                      maximumFractionDigits: 2,
                    }),
                    basis: lc.valuation,
                  })
            }
            value={lc.dutyRateBps === null ? '—' : money(lc.dutyMinor)}
          />
          <Row label={t('landedTotal')} value={money(lc.totalMinor)} strong />
        </dl>
        <p className="text-muted-foreground mt-2 text-xs">
          {hsCode ? t('estimateNote', { hs: hsCode }) : t('estimateNoHs')}
        </p>
      </details>
      <p className="text-subtle-foreground text-xs">
        {t('validUntil', {
          date: format.dateTime(new Date(o.validUntil), { dateStyle: 'medium' }),
        })}
      </p>
      {children ? <div className="mt-auto">{children}</div> : null}
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div
      className={
        strong
          ? 'flex justify-between gap-3 border-t pt-1 font-semibold'
          : 'flex justify-between gap-3'
      }
    >
      <dt className={strong ? undefined : 'text-muted-foreground'}>{label}</dt>
      <dd className="tabular">{value}</dd>
    </div>
  );
}

function Chosen({
  code,
  logistics: l,
  option,
  onChange,
}: {
  code: string;
  logistics: BuyerOrderLogistics;
  option: BuyerShippingOption;
  onChange: () => void;
}) {
  const t = useTranslations('logistics.shipping');
  const locale = useLocale();
  const showMoney = useMoney();
  const [paying, setPaying] = useState(false);
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
      <OptionCard option={option} hsCode={l.hsCode} />
      <div className="space-y-3 text-sm">
        <p>
          {t('to', {
            place: `${option.destinationPort ? `${option.destinationPort}, ` : ''}${countryName(option.destinationCountry, locale)}`,
            incoterm: option.incoterm,
          })}
        </p>
        {l.outstandingMinor > 0 ? (
          <p className="text-muted-foreground">
            {t('due', { amount: showMoney(l.outstandingMinor, option.currency) })}
          </p>
        ) : (
          <p className="text-success-ink">{t('paidNote')}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {l.outstandingMinor > 0 && !l.pending && !paying ? (
            <Button onClick={() => setPaying(true)}>{t('pay')}</Button>
          ) : null}
          {l.editable ? (
            <Button variant="outline" onClick={onChange}>
              {t('change')}
            </Button>
          ) : null}
        </div>
        {paying ? <PayPanel code={code} onDone={() => setPaying(false)} /> : null}
      </div>
    </div>
  );
}

/** Bank transfer to GarmentGate quoting the reference; staff confirm it from the statement. */
function PayPanel({ code, onDone }: { code: string; onDone: () => void }) {
  const t = useTranslations('qc.pay');
  const tc = useTranslations('common');
  const showMoney = useMoney();
  const start = useStartShippingPayment(code);
  const sent = useMarkShippingSent(code);
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
          <Badge variant="code" className="text-sm">
            {payment.reference}
          </Badge>
          {payment.instructions ? (
            <ul className="space-y-1">
              {payment.instructions.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          <Field>
            <FieldLabel htmlFor="sh-ref">{t('yourReference')}</FieldLabel>
            <Input
              id="sh-ref"
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
