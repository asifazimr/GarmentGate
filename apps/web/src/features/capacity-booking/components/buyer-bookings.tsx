'use client';

import {
  type BuyerBooking,
  type BuyerPartnership,
  BookingReasonSchema,
  dateOnly,
} from '@garmentgate/shared';
import { CalendarClock, ChevronRight, Handshake } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { ApiError } from '@/lib/api';
import { useMoney } from '@/lib/use-money';
import { useCancelPartnership, useCapacityOverview } from '../api';
import { Countdown, MinutesLabel } from './parts';

/** The buyer's capacity dashboard: holds with their countdown, confirmed slots to convert, partnerships. */
export function BuyerBookings({ onFind }: { onFind: () => void }) {
  const t = useTranslations('capacityBooking.dashboard');
  const overview = useCapacityOverview();
  if (overview.isPending)
    return (
      <div className="space-y-3" aria-busy="true">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  if (overview.isError)
    return <ErrorState onRetry={() => void overview.refetch()} retrying={overview.isFetching} />;
  const { bookings, partnerships } = overview.data;
  if (bookings.length === 0 && partnerships.length === 0)
    return (
      <EmptyState
        icon={CalendarClock}
        title={t('emptyTitle')}
        description={t('emptyBody')}
        action={<Button onClick={onFind}>{t('find')}</Button>}
      />
    );
  const live = bookings.filter((b) => ['HELD', 'CONFIRMED', 'IN_PRODUCTION'].includes(b.status));
  const past = bookings.filter((b) => !live.includes(b));
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="font-semibold">{t('active')}</h2>
        {live.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('noActive')}</p>
        ) : (
          <ul className="space-y-3">
            {live.map((b) => (
              <li key={b.code}>
                <BookingCard booking={b} />
              </li>
            ))}
          </ul>
        )}
      </section>
      {partnerships.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-semibold">{t('partnerships')}</h2>
          <ul className="space-y-3">
            {partnerships.map((p) => (
              <li key={p.code}>
                <PartnershipCard partnership={p} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {past.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-muted-foreground font-semibold">{t('past')}</h2>
          <ul className="space-y-3">
            {past.map((b) => (
              <li key={b.code}>
                <BookingCard booking={b} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

/** One booking: what it is, and the deadline that matters now. */
export function BookingCard({ booking: b }: { booking: BuyerBooking }) {
  const t = useTranslations('capacityBooking.dashboard');
  const format = useFormatter();
  const showMoney = useMoney();
  const range = format.dateTimeRange(dateOnly(b.startDate), dateOnly(b.endDate), {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });
  return (
    <Link
      href={`/buyer/capacity/bookings/${b.code}`}
      className="bg-card hover:border-border-strong flex items-center gap-4 rounded-xl border p-4 shadow-xs transition-shadow outline-none hover:shadow-md focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="code">{b.code}</Badge>
          <StatusBadge domain="booking" status={b.status} />
          <span className="text-muted-foreground text-xs">
            {b.manufacturer.publicCode} · {b.category.name}
          </span>
        </div>
        <p className="text-sm">
          {range} ·{' '}
          <MinutesLabel minutes={b.minutes - b.returnedMinutes} pieces={b.estimatedPieces} />
          <span className="text-muted-foreground">
            {' '}
            · {showMoney(b.buyerAmountMinor, b.currency)}
          </span>
        </p>
        {b.nextAction ? (
          <p className="text-sm font-medium">
            {t(`next.${b.nextAction}`)}
            {b.status === 'HELD' ? (
              <>
                {' · '}
                <span className="text-warning-ink">
                  {t('holdEnds')} <Countdown to={b.holdExpiresAt} />
                </span>
              </>
            ) : b.nextAction === 'CONVERT' ? (
              <>
                {' · '}
                <span className="text-warning-ink">
                  {t('convertBy', {
                    date: format.dateTime(dateOnly(b.convertBy), {
                      dateStyle: 'medium',
                      timeZone: 'UTC',
                    }),
                  })}{' '}
                  (<Countdown to={`${b.convertBy}T00:00:00Z`} />)
                </span>
              </>
            ) : null}
          </p>
        ) : null}
      </div>
      <ChevronRight
        className="text-subtle-foreground size-4 shrink-0 rtl:rotate-180"
        aria-hidden="true"
      />
    </Link>
  );
}

function PartnershipCard({ partnership: p }: { partnership: BuyerPartnership }) {
  const t = useTranslations('capacityBooking.dashboard');
  const format = useFormatter();
  const showMoney = useMoney();
  const [cancelling, setCancelling] = useState(false);
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <Handshake className="size-4" aria-hidden="true" />
          <Badge variant="code">{p.code}</Badge>
          <StatusBadge domain="partnership" status={p.status} />
          <span className="text-muted-foreground text-xs font-normal">
            {p.manufacturer.publicCode} · {p.category.name}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">
          {t('partnershipTerms', {
            minutes: format.number(p.monthlyMinutes),
            months: p.months,
            start: format.dateTime(dateOnly(`${p.startMonth}-01`), {
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC',
            }),
          })}{' '}
          <span className="text-muted-foreground">
            · {t('perMonth', { amount: showMoney(p.monthlyAmountMinor, p.currency) })}
          </span>
        </p>
        {p.declineReason ? <p className="text-danger-ink text-sm">{p.declineReason}</p> : null}
        {p.bookings.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {p.bookings.map((b) => (
              <li key={b.code}>
                <Link
                  href={`/buyer/capacity/bookings/${b.code}`}
                  className="hover:bg-muted inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2 text-xs"
                >
                  {format.dateTime(dateOnly(b.startDate), { month: 'short', timeZone: 'UTC' })}
                  <StatusBadge domain="booking" status={b.status} />
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        {p.status === 'REQUESTED' || p.status === 'ACTIVE' ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-danger-ink"
            onClick={() => setCancelling(true)}
          >
            {t('cancelPartnership')}
          </Button>
        ) : null}
      </CardContent>
      <CancelPartnershipDialog
        code={cancelling ? p.code : null}
        onClose={() => setCancelling(false)}
      />
    </Card>
  );
}

function CancelPartnershipDialog({ code, onClose }: { code: string | null; onClose: () => void }) {
  const t = useTranslations('capacityBooking.dashboard');
  const tc = useTranslations('common');
  const cancel = useCancelPartnership();
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const submit = async () => {
    if (!code) return;
    const parsed = BookingReasonSchema.safeParse({ reason });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? null);
      return;
    }
    try {
      await cancel.mutateAsync({ code, reason: parsed.data.reason });
      toast.success(t('partnershipCancelled'));
      onClose();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : tc('networkError'));
    }
  };
  return (
    <Dialog open={code !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('cancelPartnershipTitle')}</DialogTitle>
          <DialogDescription>{t('cancelPartnershipBody')}</DialogDescription>
        </DialogHeader>
        <Field data-invalid={!!error}>
          <FieldLabel htmlFor="pc-reason">{t('reason')}</FieldLabel>
          <Textarea
            id="pc-reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <FieldError>{error}</FieldError>
        </Field>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button variant="destructive" disabled={cancel.isPending} onClick={() => void submit()}>
            {t('cancelPartnership')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
