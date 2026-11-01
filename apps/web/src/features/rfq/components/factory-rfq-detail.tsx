'use client';

import type { ManufacturerRfqDetail, QuoteDto } from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, FileSearch, Send, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { applyServerErrors } from '@/lib/form-errors';
import { formatMoney, fromMinor, toMinor } from '@/lib/format';
import { useFactoryRfq, useSubmitQuote } from '../api';
import { QUOTE_FIELDS, QuoteFormSchema, type QuoteFormValues } from '../forms';
import { AttachmentList } from './attachment-list';

export function FactoryRfqDetail({ code }: { code: string }) {
  const t = useTranslations('rfq.factoryDetail');
  const rfq = useFactoryRfq(code);
  if (rfq.isPending) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-2/3" />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
      </div>
    );
  }
  if (rfq.isError) {
    return rfq.error instanceof ApiError && rfq.error.status === 404 ? (
      <EmptyState
        icon={FileSearch}
        title={t('notFound')}
        description={t('notFoundBody')}
        action={<Button render={<Link href="/manufacturer/rfqs" />}>{t('back')}</Button>}
      />
    ) : (
      <ErrorState onRetry={() => void rfq.refetch()} retrying={rfq.isFetching} />
    );
  }
  return <DetailView rfq={rfq.data} />;
}

function DetailView({ rfq }: { rfq: ManufacturerRfqDetail }) {
  const t = useTranslations('rfq.factoryDetail');
  const ti = useTranslations('rfq.wizard.incoterms');
  const locale = useLocale();
  const format = useFormatter();
  const date = (iso: string | null) =>
    iso ? format.dateTime(new Date(iso), { dateStyle: 'medium' }) : '—';

  return (
    <div className="space-y-8">
      <Button
        variant="ghost"
        size="sm"
        className="-ms-2"
        render={<Link href="/manufacturer/rfqs" />}
      >
        <ArrowLeft className="rtl:rotate-180" />
        {t('back')}
      </Button>
      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="code">{rfq.code}</Badge>
          <StatusBadge domain="rfq" status={rfq.status} />
          <Badge variant="neutral">{rfq.buyerCode}</Badge>
          <Badge variant="brand">{rfq.categoryName}</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-3xl">
          {rfq.title}
        </h1>
        <p className="text-muted-foreground text-sm">{t('due', { date: date(rfq.deadline) })}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('request')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                {rfq.description}
              </p>
              <dl className="bg-border grid grid-cols-2 gap-px overflow-hidden rounded-lg border sm:grid-cols-3">
                {[
                  [t('quantity'), `${format.number(rfq.quantity)} pcs`],
                  [t('delivery'), date(rfq.requiredDeliveryDate)],
                  [
                    t('destination'),
                    rfq.destinationCountry ? countryName(rfq.destinationCountry, locale) : '—',
                  ],
                  [t('incoterm'), rfq.incoterm ? `${rfq.incoterm} · ${ti(rfq.incoterm)}` : '—'],
                  [t('currency'), rfq.currency],
                  [t('quotesDue'), date(rfq.deadline)],
                ].map(([label, value]) => (
                  <div key={label} className="bg-card space-y-1 p-3">
                    <dt className="text-muted-foreground text-xs">{label}</dt>
                    <dd className="text-sm font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('files')}</CardTitle>
            </CardHeader>
            <CardContent>
              {rfq.attachments.length > 0 ? (
                <AttachmentList files={rfq.attachments} />
              ) : (
                <p className="text-muted-foreground text-sm">{t('noFiles')}</p>
              )}
            </CardContent>
          </Card>
        </div>
        <QuoteForm rfq={rfq} />
      </div>
    </div>
  );
}

function QuoteForm({ rfq }: { rfq: ManufacturerRfqDetail }) {
  const t = useTranslations('rfq.quoteForm');
  const tc = useTranslations('common');
  const locale = useLocale();
  const submit = useSubmitQuote(rfq.code);
  const [formError, setFormError] = useState<string | null>(null);
  const mine = rfq.myQuote;
  const form = useForm<QuoteFormValues, unknown, QuoteDto>({
    resolver: zodResolver(QuoteFormSchema),
    defaultValues: {
      currency: rfq.currency,
      price: mine ? fromMinor(mine.unitPriceMinor, rfq.currency) : '',
      leadTimeDays: mine ? String(mine.leadTimeDays) : '',
      moqPcs: mine?.moqPcs ? String(mine.moqPcs) : '',
      validUntil: mine?.validUntil?.slice(0, 10) ?? '',
      notes: mine?.notes ?? '',
    },
  });
  const { errors, isSubmitting } = form.formState;
  const price = useWatch({ control: form.control, name: 'price' });
  const unit = toMinor(price, rfq.currency);

  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await submit.mutateAsync(dto);
      toast.success(mine ? t('updated') : t('sent'));
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, QUOTE_FIELDS, tc('networkError')));
    }
  });

  return (
    <Card className="h-fit lg:sticky lg:top-20">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle>{mine ? t('yourQuote') : t('title')}</CardTitle>
          {mine ? <StatusBadge domain="quote" status={mine.status} /> : null}
        </div>
      </CardHeader>
      <CardContent>
        {!rfq.canQuote && !mine ? (
          <p className="text-muted-foreground text-sm">{t('closed')}</p>
        ) : (
          <form onSubmit={(e) => void onSubmit(e)} noValidate className="space-y-5">
            <FormAlert message={formError} />
            <fieldset disabled={!rfq.canQuote} className="contents">
              <FieldGroup>
                <div className="grid grid-cols-2 gap-3">
                  <Field data-invalid={!!errors.price}>
                    <FieldLabel htmlFor="q-price">
                      {t('price', { currency: rfq.currency })}
                    </FieldLabel>
                    <Input
                      id="q-price"
                      inputMode="decimal"
                      aria-invalid={!!errors.price}
                      {...form.register('price')}
                    />
                    <FieldError errors={[errors.price]} />
                  </Field>
                  <Field data-invalid={!!errors.leadTimeDays}>
                    <FieldLabel htmlFor="q-lead">{t('leadTime')}</FieldLabel>
                    <Input
                      id="q-lead"
                      inputMode="numeric"
                      aria-invalid={!!errors.leadTimeDays}
                      {...form.register('leadTimeDays')}
                    />
                    <FieldError errors={[errors.leadTimeDays]} />
                  </Field>
                  <Field data-invalid={!!errors.moqPcs}>
                    <FieldLabel htmlFor="q-moq">{t('moq')}</FieldLabel>
                    <Input
                      id="q-moq"
                      inputMode="numeric"
                      placeholder={tc('optional')}
                      aria-invalid={!!errors.moqPcs}
                      {...form.register('moqPcs')}
                    />
                    <FieldError errors={[errors.moqPcs]} />
                  </Field>
                  <Field data-invalid={!!errors.validUntil}>
                    <FieldLabel htmlFor="q-valid">{t('validUntil')}</FieldLabel>
                    <Input
                      id="q-valid"
                      type="date"
                      aria-invalid={!!errors.validUntil}
                      {...form.register('validUntil')}
                    />
                    <FieldError errors={[errors.validUntil]} />
                  </Field>
                </div>
                <Field data-invalid={!!errors.notes}>
                  <FieldLabel htmlFor="q-notes">{t('notes')}</FieldLabel>
                  <Textarea
                    id="q-notes"
                    rows={4}
                    placeholder={t('notesPlaceholder')}
                    aria-invalid={!!errors.notes}
                    {...form.register('notes')}
                  />
                  <FieldDescription>{t('notesHint')}</FieldDescription>
                  <FieldError errors={[errors.notes]} />
                </Field>
              </FieldGroup>
            </fieldset>
            <div className="bg-surface flex items-baseline justify-between rounded-lg border p-3 text-sm">
              <span className="text-muted-foreground">
                {t('total', { quantity: rfq.quantity.toLocaleString(locale) })}
              </span>
              <span className="tabular font-semibold">
                {Number.isNaN(unit) ? '—' : formatMoney(unit * rfq.quantity, rfq.currency, locale)}
              </span>
            </div>
            <p className="text-muted-foreground flex gap-2 text-xs leading-relaxed">
              <ShieldCheck className="text-primary-ink size-4 shrink-0" aria-hidden="true" />
              {t('managed')}
            </p>
            {rfq.canQuote ? (
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Send />
                {isSubmitting ? t('sending') : mine ? t('update') : t('submit')}
              </Button>
            ) : (
              <p className="text-muted-foreground text-sm">{t('locked')}</p>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  );
}
