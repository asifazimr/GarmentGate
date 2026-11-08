import type { Metadata } from 'next';
import { TaskFeed } from '@/features/gig/components/task-feed';

export const metadata: Metadata = { title: 'Tasks' };

export default function Page() {
  return <TaskFeed />;
}
