import type { CapacityMonth } from '@garmentgate/shared';
export declare const CAPACITY_ORDER_STATUSES: readonly ["DEPOSIT_PENDING", "IN_PRODUCTION", "QC", "READY_TO_SHIP"];
export interface CapacityOverride {
    month: Date;
    availablePcs: number | null;
    externalBookedPcs: number;
    note: string | null;
}
export interface CapacityOrder {
    quantity: number;
    requestedShipDate: Date | null;
}
export declare function monthStart(month: string): Date;
export declare function monthKey(date: Date): string;
export declare function addMonths(month: string, n: number): string;
export declare function buildCalendar(input: {
    from: string;
    count: number;
    defaultCapacity: number | null;
    overrides: CapacityOverride[];
    orders: CapacityOrder[];
}): CapacityMonth[];
