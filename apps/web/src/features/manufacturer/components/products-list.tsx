'use client';

import type { ManufacturerProduct } from '@garmentgate/shared';
import { ImageIcon, Pencil, Plus, Shirt, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { formatMoney } from '@/lib/format';
import { useDeleteProduct, useProducts } from '../api';

export function ProductsList() {
  const t = useTranslations('manufacturer.products');
  const products = useProducts();
  const [deleting, setDeleting] = useState<ManufacturerProduct | null>(null);

  const newButton = (
    <Button render={<Link href="/manufacturer/products/new" />}>
      <Plus />
      {t('new')}
    </Button>
  );

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} actions={newButton} />
      {products.isPending ? (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i}>
              <Skeleton className="h-72 rounded-xl" />
            </li>
          ))}
        </ul>
      ) : products.isError ? (
        <ErrorState onRetry={() => void products.refetch()} retrying={products.isFetching} />
      ) : products.data.length === 0 ? (
        <EmptyState
          icon={Shirt}
          title={t('empty')}
          description={t('emptyBody')}
          action={newButton}
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.data.map((p) => (
            <ProductCard key={p.id} product={p} onDelete={() => setDeleting(p)} />
          ))}
        </ul>
      )}
      <DeleteDialog product={deleting} onClose={() => setDeleting(null)} />
    </div>
  );
}

function ProductCard({
  product: p,
  onDelete,
}: {
  product: ManufacturerProduct;
  onDelete: () => void;
}) {
  const t = useTranslations('manufacturer.products');
  const locale = useLocale();
  const format = useFormatter();
  const cover = p.images.find((i) => i.urls)?.urls;
  const cheapest = p.priceTiers.at(-1);

  return (
    <li className="group bg-card relative flex flex-col overflow-hidden rounded-xl border shadow-xs transition-[box-shadow,border-color] hover:border-border-strong hover:shadow-md">
      <Link
        href={`/manufacturer/products/${p.id}`}
        className="focus-visible:ring-ring/40 flex flex-1 flex-col outline-none focus-visible:ring-3"
      >
        <div className="bg-muted relative aspect-[4/3]">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element -- signed rendition URL
            <img src={cover.medium} alt="" className="size-full object-cover" loading="lazy" />
          ) : (
            <div className="text-subtle-foreground flex size-full flex-col items-center justify-center gap-2 text-xs">
              <ImageIcon className="size-6" aria-hidden="true" />
              {t('images', { count: p.images.length })}
            </div>
          )}
          <span className="absolute top-3 start-3">
            <StatusBadge domain="product" status={p.status} className="bg-card/90 backdrop-blur" />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="text-muted-foreground text-xs">{p.categoryName}</p>
          <h3 className="font-semibold tracking-[-0.01em]">{p.title}</h3>
          <p className="text-muted-foreground text-sm">
            {[p.fabric, p.gsm ? `${String(p.gsm)} GSM` : null].filter(Boolean).join(' · ')}
          </p>
          <div className="mt-auto flex flex-wrap items-baseline justify-between gap-2 pt-2">
            {cheapest ? (
              <p className="tabular font-semibold">
                {t('fromPrice', {
                  price: formatMoney(cheapest.unitPriceMinor, p.currency, locale),
                })}
              </p>
            ) : null}
            <p className="text-muted-foreground text-xs">
              {t('moq', { count: p.moqPcs })} · {t('leadTime', { count: p.leadTimeDays })}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between border-t px-4 py-2">
        <span className="text-subtle-foreground text-xs">
          {t('updated', { date: format.dateTime(new Date(p.updatedAt), { dateStyle: 'medium' }) })}
        </span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`${t('edit')} ${p.title}`}
            render={<Link href={`/manufacturer/products/${p.id}`} />}
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`${t('delete')} ${p.title}`}
            onClick={onDelete}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </li>
  );
}

function DeleteDialog({
  product,
  onClose,
}: {
  product: ManufacturerProduct | null;
  onClose: () => void;
}) {
  const t = useTranslations('manufacturer.products');
  const tc = useTranslations('common');
  const remove = useDeleteProduct();
  return (
    <Dialog open={product !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('deleteTitle')}</DialogTitle>
          <DialogDescription>
            <strong className="text-foreground">{product?.title}</strong> · {t('deleteBody')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button
            variant="destructive"
            disabled={remove.isPending}
            onClick={() => {
              if (!product) return;
              remove.mutate(product.id, {
                onSuccess: () => {
                  toast.success(t('deleted'));
                  onClose();
                },
              });
            }}
          >
            {t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
