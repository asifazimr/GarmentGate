import type { Metadata } from 'next';
import { AdminUsers } from '@/features/admin/components/users';

export const metadata: Metadata = { title: 'Admin · Users' };

export default function Page() {
  return <AdminUsers />;
}
