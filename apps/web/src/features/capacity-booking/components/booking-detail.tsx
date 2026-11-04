'use client';

import { BookingReasonSchema, type BuyerBooking, dateOnly } from '@garmentgate/shared';
import { ArrowLeft, Clock, FileText, Package } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { useBuyerBooking, useCancelBooking } from '../api';
import { ConvertDialog } from './convert-dialog';
import { Countdown, DepositPanel, MinutesLabel } from './parts';

export function BookingDetail({ code }: { code: string }) {
  const t = useTranslations('capacityBooking.detail');
  const booking = useBuyerBooking(code);
  if (booking.isPending)
    return (
      <div className="space-y-4" aria-busy="true">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    );
  if (booking.isError)
    return <ErrorState onRetry={() => void booking.refetch()} retrying={booking.isFetching} />;
  const b = booking.data;
  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" render={<Link href="/buyer/capacity?tab=bookings" />}>
        <ArrowLeft className="rtl:rotate-180" />
        {t('back')}
      </Button>
      <PageHeader
        eyebrow={`${b.manufacturer.publicCode} · ${b.category.name}`}
        title={
          <span className="flex flex-wrap items-center gap-2">
            {b.code}
            <StatusBadge domain="booking" status={b.status} />
          </span>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <NextStep booking={b} />
          <Summary booking={b} />
        </div>
        <Policy booking={b} />
      </div>
    </div>
  );
}

function NextStep({ booking: b }: { booking: BuyerBooking }) {
  const t = useTranslations('capacityBooking.detail');
  const format = useFormatter();
  const [paying, setPaying] = useState(false);
  const [converting, setConverting] = useState(false);
  if (!b.nextAction) {
    if (b.status === 'CANCELLED' || b.status === 'EXPIRED')
      return (
        <Alert>
          <AlertTitle>{t(`ended.${b.status}`)}</AlertTitle>
          <AlertDescription>
            {b.cancelReason}
            {b.refundMinor !== null && b.refundMinor > 0 ? (
              <RefundLine amount={b.refundMinor} currency={b.currency} />
            ) : null}
          </AlertDescription>
        </Alert>
      );
    return null;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          {t(`next.${b.nextAction}.title`)}
          {b.status === 'HELD' ? (
            <Badge variant="warning">
              <Clock aria-hidden="true" />
              <Countdown to={b.holdExpiresAt} />
            </Badge>
          ) : b.nextAction === 'CONVERT' ? (
            <Badge variant="warning">
              {t('convertBy', {
                date: format.dateTime(dateOnly(b.convertBy), {
                  dateStyle: 'medium',
                  timeZone: 'UTC',
                }),
              })}
            </Badge>
          ) : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">{t(`next.${b.nextAction}.body`)}</p>
        {b.nextAction === 'PAY_DEPOSIT' ? (
          paying ? (
            <DepositPanel code={b.code} onSent={() => setPaying(false)} />
          ) : (
            <Button onClick={() => setPaying(true)}>{t('pay')}</Button>
          )
        ) : null}
        {b.nextAction === 'CONVERT' ? (
          <>
            <Button onClick={() => setConverting(true)}>
              <Package />
              {t('convert')}
            </Button>
            <ConvertDialog booking={b} open={converting} onClose={() => setConverting(false)} />
          </>
        ) : null}
        {b.nextAction === 'AWAIT_QUOTE' && b.rfqCode ? (
          <Button variant="outline" render={<Link href={`/buyer/rfqs/${b.rfqCode}`} />}>
            <FileText />
            {t('openRfq', { code: b.rfqCode })}
          </Button>
        ) : null}
        {b.nextAction === 'TRACK_ORDER' && b.order ? (
          <Button variant="outline" render={<Link href={`/buyer/orders/${b.order.code}`} />}>
            <Package />
            {t('openOrder', { code: b.order.code })}
          </Button>
        ) : null}
      </CardContent>
    </Card>
  );
}

function RefundLine({ amount, currency }: { amount: number; currency: string }) {
  const t = useTranslations('capacityBooking.detail');
  const showMoney = useMoney();
  return <span className="block">{t('refunded', { amount: showMoney(amount, currency) })}</span>;
}

function Summary({ booking: b }: { booking: BuyerBooking }) {
  const t = useTranslations('capacityBooking.detail');
  const format = useFormatter();
  const showMoney = useMoney();
  const rows: [string, React.ReactNode][] = [
    [
      t('dates'),
      format.dateTimeRange(dateOnly(b.startDate), dateOnly(b.endDate), {
        dateStyle: 'medium',
        timeZone: 'UTC',
      }),
    ],
    [t('minutes'), <MinutesLabel key="m" minutes={b.minutes} pieces={b.estimatedPieces} />],
    ...(b.returnedMinutes > 0
      ? ([[t('returned'), <MinutesLabel key="r" minutes={b.returnedMinutes} />]] as [
          string,
          React.ReactNode,
        ][])
      : []),
    ...(b.samPerPiece !== null
      ? ([[t('sam'), format.number(b.samPerPiece, { maximumFractionDigits: 2 })]] as [
          string,
          React.ReactNode,
        ][])
      : []),
    [t('rate'), showMoney(b.buyerRateMinorPer100Min, b.currency)],
    [t('total'), showMoney(b.buyerAmountMinor, b.currency)],
    [
      t('deposit'),
      `${showMoney(b.depositPaidMinor, b.currency)} / ${showMoney(b.depositMinor, b.currency)}`,
    ],
    [t('factory'), b.factoryAccepted ? t('accepted') : t('waiting')],
  ];
  return (
    <Card>
      <CardContent>
        <dl className="divide-y">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4 py-2 text-sm">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="tabular text-end font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        {b.partnershipCode ? (
          <p className="text-muted-foreground mt-3 text-xs">
            {t('partOf', { code: b.partnershipCode })}
          </p>
        ) : null}
        {b.depositPending ? <p className="text-info-ink mt-3 text-sm">{t('checking')}</p> : null}
      </CardContent>
    </Card>
  );
}

function Policy({ booking: b }: { booking: BuyerBooking }) {
  const t = useTranslations('capacityBooking.detail');
  const format = useFormatter();
  const showMoney = useMoney();
  const [open, setOpen] = useState(false);
  const cancellable = (b.status === 'HELD' || b.status === 'CONFIRMED') && !b.conversionMode;
  return (
    <Card size="sm" className="h-fit">
      <CardHeader>
        <CardTitle>{t('policy')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <ul className="text-muted-foreground space-y-1">
          <li>{t('heldFree')}</li>
          {b.cancellationTiers.map((tier) => (
            <li key={tier.minDaysBefore}>
              {t('tier', {
                days: tier.minDaysBefore,
                percent: format.number(tier.refundBps / 10_000, { style: 'percent' }),
              })}
            </li>
          ))}
        </ul>
        {cancellable ? (
          <>
            <p>{t('refundToday', { amount: showMoney(b.refundIfCancelledMinor, b.currency) })}</p>
            <Button
              variant="outline"
              className="text-danger-ink w-full"
              onClick={() => setOpen(true)}
            >
              {t('cancel')}
            </Button>
            <CancelDialog code={open ? b.code : null} onClose={() => setOpen(false)} />
          </>
        ) : null}
      </CardContent>
    </Card>
  );
}

function CancelDialog({ code, onClose }: { code: string | null; onClose: () => void }) {
  const t = useTranslations('capacityBooking.detail');
  const tc = useTranslations('common');
  const cancel = useCancelBooking(code ?? '');
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const submit = async () => {
    const parsed = BookingReasonSchema.safeParse({ reason });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? null);
      return;
    }
    try {
      await cancel.mutateAsync(parsed.data.reason);
      toast.success(t('cancelled'));
      onClose();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : tc('networkError'));
    }
  };
  return (
    <Dialog open={code !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('cancelTitle')}</DialogTitle>
          <DialogDescription>{t('cancelBody')}</DialogDescription>
        </DialogHeader>
        <Field data-invalid={!!error}>
          <FieldLabel htmlFor="bk-reason">{t('reason')}</FieldLabel>
          <Textarea
            id="bk-reason"
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
            {t('cancel')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
