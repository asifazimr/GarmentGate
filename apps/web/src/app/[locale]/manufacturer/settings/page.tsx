import type { Metadata } from 'next';
import { FactoryBankAccountCard } from '@/features/payments/components/bank-accounts';
import { NotificationSettings } from '@/features/settings/notification-settings';

export const metadata: Metadata = { title: 'Settings' };

export default function Page() {
  return (
    <div className="space-y-6">
      <FactoryBankAccountCard />
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
    </div>
  );
}
