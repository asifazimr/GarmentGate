import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';
import { SEARCH_QUEUE, type SearchJob } from './search.constants.js';
import { SearchService } from './search.service.js';

@Processor(SEARCH_QUEUE, { concurrency: 1 })
export class SearchProcessor extends WorkerHost {
  private readonly logger = new Logger(SearchProcessor.name);

  constructor(private readonly search: SearchService) {
    super();
  }

  async process(job: Job<SearchJob>): Promise<void> {
    const data = job.data;
    if (data.kind === 'product') await this.search.indexer.syncProduct(data.id);
    else if (data.kind === 'manufacturer')
      await this.search.indexer.syncManufacturer(data.profileId);
    else {
      const counts = await this.search.indexer.reindexAll();
      this.logger.log(
        `Reindexed ${String(counts.products)} products and ${String(counts.manufacturers)} manufacturers`,
      );
    }
  }
}
