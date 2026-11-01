import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { NotificationListSchema } from '@garmentgate/shared';
import { createTestApp, registerAgent, type TestContext } from './helpers.js';

describe('Notifications (e2e)', () => {
  let ctx: TestContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.app.close();
  });

  it('lists only the caller’s notifications and marks them read', async () => {
    const { agent: alice, email } = await registerAgent(ctx.app, 'BUYER');
    const { agent: bob } = await registerAgent(ctx.app, 'MANUFACTURER');
    const user = await ctx.prisma.user.findUniqueOrThrow({ where: { email } });
    const [first] = await ctx.prisma.notification.createManyAndReturn({
      data: [
        { userId: user.id, type: 'SYSTEM', title: 'Welcome', body: 'Hello' },
        { userId: user.id, type: 'ORDER_UPDATE', title: 'Order', body: 'Sewing started' },
      ],
    });
    if (!first) throw new Error('seed failed');

    const list = NotificationListSchema.parse((await alice.get('/notifications').expect(200)).body);
    expect(list.unreadCount).toBe(2);
    expect(list.items).toHaveLength(2);

    // Someone else's notification is invisible and untouchable.
    expect(
      NotificationListSchema.parse((await bob.get('/notifications').expect(200)).body).items,
    ).toHaveLength(0);
    await bob.post(`/notifications/${first.id}/read`).expect(404);

    await alice.post(`/notifications/${first.id}/read`).expect(204);
    expect(NotificationListSchema.parse((await alice.get('/notifications')).body).unreadCount).toBe(
      1,
    );
    await alice.post('/notifications/read-all').expect(204);
    expect(NotificationListSchema.parse((await alice.get('/notifications')).body).unreadCount).toBe(
      0,
    );
  });
});
