import { ConfigService } from '@nestjs/config';
import { type NotificationLink, type NotificationType } from '@garmentgate/shared';
import type { Env } from '../../config/env.schema.js';
import { PrismaService } from '../../prisma/prisma.service.js';
import { MailService } from '../mail/mail.service.js';
import { RealtimeService } from './realtime.service.js';
import { type TextJob } from './texts.js';
import type { Queue } from 'bullmq';
export type Audience = {
    userIds: string[];
} | {
    companyId: string;
} | {
    manufacturerProfileId: string;
} | 'ADMINS';
export interface NotifyInput {
    to: Audience | Audience[];
    type: NotificationType;
    title: string;
    body: string;
    link?: NotificationLink;
    email?: boolean;
}
export declare class Notifier {
    private readonly prisma;
    private readonly realtime;
    private readonly mail;
    private readonly config;
    private readonly texts;
    private readonly logger;
    constructor(prisma: PrismaService, realtime: RealtimeService, mail: MailService, config: ConfigService<Env, true>, texts: Queue<TextJob>);
    notify(input: NotifyInput): Promise<void>;
    private deliver;
}
