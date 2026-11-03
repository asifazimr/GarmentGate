'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { PageHeader } from '@/components/patterns/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CapacityCalendar } from '@/features/manufacturer/components/capacity-calendar';
import { LineCalendar } from './line-calendar';

const TABS = ['lines', 'pieces'] as const;

/**
 * Capacity in two views: production lines in SAM minutes (what buyers can book) and the monthly
 * pieces used to route RFQs. They're kept separate on purpose.
 */
export function CapacityTabs() {
  const t = useTranslations('capacityBooking.page');
  const [tab, setTab] = useState<(typeof TABS)[number]>('lines');
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
          <TabsContent value="pieces">
            <CapacityCalendar embedded />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
