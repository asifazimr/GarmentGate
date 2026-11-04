'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { PageHeader } from '@/components/patterns/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClientSearchParam } from '@/lib/client-hooks';
import { BookCapacity } from './book-capacity';
import { BuyerBookings } from './buyer-bookings';

const TABS = ['find', 'bookings'] as const;
type Tab = (typeof TABS)[number];

/** Book capacity: find open line time, and the buyer's bookings and partnerships. */
export function BuyerCapacity() {
  const t = useTranslations('capacityBooking.buyerPage');
  const hint = useClientSearchParam('tab');
  const [chosen, setChosen] = useState<Tab | null>(null);
  const tab: Tab = chosen ?? (hint === 'bookings' ? 'bookings' : 'find');
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <Tabs
        value={tab}
        onValueChange={(v) => {
          const next = TABS.find((x) => x === v);
          if (next) setChosen(next);
        }}
      >
        <TabsList variant="line">
          {TABS.map((x) => (
            <TabsTrigger key={x} value={x}>
              {t(`tabs.${x}`)}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="pt-6">
          <TabsContent value="find">
            <BookCapacity />
          </TabsContent>
          <TabsContent value="bookings">
            <BuyerBookings onFind={() => setChosen('find')} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
