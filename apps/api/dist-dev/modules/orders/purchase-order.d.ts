export interface PoParty {
    role: string;
    name: string;
    lines: string[];
}
export interface PurchaseOrderData {
    number: string;
    orderCode: string;
    issuedAt: Date;
    draft: boolean;
    buyer: PoParty;
    supplier: PoParty;
    shipTo: string[];
    description: string;
    specification: string | null;
    quantity: number;
    unitPriceMinor: number;
    currency: string;
    incoterm: string;
    requestedShipDate: Date | null;
    depositBps: number;
    paymentTerms: string;
    items: {
        color: string;
        size: string;
        quantity: number;
    }[];
    footer: string;
}
export declare function pdfSafe(text: string): string;
export declare function money(minor: number, currency: string): string;
export declare function postalAddress(c: {
    addressLine1: string | null;
    addressLine2: string | null;
    postalCode: string | null;
    city: string | null;
    country: string;
}): string[];
export declare function renderPurchaseOrder(po: PurchaseOrderData): Promise<Buffer>;
