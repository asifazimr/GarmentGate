'use client';

import {
  type AddCertificationDto,
  type CertificationType,
  CertificationTypeSchema,
  UPLOAD_CONTENT_TYPES,
  UPLOAD_MAX_BYTES,
} from '@garmentgate/shared';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
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
import { OptionalTag } from '@/features/onboarding/components/step-layout';
import { ApiError } from '@/lib/api';

export interface CertificationSave {
  file: File;
  details: Omit<AddCertificationDto, 'fileId'>;
  onProgress: (percent: number) => void;
}

/** Add a certificate: type, optional number and expiry, and the file. Saving is up to the caller. */
export function CertificationDialog({
  open,
  onOpenChange,
  onSave,
  pending,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (args: CertificationSave) => Promise<unknown>;
  pending: boolean;
}) {
  const t = useTranslations('onboarding.documents');
  const to = useTranslations('onboarding');
  const tcert = useTranslations('certifications');
  const tc = useTranslations('common');
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
      await onSave({
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
              <FileDropzone
                compact
                accept={UPLOAD_CONTENT_TYPES}
                maxBytes={UPLOAD_MAX_BYTES}
                progress={progress}
                label={t('upload')}
                onFile={setFile}
              />
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            {tc('cancel')}
          </Button>
          <Button type="button" disabled={!ready || pending} onClick={() => void save()}>
            {pending ? tc('saving') : t('addCertification')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
