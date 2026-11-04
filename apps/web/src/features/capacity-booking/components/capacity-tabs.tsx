'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { PageHeader } from '@/components/patterns/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CapacityCalendar } from '@/features/manufacturer/components/capacity-calendar';
import { useClientSearchParam } from '@/lib/client-hooks';
import { BookingInbox } from './booking-inbox';
import { LineCalendar } from './line-calendar';

const TABS = ['lines', 'requests', 'pieces'] as const;
type Tab = (typeof TABS)[number];

/**
 * Capacity: production lines in SAM minutes (what buyers can book), the booking requests they
 * receive, and the monthly pieces used to route RFQs (kept separate on purpose).
 */
export function CapacityTabs() {
  const t = useTranslations('capacityBooking.page');
  const hint = useClientSearchParam('tab');
  const [chosen, setTab] = useState<Tab | null>(null);
  const tab: Tab = chosen ?? TABS.find((x) => x === hint) ?? 'lines';
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <Tabs
        value={tab}
        onValueChange={(value) => {
          const next = TABS.find((x) => x === value);
          if (next) setTab(next);
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
          <TabsContent value="lines">
            <LineCalendar />
          </TabsContent>
          <TabsContent value="requests">
            <BookingInbox />
          </TabsContent>
          <TabsContent value="pieces">
            <CapacityCalendar embedded />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
