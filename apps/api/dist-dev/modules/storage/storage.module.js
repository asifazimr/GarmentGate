var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesService, MALWARE_SCANNER } from './files.service.js';
import { ClamAvScanner } from './malware-scanner.js';
import { StorageService } from './storage.service.js';
let StorageModule = class StorageModule {
};
StorageModule = __decorate([
    Global(),
    Module({
        providers: [
            StorageService,
            FilesService,
            {
                provide: MALWARE_SCANNER,
                inject: [ConfigService],
                useFactory: (config) => {
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
], StorageModule);
export { StorageModule };
//# sourceMappingURL=storage.module.js.map