import {
  AUTH_COOKIES,
  type AccessTokenClaims,
  AccessTokenClaimsSchema,
  homePathFor,
  ONBOARDING_PATH,
  PENDING_PATH,
  ROLE_HOME,
} from '@garmentgate/shared';
import { decodeJwt } from 'jose';
import { type NextRequest, NextResponse } from 'next/server';

/**
 * Route protection and role-based redirects.
 *
 * This only decides which page to show. It decodes the access token without verifying its
 * signature, because the API verifies every request and is the security boundary. A forged
 * cookie can at most render an empty page shell.
 */

const API_URL = process.env.API_URL ?? 'http://localhost:4000';

const PROTECTED = [ONBOARDING_PATH, PENDING_PATH, ...Object.values(ROLE_HOME)];
const GUEST_ONLY = ['/login', '/register', '/forgot-password', '/reset-password'];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = PROTECTED.some((p) => path === p || path.startsWith(`${p}/`));
  const isGuestOnly = GUEST_ONLY.includes(path);
  const isLanding = path === '/';
  if (!isProtected && !isGuestOnly && !isLanding) return NextResponse.next();

  let claims = readClaims(req.cookies.get(AUTH_COOKIES.accessToken)?.value);
  let setCookies: string[] = [];
  if (!claims && req.cookies.has(AUTH_COOKIES.refreshToken)) {
    ({ claims, setCookies } = await refresh(req));
  }

  let response: NextResponse;
  if (!claims) {
    response = isProtected ? redirectToLogin(req) : NextResponse.next();
  } else {
    const home = homePathFor({ role: claims.role, kycStatus: claims.kyc });
    if (isGuestOnly || isLanding) {
      response = redirect(req, safeNext(req) ?? home);
    } else {
      response = canView(path, claims, home) ? NextResponse.next() : redirect(req, home);
    }
  }
  for (const cookie of setCookies) response.headers.append('set-cookie', cookie);
  return response;
}

function canView(path: string, claims: AccessTokenClaims, home: string): boolean {
  const under = (prefix: string) => path === prefix || path.startsWith(`${prefix}/`);
  if (under(ROLE_HOME.ADMIN)) return claims.role === 'ADMIN';
  if (under(ROLE_HOME.BUYER)) return claims.role === 'BUYER' && claims.kyc === 'VERIFIED';
  if (under(ROLE_HOME.MANUFACTURER))
    return claims.role === 'MANUFACTURER' && claims.kyc === 'VERIFIED';
  if (under(ONBOARDING_PATH)) return home === ONBOARDING_PATH;
  if (under(PENDING_PATH)) return home === PENDING_PATH;
  return true;
}

function readClaims(token: string | undefined): AccessTokenClaims | null {
  if (!token) return null;
  try {
    const payload = decodeJwt(token);
    // Treat tokens about to expire as expired so the page doesn't 401 mid-render.
    if (!payload.exp || payload.exp * 1000 <= Date.now() + 5_000) return null;
    const parsed = AccessTokenClaimsSchema.safeParse(payload);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

/** Rotates the refresh cookie server-side and forwards the new cookies to the browser. */
async function refresh(
  req: NextRequest,
): Promise<{ claims: AccessTokenClaims | null; setCookies: string[] }> {
  const refreshToken = req.cookies.get(AUTH_COOKIES.refreshToken)?.value ?? '';
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        cookie: `${AUTH_COOKIES.refreshToken}=${refreshToken}`,
        'user-agent': req.headers.get('user-agent') ?? '',
        'x-forwarded-for': req.headers.get('x-forwarded-for') ?? '',
      },
    });
    const setCookies = res.headers.getSetCookie();
    if (!res.ok) return { claims: null, setCookies };
    const access = setCookies
      .map((c) => c.split(';')[0] ?? '')
      .find((pair) => pair.startsWith(`${AUTH_COOKIES.accessToken}=`));
    return { claims: readClaims(access?.slice(AUTH_COOKIES.accessToken.length + 1)), setCookies };
  } catch {
    // API unreachable: treat as signed out rather than crashing every page.
    return { claims: null, setCookies: [] };
  }
}

/** Only same-site relative paths are allowed as post-login destinations. */
function safeNext(req: NextRequest): string | null {
  const next = req.nextUrl.searchParams.get('next');
  return next?.startsWith('/') && !next.startsWith('//') ? next : null;
}

function redirect(req: NextRequest, path: string): NextResponse {
  return NextResponse.redirect(new URL(path, req.url));
}

function redirectToLogin(req: NextRequest): NextResponse {
  const url = new URL('/login', req.url);
  url.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.[\\w]+$).*)'],
};
