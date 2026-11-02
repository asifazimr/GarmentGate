import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatModule } from '../chat/chat.module.js';
import { OrdersModule } from '../orders/orders.module.js';
import { FxController } from './fx.controller.js';
import { FxService } from './fx.service.js';
import { LedgerService } from './ledger.service.js';
import { AdminFinanceController, PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { ManualProvider } from './providers/manual.provider.js';
import { STRIPE_CLIENT, StripeProvider, stripeClientFactory } from './providers/stripe.provider.js';

/** Escrow payments: providers (manual, Stripe), the double-entry ledger, releases, payouts, refunds. */
@Module({
  imports: [ChatModule, OrdersModule],
  controllers: [PaymentsController, AdminFinanceController, FxController],
  providers: [
    { provide: STRIPE_CLIENT, inject: [ConfigService], useFactory: stripeClientFactory },
    ManualProvider,
    StripeProvider,
    LedgerService,
    FxService,
    PaymentsService,
  ],
  exports: [PaymentsService, LedgerService, FxService],
})
export class PaymentsModule {}
