'use client';

import type { Shortlist } from '@garmentgate/shared';
import { Heart, ListPlus, MoreHorizontal, Pencil, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ApiError } from '@/lib/api';
import { formString } from '@/lib/form-data';
import { cn } from '@/lib/utils';
import { useDeleteShortlist, useRenameShortlist, useShortlists, useToggleSaved } from '../api';
import { FactoryCard } from './factory-card';
import { ProductCard, ProductCardSkeleton, ProductGrid } from './product-card';
import { NewListDialog } from './save-controls';

export function Shortlists() {
  const t = useTranslations('discovery.shortlists');
  const lists = useShortlists();
  const [selectedId, setSelectedId] = useQueryState(
    'list',
    parseAsString.withOptions({ history: 'replace' }),
  );
  const [creating, setCreating] = useState(false);

  const newButton = (
    <Button onClick={() => setCreating(true)}>
      <ListPlus />
      {t('newList')}
    </Button>
  );

  const selected = lists.data?.find((l) => l.id === selectedId) ?? lists.data?.[0];

  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} actions={newButton} />

      {lists.isPending ? (
        <div className="space-y-6">
          <div className="flex gap-2">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-full" />
            ))}
          </div>
          <ProductGrid view="grid">
            {Array.from({ length: 3 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </ProductGrid>
        </div>
      ) : lists.isError ? (
        <ErrorState onRetry={() => void lists.refetch()} retrying={lists.isFetching} />
      ) : (
        <>
          <nav aria-label={t('lists')} className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <ul className="flex gap-2 pb-1">
              {lists.data.map((list) => {
                const active = list.id === selected?.id;
                const count = list.products.length + list.manufacturers.length;
                return (
                  <li key={list.id} className="shrink-0">
                    <Button
                      variant={active ? 'default' : 'outline'}
                      className="rounded-full"
                      aria-current={active ? 'page' : undefined}
                      onClick={() => void setSelectedId(list.id)}
                    >
                      {list.isDefault ? <Heart className={cn(active && 'fill-current')} /> : null}
                      {list.name}
                      <span
                        className={cn(
                          'tabular text-xs',
                          active ? 'opacity-80' : 'text-muted-foreground',
                        )}
                      >
                        {count}
                      </span>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </nav>
          {selected ? (
            <ListView
              key={selected.id}
              list={selected}
              onDeleted={() => void setSelectedId(null)}
            />
          ) : null}
        </>
      )}

      <NewListDialog
        open={creating}
        onClose={() => setCreating(false)}
        onCreated={(id, name) => {
          toast.success(t('created', { name }));
          void setSelectedId(id);
        }}
      />
    </div>
  );
}

function ListView({ list, onDeleted }: { list: Shortlist; onDeleted: () => void }) {
  const t = useTranslations('discovery.shortlists');
  const toggle = useToggleSaved();
  const [renaming, setRenaming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const empty = list.products.length === 0 && list.manufacturers.length === 0;

  const removeButton = (label: string, onClick: () => void) => (
    <Button
      variant="ghost"
      size="sm"
      className="text-muted-foreground hover:text-danger-ink w-full justify-start"
      onClick={onClick}
      aria-label={t('removeItem', { item: label, list: list.name })}
    >
      <Trash2 />
      {t('remove')}
    </Button>
  );
  const remove = (target: { productId: string } | { manufacturerCode: string }) =>
    toggle.mutate(
      { listId: list.id, target, save: false },
      { onSuccess: () => toast.success(t('removed', { list: list.name })) },
    );

  return (
    <section aria-labelledby="list-heading" className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h2 id="list-heading" className="truncate text-lg font-semibold tracking-[-0.01em]">
          {list.name}
        </h2>
        {!list.isDefault ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t('listActions', { name: list.name })}
                >
                  <MoreHorizontal />
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem onClick={() => setRenaming(true)} className="min-h-9">
                <Pencil />
                {t('rename')}
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleting(true)}
                className="min-h-9"
              >
                <Trash2 />
                {t('delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      {empty ? (
        <EmptyState
          icon={list.isDefault ? Heart : ListPlus}
          title={t('empty')}
          description={list.isDefault ? t('emptyFavorites') : t('emptyBody')}
          action={
            <Button render={<Link href="/buyer/search" />}>
              <Search />
              {t('browse')}
            </Button>
          }
        />
      ) : (
        <>
          {list.products.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-muted-foreground text-sm font-medium">
                {t('products', { count: list.products.length })}
              </h3>
              <ProductGrid view="grid">
                {list.products.map(({ itemId, product }) => (
                  <ProductCard
                    key={itemId}
                    product={product}
                    footer={removeButton(product.title, () => remove({ productId: product.id }))}
                  />
                ))}
              </ProductGrid>
            </div>
          ) : null}
          {list.manufacturers.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-muted-foreground text-sm font-medium">
                {t('factories', { count: list.manufacturers.length })}
              </h3>
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {list.manufacturers.map(({ itemId, manufacturer }) => (
                  <FactoryCard
                    key={itemId}
                    factory={manufacturer}
                    footer={removeButton(manufacturer.publicCode, () =>
                      remove({ manufacturerCode: manufacturer.publicCode }),
                    )}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </>
      )}

      <RenameDialog list={list} open={renaming} onClose={() => setRenaming(false)} />
      <DeleteDialog
        list={list}
        open={deleting}
        onClose={() => setDeleting(false)}
        onDeleted={onDeleted}
      />
    </section>
  );
}

function RenameDialog({
  list,
  open,
  onClose,
}: {
  list: Shortlist;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('discovery.shortlists');
  const tc = useTranslations('common');
  const rename = useRenameShortlist();
  const [error, setError] = useState<string | null>(null);
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent>
        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            const name = formString(new FormData(event.currentTarget), 'name').trim();
            if (!name) {
              setError(t('nameRequired'));
              return;
            }
            rename.mutate(
              { id: list.id, name },
              {
                onSuccess: () => {
                  setError(null);
                  toast.success(t('renamed'));
                  onClose();
                },
                onError: (err) =>
                  setError(err instanceof ApiError ? err.message : tc('networkError')),
              },
            );
          }}
        >
          <DialogHeader>
            <DialogTitle>{t('rename')}</DialogTitle>
            <DialogDescription className="sr-only">{t('rename')}</DialogDescription>
          </DialogHeader>
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="rename-list">{t('nameLabel')}</FieldLabel>
            <Input id="rename-list" name="name" defaultValue={list.name} maxLength={60} autoFocus />
            <FieldError>{error}</FieldError>
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {tc('cancel')}
            </Button>
            <Button type="submit" disabled={rename.isPending}>
              {t('save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteDialog({
  list,
  open,
  onClose,
  onDeleted,
}: {
  list: Shortlist;
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const t = useTranslations('discovery.shortlists');
  const tc = useTranslations('common');
  const remove = useDeleteShortlist();
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('deleteTitle', { name: list.name })}</DialogTitle>
          <DialogDescription>{t('deleteBody')}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button
            variant="destructive"
            disabled={remove.isPending}
            onClick={() =>
              remove.mutate(list.id, {
                onSuccess: () => {
                  toast.success(t('deleted'));
                  onClose();
                  onDeleted();
                },
                onError: () => toast.error(tc('somethingWentWrong')),
              })
            }
          >
            {t('delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
