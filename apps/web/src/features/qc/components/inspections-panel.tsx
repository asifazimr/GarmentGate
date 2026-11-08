'use client';

import {
  type BookInspectionDto,
  type BookInspectionInput,
  BookInspectionSchema,
  type OrderInspection,
  type OrderStatus,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarPlus, FileText, Star } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMe } from '@/features/auth/api';
import { FormAlert } from '@/features/auth/components/form-alert';
import { useRateInspection } from '@/features/gig/api';
import type { OrderRole } from '@/features/orders/api';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import { useAssignInspection, useBookInspection, useInspectors } from '../api';

type BookableType = 'DURING_PRODUCTION' | 'PRE_SHIPMENT';

/** Which inspections the buyer (or staff) can still book at this point of the order. */
function bookable(status: OrderStatus, inspections: OrderInspection[]): BookableType[] {
  const open = (type: BookableType) =>
    inspections.find((i) => i.type === type && i.result === 'PENDING');
  const types: BookableType[] = [];
  if (status === 'IN_PRODUCTION' && !open('DURING_PRODUCTION')) types.push('DURING_PRODUCTION');
  const final = open('PRE_SHIPMENT');
  const failed =
    status === 'QC' &&
    inspections.filter((i) => i.type === 'PRE_SHIPMENT').at(-1)?.result === 'FAIL';
  if (failed) return types;
  // The final inspection QC opens on its own still needs a date.
  if (
    (status === 'IN_PRODUCTION' || status === 'QC') &&
    (!final || (final.bookedBy === 'PLATFORM' && !final.scheduledAt))
  )
    types.push('PRE_SHIPMENT');
  return types;
}

/**
 * Inspections on an order: book (buyer / staff), assign an inspector (staff), and the AQL
 * results each side may see. Photos show on the QC step of the timeline.
 */
export function InspectionsPanel({
  role,
  code,
  status,
  inspections,
}: {
  role: OrderRole;
  code: string;
  status: OrderStatus;
  inspections: OrderInspection[];
}) {
  const t = useTranslations('qc');
  const [booking, setBooking] = useState(false);
  const types = role === 'MANUFACTURER' ? [] : bookable(status, inspections);

  if (inspections.length === 0 && types.length === 0) return null;
  return (
    <div className="space-y-2">
      {inspections.map((i) => (
        <InspectionCard key={i.id} inspection={i} role={role} />
      ))}
      {types.length > 0 ? (
        <Button variant="outline" size="sm" onClick={() => setBooking(true)}>
          <CalendarPlus />
          {t('book.action')}
        </Button>
      ) : null}
      <BookInspectionDialog
        code={code}
        types={types}
        open={booking}
        onClose={() => setBooking(false)}
      />
    </div>
  );
}

function InspectionCard({ inspection: i, role }: { inspection: OrderInspection; role: OrderRole }) {
  const t = useTranslations('qc');
  const format = useFormatter();
  const day = (iso: string) => format.dateTime(new Date(iso), { dateStyle: 'medium' });
  const reported = i.result !== 'PENDING';
  return (
    <div className="bg-surface space-y-3 rounded-lg border p-3 text-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-medium">{t(`types.${i.type}`)}</span>
        <StatusBadge domain="inspection" status={i.result} />
        <span className="text-muted-foreground text-xs">
          {reported && i.inspectedAt
            ? t('inspectedOn', { date: day(i.inspectedAt) })
            : i.scheduledAt
              ? t('scheduledFor', { date: day(i.scheduledAt) })
              : t('notScheduled')}
        </span>
      </div>
      {role === 'ADMIN' ? <AssignInspector inspection={i} /> : null}
      {role === 'ADMIN' && reported ? <RateInspector inspection={i} /> : null}
      {!reported && role !== 'ADMIN' ? (
        <p className="text-muted-foreground text-xs">
          {t(`bookedBy.${i.bookedBy}`)} · {t('byGarmentGate')}
        </p>
      ) : null}
      {reported && i.aql && i.defects ? (
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Fact
            label={t('aql.sample')}
            value={t('aql.sampleOf', { n: i.aql.sampleSize, lot: i.aql.lotSize })}
          />
          <Fact
            label={t('aql.critical')}
            value={t('aql.found', { found: i.defects.critical, allowed: 0 })}
            bad={i.defects.critical > 0}
          />
          <Fact
            label={t('aql.major', { aql: i.aql.majorAql })}
            value={t('aql.found', { found: i.defects.major, allowed: i.aql.acceptMajor })}
            bad={i.defects.major > i.aql.acceptMajor}
          />
          <Fact
            label={t('aql.minor', { aql: i.aql.minorAql })}
            value={t('aql.found', { found: i.defects.minor, allowed: i.aql.acceptMinor })}
            bad={i.defects.minor > i.aql.acceptMinor}
          />
        </dl>
      ) : null}
      {i.summary ? <p className="leading-relaxed">{i.summary}</p> : null}
      {i.reportUrl ? (
        <Button
          variant="outline"
          size="sm"
          render={<a href={i.reportUrl} target="_blank" rel="noopener noreferrer" />}
        >
          <FileText />
          {t('report')}
        </Button>
      ) : null}
    </div>
  );
}

function Fact({ label, value, bad }: { label: string; value: string; bad?: boolean }) {
  return (
    <div className="bg-card rounded-md border px-2.5 py-2">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className={cn('tabular font-medium', bad && 'text-danger-ink')}>{value}</dd>
    </div>
  );
}

/** Staff: pick the inspector for a pending inspection. */
function AssignInspector({ inspection }: { inspection: OrderInspection }) {
  const t = useTranslations('qc.assign');
  const inspectors = useInspectors(inspection.result === 'PENDING');
  const assign = useAssignInspection();
  if (inspection.result !== 'PENDING') {
    return inspection.inspector ? (
      <p className="text-muted-foreground text-xs">{t('by', { name: inspection.inspector })}</p>
    ) : null;
  }
  const active = (inspectors.data ?? []).filter((i) => i.active);
  const current = active.find((i) => i.name === inspection.inspector)?.id ?? '';
  return (
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor={`assign-${inspection.id}`} className="text-muted-foreground text-xs">
        {t('label')}
      </label>
      <Select
        items={active.map((i) => ({ value: i.id, label: i.name }))}
        value={current}
        onValueChange={(id) => {
          if (typeof id !== 'string' || !id) return;
          assign.mutate(
            { id: inspection.id, dto: { inspectorId: id } },
            {
              onSuccess: () => toast.success(t('done')),
              onError: () => toast.error(t('failed')),
            },
          );
        }}
      >
        <SelectTrigger id={`assign-${inspection.id}`} size="sm" className="min-w-44">
          <SelectValue
            placeholder={
              inspectors.isPending
                ? t('loading')
                : inspectors.isError
                  ? t('loadFailed')
                  : t('placeholder')
            }
          />
        </SelectTrigger>
        <SelectContent>
          {active.map((i) => (
            <SelectItem key={i.id} value={i.id}>
              {i.name} · {t('open', { count: i.openInspections })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function BookInspectionDialog({
  code,
  types,
  open,
  onClose,
}: {
  code: string;
  types: BookableType[];
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('qc.book');
  const tq = useTranslations('qc');
  const tc = useTranslations('common');
  const book = useBookInspection(code);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<BookInspectionInput, unknown, BookInspectionDto>({
    resolver: zodResolver(BookInspectionSchema),
    values: { type: types[0] ?? 'PRE_SHIPMENT', scheduledAt: '' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('body')}</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-5"
          noValidate
          onSubmit={(e) =>
            void form.handleSubmit(async (dto) => {
              try {
                await book.mutateAsync(dto);
                toast.success(t('done'));
                onClose();
              } catch (err) {
                setError(
                  applyServerErrors(err, form.setError, ['scheduledAt'], tc('networkError')),
                );
              }
            })(e)
          }
        >
          <FormAlert message={error} />
          <FieldGroup>
            {types.length > 1 ? (
              <Field>
                <FieldLabel>{t('type')}</FieldLabel>
                <Controller
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={(v) => {
                        const type = types.find((x) => x === v);
                        if (type) field.onChange(type);
                      }}
                    >
                      {types.map((type) => (
                        <label
                          key={type}
                          className="has-data-checked:border-primary flex cursor-pointer gap-3 rounded-lg border p-3"
                        >
                          <RadioGroupItem value={type} />
                          <span className="space-y-0.5">
                            <span className="block text-sm font-medium">{tq(`types.${type}`)}</span>
                            <span className="text-muted-foreground block text-xs">
                              {tq(`typeHints.${type}`)}
                            </span>
                          </span>
                        </label>
                      ))}
                    </RadioGroup>
                  )}
                />
              </Field>
            ) : (
              <p className="text-sm">
                <span className="font-medium">{tq(`types.${types[0] ?? 'PRE_SHIPMENT'}`)}</span>
                <span className="text-muted-foreground block text-xs">
                  {tq(`typeHints.${types[0] ?? 'PRE_SHIPMENT'}`)}
                </span>
              </p>
            )}
            <Field data-invalid={!!errors.scheduledAt}>
              <FieldLabel htmlFor="insp-date">{t('date')}</FieldLabel>
              <Input id="insp-date" type="date" {...form.register('scheduledAt')} />
              <FieldError errors={[errors.scheduledAt]} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {tc('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {t('submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/** Staff rate the inspector's work once; repeated low scores suspend a gig inspector. */
function RateInspector({ inspection: i }: { inspection: OrderInspection }) {
  const t = useTranslations('qc');
  const me = useMe();
  const rate = useRateInspection();
  if (me.data?.role !== 'ADMIN' || !i.inspector) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted-foreground">{t('rating.label')}</span>
      <div role="group" aria-label={t('rating.label')} className="flex">
        {[1, 2, 3, 4, 5].map((n) => {
          const on = i.rating !== null && n <= i.rating;
          return (
            <button
              key={n}
              type="button"
              disabled={i.rating !== null || rate.isPending}
              aria-label={t('rating.star', { n })}
              aria-pressed={on}
              onClick={() =>
                rate
                  .mutateAsync({ id: i.id, rating: n })
                  .then(() => toast.success(t('rating.saved')))
                  .catch(() => toast.error(t('rating.failed')))
              }
              className="text-muted-foreground hover:text-warning-ink focus-visible:ring-ring/40 flex size-11 items-center justify-center rounded-md outline-none focus-visible:ring-3 disabled:cursor-default md:size-7"
            >
              <Star
                className={cn('size-4', on && 'fill-current text-warning-ink')}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
