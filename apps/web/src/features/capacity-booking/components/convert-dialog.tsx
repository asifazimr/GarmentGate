'use client';

import {
  type BuyerBooking,
  type ConvertBookingDto,
  type ConvertBookingInput,
  ConvertBookingSchema,
  IncotermSchema,
  minutesForPieces,
  samToCenti,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { OptionalTag } from '@/features/onboarding/components/step-layout';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import { useConvertBooking } from '../api';

const blank = (v: unknown) => (v === '' || v === null ? undefined : v);

/**
 * Turn a confirmed booking into an order. CMT: an order at the booked rate × SAM per piece,
 * straight away. Full package: an invite-only quote request to the same factory. Either way the
 * deposit carries over and unused minutes go back to the factory.
 */
export function ConvertDialog({
  booking,
  open,
  onClose,
}: {
  booking: BuyerBooking;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-xl">
        {open ? <ConvertForm booking={booking} onClose={onClose} /> : null}
      </DialogContent>
    </Dialog>
  );
}

function ConvertForm({ booking, onClose }: { booking: BuyerBooking; onClose: () => void }) {
  const t = useTranslations('capacityBooking.convert');
  const tw = useTranslations('rfq.wizard');
  const tc = useTranslations('common');
  const format = useFormatter();
  const router = useRouter();
  const convert = useConvertBooking(booking.code);
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<ConvertBookingInput, unknown, ConvertBookingDto>({
    resolver: zodResolver(ConvertBookingSchema),
    defaultValues: {
      mode: 'CMT',
      title: '',
      incoterm: 'FOB',
      destinationCountry: '',
      ...(booking.samPerPiece !== null && { samPerPiece: booking.samPerPiece }),
      ...(booking.estimatedPieces !== null && { quantity: booking.estimatedPieces }),
    },
  });
  const { errors, isSubmitting } = form.formState;
  const [mode, quantity, sam] = useWatch({
    control: form.control,
    name: ['mode', 'quantity', 'samPerPiece'],
  });
  const needed =
    Number(quantity) > 0 && Number(sam) > 0
      ? minutesForPieces(Number(quantity), samToCenti(Number(sam)))
      : null;

  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      const result = await convert.mutateAsync(dto);
      onClose();
      if (result.orderCode) {
        toast.success(t('orderCreated', { code: result.orderCode }));
        router.push(`/buyer/orders/${result.orderCode}`);
      } else if (result.rfqCode) {
        toast.success(t('rfqCreated', { code: result.rfqCode }));
        router.push(`/buyer/rfqs/${result.rfqCode}`);
      }
    } catch (error) {
      setFormError(
        applyServerErrors(
          error,
          form.setError,
          ['title', 'quantity', 'samPerPiece', 'incoterm', 'destinationCountry'],
          tc('networkError'),
        ),
      );
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{t('title', { code: booking.code })}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <Controller
        control={form.control}
        name="mode"
        render={({ field }) => (
          <div role="radiogroup" aria-label={t('mode')} className="grid gap-2 sm:grid-cols-2">
            {(['CMT', 'FULL_PACKAGE'] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={field.value === m}
                onClick={() => field.onChange(m)}
                className={cn(
                  'rounded-lg border p-3 text-start text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                  field.value === m
                    ? 'border-primary bg-primary-soft'
                    : 'hover:border-border-strong',
                )}
              >
                <span className="block font-medium">{t(`modes.${m}.title`)}</span>
                <span className="text-muted-foreground block text-xs">{t(`modes.${m}.body`)}</span>
              </button>
            ))}
          </div>
        )}
      />
      <FieldGroup>
        <Field data-invalid={!!errors.title}>
          <FieldLabel htmlFor="cv-title">{t('style')}</FieldLabel>
          <Input id="cv-title" {...form.register('title')} />
          <FieldError errors={[errors.title]} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.quantity}>
            <FieldLabel htmlFor="cv-qty">{t('quantity')}</FieldLabel>
            <Input id="cv-qty" inputMode="numeric" {...form.register('quantity')} />
            <FieldError errors={[errors.quantity]} />
          </Field>
          <Field data-invalid={!!errors.samPerPiece}>
            <FieldLabel htmlFor="cv-sam">
              {t('sam')}
              {mode === 'FULL_PACKAGE' ? <OptionalTag /> : null}
            </FieldLabel>
            <Input
              id="cv-sam"
              inputMode="decimal"
              {...form.register('samPerPiece', { setValueAs: blank })}
            />
            <FieldError errors={[errors.samPerPiece]} />
          </Field>
        </div>
        <p
          className={cn(
            'text-sm',
            needed !== null && needed > booking.minutes
              ? 'text-danger-ink'
              : 'text-muted-foreground',
          )}
        >
          {needed === null
            ? t('minutesHint', { booked: format.number(booking.minutes) })
            : needed > booking.minutes
              ? t('tooMany', {
                  needed: format.number(needed),
                  booked: format.number(booking.minutes),
                })
              : t('returned', {
                  needed: format.number(needed),
                  returned: format.number(booking.minutes - needed),
                })}
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="cv-incoterm">{tw('incoterm')}</FieldLabel>
            <Controller
              control={form.control}
              name="incoterm"
              render={({ field }) => (
                <Select
                  items={IncotermSchema.options.map((i) => ({
                    value: i,
                    label: `${i} · ${tw(`incoterms.${i}`)}`,
                  }))}
                  value={field.value}
                  onValueChange={(v) => {
                    const parsed = IncotermSchema.safeParse(v);
                    if (parsed.success) field.onChange(parsed.data);
                  }}
                >
                  <SelectTrigger id="cv-incoterm" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {IncotermSchema.options.map((i) => (
                      <SelectItem key={i} value={i}>
                        {i} · {tw(`incoterms.${i}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <Field data-invalid={!!errors.destinationCountry}>
            <FieldLabel htmlFor="cv-country">{tw('destination')}</FieldLabel>
            <Controller
              control={form.control}
              name="destinationCountry"
              render={({ field }) => (
                <CountrySelect
                  id="cv-country"
                  value={field.value || undefined}
                  onChange={field.onChange}
                  placeholder={tw('destinationPlaceholder')}
                  invalid={!!errors.destinationCountry}
                />
              )}
            />
            <FieldError errors={[errors.destinationCountry]} />
          </Field>
        </div>
        {mode === 'FULL_PACKAGE' ? (
          <Field data-invalid={'description' in errors && !!errors.description}>
            <FieldLabel htmlFor="cv-desc">{t('packageDescription')}</FieldLabel>
            <Textarea id="cv-desc" rows={4} {...form.register('description')} />
            <FieldDescription>{t('packageHint')}</FieldDescription>
            <FieldError errors={['description' in errors ? errors.description : undefined]} />
          </Field>
        ) : (
          <Field>
            <FieldLabel htmlFor="cv-spec">
              {t('specification')}
              <OptionalTag />
            </FieldLabel>
            <Textarea id="cv-spec" rows={3} {...form.register('specification')} />
          </Field>
        )}
      </FieldGroup>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          {tc('cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? tc('saving') : t(`submit.${mode}`)}
        </Button>
      </DialogFooter>
    </form>
  );
}
