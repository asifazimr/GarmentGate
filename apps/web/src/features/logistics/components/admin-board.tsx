'use client';

import {
  type AdminLogisticsOrder,
  HubReceiptConditionSchema,
  type HubReceiptInput,
} from '@garmentgate/shared';
import { Boxes, CalendarCheck, PackageCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { useTodayIso } from '@/lib/client-hooks';
import { countryName } from '@/lib/countries';
import { formatMoney } from '@/lib/format';
import {
  uploadHubPhoto,
  useCreateShipment,
  useHubs,
  useLogisticsBoard,
  usePartners,
  useReceiveAtHub,
  useUpdatePickup,
} from '../api';
import { OptionSelect } from './form-bits';

const kg = (g: number) => (g / 1000).toFixed(0);

/** Every order GarmentGate ships, from pickup to hub to shipment. Staff see both real names. */
export function LogisticsBoard() {
  const t = useTranslations('logistics.board');
  const tm = useTranslations('logistics.modes');
  const locale = useLocale();
  const router = useRouter();
  const board = useLogisticsBoard();
  const create = useCreateShipment();
  const update = useUpdatePickup();
  const [selected, setSelected] = useState<string[]>([]);
  const [receiving, setReceiving] = useState<AdminLogisticsOrder | null>(null);
  const [scheduling, setScheduling] = useState<AdminLogisticsOrder | null>(null);

  const toggle = (code: string, on: boolean) =>
    setSelected((s) => (on ? [...s, code] : s.filter((c) => c !== code)));

  const columns = useMemo<DataColumn<AdminLogisticsOrder>[]>(
    () => [
      {
        id: 'select',
        header: '',
        value: () => null,
        cell: (o) =>
          o.receipt && !o.shipmentCode ? (
            <Checkbox
              aria-label={t('select', { code: o.code })}
              checked={selected.includes(o.code)}
              onCheckedChange={(v) => toggle(o.code, v)}
            />
          ) : null,
        sortable: false,
        searchable: false,
        csv: false,
      },
      {
        id: 'order',
        header: t('columns.order'),
        value: (o) => `${o.code} ${o.buyer.code} ${o.buyer.name} ${o.manufacturer.name}`,
        cell: (o) => (
          <span className="space-y-0.5">
            <Link
              href={`/admin/orders/${o.code}`}
              className="block font-mono text-xs font-medium hover:underline"
            >
              {o.code}
            </Link>
            <StatusBadge domain="order" status={o.status} />
            <span className="text-muted-foreground block text-xs">
              {o.buyer.name} ← {o.manufacturer.name}
            </span>
          </span>
        ),
      },
      {
        id: 'shipping',
        header: t('columns.shipping'),
        value: (o) => `${o.quote.mode} ${o.quote.destinationCountry}`,
        cell: (o) => (
          <span className="text-xs">
            <span className="block font-medium">{tm(o.quote.mode)}</span>
            {o.quote.incoterm}{' '}
            {o.quote.destinationPort ?? countryName(o.quote.destinationCountry, locale)}
            <span className="block">
              {formatMoney(o.quote.totalMinor, o.quote.currency, locale)}{' '}
              <Badge variant={o.quote.paid ? 'success' : 'warning'}>
                {o.quote.paid ? t('paid') : t('unpaid')}
              </Badge>
            </span>
            {o.quote.consolidationCode ? (
              <span className="text-muted-foreground block font-mono">
                {o.quote.consolidationCode}
              </span>
            ) : null}
            {o.quote.forwarder ? (
              <span className="text-muted-foreground block">
                {t('forwarder', { name: o.quote.forwarder.name })}
              </span>
            ) : null}
          </span>
        ),
        searchable: false,
      },
      {
        id: 'cargo',
        header: t('columns.cargo'),
        value: (o) => o.cargo.packedGrams ?? o.cargo.estimatedGrams,
        cell: (o) => (
          <span className="tabular text-xs">
            {o.cargo.packedGrams !== null ? (
              <>
                {t('packed', {
                  cartons: o.cargo.cartons ?? 0,
                  kg: kg(o.cargo.packedGrams),
                  cbm: ((o.cargo.packedLitres ?? 0) / 1000).toFixed(2),
                })}
                <span className="text-muted-foreground block">
                  {t('estimated', {
                    kg: kg(o.cargo.estimatedGrams),
                    cbm: (o.cargo.estimatedLitres / 1000).toFixed(2),
                  })}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">{t('notPacked')}</span>
            )}
          </span>
        ),
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'pickup',
        header: t('columns.pickup'),
        value: (o) => o.pickup?.status ?? '',
        cell: (o) =>
          o.pickup ? (
            <span className="space-y-1 text-xs">
              <StatusBadge domain="pickup" status={o.pickup.status} />
              <span className="block">
                {o.pickup.hubCode} · {o.pickup.pickupDate}
              </span>
              {o.pickup.status === 'REQUESTED' ? (
                <Button size="xs" variant="outline" onClick={() => setScheduling(o)}>
                  <CalendarCheck />
                  {t('schedule')}
                </Button>
              ) : o.pickup.status === 'SCHEDULED' ? (
                <Button
                  size="xs"
                  variant="outline"
                  disabled={update.isPending}
                  onClick={() =>
                    update.mutate(
                      { id: o.pickup?.id ?? '', dto: { status: 'COLLECTED', partnerId: null } },
                      {
                        onError: (e) =>
                          toast.error(e instanceof ApiError ? e.message : t('failed')),
                      },
                    )
                  }
                >
                  <Truck />
                  {t('collected')}
                </Button>
              ) : null}
            </span>
          ) : (
            <span className="text-muted-foreground text-xs">—</span>
          ),
      },
      {
        id: 'hub',
        header: t('columns.hub'),
        value: (o) => (o.receipt ? o.receipt.receivedAt : ''),
        cell: (o) =>
          o.receipt ? (
            <span className="text-xs">
              {o.receipt.hubCode} · {t('cartons', { count: o.receipt.cartonsReceived })}
              <Badge
                variant={o.receipt.condition === 'GOOD' ? 'success' : 'warning'}
                className="ms-1"
              >
                {t(`conditions.${o.receipt.condition}`)}
              </Badge>
            </span>
          ) : o.pickup ? (
            <Button size="xs" onClick={() => setReceiving(o)}>
              <PackageCheck />
              {t('receive')}
            </Button>
          ) : null,
        searchable: false,
      },
      {
        id: 'shipment',
        header: t('columns.shipment'),
        value: (o) => o.shipmentCode ?? '',
        cell: (o) =>
          o.shipmentCode ? (
            <Link
              href={`/admin/logistics/shipments/${o.shipmentCode}`}
              className="font-mono text-xs font-medium hover:underline"
            >
              {o.shipmentCode}
            </Link>
          ) : null,
      },
    ],
    [t, tm, locale, selected, update],
  );

  const createShipment = async () => {
    try {
      const { code } = await create.mutateAsync({ orderCodes: selected });
      toast.success(t('created', { code }));
      setSelected([]);
      router.push(`/admin/logistics/shipments/${code}`);
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : t('failed'));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-muted-foreground max-w-2xl text-sm">{t('description')}</p>
        <Button
          disabled={selected.length === 0 || create.isPending}
          onClick={() => void createShipment()}
        >
          <Boxes />
          {t('createShipment', { count: selected.length })}
        </Button>
      </div>
      <DataTable
        data={board.data}
        columns={columns}
        loading={board.isPending}
        error={board.isError}
        onRetry={() => void board.refetch()}
        retrying={board.isFetching}
        initialSort={{ id: 'order', desc: true }}
        csvName="logistics-orders"
        empty={{ icon: Truck, title: t('empty'), description: t('emptyBody') }}
      />
      <ReceiveDialog order={receiving} onClose={() => setReceiving(null)} />
      <ScheduleDialog order={scheduling} onClose={() => setScheduling(null)} />
    </div>
  );
}

function ScheduleDialog({
  order,
  onClose,
}: {
  order: AdminLogisticsOrder | null;
  onClose: () => void;
}) {
  const t = useTranslations('logistics.board');
  const tc = useTranslations('common');
  const partners = usePartners();
  const update = useUpdatePickup();
  const [date, setDate] = useState('');
  const [partnerId, setPartnerId] = useState('');
  const [error, setError] = useState<string | null>(null);
  const submit = async () => {
    if (!order?.pickup) return;
    try {
      await update.mutateAsync({
        id: order.pickup.id,
        dto: {
          status: 'SCHEDULED',
          pickupDate: date || order.pickup.pickupDate,
          partnerId: partnerId || null,
        },
      });
      toast.success(t('scheduled'));
      onClose();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : tc('networkError'));
    }
  };
  return (
    <Dialog open={order !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('scheduleTitle', { code: order?.code ?? '' })}</DialogTitle>
          <DialogDescription>{t('scheduleBody')}</DialogDescription>
        </DialogHeader>
        <FormAlert message={error} />
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="sc-date">{t('pickupDate')}</FieldLabel>
            <Input
              id="sc-date"
              type="date"
              value={date !== '' ? date : (order?.pickup?.pickupDate ?? '')}
              onChange={(e) => setDate(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="sc-partner">{t('trucker')}</FieldLabel>
            <OptionSelect
              id="sc-partner"
              value={partnerId}
              onChange={setPartnerId}
              emptyLabel={t('ownTruck')}
              options={(partners.data ?? [])
                .filter((p) => p.active && (p.kind === 'TRUCKING' || p.kind === 'FORWARDER'))
                .map((p) => ({ value: p.id, label: `${p.code} · ${p.name}` }))}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button disabled={update.isPending} onClick={() => void submit()}>
            {t('schedule')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ReceiveDialog({
  order,
  onClose,
}: {
  order: AdminLogisticsOrder | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={order !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        {order ? <ReceiveForm key={order.code} order={order} onClose={onClose} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function ReceiveForm({ order, onClose }: { order: AdminLogisticsOrder; onClose: () => void }) {
  const t = useTranslations('logistics.board');
  const tc = useTranslations('common');
  const today = useTodayIso();
  const hubs = useHubs();
  const receive = useReceiveAtHub();
  const pickupHub = hubs.data?.find((h) => h.code === order.pickup?.hubCode);
  const [hubId, setHubId] = useState('');
  const [cartons, setCartons] = useState(String(order.cargo.cartons ?? ''));
  const [weightKg, setWeightKg] = useState('');
  const [condition, setCondition] = useState<HubReceiptInput['condition']>('GOOD');
  const [repacked, setRepacked] = useState(false);
  const [relabelled, setRelabelled] = useState(true);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<{ name: string; id: string }[]>([]);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hub = hubId !== '' ? hubId : (pickupHub?.id ?? '');

  const addPhoto = async (file: File) => {
    setProgress(0);
    try {
      const id = await uploadHubPhoto(file, setProgress);
      setPhotos((p) => [...p, { name: file.name, id }]);
    } catch {
      setError(t('uploadFailed'));
    } finally {
      setProgress(null);
    }
  };
  const submit = async () => {
    setError(null);
    try {
      await receive.mutateAsync({
        orderCode: order.code,
        hubId: hub,
        cartonsReceived: cartons,
        grossWeightGrams: weightKg ? Math.round(Number(weightKg.replace(',', '.')) * 1000) : '',
        condition,
        repacked,
        relabelled,
        notes,
        photoFileIds: photos.map((p) => p.id),
      });
      toast.success(t('receivedToast'));
      onClose();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : tc('networkError'));
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('receiveTitle', { code: order.code })}</DialogTitle>
        <DialogDescription>
          {t('receiveBody', { cartons: order.cargo.cartons ?? 0, date: today ?? '' })}
        </DialogDescription>
      </DialogHeader>
      <FormAlert message={error} />
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="rc-hub">{t('hub')}</FieldLabel>
          <OptionSelect
            id="rc-hub"
            value={hub}
            onChange={setHubId}
            options={(hubs.data ?? [])
              .filter((h) => h.active)
              .map((h) => ({ value: h.id, label: `${h.code} · ${h.name}` }))}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="rc-cartons">{t('cartonsReceived')}</FieldLabel>
            <Input
              id="rc-cartons"
              inputMode="numeric"
              value={cartons}
              onChange={(e) => setCartons(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="rc-kg">{t('weighed')}</FieldLabel>
            <Input
              id="rc-kg"
              inputMode="decimal"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="rc-condition">{t('condition')}</FieldLabel>
          <OptionSelect
            id="rc-condition"
            value={condition}
            onChange={(v) => {
              const parsed = HubReceiptConditionSchema.safeParse(v);
              if (parsed.success) setCondition(parsed.data);
            }}
            options={HubReceiptConditionSchema.options.map((c) => ({
              value: c,
              label: t(`conditions.${c}`),
            }))}
          />
        </Field>
        <div className="flex flex-wrap gap-6">
          <Field orientation="horizontal">
            <Checkbox id="rc-repacked" checked={repacked} onCheckedChange={setRepacked} />
            <FieldLabel htmlFor="rc-repacked" className="font-normal">
              {t('repacked')}
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <Checkbox id="rc-relabelled" checked={relabelled} onCheckedChange={setRelabelled} />
            <FieldLabel htmlFor="rc-relabelled" className="font-normal">
              {t('relabelled')}
            </FieldLabel>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="rc-notes">{t('notes')}</FieldLabel>
          <Textarea
            id="rc-notes"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Field>
        <Field>
          <FieldLabel>{t('photos')}</FieldLabel>
          <FileDropzone
            compact
            multiple
            accept={['image/jpeg', 'image/png', 'image/webp']}
            maxBytes={15 * 1024 * 1024}
            progress={progress}
            label={t('addPhotos')}
            onFile={(file) => void addPhoto(file)}
          />
          {photos.length > 0 ? (
            <ul className="text-muted-foreground text-xs">
              {photos.map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
            </ul>
          ) : null}
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          {tc('cancel')}
        </Button>
        <Button
          disabled={receive.isPending || !hub || progress !== null}
          onClick={() => void submit()}
        >
          {t('receive')}
        </Button>
      </DialogFooter>
    </>
  );
}
