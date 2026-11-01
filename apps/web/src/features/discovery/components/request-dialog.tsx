'use client';

import type { ProductRequestDto, PublicProduct } from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { useMe } from '@/features/auth/api';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { applyServerErrors } from '@/lib/form-errors';
import { useRequestProduct } from '../api';
import { REQUEST_FIELDS, RequestFormSchema, type RequestFormValues } from '../request-form';

export type RequestKind = 'QUOTE' | 'SAMPLE';

/** "Request quote" / "Order sample": becomes an RFQ that GarmentGate runs with this factory. */
export function RequestDialog({
  product,
  kind,
  quantity,
  onClose,
}: {
  product: PublicProduct;
  kind: RequestKind | null;
  /** Prefilled from the price estimator. */
  quantity: number;
  onClose: () => void;
}) {
  const t = useTranslations('discovery.request');
  const tc = useTranslations('common');
  const me = useMe();
  const request = useRequestProduct(product.id);
  const [formError, setFormError] = useState<string | null>(null);
  const [sentCode, setSentCode] = useState<string | null>(null);
  const sample = kind === 'SAMPLE';

  const form = useForm<RequestFormValues, unknown, ProductRequestDto>({
    resolver: zodResolver(RequestFormSchema),
    values: {
      kind: kind ?? 'QUOTE',
      currency: product.currency,
      quantity: String(quantity),
      sampleQuantity: '1',
      targetPrice: '',
      neededBy: '',
      // Ship to the buyer's own country unless they say otherwise (BYR-US-0012 → US).
      destinationCountry: me.data?.company?.publicCode?.split('-')[1] ?? '',
      notes: '',
    },
    resetOptions: { keepDirtyValues: true },
  });
  const { errors, isSubmitting } = form.formState;

  const close = () => {
    setFormError(null);
    setSentCode(null);
    form.reset();
    onClose();
  };

  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      const { rfqCode } = await request.mutateAsync(dto);
      setSentCode(rfqCode);
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, REQUEST_FIELDS, tc('networkError')));
    }
  });

  return (
    <Dialog open={kind !== null} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-lg">
        {sentCode ? (
          <div className="grid gap-5">
            <div className="flex flex-col items-center gap-3 pt-2 text-center">
              <span className="bg-success-soft text-success-ink flex size-12 items-center justify-center rounded-full">
                <CheckCircle2 className="size-6" aria-hidden="true" />
              </span>
              <DialogTitle>{t('sentTitle')}</DialogTitle>
              <DialogDescription>{t('sent', { code: sentCode })}</DialogDescription>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={close}>
                {t('keepBrowsing')}
              </Button>
              <Button render={<Link href="/buyer/rfqs" />}>{t('viewRfqs')}</Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid gap-5">
            <DialogHeader>
              <DialogTitle>{sample ? t('sampleTitle') : t('quoteTitle')}</DialogTitle>
              <DialogDescription>
                {product.title} · {product.manufacturerCode}
              </DialogDescription>
            </DialogHeader>
            <FormAlert message={formError} />
            <FieldGroup>
              <div className="grid gap-4 sm:grid-cols-2">
                {sample ? (
                  <Field data-invalid={!!errors.sampleQuantity}>
                    <FieldLabel htmlFor="req-sample-qty">{t('sampleQuantity')}</FieldLabel>
                    <Input
                      id="req-sample-qty"
                      inputMode="numeric"
                      aria-invalid={!!errors.sampleQuantity}
                      {...form.register('sampleQuantity')}
                    />
                    <FieldError errors={[errors.sampleQuantity]} />
                  </Field>
                ) : null}
                <Field data-invalid={!!errors.quantity}>
                  <FieldLabel htmlFor="req-qty">
                    {sample ? t('bulkQuantity') : t('quantity')}
                  </FieldLabel>
                  <Input
                    id="req-qty"
                    inputMode="numeric"
                    aria-invalid={!!errors.quantity}
                    {...form.register('quantity')}
                  />
                  <FieldDescription>{t('moqHint', { count: product.moqPcs })}</FieldDescription>
                  <FieldError errors={[errors.quantity]} />
                </Field>
                {!sample ? (
                  <Field data-invalid={!!errors.targetPrice}>
                    <FieldLabel htmlFor="req-price">
                      {t('targetPrice', { currency: product.currency })}
                    </FieldLabel>
                    <Input
                      id="req-price"
                      inputMode="decimal"
                      placeholder={tc('optional')}
                      aria-invalid={!!errors.targetPrice}
                      {...form.register('targetPrice')}
                    />
                    <FieldError errors={[errors.targetPrice]} />
                  </Field>
                ) : null}
                <Field data-invalid={!!errors.neededBy}>
                  <FieldLabel htmlFor="req-needed">{t('neededBy')}</FieldLabel>
                  <Input
                    id="req-needed"
                    type="date"
                    aria-invalid={!!errors.neededBy}
                    {...form.register('neededBy')}
                  />
                  <FieldError errors={[errors.neededBy]} />
                </Field>
                <Field data-invalid={!!errors.destinationCountry}>
                  <FieldLabel htmlFor="req-country">{t('destination')}</FieldLabel>
                  <Controller
                    control={form.control}
                    name="destinationCountry"
                    render={({ field }) => (
                      <CountrySelect
                        id="req-country"
                        value={field.value || undefined}
                        onChange={field.onChange}
                        placeholder={t('destinationPlaceholder')}
                        invalid={!!errors.destinationCountry}
                      />
                    )}
                  />
                  <FieldError errors={[errors.destinationCountry]} />
                </Field>
              </div>
              <Field data-invalid={!!errors.notes}>
                <FieldLabel htmlFor="req-notes">{t('notes')}</FieldLabel>
                <Textarea
                  id="req-notes"
                  rows={3}
                  placeholder={sample ? t('notesSamplePlaceholder') : t('notesPlaceholder')}
                  aria-invalid={!!errors.notes}
                  {...form.register('notes')}
                />
                <FieldError errors={[errors.notes]} />
              </Field>
            </FieldGroup>
            <p className="text-muted-foreground bg-surface flex gap-2 rounded-lg border p-3 text-xs leading-relaxed">
              <ShieldCheck className="text-primary-ink size-4 shrink-0" aria-hidden="true" />
              {t('managed')}
            </p>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={close}>
                {tc('cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('sending') : sample ? t('submitSample') : t('submitQuote')}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
