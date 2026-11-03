'use client';

import {
  type ManufacturerCapabilitiesDto,
  type ManufacturerCapabilitiesInput,
  ManufacturerCapabilitiesSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeCheck, Eye, Plus, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EmptyState } from '@/components/patterns/empty-state';
import { ErrorState } from '@/components/patterns/error-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormAlert } from '@/features/auth/components/form-alert';
import { PublicManufacturerView } from '@/features/catalog/components/public-manufacturer-view';
import {
  CapabilitiesFields,
  EMPTY_CAPABILITIES,
} from '@/features/onboarding/components/capabilities-fields';
import { applyServerErrors } from '@/lib/form-errors';
import {
  useAddCertification,
  useAddPhoto,
  useCertifications,
  useManufacturerProfile,
  useProfilePreview,
  useRemoveCertification,
  useRemovePhoto,
  useReorderPhotos,
  useUpdateCapabilities,
} from '../api';
import { SupplierClaimsTab } from '@/features/capacity-booking/components/supplier-claims';
import { CertificationDialog } from './certification-dialog';
import { ImageManager } from './image-manager';

const MAX_PHOTOS = 20;
const TABS = ['capabilities', 'photos', 'certifications', 'claims', 'preview'] as const;
type Tab = (typeof TABS)[number];

export function ProfileEditor() {
  const t = useTranslations('manufacturer.profile');
  const profile = useManufacturerProfile();
  const [tab, setTab] = useState<Tab>('capabilities');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={profile.data ? `${t('codeLabel')} · ${profile.data.publicCode}` : undefined}
        title={t('title')}
        description={t('description')}
      />
      <Tabs
        value={tab}
        onValueChange={(value) => {
          const next = TABS.find((candidate) => candidate === value);
          if (next) setTab(next);
        }}
      >
        <TabsList variant="line">
          {TABS.map((key) => (
            <TabsTrigger key={key} value={key}>
              {t(`tabs.${key}`)}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="pt-6">
          {profile.isPending ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : profile.isError ? (
            <ErrorState onRetry={() => void profile.refetch()} retrying={profile.isFetching} />
          ) : (
            <>
              <TabsContent value="capabilities">
                <CapabilitiesForm initial={profile.data.capabilities} />
              </TabsContent>
              <TabsContent value="photos">
                <PhotosTab photos={profile.data.photos} />
              </TabsContent>
              <TabsContent value="certifications">
                <CertificationsTab />
              </TabsContent>
              <TabsContent value="claims">
                <SupplierClaimsTab />
              </TabsContent>
              <TabsContent value="preview">
                <PreviewTab active={tab === 'preview'} />
              </TabsContent>
            </>
          )}
        </div>
      </Tabs>
    </div>
  );
}

function CapabilitiesForm({ initial }: { initial: ManufacturerCapabilitiesDto | null }) {
  const t = useTranslations('manufacturer.profile');
  const tc = useTranslations('common');
  const save = useUpdateCapabilities();
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<ManufacturerCapabilitiesInput, unknown, ManufacturerCapabilitiesDto>({
    resolver: zodResolver(ManufacturerCapabilitiesSchema),
    defaultValues: initial ?? EMPTY_CAPABILITIES,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);
    try {
      await save.mutateAsync({ ...values, machinery: values.machinery.filter((m) => m.type) });
      form.reset(values);
      toast.success(t('saved'));
    } catch (error) {
      setFormError(
        applyServerErrors(
          error,
          form.setError,
          Object.keys(ManufacturerCapabilitiesSchema.shape),
          tc('networkError'),
        ),
      );
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-3xl space-y-8">
      <FormAlert message={formError} />
      <CapabilitiesFields form={form} />
      <div className="bg-background/85 sticky bottom-20 z-10 -mx-1 flex justify-end rounded-xl p-1 backdrop-blur lg:bottom-4">
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting ? tc('saving') : t('save')}
        </Button>
      </div>
    </form>
  );
}

function PhotosTab({ photos }: { photos: Parameters<typeof ImageManager>[0]['images'] }) {
  const t = useTranslations('manufacturer.photos');
  const add = useAddPhoto();
  const remove = useRemovePhoto();
  const reorder = useReorderPhotos();
  return (
    <section className="max-w-4xl space-y-4">
      <Alert>
        <ShieldCheck />
        <AlertTitle>{t('title')}</AlertTitle>
        <AlertDescription>{t('description')}</AlertDescription>
      </Alert>
      <ImageManager
        images={photos}
        max={MAX_PHOTOS}
        onAdd={(file, onProgress) => add.mutateAsync({ file, onProgress })}
        onRemove={(id) => remove.mutate(id)}
        onReorder={(ids) => reorder.mutate(ids)}
        disabled={remove.isPending || reorder.isPending}
      />
    </section>
  );
}

function CertificationsTab() {
  const t = useTranslations('manufacturer.certs');
  const tcert = useTranslations('certifications');
  const tstatus = useTranslations('status');
  const format = useFormatter();
  const certs = useCertifications();
  const add = useAddCertification();
  const remove = useRemoveCertification();
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
      {certs.isPending ? (
        <Skeleton className="h-40 w-full rounded-xl" />
      ) : certs.isError ? (
        <ErrorState size="compact" onRetry={() => void certs.refetch()} />
      ) : certs.data.length === 0 ? (
        <EmptyState
          icon={BadgeCheck}
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
          {certs.data.map((c) => (
            <li key={c.id} className="flex items-center gap-3 px-4 py-3">
              <span className="bg-primary-soft text-primary-ink flex size-9 shrink-0 items-center justify-center rounded-lg">
                <BadgeCheck className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{c.customName ?? tcert(c.type)}</p>
                <p className="text-muted-foreground truncate text-sm">
                  {[
                    c.certificateNumber,
                    c.expiresAt
                      ? format.dateTime(new Date(c.expiresAt), { dateStyle: 'medium' })
                      : null,
                  ]
                    .filter(Boolean)
                    .join(' · ') || c.file?.fileName}
                </p>
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
                aria-label={`${t('remove')} ${c.customName ?? tcert(c.type)}`}
                onClick={() => remove.mutate(c.id)}
                disabled={remove.isPending}
              >
                <Trash2 />
              </Button>
            </li>
          ))}
        </ul>
      )}
      <CertificationDialog
        open={open}
        onOpenChange={setOpen}
        pending={add.isPending}
        onSave={(args) => add.mutateAsync(args)}
      />
    </section>
  );
}

function PreviewTab({ active }: { active: boolean }) {
  const t = useTranslations('manufacturer.preview');
  const preview = useProfilePreview(active);
  return (
    <section className="space-y-5">
      <Alert>
        <Eye />
        <AlertTitle>{t('title')}</AlertTitle>
        <AlertDescription>{t('body')}</AlertDescription>
      </Alert>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => void preview.refetch()}
          disabled={preview.isFetching}
        >
          <RefreshCw
            className={preview.isFetching ? 'animate-spin motion-reduce:animate-none' : ''}
          />
          {t('refresh')}
        </Button>
      </div>
      {preview.isPending ? (
        <Skeleton className="h-96 w-full rounded-xl" />
      ) : preview.isError ? (
        <ErrorState onRetry={() => void preview.refetch()} />
      ) : (
        <div className="bg-surface rounded-2xl border p-4 sm:p-6">
          <PublicManufacturerView manufacturer={preview.data} />
        </div>
      )}
    </section>
  );
}
