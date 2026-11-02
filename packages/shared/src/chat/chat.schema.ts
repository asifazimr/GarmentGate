import { z } from 'zod';
import { IMAGE_CONTENT_TYPES } from '../media/media.schema.js';
import { ContactFlagSchema } from '../moderation/contact-filter.js';

/**
 * Relayed chat: every thread is between ONE company (a buyer or a factory) and GarmentGate.
 * Buyers and factories never share a thread; admins relay what the other side needs to know.
 */
export const ConversationTypeSchema = z.enum(['BUYER_PLATFORM', 'MANUFACTURER_PLATFORM']);
export type ConversationType = z.infer<typeof ConversationTypeSchema>;

export const CHAT_FILE_TYPES = ['application/pdf', ...IMAGE_CONTENT_TYPES] as const;
export const CHAT_FILE_MAX_BYTES = 20 * 1024 * 1024;
export const CHAT_MAX_FILES = 5;
export const CHAT_MESSAGE_MAX = 4000;

export const PresignChatFileSchema = z.object({
  fileName: z.string().trim().min(1).max(255),
  contentType: z.enum(CHAT_FILE_TYPES, { error: 'Upload a PDF, JPG, PNG or WebP file' }),
  sizeBytes: z
    .number()
    .int()
    .positive()
    .max(CHAT_FILE_MAX_BYTES, { error: 'Files can be at most 20 MB' }),
});
export type PresignChatFileDto = z.infer<typeof PresignChatFileSchema>;

const Code = z.string().trim().max(20);

/** Open (or find) the thread for an RFQ or order. Admins pick the side with `factoryCode`. */
export const OpenConversationSchema = z
  .object({
    rfqCode: Code.optional(),
    orderCode: Code.optional(),
    /** The mediation thread of a dispute (one per side). */
    disputeId: z.uuid().optional(),
    /** Admins only: open that factory's thread instead of the buyer's. */
    factoryCode: Code.optional(),
  })
  .refine(
    (v) => [v.rfqCode, v.orderCode, v.disputeId].filter((x) => x !== undefined).length === 1,
    { error: 'Give an RFQ, an order or a dispute' },
  );
export type OpenConversationDto = z.infer<typeof OpenConversationSchema>;

export const SendMessageSchema = z
  .object({
    body: z.string().trim().max(CHAT_MESSAGE_MAX).default(''),
    attachments: z.array(z.uuid()).max(CHAT_MAX_FILES).default([]),
  })
  .refine((v) => v.body.length > 0 || v.attachments.length > 0, {
    path: ['body'],
    error: 'Write a message or attach a file',
  });
export type SendMessageInput = z.input<typeof SendMessageSchema>;
export type SendMessageDto = z.output<typeof SendMessageSchema>;

export const MessagesQuerySchema = z.object({
  before: z.iso.datetime().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export const ChatContextSchema = z.object({
  kind: z.enum(['RFQ', 'ORDER', 'DISPUTE']),
  code: z.string(),
  title: z.string(),
});
export type ChatContext = z.infer<typeof ChatContextSchema>;

export const ChatAttachmentSchema = z.object({
  id: z.uuid(),
  /** Contact-filtered name. */
  name: z.string(),
  contentType: z.string(),
  sizeBytes: z.number().int(),
  processing: z.enum(['PENDING', 'PROCESSING', 'READY', 'FAILED']),
  /** Signed link to the sanitized copy; null until ready. */
  url: z.url().nullable(),
  thumbUrl: z.url().nullable(),
  flagged: z.boolean(),
});
export type ChatAttachment = z.infer<typeof ChatAttachmentSchema>;

export const ChatMessageSchema = z.object({
  id: z.uuid(),
  conversationId: z.uuid(),
  sender: z.object({
    userId: z.uuid(),
    side: z.enum(['COMPANY', 'GARMENTGATE']),
    /** "GarmentGate" for staff when a company reads; names inside your own company. */
    label: z.string(),
    /** Set for the viewer's own messages (clients recompute it for broadcast events). */
    isMe: z.boolean(),
  }),
  /** Delivered text: contact details replaced with "[contact info hidden]". */
  body: z.string(),
  flagged: z.boolean(),
  /** Admins only. */
  reasons: z.array(ContactFlagSchema),
  /** Admins only: exactly what was typed. */
  original: z.string().nullable(),
  /** Set when GarmentGate relayed it from the other side, e.g. "MFR-BD-0421". */
  relayedFrom: z.string().nullable(),
  attachments: z.array(ChatAttachmentSchema),
  createdAt: z.iso.datetime(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ConversationSummarySchema = z.object({
  id: z.uuid(),
  type: ConversationTypeSchema,
  subject: z.string(),
  context: ChatContextSchema.nullable(),
  /** The company in the thread as the viewer may know it: its code; admins also get its name. */
  counterpart: z.object({ code: z.string(), name: z.string().nullable() }),
  lastMessage: z
    .object({ preview: z.string(), at: z.iso.datetime(), fromMe: z.boolean() })
    .nullable(),
  unread: z.number().int(),
  /** Admins: unreviewed flagged messages in the thread. */
  flagged: z.number().int(),
});
export type ConversationSummary = z.infer<typeof ConversationSummarySchema>;

export const ConversationDetailSchema = ConversationSummarySchema.extend({
  messages: z.array(ChatMessageSchema),
  hasMore: z.boolean(),
  /** When the other side last read the thread (read receipts). */
  otherSideReadAt: z.iso.datetime().nullable(),
  /** Admins: the other threads of the same RFQ/order, to relay into. */
  relayTargets: z.array(z.object({ id: z.uuid(), label: z.string() })),
});
export type ConversationDetail = z.infer<typeof ConversationDetailSchema>;

export const UnreadSchema = z.object({ total: z.number().int() });
export type Unread = z.infer<typeof UnreadSchema>;

export const RelayMessageSchema = z.object({ toConversationId: z.uuid() });
export type RelayMessageDto = z.infer<typeof RelayMessageSchema>;

// ── Moderation ──────────────────────────────────────────────────────────────

export const AccountWarningSchema = z.object({
  id: z.uuid(),
  level: z.enum(['WARNING', 'FINAL_WARNING']),
  violations: z.number().int(),
  createdAt: z.iso.datetime(),
});
export type AccountWarning = z.infer<typeof AccountWarningSchema>;

export const FlaggedMessageSchema = z.object({
  id: z.uuid(),
  conversationId: z.uuid(),
  thread: z.string(),
  company: z.object({ code: z.string(), name: z.string() }),
  sender: z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.string(),
    status: z.enum(['ACTIVE', 'SUSPENDED', 'DEACTIVATED']),
  }),
  /** The messages just before it in the thread, oldest first, as delivered. */
  context: z.array(
    z.object({
      from: z.enum(['SENDER', 'COMPANY', 'GARMENTGATE']),
      name: z.string(),
      content: z.string(),
      createdAt: z.iso.datetime(),
    }),
  ),
  original: z.string(),
  delivered: z.string(),
  reasons: z.array(ContactFlagSchema),
  attachments: z.array(z.object({ name: z.string(), reasons: z.array(ContactFlagSchema) })),
  createdAt: z.iso.datetime(),
  /** Contact-filter hits by this user in the last 30 days, across the platform. */
  senderViolations: z.number().int(),
  senderWarnings: z.number().int(),
});
export type FlaggedMessage = z.infer<typeof FlaggedMessageSchema>;

export const ModerationDecisionSchema = z.object({
  /** release: false positive, deliver what was typed. confirm: keep it hidden. */
  action: z.enum(['release', 'confirm']),
});
export type ModerationDecisionDto = z.infer<typeof ModerationDecisionSchema>;

// ── Socket.io ───────────────────────────────────────────────────────────────

/** Socket.io path on the API; the browser reaches it through the web app at /api/socket.io. */
export const CHAT_SOCKET_PATH = '/socket.io';

export const SocketConversationSchema = z.object({ conversationId: z.uuid() });
export const SocketTypingSchema = z.object({ conversationId: z.uuid(), typing: z.boolean() });

/** Server → client events. */
export const ChatEvents = {
  message: 'message:new',
  messageUpdated: 'message:updated',
  typing: 'typing',
  read: 'read',
  unread: 'unread',
  warning: 'warning',
} as const;

export interface TypingEvent {
  conversationId: string;
  userId: string;
  label: string;
  typing: boolean;
}
export interface ReadEvent {
  conversationId: string;
  side: 'COMPANY' | 'GARMENTGATE';
  readAt: string;
}
export interface MessageEvent {
  conversationId: string;
  message: ChatMessage;
}
