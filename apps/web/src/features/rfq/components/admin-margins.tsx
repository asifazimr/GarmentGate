'use client';

import type { MarginRule } from '@garmentgate/shared';
import { Pencil, Percent, Plus, Trash2 } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
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
import { useCategories } from '@/features/onboarding/api';
import { ApiError } from '@/lib/api';
import { formString } from '@/lib/form-data';
import { useDeleteMarginRule, useMarginRules, useSaveMarginRule } from '../api';

const isDefault = (r: MarginRule) => r.category === null && r.buyerCode === null;

/**
 * GarmentGate's pricing rules: the markup buyers pay over the factory price (factories never see
 * it) and the commission withheld from the factory's payouts, lower for repeat orders.
 */
export function AdminMargins() {
  const t = useTranslations('rfq.margins');
  const format = useFormatter();
  const rules = useMarginRules();
  const remove = useDeleteMarginRule();
  const [editing, setEditing] = useState<MarginRule | 'new' | null>(null);

  const columns = useMemo<DataColumn<MarginRule>[]>(() => {
    const percent = (bps: number) =>
      format.number(bps / 10_000, { style: 'percent', maximumFractionDigits: 2 });
    return [
      {
        id: 'name',
        header: t('columns.name'),
        value: (r) => r.name,
        cell: (r) => (
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{r.name}</span>
            {isDefault(r) ? <Badge variant="brand">{t('default')}</Badge> : null}
            {!r.active ? <Badge variant="neutral">{t('inactive')}</Badge> : null}
          </span>
        ),
      },
      {
        id: 'category',
        header: t('columns.category'),
        value: (r) => r.category?.name ?? t('allCategories'),
      },
      {
        id: 'buyer',
        header: t('columns.buyer'),
        value: (r) => r.buyerCode ?? t('allBuyers'),
        hideOnMobile: true,
      },
      {
        id: 'markup',
        header: t('columns.markup'),
        value: (r) => r.markupBps,
        cell: (r) => percent(r.markupBps),
        align: 'end',
        searchable: false,
      },
      {
        id: 'commission',
        header: t('columns.commission'),
        value: (r) => r.commissionBps,
        cell: (r) => percent(r.commissionBps),
        align: 'end',
        searchable: false,
      },
      {
        id: 'repeat',
        header: t('columns.repeat'),
        value: (r) => r.repeatCommissionBps,
        cell: (r) => (r.repeatCommissionBps === null ? '—' : percent(r.repeatCommissionBps)),
        align: 'end',
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'quotes',
        header: t('columns.quotes'),
        value: (r) => r.quotesPriced,
        align: 'end',
        searchable: false,
        hideOnMobile: true,
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (r) => (
          <span className="flex justify-end gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={t('edit', { name: r.name })}
              onClick={() => setEditing(r)}
            >
              <Pencil />
            </Button>
            {!isDefault(r) ? (
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={t('delete', { name: r.name })}
                onClick={() =>
                  remove.mutate(r.id, {
                    onSuccess: () => toast.success(t('deleted')),
                    onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
                  })
                }
              >
                <Trash2 />
              </Button>
            ) : null}
          </span>
        ),
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ];
  }, [t, format, remove]);

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
      <DataTable
        data={rules.data}
        columns={columns}
        loading={rules.isPending}
        error={rules.isError}
        onRetry={() => void rules.refetch()}
        retrying={rules.isFetching}
        filters={[{ column: 'category', label: t('columns.category') }]}
        csvName="pricing-rules"
        empty={{
          icon: Percent,
          title: t('empty'),
          description: t('emptyBody'),
          action: <Button onClick={() => setEditing('new')}>{t('add')}</Button>,
        }}
      />
      <p className="text-subtle-foreground text-xs">{t('note')}</p>
      <RuleDialog rule={editing} onClose={() => setEditing(null)} />
    </div>
  );
}

/** "12.5" → 1250 basis points; null when it isn't a percentage. */
function toBps(value: string): number | null {
  const pct = Number(value.trim().replace(',', '.'));
  return value.trim() !== '' && Number.isFinite(pct) && pct >= 0 && pct <= 100
    ? Math.round(pct * 100)
    : null;
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
            const markupBps = toBps(formString(data, 'percent'));
            const commissionBps = toBps(formString(data, 'commission'));
            const repeatRaw = formString(data, 'repeatCommission');
            const repeatCommissionBps = repeatRaw.trim() === '' ? null : toBps(repeatRaw);
            if (markupBps === null || commissionBps === null) {
              setError(t('percentInvalid'));
              return;
            }
            if (repeatRaw.trim() !== '' && repeatCommissionBps === null) {
              setError(t('percentInvalid'));
              return;
            }
            if (repeatCommissionBps !== null && repeatCommissionBps > commissionBps) {
              setError(t('repeatTooHigh'));
              return;
            }
            const buyerCode = formString(data, 'buyerCode').trim().toUpperCase();
            save.mutate(
              {
                id: existing?.id ?? null,
                dto: {
                  name: formString(data, 'name').trim(),
                  markupBps,
                  commissionBps,
                  repeatCommissionBps,
                  // Not editable here: keep whatever floor the rule already has.
                  minMarginPerUnitMinor: existing?.minMarginPerUnitMinor ?? undefined,
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
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="rule-commission">{t('commission')}</FieldLabel>
                <Input
                  id="rule-commission"
                  name="commission"
                  inputMode="decimal"
                  required
                  defaultValue={existing ? String(existing.commissionBps / 100) : '0'}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="rule-repeat">{t('repeatCommission')}</FieldLabel>
                <Input
                  id="rule-repeat"
                  name="repeatCommission"
                  inputMode="decimal"
                  placeholder={t('repeatPlaceholder')}
                  defaultValue={
                    existing && existing.repeatCommissionBps !== null
                      ? String(existing.repeatCommissionBps / 100)
                      : ''
                  }
                />
              </Field>
            </div>
            <Field data-invalid={!!error}>
              <FieldDescription>{t('commissionHint')}</FieldDescription>
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
