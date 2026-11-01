'use client';

import {
  type ManufacturerCapabilitiesDto,
  type ManufacturerCapabilitiesInput,
  ManufacturerCapabilitiesSchema,
  type OnboardingState,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { useSaveProfile } from '../api';
import { useFormDraft } from '../use-form-draft';
import { CapabilitiesFields, EMPTY_CAPABILITIES } from './capabilities-fields';
import { StepHeader } from './step-layout';

const FIELDS = Object.keys(ManufacturerCapabilitiesSchema.shape);

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
  const save = useSaveProfile();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ManufacturerCapabilitiesInput, unknown, ManufacturerCapabilitiesDto>({
    resolver: zodResolver(ManufacturerCapabilitiesSchema),
    defaultValues: state.manufacturerProfile ?? EMPTY_CAPABILITIES,
  });
  const draft = useFormDraft(form, 'manufacturer-profile', {
    enabled: state.manufacturerProfile === null,
    onRestore: () => toast.info(to('draftRestored')),
  });
  const { isSubmitting } = form.formState;

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

      <CapabilitiesFields form={form} />

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
