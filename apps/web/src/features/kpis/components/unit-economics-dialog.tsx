'use client';

import { type UnitEconomicsSettings, UnitEconomicsSettingsSchema } from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { ActiveCheckbox, Footer } from '@/features/logistics/components/partners-hubs';
import { applyServerErrors } from '@/lib/form-errors';
import { useSaveUnitEconomics, useUnitEconomics } from '../api';

const FormSchema = z
  .object({
    paymentFee: z.string(),
    merchandising: z.string(),
    claimsReserve: z.string(),
    fixedCosts: z.string(),
    workingCapitalLine: z.boolean(),
  })
  .transform((f, ctx): UnitEconomicsSettings => {
    const result = UnitEconomicsSettingsSchema.safeParse({
      paymentFeeBps: percentToBps(f.paymentFee),
      merchandisingUsdMinor: amountToMinor(f.merchandising, 'USD', 0),
      claimsReserveBps: percentToBps(f.claimsReserve),
      monthlyFixedCostsUsdMinor: amountToMinor(f.fixedCosts, 'USD', 0),
      workingCapitalLine: f.workingCapitalLine,
    });
    if (result.success) return result.data;
    const rename: Record<string, string> = {
      paymentFeeBps: 'paymentFee',
      merchandisingUsdMinor: 'merchandising',
      claimsReserveBps: 'claimsReserve',
      monthlyFixedCostsUsdMinor: 'fixedCosts',
    };
    for (const issue of result.error.issues)
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path.map((p) => (typeof p === 'string' ? (rename[p] ?? p) : p)),
      });
    return z.NEVER;
  });
type FormInput = z.input<typeof FormSchema>;

/** The assumptions behind contribution per order and gate 3 (business model: unit economics). */
export function UnitEconomicsDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const settings = useUnitEconomics();
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        {open && settings.data ? (
          <SettingsForm settings={settings.data} onClose={onClose} />
        ) : (
          <Skeleton className="h-72 rounded-lg" />
        )}
      </DialogContent>
    </Dialog>
  );
}

function SettingsForm({
  settings: s,
  onClose,
}: {
  settings: UnitEconomicsSettings;
  onClose: () => void;
}) {
  const t = useTranslations('kpis.settings');
  const tc = useTranslations('common');
  const save = useSaveUnitEconomics();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<FormInput, unknown, UnitEconomicsSettings>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      paymentFee: bpsToPercent(s.paymentFeeBps),
      merchandising: minorToAmount(s.merchandisingUsdMinor, 'USD'),
      claimsReserve: bpsToPercent(s.claimsReserveBps),
      fixedCosts: minorToAmount(s.monthlyFixedCostsUsdMinor, 'USD'),
      workingCapitalLine: s.workingCapitalLine,
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await save.mutateAsync(dto);
      toast.success(t('saved'));
      onClose();
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, [], tc('networkError')));
    }
  });
  const field = (name: 'paymentFee' | 'merchandising' | 'claimsReserve' | 'fixedCosts') => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`ue-${name}`}>{t(`fields.${name}`)}</FieldLabel>
      <Input id={`ue-${name}`} inputMode="decimal" {...form.register(name)} />
      <FieldDescription>{t(`hints.${name}`)}</FieldDescription>
      <FieldError errors={[errors[name]]} />
    </Field>
  );
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          {field('paymentFee')}
          {field('claimsReserve')}
          {field('merchandising')}
          {field('fixedCosts')}
        </div>
        <Controller
          control={form.control}
          name="workingCapitalLine"
          render={({ field: f }) => (
            <ActiveCheckbox
              id="ue-wcl"
              label={t('fields.workingCapitalLine')}
              checked={f.value}
              onChange={f.onChange}
            />
          )}
        />
      </FieldGroup>
      <Footer onClose={onClose} pending={isSubmitting} save={t('save')} />
    </form>
  );
}
