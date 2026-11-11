var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { SEARCH_QUEUE } from './search.constants.js';
import { SearchProcessor } from './search.processor.js';
import { SearchService } from './search.service.js';
let SearchModule = class SearchModule {
};
SearchModule = __decorate([
    Global(),
    Module({
        imports: [BullModule.registerQueue({ name: SEARCH_QUEUE })],
        providers: [SearchService, SearchProcessor],
        exports: [SearchService],
    })
], SearchModule);
export { SearchModule };
//# sourceMappingURL=search.module.js.map