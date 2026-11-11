import type { Job } from 'bullmq';
import { type SearchJob } from './search.constants.js';
import { SearchService } from './search.service.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
export declare class SearchProcessor extends MonitoredWorker {
    private readonly search;
    private readonly logger;
    constructor(search: SearchService);
    process(job: Job<SearchJob>): Promise<void>;
}
