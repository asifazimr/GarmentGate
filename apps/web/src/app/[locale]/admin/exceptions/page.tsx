import type { Metadata } from 'next';
import { ExceptionsPage } from '@/features/exceptions/components/exceptions-page';

export const metadata: Metadata = { title: 'Admin · Exceptions' };

export default function Page() {
  return <ExceptionsPage />;
}
