var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatModule } from '../chat/chat.module.js';
import { OrdersModule } from '../orders/orders.module.js';
import { FxController } from './fx.controller.js';
import { FxService } from './fx.service.js';
import { LedgerService } from './ledger.service.js';
import { AdminFinanceController, PaymentsController } from './payments.controller.js';
import { BankAccountsService } from './bank-accounts.service.js';
import { PaymentsService } from './payments.service.js';
import { ManualProvider } from './providers/manual.provider.js';
import { StripeEvents } from './stripe-events.js';
import { STRIPE_CLIENT, StripeProvider, stripeClientFactory } from './providers/stripe.provider.js';
let PaymentsModule = class PaymentsModule {
};
PaymentsModule = __decorate([
    Module({
        imports: [ChatModule, OrdersModule],
        controllers: [PaymentsController, AdminFinanceController, FxController],
        providers: [
            { provide: STRIPE_CLIENT, inject: [ConfigService], useFactory: stripeClientFactory },
            ManualProvider,
            StripeProvider,
            LedgerService,
            FxService,
            PaymentsService,
            BankAccountsService,
            StripeEvents,
        ],
        exports: [
            PaymentsService,
            LedgerService,
            FxService,
            BankAccountsService,
            StripeEvents,
            StripeProvider,
            STRIPE_CLIENT,
        ],
    })
], PaymentsModule);
export { PaymentsModule };
//# sourceMappingURL=payments.module.js.map