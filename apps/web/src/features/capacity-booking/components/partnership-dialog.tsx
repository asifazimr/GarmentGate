'use client';

import {
  type CreatePartnershipDto,
  type CreatePartnershipInput,
  CreatePartnershipSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { OptionalTag } from '@/features/onboarding/components/step-layout';
import { useTodayIso } from '@/lib/client-hooks';
import { applyServerErrors } from '@/lib/form-errors';
import { useRequestPartnership } from '../api';

const blank = (v: unknown) => (v === '' || v === null ? undefined : v);
const nextMonth = (today: string) => {
  const d = new Date(`${today.slice(0, 7)}-01T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + 1);
  return d.toISOString().slice(0, 7);
};

/** Ask the factory for the same minutes on this line every month, for 6–12 months. */
export function PartnershipDialog({
  target,
  onClose,
}: {
  target: { lineId: string; categoryId: string } | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={target !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        {target ? <PartnershipForm key={target.lineId} target={target} onClose={onClose} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function PartnershipForm({
  target,
  onClose,
}: {
  target: { lineId: string; categoryId: string };
  onClose: () => void;
}) {
  const t = useTranslations('capacityBooking.partnership');
  const tc = useTranslations('common');
  const router = useRouter();
  const today = useTodayIso();
  const request = useRequestPartnership();
  const [formError, setFormError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);
  const form = useForm<CreatePartnershipInput, unknown, CreatePartnershipDto>({
    resolver: zodResolver(CreatePartnershipSchema),
    defaultValues: {
      lineId: target.lineId,
      categoryId: target.categoryId,
      months: 6,
      startMonth: today ? nextMonth(today) : '',
    },
  });
  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      const { code } = await request.mutateAsync(dto);
      toast.success(t('sent', { code }));
      onClose();
      router.push('/buyer/capacity?tab=bookings');
    } catch (error) {
      setFormError(
        applyServerErrors(
          error,
          form.setError,
          ['monthlyMinutes', 'months', 'startMonth', 'samPerPiece', 'note'],
          tc('networkError'),
        ),
      );
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.monthlyMinutes}>
            <FieldLabel htmlFor="p-minutes">{t('monthlyMinutes')}</FieldLabel>
            <Input id="p-minutes" inputMode="numeric" {...form.register('monthlyMinutes')} />
            <FieldError errors={[errors.monthlyMinutes]} />
          </Field>
          <Field data-invalid={!!errors.samPerPiece}>
            <FieldLabel htmlFor="p-sam">
              {t('sam')}
              <OptionalTag />
            </FieldLabel>
            <Input
              id="p-sam"
              inputMode="decimal"
              {...form.register('samPerPiece', { setValueAs: blank })}
            />
            <FieldError errors={[errors.samPerPiece]} />
          </Field>
          <Field data-invalid={!!errors.startMonth}>
            <FieldLabel htmlFor="p-start">{t('startMonth')}</FieldLabel>
            <Input id="p-start" type="month" {...form.register('startMonth')} />
            <FieldError errors={[errors.startMonth]} />
          </Field>
          <Field data-invalid={!!errors.months}>
            <FieldLabel htmlFor="p-months">{t('months')}</FieldLabel>
            <Input id="p-months" type="number" min={6} max={12} {...form.register('months')} />
            <FieldDescription>{t('monthsHint')}</FieldDescription>
            <FieldError errors={[errors.months]} />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="p-note">
            {t('note')}
            <OptionalTag />
          </FieldLabel>
          <Textarea id="p-note" rows={2} maxLength={1000} {...form.register('note')} />
        </Field>
        <Field orientation="horizontal" data-invalid={!!errors.acceptTerms}>
          <Checkbox
            id="p-terms"
            checked={accepted}
            onCheckedChange={(v) => {
              setAccepted(v);
              if (v) form.setValue('acceptTerms', true, { shouldValidate: true });
              else form.resetField('acceptTerms');
            }}
          />
          <FieldLabel htmlFor="p-terms" className="font-normal">
            {t('terms')}
          </FieldLabel>
        </Field>
        <FieldError errors={[errors.acceptTerms]} />
      </FieldGroup>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          {tc('cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? tc('saving') : t('submit')}
        </Button>
      </DialogFooter>
    </form>
  );
}
