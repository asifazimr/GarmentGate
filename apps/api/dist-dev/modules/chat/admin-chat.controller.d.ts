import { type ChatMessage, type FlaggedMessage, type ModerationDecisionDto, type RelayMessageDto } from '@garmentgate/shared';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { ChatActorService } from './chat-actor.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { ConversationsService } from './conversations.service.js';
export declare class AdminChatController {
    private readonly actors;
    private readonly conversations;
    private readonly moderation;
    constructor(actors: ChatActorService, conversations: ConversationsService, moderation: ChatModerationService);
    relay(user: AuthenticatedUser, id: string, dto: RelayMessageDto): Promise<ChatMessage>;
    queue(): Promise<FlaggedMessage[]>;
    decide(user: AuthenticatedUser, id: string, dto: ModerationDecisionDto): Promise<void>;
}
