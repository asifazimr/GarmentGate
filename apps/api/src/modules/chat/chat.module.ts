import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { AdminChatController } from './admin-chat.controller.js';
import { ChatActorService } from './chat-actor.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { ChatRealtime } from './chat-realtime.service.js';
import { ChatScanProcessor } from './chat-scan.processor.js';
import { CHAT_SCAN_QUEUE } from './chat.constants.js';
import { ChatController } from './chat.controller.js';
import { ChatGateway } from './chat.gateway.js';
import { ConversationsService } from './conversations.service.js';

/** Relayed real-time chat: company ↔ GarmentGate threads per RFQ / order. */
@Module({
  imports: [AuthModule, BullModule.registerQueue({ name: CHAT_SCAN_QUEUE })],
  controllers: [ChatController, AdminChatController],
  providers: [
    ChatActorService,
    ChatRealtime,
    ChatModerationService,
    ConversationsService,
    ChatGateway,
    ChatScanProcessor,
  ],
  exports: [ChatActorService],
})
export class ChatModule {}
