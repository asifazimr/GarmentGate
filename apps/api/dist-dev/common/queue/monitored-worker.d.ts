import { WorkerHost } from '@nestjs/bullmq';
import type { Job } from 'bullmq';
export declare abstract class MonitoredWorker extends WorkerHost {
    onFailed(job: Job | undefined, error: Error): void;
}
