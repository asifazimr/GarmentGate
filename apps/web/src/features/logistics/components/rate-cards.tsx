'use client';

import {
  CONTAINER_TYPES,
  CurrencySchema,
  type FreightOption,
  type FreightQuoteRequest,
  type FreightQuoteRequestInput,
  FreightQuoteRequestSchema,
  LOGISTICS_MODES,
  LogisticsModeSchema,
  RATE_UNITS,
  type RateCard,
  type RateCardDto,
  RateCardInputSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator, Pencil, Plus, Receipt, Trash2 } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { ApiError } from '@/lib/api';
import { useTodayIso } from '@/lib/client-hooks';
import { applyServerErrors } from '@/lib/form-errors';
import { formatMoney } from '@/lib/format';
import {
  usePartners,
  useQuotePreview,
  useRateCards,
  useRetireRateCard,
  useSaveRateCard,
} from '../api';
import { amountToMinor, minorToAmount, OptionSelect } from './form-bits';

const route = (
  c: Pick<RateCard, 'originCountry' | 'originPort' | 'destinationCountry' | 'destinationPort'>,
) => `${c.originPort ?? c.originCountry} → ${c.destinationPort ?? c.destinationCountry}`;

/** Partner rate cards (what GarmentGate pays), and a preview of what a route would cost. */
export function RateCardsTab() {
  const t = useTranslations('logistics.rates');
  const tm = useTranslations('logistics.modes');
  const tu = useTranslations('logistics.units');
  const locale = useLocale();
  const cards = useRateCards();
  const retire = useRetireRateCard();
  const [editing, setEditing] = useState<RateCard | 'new' | null>(null);

  const columns = useMemo<DataColumn<RateCard>[]>(
    () => [
      {
        id: 'route',
        header: t('columns.route'),
        value: (c) => `${route(c)} ${c.partner.name}`,
        cell: (c) => (
          <span>
            <span className="font-mono text-xs font-medium">{route(c)}</span>
            <span className="text-muted-foreground block text-xs">{c.partner.name}</span>
          </span>
        ),
      },
      { id: 'mode', header: t('columns.mode'), value: (c) => tm(c.mode) },
      {
        id: 'cost',
        header: t('columns.cost'),
        value: (c) => c.costMinor,
        cell: (c) => (
          <span className="tabular">
            {formatMoney(c.costMinor, c.currency, locale)}
            <span className="text-muted-foreground">
              {' '}
              / {c.containerType ? tu(c.containerType) : tu(c.unit)}
            </span>
            {c.minChargeMinor > 0 ? (
              <span className="text-muted-foreground block text-xs">
                {t('min', { amount: formatMoney(c.minChargeMinor, c.currency, locale) })}
              </span>
            ) : null}
          </span>
        ),
        searchable: false,
        align: 'end',
      },
      {
        id: 'transit',
        header: t('columns.transit'),
        value: (c) => c.transitDaysMin,
        cell: (c) => t('days', { min: c.transitDaysMin, max: c.transitDaysMax }),
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'validity',
        header: t('columns.validity'),
        value: (c) => c.validTo,
        cell: (c) => `${c.validFrom} – ${c.validTo}`,
        searchable: false,
        hideOnMobile: true,
        className: 'tabular text-xs',
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (c) => (c.active ? t('active') : t('retired')),
        cell: (c) => (
          <Badge variant={c.active ? 'success' : 'neutral'}>
            {c.active ? t('active') : t('retired')}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (c) => (
          <span className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={t('edit')}
              onClick={() => setEditing(c)}
            >
              <Pencil />
            </Button>
            {c.active ? (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={t('retire')}
                disabled={retire.isPending}
                onClick={() =>
                  retire.mutate(c.id, {
                    onSuccess: () => toast.success(t('retiredToast')),
                    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
                  })
                }
              >
                <Trash2 />
              </Button>
            ) : null}
          </span>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, tm, tu, locale, retire],
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-muted-foreground max-w-2xl text-sm">{t('description')}</p>
        <Button onClick={() => setEditing('new')}>
          <Plus />
          {t('add')}
        </Button>
      </div>
      <DataTable
        data={cards.data}
        columns={columns}
        loading={cards.isPending}
        error={cards.isError}
        onRetry={() => void cards.refetch()}
        retrying={cards.isFetching}
        filters={[
          { column: 'mode', label: t('columns.mode') },
          { column: 'status', label: t('columns.status') },
        ]}
        initialSort={{ id: 'route', desc: false }}
        csvName="rate-cards"
        empty={{
          icon: Receipt,
          title: t('empty'),
          description: t('emptyBody'),
          action: (
            <Button onClick={() => setEditing('new')}>
              <Plus />
              {t('add')}
            </Button>
          ),
        }}
      />
      <QuotePreview />
      <RateCardDialog card={editing} onClose={() => setEditing(null)} />
    </div>
  );
}

// ── Rate card dialog ────────────────────────────────────────────────────────

/** Costs typed as amounts ("4.55"), stored in minor units of the card's currency. */
const RateCardFormSchema = z
  .object({
    partnerId: z.string(),
    mode: z.string(),
    originCountry: z.string(),
    originPort: z.string(),
    destinationCountry: z.string(),
    destinationPort: z.string(),
    unit: z.string(),
    containerType: z.string(),
    cost: z.string(),
    minCharge: z.string(),
    currency: CurrencySchema,
    transitDaysMin: z.union([z.string(), z.number()]),
    transitDaysMax: z.union([z.string(), z.number()]),
    validFrom: z.string(),
    validTo: z.string(),
    active: z.boolean(),
    notes: z.string(),
  })
  .transform((f, ctx): RateCardDto => {
    const { cost, minCharge, ...rest } = f;
    const result = RateCardInputSchema.safeParse({
      ...rest,
      costMinor: amountToMinor(cost, f.currency),
      minChargeMinor: amountToMinor(minCharge, f.currency, 0),
    });
    if (result.success) return result.data;
    const rename: Record<string, string> = { costMinor: 'cost', minChargeMinor: 'minCharge' };
    for (const issue of result.error.issues)
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path.map((p) => (typeof p === 'string' ? (rename[p] ?? p) : p)),
      });
    return z.NEVER;
  });
type RateCardForm = z.input<typeof RateCardFormSchema>;

function toForm(card: RateCard | null, today: string): RateCardForm {
  return card
    ? {
        partnerId: card.partner.id,
        mode: card.mode,
        originCountry: card.originCountry,
        originPort: card.originPort ?? '',
        destinationCountry: card.destinationCountry,
        destinationPort: card.destinationPort ?? '',
        unit: card.unit,
        containerType: card.containerType ?? '',
        cost: minorToAmount(card.costMinor, card.currency),
        minCharge: card.minChargeMinor ? minorToAmount(card.minChargeMinor, card.currency) : '',
        currency: card.currency,
        transitDaysMin: card.transitDaysMin,
        transitDaysMax: card.transitDaysMax,
        validFrom: card.validFrom,
        validTo: card.validTo,
        active: card.active,
        notes: card.notes ?? '',
      }
    : {
        partnerId: '',
        mode: 'SEA_LCL',
        originCountry: '',
        originPort: '',
        destinationCountry: '',
        destinationPort: '',
        unit: 'PER_CBM',
        containerType: '',
        cost: '',
        minCharge: '',
        currency: 'USD',
        transitDaysMin: '',
        transitDaysMax: '',
        validFrom: today,
        validTo: '',
        active: true,
        notes: '',
      };
}

function RateCardDialog({ card, onClose }: { card: RateCard | 'new' | null; onClose: () => void }) {
  const today = useTodayIso();
  return (
    <Dialog open={card !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
        {card !== null && today ? (
          <RateCardForm
            key={card === 'new' ? 'new' : card.id}
            card={card === 'new' ? null : card}
            today={today}
            onClose={onClose}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function RateCardForm({
  card,
  today,
  onClose,
}: {
  card: RateCard | null;
  today: string;
  onClose: () => void;
}) {
  const t = useTranslations('logistics.rates');
  const tm = useTranslations('logistics.modes');
  const tu = useTranslations('logistics.units');
  const tc = useTranslations('common');
  const partners = usePartners();
  const save = useSaveRateCard();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<RateCardForm, unknown, RateCardDto>({
    resolver: zodResolver(RateCardFormSchema),
    defaultValues: toForm(card, today),
  });
  const { errors, isSubmitting } = form.formState;
  const unit = useWatch({ control: form.control, name: 'unit' });

  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await save.mutateAsync({ id: card?.id ?? null, dto });
      toast.success(t('saved'));
      onClose();
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, [], tc('networkError')));
    }
  });

  const select = (
    name: 'partnerId' | 'mode' | 'unit' | 'containerType' | 'currency',
    options: { value: string; label: string }[],
    emptyLabel?: string,
  ) => (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <OptionSelect
          id={`rc-${name}`}
          value={field.value}
          onChange={field.onChange}
          options={options}
          emptyLabel={emptyLabel}
          placeholder={t('choose')}
          invalid={!!errors[name]}
        />
      )}
    />
  );
  const country = (name: 'originCountry' | 'destinationCountry') => (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <CountrySelect
          id={`rc-${name}`}
          value={field.value || undefined}
          onChange={field.onChange}
          placeholder={t('choose')}
          invalid={!!errors[name]}
        />
      )}
    />
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{card ? t('editTitle') : t('newTitle')}</DialogTitle>
        <DialogDescription>{t('dialogDescription')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.partnerId}>
            <FieldLabel htmlFor="rc-partnerId">{t('fields.partner')}</FieldLabel>
            {select(
              'partnerId',
              (partners.data ?? [])
                .filter((p) => p.active || p.id === card?.partner.id)
                .map((p) => ({
                  value: p.id,
                  label: `${p.code} · ${p.name}`,
                })),
            )}
            <FieldError errors={[errors.partnerId]} />
          </Field>
          <Field data-invalid={!!errors.mode}>
            <FieldLabel htmlFor="rc-mode">{t('fields.mode')}</FieldLabel>
            {select(
              'mode',
              LOGISTICS_MODES.map((m) => ({ value: m, label: tm(m) })),
            )}
          </Field>
          <Field data-invalid={!!errors.originCountry}>
            <FieldLabel htmlFor="rc-originCountry">{t('fields.origin')}</FieldLabel>
            {country('originCountry')}
            <FieldError errors={[errors.originCountry]} />
          </Field>
          <Field data-invalid={!!errors.originPort}>
            <FieldLabel htmlFor="rc-originPort">{t('fields.originPort')}</FieldLabel>
            <Input
              id="rc-originPort"
              placeholder="BDCGP"
              className="font-mono uppercase"
              {...form.register('originPort')}
            />
            <FieldError errors={[errors.originPort]} />
          </Field>
          <Field data-invalid={!!errors.destinationCountry}>
            <FieldLabel htmlFor="rc-destinationCountry">{t('fields.destination')}</FieldLabel>
            {country('destinationCountry')}
            <FieldError errors={[errors.destinationCountry]} />
          </Field>
          <Field data-invalid={!!errors.destinationPort}>
            <FieldLabel htmlFor="rc-destinationPort">{t('fields.destinationPort')}</FieldLabel>
            <Input
              id="rc-destinationPort"
              placeholder="DEHAM"
              className="font-mono uppercase"
              {...form.register('destinationPort')}
            />
            <FieldError errors={[errors.destinationPort]} />
          </Field>
          <Field data-invalid={!!errors.unit}>
            <FieldLabel htmlFor="rc-unit">{t('fields.unit')}</FieldLabel>
            {select(
              'unit',
              RATE_UNITS.map((u) => ({ value: u, label: tu(u) })),
            )}
          </Field>
          {unit === 'PER_CONTAINER' ? (
            <Field data-invalid={!!errors.containerType}>
              <FieldLabel htmlFor="rc-containerType">{t('fields.container')}</FieldLabel>
              {select(
                'containerType',
                CONTAINER_TYPES.map((c) => ({ value: c, label: tu(c) })),
              )}
              <FieldError errors={[errors.containerType]} />
            </Field>
          ) : (
            <div className="hidden sm:block" />
          )}
          <div className="grid grid-cols-[minmax(0,1fr)_6.5rem] gap-2">
            <Field data-invalid={!!errors.cost}>
              <FieldLabel htmlFor="rc-cost">{t('fields.cost')}</FieldLabel>
              <Input
                id="rc-cost"
                inputMode="decimal"
                placeholder="4.55"
                {...form.register('cost')}
              />
              <FieldError errors={[errors.cost]} />
            </Field>
            <Field>
              <FieldLabel htmlFor="rc-currency">{t('fields.currency')}</FieldLabel>
              {select(
                'currency',
                CurrencySchema.options.map((c) => ({ value: c, label: c })),
              )}
            </Field>
          </div>
          <Field data-invalid={!!errors.minCharge}>
            <FieldLabel htmlFor="rc-minCharge">{t('fields.minCharge')}</FieldLabel>
            <Input
              id="rc-minCharge"
              inputMode="decimal"
              placeholder="0.00"
              {...form.register('minCharge')}
            />
            <FieldError errors={[errors.minCharge]} />
          </Field>
          <div className="grid grid-cols-2 gap-2">
            <Field data-invalid={!!errors.transitDaysMin}>
              <FieldLabel htmlFor="rc-tmin">{t('fields.transitMin')}</FieldLabel>
              <Input id="rc-tmin" inputMode="numeric" {...form.register('transitDaysMin')} />
              <FieldError errors={[errors.transitDaysMin]} />
            </Field>
            <Field data-invalid={!!errors.transitDaysMax}>
              <FieldLabel htmlFor="rc-tmax">{t('fields.transitMax')}</FieldLabel>
              <Input id="rc-tmax" inputMode="numeric" {...form.register('transitDaysMax')} />
              <FieldError errors={[errors.transitDaysMax]} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field data-invalid={!!errors.validFrom}>
              <FieldLabel htmlFor="rc-from">{t('fields.validFrom')}</FieldLabel>
              <Input id="rc-from" type="date" {...form.register('validFrom')} />
              <FieldError errors={[errors.validFrom]} />
            </Field>
            <Field data-invalid={!!errors.validTo}>
              <FieldLabel htmlFor="rc-to">{t('fields.validTo')}</FieldLabel>
              <Input id="rc-to" type="date" {...form.register('validTo')} />
              <FieldError errors={[errors.validTo]} />
            </Field>
          </div>
        </div>
        <Field>
          <FieldLabel htmlFor="rc-notes">{t('fields.notes')}</FieldLabel>
          <Textarea id="rc-notes" rows={2} {...form.register('notes')} />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          {tc('cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? tc('saving') : t('save')}
        </Button>
      </DialogFooter>
    </form>
  );
}

// ── Quote preview ───────────────────────────────────────────────────────────

/** Weight in kg and volume in CBM for people; grams and litres for the API. */
const PreviewFormSchema = z
  .object({
    mode: LogisticsModeSchema,
    originCountry: z.string(),
    destinationCountry: z.string(),
    destinationPort: z.string(),
    weightKg: z.string(),
    volumeCbm: z.string(),
    goodsValue: z.string(),
    currency: CurrencySchema,
    shipDate: z.string(),
  })
  .transform((f, ctx): FreightQuoteRequest => {
    const num = (v: string) => (v.trim() === '' ? Number.NaN : Number(v.replace(',', '.')));
    const request: FreightQuoteRequestInput = {
      mode: f.mode,
      originCountry: f.originCountry,
      destinationCountry: f.destinationCountry,
      destinationPort: f.destinationPort,
      weightGrams: Math.round(num(f.weightKg) * 1000),
      volumeLitres: f.volumeCbm.trim() === '' ? 0 : Math.round(num(f.volumeCbm) * 1000),
      goodsValueMinor: amountToMinor(f.goodsValue, f.currency, 0),
      currency: f.currency,
      shipDate: f.shipDate,
    };
    const result = FreightQuoteRequestSchema.safeParse(request);
    if (result.success) return result.data;
    const rename: Record<string, string> = {
      weightGrams: 'weightKg',
      volumeLitres: 'volumeCbm',
      goodsValueMinor: 'goodsValue',
    };
    for (const issue of result.error.issues)
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path.map((p) => (typeof p === 'string' ? (rename[p] ?? p) : p)),
      });
    return z.NEVER;
  });
type PreviewForm = z.input<typeof PreviewFormSchema>;

function QuotePreview() {
  const t = useTranslations('logistics.preview');
  const tm = useTranslations('logistics.modes');
  const locale = useLocale();
  const today = useTodayIso();
  const preview = useQuotePreview();
  const [options, setOptions] = useState<FreightOption[] | null>(null);
  const form = useForm<PreviewForm, unknown, FreightQuoteRequest>({
    resolver: zodResolver(PreviewFormSchema),
    defaultValues: {
      mode: 'SEA_LCL',
      originCountry: 'BD',
      destinationCountry: '',
      destinationPort: '',
      weightKg: '',
      volumeCbm: '',
      goodsValue: '',
      currency: 'USD',
      shipDate: today ?? '',
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    try {
      setOptions(await preview.mutateAsync(dto));
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : t('failed'));
    }
  });
  const money = (minor: number, currency: string) => formatMoney(minor, currency, locale);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="size-4" aria-hidden="true" />
          {t('title')}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field>
            <FieldLabel htmlFor="qp-mode">{t('mode')}</FieldLabel>
            <Controller
              control={form.control}
              name="mode"
              render={({ field }) => (
                <OptionSelect
                  id="qp-mode"
                  value={field.value}
                  onChange={field.onChange}
                  options={LOGISTICS_MODES.map((m) => ({ value: m, label: tm(m) }))}
                />
              )}
            />
          </Field>
          {(['originCountry', 'destinationCountry'] as const).map((name) => (
            <Field key={name} data-invalid={!!errors[name]}>
              <FieldLabel htmlFor={`qp-${name}`}>{t(name)}</FieldLabel>
              <Controller
                control={form.control}
                name={name}
                render={({ field }) => (
                  <CountrySelect
                    id={`qp-${name}`}
                    value={field.value || undefined}
                    onChange={field.onChange}
                    placeholder={t('choose')}
                    invalid={!!errors[name]}
                  />
                )}
              />
              <FieldError errors={[errors[name]]} />
            </Field>
          ))}
          <Field data-invalid={!!errors.destinationPort}>
            <FieldLabel htmlFor="qp-port">{t('destinationPort')}</FieldLabel>
            <Input
              id="qp-port"
              className="font-mono uppercase"
              placeholder="DEHAM"
              {...form.register('destinationPort')}
            />
            <FieldError errors={[errors.destinationPort]} />
          </Field>
          <Field data-invalid={!!errors.weightKg}>
            <FieldLabel htmlFor="qp-kg">{t('weight')}</FieldLabel>
            <Input id="qp-kg" inputMode="decimal" {...form.register('weightKg')} />
            <FieldError errors={[errors.weightKg]} />
          </Field>
          <Field data-invalid={!!errors.volumeCbm}>
            <FieldLabel htmlFor="qp-cbm">{t('volume')}</FieldLabel>
            <Input id="qp-cbm" inputMode="decimal" {...form.register('volumeCbm')} />
            <FieldError errors={[errors.volumeCbm]} />
          </Field>
          <Field data-invalid={!!errors.goodsValue}>
            <FieldLabel htmlFor="qp-goods">{t('goodsValue')}</FieldLabel>
            <Input id="qp-goods" inputMode="decimal" {...form.register('goodsValue')} />
            <FieldError errors={[errors.goodsValue]} />
          </Field>
          <Field data-invalid={!!errors.shipDate}>
            <FieldLabel htmlFor="qp-date">{t('shipDate')}</FieldLabel>
            <Input id="qp-date" type="date" {...form.register('shipDate')} />
            <FieldError errors={[errors.shipDate]} />
          </Field>
          <div className="sm:col-span-2 lg:col-span-4">
            <Button type="submit" variant="outline" disabled={isSubmitting}>
              <Calculator />
              {t('submit')}
            </Button>
          </div>
        </form>
        {options === null ? null : options.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('none')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-muted-foreground text-start text-xs">
                <tr className="border-b">
                  <th className="py-2 text-start font-medium">{t('partner')}</th>
                  <th className="py-2 text-end font-medium">{t('cost')}</th>
                  <th className="py-2 text-end font-medium">{t('price')}</th>
                  <th className="py-2 text-end font-medium">{t('insurance')}</th>
                  <th className="py-2 text-end font-medium">{t('transit')}</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {options.map((o) => (
                  <tr key={`${o.provider}-${o.rateCardId ?? ''}`}>
                    <td className="py-2">
                      {o.partner?.name ?? o.provider}
                      <span className="text-muted-foreground block text-xs">
                        {o.marginRule ?? t('noMargin')}
                      </span>
                    </td>
                    <td className="tabular py-2 text-end">
                      {money(o.partnerCostMinor, o.currency)}
                    </td>
                    <td className="tabular py-2 text-end font-medium">
                      {money(o.freightPriceMinor, o.currency)}
                      <span className="text-success-ink block text-xs">
                        +{money(o.freightPriceMinor - o.partnerCostMinor, o.currency)}
                      </span>
                    </td>
                    <td className="tabular py-2 text-end">
                      {money(o.insurancePremiumMinor, o.currency)}
                    </td>
                    <td className="tabular py-2 text-end">
                      {t('days', { min: o.transitDaysMin, max: o.transitDaysMax })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
