import { type AdminMessaging, type ConfirmPhoneDto, type MessagingSettings, type MyMessaging, type SetTextChannelDto, type StartPhoneVerificationDto, type TestTextDto } from '@garmentgate/shared';
import type { OutboundMessageStatus } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { AuditService } from '../audit/audit.service.js';
import { type TextJob } from '../notifications/texts.js';
import { type TextProvider } from './text-provider.js';
export declare class MessagingService {
    private readonly prisma;
    private readonly audit;
    private readonly provider;
    private readonly logger;
    constructor(prisma: PrismaService, audit: AuditService, provider: TextProvider);
    settings(): Promise<MessagingSettings>;
    setSettings(adminId: string, s: MessagingSettings): Promise<MessagingSettings>;
    mine(userId: string): Promise<MyMessaging>;
    startVerification(userId: string, dto: StartPhoneVerificationDto): Promise<void>;
    confirm(userId: string, dto: ConfirmPhoneDto): Promise<MyMessaging>;
    setChannel(userId: string, dto: SetTextChannelDto): Promise<MyMessaging>;
    removePhone(userId: string): Promise<void>;
    deliver(job: TextJob): Promise<OutboundMessageStatus>;
    receipt(params: Record<string, string>): Promise<void>;
    admin(): Promise<AdminMessaging>;
    test(adminId: string, dto: TestTextDto): Promise<void>;
}
