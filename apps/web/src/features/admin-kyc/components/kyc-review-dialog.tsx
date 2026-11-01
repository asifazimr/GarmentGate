'use client';

import { RejectKycSchema } from '@garmentgate/shared';
import { ExternalLink } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
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
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { formatBytes } from '@/features/onboarding/components/file-drop';
import { ApiError } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { openFile, useKycDecision, useKycDetail } from '../api';

export function KycReviewDialog({
  companyId,
  onClose,
}: {
  companyId: string | null;
  onClose: () => void;
}) {
  const t = useTranslations('admin.detail');
  const tdoc = useTranslations('onboarding.documents.types');
  const tcert = useTranslations('certifications');
  const tstatus = useTranslations('status');
  const tco = useTranslations('onboarding.company');
  const tc = useTranslations('common');
  const locale = useLocale();
  const detail = useKycDetail(companyId);
  const decide = useKycDecision();
  const [rejecting, setRejecting] = useState(false);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const close = () => {
    setRejecting(false);
    setReason('');
    setReasonError(null);
    setError(null);
    onClose();
  };

  const run = async (decision: 'approve' | 'reject') => {
    if (!companyId || !detail.data) return;
    setError(null);
    if (decision === 'reject') {
      const parsed = RejectKycSchema.safeParse({ reason });
      if (!parsed.success) {
        setReasonError(parsed.error.issues[0]?.message ?? null);
        return;
      }
    }
    try {
      await decide.mutateAsync({ id: companyId, decision, reason });
      const code = detail.data.publicCode ?? detail.data.legalName;
      toast.success(decision === 'approve' ? t('approved', { code }) : t('rejected', { code }));
      close();
    } catch (e) {
      setError(e instanceof ApiError ? e.message : String(e));
    }
  };

  const data = detail.data;
  const pending = data?.kycStatus === 'PENDING_REVIEW';

  return (
    <Dialog open={companyId !== null} onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-h-[92dvh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{data ? data.legalName : <Skeleton className="h-6 w-56" />}</DialogTitle>
          <DialogDescription>
            {data ? (
              <span className="inline-flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="font-mono">
                  {data.publicCode ?? '—'}
                </Badge>
                <span>{countryName(data.country, locale)}</span>
              </span>
            ) : null}
          </DialogDescription>
        </DialogHeader>

        {detail.isPending ? (
          <div className="space-y-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : detail.isError ? (
          <FormAlert message={detail.error.message} />
        ) : data ? (
          <div className="space-y-6 text-sm">
            <FormAlert message={error} />
            {data.rejectionReason ? <FormAlert message={data.rejectionReason} /> : null}

            <Section title={t('identity')}>
              <Rows
                rows={[
                  [tco('legalName'), data.company.legalName],
                  [tco('tradeName'), data.company.tradeName],
                  [tco('registrationNumber'), data.company.registrationNumber],
                  [
                    tco('addressLine1'),
                    [
                      data.company.addressLine1,
                      data.company.addressLine2,
                      data.company.city,
                      data.company.postalCode,
                    ]
                      .filter(Boolean)
                      .join(', '),
                  ],
                  [tco('website'), data.company.website],
                  [tco('phone'), data.company.phone],
                  [tco('yearEstablished'), data.company.yearEstablished],
                  [t('owner'), data.owner ? `${data.owner.name} · ${data.owner.email}` : null],
                ]}
              />
            </Section>

            <Section title={t('profile')}>
              {data.categories.length > 0 ? (
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {data.categories.map((c) => (
                    <Badge key={c} variant="outline">
                      {c}
                    </Badge>
                  ))}
                </div>
              ) : null}
              <Rows rows={Object.entries(data.profileSummary)} />
            </Section>

            <Section title={t('documents')}>
              <FileList
                files={data.documents.map((d) => ({
                  id: d.id,
                  fileId: d.fileId,
                  title: tdoc(d.type),
                  meta: `${d.file.fileName} · ${formatBytes(d.file.sizeBytes, locale)}`,
                  status: tstatus(d.status),
                }))}
                openLabel={t('open')}
              />
            </Section>

            {data.type === 'MANUFACTURER' ? (
              <Section title={t('certifications')}>
                <FileList
                  files={data.certifications.map((c) => ({
                    id: c.id,
                    fileId: c.fileId,
                    title: c.customName ?? tcert(c.type),
                    meta: [c.certificateNumber, c.expiresAt?.slice(0, 10)]
                      .filter(Boolean)
                      .join(' · '),
                    status: tstatus(c.status),
                  }))}
                  openLabel={t('open')}
                />
              </Section>
            ) : null}

            {rejecting ? (
              <Field data-invalid={!!reasonError}>
                <FieldLabel htmlFor="reject-reason">{t('rejectReason')}</FieldLabel>
                <Textarea
                  id="reject-reason"
                  rows={3}
                  autoFocus
                  value={reason}
                  placeholder={t('rejectPlaceholder')}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setReasonError(null);
                  }}
                />
                <FieldError>{reasonError}</FieldError>
              </Field>
            ) : null}
          </div>
        ) : null}

        {pending ? (
          <DialogFooter>
            {rejecting ? (
              <>
                <Button variant="ghost" onClick={() => setRejecting(false)}>
                  {tc('cancel')}
                </Button>
                <Button
                  variant="destructive"
                  disabled={decide.isPending}
                  onClick={() => void run('reject')}
                >
                  {t('rejectConfirm')}
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => setRejecting(true)}>
                  {t('reject')}
                </Button>
                <Button disabled={decide.isPending} onClick={() => void run('approve')}>
                  {decide.isPending ? t('approving') : t('approve')}
                </Button>
              </>
            )}
          </DialogFooter>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

function Rows({ rows }: { rows: [string, string | number | null | undefined][] }) {
  return (
    <dl className="grid gap-x-4 gap-y-1.5 sm:grid-cols-[minmax(0,12rem)_1fr]">
      {rows
        .filter(([, value]) => value !== null && value !== undefined && value !== '')
        .map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="break-words">{value}</dd>
          </div>
        ))}
    </dl>
  );
}

function FileList({
  files,
  openLabel,
}: {
  files: { id: string; fileId: string | null; title: string; meta: string; status: string }[];
  openLabel: string;
}) {
  if (files.length === 0) return <p className="text-muted-foreground">—</p>;
  return (
    <ul className="divide-y rounded-xl border">
      {files.map((f) => (
        <li key={f.id} className="flex items-center gap-3 p-3">
          <div className="min-w-0 flex-1">
            <p className="font-medium">{f.title}</p>
            <p className="text-muted-foreground truncate">{f.meta}</p>
          </div>
          <Badge variant="outline">{f.status}</Badge>
          {f.fileId ? (
            <Button variant="ghost" size="sm" onClick={() => void openFile(f.fileId ?? '')}>
              <ExternalLink className="size-4" aria-hidden="true" />
              {openLabel}
            </Button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
