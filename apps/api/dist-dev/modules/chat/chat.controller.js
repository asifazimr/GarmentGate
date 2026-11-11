var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Query, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountWarningSchema, ChatMessageSchema, ConversationDetailSchema, ConversationSummarySchema, MessagesQuerySchema, OpenConversationSchema, PresignChatFileSchema, SendMessageSchema, UnreadSchema, } from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser } from '../auth/auth.decorators.js';
import { ChatActorService } from './chat-actor.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { ConversationsService } from './conversations.service.js';
import { MessageThrottle, ThreadThrottle, UploadThrottle } from '../../common/throttle/limits.js';
let ChatController = class ChatController {
    actors;
    conversations;
    moderation;
    constructor(actors, conversations, moderation) {
        this.actors = actors;
        this.conversations = conversations;
        this.moderation = moderation;
    }
    async open(user, dto) {
        return this.conversations.open(await this.actors.resolve(user.id), dto);
    }
    async list(user) {
        return this.conversations.list(await this.actors.resolve(user.id));
    }
    async unread(user) {
        return { total: await this.conversations.unreadTotal(await this.actors.resolve(user.id)) };
    }
    async detail(user, id) {
        return this.conversations.detail(await this.actors.resolve(user.id), id);
    }
    async messages(user, id, query) {
        return this.conversations.messages(await this.actors.resolve(user.id), id, query.before ? new Date(query.before) : undefined, query.limit);
    }
    async presign(user, id, dto) {
        return this.conversations.presign(await this.actors.resolve(user.id), id, dto);
    }
    async send(user, id, dto) {
        return this.conversations.send(await this.actors.resolve(user.id), id, dto);
    }
    async read(user, id) {
        await this.conversations.markRead(await this.actors.resolve(user.id), id);
    }
    warnings(user) {
        return this.moderation.activeWarnings(user.id);
    }
    acknowledge(user, id) {
        return this.moderation.acknowledge(user.id, id);
    }
};
__decorate([
    Post('conversations'),
    ThreadThrottle(),
    ApiOperation({ summary: 'Open (or find) the GarmentGate thread for an RFQ or order' }),
    ApiOkResponse({ standardSchema: ConversationSummarySchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(OpenConversationSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "open", null);
__decorate([
    Get('conversations'),
    ApiOkResponse({ standardSchema: ConversationSummarySchema.array() }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "list", null);
__decorate([
    Get('conversations/unread'),
    ApiOkResponse({ standardSchema: UnreadSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "unread", null);
__decorate([
    Get('conversations/:id'),
    ApiOkResponse({ standardSchema: ConversationDetailSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "detail", null);
__decorate([
    Get('conversations/:id/messages'),
    ApiOperation({ summary: 'Older messages (before a timestamp)' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Query(new ZodValidationPipe(MessagesQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "messages", null);
__decorate([
    Post('conversations/:id/uploads'),
    UploadThrottle(),
    ApiOperation({ summary: 'Presigned POST for a chat attachment (PDF or image)' }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(PresignChatFileSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "presign", null);
__decorate([
    Post('conversations/:id/messages'),
    MessageThrottle(),
    ApiOperation({ summary: 'Send a message; contact details are hidden and flagged' }),
    ApiOkResponse({ standardSchema: ChatMessageSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(SendMessageSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "send", null);
__decorate([
    Post('conversations/:id/read'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "read", null);
__decorate([
    Get('chat/warnings'),
    ApiOkResponse({ standardSchema: AccountWarningSchema.array() }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "warnings", null);
__decorate([
    Post('chat/warnings/:id/acknowledge'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "acknowledge", null);
ChatController = __decorate([
    ApiTags('chat'),
    ApiCookieAuth(),
    Controller(),
    __metadata("design:paramtypes", [ChatActorService,
        ConversationsService,
        ChatModerationService])
], ChatController);
export { ChatController };
//# sourceMappingURL=chat.controller.js.map