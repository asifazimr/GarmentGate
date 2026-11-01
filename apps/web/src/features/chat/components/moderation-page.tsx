'use client';

import { useTranslations } from 'next-intl';
import { parseAsStringLiteral, useQueryState } from 'nuqs';
import { PageHeader } from '@/components/patterns/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminMediaReview } from '@/features/rfq/components/admin-media-review';
import { useFlaggedMessages } from '../api';
import { FlaggedMessages } from './flagged-messages';

const TABS = ['messages', 'files'] as const;

/** Staff review: messages where contact details were hidden, and files before they're shared. */
export function ModerationPage() {
  const t = useTranslations('chat.moderation');
  const [tab, setTab] = useQueryState('tab', parseAsStringLiteral(TABS).withDefault('messages'));
  const flagged = useFlaggedMessages();
  return (
    <div className="space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <Tabs value={tab} onValueChange={(v) => void setTab(v === 'files' ? 'files' : null)}>
        <TabsList>
          <TabsTrigger value="messages">
            {t('messagesTab')}
            {flagged.data && flagged.data.length > 0 ? (
              <span className="bg-danger-soft text-danger-ink tabular ms-1 rounded-full px-1.5 text-xs">
                {flagged.data.length}
              </span>
            ) : null}
          </TabsTrigger>
          <TabsTrigger value="files">{t('filesTab')}</TabsTrigger>
        </TabsList>
        <TabsContent value="messages" className="pt-4">
          <FlaggedMessages />
        </TabsContent>
        <TabsContent value="files" className="pt-4">
          <AdminMediaReview embedded />
        </TabsContent>
      </Tabs>
    </div>
  );
}
