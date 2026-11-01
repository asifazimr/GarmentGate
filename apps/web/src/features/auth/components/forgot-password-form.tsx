'use client';

import { type ForgotPasswordInput, ForgotPasswordSchema } from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { applyServerErrors } from '@/lib/form-errors';
import { useForgotPassword } from '../api';
import { FormAlert } from './form-alert';

export function ForgotPasswordForm() {
  const t = useTranslations('auth.forgot');
  const tc = useTranslations('common');
  const forgot = useForgotPassword();
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
  });
  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);
    try {
      await forgot.mutateAsync(values);
      setSentTo(values.email);
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, ['email'], tc('networkError')));
    }
  });

  if (sentTo) {
    return (
      <div className="space-y-6 text-center">
        <span className="bg-primary/10 text-primary mx-auto flex size-14 items-center justify-center rounded-full">
          <MailCheck className="size-7" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{t('sentTitle')}</h1>
          <p className="text-muted-foreground">{t('sentBody', { email: sentTo })}</p>
        </div>
        <Button variant="outline" size="lg" className="w-full" render={<Link href="/login" />}>
          {t('backToLogin')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </header>
      <FormAlert message={formError} />
      <Field data-invalid={!!errors.email}>
        <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          autoFocus
          aria-invalid={!!errors.email}
          {...form.register('email')}
        />
        <FieldError errors={[errors.email]} />
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
      <p className="text-center text-sm">
        <Link href="/login" className="text-primary font-medium underline-offset-4 hover:underline">
          {t('backToLogin')}
        </Link>
      </p>
    </form>
  );
}
