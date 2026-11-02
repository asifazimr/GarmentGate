import type { Metadata } from 'next';
import { InspectorJobs } from '@/features/qc/components/inspector-jobs';

export const metadata: Metadata = { title: 'Inspections' };

export default function Page() {
  return <InspectorJobs />;
}
