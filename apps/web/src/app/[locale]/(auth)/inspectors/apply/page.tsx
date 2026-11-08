import type { Metadata } from 'next';
import { InspectorApplyForm } from '@/features/gig/components/apply-form';

export const metadata: Metadata = { title: 'Become a QC inspector' };

export default function Page() {
  return <InspectorApplyForm />;
}
