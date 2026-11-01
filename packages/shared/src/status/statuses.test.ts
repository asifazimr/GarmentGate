import { describe, expect, it } from 'vitest';
import { STATUS_DOMAINS, STATUS_TONES, statusTone } from './statuses.js';

describe('status tones', () => {
  it('covers every status of every domain', () => {
    for (const [domain, schema] of Object.entries(STATUS_DOMAINS)) {
      const tones = STATUS_TONES[domain as keyof typeof STATUS_TONES];
      expect(Object.keys(tones).sort()).toEqual([...schema.options].sort());
    }
  });

  it('uses the same tone for the same meaning', () => {
    expect(statusTone('order', 'DISPUTED')).toBe('danger');
    expect(statusTone('payment', 'SUCCEEDED')).toBe('success');
    expect(statusTone('kyc', 'PENDING_REVIEW')).toBe('warning');
  });
});
