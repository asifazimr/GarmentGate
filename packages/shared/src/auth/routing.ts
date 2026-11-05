import type { Role } from './roles.js';
import type { KycStatus } from './auth.schema.js';

export const ROLE_HOME: Record<Role, string> = {
  BUYER: '/buyer',
  MANUFACTURER: '/manufacturer',
  ADMIN: '/admin',
  INSPECTOR: '/inspector',
  PARTNER: '/partner',
};

/** Areas only reachable by one role once verified. */
export const ROLE_AREAS = Object.values(ROLE_HOME);

export const ONBOARDING_PATH = '/onboarding';
export const PENDING_PATH = '/pending';

/**
 * Where a signed-in user belongs right now. Shared by the web proxy (from JWT claims)
 * and client code (from /auth/me) so both always agree.
 */
export function homePathFor(state: { role: Role; kycStatus: KycStatus | null }): string {
  // Staff roles have no company to verify.
  if (state.role === 'ADMIN' || state.role === 'INSPECTOR' || state.role === 'PARTNER')
    return ROLE_HOME[state.role];
  switch (state.kycStatus) {
    case 'VERIFIED':
      return ROLE_HOME[state.role];
    case 'PENDING_REVIEW':
      return PENDING_PATH;
    default:
      // No company yet, NOT_SUBMITTED or REJECTED: finish (or fix) onboarding.
      return ONBOARDING_PATH;
  }
}
