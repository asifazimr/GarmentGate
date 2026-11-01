import { describe, expect, it } from 'vitest';
import { homePathFor } from './routing.js';

describe('homePathFor', () => {
  it('sends admins to /admin regardless of KYC', () => {
    expect(homePathFor({ role: 'ADMIN', kycStatus: null })).toBe('/admin');
  });

  it.each([
    [null, '/onboarding'],
    ['NOT_SUBMITTED', '/onboarding'],
    ['REJECTED', '/onboarding'],
    ['PENDING_REVIEW', '/pending'],
  ] as const)('buyer with KYC %s → %s', (kycStatus, path) => {
    expect(homePathFor({ role: 'BUYER', kycStatus })).toBe(path);
  });

  it('sends verified users to their own dashboard', () => {
    expect(homePathFor({ role: 'BUYER', kycStatus: 'VERIFIED' })).toBe('/buyer');
    expect(homePathFor({ role: 'MANUFACTURER', kycStatus: 'VERIFIED' })).toBe('/manufacturer');
  });
});
