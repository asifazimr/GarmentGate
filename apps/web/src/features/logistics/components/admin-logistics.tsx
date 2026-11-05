'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { PageHeader } from '@/components/patterns/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClientSearchParam } from '@/lib/client-hooks';
import { LogisticsBoard } from './admin-board';
import { ShipmentsTab } from './admin-shipments';
import { ClaimsTab } from './claims';
import { ReportsTab } from './reports';
import { LogisticsSettingsTab } from './logistics-settings';
import { DutyRatesTab, MarginsTab } from './margins-duties';
import { HubsTab, PartnersTab } from './partners-hubs';
import { RateCardsTab } from './rate-cards';

const TABS = [
  'orders',
  'shipments',
  'claims',
  'reports',
  'rates',
  'margins',
  'partners',
  'hubs',
  'duties',
  'settings',
] as const;
type Tab = (typeof TABS)[number];

/** Staff logistics setup: who carries, where goods gather, what it costs and what buyers pay. */
export function AdminLogistics() {
  const t = useTranslations('logistics.admin');
  const hint = useClientSearchParam('tab');
  const [chosen, setChosen] = useState<Tab | null>(null);
  const tab: Tab = chosen ?? TABS.find((x) => x === hint) ?? 'orders';
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
          <TabsContent value="orders">
            <LogisticsBoard />
          </TabsContent>
          <TabsContent value="shipments">
            <ShipmentsTab />
          </TabsContent>
          <TabsContent value="claims">
            <ClaimsTab />
          </TabsContent>
          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>
          <TabsContent value="rates">
            <RateCardsTab />
          </TabsContent>
          <TabsContent value="margins">
            <MarginsTab />
          </TabsContent>
          <TabsContent value="partners">
            <PartnersTab />
          </TabsContent>
          <TabsContent value="hubs">
            <HubsTab />
          </TabsContent>
          <TabsContent value="duties">
            <DutyRatesTab />
          </TabsContent>
          <TabsContent value="settings">
            <LogisticsSettingsTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
