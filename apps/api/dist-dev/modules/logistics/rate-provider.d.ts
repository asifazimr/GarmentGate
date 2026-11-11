import type { ContainerTypeValue, Currency, LogisticsModeValue, RateUnitValue } from '@garmentgate/shared';
export declare const RATE_PROVIDERS: unique symbol;
export interface RateRequest {
    mode: LogisticsModeValue;
    originCountry: string;
    originPort: string | null;
    destinationCountry: string;
    destinationPort: string | null;
    weightGrams: number;
    volumeLitres: number;
    currency: Currency;
    shipDate: Date;
}
export interface RateOption {
    provider: string;
    rateCardId: string | null;
    partnerId: string | null;
    mode: LogisticsModeValue;
    unit: RateUnitValue;
    containerType: ContainerTypeValue | null;
    chargeableMilliUnits: number;
    costMinor: bigint;
    currency: Currency;
    transitDaysMin: number;
    transitDaysMax: number;
}
export interface TrackingUpdate {
    occurredAt: Date;
    location: string | null;
    description: string;
}
export interface ShippingRateProvider {
    readonly id: string;
    enabled(): boolean;
    quote(request: RateRequest): Promise<RateOption[]>;
    track?(reference: {
        carrier: string | null;
        trackingNumber: string;
    }): Promise<TrackingUpdate[]>;
}
