'use client';

import {
  type OrderReview,
  type PublicRating,
  type SubmitReviewDto,
  type SubmitReviewInput,
  SubmitReviewSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquareQuote, Star } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useId, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { countryName } from '@/lib/countries';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import { useFactoryReviews, useOrderReviews, useSubmitReview } from '../api';

type Side = 'BUYER' | 'MANUFACTURER';
const CRITERIA = ['quality', 'communication', 'onTime'] as const;

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={cn('inline-flex gap-0.5', className)} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(
            'size-3.5',
            n <= Math.round(value) ? 'fill-brand-gold text-brand-gold' : 'text-border-strong',
          )}
        />
      ))}
    </span>
  );
}

/** Five radio buttons drawn as stars: keyboard and screen reader friendly. */
function StarInput({
  label,
  value,
  onChange,
  invalid,
}: {
  label: string;
  value: number | undefined;
  onChange: (v: number) => void;
  invalid: boolean;
}) {
  const t = useTranslations('trust.reviews');
  const name = useId();
  return (
    <fieldset className="flex flex-wrap items-center justify-between gap-2" aria-invalid={invalid}>
      <legend className="float-start text-sm font-medium">{label}</legend>
      <span className="flex">
        {[1, 2, 3, 4, 5].map((n) => (
          <label
            key={n}
            className="has-focus-visible:ring-ring/40 flex size-11 cursor-pointer items-center justify-center rounded-md has-focus-visible:ring-3 md:size-8"
          >
            <input
              type="radio"
              name={name}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              className="sr-only"
              aria-label={t('starsLabel', { count: n })}
            />
            <Star
              aria-hidden="true"
              className={cn(
                'size-5',
                value !== undefined && n <= value
                  ? 'fill-brand-gold text-brand-gold'
                  : 'text-border-strong',
              )}
            />
          </label>
        ))}
      </span>
    </fieldset>
  );
}

/**
 * Reviews on a completed order: leave yours (once), then see the other side's when both are
 * in or the blind period ends.
 */
export function OrderReviewsCard({ code, side }: { code: string; side: Side }) {
  const t = useTranslations('trust.reviews');
  const format = useFormatter();
  const reviews = useOrderReviews(code);

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t(`intro.${side}`)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {reviews.isPending ? (
          <Skeleton className="h-32 rounded-lg" />
        ) : reviews.isError ? (
          <ErrorState
            size="compact"
            onRetry={() => void reviews.refetch()}
            retrying={reviews.isFetching}
          />
        ) : (
          <>
            {reviews.data.mine ? (
              <ReviewView review={reviews.data.mine} side={side} heading={t('yours')} />
            ) : reviews.data.canReview ? (
              <ReviewForm code={code} side={side} />
            ) : (
              <p className="text-muted-foreground text-sm">{t('closed')}</p>
            )}
            {reviews.data.theirs ? (
              <ReviewView
                review={reviews.data.theirs}
                side={side === 'BUYER' ? 'MANUFACTURER' : 'BUYER'}
                heading={t(`theirs.${side}`)}
              />
            ) : reviews.data.theirsPending ? (
              <p className="text-muted-foreground bg-surface rounded-lg border p-3 text-sm">
                {t('theirsPending')}
              </p>
            ) : null}
            {reviews.data.canReview && reviews.data.closesAt ? (
              <p className="text-muted-foreground text-xs">
                {t('closesOn', {
                  date: format.dateTime(new Date(reviews.data.closesAt), { dateStyle: 'medium' }),
                })}
              </p>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
}

/** `side` is who wrote it: the criteria mean different things in each direction. */
function ReviewView({
  review,
  side,
  heading,
}: {
  review: OrderReview;
  side: Side;
  heading: string;
}) {
  const t = useTranslations('trust.reviews');
  const format = useFormatter();
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium">{heading}</p>
        <span className="tabular flex items-center gap-1.5 text-sm font-semibold">
          <Stars value={review.rating} />
          {format.number(review.rating, { maximumFractionDigits: 1 })}
        </span>
      </div>
      <dl className="grid grid-cols-3 gap-2 text-xs">
        {CRITERIA.map((c) => (
          <div key={c}>
            <dt className="text-muted-foreground">{t(`criteria.${side}.${c}`)}</dt>
            <dd className="tabular font-medium">{review[c]}/5</dd>
          </div>
        ))}
      </dl>
      {review.comment ? (
        <p className="text-muted-foreground text-sm whitespace-pre-line">{review.comment}</p>
      ) : null}
    </div>
  );
}

function ReviewForm({ code, side }: { code: string; side: Side }) {
  const t = useTranslations('trust.reviews');
  const tc = useTranslations('common');
  const submit = useSubmitReview(code);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SubmitReviewInput, unknown, SubmitReviewDto>({
    resolver: zodResolver(SubmitReviewSchema),
    defaultValues: { comment: '' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <form
      className="grid gap-4"
      noValidate
      onSubmit={(e) =>
        void form.handleSubmit(async (dto) => {
          try {
            await submit.mutateAsync(dto);
            toast.success(t('submitted'));
          } catch (err) {
            setError(
              applyServerErrors(err, form.setError, [...CRITERIA, 'comment'], tc('networkError')),
            );
          }
        })(e)
      }
    >
      <FormAlert message={error} />
      <FieldGroup className="gap-3">
        {CRITERIA.map((c) => (
          <Field key={c} data-invalid={!!errors[c]}>
            <Controller
              control={form.control}
              name={c}
              render={({ field }) => (
                <StarInput
                  label={t(`criteria.${side === 'BUYER' ? 'BUYER' : 'MANUFACTURER'}.${c}`)}
                  value={typeof field.value === 'number' ? field.value : undefined}
                  onChange={field.onChange}
                  invalid={!!errors[c]}
                />
              )}
            />
            <FieldError errors={[errors[c]]} />
          </Field>
        ))}
        <Field data-invalid={!!errors.comment}>
          <FieldLabel htmlFor={`review-comment-${code}`}>{t('comment')}</FieldLabel>
          <Textarea
            id={`review-comment-${code}`}
            rows={3}
            placeholder={t(`commentPlaceholder.${side}`)}
            {...form.register('comment')}
          />
          <FieldError errors={[errors.comment]} />
        </Field>
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {t('submit')}
      </Button>
    </form>
  );
}

/** Buyer reviews on a factory's public profile: the averages, then each review. */
export function FactoryReviews({ code, rating }: { code: string; rating: PublicRating | null }) {
  const t = useTranslations('trust.reviews');
  const format = useFormatter();
  const locale = useLocale();
  const reviews = useFactoryReviews(code);
  const one = (v: number) => format.number(v, { maximumFractionDigits: 1 });

  return (
    <section aria-labelledby="factory-reviews" className="space-y-4">
      <h2 id="factory-reviews" className="text-lg font-semibold tracking-[-0.01em]">
        {t('publicTitle')}
      </h2>
      {rating ? (
        <div className="bg-card grid gap-4 rounded-xl border p-4 shadow-xs sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8">
          <div>
            <p className="tabular text-3xl font-semibold tracking-[-0.02em]">
              {one(rating.average)}
            </p>
            <Stars value={rating.average} />
            <p className="text-muted-foreground mt-1 text-xs">
              {t('count', { count: rating.count })}
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3 text-sm">
            {CRITERIA.map((c) => (
              <div key={c}>
                <dt className="text-muted-foreground text-xs">{t(`criteria.BUYER.${c}`)}</dt>
                <dd className="tabular font-semibold">{one(rating[c])}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
      {reviews.isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 2 }, (_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : reviews.isError ? (
        <ErrorState
          size="compact"
          onRetry={() => void reviews.refetch()}
          retrying={reviews.isFetching}
        />
      ) : reviews.data.length === 0 ? (
        <EmptyState
          size="compact"
          icon={MessageSquareQuote}
          title={t('publicEmpty')}
          description={t('publicEmptyBody')}
        />
      ) : (
        <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
          {reviews.data.map((r, i) => (
            <li key={`${r.createdAt}-${String(i)}`} className="space-y-1.5 px-4 py-4 sm:px-5">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <Stars value={r.rating} />
                <span className="tabular font-semibold">{one(r.rating)}</span>
                <span className="text-muted-foreground text-xs">
                  {t('byBuyerFrom', { country: countryName(r.buyerCountry, locale) })} ·{' '}
                  {format.dateTime(new Date(r.createdAt), { dateStyle: 'medium' })}
                </span>
              </div>
              {r.comment ? (
                <p className="text-muted-foreground text-sm whitespace-pre-line">{r.comment}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
