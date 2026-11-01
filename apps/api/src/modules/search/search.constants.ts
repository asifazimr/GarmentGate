export const SEARCH_QUEUE = 'search';

export type SearchJob =
  | { kind: 'product'; id: string }
  | { kind: 'manufacturer'; profileId: string }
  | { kind: 'reindex' };
