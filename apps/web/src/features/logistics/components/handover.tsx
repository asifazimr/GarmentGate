'use client';

import {
  type BuyerOrderLogistics,
  type HandoverRequestDto,
  type HandoverRequestInput,
  HandoverRequestSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Warehouse } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { FormAlert } from '@/features/auth/components/form-alert';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { countryName } from '@/lib/countries';
import { applyServerErrors } from '@/lib/form-errors';
import { useChooseHandover } from '../order-api';

/**
 * The buyer ships with its own forwarder: GarmentGate hands the goods over at its hub (FCA).
 * The forwarder's details go to GarmentGate staff only; the factory still delivers to the hub.
 */
export function HandoverForm({
  code,
  logistics: l,
  onDone,
}: {
  code: string;
  logistics: BuyerOrderLogistics;
  onDone: () => void;
}) {
  const t = useTranslations('logistics.handover');
  const tc = useTranslations('common');
  const choose = useChooseHandover(code);
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<HandoverRequestInput, unknown, HandoverRequestDto>({
    resolver: zodResolver(HandoverRequestSchema),
    defaultValues: {
      destinationCountry: l.destinationCountry,
      forwarderName: l.forwarder?.name ?? '',
      forwarderContact: l.forwarder?.contact ?? '',
      forwarderReference: l.forwarder?.reference ?? '',
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await choose.mutateAsync(dto);
      toast.success(t('saved'));
      onDone();
    } catch (error) {
      setFormError(
        applyServerErrors(
          error,
          form.setError,
          ['forwarderName', 'forwarderContact', 'forwarderReference'],
          tc('networkError'),
        ),
      );
    }
  });
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <p className="text-muted-foreground text-sm">{t('explain')}</p>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.forwarderName}>
            <FieldLabel htmlFor="ho-name">{t('name')}</FieldLabel>
            <Input id="ho-name" autoComplete="organization" {...form.register('forwarderName')} />
            <FieldError errors={[errors.forwarderName]} />
          </Field>
          <Field data-invalid={!!errors.forwarderContact}>
            <FieldLabel htmlFor="ho-contact">{t('contact')}</FieldLabel>
            <Input id="ho-contact" {...form.register('forwarderContact')} />
            <FieldDescription>{t('contactHint')}</FieldDescription>
            <FieldError errors={[errors.forwarderContact]} />
          </Field>
          <Field data-invalid={!!errors.forwarderReference}>
            <FieldLabel htmlFor="ho-ref">{t('reference')}</FieldLabel>
            <Input id="ho-ref" {...form.register('forwarderReference')} />
            <FieldError errors={[errors.forwarderReference]} />
          </Field>
          <Field data-invalid={!!errors.destinationCountry}>
            <FieldLabel htmlFor="ho-country">{t('destination')}</FieldLabel>
            <Controller
              control={form.control}
              name="destinationCountry"
              render={({ field }) => (
                <CountrySelect
                  id="ho-country"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('choose')}
                  invalid={!!errors.destinationCountry}
                />
              )}
            />
            <FieldDescription>{t('destinationHint')}</FieldDescription>
            <FieldError errors={[errors.destinationCountry]} />
          </Field>
        </div>
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? tc('saving') : t('submit')}
      </Button>
    </form>
  );
}

/** What the buyer chose: hand-over to its forwarder at GarmentGate's hub. */
export function HandoverChosen({
  logistics: l,
  onChange,
}: {
  logistics: BuyerOrderLogistics;
  onChange: () => void;
}) {
  const t = useTranslations('logistics.handover');
  const locale = useLocale();
  const f = l.forwarder;
  return (
    <div className="space-y-3 text-sm">
      <p className="flex items-start gap-2 font-medium">
        <Warehouse className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {t('chosen', { forwarder: f?.name ?? '' })}
      </p>
      <dl className="text-muted-foreground grid gap-1">
        {f?.contact ? (
          <div className="flex flex-wrap gap-x-2">
            <dt>{t('contact')}:</dt>
            <dd>{f.contact}</dd>
          </div>
        ) : null}
        {f?.reference ? (
          <div className="flex flex-wrap gap-x-2">
            <dt>{t('reference')}:</dt>
            <dd className="font-mono">{f.reference}</dd>
          </div>
        ) : null}
        <div className="flex flex-wrap gap-x-2">
          <dt>{t('destination')}:</dt>
          <dd>{countryName(l.destinationCountry, locale)}</dd>
        </div>
      </dl>
      <p className="text-muted-foreground">{t('how')}</p>
      {l.editable ? (
        <Button variant="outline" onClick={onChange}>
          {t('change')}
        </Button>
      ) : null}
    </div>
  );
}
