import { type FxRates } from '@garmentgate/shared';
import { FxService } from './fx.service.js';
export declare class FxController {
    private readonly fx;
    constructor(fx: FxService);
    rates(): Promise<FxRates>;
}
