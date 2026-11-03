'use client';

import type { PublicManufacturer } from '@garmentgate/shared';
import {
  BadgeCheck,
  Clock,
  Factory,
  Gauge,
  Globe2,
  Ruler,
  ShieldCheck,
  Timer,
  Users,
} from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { countryName } from '@/lib/countries';
import { Rendition } from '@/components/patterns/rendition';

/**
 * Renders the anonymised, buyer-facing factory profile. Takes only `PublicManufacturer`, so it
 * cannot display anything the public serializer didn't allow. Used for buyer pages and for the
 * factory's own "buyer preview".
 */
export function PublicManufacturerView({ manufacturer: m }: { manufacturer: PublicManufacturer }) {
  const t = useTranslations('manufacturer.publicProfile');
  const tcert = useTranslations('certifications');
  const tclaim = useTranslations('supplierClaims');
  const locale = useLocale();
  const format = useFormatter();
  const cap = m.capabilities;
  /** Workforce and floor area are only ever shown as ranges ("250–499 people", "25,000+ m²"). */
  const band = (b: { min: number; max: number | null } | null, unit: 'people' | 'sqm') =>
    b === null
      ? null
      : b.max === null
        ? t(`${unit}Over`, { min: b.min })
        : t(`${unit}Range`, { min: b.min, max: b.max });

  const stats = [
    {
      icon: Gauge,
      label: t('capacity'),
      value: cap.monthlyCapacityPcs !== null ? t('pcs', { count: cap.monthlyCapacityPcs }) : null,
    },
    {
      icon: Factory,
      label: t('moq'),
      value: cap.moqPcs !== null ? t('pcs', { count: cap.moqPcs }) : null,
    },
    {
      icon: Timer,
      label: t('sampleLead'),
      value: cap.sampleLeadTimeDays !== null ? t('days', { count: cap.sampleLeadTimeDays }) : null,
    },
    {
      icon: Clock,
      label: t('productionLead'),
      value:
        cap.productionLeadTimeMinDays !== null && cap.productionLeadTimeMaxDays !== null
          ? t('daysRange', {
              min: cap.productionLeadTimeMinDays,
              max: cap.productionLeadTimeMaxDays,
            })
          : null,
    },
    {
      icon: Users,
      label: t('workforce'),
      value: band(cap.workforceBand, 'people'),
    },
    {
      icon: Ruler,
      label: t('factorySize'),
      value: band(cap.factorySizeBand, 'sqm'),
    },
  ].filter((s) => s.value !== null);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="code" className="h-7 px-2.5 text-xs">
              {m.publicCode}
            </Badge>
            <Badge variant="neutral">
              <Globe2 aria-hidden="true" />
              {countryName(m.country, locale)}
            </Badge>
          </div>
          {m.headline ? (
            <p className="text-lg font-semibold tracking-[-0.015em]">{m.headline}</p>
          ) : null}
          {m.brandBadges.length > 0 ? (
            <ul className="flex flex-wrap gap-2" aria-label={t('brandBadges')}>
              {m.brandBadges.map((b) => (
                <li key={`${b.tier}-${b.region}`}>
                  <Badge variant="success" className="h-auto py-1">
                    <ShieldCheck aria-hidden="true" />
                    {tclaim('badge', {
                      count: b.brandCount,
                      tier: b.tier,
                      region: tclaim(`regionIn.${b.region}`),
                    })}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-6">
          <Score label={t('performance')} value={`${m.scores.performanceScore}`} suffix="/100" />
          {m.scores.rating ? (
            <Score
              label={t('rating', { count: m.scores.rating.count })}
              value={format.number(m.scores.rating.average, { maximumFractionDigits: 1 })}
              suffix="/5"
            />
          ) : null}
          {m.scores.onTimeDeliveryBps !== null ? (
            <Score
              label={t('onTime')}
              value={format.number(m.scores.onTimeDeliveryBps / 10_000, {
                style: 'percent',
                maximumFractionDigits: 1,
              })}
            />
          ) : null}
          {m.scores.qcPassBps !== null ? (
            <Score
              label={t('qcPass')}
              value={format.number(m.scores.qcPassBps / 10_000, {
                style: 'percent',
                maximumFractionDigits: 1,
              })}
            />
          ) : null}
        </div>
      </div>

      {m.photos.length > 0 ? (
        <PhotoMosaic photos={m.photos} />
      ) : (
        <p className="text-muted-foreground bg-surface rounded-xl border border-dashed p-6 text-center text-sm">
          {t('noPhotos')}
        </p>
      )}

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-card space-y-1 p-4">
            <dt className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Icon className="size-3.5" aria-hidden="true" />
              {label}
            </dt>
            <dd className="tabular font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-4 lg:grid-cols-2">
        {m.about ? (
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('about')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {m.about}
              </p>
            </CardContent>
          </Card>
        ) : null}
        <Card size="sm">
          <CardHeader>
            <CardTitle>{t('certifications')}</CardTitle>
          </CardHeader>
          <CardContent>
            {m.certifications.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {m.certifications.map((c, i) => (
                  <li key={`${c.type}-${String(i)}`}>
                    <Badge variant="success" className="h-auto py-1">
                      <BadgeCheck aria-hidden="true" />
                      <span>{c.name ?? tcert(c.type)}</span>
                      {c.validUntil ? (
                        <span className="font-normal">
                          ·{' '}
                          {t('validUntil', {
                            date: format.dateTime(new Date(`${c.validUntil}-01T00:00:00Z`), {
                              month: 'short',
                              year: 'numeric',
                              timeZone: 'UTC',
                            }),
                          })}
                        </span>
                      ) : null}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">—</p>
            )}
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>{t('categories')}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {m.categories.map((c) => (
              <Badge key={c.slug} variant="brand">
                {c.name}
              </Badge>
            ))}
          </CardContent>
        </Card>
        {cap.machinery.length > 0 || cap.exportMarkets.length > 0 ? (
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('machinery')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="divide-y text-sm">
                {cap.machinery.map((machine) => (
                  <li key={machine.type} className="flex justify-between gap-4 py-1.5">
                    <span>{machine.type}</span>
                    <span className="tabular text-muted-foreground">
                      {format.number(machine.count)}
                    </span>
                  </li>
                ))}
              </ul>
              {cap.exportMarkets.length > 0 ? (
                <p className="text-muted-foreground text-sm">
                  {t('exportMarkets')}:{' '}
                  {cap.exportMarkets.map((c) => countryName(c, locale)).join(', ')}
                </p>
              ) : null}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}

function Score({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="text-end">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="tabular text-2xl font-semibold tracking-[-0.02em]">
        {value}
        {suffix ? (
          <span className="text-muted-foreground text-sm font-normal">{suffix}</span>
        ) : null}
      </p>
    </div>
  );
}

/** Lays out 1–5 photos without gaps: one hero image and the rest as tiles beside it. */
function PhotoMosaic({ photos }: { photos: PublicManufacturer['photos'] }) {
  const shown = photos.slice(0, 5);
  const count = shown.length;
  const grid =
    count === 1
      ? 'grid-cols-1'
      : count === 2
        ? 'grid-cols-2'
        : count === 3
          ? 'grid-cols-3'
          : 'grid-cols-2 sm:grid-cols-4';
  return (
    <ul className={`grid gap-2 ${grid}`}>
      {shown.map((p, i) => {
        const hero = i === 0 && count >= 3;
        return (
          <li key={p.id} className={hero ? 'col-span-2 row-span-2' : ''}>
            <Rendition
              urls={p.urls}
              sizes={
                hero || count <= 2
                  ? '(min-width: 640px) 66vw, 100vw'
                  : '(min-width: 640px) 33vw, 50vw'
              }
              priority={hero}
              alt={p.caption ?? ''}
              className={`bg-muted size-full rounded-xl object-cover ${hero ? 'aspect-[4/3] sm:aspect-auto' : 'aspect-[4/3]'}`}
            />
          </li>
        );
      })}
    </ul>
  );
}
