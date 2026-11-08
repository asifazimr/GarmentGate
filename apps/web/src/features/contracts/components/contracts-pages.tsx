'use client';

import {
  type BuyerContract,
  type CallOffDto,
  type CallOffInput,
  CallOffSchema,
  type ManufacturerContract,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileSignature, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { Footer } from '@/features/logistics/components/partners-hubs';
import { applyServerErrors } from '@/lib/form-errors';
import { useMoney } from '@/lib/use-money';
import { useBuyerContracts, useCallOff, useFactoryContracts, useMyMerchandiser } from '../api';

type AnyContract = BuyerContract | ManufacturerContract;

/** The buyer's GarmentGate contact (staff), shown wherever the buyer looks for help. */
export function MerchandiserNote() {
  const t = useTranslations('contracts.merchandiser');
  const m = useMyMerchandiser();
  if (!m.data) return null;
  return (
    <p className="bg-surface flex items-center gap-2 rounded-lg border p-3 text-sm">
      <UserRound className="size-4 shrink-0" aria-hidden="true" />
      {t('yours', { name: m.data.name })}
    </p>
  );
}

export function BuyerContractsPage() {
  const t = useTranslations('contracts');
  const list = useBuyerContracts();
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('buyerDescription')} />
      <MerchandiserNote />
      <ContractList query={list} side="BUYER" />
    </div>
  );
}

export function FactoryContractsPage() {
  const t = useTranslations('contracts');
  const list = useFactoryContracts();
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('factoryDescription')} />
      <ContractList query={list} side="MANUFACTURER" />
    </div>
  );
}

function ContractList({
  query,
  side,
}: {
  query: ReturnType<typeof useBuyerContracts> | ReturnType<typeof useFactoryContracts>;
  side: 'BUYER' | 'MANUFACTURER';
}) {
  const t = useTranslations('contracts');
  if (query.isPending)
    return (
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-56 rounded-xl" />
      </div>
    );
  if (query.isError)
    return <ErrorState onRetry={() => void query.refetch()} retrying={query.isFetching} />;
  if (query.data.length === 0)
    return (
      <EmptyState
        icon={FileSignature}
        title={t('empty')}
        description={side === 'BUYER' ? t('emptyBuyer') : t('emptyFactory')}
      />
    );
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {query.data.map((c) => (
        <ContractCard key={c.code} contract={c} side={side} />
      ))}
    </div>
  );
}

function ContractCard({
  contract: c,
  side,
}: {
  contract: AnyContract;
  side: 'BUYER' | 'MANUFACTURER';
}) {
  const t = useTranslations('contracts');
  const format = useFormatter();
  const money = useMoney();
  const [calling, setCalling] = useState(false);
  const left = c.contractedQuantity - c.calledOffQuantity;
  const other = 'manufacturerCode' in c ? c.manufacturerCode : c.buyerCode;
  const day = (iso: string) =>
    format.dateTime(new Date(`${iso}T00:00:00Z`), { dateStyle: 'medium', timeZone: 'UTC' });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          {c.title}
          <Badge variant="code">{c.code}</Badge>
          <Badge variant={c.status === 'ACTIVE' ? 'success' : 'neutral'}>
            {t(`status.${c.status}`)}
          </Badge>
        </CardTitle>
        <CardDescription>
          {t('period', { from: day(c.startsOn), to: day(c.endsOn) })} · {other}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p className="text-muted-foreground whitespace-pre-line">{c.specification}</p>
        <dl className="grid grid-cols-2 gap-2">
          <div>
            <dt className="text-muted-foreground text-xs">{t('price')}</dt>
            <dd className="tabular font-medium">{money(c.unitPriceMinor, c.currency)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground text-xs">{t('volume')}</dt>
            <dd className="tabular">
              {t('used', {
                used: format.number(c.calledOffQuantity),
                total: format.number(c.contractedQuantity),
              })}
            </dd>
          </div>
        </dl>
        <div
          className="bg-muted h-2 overflow-hidden rounded-full"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={c.contractedQuantity}
          aria-valuenow={c.calledOffQuantity}
          aria-label={t('volume')}
        >
          <div
            className="bg-primary h-full"
            style={{
              width: `${String(Math.round((c.calledOffQuantity / c.contractedQuantity) * 100))}%`,
            }}
          />
        </div>
        {c.callOffs.length > 0 ? (
          <ul className="divide-y">
            {c.callOffs.map((o) => (
              <li
                key={o.orderCode}
                className="flex flex-wrap items-center justify-between gap-2 py-2"
              >
                <Link
                  href={`/${side === 'BUYER' ? 'buyer' : 'manufacturer'}/orders/${o.orderCode}`}
                  className="font-mono text-xs font-medium hover:underline"
                >
                  {o.orderCode}
                </Link>
                <span className="tabular text-xs">{t('pieces', { count: o.quantity })}</span>
                <StatusBadge domain="order" status={o.status} />
              </li>
            ))}
          </ul>
        ) : null}
        {side === 'BUYER' && c.status === 'ACTIVE' && left >= c.minCallOffQuantity ? (
          <Button onClick={() => setCalling(true)}>{t('callOff')}</Button>
        ) : null}
        {side === 'BUYER' ? (
          <Dialog open={calling} onOpenChange={setCalling}>
            <DialogContent className="sm:max-w-md">
              {calling ? <CallOffForm contract={c} onClose={() => setCalling(false)} /> : null}
            </DialogContent>
          </Dialog>
        ) : null}
      </CardContent>
    </Card>
  );
}

function CallOffForm({ contract: c, onClose }: { contract: AnyContract; onClose: () => void }) {
  const t = useTranslations('contracts.callOffForm');
  const tc = useTranslations('common');
  const router = useRouter();
  const callOff = useCallOff(c.code);
  const money = useMoney();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<CallOffInput, unknown, CallOffDto>({
    resolver: zodResolver(CallOffSchema),
    defaultValues: { quantity: c.minCallOffQuantity },
  });
  const { errors, isSubmitting } = form.formState;
  const quantity = Number(useWatch({ control: form.control, name: 'quantity' })) || 0;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      const { orderCode } = await callOff.mutateAsync(dto);
      toast.success(t('done', { code: orderCode }));
      onClose();
      router.push(`/buyer/orders/${orderCode}?pay=deposit`);
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, ['quantity'], tc('networkError')));
    }
  });
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{t('title', { code: c.code })}</DialogTitle>
        <DialogDescription>
          {t('description', {
            min: c.minCallOffQuantity,
            left: c.contractedQuantity - c.calledOffQuantity,
            days: c.leadTimeDays,
          })}
        </DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <Field data-invalid={!!errors.quantity}>
          <FieldLabel htmlFor="co-qty">{t('quantity')}</FieldLabel>
          <Input id="co-qty" inputMode="numeric" {...form.register('quantity')} />
          <FieldDescription>
            {t('total', { amount: money(quantity * c.unitPriceMinor, c.currency) })}
          </FieldDescription>
          <FieldError errors={[errors.quantity]} />
        </Field>
        <Field data-invalid={!!errors.requestedShipDate}>
          <FieldLabel htmlFor="co-date">{t('shipDate')}</FieldLabel>
          <Input
            id="co-date"
            type="date"
            {...form.register('requestedShipDate', {
              setValueAs: (v: string) => (v === '' ? undefined : v),
            })}
          />
          <FieldDescription>{t('shipDateHint')}</FieldDescription>
          <FieldError errors={[errors.requestedShipDate]} />
        </Field>
      </FieldGroup>
      <Footer onClose={onClose} pending={isSubmitting} save={t('confirm')} />
    </form>
  );
}
