import type { MatchReason } from '@garmentgate/shared';
export interface MatchableFactory {
    categories: {
        id: string;
        parentId: string | null;
    }[];
    moqPcs: number | null;
    monthlyCapacityPcs: number | null;
}
export interface MatchableRfq {
    category: {
        id: string;
        parentId: string | null;
    };
    quantity: number;
    deadline: Date;
    requiredDeliveryDate: Date | null;
    invited: boolean;
    inviteOnly: boolean;
}
export declare const DEFAULT_WINDOW_DAYS = 90;
export declare function matchRfq(factory: MatchableFactory, rfq: MatchableRfq): {
    matched: boolean;
    reasons: MatchReason[];
};
