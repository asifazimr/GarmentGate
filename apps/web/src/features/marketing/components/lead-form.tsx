'use client';

import { type LeadDto, type LeadInput, LeadInputSchema, LeadKindSchema } from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormAlert } from '@/features/auth/components/form-alert';
import { OptionSelect } from '@/features/logistics/components/form-bits';
import { CountrySelect } from '@/features/onboarding/components/pickers';
import { apiSend } from '@/lib/api';
import { useClientSearchParam } from '@/lib/client-hooks';
import { applyServerErrors } from '@/lib/form-errors';

const FIELDS = ['kind', 'name', 'email', 'company', 'country', 'phone', 'message'] as const;

/** The website's enquiry form: sales, enterprise, partners, support and press, to our team. */
export function LeadForm({ kind: fixed }: { kind?: LeadDto['kind'] }) {
  // ?topic=LOGISTICS_PARTNER preselects the topic (read in the browser only), unless a page
  // fixes it (e.g. the logistics partner page).
  const topic = LeadKindSchema.safeParse(useClientSearchParam('topic'));
  const kind = fixed ?? (topic.success ? topic.data : 'SALES');
  return <LeadFormInner key={kind} kind={kind} />;
}

function LeadFormInner({ kind }: { kind: LeadDto['kind'] }) {
  const t = useTranslations('marketing.contact');
  const path = usePathname();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<LeadInput, unknown, LeadDto>({
    resolver: zodResolver(LeadInputSchema),
    defaultValues: {
      kind,
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      website: '',
      source: path,
    },
  });
  const { errors, isSubmitting } = form.formState;

  if (sentTo)
    return (
      <div className="bg-card flex flex-col items-center gap-4 rounded-2xl border p-10 text-center shadow-xs">
        <span className="bg-success-soft text-success-ink flex size-14 items-center justify-center rounded-full">
          <MailCheck className="size-7" aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-semibold tracking-[-0.02em]">{t('form.sentTitle')}</h2>
        <p className="text-muted-foreground">{t('form.sentBody', { email: sentTo })}</p>
        <Button variant="outline" onClick={() => setSentTo(null)}>
          {t('form.another')}
        </Button>
      </div>
    );

  const text = (name: 'name' | 'email' | 'company' | 'phone', type = 'text', auto?: string) => (
    <Field data-invalid={!!errors[name]}>
      <FieldLabel htmlFor={`lead-${name}`}>{t(`form.${name}`)}</FieldLabel>
      <Input id={`lead-${name}`} type={type} autoComplete={auto} {...form.register(name)} />
      <FieldError errors={[errors[name]]} />
    </Field>
  );

  return (
    <form
      noValidate
      className="bg-card space-y-6 rounded-2xl border p-6 shadow-xs sm:p-8"
      onSubmit={(e) =>
        void form.handleSubmit(async (dto) => {
          setError(null);
          try {
            await apiSend('/leads', { method: 'POST', body: dto });
            setSentTo(dto.email);
            form.reset();
          } catch (err) {
            setError(applyServerErrors(err, form.setError, [...FIELDS], t('form.failed')));
          }
        })(e)
      }
    >
      <FormAlert message={error} />
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="lead-kind">{t('form.topic')}</FieldLabel>
          <Controller
            control={form.control}
            name="kind"
            render={({ field }) => (
              <OptionSelect
                id="lead-kind"
                value={field.value}
                onChange={(v) => field.onChange(LeadKindSchema.parse(v))}
                options={LeadKindSchema.options.map((k) => ({ value: k, label: t(`topics.${k}`) }))}
              />
            )}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          {text('name', 'text', 'name')}
          {text('email', 'email', 'email')}
          {text('company', 'text', 'organization')}
          <Field data-invalid={!!errors.country}>
            <FieldLabel htmlFor="lead-country">{t('form.country')}</FieldLabel>
            <Controller
              control={form.control}
              name="country"
              render={({ field }) => (
                <CountrySelect
                  id="lead-country"
                  value={field.value === '' ? undefined : field.value}
                  onChange={field.onChange}
                  placeholder={t('form.choose')}
                  invalid={!!errors.country}
                />
              )}
            />
            <FieldError errors={[errors.country]} />
          </Field>
        </div>
        {text('phone', 'tel', 'tel')}
        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="lead-message">{t('form.message')}</FieldLabel>
          <Textarea id="lead-message" rows={5} {...form.register('message')} />
          <FieldDescription>{t('form.messageHint')}</FieldDescription>
          <FieldError errors={[errors.message]} />
        </Field>
        {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
        <div aria-hidden="true" className="absolute -start-[9999px] size-px overflow-hidden">
          <label htmlFor="lead-website">{t('form.website')}</label>
          <input id="lead-website" tabIndex={-1} autoComplete="off" {...form.register('website')} />
        </div>
      </FieldGroup>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-xs">
          <Link href="/legal/privacy" className="underline-offset-2 hover:underline">
            {t('form.privacy')}
          </Link>
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? t('form.sending') : t('form.send')}
        </Button>
      </div>
    </form>
  );
}
