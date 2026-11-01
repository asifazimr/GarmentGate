import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AccountWarningSchema,
  type AccountWarning,
  type ChatMessage,
  ChatMessageSchema,
  type ConversationDetail,
  ConversationDetailSchema,
  type ConversationSummary,
  ConversationSummarySchema,
  MessagesQuerySchema,
  type OpenConversationDto,
  OpenConversationSchema,
  type PresignChatFileDto,
  PresignChatFileSchema,
  type PresignUploadResponse,
  type SendMessageDto,
  SendMessageSchema,
  type Unread,
  UnreadSchema,
} from '@garmentgate/shared';
import { z } from 'zod';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { type AuthenticatedUser, CurrentUser } from '../auth/auth.decorators.js';
import { ChatActorService } from './chat-actor.service.js';
import { ChatModerationService } from './chat-moderation.service.js';
import { ConversationsService } from './conversations.service.js';

/** Chat for everyone signed in: buyers and factories reach their own threads, staff all. */
@ApiTags('chat')
@ApiCookieAuth()
@Controller()
export class ChatController {
  constructor(
    private readonly actors: ChatActorService,
    private readonly conversations: ConversationsService,
    private readonly moderation: ChatModerationService,
  ) {}

  @Post('conversations')
  @ApiOperation({ summary: 'Open (or find) the GarmentGate thread for an RFQ or order' })
  @ApiOkResponse({ standardSchema: ConversationSummarySchema })
  async open(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(OpenConversationSchema)) dto: OpenConversationDto,
  ): Promise<ConversationSummary> {
    return this.conversations.open(await this.actors.resolve(user.id), dto);
  }

  @Get('conversations')
  @ApiOkResponse({ standardSchema: ConversationSummarySchema.array() })
  async list(@CurrentUser() user: AuthenticatedUser): Promise<ConversationSummary[]> {
    return this.conversations.list(await this.actors.resolve(user.id));
  }

  @Get('conversations/unread')
  @ApiOkResponse({ standardSchema: UnreadSchema })
  async unread(@CurrentUser() user: AuthenticatedUser): Promise<Unread> {
    return { total: await this.conversations.unreadTotal(await this.actors.resolve(user.id)) };
  }

  @Get('conversations/:id')
  @ApiOkResponse({ standardSchema: ConversationDetailSchema })
  async detail(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ConversationDetail> {
    return this.conversations.detail(await this.actors.resolve(user.id), id);
  }

  @Get('conversations/:id/messages')
  @ApiOperation({ summary: 'Older messages (before a timestamp)' })
  async messages(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Query(new ZodValidationPipe(MessagesQuerySchema)) query: z.output<typeof MessagesQuerySchema>,
  ): Promise<{ messages: ChatMessage[]; hasMore: boolean }> {
    return this.conversations.messages(
      await this.actors.resolve(user.id),
      id,
      query.before ? new Date(query.before) : undefined,
      query.limit,
    );
  }

  @Post('conversations/:id/uploads')
  @ApiOperation({ summary: 'Presigned POST for a chat attachment (PDF or image)' })
  async presign(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(PresignChatFileSchema)) dto: PresignChatFileDto,
  ): Promise<PresignUploadResponse> {
    return this.conversations.presign(await this.actors.resolve(user.id), id, dto);
  }

  @Post('conversations/:id/messages')
  @ApiOperation({ summary: 'Send a message; contact details are hidden and flagged' })
  @ApiOkResponse({ standardSchema: ChatMessageSchema })
  async send(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(SendMessageSchema)) dto: SendMessageDto,
  ): Promise<ChatMessage> {
    return this.conversations.send(await this.actors.resolve(user.id), id, dto);
  }

  @Post('conversations/:id/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  async read(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    await this.conversations.markRead(await this.actors.resolve(user.id), id);
  }

  @Get('chat/warnings')
  @ApiOkResponse({ standardSchema: AccountWarningSchema.array() })
  warnings(@CurrentUser() user: AuthenticatedUser): Promise<AccountWarning[]> {
    return this.moderation.activeWarnings(user.id);
  }

  @Post('chat/warnings/:id/acknowledge')
  @HttpCode(HttpStatus.NO_CONTENT)
  acknowledge(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.moderation.acknowledge(user.id, id);
  }
}
