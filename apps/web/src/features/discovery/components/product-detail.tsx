'use client';

import type { PublicManufacturer, PublicProduct } from '@garmentgate/shared';
import {
  ArrowLeft,
  BadgeCheck,
  Clock,
  FileText,
  Globe2,
  ImageIcon,
  Package,
  PackageSearch,
  Ruler,
  Scissors,
  Shirt,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ApiError } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { useMoney } from '@/lib/use-money';
import { cn } from '@/lib/utils';
import { useFactory, useProduct } from '../api';
import { RequestDialog, type RequestKind } from './request-dialog';
import { FavoriteButton, SaveToListMenu } from './save-controls';
import { Rendition } from '@/components/patterns/rendition';

/** The tier that applies to a quantity: the highest minQty not above it. */
export function tierFor(tiers: PublicProduct['priceTiers'], quantity: number) {
  const sorted = [...tiers].sort((a, b) => a.minQty - b.minQty);
  return sorted.filter((tier) => tier.minQty <= quantity).at(-1) ?? null;
}

export function ProductDetail({ id }: { id: string }) {
  const t = useTranslations('discovery.product');
  const product = useProduct(id);

  if (product.isPending) return <ProductDetailSkeleton />;
  if (product.isError) {
    if (product.error instanceof ApiError && product.error.status === 404) {
      return (
        <EmptyState
          icon={PackageSearch}
          title={t('notFound')}
          description={t('notFoundBody')}
          action={<Button render={<Link href="/buyer/search" />}>{t('backToSearch')}</Button>}
        />
      );
    }
    return <ErrorState onRetry={() => void product.refetch()} retrying={product.isFetching} />;
  }
  return <ProductView product={product.data} />;
}

function ProductView({ product: p }: { product: PublicProduct }) {
  const t = useTranslations('discovery.product');
  const locale = useLocale();
  const showMoney = useMoney();
  const format = useFormatter();
  const factory = useFactory(p.manufacturerCode);
  const [requesting, setRequesting] = useState<RequestKind | null>(null);
  const [quantity, setQuantity] = useState(String(p.moqPcs));

  const qty = Number(quantity.replace(/[,\s]/g, ''));
  const validQty = Number.isInteger(qty) && qty > 0;
  const tier = validQty ? tierFor(p.priceTiers, qty) : null;
  const tiers = [...p.priceTiers].sort((a, b) => a.minQty - b.minQty);
  const money = (minor: number) => showMoney(minor, p.currency);

  const specs = [
    { icon: Shirt, label: t('fabric'), value: p.fabric },
    { icon: Scissors, label: t('composition'), value: p.composition },
    { icon: Ruler, label: t('gsm'), value: p.gsm !== null ? format.number(p.gsm) : null },
    { icon: Package, label: t('moq'), value: t('pcs', { count: p.moqPcs }) },
    { icon: Clock, label: t('leadTime'), value: t('days', { count: p.leadTimeDays }) },
    { icon: Globe2, label: t('origin'), value: countryName(p.country, locale) },
  ].filter((s) => s.value);

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" className="-ms-2" render={<Link href="/buyer/search" />}>
        <ArrowLeft className="rtl:rotate-180" />
        {t('back')}
      </Button>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Gallery images={p.images} title={p.title} />

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="brand">{p.category.name}</Badge>
              <Badge variant="code">{p.manufacturerCode}</Badge>
            </div>
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-3xl">
                {p.title}
              </h1>
              <FavoriteButton
                target={{ productId: p.id }}
                label={p.title}
                variant="outline"
                className="shrink-0"
              />
            </div>
            {tiers[0] ? (
              <p className="text-muted-foreground">
                <span className="text-foreground tabular text-2xl font-semibold">
                  {money(tiers.at(-1)?.unitPriceMinor ?? tiers[0].unitPriceMinor)}
                </span>
                {tiers.length > 1 ? (
                  <span className="tabular"> – {money(tiers[0].unitPriceMinor)}</span>
                ) : null}{' '}
                <span className="text-sm">{t('perPiece')}</span>
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={() => setRequesting('QUOTE')}>
              <FileText />
              {t('requestQuote')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => setRequesting('SAMPLE')}
            >
              <Sparkles />
              {t('orderSample')}
            </Button>
          </div>
          <SaveToListMenu target={{ productId: p.id }} label={p.title} />

          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('priceTiers')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('quantity')}</TableHead>
                    <TableHead className="text-end">{t('unitPrice')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tiers.map((row, i) => {
                    const next = tiers[i + 1];
                    const active = tier?.minQty === row.minQty;
                    return (
                      <TableRow
                        key={row.minQty}
                        data-state={active ? 'selected' : undefined}
                        className={cn(active && 'bg-primary-soft/60')}
                      >
                        <TableCell className="tabular">
                          {next
                            ? t('tierRange', { min: row.minQty, max: next.minQty - 1 })
                            : t('tierFrom', { min: row.minQty })}
                        </TableCell>
                        <TableCell className="tabular text-end font-medium">
                          {money(row.unitPriceMinor)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="bg-surface space-y-2 rounded-lg border p-3">
                <label htmlFor="estimate-qty" className="text-sm font-medium">
                  {t('estimator')}
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    id="estimate-qty"
                    inputMode="numeric"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    className="w-32"
                    aria-describedby="estimate-result"
                  />
                  <p id="estimate-result" className="tabular text-sm" aria-live="polite">
                    {!validQty ? (
                      <span className="text-muted-foreground">—</span>
                    ) : tier ? (
                      <>
                        <span className="text-muted-foreground">
                          × {money(tier.unitPriceMinor)} ={' '}
                        </span>
                        <span className="font-semibold">{money(tier.unitPriceMinor * qty)}</span>
                      </>
                    ) : (
                      <span className="text-warning-ink">
                        {t('belowMoq', { count: tiers[0]?.minQty ?? p.moqPcs })}
                      </span>
                    )}
                  </p>
                </div>
                <p className="text-subtle-foreground text-xs">{t('pricesNote')}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <section aria-labelledby="specs-heading" className="space-y-3">
            <h2 id="specs-heading" className="text-lg font-semibold tracking-[-0.01em]">
              {t('specs')}
            </h2>
            <dl className="bg-border grid grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-3">
              {specs.map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-card space-y-1 p-4">
                  <dt className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Icon className="size-3.5" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="font-medium break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
          {p.description ? (
            <section aria-labelledby="description-heading" className="space-y-3">
              <h2 id="description-heading" className="text-lg font-semibold tracking-[-0.01em]">
                {t('description')}
              </h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {p.description}
              </p>
            </section>
          ) : null}
        </div>
        <FactorySummary
          code={p.manufacturerCode}
          factory={factory.data}
          loading={factory.isPending}
        />
      </div>

      <RequestDialog
        product={p}
        kind={requesting}
        quantity={validQty && qty >= p.moqPcs ? qty : p.moqPcs}
        onClose={() => setRequesting(null)}
      />
    </div>
  );
}

function Gallery({ images, title }: { images: PublicProduct['images']; title: string }) {
  const t = useTranslations('discovery.product');
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  if (!current) {
    return (
      <div className="bg-muted text-subtle-foreground flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl text-sm">
        <ImageIcon className="size-8" aria-hidden="true" />
        {t('noImages')}
      </div>
    );
  }
  return (
    <section aria-label={t('gallery')} className="space-y-3">
      <div className="bg-muted overflow-hidden rounded-2xl border">
        <Rendition
          key={current.id}
          urls={current.urls}
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          alt={current.caption ?? title}
          className="animate-in fade-in-0 aspect-[4/3] size-full object-cover duration-200 motion-reduce:animate-none"
        />
      </div>
      {images.length > 1 ? (
        <ul className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <li key={image.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t('image', { n: i + 1, total: images.length })}
                aria-current={i === index}
                className={cn(
                  'focus-visible:ring-ring/40 block size-16 overflow-hidden rounded-lg border-2 outline-none focus-visible:ring-3 sm:size-20',
                  i === index
                    ? 'border-primary'
                    : 'border-transparent opacity-70 hover:opacity-100',
                )}
              >
                <Rendition
                  urls={image.urls}
                  sizes="80px"
                  alt=""
                  className="size-full object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

/** Anonymised factory summary: code, country, verified certificates and scores. Never a name. */
export function FactorySummary({
  code,
  factory,
  loading,
}: {
  code: string;
  factory: PublicManufacturer | undefined;
  loading: boolean;
}) {
  const t = useTranslations('discovery.product');
  const tcert = useTranslations('certifications');
  const locale = useLocale();
  const format = useFormatter();

  return (
    <Card className="h-fit">
      <CardHeader>
        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          {t('factory')}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="code" className="h-7 px-2.5 text-xs">
            {code}
          </Badge>
          {factory ? (
            <Badge variant="success">
              <BadgeCheck aria-hidden="true" />
              {t('verified')}
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : factory ? (
          <>
            {factory.headline ? <p className="text-sm font-medium">{factory.headline}</p> : null}
            <dl className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-surface rounded-lg p-2.5">
                <dt className="text-muted-foreground text-xs">{t('score')}</dt>
                <dd className="tabular text-lg font-semibold">
                  {factory.scores.performanceScore}
                  <span className="text-muted-foreground text-xs font-normal">/100</span>
                </dd>
              </div>
              <div className="bg-surface rounded-lg p-2.5">
                <dt className="text-muted-foreground text-xs">{t('onTime')}</dt>
                <dd className="tabular text-lg font-semibold">
                  {factory.scores.onTimeDeliveryBps !== null
                    ? format.number(factory.scores.onTimeDeliveryBps / 10_000, {
                        style: 'percent',
                        maximumFractionDigits: 0,
                      })
                    : '—'}
                </dd>
              </div>
              <div className="bg-surface rounded-lg p-2.5">
                <dt className="text-muted-foreground text-xs">{t('origin')}</dt>
                <dd className="truncate text-sm font-semibold leading-7">
                  {countryName(factory.country, locale)}
                </dd>
              </div>
            </dl>
            {factory.certifications.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5" aria-label={t('certifications')}>
                {factory.certifications.map((c, i) => (
                  <li key={`${c.type}-${String(i)}`}>
                    <Badge variant="success">
                      <BadgeCheck aria-hidden="true" />
                      {c.name ?? tcert(c.type)}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : null}
        <Button
          variant="outline"
          className="w-full"
          render={<Link href={`/buyer/factories/${encodeURIComponent(code)}`} />}
        >
          {t('viewFactory')}
        </Button>
        <p className="text-subtle-foreground text-xs leading-relaxed">{t('anonymous')}</p>
      </CardContent>
    </Card>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-8 w-32" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Skeleton className="aspect-[4/3] rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-9 w-3/4" />
          <Skeleton className="h-8 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
