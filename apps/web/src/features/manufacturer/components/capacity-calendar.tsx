'use client';

import {
  type CapacityMonth,
  type UpdateCapacityMonthDto,
  type UpdateCapacityMonthInput,
  UpdateCapacityMonthSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarRange, Factory, Pencil, TrendingUp, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatCard } from '@/components/patterns/stat-card';
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
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import { useCapacity, useUpdateCapacityMonth } from '../api';

const monthDate = (month: string) => new Date(`${month}-01T00:00:00Z`);

export function CapacityCalendar() {
  const t = useTranslations('manufacturer.capacity');
  const format = useFormatter();
  const calendar = useCapacity(12);
  const [editing, setEditing] = useState<CapacityMonth | null>(null);
  const monthLabel = (month: string, style: 'short' | 'long' = 'long') =>
    format.dateTime(monthDate(month), { month: style, year: 'numeric', timeZone: 'UTC' });

  if (calendar.isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-72" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }
  if (calendar.isError) {
    return <ErrorState onRetry={() => void calendar.refetch()} retrying={calendar.isFetching} />;
  }

  const { months, defaultMonthlyCapacityPcs } = calendar.data;
  const booked = (m: CapacityMonth) => m.platformBookedPcs + m.externalBookedPcs;
  const free = (m: CapacityMonth) => Math.max(m.availablePcs - booked(m), 0);
  const scale = Math.max(...months.map((m) => Math.max(m.availablePcs, booked(m))), 1);
  const nextQuarterFree = months.slice(0, 3).reduce((sum, m) => sum + free(m), 0);
  const utilisation = (m: CapacityMonth) => (m.availablePcs > 0 ? booked(m) / m.availablePcs : 0);
  let peak: CapacityMonth | null = null;
  for (const m of months) if (!peak || utilisation(m) > utilisation(peak)) peak = m;
  const platformTotal = months.reduce((sum, m) => sum + m.platformBookedPcs, 0);

  return (
    <div className="space-y-8">
      <PageHeader
        title={t('title')}
        description={t('description')}
        eyebrow={
          defaultMonthlyCapacityPcs !== null
            ? t('default', { count: defaultMonthlyCapacityPcs })
            : undefined
        }
      />

      {defaultMonthlyCapacityPcs === null ? (
        <EmptyState
          icon={Factory}
          title={t('noDefault')}
          action={<Button render={<Link href="/manufacturer/profile" />}>{t('title')}</Button>}
        />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label={t('nextQuarterFree')}
          value={format.number(nextQuarterFree)}
          icon={CalendarRange}
          hint="pcs"
        />
        <StatCard
          label={t('peakMonth')}
          value={peak ? monthLabel(peak.month, 'short') : '—'}
          icon={TrendingUp}
          hint={
            peak && peak.availablePcs > 0
              ? t('utilisation', { percent: Math.round((booked(peak) / peak.availablePcs) * 100) })
              : undefined
          }
        />
        <StatCard
          label={t('platformBooked')}
          value={format.number(platformTotal)}
          icon={Factory}
          hint="pcs"
        />
      </div>

      <section className="bg-card rounded-xl border shadow-xs">
        <div className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-2 border-b px-4 py-3 text-xs sm:px-5">
          <Legend className="bg-primary" label={t('booked')} />
          <Legend className="bg-progress" label={t('external')} />
          <Legend className="bg-muted ring-border ring-1 ring-inset" label={t('free')} />
        </div>
        <ul className="divide-y">
          {months.map((m) => {
            const total = booked(m);
            const over = total - m.availablePcs;
            const percent = m.availablePcs > 0 ? Math.round((total / m.availablePcs) * 100) : 0;
            const width = (value: number) => `${String((value / scale) * 100)}%`;
            return (
              <li
                key={m.month}
                className="grid gap-3 px-4 py-4 sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-center sm:px-5"
              >
                <div className="flex items-center justify-between sm:block">
                  <p className="font-medium">{monthLabel(m.month)}</p>
                  <p className="text-muted-foreground text-xs">
                    {m.isOverride ? `${t('override')} · ` : ''}
                    {format.number(m.availablePcs)} pcs
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div
                    className="bg-muted relative h-3 overflow-hidden rounded-full"
                    role="img"
                    aria-label={`${monthLabel(m.month)}: ${t('booked')} ${format.number(m.platformBookedPcs)}, ${t('external')} ${format.number(m.externalBookedPcs)}, ${t('available')} ${format.number(m.availablePcs)}`}
                  >
                    {/* Available capacity marker */}
                    <span
                      className="bg-card absolute inset-y-0 start-0 rounded-full ring-1 ring-border ring-inset"
                      style={{ width: width(m.availablePcs) }}
                    />
                    <span
                      className="absolute inset-y-0 start-0 flex"
                      style={{ width: width(total) }}
                    >
                      <span
                        className="bg-primary h-full"
                        style={{
                          width: total ? `${String((m.platformBookedPcs / total) * 100)}%` : 0,
                        }}
                      />
                      <span className="bg-progress h-full flex-1" />
                    </span>
                  </div>
                  <p
                    className={cn(
                      'text-xs',
                      over > 0 ? 'text-danger-ink font-medium' : 'text-muted-foreground',
                    )}
                  >
                    {over > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <TriangleAlert className="size-3" aria-hidden="true" />
                        {t('overbooked', { count: over })}
                      </span>
                    ) : (
                      <>
                        {t('utilisation', { percent })} · {format.number(free(m))}{' '}
                        {t('free').toLowerCase()}
                      </>
                    )}
                    {m.note ? <span className="text-subtle-foreground"> · {m.note}</span> : null}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-self-start sm:justify-self-end"
                  onClick={() => setEditing(m)}
                >
                  <Pencil />
                  <span className="sr-only sm:not-sr-only">
                    {t('edit', { month: monthLabel(m.month, 'short') })}
                  </span>
                </Button>
              </li>
            );
          })}
        </ul>
      </section>

      <EditMonthDialog
        month={editing}
        title={editing ? t('editTitle', { month: monthLabel(editing.month) }) : ''}
        onClose={() => setEditing(null)}
      />
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('size-2.5 rounded-sm', className)} aria-hidden="true" />
      {label}
    </span>
  );
}

function EditMonthDialog({
  month,
  title,
  onClose,
}: {
  month: CapacityMonth | null;
  title: string;
  onClose: () => void;
}) {
  const t = useTranslations('manufacturer.capacity');
  const tc = useTranslations('common');
  const update = useUpdateCapacityMonth();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<UpdateCapacityMonthInput, unknown, UpdateCapacityMonthDto>({
    resolver: zodResolver(UpdateCapacityMonthSchema),
    values: month
      ? {
          availablePcs: month.isOverride ? month.availablePcs : '',
          externalBookedPcs: month.externalBookedPcs,
          note: month.note ?? '',
        }
      : undefined,
  });
  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (dto) => {
    if (!month) return;
    setFormError(null);
    try {
      await update.mutateAsync({ month: month.month, dto });
      toast.success(t('saved'));
      onClose();
    } catch (error) {
      setFormError(
        applyServerErrors(
          error,
          form.setError,
          ['availablePcs', 'externalBookedPcs', 'note'],
          tc('networkError'),
        ),
      );
    }
  });

  return (
    <Dialog open={month !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <form onSubmit={onSubmit} noValidate className="grid gap-5">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{t('description')}</DialogDescription>
          </DialogHeader>
          <FormAlert message={formError} />
          <FieldGroup>
            <Field data-invalid={!!errors.availablePcs}>
              <FieldLabel htmlFor="availablePcs">{t('availableLabel')}</FieldLabel>
              <Input id="availablePcs" inputMode="numeric" {...form.register('availablePcs')} />
              <FieldDescription>{t('availableHint')}</FieldDescription>
              <FieldError errors={[errors.availablePcs]} />
            </Field>
            <Field data-invalid={!!errors.externalBookedPcs}>
              <FieldLabel htmlFor="externalBookedPcs">{t('externalLabel')}</FieldLabel>
              <Input
                id="externalBookedPcs"
                inputMode="numeric"
                {...form.register('externalBookedPcs')}
              />
              <FieldError errors={[errors.externalBookedPcs]} />
            </Field>
            <Field data-invalid={!!errors.note}>
              <FieldLabel htmlFor="note">{t('note')}</FieldLabel>
              <Input id="note" placeholder={t('notePlaceholder')} {...form.register('note')} />
              <FieldError errors={[errors.note]} />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {tc('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? tc('saving') : t('save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
