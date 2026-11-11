import { ConfigService } from '@nestjs/config';
import type { PaymentMethod } from '@garmentgate/shared';
import type { Env } from '../../../config/env.schema.js';
import type { PaymentProvider, RefundInput, RefundResult, StartInput, StartResult } from './payment-provider.js';
export declare class ManualProvider implements PaymentProvider {
    private readonly config;
    readonly id: "manual";
    readonly methods: readonly PaymentMethod[];
    constructor(config: ConfigService<Env, true>);
    enabled(): boolean;
    bankLines(): string[];
    start(input: StartInput): Promise<StartResult>;
    refund(_input: RefundInput): Promise<RefundResult>;
}
