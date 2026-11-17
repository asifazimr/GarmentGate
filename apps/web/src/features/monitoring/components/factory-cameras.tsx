'use client';

import {
  CameraAreaSchema,
  type CreateCameraDto,
  CreateCameraSchema,
  type FactoryCamera,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cctv, Check, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { OptionSelect } from '@/features/logistics/components/form-bits';
import { ApiError } from '@/lib/api';
import { applyServerErrors } from '@/lib/form-errors';
import { cn } from '@/lib/utils';
import { useCameraAction, useCreateCamera, useFactoryCameras } from '../api';

/** The factory's cameras: connect one, stream to it, submit it for review. */
export function FactoryCamerasPage() {
  const t = useTranslations('monitoring.factory');
  const query = useFactoryCameras();
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <AddCamera />
      {query.isPending ? (
        <div className="grid gap-4">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
      ) : query.isError ? (
        <ErrorState onRetry={() => void query.refetch()} retrying={query.isFetching} />
      ) : query.data.length === 0 ? (
        <EmptyState icon={Cctv} title={t('empty.title')} description={t('empty.description')} />
      ) : (
        <ul className="grid gap-4">
          {query.data.map((camera) => (
            <li key={camera.id}>
              <CameraCard camera={camera} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AddCamera() {
  const t = useTranslations('monitoring');
  const tc = useTranslations('common');
  const create = useCreateCamera();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<CreateCameraDto>({
    resolver: zodResolver(CreateCameraSchema),
    defaultValues: { label: '', area: 'SEWING' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('factory.add')}</CardTitle>
        <CardDescription>{t('factory.addHint')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          className="grid gap-4 sm:grid-cols-[1fr_14rem_auto] sm:items-start"
          onSubmit={(e) =>
            void form.handleSubmit(async (dto) => {
              setError(null);
              try {
                await create.mutateAsync(dto);
                form.reset({ label: '', area: dto.area });
                toast.success(t('factory.created'));
              } catch (err) {
                setError(applyServerErrors(err, form.setError, ['label'], tc('networkError')));
              }
            })(e)
          }
        >
          <div className="sm:col-span-3">
            <FormAlert message={error} />
          </div>
          <Field data-invalid={!!errors.label}>
            <FieldLabel htmlFor="camera-label">{t('factory.label')}</FieldLabel>
            <Input id="camera-label" {...form.register('label')} />
            <FieldDescription>{t('factory.labelHint')}</FieldDescription>
            <FieldError errors={[errors.label]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="camera-area">{t('factory.area')}</FieldLabel>
            <Controller
              control={form.control}
              name="area"
              render={({ field }) => (
                <OptionSelect
                  id="camera-area"
                  value={field.value}
                  onChange={(v) => {
                    const parsed = CameraAreaSchema.safeParse(v);
                    if (parsed.success) field.onChange(parsed.data);
                  }}
                  options={CameraAreaSchema.options.map((a) => ({
                    value: a,
                    label: t(`area.${a}`),
                  }))}
                />
              )}
            />
          </Field>
          <Button type="submit" disabled={isSubmitting} className="sm:mt-6">
            {t('factory.create')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function CameraCard({ camera }: { camera: FactoryCamera }) {
  const t = useTranslations('monitoring');
  const action = useCameraAction();
  const [confirming, setConfirming] = useState(false);
  const run = (kind: 'submit' | 'remove') =>
    action.mutate(
      { id: camera.id, action: kind },
      {
        onSuccess: () =>
          toast.success(kind === 'submit' ? t('factory.submitted') : t('factory.removed')),
        onError: (err) => toast.error(err instanceof ApiError ? err.message : t('factory.failed')),
      },
    );
  const canSubmit = camera.status === 'SETUP' || camera.status === 'REJECTED';
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'size-2.5 rounded-full',
              camera.live ? 'bg-success' : 'bg-neutral-ink/40',
            )}
            aria-hidden="true"
          />
          {camera.label}
          <span className="text-muted-foreground text-sm font-normal">
            · {t(`area.${camera.area}`)} · {camera.live ? t('player.live') : t('player.offline')}
          </span>
          <StatusBadge domain="camera" status={camera.status} className="ms-auto" />
        </CardTitle>
        <CardDescription>{t(`factory.status.${camera.status}`)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {camera.reviewNote && camera.status === 'REJECTED' ? (
          <p className="bg-danger-soft text-danger-ink rounded-lg px-3 py-2 text-sm">
            {camera.reviewNote}
          </p>
        ) : null}
        {camera.ingest ? <Ingest {...camera.ingest} /> : null}
        <div className="flex flex-wrap gap-2">
          {canSubmit ? (
            <Button disabled={action.isPending || !camera.live} onClick={() => run('submit')}>
              {t('factory.submit')}
            </Button>
          ) : null}
          {confirming ? (
            <>
              <Button
                variant="destructive"
                disabled={action.isPending}
                onClick={() => run('remove')}
              >
                {t('factory.removeConfirm')}
              </Button>
              <Button variant="ghost" onClick={() => setConfirming(false)}>
                {t('factory.keep')}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setConfirming(true)}>
              {t('factory.remove')}
            </Button>
          )}
        </div>
        {canSubmit && !camera.live ? (
          <p className="text-muted-foreground text-xs">{t('factory.startFirst')}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}

/** Where to point the camera, NVR or encoder (RTMPS), plus the ffmpeg line for RTSP cameras. */
function Ingest({ rtmpsUrl, streamKey }: { rtmpsUrl: string; streamKey: string }) {
  const t = useTranslations('monitoring.factory.setup');
  const ffmpeg = `ffmpeg -rtsp_transport tcp -i "rtsp://USER:PASSWORD@CAMERA-IP:554/stream1" -c:v copy -c:a aac -f flv "${rtmpsUrl}${streamKey}"`;
  return (
    <details className="group rounded-lg border">
      <summary className="flex min-h-11 cursor-pointer list-none items-center px-3 text-sm font-medium outline-none focus-visible:underline [&::-webkit-details-marker]:hidden">
        {t('title')}
      </summary>
      <div className="space-y-3 border-t p-3 text-sm">
        <ol className="text-muted-foreground list-decimal space-y-1 ps-5">
          <li>{t('step1')}</li>
          <li>{t('step2')}</li>
          <li>{t('step3')}</li>
        </ol>
        <CopyRow label={t('server')} value={rtmpsUrl} />
        <CopyRow label={t('key')} value={streamKey} secret />
        <div>
          <p className="font-medium">{t('ffmpeg')}</p>
          <p className="text-muted-foreground text-xs">{t('ffmpegHint')}</p>
          <CopyRow label={t('command')} value={ffmpeg} />
        </div>
        <p className="text-muted-foreground text-xs">{t('keySecret')}</p>
      </div>
    </details>
  );
}

function CopyRow({
  label,
  value,
  secret = false,
}: {
  label: string;
  value: string;
  secret?: boolean;
}) {
  const t = useTranslations('monitoring.factory.setup');
  const [copied, setCopied] = useState(false);
  const [shown, setShown] = useState(!secret);
  return (
    <div className="grid gap-1">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="flex items-center gap-2">
        <code className="bg-surface min-w-0 flex-1 overflow-x-auto rounded-md border px-2 py-1.5 font-mono text-xs whitespace-nowrap">
          {shown ? value : '••••••••••••••••'}
        </code>
        {secret ? (
          <Button size="sm" variant="ghost" onClick={() => setShown((s) => !s)}>
            {shown ? t('hide') : t('show')}
          </Button>
        ) : null}
        <Button
          size="icon"
          variant="outline"
          aria-label={t('copy', { what: label })}
          onClick={() =>
            void navigator.clipboard.writeText(value).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            })
          }
        >
          {copied ? <Check /> : <Copy />}
        </Button>
      </div>
    </div>
  );
}
