import { Module } from '@nestjs/common';
import { RfqModule } from '../rfq/rfq.module.js';
import { AdminMediaController } from './admin-media.controller.js';
import { CatalogController } from './catalog.controller.js';
import { CatalogService } from './catalog.service.js';

@Module({
  imports: [RfqModule],
  controllers: [CatalogController, AdminMediaController],
  providers: [CatalogService],
})
export class CatalogModule {}
