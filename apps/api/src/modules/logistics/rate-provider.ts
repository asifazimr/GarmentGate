import type {
  ContainerTypeValue,
  Currency,
  LogisticsModeValue,
  RateUnitValue,
} from '@garmentgate/shared';

export const RATE_PROVIDERS = Symbol('RATE_PROVIDERS');

export interface RateRequest {
  mode: LogisticsModeValue;
  originCountry: string;
  originPort: string | null;
  destinationCountry: string;
  destinationPort: string | null;
  weightGrams: number;
  volumeLitres: number;
  /** Preferred currency; providers may answer in another (quotes convert at the stored rate). */
  currency: Currency;
  /** Rates must be valid on this date. */
  shipDate: Date;
}

/** A partner's price for the cargo, before GarmentGate's margin. */
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

/**
 * Where freight prices (and later live tracking) come from. MANUAL reads the admin's rate
 * cards; courier aggregators or container-tracking APIs implement the same interface and are
 * registered in LogisticsModule, so quoting and margins don't change.
 */
export interface ShippingRateProvider {
  readonly id: string;
  enabled(): boolean;
  quote(request: RateRequest): Promise<RateOption[]>;
  /** Live tracking by carrier reference, where the provider offers it. */
  track?(reference: { carrier: string | null; trackingNumber: string }): Promise<TrackingUpdate[]>;
}
