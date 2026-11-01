import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { SEARCH_QUEUE } from './search.constants.js';
import { SearchProcessor } from './search.processor.js';
import { SearchService } from './search.service.js';

@Global()
@Module({
  imports: [BullModule.registerQueue({ name: SEARCH_QUEUE })],
  providers: [SearchService, SearchProcessor],
  exports: [SearchService],
})
export class SearchModule {}
