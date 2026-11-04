'use client';

import {
  type AdminBooking,
  BookingReasonSchema,
  type CapacityBookingSettings,
  type CapacityBookingSettingsDto,
  CapacityBookingSettingsSchema,
  type CapacityBookingStatus,
  dateOnly,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ban, CalendarClock, Plus, Trash2, Wallet } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
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
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { applyServerErrors } from '@/lib/form-errors';
import { formatMoney } from '@/lib/format';
import {
  useAdminBookingAction,
  useAdminBookings,
  useBookingSettings,
  useSaveBookingSettings,
} from '../api';

const TABS = [
  'ALL',
  'HELD',
  'CONFIRMED',
  'IN_PRODUCTION',
  'CANCELLED',
  'EXPIRED',
] as const satisfies readonly (CapacityBookingStatus | 'ALL')[];

export function AdminCapacity() {
  const t = useTranslations('capacityBooking.admin');
  return (
    <div className="space-y-8">
      <PageHeader title={t('title')} description={t('description')} />
      <SettingsCard />
      <BookingsTable />
    </div>
  );
}

// ── Settings ────────────────────────────────────────────────────────────────

/** Percentages in the form, basis points in the API. */
const Percent = z.union([z.string(), z.number()]);
const SettingsFormSchema = z
  .object({
    bookingFee: Percent,
    deposit: Percent,
    factoryShare: Percent,
    holdHours: z.union([z.string(), z.number()]),
    reminderHours: z.union([z.string(), z.number()]),
    convertLeadDays: z.union([z.string(), z.number()]),
    tiers: z.array(z.object({ days: z.union([z.string(), z.number()]), refund: Percent })),
  })
  .transform((v, ctx): CapacityBookingSettingsDto => {
    const bps = (p: string | number) => Math.round(Number(String(p).replace(',', '.')) * 100);
    const result = CapacityBookingSettingsSchema.safeParse({
      bookingFeeBps: bps(v.bookingFee),
      depositBps: bps(v.deposit),
      factoryShareBps: bps(v.factoryShare),
      holdHours: v.holdHours,
      reminderHours: v.reminderHours,
      convertLeadDays: v.convertLeadDays,
      cancellationTiers: v.tiers.map((tier) => ({
        minDaysBefore: tier.days,
        refundBps: bps(tier.refund),
      })),
    });
    if (result.success) return result.data;
    const rename: Record<string, string> = {
      bookingFeeBps: 'bookingFee',
      depositBps: 'deposit',
      factoryShareBps: 'factoryShare',
      cancellationTiers: 'tiers',
      minDaysBefore: 'days',
      refundBps: 'refund',
    };
    for (const issue of result.error.issues)
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path.map((p) => (typeof p === 'string' ? (rename[p] ?? p) : p)),
      });
    return z.NEVER;
  });
type SettingsForm = z.input<typeof SettingsFormSchema>;

const toForm = (s: CapacityBookingSettings): SettingsForm => ({
  bookingFee: s.bookingFeeBps / 100,
  deposit: s.depositBps / 100,
  factoryShare: s.factoryShareBps / 100,
  holdHours: s.holdHours,
  reminderHours: s.reminderHours,
  convertLeadDays: s.convertLeadDays,
  tiers: s.cancellationTiers.map((tier) => ({
    days: tier.minDaysBefore,
    refund: tier.refundBps / 100,
  })),
});

function SettingsCard() {
  const t = useTranslations('capacityBooking.admin');
  const settings = useBookingSettings();
  if (settings.isPending) return <Skeleton className="h-80 rounded-xl" />;
  if (settings.isError)
    return <ErrorState onRetry={() => void settings.refetch()} retrying={settings.isFetching} />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings')}</CardTitle>
        <CardDescription>{t('settingsHint')}</CardDescription>
      </CardHeader>
      <CardContent>
        <SettingsFormView initial={settings.data} />
      </CardContent>
    </Card>
  );
}

function SettingsFormView({ initial }: { initial: CapacityBookingSettings }) {
  const t = useTranslations('capacityBooking.admin');
  const tc = useTranslations('common');
  const save = useSaveBookingSettings();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<SettingsForm, unknown, CapacityBookingSettingsDto>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: toForm(initial),
  });
  const tiers = useFieldArray({ control: form.control, name: 'tiers' });
  const { errors, isSubmitting, isDirty } = form.formState;

  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      const saved = await save.mutateAsync(dto);
      form.reset(toForm(saved));
      toast.success(t('saved'));
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, [], tc('networkError')));
    }
  });

  const number = (
    name:
      'bookingFee' | 'deposit' | 'factoryShare' | 'holdHours' | 'reminderHours' | 'convertLeadDays',
    hint?: string,
  ) => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`cs-${name}`}>{t(`fields.${name}`)}</FieldLabel>
      <Input id={`cs-${name}`} inputMode="decimal" {...form.register(name)} />
      {hint ? <FieldDescription>{hint}</FieldDescription> : null}
      <FieldError errors={[errors[name]]} />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <FormAlert message={formError} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {number('bookingFee', t('hints.bookingFee'))}
        {number('deposit', t('hints.deposit'))}
        {number('factoryShare', t('hints.factoryShare'))}
        {number('holdHours')}
        {number('reminderHours')}
        {number('convertLeadDays')}
      </div>
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">{t('tiers')}</legend>
        <p className="text-muted-foreground text-xs">{t('tiersHint')}</p>
        <ul className="space-y-2">
          {tiers.fields.map((field, i) => (
            <li key={field.id} className="flex flex-wrap items-end gap-2">
              <Field className="w-36">
                <FieldLabel htmlFor={`tier-days-${String(i)}`}>{t('tierDays')}</FieldLabel>
                <Input
                  id={`tier-days-${String(i)}`}
                  inputMode="numeric"
                  {...form.register(`tiers.${i}.days`)}
                />
              </Field>
              <Field className="w-36">
                <FieldLabel htmlFor={`tier-refund-${String(i)}`}>{t('tierRefund')}</FieldLabel>
                <Input
                  id={`tier-refund-${String(i)}`}
                  inputMode="decimal"
                  {...form.register(`tiers.${i}.refund`)}
                />
              </Field>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t('removeTier')}
                disabled={tiers.fields.length === 1}
                onClick={() => tiers.remove(i)}
              >
                <Trash2 />
              </Button>
              <FieldError
                className="basis-full"
                errors={[errors.tiers?.[i]?.days, errors.tiers?.[i]?.refund]}
              />
            </li>
          ))}
        </ul>
        <FieldError errors={[errors.tiers?.root, errors.tiers]} />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={tiers.fields.length >= 6}
          onClick={() => tiers.append({ days: '', refund: '' })}
        >
          <Plus />
          {t('addTier')}
        </Button>
      </fieldset>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? tc('saving') : t('save')}
        </Button>
      </div>
    </form>
  );
}

// ── Bookings ────────────────────────────────────────────────────────────────

function BookingsTable() {
  const t = useTranslations('capacityBooking.admin');
  const format = useFormatter();
  const locale = useLocale();
  const [tab, setTab] = useState<(typeof TABS)[number]>('ALL');
  const [cancelling, setCancelling] = useState<string | null>(null);
  const bookings = useAdminBookings(tab);
  const action = useAdminBookingAction();

  const columns = useMemo<DataColumn<AdminBooking>[]>(
    () => [
      {
        id: 'code',
        header: t('columns.code'),
        value: (b) => b.code,
        cell: (b) => (
          <span>
            <Badge variant="code">{b.code}</Badge>
            {b.partnershipCode ? (
              <span className="text-muted-foreground block text-xs">{b.partnershipCode}</span>
            ) : null}
          </span>
        ),
      },
      {
        id: 'buyer',
        header: t('columns.buyer'),
        value: (b) => `${b.buyer.code} ${b.buyer.name}`,
        cell: (b) => (
          <span>
            <span className="font-mono text-xs">{b.buyer.code}</span>
            <span className="text-muted-foreground block text-xs">{b.buyer.name}</span>
          </span>
        ),
      },
      {
        id: 'factory',
        header: t('columns.factory'),
        value: (b) => `${b.manufacturer.code} ${b.manufacturer.name} ${b.line.code}`,
        cell: (b) => (
          <span>
            <span className="font-mono text-xs">{b.manufacturer.code}</span>
            <span className="text-muted-foreground block text-xs">
              {b.manufacturer.name} · {b.line.code}
            </span>
          </span>
        ),
        hideOnMobile: true,
      },
      {
        id: 'dates',
        header: t('columns.dates'),
        value: (b) => b.startDate,
        cell: (b) =>
          format.dateTimeRange(dateOnly(b.startDate), dateOnly(b.endDate), {
            day: 'numeric',
            month: 'short',
            timeZone: 'UTC',
          }),
        searchable: false,
      },
      {
        id: 'minutes',
        header: t('columns.minutes'),
        value: (b) => b.minutes,
        cell: (b) => format.number(b.minutes),
        searchable: false,
        align: 'end',
        hideOnMobile: true,
      },
      {
        id: 'money',
        header: t('columns.money'),
        value: (b) => b.buyerAmountMinor,
        cell: (b) => (
          <span className="tabular text-xs">
            {formatMoney(b.buyerAmountMinor, b.currency, locale)}
            <span className="text-muted-foreground block">
              {t('factoryGets', { amount: formatMoney(b.factoryAmountMinor, b.currency, locale) })}
            </span>
            <span className="text-muted-foreground block">
              {t('depositPaid', {
                paid: formatMoney(b.depositPaidMinor, b.currency, locale),
                due: formatMoney(b.depositMinor, b.currency, locale),
              })}
            </span>
          </span>
        ),
        searchable: false,
        align: 'end',
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (b) => b.status,
        cell: (b) => (
          <span title={b.cancelReason ?? undefined}>
            <StatusBadge domain="booking" status={b.status} />
            {b.status === 'HELD' && !b.factoryAccepted ? (
              <span className="text-muted-foreground block text-xs">{t('awaitingFactory')}</span>
            ) : null}
          </span>
        ),
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (b) => (
          <span className="flex justify-end gap-1.5">
            {b.compensationMinor && !b.compensationPaid ? (
              <Button
                size="xs"
                variant="outline"
                disabled={action.isPending}
                onClick={() =>
                  action.mutate(
                    { code: b.code, action: 'compensation' },
                    {
                      onSuccess: () => toast.success(t('compensationPaid')),
                      onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
                    },
                  )
                }
              >
                <Wallet />
                {t('payFactory', { amount: formatMoney(b.compensationMinor, b.currency, locale) })}
              </Button>
            ) : null}
            {(b.status === 'HELD' || b.status === 'CONFIRMED') && !b.orderCode ? (
              <Button
                size="xs"
                variant="ghost"
                className="text-danger-ink"
                onClick={() => setCancelling(b.code)}
              >
                <Ban />
                {t('cancel')}
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
    [t, format, locale, action],
  );

  return (
    <section className="space-y-4">
      <h2 className="font-semibold">{t('bookings')}</h2>
      <Tabs
        value={tab}
        onValueChange={(v) => {
          const next = TABS.find((x) => x === v);
          if (next) setTab(next);
        }}
      >
        <TabsList>
          {TABS.map((x) => (
            <TabsTrigger key={x} value={x}>
              {t(`tabs.${x}`)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <DataTable
        key={tab}
        data={bookings.data}
        columns={columns}
        loading={bookings.isPending}
        error={bookings.isError}
        onRetry={() => void bookings.refetch()}
        retrying={bookings.isFetching}
        initialSort={{ id: 'dates', desc: false }}
        csvName={`capacity-bookings-${tab.toLowerCase()}`}
        empty={{ icon: CalendarClock, title: t('empty'), description: t('emptyBody') }}
      />
      <CancelDialog code={cancelling} onClose={() => setCancelling(null)} />
    </section>
  );
}

function CancelDialog({ code, onClose }: { code: string | null; onClose: () => void }) {
  const t = useTranslations('capacityBooking.admin');
  const tc = useTranslations('common');
  const action = useAdminBookingAction();
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const close = () => {
    setReason('');
    setError(null);
    onClose();
  };
  const submit = async () => {
    if (!code) return;
    const parsed = BookingReasonSchema.safeParse({ reason });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? null);
      return;
    }
    try {
      await action.mutateAsync({ code, action: 'cancel', reason: parsed.data.reason });
      toast.success(t('cancelled'));
      close();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : tc('networkError'));
    }
  };
  return (
    <Dialog open={code !== null} onOpenChange={(o) => !o && close()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('cancelTitle', { code: code ?? '' })}</DialogTitle>
          <DialogDescription>{t('cancelBody')}</DialogDescription>
        </DialogHeader>
        <Field data-invalid={!!error}>
          <FieldLabel htmlFor="ab-reason">{t('reason')}</FieldLabel>
          <Textarea
            id="ab-reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <FieldError>{error}</FieldError>
        </Field>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            {tc('cancel')}
          </Button>
          <Button variant="destructive" disabled={action.isPending} onClick={() => void submit()}>
            {t('cancel')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
