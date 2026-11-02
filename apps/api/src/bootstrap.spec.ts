import { describe, expect, it } from 'vitest';
import { parseTrustProxy } from './bootstrap.js';

describe('parseTrustProxy', () => {
  it('reads booleans, hop counts and address lists', () => {
    expect(parseTrustProxy('true')).toBe(true);
    expect(parseTrustProxy('false')).toBe(false);
    expect(parseTrustProxy('1')).toBe(1);
    expect(parseTrustProxy('2')).toBe(2);
    expect(parseTrustProxy('loopback')).toBe('loopback');
    expect(parseTrustProxy('10.0.0.0/8, loopback')).toBe('10.0.0.0/8, loopback');
  });
});
