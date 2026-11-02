import type { NextFunction, Request, Response } from 'express';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
/** Called by Stripe's servers and authenticated by its signature, not by cookies. */
const EXEMPT_PATHS = ['/payments/stripe/webhook'];

export type OriginVerdict = 'allow' | 'deny';

/**
 * CSRF defence in depth. Auth cookies are SameSite=Lax, so other sites can't make
 * cookie-carrying POSTs; this also refuses state-changing requests whose Origin isn't one of
 * ours, or that the browser marks as cross-site. Requests without browser headers (server to
 * server, the web app's proxy, CLI tools) carry no ambient cookies of a victim and pass.
 */
export function checkOrigin(
  req: { method: string; path: string; headers: Record<string, string | string[] | undefined> },
  allowed: readonly string[],
): OriginVerdict {
  if (SAFE_METHODS.has(req.method.toUpperCase())) return 'allow';
  if (EXEMPT_PATHS.some((p) => req.path === p)) return 'allow';
  const origin = header(req.headers.origin);
  if (origin !== undefined) return allowed.includes(origin) ? 'allow' : 'deny';
  return header(req.headers['sec-fetch-site']) === 'cross-site' ? 'deny' : 'allow';
}

const header = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export function originCheckMiddleware(allowed: readonly string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (checkOrigin(req, allowed) === 'allow') {
      next();
      return;
    }
    res.status(403).json({ statusCode: 403, message: 'Cross-site request refused' });
  };
}
