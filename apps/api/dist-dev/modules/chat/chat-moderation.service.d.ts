import type { AccountWarning, FlaggedMessage } from '@garmentgate/shared';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { ChatRealtime } from './chat-realtime.service.js';
export declare const VIOLATION_ACTION = "moderation.contact_filtered";
export declare const VIOLATION_WINDOW_DAYS = 30;
export declare const WARNING_THRESHOLDS: {
    readonly WARNING: 3;
    readonly FINAL_WARNING: 6;
};
export declare function warningLevelFor(violations: number): keyof typeof WARNING_THRESHOLDS | null;
export declare class ChatModerationService {
    private readonly prisma;
    private readonly notifier;
    private readonly audit;
    private readonly realtime;
    constructor(prisma: PrismaService, notifier: Notifier, audit: AuditService, realtime: ChatRealtime);
    private since;
    violations(userId: string): Promise<number>;
    recordViolation(userId: string): Promise<void>;
    activeWarnings(userId: string): Promise<AccountWarning[]>;
    acknowledge(userId: string, id: string): Promise<void>;
    queue(): Promise<FlaggedMessage[]>;
    private context;
    decide(adminId: string, id: string, action: 'release' | 'confirm'): Promise<void>;
}
