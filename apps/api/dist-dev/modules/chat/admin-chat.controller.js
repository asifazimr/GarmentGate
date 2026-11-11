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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatMessageSchema, FlaggedMessageSchema, ModerationDecisionSchema, RelayMessageSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from './chat-actor.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { ConversationsService } from './conversations.service.js';
let AdminChatController = class AdminChatController {
    actors;
    conversations;
    moderation;
    constructor(actors, conversations, moderation) {
        this.actors = actors;
        this.conversations = conversations;
        this.moderation = moderation;
    }
    async relay(user, id, dto) {
        return this.conversations.relay(await this.actors.resolve(user.id), id, dto.toConversationId);
    }
    queue() {
        return this.moderation.queue();
    }
    async decide(user, id, dto) {
        await this.moderation.decide(user.id, id, dto.action);
        await this.conversations.broadcast('messageUpdated', await this.conversations.messageRow(id));
    }
};
__decorate([
    Post('messages/:id/relay'),
    ApiOperation({
        summary: 'Relay a message into the other side’s thread (filtered, by code only)',
    }),
    ApiOkResponse({ standardSchema: ChatMessageSchema }),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(RelayMessageSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminChatController.prototype, "relay", null);
__decorate([
    Get('moderation/messages'),
    ApiOperation({ summary: 'Flagged messages waiting for review' }),
    ApiOkResponse({ standardSchema: FlaggedMessageSchema.array() }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminChatController.prototype, "queue", null);
__decorate([
    Post('moderation/messages/:id'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __param(2, Body(new ZodValidationPipe(ModerationDecisionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdminChatController.prototype, "decide", null);
AdminChatController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Roles('ADMIN'),
    Controller('admin'),
    __metadata("design:paramtypes", [ChatActorService,
        ConversationsService,
        ChatModerationService])
], AdminChatController);
export { AdminChatController };
//# sourceMappingURL=admin-chat.controller.js.map