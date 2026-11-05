'use client';

import {
  type AdminShipment,
  type AdminShipmentLeg,
  TRACKING_STATUSES,
  type TrackingStatus,
  type AdminShipmentRow,
  ShipmentLegStatusSchema,
} from '@garmentgate/shared';
import { ArrowLeft, FileDown, Pencil, Ship } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { useClientSearchParam } from '@/lib/client-hooks';
import { formatMoney } from '@/lib/format';
import {
  shipmentDocumentUrl,
  usePartners,
  usePayLeg,
  usePublishUpload,
  useShipmentEvent,
  useShipment,
  useShipments,
  useUpdateLeg,
  useUpdateShipment,
} from '../api';
import { OpenClaimDialog } from './claims';
import { amountToMinor, minorToAmount, OptionSelect } from './form-bits';

/** Every shipment GarmentGate runs, with its freight margin. */
export function ShipmentsTab() {
  const t = useTranslations('logistics.shipments');
  const tm = useTranslations('logistics.modes');
  const locale = useLocale();
  const shipments = useShipments();
  const columns = useMemo<DataColumn<AdminShipmentRow>[]>(
    () => [
      {
        id: 'code',
        header: t('columns.shipment'),
        value: (s) => `${s.code} ${s.buyer.code} ${s.buyer.name}`,
        cell: (s) => (
          <span>
            <Link
              href={`/admin/logistics/shipments/${s.code}`}
              className="font-mono text-xs font-medium hover:underline"
            >
              {s.code}
            </Link>
            <span className="text-muted-foreground block text-xs">
              {s.buyer.name} · {t('orders', { count: s.orders })}
            </span>
          </span>
        ),
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (s) => s.status,
        cell: (s) => (
          <span className="flex flex-wrap items-center gap-1">
            <StatusBadge domain="freight" status={s.status} />
            {s.historical ? <Badge variant="neutral">{t('historical')}</Badge> : null}
          </span>
        ),
      },
      {
        id: 'route',
        header: t('columns.route'),
        value: (s) => `${s.originCountry} ${s.destinationCountry}`,
        cell: (s) => (
          <span className="text-xs">
            {tm(s.mode)}
            <span className="text-muted-foreground block">
              {countryName(s.originCountry, locale)} →{' '}
              {s.destinationPort ?? countryName(s.destinationCountry, locale)}
            </span>
          </span>
        ),
      },
      {
        id: 'margin',
        header: t('columns.margin'),
        value: (s) => s.marginMinor,
        cell: (s) => (
          <span className="tabular text-xs">
            {formatMoney(s.buyerPriceMinor, s.currency, locale)}
            <span className="text-muted-foreground block">
              {t('cost', { amount: formatMoney(s.partnerCostMinor, s.currency, locale) })}
            </span>
            <span
              className={s.marginMinor >= 0 ? 'text-success-ink block' : 'text-danger-ink block'}
            >
              {formatMoney(s.marginMinor, s.currency, locale)}
            </span>
          </span>
        ),
        searchable: false,
        align: 'end',
      },
      {
        id: 'eta',
        header: t('columns.eta'),
        value: (s) => s.eta ?? '',
        cell: (s) => s.eta ?? '—',
        searchable: false,
        hideOnMobile: true,
      },
    ],
    [t, tm, locale],
  );
  return (
    <DataTable
      data={shipments.data}
      columns={columns}
      loading={shipments.isPending}
      error={shipments.isError}
      onRetry={() => void shipments.refetch()}
      retrying={shipments.isFetching}
      filters={[{ column: 'status', label: t('columns.status') }]}
      initialSort={{ id: 'code', desc: true }}
      csvName="shipments"
      empty={{ icon: Ship, title: t('empty'), description: t('emptyBody') }}
    />
  );
}

export function ShipmentDetail({ code }: { code: string }) {
  const t = useTranslations('logistics.shipment');
  const tm = useTranslations('logistics.modes');
  const td = useTranslations('logistics.documents');
  const locale = useLocale();
  const shipment = useShipment(code);
  const update = useUpdateShipment(code);
  const [editing, setEditing] = useState<AdminShipmentLeg | null>(null);
  // Opened from a dispute: /admin/logistics/shipments/SHP-…?claim=ORD-…&dispute=<id>
  const claimHint = useClientSearchParam('claim');
  const disputeHint = useClientSearchParam('dispute');
  const [claiming, setClaiming] = useState<{ order: string; dispute: string | null } | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  if (shipment.isPending) return <Skeleton className="h-96 rounded-xl" />;
  if (shipment.isError)
    return <ErrorState onRetry={() => void shipment.refetch()} retrying={shipment.isFetching} />;
  const s = shipment.data;
  const money = (minor: number) => formatMoney(minor, s.currency, locale);
  const setStatus = (status: 'BOOKED' | 'CANCELLED') =>
    update.mutate(
      { status },
      {
        onSuccess: () => toast.success(t('saved')),
        onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
      },
    );
  // Historical shipments (factory-booked, before logistics) are read-only.
  const open = !s.historical && !['DELIVERED', 'CANCELLED'].includes(s.status);
  const claimFor =
    claiming ??
    (!hintUsed && s.departedAt && s.orders.some((o) => o.code === claimHint) && claimHint
      ? { order: claimHint, dispute: disputeHint }
      : null);

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" render={<Link href="/admin/logistics?tab=shipments" />}>
        <ArrowLeft className="rtl:rotate-180" />
        {t('back')}
      </Button>
      <PageHeader
        eyebrow={`${s.buyer.code} · ${s.buyer.name}`}
        title={
          <span className="flex flex-wrap items-center gap-2">
            {s.code}
            <StatusBadge domain="freight" status={s.status} />
            {s.historical ? <Badge variant="neutral">{t('historical')}</Badge> : null}
          </span>
        }
        description={`${tm(s.mode)} · ${s.incoterm} ${s.destinationPort ?? countryName(s.destinationCountry, locale)} · ${t(`shipper.${s.shipperMode}`)}`}
      />
      {open ? (
        <div className="flex flex-wrap gap-2">
          {s.status === 'PLANNED' ? (
            <Button disabled={update.isPending} onClick={() => setStatus('BOOKED')}>
              {t('markBooked')}
            </Button>
          ) : null}
          <Button
            variant="ghost"
            className="text-danger-ink"
            disabled={update.isPending}
            onClick={() => setStatus('CANCELLED')}
          >
            {t('cancel')}
          </Button>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('legs')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {s.legs.map((l) => (
                  <li key={l.id} className="flex flex-wrap items-start gap-3 rounded-lg border p-3">
                    <span className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium">
                      {l.sequence}
                    </span>
                    <div className="min-w-0 flex-1 space-y-1 text-sm">
                      <p className="flex flex-wrap items-center gap-2 font-medium">
                        {t(`legKinds.${l.kind}`)}
                        <StatusBadge domain="leg" status={l.status} />
                        {l.partner && l.kind !== 'FACTORY_TO_HUB' ? (
                          <Badge variant={l.accepted ? 'success' : 'warning'}>
                            {l.accepted ? t('accepted') : t('awaitingPartner')}
                          </Badge>
                        ) : null}
                        {l.paid ? <Badge variant="neutral">{t('partnerPaid')}</Badge> : null}
                      </p>
                      <p className="text-muted-foreground font-mono text-xs">
                        {l.fromLabel} → {l.toLabel}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {[
                          l.partner?.name,
                          l.carrier,
                          l.trackingNumber,
                          l.transportDocNo,
                          l.containerNumber,
                        ]
                          .filter(Boolean)
                          .join(' · ') || t('notBooked')}
                        {l.costMinor !== null ? ` · ${money(l.costMinor)}` : ''}
                      </p>
                    </div>
                    {s.departedAt && l.partner && l.costMinor !== null && !l.paid ? (
                      <PayLegButton
                        code={s.code}
                        legId={l.id}
                        label={t('payPartner', { amount: money(l.costMinor) })}
                      />
                    ) : null}
                    {l.kind !== 'FACTORY_TO_HUB' && open ? (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={t('editLeg')}
                        onClick={() => setEditing(l)}
                      >
                        <Pencil />
                      </Button>
                    ) : null}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <EventsCard shipment={s} open={open} />
          <OpenClaimDialog
            shipment={s}
            orderCode={claimFor?.order ?? null}
            disputeId={claimFor?.dispute ?? null}
            onClose={() => {
              setClaiming(null);
              setHintUsed(true);
            }}
          />

          <Card>
            <CardHeader>
              <CardTitle>{t('ordersTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y text-sm">
                {s.orders.map((o) => (
                  <li key={o.code} className="flex flex-wrap justify-between gap-3 py-2">
                    <span>
                      <Link
                        href={`/admin/orders/${o.code}`}
                        className="font-mono text-xs font-medium hover:underline"
                      >
                        {o.code}
                      </Link>
                      <span className="text-muted-foreground block text-xs">
                        {o.manufacturer.code} · {o.manufacturer.name}
                      </span>
                      {o.forwarder ? (
                        <span className="bg-surface mt-1 block rounded-md border p-2 text-xs">
                          <span className="block font-medium">
                            {t('forwarder', { name: o.forwarder.name })}
                          </span>
                          {o.forwarder.contact ? (
                            <span className="block">{o.forwarder.contact}</span>
                          ) : null}
                          {o.forwarder.reference ? (
                            <span className="block font-mono">{o.forwarder.reference}</span>
                          ) : null}
                        </span>
                      ) : null}
                    </span>
                    <span className="tabular text-end text-xs">
                      {t('cargo', {
                        cartons: o.cartons,
                        kg: (o.grossWeightGrams / 1000).toFixed(0),
                        cbm: (o.volumeLitres / 1000).toFixed(2),
                      })}
                      <span className="text-muted-foreground block">
                        {money(o.buyerShareMinor)} / {money(o.costShareMinor)}
                      </span>
                      {s.departedAt ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-1"
                          onClick={() => setClaiming({ order: o.code, dispute: null })}
                        >
                          {t('openClaim')}
                        </Button>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('money')}</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-1 text-sm">
                {(
                  [
                    [t('buyerPrice'), money(s.buyerPriceMinor)],
                    [t('partnerCost'), money(s.partnerCostMinor)],
                    [t('margin'), money(s.marginMinor)],
                    [t('insurance'), money(s.insuranceMinor)],
                    [t('cartons'), String(s.cartons)],
                    [t('weight'), `${(s.grossWeightGrams / 1000).toFixed(1)} kg`],
                    [t('volume'), `${(s.volumeLitres / 1000).toFixed(2)} CBM`],
                    [t('hub'), s.originHub?.code ?? '—'],
                    ...(s.consolidationCode ? [[t('consolidation'), s.consolidationCode]] : []),
                  ] as [string, string][]
                ).map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="tabular">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('documentsTitle')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {s.documentTypes.map((type) => {
                const issued = s.documents.find((d) => d.type === type);
                return (
                  <a
                    key={type}
                    href={shipmentDocumentUrl(s.code, type)}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:bg-muted flex min-h-11 items-center gap-2 rounded-md px-2 text-sm md:min-h-9"
                  >
                    <FileDown className="size-4 shrink-0" aria-hidden="true" />
                    <span className="flex-1">{td(type)}</span>
                    {issued ? <Badge variant="neutral">{issued.number}</Badge> : null}
                  </a>
                );
              })}
              <p className="text-muted-foreground text-xs">{t('documentsHint')}</p>
            </CardContent>
          </Card>
          {s.uploads.length > 0 ? (
            <Card size="sm">
              <CardHeader>
                <CardTitle>{t('uploadsTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {s.uploads.map((u) => (
                  <div key={u.id} className="flex flex-wrap items-center gap-2">
                    <a
                      href={u.url ?? undefined}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:bg-muted flex min-h-11 min-w-0 flex-1 items-center gap-2 rounded-md px-2 text-sm md:min-h-9"
                    >
                      <FileDown className="size-4 shrink-0" aria-hidden="true" />
                      <span className="min-w-0 flex-1 truncate">{u.fileName}</span>
                      <Badge variant="neutral">{t(`uploadKinds.${u.kind}`)}</Badge>
                    </a>
                    <PublishUploadButton code={s.code} upload={u} />
                  </div>
                ))}
                <p className="text-muted-foreground text-xs">{t('uploadsHint')}</p>
              </CardContent>
            </Card>
          ) : null}
        </aside>
      </div>
      <LegDialog
        code={s.code}
        currency={s.currency}
        leg={editing}
        onClose={() => setEditing(null)}
      />
    </div>
  );
}

function LegDialog({
  code,
  currency,
  leg,
  onClose,
}: {
  code: string;
  currency: string;
  leg: AdminShipmentLeg | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={leg !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        {leg ? (
          <LegForm key={leg.id} code={code} currency={currency} leg={leg} onClose={onClose} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function LegForm({
  code,
  currency,
  leg,
  onClose,
}: {
  code: string;
  currency: string;
  leg: AdminShipmentLeg;
  onClose: () => void;
}) {
  const t = useTranslations('logistics.shipment');
  const tc = useTranslations('common');
  const tl = useTranslations('statuses.leg');
  const partners = usePartners();
  const update = useUpdateLeg(code);
  const [values, setValues] = useState({
    status: leg.status,
    partnerId: leg.partner?.id ?? '',
    carrier: leg.carrier ?? '',
    trackingNumber: leg.trackingNumber ?? '',
    containerNumber: leg.containerNumber ?? '',
    transportDocNo: leg.transportDocNo ?? '',
    cost: leg.costMinor === null ? '' : minorToAmount(leg.costMinor, currency),
    etd: leg.etd ?? '',
    eta: leg.eta ?? '',
  });
  const [error, setError] = useState<string | null>(null);
  const set = (key: keyof typeof values) => (e: { target: { value: string } }) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));
  const submit = async () => {
    setError(null);
    const cost = values.cost.trim() === '' ? '' : amountToMinor(values.cost, currency);
    if (typeof cost === 'number' && Number.isNaN(cost)) {
      setError(t('badCost'));
      return;
    }
    try {
      await update.mutateAsync({
        id: leg.id,
        dto: {
          status: values.status,
          partnerId: values.partnerId,
          carrier: values.carrier,
          trackingNumber: values.trackingNumber,
          containerNumber: values.containerNumber,
          transportDocNo: values.transportDocNo,
          costMinor: cost,
          etd: values.etd,
          eta: values.eta,
        },
      });
      toast.success(t('saved'));
      onClose();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : tc('networkError'));
    }
  };
  const text = (key: 'carrier' | 'trackingNumber' | 'containerNumber' | 'transportDocNo') => (
    <Field>
      <FieldLabel htmlFor={`leg-${key}`}>{t(`legFields.${key}`)}</FieldLabel>
      <Input id={`leg-${key}`} value={values[key]} onChange={set(key)} />
    </Field>
  );
  return (
    <>
      <DialogHeader>
        <DialogTitle>{t(`legKinds.${leg.kind}`)}</DialogTitle>
        <DialogDescription>
          {leg.fromLabel} → {leg.toLabel}
        </DialogDescription>
      </DialogHeader>
      <FormAlert message={error} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="leg-status">{t('legFields.status')}</FieldLabel>
            <OptionSelect
              id="leg-status"
              value={values.status}
              onChange={(v) => {
                const parsed = ShipmentLegStatusSchema.safeParse(v);
                if (parsed.success) setValues((x) => ({ ...x, status: parsed.data }));
              }}
              options={ShipmentLegStatusSchema.options.map((s) => ({ value: s, label: tl(s) }))}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="leg-partner">{t('legFields.partner')}</FieldLabel>
            <OptionSelect
              id="leg-partner"
              value={values.partnerId}
              onChange={(v) => setValues((x) => ({ ...x, partnerId: v }))}
              emptyLabel={t('none')}
              options={(partners.data ?? [])
                .filter((p) => p.active)
                .map((p) => ({ value: p.id, label: `${p.code} · ${p.name}` }))}
            />
          </Field>
          {text('carrier')}
          {text('trackingNumber')}
          {text('transportDocNo')}
          {text('containerNumber')}
          <Field>
            <FieldLabel htmlFor="leg-cost">{t('legFields.cost', { currency })}</FieldLabel>
            <Input id="leg-cost" inputMode="decimal" value={values.cost} onChange={set('cost')} />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field>
              <FieldLabel htmlFor="leg-etd">{t('legFields.etd')}</FieldLabel>
              <Input id="leg-etd" type="date" value={values.etd} onChange={set('etd')} />
            </Field>
            <Field>
              <FieldLabel htmlFor="leg-eta">{t('legFields.eta')}</FieldLabel>
              <Input id="leg-eta" type="date" value={values.eta} onChange={set('eta')} />
            </Field>
          </div>
        </div>
      </FieldGroup>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          {tc('cancel')}
        </Button>
        <Button disabled={update.isPending} onClick={() => void submit()}>
          {t('saveLeg')}
        </Button>
      </DialogFooter>
    </>
  );
}

function PublishUploadButton({
  code,
  upload: u,
}: {
  code: string;
  upload: AdminShipment['uploads'][number];
}) {
  const t = useTranslations('logistics.shipment');
  const publish = usePublishUpload(code);
  if (!u.ready && !u.buyerVisible)
    return <span className="text-muted-foreground text-xs">{t('cleaning')}</span>;
  return (
    <Button
      size="xs"
      variant={u.buyerVisible ? 'outline' : 'default'}
      disabled={publish.isPending}
      onClick={() =>
        publish.mutate(
          { id: u.id, buyerVisible: !u.buyerVisible },
          {
            onSuccess: () => toast.success(u.buyerVisible ? t('hidden') : t('published')),
            onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
          },
        )
      }
    >
      {u.buyerVisible ? t('hideFromBuyer') : t('publishToBuyer')}
    </Button>
  );
}

function PayLegButton({ code, legId, label }: { code: string; legId: string; label: string }) {
  const t = useTranslations('logistics.shipment');
  const pay = usePayLeg(code);
  return (
    <Button
      size="xs"
      variant="outline"
      disabled={pay.isPending}
      onClick={() =>
        pay.mutate(legId, {
          onSuccess: () => toast.success(t('paidToast')),
          onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
        })
      }
    >
      {label}
    </Button>
  );
}

/** The timeline staff see (with the original notes) and the form to add an update. */
function EventsCard({ shipment: s, open }: { shipment: AdminShipment; open: boolean }) {
  const t = useTranslations('logistics.shipment');
  const tf = useTranslations('statuses.freight');
  const format = useFormatter();
  const post = useShipmentEvent(s.code);
  const [status, setStatus] = useState<TrackingStatus | ''>('');
  const [location, setLocation] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const submit = async () => {
    setError(null);
    try {
      await post.mutateAsync({ ...(status && { status }), location, note });
      toast.success(t('saved'));
      setStatus('');
      setLocation('');
      setNote('');
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('failed'));
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('tracking')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {open ? (
          <div className="space-y-3 rounded-lg border p-3">
            <FormAlert message={error} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="se-status">{t('eventStatus')}</FieldLabel>
                <OptionSelect
                  id="se-status"
                  value={status}
                  onChange={(v) => setStatus(TRACKING_STATUSES.find((x) => x === v) ?? '')}
                  emptyLabel={t('noChange')}
                  options={TRACKING_STATUSES.map((x) => ({ value: x, label: tf(x) }))}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="se-location">{t('location')}</FieldLabel>
                <Input
                  id="se-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="se-note">{t('note')}</FieldLabel>
              <Textarea
                id="se-note"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Field>
            <p className="text-muted-foreground text-xs">{t('departureHint')}</p>
            <Button size="sm" disabled={post.isPending} onClick={() => void submit()}>
              {t('postUpdate')}
            </Button>
          </div>
        ) : null}
        {s.events.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('noEvents')}</p>
        ) : (
          <ol className="space-y-3 border-s ps-4">
            {s.events.map((e, i) => (
              <li key={`${e.occurredAt}-${String(i)}`} className="text-sm">
                <p className="flex flex-wrap items-center gap-2 font-medium">
                  {e.status ? <StatusBadge domain="freight" status={e.status} /> : null}
                  {e.location}
                  <Badge variant="neutral">{t(`sources.${e.source}`)}</Badge>
                </p>
                <p className="text-muted-foreground text-xs">
                  {format.dateTime(new Date(e.occurredAt), {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
                {e.internalNote ? <p className="text-muted-foreground">{e.internalNote}</p> : null}
                {e.publicNote && e.publicNote !== e.internalNote ? (
                  <p className="text-subtle-foreground text-xs">
                    {t('buyerSees', { note: e.publicNote })}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}
