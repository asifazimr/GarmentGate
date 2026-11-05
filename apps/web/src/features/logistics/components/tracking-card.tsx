'use client';

import { CheckCircle2, Circle, FileDown, Ship } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { countryName } from '@/lib/countries';
import { useMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';
import { buyerDocumentUrl, useTracking } from '../order-api';

/**
 * The buyer's GarmentGate tracking: one timeline across every leg, with GarmentGate as the
 * shipper. No partner names, no hub address, no factory.
 */
export function TrackingCard({ code }: { code: string }) {
  const t = useTranslations('logistics.tracking');
  const tl = useTranslations('logistics.shipment.legKinds');
  const td = useTranslations('logistics.documents');
  const tm = useTranslations('logistics.modes');
  const format = useFormatter();
  const locale = useLocale();
  const tc = useTranslations('logistics.claims.types');
  const tk = useTranslations('logistics.shipment.uploadKinds');
  const money = useMoney();
  const tracking = useTracking(code);
  const s = tracking.data;
  if (!s) return null;
  const day = (iso: string | null) =>
    iso
      ? format.dateTime(new Date(`${iso.slice(0, 10)}T00:00:00Z`), {
          dateStyle: 'medium',
          timeZone: 'UTC',
        })
      : '—';
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <Ship className="size-4" aria-hidden="true" />
          {t('title')}
          <Badge variant="code">{s.shipmentCode}</Badge>
          <StatusBadge domain="freight" status={s.status} />
        </CardTitle>
        <CardDescription>
          {t('route', {
            mode: tm(s.mode),
            from: countryName(s.originCountry, locale),
            to: s.destinationPort ?? countryName(s.destinationCountry, locale),
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
          {(
            [
              [t('etd'), day(s.etd)],
              [t('eta'), day(s.eta)],
              [t('container'), s.containerNumber ?? '—'],
              [t('bl'), s.transportDocNo ?? '—'],
            ] as const
          ).map(([label, value]) => (
            <div key={label}>
              <dt className="text-muted-foreground text-xs">{label}</dt>
              <dd className="tabular font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <ol className="grid gap-2 sm:grid-cols-4" aria-label={t('legs')}>
          {s.legs.map((l) => {
            const done = l.status === 'COMPLETED';
            const active = l.status === 'IN_TRANSIT';
            return (
              <li
                key={l.kind}
                className={cn(
                  'rounded-lg border p-3 text-sm',
                  done && 'bg-success-soft border-transparent',
                  active && 'border-primary bg-primary-soft',
                )}
              >
                <p className="flex items-center gap-1.5 font-medium">
                  {done ? (
                    <CheckCircle2 className="text-success-ink size-4" aria-hidden="true" />
                  ) : (
                    <Circle className="text-subtle-foreground size-4" aria-hidden="true" />
                  )}
                  {tl(l.kind)}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {l.from === 'GarmentGate hub' ? t('hub') : l.from} →{' '}
                  {l.to === 'GarmentGate hub'
                    ? t('hub')
                    : l.to === 'Destination'
                      ? t('destination')
                      : l.to}
                </p>
              </li>
            );
          })}
        </ol>

        <section aria-labelledby="events-heading">
          <h3 id="events-heading" className="mb-3 text-sm font-semibold">
            {t('updates')}
          </h3>
          {s.events.length === 0 ? (
            <p className="text-muted-foreground text-sm">{t('noUpdates')}</p>
          ) : (
            <ol className="space-y-4 border-s ps-4">
              {s.events.map((e, i) => (
                <li key={`${e.occurredAt}-${String(i)}`} className="relative text-sm">
                  <span
                    className="bg-primary absolute -start-[1.3rem] top-1.5 size-2 rounded-full"
                    aria-hidden="true"
                  />
                  <p className="flex flex-wrap items-center gap-2 font-medium">
                    {e.status ? <StatusBadge domain="freight" status={e.status} /> : null}
                    {e.location}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {format.dateTime(new Date(e.occurredAt), {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </p>
                  {e.note ? <p className="text-muted-foreground mt-1">{e.note}</p> : null}
                </li>
              ))}
            </ol>
          )}
        </section>

        {s.claims.length > 0 ? (
          <section aria-labelledby="claims-heading" className="space-y-2">
            <h3 id="claims-heading" className="text-sm font-semibold">
              {t('claims')}
            </h3>
            <ul className="space-y-2">
              {s.claims.map((c) => (
                <li key={c.code} className="bg-surface rounded-lg border p-3 text-sm">
                  <p className="flex flex-wrap items-center gap-2 font-medium">
                    <Badge variant="code">{c.code}</Badge>
                    {tc(c.type)}
                    <StatusBadge domain="claim" status={c.status} />
                  </p>
                  {c.note ? <p className="text-muted-foreground mt-1">{c.note}</p> : null}
                  <p className="text-muted-foreground mt-1 text-xs">
                    {c.compensationMinor !== null && c.compensationMinor > 0
                      ? t('compensation', { amount: money(c.compensationMinor, c.currency) })
                      : c.status === 'OPEN' || c.status === 'SUBMITTED'
                        ? t('claimHandling')
                        : t('claimClosed')}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {s.papers.length > 0 ? (
          <section aria-labelledby="papers-heading" className="space-y-2">
            <h3 id="papers-heading" className="text-sm font-semibold">
              {t('papers')}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {s.papers.map((p) => (
                <li key={p.id}>
                  <a
                    href={p.url ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:bg-muted inline-flex min-h-11 items-center gap-1.5 rounded-md border px-3 text-sm md:min-h-9"
                  >
                    <FileDown className="size-4" aria-hidden="true" />
                    {tk(p.kind)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {s.documents.length > 0 ? (
          <section aria-labelledby="docs-heading" className="space-y-2">
            <h3 id="docs-heading" className="text-sm font-semibold">
              {t('documents')}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {s.documents.map((type) => (
                <li key={type}>
                  <a
                    href={buyerDocumentUrl(code, type)}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:bg-muted inline-flex min-h-11 items-center gap-1.5 rounded-md border px-3 text-sm md:min-h-9"
                  >
                    <FileDown className="size-4" aria-hidden="true" />
                    {td(type)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <p className="text-muted-foreground text-xs">{t('documentsLater')}</p>
        )}
      </CardContent>
    </Card>
  );
}
