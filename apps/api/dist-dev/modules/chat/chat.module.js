var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let ChatModule = class ChatModule {
};
ChatModule = __decorate([
    Module({
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
        exports: [ChatActorService, ChatModerationService, ChatRealtime],
    })
], ChatModule);
export { ChatModule };
//# sourceMappingURL=chat.module.js.map