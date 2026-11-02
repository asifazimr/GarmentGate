import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  type ActivityPage,
  ActivityPageSchema,
  type ActivityQuery,
  ActivityQuerySchema,
  type NotificationList,
  NotificationListSchema,
  type NotificationPreferences,
  NotificationPreferencesSchema,
  type UpdateNotificationPreferencesDto,
  UpdateNotificationPreferencesSchema,
} from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { AnyRole, type AuthenticatedUser, CurrentUser } from '../auth/auth.decorators.js';
import { NotificationsService } from './notifications.service.js';

@ApiTags('notifications')
@ApiCookieAuth()
@AnyRole()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Latest notifications for the signed-in user, with the unread count' })
  @ApiOkResponse({ standardSchema: NotificationListSchema })
  list(@CurrentUser() user: AuthenticatedUser): Promise<NotificationList> {
    return this.notifications.list(user.id);
  }

  @Get('activity')
  @ApiOperation({ summary: 'The activity feed: every notification, newest first, paged by time' })
  @ApiOkResponse({ standardSchema: ActivityPageSchema })
  activity(
    @CurrentUser() user: AuthenticatedUser,
    @Query(new ZodValidationPipe(ActivityQuerySchema)) query: ActivityQuery,
  ): Promise<ActivityPage> {
    return this.notifications.activity(user.id, query);
  }

  @Get('preferences')
  @ApiOkResponse({ standardSchema: NotificationPreferencesSchema })
  preferences(@CurrentUser() user: AuthenticatedUser): Promise<NotificationPreferences> {
    return this.notifications.preferences(user.id);
  }

  @Put('preferences')
  @ApiOkResponse({ standardSchema: NotificationPreferencesSchema })
  updatePreferences(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(UpdateNotificationPreferencesSchema))
    dto: UpdateNotificationPreferencesDto,
  ): Promise<NotificationPreferences> {
    return this.notifications.updatePreferences(user.id, dto);
  }

  @Post('read-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  markAllRead(@CurrentUser() user: AuthenticatedUser): Promise<void> {
    return this.notifications.markAllRead(user.id);
  }

  @Post(':id/read')
  @HttpCode(HttpStatus.NO_CONTENT)
  markRead(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.notifications.markRead(user.id, id);
  }
}
