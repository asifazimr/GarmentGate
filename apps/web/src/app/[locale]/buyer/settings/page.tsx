import type { Metadata } from 'next';
import { NotificationSettings } from '@/features/settings/notification-settings';

export const metadata: Metadata = { title: 'Settings' };

export default function Page() {
  return (
    <NotificationSettings
      categories={[
        'QUOTES',
        'MESSAGES',
        'ORDERS',
        'QC',
        'PAYMENTS',
        'DISPUTES',
        'REVIEWS',
        'ACCOUNT',
      ]}
    />
  );
}
