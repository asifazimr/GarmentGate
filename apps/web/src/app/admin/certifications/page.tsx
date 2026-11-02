import type { Metadata } from 'next';
import { AdminCertifications } from '@/features/admin/components/certifications';

export const metadata: Metadata = { title: 'Admin · Certifications' };

export default function Page() {
  return <AdminCertifications />;
}
