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
import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, } from '@nestjs/common';
import { ApiCookieAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActivityPageSchema, ActivityQuerySchema, NotificationListSchema, NotificationPreferencesSchema, UpdateNotificationPreferencesSchema, } from '@garmentgate/shared';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { AnyRole, CurrentUser } from '../auth/auth.decorators.js';
import { NotificationsService } from './notifications.service.js';
let NotificationsController = class NotificationsController {
    notifications;
    constructor(notifications) {
        this.notifications = notifications;
    }
    list(user) {
        return this.notifications.list(user.id);
    }
    activity(user, query) {
        return this.notifications.activity(user.id, query);
    }
    preferences(user) {
        return this.notifications.preferences(user.id);
    }
    updatePreferences(user, dto) {
        return this.notifications.updatePreferences(user.id, dto);
    }
    markAllRead(user) {
        return this.notifications.markAllRead(user.id);
    }
    markRead(user, id) {
        return this.notifications.markRead(user.id, id);
    }
};
__decorate([
    Get(),
    ApiOperation({ summary: 'Latest notifications for the signed-in user, with the unread count' }),
    ApiOkResponse({ standardSchema: NotificationListSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "list", null);
__decorate([
    Get('activity'),
    ApiOperation({ summary: 'The activity feed: every notification, newest first, paged by time' }),
    ApiOkResponse({ standardSchema: ActivityPageSchema }),
    __param(0, CurrentUser()),
    __param(1, Query(new ZodValidationPipe(ActivityQuerySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "activity", null);
__decorate([
    Get('preferences'),
    ApiOkResponse({ standardSchema: NotificationPreferencesSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "preferences", null);
__decorate([
    Put('preferences'),
    ApiOkResponse({ standardSchema: NotificationPreferencesSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(UpdateNotificationPreferencesSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "updatePreferences", null);
__decorate([
    Post('read-all'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAllRead", null);
__decorate([
    Post(':id/read'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Param('id', ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markRead", null);
NotificationsController = __decorate([
    ApiTags('notifications'),
    ApiCookieAuth(),
    AnyRole(),
    Controller('notifications'),
    __metadata("design:paramtypes", [NotificationsService])
], NotificationsController);
export { NotificationsController };
//# sourceMappingURL=notifications.controller.js.map