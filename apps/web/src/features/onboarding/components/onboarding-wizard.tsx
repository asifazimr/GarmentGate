'use client';

import type { OnboardingState, OnboardingStep } from '@garmentgate/shared';
import { useQueryClient } from '@tanstack/react-query';
import { AlertTriangle, MailWarning } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AppHeader } from '@/features/account/components/app-header';
import { refreshUser, useLogout, useMe, useResendVerification } from '@/features/auth/api';
import { onboardingQueryKey, useOnboarding } from '../api';
import { BuyerProfileStep } from './buyer-profile-step';
import { CompanyStep } from './company-step';
import { DocumentsStep } from './documents-step';
import { ManufacturerProfileStep } from './manufacturer-profile-step';
import { StepProgress } from './step-progress';

const STEP_INDEX: Record<OnboardingStep, number> = {
  COMPANY_INFO: 0,
  PROFILE: 1,
  DOCUMENTS: 2,
  SUBMITTED: 2,
};

export function OnboardingWizard() {
  const t = useTranslations('onboarding');
  const tc = useTranslations('common');
  const onboarding = useOnboarding();
  const logout = useLogout();

  const saveAndExit = () => {
    toast.success(t('savedForLater'));
    logout.mutate();
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader
        actions={
          <Button variant="outline" onClick={saveAndExit} disabled={logout.isPending}>
            {t('saveAndExit')}
          </Button>
        }
      />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        {onboarding.isPending ? (
          <WizardSkeleton />
        ) : onboarding.isError ? (
          <Alert variant="destructive">
            <AlertTriangle />
            <AlertTitle>{tc('somethingWentWrong')}</AlertTitle>
            <AlertDescription>{tc('networkError')}</AlertDescription>
            <AlertAction>
              <Button variant="outline" size="sm" onClick={() => void onboarding.refetch()}>
                {tc('retry')}
              </Button>
            </AlertAction>
          </Alert>
        ) : (
          <Wizard state={onboarding.data} />
        )}
      </main>
    </div>
  );
}

function Wizard({ state }: { state: OnboardingState }) {
  const t = useTranslations('onboarding');
  const router = useRouter();
  const queryClient = useQueryClient();
  const reached = STEP_INDEX[state.step];
  const [current, setCurrent] = useState(reached);

  const steps = [
    { label: t('steps.company') },
    { label: state.role === 'MANUFACTURER' ? t('steps.capabilities') : t('steps.sourcing') },
    { label: t('steps.documents') },
  ];

  const go = (index: number) => {
    setCurrent(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmitted = async () => {
    // New KYC status → new access token → the proxy now routes to the pending screen.
    await refreshUser();
    await queryClient.invalidateQueries({ queryKey: onboardingQueryKey });
    router.replace('/pending');
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">{t('title')}</h1>
      </div>

      {state.kycStatus === 'REJECTED' && state.rejectionReason ? (
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>{t('rejected.title')}</AlertTitle>
          <AlertDescription>
            <p>{state.rejectionReason}</p>
            <p>{t('rejected.body')}</p>
          </AlertDescription>
        </Alert>
      ) : null}

      {state.emailVerificationRequired && !state.emailVerified ? <EmailBanner /> : null}

      <StepProgress steps={steps} current={current} reached={reached} onSelect={go} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {current === 0 ? (
            <CompanyStep state={state} onDone={() => go(1)} />
          ) : current === 1 ? (
            state.role === 'MANUFACTURER' ? (
              <ManufacturerProfileStep state={state} onBack={() => go(0)} onDone={() => go(2)} />
            ) : (
              <BuyerProfileStep state={state} onBack={() => go(0)} onDone={() => go(2)} />
            )
          ) : (
            <DocumentsStep
              state={state}
              onBack={() => go(1)}
              onSubmitted={() => void onSubmitted()}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function EmailBanner() {
  const t = useTranslations('onboarding.emailBanner');
  const me = useMe();
  const resend = useResendVerification();
  return (
    <Alert>
      <MailWarning />
      <AlertTitle>{t('title')}</AlertTitle>
      <AlertDescription className="sm:pe-32">
        {t('body', { email: me.data?.email ?? '' })}
      </AlertDescription>
      <AlertAction>
        <Button
          variant="outline"
          size="sm"
          disabled={resend.isPending || resend.isSuccess}
          onClick={() => resend.mutate(undefined, { onSuccess: () => toast.success(t('resent')) })}
        >
          {resend.isSuccess ? t('resent') : t('resend')}
        </Button>
      </AlertAction>
    </Alert>
  );
}

function WizardSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true">
      <Skeleton className="h-9 w-64" />
      <Skeleton className="h-11 w-full" />
      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-11 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
