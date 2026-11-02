import { Injectable } from '@nestjs/common';
import type { NotificationType } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';

/**
 * In-app notifications for the RFQ flow. Callers write the text for each audience: factories
 * hear about buyers by BYR- code, buyers about factories by MFR- code, never by name.
 */
@Injectable()
export class RfqNotifier {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifier: Notifier,
  ) {}

  async send(
    userIds: string[],
    type: NotificationType,
    title: string,
    body: string,
    data: Record<string, string>,
  ): Promise<void> {
    const unique = [...new Set(userIds)];
    if (unique.length === 0) return;
    await this.notifier.notify({ to: { userIds: unique }, type, title, body, link: data });
  }

  async admins(): Promise<string[]> {
    const rows = await this.prisma.user.findMany({
      where: { role: 'ADMIN', status: 'ACTIVE' },
      select: { id: true },
    });
    return rows.map((r) => r.id);
  }

  async companyUsers(
    where: { companyId: string } | { manufacturerProfileId: string },
  ): Promise<string[]> {
    const rows = await this.prisma.user.findMany({
      where: {
        status: 'ACTIVE',
        ...('companyId' in where
          ? { companyId: where.companyId }
          : { company: { manufacturerProfile: { id: where.manufacturerProfileId } } }),
      },
      select: { id: true },
    });
    return rows.map((r) => r.id);
  }
}
