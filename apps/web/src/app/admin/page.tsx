import type { Metadata } from 'next';
import { KycQueue } from '@/features/admin-kyc/components/kyc-queue';

export const metadata: Metadata = { title: 'Admin · Verification queue' };

export default function AdminPage() {
  return <KycQueue />;
}
