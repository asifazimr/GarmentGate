'use client';

import {
  RELEASE_TRIGGERS,
  type ReleaseSchedule,
  ReleaseScheduleSchema,
  type ServiceFees,
  ServiceFeesSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ErrorState } from '@/components/patterns/error-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import {
  amountToMinor,
  bpsToPercent,
  minorToAmount,
  percentToBps,
} from '@/features/logistics/components/form-bits';
import { ActiveCheckbox } from '@/features/logistics/components/partners-hubs';
import { ApiError, apiJson, apiSend } from '@/lib/api';
import { applyServerErrors } from '@/lib/form-errors';

const keys = { fees: ['admin', 'finance', 'fees'], schedule: ['admin', 'finance', 'schedule'] };

/** Staff: service fees, the claim window and the release schedule for new orders. */
export function FinanceSettings() {
  const fees = useQuery({
    queryKey: keys.fees,
    queryFn: () => apiJson('/admin/finance/fees', ServiceFeesSchema),
  });
  const schedule = useQuery({
    queryKey: keys.schedule,
    queryFn: () => apiJson('/admin/finance/schedule', ReleaseScheduleSchema),
  });
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {fees.isError ? (
        <ErrorState onRetry={() => void fees.refetch()} retrying={fees.isFetching} />
      ) : fees.data ? (
        <FeesForm fees={fees.data} />
      ) : (
        <Skeleton className="h-96 rounded-xl" />
      )}
      {schedule.isError ? (
        <ErrorState onRetry={() => void schedule.refetch()} retrying={schedule.isFetching} />
      ) : schedule.data ? (
        <ScheduleForm schedule={schedule.data} />
      ) : (
        <Skeleton className="h-96 rounded-xl" />
      )}
    </div>
  );
}

const FeesFormSchema = z
  .object({
    inspectionFee: z.string(),
    sampleFee: z.string(),
    claimWindowDays: z.string(),
    firstInspectionFree: z.boolean(),
    creditSampleFees: z.boolean(),
  })
  .transform((f, ctx): ServiceFees => {
    const result = ServiceFeesSchema.safeParse({
      inspectionFeeUsdMinor: amountToMinor(f.inspectionFee, 'USD', 0),
      sampleFeeUsdMinor: amountToMinor(f.sampleFee, 'USD', 0),
      claimWindowDays: Number(f.claimWindowDays),
      firstInspectionFree: f.firstInspectionFree,
      creditSampleFees: f.creditSampleFees,
    });
    if (result.success) return result.data;
    const rename: Record<string, string> = {
      inspectionFeeUsdMinor: 'inspectionFee',
      sampleFeeUsdMinor: 'sampleFee',
    };
    for (const issue of result.error.issues)
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path.map((p) => (typeof p === 'string' ? (rename[p] ?? p) : p)),
      });
    return z.NEVER;
  });

function FeesForm({ fees: f }: { fees: ServiceFees }) {
  const t = useTranslations('financeSettings');
  const tc = useTranslations('common');
  const queryClient = useQueryClient();
  const save = useMutation({
    mutationFn: (dto: ServiceFees) =>
      apiJson('/admin/finance/fees', ServiceFeesSchema, { method: 'PUT', body: dto }),
    onSuccess: (data) => queryClient.setQueryData(keys.fees, data),
  });
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<z.input<typeof FeesFormSchema>, unknown, ServiceFees>({
    resolver: zodResolver(FeesFormSchema),
    defaultValues: {
      inspectionFee: minorToAmount(f.inspectionFeeUsdMinor, 'USD'),
      sampleFee: minorToAmount(f.sampleFeeUsdMinor, 'USD'),
      claimWindowDays: String(f.claimWindowDays),
      firstInspectionFree: f.firstInspectionFree,
      creditSampleFees: f.creditSampleFees,
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await save.mutateAsync(dto);
      toast.success(t('saved'));
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, [], tc('networkError')));
    }
  });
  const text = (name: 'inspectionFee' | 'sampleFee' | 'claimWindowDays') => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`fs-${name}`}>{t(`fees.${name}`)}</FieldLabel>
      <Input id={`fs-${name}`} inputMode="decimal" {...form.register(name)} />
      <FieldDescription>{t(`fees.${name}Hint`)}</FieldDescription>
      <FieldError errors={[errors[name]]} />
    </Field>
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('fees.title')}</CardTitle>
        <CardDescription>{t('fees.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <FormAlert message={formError} />
          <FieldGroup>
            {text('inspectionFee')}
            <Controller
              control={form.control}
              name="firstInspectionFree"
              render={({ field }) => (
                <ActiveCheckbox
                  id="fs-first"
                  label={t('fees.firstInspectionFree')}
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {text('sampleFee')}
            <Controller
              control={form.control}
              name="creditSampleFees"
              render={({ field }) => (
                <ActiveCheckbox
                  id="fs-credit"
                  label={t('fees.creditSampleFees')}
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {text('claimWindowDays')}
          </FieldGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? tc('saving') : t('save')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

/** One share per moment; empty means not used. Must add up to 100%. */
function ScheduleForm({ schedule }: { schedule: ReleaseSchedule }) {
  const t = useTranslations('financeSettings');
  const tr = useTranslations('adminPanel.payments.trigger');
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      RELEASE_TRIGGERS.map((trigger) => {
        const row = schedule.find((s) => s.trigger === trigger);
        return [trigger, row ? bpsToPercent(row.bps) : ''];
      }),
    ),
  );
  const [error, setError] = useState<string | null>(null);
  const save = useMutation({
    mutationFn: (dto: ReleaseSchedule) =>
      apiSend('/admin/finance/schedule', { method: 'PUT', body: dto }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.schedule }),
  });
  const total = RELEASE_TRIGGERS.reduce((a, tr0) => {
    const bps = percentToBps(values[tr0] ?? '');
    return Number.isNaN(bps) ? a : a + bps;
  }, 0);
  const submit = async () => {
    setError(null);
    const parsed = ReleaseScheduleSchema.safeParse(
      RELEASE_TRIGGERS.flatMap((trigger) =>
        (values[trigger] ?? '').trim() === ''
          ? []
          : [{ trigger, bps: percentToBps(values[trigger] ?? '') }],
      ),
    );
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? t('failed'));
      return;
    }
    try {
      await save.mutateAsync(parsed.data);
      toast.success(t('saved'));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : t('failed'));
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('schedule.title')}</CardTitle>
        <CardDescription>{t('schedule.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormAlert message={error} />
        <div className="grid gap-3 sm:grid-cols-2">
          {RELEASE_TRIGGERS.map((trigger) => (
            <Field key={trigger}>
              <FieldLabel htmlFor={`rs-${trigger}`}>{tr(trigger)} (%)</FieldLabel>
              <Input
                id={`rs-${trigger}`}
                inputMode="decimal"
                value={values[trigger] ?? ''}
                onChange={(e) => setValues((v) => ({ ...v, [trigger]: e.target.value }))}
              />
            </Field>
          ))}
        </div>
        <p
          className={
            total === 10_000 ? 'text-success-ink text-sm' : 'text-muted-foreground text-sm'
          }
        >
          {t('schedule.total', { percent: bpsToPercent(total) })}
        </p>
        <Button disabled={save.isPending} onClick={() => void submit()}>
          {t('save')}
        </Button>
      </CardContent>
    </Card>
  );
}
