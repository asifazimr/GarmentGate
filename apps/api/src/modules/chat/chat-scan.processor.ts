import { Processor } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { filterContactDetails } from '@garmentgate/shared';
import type { Job } from 'bullmq';
import { getDocumentProxy } from 'unpdf';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { StorageService } from '../storage/storage.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { CHAT_SCAN_QUEUE, type ChatScanJob } from './chat.constants.js';
import { ConversationsService } from './conversations.service.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';

/** Enough to catch contact details on a letterhead or in a footer, without unbounded work. */
const MAX_PAGES = 30;
const MAX_CHARS = 200_000;

/** Reads the text layer of a PDF (no OCR). */
export async function pdfText(data: Uint8Array): Promise<string> {
  const pdf = await getDocumentProxy(data);
  const pages = Math.min(pdf.numPages, MAX_PAGES);
  const parts: string[] = [];
  for (let n = 1; n <= pages; n += 1) {
    const page = await pdf.getPage(n);
    const content = await page.getTextContent();
    parts.push(content.items.map((item) => ('str' in item ? item.str : '')).join(' '));
    if (parts.join('\n').length > MAX_CHARS) break;
  }
  return parts.join('\n').slice(0, MAX_CHARS);
}

/**
 * Checks the text of PDF attachments for contact details (file names are checked on send).
 * A hit flags the message for review and counts towards the sender's warnings; the file
 * itself stays in the thread, which only the sender's company and GarmentGate can read.
 */
@Processor(CHAT_SCAN_QUEUE, { concurrency: 2 })
export class ChatScanProcessor extends MonitoredWorker {
  private readonly logger = new Logger(ChatScanProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    private readonly moderation: ChatModerationService,
    private readonly conversations: ConversationsService,
    private readonly audit: AuditService,
  ) {
    super();
  }

  async process(job: Job<ChatScanJob>): Promise<void> {
    const attachment = await this.prisma.messageAttachment.findUnique({
      where: { id: job.data.attachmentId },
      include: {
        file: true,
        message: {
          select: { id: true, senderId: true, flagReasons: true, moderationStatus: true },
        },
      },
    });
    if (!attachment || attachment.scannedAt) return;

    let text = '';
    try {
      text = await pdfText(
        new Uint8Array(await this.storage.getObject(attachment.file.storageKey)),
      );
    } catch (error) {
      // Unreadable or encrypted PDFs can't be checked: send them to a human.
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
    if (!result.flagged) return;

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
    await this.conversations.broadcast(
      'messageUpdated',
      await this.conversations.messageRow(attachment.message.id),
    );
  }
}
