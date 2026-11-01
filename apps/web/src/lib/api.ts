import type { z } from 'zod';

export interface FieldIssue {
  path: string;
  message: string;
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly fieldErrors: FieldIssue[] = [],
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
}

let refreshing: Promise<boolean> | null = null;

/** One refresh at a time, shared by every request that hit a 401 together. */
export function refreshSession(): Promise<boolean> {
  refreshing ??= fetch('/api/auth/refresh', { method: 'POST', credentials: 'same-origin' })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

async function request(path: string, options: RequestOptions, retry = true): Promise<Response> {
  const res = await fetch(`/api${path}`, {
    method: options.method ?? 'GET',
    credentials: 'same-origin',
    cache: 'no-store',
    ...(options.body !== undefined && {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options.body),
    }),
  });

  // Access tokens are short-lived: refresh once and replay. Auth endpoints answer for themselves.
  if (res.status === 401 && retry && !path.startsWith('/auth/')) {
    if (await refreshSession()) return request(path, options, false);
    if (typeof window !== 'undefined') {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      // Full navigation: the session is gone, so let the proxy start from a clean slate.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`/login?expired=1&next=${next}`);
    }
  }
  if (!res.ok) throw await toApiError(res);
  return res;
}

/** Request that returns JSON, validated with a shared schema. */
export async function apiJson<S extends z.ZodType>(
  path: string,
  schema: S,
  options: RequestOptions = {},
): Promise<z.output<S>> {
  const res = await request(path, options);
  return schema.parse(await res.json());
}

/** Request whose response body is ignored (204s). */
export async function apiSend(path: string, options: RequestOptions = {}): Promise<void> {
  await request(path, options);
}

async function toApiError(res: Response): Promise<ApiError> {
  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // Non-JSON error (e.g. proxy failure)
  }
  if (body && typeof body === 'object') {
    const record = body as { message?: unknown; errors?: unknown };
    const message =
      typeof record.message === 'string'
        ? record.message
        : Array.isArray(record.message)
          ? record.message.join(', ')
          : res.statusText;
    const fieldErrors = Array.isArray(record.errors) ? (record.errors as FieldIssue[]) : [];
    return new ApiError(res.status, message, fieldErrors);
  }
  return new ApiError(res.status, res.statusText || 'Request failed');
}
