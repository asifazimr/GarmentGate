var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { money } from '../../orders/purchase-order.js';
let ManualProvider = class ManualProvider {
    config;
    id = 'manual';
    methods = ['BANK_TRANSFER', 'LETTER_OF_CREDIT'];
    constructor(config) {
        this.config = config;
    }
    enabled() {
        return true;
    }
    bankLines() {
        return this.config
            .get('PLATFORM_BANK_DETAILS', { infer: true })
            .split('|')
            .map((l) => l.trim())
            .filter(Boolean);
    }
    start(input) {
        const amount = money(Number(input.amountMinor), input.currency);
        const instructions = input.method === 'LETTER_OF_CREDIT'
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
    refund(_input) {
        return Promise.resolve({ providerRef: null, confirmed: true });
    }
};
ManualProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], ManualProvider);
export { ManualProvider };
//# sourceMappingURL=manual.provider.js.map