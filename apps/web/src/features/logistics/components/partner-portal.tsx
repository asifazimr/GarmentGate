'use client';

import {
  type PartnerLeg,
  ShipmentUploadKindSchema,
  type ShipmentUploadKind,
  TRACKING_STATUSES,
  type TrackingStatus,
} from '@garmentgate/shared';
import { ArrowLeft, Check, ChevronRight, FileDown, Truck } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { formatMoney } from '@/lib/format';
import {
  partnerDocumentUrl,
  useAcceptLeg,
  useLegEvent,
  useLegRefs,
  useLegUpload,
  usePartnerLeg,
  usePartnerLegs,
} from '../partner-api';
import { OptionSelect } from './form-bits';

/** The partner's bookings from GarmentGate: what to move, from where, to where. */
export function PartnerBookings() {
  const t = useTranslations('logistics.partnerPortal');
  const legs = usePartnerLegs();
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      {legs.isPending ? (
        <div className="space-y-3" aria-busy="true">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : legs.isError ? (
        <ErrorState onRetry={() => void legs.refetch()} retrying={legs.isFetching} />
      ) : legs.data.length === 0 ? (
        <EmptyState icon={Truck} title={t('empty')} description={t('emptyBody')} />
      ) : (
        <ul className="space-y-3">
          {legs.data.map((l) => (
            <li key={l.id}>
              <LegRow leg={l} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LegRow({ leg: l }: { leg: PartnerLeg }) {
  const t = useTranslations('logistics.partnerPortal');
  const ts = useTranslations('logistics.shipment.legKinds');
  const locale = useLocale();
  return (
    <Link
      href={`/partner/legs/${l.id}`}
      className="bg-card hover:border-border-strong flex items-center gap-4 rounded-xl border p-4 shadow-xs transition-shadow outline-none hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="code">{l.shipmentCode}</Badge>
          <StatusBadge domain="leg" status={l.status} />
          {!l.accepted ? <Badge variant="warning">{t('toAccept')}</Badge> : null}
        </div>
        <p className="text-sm font-medium">
          {ts(l.kind)} ·{' '}
          <span className="font-mono text-xs">
            {l.fromLabel} → {l.toLabel}
          </span>
        </p>
        <p className="text-muted-foreground text-xs">
          {t('cargo', {
            cartons: l.cartons,
            kg: (l.grossWeightGrams / 1000).toFixed(0),
            cbm: (l.volumeLitres / 1000).toFixed(2),
          })}
          {l.etd ? ` · ETD ${l.etd}` : ''}
          {l.costMinor !== null ? ` · ${formatMoney(l.costMinor, l.currency, locale)}` : ''}
        </p>
      </div>
      <ChevronRight className="text-subtle-foreground size-4 rtl:rotate-180" aria-hidden="true" />
    </Link>
  );
}

export function PartnerLegPage({ id }: { id: string }) {
  const t = useTranslations('logistics.partnerPortal');
  const ts = useTranslations('logistics.shipment.legKinds');
  const td = useTranslations('logistics.documents');
  const locale = useLocale();
  const format = useFormatter();
  const leg = usePartnerLeg(id);
  const accept = useAcceptLeg();
  if (leg.isPending) return <Skeleton className="h-96 rounded-xl" />;
  if (leg.isError)
    return <ErrorState onRetry={() => void leg.refetch()} retrying={leg.isFetching} />;
  const l = leg.data;
  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" render={<Link href="/partner" />}>
        <ArrowLeft className="rtl:rotate-180" />
        {t('back')}
      </Button>
      <PageHeader
        eyebrow={l.shipmentCode}
        title={
          <span className="flex flex-wrap items-center gap-2">
            {ts(l.kind)}
            <StatusBadge domain="leg" status={l.status} />
          </span>
        }
        description={`${l.fromLabel} → ${l.toLabel} · ${l.destinationPort ?? countryName(l.destinationCountry, locale)}`}
      />
      {!l.accepted ? (
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">{t('acceptBody')}</p>
            <Button
              disabled={accept.isPending}
              onClick={() =>
                accept.mutate(l.id, {
                  onSuccess: () => toast.success(t('accepted')),
                  onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
                })
              }
            >
              <Check />
              {t('accept')}
            </Button>
          </CardContent>
        </Card>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          {l.accepted ? <EventForm leg={l} /> : null}
          {l.accepted ? <RefsForm leg={l} /> : null}
          <Card>
            <CardHeader>
              <CardTitle>{t('timeline')}</CardTitle>
            </CardHeader>
            <CardContent>
              {l.events.length === 0 ? (
                <p className="text-muted-foreground text-sm">{t('noEvents')}</p>
              ) : (
                <ol className="space-y-3 border-s ps-4">
                  {l.events.map((e, i) => (
                    <li key={`${e.occurredAt}-${String(i)}`} className="text-sm">
                      <p className="font-medium">
                        {e.status ? <StatusBadge domain="freight" status={e.status} /> : null}{' '}
                        {e.location}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {format.dateTime(new Date(e.occurredAt), {
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                      {e.note ? <p className="text-muted-foreground">{e.note}</p> : null}
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        </div>
        <aside className="space-y-4">
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('cargoTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                {t('cargo', {
                  cartons: l.cartons,
                  kg: (l.grossWeightGrams / 1000).toFixed(0),
                  cbm: (l.volumeLitres / 1000).toFixed(2),
                })}
              </p>
              {l.pickupHub ? (
                <address className="bg-surface rounded-lg border p-2 not-italic">
                  <span className="font-mono text-xs">{l.pickupHub.code}</span>
                  <span className="block font-medium">{l.pickupHub.name}</span>
                  <span className="text-muted-foreground block text-xs">{l.pickupHub.address}</span>
                </address>
              ) : null}
              {l.costMinor !== null ? (
                <p>
                  {t('rate', { amount: formatMoney(l.costMinor, l.currency, locale) })}{' '}
                  {l.paid ? <Badge variant="success">{t('paid')}</Badge> : null}
                </p>
              ) : null}
              <p className="text-muted-foreground text-xs">{t('customer')}</p>
              {l.claims.map((c) => (
                <p key={c.code} className="flex flex-wrap items-center gap-2 border-t pt-2">
                  <Badge variant="code">{c.code}</Badge>
                  <StatusBadge domain="claim" status={c.status} />
                  {c.chargebackMinor > 0
                    ? t('chargeback', {
                        amount: formatMoney(c.chargebackMinor, l.currency, locale),
                      })
                    : t('claimOnLeg')}
                </p>
              ))}
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('documents')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {l.documentTypes.map((type) => (
                <a
                  key={type}
                  href={partnerDocumentUrl(l.id, type)}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:bg-muted flex min-h-11 items-center gap-2 rounded-md px-2 text-sm md:min-h-9"
                >
                  <FileDown className="size-4" aria-hidden="true" />
                  {td(type)}
                </a>
              ))}
            </CardContent>
          </Card>
          {l.accepted ? <UploadCard leg={l} /> : null}
        </aside>
      </div>
    </div>
  );
}

function EventForm({ leg }: { leg: PartnerLeg }) {
  const t = useTranslations('logistics.partnerPortal');
  const tf = useTranslations('statuses.freight');
  const event = useLegEvent(leg.id);
  const [status, setStatus] = useState<TrackingStatus | ''>('');
  const [legDone, setLegDone] = useState<'' | 'IN_TRANSIT' | 'COMPLETED'>('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const submit = async () => {
    setError(null);
    try {
      await event.mutateAsync({
        ...(status && { status }),
        ...(legDone && { legStatus: legDone }),
        location,
        note,
      });
      toast.success(t('updated'));
      setStatus('');
      setLegDone('');
      setLocation('');
      setNote('');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('failed'));
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('update')}</CardTitle>
        <CardDescription>{t('updateHint')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormAlert message={error} />
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="ev-status">{t('status')}</FieldLabel>
              <OptionSelect
                id="ev-status"
                value={status}
                onChange={(v) => setStatus(TRACKING_STATUSES.find((s) => s === v) ?? '')}
                emptyLabel={t('noChange')}
                options={TRACKING_STATUSES.map((s) => ({ value: s, label: tf(s) }))}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="ev-leg">{t('legStatus')}</FieldLabel>
              <OptionSelect
                id="ev-leg"
                value={legDone}
                onChange={(v) => setLegDone(v === 'IN_TRANSIT' || v === 'COMPLETED' ? v : '')}
                emptyLabel={t('noChange')}
                options={[
                  { value: 'IN_TRANSIT', label: t('legStarted') },
                  { value: 'COMPLETED', label: t('legDone') },
                ]}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="ev-location">{t('location')}</FieldLabel>
            <Input
              id="ev-location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="ev-note">{t('note')}</FieldLabel>
            <Textarea
              id="ev-note"
              rows={2}
              maxLength={500}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <Button disabled={event.isPending} onClick={() => void submit()}>
          {t('post')}
        </Button>
      </CardContent>
    </Card>
  );
}

function RefsForm({ leg }: { leg: PartnerLeg }) {
  const t = useTranslations('logistics.partnerPortal');
  const refs = useLegRefs(leg.id);
  const [values, setValues] = useState({
    carrier: leg.carrier ?? '',
    trackingNumber: leg.trackingNumber ?? '',
    containerNumber: leg.containerNumber ?? '',
    transportDocNo: leg.transportDocNo ?? '',
    etd: leg.etd ?? '',
    eta: leg.eta ?? '',
  });
  const [error, setError] = useState<string | null>(null);
  const field = (key: keyof typeof values, type = 'text') => (
    <Field>
      <FieldLabel htmlFor={`rf-${key}`}>{t(`refs.${key}`)}</FieldLabel>
      <Input
        id={`rf-${key}`}
        type={type}
        value={values[key]}
        onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
      />
    </Field>
  );
  const submit = async () => {
    setError(null);
    try {
      await refs.mutateAsync(values);
      toast.success(t('saved'));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('failed'));
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('references')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormAlert message={error} />
        <div className="grid gap-4 sm:grid-cols-2">
          {field('carrier')}
          {field('trackingNumber')}
          {field('containerNumber')}
          {field('transportDocNo')}
          {field('etd', 'date')}
          {field('eta', 'date')}
        </div>
        <Button variant="outline" disabled={refs.isPending} onClick={() => void submit()}>
          {t('saveRefs')}
        </Button>
      </CardContent>
    </Card>
  );
}

function UploadCard({ leg }: { leg: PartnerLeg }) {
  const t = useTranslations('logistics.partnerPortal');
  const upload = useLegUpload(leg.id);
  const [kind, setKind] = useState<ShipmentUploadKind>('BILL_OF_LADING');
  const [progress, setProgress] = useState<number | null>(null);
  const send = async (file: File) => {
    setProgress(0);
    try {
      await upload.mutateAsync({ file, kind, onProgress: setProgress });
      toast.success(t('uploaded'));
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : t('failed'));
    } finally {
      setProgress(null);
    }
  };
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{t('upload')}</CardTitle>
        <CardDescription>{t('uploadHint')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <OptionSelect
          id="up-kind"
          value={kind}
          onChange={(v) => {
            const parsed = ShipmentUploadKindSchema.safeParse(v);
            if (parsed.success) setKind(parsed.data);
          }}
          options={ShipmentUploadKindSchema.options.map((k) => ({
            value: k,
            label: t(`kinds.${k}`),
          }))}
        />
        <FileDropzone
          compact
          accept={['application/pdf', 'image/jpeg', 'image/png', 'image/webp']}
          maxBytes={15 * 1024 * 1024}
          progress={progress}
          label={t('choose')}
          onFile={(file) => void send(file)}
        />
      </CardContent>
    </Card>
  );
}
