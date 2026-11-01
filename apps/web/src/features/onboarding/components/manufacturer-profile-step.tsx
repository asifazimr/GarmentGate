'use client';

import {
  type ManufacturerCapabilitiesDto,
  type ManufacturerCapabilitiesInput,
  ManufacturerCapabilitiesSchema,
  type OnboardingState,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { useCategories, useSaveProfile } from '../api';
import { useFormDraft } from '../use-form-draft';
import { CategoryPicker, CountryMultiSelect } from './pickers';
import { OptionalTag, StepHeader } from './step-layout';

const FIELDS = Object.keys(ManufacturerCapabilitiesSchema.shape);

const NUMBER_FIELDS = [
  ['monthlyCapacityPcs', 'monthlyCapacity'],
  ['moqPcs', 'moq'],
  ['sampleLeadTimeDays', 'sampleLeadTime'],
  ['workforceSize', 'workforce'],
  ['productionLeadTimeMinDays', 'leadTimeMin'],
  ['productionLeadTimeMaxDays', 'leadTimeMax'],
] as const;

export function ManufacturerProfileStep({
  state,
  onBack,
  onDone,
}: {
  state: OnboardingState;
  onBack: () => void;
  onDone: () => void;
}) {
  const t = useTranslations('onboarding.capabilities');
  const to = useTranslations('onboarding');
  const tc = useTranslations('common');
  const categories = useCategories();
  const save = useSaveProfile();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ManufacturerCapabilitiesInput, unknown, ManufacturerCapabilitiesDto>({
    resolver: zodResolver(ManufacturerCapabilitiesSchema),
    defaultValues: state.manufacturerProfile ?? {
      categoryIds: [],
      headline: '',
      about: '',
      monthlyCapacityPcs: '',
      moqPcs: '',
      sampleLeadTimeDays: '',
      productionLeadTimeMinDays: '',
      productionLeadTimeMaxDays: '',
      workforceSize: '',
      factorySizeSqm: '',
      machinery: [{ type: '', count: '' }],
      exportMarkets: [],
    },
  });
  const machinery = useFieldArray({ control: form.control, name: 'machinery' });
  const draft = useFormDraft(form, 'manufacturer-profile', {
    enabled: state.manufacturerProfile === null,
    onRestore: () => toast.info(to('draftRestored')),
  });
  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);
    try {
      await save.mutateAsync({ ...values, machinery: values.machinery.filter((m) => m.type) });
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

        <Field data-invalid={!!errors.headline}>
          <FieldLabel htmlFor="headline">
            {t('headline')}
            <OptionalTag />
          </FieldLabel>
          <Input
            id="headline"
            placeholder={t('headlinePlaceholder')}
            {...form.register('headline')}
          />
          <FieldError errors={[errors.headline]} />
        </Field>

        <Field data-invalid={!!errors.about}>
          <FieldLabel htmlFor="about">
            {t('about')}
            <OptionalTag />
          </FieldLabel>
          <Textarea
            id="about"
            rows={4}
            placeholder={t('aboutPlaceholder')}
            {...form.register('about')}
          />
          <FieldError errors={[errors.about]} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          {NUMBER_FIELDS.map(([name, label]) => (
            <Field key={name} data-invalid={!!errors[name]}>
              <FieldLabel htmlFor={name}>{t(label)}</FieldLabel>
              <Input
                id={name}
                inputMode="numeric"
                aria-invalid={!!errors[name]}
                {...form.register(name)}
              />
              <FieldError errors={[errors[name]]} />
            </Field>
          ))}
          <Field data-invalid={!!errors.factorySizeSqm}>
            <FieldLabel htmlFor="factorySizeSqm">
              {t('factorySize')}
              <OptionalTag />
            </FieldLabel>
            <Input id="factorySizeSqm" inputMode="numeric" {...form.register('factorySizeSqm')} />
            <FieldError errors={[errors.factorySizeSqm]} />
          </Field>
        </div>

        <FieldSet>
          <FieldLegend variant="label">
            {t('machinery')}
            <OptionalTag />
          </FieldLegend>
          <div className="space-y-2">
            {machinery.fields.map((item, index) => (
              <div key={item.id} className="flex items-start gap-2">
                <Input
                  aria-label={t('machineType')}
                  placeholder={t('machineType')}
                  className="flex-1"
                  {...form.register(`machinery.${index}.type`)}
                />
                <Input
                  aria-label={t('machineCount')}
                  placeholder={t('machineCount')}
                  inputMode="numeric"
                  className="w-24"
                  {...form.register(`machinery.${index}.count`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-11 md:size-9"
                  onClick={() => machinery.remove(index)}
                  aria-label={tc('remove')}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => machinery.append({ type: '', count: '' })}
            >
              <Plus className="size-4" aria-hidden="true" />
              {t('addMachine')}
            </Button>
          </div>
          <FieldError errors={[errors.machinery]} />
        </FieldSet>

        <Field>
          <FieldLabel htmlFor="exportMarkets">
            {t('exportMarkets')}
            <OptionalTag />
          </FieldLabel>
          <Controller
            control={form.control}
            name="exportMarkets"
            render={({ field }) => (
              <CountryMultiSelect
                id="exportMarkets"
                value={field.value ?? []}
                onChange={field.onChange}
                placeholder={to('company.countryPlaceholder')}
              />
            )}
          />
        </Field>
      </FieldGroup>

      <StepActions onBack={onBack} submitting={isSubmitting} />
    </form>
  );
}

export function StepActions({ onBack, submitting }: { onBack: () => void; submitting: boolean }) {
  const tc = useTranslations('common');
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
      <Button type="button" variant="ghost" size="lg" onClick={onBack}>
        {tc('back')}
      </Button>
      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? tc('saving') : tc('continue')}
      </Button>
    </div>
  );
}
