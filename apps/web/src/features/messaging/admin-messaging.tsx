'use client';

import {
  AdminMessagingSchema,
  type AdminOutboundMessage,
  type MessagingSettings,
  MessagingSettingsSchema,
  NotificationTypeSchema,
  type TestTextDto,
  TestTextSchema,
  TextChannelSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MessageSquareText } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { type DataColumn, DataTable } from '@/components/patterns/data-table';
import { PageHeader } from '@/components/patterns/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FormAlert } from '@/features/auth/components/form-alert';
import { OptionSelect } from '@/features/logistics/components/form-bits';
import { ApiError, apiJson, apiSend } from '@/lib/api';
import { applyServerErrors } from '@/lib/form-errors';

const key = ['admin', 'messaging'] as const;
const STATUS_TONE = {
  QUEUED: 'neutral',
  SENT: 'info',
  DELIVERED: 'success',
  FAILED: 'danger',
  SKIPPED: 'warning',
} as const;

/** Staff: which events text, the WhatsApp templates, the daily cap, the log and a test send. */
export function AdminMessagingPage() {
  const t = useTranslations('messaging.admin');
  const format = useFormatter();
  const overview = useQuery({
    queryKey: key,
    queryFn: () => apiJson('/admin/messaging', AdminMessagingSchema),
  });
  const columns = useMemo<DataColumn<AdminOutboundMessage>[]>(
    () => [
      {
        id: 'when',
        header: t('cols.when'),
        value: (m) => m.createdAt,
        cell: (m) =>
          format.dateTime(new Date(m.createdAt), { dateStyle: 'medium', timeStyle: 'short' }),
        sortable: true,
      },
      {
        id: 'to',
        header: t('cols.to'),
        value: (m) => `${m.to} ${m.user?.name ?? ''} ${m.user?.email ?? ''}`,
        cell: (m) => (
          <div className="min-w-0">
            <p className="tabular">{m.to}</p>
            <p className="text-muted-foreground truncate text-xs">{m.user?.email ?? '—'}</p>
          </div>
        ),
      },
      { id: 'channel', header: t('cols.channel'), value: (m) => m.channel },
      { id: 'type', header: t('cols.type'), value: (m) => m.type, hideOnMobile: true },
      {
        id: 'status',
        header: t('cols.status'),
        value: (m) => m.status,
        cell: (m) => (
          <span className="space-y-1">
            <Badge variant={STATUS_TONE[m.status]}>{t(`status.${m.status}`)}</Badge>
            {m.error ? (
              <span className="text-muted-foreground block text-xs">{m.error}</span>
            ) : null}
          </span>
        ),
      },
      {
        id: 'body',
        header: t('cols.body'),
        value: (m) => m.body,
        cell: (m) => <span className="line-clamp-2 text-xs">{m.body}</span>,
        hideOnMobile: true,
      },
    ],
    [t, format],
  );
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      {overview.data && !overview.data.live ? (
        <p className="bg-warning-soft text-warning-ink rounded-lg px-4 py-3 text-sm">
          {t('notLive')}
        </p>
      ) : null}
      <Tabs defaultValue="log">
        <TabsList>
          <TabsTrigger value="log">{t('tabs.log')}</TabsTrigger>
          <TabsTrigger value="settings">{t('tabs.settings')}</TabsTrigger>
        </TabsList>
        <TabsContent value="log" className="pt-4">
          <DataTable
            data={overview.data?.messages ?? []}
            columns={columns}
            loading={overview.isPending}
            error={overview.isError}
            onRetry={() => void overview.refetch()}
            retrying={overview.isFetching}
            csvName="texts"
            empty={{ icon: MessageSquareText, title: t('empty'), description: t('emptyBody') }}
          />
        </TabsContent>
        <TabsContent value="settings" className="pt-4">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <Card>
              <CardHeader>
                <CardTitle>{t('settingsTitle')}</CardTitle>
                <CardDescription>{t('settingsBody')}</CardDescription>
              </CardHeader>
              <CardContent>
                {overview.isPending || !overview.data ? (
                  <Skeleton className="h-96 rounded-lg" />
                ) : (
                  <SettingsForm initial={overview.data.settings} />
                )}
              </CardContent>
            </Card>
            <TestCard />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingsForm({ initial }: { initial: MessagingSettings }) {
  const t = useTranslations('messaging.admin');
  const tn = useTranslations('messaging.types');
  const tc = useTranslations('common');
  const queryClient = useQueryClient();
  const save = useMutation({
    mutationFn: (dto: MessagingSettings) =>
      apiJson('/admin/messaging/settings', MessagingSettingsSchema, { method: 'PUT', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
  });
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.input<typeof MessagingSettingsSchema>, unknown, MessagingSettings>({
    resolver: zodResolver(MessagingSettingsSchema),
    defaultValues: initial,
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <form
      noValidate
      className="space-y-5"
      onSubmit={(e) =>
        void form.handleSubmit(async (dto) => {
          setError(null);
          // Empty template fields mean "no template".
          const templates = Object.fromEntries(
            Object.entries(dto.whatsappTemplates).filter(([, v]) => !!v),
          );
          try {
            await save.mutateAsync({ ...dto, whatsappTemplates: templates });
            toast.success(t('saved'));
          } catch (err) {
            setError(applyServerErrors(err, form.setError, [], tc('networkError')));
          }
        })(e)
      }
    >
      <FormAlert message={error} />
      <FieldGroup>
        {(['smsEnabled', 'whatsappEnabled'] as const).map((name) => (
          <Controller
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <label className="flex min-h-11 items-center gap-2 text-sm">
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                {t(`fields.${name}`)}
              </label>
            )}
          />
        ))}
        <Field data-invalid={!!errors.dailyLimitPerUser} className="max-w-xs">
          <FieldLabel htmlFor="msg-cap">{t('fields.dailyLimitPerUser')}</FieldLabel>
          <Input
            id="msg-cap"
            type="number"
            inputMode="numeric"
            {...form.register('dailyLimitPerUser', { valueAsNumber: true })}
          />
          <FieldError errors={[errors.dailyLimitPerUser]} />
        </Field>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">{t('fields.types')}</legend>
          <p className="text-muted-foreground text-xs">{t('typesHint')}</p>
          <Controller
            control={form.control}
            name="types"
            render={({ field }) => (
              <div className="divide-y rounded-lg border">
                {NotificationTypeSchema.options.map((type) => (
                  <div
                    key={type}
                    className="grid gap-2 px-3 py-2 sm:grid-cols-[minmax(0,1fr)_18rem] sm:items-center"
                  >
                    <label className="flex min-h-11 items-center gap-2 text-sm md:min-h-8">
                      <Checkbox
                        checked={field.value.includes(type)}
                        onCheckedChange={(on) =>
                          field.onChange(
                            on ? [...field.value, type] : field.value.filter((v) => v !== type),
                          )
                        }
                      />
                      {tn(type)}
                    </label>
                    <Input
                      aria-label={t('templateFor', { type: tn(type) })}
                      placeholder={t('templatePlaceholder')}
                      {...form.register(`whatsappTemplates.${type}`, {
                        setValueAs: (v: unknown) =>
                          typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined,
                      })}
                    />
                  </div>
                ))}
              </div>
            )}
          />
          <FieldDescription>{t('templatesHint')}</FieldDescription>
        </fieldset>
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? tc('saving') : t('save')}
      </Button>
    </form>
  );
}

function TestCard() {
  const t = useTranslations('messaging.admin');
  const tc = useTranslations('common');
  const queryClient = useQueryClient();
  const send = useMutation({
    mutationFn: (dto: TestTextDto) =>
      apiSend('/admin/messaging/test', { method: 'POST', body: dto }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: key }),
  });
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.input<typeof TestTextSchema>, unknown, TestTextDto>({
    resolver: zodResolver(TestTextSchema),
    defaultValues: { phone: '', channel: 'SMS' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('testTitle')}</CardTitle>
        <CardDescription>{t('testBody')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          className="space-y-4"
          onSubmit={(e) =>
            void form.handleSubmit(async (dto) => {
              setError(null);
              try {
                await send.mutateAsync(dto);
                toast.success(t('testSent'));
              } catch (err) {
                setError(
                  err instanceof ApiError
                    ? err.message
                    : applyServerErrors(err, form.setError, ['phone'], tc('networkError')),
                );
              }
            })(e)
          }
        >
          <FormAlert message={error} />
          <Field data-invalid={!!errors.phone}>
            <FieldLabel htmlFor="test-phone">{t('testPhone')}</FieldLabel>
            <Input id="test-phone" type="tel" {...form.register('phone')} />
            <FieldError errors={[errors.phone]} />
          </Field>
          <Field>
            <FieldLabel htmlFor="test-channel">{t('cols.channel')}</FieldLabel>
            <Controller
              control={form.control}
              name="channel"
              render={({ field }) => (
                <OptionSelect
                  id="test-channel"
                  value={field.value}
                  onChange={(v) => field.onChange(TextChannelSchema.parse(v))}
                  options={TextChannelSchema.options.map((c) => ({ value: c, label: c }))}
                />
              )}
            />
          </Field>
          <Button type="submit" disabled={isSubmitting}>
            {t('send')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
