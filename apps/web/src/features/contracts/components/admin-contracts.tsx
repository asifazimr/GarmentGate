'use client';

import {
  type AdminContract,
  type CreateContractDto,
  CreateContractSchema,
  CurrencySchema,
  IncotermSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileSignature, UserRound } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAdminUsers } from '@/features/admin/api';
import { FormAlert } from '@/features/auth/components/form-alert';
import {
  amountToMinor,
  OptionSelect,
  percentToBps,
} from '@/features/logistics/components/form-bits';
import { Footer } from '@/features/logistics/components/partners-hubs';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { ApiError } from '@/lib/api';
import { formatMoney } from '@/lib/format';
import { applyServerErrors } from '@/lib/form-errors';
import {
  useAccountMerchandiser,
  useAdminContracts,
  useCreateContract,
  useEndContract,
  useSetMerchandiser,
} from '../api';

export function AdminContractsPage() {
  const t = useTranslations('contracts');
  const locale = useLocale();
  const format = useFormatter();
  const list = useAdminContracts();
  const end = useEndContract();
  const [creating, setCreating] = useState(false);
  const columns = useMemo<DataColumn<AdminContract>[]>(
    () => [
      {
        id: 'contract',
        header: t('columns.contract'),
        value: (c) =>
          `${c.code} ${c.title} ${c.buyer.code} ${c.buyer.name} ${c.manufacturer.code} ${c.manufacturer.name}`,
        cell: (c) => (
          <span>
            <span className="font-mono text-xs font-medium">{c.code}</span>
            <span className="block">{c.title}</span>
            <span className="text-muted-foreground block text-xs">
              {c.buyer.code} · {c.buyer.name} ← {c.manufacturer.code} · {c.manufacturer.name}
            </span>
          </span>
        ),
      },
      {
        id: 'prices',
        header: t('columns.prices'),
        value: (c) => c.buyerUnitPriceMinor,
        cell: (c) => (
          <span className="tabular text-xs">
            {formatMoney(c.buyerUnitPriceMinor, c.currency, locale)}
            <span className="text-muted-foreground block">
              {formatMoney(c.manufacturerUnitPriceMinor, c.currency, locale)}
            </span>
          </span>
        ),
        align: 'end',
        searchable: false,
      },
      {
        id: 'volume',
        header: t('columns.volume'),
        value: (c) => c.calledOffQuantity / c.contractedQuantity,
        cell: (c) => (
          <span className="tabular text-xs">
            {format.number(c.calledOffQuantity)} / {format.number(c.contractedQuantity)}
          </span>
        ),
        align: 'end',
        searchable: false,
      },
      {
        id: 'status',
        header: t('columns.status'),
        value: (c) => c.status,
        cell: (c) => (
          <Badge variant={c.status === 'ACTIVE' ? 'success' : 'neutral'}>
            {t(`status.${c.status}`)}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (c) =>
          c.status === 'ACTIVE' ? (
            <Button
              size="xs"
              variant="ghost"
              disabled={end.isPending}
              onClick={() =>
                end.mutate(c.code, {
                  onSuccess: () => toast.success(t('ended')),
                  onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
                })
              }
            >
              {t('end')}
            </Button>
          ) : null,
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, locale, format, end],
  );
  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('adminDescription')}
        actions={<Button onClick={() => setCreating(true)}>{t('create')}</Button>}
      />
      <DataTable
        data={list.data}
        columns={columns}
        loading={list.isPending}
        error={list.isError}
        onRetry={() => void list.refetch()}
        retrying={list.isFetching}
        csvName="supply-contracts"
        empty={{ icon: FileSignature, title: t('empty'), description: t('emptyAdmin') }}
      />
      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="sm:max-w-2xl">
          {creating ? <CreateForm onClose={() => setCreating(false)} /> : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const FormSchema = z
  .object({
    buyerCode: z.string(),
    manufacturerCode: z.string(),
    title: z.string(),
    specification: z.string(),
    currency: z.string(),
    buyerPrice: z.string(),
    factoryPrice: z.string(),
    contractedQuantity: z.string(),
    minCallOffQuantity: z.string(),
    deposit: z.string(),
    incoterm: z.string(),
    destinationCountry: z.string(),
    leadTimeDays: z.string(),
    startsOn: z.string(),
    endsOn: z.string(),
  })
  .transform((f, ctx): CreateContractDto => {
    const r = CreateContractSchema.safeParse({
      buyerCode: f.buyerCode.trim().toUpperCase(),
      manufacturerCode: f.manufacturerCode.trim().toUpperCase(),
      title: f.title,
      specification: f.specification,
      currency: f.currency,
      buyerUnitPriceMinor: amountToMinor(f.buyerPrice, f.currency),
      manufacturerUnitPriceMinor: amountToMinor(f.factoryPrice, f.currency),
      contractedQuantity: f.contractedQuantity,
      minCallOffQuantity: f.minCallOffQuantity,
      depositBps: percentToBps(f.deposit),
      incoterm: f.incoterm,
      destinationCountry: f.destinationCountry,
      leadTimeDays: f.leadTimeDays,
      startsOn: f.startsOn,
      endsOn: f.endsOn,
    });
    if (r.success) return r.data;
    const rename: Record<string, string> = {
      buyerUnitPriceMinor: 'buyerPrice',
      manufacturerUnitPriceMinor: 'factoryPrice',
      depositBps: 'deposit',
    };
    for (const issue of r.error.issues)
      ctx.addIssue({
        code: 'custom',
        message: issue.message,
        path: issue.path.map((p) => (typeof p === 'string' ? (rename[p] ?? p) : p)),
      });
    return z.NEVER;
  });

function CreateForm({ onClose }: { onClose: () => void }) {
  const t = useTranslations('contracts.form');
  const tc = useTranslations('common');
  const create = useCreateContract();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<z.input<typeof FormSchema>, unknown, CreateContractDto>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      buyerCode: '',
      manufacturerCode: '',
      title: '',
      specification: '',
      currency: 'USD',
      buyerPrice: '',
      factoryPrice: '',
      contractedQuantity: '',
      minCallOffQuantity: '',
      deposit: '30',
      incoterm: 'FOB',
      destinationCountry: '',
      leadTimeDays: '45',
      startsOn: '',
      endsOn: '',
    },
  });
  const { errors, isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      const { code } = await create.mutateAsync(dto);
      toast.success(t('created', { code }));
      onClose();
    } catch (error) {
      setFormError(
        applyServerErrors(
          error,
          form.setError,
          ['buyerCode', 'manufacturerCode'],
          tc('networkError'),
        ),
      );
    }
  });
  type Name = keyof z.input<typeof FormSchema>;
  const text = (name: Name, type = 'text') => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`ct-${name}`}>{t(`fields.${name}`)}</FieldLabel>
      <Input id={`ct-${name}`} type={type} {...form.register(name)} />
      <FieldError errors={[errors[name]]} />
    </Field>
  );
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription>{t('description')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          {text('buyerCode')}
          {text('manufacturerCode')}
        </div>
        {text('title')}
        <Field data-invalid={!!errors.specification}>
          <FieldLabel htmlFor="ct-spec">{t('fields.specification')}</FieldLabel>
          <Textarea id="ct-spec" rows={3} {...form.register('specification')} />
          <FieldError errors={[errors.specification]} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="ct-currency">{t('fields.currency')}</FieldLabel>
            <Controller
              control={form.control}
              name="currency"
              render={({ field }) => (
                <OptionSelect
                  id="ct-currency"
                  value={field.value}
                  onChange={field.onChange}
                  options={CurrencySchema.options.map((c) => ({ value: c, label: c }))}
                />
              )}
            />
          </Field>
          {text('buyerPrice')}
          {text('factoryPrice')}
          {text('contractedQuantity')}
          {text('minCallOffQuantity')}
          {text('deposit')}
          <Field>
            <FieldLabel htmlFor="ct-incoterm">{t('fields.incoterm')}</FieldLabel>
            <Controller
              control={form.control}
              name="incoterm"
              render={({ field }) => (
                <OptionSelect
                  id="ct-incoterm"
                  value={field.value}
                  onChange={field.onChange}
                  options={IncotermSchema.options.map((i) => ({ value: i, label: i }))}
                />
              )}
            />
          </Field>
          <Field data-invalid={!!errors.destinationCountry}>
            <FieldLabel htmlFor="ct-dest">{t('fields.destinationCountry')}</FieldLabel>
            <Controller
              control={form.control}
              name="destinationCountry"
              render={({ field }) => (
                <CountrySelect
                  id="ct-dest"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder={t('choose')}
                  invalid={!!errors.destinationCountry}
                />
              )}
            />
            <FieldError errors={[errors.destinationCountry]} />
          </Field>
          {text('leadTimeDays')}
          {text('startsOn', 'date')}
          {text('endsOn', 'date')}
        </div>
      </FieldGroup>
      <Footer onClose={onClose} pending={isSubmitting} save={t('save')} />
    </form>
  );
}

/** On the admin order page: who at GarmentGate looks after this buyer. */
export function MerchandiserPicker({ buyerCode }: { buyerCode: string }) {
  const t = useTranslations('contracts.merchandiser');
  const current = useAccountMerchandiser(buyerCode);
  const users = useAdminUsers();
  const set = useSetMerchandiser(buyerCode);
  const staff = (users.data ?? []).filter((u) => u.role === 'ADMIN' && u.status === 'ACTIVE');
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <UserRound className="size-4" aria-hidden="true" />
      <span className="text-muted-foreground">{t('label')}</span>
      <div className="min-w-48">
        <OptionSelect
          id={`merch-${buyerCode}`}
          value={current.data?.userId ?? ''}
          onChange={(v) =>
            set.mutate(v === '' ? null : v, {
              onSuccess: () => toast.success(t('saved')),
              onError: (e) => toast.error(e instanceof ApiError ? e.message : t('failed')),
            })
          }
          emptyLabel={t('none')}
          options={staff.map((u) => ({ value: u.id, label: u.name }))}
        />
      </div>
    </div>
  );
}
