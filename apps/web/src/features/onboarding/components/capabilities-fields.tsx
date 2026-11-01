'use client';

import type {
  ManufacturerCapabilitiesDto,
  ManufacturerCapabilitiesInput,
} from '@garmentgate/shared';
import { Plus, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Controller, useFieldArray, type UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCategories } from '../api';
import { CategoryPicker, CountryMultiSelect } from './pickers';
import { OptionalTag } from './step-layout';

export const EMPTY_CAPABILITIES: ManufacturerCapabilitiesInput = {
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
};

const NUMBER_FIELDS = [
  ['monthlyCapacityPcs', 'monthlyCapacity'],
  ['moqPcs', 'moq'],
  ['sampleLeadTimeDays', 'sampleLeadTime'],
  ['workforceSize', 'workforce'],
  ['productionLeadTimeMinDays', 'leadTimeMin'],
  ['productionLeadTimeMaxDays', 'leadTimeMax'],
] as const;

/** The factory capability fields, shared by onboarding and the profile editor. */
export function CapabilitiesFields({
  form,
}: {
  form: UseFormReturn<ManufacturerCapabilitiesInput, unknown, ManufacturerCapabilitiesDto>;
}) {
  const t = useTranslations('onboarding.capabilities');
  const to = useTranslations('onboarding');
  const tc = useTranslations('common');
  const categories = useCategories();
  const machinery = useFieldArray({ control: form.control, name: 'machinery' });
  const { errors } = form.formState;

  return (
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
  );
}
