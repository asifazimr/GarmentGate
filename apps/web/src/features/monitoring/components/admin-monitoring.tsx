'use client';

import {
  type AdminCamera,
  CAMERA_CHECKLIST,
  type CameraCheck,
  type MonitoringSettings,
  MonitoringSettingsSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cctv } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { StatusBadge } from '@/components/patterns/status-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { applyServerErrors } from '@/lib/form-errors';
import {
  useAdminCameras,
  useDisableCamera,
  useMonitoringSettings,
  useReviewCamera,
  useSaveMonitoringSettings,
} from '../api';
import { VideoPlayer } from './video-player';

/** Staff: review cameras against the privacy checklist, switch any off, set the add-on terms. */
export function AdminMonitoringPage() {
  const t = useTranslations('monitoring.admin');
  const cameras = useAdminCameras();
  const queue = (cameras.data ?? []).filter((c) => c.status === 'PENDING_REVIEW');
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <Tabs defaultValue="queue">
        <TabsList>
          <TabsTrigger value="queue">
            {t('tabs.queue')}
            {queue.length > 0 ? <Badge variant="warning">{queue.length}</Badge> : null}
          </TabsTrigger>
          <TabsTrigger value="all">{t('tabs.all')}</TabsTrigger>
          <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
        </TabsList>
        <TabsContent value="queue" className="mt-4">
          {cameras.isPending ? (
            <Skeleton className="h-80 rounded-xl" />
          ) : cameras.isError ? (
            <ErrorState onRetry={() => void cameras.refetch()} retrying={cameras.isFetching} />
          ) : queue.length === 0 ? (
            <EmptyState icon={Cctv} title={t('emptyQueue')} description={t('emptyQueueBody')} />
          ) : (
            <ul className="grid gap-4">
              {queue.map((c) => (
                <li key={c.id}>
                  <ReviewCard camera={c} />
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
        <TabsContent value="all" className="mt-4">
          <AllCameras />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <SettingsCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReviewCard({ camera }: { camera: AdminCamera }) {
  const t = useTranslations('monitoring');
  const review = useReviewCamera();
  const [checks, setChecks] = useState<Record<CameraCheck, boolean>>({
    productionOnly: false,
    noSignage: false,
    noFaces: false,
    noOutsideView: false,
  });
  const [note, setNote] = useState('');
  const allChecked = CAMERA_CHECKLIST.every((k) => checks[k]);
  const decide = (decision: 'APPROVE' | 'REJECT') =>
    review.mutate(
      {
        id: camera.id,
        dto: { decision, checklist: checks, note: note.trim() || undefined },
      },
      {
        onSuccess: () =>
          toast.success(decision === 'APPROVE' ? t('admin.approved') : t('admin.rejected')),
        onError: (err) => toast.error(err instanceof ApiError ? err.message : t('factory.failed')),
      },
    );
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <Badge variant="code">{camera.manufacturer.code}</Badge>
          {camera.label}
          <span className="text-muted-foreground text-sm font-normal">
            · {t(`area.${camera.area}`)} · {camera.manufacturer.name}
          </span>
        </CardTitle>
        <CardDescription>{t('admin.reviewHint')}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {camera.playbackUrl && camera.live ? (
          <VideoPlayer src={camera.playbackUrl} live overlay={camera.manufacturer.code} />
        ) : (
          <div className="bg-surface text-muted-foreground flex aspect-video items-center justify-center rounded-lg border text-sm">
            {t('admin.offline')}
          </div>
        )}
        <div className="space-y-4">
          <fieldset className="space-y-1">
            <legend className="mb-1 text-sm font-medium">{t('admin.checklistTitle')}</legend>
            {CAMERA_CHECKLIST.map((key) => (
              <label key={key} className="flex min-h-11 items-center gap-2.5 text-sm">
                <Checkbox
                  checked={checks[key]}
                  onCheckedChange={(on) => setChecks((c) => ({ ...c, [key]: on }))}
                />
                {t(`admin.checklist.${key}`)}
              </label>
            ))}
          </fieldset>
          <Field>
            <FieldLabel htmlFor={`note-${camera.id}`}>{t('admin.note')}</FieldLabel>
            <Textarea
              id={`note-${camera.id}`}
              value={note}
              maxLength={500}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('admin.notePlaceholder')}
            />
            <FieldDescription>{t('admin.noteHint')}</FieldDescription>
          </Field>
          <div className="flex flex-wrap gap-2">
            <Button disabled={!allChecked || review.isPending} onClick={() => decide('APPROVE')}>
              {t('admin.approve')}
            </Button>
            <Button
              variant="destructive-soft"
              disabled={note.trim().length < 5 || review.isPending}
              onClick={() => decide('REJECT')}
            >
              {t('admin.reject')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AllCameras() {
  const t = useTranslations('monitoring');
  const ts = useTranslations('statuses.camera');
  const format = useFormatter();
  const cameras = useAdminCameras();
  const disable = useDisableCamera();
  const [watching, setWatching] = useState<AdminCamera | null>(null);
  const columns = useMemo<DataColumn<AdminCamera>[]>(
    () => [
      {
        id: 'factory',
        header: t('admin.cols.factory'),
        value: (c) => `${c.manufacturer.code} ${c.manufacturer.name}`,
        cell: (c) => (
          <div className="min-w-0">
            <Badge variant="code">{c.manufacturer.code}</Badge>
            <p className="text-muted-foreground truncate text-xs">{c.manufacturer.name}</p>
          </div>
        ),
      },
      {
        id: 'camera',
        header: t('admin.cols.camera'),
        value: (c) => `${c.label} · ${t(`area.${c.area}`)}`,
      },
      {
        id: 'status',
        header: t('admin.cols.status'),
        value: (c) => ts(c.status),
        cell: (c) => <StatusBadge domain="camera" status={c.status} />,
      },
      {
        id: 'live',
        header: t('admin.cols.live'),
        value: (c) => (c.live ? t('player.live') : t('player.offline')),
      },
      {
        id: 'created',
        header: t('admin.cols.created'),
        value: (c) => c.createdAt,
        cell: (c) => format.dateTime(new Date(c.createdAt), { dateStyle: 'medium' }),
        hideOnMobile: true,
        sortable: true,
      },
      {
        id: 'actions',
        header: '',
        value: () => '',
        csv: false,
        searchable: false,
        cell: (c) => (
          <div className="flex justify-end gap-2">
            {c.playbackUrl && c.live ? (
              <Button size="sm" variant="outline" onClick={() => setWatching(c)}>
                {t('admin.watch')}
              </Button>
            ) : null}
            {c.status !== 'DISABLED' ? (
              <Button
                size="sm"
                variant="destructive-soft"
                disabled={disable.isPending}
                onClick={() =>
                  disable.mutate(c.id, {
                    onSuccess: () => toast.success(t('admin.disabled')),
                    onError: (err) =>
                      toast.error(err instanceof ApiError ? err.message : t('factory.failed')),
                  })
                }
              >
                {t('admin.disable')}
              </Button>
            ) : null}
          </div>
        ),
      },
    ],
    [t, ts, format, disable],
  );
  return (
    <div className="space-y-4">
      {watching?.playbackUrl ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="code">{watching.manufacturer.code}</Badge>
              {watching.label}
              <Button
                size="sm"
                variant="ghost"
                className="ms-auto"
                onClick={() => setWatching(null)}
              >
                {t('admin.close')}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <VideoPlayer
              key={watching.id}
              src={watching.playbackUrl}
              live
              overlay={watching.manufacturer.code}
            />
          </CardContent>
        </Card>
      ) : null}
      <DataTable
        data={cameras.data}
        columns={columns}
        loading={cameras.isPending}
        error={cameras.isError}
        onRetry={() => void cameras.refetch()}
        retrying={cameras.isFetching}
        csvName="cameras"
        filters={[{ column: 'status', label: t('admin.cols.status') }]}
        empty={{ icon: Cctv, title: t('admin.empty'), description: t('admin.emptyBody') }}
      />
    </div>
  );
}

function SettingsCard() {
  const t = useTranslations('monitoring.admin');
  const settings = useMonitoringSettings();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('settings.title')}</CardTitle>
        <CardDescription>{t('settings.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {settings.isPending ? (
          <Skeleton className="h-48 rounded-lg" />
        ) : settings.isError ? (
          <ErrorState onRetry={() => void settings.refetch()} retrying={settings.isFetching} />
        ) : (
          <SettingsForm initial={settings.data} />
        )}
      </CardContent>
    </Card>
  );
}

function SettingsForm({ initial }: { initial: MonitoringSettings }) {
  const t = useTranslations('monitoring.admin.settings');
  const tc = useTranslations('common');
  const save = useSaveMonitoringSettings();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<MonitoringSettings>({
    resolver: zodResolver(MonitoringSettingsSchema),
    defaultValues: initial,
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <form
      noValidate
      className="max-w-md space-y-5"
      onSubmit={(e) =>
        void form.handleSubmit(async (dto) => {
          setError(null);
          try {
            await save.mutateAsync(dto);
            toast.success(t('saved'));
          } catch (err) {
            setError(
              applyServerErrors(
                err,
                form.setError,
                ['feeUsdMinor', 'playbackMinutes'],
                tc('networkError'),
              ),
            );
          }
        })(e)
      }
    >
      <FormAlert message={error} />
      <Controller
        control={form.control}
        name="enabled"
        render={({ field }) => (
          <label className="flex min-h-11 items-center gap-2.5 text-sm">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            {t('enabled')}
          </label>
        )}
      />
      <Field data-invalid={!!errors.feeUsdMinor}>
        <FieldLabel htmlFor="mon-fee">{t('fee')}</FieldLabel>
        <Input
          id="mon-fee"
          type="number"
          inputMode="numeric"
          {...form.register('feeUsdMinor', { valueAsNumber: true })}
        />
        <FieldDescription>{t('feeHint')}</FieldDescription>
        <FieldError errors={[errors.feeUsdMinor]} />
      </Field>
      <Field data-invalid={!!errors.playbackMinutes}>
        <FieldLabel htmlFor="mon-ttl">{t('playback')}</FieldLabel>
        <Input
          id="mon-ttl"
          type="number"
          inputMode="numeric"
          {...form.register('playbackMinutes', { valueAsNumber: true })}
        />
        <FieldDescription>{t('playbackHint')}</FieldDescription>
        <FieldError errors={[errors.playbackMinutes]} />
      </Field>
      <Button type="submit" disabled={isSubmitting}>
        {t('save')}
      </Button>
    </form>
  );
}
