'use client';

import {
  type BuyerPlusSettings,
  BuyerPlusSettingsSchema,
  type GrantPlusDto,
  type GrantPlusInput,
  GrantPlusSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Crown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ErrorState } from '@/components/patterns/error-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { useGrantPlus, usePlusSettings, useSavePlusSettings } from '../plus-api';

/** Staff: GarmentGate Plus terms (every price and perk) and memberships set by hand. */
export function AdminPlusTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PlusTermsCard />
      <GrantPlusCard />
    </div>
  );
}

function PlusTermsCard() {
  const t = useTranslations('plans.plusAdmin');
  const settings = usePlusSettings();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="size-4" aria-hidden="true" />
          {t('termsTitle')}
        </CardTitle>
        <CardDescription>{t('termsBody')}</CardDescription>
      </CardHeader>
      <CardContent>
        {settings.isPending ? (
          <Skeleton className="h-80 rounded-lg" />
        ) : settings.isError ? (
          <ErrorState onRetry={() => void settings.refetch()} retrying={settings.isFetching} />
        ) : (
          <TermsForm initial={settings.data} />
        )}
      </CardContent>
    </Card>
  );
}

const NUMBERS = ['monthlyUsdMinor', 'yearlyUsdMinor', 'sampleDiscountBps'] as const;
const FLAGS = ['freeInspections', 'priorityRfqs', 'merchandiser'] as const;

function TermsForm({ initial }: { initial: BuyerPlusSettings }) {
  const t = useTranslations('plans.plusAdmin');
  const tc = useTranslations('common');
  const save = useSavePlusSettings();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<BuyerPlusSettings>({
    resolver: zodResolver(BuyerPlusSettingsSchema),
    defaultValues: initial,
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={(e) =>
        void form.handleSubmit(async (dto) => {
          setError(null);
          try {
            await save.mutateAsync(dto);
            toast.success(t('saved'));
          } catch (err) {
            setError(applyServerErrors(err, form.setError, [...NUMBERS], tc('networkError')));
          }
        })(e)
      }
    >
      <FormAlert message={error} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-3">
          {NUMBERS.map((name) => (
            <Field key={name} data-invalid={!!errors[name]}>
              <FieldLabel htmlFor={`plus-${name}`}>{t(`fields.${name}`)}</FieldLabel>
              <Input
                id={`plus-${name}`}
                type="number"
                inputMode="numeric"
                {...form.register(name, { valueAsNumber: true })}
              />
              <FieldDescription>{t(`hints.${name}`)}</FieldDescription>
              <FieldError errors={[errors[name]]} />
            </Field>
          ))}
        </div>
        {FLAGS.map((name) => (
          <Controller
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <label className="flex min-h-11 items-center gap-2 text-sm">
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                {t(`fields.${name}`)}
              </label>
            )}
          />
        ))}
      </FieldGroup>
      <p className="text-muted-foreground text-xs">{t('note')}</p>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? tc('saving') : t('save')}
      </Button>
    </form>
  );
}

function GrantPlusCard() {
  const t = useTranslations('plans.plusAdmin');
  const ta = useTranslations('plans.admin');
  const tc = useTranslations('common');
  const grant = useGrantPlus();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const form = useForm<GrantPlusInput, unknown, GrantPlusDto>({
    resolver: zodResolver(GrantPlusSchema),
    defaultValues: { plus: true, endsOn: '', bankReference: '', note: '' },
  });
  const { errors, isSubmitting } = form.formState;
  const validCode = /^BYR-[A-Z]{2}-\d{4}$/.test(code.trim());
  const submit = (plus: boolean) => {
    form.setValue('plus', plus);
    void form.handleSubmit(async (dto) => {
      setError(null);
      try {
        await grant.mutateAsync({ code: code.trim(), dto });
        toast.success(
          plus ? t('granted', { code: code.trim() }) : t('ended', { code: code.trim() }),
        );
        form.reset();
        setCode('');
      } catch (err) {
        setError(
          applyServerErrors(
            err,
            form.setError,
            ['endsOn', 'paidUsdMinor', 'bankReference', 'note'],
            tc('networkError'),
          ),
        );
      }
    })();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('grantTitle')}</CardTitle>
        <CardDescription>{t('grantBody')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormAlert message={error} />
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="plus-code">{t('buyerCode')}</FieldLabel>
            <Input
              id="plus-code"
              placeholder="BYR-US-0012"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
            />
          </Field>
          <Field data-invalid={!!errors.endsOn}>
            <FieldLabel htmlFor="plus-ends">{ta('endsOn')}</FieldLabel>
            <Input id="plus-ends" type="date" {...form.register('endsOn')} />
            <FieldDescription>{ta('endsOnHint')}</FieldDescription>
            <FieldError errors={[errors.endsOn]} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field data-invalid={!!errors.paidUsdMinor}>
              <FieldLabel htmlFor="plus-paid">{ta('paidUsd')}</FieldLabel>
              <Input
                id="plus-paid"
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
              <FieldLabel htmlFor="plus-ref">{ta('reference')}</FieldLabel>
              <Input id="plus-ref" {...form.register('bankReference')} />
              <FieldError errors={[errors.bankReference]} />
            </Field>
          </div>
          <Field data-invalid={!!errors.note}>
            <FieldLabel htmlFor="plus-note">{ta('note')}</FieldLabel>
            <Textarea id="plus-note" rows={2} {...form.register('note')} />
            <FieldError errors={[errors.note]} />
          </Field>
        </FieldGroup>
        <div className="flex flex-wrap gap-2">
          <Button disabled={!validCode || isSubmitting} onClick={() => submit(true)}>
            {t('grant')}
          </Button>
          <Button
            variant="outline"
            disabled={!validCode || isSubmitting}
            onClick={() => submit(false)}
          >
            {t('end')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
