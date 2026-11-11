import { type ChatMessage, type ConversationDetail, type ConversationSummary, type OpenConversationDto, type SendMessageDto } from '@garmentgate/shared';
import type { Queue } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service.js';
import { Notifier } from '../notifications/notifier.service.js';
import { AuditService } from '../audit/audit.service.js';
import { MediaService } from '../media/media.service.js';
import { FilesService } from '../storage/files.service.js';
import { StorageService } from '../storage/storage.service.js';
import { type ChatActor, ChatActorService } from './chat-actor.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { ChatRealtime } from './chat-realtime.service.js';
import { type ChatScanJob } from './chat.constants.js';
import { type MessageRow } from './chat-views.js';
export declare class ConversationsService {
    private readonly prisma;
    private readonly notifier;
    private readonly actors;
    private readonly files;
    private readonly storage;
    private readonly media;
    private readonly moderation;
    private readonly realtime;
    private readonly audit;
    private readonly scans;
    private readonly logger;
    constructor(prisma: PrismaService, notifier: Notifier, actors: ChatActorService, files: FilesService, storage: StorageService, media: MediaService, moderation: ChatModerationService, realtime: ChatRealtime, audit: AuditService, scans: Queue<ChatScanJob>);
    open(actor: ChatActor, dto: OpenConversationDto): Promise<ConversationSummary>;
    private resolveThread;
    list(actor: ChatActor): Promise<ConversationSummary[]>;
    private summaries;
    private summaryBase;
    detail(actor: ChatActor, id: string): Promise<ConversationDetail>;
    messages(actor: ChatActor, id: string, before: Date | undefined, limit: number): Promise<{
        messages: ChatMessage[];
        hasMore: boolean;
    }>;
    presign(actor: ChatActor, id: string, file: {
        fileName: string;
        contentType: string;
        sizeBytes: number;
    }): Promise<{
        fileId: string;
        url: string;
        fields: Record<string, string>;
        expiresAt: string;
    }>;
    send(actor: ChatActor, id: string, dto: SendMessageDto): Promise<ChatMessage>;
    relay(actor: ChatActor, messageId: string, toConversationId: string): Promise<ChatMessage>;
    markRead(actor: ChatActor, id: string): Promise<void>;
    unreadTotal(actor: ChatActor): Promise<number>;
    private unreadByConversation;
    views(rows: MessageRow[], kind: 'company' | 'staff', code: string, viewerId: string | null): Promise<ChatMessage[]>;
    broadcast(event: 'message' | 'messageUpdated', message: MessageRow): Promise<void>;
    messageRow(id: string): Promise<MessageRow>;
    private links;
    private relayLabels;
    private companyCodeOf;
    private notifyCompany;
}
