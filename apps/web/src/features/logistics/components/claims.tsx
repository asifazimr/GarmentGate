'use client';

import {
  type AdminLogisticsClaim,
  type AdminShipment,
  LogisticsClaimTypeSchema,
  type OpenClaimDto,
  OpenClaimSchema,
  type SettleClaimDto,
  SettleClaimSchema,
  SubmitClaimSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { formatMoney } from '@/lib/format';
import { applyServerErrors } from '@/lib/form-errors';
import { useClaims, useOpenClaim, useSettleClaim, useSubmitClaim } from '../api';
import { amountToMinor, OptionSelect } from './form-bits';
import { Footer } from './partners-hubs';

/** Rewrites shared-schema issues onto the fields people type in. */
function report(ctx: z.RefinementCtx, error: z.ZodError, rename: Record<string, string>) {
  for (const issue of error.issues)
    ctx.addIssue({
      code: 'custom',
      message: issue.message,
      path: issue.path.map((p) => (typeof p === 'string' ? (rename[p] ?? p) : p)),
    });
}

// ── Claims list ─────────────────────────────────────────────────────────────

export function ClaimsTab() {
  const t = useTranslations('logistics.claims');
  const tt = useTranslations('logistics.claims.types');
  const locale = useLocale();
  const claims = useClaims();
  const [acting, setActing] = useState<{
    claim: AdminLogisticsClaim;
    to: 'submit' | 'settle';
  } | null>(null);
  const columns = useMemo<DataColumn<AdminLogisticsClaim>[]>(
    () => [
      {
        id: 'code',
        header: t('columns.claim'),
        value: (c) => `${c.code} ${c.orderCode} ${c.shipmentCode} ${c.buyerCode}`,
        cell: (c) => (
          <span>
            <span className="font-mono text-xs font-medium">{c.code}</span>
            <span className="text-muted-foreground block text-xs">
              <Link href={`/admin/orders/${c.orderCode}`} className="hover:underline">
                {c.orderCode}
              </Link>{' '}
              ·{' '}
              <Link
                href={`/admin/logistics/shipments/${c.shipmentCode}`}
                className="hover:underline"
              >
                {c.shipmentCode}
              </Link>
            </span>
          </span>
        ),
      },
      { id: 'type', header: t('columns.type'), value: (c) => tt(c.type) },
      {
        id: 'status',
        header: t('columns.status'),
        value: (c) => c.status,
        cell: (c) => <StatusBadge domain="claim" status={c.status} />,
      },
      {
        id: 'claimed',
        header: t('columns.claimed'),
        value: (c) => c.claimedMinor,
        cell: (c) => (
          <span className="tabular">
            {formatMoney(c.claimedMinor, c.currency, locale)}
            <span className="text-muted-foreground block text-xs">
              {c.insuredValueMinor > 0
                ? t('insured', { amount: formatMoney(c.insuredValueMinor, c.currency, locale) })
                : t('uninsured')}
            </span>
          </span>
        ),
        align: 'end',
        searchable: false,
      },
      {
        id: 'net',
        header: t('columns.net'),
        value: (c) => c.netMinor,
        cell: (c) =>
          c.status === 'SETTLED' ? (
            <span className="tabular">{formatMoney(c.netMinor, c.currency, locale)}</span>
          ) : (
            <span className="text-muted-foreground">—</span>
          ),
        align: 'end',
        searchable: false,
      },
      {
        id: 'actions',
        header: '',
        value: () => null,
        cell: (c) =>
          c.status === 'OPEN' || c.status === 'SUBMITTED' ? (
            <span className="flex justify-end gap-1">
              {c.status === 'OPEN' ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActing({ claim: c, to: 'submit' })}
                >
                  {t('submit')}
                </Button>
              ) : null}
              <Button size="sm" onClick={() => setActing({ claim: c, to: 'settle' })}>
                {t('settle')}
              </Button>
            </span>
          ) : null,
        sortable: false,
        searchable: false,
        csv: false,
        align: 'end',
      },
    ],
    [t, tt, locale],
  );
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground max-w-2xl text-sm">{t('description')}</p>
      <DataTable
        data={claims.data}
        columns={columns}
        loading={claims.isPending}
        error={claims.isError}
        onRetry={() => void claims.refetch()}
        retrying={claims.isFetching}
        csvName="logistics-claims"
        empty={{ icon: ShieldAlert, title: t('empty'), description: t('emptyBody') }}
      />
      <Dialog open={acting !== null} onOpenChange={(o) => !o && setActing(null)}>
        <DialogContent className="sm:max-w-lg">
          {acting?.to === 'submit' ? (
            <SubmitForm claim={acting.claim} onClose={() => setActing(null)} />
          ) : acting?.to === 'settle' ? (
            <SettleForm claim={acting.claim} onClose={() => setActing(null)} />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SubmitForm({ claim, onClose }: { claim: AdminLogisticsClaim; onClose: () => void }) {
  const t = useTranslations('logistics.claims');
  const tc = useTranslations('common');
  const submit = useSubmitClaim();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm({
    resolver: zodResolver(SubmitClaimSchema),
    defaultValues: { insurerReference: '' },
  });
  const { errors } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await submit.mutateAsync({ code: claim.code, dto });
      toast.success(t('submitted'));
      onClose();
    } catch (error) {
      setFormError(
        applyServerErrors(error, form.setError, ['insurerReference'], tc('networkError')),
      );
    }
  });
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{t('submitTitle', { code: claim.code })}</DialogTitle>
        <DialogDescription>{t('submitBody')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <Field data-invalid={!!errors.insurerReference}>
        <FieldLabel htmlFor="cl-ref">{t('fields.insurerReference')}</FieldLabel>
        <Input id="cl-ref" {...form.register('insurerReference')} />
        <FieldError errors={[errors.insurerReference]} />
      </Field>
      <Footer onClose={onClose} pending={submit.isPending} save={t('submit')} />
    </form>
  );
}

const SettleFormSchema = (currency: string) =>
  z
    .object({
      outcome: z.enum(['SETTLED', 'REJECTED']),
      compensation: z.string(),
      recovery: z.string(),
      chargeback: z.string(),
      resolution: z.string(),
      publicNote: z.string(),
    })
    .transform((f, ctx): SettleClaimDto => {
      const settled = f.outcome === 'SETTLED';
      const result = SettleClaimSchema.safeParse({
        outcome: f.outcome,
        compensationMinor: settled ? amountToMinor(f.compensation, currency, 0) : 0,
        insurerRecoveryMinor: settled ? amountToMinor(f.recovery, currency, 0) : 0,
        partnerChargebackMinor: settled ? amountToMinor(f.chargeback, currency, 0) : 0,
        resolution: f.resolution,
        publicNote: f.publicNote,
      });
      if (result.success) return result.data;
      report(ctx, result.error, {
        compensationMinor: 'compensation',
        insurerRecoveryMinor: 'recovery',
        partnerChargebackMinor: 'chargeback',
      });
      return z.NEVER;
    });

function SettleForm({ claim, onClose }: { claim: AdminLogisticsClaim; onClose: () => void }) {
  const t = useTranslations('logistics.claims');
  const tc = useTranslations('common');
  const locale = useLocale();
  const settle = useSettleClaim();
  const [formError, setFormError] = useState<string | null>(null);
  const schema = useMemo(() => SettleFormSchema(claim.currency), [claim.currency]);
  const form = useForm<z.input<typeof schema>, unknown, SettleClaimDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      outcome: 'SETTLED',
      compensation: '',
      recovery: '',
      chargeback: '',
      resolution: '',
      publicNote: claim.publicNote ?? '',
    },
  });
  const { errors } = form.formState;
  const outcome = useWatch({ control: form.control, name: 'outcome' });
  const money = (minor: number) => formatMoney(minor, claim.currency, locale);
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      await settle.mutateAsync({ code: claim.code, dto });
      toast.success(t('settled'));
      onClose();
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, ['resolution'], tc('networkError')));
    }
  });
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{t('settleTitle', { code: claim.code })}</DialogTitle>
        <DialogDescription>{t('settleBody')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="cl-outcome">{t('fields.outcome')}</FieldLabel>
          <Controller
            control={form.control}
            name="outcome"
            render={({ field }) => (
              <OptionSelect
                id="cl-outcome"
                value={field.value}
                onChange={field.onChange}
                options={(['SETTLED', 'REJECTED'] as const).map((o) => ({
                  value: o,
                  label: t(`outcomes.${o}`),
                }))}
              />
            )}
          />
        </Field>
        {outcome === 'SETTLED' ? (
          <>
            <Field data-invalid={!!errors.compensation}>
              <FieldLabel htmlFor="cl-comp">
                {t('fields.compensation', { currency: claim.currency })}
              </FieldLabel>
              <Input id="cl-comp" inputMode="decimal" {...form.register('compensation')} />
              <FieldDescription>
                {t('upTo', { amount: money(claim.claimedMinor) })}
              </FieldDescription>
              <FieldError errors={[errors.compensation]} />
            </Field>
            <Field data-invalid={!!errors.recovery}>
              <FieldLabel htmlFor="cl-rec">
                {t('fields.recovery', { currency: claim.currency })}
              </FieldLabel>
              <Input
                id="cl-rec"
                inputMode="decimal"
                disabled={claim.insuredValueMinor === 0}
                {...form.register('recovery')}
              />
              <FieldDescription>
                {claim.insuredValueMinor > 0
                  ? t('upTo', { amount: money(claim.insuredValueMinor) })
                  : t('uninsured')}
              </FieldDescription>
              <FieldError errors={[errors.recovery]} />
            </Field>
            <Field data-invalid={!!errors.chargeback}>
              <FieldLabel htmlFor="cl-cb">
                {t('fields.chargeback', { currency: claim.currency })}
              </FieldLabel>
              <Input
                id="cl-cb"
                inputMode="decimal"
                disabled={!claim.leg?.partnerName}
                {...form.register('chargeback')}
              />
              <FieldDescription>
                {claim.leg?.partnerName
                  ? t('chargebackTo', {
                      partner: claim.leg.partnerName,
                      amount: money(claim.leg.costMinor ?? 0),
                    })
                  : t('noLeg')}
              </FieldDescription>
              <FieldError errors={[errors.chargeback]} />
            </Field>
          </>
        ) : null}
        <Field data-invalid={!!errors.resolution}>
          <FieldLabel htmlFor="cl-res">{t('fields.resolution')}</FieldLabel>
          <Textarea id="cl-res" rows={2} {...form.register('resolution')} />
          <FieldError errors={[errors.resolution]} />
        </Field>
        <Field data-invalid={!!errors.publicNote}>
          <FieldLabel htmlFor="cl-note">{t('fields.publicNote')}</FieldLabel>
          <Textarea id="cl-note" rows={2} {...form.register('publicNote')} />
          <FieldDescription>{t('publicNoteHint')}</FieldDescription>
          <FieldError errors={[errors.publicNote]} />
        </Field>
      </FieldGroup>
      <Footer onClose={onClose} pending={settle.isPending} save={t('settle')} />
    </form>
  );
}

// ── Opening a claim (from the shipment page) ────────────────────────────────

const OpenFormSchema = (currency: string, orderCode: string, disputeId: string | null) =>
  z
    .object({
      type: z.string(),
      claimed: z.string(),
      description: z.string(),
      publicNote: z.string(),
      legId: z.string(),
    })
    .transform((f, ctx): OpenClaimDto => {
      const result = OpenClaimSchema.safeParse({
        orderCode,
        type: f.type,
        claimedMinor: amountToMinor(f.claimed, currency),
        description: f.description,
        publicNote: f.publicNote,
        ...(f.legId !== '' && { legId: f.legId }),
        ...(disputeId !== null && { disputeId }),
      });
      if (result.success) return result.data;
      report(ctx, result.error, { claimedMinor: 'claimed' });
      return z.NEVER;
    });

export function OpenClaimDialog({
  shipment,
  orderCode,
  disputeId,
  onClose,
}: {
  shipment: AdminShipment;
  orderCode: string | null;
  disputeId: string | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={orderCode !== null} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        {orderCode !== null ? (
          <OpenClaimForm
            shipment={shipment}
            orderCode={orderCode}
            disputeId={disputeId}
            onClose={onClose}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function OpenClaimForm({
  shipment: s,
  orderCode,
  disputeId,
  onClose,
}: {
  shipment: AdminShipment;
  orderCode: string;
  disputeId: string | null;
  onClose: () => void;
}) {
  const t = useTranslations('logistics.claims');
  const tt = useTranslations('logistics.claims.types');
  const tk = useTranslations('logistics.shipment.legKinds');
  const tc = useTranslations('common');
  const format = useFormatter();
  const open = useOpenClaim();
  const [formError, setFormError] = useState<string | null>(null);
  const schema = useMemo(
    () => OpenFormSchema(s.currency, orderCode, disputeId),
    [s.currency, orderCode, disputeId],
  );
  const form = useForm<z.input<typeof schema>, unknown, OpenClaimDto>({
    resolver: zodResolver(schema),
    defaultValues: { type: 'DAMAGE', claimed: '', description: '', publicNote: '', legId: '' },
  });
  const { errors } = form.formState;
  const onSubmit = form.handleSubmit(async (dto) => {
    setFormError(null);
    try {
      const { code } = await open.mutateAsync(dto);
      toast.success(t('opened', { code }));
      onClose();
    } catch (error) {
      setFormError(
        applyServerErrors(error, form.setError, ['description', 'type'], tc('networkError')),
      );
    }
  });
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <DialogHeader>
        <DialogTitle>{t('openTitle', { order: orderCode })}</DialogTitle>
        <DialogDescription>{disputeId ? t('openFromDispute') : t('openBody')}</DialogDescription>
      </DialogHeader>
      <FormAlert message={formError} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="oc-type">{t('fields.type')}</FieldLabel>
            <Controller
              control={form.control}
              name="type"
              render={({ field }) => (
                <OptionSelect
                  id="oc-type"
                  value={field.value}
                  onChange={field.onChange}
                  options={LogisticsClaimTypeSchema.options.map((x) => ({
                    value: x,
                    label: tt(x),
                  }))}
                />
              )}
            />
          </Field>
          <Field data-invalid={!!errors.claimed}>
            <FieldLabel htmlFor="oc-claimed">
              {t('fields.claimed', { currency: s.currency })}
            </FieldLabel>
            <Input id="oc-claimed" inputMode="decimal" {...form.register('claimed')} />
            <FieldError errors={[errors.claimed]} />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="oc-leg">{t('fields.leg')}</FieldLabel>
          <Controller
            control={form.control}
            name="legId"
            render={({ field }) => (
              <OptionSelect
                id="oc-leg"
                value={field.value}
                onChange={field.onChange}
                emptyLabel={t('unknownLeg')}
                options={s.legs
                  .filter((l) => l.partner)
                  .map((l) => ({
                    value: l.id,
                    label: `${format.number(l.sequence)} · ${tk(l.kind)} · ${l.partner?.name ?? ''}`,
                  }))}
              />
            )}
          />
          <FieldDescription>{t('legHint')}</FieldDescription>
        </Field>
        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="oc-desc">{t('fields.description')}</FieldLabel>
          <Textarea id="oc-desc" rows={3} {...form.register('description')} />
          <FieldError errors={[errors.description]} />
        </Field>
        <Field data-invalid={!!errors.publicNote}>
          <FieldLabel htmlFor="oc-note">{t('fields.publicNote')}</FieldLabel>
          <Textarea id="oc-note" rows={2} {...form.register('publicNote')} />
          <FieldDescription>{t('publicNoteHint')}</FieldDescription>
          <FieldError errors={[errors.publicNote]} />
        </Field>
      </FieldGroup>
      <Footer onClose={onClose} pending={open.isPending} save={t('open')} />
    </form>
  );
}
