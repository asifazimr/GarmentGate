'use client';

import { PasswordSchema } from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { applyServerErrors } from '@/lib/form-errors';
import { useResetPassword } from '../api';
import { FormAlert } from './form-alert';
import { PasswordInput } from './password-input';

const FormSchema = z.object({ password: PasswordSchema });
type FormValues = z.infer<typeof FormSchema>;

export function ResetPasswordForm() {
  const t = useTranslations('auth.reset');
  const tr = useTranslations('auth.register');
  const tc = useTranslations('common');
  const token = useSearchParams().get('token');
  const reset = useResetPassword();
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(token ? null : t('missingToken'));

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { password: '' },
  });
  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async ({ password }) => {
    if (!token) return;
    setFormError(null);
    try {
      await reset.mutateAsync({ token, password });
      setDone(true);
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, ['password'], tc('networkError')));
    }
  });

  if (done) {
    return (
      <div className="space-y-6 text-center">
        <span className="bg-primary/10 text-primary mx-auto flex size-14 items-center justify-center rounded-full">
          <CheckCircle2 className="size-7" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{t('doneTitle')}</h1>
          <p className="text-muted-foreground">{t('doneBody')}</p>
        </div>
        <Button size="lg" className="w-full" render={<Link href="/login" />}>
          {t('signIn')}
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
      <Field data-invalid={!!errors.password}>
        <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
        <PasswordInput
          id="password"
          autoComplete="new-password"
          autoFocus
          aria-invalid={!!errors.password}
          {...form.register('password')}
        />
        <FieldDescription>{tr('passwordHint')}</FieldDescription>
        <FieldError errors={[errors.password]} />
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || !token}>
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
