import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { PaymentMethod } from '@garmentgate/shared';
import type { Env } from '../../../config/env.schema.js';
import { money } from '../../orders/purchase-order.js';
import type {
  PaymentProvider,
  RefundInput,
  RefundResult,
  StartInput,
  StartResult,
} from './payment-provider.js';

/**
 * Bank transfer and letter of credit: the buyer sends money to GarmentGate's account quoting
 * the payment reference; staff confirm receipt with proof (statement, SWIFT copy, LC).
 */
@Injectable()
export class ManualProvider implements PaymentProvider {
  readonly id = 'manual' as const;
  readonly methods: readonly PaymentMethod[] = ['BANK_TRANSFER', 'LETTER_OF_CREDIT'];

  constructor(private readonly config: ConfigService<Env, true>) {}

  enabled(): boolean {
    return true;
  }

  bankLines(): string[] {
    return this.config
      .get('PLATFORM_BANK_DETAILS', { infer: true })
      .split('|')
      .map((l) => l.trim())
      .filter(Boolean);
  }

  start(input: StartInput): Promise<StartResult> {
    const amount = money(Number(input.amountMinor), input.currency);
    const instructions =
      input.method === 'LETTER_OF_CREDIT'
        ? [
            `Open an irrevocable letter of credit for ${amount} in favour of ${this.config.get('PLATFORM_LEGAL_NAME', { infer: true })}.`,
            ...this.bankLines(),
            `Quote reference ${input.reference} and order ${input.orderCode}.`,
            'Send the LC draft to GarmentGate in Messages before issuing it.',
          ]
        : [
            `Transfer ${amount} to:`,
            ...this.bankLines(),
            `Reference: ${input.reference} (required, so we can match your payment).`,
          ];
    return Promise.resolve({ providerRef: null, instructions, stripe: null });
  }

  refund(_input: RefundInput): Promise<RefundResult> {
    // Staff send the money back by bank transfer and record it.
    return Promise.resolve({ providerRef: null, confirmed: true });
  }
}
