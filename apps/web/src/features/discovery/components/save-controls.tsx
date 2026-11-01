'use client';

import type { ShortlistItemInput } from '@garmentgate/shared';
import { Heart, ListPlus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ApiError } from '@/lib/api';
import { formString } from '@/lib/form-data';
import { cn } from '@/lib/utils';
import { savedIn, useCreateShortlist, useSaved, useToggleSaved } from '../api';

/** Heart button: saves to (or removes from) the company's Favorites list. */
export function FavoriteButton({
  target,
  label,
  className,
  variant = 'overlay',
}: {
  target: ShortlistItemInput;
  /** What is being saved, for the accessible name. */
  label: string;
  className?: string;
  variant?: 'overlay' | 'outline';
}) {
  const t = useTranslations('discovery.save');
  const saved = useSaved();
  const toggle = useToggleSaved();
  const favorites = saved.data?.lists.find((l) => l.isDefault);
  const isSaved = favorites ? savedIn(saved.data, target).includes(favorites.id) : false;

  return (
    <Button
      type="button"
      variant={variant === 'overlay' ? 'ghost' : 'outline'}
      size="icon"
      aria-pressed={isSaved}
      aria-label={`${isSaved ? t('remove') : t('add')}: ${label}`}
      disabled={!favorites}
      onClick={(event) => {
        // Cards are links: don't navigate.
        event.preventDefault();
        event.stopPropagation();
        if (!favorites) return;
        toggle.mutate(
          { listId: favorites.id, target, save: !isSaved },
          { onError: () => toast.error(t('failed')) },
        );
      }}
      className={cn(
        variant === 'overlay' && 'bg-card/90 hover:bg-card rounded-full shadow-xs backdrop-blur',
        className,
      )}
    >
      <Heart
        className={cn(
          'transition-[fill,color,scale] duration-200 ease-out-expo active:scale-90',
          isSaved ? 'fill-danger text-danger' : 'text-foreground',
        )}
        aria-hidden="true"
      />
    </Button>
  );
}

/** "Save to list" menu: tick any of the company's lists, or start a new one. */
export function SaveToListMenu({ target, label }: { target: ShortlistItemInput; label: string }) {
  const t = useTranslations('discovery.save');
  const saved = useSaved();
  const toggle = useToggleSaved();
  const [creating, setCreating] = useState(false);
  const inLists = savedIn(saved.data, target);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" aria-label={`${t('saveTo')}: ${label}`}>
              <ListPlus />
              <span>
                {inLists.length > 0 ? t('savedCount', { count: inLists.length }) : t('saveTo')}
              </span>
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuGroup>
            <DropdownMenuLabel>{t('saveTo')}</DropdownMenuLabel>
            {saved.data?.lists.map((list) => {
              const checked = inLists.includes(list.id);
              return (
                <DropdownMenuCheckboxItem
                  key={list.id}
                  checked={checked}
                  closeOnClick={false}
                  onCheckedChange={(next) =>
                    toggle.mutate(
                      { listId: list.id, target, save: next },
                      {
                        onSuccess: () =>
                          toast.success(
                            next
                              ? t('added', { list: list.name })
                              : t('removed', { list: list.name }),
                          ),
                        onError: () => toast.error(t('failed')),
                      },
                    )
                  }
                  className="min-h-9"
                >
                  <span className="truncate">{list.name}</span>
                </DropdownMenuCheckboxItem>
              );
            })}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setCreating(true)} className="min-h-9">
            <Plus />
            {t('newList')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <NewListDialog
        open={creating}
        onClose={() => setCreating(false)}
        onCreated={(id, name) =>
          toggle.mutate(
            { listId: id, target, save: true },
            { onSuccess: () => toast.success(t('added', { list: name })) },
          )
        }
      />
    </>
  );
}

/** Name a new list. Shared by the save menu and the shortlists page. */
export function NewListDialog({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated?: (id: string, name: string) => void;
}) {
  const t = useTranslations('discovery.shortlists');
  const tc = useTranslations('common');
  const create = useCreateShortlist();
  const [error, setError] = useState<string | null>(null);

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          setError(null);
          onClose();
        }
      }}
    >
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
            create.mutate(name, {
              onSuccess: ({ id }) => {
                setError(null);
                onCreated?.(id, name);
                onClose();
              },
              onError: (err) =>
                setError(err instanceof ApiError ? err.message : tc('networkError')),
            });
          }}
        >
          <DialogHeader>
            <DialogTitle>{t('newList')}</DialogTitle>
            <DialogDescription>{t('newListBody')}</DialogDescription>
          </DialogHeader>
          <Field data-invalid={!!error}>
            <FieldLabel htmlFor="list-name">{t('nameLabel')}</FieldLabel>
            <Input
              id="list-name"
              name="name"
              maxLength={60}
              placeholder={t('namePlaceholder')}
              aria-invalid={!!error}
              autoFocus
            />
            <FieldError>{error}</FieldError>
          </Field>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {tc('cancel')}
            </Button>
            <Button type="submit" disabled={create.isPending}>
              {t('create')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
