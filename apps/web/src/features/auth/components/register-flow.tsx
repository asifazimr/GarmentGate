'use client';

import { type RegisterInput, RegisterSchema, type SignupRole } from '@garmentgate/shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Factory, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { applyServerErrors } from '@/lib/form-errors';
import { homeFor, useRegister } from '../api';
import { FormAlert } from './form-alert';
import { PasswordInput } from './password-input';

const ROLE_OPTIONS = [
  { role: 'BUYER', key: 'buyer', Icon: ShoppingBag },
  { role: 'MANUFACTURER', key: 'manufacturer', Icon: Factory },
] as const;

const fromParam = (value: string | null): SignupRole | null =>
  value === 'buyer' ? 'BUYER' : value === 'manufacturer' ? 'MANUFACTURER' : null;

/** Step 1: choose a side. Step 2: account details. */
export function RegisterFlow() {
  const params = useSearchParams();
  const [role, setRole] = useState<SignupRole | null>(fromParam(params.get('as')));

  return (
    <AnimatePresence mode="wait" initial={false}>
      {role === null ? (
        <motion.div
          key="choose"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.2 }}
        >
          <RoleChoice onChoose={setRole} />
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.2 }}
        >
          <RegisterForm role={role} onChangeRole={() => setRole(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function RoleChoice({ onChoose }: { onChoose: (role: SignupRole) => void }) {
  const t = useTranslations('auth.register');
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{t('chooseTitle')}</h1>
        <p className="text-muted-foreground">{t('chooseSubtitle')}</p>
      </header>
      <div className="grid gap-3">
        {ROLE_OPTIONS.map(({ role, key, Icon }) => (
          <button
            key={role}
            type="button"
            onClick={() => onChoose(role)}
            className="group border-border hover:border-primary hover:bg-primary/5 focus-visible:ring-ring/50 flex items-start gap-4 rounded-xl border p-5 text-start transition-colors outline-none focus-visible:ring-3"
          >
            <span className="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <span className="space-y-1">
              <span className="block text-base font-semibold">{t(`${key}.title`)}</span>
              <span className="text-muted-foreground block text-sm">{t(`${key}.body`)}</span>
            </span>
          </button>
        ))}
      </div>
      <p className="text-muted-foreground text-center text-sm">
        {t('haveAccount')}{' '}
        <Link href="/login" className="text-primary font-medium underline-offset-4 hover:underline">
          {t('signIn')}
        </Link>
      </p>
    </div>
  );
}

const FIELDS = ['firstName', 'lastName', 'email', 'password', 'acceptTerms'] as const;

function RegisterForm({ role, onChangeRole }: { role: SignupRole; onChangeRole: () => void }) {
  const t = useTranslations('auth.register');
  const tc = useTranslations('common');
  const router = useRouter();
  const register = useRegister();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      role,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      locale: 'en',
      acceptTerms: false,
    },
  });
  const { errors, isSubmitting } = form.formState;

  const onSubmit = form.handleSubmit(async (values) => {
    setFormError(null);
    try {
      const user = await register.mutateAsync({ ...values, role });
      router.replace(homeFor(user));
      router.refresh();
    } catch (error) {
      setFormError(applyServerErrors(error, form.setError, FIELDS, tc('networkError')));
    }
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <header className="space-y-2">
        <button
          type="button"
          onClick={onChangeRole}
          className="text-muted-foreground hover:text-foreground -ms-1 inline-flex min-h-11 items-center gap-1 text-sm"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t('change')}
        </button>
        <h1 className="text-3xl font-semibold tracking-tight">
          {role === 'BUYER' ? t('formTitleBuyer') : t('formTitleManufacturer')}
        </h1>
        <p className="text-muted-foreground">{t('formSubtitle')}</p>
      </header>

      <FormAlert message={formError} />

      <FieldGroup>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.firstName}>
            <FieldLabel htmlFor="firstName">{t('firstName')}</FieldLabel>
            <Input
              id="firstName"
              autoComplete="given-name"
              autoFocus
              aria-invalid={!!errors.firstName}
              {...form.register('firstName')}
            />
            <FieldError errors={[errors.firstName]} />
          </Field>
          <Field data-invalid={!!errors.lastName}>
            <FieldLabel htmlFor="lastName">{t('lastName')}</FieldLabel>
            <Input
              id="lastName"
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
              {...form.register('lastName')}
            />
            <FieldError errors={[errors.lastName]} />
          </Field>
        </div>
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">{t('email')}</FieldLabel>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!errors.email}
            {...form.register('email')}
          />
          <FieldError errors={[errors.email]} />
        </Field>
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">{t('password')}</FieldLabel>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby="password-hint"
            {...form.register('password')}
          />
          <FieldDescription id="password-hint">{t('passwordHint')}</FieldDescription>
          <FieldError errors={[errors.password]} />
        </Field>
        <Field orientation="horizontal" data-invalid={!!errors.acceptTerms}>
          <Controller
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <Checkbox
                id="acceptTerms"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
                aria-invalid={!!errors.acceptTerms}
              />
            )}
          />
          <FieldLabel htmlFor="acceptTerms" className="font-normal">
            {t('acceptTerms')}
          </FieldLabel>
        </Field>
        <FieldError errors={[errors.acceptTerms]} />
      </FieldGroup>

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
