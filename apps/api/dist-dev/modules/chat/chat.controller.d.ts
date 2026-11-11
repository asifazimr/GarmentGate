import { type AccountWarning, type ChatMessage, type ConversationDetail, type ConversationSummary, MessagesQuerySchema, type OpenConversationDto, type PresignChatFileDto, type PresignUploadResponse, type SendMessageDto, type Unread } from '@garmentgate/shared';
import { z } from 'zod';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ChatActorService } from './chat-actor.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { ConversationsService } from './conversations.service.js';
export declare class ChatController {
    private readonly actors;
    private readonly conversations;
    private readonly moderation;
    constructor(actors: ChatActorService, conversations: ConversationsService, moderation: ChatModerationService);
    open(user: AuthenticatedUser, dto: OpenConversationDto): Promise<ConversationSummary>;
    list(user: AuthenticatedUser): Promise<ConversationSummary[]>;
    unread(user: AuthenticatedUser): Promise<Unread>;
    detail(user: AuthenticatedUser, id: string): Promise<ConversationDetail>;
    messages(user: AuthenticatedUser, id: string, query: z.output<typeof MessagesQuerySchema>): Promise<{
        messages: ChatMessage[];
        hasMore: boolean;
    }>;
    presign(user: AuthenticatedUser, id: string, dto: PresignChatFileDto): Promise<PresignUploadResponse>;
    send(user: AuthenticatedUser, id: string, dto: SendMessageDto): Promise<ChatMessage>;
    read(user: AuthenticatedUser, id: string): Promise<void>;
    warnings(user: AuthenticatedUser): Promise<AccountWarning[]>;
    acknowledge(user: AuthenticatedUser, id: string): Promise<void>;
}
