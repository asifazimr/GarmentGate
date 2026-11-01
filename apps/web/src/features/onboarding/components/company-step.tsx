'use client';

import {
  type CompanyInfoDto,
  type CompanyInfoInput,
  CompanyInfoSchema,
  type OnboardingState,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { useSaveCompany } from '../api';
import { useFormDraft } from '../use-form-draft';
import { CountrySelect } from './pickers';
import { OptionalTag, StepHeader } from './step-layout';

const FIELDS = Object.keys(CompanyInfoSchema.shape);

export function CompanyStep({ state, onDone }: { state: OnboardingState; onDone: () => void }) {
  const t = useTranslations('onboarding.company');
  const to = useTranslations('onboarding');
  const tc = useTranslations('common');
  const save = useSaveCompany();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<CompanyInfoInput, unknown, CompanyInfoDto>({
    resolver: zodResolver(CompanyInfoSchema),
    defaultValues: state.company ?? {
      legalName: '',
      tradeName: '',
      country: '',
      city: '',
      addressLine1: '',
      addressLine2: '',
      postalCode: '',
      registrationNumber: '',
      website: '',
      phone: '',
      yearEstablished: '',
    },
  });
  const draft = useFormDraft(form, 'company', {
    enabled: state.company === null,
    onRestore: () => toast.info(to('draftRestored')),
  });
  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);
    try {
      await save.mutateAsync(values);
      draft.clear();
      onDone();
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, FIELDS, tc('networkError')));
    }
  });

  const text = (name: keyof CompanyInfoInput, autoComplete: string, optional = false) => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={name}>
        {t(name)}
        {optional ? <OptionalTag /> : null}
      </FieldLabel>
      <Input
        id={name}
        autoComplete={autoComplete}
        aria-invalid={!!errors[name]}
        {...form.register(name)}
      />
      <FieldError errors={[errors[name]]} />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <StepHeader title={t('title')} subtitle={t('subtitle')} />
      <FormAlert message={formError} />
      <FieldGroup>
        {text('legalName', 'organization')}
        {text('tradeName', 'off', true)}
        <Field data-invalid={!!errors.country}>
          <FieldLabel htmlFor="country">{t('country')}</FieldLabel>
          <Controller
            control={form.control}
            name="country"
            render={({ field }) => (
              <CountrySelect
                id="country"
                value={field.value || undefined}
                onChange={field.onChange}
                placeholder={t('countryPlaceholder')}
                invalid={!!errors.country}
              />
            )}
          />
          <FieldError errors={[errors.country]} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          {text('city', 'address-level2')}
          {text('postalCode', 'postal-code', true)}
        </div>
        {text('addressLine1', 'address-line1')}
        {text('addressLine2', 'address-line2', true)}
        <div className="grid gap-4 sm:grid-cols-2">
          {text('registrationNumber', 'off')}
          <Field data-invalid={!!errors.yearEstablished}>
            <FieldLabel htmlFor="yearEstablished">
              {t('yearEstablished')}
              <OptionalTag />
            </FieldLabel>
            <Input
              id="yearEstablished"
              inputMode="numeric"
              aria-invalid={!!errors.yearEstablished}
              {...form.register('yearEstablished')}
            />
            <FieldError errors={[errors.yearEstablished]} />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.website}>
            <FieldLabel htmlFor="website">
              {t('website')}
              <OptionalTag />
            </FieldLabel>
            <Input
              id="website"
              type="url"
              inputMode="url"
              placeholder="https://"
              aria-invalid={!!errors.website}
              {...form.register('website')}
            />
            <FieldError errors={[errors.website]} />
          </Field>
          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="phone">
              {t('phone')}
              <OptionalTag />
            </FieldLabel>
            <Input id="phone" type="tel" autoComplete="tel" {...form.register('phone')} />
            <FieldError errors={[errors.phone]} />
          </Field>
        </div>
      </FieldGroup>
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
          {isSubmitting ? tc('saving') : tc('continue')}
        </Button>
      </div>
    </form>
  );
}
