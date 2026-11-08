'use client';

import {
  type AdminBankAccount,
  AdminBankAccountSchema,
  CurrencySchema,
  type FactoryBankAccountDto,
  type FactoryBankAccountInput,
  FactoryBankAccountInputSchema,
  FactoryBankAccountViewSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Landmark, ShieldCheck } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { OptionSelect } from '@/features/logistics/components/form-bits';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { ApiError, apiJson, apiSend } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { applyServerErrors } from '@/lib/form-errors';

const mineKey = ['manufacturer', 'bank-account'] as const;
const listKey = ['admin', 'finance', 'bank-accounts'] as const;
const STATUS_TONE = {
  PENDING_REVIEW: 'warning',
  VERIFIED: 'success',
  REJECTED: 'danger',
  REPLACED: 'neutral',
} as const;

// ── Factory: where GarmentGate pays it ──────────────────────────────────────

export function FactoryBankAccountCard() {
  const t = useTranslations('bankAccounts');
  const locale = useLocale();
  const mine = useQuery({
    queryKey: mineKey,
    queryFn: () => apiJson('/manufacturer/bank-account', FactoryBankAccountViewSchema.nullable()),
  });
  const [editing, setEditing] = useState(false);
  const a = mine.data;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <Landmark className="size-4" aria-hidden="true" />
          {t('title')}
          {a ? <Badge variant={STATUS_TONE[a.status]}>{t(`status.${a.status}`)}</Badge> : null}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mine.isPending ? (
          <Skeleton className="h-24 rounded-lg" />
        ) : mine.isError ? (
          <ErrorState onRetry={() => void mine.refetch()} retrying={mine.isFetching} />
        ) : a && !editing ? (
          <div className="space-y-3 text-sm">
            <dl className="grid gap-1">
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">{t('fields.holderName')}:</dt>
                <dd>{a.holderName}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">{t('fields.bankName')}:</dt>
                <dd>
                  {a.bankName}, {countryName(a.bankCountry, locale)}
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">{t('fields.accountNumber')}:</dt>
                <dd className="font-mono">{a.accountMasked}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="text-muted-foreground">{t('fields.currency')}:</dt>
                <dd>{a.currency}</dd>
              </div>
            </dl>
            {a.status === 'REJECTED' && a.reviewNote ? (
              <p className="text-danger-ink">{t('rejected', { note: a.reviewNote })}</p>
            ) : a.status === 'PENDING_REVIEW' ? (
              <p className="text-muted-foreground">{t('pending')}</p>
            ) : null}
            <Button variant="outline" onClick={() => setEditing(true)}>
              {t('change')}
            </Button>
          </div>
        ) : (
          <BankForm onDone={() => setEditing(false)} />
        )}
      </CardContent>
    </Card>
  );
}

function BankForm({ onDone }: { onDone: () => void }) {
  const t = useTranslations('bankAccounts');
  const tc = useTranslations('common');
  const queryClient = useQueryClient();
  const save = useMutation({
    mutationFn: (dto: FactoryBankAccountDto) =>
      apiSend('/manufacturer/bank-account', { method: 'PUT', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: mineKey }),
  });
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<FactoryBankAccountInput, unknown, FactoryBankAccountDto>({
    resolver: zodResolver(FactoryBankAccountInputSchema),
    defaultValues: {
      holderName: '',
      bankName: '',
      bankCountry: '',
      accountNumber: '',
      swiftBic: '',
      routingCode: '',
      branch: '',
      currency: 'USD',
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await save.mutateAsync(dto);
      toast.success(t('saved'));
      onDone();
    } catch (error) {
      setFormError(
        applyServerErrors(error, form.setError, ['accountNumber', 'swiftBic'], tc('networkError')),
      );
    }
  });
  const text = (
    name: 'holderName' | 'bankName' | 'accountNumber' | 'swiftBic' | 'routingCode' | 'branch',
  ) => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`ba-${name}`}>{t(`fields.${name}`)}</FieldLabel>
      <Input id={`ba-${name}`} autoComplete="off" {...form.register(name)} />
      {name === 'holderName' || name === 'routingCode' ? (
        <FieldDescription>{t(`hints.${name}`)}</FieldDescription>
      ) : null}
      <FieldError errors={[errors[name]]} />
    </Field>
  );
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          {text('holderName')}
          {text('bankName')}
          <Field data-invalid={!!errors.bankCountry}>
            <FieldLabel htmlFor="ba-country">{t('fields.bankCountry')}</FieldLabel>
            <Controller
              control={form.control}
              name="bankCountry"
              render={({ field }) => (
                <CountrySelect
                  id="ba-country"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('choose')}
                  invalid={!!errors.bankCountry}
                />
              )}
            />
            <FieldError errors={[errors.bankCountry]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="ba-currency">{t('fields.currency')}</FieldLabel>
            <Controller
              control={form.control}
              name="currency"
              render={({ field }) => (
                <OptionSelect
                  id="ba-currency"
                  value={field.value}
                  onChange={field.onChange}
                  options={CurrencySchema.options.map((c) => ({ value: c, label: c }))}
                />
              )}
            />
          </Field>
          {text('accountNumber')}
          {text('swiftBic')}
          {text('routingCode')}
          {text('branch')}
        </div>
      </FieldGroup>
      <p className="text-muted-foreground text-xs">{t('reviewNote')}</p>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? tc('saving') : t('save')}
      </Button>
    </form>
  );
}

// ── Staff: verify before any payout ─────────────────────────────────────────

export function BankAccountsTab() {
  const t = useTranslations('bankAccounts');
  const tc = useTranslations('common');
  const format = useFormatter();
  const locale = useLocale();
  const queryClient = useQueryClient();
  const list = useQuery({
    queryKey: listKey,
    queryFn: () => apiJson('/admin/finance/bank-accounts', z.array(AdminBankAccountSchema)),
  });
  const review = useMutation({
    mutationFn: ({
      id,
      decision,
      note,
    }: {
      id: string;
      decision: 'VERIFY' | 'REJECT';
      note?: string;
    }) =>
      apiSend(`/admin/finance/bank-accounts/${id}/review`, {
        method: 'POST',
        body: { decision, note },
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['admin', 'finance'] }),
  });
  const [rejecting, setRejecting] = useState<AdminBankAccount | null>(null);
  const [note, setNote] = useState('');
  const mutate = review.mutate;
  const reject = () => {
    if (!rejecting) return;
    mutate(
      { id: rejecting.id, decision: 'REJECT', note },
      {
        onSuccess: () => {
          toast.success(t('rejectedToast'));
          setRejecting(null);
          setNote('');
        },
        onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
      },
    );
  };
  const columns = useMemo<DataColumn<AdminBankAccount>[]>(
    () => [
      {
        id: 'factory',
        header: t('columns.factory'),
        value: (a) => `${a.manufacturer.code} ${a.manufacturer.name}`,
        cell: (a) => (
          <span>
            <Badge variant="code">{a.manufacturer.code}</Badge>
            <span className="text-muted-foreground block text-xs">{a.manufacturer.name}</span>
          </span>
        ),
      },
      {
        id: 'account',
        header: t('columns.account'),
        value: (a) => `${a.holderName} ${a.bankName} ${a.accountNumber} ${a.swiftBic ?? ''}`,
        cell: (a) => (
          <span className="text-xs">
            <span className="block font-medium">
              {a.holderName}
              {a.holderMismatch ? (
                <Badge variant="warning" className="ms-1">
                  {t('mismatch')}
                </Badge>
              ) : null}
            </span>
            <span className="block">
              {a.bankName}, {countryName(a.bankCountry, locale)} · {a.currency}
            </span>
            <span className="text-muted-foreground block font-mono">
              {a.accountNumber}
              {a.swiftBic ? ` · ${a.swiftBic}` : ''}
              {a.routingCode ? ` · ${a.routingCode}` : ''}
            </span>
          </span>
        ),
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (a) => a.status,
        cell: (a) => (
          <span className="text-xs">
            <Badge variant={STATUS_TONE[a.status]}>{t(`status.${a.status}`)}</Badge>
            <span className="text-muted-foreground block">
              {format.dateTime(new Date(a.createdAt), { dateStyle: 'medium' })}
            </span>
          </span>
        ),
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (a) =>
          a.status === 'PENDING_REVIEW' ? (
            <span className="flex justify-end gap-1">
              <Button
                size="xs"
                disabled={review.isPending}
                onClick={() =>
                  mutate(
                    { id: a.id, decision: 'VERIFY' },
                    {
                      onSuccess: () => toast.success(t('verified')),
                      onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
                    },
                  )
                }
              >
                <ShieldCheck />
                {t('verify')}
              </Button>
              <Button
                size="xs"
                variant="ghost"
                disabled={review.isPending}
                onClick={() => setRejecting(a)}
              >
                {t('reject')}
              </Button>
            </span>
          ) : null,
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, format, locale, review.isPending, mutate],
  );
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground max-w-2xl text-sm">{t('staffHint')}</p>
      <DataTable
        data={list.data}
        columns={columns}
        loading={list.isPending}
        error={list.isError}
        onRetry={() => void list.refetch()}
        retrying={list.isFetching}
        csvName="factory-bank-accounts"
        empty={{ icon: Landmark, title: t('empty'), description: t('emptyBody') }}
      />
      <Dialog open={rejecting !== null} onOpenChange={(o) => !o && setRejecting(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('rejectTitle')}</DialogTitle>
            <DialogDescription>{t('rejectWhy')}</DialogDescription>
          </DialogHeader>
          <Field>
            <FieldLabel htmlFor="ba-reject">{t('rejectNote')}</FieldLabel>
            <Textarea
              id="ba-reject"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejecting(null)}>
              {tc('cancel')}
            </Button>
            <Button disabled={note.trim().length < 5 || review.isPending} onClick={reject}>
              {t('reject')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
