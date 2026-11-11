var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SearchProcessor_1;
import { Processor } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { SEARCH_QUEUE } from './search.constants.js';
import { SearchService } from './search.service.js';
import { MonitoredWorker } from '../../common/queue/monitored-worker.js';
let SearchProcessor = SearchProcessor_1 = class SearchProcessor extends MonitoredWorker {
    search;
    logger = new Logger(SearchProcessor_1.name);
    constructor(search) {
        super();
        this.search = search;
    }
    async process(job) {
        const data = job.data;
        if (data.kind === 'product')
            await this.search.indexer.syncProduct(data.id);
        else if (data.kind === 'manufacturer')
            await this.search.indexer.syncManufacturer(data.profileId);
        else {
            const counts = await this.search.indexer.reindexAll();
            this.logger.log(`Reindexed ${String(counts.products)} products and ${String(counts.manufacturers)} manufacturers`);
        }
    }
};
SearchProcessor = SearchProcessor_1 = __decorate([
    Processor(SEARCH_QUEUE, { concurrency: 1 }),
    __metadata("design:paramtypes", [SearchService])
], SearchProcessor);
export { SearchProcessor };
//# sourceMappingURL=search.processor.js.map