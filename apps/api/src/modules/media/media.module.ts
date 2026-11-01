import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { MEDIA_QUEUE } from './media.constants.js';
import { MediaProcessor } from './media.processor.js';
import { MediaService } from './media.service.js';

@Global()
@Module({
  imports: [BullModule.registerQueue({ name: MEDIA_QUEUE })],
  providers: [MediaService, MediaProcessor],
  exports: [MediaService],
})
export class MediaModule {}
