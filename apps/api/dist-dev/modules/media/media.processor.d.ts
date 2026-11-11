import { type Job } from 'bullmq';
import { PrismaService } from '../../prisma/prisma.service.js';
import { StorageService } from '../storage/storage.service.js';
import { type MediaJob } from './media.constants.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
export declare class MediaProcessor extends MonitoredWorker {
    private readonly prisma;
    private readonly storage;
    private readonly logger;
    constructor(prisma: PrismaService, storage: StorageService);
    process(job: Job<MediaJob>): Promise<void>;
}
