import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type ChatMessage,
  ChatMessageSchema,
  type FlaggedMessage,
  FlaggedMessageSchema,
  type ModerationDecisionDto,
  ModerationDecisionSchema,
  type RelayMessageDto,
  RelayMessageSchema,
} from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser, Roles } from '../auth/auth.decorators.js';
import { ChatActorService } from './chat-actor.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { ConversationsService } from './conversations.service.js';

@ApiTags('admin')
@ApiCookieAuth()
@Roles('ADMIN')
@Controller('admin')
export class AdminChatController {
  constructor(
    private readonly actors: ChatActorService,
    private readonly conversations: ConversationsService,
    private readonly moderation: ChatModerationService,
  ) {}

  @Post('messages/:id/relay')
  @ApiOperation({
    summary: 'Relay a message into the other side’s thread (filtered, by code only)',
  })
  @ApiOkResponse({ standardSchema: ChatMessageSchema })
  async relay(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(RelayMessageSchema)) dto: RelayMessageDto,
  ): Promise<ChatMessage> {
    return this.conversations.relay(await this.actors.resolve(user.id), id, dto.toConversationId);
  }

  @Get('moderation/messages')
  @ApiOperation({ summary: 'Flagged messages waiting for review' })
  @ApiOkResponse({ standardSchema: FlaggedMessageSchema.array() })
  queue(): Promise<FlaggedMessage[]> {
    return this.moderation.queue();
  }

  @Post('moderation/messages/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async decide(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(ModerationDecisionSchema)) dto: ModerationDecisionDto,
  ): Promise<void> {
    await this.moderation.decide(user.id, id, dto.action);
    await this.conversations.broadcast('messageUpdated', await this.conversations.messageRow(id));
  }
}
