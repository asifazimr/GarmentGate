'use client';

import {
  type DutyRate,
  type DutyRateDto,
  DutyRateInputSchema,
  LOGISTICS_MODES,
  type LogisticsMarginRule,
  type LogisticsMarginRuleDto,
  LogisticsMarginRuleInputSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Landmark, Pencil, Percent, Trash2 } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FormAlert } from '@/features/auth/components/form-alert';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { ApiError } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { applyServerErrors } from '@/lib/form-errors';
import {
  useDeleteDutyRate,
  useDeleteMarginRule,
  useDutyRates,
  useMarginRules,
  useSaveDutyRate,
  useSaveMarginRule,
} from '../api';
import {
  amountToMinor,
  bpsToPercent,
  minorToAmount,
  OptionSelect,
  percentToBps,
} from './form-bits';
import { ActiveCheckbox, Footer, Toolbar } from './partners-hubs';

/** Rewrites shared-schema issues onto the fields people type in. */
function reportIssues(ctx: z.RefinementCtx, error: z.ZodError, rename: Record<string, string>) {
  for (const issue of error.issues)
    ctx.addIssue({
      code: 'custom',
      message: issue.message,
      path: issue.path.map((p) => (typeof p === 'string' ? (rename[p] ?? p) : p)),
    });
}

// ── Margins ─────────────────────────────────────────────────────────────────

const MarginFormSchema = z
  .object({
    name: z.string(),
    mode: z.string(),
    originCountry: z.string(),
    destinationCountry: z.string(),
    markup: z.string(),
    minMargin: z.string(),
    active: z.boolean(),
  })
  .transform((f, ctx): LogisticsMarginRuleDto => {
    const result = LogisticsMarginRuleInputSchema.safeParse({
      name: f.name,
      mode: f.mode,
      originCountry: f.originCountry,
      destinationCountry: f.destinationCountry,
      markupBps: percentToBps(f.markup),
      // Minimum margins are entered in the shipment's currency, with two decimals.
      minMarginMinor: amountToMinor(f.minMargin, 'USD', 0),
      active: f.active,
    });
    if (result.success) return result.data;
    reportIssues(ctx, result.error, { markupBps: 'markup', minMarginMinor: 'minMargin' });
    return z.NEVER;
  });
type MarginForm = z.input<typeof MarginFormSchema>;

export function MarginsTab() {
  const t = useTranslations('logistics.margins');
  const tm = useTranslations('logistics.modes');
  const format = useFormatter();
  const locale = useLocale();
  const rules = useMarginRules();
  const remove = useDeleteMarginRule();
  const [editing, setEditing] = useState<LogisticsMarginRule | 'new' | null>(null);
  const columns = useMemo<DataColumn<LogisticsMarginRule>[]>(
    () => [
      {
        id: 'name',
        header: t('columns.name'),
        value: (r) => r.name,
        cell: (r) => (
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{r.name}</span>
            {!r.active ? <Badge variant="neutral">{t('inactive')}</Badge> : null}
          </span>
        ),
      },
      { id: 'mode', header: t('columns.mode'), value: (r) => (r.mode ? tm(r.mode) : t('any')) },
      {
        id: 'route',
        header: t('columns.route'),
        value: (r) =>
          `${r.originCountry ? countryName(r.originCountry, locale) : t('any')} → ${
            r.destinationCountry ? countryName(r.destinationCountry, locale) : t('any')
          }`,
      },
      {
        id: 'markup',
        header: t('columns.markup'),
        value: (r) => r.markupBps,
        cell: (r) => (
          <span className="tabular">
            {format.number(r.markupBps / 10_000, { style: 'percent', maximumFractionDigits: 2 })}
            {r.minMarginMinor > 0 ? (
              <span className="text-muted-foreground block text-xs">
                {t('atLeast', { amount: minorToAmount(r.minMarginMinor, 'USD') })}
              </span>
            ) : null}
          </span>
        ),
        searchable: false,
        align: 'end',
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (r) => (
          <span className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={t('edit')}
              onClick={() => setEditing(r)}
            >
              <Pencil />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={t('delete')}
              disabled={remove.isPending}
              onClick={() =>
                remove.mutate(r.id, {
                  onSuccess: () => toast.success(t('deleted')),
                  onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
                })
              }
            >
              <Trash2 />
            </Button>
          </span>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, tm, format, locale, remove],
  );
  return (
    <div className="space-y-4">
      <Toolbar description={t('description')} add={t('add')} onAdd={() => setEditing('new')} />
      <DataTable
        data={rules.data}
        columns={columns}
        loading={rules.isPending}
        error={rules.isError}
        onRetry={() => void rules.refetch()}
        retrying={rules.isFetching}
        initialSort={{ id: 'name', desc: false }}
        csvName="logistics-margins"
        empty={{ icon: Percent, title: t('empty'), description: t('emptyBody') }}
      />
      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-lg">
          {editing !== null ? (
            <MarginForm
              key={editing === 'new' ? 'new' : editing.id}
              rule={editing === 'new' ? null : editing}
              onClose={() => setEditing(null)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function MarginForm({ rule, onClose }: { rule: LogisticsMarginRule | null; onClose: () => void }) {
  const t = useTranslations('logistics.margins');
  const tm = useTranslations('logistics.modes');
  const tc = useTranslations('common');
  const save = useSaveMarginRule();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<MarginForm, unknown, LogisticsMarginRuleDto>({
    resolver: zodResolver(MarginFormSchema),
    defaultValues: {
      name: rule?.name ?? '',
      mode: rule?.mode ?? '',
      originCountry: rule?.originCountry ?? '',
      destinationCountry: rule?.destinationCountry ?? '',
      markup: rule ? bpsToPercent(rule.markupBps) : '',
      minMargin: rule?.minMarginMinor ? minorToAmount(rule.minMarginMinor, 'USD') : '',
      active: rule?.active ?? true,
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await save.mutateAsync({ id: rule?.id ?? null, dto });
      toast.success(t('saved'));
      onClose();
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, ['name'], tc('networkError')));
    }
  });
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{rule ? t('editTitle') : t('newTitle')}</DialogTitle>
        <DialogDescription>{t('dialogDescription')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="lm-name">{t('fields.name')}</FieldLabel>
          <Input id="lm-name" {...form.register('name')} />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="lm-mode">{t('fields.mode')}</FieldLabel>
          <Controller
            control={form.control}
            name="mode"
            render={({ field }) => (
              <OptionSelect
                id="lm-mode"
                value={field.value}
                onChange={field.onChange}
                emptyLabel={t('any')}
                options={LOGISTICS_MODES.map((m) => ({ value: m, label: tm(m) }))}
              />
            )}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          {(['originCountry', 'destinationCountry'] as const).map((name) => (
            <Field key={name}>
              <FieldLabel htmlFor={`lm-${name}`}>{t(`fields.${name}`)}</FieldLabel>
              <Controller
                control={form.control}
                name={name}
                render={({ field }) => (
                  <CountrySelect
                    id={`lm-${name}`}
                    value={field.value || undefined}
                    onChange={field.onChange}
                    placeholder={t('any')}
                  />
                )}
              />
            </Field>
          ))}
          <Field data-invalid={!!errors.markup}>
            <FieldLabel htmlFor="lm-markup">{t('fields.markup')}</FieldLabel>
            <Input
              id="lm-markup"
              inputMode="decimal"
              placeholder="12"
              {...form.register('markup')}
            />
            <FieldError errors={[errors.markup]} />
          </Field>
          <Field data-invalid={!!errors.minMargin}>
            <FieldLabel htmlFor="lm-min">{t('fields.minMargin')}</FieldLabel>
            <Input
              id="lm-min"
              inputMode="decimal"
              placeholder="0.00"
              {...form.register('minMargin')}
            />
            <FieldDescription>{t('minMarginHint')}</FieldDescription>
            <FieldError errors={[errors.minMargin]} />
          </Field>
        </div>
        <Controller
          control={form.control}
          name="active"
          render={({ field }) => (
            <ActiveCheckbox
              id="lm-active"
              label={t('fields.active')}
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FieldGroup>
      <Footer onClose={onClose} pending={isSubmitting} save={t('save')} />
    </form>
  );
}

// ── Duty rates ──────────────────────────────────────────────────────────────

const DutyFormSchema = z
  .object({
    hsPrefix: z.string(),
    destinationCountry: z.string(),
    rate: z.string(),
    note: z.string(),
  })
  .transform((f, ctx): DutyRateDto => {
    const result = DutyRateInputSchema.safeParse({
      hsPrefix: f.hsPrefix,
      destinationCountry: f.destinationCountry,
      rateBps: percentToBps(f.rate),
      note: f.note,
    });
    if (result.success) return result.data;
    reportIssues(ctx, result.error, { rateBps: 'rate' });
    return z.NEVER;
  });
type DutyForm = z.input<typeof DutyFormSchema>;

export function DutyRatesTab() {
  const t = useTranslations('logistics.duties');
  const format = useFormatter();
  const locale = useLocale();
  const rates = useDutyRates();
  const remove = useDeleteDutyRate();
  const [editing, setEditing] = useState<DutyRate | 'new' | null>(null);
  const columns = useMemo<DataColumn<DutyRate>[]>(
    () => [
      {
        id: 'hs',
        header: t('columns.hs'),
        value: (r) => r.hsPrefix,
        className: 'font-mono text-xs',
      },
      {
        id: 'country',
        header: t('columns.country'),
        value: (r) => countryName(r.destinationCountry, locale),
      },
      {
        id: 'rate',
        header: t('columns.rate'),
        value: (r) => r.rateBps,
        cell: (r) =>
          format.number(r.rateBps / 10_000, { style: 'percent', maximumFractionDigits: 2 }),
        searchable: false,
        align: 'end',
        className: 'tabular',
      },
      { id: 'note', header: t('columns.note'), value: (r) => r.note ?? '', hideOnMobile: true },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (r) => (
          <span className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={t('edit')}
              onClick={() => setEditing(r)}
            >
              <Pencil />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={t('delete')}
              disabled={remove.isPending}
              onClick={() =>
                remove.mutate(r.id, {
                  onSuccess: () => toast.success(t('deleted')),
                  onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
                })
              }
            >
              <Trash2 />
            </Button>
          </span>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, format, locale, remove],
  );
  return (
    <div className="space-y-4">
      <Toolbar description={t('description')} add={t('add')} onAdd={() => setEditing('new')} />
      <DataTable
        data={rates.data}
        columns={columns}
        loading={rates.isPending}
        error={rates.isError}
        onRetry={() => void rates.refetch()}
        retrying={rates.isFetching}
        filters={[{ column: 'country', label: t('columns.country') }]}
        initialSort={{ id: 'hs', desc: false }}
        csvName="duty-rates"
        empty={{ icon: Landmark, title: t('empty'), description: t('emptyBody') }}
      />
      <Dialog open={editing !== null} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-md">
          {editing !== null ? (
            <DutyForm
              key={editing === 'new' ? 'new' : editing.id}
              rate={editing === 'new' ? null : editing}
              onClose={() => setEditing(null)}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DutyForm({ rate, onClose }: { rate: DutyRate | null; onClose: () => void }) {
  const t = useTranslations('logistics.duties');
  const tc = useTranslations('common');
  const save = useSaveDutyRate();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<DutyForm, unknown, DutyRateDto>({
    resolver: zodResolver(DutyFormSchema),
    defaultValues: {
      hsPrefix: rate?.hsPrefix ?? '',
      destinationCountry: rate?.destinationCountry ?? '',
      rate: rate ? bpsToPercent(rate.rateBps) : '',
      note: rate?.note ?? '',
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await save.mutateAsync({ id: rate?.id ?? null, dto });
      toast.success(t('saved'));
      onClose();
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, ['hsPrefix'], tc('networkError')));
    }
  });
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{rate ? t('editTitle') : t('newTitle')}</DialogTitle>
        <DialogDescription>{t('dialogDescription')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.hsPrefix}>
            <FieldLabel htmlFor="dr-hs">{t('fields.hs')}</FieldLabel>
            <Input
              id="dr-hs"
              inputMode="numeric"
              className="font-mono"
              placeholder="6109"
              {...form.register('hsPrefix')}
            />
            <FieldError errors={[errors.hsPrefix]} />
          </Field>
          <Field data-invalid={!!errors.rate}>
            <FieldLabel htmlFor="dr-rate">{t('fields.rate')}</FieldLabel>
            <Input id="dr-rate" inputMode="decimal" placeholder="12" {...form.register('rate')} />
            <FieldError errors={[errors.rate]} />
          </Field>
        </div>
        <Field data-invalid={!!errors.destinationCountry}>
          <FieldLabel htmlFor="dr-country">{t('fields.country')}</FieldLabel>
          <Controller
            control={form.control}
            name="destinationCountry"
            render={({ field }) => (
              <CountrySelect
                id="dr-country"
                value={field.value || undefined}
                onChange={field.onChange}
                placeholder={t('choose')}
                invalid={!!errors.destinationCountry}
              />
            )}
          />
          <FieldError errors={[errors.destinationCountry]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="dr-note">{t('fields.note')}</FieldLabel>
          <Input id="dr-note" {...form.register('note')} />
          <FieldDescription>{t('noteHint')}</FieldDescription>
        </Field>
      </FieldGroup>
      <Footer onClose={onClose} pending={isSubmitting} save={t('save')} />
    </form>
  );
}
