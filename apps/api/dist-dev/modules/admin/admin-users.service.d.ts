import type { AdminUser, SuspendUserDto, WarnUserDto } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { ChatModerationService } from '../chat/chat-moderation.service.js';
import { ChatRealtime } from '../chat/chat-realtime.service.js';
import { Notifier } from '../notifications/notifier.service.js';
export declare class AdminUsersService {
    private readonly prisma;
    private readonly moderation;
    private readonly realtime;
    private readonly notifier;
    private readonly audit;
    constructor(prisma: PrismaService, moderation: ChatModerationService, realtime: ChatRealtime, notifier: Notifier, audit: AuditService);
    list(): Promise<AdminUser[]>;
    suspend(adminId: string, userId: string, dto: SuspendUserDto): Promise<void>;
    reactivate(adminId: string, userId: string): Promise<void>;
    warn(adminId: string, userId: string, dto: WarnUserDto): Promise<void>;
    private find;
}
