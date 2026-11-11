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
import { Body, Controller, Delete, ForbiddenException, Get, Headers, HttpCode, HttpStatus, Post, Put, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCookieAuth, ApiExcludeEndpoint, ApiOkResponse, ApiOperation, ApiTags, } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AdminMessagingSchema, ConfirmPhoneSchema, MessagingSettingsSchema, MyMessagingSchema, SetTextChannelSchema, StartPhoneVerificationSchema, TestTextSchema, } from '@garmentgate/shared';
import { PhoneCodeThrottle } from '../../common/throttle/limits.js';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe.js';
import { AnyRole, CurrentUser, Public, Roles, } from '../auth/auth.decorators.js';
import { MessagingService } from './messaging.service.js';
import { twilioSignatureValid } from './text-provider.js';
let MyMessagingController = class MyMessagingController {
    messaging;
    constructor(messaging) {
        this.messaging = messaging;
    }
    mine(user) {
        return this.messaging.mine(user.id);
    }
    async start(user, dto) {
        await this.messaging.startVerification(user.id, dto);
    }
    confirm(user, dto) {
        return this.messaging.confirm(user.id, dto);
    }
    async remove(user) {
        await this.messaging.removePhone(user.id);
    }
    setChannel(user, dto) {
        return this.messaging.setChannel(user.id, dto);
    }
};
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: MyMessagingSchema }),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyMessagingController.prototype, "mine", null);
__decorate([
    Post('phone'),
    PhoneCodeThrottle(),
    ApiOperation({ summary: 'Text a verification code to a mobile number' }),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(StartPhoneVerificationSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MyMessagingController.prototype, "start", null);
__decorate([
    Post('phone/verify'),
    Throttle({ default: { limit: 10, ttl: 60_000 } }),
    ApiOkResponse({ standardSchema: MyMessagingSchema }),
    HttpCode(HttpStatus.OK),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(ConfirmPhoneSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MyMessagingController.prototype, "confirm", null);
__decorate([
    Delete('phone'),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MyMessagingController.prototype, "remove", null);
__decorate([
    Put('channel'),
    ApiOkResponse({ standardSchema: MyMessagingSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(SetTextChannelSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MyMessagingController.prototype, "setChannel", null);
MyMessagingController = __decorate([
    ApiTags('notifications'),
    ApiCookieAuth(),
    Controller('me/messaging'),
    AnyRole(),
    __metadata("design:paramtypes", [MessagingService])
], MyMessagingController);
export { MyMessagingController };
let TwilioWebhookController = class TwilioWebhookController {
    messaging;
    config;
    constructor(messaging, config) {
        this.messaging = messaging;
        this.config = config;
    }
    async status(body, signature) {
        const token = this.config.get('TWILIO_AUTH_TOKEN', { infer: true });
        const url = this.config.get('TWILIO_STATUS_CALLBACK_URL', { infer: true });
        const params = Object.fromEntries(Object.entries(body).filter((e) => typeof e[1] === 'string'));
        if (!token || !url || !signature || !twilioSignatureValid(token, url, params, signature))
            throw new ForbiddenException('Invalid signature');
        await this.messaging.receipt(params);
    }
};
__decorate([
    Post('status'),
    Public(),
    SkipThrottle(),
    ApiExcludeEndpoint(),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, Body()),
    __param(1, Headers('x-twilio-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TwilioWebhookController.prototype, "status", null);
TwilioWebhookController = __decorate([
    Controller('messaging/twilio'),
    __metadata("design:paramtypes", [MessagingService,
        ConfigService])
], TwilioWebhookController);
export { TwilioWebhookController };
let AdminMessagingController = class AdminMessagingController {
    messaging;
    constructor(messaging) {
        this.messaging = messaging;
    }
    overview() {
        return this.messaging.admin();
    }
    setSettings(user, dto) {
        return this.messaging.setSettings(user.id, dto);
    }
    async test(user, dto) {
        await this.messaging.test(user.id, dto);
    }
};
__decorate([
    Get(),
    ApiOkResponse({ standardSchema: AdminMessagingSchema }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminMessagingController.prototype, "overview", null);
__decorate([
    Put('settings'),
    ApiOkResponse({ standardSchema: MessagingSettingsSchema }),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(MessagingSettingsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminMessagingController.prototype, "setSettings", null);
__decorate([
    Post('test'),
    PhoneCodeThrottle(),
    ApiOperation({ summary: 'Send a test text' }),
    HttpCode(HttpStatus.NO_CONTENT),
    __param(0, CurrentUser()),
    __param(1, Body(new ZodValidationPipe(TestTextSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AdminMessagingController.prototype, "test", null);
AdminMessagingController = __decorate([
    ApiTags('admin'),
    ApiCookieAuth(),
    Controller('admin/messaging'),
    Roles('ADMIN'),
    __metadata("design:paramtypes", [MessagingService])
], AdminMessagingController);
export { AdminMessagingController };
//# sourceMappingURL=messaging.controller.js.map