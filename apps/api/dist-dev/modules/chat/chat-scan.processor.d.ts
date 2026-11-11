import type { Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { StorageService } from '../storage/storage.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { type ChatScanJob } from './chat.constants.js';
import { ConversationsService } from './conversations.service.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
export declare function pdfText(data: Uint8Array): Promise<string>;
export declare class ChatScanProcessor extends MonitoredWorker {
    private readonly prisma;
    private readonly storage;
    private readonly moderation;
    private readonly conversations;
    private readonly audit;
    private readonly logger;
    constructor(prisma: PrismaService, storage: StorageService, moderation: ChatModerationService, conversations: ConversationsService, audit: AuditService);
    process(job: Job<ChatScanJob>): Promise<void>;
}
