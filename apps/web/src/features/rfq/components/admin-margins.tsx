'use client';

import type { MarginRule } from '@garmentgate/shared';
import { Pencil, Percent, Plus, Trash2 } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { useCategories } from '@/features/onboarding/api';
import { ApiError } from '@/lib/api';
import { formString } from '@/lib/form-data';
import { useDeleteMarginRule, useMarginRules, useSaveMarginRule } from '../api';

const isDefault = (r: MarginRule) => r.category === null && r.buyerCode === null;

/** GarmentGate's markup: buyers see factory price + markup; factories never see it. */
export function AdminMargins() {
  const t = useTranslations('rfq.margins');
  const format = useFormatter();
  const rules = useMarginRules();
  const remove = useDeleteMarginRule();
  const [editing, setEditing] = useState<MarginRule | 'new' | null>(null);
  const percent = (bps: number) =>
    format.number(bps / 10_000, { style: 'percent', maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('description')}
        actions={
          <Button onClick={() => setEditing('new')}>
            <Plus />
            {t('add')}
          </Button>
        }
      />
      {rules.isPending ? (
        <Skeleton className="h-64 rounded-xl" />
      ) : rules.isError ? (
        <ErrorState onRetry={() => void rules.refetch()} retrying={rules.isFetching} />
      ) : rules.data.length === 0 ? (
        <EmptyState
          icon={Percent}
          title={t('empty')}
          description={t('emptyBody')}
          action={<Button onClick={() => setEditing('new')}>{t('add')}</Button>}
        />
      ) : (
        <ul className="bg-card divide-y overflow-hidden rounded-xl border shadow-xs">
          {rules.data.map((r) => (
            <li key={r.id} className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-5">
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{r.name}</p>
                  {isDefault(r) ? <Badge variant="brand">{t('default')}</Badge> : null}
                  {!r.active ? <Badge variant="neutral">{t('inactive')}</Badge> : null}
                </div>
                <p className="text-muted-foreground text-xs">
                  {[
                    r.category?.name ?? t('allCategories'),
                    r.buyerCode ?? t('allBuyers'),
                    t('quotesPriced', { count: r.quotesPriced }),
                  ].join(' · ')}
                </p>
              </div>
              <p className="tabular text-lg font-semibold">{percent(r.markupBps)}</p>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={t('edit', { name: r.name })}
                  onClick={() => setEditing(r)}
                >
                  <Pencil />
                </Button>
                {!isDefault(r) ? (
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={t('delete', { name: r.name })}
                    onClick={() =>
                      remove.mutate(r.id, {
                        onSuccess: () => toast.success(t('deleted')),
                        onError: (e) =>
                          toast.error(e instanceof ApiError ? e.message : t('failed')),
                      })
                    }
                  >
                    <Trash2 />
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="text-subtle-foreground text-xs">{t('note')}</p>
      <RuleDialog rule={editing} onClose={() => setEditing(null)} />
    </div>
  );
}

function RuleDialog({ rule, onClose }: { rule: MarginRule | 'new' | null; onClose: () => void }) {
  const t = useTranslations('rfq.margins');
  const tc = useTranslations('common');
  const categories = useCategories();
  const save = useSaveMarginRule();
  const [error, setError] = useState<string | null>(null);
  const existing = rule === 'new' ? null : rule;
  const defaultRule = existing ? isDefault(existing) : false;
  const [categoryId, setCategoryId] = useState<string>('any');
  const [synced, setSynced] = useState<MarginRule | 'new' | null>(null);
  if (rule !== synced) {
    setSynced(rule);
    setCategoryId(existing?.category?.id ?? 'any');
    setError(null);
  }
  const items = [
    { value: 'any', label: t('allCategories') },
    ...(categories.data ?? []).map((c) => ({ value: c.id, label: c.name })),
  ];

  return (
    <Dialog open={rule !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const pct = Number(formString(data, 'percent').replace(',', '.'));
            if (!Number.isFinite(pct) || pct < 0 || pct > 100) {
              setError(t('percentInvalid'));
              return;
            }
            const buyerCode = formString(data, 'buyerCode').trim().toUpperCase();
            save.mutate(
              {
                id: existing?.id ?? null,
                dto: {
                  name: formString(data, 'name').trim(),
                  markupBps: Math.round(pct * 100),
                  categoryId: categoryId === 'any' ? null : categoryId,
                  buyerCode: buyerCode === '' ? null : buyerCode,
                  active: defaultRule || data.get('active') === 'on',
                },
              },
              {
                onSuccess: () => {
                  toast.success(t('saved'));
                  onClose();
                },
                onError: (e) => setError(e instanceof ApiError ? e.message : tc('networkError')),
              },
            );
          }}
        >
          <DialogHeader>
            <DialogTitle>{existing ? t('editTitle') : t('addTitle')}</DialogTitle>
            <DialogDescription>{t('dialogBody')}</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="rule-name">{t('name')}</FieldLabel>
              <Input
                id="rule-name"
                name="name"
                required
                minLength={2}
                maxLength={80}
                defaultValue={existing?.name ?? ''}
              />
            </Field>
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor="rule-percent">{t('markup')}</FieldLabel>
              <Input
                id="rule-percent"
                name="percent"
                inputMode="decimal"
                required
                defaultValue={existing ? String(existing.markupBps / 100) : '15'}
              />
              <FieldDescription>{t('markupHint')}</FieldDescription>
              <FieldError>{error}</FieldError>
            </Field>
            {!defaultRule ? (
              <>
                <Field>
                  <FieldLabel htmlFor="rule-category">{t('category')}</FieldLabel>
                  <Select
                    items={items}
                    value={categoryId}
                    onValueChange={(v) => setCategoryId(typeof v === 'string' ? v : 'any')}
                  >
                    <SelectTrigger id="rule-category" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-72">
                      {items.map((i) => (
                        <SelectItem key={i.value} value={i.value}>
                          {i.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="rule-buyer">{t('buyer')}</FieldLabel>
                  <Input
                    id="rule-buyer"
                    name="buyerCode"
                    placeholder="BYR-US-0012"
                    defaultValue={existing?.buyerCode ?? ''}
                  />
                  <FieldDescription>{t('buyerHint')}</FieldDescription>
                </Field>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox name="active" defaultChecked={existing?.active ?? true} />
                  {t('active')}
                </label>
              </>
            ) : null}
          </FieldGroup>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {tc('cancel')}
            </Button>
            <Button type="submit" disabled={save.isPending}>
              {t('save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
