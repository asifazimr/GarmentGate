import type { NotificationType } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
export declare class RfqNotifier {
    private readonly prisma;
    private readonly notifier;
    constructor(prisma: PrismaService, notifier: Notifier);
    send(userIds: string[], type: NotificationType, title: string, body: string, data: Record<string, string>): Promise<void>;
    admins(): Promise<string[]>;
    companyUsers(where: {
        companyId: string;
    } | {
        manufacturerProfileId: string;
    }): Promise<string[]>;
}
