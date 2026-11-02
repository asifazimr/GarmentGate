'use client';

import {
  type AdminDispute,
  DISPUTE_REASONS,
  DisputeReasonSchema,
  EVIDENCE_MAX_BYTES,
  EVIDENCE_MAX_FILES,
  EVIDENCE_TYPES,
  type OpenDisputeDto,
  type OpenDisputeInput,
  OpenDisputeSchema,
  type OrderStatus,
  ResolveDisputeSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, FileText, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { Button } from '@/components/ui/button';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { applyServerErrors } from '@/lib/form-errors';
import { formatMoney, toMinor } from '@/lib/format';
import { cn } from '@/lib/utils';
import { uploadEvidence, useOpenDispute, useResolveDispute } from '../api';

interface Upload {
  key: string;
  name: string;
  fileId: string | null;
  progress: number;
}

/** Evidence uploads straight to storage, tracked until each has a file id. */
export function useEvidenceUploads(code: string) {
  const t = useTranslations('trust.disputes');
  const [uploads, setUploads] = useState<Upload[]>([]);
  const add = (file: File) => {
    const key = `${file.name}-${String(Date.now())}`;
    setUploads((u) => [...u, { key, name: file.name, fileId: null, progress: 0 }]);
    uploadEvidence(code, file, (progress) =>
      setUploads((u) => u.map((x) => (x.key === key ? { ...x, progress } : x))),
    )
      .then((fileId) => setUploads((u) => u.map((x) => (x.key === key ? { ...x, fileId } : x))))
      .catch(() => {
        toast.error(t('uploadFailed'));
        setUploads((u) => u.filter((x) => x.key !== key));
      });
  };
  return {
    uploads,
    add,
    remove: (key: string) => setUploads((u) => u.filter((x) => x.key !== key)),
    reset: () => setUploads([]),
    uploading: uploads.some((u) => u.fileId === null),
    fileIds: uploads.flatMap((u) => (u.fileId ? [u.fileId] : [])),
  };
}

export function UploadList({
  uploads,
  onRemove,
}: {
  uploads: Upload[];
  onRemove: (key: string) => void;
}) {
  const t = useTranslations('trust.disputes');
  if (uploads.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {uploads.map((u) => (
        <li
          key={u.key}
          className="bg-surface flex items-center gap-2 rounded-lg border px-2 py-1 text-xs"
        >
          <FileText className="size-3.5" aria-hidden="true" />
          <span className="max-w-36 truncate">{u.name}</span>
          <span className="text-muted-foreground tabular">
            {u.fileId ? <Check className="size-3.5" /> : `${String(u.progress)}%`}
          </span>
          <button
            type="button"
            aria-label={t('removeFile', { name: u.name })}
            onClick={() => onRemove(u.key)}
          >
            <X className="size-3.5" />
          </button>
        </li>
      ))}
    </ul>
  );
}

function Shell({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

/** The buyer reports a problem: a reason, what went wrong, and photos or PDFs as evidence. */
export function OpenDisputeDialog({
  code,
  open,
  onClose,
}: {
  code: string;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('trust.disputes');
  const tc = useTranslations('common');
  const openDispute = useOpenDispute(code);
  const evidence = useEvidenceUploads(code);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<OpenDisputeInput, unknown, OpenDisputeDto>({
    resolver: zodResolver(OpenDisputeSchema),
    defaultValues: { reason: 'QUALITY', description: '', evidence: [] },
  });
  const { errors, isSubmitting } = form.formState;

  return (
    <Shell open={open} onClose={onClose} title={t('open.title')} description={t('open.body')}>
      <form
        className="grid gap-5"
        noValidate
        onSubmit={(e) =>
          void form.handleSubmit(async (dto) => {
            try {
              await openDispute.mutateAsync({ ...dto, evidence: evidence.fileIds });
              toast.success(t('open.done'));
              form.reset();
              evidence.reset();
              onClose();
            } catch (err) {
              setError(
                applyServerErrors(
                  err,
                  form.setError,
                  ['reason', 'description'],
                  tc('networkError'),
                ),
              );
            }
          })(e)
        }
      >
        <FormAlert message={error} />
        <FieldGroup>
          <Field data-invalid={!!errors.reason}>
            <FieldLabel htmlFor="d-reason">{t('reason')}</FieldLabel>
            <Controller
              control={form.control}
              name="reason"
              render={({ field }) => (
                <Select
                  items={DISPUTE_REASONS.map((r) => ({ value: r, label: t(`reasons.${r}`) }))}
                  value={field.value}
                  onValueChange={(v) => {
                    const parsed = DisputeReasonSchema.safeParse(v);
                    if (parsed.success) field.onChange(parsed.data);
                  }}
                >
                  <SelectTrigger id="d-reason" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DISPUTE_REASONS.map((r) => (
                      <SelectItem key={r} value={r}>
                        {t(`reasons.${r}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.reason]} />
          </Field>
          <Field data-invalid={!!errors.description}>
            <FieldLabel htmlFor="d-description">{t('description')}</FieldLabel>
            <Textarea
              id="d-description"
              rows={5}
              placeholder={t('descriptionPlaceholder')}
              {...form.register('description')}
            />
            <FieldError errors={[errors.description]} />
          </Field>
          <Field>
            <FieldLabel>{t('evidence')}</FieldLabel>
            <UploadList uploads={evidence.uploads} onRemove={evidence.remove} />
            {evidence.uploads.length < EVIDENCE_MAX_FILES ? (
              <FileDropzone
                multiple
                compact
                accept={EVIDENCE_TYPES}
                maxBytes={EVIDENCE_MAX_BYTES}
                label={t('addEvidence')}
                hint={t('evidenceHint')}
                onFile={evidence.add}
              />
            ) : null}
            <FieldDescription>{t('evidenceReview')}</FieldDescription>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button type="submit" variant="destructive" disabled={isSubmitting || evidence.uploading}>
            {t('open.action')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}

const OUTCOMES = ['RESOLVED_FOR_BUYER', 'RESOLVED_FOR_MANUFACTURER', 'SETTLED'] as const;
type Outcome = (typeof OUTCOMES)[number];

interface ResolveForm {
  outcome: Outcome;
  resolution: string;
  refund: string;
  resumeTo: OrderStatus;
}

/** Staff close a dispute: who it's resolved for, an optional refund, and where the order goes. */
export function ResolveDisputeDialog({
  dispute,
  open,
  onClose,
}: {
  dispute: AdminDispute;
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations('trust.disputes.resolve');
  const tc = useTranslations('common');
  const tst = useTranslations('statuses.order');
  const locale = useLocale();
  const resolve = useResolveDispute();
  const [error, setError] = useState<string | null>(null);
  const resumeOptions = [
    ...new Set<OrderStatus>([
      ...(dispute.disputedFrom ? [dispute.disputedFrom] : []),
      'COMPLETED',
      'CANCELLED',
    ]),
  ];
  const form = useForm<ResolveForm>({
    defaultValues: {
      outcome: 'SETTLED',
      resolution: '',
      refund: '',
      resumeTo: resumeOptions[0] ?? 'COMPLETED',
    },
  });
  const { errors, isSubmitting } = form.formState;

  const submit = form.handleSubmit(async (values) => {
    const refundMinor = values.refund.trim() ? toMinor(values.refund, dispute.currency) : 0;
    if (Number.isNaN(refundMinor)) {
      form.setError('refund', { message: t('refundInvalid') });
      return;
    }
    if (refundMinor > dispute.refundableMinor) {
      form.setError('refund', {
        message: t('refundTooHigh', {
          max: formatMoney(dispute.refundableMinor, dispute.currency, locale),
        }),
      });
      return;
    }
    const parsed = ResolveDisputeSchema.safeParse({
      outcome: values.outcome,
      resolution: values.resolution,
      refundMinor,
      resumeTo: values.resumeTo,
    });
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] === 'refundMinor' ? 'refund' : issue.path[0];
        if (field === 'resolution' || field === 'refund' || field === 'outcome')
          form.setError(field, { message: issue.message });
      }
      return;
    }
    try {
      await resolve.mutateAsync({ id: dispute.id, dto: parsed.data });
      toast.success(t('done'));
      form.reset();
      onClose();
    } catch (err) {
      setError(
        applyServerErrors(err, form.setError, ['resolution', 'resumeTo'], tc('networkError')),
      );
    }
  });

  return (
    <Shell open={open} onClose={onClose} title={t('title')} description={t('body')}>
      <form className="grid gap-5" noValidate onSubmit={(e) => void submit(e)}>
        <FormAlert message={error} />
        <FieldGroup>
          <Field>
            <FieldLabel>{t('outcome')}</FieldLabel>
            <Controller
              control={form.control}
              name="outcome"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid gap-2"
                >
                  {OUTCOMES.map((o) => (
                    <label
                      key={o}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm',
                        field.value === o && 'border-primary bg-primary-soft/40',
                      )}
                    >
                      <RadioGroupItem value={o} />
                      {t(`outcomes.${o}`)}
                    </label>
                  ))}
                </RadioGroup>
              )}
            />
          </Field>
          <Field data-invalid={!!errors.resolution}>
            <FieldLabel htmlFor="r-resolution">{t('resolution')}</FieldLabel>
            <Textarea id="r-resolution" rows={4} {...form.register('resolution')} />
            <FieldDescription>{t('resolutionHint')}</FieldDescription>
            <FieldError errors={[errors.resolution]} />
          </Field>
          <Field data-invalid={!!errors.refund}>
            <FieldLabel htmlFor="r-refund">
              {t('refund', { currency: dispute.currency })}
            </FieldLabel>
            <Input id="r-refund" inputMode="decimal" placeholder="0" {...form.register('refund')} />
            <FieldDescription>
              {t('refundHint', {
                max: formatMoney(dispute.refundableMinor, dispute.currency, locale),
              })}
            </FieldDescription>
            <FieldError errors={[errors.refund]} />
          </Field>
          <Field data-invalid={!!errors.resumeTo}>
            <FieldLabel>{t('resumeTo')}</FieldLabel>
            <Controller
              control={form.control}
              name="resumeTo"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid gap-2 sm:grid-cols-3"
                >
                  {resumeOptions.map((s) => (
                    <label
                      key={s}
                      className={cn(
                        'flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm',
                        field.value === s && 'border-primary bg-primary-soft/40',
                      )}
                    >
                      <RadioGroupItem value={s} />
                      {tst(s)}
                    </label>
                  ))}
                </RadioGroup>
              )}
            />
            <FieldError errors={[errors.resumeTo]} />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {t('action')}
          </Button>
        </DialogFooter>
      </form>
    </Shell>
  );
}
