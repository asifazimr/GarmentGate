'use client';

import {
  type ConfirmPaymentDto,
  ConfirmPaymentSchema,
  CurrencySchema,
  type FinanceInbox,
  type PayoutDto,
  PayoutSchema,
  RejectPaymentSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Banknote, CheckCheck, CircleAlert, CircleCheck, Coins, Landmark } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { ErrorState } from '@/components/patterns/error-state';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { PageHeader } from '@/components/patterns/page-header';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { applyServerErrors } from '@/lib/form-errors';
import { formatMoney } from '@/lib/format';
import {
  uploadPaymentProof,
  useApproveRelease,
  useConfirmPayment,
  useFinanceInbox,
  useLedgerBalances,
  useRecordPayout,
  useRejectPayment,
} from '../api';

const PURPOSES = ['DEPOSIT', 'BALANCE', 'REFUND', 'PAYOUT'] as const;

type ToConfirm = FinanceInbox['toConfirm'][number];
type ToRelease = FinanceInbox['toRelease'][number];
type ToPay = FinanceInbox['toPay'][number];

/** Order payments link to the order; capacity booking deposits (CB-…) to the bookings page. */
const orderLink = (code: string) => (
  <Link
    href={code.startsWith('CB-') ? '/admin/capacity' : `/admin/orders/${code}`}
    className="font-mono text-xs font-medium hover:underline"
  >
    {code}
  </Link>
);

/**
 * Money that needs staff: buyer transfers to confirm against the bank statement, escrow
 * tranches to release to factories, and released money to pay out; plus the ledger check.
 */
export function AdminPayments() {
  const t = useTranslations('adminPanel.payments');
  const inbox = useFinanceInbox();
  const counts = inbox.data
    ? {
        confirm: inbox.data.toConfirm.length,
        release: inbox.data.toRelease.length,
        pay: inbox.data.toPay.length,
      }
    : null;

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <Tabs defaultValue="confirm">
        <TabsList>
          {(['confirm', 'release', 'pay'] as const).map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {t(`tabs.${tab}`)}
              {counts && counts[tab] > 0 ? (
                <Badge variant="warning" className="ms-1.5">
                  {counts[tab]}
                </Badge>
              ) : null}
            </TabsTrigger>
          ))}
          <TabsTrigger value="ledger">{t('tabs.ledger')}</TabsTrigger>
        </TabsList>
        <TabsContent value="confirm" className="pt-4">
          <ConfirmTable inbox={inbox} />
        </TabsContent>
        <TabsContent value="release" className="pt-4">
          <ReleaseTable inbox={inbox} />
        </TabsContent>
        <TabsContent value="pay" className="pt-4">
          <PayTable inbox={inbox} />
        </TabsContent>
        <TabsContent value="ledger" className="pt-4">
          <Ledger />
        </TabsContent>
      </Tabs>
    </div>
  );
}

type InboxQuery = ReturnType<typeof useFinanceInbox>;

function ConfirmTable({ inbox }: { inbox: InboxQuery }) {
  const t = useTranslations('adminPanel.payments');
  const locale = useLocale();
  const format = useFormatter();
  const [confirming, setConfirming] = useState<ToConfirm | null>(null);
  const [rejecting, setRejecting] = useState<ToConfirm | null>(null);
  const columns = useMemo<DataColumn<ToConfirm>[]>(
    () => [
      {
        id: 'reference',
        header: t('columns.reference'),
        value: (p) => p.reference,
        className: 'font-mono text-xs',
      },
      {
        id: 'order',
        header: t('columns.order'),
        value: (p) => p.orderCode,
        cell: (p) => orderLink(p.orderCode),
      },
      {
        id: 'buyer',
        header: t('columns.buyer'),
        value: (p) => `${p.buyer.code} ${p.buyer.name}`,
        cell: (p) => (
          <span>
            <Badge variant="code">{p.buyer.code}</Badge>
            <span className="text-muted-foreground block text-xs">{p.buyer.name}</span>
          </span>
        ),
        hideOnMobile: true,
      },
      {
        id: 'purpose',
        header: t('columns.purpose'),
        value: (p) => {
          // The API sends the purpose as a plain string: label the known ones.
          const known = PURPOSES.find((x) => x === p.purpose);
          return known ? t(`purpose.${known}`) : p.purpose;
        },
      },
      {
        id: 'method',
        header: t('columns.method'),
        value: (p) => t(`method.${p.method}`),
        hideOnMobile: true,
      },
      {
        id: 'amount',
        header: t('columns.amount'),
        value: (p) => p.amountMinor,
        cell: (p) => formatMoney(p.amountMinor, p.currency, locale),
        align: 'end',
        searchable: false,
      },
      {
        id: 'currency',
        header: t('columns.currency'),
        value: (p) => p.currency,
        hideOnMobile: true,
      },
      {
        id: 'payerRef',
        header: t('columns.payerRef'),
        value: (p) => p.payerReference,
        hideOnMobile: true,
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (p) => p.status,
        cell: (p) => <StatusBadge domain="payment" status={p.status} />,
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'created',
        header: t('columns.created'),
        value: (p) => p.createdAt,
        cell: (p) => format.dateTime(new Date(p.createdAt), { dateStyle: 'medium' }),
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (p) => (
          <span className="flex justify-end gap-1.5">
            <Button
              variant="outline"
              size="xs"
              className="text-danger-ink"
              onClick={() => setRejecting(p)}
            >
              {t('reject')}
            </Button>
            <Button size="xs" onClick={() => setConfirming(p)}>
              {t('confirm')}
            </Button>
          </span>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, locale, format],
  );
  return (
    <>
      <DataTable
        data={inbox.data?.toConfirm}
        columns={columns}
        loading={inbox.isPending}
        error={inbox.isError}
        onRetry={() => void inbox.refetch()}
        retrying={inbox.isFetching}
        filters={[
          { column: 'purpose', label: t('columns.purpose') },
          { column: 'method', label: t('columns.method') },
          { column: 'currency', label: t('columns.currency') },
        ]}
        initialSort={{ id: 'created', desc: false }}
        csvName="payments-to-confirm"
        empty={{ icon: CheckCheck, title: t('empty.confirm'), description: t('empty.confirmBody') }}
      />
      <ConfirmDialog payment={confirming} onClose={() => setConfirming(null)} />
      <RejectDialog payment={rejecting} onClose={() => setRejecting(null)} />
    </>
  );
}

function ReleaseTable({ inbox }: { inbox: InboxQuery }) {
  const t = useTranslations('adminPanel.payments');
  const tr = useTranslations('adminPanel.payments.trigger');
  const locale = useLocale();
  const format = useFormatter();
  const approve = useApproveRelease();
  const columns = useMemo<DataColumn<ToRelease>[]>(
    () => [
      {
        id: 'order',
        header: t('columns.order'),
        value: (r) => r.orderCode,
        cell: (r) => orderLink(r.orderCode),
      },
      {
        id: 'factory',
        header: t('columns.factory'),
        value: (r) => `${r.manufacturer.code} ${r.manufacturer.name}`,
        cell: (r) => (
          <span>
            <Badge variant="code">{r.manufacturer.code}</Badge>
            <span className="text-muted-foreground block text-xs">{r.manufacturer.name}</span>
          </span>
        ),
      },
      { id: 'trigger', header: t('columns.trigger'), value: (r) => tr(r.trigger) },
      {
        id: 'factoryAmount',
        header: t('columns.factoryAmount'),
        value: (r) => r.manufacturerMinor,
        cell: (r) => formatMoney(r.manufacturerMinor, r.currency, locale),
        align: 'end',
        searchable: false,
      },
      {
        id: 'buyerAmount',
        header: t('columns.fromEscrow'),
        value: (r) => r.buyerMinor,
        cell: (r) => formatMoney(r.buyerMinor, r.currency, locale),
        align: 'end',
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'currency',
        header: t('columns.currency'),
        value: (r) => r.currency,
        hideOnMobile: true,
      },
      {
        id: 'funded',
        header: t('columns.funded'),
        value: (r) => (r.fundedEnough ? t('yes') : t('no')),
        cell: (r) =>
          r.fundedEnough ? (
            <CircleCheck className="text-success-ink size-4" aria-label={t('yes')} />
          ) : (
            <span className="text-warning-ink inline-flex items-center gap-1 text-xs">
              <CircleAlert className="size-4" aria-hidden="true" />
              {t('notFunded')}
            </span>
          ),
        searchable: false,
      },
      {
        id: 'due',
        header: t('columns.due'),
        value: (r) => r.dueAt,
        cell: (r) => (r.dueAt ? format.dateTime(new Date(r.dueAt), { dateStyle: 'medium' }) : '—'),
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (r) => (
          <Button
            size="xs"
            disabled={!r.fundedEnough || approve.isPending}
            onClick={() =>
              approve.mutate(r.releaseId, {
                onSuccess: () => toast.success(t('released')),
                onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
              })
            }
          >
            {t('release')}
          </Button>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, tr, locale, format, approve],
  );
  return (
    <DataTable
      data={inbox.data?.toRelease}
      columns={columns}
      loading={inbox.isPending}
      error={inbox.isError}
      onRetry={() => void inbox.refetch()}
      retrying={inbox.isFetching}
      filters={[
        { column: 'trigger', label: t('columns.trigger') },
        { column: 'currency', label: t('columns.currency') },
      ]}
      initialSort={{ id: 'due', desc: false }}
      csvName="releases-due"
      empty={{ icon: Coins, title: t('empty.release'), description: t('empty.releaseBody') }}
    />
  );
}

function PayTable({ inbox }: { inbox: InboxQuery }) {
  const t = useTranslations('adminPanel.payments');
  const locale = useLocale();
  const format = useFormatter();
  const [paying, setPaying] = useState<ToPay | null>(null);
  const columns = useMemo<DataColumn<ToPay>[]>(
    () => [
      {
        id: 'order',
        header: t('columns.order'),
        value: (r) => r.orderCode,
        cell: (r) => orderLink(r.orderCode),
      },
      {
        id: 'factory',
        header: t('columns.factory'),
        value: (r) => `${r.manufacturer.code} ${r.manufacturer.name}`,
        cell: (r) => (
          <span>
            <Badge variant="code">{r.manufacturer.code}</Badge>
            <span className="text-muted-foreground block text-xs">{r.manufacturer.name}</span>
          </span>
        ),
      },
      {
        id: 'amount',
        header: t('columns.amount'),
        value: (r) => r.manufacturerMinor,
        cell: (r) => formatMoney(r.manufacturerMinor, r.currency, locale),
        align: 'end',
        searchable: false,
      },
      {
        id: 'currency',
        header: t('columns.currency'),
        value: (r) => r.currency,
        hideOnMobile: true,
      },
      {
        id: 'releasedAt',
        header: t('columns.releasedAt'),
        value: (r) => r.releasedAt,
        cell: (r) =>
          r.releasedAt ? format.dateTime(new Date(r.releasedAt), { dateStyle: 'medium' }) : '—',
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (r) => (
          <Button size="xs" onClick={() => setPaying(r)}>
            {t('payOut')}
          </Button>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, locale, format],
  );
  return (
    <>
      <DataTable
        data={inbox.data?.toPay}
        columns={columns}
        loading={inbox.isPending}
        error={inbox.isError}
        onRetry={() => void inbox.refetch()}
        retrying={inbox.isFetching}
        filters={[{ column: 'currency', label: t('columns.currency') }]}
        initialSort={{ id: 'releasedAt', desc: false }}
        csvName="payouts-due"
        empty={{ icon: Banknote, title: t('empty.pay'), description: t('empty.payBody') }}
      />
      <PayoutDialog release={paying} onClose={() => setPaying(null)} />
    </>
  );
}

function Ledger() {
  const t = useTranslations('adminPanel.payments.ledger');
  const locale = useLocale();
  const balances = useLedgerBalances();
  if (balances.isPending) return <Skeleton className="h-64 rounded-xl" />;
  if (balances.isError)
    return <ErrorState onRetry={() => void balances.refetch()} retrying={balances.isFetching} />;
  const b = balances.data;
  const usd = (minor: number) => formatMoney(minor, 'USD', locale);
  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {(['cash', 'escrow', 'payable', 'revenue'] as const).map((k) => (
          <div key={k} className="bg-card rounded-xl border p-4 shadow-xs">
            <dt className="text-muted-foreground text-xs">{t(k)}</dt>
            <dd className="tabular text-lg font-semibold">{usd(b.totalsUsdMinor[k])}</dd>
          </div>
        ))}
      </dl>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="size-4" aria-hidden="true" />
            {t('title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="tabular w-full text-sm">
            <thead className="text-muted-foreground text-xs">
              <tr className="border-b">
                <th scope="col" className="py-2 text-start font-medium">
                  {t('currency')}
                </th>
                <th scope="col" className="py-2 text-end font-medium">
                  {t('cash')}
                </th>
                <th scope="col" className="py-2 text-end font-medium">
                  {t('escrow')}
                </th>
                <th scope="col" className="py-2 text-end font-medium">
                  {t('payable')}
                </th>
                <th scope="col" className="py-2 text-end font-medium">
                  {t('revenue')}
                </th>
                <th scope="col" className="py-2 text-end font-medium">
                  {t('checks')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {b.currencies.map((c) => {
                const ok = c.balanced && c.reconciled && c.cashMatchesPayments;
                return (
                  <tr key={c.currency}>
                    <th scope="row" className="py-2 text-start font-medium">
                      {c.currency}
                    </th>
                    <td className="py-2 text-end">
                      {formatMoney(c.cashMinor, c.currency, locale)}
                    </td>
                    <td className="py-2 text-end">
                      {formatMoney(c.escrowMinor, c.currency, locale)}
                    </td>
                    <td className="py-2 text-end">
                      {formatMoney(c.payableMinor, c.currency, locale)}
                    </td>
                    <td className="py-2 text-end">
                      {formatMoney(c.revenueMinor, c.currency, locale)}
                    </td>
                    <td className="py-2 text-end">
                      <Badge variant={ok ? 'success' : 'danger'}>
                        {ok ? t('ok') : t('mismatch')}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-muted-foreground mt-3 text-xs">{t('explain')}</p>
        </CardContent>
      </Card>
    </div>
  );
}

function Shell({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

/** Proof of the transfer first (statement, SWIFT copy, LC), then the bank's reference. */
function ConfirmDialog({ payment, onClose }: { payment: ToConfirm | null; onClose: () => void }) {
  const t = useTranslations('adminPanel.payments.confirmDialog');
  const tc = useTranslations('common');
  const locale = useLocale();
  const confirm = useConfirmPayment();
  const [progress, setProgress] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ConfirmPaymentDto>({
    resolver: zodResolver(ConfirmPaymentSchema),
    defaultValues: { proofFileId: '', bankReference: '' },
  });
  const { errors, isSubmitting } = form.formState;
  const close = () => {
    form.reset();
    setFileName(null);
    setError(null);
    onClose();
  };
  return (
    <Shell
      open={payment !== null}
      onClose={close}
      title={t('title', { reference: payment?.reference ?? '' })}
      description={
        payment
          ? t('body', {
              amount: formatMoney(payment.amountMinor, payment.currency, locale),
              buyer: payment.buyer.code,
            })
          : ''
      }
    >
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) =>
          void form.handleSubmit(async (dto) => {
            if (!payment) return;
            try {
              await confirm.mutateAsync({ id: payment.paymentId, dto });
              toast.success(t('done'));
              close();
            } catch (err) {
              setError(
                applyServerErrors(
                  err,
                  form.setError,
                  ['proofFileId', 'bankReference'],
                  tc('networkError'),
                ),
              );
            }
          })(e)
        }
      >
        <FormAlert message={error} />
        <FieldGroup>
          <Field data-invalid={!!errors.proofFileId}>
            <FieldLabel>{t('proof')}</FieldLabel>
            {fileName && progress === null ? (
              <p className="bg-surface rounded-lg border px-3 py-2 text-sm">{fileName}</p>
            ) : null}
            <FileDropzone
              compact
              accept={['application/pdf', 'image/jpeg', 'image/png', 'image/webp']}
              maxBytes={10 * 1024 * 1024}
              progress={progress}
              disabled={progress !== null || !payment}
              label={fileName ? t('replace') : t('upload')}
              onFile={(file) => {
                if (!payment) return;
                setProgress(0);
                uploadPaymentProof(payment.paymentId, file, setProgress)
                  .then((id) => {
                    form.setValue('proofFileId', id, { shouldValidate: true });
                    setFileName(file.name);
                  })
                  .catch(() => toast.error(t('uploadFailed')))
                  .finally(() => setProgress(null));
              }}
            />
            <FieldError errors={[errors.proofFileId]} />
          </Field>
          <Field data-invalid={!!errors.bankReference}>
            <FieldLabel htmlFor="bank-ref">{t('bankReference')}</FieldLabel>
            <Input id="bank-ref" {...form.register('bankReference')} />
            <FieldDescription>{t('bankReferenceHint')}</FieldDescription>
            <FieldError errors={[errors.bankReference]} />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            {tc('cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting || progress !== null}>
            {t('action')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}

function RejectDialog({ payment, onClose }: { payment: ToConfirm | null; onClose: () => void }) {
  const t = useTranslations('adminPanel.payments.rejectDialog');
  const tc = useTranslations('common');
  const reject = useRejectPayment();
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);
  const close = () => {
    setReason('');
    setError(null);
    onClose();
  };
  return (
    <Shell
      open={payment !== null}
      onClose={close}
      title={t('title', { reference: payment?.reference ?? '' })}
      description={t('body')}
    >
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!payment) return;
          const parsed = RejectPaymentSchema.safeParse({ reason });
          if (!parsed.success) {
            setError(parsed.error.issues[0]?.message ?? null);
            return;
          }
          reject.mutate(
            { id: payment.paymentId, dto: parsed.data },
            {
              onSuccess: () => {
                toast.success(t('done'));
                close();
              },
              onError: (err) =>
                setError(err instanceof ApiError ? err.message : tc('networkError')),
            },
          );
        }}
      >
        <Field data-invalid={!!error}>
          <FieldLabel htmlFor="reject-payment">{t('reason')}</FieldLabel>
          <Textarea
            id="reject-payment"
            rows={3}
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError(null);
            }}
          />
          <FieldError>{error}</FieldError>
        </Field>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            {tc('cancel')}
          </Button>
          <Button type="submit" variant="destructive" disabled={reject.isPending}>
            {t('action')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}

function PayoutDialog({ release, onClose }: { release: ToPay | null; onClose: () => void }) {
  const t = useTranslations('adminPanel.payments.payoutDialog');
  const tc = useTranslations('common');
  const locale = useLocale();
  const payout = useRecordPayout();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<PayoutDto>({
    resolver: zodResolver(PayoutSchema),
    defaultValues: { bankReference: '', settlementCurrency: undefined },
  });
  const { errors, isSubmitting } = form.formState;
  const close = () => {
    form.reset();
    setError(null);
    onClose();
  };
  return (
    <Shell
      open={release !== null}
      onClose={close}
      title={t('title', { order: release?.orderCode ?? '' })}
      description={
        release
          ? t('body', {
              amount: formatMoney(release.manufacturerMinor, release.currency, locale),
              factory: release.manufacturer.code,
            })
          : ''
      }
    >
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) =>
          void form.handleSubmit(async (dto) => {
            if (!release) return;
            try {
              await payout.mutateAsync({ id: release.releaseId, dto });
              toast.success(t('done'));
              close();
            } catch (err) {
              setError(
                applyServerErrors(err, form.setError, ['bankReference'], tc('networkError')),
              );
            }
          })(e)
        }
      >
        <FormAlert message={error} />
        <FieldGroup>
          <Field data-invalid={!!errors.bankReference}>
            <FieldLabel htmlFor="payout-ref">{t('bankReference')}</FieldLabel>
            <Input id="payout-ref" {...form.register('bankReference')} />
            <FieldError errors={[errors.bankReference]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="payout-currency">{t('settlement')}</FieldLabel>
            <Controller
              control={form.control}
              name="settlementCurrency"
              render={({ field }) => (
                <Select
                  items={[
                    { value: '', label: t('sameCurrency', { currency: release?.currency ?? '' }) },
                    ...CurrencySchema.options.map((c) => ({ value: c, label: c })),
                  ]}
                  value={field.value ?? ''}
                  onValueChange={(v) => {
                    const parsed = CurrencySchema.safeParse(v);
                    field.onChange(parsed.success ? parsed.data : undefined);
                  }}
                >
                  <SelectTrigger id="payout-currency" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">
                      {t('sameCurrency', { currency: release?.currency ?? '' })}
                    </SelectItem>
                    {CurrencySchema.options
                      .filter((c) => c !== release?.currency)
                      .map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldDescription>{t('settlementHint')}</FieldDescription>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={close}>
            {tc('cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {t('action')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}
