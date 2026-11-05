'use client';

import {
  type LogisticsSettings,
  LogisticsSettingsSchema,
  ShipperModeSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { ErrorState } from '@/components/patterns/error-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import { useLogisticsSettings, useSaveLogisticsSettings } from '../api';
import { amountToMinor, bpsToPercent, minorToAmount, percentToBps } from './form-bits';

const SettingsFormSchema = z
  .object({
    shipperMode: ShipperModeSchema,
    insuranceRate: z.string(),
    minPremium: z.string(),
    quoteValidityDays: z.union([z.string(), z.number()]),
  })
  .transform((f, ctx): LogisticsSettings => {
    const result = LogisticsSettingsSchema.safeParse({
      shipperMode: f.shipperMode,
      insuranceRateBps: percentToBps(f.insuranceRate),
      minInsurancePremiumMinor: amountToMinor(f.minPremium, 'USD', 0),
      quoteValidityDays: f.quoteValidityDays,
    });
    if (result.success) return result.data;
    const rename: Record<string, string> = {
      insuranceRateBps: 'insuranceRate',
      minInsurancePremiumMinor: 'minPremium',
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

const toForm = (s: LogisticsSettings): SettingsForm => ({
  shipperMode: s.shipperMode,
  insuranceRate: bpsToPercent(s.insuranceRateBps),
  minPremium: minorToAmount(s.minInsurancePremiumMinor, 'USD'),
  quoteValidityDays: s.quoteValidityDays,
});

/** Who appears as shipper on documents, cargo insurance pricing and quote validity. */
export function LogisticsSettingsTab() {
  const settings = useLogisticsSettings();
  if (settings.isPending) return <Skeleton className="h-80 rounded-xl" />;
  if (settings.isError)
    return <ErrorState onRetry={() => void settings.refetch()} retrying={settings.isFetching} />;
  return <SettingsFormView initial={settings.data} />;
}

function SettingsFormView({ initial }: { initial: LogisticsSettings }) {
  const t = useTranslations('logistics.settings');
  const tc = useTranslations('common');
  const save = useSaveLogisticsSettings();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<SettingsForm, unknown, LogisticsSettings>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: toForm(initial),
  });
  const { errors, isSubmitting, isDirty } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      form.reset(toForm(await save.mutateAsync(dto)));
      toast.success(t('saved'));
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, [], tc('networkError')));
    }
  });
  return (
    <Card>
      <CardContent>
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <FormAlert message={formError} />
          <Controller
            control={form.control}
            name="shipperMode"
            render={({ field }) => (
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">{t('shipperMode')}</legend>
                <div role="radiogroup" className="grid gap-2 md:grid-cols-3">
                  {ShipperModeSchema.options.map((m) => (
                    <button
                      key={m}
                      type="button"
                      role="radio"
                      aria-checked={field.value === m}
                      onClick={() => field.onChange(m)}
                      className={cn(
                        'rounded-lg border p-3 text-start text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                        field.value === m
                          ? 'border-primary bg-primary-soft'
                          : 'hover:border-border-strong',
                      )}
                    >
                      <span className="block font-medium">{t(`modes.${m}.title`)}</span>
                      <span className="text-muted-foreground block text-xs">
                        {t(`modes.${m}.body`)}
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}
          />
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field data-invalid={!!errors.insuranceRate}>
                <FieldLabel htmlFor="ls-rate">{t('insuranceRate')}</FieldLabel>
                <Input id="ls-rate" inputMode="decimal" {...form.register('insuranceRate')} />
                <FieldDescription>{t('insuranceHint')}</FieldDescription>
                <FieldError errors={[errors.insuranceRate]} />
              </Field>
              <Field data-invalid={!!errors.minPremium}>
                <FieldLabel htmlFor="ls-min">{t('minPremium')}</FieldLabel>
                <Input id="ls-min" inputMode="decimal" {...form.register('minPremium')} />
                <FieldError errors={[errors.minPremium]} />
              </Field>
              <Field data-invalid={!!errors.quoteValidityDays}>
                <FieldLabel htmlFor="ls-days">{t('validity')}</FieldLabel>
                <Input id="ls-days" inputMode="numeric" {...form.register('quoteValidityDays')} />
                <FieldError errors={[errors.quoteValidityDays]} />
              </Field>
            </div>
          </FieldGroup>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {isSubmitting ? tc('saving') : t('save')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
