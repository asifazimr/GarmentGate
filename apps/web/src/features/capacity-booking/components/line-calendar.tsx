'use client';

import {
  type CapacitySlot,
  dateOnly,
  isoDate,
  type LineCalendar as LineCalendarData,
  type LineCalendarDay,
  type ManufacturerLine,
} from '@garmentgate/shared';
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Layers,
  Plus,
  Settings2,
} from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { type PointerEvent, useEffect, useRef, useState } from 'react';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { StatCard } from '@/components/patterns/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useTodayIso } from '@/lib/client-hooks';
import { currencyDigits } from '@/lib/format';
import { cn } from '@/lib/utils';
import { useLineCalendar } from '../api';
import { LineDialog } from './line-dialog';
import { SlotDialog, type SlotTarget } from './slot-dialog';

type View = 'month' | 'week';

const addDays = (iso: string, n: number) =>
  isoDate(new Date(dateOnly(iso).getTime() + n * 86_400_000));
const monthStart = (iso: string) => `${iso.slice(0, 7)}-01`;
const daysInMonth = (iso: string) => {
  const d = dateOnly(monthStart(iso));
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
};
const weekStart = (iso: string) => addDays(iso, -((dateOnly(iso).getUTCDay() + 6) % 7));
const addMonths = (iso: string, n: number) => {
  const d = dateOnly(monthStart(iso));
  return isoDate(new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1)));
};

function windowFor(view: View, anchor: string) {
  return view === 'month'
    ? { from: monthStart(anchor), days: daysInMonth(anchor) }
    : { from: weekStart(anchor), days: 7 };
}

const compact = (minutes: number, format: ReturnType<typeof useFormatter>) =>
  format.number(minutes, { notation: 'compact', maximumFractionDigits: 1 });

interface Drag {
  lineId: string;
  anchor: string;
  current: string;
}

/**
 * The factory's lines day by day. Drag across free days (or tap one on touch screens) to open a
 * window for capacity booking; click a window to adjust or close it.
 */
export function LineCalendar() {
  const t = useTranslations('capacityBooking.calendar');
  const format = useFormatter();
  const today = useTodayIso();
  const [view, setView] = useState<View>('month');
  const [anchor, setAnchor] = useState<string | null>(null);
  const base = anchor ?? today;
  const range = base ? windowFor(view, base) : null;
  const calendar = useLineCalendar(range?.from ?? null, range?.days ?? 31);
  const [editingLine, setEditingLine] = useState<ManufacturerLine | null | undefined>(undefined);
  const [slotTarget, setSlotTarget] = useState<SlotTarget | null>(null);

  if (!base || !range || calendar.isPending) return <CalendarSkeleton />;
  if (calendar.isError)
    return <ErrorState onRetry={() => void calendar.refetch()} retrying={calendar.isFetching} />;

  const data = calendar.data;
  const step = (dir: -1 | 1) =>
    setAnchor(view === 'month' ? addMonths(base, dir) : addDays(base, dir * 7));
  const title =
    view === 'month'
      ? format.dateTime(dateOnly(range.from), { month: 'long', year: 'numeric', timeZone: 'UTC' })
      : format.dateTimeRange(dateOnly(range.from), dateOnly(addDays(range.from, 6)), {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          timeZone: 'UTC',
        });

  const totals = data.lines.reduce(
    (acc, l) => {
      for (const d of l.days) {
        acc.capacity += d.capacityMinutes;
        acc.open += d.openMinutes;
        acc.booked += d.bookedMinutes;
      }
      return acc;
    },
    { capacity: 0, open: 0, booked: 0 },
  );

  const dialogs = (
    <>
      <LineDialog line={editingLine} onClose={() => setEditingLine(undefined)} />
      <SlotDialog target={slotTarget} onClose={() => setSlotTarget(null)} />
    </>
  );

  if (data.lines.length === 0) {
    return (
      <>
        <EmptyState
          icon={Layers}
          title={t('emptyTitle')}
          description={t('emptyBody')}
          action={
            <Button onClick={() => setEditingLine(null)}>
              <Plus />
              {t('addLine')}
            </Button>
          }
        />
        {dialogs}
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label={t('openInView')}
          value={compact(totals.open, format)}
          icon={CalendarClock}
          hint={t('ofCapacity', { capacity: compact(totals.capacity, format) })}
        />
        <StatCard
          label={t('bookedInView')}
          value={compact(totals.booked, format)}
          icon={Gauge}
          hint={
            totals.open > 0
              ? t('utilisation', { percent: Math.round((totals.booked / totals.open) * 100) })
              : undefined
          }
        />
        <StatCard
          label={t('lines')}
          value={format.number(data.lines.length)}
          icon={Layers}
          hint={t('minutesUnit')}
        />
      </div>

      <section className="bg-card rounded-xl border shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 sm:px-5">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => step(-1)} aria-label={t('previous')}>
              <ChevronLeft className="rtl:rotate-180" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => step(1)} aria-label={t('next')}>
              <ChevronRight className="rtl:rotate-180" />
            </Button>
            <h2 className="ms-1 font-semibold" aria-live="polite">
              {title}
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setAnchor(null)}>
              {t('today')}
            </Button>
            <div role="group" aria-label={t('view')} className="bg-muted flex rounded-lg p-1">
              {(['month', 'week'] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => setView(v)}
                  className={cn(
                    'min-h-9 rounded-md px-3 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:min-h-7',
                    view === v
                      ? 'bg-card shadow-xs'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t(v)}
                </button>
              ))}
            </div>
            <Button size="sm" onClick={() => setEditingLine(null)}>
              <Plus />
              {t('addLine')}
            </Button>
          </div>
        </div>

        <div className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-2 border-b px-4 py-2.5 text-xs sm:px-5">
          <Legend className="bg-primary-soft ring-primary/30 ring-1 ring-inset" label={t('open')} />
          <Legend className="bg-primary" label={t('booked')} />
          <Legend className="bg-neutral-soft ring-border ring-1 ring-inset" label={t('closed')} />
          <Legend className="bg-muted bg-stripes" label={t('nonWorking')} />
          <span className="text-subtle-foreground">{t('dragHint')}</span>
        </div>

        <Grid
          data={data}
          view={view}
          today={today ?? range.from}
          onEditLine={setEditingLine}
          onSlot={setSlotTarget}
        />
      </section>
      {dialogs}
    </div>
  );
}

function Grid({
  data,
  view,
  today,
  onEditLine,
  onSlot,
}: {
  data: LineCalendarData;
  view: View;
  today: string;
  onEditLine: (line: ManufacturerLine) => void;
  onSlot: (target: SlotTarget) => void;
}) {
  const t = useTranslations('capacityBooking.calendar');
  const format = useFormatter();
  const [drag, setDrag] = useState<Drag | null>(null);
  const suppressClick = useRef(false);
  const dates = Array.from({ length: data.days }, (_, i) => addDays(data.from, i));
  const lines = new Map(data.lines.map((l) => [l.line.id, l.line]));

  // Finish a drag wherever the pointer is released.
  useEffect(() => {
    if (!drag) return;
    const finish = () => {
      const line = lines.get(drag.lineId);
      const [startDate, endDate] = [drag.anchor, drag.current].sort() as [string, string];
      setDrag(null);
      if (!line) return;
      suppressClick.current = true;
      onSlot({ kind: 'new', line, startDate, endDate });
    };
    window.addEventListener('pointerup', finish);
    return () => window.removeEventListener('pointerup', finish);
  });

  const inDrag = (lineId: string, date: string) => {
    if (drag?.lineId !== lineId) return false;
    const [a, b] = [drag.anchor, drag.current].sort() as [string, string];
    return date >= a && date <= b;
  };

  const moveDrag = (event: PointerEvent, lineId: string) => {
    if (drag?.lineId !== lineId) return;
    const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-date]');
    const date = cell?.getAttribute('data-date');
    const free = cell?.getAttribute('data-free') === 'true';
    if (date && free && date !== drag.current) setDrag({ ...drag, current: date });
  };

  const columns = `var(--label-width) repeat(${String(data.days)}, minmax(${view === 'month' ? '2.25rem' : '3.5rem'}, 1fr))`;

  return (
    <div className="overflow-x-auto [--label-width:7.5rem] sm:[--label-width:12rem]">
      <div
        role="table"
        aria-label={t('gridLabel')}
        aria-rowcount={data.lines.length + 1}
        className={cn('grid select-none', view === 'month' ? 'min-w-[56rem]' : 'min-w-[30rem]')}
        style={{ gridTemplateColumns: columns }}
      >
        <div role="row" className="contents">
          <div role="columnheader" className="bg-card sticky start-0 z-10 border-b" />
          {dates.map((date) => {
            const d = dateOnly(date);
            return (
              <div
                role="columnheader"
                key={date}
                className={cn(
                  'border-b py-2 text-center text-xs',
                  date === today ? 'text-primary-ink font-semibold' : 'text-muted-foreground',
                )}
              >
                <span className="block">
                  {format.dateTime(d, { weekday: 'narrow', timeZone: 'UTC' })}
                </span>
                <span className="tabular block text-sm">
                  {format.dateTime(d, { day: 'numeric', timeZone: 'UTC' })}
                </span>
              </div>
            );
          })}
        </div>

        {data.lines.map(({ line, slots, days }) => {
          const byDate = new Map(days.map((d) => [d.date, d]));
          const slotOn = (date: string): CapacitySlot | undefined =>
            slots.find((s) => s.startDate <= date && s.endDate >= date);
          return (
            <div
              role="row"
              key={line.id}
              className="contents"
              onPointerMove={(e) => moveDrag(e, line.id)}
            >
              <div
                role="rowheader"
                className="bg-card sticky start-0 z-10 flex items-center border-b border-e px-2 py-2 sm:px-4"
              >
                <button
                  type="button"
                  onClick={() => onEditLine(line)}
                  className="group hover:bg-muted -mx-1.5 flex w-full min-w-0 flex-col items-start gap-0.5 rounded-md px-1.5 py-1 text-start outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  aria-label={t('editLine', { code: line.code })}
                >
                  <span className="flex w-full items-center gap-1.5">
                    <Badge variant="code">{line.code}</Badge>
                    {line.status === 'PAUSED' ? (
                      <Badge variant="warning">{t('paused')}</Badge>
                    ) : null}
                    <Settings2
                      className="text-subtle-foreground ms-auto size-3.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="hidden w-full truncate text-sm font-medium sm:block">
                    {line.name}
                  </span>
                  <span className="text-muted-foreground tabular hidden text-xs sm:block">
                    {t('lineMeta', {
                      minutes: line.dailySamMinutes,
                      rate: format.number(
                        line.cmRateMinorPer100Min / 10 ** currencyDigits(line.currency),
                        { style: 'currency', currency: line.currency },
                      ),
                    })}
                  </span>
                </button>
              </div>
              {dates.map((date) => {
                const day = byDate.get(date);
                const slot = slotOn(date);
                const past = date < today;
                const free = !slot && !past && line.status === 'ACTIVE';
                return (
                  <DayCell
                    key={date}
                    date={date}
                    day={day}
                    slot={slot}
                    view={view}
                    free={free}
                    past={past}
                    today={date === today}
                    selected={inDrag(line.id, date)}
                    onPointerDown={(e) => {
                      if (!free || e.pointerType === 'touch' || e.button !== 0) return;
                      e.preventDefault();
                      setDrag({ lineId: line.id, anchor: date, current: date });
                    }}
                    onClick={() => {
                      if (suppressClick.current) {
                        suppressClick.current = false;
                        return;
                      }
                      if (slot) onSlot({ kind: 'edit', line, slot });
                      else if (free) onSlot({ kind: 'new', line, startDate: date, endDate: date });
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DayCell({
  date,
  day,
  slot,
  view,
  free,
  past,
  today,
  selected,
  onPointerDown,
  onClick,
}: {
  date: string;
  day: LineCalendarDay | undefined;
  slot: CapacitySlot | undefined;
  view: View;
  free: boolean;
  past: boolean;
  today: boolean;
  selected: boolean;
  onPointerDown: (e: PointerEvent<HTMLButtonElement>) => void;
  onClick: () => void;
}) {
  const t = useTranslations('capacityBooking.calendar');
  const format = useFormatter();
  const working = day?.working ?? false;
  const open = day?.openMinutes ?? 0;
  const booked = day?.bookedMinutes ?? 0;
  const closed = slot?.status === 'CLOSED';
  const label = [
    format.dateTime(dateOnly(date), { dateStyle: 'full', timeZone: 'UTC' }),
    !working
      ? t('nonWorking')
      : slot
        ? closed
          ? t('closed')
          : t('cellOpen', { open, booked })
        : past
          ? t('past')
          : t('cellFree'),
  ].join(': ');
  const interactive = free || !!slot;

  return (
    <div role="cell" className="border-b p-0.5">
      <button
        type="button"
        data-date={date}
        data-free={free}
        aria-label={label}
        disabled={!interactive}
        onPointerDown={onPointerDown}
        onClick={onClick}
        className={cn(
          'relative flex w-full flex-col justify-end overflow-hidden rounded-md text-[0.6875rem] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
          view === 'month' ? 'h-12' : 'h-20',
          !working && 'bg-muted bg-stripes',
          working && !slot && 'bg-surface',
          slot && !closed && 'bg-primary-soft ring-primary/25 ring-1 ring-inset',
          closed && 'bg-neutral-soft ring-border ring-1 ring-inset',
          free && 'hover:bg-primary-soft/60 cursor-cell',
          slot && 'hover:ring-primary/60 cursor-pointer',
          past && 'opacity-60',
          today && 'ring-primary ring-2 ring-inset',
          selected && 'bg-primary/20 ring-primary ring-2 ring-inset',
        )}
      >
        {slot && !closed && open > 0 ? (
          <span
            className="bg-primary absolute inset-x-0 bottom-0"
            style={{ height: `${String(Math.min(booked / open, 1) * 100)}%` }}
            aria-hidden="true"
          />
        ) : null}
        {view === 'week' && working && slot && !closed ? (
          <span className="tabular text-primary-ink relative px-1.5 pb-1 text-start font-medium">
            {format.number(open, { notation: 'compact' })}
          </span>
        ) : null}
      </button>
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

function CalendarSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-80 rounded-xl" />
    </div>
  );
}
