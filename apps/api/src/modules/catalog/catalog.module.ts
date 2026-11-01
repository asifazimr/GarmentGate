import { Module } from '@nestjs/common';
import { AdminMediaController } from './admin-media.controller.js';
import { CatalogController } from './catalog.controller.js';
import { CatalogService } from './catalog.service.js';

@Module({
  controllers: [CatalogController, AdminMediaController],
  providers: [CatalogService],
})
export class CatalogModule {}
