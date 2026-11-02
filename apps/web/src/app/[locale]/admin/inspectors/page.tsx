import type { Metadata } from 'next';
import { AdminInspectors } from '@/features/qc/components/admin-inspectors';

export const metadata: Metadata = { title: 'Inspectors' };

export default function Page() {
  return <AdminInspectors />;
}
