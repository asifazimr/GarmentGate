import { ConfigService } from '@nestjs/config';
import { type AdminMessaging, type ConfirmPhoneDto, type MessagingSettings, type MyMessaging, type SetTextChannelDto, type StartPhoneVerificationDto, type TestTextDto } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import { type AuthenticatedUser } from '../auth/auth.decorators.js';
import { MessagingService } from './messaging.service.js';
export declare class MyMessagingController {
    private readonly messaging;
    constructor(messaging: MessagingService);
    mine(user: AuthenticatedUser): Promise<MyMessaging>;
    start(user: AuthenticatedUser, dto: StartPhoneVerificationDto): Promise<void>;
    confirm(user: AuthenticatedUser, dto: ConfirmPhoneDto): Promise<MyMessaging>;
    remove(user: AuthenticatedUser): Promise<void>;
    setChannel(user: AuthenticatedUser, dto: SetTextChannelDto): Promise<MyMessaging>;
}
export declare class TwilioWebhookController {
    private readonly messaging;
    private readonly config;
    constructor(messaging: MessagingService, config: ConfigService<Env, true>);
    status(body: Record<string, unknown>, signature: string | undefined): Promise<void>;
}
export declare class AdminMessagingController {
    private readonly messaging;
    constructor(messaging: MessagingService);
    overview(): Promise<AdminMessaging>;
    setSettings(user: AuthenticatedUser, dto: MessagingSettings): Promise<MessagingSettings>;
    test(user: AuthenticatedUser, dto: TestTextDto): Promise<void>;
}
