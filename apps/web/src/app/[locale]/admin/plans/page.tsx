import type { Metadata } from 'next';
import { AdminPlansPage } from '@/features/plans/components/admin-plans';

export const metadata: Metadata = { title: 'Factory plans' };

export default function Page() {
  return <AdminPlansPage />;
}
