import type { Job } from 'bullmq';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
import { type TextJob } from '../notifications/texts.js';
import { MessagingService } from './messaging.service.js';
export declare class TextsProcessor extends MonitoredWorker {
    private readonly messaging;
    constructor(messaging: MessagingService);
    process(job: Job<TextJob>): Promise<void>;
}
