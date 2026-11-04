'use client';

import {
  BookingReasonSchema,
  dateOnly,
  type ManufacturerBooking,
  type ManufacturerPartnership,
} from '@garmentgate/shared';
import { ArrowLeft, Check, Clock, Handshake, Inbox, X } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { useAnswerRequest, useBookingInbox, useFactoryBooking } from '../api';
import { Countdown, MinutesLabel } from './parts';

interface Target {
  kind: 'bookings' | 'partnerships';
  code: string;
}

/** Booking and partnership requests waiting for an answer, then everything booked on the lines. */
export function BookingInbox() {
  const t = useTranslations('capacityBooking.inbox');
  const inbox = useBookingInbox();
  const [declining, setDeclining] = useState<Target | null>(null);
  if (inbox.isPending)
    return (
      <div className="space-y-3" aria-busy="true">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
    );
  if (inbox.isError)
    return <ErrorState onRetry={() => void inbox.refetch()} retrying={inbox.isFetching} />;
  const { bookings, partnerships } = inbox.data;
  const open = bookings.filter(
    (b) => b.status === 'HELD' && !b.accepted && b.kind !== 'PARTNERSHIP',
  );
  const openPartnerships = partnerships.filter((p) => p.status === 'REQUESTED');
  const rest = bookings.filter((b) => !open.includes(b));
  if (bookings.length === 0 && partnerships.length === 0)
    return <EmptyState icon={Inbox} title={t('emptyTitle')} description={t('emptyBody')} />;
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="font-semibold">
          {t('toAnswer', { count: open.length + openPartnerships.length })}
        </h2>
        {open.length + openPartnerships.length === 0 ? (
          <p className="text-muted-foreground text-sm">{t('allAnswered')}</p>
        ) : (
          <ul className="space-y-3">
            {open.map((b) => (
              <li key={b.code}>
                <BookingRow
                  booking={b}
                  onDecline={() => setDeclining({ kind: 'bookings', code: b.code })}
                />
              </li>
            ))}
            {openPartnerships.map((p) => (
              <li key={p.code}>
                <PartnershipRow
                  partnership={p}
                  onDecline={() => setDeclining({ kind: 'partnerships', code: p.code })}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
      {rest.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-semibold">{t('booked')}</h2>
          <ul className="space-y-3">
            {rest.map((b) => (
              <li key={b.code}>
                <BookingRow booking={b} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {partnerships.some((p) => p.status !== 'REQUESTED') ? (
        <section className="space-y-3">
          <h2 className="font-semibold">{t('partnerships')}</h2>
          <ul className="space-y-3">
            {partnerships
              .filter((p) => p.status !== 'REQUESTED')
              .map((p) => (
                <li key={p.code}>
                  <PartnershipRow partnership={p} />
                </li>
              ))}
          </ul>
        </section>
      ) : null}
      <DeclineDialog target={declining} onClose={() => setDeclining(null)} />
    </div>
  );
}

function Dates({ start, end }: { start: string; end: string }) {
  const format = useFormatter();
  return (
    <>
      {format.dateTimeRange(dateOnly(start), dateOnly(end), {
        day: 'numeric',
        month: 'short',
        timeZone: 'UTC',
      })}
    </>
  );
}

export function BookingRow({
  booking: b,
  onDecline,
}: {
  booking: ManufacturerBooking;
  onDecline?: () => void;
}) {
  const t = useTranslations('capacityBooking.inbox');
  const showMoney = useMoney();
  const answer = useAnswerRequest();
  const accept = () =>
    answer.mutate(
      { kind: 'bookings', code: b.code, verdict: 'accept' },
      {
        onSuccess: () => toast.success(t('accepted')),
        onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
      },
    );
  return (
    <Card size="sm">
      <CardContent className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="code">{b.code}</Badge>
            <StatusBadge domain="booking" status={b.status} />
            <span className="text-muted-foreground text-xs">
              {b.buyer.code} · {t('lineLabel', { code: b.line.code })} · {b.category.name}
            </span>
          </div>
          <p className="text-sm">
            <Dates start={b.startDate} end={b.endDate} /> ·{' '}
            <MinutesLabel minutes={b.minutes - b.returnedMinutes} pieces={b.estimatedPieces} />
            <span className="text-muted-foreground">
              {' · '}
              {showMoney(b.factoryAmountMinor, b.currency)}
            </span>
          </p>
          {b.note ? <p className="text-muted-foreground text-sm italic">“{b.note}”</p> : null}
          {b.status === 'HELD' ? (
            <p className="text-warning-ink flex items-center gap-1 text-xs">
              <Clock className="size-3" aria-hidden="true" />
              {b.accepted ? t('awaitingDeposit') : t('answerWithin')}{' '}
              <Countdown to={b.holdExpiresAt} />
            </p>
          ) : null}
          {b.compensationMinor ? (
            <p className="text-success-ink text-xs">
              {t('compensation', { amount: showMoney(b.compensationMinor, b.currency) })}
            </p>
          ) : null}
          {b.cancelReason ? (
            <p className="text-muted-foreground text-xs">{b.cancelReason}</p>
          ) : null}
          {b.orderCode ? (
            <Link
              href={`/manufacturer/orders/${b.orderCode}`}
              className="text-primary-ink text-xs underline"
            >
              {t('order', { code: b.orderCode })}
            </Link>
          ) : null}
        </div>
        {onDecline ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onDecline}>
              <X />
              {t('decline')}
            </Button>
            <Button size="sm" disabled={answer.isPending} onClick={accept}>
              <Check />
              {t('accept')}
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function PartnershipRow({
  partnership: p,
  onDecline,
}: {
  partnership: ManufacturerPartnership;
  onDecline?: () => void;
}) {
  const t = useTranslations('capacityBooking.inbox');
  const format = useFormatter();
  const showMoney = useMoney();
  const answer = useAnswerRequest();
  const accept = () =>
    answer.mutate(
      { kind: 'partnerships', code: p.code, verdict: 'accept' },
      {
        onSuccess: () => toast.success(t('accepted')),
        onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
      },
    );
  return (
    <Card size="sm">
      <CardContent className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Handshake className="size-4" aria-hidden="true" />
            <Badge variant="code">{p.code}</Badge>
            <StatusBadge domain="partnership" status={p.status} />
            <span className="text-muted-foreground text-xs">
              {p.buyer.code} · {t('lineLabel', { code: p.line.code })} · {p.category.name}
            </span>
          </div>
          <p className="text-sm">
            {t('partnershipTerms', {
              minutes: format.number(p.monthlyMinutes),
              months: p.months,
              start: format.dateTime(dateOnly(`${p.startMonth}-01`), {
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
              }),
            })}
            <span className="text-muted-foreground">
              {' · '}
              {t('perMonth', { amount: showMoney(p.monthlyAmountMinor, p.currency) })}
            </span>
          </p>
          {p.note ? <p className="text-muted-foreground text-sm italic">“{p.note}”</p> : null}
          {p.status === 'REQUESTED' ? (
            <p className="text-muted-foreground text-xs">{t('partnershipHint')}</p>
          ) : null}
        </div>
        {onDecline ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onDecline}>
              <X />
              {t('decline')}
            </Button>
            <Button size="sm" disabled={answer.isPending} onClick={accept}>
              <Check />
              {t('accept')}
            </Button>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function DeclineDialog({ target, onClose }: { target: Target | null; onClose: () => void }) {
  const t = useTranslations('capacityBooking.inbox');
  const tc = useTranslations('common');
  const answer = useAnswerRequest();
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const close = () => {
    setReason('');
    setError(null);
    onClose();
  };
  const submit = async () => {
    if (!target) return;
    const parsed = BookingReasonSchema.safeParse({ reason });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? null);
      return;
    }
    try {
      await answer.mutateAsync({ ...target, verdict: 'decline', reason: parsed.data.reason });
      toast.success(t('declined'));
      close();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : tc('networkError'));
    }
  };
  return (
    <Dialog open={target !== null} onOpenChange={(o) => !o && close()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('declineTitle')}</DialogTitle>
          <DialogDescription>{t('declineBody')}</DialogDescription>
        </DialogHeader>
        <Field data-invalid={!!error}>
          <FieldLabel htmlFor="dc-reason">{t('reason')}</FieldLabel>
          <Textarea
            id="dc-reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <FieldError>{error}</FieldError>
        </Field>
        <DialogFooter>
          <Button variant="outline" onClick={close}>
            {tc('cancel')}
          </Button>
          <Button variant="destructive" disabled={answer.isPending} onClick={() => void submit()}>
            {t('decline')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** One booking, from a notification link. */
export function FactoryBookingPage({ code }: { code: string }) {
  const t = useTranslations('capacityBooking.inbox');
  const booking = useFactoryBooking(code);
  const [declining, setDeclining] = useState(false);
  return (
    <div className="space-y-4">
      <Button
        variant="ghost"
        size="sm"
        render={<Link href="/manufacturer/capacity?tab=requests" />}
      >
        <ArrowLeft className="rtl:rotate-180" />
        {t('back')}
      </Button>
      {booking.isPending ? (
        <Skeleton className="h-32 rounded-xl" />
      ) : booking.isError ? (
        <ErrorState onRetry={() => void booking.refetch()} retrying={booking.isFetching} />
      ) : (
        <BookingRow
          booking={booking.data}
          onDecline={
            booking.data.status === 'HELD' &&
            !booking.data.accepted &&
            booking.data.kind !== 'PARTNERSHIP'
              ? () => setDeclining(true)
              : undefined
          }
        />
      )}
      <DeclineDialog
        target={declining ? { kind: 'bookings', code } : null}
        onClose={() => setDeclining(false)}
      />
    </div>
  );
}
