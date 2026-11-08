'use client';

import {
  AQL_LEVELS,
  aqlVerdict,
  IMAGE_CONTENT_TYPES,
  INSPECTION_PHOTO_MAX_BYTES,
  INSPECTION_REPORT_MAX_BYTES,
  type InspectionReportDto,
  type InspectionReportInput,
  InspectionReportSchema,
  type InspectorJobDetail,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ClipboardList, FileCheck2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { FileDropzone } from '@/components/patterns/file-dropzone';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
import { ApiError } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import {
  uploadInspectionFile,
  useAddInspectionPhoto,
  useFileReport,
  useInspectorJob,
} from '../api';
import { CheckInCard } from '@/features/gig/components/check-in-card';
import { InspectionsPanel } from './inspections-panel';

const REASON = { CRITICAL: 'critical', MAJOR: 'major', MINOR: 'minor' } as const;

export function InspectorJobPage({ id }: { id: string }) {
  const t = useTranslations('qc.inspector');
  const job = useInspectorJob(id);

  if (job.isPending)
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-[28rem] rounded-xl" />
      </div>
    );
  if (job.isError)
    return job.error instanceof ApiError && job.error.status === 404 ? (
      <EmptyState
        icon={ClipboardList}
        title={t('notFound')}
        action={<Button render={<Link href="/inspector" />}>{t('back')}</Button>}
      />
    ) : (
      <ErrorState onRetry={() => void job.refetch()} retrying={job.isFetching} />
    );
  return <JobView job={job.data} />;
}

function JobView({ job }: { job: InspectorJobDetail }) {
  const t = useTranslations('qc.inspector');
  const tq = useTranslations('qc');
  const locale = useLocale();
  const format = useFormatter();
  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" className="-ms-2" render={<Link href="/inspector" />}>
          <ArrowLeft className="rtl:rotate-180" />
          {t('back')}
        </Button>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="code">{job.orderCode}</Badge>
            <StatusBadge domain="inspection" status={job.result} />
            <span className="text-muted-foreground text-sm">{tq(`types.${job.type}`)}</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-balance sm:text-3xl">
            {job.title}
          </h1>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-6">
          <CheckInCard job={job} />
          {job.canReport ? (
            job.checkIn.required && !job.checkIn.at ? null : (
              <>
                <PhotosCard job={job} />
                <ReportForm job={job} />
              </>
            )
          ) : (
            <section className="space-y-3">
              <h2 className="text-lg font-semibold tracking-[-0.01em]">{t('report')}</h2>
              {job.result === 'PENDING' ? (
                <p className="text-muted-foreground text-sm">{t('notYet')}</p>
              ) : null}
              <InspectionsPanel
                role="ADMIN"
                code={job.orderCode}
                status="COMPLETED"
                inspections={[job.inspection]}
              />
            </section>
          )}
        </div>
        <aside className="space-y-4">
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('factory')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium">{job.factory.name}</p>
              <p className="text-muted-foreground flex gap-1.5">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {[job.factory.address, countryName(job.factory.country, locale)]
                    .filter(Boolean)
                    .join(', ')}
                </span>
              </p>
              <Badge variant="code">{job.factory.code}</Badge>
              {job.scheduledAt ? (
                <p className="text-muted-foreground">
                  {tq('scheduledFor', {
                    date: format.dateTime(new Date(job.scheduledAt), { dateStyle: 'medium' }),
                  })}
                </p>
              ) : null}
            </CardContent>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>{t('lot')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="tabular font-medium">{t('pieces', { count: job.quantity })}</p>
              {job.items.length > 0 ? (
                <ul className="divide-y">
                  {job.items.map((i) => (
                    <li key={`${i.color}-${i.size}`} className="flex justify-between py-1.5">
                      <span>
                        {i.color} / {i.size}
                      </span>
                      <span className="tabular text-muted-foreground">
                        {format.number(i.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              {job.specification ? (
                <p className="text-muted-foreground leading-relaxed">{job.specification}</p>
              ) : null}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function PhotosCard({ job }: { job: InspectorJobDetail }) {
  const t = useTranslations('qc.inspector');
  const add = useAddInspectionPhoto(job.id);
  const [progress, setProgress] = useState<number | null>(null);
  const photos = job.inspection.photos;
  const upload = async (file: File) => {
    try {
      const fileId = await uploadInspectionFile(job.id, file, setProgress);
      await add.mutateAsync({ fileId });
    } catch {
      toast.error(t('uploadFailed'));
    } finally {
      setProgress(null);
    }
  };
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{t('photos')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {photos.length > 0 ? (
          <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {photos.map((p) => (
              <li key={p.id} className="bg-muted aspect-square overflow-hidden rounded-md">
                {p.urls ? (
                  // eslint-disable-next-line @next/next/no-img-element -- signed URL to a sanitized rendition
                  <img src={p.urls.thumb} alt="" className="size-full object-cover" />
                ) : (
                  <span className="text-muted-foreground flex size-full items-center justify-center text-xs">
                    {t('processing')}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : null}
        <FileDropzone
          multiple
          compact
          accept={IMAGE_CONTENT_TYPES}
          maxBytes={INSPECTION_PHOTO_MAX_BYTES}
          progress={progress}
          label={t('addPhotos')}
          hint={t('photosHint')}
          onFile={(file) => void upload(file)}
        />
      </CardContent>
    </Card>
  );
}

function ReportForm({ job }: { job: InspectorJobDetail }) {
  const t = useTranslations('qc.inspector');
  const tq = useTranslations('qc');
  const tc = useTranslations('common');
  const file = useFileReport(job.id);
  const [error, setError] = useState<string | null>(null);
  const [pdf, setPdf] = useState<{ id: string; name: string } | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const form = useForm<InspectionReportInput, unknown, InspectionReportDto>({
    resolver: zodResolver(InspectionReportSchema),
    defaultValues: {
      lotSize: job.quantity,
      majorAql: '2.5',
      minorAql: '4.0',
      critical: 0,
      major: 0,
      minor: 0,
      result: 'PASS',
      summary: '',
    },
  });
  const { errors, isSubmitting } = form.formState;
  const values = useWatch({ control: form.control });
  const num = (v: unknown) => (typeof v === 'number' ? v : Number(v));
  const lot = num(values.lotSize);
  const verdict =
    Number.isInteger(lot) && lot >= 2
      ? aqlVerdict({
          lotSize: lot,
          majorAql: values.majorAql ?? '2.5',
          minorAql: values.minorAql ?? '4.0',
          critical: num(values.critical) || 0,
          major: num(values.major) || 0,
          minor: num(values.minor) || 0,
        })
      : null;

  const uploadPdf = async (f: File) => {
    try {
      const id = await uploadInspectionFile(job.id, f, setProgress);
      setPdf({ id, name: f.name });
    } catch {
      toast.error(t('uploadFailed'));
    } finally {
      setProgress(null);
    }
  };

  const count = (name: 'critical' | 'major' | 'minor', allowed: number | undefined) => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`r-${name}`}>{t(`defects.${name}`)}</FieldLabel>
      <Input id={`r-${name}`} inputMode="numeric" {...form.register(name)} />
      <span className="text-muted-foreground text-xs">{t('allowed', { count: allowed ?? 0 })}</span>
      <FieldError errors={[errors[name]]} />
    </Field>
  );
  const aqlSelect = (name: 'majorAql' | 'minorAql') => (
    <Field>
      <FieldLabel htmlFor={`r-${name}`}>{t(`aql.${name}`)}</FieldLabel>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <Select
            items={AQL_LEVELS.map((l) => ({ value: l, label: l }))}
            value={field.value}
            onValueChange={(v) => {
              const level = AQL_LEVELS.find((l) => l === v);
              if (level) field.onChange(level);
            }}
          >
            <SelectTrigger id={`r-${name}`} className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AQL_LEVELS.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
    </Field>
  );

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>{t('report')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-6"
          noValidate
          onSubmit={(e) =>
            void form.handleSubmit(async (dto) => {
              if (dto.result === 'PASS' && verdict?.result === 'FAIL') {
                form.setError('result', { message: t('cantPass') });
                return;
              }
              try {
                await file.mutateAsync({ ...dto, reportFileId: pdf?.id });
                toast.success(dto.result === 'PASS' ? t('filedPass') : t('filedFail'));
              } catch (err) {
                setError(
                  applyServerErrors(
                    err,
                    form.setError,
                    ['lotSize', 'critical', 'major', 'minor', 'summary'],
                    tc('networkError'),
                  ),
                );
              }
            })(e)
          }
        >
          <FormAlert message={error} />
          <FieldGroup>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field data-invalid={!!errors.lotSize}>
                <FieldLabel htmlFor="r-lot">{t('lotSize')}</FieldLabel>
                <Input id="r-lot" inputMode="numeric" {...form.register('lotSize')} />
                <FieldError errors={[errors.lotSize]} />
              </Field>
              {aqlSelect('majorAql')}
              {aqlSelect('minorAql')}
            </div>
            <p className="bg-surface rounded-lg border p-3 text-sm">
              {verdict
                ? t('plan', {
                    sample: verdict.sampleSize,
                    major: verdict.acceptMajor,
                    minor: verdict.acceptMinor,
                  })
                : t('planMissing')}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {count('critical', 0)}
              {count('major', verdict?.acceptMajor)}
              {count('minor', verdict?.acceptMinor)}
            </div>
            {verdict ? (
              <p
                role="status"
                className={cn(
                  'rounded-lg px-3 py-2 text-sm font-medium',
                  verdict.result === 'PASS'
                    ? 'bg-success-soft text-success-ink'
                    : 'bg-danger-soft text-danger-ink',
                )}
              >
                {verdict.result === 'PASS'
                  ? t('verdictPass')
                  : t('verdictFail', {
                      reasons: verdict.reasons.map((r) => t(`defects.${REASON[r]}`)).join(', '),
                    })}
              </p>
            ) : null}
            <Field data-invalid={!!errors.result}>
              <FieldLabel>{t('result')}</FieldLabel>
              <Controller
                control={form.control}
                name="result"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={(v) => field.onChange(v === 'FAIL' ? 'FAIL' : 'PASS')}
                    className="grid gap-2 sm:grid-cols-2"
                  >
                    {(['PASS', 'FAIL'] as const).map((r) => (
                      <label
                        key={r}
                        className="has-data-checked:border-primary flex cursor-pointer items-center gap-3 rounded-lg border p-3"
                      >
                        <RadioGroupItem
                          value={r}
                          disabled={r === 'PASS' && verdict?.result === 'FAIL'}
                        />
                        <span className="text-sm font-medium">{tq(`results.${r}`)}</span>
                      </label>
                    ))}
                  </RadioGroup>
                )}
              />
              <FieldError errors={[errors.result]} />
            </Field>
            <Field data-invalid={!!errors.summary}>
              <FieldLabel htmlFor="r-summary">{t('summary')}</FieldLabel>
              <Textarea
                id="r-summary"
                rows={5}
                placeholder={t('summaryHint')}
                {...form.register('summary')}
              />
              <FieldError errors={[errors.summary]} />
            </Field>
            <Field>
              <FieldLabel>{t('pdf')}</FieldLabel>
              {pdf ? (
                <p className="flex items-center gap-2 text-sm">
                  <FileCheck2 className="text-success-ink size-4" aria-hidden="true" />
                  {pdf.name}
                </p>
              ) : (
                <FileDropzone
                  compact
                  accept={['application/pdf']}
                  maxBytes={INSPECTION_REPORT_MAX_BYTES}
                  progress={progress}
                  label={t('pdfLabel')}
                  hint={t('pdfHint')}
                  onFile={(f) => void uploadPdf(f)}
                />
              )}
            </Field>
          </FieldGroup>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting || progress !== null}>
              {t('submit')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
