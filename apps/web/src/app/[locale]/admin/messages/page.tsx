import type { Metadata } from 'next';
import { MessagesPage } from '@/features/chat/components/messages-page';

export const metadata: Metadata = { title: 'Messages' };

export default function Page() {
  return <MessagesPage role="ADMIN" conversationId={null} />;
}
