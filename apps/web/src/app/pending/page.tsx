import type { Metadata } from 'next';
import { PendingStatus } from '@/features/onboarding/components/pending-status';

export const metadata: Metadata = { title: 'Pending verification' };

export default function PendingPage() {
  return <PendingStatus />;
}
