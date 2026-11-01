'use client';

import {
  type CertificationType,
  CertificationTypeSchema,
  type KycDocumentType,
  type OnboardingState,
  REQUIRED_KYC_DOCUMENTS,
} from '@garmentgate/shared';
import { CheckCircle2, FileText, Plus, Trash2 } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
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
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import {
  useAddCertification,
  useAddDocument,
  useRemoveCertification,
  useRemoveDocument,
  useSubmitOnboarding,
} from '../api';
import { FileDrop, formatBytes } from './file-drop';
import { OptionalTag, StepHeader } from './step-layout';

export function DocumentsStep({
  state,
  onBack,
  onSubmitted,
}: {
  state: OnboardingState;
  onBack: () => void;
  onSubmitted: () => void;
}) {
  const t = useTranslations('onboarding.documents');
  const tc = useTranslations('common');
  const submit = useSubmitOnboarding();
  const [error, setError] = useState<string | null>(null);
  const required: readonly KycDocumentType[] = REQUIRED_KYC_DOCUMENTS[state.role];
  const isManufacturer = state.role === 'MANUFACTURER';

  const onSubmit = async () => {
    setError(null);
    try {
      await submit.mutateAsync();
      onSubmitted();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : tc('networkError'));
    }
  };

  const hint = !state.emailVerified
    ? t('submitHintEmail')
    : state.missingDocuments.length > 0
      ? t('submitHintDocs')
      : null;

  return (
    <div className="space-y-8">
      <StepHeader
        title={t('title')}
        subtitle={isManufacturer ? t('subtitleManufacturer') : t('subtitleBuyer')}
      />
      <FormAlert message={error} />

      <section className="space-y-4">
        {required.map((type) => (
          <DocumentSlot key={type} type={type} state={state} required />
        ))}
      </section>

      {isManufacturer ? <Certifications state={state} /> : null}

      <div className="space-y-3">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button type="button" variant="ghost" size="lg" onClick={onBack}>
            {tc('back')}
          </Button>
          <Button
            type="button"
            size="lg"
            disabled={!state.canSubmit || !state.emailVerified || submit.isPending}
            onClick={() => void onSubmit()}
          >
            {submit.isPending ? t('submitting') : t('submit')}
          </Button>
        </div>
        {hint ? <p className="text-muted-foreground text-sm sm:text-end">{hint}</p> : null}
      </div>
    </div>
  );
}

function DocumentSlot({
  type,
  state,
  required,
}: {
  type: KycDocumentType;
  state: OnboardingState;
  required: boolean;
}) {
  const t = useTranslations('onboarding');
  const locale = useLocale();
  const add = useAddDocument();
  const remove = useRemoveDocument();
  const [progress, setProgress] = useState<number | null>(null);
  const docs = state.documents.filter((d) => d.type === type);

  const upload = async (file: File) => {
    setProgress(0);
    try {
      await add.mutateAsync({ file, type, onProgress: setProgress });
    } catch {
      toast.error(t('errors.uploadFailed'));
    } finally {
      setProgress(null);
    }
  };

  return (
    <div className="rounded-xl border p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-medium">
          {docs.length > 0 ? (
            <CheckCircle2 className="text-primary size-5" aria-hidden="true" />
          ) : (
            <FileText className="text-muted-foreground size-5" aria-hidden="true" />
          )}
          {t(`documents.types.${type}`)}
        </h3>
        {required && docs.length === 0 ? (
          <Badge variant="secondary">{t('documents.required')}</Badge>
        ) : null}
      </div>
      {docs.length > 0 ? (
        <ul className="mb-3 space-y-2">
          {docs.map((doc) => (
            <li
              key={doc.id}
              className="bg-muted/50 flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
            >
              <span className="min-w-0 flex-1 truncate">{doc.file.fileName}</span>
              <span className="text-muted-foreground shrink-0">
                {formatBytes(doc.file.sizeBytes, locale)}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-11 md:size-8"
                aria-label={`${t(`documents.types.${type}`)}: remove ${doc.file.fileName}`}
                disabled={remove.isPending}
                onClick={() => remove.mutate(doc.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      ) : null}
      <FileDrop
        compact={docs.length > 0}
        progress={progress}
        label={docs.length > 0 ? t('documents.replace') : t('documents.upload')}
        onFile={(file) => void upload(file)}
      />
    </div>
  );
}

function Certifications({ state }: { state: OnboardingState }) {
  const t = useTranslations('onboarding.documents');
  const tcert = useTranslations('certifications');
  const tstatus = useTranslations('status');
  const format = useFormatter();
  const remove = useRemoveCertification();
  const [open, setOpen] = useState(false);

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-medium">
            {t('certifications')}
            <OptionalTag />
          </h3>
          <p className="text-muted-foreground text-sm">{t('certificationsHint')}</p>
        </div>
        <Button type="button" variant="outline" onClick={() => setOpen(true)}>
          <Plus className="size-4" aria-hidden="true" />
          {t('addCertification')}
        </Button>
      </div>
      {state.certifications.length === 0 ? (
        <p className="text-muted-foreground rounded-xl border border-dashed p-4 text-center text-sm">
          {t('noCertifications')}
        </p>
      ) : (
        <ul className="divide-y rounded-xl border">
          {state.certifications.map((cert) => (
            <li key={cert.id} className="flex items-center gap-3 p-3 sm:px-4">
              <div className="min-w-0 flex-1">
                <p className="font-medium">{cert.customName ?? tcert(cert.type)}</p>
                <p className="text-muted-foreground text-sm">
                  {cert.expiresAt
                    ? t('expires', {
                        date: format.dateTime(new Date(cert.expiresAt), { dateStyle: 'medium' }),
                      })
                    : cert.file?.fileName}
                </p>
              </div>
              <Badge variant="outline">{tstatus(cert.status)}</Badge>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="size-11 md:size-8"
                aria-label={`Remove ${cert.customName ?? tcert(cert.type)}`}
                disabled={remove.isPending}
                onClick={() => remove.mutate(cert.id)}
              >
                <Trash2 className="size-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <AddCertificationDialog open={open} onOpenChange={setOpen} />
    </section>
  );
}

function AddCertificationDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations('onboarding.documents');
  const to = useTranslations('onboarding');
  const tcert = useTranslations('certifications');
  const tc = useTranslations('common');
  const add = useAddCertification();
  const [type, setType] = useState<CertificationType | null>(null);
  const [customName, setCustomName] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const items = CertificationTypeSchema.options.map((value) => ({ value, label: tcert(value) }));
  const ready = type !== null && file !== null && (type !== 'OTHER' || customName.trim() !== '');

  const reset = () => {
    setType(null);
    setCustomName('');
    setCertificateNumber('');
    setExpiresAt('');
    setFile(null);
    setError(null);
  };

  const save = async () => {
    if (!type || !file) return;
    setError(null);
    setProgress(0);
    try {
      await add.mutateAsync({
        file,
        onProgress: setProgress,
        details: {
          type,
          customName: customName.trim() || undefined,
          certificateNumber: certificateNumber.trim() || undefined,
          expiresAt: expiresAt ? new Date(expiresAt) : undefined,
        },
      });
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
          <DialogTitle>{t('addCertification')}</DialogTitle>
          <DialogDescription>{t('certificationsHint')}</DialogDescription>
        </DialogHeader>
        <FormAlert message={error} />
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="cert-type">{t('certType')}</FieldLabel>
            <Select
              items={items}
              value={type}
              onValueChange={(value) => {
                const parsed = CertificationTypeSchema.safeParse(value);
                if (parsed.success) setType(parsed.data);
              }}
            >
              <SelectTrigger id="cert-type" className="w-full">
                <SelectValue placeholder={t('certTypePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          {type === 'OTHER' ? (
            <Field>
              <FieldLabel htmlFor="cert-name">{t('certName')}</FieldLabel>
              <Input
                id="cert-name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
            </Field>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="cert-number">
                {t('certNumber')}
                <OptionalTag />
              </FieldLabel>
              <Input
                id="cert-number"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="cert-expires">
                {t('certExpires')}
                <OptionalTag />
              </FieldLabel>
              <Input
                id="cert-expires"
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
              />
            </Field>
          </div>
          <Field>
            <FieldLabel>{t('certFile')}</FieldLabel>
            {file && progress === null ? (
              <p className="bg-muted/50 flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm">
                <span className="truncate">{file.name}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => setFile(null)}>
                  {tc('remove')}
                </Button>
              </p>
            ) : (
              <FileDrop compact progress={progress} label={t('upload')} onFile={setFile} />
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            {tc('cancel')}
          </Button>
          <Button type="button" disabled={!ready || add.isPending} onClick={() => void save()}>
            {add.isPending ? tc('saving') : t('addCertification')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
