'use client';

import {
  type CapacitySlot,
  type CapacitySlotDto,
  type CapacitySlotInput,
  CapacitySlotInputSchema,
  type CapacitySlotUpdateDto,
  type CapacitySlotUpdateInput,
  CapacitySlotUpdateSchema,
  dateOnly,
  type ManufacturerLine,
  slotCapacityMinutes,
  workingDayCount,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
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
import { Progress } from '@/components/ui/progress';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { currencyDigits } from '@/lib/format';
import { useDeleteSlot, useOpenSlot, useUpdateSlot } from '../api';

export type SlotTarget =
  | { kind: 'new'; line: ManufacturerLine; startDate: string; endDate: string }
  | { kind: 'edit'; line: ManufacturerLine; slot: CapacitySlot };

const blankToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

/** Capacity of a line between two ISO dates, or null while the dates are incomplete. */
function capacityOf(line: ManufacturerLine, start: string, end: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end) || end < start)
    return null;
  const from = dateOnly(start);
  const to = dateOnly(end);
  return {
    days: workingDayCount(from, to, line.workingDays),
    minutes: slotCapacityMinutes(line, from, to),
  };
}

export function SlotDialog({
  target,
  onClose,
}: {
  target: SlotTarget | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={target !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {target?.kind === 'new' ? (
          <NewSlotForm
            key={`${target.line.id}-${target.startDate}`}
            target={target}
            onClose={onClose}
          />
        ) : target?.kind === 'edit' ? (
          <EditSlotForm key={target.slot.id} target={target} onClose={onClose} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function NewSlotForm({
  target,
  onClose,
}: {
  target: Extract<SlotTarget, { kind: 'new' }>;
  onClose: () => void;
}) {
  const t = useTranslations('capacityBooking.slotDialog');
  const tc = useTranslations('common');
  const format = useFormatter();
  const open = useOpenSlot();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<CapacitySlotInput, unknown, CapacitySlotDto>({
    resolver: zodResolver(CapacitySlotInputSchema),
    defaultValues: {
      lineId: target.line.id,
      startDate: target.startDate,
      endDate: target.endDate,
    },
  });
  const { errors, isSubmitting } = form.formState;
  const [start, end] = useWatch({ control: form.control, name: ['startDate', 'endDate'] });
  const capacity = capacityOf(target.line, start, end);

  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await open.mutateAsync(dto);
      toast.success(t('opened'));
      onClose();
    } catch (error) {
      setFormError(
        applyServerErrors(
          error,
          form.setError,
          ['startDate', 'endDate', 'totalMinutes'],
          tc('networkError'),
        ),
      );
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{t('newTitle', { code: target.line.code })}</DialogTitle>
        <DialogDescription>{t('newDescription')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid grid-cols-2 gap-3">
          <Field data-invalid={!!errors.startDate}>
            <FieldLabel htmlFor="slot-start">{t('start')}</FieldLabel>
            <Input id="slot-start" type="date" {...form.register('startDate')} />
            <FieldError errors={[errors.startDate]} />
          </Field>
          <Field data-invalid={!!errors.endDate}>
            <FieldLabel htmlFor="slot-end">{t('end')}</FieldLabel>
            <Input id="slot-end" type="date" {...form.register('endDate')} />
            <FieldError errors={[errors.endDate]} />
          </Field>
        </div>
        <Field data-invalid={!!errors.totalMinutes}>
          <FieldLabel htmlFor="slot-total">{t('offer')}</FieldLabel>
          <Input
            id="slot-total"
            inputMode="numeric"
            placeholder={capacity ? String(capacity.minutes) : ''}
            {...form.register('totalMinutes', { setValueAs: blankToUndefined })}
          />
          <FieldDescription>
            {capacity
              ? t('capacity', { days: capacity.days, minutes: capacity.minutes })
              : t('offerHint')}
          </FieldDescription>
          <FieldError errors={[errors.totalMinutes]} />
        </Field>
      </FieldGroup>
      <p className="text-muted-foreground text-xs">
        {t('rate', {
          rate: format.number(
            target.line.cmRateMinorPer100Min / 10 ** currencyDigits(target.line.currency),
            {
              style: 'currency',
              currency: target.line.currency,
            },
          ),
        })}
      </p>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          {tc('cancel')}
        </Button>
        <Button type="submit" disabled={isSubmitting || capacity?.minutes === 0}>
          {isSubmitting ? tc('saving') : t('open')}
        </Button>
      </DialogFooter>
    </form>
  );
}

function EditSlotForm({
  target,
  onClose,
}: {
  target: Extract<SlotTarget, { kind: 'edit' }>;
  onClose: () => void;
}) {
  const t = useTranslations('capacityBooking.slotDialog');
  const tc = useTranslations('common');
  const format = useFormatter();
  const update = useUpdateSlot();
  const remove = useDeleteSlot();
  const { slot, line } = target;
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<CapacitySlotUpdateInput, unknown, CapacitySlotUpdateDto>({
    resolver: zodResolver(CapacitySlotUpdateSchema),
    defaultValues: { endDate: slot.endDate, totalMinutes: slot.totalMinutes },
  });
  const { errors, isSubmitting } = form.formState;
  const end = useWatch({ control: form.control, name: 'endDate' }) ?? slot.endDate;
  const capacity = capacityOf(line, slot.startDate, end);
  const booked = slot.bookedMinutes > 0;
  const range = format.dateTimeRange(dateOnly(slot.startDate), dateOnly(slot.endDate), {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });

  const run = async (action: () => Promise<unknown>, message: string) => {
    setFormError(null);
    try {
      await action();
      toast.success(message);
      onClose();
    } catch (error) {
      setFormError(
        applyServerErrors(error, form.setError, ['endDate', 'totalMinutes'], tc('networkError')),
      );
    }
  };

  const onSubmit = form.handleSubmit((dto) =>
    run(() => update.mutateAsync({ id: slot.id, dto }), t('saved')),
  );

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle className="flex flex-wrap items-center gap-2">
          {t('editTitle', { code: line.code })}
          {slot.status === 'CLOSED' ? <Badge variant="neutral">{t('closed')}</Badge> : null}
        </DialogTitle>
        <DialogDescription>{range}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('booked')}</span>
          <span className="tabular font-medium">
            {t('bookedOf', { booked: slot.bookedMinutes, total: slot.totalMinutes })}
          </span>
        </div>
        <Progress
          value={slot.totalMinutes > 0 ? (slot.bookedMinutes / slot.totalMinutes) * 100 : 0}
          aria-label={t('booked')}
        />
      </div>
      <FieldGroup>
        <Field data-invalid={!!errors.endDate}>
          <FieldLabel htmlFor="slot-edit-end">{t('end')}</FieldLabel>
          <Input
            id="slot-edit-end"
            type="date"
            min={slot.startDate}
            {...form.register('endDate')}
          />
          <FieldError errors={[errors.endDate]} />
        </Field>
        <Field data-invalid={!!errors.totalMinutes}>
          <FieldLabel htmlFor="slot-edit-total">{t('offer')}</FieldLabel>
          <Input
            id="slot-edit-total"
            inputMode="numeric"
            {...form.register('totalMinutes', { setValueAs: blankToUndefined })}
          />
          <FieldDescription>
            {capacity
              ? t('capacity', { days: capacity.days, minutes: capacity.minutes })
              : t('offerHint')}
            {booked ? ` ${t('notBelowBooked')}` : ''}
          </FieldDescription>
          <FieldError errors={[errors.totalMinutes]} />
        </Field>
      </FieldGroup>
      <DialogFooter className="sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row">
          {slot.status === 'OPEN' ? (
            <Button
              type="button"
              variant="ghost"
              disabled={booked || update.isPending}
              title={booked ? t('hasBookings') : undefined}
              onClick={() =>
                void run(
                  () => update.mutateAsync({ id: slot.id, dto: { status: 'CLOSED' } }),
                  t('closedToast'),
                )
              }
            >
              {t('close')}
            </Button>
          ) : (
            <Button
              type="button"
              variant="ghost"
              disabled={update.isPending}
              onClick={() =>
                void run(
                  () => update.mutateAsync({ id: slot.id, dto: { status: 'OPEN' } }),
                  t('reopened'),
                )
              }
            >
              {t('reopen')}
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            className="text-danger-ink"
            disabled={booked || remove.isPending}
            title={booked ? t('hasBookings') : undefined}
            onClick={() => void run(() => remove.mutateAsync(slot.id), t('deleted'))}
          >
            {t('delete')}
          </Button>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? tc('saving') : t('save')}
          </Button>
        </div>
      </DialogFooter>
    </form>
  );
}
