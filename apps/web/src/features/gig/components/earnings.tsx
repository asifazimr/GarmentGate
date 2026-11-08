'use client';

import {
  type InspectorPayoutDetailsDto,
  InspectorPayoutDetailsSchema,
  PayoutMethodSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatCard } from '@/components/patterns/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { OptionSelect } from '@/features/logistics/components/form-bits';
import { applyServerErrors } from '@/lib/form-errors';
import { useMoney } from '@/lib/use-money';
import { useInspectorMe, useSetPayout } from '../api';

/** What the inspector has earned, been paid, how they're rated and where they're paid. */
export function InspectorEarnings() {
  const t = useTranslations('gig.earnings');
  const tq = useTranslations('qc');
  const format = useFormatter();
  const money = useMoney();
  const me = useInspectorMe();
  const [editing, setEditing] = useState(false);

  if (me.isPending)
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/2" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  if (me.isError) return <ErrorState onRetry={() => void me.refetch()} retrying={me.isFetching} />;
  const m = me.data;

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      {m.status === 'SUSPENDED' ? (
        <p className="bg-danger-soft text-danger-ink rounded-lg px-4 py-3 text-sm">
          {t('suspended')}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label={t('due')} value={money(m.dueUsdMinor, 'USD')} />
        <StatCard label={t('paid')} value={money(m.paidUsdMinor, 'USD')} />
        <StatCard
          label={t('rating')}
          value={m.rating === null ? '—' : format.number(m.rating, { maximumFractionDigits: 1 })}
          hint={t('ratings', { count: m.ratingCount })}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2">
            <Wallet className="size-4" aria-hidden="true" />
            {t('payoutTitle')}
            {m.payout ? (
              <Badge variant={m.payout.verified ? 'success' : 'warning'}>
                {m.payout.verified ? t('verified') : t('pendingReview')}
              </Badge>
            ) : null}
          </CardTitle>
          <CardDescription>{t('payoutBody')}</CardDescription>
        </CardHeader>
        <CardContent>
          {m.payout && !editing ? (
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <div>
                <p className="font-medium">{m.payout.name}</p>
                <p className="text-muted-foreground">
                  {t(`methods.${m.payout.method}`)} · {m.payout.accountMasked}
                </p>
              </div>
              <Button variant="outline" onClick={() => setEditing(true)}>
                {t('change')}
              </Button>
            </div>
          ) : (
            <PayoutForm onDone={() => setEditing(false)} />
          )}
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-[-0.01em]">{t('jobs')}</h2>
        {m.jobs.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title={t('noJobs')}
            description={t('noJobsBody')}
            action={<Button render={<Link href="/inspector/tasks" />}>{t('findTasks')}</Button>}
          />
        ) : (
          <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
            {m.jobs.map((j) => (
              <li
                key={j.inspectionId}
                className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5"
              >
                <Link
                  href={`/inspector/inspections/${j.inspectionId}`}
                  className="min-w-0 flex-1 space-y-1 hover:underline"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <Badge variant="code">{j.orderCode}</Badge>
                    <span className="text-muted-foreground text-xs">{tq(`types.${j.type}`)}</span>
                  </span>
                  <span className="text-muted-foreground block text-xs">
                    {j.inspectedAt
                      ? tq('inspectedOn', {
                          date: format.dateTime(new Date(j.inspectedAt), { dateStyle: 'medium' }),
                        })
                      : t('open')}
                  </span>
                </Link>
                {j.rating !== null ? (
                  <span className="text-muted-foreground flex items-center gap-1 text-sm tabular">
                    <Star className="size-3.5" aria-hidden="true" />
                    {j.rating}
                  </span>
                ) : null}
                {j.payUsdMinor !== null && j.inspectedAt ? (
                  <span className="tabular text-sm">{money(j.payUsdMinor, 'USD')}</span>
                ) : null}
                {j.inspectedAt ? (
                  <Badge variant={j.paid ? 'success' : 'warning'}>
                    {j.paid ? t('paidBadge') : t('dueBadge')}
                  </Badge>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function PayoutForm({ onDone }: { onDone: () => void }) {
  const t = useTranslations('gig.earnings');
  const tc = useTranslations('common');
  const save = useSetPayout();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<InspectorPayoutDetailsDto>({
    resolver: zodResolver(InspectorPayoutDetailsSchema),
    defaultValues: { method: 'BANK', name: '', account: '' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={(e) =>
        void form.handleSubmit(async (dto) => {
          setError(null);
          try {
            await save.mutateAsync(dto);
            toast.success(t('saved'));
            onDone();
          } catch (err) {
            setError(
              applyServerErrors(
                err,
                form.setError,
                ['method', 'name', 'account'],
                tc('networkError'),
              ),
            );
          }
        })(e)
      }
    >
      <FormAlert message={error} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="po-method">{t('method')}</FieldLabel>
            <Controller
              control={form.control}
              name="method"
              render={({ field }) => (
                <OptionSelect
                  id="po-method"
                  value={field.value}
                  onChange={(v) => field.onChange(PayoutMethodSchema.parse(v))}
                  options={PayoutMethodSchema.options.map((v) => ({
                    value: v,
                    label: t(`methods.${v}`),
                  }))}
                />
              )}
            />
          </Field>
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="po-name">{t('name')}</FieldLabel>
            <Input id="po-name" autoComplete="name" {...form.register('name')} />
            <FieldError errors={[errors.name]} />
          </Field>
        </div>
        <Field data-invalid={!!errors.account}>
          <FieldLabel htmlFor="po-account">{t('account')}</FieldLabel>
          <Input id="po-account" autoComplete="off" {...form.register('account')} />
          <FieldError errors={[errors.account]} />
        </Field>
      </FieldGroup>
      <p className="text-muted-foreground text-xs">{t('reviewNote')}</p>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? tc('saving') : t('save')}
      </Button>
    </form>
  );
}
