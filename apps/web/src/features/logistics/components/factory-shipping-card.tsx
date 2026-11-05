'use client';

import {
  type BookPickupDto,
  type BookPickupInput,
  BookPickupSchema,
  type FactoryOrderLogistics,
  type OrderPackingDto,
  OrderPackingInputSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileDown, PackageCheck, Truck, Warehouse } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { useTodayIso } from '@/lib/client-hooks';
import { countryName } from '@/lib/countries';
import { cartonMarkingsUrl, useBookPickup, useSavePacking } from '../order-api';
import { OptionSelect } from './form-bits';

/**
 * The factory's part of a GarmentGate-shipped order: say how it's packed, book GarmentGate's
 * pickup to one of its hubs, and print GarmentGate's carton markings. The buyer stays unnamed.
 */
export function FactoryShippingCard({
  code,
  logistics: l,
}: {
  code: string;
  logistics: FactoryOrderLogistics;
}) {
  const t = useTranslations('logistics.factory');
  const format = useFormatter();
  const [editing, setEditing] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <Truck className="size-4" aria-hidden="true" />
          {t('title')}
          {l.pickup ? <StatusBadge domain="pickup" status={l.pickup.status} /> : null}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <section className="space-y-3" aria-labelledby="packing-heading">
          <h3 id="packing-heading" className="flex items-center gap-2 text-sm font-semibold">
            <PackageCheck className="size-4" aria-hidden="true" />
            {t('packing')}
          </h3>
          {l.packing && !editing ? (
            <div className="space-y-2 text-sm">
              <p>
                {t('packed', {
                  cartons: l.packing.cartons,
                  kg: format.number(l.packing.grossWeightGrams / 1000, {
                    maximumFractionDigits: 1,
                  }),
                  cbm: format.number(l.packing.volumeLitres / 1000, { maximumFractionDigits: 2 }),
                })}
              </p>
              {l.canPack ? (
                <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                  {t('editPacking')}
                </Button>
              ) : null}
            </div>
          ) : l.canPack ? (
            <PackingForm code={code} logistics={l} onDone={() => setEditing(false)} />
          ) : (
            <p className="text-muted-foreground text-sm">{t('packLater')}</p>
          )}
        </section>

        <section className="space-y-3 border-t pt-5" aria-labelledby="pickup-heading">
          <h3 id="pickup-heading" className="flex items-center gap-2 text-sm font-semibold">
            <Warehouse className="size-4" aria-hidden="true" />
            {t('pickup')}
          </h3>
          {l.pickup ? (
            <div className="space-y-3 text-sm">
              <p>
                {t('pickupOn', {
                  date: format.dateTime(new Date(`${l.pickup.pickupDate}T00:00:00Z`), {
                    dateStyle: 'medium',
                    timeZone: 'UTC',
                  }),
                })}
              </p>
              <HubAddressBlock hub={l.pickup.hub} />
              {l.received ? (
                <p className="text-success-ink">
                  {t('received', {
                    cartons: l.received.cartons,
                    date: format.dateTime(new Date(l.received.receivedAt), { dateStyle: 'medium' }),
                  })}
                </p>
              ) : null}
              <Button
                variant="outline"
                size="sm"
                render={<a href={cartonMarkingsUrl(code)} target="_blank" rel="noreferrer" />}
              >
                <FileDown />
                {t('markings')}
              </Button>
              <p className="text-muted-foreground text-xs">{t('markingsHint')}</p>
            </div>
          ) : !l.managed ? (
            <p className="text-muted-foreground text-sm">{t('waitingForBuyer')}</p>
          ) : l.canBookPickup ? (
            <PickupForm code={code} logistics={l} />
          ) : (
            <p className="text-muted-foreground text-sm">{t('pickupLater')}</p>
          )}
        </section>
      </CardContent>
    </Card>
  );
}

function HubAddressBlock({ hub }: { hub: FactoryOrderLogistics['hubs'][number] }) {
  const locale = useLocale();
  return (
    <address className="bg-surface rounded-lg border p-3 text-sm not-italic">
      <span className="font-mono text-xs">{hub.code}</span>
      <span className="block font-medium">{hub.name}</span>
      <span className="text-muted-foreground block">
        {[
          hub.addressLine1,
          hub.addressLine2,
          [hub.postalCode, hub.city].filter(Boolean).join(' '),
          countryName(hub.country, locale),
        ]
          .filter(Boolean)
          .join(', ')}
      </span>
    </address>
  );
}

/** Kilograms and centimetres for people; grams and litres for the API. */
const PackingFormSchema = z
  .object({
    cartons: z.string(),
    piecesPerCarton: z.string(),
    grossKg: z.string(),
    netKg: z.string(),
    length: z.string(),
    width: z.string(),
    height: z.string(),
  })
  .transform((f, ctx): OrderPackingDto => {
    const grams = (v: string) =>
      v.trim() === '' ? '' : Math.round(Number(v.replace(',', '.')) * 1000);
    const result = OrderPackingInputSchema.safeParse({
      cartons: f.cartons,
      piecesPerCarton: f.piecesPerCarton,
      grossWeightGrams: grams(f.grossKg),
      netWeightGrams: grams(f.netKg),
      cartonLengthCm: f.length,
      cartonWidthCm: f.width,
      cartonHeightCm: f.height,
    });
    if (result.success) return result.data;
    const rename: Record<string, string> = {
      grossWeightGrams: 'grossKg',
      netWeightGrams: 'netKg',
      volumeLitres: 'length',
      cartonLengthCm: 'length',
      cartonWidthCm: 'width',
      cartonHeightCm: 'height',
    };
    for (const issue of result.error.issues)
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path.map((p) => (typeof p === 'string' ? (rename[p] ?? p) : p)),
      });
    return z.NEVER;
  });
type PackingForm = z.input<typeof PackingFormSchema>;

function PackingForm({
  code,
  logistics: l,
  onDone,
}: {
  code: string;
  logistics: FactoryOrderLogistics;
  onDone: () => void;
}) {
  const t = useTranslations('logistics.factory');
  const tc = useTranslations('common');
  const save = useSavePacking(code);
  const [formError, setFormError] = useState<string | null>(null);
  const p = l.packing;
  const str = (v: number | null | undefined, div = 1) =>
    v === null || v === undefined ? '' : String(v / div);
  const form = useForm<PackingForm, unknown, OrderPackingDto>({
    resolver: zodResolver(PackingFormSchema),
    defaultValues: {
      cartons: str(p?.cartons),
      piecesPerCarton: str(p?.piecesPerCarton),
      grossKg: str(p?.grossWeightGrams, 1000),
      netKg: str(p?.netWeightGrams, 1000),
      length: str(p?.cartonLengthCm),
      width: str(p?.cartonWidthCm),
      height: str(p?.cartonHeightCm),
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await save.mutateAsync(dto);
      toast.success(t('packingSaved'));
      onDone();
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, [], tc('networkError')));
    }
  });
  const field = (name: keyof PackingForm, inputMode: 'numeric' | 'decimal' = 'numeric') => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`pk-${name}`}>{t(`fields.${name}`)}</FieldLabel>
      <Input id={`pk-${name}`} inputMode={inputMode} {...form.register(name)} />
      <FieldError errors={[errors[name]]} />
    </Field>
  );
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {field('cartons')}
          {field('piecesPerCarton')}
          {field('grossKg', 'decimal')}
          {field('netKg', 'decimal')}
        </div>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">{t('cartonSize')}</legend>
          <div className="grid grid-cols-3 gap-2">
            {field('length')}
            {field('width')}
            {field('height')}
          </div>
          <FieldDescription>{t('cartonSizeHint')}</FieldDescription>
        </fieldset>
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? tc('saving') : t('savePacking')}
      </Button>
    </form>
  );
}

function PickupForm({ code, logistics: l }: { code: string; logistics: FactoryOrderLogistics }) {
  const t = useTranslations('logistics.factory');
  const tc = useTranslations('common');
  const today = useTodayIso();
  const book = useBookPickup(code);
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<BookPickupInput, unknown, BookPickupDto>({
    resolver: zodResolver(BookPickupSchema),
    defaultValues: { hubId: l.hubs[0]?.id ?? '', pickupDate: today ?? '', note: '' },
  });
  const { errors, isSubmitting } = form.formState;
  const hubId = useWatch({ control: form.control, name: 'hubId' });
  const hub = l.hubs.find((h) => h.id === hubId);
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await book.mutateAsync(dto);
      toast.success(t('pickupBooked'));
    } catch (error) {
      setFormError(
        applyServerErrors(error, form.setError, ['hubId', 'pickupDate'], tc('networkError')),
      );
    }
  });
  if (l.hubs.length === 0) return <p className="text-muted-foreground text-sm">{t('noHubs')}</p>;
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.hubId}>
            <FieldLabel htmlFor="pu-hub">{t('hub')}</FieldLabel>
            <Controller
              control={form.control}
              name="hubId"
              render={({ field }) => (
                <OptionSelect
                  id="pu-hub"
                  value={field.value}
                  onChange={field.onChange}
                  options={l.hubs.map((h) => ({ value: h.id, label: `${h.code} · ${h.name}` }))}
                />
              )}
            />
            <FieldError errors={[errors.hubId]} />
          </Field>
          <Field data-invalid={!!errors.pickupDate}>
            <FieldLabel htmlFor="pu-date">{t('date')}</FieldLabel>
            <Input
              id="pu-date"
              type="date"
              min={today ?? undefined}
              {...form.register('pickupDate')}
            />
            <FieldError errors={[errors.pickupDate]} />
          </Field>
        </div>
        {hub ? <HubAddressBlock hub={hub} /> : null}
        <Field>
          <FieldLabel htmlFor="pu-note">{t('note')}</FieldLabel>
          <Textarea id="pu-note" rows={2} maxLength={500} {...form.register('note')} />
          <FieldDescription>{t('noteHint')}</FieldDescription>
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? tc('saving') : t('book')}
      </Button>
    </form>
  );
}
