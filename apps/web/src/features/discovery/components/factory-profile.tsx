'use client';

import { ArrowLeft, Factory, Shirt } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PublicManufacturerView } from '@/features/catalog/components/public-manufacturer-view';
import { FactoryReviews } from '@/features/trust/components/reviews';
import { ApiError } from '@/lib/api';
import { useFactory, useFactoryProducts } from '../api';
import { ProductCard, ProductCardSkeleton, ProductGrid } from './product-card';
import { FavoriteButton, SaveToListMenu } from './save-controls';

/** A factory as buyers see it: the anonymised profile plus its published products. */
export function FactoryProfile({ code }: { code: string }) {
  const t = useTranslations('discovery.factory');
  const factory = useFactory(code);
  const products = useFactoryProducts(code);

  const back = (
    <Button variant="ghost" size="sm" className="-ms-2" render={<Link href="/buyer/factories" />}>
      <ArrowLeft className="rtl:rotate-180" />
      {t('back')}
    </Button>
  );

  if (factory.isPending) {
    return (
      <div className="space-y-6">
        {back}
        <Skeleton className="h-8 w-48" />
        <Skeleton className="aspect-[3/1] rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    );
  }
  if (factory.isError) {
    return (
      <div className="space-y-6">
        {back}
        {factory.error instanceof ApiError && factory.error.status === 404 ? (
          <EmptyState
            icon={Factory}
            title={t('notFound')}
            description={t('notFoundBody')}
            action={<Button render={<Link href="/buyer/factories" />}>{t('back')}</Button>}
          />
        ) : (
          <ErrorState onRetry={() => void factory.refetch()} retrying={factory.isFetching} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {back}
        <div className="flex gap-2">
          <SaveToListMenu target={{ manufacturerCode: code }} label={code} />
          <FavoriteButton target={{ manufacturerCode: code }} label={code} variant="outline" />
        </div>
      </div>
      <PublicManufacturerView manufacturer={factory.data} />

      <section aria-labelledby="factory-products" className="space-y-4">
        <h2 id="factory-products" className="text-lg font-semibold tracking-[-0.01em]">
          {t('products')}
        </h2>
        {products.isPending ? (
          <ProductGrid view="grid">
            {Array.from({ length: 3 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </ProductGrid>
        ) : products.isError ? (
          <ErrorState onRetry={() => void products.refetch()} retrying={products.isFetching} />
        ) : products.data.length === 0 ? (
          <EmptyState
            size="compact"
            icon={Shirt}
            title={t('noProducts')}
            description={t('noProductsBody')}
            action={
              <Button variant="outline" render={<Link href="/buyer/search" />}>
                {t('browseProducts')}
              </Button>
            }
          />
        ) : (
          <ProductGrid view="grid">
            {products.data.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </ProductGrid>
        )}
      </section>

      <FactoryReviews code={code} rating={factory.data.scores.rating} />
    </div>
  );
}
