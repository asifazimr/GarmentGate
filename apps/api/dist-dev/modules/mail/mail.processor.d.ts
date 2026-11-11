import type { Job } from 'bullmq';
import { type MailJob } from './mail.service.js';
import { MailTransport } from './mail.transport.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
export declare class MailProcessor extends MonitoredWorker {
    private readonly transport;
    private readonly logger;
    constructor(transport: MailTransport);
    process(job: Job<MailJob>): Promise<void>;
}
