'use client';

import {
  type InspectorApplicationDto,
  type InspectorApplicationInput,
  InspectorApplicationInputSchema,
  InspectionTypeSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { applyServerErrors } from '@/lib/form-errors';
import { useApply } from '../api';

const FIELDS = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'country',
  'city',
  'experienceYears',
  'inspectionTypes',
  'about',
] as const;

/** Public: freelance QC inspectors apply; staff vet and certify them before any job. */
export function InspectorApplyForm() {
  const t = useTranslations('gig.apply');
  const tq = useTranslations('qc');
  const tc = useTranslations('common');
  const apply = useApply();
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<InspectorApplicationInput, unknown, InspectorApplicationDto>({
    resolver: zodResolver(InspectorApplicationInputSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      experienceYears: 0,
      inspectionTypes: ['PRE_SHIPMENT'],
      about: '',
    },
  });
  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await apply.mutateAsync(dto);
      setSent(true);
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, [...FIELDS], tc('networkError')));
    }
  });

  if (sent)
    return (
      <div className="space-y-6 text-center">
        <span className="bg-primary/10 text-primary mx-auto flex size-14 items-center justify-center rounded-full">
          <MailCheck className="size-7" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{t('sentTitle')}</h1>
          <p className="text-muted-foreground">{t('sentBody')}</p>
        </div>
        <Button variant="outline" size="lg" className="w-full" render={<Link href="/" />}>
          {t('home')}
        </Button>
      </div>
    );

  const text = (name: 'firstName' | 'lastName' | 'email' | 'phone' | 'city', type = 'text') => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`apply-${name}`}>{t(`fields.${name}`)}</FieldLabel>
      <Input
        id={`apply-${name}`}
        type={type}
        autoComplete={
          name === 'city'
            ? 'address-level2'
            : name === 'phone'
              ? 'tel'
              : name === 'email'
                ? 'email'
                : name === 'firstName'
                  ? 'given-name'
                  : 'family-name'
        }
        aria-invalid={!!errors[name]}
        {...form.register(name)}
      />
      <FieldError errors={[errors[name]]} />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('description')}</p>
      </header>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          {text('firstName')}
          {text('lastName')}
        </div>
        {text('email', 'email')}
        {text('phone', 'tel')}
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.country}>
            <FieldLabel htmlFor="apply-country">{t('fields.country')}</FieldLabel>
            <Controller
              control={form.control}
              name="country"
              render={({ field }) => (
                <CountrySelect
                  id="apply-country"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('choose')}
                  invalid={!!errors.country}
                />
              )}
            />
            <FieldError errors={[errors.country]} />
          </Field>
          {text('city')}
        </div>
        <Field data-invalid={!!errors.experienceYears}>
          <FieldLabel htmlFor="apply-years">{t('fields.experienceYears')}</FieldLabel>
          <Input
            id="apply-years"
            type="number"
            inputMode="numeric"
            min={0}
            max={60}
            {...form.register('experienceYears')}
          />
          <FieldError errors={[errors.experienceYears]} />
        </Field>
        <Field data-invalid={!!errors.inspectionTypes}>
          <FieldLabel>{t('fields.inspectionTypes')}</FieldLabel>
          <Controller
            control={form.control}
            name="inspectionTypes"
            render={({ field }) => (
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {InspectionTypeSchema.options.map((type) => (
                  <label key={type} className="flex min-h-11 items-center gap-2 text-sm">
                    <Checkbox
                      checked={field.value.includes(type)}
                      onCheckedChange={(on) =>
                        field.onChange(
                          on ? [...field.value, type] : field.value.filter((v) => v !== type),
                        )
                      }
                    />
                    {tq(`types.${type}`)}
                  </label>
                ))}
              </div>
            )}
          />
          <FieldError errors={[errors.inspectionTypes]} />
        </Field>
        <Field data-invalid={!!errors.about}>
          <FieldLabel htmlFor="apply-about">{t('fields.about')}</FieldLabel>
          <Textarea id="apply-about" rows={5} {...form.register('about')} />
          <FieldError errors={[errors.about]} />
        </Field>
      </FieldGroup>
      <p className="text-muted-foreground text-xs">{t('process')}</p>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? tc('saving') : t('submit')}
      </Button>
    </form>
  );
}
