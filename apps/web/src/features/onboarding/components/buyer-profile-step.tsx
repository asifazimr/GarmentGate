'use client';

import {
  BuyerBusinessTypeSchema,
  type BuyerSourcingNeedsDto,
  type BuyerSourcingNeedsInput,
  BuyerSourcingNeedsSchema,
  type OnboardingState,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import { useCategories, useSaveProfile } from '../api';
import { useFormDraft } from '../use-form-draft';
import { StepActions } from './manufacturer-profile-step';
import { CategoryPicker, CountryMultiSelect } from './pickers';
import { OptionalTag, StepHeader } from './step-layout';

const FIELDS = Object.keys(BuyerSourcingNeedsSchema.shape);

export function BuyerProfileStep({
  state,
  onBack,
  onDone,
}: {
  state: OnboardingState;
  onBack: () => void;
  onDone: () => void;
}) {
  const t = useTranslations('onboarding.sourcing');
  const to = useTranslations('onboarding');
  const tc = useTranslations('common');
  const categories = useCategories();
  const save = useSaveProfile();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<BuyerSourcingNeedsInput, unknown, BuyerSourcingNeedsDto>({
    resolver: zodResolver(BuyerSourcingNeedsSchema),
    defaultValues: state.buyerProfile ?? {
      categoryIds: [],
      annualVolumePcs: '',
      typicalOrderQuantityPcs: '',
      targetMarkets: [],
      sourcingNeeds: '',
    },
  });
  const draft = useFormDraft(form, 'buyer-profile', {
    enabled: state.buyerProfile === null,
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

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <StepHeader title={t('title')} subtitle={t('subtitle')} />
      <FormAlert message={formError} />

      <FieldGroup>
        <Field data-invalid={!!errors.businessType}>
          <FieldLabel id="businessType-label">{t('businessType')}</FieldLabel>
          <Controller
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <div
                role="radiogroup"
                aria-labelledby="businessType-label"
                className="grid grid-cols-2 gap-2 sm:grid-cols-3"
              >
                {BuyerBusinessTypeSchema.options.map((type) => (
                  <button
                    key={type}
                    type="button"
                    role="radio"
                    aria-checked={field.value === type}
                    onClick={() => field.onChange(type)}
                    className={cn(
                      'min-h-11 rounded-lg border px-3 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                      field.value === type
                        ? 'border-primary bg-primary/10 text-primary font-medium'
                        : 'hover:border-foreground/30',
                    )}
                  >
                    {t(`businessTypes.${type}`)}
                  </button>
                ))}
              </div>
            )}
          />
          <FieldError errors={[errors.businessType]} />
        </Field>

        <Field data-invalid={!!errors.categoryIds}>
          <FieldLabel id="categories-label">{t('categories')}</FieldLabel>
          <Controller
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <CategoryPicker
                labelledBy="categories-label"
                categories={categories.data}
                value={field.value}
                onChange={field.onChange}
                invalid={!!errors.categoryIds}
              />
            )}
          />
          <FieldError errors={[errors.categoryIds]} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.annualVolumePcs}>
            <FieldLabel htmlFor="annualVolumePcs">
              {t('annualVolume')}
              <OptionalTag />
            </FieldLabel>
            <Input id="annualVolumePcs" inputMode="numeric" {...form.register('annualVolumePcs')} />
            <FieldError errors={[errors.annualVolumePcs]} />
          </Field>
          <Field data-invalid={!!errors.typicalOrderQuantityPcs}>
            <FieldLabel htmlFor="typicalOrderQuantityPcs">
              {t('typicalOrder')}
              <OptionalTag />
            </FieldLabel>
            <Input
              id="typicalOrderQuantityPcs"
              inputMode="numeric"
              {...form.register('typicalOrderQuantityPcs')}
            />
            <FieldError errors={[errors.typicalOrderQuantityPcs]} />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="targetMarkets">
            {t('targetMarkets')}
            <OptionalTag />
          </FieldLabel>
          <Controller
            control={form.control}
            name="targetMarkets"
            render={({ field }) => (
              <CountryMultiSelect
                id="targetMarkets"
                value={field.value ?? []}
                onChange={field.onChange}
                placeholder={to('company.countryPlaceholder')}
              />
            )}
          />
        </Field>

        <Field data-invalid={!!errors.sourcingNeeds}>
          <FieldLabel htmlFor="sourcingNeeds">
            {t('needs')}
            <OptionalTag />
          </FieldLabel>
          <Textarea
            id="sourcingNeeds"
            rows={4}
            placeholder={t('needsPlaceholder')}
            {...form.register('sourcingNeeds')}
          />
          <FieldError errors={[errors.sourcingNeeds]} />
        </Field>
      </FieldGroup>

      <StepActions onBack={onBack} submitting={isSubmitting} />
    </form>
  );
}
