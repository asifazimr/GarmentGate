'use client';

import {
  type ConfirmPhoneDto,
  ConfirmPhoneSchema,
  type StartPhoneVerificationDto,
  StartPhoneVerificationSchema,
  TextChannelSchema,
} from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { Smartphone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { toast } from 'sonner';
import { ErrorState } from '@/components/patterns/error-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { FormAlert } from '@/features/auth/components/form-alert';
import { OptionSelect } from '@/features/logistics/components/form-bits';
import { applyServerErrors } from '@/lib/form-errors';
import {
  useConfirmPhone,
  useMyMessaging,
  useRemovePhone,
  useSendPhoneCode,
  useSetTextChannel,
} from './messaging-api';

/** The person's mobile number for texts: verify it with a code, pick SMS or WhatsApp. */
export function PhoneCard() {
  const t = useTranslations('settings.phone');
  const messaging = useMyMessaging();
  const remove = useRemovePhone();
  const channel = useSetTextChannel();
  const [changing, setChanging] = useState(false);
  const m = messaging.data;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2">
          <Smartphone className="size-4" aria-hidden="true" />
          {t('title')}
          {m?.verified ? <Badge variant="success">{t('verified')}</Badge> : null}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {messaging.isPending ? (
          <Skeleton className="h-20 rounded-lg" />
        ) : messaging.isError ? (
          <ErrorState onRetry={() => void messaging.refetch()} retrying={messaging.isFetching} />
        ) : m?.verified && !changing && !m.pending ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="tabular font-medium">{m.phone}</span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setChanging(true)}>
                  {t('change')}
                </Button>
                <Button
                  variant="ghost"
                  disabled={remove.isPending}
                  onClick={() =>
                    remove
                      .mutateAsync(undefined)
                      .then(() => toast.success(t('removed')))
                      .catch(() => toast.error(t('failed')))
                  }
                >
                  {t('remove')}
                </Button>
              </div>
            </div>
            <Field className="max-w-xs">
              <FieldLabel htmlFor="text-channel">{t('channel')}</FieldLabel>
              <OptionSelect
                id="text-channel"
                value={m.channel}
                onChange={(v) =>
                  channel
                    .mutateAsync(TextChannelSchema.parse(v))
                    .then(() => toast.success(t('saved')))
                    .catch(() => toast.error(t('failed')))
                }
                options={TextChannelSchema.options
                  .filter(
                    (c) => (c === 'SMS' ? m.smsAvailable : m.whatsappAvailable) || c === m.channel,
                  )
                  .map((c) => ({ value: c, label: t(`channels.${c}`) }))}
              />
              <FieldDescription>
                {m.whatsappAvailable ? t('whatsappHint') : t('smsOnly')}
              </FieldDescription>
            </Field>
            {!m.smsAvailable && !m.whatsappAvailable ? (
              <p className="text-muted-foreground text-xs">{t('off')}</p>
            ) : null}
          </div>
        ) : m?.pending ? (
          <CodeForm onDone={() => setChanging(false)} />
        ) : (
          <NumberForm />
        )}
      </CardContent>
    </Card>
  );
}

function NumberForm() {
  const t = useTranslations('settings.phone');
  const tc = useTranslations('common');
  const send = useSendPhoneCode();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<
    z.input<typeof StartPhoneVerificationSchema>,
    unknown,
    StartPhoneVerificationDto
  >({
    resolver: zodResolver(StartPhoneVerificationSchema),
    defaultValues: { phone: '' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <form
      noValidate
      className="space-y-3"
      onSubmit={(e) =>
        void form.handleSubmit(async (dto) => {
          setError(null);
          try {
            await send.mutateAsync(dto);
            toast.success(t('codeSent'));
          } catch (err) {
            setError(applyServerErrors(err, form.setError, ['phone'], tc('networkError')));
          }
        })(e)
      }
    >
      <FormAlert message={error} />
      <Field data-invalid={!!errors.phone} className="max-w-sm">
        <FieldLabel htmlFor="phone-number">{t('number')}</FieldLabel>
        <Input
          id="phone-number"
          type="tel"
          autoComplete="tel"
          placeholder="+880 1711 555555"
          {...form.register('phone')}
        />
        <FieldDescription>{t('numberHint')}</FieldDescription>
        <FieldError errors={[errors.phone]} />
      </Field>
      <Button type="submit" disabled={isSubmitting}>
        {t('sendCode')}
      </Button>
    </form>
  );
}

function CodeForm({ onDone }: { onDone: () => void }) {
  const t = useTranslations('settings.phone');
  const tc = useTranslations('common');
  const confirm = useConfirmPhone();
  const remove = useRemovePhone();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<ConfirmPhoneDto>({
    resolver: zodResolver(ConfirmPhoneSchema),
    defaultValues: { code: '' },
  });
  const { errors, isSubmitting } = form.formState;
  return (
    <form
      noValidate
      className="space-y-3"
      onSubmit={(e) =>
        void form.handleSubmit(async (dto) => {
          setError(null);
          try {
            await confirm.mutateAsync(dto);
            toast.success(t('confirmed'));
            onDone();
          } catch (err) {
            setError(applyServerErrors(err, form.setError, ['code'], tc('networkError')));
          }
        })(e)
      }
    >
      <FormAlert message={error} />
      <Field data-invalid={!!errors.code} className="max-w-48">
        <FieldLabel htmlFor="phone-code">{t('code')}</FieldLabel>
        <Input
          id="phone-code"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          {...form.register('code')}
        />
        <FieldError errors={[errors.code]} />
      </Field>
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {t('confirm')}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => void remove.mutateAsync(undefined).then(onDone)}
        >
          {t('startOver')}
        </Button>
      </div>
    </form>
  );
}
