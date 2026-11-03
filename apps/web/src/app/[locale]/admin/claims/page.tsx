import type { Metadata } from 'next';
import { AdminClaims } from '@/features/capacity-booking/components/admin-claims';

export const metadata: Metadata = { title: 'Admin · Supplier claims' };

export default function Page() {
  return <AdminClaims />;
}
