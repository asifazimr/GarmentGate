import { type PoParty } from '../orders/purchase-order.js';
export interface DocumentTable {
    headers: string[];
    widths: number[];
    rows: string[][];
    totals?: string[];
}
export interface DocumentData {
    title: string;
    number: string;
    issuedAt: Date;
    references: string[];
    parties: PoParty[];
    details: [string, string][];
    table?: DocumentTable;
    notes: string[];
}
export declare function renderLogisticsDocument(d: DocumentData): Promise<Buffer>;
export interface CartonMarkingData {
    reference: string;
    referenceLabel?: 'ORDER' | 'SHIPMENT';
    heading?: string;
    hub: {
        code: string;
        name: string;
        lines: string[];
    };
    cartons: number;
    piecesPerCarton: number | null;
    grossWeightGramsPerCarton: number | null;
    originCountry: string;
}
export declare function renderCartonMarkings(d: CartonMarkingData): Promise<Buffer>;
export interface ShippingLabelData {
    shipmentCode: string;
    shipper: PoParty;
    consignee: PoParty;
    destination: string;
    mode: string;
    cartons: number;
    grossWeightGrams: number;
    originHub: string | null;
}
export declare function renderShippingLabel(d: ShippingLabelData): Promise<Buffer>;
export declare const countryName: (code: string) => string;
