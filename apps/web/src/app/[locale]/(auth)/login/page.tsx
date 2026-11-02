import type { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/login-form';

export const metadata: Metadata = { title: 'Sign in' };

/** Fully static: the form reads ?next= and ?expired= in the browser only. */
export default function LoginPage() {
  return <LoginForm />;
}
