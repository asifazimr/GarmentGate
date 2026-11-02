'use client';

import {
  type BookShipmentDto,
  type BookShipmentInput,
  BookShipmentSchema,
  IncotermSchema,
  type OrderShipment,
  type OrderStatus,
  SHIPMENT_DOCUMENT_MAX_BYTES,
  SHIPMENT_DOCUMENT_TYPES,
  type ShipmentDocumentType,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, FileDown, FileUp, Pencil, Ship } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormAlert } from '@/features/auth/components/form-alert';
import type { OrderRole } from '@/features/orders/api';
import { applyServerErrors } from '@/lib/form-errors';
import {
  generatedDocumentUrl,
  uploadShipmentDocument,
  useAddShipmentDocument,
  useBookShipment,
  usePublishShipmentDocument,
} from '../api';

const MODES = ['SEA', 'AIR', 'ROAD', 'RAIL', 'COURIER'] as const;
const INCOTERMS = IncotermSchema.options;
const BOOKABLE: OrderStatus[] = ['READY_TO_SHIP', 'SHIPPED'];
const DOCUMENTS_OPEN: OrderStatus[] = ['READY_TO_SHIP', 'SHIPPED', 'DELIVERED'];

/**
 * The shipment on an order: booking details, papers GarmentGate issues to the buyer, and
 * papers the factory uploads (published to the buyer by staff once sanitized and checked).
 */
export function ShipmentPanel({
  role,
  code,
  status,
  shipment,
  defaultIncoterm,
}: {
  role: OrderRole;
  code: string;
  status: OrderStatus;
  shipment: OrderShipment | null;
  defaultIncoterm: string;
}) {
  const t = useTranslations('qc.shipment');
  const format = useFormatter();
  const [booking, setBooking] = useState(false);
  const [uploading, setUploading] = useState(false);
  const shipper = role !== 'BUYER';
  const canBook = shipper && BOOKABLE.includes(status);
  const canUpload = shipper && !!shipment && DOCUMENTS_OPEN.includes(status);
  const day = (iso: string | null) =>
    iso ? format.dateTime(new Date(iso), { dateStyle: 'medium' }) : '—';

  if (!shipment) {
    return canBook ? (
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">{t('notBooked')}</p>
        <Button size="sm" onClick={() => setBooking(true)}>
          <Ship />
          {t('book')}
        </Button>
        <BookShipmentDialog
          code={code}
          shipment={null}
          defaultIncoterm={defaultIncoterm}
          open={booking}
          onClose={() => setBooking(false)}
        />
      </div>
    ) : null;
  }

  const facts: [string, string][] = [
    [t('fields.mode'), t(`modes.${shipment.mode}`)],
    [t('fields.incoterm'), shipment.incoterm ?? defaultIncoterm],
    [t('fields.forwarder'), shipment.forwarder ?? '—'],
    [t('fields.carrier'), shipment.carrier ?? '—'],
    [t('fields.tracking'), shipment.trackingNumber ?? '—'],
    [t('fields.container'), shipment.containerNumber ?? '—'],
    [t('fields.transportDoc'), shipment.transportDocNo ?? '—'],
    [t('fields.route'), `${shipment.originPort ?? '—'} → ${shipment.destinationPort ?? '—'}`],
    [t('fields.etd'), day(shipment.etd)],
    [t('fields.eta'), day(shipment.eta)],
    ...(shipment.cartons
      ? ([[t('fields.cartons'), format.number(shipment.cartons)]] as [string, string][])
      : []),
    ...(shipment.grossWeightKg
      ? ([[t('fields.weight'), `${format.number(shipment.grossWeightKg)} kg`]] as [
          string,
          string,
        ][])
      : []),
  ];

  return (
    <div className="bg-surface space-y-4 rounded-lg border p-3 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium">{t('title')}</span>
        <StatusBadge domain="shipment" status={shipment.status} />
        {canBook ? (
          <Button variant="ghost" size="sm" className="ms-auto" onClick={() => setBooking(true)}>
            <Pencil />
            {t('edit')}
          </Button>
        ) : null}
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {facts.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-muted-foreground text-xs">{label}</dt>
            <dd className="tabular truncate font-medium" title={value}>
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {shipment.generatedDocuments.length > 0 || shipment.documents.length > 0 || canUpload ? (
        <div className="space-y-2 border-t pt-3">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            {t('documents')}
          </p>
          <ul className="flex flex-wrap gap-2">
            {shipment.generatedDocuments.map((type) => (
              <li key={type}>
                <Button
                  variant="outline"
                  size="sm"
                  render={
                    <a
                      href={generatedDocumentUrl(code, type)}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <FileDown />
                  {t(`docTypes.${type}`)}
                </Button>
              </li>
            ))}
          </ul>
          {shipment.documents.length > 0 ? (
            <ul className="divide-y rounded-md border">
              {shipment.documents.map((d) => (
                <UploadedDocument key={d.id} code={code} role={role} document={d} />
              ))}
            </ul>
          ) : null}
          {role === 'BUYER' && shipment.generatedDocuments.length > 0 ? (
            <p className="text-muted-foreground text-xs">{t('issuedByUs')}</p>
          ) : null}
          {canUpload ? (
            <Button variant="outline" size="sm" onClick={() => setUploading(true)}>
              <FileUp />
              {t('upload')}
            </Button>
          ) : null}
        </div>
      ) : null}

      <BookShipmentDialog
        code={code}
        shipment={shipment}
        defaultIncoterm={defaultIncoterm}
        open={booking}
        onClose={() => setBooking(false)}
      />
      <UploadDocumentDialog code={code} open={uploading} onClose={() => setUploading(false)} />
    </div>
  );
}

function UploadedDocument({
  code,
  role,
  document: d,
}: {
  code: string;
  role: OrderRole;
  document: OrderShipment['documents'][number];
}) {
  const t = useTranslations('qc.shipment');
  const publish = usePublishShipmentDocument(code);
  const ready = d.processing === 'READY';
  return (
    <li className="flex flex-wrap items-center gap-2 px-3 py-2">
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{t(`docTypes.${d.type}`)}</span>
        <span className="text-muted-foreground block truncate font-mono text-xs">{d.name}</span>
      </span>
      {role !== 'BUYER' ? (
        <Badge variant={d.buyerVisible ? 'success' : 'neutral'}>
          {d.buyerVisible ? t('visible') : t('hidden')}
        </Badge>
      ) : null}
      {!ready ? (
        <span className="text-muted-foreground text-xs">
          {d.processing === 'FAILED' ? t('failed') : t('processing')}
        </span>
      ) : null}
      {d.url ? (
        <Button
          variant="ghost"
          size="sm"
          render={<a href={d.url} target="_blank" rel="noopener noreferrer" />}
        >
          <FileDown />
          {t('open')}
        </Button>
      ) : null}
      {role === 'ADMIN' && ready ? (
        <Button
          variant="outline"
          size="sm"
          disabled={publish.isPending}
          onClick={() =>
            publish.mutate(
              { id: d.id, buyerVisible: !d.buyerVisible },
              {
                onSuccess: () => toast.success(d.buyerVisible ? t('hiddenDone') : t('published')),
                onError: () => toast.error(t('publishFailed')),
              },
            )
          }
        >
          {d.buyerVisible ? <EyeOff /> : <Eye />}
          {d.buyerVisible ? t('hide') : t('publish')}
        </Button>
      ) : null}
    </li>
  );
}

const dateValue = (iso: string | null | undefined) => (iso ? iso.slice(0, 10) : '');

function BookShipmentDialog({
  code,
  shipment,
  defaultIncoterm,
  open,
  onClose,
}: {
  code: string;
  shipment: OrderShipment | null;
  defaultIncoterm: string;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('qc.shipment');
  const tc = useTranslations('common');
  const book = useBookShipment(code);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<BookShipmentInput, unknown, BookShipmentDto>({
    resolver: zodResolver(BookShipmentSchema),
    values: {
      mode: shipment?.mode ?? 'SEA',
      incoterm: shipment?.incoterm ?? INCOTERMS.find((i) => i === defaultIncoterm),
      forwarder: shipment?.forwarder ?? '',
      carrier: shipment?.carrier ?? '',
      trackingNumber: shipment?.trackingNumber ?? '',
      containerNumber: shipment?.containerNumber ?? '',
      transportDocNo: shipment?.transportDocNo ?? '',
      originPort: shipment?.originPort ?? '',
      destinationPort: shipment?.destinationPort ?? '',
      cartons: shipment?.cartons ?? '',
      grossWeightKg: shipment?.grossWeightKg ?? '',
      etd: dateValue(shipment?.etd),
      eta: dateValue(shipment?.eta),
    },
  });
  const { errors, isSubmitting } = form.formState;
  const text = (
    name:
      | 'forwarder'
      | 'carrier'
      | 'trackingNumber'
      | 'containerNumber'
      | 'transportDocNo'
      | 'originPort'
      | 'destinationPort',
    placeholder?: string,
  ) => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`sh-${name}`}>{t(`form.${name}`)}</FieldLabel>
      <Input id={`sh-${name}`} placeholder={placeholder} {...form.register(name)} />
      <FieldError errors={[errors[name]]} />
    </Field>
  );
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{shipment ? t('editTitle') : t('bookTitle')}</DialogTitle>
          <DialogDescription>{t('bookBody')}</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-5"
          noValidate
          onSubmit={(e) =>
            void form.handleSubmit(async (dto) => {
              try {
                await book.mutateAsync(dto);
                toast.success(shipment ? t('updated') : t('booked'));
                onClose();
              } catch (err) {
                setError(
                  applyServerErrors(
                    err,
                    form.setError,
                    ['forwarder', 'carrier', 'trackingNumber', 'originPort', 'etd', 'eta'],
                    tc('networkError'),
                  ),
                );
              }
            })(e)
          }
        >
          <FormAlert message={error} />
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="sh-mode">{t('fields.mode')}</FieldLabel>
                <Controller
                  control={form.control}
                  name="mode"
                  render={({ field }) => (
                    <Select
                      items={MODES.map((m) => ({ value: m, label: t(`modes.${m}`) }))}
                      value={field.value}
                      onValueChange={(v) => {
                        const m = MODES.find((x) => x === v);
                        if (m) field.onChange(m);
                      }}
                    >
                      <SelectTrigger id="sh-mode" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MODES.map((m) => (
                          <SelectItem key={m} value={m}>
                            {t(`modes.${m}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="sh-incoterm">{t('fields.incoterm')}</FieldLabel>
                <Controller
                  control={form.control}
                  name="incoterm"
                  render={({ field }) => (
                    <Select
                      items={INCOTERMS.map((i) => ({ value: i, label: i }))}
                      value={typeof field.value === 'string' ? field.value : ''}
                      onValueChange={(v) => {
                        const i = INCOTERMS.find((x) => x === v);
                        if (i) field.onChange(i);
                      }}
                    >
                      <SelectTrigger id="sh-incoterm" className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {INCOTERMS.map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              {text('forwarder', 'Kuehne+Nagel')}
              {text('carrier', 'Maersk')}
              {text('trackingNumber')}
              {text('transportDocNo')}
              {text('containerNumber')}
              <div className="grid grid-cols-2 gap-4">
                <Field data-invalid={!!errors.cartons}>
                  <FieldLabel htmlFor="sh-cartons">{t('fields.cartons')}</FieldLabel>
                  <Input id="sh-cartons" inputMode="numeric" {...form.register('cartons')} />
                  <FieldError errors={[errors.cartons]} />
                </Field>
                <Field data-invalid={!!errors.grossWeightKg}>
                  <FieldLabel htmlFor="sh-weight">{t('form.weightKg')}</FieldLabel>
                  <Input id="sh-weight" inputMode="numeric" {...form.register('grossWeightKg')} />
                  <FieldError errors={[errors.grossWeightKg]} />
                </Field>
              </div>
              {text('originPort', 'Chattogram')}
              {text('destinationPort')}
              <Field data-invalid={!!errors.etd}>
                <FieldLabel htmlFor="sh-etd">{t('fields.etd')}</FieldLabel>
                <Input id="sh-etd" type="date" {...form.register('etd')} />
                <FieldError errors={[errors.etd]} />
              </Field>
              <Field data-invalid={!!errors.eta}>
                <FieldLabel htmlFor="sh-eta">{t('fields.eta')}</FieldLabel>
                <Input id="sh-eta" type="date" {...form.register('eta')} />
                <FieldError errors={[errors.eta]} />
              </Field>
            </div>
          </FieldGroup>
          <p className="text-muted-foreground bg-card rounded-lg border p-3 text-xs">
            {t('privacy')}
          </p>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {tc('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {shipment ? t('save') : t('book')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function UploadDocumentDialog({
  code,
  open,
  onClose,
}: {
  code: string;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('qc.shipment');
  const tc = useTranslations('common');
  const attach = useAddShipmentDocument(code);
  const [type, setType] = useState<ShipmentDocumentType>('PACKING_LIST');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!file) return;
    setError(null);
    try {
      const fileId = await uploadShipmentDocument(code, file, setProgress);
      await attach.mutateAsync({ fileId, type });
      toast.success(t('uploaded'));
      setFile(null);
      onClose();
    } catch {
      setError(t('uploadFailed'));
    } finally {
      setProgress(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('uploadTitle')}</DialogTitle>
          <DialogDescription>{t('uploadBody')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-5">
          <FormAlert message={error} />
          <Field>
            <FieldLabel htmlFor="doc-type">{t('docType')}</FieldLabel>
            <Select
              items={SHIPMENT_DOCUMENT_TYPES.map((d) => ({ value: d, label: t(`docTypes.${d}`) }))}
              value={type}
              onValueChange={(v) => {
                const d = SHIPMENT_DOCUMENT_TYPES.find((x) => x === v);
                if (d) setType(d);
              }}
            >
              <SelectTrigger id="doc-type" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SHIPMENT_DOCUMENT_TYPES.map((d) => (
                  <SelectItem key={d} value={d}>
                    {t(`docTypes.${d}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <FileDropzone
            accept={['application/pdf']}
            maxBytes={SHIPMENT_DOCUMENT_MAX_BYTES}
            onFile={setFile}
            progress={progress}
            label={file ? file.name : t('choosePdf')}
            hint={t('pdfHint')}
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button disabled={!file || progress !== null} onClick={() => void submit()}>
            {t('uploadAction')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
