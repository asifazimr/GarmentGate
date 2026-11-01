'use client';

import { useMutation } from '@tanstack/react-query';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { apiSend } from '@/lib/api';
import { homeFor, refreshUser } from '../api';

export function VerifyEmailView() {
  const t = useTranslations('auth.verify');
  const router = useRouter();
  const token = useSearchParams().get('token');
  const started = useRef(false);

  const verify = useMutation({
    mutationFn: (value: string) =>
      apiSend('/auth/verify-email', { method: 'POST', body: { token: value } }),
  });

  useEffect(() => {
    // The token is single-use, so never send it twice (React strict mode runs effects twice).
    if (started.current || !token) return;
    started.current = true;
    verify.mutate(token);
  }, [token, verify]);

  const onContinue = async () => {
    // Signed in on this device? Pick up the new claims and go home; otherwise sign in.
    const user = await refreshUser();
    router.replace(user ? homeFor(user) : '/login');
    router.refresh();
  };

  if (!token || verify.isError) {
    return (
      <Status
        icon={<XCircle className="size-7" />}
        tone="error"
        title={t('failedTitle')}
        body={t('failedBody')}
      >
        <Button size="lg" className="w-full" render={<Link href="/login" />}>
          {t('signIn')}
        </Button>
      </Status>
    );
  }
  if (verify.isSuccess) {
    return (
      <Status
        icon={<CheckCircle2 className="size-7" />}
        title={t('successTitle')}
        body={t('successBody')}
      >
        <Button size="lg" className="w-full" onClick={() => void onContinue()}>
          {t('continue')}
        </Button>
      </Status>
    );
  }
  return (
    <Status
      icon={<Loader2 className="size-7 animate-spin motion-reduce:animate-none" />}
      title={t('verifyingTitle')}
    />
  );
}

function Status({
  icon,
  title,
  body,
  tone = 'ok',
  children,
}: {
  icon: React.ReactNode;
  title: string;
  body?: string;
  tone?: 'ok' | 'error';
  children?: React.ReactNode;
}) {
  return (
    <div className="space-y-6 text-center" role="status" aria-live="polite">
      <span
        className={
          tone === 'error'
            ? 'bg-destructive/10 text-destructive mx-auto flex size-14 items-center justify-center rounded-full'
            : 'bg-primary/10 text-primary mx-auto flex size-14 items-center justify-center rounded-full'
        }
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {body ? <p className="text-muted-foreground">{body}</p> : null}
      </div>
      {children}
    </div>
  );
}
