var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ChatModule } from '../chat/chat.module.js';
import { PublicCodeService } from '../onboarding/public-code.service.js';
import { OrderHooks } from './order-hooks.js';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    Module({
        imports: [ChatModule],
        controllers: [OrdersController],
        providers: [OrdersService, OrderHooks, PublicCodeService],
        exports: [OrdersService, OrderHooks],
    })
], OrdersModule);
export { OrdersModule };
//# sourceMappingURL=orders.module.js.map