import type { EmailTemplateName, EmailTemplates } from '@garmentgate/emails';
import type { Queue } from 'bullmq';
export declare const MAIL_QUEUE = "mail";
export interface MailJob<K extends EmailTemplateName = EmailTemplateName> {
    template: K;
    to: string;
    props: EmailTemplates[K];
}
export declare class MailService {
    private readonly queue;
    private readonly logger;
    constructor(queue: Queue<MailJob>);
    send<K extends EmailTemplateName>(template: K, to: string, props: EmailTemplates[K]): Promise<void>;
}
