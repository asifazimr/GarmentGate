'use client';

import { ActivityPageSchema } from '@garmentgate/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { apiJson } from '@/lib/api';

export const activityKey = ['activity'] as const;

/** The activity feed, paged back by time. New events arrive over the socket (see ChatSocketProvider). */
export function useActivity(limit = 12) {
  return useInfiniteQuery({
    queryKey: [...activityKey, limit],
    queryFn: ({ pageParam }) =>
      apiJson(
        `/notifications/activity?limit=${String(limit)}${pageParam ? `&before=${encodeURIComponent(pageParam)}` : ''}`,
        ActivityPageSchema,
      ),
    initialPageParam: '',
    getNextPageParam: (last) => last.nextBefore ?? undefined,
  });
}
