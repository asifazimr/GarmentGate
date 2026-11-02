import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../../config/env.schema.js';
import { FilesService, MALWARE_SCANNER } from './files.service.js';
import { ClamAvScanner, type MalwareScanner } from './malware-scanner.js';
import { StorageService } from './storage.service.js';

@Global()
@Module({
  providers: [
    StorageService,
    FilesService,
    {
      provide: MALWARE_SCANNER,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>): MalwareScanner | null => {
        const host = config.get('CLAMAV_HOST', { infer: true });
        if (!host) {
          new Logger('Storage').warn('CLAMAV_HOST not set: uploads are not scanned for malware');
          return null;
        }
        return new ClamAvScanner(host, config.get('CLAMAV_PORT', { infer: true }));
      },
    },
  ],
  exports: [StorageService, FilesService],
})
export class StorageModule {}
