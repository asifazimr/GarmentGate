import type { ChatAttachment, ChatMessage, ContactFlag } from '@garmentgate/shared';
import type { Prisma } from '../../generated/prisma/client.js';
import { fileWithRenditions } from '../media/media.service.js';
import type { ChatActor } from './chat-actor.service.js';

export const messageInclude = {
  sender: { select: { id: true, role: true, firstName: true, lastName: true } },
  attachments: { include: { file: fileWithRenditions }, orderBy: { id: 'asc' } },
} satisfies Prisma.MessageInclude;
export type MessageRow = Prisma.MessageGetPayload<{ include: typeof messageInclude }>;

export type Audience =
  | { kind: 'company'; viewerId: string | null }
  | { kind: 'staff'; viewerId: string | null; companyCode: string };

/** Signed links for attachments, resolved once per batch. */
export type AttachmentLinks = ReadonlyMap<string, { url: string | null; thumbUrl: string | null }>;

/**
 * One message as an audience may see it. Companies: the filtered text, staff as "GarmentGate",
 * colleagues by first name. Staff: also the original text, the reasons and full names.
 */
export function messageView(
  m: MessageRow,
  audience: Audience,
  links: AttachmentLinks,
  relayedFrom: ReadonlyMap<string, string>,
): ChatMessage {
  const fromStaff = m.sender.role === 'ADMIN';
  const staffView = audience.kind === 'staff';
  const label = fromStaff
    ? staffView
      ? `${m.sender.firstName} ${m.sender.lastName} · GarmentGate`
      : 'GarmentGate'
    : staffView
      ? `${m.sender.firstName} ${m.sender.lastName} · ${audience.companyCode}`
      : m.sender.firstName;
  const attachments: ChatAttachment[] = m.attachments.map((a) => ({
    id: a.id,
    name: a.displayName,
    contentType: a.file.mimeType,
    sizeBytes: a.file.sizeBytes,
    processing: a.file.processingStatus ?? 'PENDING',
    url: links.get(a.id)?.url ?? null,
    thumbUrl: links.get(a.id)?.thumbUrl ?? null,
    flagged: a.flagged,
  }));
  const reasons: ContactFlag[] = [
    ...new Set([...m.flagReasons, ...m.attachments.flatMap((a) => a.flagReasons)]),
  ];
  return {
    id: m.id,
    conversationId: m.conversationId,
    sender: {
      userId: m.sender.id,
      side: fromStaff ? 'GARMENTGATE' : 'COMPANY',
      label,
      isMe: m.senderId === audience.viewerId,
    },
    body: m.filteredContent,
    flagged: m.flagged,
    reasons: staffView ? reasons : [],
    original: staffView && m.flagged ? m.originalContent : null,
    relayedFrom: m.relayedFromId ? (relayedFrom.get(m.relayedFromId) ?? 'GarmentGate') : null,
    attachments,
    createdAt: m.createdAt.toISOString(),
  };
}

export function audienceFor(actor: ChatActor, companyCode: string): Audience {
  return actor.isAdmin
    ? { kind: 'staff', viewerId: actor.userId, companyCode }
    : { kind: 'company', viewerId: actor.userId };
}
