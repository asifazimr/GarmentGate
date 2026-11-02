import { describe, expect, it } from 'vitest';
import { notificationHref } from './notification.schema.js';

describe('notificationHref', () => {
  it('links each role to its own pages', () => {
    expect(notificationHref('BUYER', { orderCode: 'ORD-2026-00017' })).toBe(
      '/buyer/orders/ORD-2026-00017',
    );
    expect(notificationHref('MANUFACTURER', { rfqCode: 'RFQ-2026-00043' })).toBe(
      '/manufacturer/rfqs/RFQ-2026-00043',
    );
    expect(notificationHref('ADMIN', { conversationId: 'c1', orderCode: 'ORD-1' })).toBe(
      '/admin/messages/c1',
    );
    expect(notificationHref('INSPECTOR', { inspectionId: 'i1', orderCode: 'ORD-1' })).toBe(
      '/inspector/inspections/i1',
    );
    expect(notificationHref('ADMIN', { rfqCode: 'RFQ-1' })).toBeNull();
  });
});
