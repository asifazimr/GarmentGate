import type { Metadata } from 'next';
import { ProfileEditor } from '@/features/manufacturer/components/profile-editor';

export const metadata: Metadata = { title: 'Factory profile' };

export default function FactoryProfilePage() {
  return <ProfileEditor />;
}
