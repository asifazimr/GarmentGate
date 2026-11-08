import type { Metadata } from 'next';
import { AdminMessagingPage } from '@/features/messaging/admin-messaging';

export const metadata: Metadata = { title: 'Texts' };

export default function Page() {
  return <AdminMessagingPage />;
}
