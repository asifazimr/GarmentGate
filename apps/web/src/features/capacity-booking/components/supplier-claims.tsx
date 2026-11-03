'use client';

import {
  CLAIM_EVIDENCE_MAX_BYTES,
  EVIDENCE_TYPES_CLAIM,
  SUPPLIER_CLAIM_REGIONS,
  SupplierClaimInputSchema,
  type SupplierClaimRegion,
  type SupplierClaimTier,
  SupplierClaimTierSchema,
} from '@garmentgate/shared';
import { Plus, ShieldCheck, Trash2, X } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { type KeyboardEvent, useState } from 'react';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { OptionalTag } from '@/features/onboarding/components/step-layout';
import { ApiError } from '@/lib/api';
import { useAddClaim, useClaims, useRemoveClaim } from '../api';

/**
 * "We supply these brands": the factory names them and uploads evidence; staff verify it, and
 * buyers only see a badge such as "Supplies 3 major brands in the EU".
 */
export function SupplierClaimsTab() {
  const t = useTranslations('supplierClaims');
  const tstatus = useTranslations('status');
  const format = useFormatter();
  const claims = useClaims();
  const remove = useRemoveClaim();
  const [open, setOpen] = useState(false);

  return (
    <section className="max-w-3xl space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-muted-foreground max-w-xl text-sm">{t('description')}</p>
        <Button variant="outline" onClick={() => setOpen(true)}>
          <Plus />
          {t('add')}
        </Button>
      </div>
      {claims.isPending ? (
        <Skeleton className="h-40 w-full rounded-xl" />
      ) : claims.isError ? (
        <ErrorState size="compact" onRetry={() => void claims.refetch()} />
      ) : claims.data.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title={t('empty')}
          description={t('emptyBody')}
          action={
            <Button onClick={() => setOpen(true)}>
              <Plus />
              {t('add')}
            </Button>
          }
        />
      ) : (
        <ul className="bg-card divide-y rounded-xl border shadow-xs">
          {claims.data.map((c) => (
            <li key={c.id} className="flex items-start gap-3 px-4 py-3">
              <span className="bg-primary-soft text-primary-ink flex size-9 shrink-0 items-center justify-center rounded-lg">
                <ShieldCheck className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="font-medium">
                  {t('badge', {
                    count: c.brandNames.length,
                    tier: c.tier,
                    region: t(`regionIn.${c.region}`),
                  })}
                </p>
                <p className="text-muted-foreground text-sm">
                  {c.brandNames.join(', ')} ·{' '}
                  {format.dateTime(new Date(c.createdAt), { dateStyle: 'medium' })}
                </p>
                {c.status === 'REJECTED' && c.reviewNote ? (
                  <p className="text-danger-ink text-sm">{c.reviewNote}</p>
                ) : null}
              </div>
              <Badge
                variant={
                  c.status === 'VERIFIED'
                    ? 'success'
                    : c.status === 'REJECTED'
                      ? 'danger'
                      : 'warning'
                }
              >
                {tstatus(c.status)}
              </Badge>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={t('remove')}
                onClick={() => remove.mutate(c.id)}
                disabled={remove.isPending}
              >
                <Trash2 />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <p className="text-subtle-foreground text-xs">{t('privacy')}</p>
      <ClaimDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}

function ClaimDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations('supplierClaims');
  const to = useTranslations('onboarding');
  const tc = useTranslations('common');
  const add = useAddClaim();
  const [region, setRegion] = useState<SupplierClaimRegion | null>(null);
  const [tier, setTier] = useState<SupplierClaimTier>('MAJOR');
  const [brands, setBrands] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [note, setNote] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setRegion(null);
    setTier('MAJOR');
    setBrands([]);
    setDraft('');
    setNote('');
    setFile(null);
    setError(null);
  };

  const addBrand = () => {
    const name = draft.trim();
    if (!name) return;
    if (!brands.some((b) => b.toLowerCase() === name.toLowerCase()))
      setBrands([...brands, name].slice(0, 20));
    setDraft('');
  };
  const onBrandKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addBrand();
    }
  };

  const regions = SUPPLIER_CLAIM_REGIONS.map((value) => ({ value, label: t(`regions.${value}`) }));
  const tiers = SupplierClaimTierSchema.options.map((value) => ({
    value,
    label: t(`tiers.${value}`),
  }));
  const allBrands = draft.trim() ? [...brands, draft.trim()] : brands;
  const ready = region !== null && allBrands.length > 0 && file !== null;

  const save = async () => {
    if (!region || !file) return;
    // Same rules the API applies (unique brands, length limits), before uploading anything.
    const details = SupplierClaimInputSchema.omit({ evidenceFileId: true }).safeParse({
      region,
      tier,
      brandNames: allBrands,
      note,
    });
    if (!details.success) {
      setError(details.error.issues[0]?.message ?? tc('networkError'));
      return;
    }
    setError(null);
    setProgress(0);
    try {
      await add.mutateAsync({ file, details: details.data, onProgress: setProgress });
      reset();
      onOpenChange(false);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : to('errors.uploadFailed'));
    } finally {
      setProgress(null);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('add')}</DialogTitle>
          <DialogDescription>{t('dialogDescription')}</DialogDescription>
        </DialogHeader>
        <FormAlert message={error} />
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="claim-region">{t('region')}</FieldLabel>
              <Select
                items={regions}
                value={region}
                onValueChange={(value) => {
                  const match = SUPPLIER_CLAIM_REGIONS.find((r) => r === value);
                  if (match) setRegion(match);
                }}
              >
                <SelectTrigger id="claim-region" className="w-full">
                  <SelectValue placeholder={t('regionPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="claim-tier">{t('tier')}</FieldLabel>
              <Select
                items={tiers}
                value={tier}
                onValueChange={(value) => {
                  const parsed = SupplierClaimTierSchema.safeParse(value);
                  if (parsed.success) setTier(parsed.data);
                }}
              >
                <SelectTrigger id="claim-tier" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tiers.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="claim-brand">{t('brands')}</FieldLabel>
            {brands.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {brands.map((b) => (
                  <li key={b}>
                    <Badge variant="neutral" className="h-7 gap-1 pe-1">
                      {b}
                      <button
                        type="button"
                        aria-label={t('removeBrand', { brand: b })}
                        className="hover:bg-muted rounded-sm p-0.5"
                        onClick={() => setBrands(brands.filter((x) => x !== b))}
                      >
                        <X className="size-3" aria-hidden="true" />
                      </button>
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="flex gap-2">
              <Input
                id="claim-brand"
                value={draft}
                placeholder={t('brandPlaceholder')}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onBrandKey}
                onBlur={addBrand}
              />
              <Button type="button" variant="outline" onClick={addBrand}>
                {t('addBrand')}
              </Button>
            </div>
            <FieldDescription>{t('brandsHint')}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel>{t('evidence')}</FieldLabel>
            {file && progress === null ? (
              <p className="bg-muted/50 flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm">
                <span className="truncate">{file.name}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => setFile(null)}>
                  {tc('remove')}
                </Button>
              </p>
            ) : (
              <FileDropzone
                compact
                accept={EVIDENCE_TYPES_CLAIM}
                maxBytes={CLAIM_EVIDENCE_MAX_BYTES}
                progress={progress}
                label={t('evidenceUpload')}
                onFile={setFile}
              />
            )}
            <FieldDescription>{t('evidenceHint')}</FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="claim-note">
              {t('note')}
              <OptionalTag />
            </FieldLabel>
            <Textarea
              id="claim-note"
              rows={2}
              maxLength={500}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            {tc('cancel')}
          </Button>
          <Button type="button" disabled={!ready || add.isPending} onClick={() => void save()}>
            {add.isPending ? tc('saving') : t('submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
