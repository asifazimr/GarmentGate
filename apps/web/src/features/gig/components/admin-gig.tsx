'use client';

import {
  type AdminGigInspector,
  type AdminInspectorApplication,
  type Coordinates,
  CoordinatesSchema,
  type GigSettings,
  GigSettingsSchema,
  type ReviewApplicationDto,
  ReviewApplicationSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, UserCheck, Users } from 'lucide-react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { ApiError } from '@/lib/api';
import { countryName } from '@/lib/countries';
import { formatMoney } from '@/lib/format';
import { applyServerErrors } from '@/lib/form-errors';
import {
  useApplications,
  useGigInspectors,
  useGigSettings,
  useLocateFactory,
  usePayInspector,
  useReviewApplication,
  useSaveGigSettings,
  useSetInspectorStatus,
  useVerifyPayout,
} from '../api';

const APP_TONE = { PENDING: 'warning', APPROVED: 'success', REJECTED: 'neutral' } as const;
const fail = (err: unknown, fallback: string) =>
  toast.error(err instanceof ApiError ? err.message : fallback);

// ── Applications ────────────────────────────────────────────────────────────

export function GigApplicationsTab() {
  const t = useTranslations('gig.admin');
  const tq = useTranslations('qc');
  const format = useFormatter();
  const locale = useLocale();
  const list = useApplications();
  const [reviewing, setReviewing] = useState<AdminInspectorApplication | null>(null);
  const columns = useMemo<DataColumn<AdminInspectorApplication>[]>(
    () => [
      {
        id: 'name',
        header: t('cols.name'),
        value: (a) => `${a.firstName} ${a.lastName}`,
        cell: (a) => (
          <div className="min-w-0">
            <p className="font-medium">{`${a.firstName} ${a.lastName}`}</p>
            <p className="text-muted-foreground truncate text-xs">
              {a.email} · {a.phone}
            </p>
          </div>
        ),
      },
      {
        id: 'where',
        header: t('cols.where'),
        value: (a) => `${a.city}, ${countryName(a.country, locale)}`,
        hideOnMobile: true,
      },
      {
        id: 'experience',
        header: t('cols.experience'),
        value: (a) => a.experienceYears,
        cell: (a) => t('years', { count: a.experienceYears }),
        align: 'end',
        sortable: true,
        hideOnMobile: true,
      },
      {
        id: 'types',
        header: t('cols.types'),
        value: (a) => a.inspectionTypes.map((x) => tq(`types.${x}`)).join(', '),
        hideOnMobile: true,
      },
      {
        id: 'applied',
        header: t('cols.applied'),
        value: (a) => a.createdAt,
        cell: (a) => format.dateTime(new Date(a.createdAt), { dateStyle: 'medium' }),
        sortable: true,
        hideOnMobile: true,
      },
      {
        id: 'status',
        header: t('cols.status'),
        value: (a) => a.status,
        cell: (a) => <Badge variant={APP_TONE[a.status]}>{t(`appStatus.${a.status}`)}</Badge>,
      },
      {
        id: 'actions',
        header: '',
        value: () => '',
        csv: false,
        cell: (a) =>
          a.status === 'PENDING' ? (
            <Button size="sm" variant="outline" onClick={() => setReviewing(a)}>
              {t('review')}
            </Button>
          ) : null,
      },
    ],
    [t, tq, format, locale],
  );
  return (
    <>
      <DataTable
        data={list.data ?? []}
        columns={columns}
        loading={list.isPending}
        error={list.isError}
        onRetry={() => void list.refetch()}
        retrying={list.isFetching}
        csvName="inspector-applications"
        empty={{
          icon: UserCheck,
          title: t('noApplications'),
          description: t('noApplicationsBody'),
        }}
      />
      {reviewing ? (
        <ReviewDialog application={reviewing} onClose={() => setReviewing(null)} />
      ) : null}
    </>
  );
}

function ReviewDialog({
  application: a,
  onClose,
}: {
  application: AdminInspectorApplication;
  onClose: () => void;
}) {
  const t = useTranslations('gig.admin');
  const tc = useTranslations('common');
  const review = useReviewApplication();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.input<typeof ReviewApplicationSchema>, unknown, ReviewApplicationDto>({
    resolver: zodResolver(ReviewApplicationSchema),
    defaultValues: { decision: 'APPROVE', certified: false, serviceRadiusKm: 50, note: '' },
  });
  const { errors, isSubmitting } = form.formState;
  const submit = (decision: 'APPROVE' | 'REJECT') => {
    form.setValue('decision', decision);
    void form.handleSubmit(async (dto) => {
      setError(null);
      try {
        await review.mutateAsync({ id: a.id, dto });
        toast.success(decision === 'APPROVE' ? t('approved') : t('rejected'));
        onClose();
      } catch (err) {
        setError(
          applyServerErrors(
            err,
            form.setError,
            ['certified', 'serviceRadiusKm', 'latitude', 'longitude', 'note'],
            tc('networkError'),
          ),
        );
      }
    })();
  };
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('reviewTitle', { name: `${a.firstName} ${a.lastName}` })}</DialogTitle>
          <DialogDescription>{t('reviewBody')}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-5">
          <p className="bg-surface max-h-40 overflow-y-auto rounded-lg p-3 text-sm whitespace-pre-line">
            {a.about}
          </p>
          <FormAlert message={error} />
          <FieldGroup>
            <Field data-invalid={!!errors.certified}>
              <Controller
                control={form.control}
                name="certified"
                render={({ field }) => (
                  <label className="flex min-h-11 items-center gap-2 text-sm">
                    <Checkbox checked={field.value ?? false} onCheckedChange={field.onChange} />
                    {t('certified')}
                  </label>
                )}
              />
              <FieldError errors={[errors.certified]} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field data-invalid={!!errors.serviceRadiusKm}>
                <FieldLabel htmlFor="rv-radius">{t('radius')}</FieldLabel>
                <Input
                  id="rv-radius"
                  type="number"
                  inputMode="numeric"
                  {...form.register('serviceRadiusKm')}
                />
                <FieldError errors={[errors.serviceRadiusKm]} />
              </Field>
              <Field data-invalid={!!errors.latitude}>
                <FieldLabel htmlFor="rv-lat">{t('latitude')}</FieldLabel>
                <Input
                  id="rv-lat"
                  inputMode="decimal"
                  {...form.register('latitude', { setValueAs: blankToUndefined })}
                />
                <FieldError errors={[errors.latitude]} />
              </Field>
              <Field data-invalid={!!errors.longitude}>
                <FieldLabel htmlFor="rv-lng">{t('longitude')}</FieldLabel>
                <Input
                  id="rv-lng"
                  inputMode="decimal"
                  {...form.register('longitude', { setValueAs: blankToUndefined })}
                />
                <FieldError errors={[errors.longitude]} />
              </Field>
            </div>
            <FieldDescription>{t('homeHint')}</FieldDescription>
            <Field data-invalid={!!errors.note}>
              <FieldLabel htmlFor="rv-note">{t('note')}</FieldLabel>
              <Textarea id="rv-note" rows={2} {...form.register('note')} />
              <FieldError errors={[errors.note]} />
            </Field>
          </FieldGroup>
        </div>
        <DialogFooter>
          <Button variant="outline" disabled={isSubmitting} onClick={() => submit('REJECT')}>
            {t('reject')}
          </Button>
          <Button disabled={isSubmitting} onClick={() => submit('APPROVE')}>
            {t('approve')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const blankToUndefined = (v: unknown) => (v === '' || v === null ? undefined : v);

// ── Gig inspectors ──────────────────────────────────────────────────────────

export function GigInspectorsTab() {
  const t = useTranslations('gig.admin');
  const format = useFormatter();
  const locale = useLocale();
  const list = useGigInspectors();
  const verify = useVerifyPayout();
  const status = useSetInspectorStatus();
  const [paying, setPaying] = useState<AdminGigInspector | null>(null);
  const columns = useMemo<DataColumn<AdminGigInspector>[]>(
    () => [
      {
        id: 'name',
        header: t('cols.name'),
        value: (i) => i.name,
        cell: (i) => (
          <div className="min-w-0">
            <p className="font-medium">{i.name}</p>
            <p className="text-muted-foreground truncate text-xs">{i.email}</p>
          </div>
        ),
      },
      {
        id: 'where',
        header: t('cols.where'),
        value: (i) => `${i.city}, ${countryName(i.country, locale)}`,
        hideOnMobile: true,
      },
      {
        id: 'rating',
        header: t('cols.rating'),
        value: (i) => i.rating ?? '',
        cell: (i) =>
          i.rating === null
            ? '—'
            : `${format.number(i.rating, { maximumFractionDigits: 1 })} (${String(i.ratingCount)})`,
        align: 'end',
        sortable: true,
      },
      {
        id: 'inspections',
        header: t('cols.inspections'),
        value: (i) => i.inspections,
        align: 'end',
        sortable: true,
        hideOnMobile: true,
      },
      {
        id: 'due',
        header: t('cols.due'),
        value: (i) => i.dueUsdMinor / 100,
        cell: (i) => formatMoney(i.dueUsdMinor, 'USD', locale),
        align: 'end',
        sortable: true,
      },
      {
        id: 'payout',
        header: t('cols.payout'),
        value: (i) => (i.payout ? `${i.payout.method} ${i.payout.name} ${i.payout.account}` : ''),
        cell: (i) =>
          i.payout ? (
            <div className="min-w-0 text-xs">
              <p className="flex items-center gap-1.5">
                {t(`methods.${i.payout.method}`)}
                <Badge variant={i.payout.verified ? 'success' : 'warning'}>
                  {i.payout.verified ? t('verified') : t('unverified')}
                </Badge>
              </p>
              <p className="text-muted-foreground truncate">
                {i.payout.name} · {i.payout.account}
              </p>
            </div>
          ) : (
            <span className="text-muted-foreground text-xs">{t('noPayout')}</span>
          ),
        hideOnMobile: true,
      },
      {
        id: 'status',
        header: t('cols.status'),
        value: (i) => i.status,
        cell: (i) => (
          <Badge variant={i.status === 'ACTIVE' ? 'success' : 'danger'}>
            {t(`inspectorStatus.${i.status}`)}
          </Badge>
        ),
      },
      {
        id: 'actions',
        header: '',
        value: () => '',
        csv: false,
        cell: (i) => (
          <div className="flex flex-wrap justify-end gap-2">
            {i.payout && !i.payout.verified ? (
              <Button
                size="sm"
                variant="outline"
                disabled={verify.isPending}
                onClick={() =>
                  verify
                    .mutateAsync(i.userId)
                    .then(() => toast.success(t('payoutVerified')))
                    .catch((err: unknown) => fail(err, t('failed')))
                }
              >
                {t('verify')}
              </Button>
            ) : null}
            {i.dueUsdMinor > 0 && i.payout?.verified ? (
              <Button size="sm" onClick={() => setPaying(i)}>
                {t('pay')}
              </Button>
            ) : null}
            <Button
              size="sm"
              variant="ghost"
              disabled={status.isPending}
              onClick={() =>
                status
                  .mutateAsync({
                    userId: i.userId,
                    status: i.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE',
                  })
                  .catch((err: unknown) => fail(err, t('failed')))
              }
            >
              {i.status === 'ACTIVE' ? t('suspend') : t('reactivate')}
            </Button>
          </div>
        ),
      },
    ],
    [t, format, locale, verify, status],
  );
  return (
    <>
      <DataTable
        data={list.data ?? []}
        columns={columns}
        loading={list.isPending}
        error={list.isError}
        onRetry={() => void list.refetch()}
        retrying={list.isFetching}
        csvName="gig-inspectors"
        empty={{ icon: Users, title: t('noInspectors'), description: t('noInspectorsBody') }}
      />
      {paying ? <PayDialog inspector={paying} onClose={() => setPaying(null)} /> : null}
    </>
  );
}

function PayDialog({
  inspector: i,
  onClose,
}: {
  inspector: AdminGigInspector;
  onClose: () => void;
}) {
  const t = useTranslations('gig.admin');
  const tc = useTranslations('common');
  const locale = useLocale();
  const pay = usePayInspector();
  const [reference, setReference] = useState('');
  const valid = reference.trim().length >= 3;
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('payTitle', { name: i.name })}</DialogTitle>
          <DialogDescription>
            {t('payBody', { amount: formatMoney(i.dueUsdMinor, 'USD', locale) })}
          </DialogDescription>
        </DialogHeader>
        {i.payout ? (
          <p className="bg-surface rounded-lg p-3 text-sm">
            {t(`methods.${i.payout.method}`)} · {i.payout.name} · {i.payout.account}
          </p>
        ) : null}
        <Field>
          <FieldLabel htmlFor="pay-ref">{t('reference')}</FieldLabel>
          <Input id="pay-ref" value={reference} onChange={(e) => setReference(e.target.value)} />
        </Field>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {tc('cancel')}
          </Button>
          <Button
            disabled={!valid || pay.isPending}
            onClick={() =>
              pay
                .mutateAsync({ userId: i.userId, bankReference: reference.trim() })
                .then(() => {
                  toast.success(t('paid'));
                  onClose();
                })
                .catch((err: unknown) => fail(err, t('failed')))
            }
          >
            {t('recordPayout')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Settings: factory locations and the gig rules ───────────────────────────

export function GigSettingsTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <GigRulesCard />
      <FactoryLocationCard />
    </div>
  );
}

function FactoryLocationCard() {
  const t = useTranslations('gig.admin');
  const tc = useTranslations('common');
  const locate = useLocateFactory();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.input<typeof CoordinatesSchema>, unknown, Coordinates>({
    resolver: zodResolver(CoordinatesSchema),
    defaultValues: { latitude: '', longitude: '' },
  });
  const { errors, isSubmitting } = form.formState;
  const validCode = /^MFR-[A-Z]{2}-\d{4}$/.test(code.trim());
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="size-4" aria-hidden="true" />
          {t('locationTitle')}
        </CardTitle>
        <CardDescription>{t('locationBody')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          className="space-y-4"
          onSubmit={(e) =>
            void form.handleSubmit(async (dto) => {
              setError(null);
              try {
                await locate.mutateAsync({ code: code.trim(), dto });
                toast.success(t('located', { code: code.trim() }));
                form.reset();
                setCode('');
              } catch (err) {
                setError(
                  applyServerErrors(
                    err,
                    form.setError,
                    ['latitude', 'longitude'],
                    tc('networkError'),
                  ),
                );
              }
            })(e)
          }
        >
          <FormAlert message={error} />
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="loc-code">{t('factoryCode')}</FieldLabel>
              <Input
                id="loc-code"
                placeholder="MFR-BD-0421"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field data-invalid={!!errors.latitude}>
                <FieldLabel htmlFor="loc-lat">{t('latitude')}</FieldLabel>
                <Input id="loc-lat" inputMode="decimal" {...form.register('latitude')} />
                <FieldError errors={[errors.latitude]} />
              </Field>
              <Field data-invalid={!!errors.longitude}>
                <FieldLabel htmlFor="loc-lng">{t('longitude')}</FieldLabel>
                <Input id="loc-lng" inputMode="decimal" {...form.register('longitude')} />
                <FieldError errors={[errors.longitude]} />
              </Field>
            </div>
          </FieldGroup>
          <Button type="submit" disabled={!validCode || isSubmitting}>
            {t('saveLocation')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function GigRulesCard() {
  const t = useTranslations('gig.admin');
  const settings = useGigSettings();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('rulesTitle')}</CardTitle>
        <CardDescription>{t('rulesBody')}</CardDescription>
      </CardHeader>
      <CardContent>
        {settings.isPending ? (
          <Skeleton className="h-64 rounded-lg" />
        ) : settings.isError ? (
          <ErrorState onRetry={() => void settings.refetch()} retrying={settings.isFetching} />
        ) : (
          <RulesForm initial={settings.data} />
        )}
      </CardContent>
    </Card>
  );
}

const RULES = [
  'dayRateUsdMinor',
  'checkInRadiusM',
  'rotationLimit',
  'auditSampleBps',
  'suspendBelowRating',
  'minRatingsForSuspension',
] as const;

function RulesForm({ initial }: { initial: GigSettings }) {
  const t = useTranslations('gig.admin');
  const tc = useTranslations('common');
  const save = useSaveGigSettings();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<GigSettings>({
    resolver: zodResolver(GigSettingsSchema),
    defaultValues: initial,
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={(e) =>
        void form.handleSubmit(async (dto) => {
          setError(null);
          try {
            await save.mutateAsync(dto);
            toast.success(t('rulesSaved'));
          } catch (err) {
            setError(applyServerErrors(err, form.setError, [...RULES], tc('networkError')));
          }
        })(e)
      }
    >
      <FormAlert message={error} />
      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          {RULES.map((name) => (
            <Field key={name} data-invalid={!!errors[name]}>
              <FieldLabel htmlFor={`gig-${name}`}>{t(`rules.${name}`)}</FieldLabel>
              <Input
                id={`gig-${name}`}
                type="number"
                inputMode="decimal"
                step={name === 'suspendBelowRating' ? 0.1 : 1}
                {...form.register(name, { valueAsNumber: true })}
              />
              <FieldDescription>{t(`rulesHint.${name}`)}</FieldDescription>
              <FieldError errors={[errors[name]]} />
            </Field>
          ))}
        </div>
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? tc('saving') : t('saveRules')}
      </Button>
    </form>
  );
}
