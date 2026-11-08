'use client';

import {
  REPLACEABLE_STATUSES,
  type OrderStatus,
  type ReplaceFactoryDto,
  ReplaceFactorySchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Factory } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { amountToMinor } from '@/features/logistics/components/form-bits';
import { Footer } from '@/features/logistics/components/partners-hubs';
import { applyServerErrors } from '@/lib/form-errors';
import { useReplaceFactory } from '../api';

/** "Move to another factory" for staff, on the exceptions list and the admin order page. */
export function ReplaceFactoryButton({
  code,
  status,
  currency,
}: {
  code: string;
  status: OrderStatus;
  currency: string;
}) {
  const t = useTranslations('exceptions.replace');
  const [open, setOpen] = useState(false);
  if (!REPLACEABLE_STATUSES.includes(status)) return null;
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        <Factory />
        {t('button')}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          {open ? (
            <ReplaceForm code={code} currency={currency} onClose={() => setOpen(false)} />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ReplaceForm({
  code,
  currency,
  onClose,
}: {
  code: string;
  currency: string;
  onClose: () => void;
}) {
  const t = useTranslations('exceptions.replace');
  const tc = useTranslations('common');
  const replace = useReplaceFactory(code);
  const [formError, setFormError] = useState<string | null>(null);
  const schema = useMemo(
    () =>
      z
        .object({ manufacturerCode: z.string(), price: z.string(), reason: z.string() })
        .transform((f, ctx): ReplaceFactoryDto => {
          const r = ReplaceFactorySchema.safeParse({
            manufacturerCode: f.manufacturerCode.trim().toUpperCase(),
            manufacturerUnitPriceMinor: amountToMinor(f.price, currency),
            reason: f.reason,
          });
          if (r.success) return r.data;
          for (const issue of r.error.issues)
            ctx.addIssue({
              code: 'custom',
              message: issue.message,
              path: issue.path.map((p) => (p === 'manufacturerUnitPriceMinor' ? 'price' : p)),
            });
          return z.NEVER;
        }),
    [currency],
  );
  const form = useForm<z.input<typeof schema>, unknown, ReplaceFactoryDto>({
    resolver: zodResolver(schema),
    defaultValues: { manufacturerCode: '', price: '', reason: '' },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await replace.mutateAsync(dto);
      toast.success(t('done', { code: dto.manufacturerCode }));
      onClose();
    } catch (error) {
      setFormError(
        applyServerErrors(error, form.setError, ['manufacturerCode', 'reason'], tc('networkError')),
      );
    }
  });
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{t('title', { code })}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.manufacturerCode}>
            <FieldLabel htmlFor="rf-code">{t('factory')}</FieldLabel>
            <Input id="rf-code" placeholder="MFR-BD-0587" {...form.register('manufacturerCode')} />
            <FieldError errors={[errors.manufacturerCode]} />
          </Field>
          <Field data-invalid={!!errors.price}>
            <FieldLabel htmlFor="rf-price">{t('price', { currency })}</FieldLabel>
            <Input id="rf-price" inputMode="decimal" {...form.register('price')} />
            <FieldDescription>{t('priceHint')}</FieldDescription>
            <FieldError errors={[errors.price]} />
          </Field>
        </div>
        <Field data-invalid={!!errors.reason}>
          <FieldLabel htmlFor="rf-reason">{t('reason')}</FieldLabel>
          <Textarea id="rf-reason" rows={3} {...form.register('reason')} />
          <FieldError errors={[errors.reason]} />
        </Field>
      </FieldGroup>
      <Footer onClose={onClose} pending={isSubmitting} save={t('confirm')} />
    </form>
  );
}
