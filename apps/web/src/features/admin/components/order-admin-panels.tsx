'use client';

import {
  type OrderStatus,
  OrderStatusSchema,
  OverrideOrderStatusSchema,
  RefundSchema,
} from '@garmentgate/shared';
import { Undo2, Wrench } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { ErrorState } from '@/components/patterns/error-state';
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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { formatMoney, toMinor } from '@/lib/format';
import { useOrderFinance, useOverrideStatus, useRefund } from '../api';

const TARGETS = OrderStatusSchema.options.filter((s) => s !== 'DISPUTED');

/** Staff move an order outside the normal flow; the reason lands in its history and the audit log. */
export function OverrideStatusButton({ code, status }: { code: string; status: OrderStatus }) {
  const t = useTranslations('adminPanel.orders.override');
  const tst = useTranslations('statuses.order');
  const tc = useTranslations('common');
  const override = useOverrideStatus(code);
  const [open, setOpen] = useState(false);
  const [to, setTo] = useState<OrderStatus | ''>('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<{ to?: string; reason?: string; form?: string }>({});
  const close = () => {
    setOpen(false);
    setTo('');
    setReason('');
    setErrors({});
  };
  const submit = () => {
    const parsed = OverrideOrderStatusSchema.safeParse({ to: to || undefined, reason });
    if (!parsed.success) {
      const next: typeof errors = {};
      for (const issue of parsed.error.issues) {
        if (issue.path[0] === 'to') next.to = t('pickStatus');
        if (issue.path[0] === 'reason') next.reason = issue.message;
      }
      setErrors(next);
      return;
    }
    override.mutate(parsed.data, {
      onSuccess: () => {
        toast.success(t('done', { status: tst(parsed.data.to) }));
        close();
      },
      onError: (e) => setErrors({ form: e instanceof ApiError ? e.message : tc('networkError') }),
    });
  };
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setOpen(true)}>
        <Wrench />
        {t('action')}
      </Button>
      <Dialog open={open} onOpenChange={(o) => !o && close()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('title', { code })}</DialogTitle>
            <DialogDescription>{t('body', { status: tst(status) })}</DialogDescription>
          </DialogHeader>
          <form
            className="grid gap-5"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <FormAlert message={errors.form ?? null} />
            <FieldGroup>
              <Field data-invalid={!!errors.to}>
                <FieldLabel htmlFor="override-to">{t('to')}</FieldLabel>
                <Select
                  items={TARGETS.filter((s) => s !== status).map((s) => ({
                    value: s,
                    label: tst(s),
                  }))}
                  value={to}
                  onValueChange={(v) => {
                    const parsed = OrderStatusSchema.safeParse(v);
                    if (parsed.success) setTo(parsed.data);
                  }}
                >
                  <SelectTrigger id="override-to" className="w-full">
                    <SelectValue placeholder={t('pickStatus')} />
                  </SelectTrigger>
                  <SelectContent>
                    {TARGETS.filter((s) => s !== status).map((s) => (
                      <SelectItem key={s} value={s}>
                        {tst(s)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{errors.to}</FieldError>
              </Field>
              <Field data-invalid={!!errors.reason}>
                <FieldLabel htmlFor="override-reason">{t('reason')}</FieldLabel>
                <Textarea
                  id="override-reason"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
                <FieldDescription>{t('reasonHint')}</FieldDescription>
                <FieldError>{errors.reason}</FieldError>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={close}>
                {tc('cancel')}
              </Button>
              <Button type="submit" variant="destructive" disabled={override.isPending}>
                {t('confirm')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

/** The order's money position (staff only) with refunds from unreleased escrow. */
export function OrderFinanceCard({ code }: { code: string }) {
  const t = useTranslations('adminPanel.orders.finance');
  const locale = useLocale();
  const finance = useOrderFinance(code);
  const [refunding, setRefunding] = useState(false);
  if (finance.isPending) return <Skeleton className="h-56 rounded-xl" />;
  if (finance.isError)
    return (
      <ErrorState
        size="compact"
        onRetry={() => void finance.refetch()}
        retrying={finance.isFetching}
      />
    );
  const f = finance.data;
  const money = (minor: number) => formatMoney(minor, f.currency, locale);
  const rows: [string, string][] = [
    [t('received'), money(f.receivedMinor)],
    [t('escrow'), money(f.escrowMinor)],
    [t('released'), money(f.releasedMinor)],
    [t('paidOut'), money(f.paidOutMinor)],
    [t('refunded'), money(f.refundedMinor)],
    [t('revenueBooked'), money(f.commissionMinor)],
  ];
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <dl className="space-y-1.5 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-3">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="tabular font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        {f.escrowMinor > 0 ? (
          <Button variant="outline" size="sm" className="w-full" onClick={() => setRefunding(true)}>
            <Undo2 />
            {t('refund')}
          </Button>
        ) : null}
        <RefundDialog
          code={code}
          currency={f.currency}
          maxMinor={f.escrowMinor}
          open={refunding}
          onClose={() => setRefunding(false)}
        />
      </CardContent>
    </Card>
  );
}

function RefundDialog({
  code,
  currency,
  maxMinor,
  open,
  onClose,
}: {
  code: string;
  currency: string;
  maxMinor: number;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('adminPanel.orders.refund');
  const tc = useTranslations('common');
  const locale = useLocale();
  const refund = useRefund(code);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<{ amount?: string; reason?: string; form?: string }>({});
  const max = formatMoney(maxMinor, currency, locale);
  const close = () => {
    setAmount('');
    setReason('');
    setErrors({});
    onClose();
  };
  const submit = () => {
    const minor = toMinor(amount, currency);
    if (Number.isNaN(minor) || minor <= 0) {
      setErrors({ amount: t('invalid') });
      return;
    }
    if (minor > maxMinor) {
      setErrors({ amount: t('tooHigh', { max }) });
      return;
    }
    const parsed = RefundSchema.safeParse({ amountMinor: minor, reason });
    if (!parsed.success) {
      setErrors({ reason: parsed.error.issues[0]?.message });
      return;
    }
    refund.mutate(parsed.data, {
      onSuccess: () => {
        toast.success(t('done'));
        close();
      },
      onError: (e) => setErrors({ form: e instanceof ApiError ? e.message : tc('networkError') }),
    });
  };
  return (
    <Dialog open={open} onOpenChange={(o) => !o && close()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('title', { code })}</DialogTitle>
          <DialogDescription>{t('body', { max })}</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-5"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <FormAlert message={errors.form ?? null} />
          <FieldGroup>
            <Field data-invalid={!!errors.amount}>
              <FieldLabel htmlFor="refund-amount">{t('amount', { currency })}</FieldLabel>
              <Input
                id="refund-amount"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <FieldError>{errors.amount}</FieldError>
            </Field>
            <Field data-invalid={!!errors.reason}>
              <FieldLabel htmlFor="refund-reason">{t('reason')}</FieldLabel>
              <Textarea
                id="refund-reason"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <FieldError>{errors.reason}</FieldError>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={close}>
              {tc('cancel')}
            </Button>
            <Button type="submit" variant="destructive" disabled={refund.isPending}>
              {t('action')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
