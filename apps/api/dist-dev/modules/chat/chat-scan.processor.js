var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatScanProcessor_1;
import { Processor } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { filterContactDetails } from '@garmentgate/shared';
import { getDocumentProxy } from 'unpdf';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { StorageService } from '../storage/storage.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { CHAT_SCAN_QUEUE } from './chat.constants.js';
import { ConversationsService } from './conversations.service.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
const MAX_PAGES = 30;
const MAX_CHARS = 200_000;
export async function pdfText(data) {
    const pdf = await getDocumentProxy(data);
    const pages = Math.min(pdf.numPages, MAX_PAGES);
    const parts = [];
    for (let n = 1; n <= pages; n += 1) {
        const page = await pdf.getPage(n);
        const content = await page.getTextContent();
        parts.push(content.items.map((item) => ('str' in item ? item.str : '')).join(' '));
        if (parts.join('\n').length > MAX_CHARS)
            break;
    }
    return parts.join('\n').slice(0, MAX_CHARS);
}
let ChatScanProcessor = ChatScanProcessor_1 = class ChatScanProcessor extends MonitoredWorker {
    prisma;
    storage;
    moderation;
    conversations;
    audit;
    logger = new Logger(ChatScanProcessor_1.name);
    constructor(prisma, storage, moderation, conversations, audit) {
        super();
        this.prisma = prisma;
        this.storage = storage;
        this.moderation = moderation;
        this.conversations = conversations;
        this.audit = audit;
    }
    async process(job) {
        const attachment = await this.prisma.messageAttachment.findUnique({
            where: { id: job.data.attachmentId },
            include: {
                file: true,
                message: {
                    select: { id: true, senderId: true, flagReasons: true, moderationStatus: true },
                },
            },
        });
        if (!attachment || attachment.scannedAt)
            return;
        let text = '';
        try {
            text = await pdfText(new Uint8Array(await this.storage.getObject(attachment.file.storageKey)));
        }
        catch (error) {
            this.logger.warn({ err: error, attachmentId: attachment.id }, 'Could not read PDF text');
        }
        const result = filterContactDetails(text);
        const reasons = [...new Set([...attachment.flagReasons, ...result.reasons])];
        await this.prisma.messageAttachment.update({
            where: { id: attachment.id },
            data: {
                scannedAt: new Date(),
                ...(result.flagged && { flagged: true, flagReasons: reasons }),
            },
        });
        if (!result.flagged)
            return;
        await this.prisma.message.update({
            where: { id: attachment.message.id },
            data: {
                flagged: true,
                ...(attachment.message.moderationStatus === 'CLEAN' && { moderationStatus: 'FLAGGED' }),
            },
        });
        await this.audit.log({
            actorUserId: attachment.message.senderId,
            action: 'moderation.contact_filtered',
            entityType: 'MessageAttachment',
            entityId: attachment.id,
            metadata: { reasons: result.reasons, source: 'pdf-text' },
        });
        await this.moderation.recordViolation(attachment.message.senderId);
        await this.conversations.broadcast('messageUpdated', await this.conversations.messageRow(attachment.message.id));
    }
};
ChatScanProcessor = ChatScanProcessor_1 = __decorate([
    Processor(CHAT_SCAN_QUEUE, { concurrency: 2 }),
    __metadata("design:paramtypes", [PrismaService,
        StorageService,
        ChatModerationService,
        ConversationsService,
        AuditService])
], ChatScanProcessor);
export { ChatScanProcessor };
//# sourceMappingURL=chat-scan.processor.js.map