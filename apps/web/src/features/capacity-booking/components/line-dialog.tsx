'use client';

import { CurrencySchema, type ManufacturerLine, type ProductionLineDto } from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { FormAlert } from '@/features/auth/components/form-alert';
import { useCategories } from '@/features/onboarding/api';
import { CategoryPicker } from '@/features/onboarding/components/pickers';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import { useDeleteLine, useSaveLine } from '../api';
import { EMPTY_LINE, LineFormSchema, type LineFormValues, toLineFormValues } from '../line-form';

const STATUSES = ['ACTIVE', 'PAUSED', 'RETIRED'] as const;
/** 2024-01-01 is a Monday: day d of the ISO week is 2024-01-0d. */
const weekdayDate = (d: number) => new Date(Date.UTC(2024, 0, d));

/** Create or edit a production line. `line` undefined = closed, null = new. */
export function LineDialog({
  line,
  onClose,
}: {
  line: ManufacturerLine | null | undefined;
  onClose: () => void;
}) {
  const t = useTranslations('capacityBooking.lineDialog');
  const tc = useTranslations('common');
  const format = useFormatter();
  const categories = useCategories();
  const save = useSaveLine(line?.id ?? null);
  const remove = useDeleteLine();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<LineFormValues, unknown, ProductionLineDto>({
    resolver: zodResolver(LineFormSchema),
    values: line === undefined ? undefined : line ? toLineFormValues(line) : EMPTY_LINE,
  });
  const { errors, isSubmitting } = form.formState;
  const [daily, days] = useWatch({
    control: form.control,
    name: ['dailySamMinutes', 'workingDays'],
  });
  const weekly = Number(daily) * days.length;

  const close = () => {
    setFormError(null);
    onClose();
  };

  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await save.mutateAsync(dto);
      toast.success(t('saved'));
      close();
    } catch (error) {
      setFormError(
        applyServerErrors(
          error,
          form.setError,
          ['code', 'name', 'categoryIds', 'dailySamMinutes', 'workingDays', 'rate'],
          tc('networkError'),
        ),
      );
    }
  });

  const onDelete = async () => {
    if (!line) return;
    setFormError(null);
    try {
      await remove.mutateAsync(line.id);
      toast.success(t('deleted'));
      close();
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, [], tc('networkError')));
    }
  };

  return (
    <Dialog open={line !== undefined} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={onSubmit} noValidate className="grid gap-5">
          <DialogHeader>
            <DialogTitle>{line ? t('editTitle', { code: line.code }) : t('newTitle')}</DialogTitle>
            <DialogDescription>{t('description')}</DialogDescription>
          </DialogHeader>
          <FormAlert message={formError} />
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-[10rem_minmax(0,1fr)]">
              <Field data-invalid={!!errors.code}>
                <FieldLabel htmlFor="line-code">{t('code')}</FieldLabel>
                <Input
                  id="line-code"
                  className="font-mono uppercase"
                  placeholder="L1"
                  autoComplete="off"
                  {...form.register('code')}
                />
                <FieldError errors={[errors.code]} />
              </Field>
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="line-name">{t('name')}</FieldLabel>
                <Input
                  id="line-name"
                  placeholder={t('namePlaceholder')}
                  {...form.register('name')}
                />
                <FieldError errors={[errors.name]} />
              </Field>
            </div>

            <Field data-invalid={!!errors.categoryIds}>
              <FieldLabel id="line-categories">{t('categories')}</FieldLabel>
              <Controller
                control={form.control}
                name="categoryIds"
                render={({ field }) => (
                  <CategoryPicker
                    labelledBy="line-categories"
                    categories={categories.data}
                    value={field.value}
                    onChange={field.onChange}
                    invalid={!!errors.categoryIds}
                  />
                )}
              />
              <FieldError errors={[errors.categoryIds]} />
            </Field>

            <Field data-invalid={!!errors.workingDays}>
              <FieldLabel id="line-days">{t('workingDays')}</FieldLabel>
              <Controller
                control={form.control}
                name="workingDays"
                render={({ field }) => (
                  <div role="group" aria-labelledby="line-days" className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((d) => {
                      const selected = field.value.includes(d);
                      return (
                        <button
                          key={d}
                          type="button"
                          aria-pressed={selected}
                          onClick={() =>
                            field.onChange(
                              selected
                                ? field.value.filter((v) => v !== d)
                                : [...field.value, d].sort(),
                            )
                          }
                          className={cn(
                            'inline-flex min-h-11 min-w-14 items-center justify-center rounded-lg border px-3 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:min-h-9',
                            selected
                              ? 'border-primary bg-primary-soft text-primary-ink font-medium'
                              : 'hover:border-border-strong text-muted-foreground',
                          )}
                        >
                          {format.dateTime(weekdayDate(d), { weekday: 'short', timeZone: 'UTC' })}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
              <FieldError errors={[errors.workingDays]} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={!!errors.dailySamMinutes}>
                <FieldLabel htmlFor="line-daily">{t('dailySam')}</FieldLabel>
                <Input
                  id="line-daily"
                  inputMode="numeric"
                  placeholder="10800"
                  {...form.register('dailySamMinutes')}
                />
                <FieldDescription>
                  {Number.isFinite(weekly) && weekly > 0
                    ? t('weekly', { minutes: weekly })
                    : t('dailySamHint')}
                </FieldDescription>
                <FieldError errors={[errors.dailySamMinutes]} />
              </Field>
              <div className="grid grid-cols-[minmax(0,1fr)_6.5rem] gap-3">
                <Field data-invalid={!!errors.rate}>
                  <FieldLabel htmlFor="line-rate">{t('rate')}</FieldLabel>
                  <Input
                    id="line-rate"
                    inputMode="decimal"
                    placeholder="6.50"
                    {...form.register('rate')}
                  />
                  <FieldDescription>{t('rateHint')}</FieldDescription>
                  <FieldError errors={[errors.rate]} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="line-currency">{t('currency')}</FieldLabel>
                  <Controller
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <Select
                        items={CurrencySchema.options.map((c) => ({ value: c, label: c }))}
                        value={field.value}
                        onValueChange={(value) => {
                          const parsed = CurrencySchema.safeParse(value);
                          if (parsed.success) field.onChange(parsed.data);
                        }}
                      >
                        <SelectTrigger id="line-currency" className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CurrencySchema.options.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>
              </div>
            </div>

            {line ? (
              <Field>
                <FieldLabel htmlFor="line-status">{t('status')}</FieldLabel>
                <Controller
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      items={STATUSES.map((s) => ({ value: s, label: t(`statuses.${s}`) }))}
                      value={field.value}
                      onValueChange={(value) => {
                        const status = STATUSES.find((s) => s === value);
                        if (status) field.onChange(status);
                      }}
                    >
                      <SelectTrigger id="line-status" className="w-full sm:w-56">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {t(`statuses.${s}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldDescription>{t('statusHint')}</FieldDescription>
              </Field>
            ) : null}
          </FieldGroup>
          <DialogFooter className="sm:justify-between">
            {line ? (
              <Button
                type="button"
                variant="ghost"
                className="text-danger-ink sm:me-auto"
                disabled={remove.isPending || line.upcomingBookedMinutes > 0}
                title={line.upcomingBookedMinutes > 0 ? t('cantDelete') : undefined}
                onClick={() => void onDelete()}
              >
                {t('delete')}
              </Button>
            ) : (
              <span />
            )}
            <div className="flex flex-col-reverse gap-2 sm:flex-row">
              <Button type="button" variant="outline" onClick={close}>
                {tc('cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? tc('saving') : t('save')}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
