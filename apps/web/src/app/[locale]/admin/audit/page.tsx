import type { Metadata } from 'next';
import { AuditLog } from '@/features/admin/components/audit-log';

export const metadata: Metadata = { title: 'Admin · Audit log' };

export default function Page() {
  return <AuditLog />;
}
