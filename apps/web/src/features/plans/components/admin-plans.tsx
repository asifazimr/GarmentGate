'use client';

import {
  type AdminSubscription,
  type GrantPlanDto,
  type GrantPlanInput,
  GrantPlanSchema,
  type PlanSettings,
  PlanSettingsSchema,
  PlanTierSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Gift, Sparkles } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatCard } from '@/components/patterns/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { OptionSelect } from '@/features/logistics/components/form-bits';
import { countryName } from '@/lib/countries';
import { formatMoney } from '@/lib/format';
import { applyServerErrors } from '@/lib/form-errors';
import { useAdminPlans, useGrantPlan, usePlanSettings, useSavePlanSettings } from '../api';
import { AdminPlusTab } from './admin-plus';

const STATUS_TONE = {
  ACTIVE: 'success',
  PAST_DUE: 'warning',
  CANCELED: 'neutral',
  INCOMPLETE: 'neutral',
} as const;

/** Staff: who's on which plan, recurring revenue, grants and the plan terms. */
export function AdminPlansPage() {
  const t = useTranslations('plans.admin');
  const tt = useTranslations('plans.tiers');
  const tp = useTranslations('plans.plus');
  const format = useFormatter();
  const locale = useLocale();
  const plans = useAdminPlans();
  const [granting, setGranting] = useState(false);
  const columns = useMemo<DataColumn<AdminSubscription>[]>(
    () => [
      {
        id: 'account',
        header: t('cols.account'),
        value: (s) => `${s.account.code} ${s.account.name}`,
        cell: (s) => (
          <div className="min-w-0">
            <Badge variant="code">{s.account.code}</Badge>
            <p className="text-muted-foreground truncate text-xs">
              {s.account.name} · {countryName(s.account.country, locale)}
            </p>
          </div>
        ),
      },
      {
        id: 'tier',
        header: t('cols.tier'),
        value: (s) => (s.tier === 'PLUS' ? tp('name') : tt(s.tier)),
      },
      {
        id: 'source',
        header: t('cols.source'),
        value: (s) =>
          s.source === 'STRIPE' && s.interval
            ? t(`source.STRIPE_${s.interval}`)
            : t('source.MANUAL'),
        hideOnMobile: true,
      },
      {
        id: 'status',
        header: t('cols.status'),
        value: (s) => s.status,
        cell: (s) => (
          <span className="flex flex-wrap gap-1">
            <Badge variant={STATUS_TONE[s.status]}>{t(`status.${s.status}`)}</Badge>
            {s.cancelAtPeriodEnd ? <Badge variant="neutral">{t('ending')}</Badge> : null}
          </span>
        ),
      },
      {
        id: 'until',
        header: t('cols.until'),
        value: (s) => s.currentPeriodEnd ?? '',
        cell: (s) =>
          s.currentPeriodEnd
            ? format.dateTime(new Date(s.currentPeriodEnd), { dateStyle: 'medium' })
            : '—',
        sortable: true,
        hideOnMobile: true,
      },
      {
        id: 'price',
        header: t('cols.price'),
        value: (s) => s.amountUsdMinor / 100,
        cell: (s) => formatMoney(s.amountUsdMinor, 'USD', locale),
        align: 'end',
        sortable: true,
        hideOnMobile: true,
      },
      {
        id: 'paid',
        header: t('cols.paid'),
        value: (s) => s.paidUsdMinor / 100,
        cell: (s) => formatMoney(s.paidUsdMinor, 'USD', locale),
        align: 'end',
        sortable: true,
      },
      { id: 'note', header: t('cols.note'), value: (s) => s.note ?? '', hideOnMobile: true },
    ],
    [t, tt, tp, format, locale],
  );
  const grant = (
    <Button onClick={() => setGranting(true)}>
      <Gift />
      {t('grant')}
    </Button>
  );
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} actions={grant} />
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {PlanTierSchema.options.map((tier) => (
          <StatCard
            key={tier}
            label={tt(tier)}
            loading={plans.isPending}
            value={format.number(plans.data?.counts[tier] ?? 0)}
          />
        ))}
        <StatCard
          label={tp('name')}
          loading={plans.isPending}
          value={format.number(plans.data?.counts.PLUS ?? 0)}
        />
        <StatCard
          label={t('mrr')}
          loading={plans.isPending}
          value={formatMoney(plans.data?.mrrUsdMinor ?? 0, 'USD', locale)}
        />
      </div>
      <Tabs defaultValue="subscriptions">
        <TabsList>
          <TabsTrigger value="subscriptions">{t('tabs.subscriptions')}</TabsTrigger>
          <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
          <TabsTrigger value="plus">{t('tabs.plus')}</TabsTrigger>
        </TabsList>
        <TabsContent value="subscriptions" className="pt-4">
          <DataTable
            data={plans.data?.subscriptions ?? []}
            columns={columns}
            loading={plans.isPending}
            error={plans.isError}
            onRetry={() => void plans.refetch()}
            retrying={plans.isFetching}
            csvName="factory-plans"
            empty={{
              icon: Sparkles,
              title: t('empty'),
              description: t('emptyBody'),
              action: grant,
            }}
          />
        </TabsContent>
        <TabsContent value="settings" className="pt-4">
          <PlanTermsCard />
        </TabsContent>
        <TabsContent value="plus" className="pt-4">
          <AdminPlusTab />
        </TabsContent>
      </Tabs>
      {granting ? <GrantDialog onClose={() => setGranting(false)} /> : null}
    </div>
  );
}

function GrantDialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations('plans.admin');
  const tt = useTranslations('plans.tiers');
  const tc = useTranslations('common');
  const grant = useGrantPlan();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const form = useForm<GrantPlanInput, unknown, GrantPlanDto>({
    resolver: zodResolver(GrantPlanSchema),
    defaultValues: { tier: 'PRO', endsOn: '', bankReference: '', note: '' },
  });
  const { errors, isSubmitting } = form.formState;
  const validCode = /^MFR-[A-Z]{2}-\d{4}$/.test(code.trim());
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('grantTitle')}</DialogTitle>
          <DialogDescription>{t('grantBody')}</DialogDescription>
        </DialogHeader>
        <form
          noValidate
          className="grid gap-5"
          onSubmit={(e) =>
            void form.handleSubmit(async (dto) => {
              setError(null);
              try {
                await grant.mutateAsync({ code: code.trim(), dto });
                toast.success(t('granted', { code: code.trim(), tier: tt(dto.tier) }));
                onClose();
              } catch (err) {
                setError(
                  applyServerErrors(
                    err,
                    form.setError,
                    ['tier', 'endsOn', 'paidUsdMinor', 'bankReference', 'note'],
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
                <FieldLabel htmlFor="gp-code">{t('factoryCode')}</FieldLabel>
                <Input
                  id="gp-code"
                  placeholder="MFR-BD-0421"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="gp-tier">{t('cols.tier')}</FieldLabel>
                <Controller
                  control={form.control}
                  name="tier"
                  render={({ field }) => (
                    <OptionSelect
                      id="gp-tier"
                      value={field.value}
                      onChange={(v) => field.onChange(PlanTierSchema.parse(v))}
                      options={PlanTierSchema.options.map((v) => ({ value: v, label: tt(v) }))}
                    />
                  )}
                />
              </Field>
            </div>
            <Field data-invalid={!!errors.endsOn}>
              <FieldLabel htmlFor="gp-ends">{t('endsOn')}</FieldLabel>
              <Input id="gp-ends" type="date" {...form.register('endsOn')} />
              <FieldDescription>{t('endsOnHint')}</FieldDescription>
              <FieldError errors={[errors.endsOn]} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={!!errors.paidUsdMinor}>
                <FieldLabel htmlFor="gp-paid">{t('paidUsd')}</FieldLabel>
                <Input
                  id="gp-paid"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  step="0.01"
                  {...form.register('paidUsdMinor', {
                    setValueAs: (v: unknown) =>
                      v === '' || v === null || v === undefined
                        ? undefined
                        : Math.round(Number(v) * 100),
                  })}
                />
                <FieldError errors={[errors.paidUsdMinor]} />
              </Field>
              <Field data-invalid={!!errors.bankReference}>
                <FieldLabel htmlFor="gp-ref">{t('reference')}</FieldLabel>
                <Input id="gp-ref" {...form.register('bankReference')} />
                <FieldError errors={[errors.bankReference]} />
              </Field>
            </div>
            <Field data-invalid={!!errors.note}>
              <FieldLabel htmlFor="gp-note">{t('note')}</FieldLabel>
              <Textarea id="gp-note" rows={2} {...form.register('note')} />
              <FieldError errors={[errors.note]} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {tc('cancel')}
            </Button>
            <Button type="submit" disabled={!validCode || isSubmitting}>
              {t('save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function PlanTermsCard() {
  const t = useTranslations('plans.admin');
  const settings = usePlanSettings();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('termsTitle')}</CardTitle>
        <CardDescription>{t('termsBody')}</CardDescription>
      </CardHeader>
      <CardContent>
        {settings.isPending ? (
          <Skeleton className="h-96 rounded-lg" />
        ) : settings.isError ? (
          <ErrorState onRetry={() => void settings.refetch()} retrying={settings.isFetching} />
        ) : (
          <TermsForm initial={settings.data} />
        )}
      </CardContent>
    </Card>
  );
}

const NUMBERS = ['monthlyUsdMinor', 'yearlyUsdMinor', 'searchBoost', 'markupDiscountBps'] as const;

function TermsForm({ initial }: { initial: PlanSettings }) {
  const t = useTranslations('plans.admin');
  const tt = useTranslations('plans.tiers');
  const tc = useTranslations('common');
  const save = useSavePlanSettings();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<PlanSettings>({
    resolver: zodResolver(PlanSettingsSchema),
    defaultValues: initial,
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <form
      noValidate
      className="space-y-6"
      onSubmit={(e) =>
        void form.handleSubmit(async (dto) => {
          setError(null);
          try {
            await save.mutateAsync(dto);
            toast.success(t('termsSaved'));
          } catch (err) {
            setError(applyServerErrors(err, form.setError, [], tc('networkError')));
          }
        })(e)
      }
    >
      <FormAlert message={error} />
      <div className="grid gap-6 lg:grid-cols-3">
        {PlanTierSchema.options.map((tier) => (
          <fieldset key={tier} className="space-y-4 rounded-lg border p-4">
            <legend className="px-1 font-medium">{tt(tier)}</legend>
            {NUMBERS.map((name) => (
              <Field key={name} data-invalid={!!errors.tiers?.[tier]?.[name]}>
                <FieldLabel htmlFor={`pt-${tier}-${name}`}>{t(`terms.${name}`)}</FieldLabel>
                <Input
                  id={`pt-${tier}-${name}`}
                  type="number"
                  inputMode="numeric"
                  {...form.register(`tiers.${tier}.${name}`, { valueAsNumber: true })}
                />
                <FieldError errors={[errors.tiers?.[tier]?.[name]]} />
              </Field>
            ))}
            <Field data-invalid={!!errors.tiers?.[tier]?.maxProducts}>
              <FieldLabel htmlFor={`pt-${tier}-max`}>{t('terms.maxProducts')}</FieldLabel>
              <Input
                id={`pt-${tier}-max`}
                type="number"
                inputMode="numeric"
                placeholder={t('unlimited')}
                {...form.register(`tiers.${tier}.maxProducts`, {
                  setValueAs: (v: unknown) =>
                    v === '' || v === null || v === undefined ? null : Number(v),
                })}
              />
              <FieldError errors={[errors.tiers?.[tier]?.maxProducts]} />
            </Field>
            <Controller
              control={form.control}
              name={`tiers.${tier}.rfqHeadStart`}
              render={({ field }) => (
                <label className="flex min-h-11 items-center gap-2 text-sm">
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  {t('terms.rfqHeadStart')}
                </label>
              )}
            />
          </fieldset>
        ))}
      </div>
      <Field data-invalid={!!errors.rfqHeadStartHours} className="max-w-xs">
        <FieldLabel htmlFor="pt-hours">{t('terms.rfqHeadStartHours')}</FieldLabel>
        <Input
          id="pt-hours"
          type="number"
          inputMode="numeric"
          {...form.register('rfqHeadStartHours', { valueAsNumber: true })}
        />
        <FieldDescription>{t('terms.hoursHint')}</FieldDescription>
        <FieldError errors={[errors.rfqHeadStartHours]} />
      </Field>
      <p className="text-muted-foreground text-xs">{t('termsNote')}</p>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? tc('saving') : t('saveTerms')}
      </Button>
    </form>
  );
}
