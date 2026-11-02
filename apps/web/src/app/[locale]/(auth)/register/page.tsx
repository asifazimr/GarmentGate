import type { Metadata } from 'next';
import { Suspense } from 'react';
import { RegisterFlow } from '@/features/auth/components/register-flow';

export const metadata: Metadata = { title: 'Create account' };

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterFlow />
    </Suspense>
  );
}
