import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly Session: "Session";
    readonly UserToken: "UserToken";
    readonly CodeSequence: "CodeSequence";
    readonly Company: "Company";
    readonly CompanyDocument: "CompanyDocument";
    readonly BuyerProfile: "BuyerProfile";
    readonly ManufacturerProfile: "ManufacturerProfile";
    readonly Category: "Category";
    readonly Certification: "Certification";
    readonly Product: "Product";
    readonly ProductPriceTier: "ProductPriceTier";
    readonly ProductImage: "ProductImage";
    readonly FactoryPhoto: "FactoryPhoto";
    readonly CapacityMonth: "CapacityMonth";
    readonly Rfq: "Rfq";
    readonly RfqInvitation: "RfqInvitation";
    readonly RfqAttachment: "RfqAttachment";
    readonly Quote: "Quote";
    readonly MarginRule: "MarginRule";
    readonly Conversation: "Conversation";
    readonly ConversationParticipant: "ConversationParticipant";
    readonly Message: "Message";
    readonly MessageAttachment: "MessageAttachment";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly OrderMilestone: "OrderMilestone";
    readonly MilestonePhoto: "MilestonePhoto";
    readonly Sample: "Sample";
    readonly Payment: "Payment";
    readonly LedgerAccount: "LedgerAccount";
    readonly LedgerTransaction: "LedgerTransaction";
    readonly EscrowLedgerEntry: "EscrowLedgerEntry";
    readonly Inspection: "Inspection";
    readonly InspectionPhoto: "InspectionPhoto";
    readonly Review: "Review";
    readonly Dispute: "Dispute";
    readonly DisputeEvidence: "DisputeEvidence";
    readonly Notification: "Notification";
    readonly NotificationPreference: "NotificationPreference";
    readonly AuditLog: "AuditLog";
    readonly FileAsset: "FileAsset";
    readonly ImageRendition: "ImageRendition";
    readonly Shortlist: "Shortlist";
    readonly ShortlistItem: "ShortlistItem";
    readonly AccountWarning: "AccountWarning";
    readonly OrderEvent: "OrderEvent";
    readonly SamplePhoto: "SamplePhoto";
    readonly OrderRelease: "OrderRelease";
    readonly ExchangeRate: "ExchangeRate";
    readonly PlatformSetting: "PlatformSetting";
    readonly ProductionLine: "ProductionLine";
    readonly CapacitySlot: "CapacitySlot";
    readonly SupplierClaim: "SupplierClaim";
    readonly CapacityBooking: "CapacityBooking";
    readonly CapacityBookingAllocation: "CapacityBookingAllocation";
    readonly CapacityPartnership: "CapacityPartnership";
    readonly LogisticsPartner: "LogisticsPartner";
    readonly Hub: "Hub";
    readonly RateCard: "RateCard";
    readonly LogisticsMarginRule: "LogisticsMarginRule";
    readonly DutyRate: "DutyRate";
    readonly LogisticsQuote: "LogisticsQuote";
    readonly OrderPacking: "OrderPacking";
    readonly PickupRequest: "PickupRequest";
    readonly HubReceipt: "HubReceipt";
    readonly HubReceiptPhoto: "HubReceiptPhoto";
    readonly Consolidation: "Consolidation";
    readonly LogisticsShipment: "LogisticsShipment";
    readonly LogisticsShipmentOrder: "LogisticsShipmentOrder";
    readonly ShipmentLeg: "ShipmentLeg";
    readonly ShipmentEvent: "ShipmentEvent";
    readonly LogisticsDocument: "LogisticsDocument";
    readonly ShipmentUpload: "ShipmentUpload";
    readonly LogisticsClaim: "LogisticsClaim";
    readonly OrderCharge: "OrderCharge";
    readonly OrderFactoryChange: "OrderFactoryChange";
    readonly FactoryBankAccount: "FactoryBankAccount";
    readonly SupplyContract: "SupplyContract";
    readonly InspectorApplication: "InspectorApplication";
    readonly InspectorProfile: "InspectorProfile";
    readonly PlanSubscription: "PlanSubscription";
    readonly PlanInvoice: "PlanInvoice";
    readonly OutboundMessage: "OutboundMessage";
    readonly Lead: "Lead";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "session" | "userToken" | "codeSequence" | "company" | "companyDocument" | "buyerProfile" | "manufacturerProfile" | "category" | "certification" | "product" | "productPriceTier" | "productImage" | "factoryPhoto" | "capacityMonth" | "rfq" | "rfqInvitation" | "rfqAttachment" | "quote" | "marginRule" | "conversation" | "conversationParticipant" | "message" | "messageAttachment" | "order" | "orderItem" | "orderMilestone" | "milestonePhoto" | "sample" | "payment" | "ledgerAccount" | "ledgerTransaction" | "escrowLedgerEntry" | "inspection" | "inspectionPhoto" | "review" | "dispute" | "disputeEvidence" | "notification" | "notificationPreference" | "auditLog" | "fileAsset" | "imageRendition" | "shortlist" | "shortlistItem" | "accountWarning" | "orderEvent" | "samplePhoto" | "orderRelease" | "exchangeRate" | "platformSetting" | "productionLine" | "capacitySlot" | "supplierClaim" | "capacityBooking" | "capacityBookingAllocation" | "capacityPartnership" | "logisticsPartner" | "hub" | "rateCard" | "logisticsMarginRule" | "dutyRate" | "logisticsQuote" | "orderPacking" | "pickupRequest" | "hubReceipt" | "hubReceiptPhoto" | "consolidation" | "logisticsShipment" | "logisticsShipmentOrder" | "shipmentLeg" | "shipmentEvent" | "logisticsDocument" | "shipmentUpload" | "logisticsClaim" | "orderCharge" | "orderFactoryChange" | "factoryBankAccount" | "supplyContract" | "inspectorApplication" | "inspectorProfile" | "planSubscription" | "planInvoice" | "outboundMessage" | "lead";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Session: {
            payload: Prisma.$SessionPayload<ExtArgs>;
            fields: Prisma.SessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findFirst: {
                    args: Prisma.SessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                findMany: {
                    args: Prisma.SessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                create: {
                    args: Prisma.SessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                createMany: {
                    args: Prisma.SessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                delete: {
                    args: Prisma.SessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                update: {
                    args: Prisma.SessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                deleteMany: {
                    args: Prisma.SessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>[];
                };
                upsert: {
                    args: Prisma.SessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionPayload>;
                };
                aggregate: {
                    args: Prisma.SessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSession>;
                };
                groupBy: {
                    args: Prisma.SessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionCountAggregateOutputType> | number;
                };
            };
        };
        UserToken: {
            payload: Prisma.$UserTokenPayload<ExtArgs>;
            fields: Prisma.UserTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload>;
                };
                findFirst: {
                    args: Prisma.UserTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload>;
                };
                findMany: {
                    args: Prisma.UserTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload>[];
                };
                create: {
                    args: Prisma.UserTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload>;
                };
                createMany: {
                    args: Prisma.UserTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload>[];
                };
                delete: {
                    args: Prisma.UserTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload>;
                };
                update: {
                    args: Prisma.UserTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.UserTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload>[];
                };
                upsert: {
                    args: Prisma.UserTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserTokenPayload>;
                };
                aggregate: {
                    args: Prisma.UserTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserToken>;
                };
                groupBy: {
                    args: Prisma.UserTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserTokenCountAggregateOutputType> | number;
                };
            };
        };
        CodeSequence: {
            payload: Prisma.$CodeSequencePayload<ExtArgs>;
            fields: Prisma.CodeSequenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CodeSequenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CodeSequenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload>;
                };
                findFirst: {
                    args: Prisma.CodeSequenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CodeSequenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload>;
                };
                findMany: {
                    args: Prisma.CodeSequenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload>[];
                };
                create: {
                    args: Prisma.CodeSequenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload>;
                };
                createMany: {
                    args: Prisma.CodeSequenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CodeSequenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload>[];
                };
                delete: {
                    args: Prisma.CodeSequenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload>;
                };
                update: {
                    args: Prisma.CodeSequenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload>;
                };
                deleteMany: {
                    args: Prisma.CodeSequenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CodeSequenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CodeSequenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload>[];
                };
                upsert: {
                    args: Prisma.CodeSequenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CodeSequencePayload>;
                };
                aggregate: {
                    args: Prisma.CodeSequenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCodeSequence>;
                };
                groupBy: {
                    args: Prisma.CodeSequenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CodeSequenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CodeSequenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CodeSequenceCountAggregateOutputType> | number;
                };
            };
        };
        Company: {
            payload: Prisma.$CompanyPayload<ExtArgs>;
            fields: Prisma.CompanyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CompanyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CompanyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                findFirst: {
                    args: Prisma.CompanyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CompanyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                findMany: {
                    args: Prisma.CompanyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>[];
                };
                create: {
                    args: Prisma.CompanyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                createMany: {
                    args: Prisma.CompanyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CompanyCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>[];
                };
                delete: {
                    args: Prisma.CompanyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                update: {
                    args: Prisma.CompanyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                deleteMany: {
                    args: Prisma.CompanyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CompanyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CompanyUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>[];
                };
                upsert: {
                    args: Prisma.CompanyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyPayload>;
                };
                aggregate: {
                    args: Prisma.CompanyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCompany>;
                };
                groupBy: {
                    args: Prisma.CompanyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompanyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CompanyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompanyCountAggregateOutputType> | number;
                };
            };
        };
        CompanyDocument: {
            payload: Prisma.$CompanyDocumentPayload<ExtArgs>;
            fields: Prisma.CompanyDocumentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CompanyDocumentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CompanyDocumentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload>;
                };
                findFirst: {
                    args: Prisma.CompanyDocumentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CompanyDocumentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload>;
                };
                findMany: {
                    args: Prisma.CompanyDocumentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload>[];
                };
                create: {
                    args: Prisma.CompanyDocumentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload>;
                };
                createMany: {
                    args: Prisma.CompanyDocumentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CompanyDocumentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload>[];
                };
                delete: {
                    args: Prisma.CompanyDocumentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload>;
                };
                update: {
                    args: Prisma.CompanyDocumentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload>;
                };
                deleteMany: {
                    args: Prisma.CompanyDocumentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CompanyDocumentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CompanyDocumentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload>[];
                };
                upsert: {
                    args: Prisma.CompanyDocumentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CompanyDocumentPayload>;
                };
                aggregate: {
                    args: Prisma.CompanyDocumentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCompanyDocument>;
                };
                groupBy: {
                    args: Prisma.CompanyDocumentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompanyDocumentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CompanyDocumentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CompanyDocumentCountAggregateOutputType> | number;
                };
            };
        };
        BuyerProfile: {
            payload: Prisma.$BuyerProfilePayload<ExtArgs>;
            fields: Prisma.BuyerProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BuyerProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BuyerProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                findFirst: {
                    args: Prisma.BuyerProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BuyerProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                findMany: {
                    args: Prisma.BuyerProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>[];
                };
                create: {
                    args: Prisma.BuyerProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                createMany: {
                    args: Prisma.BuyerProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BuyerProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>[];
                };
                delete: {
                    args: Prisma.BuyerProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                update: {
                    args: Prisma.BuyerProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.BuyerProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BuyerProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BuyerProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>[];
                };
                upsert: {
                    args: Prisma.BuyerProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BuyerProfilePayload>;
                };
                aggregate: {
                    args: Prisma.BuyerProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBuyerProfile>;
                };
                groupBy: {
                    args: Prisma.BuyerProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BuyerProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BuyerProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BuyerProfileCountAggregateOutputType> | number;
                };
            };
        };
        ManufacturerProfile: {
            payload: Prisma.$ManufacturerProfilePayload<ExtArgs>;
            fields: Prisma.ManufacturerProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ManufacturerProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ManufacturerProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload>;
                };
                findFirst: {
                    args: Prisma.ManufacturerProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ManufacturerProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload>;
                };
                findMany: {
                    args: Prisma.ManufacturerProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload>[];
                };
                create: {
                    args: Prisma.ManufacturerProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload>;
                };
                createMany: {
                    args: Prisma.ManufacturerProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ManufacturerProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload>[];
                };
                delete: {
                    args: Prisma.ManufacturerProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload>;
                };
                update: {
                    args: Prisma.ManufacturerProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.ManufacturerProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ManufacturerProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ManufacturerProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload>[];
                };
                upsert: {
                    args: Prisma.ManufacturerProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ManufacturerProfilePayload>;
                };
                aggregate: {
                    args: Prisma.ManufacturerProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateManufacturerProfile>;
                };
                groupBy: {
                    args: Prisma.ManufacturerProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ManufacturerProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ManufacturerProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ManufacturerProfileCountAggregateOutputType> | number;
                };
            };
        };
        Category: {
            payload: Prisma.$CategoryPayload<ExtArgs>;
            fields: Prisma.CategoryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CategoryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findFirst: {
                    args: Prisma.CategoryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                findMany: {
                    args: Prisma.CategoryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                create: {
                    args: Prisma.CategoryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                createMany: {
                    args: Prisma.CategoryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                delete: {
                    args: Prisma.CategoryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                update: {
                    args: Prisma.CategoryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                deleteMany: {
                    args: Prisma.CategoryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CategoryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>[];
                };
                upsert: {
                    args: Prisma.CategoryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CategoryPayload>;
                };
                aggregate: {
                    args: Prisma.CategoryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCategory>;
                };
                groupBy: {
                    args: Prisma.CategoryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CategoryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CategoryCountAggregateOutputType> | number;
                };
            };
        };
        Certification: {
            payload: Prisma.$CertificationPayload<ExtArgs>;
            fields: Prisma.CertificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CertificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CertificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload>;
                };
                findFirst: {
                    args: Prisma.CertificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CertificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload>;
                };
                findMany: {
                    args: Prisma.CertificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload>[];
                };
                create: {
                    args: Prisma.CertificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload>;
                };
                createMany: {
                    args: Prisma.CertificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CertificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload>[];
                };
                delete: {
                    args: Prisma.CertificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload>;
                };
                update: {
                    args: Prisma.CertificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload>;
                };
                deleteMany: {
                    args: Prisma.CertificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CertificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CertificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload>[];
                };
                upsert: {
                    args: Prisma.CertificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CertificationPayload>;
                };
                aggregate: {
                    args: Prisma.CertificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCertification>;
                };
                groupBy: {
                    args: Prisma.CertificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CertificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CertificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CertificationCountAggregateOutputType> | number;
                };
            };
        };
        Product: {
            payload: Prisma.$ProductPayload<ExtArgs>;
            fields: Prisma.ProductFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findFirst: {
                    args: Prisma.ProductFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                findMany: {
                    args: Prisma.ProductFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                create: {
                    args: Prisma.ProductCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                createMany: {
                    args: Prisma.ProductCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                delete: {
                    args: Prisma.ProductDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                update: {
                    args: Prisma.ProductUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>[];
                };
                upsert: {
                    args: Prisma.ProductUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPayload>;
                };
                aggregate: {
                    args: Prisma.ProductAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProduct>;
                };
                groupBy: {
                    args: Prisma.ProductGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductCountAggregateOutputType> | number;
                };
            };
        };
        ProductPriceTier: {
            payload: Prisma.$ProductPriceTierPayload<ExtArgs>;
            fields: Prisma.ProductPriceTierFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductPriceTierFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductPriceTierFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload>;
                };
                findFirst: {
                    args: Prisma.ProductPriceTierFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductPriceTierFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload>;
                };
                findMany: {
                    args: Prisma.ProductPriceTierFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload>[];
                };
                create: {
                    args: Prisma.ProductPriceTierCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload>;
                };
                createMany: {
                    args: Prisma.ProductPriceTierCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductPriceTierCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload>[];
                };
                delete: {
                    args: Prisma.ProductPriceTierDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload>;
                };
                update: {
                    args: Prisma.ProductPriceTierUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload>;
                };
                deleteMany: {
                    args: Prisma.ProductPriceTierDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductPriceTierUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductPriceTierUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload>[];
                };
                upsert: {
                    args: Prisma.ProductPriceTierUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductPriceTierPayload>;
                };
                aggregate: {
                    args: Prisma.ProductPriceTierAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductPriceTier>;
                };
                groupBy: {
                    args: Prisma.ProductPriceTierGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductPriceTierGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductPriceTierCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductPriceTierCountAggregateOutputType> | number;
                };
            };
        };
        ProductImage: {
            payload: Prisma.$ProductImagePayload<ExtArgs>;
            fields: Prisma.ProductImageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductImageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductImageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                findFirst: {
                    args: Prisma.ProductImageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductImageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                findMany: {
                    args: Prisma.ProductImageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
                };
                create: {
                    args: Prisma.ProductImageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                createMany: {
                    args: Prisma.ProductImageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductImageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
                };
                delete: {
                    args: Prisma.ProductImageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                update: {
                    args: Prisma.ProductImageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                deleteMany: {
                    args: Prisma.ProductImageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductImageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductImageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>[];
                };
                upsert: {
                    args: Prisma.ProductImageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductImagePayload>;
                };
                aggregate: {
                    args: Prisma.ProductImageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductImage>;
                };
                groupBy: {
                    args: Prisma.ProductImageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductImageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductImageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductImageCountAggregateOutputType> | number;
                };
            };
        };
        FactoryPhoto: {
            payload: Prisma.$FactoryPhotoPayload<ExtArgs>;
            fields: Prisma.FactoryPhotoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FactoryPhotoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FactoryPhotoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload>;
                };
                findFirst: {
                    args: Prisma.FactoryPhotoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FactoryPhotoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload>;
                };
                findMany: {
                    args: Prisma.FactoryPhotoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload>[];
                };
                create: {
                    args: Prisma.FactoryPhotoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload>;
                };
                createMany: {
                    args: Prisma.FactoryPhotoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FactoryPhotoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload>[];
                };
                delete: {
                    args: Prisma.FactoryPhotoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload>;
                };
                update: {
                    args: Prisma.FactoryPhotoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload>;
                };
                deleteMany: {
                    args: Prisma.FactoryPhotoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FactoryPhotoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FactoryPhotoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload>[];
                };
                upsert: {
                    args: Prisma.FactoryPhotoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryPhotoPayload>;
                };
                aggregate: {
                    args: Prisma.FactoryPhotoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFactoryPhoto>;
                };
                groupBy: {
                    args: Prisma.FactoryPhotoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FactoryPhotoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FactoryPhotoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FactoryPhotoCountAggregateOutputType> | number;
                };
            };
        };
        CapacityMonth: {
            payload: Prisma.$CapacityMonthPayload<ExtArgs>;
            fields: Prisma.CapacityMonthFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CapacityMonthFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CapacityMonthFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload>;
                };
                findFirst: {
                    args: Prisma.CapacityMonthFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CapacityMonthFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload>;
                };
                findMany: {
                    args: Prisma.CapacityMonthFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload>[];
                };
                create: {
                    args: Prisma.CapacityMonthCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload>;
                };
                createMany: {
                    args: Prisma.CapacityMonthCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CapacityMonthCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload>[];
                };
                delete: {
                    args: Prisma.CapacityMonthDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload>;
                };
                update: {
                    args: Prisma.CapacityMonthUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload>;
                };
                deleteMany: {
                    args: Prisma.CapacityMonthDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CapacityMonthUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CapacityMonthUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload>[];
                };
                upsert: {
                    args: Prisma.CapacityMonthUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityMonthPayload>;
                };
                aggregate: {
                    args: Prisma.CapacityMonthAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCapacityMonth>;
                };
                groupBy: {
                    args: Prisma.CapacityMonthGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CapacityMonthGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CapacityMonthCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CapacityMonthCountAggregateOutputType> | number;
                };
            };
        };
        Rfq: {
            payload: Prisma.$RfqPayload<ExtArgs>;
            fields: Prisma.RfqFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RfqFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RfqFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                findFirst: {
                    args: Prisma.RfqFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RfqFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                findMany: {
                    args: Prisma.RfqFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>[];
                };
                create: {
                    args: Prisma.RfqCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                createMany: {
                    args: Prisma.RfqCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RfqCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>[];
                };
                delete: {
                    args: Prisma.RfqDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                update: {
                    args: Prisma.RfqUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                deleteMany: {
                    args: Prisma.RfqDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RfqUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RfqUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>[];
                };
                upsert: {
                    args: Prisma.RfqUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqPayload>;
                };
                aggregate: {
                    args: Prisma.RfqAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRfq>;
                };
                groupBy: {
                    args: Prisma.RfqGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RfqCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqCountAggregateOutputType> | number;
                };
            };
        };
        RfqInvitation: {
            payload: Prisma.$RfqInvitationPayload<ExtArgs>;
            fields: Prisma.RfqInvitationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RfqInvitationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RfqInvitationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload>;
                };
                findFirst: {
                    args: Prisma.RfqInvitationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RfqInvitationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload>;
                };
                findMany: {
                    args: Prisma.RfqInvitationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload>[];
                };
                create: {
                    args: Prisma.RfqInvitationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload>;
                };
                createMany: {
                    args: Prisma.RfqInvitationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RfqInvitationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload>[];
                };
                delete: {
                    args: Prisma.RfqInvitationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload>;
                };
                update: {
                    args: Prisma.RfqInvitationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload>;
                };
                deleteMany: {
                    args: Prisma.RfqInvitationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RfqInvitationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RfqInvitationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload>[];
                };
                upsert: {
                    args: Prisma.RfqInvitationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqInvitationPayload>;
                };
                aggregate: {
                    args: Prisma.RfqInvitationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRfqInvitation>;
                };
                groupBy: {
                    args: Prisma.RfqInvitationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqInvitationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RfqInvitationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqInvitationCountAggregateOutputType> | number;
                };
            };
        };
        RfqAttachment: {
            payload: Prisma.$RfqAttachmentPayload<ExtArgs>;
            fields: Prisma.RfqAttachmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RfqAttachmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RfqAttachmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload>;
                };
                findFirst: {
                    args: Prisma.RfqAttachmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RfqAttachmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload>;
                };
                findMany: {
                    args: Prisma.RfqAttachmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload>[];
                };
                create: {
                    args: Prisma.RfqAttachmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload>;
                };
                createMany: {
                    args: Prisma.RfqAttachmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RfqAttachmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload>[];
                };
                delete: {
                    args: Prisma.RfqAttachmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload>;
                };
                update: {
                    args: Prisma.RfqAttachmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload>;
                };
                deleteMany: {
                    args: Prisma.RfqAttachmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RfqAttachmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RfqAttachmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload>[];
                };
                upsert: {
                    args: Prisma.RfqAttachmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RfqAttachmentPayload>;
                };
                aggregate: {
                    args: Prisma.RfqAttachmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRfqAttachment>;
                };
                groupBy: {
                    args: Prisma.RfqAttachmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqAttachmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RfqAttachmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RfqAttachmentCountAggregateOutputType> | number;
                };
            };
        };
        Quote: {
            payload: Prisma.$QuotePayload<ExtArgs>;
            fields: Prisma.QuoteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QuoteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QuoteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload>;
                };
                findFirst: {
                    args: Prisma.QuoteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QuoteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload>;
                };
                findMany: {
                    args: Prisma.QuoteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload>[];
                };
                create: {
                    args: Prisma.QuoteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload>;
                };
                createMany: {
                    args: Prisma.QuoteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QuoteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload>[];
                };
                delete: {
                    args: Prisma.QuoteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload>;
                };
                update: {
                    args: Prisma.QuoteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload>;
                };
                deleteMany: {
                    args: Prisma.QuoteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QuoteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QuoteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload>[];
                };
                upsert: {
                    args: Prisma.QuoteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QuotePayload>;
                };
                aggregate: {
                    args: Prisma.QuoteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQuote>;
                };
                groupBy: {
                    args: Prisma.QuoteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuoteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QuoteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QuoteCountAggregateOutputType> | number;
                };
            };
        };
        MarginRule: {
            payload: Prisma.$MarginRulePayload<ExtArgs>;
            fields: Prisma.MarginRuleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MarginRuleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MarginRuleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload>;
                };
                findFirst: {
                    args: Prisma.MarginRuleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MarginRuleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload>;
                };
                findMany: {
                    args: Prisma.MarginRuleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload>[];
                };
                create: {
                    args: Prisma.MarginRuleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload>;
                };
                createMany: {
                    args: Prisma.MarginRuleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MarginRuleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload>[];
                };
                delete: {
                    args: Prisma.MarginRuleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload>;
                };
                update: {
                    args: Prisma.MarginRuleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload>;
                };
                deleteMany: {
                    args: Prisma.MarginRuleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MarginRuleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MarginRuleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload>[];
                };
                upsert: {
                    args: Prisma.MarginRuleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MarginRulePayload>;
                };
                aggregate: {
                    args: Prisma.MarginRuleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMarginRule>;
                };
                groupBy: {
                    args: Prisma.MarginRuleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MarginRuleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MarginRuleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MarginRuleCountAggregateOutputType> | number;
                };
            };
        };
        Conversation: {
            payload: Prisma.$ConversationPayload<ExtArgs>;
            fields: Prisma.ConversationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConversationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                findFirst: {
                    args: Prisma.ConversationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                findMany: {
                    args: Prisma.ConversationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>[];
                };
                create: {
                    args: Prisma.ConversationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                createMany: {
                    args: Prisma.ConversationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>[];
                };
                delete: {
                    args: Prisma.ConversationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                update: {
                    args: Prisma.ConversationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                deleteMany: {
                    args: Prisma.ConversationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConversationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConversationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>[];
                };
                upsert: {
                    args: Prisma.ConversationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationPayload>;
                };
                aggregate: {
                    args: Prisma.ConversationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConversation>;
                };
                groupBy: {
                    args: Prisma.ConversationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConversationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConversationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConversationCountAggregateOutputType> | number;
                };
            };
        };
        ConversationParticipant: {
            payload: Prisma.$ConversationParticipantPayload<ExtArgs>;
            fields: Prisma.ConversationParticipantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConversationParticipantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConversationParticipantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>;
                };
                findFirst: {
                    args: Prisma.ConversationParticipantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConversationParticipantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>;
                };
                findMany: {
                    args: Prisma.ConversationParticipantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>[];
                };
                create: {
                    args: Prisma.ConversationParticipantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>;
                };
                createMany: {
                    args: Prisma.ConversationParticipantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConversationParticipantCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>[];
                };
                delete: {
                    args: Prisma.ConversationParticipantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>;
                };
                update: {
                    args: Prisma.ConversationParticipantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>;
                };
                deleteMany: {
                    args: Prisma.ConversationParticipantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConversationParticipantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConversationParticipantUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>[];
                };
                upsert: {
                    args: Prisma.ConversationParticipantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConversationParticipantPayload>;
                };
                aggregate: {
                    args: Prisma.ConversationParticipantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConversationParticipant>;
                };
                groupBy: {
                    args: Prisma.ConversationParticipantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConversationParticipantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConversationParticipantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConversationParticipantCountAggregateOutputType> | number;
                };
            };
        };
        Message: {
            payload: Prisma.$MessagePayload<ExtArgs>;
            fields: Prisma.MessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                findFirst: {
                    args: Prisma.MessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                findMany: {
                    args: Prisma.MessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[];
                };
                create: {
                    args: Prisma.MessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                createMany: {
                    args: Prisma.MessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[];
                };
                delete: {
                    args: Prisma.MessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                update: {
                    args: Prisma.MessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                deleteMany: {
                    args: Prisma.MessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>[];
                };
                upsert: {
                    args: Prisma.MessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessagePayload>;
                };
                aggregate: {
                    args: Prisma.MessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMessage>;
                };
                groupBy: {
                    args: Prisma.MessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageCountAggregateOutputType> | number;
                };
            };
        };
        MessageAttachment: {
            payload: Prisma.$MessageAttachmentPayload<ExtArgs>;
            fields: Prisma.MessageAttachmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MessageAttachmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MessageAttachmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>;
                };
                findFirst: {
                    args: Prisma.MessageAttachmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MessageAttachmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>;
                };
                findMany: {
                    args: Prisma.MessageAttachmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>[];
                };
                create: {
                    args: Prisma.MessageAttachmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>;
                };
                createMany: {
                    args: Prisma.MessageAttachmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MessageAttachmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>[];
                };
                delete: {
                    args: Prisma.MessageAttachmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>;
                };
                update: {
                    args: Prisma.MessageAttachmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>;
                };
                deleteMany: {
                    args: Prisma.MessageAttachmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MessageAttachmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MessageAttachmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>[];
                };
                upsert: {
                    args: Prisma.MessageAttachmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MessageAttachmentPayload>;
                };
                aggregate: {
                    args: Prisma.MessageAttachmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMessageAttachment>;
                };
                groupBy: {
                    args: Prisma.MessageAttachmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageAttachmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MessageAttachmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MessageAttachmentCountAggregateOutputType> | number;
                };
            };
        };
        Order: {
            payload: Prisma.$OrderPayload<ExtArgs>;
            fields: Prisma.OrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findFirst: {
                    args: Prisma.OrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findMany: {
                    args: Prisma.OrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                create: {
                    args: Prisma.OrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                createMany: {
                    args: Prisma.OrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                delete: {
                    args: Prisma.OrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                update: {
                    args: Prisma.OrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                upsert: {
                    args: Prisma.OrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                aggregate: {
                    args: Prisma.OrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrder>;
                };
                groupBy: {
                    args: Prisma.OrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderCountAggregateOutputType> | number;
                };
            };
        };
        OrderItem: {
            payload: Prisma.$OrderItemPayload<ExtArgs>;
            fields: Prisma.OrderItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                findFirst: {
                    args: Prisma.OrderItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                findMany: {
                    args: Prisma.OrderItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                create: {
                    args: Prisma.OrderItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                createMany: {
                    args: Prisma.OrderItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                delete: {
                    args: Prisma.OrderItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                update: {
                    args: Prisma.OrderItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                upsert: {
                    args: Prisma.OrderItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                aggregate: {
                    args: Prisma.OrderItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderItem>;
                };
                groupBy: {
                    args: Prisma.OrderItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderItemCountAggregateOutputType> | number;
                };
            };
        };
        OrderMilestone: {
            payload: Prisma.$OrderMilestonePayload<ExtArgs>;
            fields: Prisma.OrderMilestoneFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderMilestoneFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderMilestoneFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload>;
                };
                findFirst: {
                    args: Prisma.OrderMilestoneFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderMilestoneFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload>;
                };
                findMany: {
                    args: Prisma.OrderMilestoneFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload>[];
                };
                create: {
                    args: Prisma.OrderMilestoneCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload>;
                };
                createMany: {
                    args: Prisma.OrderMilestoneCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderMilestoneCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload>[];
                };
                delete: {
                    args: Prisma.OrderMilestoneDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload>;
                };
                update: {
                    args: Prisma.OrderMilestoneUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload>;
                };
                deleteMany: {
                    args: Prisma.OrderMilestoneDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderMilestoneUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderMilestoneUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload>[];
                };
                upsert: {
                    args: Prisma.OrderMilestoneUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderMilestonePayload>;
                };
                aggregate: {
                    args: Prisma.OrderMilestoneAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderMilestone>;
                };
                groupBy: {
                    args: Prisma.OrderMilestoneGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderMilestoneGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderMilestoneCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderMilestoneCountAggregateOutputType> | number;
                };
            };
        };
        MilestonePhoto: {
            payload: Prisma.$MilestonePhotoPayload<ExtArgs>;
            fields: Prisma.MilestonePhotoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MilestonePhotoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MilestonePhotoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload>;
                };
                findFirst: {
                    args: Prisma.MilestonePhotoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MilestonePhotoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload>;
                };
                findMany: {
                    args: Prisma.MilestonePhotoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload>[];
                };
                create: {
                    args: Prisma.MilestonePhotoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload>;
                };
                createMany: {
                    args: Prisma.MilestonePhotoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MilestonePhotoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload>[];
                };
                delete: {
                    args: Prisma.MilestonePhotoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload>;
                };
                update: {
                    args: Prisma.MilestonePhotoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload>;
                };
                deleteMany: {
                    args: Prisma.MilestonePhotoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MilestonePhotoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MilestonePhotoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload>[];
                };
                upsert: {
                    args: Prisma.MilestonePhotoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MilestonePhotoPayload>;
                };
                aggregate: {
                    args: Prisma.MilestonePhotoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMilestonePhoto>;
                };
                groupBy: {
                    args: Prisma.MilestonePhotoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MilestonePhotoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MilestonePhotoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MilestonePhotoCountAggregateOutputType> | number;
                };
            };
        };
        Sample: {
            payload: Prisma.$SamplePayload<ExtArgs>;
            fields: Prisma.SampleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SampleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SampleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload>;
                };
                findFirst: {
                    args: Prisma.SampleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SampleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload>;
                };
                findMany: {
                    args: Prisma.SampleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload>[];
                };
                create: {
                    args: Prisma.SampleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload>;
                };
                createMany: {
                    args: Prisma.SampleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SampleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload>[];
                };
                delete: {
                    args: Prisma.SampleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload>;
                };
                update: {
                    args: Prisma.SampleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload>;
                };
                deleteMany: {
                    args: Prisma.SampleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SampleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SampleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload>[];
                };
                upsert: {
                    args: Prisma.SampleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePayload>;
                };
                aggregate: {
                    args: Prisma.SampleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSample>;
                };
                groupBy: {
                    args: Prisma.SampleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SampleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SampleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SampleCountAggregateOutputType> | number;
                };
            };
        };
        Payment: {
            payload: Prisma.$PaymentPayload<ExtArgs>;
            fields: Prisma.PaymentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                findMany: {
                    args: Prisma.PaymentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                create: {
                    args: Prisma.PaymentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                createMany: {
                    args: Prisma.PaymentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                delete: {
                    args: Prisma.PaymentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                update: {
                    args: Prisma.PaymentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>[];
                };
                upsert: {
                    args: Prisma.PaymentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePayment>;
                };
                groupBy: {
                    args: Prisma.PaymentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentCountAggregateOutputType> | number;
                };
            };
        };
        LedgerAccount: {
            payload: Prisma.$LedgerAccountPayload<ExtArgs>;
            fields: Prisma.LedgerAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LedgerAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LedgerAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload>;
                };
                findFirst: {
                    args: Prisma.LedgerAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LedgerAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload>;
                };
                findMany: {
                    args: Prisma.LedgerAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload>[];
                };
                create: {
                    args: Prisma.LedgerAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload>;
                };
                createMany: {
                    args: Prisma.LedgerAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LedgerAccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload>[];
                };
                delete: {
                    args: Prisma.LedgerAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload>;
                };
                update: {
                    args: Prisma.LedgerAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.LedgerAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LedgerAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LedgerAccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload>[];
                };
                upsert: {
                    args: Prisma.LedgerAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerAccountPayload>;
                };
                aggregate: {
                    args: Prisma.LedgerAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLedgerAccount>;
                };
                groupBy: {
                    args: Prisma.LedgerAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LedgerAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LedgerAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LedgerAccountCountAggregateOutputType> | number;
                };
            };
        };
        LedgerTransaction: {
            payload: Prisma.$LedgerTransactionPayload<ExtArgs>;
            fields: Prisma.LedgerTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LedgerTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LedgerTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.LedgerTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LedgerTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>;
                };
                findMany: {
                    args: Prisma.LedgerTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>[];
                };
                create: {
                    args: Prisma.LedgerTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>;
                };
                createMany: {
                    args: Prisma.LedgerTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LedgerTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>[];
                };
                delete: {
                    args: Prisma.LedgerTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>;
                };
                update: {
                    args: Prisma.LedgerTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.LedgerTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LedgerTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LedgerTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.LedgerTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LedgerTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.LedgerTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLedgerTransaction>;
                };
                groupBy: {
                    args: Prisma.LedgerTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LedgerTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LedgerTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LedgerTransactionCountAggregateOutputType> | number;
                };
            };
        };
        EscrowLedgerEntry: {
            payload: Prisma.$EscrowLedgerEntryPayload<ExtArgs>;
            fields: Prisma.EscrowLedgerEntryFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EscrowLedgerEntryFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EscrowLedgerEntryFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload>;
                };
                findFirst: {
                    args: Prisma.EscrowLedgerEntryFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EscrowLedgerEntryFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload>;
                };
                findMany: {
                    args: Prisma.EscrowLedgerEntryFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload>[];
                };
                create: {
                    args: Prisma.EscrowLedgerEntryCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload>;
                };
                createMany: {
                    args: Prisma.EscrowLedgerEntryCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EscrowLedgerEntryCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload>[];
                };
                delete: {
                    args: Prisma.EscrowLedgerEntryDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload>;
                };
                update: {
                    args: Prisma.EscrowLedgerEntryUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload>;
                };
                deleteMany: {
                    args: Prisma.EscrowLedgerEntryDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EscrowLedgerEntryUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EscrowLedgerEntryUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload>[];
                };
                upsert: {
                    args: Prisma.EscrowLedgerEntryUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EscrowLedgerEntryPayload>;
                };
                aggregate: {
                    args: Prisma.EscrowLedgerEntryAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEscrowLedgerEntry>;
                };
                groupBy: {
                    args: Prisma.EscrowLedgerEntryGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EscrowLedgerEntryGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EscrowLedgerEntryCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EscrowLedgerEntryCountAggregateOutputType> | number;
                };
            };
        };
        Inspection: {
            payload: Prisma.$InspectionPayload<ExtArgs>;
            fields: Prisma.InspectionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InspectionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InspectionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload>;
                };
                findFirst: {
                    args: Prisma.InspectionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InspectionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload>;
                };
                findMany: {
                    args: Prisma.InspectionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload>[];
                };
                create: {
                    args: Prisma.InspectionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload>;
                };
                createMany: {
                    args: Prisma.InspectionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InspectionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload>[];
                };
                delete: {
                    args: Prisma.InspectionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload>;
                };
                update: {
                    args: Prisma.InspectionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload>;
                };
                deleteMany: {
                    args: Prisma.InspectionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InspectionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InspectionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload>[];
                };
                upsert: {
                    args: Prisma.InspectionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPayload>;
                };
                aggregate: {
                    args: Prisma.InspectionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInspection>;
                };
                groupBy: {
                    args: Prisma.InspectionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InspectionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InspectionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InspectionCountAggregateOutputType> | number;
                };
            };
        };
        InspectionPhoto: {
            payload: Prisma.$InspectionPhotoPayload<ExtArgs>;
            fields: Prisma.InspectionPhotoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InspectionPhotoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InspectionPhotoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload>;
                };
                findFirst: {
                    args: Prisma.InspectionPhotoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InspectionPhotoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload>;
                };
                findMany: {
                    args: Prisma.InspectionPhotoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload>[];
                };
                create: {
                    args: Prisma.InspectionPhotoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload>;
                };
                createMany: {
                    args: Prisma.InspectionPhotoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InspectionPhotoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload>[];
                };
                delete: {
                    args: Prisma.InspectionPhotoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload>;
                };
                update: {
                    args: Prisma.InspectionPhotoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload>;
                };
                deleteMany: {
                    args: Prisma.InspectionPhotoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InspectionPhotoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InspectionPhotoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload>[];
                };
                upsert: {
                    args: Prisma.InspectionPhotoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectionPhotoPayload>;
                };
                aggregate: {
                    args: Prisma.InspectionPhotoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInspectionPhoto>;
                };
                groupBy: {
                    args: Prisma.InspectionPhotoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InspectionPhotoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InspectionPhotoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InspectionPhotoCountAggregateOutputType> | number;
                };
            };
        };
        Review: {
            payload: Prisma.$ReviewPayload<ExtArgs>;
            fields: Prisma.ReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                findFirst: {
                    args: Prisma.ReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                findMany: {
                    args: Prisma.ReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                create: {
                    args: Prisma.ReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                createMany: {
                    args: Prisma.ReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                delete: {
                    args: Prisma.ReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                update: {
                    args: Prisma.ReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.ReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>[];
                };
                upsert: {
                    args: Prisma.ReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReviewPayload>;
                };
                aggregate: {
                    args: Prisma.ReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReview>;
                };
                groupBy: {
                    args: Prisma.ReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReviewCountAggregateOutputType> | number;
                };
            };
        };
        Dispute: {
            payload: Prisma.$DisputePayload<ExtArgs>;
            fields: Prisma.DisputeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DisputeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DisputeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                findFirst: {
                    args: Prisma.DisputeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DisputeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                findMany: {
                    args: Prisma.DisputeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>[];
                };
                create: {
                    args: Prisma.DisputeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                createMany: {
                    args: Prisma.DisputeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DisputeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>[];
                };
                delete: {
                    args: Prisma.DisputeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                update: {
                    args: Prisma.DisputeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                deleteMany: {
                    args: Prisma.DisputeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DisputeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DisputeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>[];
                };
                upsert: {
                    args: Prisma.DisputeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputePayload>;
                };
                aggregate: {
                    args: Prisma.DisputeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDispute>;
                };
                groupBy: {
                    args: Prisma.DisputeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DisputeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DisputeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DisputeCountAggregateOutputType> | number;
                };
            };
        };
        DisputeEvidence: {
            payload: Prisma.$DisputeEvidencePayload<ExtArgs>;
            fields: Prisma.DisputeEvidenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DisputeEvidenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DisputeEvidenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                findFirst: {
                    args: Prisma.DisputeEvidenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DisputeEvidenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                findMany: {
                    args: Prisma.DisputeEvidenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>[];
                };
                create: {
                    args: Prisma.DisputeEvidenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                createMany: {
                    args: Prisma.DisputeEvidenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DisputeEvidenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>[];
                };
                delete: {
                    args: Prisma.DisputeEvidenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                update: {
                    args: Prisma.DisputeEvidenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                deleteMany: {
                    args: Prisma.DisputeEvidenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DisputeEvidenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DisputeEvidenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>[];
                };
                upsert: {
                    args: Prisma.DisputeEvidenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DisputeEvidencePayload>;
                };
                aggregate: {
                    args: Prisma.DisputeEvidenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDisputeEvidence>;
                };
                groupBy: {
                    args: Prisma.DisputeEvidenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DisputeEvidenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DisputeEvidenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DisputeEvidenceCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        NotificationPreference: {
            payload: Prisma.$NotificationPreferencePayload<ExtArgs>;
            fields: Prisma.NotificationPreferenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationPreferenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationPreferenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                findFirst: {
                    args: Prisma.NotificationPreferenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationPreferenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                findMany: {
                    args: Prisma.NotificationPreferenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                create: {
                    args: Prisma.NotificationPreferenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                createMany: {
                    args: Prisma.NotificationPreferenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationPreferenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                delete: {
                    args: Prisma.NotificationPreferenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                update: {
                    args: Prisma.NotificationPreferenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationPreferenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationPreferenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationPreferenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>[];
                };
                upsert: {
                    args: Prisma.NotificationPreferenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPreferencePayload>;
                };
                aggregate: {
                    args: Prisma.NotificationPreferenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotificationPreference>;
                };
                groupBy: {
                    args: Prisma.NotificationPreferenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationPreferenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationPreferenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationPreferenceCountAggregateOutputType> | number;
                };
            };
        };
        AuditLog: {
            payload: Prisma.$AuditLogPayload<ExtArgs>;
            fields: Prisma.AuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.AuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                findMany: {
                    args: Prisma.AuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                create: {
                    args: Prisma.AuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                createMany: {
                    args: Prisma.AuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                delete: {
                    args: Prisma.AuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                update: {
                    args: Prisma.AuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>[];
                };
                upsert: {
                    args: Prisma.AuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.AuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAuditLog>;
                };
                groupBy: {
                    args: Prisma.AuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AuditLogCountAggregateOutputType> | number;
                };
            };
        };
        FileAsset: {
            payload: Prisma.$FileAssetPayload<ExtArgs>;
            fields: Prisma.FileAssetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FileAssetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FileAssetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload>;
                };
                findFirst: {
                    args: Prisma.FileAssetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FileAssetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload>;
                };
                findMany: {
                    args: Prisma.FileAssetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload>[];
                };
                create: {
                    args: Prisma.FileAssetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload>;
                };
                createMany: {
                    args: Prisma.FileAssetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FileAssetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload>[];
                };
                delete: {
                    args: Prisma.FileAssetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload>;
                };
                update: {
                    args: Prisma.FileAssetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload>;
                };
                deleteMany: {
                    args: Prisma.FileAssetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FileAssetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FileAssetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload>[];
                };
                upsert: {
                    args: Prisma.FileAssetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FileAssetPayload>;
                };
                aggregate: {
                    args: Prisma.FileAssetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFileAsset>;
                };
                groupBy: {
                    args: Prisma.FileAssetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileAssetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FileAssetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FileAssetCountAggregateOutputType> | number;
                };
            };
        };
        ImageRendition: {
            payload: Prisma.$ImageRenditionPayload<ExtArgs>;
            fields: Prisma.ImageRenditionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ImageRenditionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ImageRenditionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload>;
                };
                findFirst: {
                    args: Prisma.ImageRenditionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ImageRenditionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload>;
                };
                findMany: {
                    args: Prisma.ImageRenditionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload>[];
                };
                create: {
                    args: Prisma.ImageRenditionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload>;
                };
                createMany: {
                    args: Prisma.ImageRenditionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ImageRenditionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload>[];
                };
                delete: {
                    args: Prisma.ImageRenditionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload>;
                };
                update: {
                    args: Prisma.ImageRenditionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload>;
                };
                deleteMany: {
                    args: Prisma.ImageRenditionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ImageRenditionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ImageRenditionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload>[];
                };
                upsert: {
                    args: Prisma.ImageRenditionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ImageRenditionPayload>;
                };
                aggregate: {
                    args: Prisma.ImageRenditionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateImageRendition>;
                };
                groupBy: {
                    args: Prisma.ImageRenditionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ImageRenditionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ImageRenditionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ImageRenditionCountAggregateOutputType> | number;
                };
            };
        };
        Shortlist: {
            payload: Prisma.$ShortlistPayload<ExtArgs>;
            fields: Prisma.ShortlistFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ShortlistFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ShortlistFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload>;
                };
                findFirst: {
                    args: Prisma.ShortlistFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ShortlistFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload>;
                };
                findMany: {
                    args: Prisma.ShortlistFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload>[];
                };
                create: {
                    args: Prisma.ShortlistCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload>;
                };
                createMany: {
                    args: Prisma.ShortlistCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ShortlistCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload>[];
                };
                delete: {
                    args: Prisma.ShortlistDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload>;
                };
                update: {
                    args: Prisma.ShortlistUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload>;
                };
                deleteMany: {
                    args: Prisma.ShortlistDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ShortlistUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ShortlistUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload>[];
                };
                upsert: {
                    args: Prisma.ShortlistUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistPayload>;
                };
                aggregate: {
                    args: Prisma.ShortlistAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateShortlist>;
                };
                groupBy: {
                    args: Prisma.ShortlistGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShortlistGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ShortlistCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShortlistCountAggregateOutputType> | number;
                };
            };
        };
        ShortlistItem: {
            payload: Prisma.$ShortlistItemPayload<ExtArgs>;
            fields: Prisma.ShortlistItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ShortlistItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ShortlistItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload>;
                };
                findFirst: {
                    args: Prisma.ShortlistItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ShortlistItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload>;
                };
                findMany: {
                    args: Prisma.ShortlistItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload>[];
                };
                create: {
                    args: Prisma.ShortlistItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload>;
                };
                createMany: {
                    args: Prisma.ShortlistItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ShortlistItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload>[];
                };
                delete: {
                    args: Prisma.ShortlistItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload>;
                };
                update: {
                    args: Prisma.ShortlistItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload>;
                };
                deleteMany: {
                    args: Prisma.ShortlistItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ShortlistItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ShortlistItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload>[];
                };
                upsert: {
                    args: Prisma.ShortlistItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShortlistItemPayload>;
                };
                aggregate: {
                    args: Prisma.ShortlistItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateShortlistItem>;
                };
                groupBy: {
                    args: Prisma.ShortlistItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShortlistItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ShortlistItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShortlistItemCountAggregateOutputType> | number;
                };
            };
        };
        AccountWarning: {
            payload: Prisma.$AccountWarningPayload<ExtArgs>;
            fields: Prisma.AccountWarningFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AccountWarningFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AccountWarningFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload>;
                };
                findFirst: {
                    args: Prisma.AccountWarningFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AccountWarningFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload>;
                };
                findMany: {
                    args: Prisma.AccountWarningFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload>[];
                };
                create: {
                    args: Prisma.AccountWarningCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload>;
                };
                createMany: {
                    args: Prisma.AccountWarningCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AccountWarningCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload>[];
                };
                delete: {
                    args: Prisma.AccountWarningDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload>;
                };
                update: {
                    args: Prisma.AccountWarningUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload>;
                };
                deleteMany: {
                    args: Prisma.AccountWarningDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AccountWarningUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AccountWarningUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload>[];
                };
                upsert: {
                    args: Prisma.AccountWarningUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountWarningPayload>;
                };
                aggregate: {
                    args: Prisma.AccountWarningAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAccountWarning>;
                };
                groupBy: {
                    args: Prisma.AccountWarningGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountWarningGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AccountWarningCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountWarningCountAggregateOutputType> | number;
                };
            };
        };
        OrderEvent: {
            payload: Prisma.$OrderEventPayload<ExtArgs>;
            fields: Prisma.OrderEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload>;
                };
                findFirst: {
                    args: Prisma.OrderEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload>;
                };
                findMany: {
                    args: Prisma.OrderEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload>[];
                };
                create: {
                    args: Prisma.OrderEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload>;
                };
                createMany: {
                    args: Prisma.OrderEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderEventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload>[];
                };
                delete: {
                    args: Prisma.OrderEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload>;
                };
                update: {
                    args: Prisma.OrderEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderEventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload>[];
                };
                upsert: {
                    args: Prisma.OrderEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderEventPayload>;
                };
                aggregate: {
                    args: Prisma.OrderEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderEvent>;
                };
                groupBy: {
                    args: Prisma.OrderEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderEventCountAggregateOutputType> | number;
                };
            };
        };
        SamplePhoto: {
            payload: Prisma.$SamplePhotoPayload<ExtArgs>;
            fields: Prisma.SamplePhotoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SamplePhotoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SamplePhotoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload>;
                };
                findFirst: {
                    args: Prisma.SamplePhotoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SamplePhotoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload>;
                };
                findMany: {
                    args: Prisma.SamplePhotoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload>[];
                };
                create: {
                    args: Prisma.SamplePhotoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload>;
                };
                createMany: {
                    args: Prisma.SamplePhotoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SamplePhotoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload>[];
                };
                delete: {
                    args: Prisma.SamplePhotoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload>;
                };
                update: {
                    args: Prisma.SamplePhotoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload>;
                };
                deleteMany: {
                    args: Prisma.SamplePhotoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SamplePhotoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SamplePhotoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload>[];
                };
                upsert: {
                    args: Prisma.SamplePhotoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SamplePhotoPayload>;
                };
                aggregate: {
                    args: Prisma.SamplePhotoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSamplePhoto>;
                };
                groupBy: {
                    args: Prisma.SamplePhotoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SamplePhotoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SamplePhotoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SamplePhotoCountAggregateOutputType> | number;
                };
            };
        };
        OrderRelease: {
            payload: Prisma.$OrderReleasePayload<ExtArgs>;
            fields: Prisma.OrderReleaseFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderReleaseFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderReleaseFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload>;
                };
                findFirst: {
                    args: Prisma.OrderReleaseFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderReleaseFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload>;
                };
                findMany: {
                    args: Prisma.OrderReleaseFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload>[];
                };
                create: {
                    args: Prisma.OrderReleaseCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload>;
                };
                createMany: {
                    args: Prisma.OrderReleaseCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderReleaseCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload>[];
                };
                delete: {
                    args: Prisma.OrderReleaseDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload>;
                };
                update: {
                    args: Prisma.OrderReleaseUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload>;
                };
                deleteMany: {
                    args: Prisma.OrderReleaseDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderReleaseUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderReleaseUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload>[];
                };
                upsert: {
                    args: Prisma.OrderReleaseUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderReleasePayload>;
                };
                aggregate: {
                    args: Prisma.OrderReleaseAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderRelease>;
                };
                groupBy: {
                    args: Prisma.OrderReleaseGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderReleaseGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderReleaseCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderReleaseCountAggregateOutputType> | number;
                };
            };
        };
        ExchangeRate: {
            payload: Prisma.$ExchangeRatePayload<ExtArgs>;
            fields: Prisma.ExchangeRateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ExchangeRateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ExchangeRateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                findFirst: {
                    args: Prisma.ExchangeRateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ExchangeRateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                findMany: {
                    args: Prisma.ExchangeRateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>[];
                };
                create: {
                    args: Prisma.ExchangeRateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                createMany: {
                    args: Prisma.ExchangeRateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ExchangeRateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>[];
                };
                delete: {
                    args: Prisma.ExchangeRateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                update: {
                    args: Prisma.ExchangeRateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                deleteMany: {
                    args: Prisma.ExchangeRateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ExchangeRateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ExchangeRateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>[];
                };
                upsert: {
                    args: Prisma.ExchangeRateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ExchangeRatePayload>;
                };
                aggregate: {
                    args: Prisma.ExchangeRateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateExchangeRate>;
                };
                groupBy: {
                    args: Prisma.ExchangeRateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExchangeRateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ExchangeRateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ExchangeRateCountAggregateOutputType> | number;
                };
            };
        };
        PlatformSetting: {
            payload: Prisma.$PlatformSettingPayload<ExtArgs>;
            fields: Prisma.PlatformSettingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PlatformSettingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PlatformSettingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                findFirst: {
                    args: Prisma.PlatformSettingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PlatformSettingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                findMany: {
                    args: Prisma.PlatformSettingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>[];
                };
                create: {
                    args: Prisma.PlatformSettingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                createMany: {
                    args: Prisma.PlatformSettingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PlatformSettingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>[];
                };
                delete: {
                    args: Prisma.PlatformSettingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                update: {
                    args: Prisma.PlatformSettingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                deleteMany: {
                    args: Prisma.PlatformSettingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PlatformSettingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PlatformSettingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>[];
                };
                upsert: {
                    args: Prisma.PlatformSettingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlatformSettingPayload>;
                };
                aggregate: {
                    args: Prisma.PlatformSettingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlatformSetting>;
                };
                groupBy: {
                    args: Prisma.PlatformSettingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformSettingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PlatformSettingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlatformSettingCountAggregateOutputType> | number;
                };
            };
        };
        ProductionLine: {
            payload: Prisma.$ProductionLinePayload<ExtArgs>;
            fields: Prisma.ProductionLineFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ProductionLineFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ProductionLineFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload>;
                };
                findFirst: {
                    args: Prisma.ProductionLineFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ProductionLineFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload>;
                };
                findMany: {
                    args: Prisma.ProductionLineFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload>[];
                };
                create: {
                    args: Prisma.ProductionLineCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload>;
                };
                createMany: {
                    args: Prisma.ProductionLineCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ProductionLineCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload>[];
                };
                delete: {
                    args: Prisma.ProductionLineDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload>;
                };
                update: {
                    args: Prisma.ProductionLineUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload>;
                };
                deleteMany: {
                    args: Prisma.ProductionLineDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ProductionLineUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ProductionLineUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload>[];
                };
                upsert: {
                    args: Prisma.ProductionLineUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ProductionLinePayload>;
                };
                aggregate: {
                    args: Prisma.ProductionLineAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateProductionLine>;
                };
                groupBy: {
                    args: Prisma.ProductionLineGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionLineGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ProductionLineCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ProductionLineCountAggregateOutputType> | number;
                };
            };
        };
        CapacitySlot: {
            payload: Prisma.$CapacitySlotPayload<ExtArgs>;
            fields: Prisma.CapacitySlotFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CapacitySlotFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CapacitySlotFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload>;
                };
                findFirst: {
                    args: Prisma.CapacitySlotFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CapacitySlotFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload>;
                };
                findMany: {
                    args: Prisma.CapacitySlotFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload>[];
                };
                create: {
                    args: Prisma.CapacitySlotCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload>;
                };
                createMany: {
                    args: Prisma.CapacitySlotCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CapacitySlotCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload>[];
                };
                delete: {
                    args: Prisma.CapacitySlotDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload>;
                };
                update: {
                    args: Prisma.CapacitySlotUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload>;
                };
                deleteMany: {
                    args: Prisma.CapacitySlotDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CapacitySlotUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CapacitySlotUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload>[];
                };
                upsert: {
                    args: Prisma.CapacitySlotUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacitySlotPayload>;
                };
                aggregate: {
                    args: Prisma.CapacitySlotAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCapacitySlot>;
                };
                groupBy: {
                    args: Prisma.CapacitySlotGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CapacitySlotGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CapacitySlotCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CapacitySlotCountAggregateOutputType> | number;
                };
            };
        };
        SupplierClaim: {
            payload: Prisma.$SupplierClaimPayload<ExtArgs>;
            fields: Prisma.SupplierClaimFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SupplierClaimFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SupplierClaimFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload>;
                };
                findFirst: {
                    args: Prisma.SupplierClaimFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SupplierClaimFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload>;
                };
                findMany: {
                    args: Prisma.SupplierClaimFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload>[];
                };
                create: {
                    args: Prisma.SupplierClaimCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload>;
                };
                createMany: {
                    args: Prisma.SupplierClaimCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SupplierClaimCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload>[];
                };
                delete: {
                    args: Prisma.SupplierClaimDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload>;
                };
                update: {
                    args: Prisma.SupplierClaimUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload>;
                };
                deleteMany: {
                    args: Prisma.SupplierClaimDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SupplierClaimUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SupplierClaimUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload>[];
                };
                upsert: {
                    args: Prisma.SupplierClaimUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplierClaimPayload>;
                };
                aggregate: {
                    args: Prisma.SupplierClaimAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSupplierClaim>;
                };
                groupBy: {
                    args: Prisma.SupplierClaimGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierClaimGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SupplierClaimCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplierClaimCountAggregateOutputType> | number;
                };
            };
        };
        CapacityBooking: {
            payload: Prisma.$CapacityBookingPayload<ExtArgs>;
            fields: Prisma.CapacityBookingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CapacityBookingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CapacityBookingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload>;
                };
                findFirst: {
                    args: Prisma.CapacityBookingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CapacityBookingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload>;
                };
                findMany: {
                    args: Prisma.CapacityBookingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload>[];
                };
                create: {
                    args: Prisma.CapacityBookingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload>;
                };
                createMany: {
                    args: Prisma.CapacityBookingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CapacityBookingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload>[];
                };
                delete: {
                    args: Prisma.CapacityBookingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload>;
                };
                update: {
                    args: Prisma.CapacityBookingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload>;
                };
                deleteMany: {
                    args: Prisma.CapacityBookingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CapacityBookingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CapacityBookingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload>[];
                };
                upsert: {
                    args: Prisma.CapacityBookingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingPayload>;
                };
                aggregate: {
                    args: Prisma.CapacityBookingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCapacityBooking>;
                };
                groupBy: {
                    args: Prisma.CapacityBookingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CapacityBookingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CapacityBookingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CapacityBookingCountAggregateOutputType> | number;
                };
            };
        };
        CapacityBookingAllocation: {
            payload: Prisma.$CapacityBookingAllocationPayload<ExtArgs>;
            fields: Prisma.CapacityBookingAllocationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CapacityBookingAllocationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CapacityBookingAllocationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload>;
                };
                findFirst: {
                    args: Prisma.CapacityBookingAllocationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CapacityBookingAllocationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload>;
                };
                findMany: {
                    args: Prisma.CapacityBookingAllocationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload>[];
                };
                create: {
                    args: Prisma.CapacityBookingAllocationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload>;
                };
                createMany: {
                    args: Prisma.CapacityBookingAllocationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CapacityBookingAllocationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload>[];
                };
                delete: {
                    args: Prisma.CapacityBookingAllocationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload>;
                };
                update: {
                    args: Prisma.CapacityBookingAllocationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload>;
                };
                deleteMany: {
                    args: Prisma.CapacityBookingAllocationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CapacityBookingAllocationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CapacityBookingAllocationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload>[];
                };
                upsert: {
                    args: Prisma.CapacityBookingAllocationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityBookingAllocationPayload>;
                };
                aggregate: {
                    args: Prisma.CapacityBookingAllocationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCapacityBookingAllocation>;
                };
                groupBy: {
                    args: Prisma.CapacityBookingAllocationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CapacityBookingAllocationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CapacityBookingAllocationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CapacityBookingAllocationCountAggregateOutputType> | number;
                };
            };
        };
        CapacityPartnership: {
            payload: Prisma.$CapacityPartnershipPayload<ExtArgs>;
            fields: Prisma.CapacityPartnershipFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CapacityPartnershipFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CapacityPartnershipFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload>;
                };
                findFirst: {
                    args: Prisma.CapacityPartnershipFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CapacityPartnershipFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload>;
                };
                findMany: {
                    args: Prisma.CapacityPartnershipFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload>[];
                };
                create: {
                    args: Prisma.CapacityPartnershipCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload>;
                };
                createMany: {
                    args: Prisma.CapacityPartnershipCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CapacityPartnershipCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload>[];
                };
                delete: {
                    args: Prisma.CapacityPartnershipDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload>;
                };
                update: {
                    args: Prisma.CapacityPartnershipUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload>;
                };
                deleteMany: {
                    args: Prisma.CapacityPartnershipDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CapacityPartnershipUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CapacityPartnershipUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload>[];
                };
                upsert: {
                    args: Prisma.CapacityPartnershipUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CapacityPartnershipPayload>;
                };
                aggregate: {
                    args: Prisma.CapacityPartnershipAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCapacityPartnership>;
                };
                groupBy: {
                    args: Prisma.CapacityPartnershipGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CapacityPartnershipGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CapacityPartnershipCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CapacityPartnershipCountAggregateOutputType> | number;
                };
            };
        };
        LogisticsPartner: {
            payload: Prisma.$LogisticsPartnerPayload<ExtArgs>;
            fields: Prisma.LogisticsPartnerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LogisticsPartnerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LogisticsPartnerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                findFirst: {
                    args: Prisma.LogisticsPartnerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LogisticsPartnerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                findMany: {
                    args: Prisma.LogisticsPartnerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>[];
                };
                create: {
                    args: Prisma.LogisticsPartnerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                createMany: {
                    args: Prisma.LogisticsPartnerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LogisticsPartnerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>[];
                };
                delete: {
                    args: Prisma.LogisticsPartnerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                update: {
                    args: Prisma.LogisticsPartnerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                deleteMany: {
                    args: Prisma.LogisticsPartnerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LogisticsPartnerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LogisticsPartnerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>[];
                };
                upsert: {
                    args: Prisma.LogisticsPartnerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsPartnerPayload>;
                };
                aggregate: {
                    args: Prisma.LogisticsPartnerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLogisticsPartner>;
                };
                groupBy: {
                    args: Prisma.LogisticsPartnerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsPartnerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LogisticsPartnerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsPartnerCountAggregateOutputType> | number;
                };
            };
        };
        Hub: {
            payload: Prisma.$HubPayload<ExtArgs>;
            fields: Prisma.HubFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HubFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HubFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload>;
                };
                findFirst: {
                    args: Prisma.HubFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HubFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload>;
                };
                findMany: {
                    args: Prisma.HubFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload>[];
                };
                create: {
                    args: Prisma.HubCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload>;
                };
                createMany: {
                    args: Prisma.HubCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HubCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload>[];
                };
                delete: {
                    args: Prisma.HubDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload>;
                };
                update: {
                    args: Prisma.HubUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload>;
                };
                deleteMany: {
                    args: Prisma.HubDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HubUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HubUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload>[];
                };
                upsert: {
                    args: Prisma.HubUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubPayload>;
                };
                aggregate: {
                    args: Prisma.HubAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHub>;
                };
                groupBy: {
                    args: Prisma.HubGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HubGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HubCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HubCountAggregateOutputType> | number;
                };
            };
        };
        RateCard: {
            payload: Prisma.$RateCardPayload<ExtArgs>;
            fields: Prisma.RateCardFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RateCardFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RateCardFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload>;
                };
                findFirst: {
                    args: Prisma.RateCardFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RateCardFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload>;
                };
                findMany: {
                    args: Prisma.RateCardFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload>[];
                };
                create: {
                    args: Prisma.RateCardCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload>;
                };
                createMany: {
                    args: Prisma.RateCardCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RateCardCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload>[];
                };
                delete: {
                    args: Prisma.RateCardDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload>;
                };
                update: {
                    args: Prisma.RateCardUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload>;
                };
                deleteMany: {
                    args: Prisma.RateCardDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RateCardUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RateCardUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload>[];
                };
                upsert: {
                    args: Prisma.RateCardUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RateCardPayload>;
                };
                aggregate: {
                    args: Prisma.RateCardAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRateCard>;
                };
                groupBy: {
                    args: Prisma.RateCardGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RateCardGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RateCardCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RateCardCountAggregateOutputType> | number;
                };
            };
        };
        LogisticsMarginRule: {
            payload: Prisma.$LogisticsMarginRulePayload<ExtArgs>;
            fields: Prisma.LogisticsMarginRuleFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LogisticsMarginRuleFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LogisticsMarginRuleFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload>;
                };
                findFirst: {
                    args: Prisma.LogisticsMarginRuleFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LogisticsMarginRuleFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload>;
                };
                findMany: {
                    args: Prisma.LogisticsMarginRuleFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload>[];
                };
                create: {
                    args: Prisma.LogisticsMarginRuleCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload>;
                };
                createMany: {
                    args: Prisma.LogisticsMarginRuleCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LogisticsMarginRuleCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload>[];
                };
                delete: {
                    args: Prisma.LogisticsMarginRuleDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload>;
                };
                update: {
                    args: Prisma.LogisticsMarginRuleUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload>;
                };
                deleteMany: {
                    args: Prisma.LogisticsMarginRuleDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LogisticsMarginRuleUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LogisticsMarginRuleUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload>[];
                };
                upsert: {
                    args: Prisma.LogisticsMarginRuleUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsMarginRulePayload>;
                };
                aggregate: {
                    args: Prisma.LogisticsMarginRuleAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLogisticsMarginRule>;
                };
                groupBy: {
                    args: Prisma.LogisticsMarginRuleGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsMarginRuleGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LogisticsMarginRuleCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsMarginRuleCountAggregateOutputType> | number;
                };
            };
        };
        DutyRate: {
            payload: Prisma.$DutyRatePayload<ExtArgs>;
            fields: Prisma.DutyRateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DutyRateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DutyRateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload>;
                };
                findFirst: {
                    args: Prisma.DutyRateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DutyRateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload>;
                };
                findMany: {
                    args: Prisma.DutyRateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload>[];
                };
                create: {
                    args: Prisma.DutyRateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload>;
                };
                createMany: {
                    args: Prisma.DutyRateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DutyRateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload>[];
                };
                delete: {
                    args: Prisma.DutyRateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload>;
                };
                update: {
                    args: Prisma.DutyRateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload>;
                };
                deleteMany: {
                    args: Prisma.DutyRateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DutyRateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DutyRateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload>[];
                };
                upsert: {
                    args: Prisma.DutyRateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DutyRatePayload>;
                };
                aggregate: {
                    args: Prisma.DutyRateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDutyRate>;
                };
                groupBy: {
                    args: Prisma.DutyRateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DutyRateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DutyRateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DutyRateCountAggregateOutputType> | number;
                };
            };
        };
        LogisticsQuote: {
            payload: Prisma.$LogisticsQuotePayload<ExtArgs>;
            fields: Prisma.LogisticsQuoteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LogisticsQuoteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LogisticsQuoteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload>;
                };
                findFirst: {
                    args: Prisma.LogisticsQuoteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LogisticsQuoteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload>;
                };
                findMany: {
                    args: Prisma.LogisticsQuoteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload>[];
                };
                create: {
                    args: Prisma.LogisticsQuoteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload>;
                };
                createMany: {
                    args: Prisma.LogisticsQuoteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LogisticsQuoteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload>[];
                };
                delete: {
                    args: Prisma.LogisticsQuoteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload>;
                };
                update: {
                    args: Prisma.LogisticsQuoteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload>;
                };
                deleteMany: {
                    args: Prisma.LogisticsQuoteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LogisticsQuoteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LogisticsQuoteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload>[];
                };
                upsert: {
                    args: Prisma.LogisticsQuoteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsQuotePayload>;
                };
                aggregate: {
                    args: Prisma.LogisticsQuoteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLogisticsQuote>;
                };
                groupBy: {
                    args: Prisma.LogisticsQuoteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsQuoteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LogisticsQuoteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsQuoteCountAggregateOutputType> | number;
                };
            };
        };
        OrderPacking: {
            payload: Prisma.$OrderPackingPayload<ExtArgs>;
            fields: Prisma.OrderPackingFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderPackingFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderPackingFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload>;
                };
                findFirst: {
                    args: Prisma.OrderPackingFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderPackingFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload>;
                };
                findMany: {
                    args: Prisma.OrderPackingFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload>[];
                };
                create: {
                    args: Prisma.OrderPackingCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload>;
                };
                createMany: {
                    args: Prisma.OrderPackingCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderPackingCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload>[];
                };
                delete: {
                    args: Prisma.OrderPackingDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload>;
                };
                update: {
                    args: Prisma.OrderPackingUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderPackingDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderPackingUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderPackingUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload>[];
                };
                upsert: {
                    args: Prisma.OrderPackingUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPackingPayload>;
                };
                aggregate: {
                    args: Prisma.OrderPackingAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderPacking>;
                };
                groupBy: {
                    args: Prisma.OrderPackingGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderPackingGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderPackingCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderPackingCountAggregateOutputType> | number;
                };
            };
        };
        PickupRequest: {
            payload: Prisma.$PickupRequestPayload<ExtArgs>;
            fields: Prisma.PickupRequestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PickupRequestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PickupRequestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload>;
                };
                findFirst: {
                    args: Prisma.PickupRequestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PickupRequestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload>;
                };
                findMany: {
                    args: Prisma.PickupRequestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload>[];
                };
                create: {
                    args: Prisma.PickupRequestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload>;
                };
                createMany: {
                    args: Prisma.PickupRequestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PickupRequestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload>[];
                };
                delete: {
                    args: Prisma.PickupRequestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload>;
                };
                update: {
                    args: Prisma.PickupRequestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload>;
                };
                deleteMany: {
                    args: Prisma.PickupRequestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PickupRequestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PickupRequestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload>[];
                };
                upsert: {
                    args: Prisma.PickupRequestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PickupRequestPayload>;
                };
                aggregate: {
                    args: Prisma.PickupRequestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePickupRequest>;
                };
                groupBy: {
                    args: Prisma.PickupRequestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PickupRequestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PickupRequestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PickupRequestCountAggregateOutputType> | number;
                };
            };
        };
        HubReceipt: {
            payload: Prisma.$HubReceiptPayload<ExtArgs>;
            fields: Prisma.HubReceiptFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HubReceiptFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HubReceiptFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload>;
                };
                findFirst: {
                    args: Prisma.HubReceiptFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HubReceiptFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload>;
                };
                findMany: {
                    args: Prisma.HubReceiptFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload>[];
                };
                create: {
                    args: Prisma.HubReceiptCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload>;
                };
                createMany: {
                    args: Prisma.HubReceiptCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HubReceiptCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload>[];
                };
                delete: {
                    args: Prisma.HubReceiptDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload>;
                };
                update: {
                    args: Prisma.HubReceiptUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload>;
                };
                deleteMany: {
                    args: Prisma.HubReceiptDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HubReceiptUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HubReceiptUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload>[];
                };
                upsert: {
                    args: Prisma.HubReceiptUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPayload>;
                };
                aggregate: {
                    args: Prisma.HubReceiptAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHubReceipt>;
                };
                groupBy: {
                    args: Prisma.HubReceiptGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HubReceiptGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HubReceiptCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HubReceiptCountAggregateOutputType> | number;
                };
            };
        };
        HubReceiptPhoto: {
            payload: Prisma.$HubReceiptPhotoPayload<ExtArgs>;
            fields: Prisma.HubReceiptPhotoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HubReceiptPhotoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HubReceiptPhotoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload>;
                };
                findFirst: {
                    args: Prisma.HubReceiptPhotoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HubReceiptPhotoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload>;
                };
                findMany: {
                    args: Prisma.HubReceiptPhotoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload>[];
                };
                create: {
                    args: Prisma.HubReceiptPhotoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload>;
                };
                createMany: {
                    args: Prisma.HubReceiptPhotoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.HubReceiptPhotoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload>[];
                };
                delete: {
                    args: Prisma.HubReceiptPhotoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload>;
                };
                update: {
                    args: Prisma.HubReceiptPhotoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload>;
                };
                deleteMany: {
                    args: Prisma.HubReceiptPhotoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HubReceiptPhotoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.HubReceiptPhotoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload>[];
                };
                upsert: {
                    args: Prisma.HubReceiptPhotoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HubReceiptPhotoPayload>;
                };
                aggregate: {
                    args: Prisma.HubReceiptPhotoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHubReceiptPhoto>;
                };
                groupBy: {
                    args: Prisma.HubReceiptPhotoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HubReceiptPhotoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HubReceiptPhotoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HubReceiptPhotoCountAggregateOutputType> | number;
                };
            };
        };
        Consolidation: {
            payload: Prisma.$ConsolidationPayload<ExtArgs>;
            fields: Prisma.ConsolidationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ConsolidationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ConsolidationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload>;
                };
                findFirst: {
                    args: Prisma.ConsolidationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ConsolidationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload>;
                };
                findMany: {
                    args: Prisma.ConsolidationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload>[];
                };
                create: {
                    args: Prisma.ConsolidationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload>;
                };
                createMany: {
                    args: Prisma.ConsolidationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ConsolidationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload>[];
                };
                delete: {
                    args: Prisma.ConsolidationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload>;
                };
                update: {
                    args: Prisma.ConsolidationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload>;
                };
                deleteMany: {
                    args: Prisma.ConsolidationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ConsolidationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ConsolidationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload>[];
                };
                upsert: {
                    args: Prisma.ConsolidationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ConsolidationPayload>;
                };
                aggregate: {
                    args: Prisma.ConsolidationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateConsolidation>;
                };
                groupBy: {
                    args: Prisma.ConsolidationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConsolidationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ConsolidationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ConsolidationCountAggregateOutputType> | number;
                };
            };
        };
        LogisticsShipment: {
            payload: Prisma.$LogisticsShipmentPayload<ExtArgs>;
            fields: Prisma.LogisticsShipmentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LogisticsShipmentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LogisticsShipmentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload>;
                };
                findFirst: {
                    args: Prisma.LogisticsShipmentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LogisticsShipmentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload>;
                };
                findMany: {
                    args: Prisma.LogisticsShipmentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload>[];
                };
                create: {
                    args: Prisma.LogisticsShipmentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload>;
                };
                createMany: {
                    args: Prisma.LogisticsShipmentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LogisticsShipmentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload>[];
                };
                delete: {
                    args: Prisma.LogisticsShipmentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload>;
                };
                update: {
                    args: Prisma.LogisticsShipmentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload>;
                };
                deleteMany: {
                    args: Prisma.LogisticsShipmentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LogisticsShipmentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LogisticsShipmentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload>[];
                };
                upsert: {
                    args: Prisma.LogisticsShipmentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentPayload>;
                };
                aggregate: {
                    args: Prisma.LogisticsShipmentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLogisticsShipment>;
                };
                groupBy: {
                    args: Prisma.LogisticsShipmentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsShipmentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LogisticsShipmentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsShipmentCountAggregateOutputType> | number;
                };
            };
        };
        LogisticsShipmentOrder: {
            payload: Prisma.$LogisticsShipmentOrderPayload<ExtArgs>;
            fields: Prisma.LogisticsShipmentOrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LogisticsShipmentOrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LogisticsShipmentOrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload>;
                };
                findFirst: {
                    args: Prisma.LogisticsShipmentOrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LogisticsShipmentOrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload>;
                };
                findMany: {
                    args: Prisma.LogisticsShipmentOrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload>[];
                };
                create: {
                    args: Prisma.LogisticsShipmentOrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload>;
                };
                createMany: {
                    args: Prisma.LogisticsShipmentOrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LogisticsShipmentOrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload>[];
                };
                delete: {
                    args: Prisma.LogisticsShipmentOrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload>;
                };
                update: {
                    args: Prisma.LogisticsShipmentOrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload>;
                };
                deleteMany: {
                    args: Prisma.LogisticsShipmentOrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LogisticsShipmentOrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LogisticsShipmentOrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload>[];
                };
                upsert: {
                    args: Prisma.LogisticsShipmentOrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsShipmentOrderPayload>;
                };
                aggregate: {
                    args: Prisma.LogisticsShipmentOrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLogisticsShipmentOrder>;
                };
                groupBy: {
                    args: Prisma.LogisticsShipmentOrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsShipmentOrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LogisticsShipmentOrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsShipmentOrderCountAggregateOutputType> | number;
                };
            };
        };
        ShipmentLeg: {
            payload: Prisma.$ShipmentLegPayload<ExtArgs>;
            fields: Prisma.ShipmentLegFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ShipmentLegFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ShipmentLegFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload>;
                };
                findFirst: {
                    args: Prisma.ShipmentLegFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ShipmentLegFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload>;
                };
                findMany: {
                    args: Prisma.ShipmentLegFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload>[];
                };
                create: {
                    args: Prisma.ShipmentLegCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload>;
                };
                createMany: {
                    args: Prisma.ShipmentLegCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ShipmentLegCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload>[];
                };
                delete: {
                    args: Prisma.ShipmentLegDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload>;
                };
                update: {
                    args: Prisma.ShipmentLegUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload>;
                };
                deleteMany: {
                    args: Prisma.ShipmentLegDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ShipmentLegUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ShipmentLegUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload>[];
                };
                upsert: {
                    args: Prisma.ShipmentLegUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentLegPayload>;
                };
                aggregate: {
                    args: Prisma.ShipmentLegAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateShipmentLeg>;
                };
                groupBy: {
                    args: Prisma.ShipmentLegGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShipmentLegGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ShipmentLegCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShipmentLegCountAggregateOutputType> | number;
                };
            };
        };
        ShipmentEvent: {
            payload: Prisma.$ShipmentEventPayload<ExtArgs>;
            fields: Prisma.ShipmentEventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ShipmentEventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ShipmentEventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload>;
                };
                findFirst: {
                    args: Prisma.ShipmentEventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ShipmentEventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload>;
                };
                findMany: {
                    args: Prisma.ShipmentEventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload>[];
                };
                create: {
                    args: Prisma.ShipmentEventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload>;
                };
                createMany: {
                    args: Prisma.ShipmentEventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ShipmentEventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload>[];
                };
                delete: {
                    args: Prisma.ShipmentEventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload>;
                };
                update: {
                    args: Prisma.ShipmentEventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload>;
                };
                deleteMany: {
                    args: Prisma.ShipmentEventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ShipmentEventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ShipmentEventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload>[];
                };
                upsert: {
                    args: Prisma.ShipmentEventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentEventPayload>;
                };
                aggregate: {
                    args: Prisma.ShipmentEventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateShipmentEvent>;
                };
                groupBy: {
                    args: Prisma.ShipmentEventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShipmentEventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ShipmentEventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShipmentEventCountAggregateOutputType> | number;
                };
            };
        };
        LogisticsDocument: {
            payload: Prisma.$LogisticsDocumentPayload<ExtArgs>;
            fields: Prisma.LogisticsDocumentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LogisticsDocumentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LogisticsDocumentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload>;
                };
                findFirst: {
                    args: Prisma.LogisticsDocumentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LogisticsDocumentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload>;
                };
                findMany: {
                    args: Prisma.LogisticsDocumentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload>[];
                };
                create: {
                    args: Prisma.LogisticsDocumentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload>;
                };
                createMany: {
                    args: Prisma.LogisticsDocumentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LogisticsDocumentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload>[];
                };
                delete: {
                    args: Prisma.LogisticsDocumentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload>;
                };
                update: {
                    args: Prisma.LogisticsDocumentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload>;
                };
                deleteMany: {
                    args: Prisma.LogisticsDocumentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LogisticsDocumentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LogisticsDocumentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload>[];
                };
                upsert: {
                    args: Prisma.LogisticsDocumentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsDocumentPayload>;
                };
                aggregate: {
                    args: Prisma.LogisticsDocumentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLogisticsDocument>;
                };
                groupBy: {
                    args: Prisma.LogisticsDocumentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsDocumentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LogisticsDocumentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsDocumentCountAggregateOutputType> | number;
                };
            };
        };
        ShipmentUpload: {
            payload: Prisma.$ShipmentUploadPayload<ExtArgs>;
            fields: Prisma.ShipmentUploadFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ShipmentUploadFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ShipmentUploadFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload>;
                };
                findFirst: {
                    args: Prisma.ShipmentUploadFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ShipmentUploadFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload>;
                };
                findMany: {
                    args: Prisma.ShipmentUploadFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload>[];
                };
                create: {
                    args: Prisma.ShipmentUploadCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload>;
                };
                createMany: {
                    args: Prisma.ShipmentUploadCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ShipmentUploadCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload>[];
                };
                delete: {
                    args: Prisma.ShipmentUploadDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload>;
                };
                update: {
                    args: Prisma.ShipmentUploadUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload>;
                };
                deleteMany: {
                    args: Prisma.ShipmentUploadDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ShipmentUploadUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ShipmentUploadUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload>[];
                };
                upsert: {
                    args: Prisma.ShipmentUploadUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ShipmentUploadPayload>;
                };
                aggregate: {
                    args: Prisma.ShipmentUploadAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateShipmentUpload>;
                };
                groupBy: {
                    args: Prisma.ShipmentUploadGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShipmentUploadGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ShipmentUploadCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ShipmentUploadCountAggregateOutputType> | number;
                };
            };
        };
        LogisticsClaim: {
            payload: Prisma.$LogisticsClaimPayload<ExtArgs>;
            fields: Prisma.LogisticsClaimFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LogisticsClaimFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LogisticsClaimFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload>;
                };
                findFirst: {
                    args: Prisma.LogisticsClaimFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LogisticsClaimFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload>;
                };
                findMany: {
                    args: Prisma.LogisticsClaimFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload>[];
                };
                create: {
                    args: Prisma.LogisticsClaimCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload>;
                };
                createMany: {
                    args: Prisma.LogisticsClaimCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LogisticsClaimCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload>[];
                };
                delete: {
                    args: Prisma.LogisticsClaimDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload>;
                };
                update: {
                    args: Prisma.LogisticsClaimUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload>;
                };
                deleteMany: {
                    args: Prisma.LogisticsClaimDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LogisticsClaimUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LogisticsClaimUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload>[];
                };
                upsert: {
                    args: Prisma.LogisticsClaimUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LogisticsClaimPayload>;
                };
                aggregate: {
                    args: Prisma.LogisticsClaimAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLogisticsClaim>;
                };
                groupBy: {
                    args: Prisma.LogisticsClaimGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsClaimGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LogisticsClaimCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LogisticsClaimCountAggregateOutputType> | number;
                };
            };
        };
        OrderCharge: {
            payload: Prisma.$OrderChargePayload<ExtArgs>;
            fields: Prisma.OrderChargeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderChargeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderChargeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload>;
                };
                findFirst: {
                    args: Prisma.OrderChargeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderChargeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload>;
                };
                findMany: {
                    args: Prisma.OrderChargeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload>[];
                };
                create: {
                    args: Prisma.OrderChargeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload>;
                };
                createMany: {
                    args: Prisma.OrderChargeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderChargeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload>[];
                };
                delete: {
                    args: Prisma.OrderChargeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload>;
                };
                update: {
                    args: Prisma.OrderChargeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload>;
                };
                deleteMany: {
                    args: Prisma.OrderChargeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderChargeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderChargeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload>[];
                };
                upsert: {
                    args: Prisma.OrderChargeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderChargePayload>;
                };
                aggregate: {
                    args: Prisma.OrderChargeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderCharge>;
                };
                groupBy: {
                    args: Prisma.OrderChargeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderChargeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderChargeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderChargeCountAggregateOutputType> | number;
                };
            };
        };
        OrderFactoryChange: {
            payload: Prisma.$OrderFactoryChangePayload<ExtArgs>;
            fields: Prisma.OrderFactoryChangeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderFactoryChangeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderFactoryChangeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload>;
                };
                findFirst: {
                    args: Prisma.OrderFactoryChangeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderFactoryChangeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload>;
                };
                findMany: {
                    args: Prisma.OrderFactoryChangeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload>[];
                };
                create: {
                    args: Prisma.OrderFactoryChangeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload>;
                };
                createMany: {
                    args: Prisma.OrderFactoryChangeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderFactoryChangeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload>[];
                };
                delete: {
                    args: Prisma.OrderFactoryChangeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload>;
                };
                update: {
                    args: Prisma.OrderFactoryChangeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload>;
                };
                deleteMany: {
                    args: Prisma.OrderFactoryChangeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderFactoryChangeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderFactoryChangeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload>[];
                };
                upsert: {
                    args: Prisma.OrderFactoryChangeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderFactoryChangePayload>;
                };
                aggregate: {
                    args: Prisma.OrderFactoryChangeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderFactoryChange>;
                };
                groupBy: {
                    args: Prisma.OrderFactoryChangeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderFactoryChangeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderFactoryChangeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderFactoryChangeCountAggregateOutputType> | number;
                };
            };
        };
        FactoryBankAccount: {
            payload: Prisma.$FactoryBankAccountPayload<ExtArgs>;
            fields: Prisma.FactoryBankAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FactoryBankAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FactoryBankAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload>;
                };
                findFirst: {
                    args: Prisma.FactoryBankAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FactoryBankAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload>;
                };
                findMany: {
                    args: Prisma.FactoryBankAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload>[];
                };
                create: {
                    args: Prisma.FactoryBankAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload>;
                };
                createMany: {
                    args: Prisma.FactoryBankAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FactoryBankAccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload>[];
                };
                delete: {
                    args: Prisma.FactoryBankAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload>;
                };
                update: {
                    args: Prisma.FactoryBankAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.FactoryBankAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FactoryBankAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FactoryBankAccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload>[];
                };
                upsert: {
                    args: Prisma.FactoryBankAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FactoryBankAccountPayload>;
                };
                aggregate: {
                    args: Prisma.FactoryBankAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFactoryBankAccount>;
                };
                groupBy: {
                    args: Prisma.FactoryBankAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FactoryBankAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FactoryBankAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FactoryBankAccountCountAggregateOutputType> | number;
                };
            };
        };
        SupplyContract: {
            payload: Prisma.$SupplyContractPayload<ExtArgs>;
            fields: Prisma.SupplyContractFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SupplyContractFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SupplyContractFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload>;
                };
                findFirst: {
                    args: Prisma.SupplyContractFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SupplyContractFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload>;
                };
                findMany: {
                    args: Prisma.SupplyContractFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload>[];
                };
                create: {
                    args: Prisma.SupplyContractCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload>;
                };
                createMany: {
                    args: Prisma.SupplyContractCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SupplyContractCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload>[];
                };
                delete: {
                    args: Prisma.SupplyContractDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload>;
                };
                update: {
                    args: Prisma.SupplyContractUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload>;
                };
                deleteMany: {
                    args: Prisma.SupplyContractDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SupplyContractUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SupplyContractUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload>[];
                };
                upsert: {
                    args: Prisma.SupplyContractUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SupplyContractPayload>;
                };
                aggregate: {
                    args: Prisma.SupplyContractAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSupplyContract>;
                };
                groupBy: {
                    args: Prisma.SupplyContractGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplyContractGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SupplyContractCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SupplyContractCountAggregateOutputType> | number;
                };
            };
        };
        InspectorApplication: {
            payload: Prisma.$InspectorApplicationPayload<ExtArgs>;
            fields: Prisma.InspectorApplicationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InspectorApplicationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InspectorApplicationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload>;
                };
                findFirst: {
                    args: Prisma.InspectorApplicationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InspectorApplicationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload>;
                };
                findMany: {
                    args: Prisma.InspectorApplicationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload>[];
                };
                create: {
                    args: Prisma.InspectorApplicationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload>;
                };
                createMany: {
                    args: Prisma.InspectorApplicationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InspectorApplicationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload>[];
                };
                delete: {
                    args: Prisma.InspectorApplicationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload>;
                };
                update: {
                    args: Prisma.InspectorApplicationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload>;
                };
                deleteMany: {
                    args: Prisma.InspectorApplicationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InspectorApplicationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InspectorApplicationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload>[];
                };
                upsert: {
                    args: Prisma.InspectorApplicationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorApplicationPayload>;
                };
                aggregate: {
                    args: Prisma.InspectorApplicationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInspectorApplication>;
                };
                groupBy: {
                    args: Prisma.InspectorApplicationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InspectorApplicationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InspectorApplicationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InspectorApplicationCountAggregateOutputType> | number;
                };
            };
        };
        InspectorProfile: {
            payload: Prisma.$InspectorProfilePayload<ExtArgs>;
            fields: Prisma.InspectorProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.InspectorProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.InspectorProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload>;
                };
                findFirst: {
                    args: Prisma.InspectorProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.InspectorProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload>;
                };
                findMany: {
                    args: Prisma.InspectorProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload>[];
                };
                create: {
                    args: Prisma.InspectorProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload>;
                };
                createMany: {
                    args: Prisma.InspectorProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.InspectorProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload>[];
                };
                delete: {
                    args: Prisma.InspectorProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload>;
                };
                update: {
                    args: Prisma.InspectorProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.InspectorProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.InspectorProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.InspectorProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload>[];
                };
                upsert: {
                    args: Prisma.InspectorProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$InspectorProfilePayload>;
                };
                aggregate: {
                    args: Prisma.InspectorProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateInspectorProfile>;
                };
                groupBy: {
                    args: Prisma.InspectorProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InspectorProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.InspectorProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.InspectorProfileCountAggregateOutputType> | number;
                };
            };
        };
        PlanSubscription: {
            payload: Prisma.$PlanSubscriptionPayload<ExtArgs>;
            fields: Prisma.PlanSubscriptionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PlanSubscriptionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PlanSubscriptionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload>;
                };
                findFirst: {
                    args: Prisma.PlanSubscriptionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PlanSubscriptionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload>;
                };
                findMany: {
                    args: Prisma.PlanSubscriptionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload>[];
                };
                create: {
                    args: Prisma.PlanSubscriptionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload>;
                };
                createMany: {
                    args: Prisma.PlanSubscriptionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PlanSubscriptionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload>[];
                };
                delete: {
                    args: Prisma.PlanSubscriptionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload>;
                };
                update: {
                    args: Prisma.PlanSubscriptionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload>;
                };
                deleteMany: {
                    args: Prisma.PlanSubscriptionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PlanSubscriptionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PlanSubscriptionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload>[];
                };
                upsert: {
                    args: Prisma.PlanSubscriptionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanSubscriptionPayload>;
                };
                aggregate: {
                    args: Prisma.PlanSubscriptionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlanSubscription>;
                };
                groupBy: {
                    args: Prisma.PlanSubscriptionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlanSubscriptionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PlanSubscriptionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlanSubscriptionCountAggregateOutputType> | number;
                };
            };
        };
        PlanInvoice: {
            payload: Prisma.$PlanInvoicePayload<ExtArgs>;
            fields: Prisma.PlanInvoiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PlanInvoiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PlanInvoiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload>;
                };
                findFirst: {
                    args: Prisma.PlanInvoiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PlanInvoiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload>;
                };
                findMany: {
                    args: Prisma.PlanInvoiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload>[];
                };
                create: {
                    args: Prisma.PlanInvoiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload>;
                };
                createMany: {
                    args: Prisma.PlanInvoiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PlanInvoiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload>[];
                };
                delete: {
                    args: Prisma.PlanInvoiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload>;
                };
                update: {
                    args: Prisma.PlanInvoiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload>;
                };
                deleteMany: {
                    args: Prisma.PlanInvoiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PlanInvoiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PlanInvoiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload>[];
                };
                upsert: {
                    args: Prisma.PlanInvoiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PlanInvoicePayload>;
                };
                aggregate: {
                    args: Prisma.PlanInvoiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlanInvoice>;
                };
                groupBy: {
                    args: Prisma.PlanInvoiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlanInvoiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PlanInvoiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PlanInvoiceCountAggregateOutputType> | number;
                };
            };
        };
        OutboundMessage: {
            payload: Prisma.$OutboundMessagePayload<ExtArgs>;
            fields: Prisma.OutboundMessageFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OutboundMessageFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OutboundMessageFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload>;
                };
                findFirst: {
                    args: Prisma.OutboundMessageFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OutboundMessageFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload>;
                };
                findMany: {
                    args: Prisma.OutboundMessageFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload>[];
                };
                create: {
                    args: Prisma.OutboundMessageCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload>;
                };
                createMany: {
                    args: Prisma.OutboundMessageCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OutboundMessageCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload>[];
                };
                delete: {
                    args: Prisma.OutboundMessageDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload>;
                };
                update: {
                    args: Prisma.OutboundMessageUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload>;
                };
                deleteMany: {
                    args: Prisma.OutboundMessageDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OutboundMessageUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OutboundMessageUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload>[];
                };
                upsert: {
                    args: Prisma.OutboundMessageUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OutboundMessagePayload>;
                };
                aggregate: {
                    args: Prisma.OutboundMessageAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOutboundMessage>;
                };
                groupBy: {
                    args: Prisma.OutboundMessageGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OutboundMessageGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OutboundMessageCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OutboundMessageCountAggregateOutputType> | number;
                };
            };
        };
        Lead: {
            payload: Prisma.$LeadPayload<ExtArgs>;
            fields: Prisma.LeadFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LeadFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LeadFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                findFirst: {
                    args: Prisma.LeadFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LeadFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                findMany: {
                    args: Prisma.LeadFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>[];
                };
                create: {
                    args: Prisma.LeadCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                createMany: {
                    args: Prisma.LeadCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LeadCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>[];
                };
                delete: {
                    args: Prisma.LeadDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                update: {
                    args: Prisma.LeadUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                deleteMany: {
                    args: Prisma.LeadDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LeadUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LeadUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>[];
                };
                upsert: {
                    args: Prisma.LeadUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LeadPayload>;
                };
                aggregate: {
                    args: Prisma.LeadAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLead>;
                };
                groupBy: {
                    args: Prisma.LeadGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LeadGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LeadCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LeadCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly logisticsPartnerId: "logisticsPartnerId";
    readonly status: "status";
    readonly locale: "locale";
    readonly phoneE164: "phoneE164";
    readonly phoneVerifiedAt: "phoneVerifiedAt";
    readonly pendingPhone: "pendingPhone";
    readonly phoneCodeHash: "phoneCodeHash";
    readonly phoneCodeExpiresAt: "phoneCodeExpiresAt";
    readonly phoneCodeAttempts: "phoneCodeAttempts";
    readonly textChannel: "textChannel";
    readonly displayCurrency: "displayCurrency";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly emailVerifiedAt: "emailVerifiedAt";
    readonly lastLoginAt: "lastLoginAt";
    readonly suspendedReason: "suspendedReason";
    readonly suspendedAt: "suspendedAt";
    readonly companyId: "companyId";
    readonly companyRole: "companyRole";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const SessionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly familyId: "familyId";
    readonly refreshTokenHash: "refreshTokenHash";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly replacedById: "replacedById";
    readonly ip: "ip";
    readonly userAgent: "userAgent";
    readonly createdAt: "createdAt";
    readonly lastUsedAt: "lastUsedAt";
};
export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum];
export declare const UserTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
};
export type UserTokenScalarFieldEnum = (typeof UserTokenScalarFieldEnum)[keyof typeof UserTokenScalarFieldEnum];
export declare const CodeSequenceScalarFieldEnum: {
    readonly prefix: "prefix";
    readonly lastValue: "lastValue";
};
export type CodeSequenceScalarFieldEnum = (typeof CodeSequenceScalarFieldEnum)[keyof typeof CodeSequenceScalarFieldEnum];
export declare const CompanyScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly legalName: "legalName";
    readonly tradeName: "tradeName";
    readonly country: "country";
    readonly city: "city";
    readonly addressLine1: "addressLine1";
    readonly addressLine2: "addressLine2";
    readonly postalCode: "postalCode";
    readonly registrationNumber: "registrationNumber";
    readonly taxId: "taxId";
    readonly website: "website";
    readonly merchandiserId: "merchandiserId";
    readonly phone: "phone";
    readonly yearEstablished: "yearEstablished";
    readonly onboardingStep: "onboardingStep";
    readonly kycStatus: "kycStatus";
    readonly kycSubmittedAt: "kycSubmittedAt";
    readonly kycReviewedAt: "kycReviewedAt";
    readonly kycReviewedById: "kycReviewedById";
    readonly kycRejectionReason: "kycRejectionReason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum];
export declare const CompanyDocumentScalarFieldEnum: {
    readonly id: "id";
    readonly companyId: "companyId";
    readonly type: "type";
    readonly fileId: "fileId";
    readonly status: "status";
    readonly documentNumber: "documentNumber";
    readonly expiresAt: "expiresAt";
    readonly rejectionReason: "rejectionReason";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CompanyDocumentScalarFieldEnum = (typeof CompanyDocumentScalarFieldEnum)[keyof typeof CompanyDocumentScalarFieldEnum];
export declare const BuyerProfileScalarFieldEnum: {
    readonly id: "id";
    readonly companyId: "companyId";
    readonly publicCode: "publicCode";
    readonly plusActive: "plusActive";
    readonly businessType: "businessType";
    readonly annualVolumePcs: "annualVolumePcs";
    readonly typicalOrderQuantityPcs: "typicalOrderQuantityPcs";
    readonly targetMarkets: "targetMarkets";
    readonly sourcingNeeds: "sourcingNeeds";
    readonly sourcingNeedsFiltered: "sourcingNeedsFiltered";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BuyerProfileScalarFieldEnum = (typeof BuyerProfileScalarFieldEnum)[keyof typeof BuyerProfileScalarFieldEnum];
export declare const ManufacturerProfileScalarFieldEnum: {
    readonly id: "id";
    readonly companyId: "companyId";
    readonly publicCode: "publicCode";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly planTier: "planTier";
    readonly searchBoost: "searchBoost";
    readonly headline: "headline";
    readonly about: "about";
    readonly aboutFiltered: "aboutFiltered";
    readonly monthlyCapacityPcs: "monthlyCapacityPcs";
    readonly moqPcs: "moqPcs";
    readonly sampleLeadTimeDays: "sampleLeadTimeDays";
    readonly productionLeadTimeMinDays: "productionLeadTimeMinDays";
    readonly productionLeadTimeMaxDays: "productionLeadTimeMaxDays";
    readonly machinery: "machinery";
    readonly workforceSize: "workforceSize";
    readonly factorySizeSqm: "factorySizeSqm";
    readonly exportMarkets: "exportMarkets";
    readonly performanceScore: "performanceScore";
    readonly onTimeDeliveryBps: "onTimeDeliveryBps";
    readonly qcPassBps: "qcPassBps";
    readonly reviewCount: "reviewCount";
    readonly ratingAvgX100: "ratingAvgX100";
    readonly qualityAvgX100: "qualityAvgX100";
    readonly communicationAvgX100: "communicationAvgX100";
    readonly onTimeAvgX100: "onTimeAvgX100";
    readonly isListed: "isListed";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ManufacturerProfileScalarFieldEnum = (typeof ManufacturerProfileScalarFieldEnum)[keyof typeof ManufacturerProfileScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly slug: "slug";
    readonly name: "name";
    readonly parentId: "parentId";
    readonly sortOrder: "sortOrder";
    readonly createdAt: "createdAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const CertificationScalarFieldEnum: {
    readonly id: "id";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly type: "type";
    readonly customName: "customName";
    readonly certificateNumber: "certificateNumber";
    readonly issuedAt: "issuedAt";
    readonly expiresAt: "expiresAt";
    readonly fileId: "fileId";
    readonly status: "status";
    readonly verifiedAt: "verifiedAt";
    readonly rejectionReason: "rejectionReason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CertificationScalarFieldEnum = (typeof CertificationScalarFieldEnum)[keyof typeof CertificationScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly categoryId: "categoryId";
    readonly title: "title";
    readonly description: "description";
    readonly descriptionFiltered: "descriptionFiltered";
    readonly fabric: "fabric";
    readonly composition: "composition";
    readonly gsm: "gsm";
    readonly moqPcs: "moqPcs";
    readonly leadTimeDays: "leadTimeDays";
    readonly currency: "currency";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const ProductPriceTierScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly minQty: "minQty";
    readonly manufacturerUnitPriceMinor: "manufacturerUnitPriceMinor";
    readonly buyerUnitPriceMinor: "buyerUnitPriceMinor";
};
export type ProductPriceTierScalarFieldEnum = (typeof ProductPriceTierScalarFieldEnum)[keyof typeof ProductPriceTierScalarFieldEnum];
export declare const ProductImageScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly fileId: "fileId";
    readonly sortOrder: "sortOrder";
    readonly alt: "alt";
    readonly reviewStatus: "reviewStatus";
    readonly reviewNote: "reviewNote";
    readonly reviewedAt: "reviewedAt";
};
export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum];
export declare const FactoryPhotoScalarFieldEnum: {
    readonly id: "id";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly fileId: "fileId";
    readonly caption: "caption";
    readonly sortOrder: "sortOrder";
    readonly reviewStatus: "reviewStatus";
    readonly reviewNote: "reviewNote";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
};
export type FactoryPhotoScalarFieldEnum = (typeof FactoryPhotoScalarFieldEnum)[keyof typeof FactoryPhotoScalarFieldEnum];
export declare const CapacityMonthScalarFieldEnum: {
    readonly id: "id";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly month: "month";
    readonly availablePcs: "availablePcs";
    readonly externalBookedPcs: "externalBookedPcs";
    readonly note: "note";
    readonly updatedAt: "updatedAt";
};
export type CapacityMonthScalarFieldEnum = (typeof CapacityMonthScalarFieldEnum)[keyof typeof CapacityMonthScalarFieldEnum];
export declare const RfqScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly buyerCompanyId: "buyerCompanyId";
    readonly createdById: "createdById";
    readonly categoryId: "categoryId";
    readonly title: "title";
    readonly titleFiltered: "titleFiltered";
    readonly description: "description";
    readonly descriptionFiltered: "descriptionFiltered";
    readonly quantity: "quantity";
    readonly targetUnitPriceMinor: "targetUnitPriceMinor";
    readonly currency: "currency";
    readonly deadline: "deadline";
    readonly requiredDeliveryDate: "requiredDeliveryDate";
    readonly incoterm: "incoterm";
    readonly destinationCountry: "destinationCountry";
    readonly productId: "productId";
    readonly capacityBookingId: "capacityBookingId";
    readonly status: "status";
    readonly publishedAt: "publishedAt";
    readonly headStartEndsAt: "headStartEndsAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RfqScalarFieldEnum = (typeof RfqScalarFieldEnum)[keyof typeof RfqScalarFieldEnum];
export declare const RfqInvitationScalarFieldEnum: {
    readonly id: "id";
    readonly rfqId: "rfqId";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly status: "status";
    readonly invitedAt: "invitedAt";
    readonly visibleAt: "visibleAt";
    readonly notifiedAt: "notifiedAt";
    readonly respondedAt: "respondedAt";
    readonly declineReason: "declineReason";
};
export type RfqInvitationScalarFieldEnum = (typeof RfqInvitationScalarFieldEnum)[keyof typeof RfqInvitationScalarFieldEnum];
export declare const RfqAttachmentScalarFieldEnum: {
    readonly id: "id";
    readonly rfqId: "rfqId";
    readonly fileId: "fileId";
    readonly kind: "kind";
    readonly reviewStatus: "reviewStatus";
    readonly reviewNote: "reviewNote";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
};
export type RfqAttachmentScalarFieldEnum = (typeof RfqAttachmentScalarFieldEnum)[keyof typeof RfqAttachmentScalarFieldEnum];
export declare const QuoteScalarFieldEnum: {
    readonly id: "id";
    readonly rfqId: "rfqId";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly manufacturerUnitPriceMinor: "manufacturerUnitPriceMinor";
    readonly buyerUnitPriceMinor: "buyerUnitPriceMinor";
    readonly currency: "currency";
    readonly leadTimeDays: "leadTimeDays";
    readonly moqPcs: "moqPcs";
    readonly validUntil: "validUntil";
    readonly notes: "notes";
    readonly notesFiltered: "notesFiltered";
    readonly status: "status";
    readonly marginRuleId: "marginRuleId";
    readonly pricedById: "pricedById";
    readonly pricedAt: "pricedAt";
    readonly offeredAt: "offeredAt";
    readonly decidedAt: "decidedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type QuoteScalarFieldEnum = (typeof QuoteScalarFieldEnum)[keyof typeof QuoteScalarFieldEnum];
export declare const MarginRuleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly markupBps: "markupBps";
    readonly minMarginPerUnitMinor: "minMarginPerUnitMinor";
    readonly commissionBps: "commissionBps";
    readonly repeatCommissionBps: "repeatCommissionBps";
    readonly categoryId: "categoryId";
    readonly companyId: "companyId";
    readonly active: "active";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MarginRuleScalarFieldEnum = (typeof MarginRuleScalarFieldEnum)[keyof typeof MarginRuleScalarFieldEnum];
export declare const ConversationScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly companyId: "companyId";
    readonly subject: "subject";
    readonly rfqId: "rfqId";
    readonly orderId: "orderId";
    readonly disputeId: "disputeId";
    readonly lastMessageAt: "lastMessageAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum];
export declare const ConversationParticipantScalarFieldEnum: {
    readonly conversationId: "conversationId";
    readonly userId: "userId";
    readonly joinedAt: "joinedAt";
    readonly lastReadAt: "lastReadAt";
};
export type ConversationParticipantScalarFieldEnum = (typeof ConversationParticipantScalarFieldEnum)[keyof typeof ConversationParticipantScalarFieldEnum];
export declare const MessageScalarFieldEnum: {
    readonly id: "id";
    readonly conversationId: "conversationId";
    readonly senderId: "senderId";
    readonly originalContent: "originalContent";
    readonly filteredContent: "filteredContent";
    readonly relayedFromId: "relayedFromId";
    readonly flagged: "flagged";
    readonly flagReasons: "flagReasons";
    readonly moderationStatus: "moderationStatus";
    readonly editedAt: "editedAt";
    readonly createdAt: "createdAt";
};
export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum];
export declare const MessageAttachmentScalarFieldEnum: {
    readonly id: "id";
    readonly messageId: "messageId";
    readonly fileId: "fileId";
    readonly displayName: "displayName";
    readonly flagged: "flagged";
    readonly flagReasons: "flagReasons";
    readonly scannedAt: "scannedAt";
};
export type MessageAttachmentScalarFieldEnum = (typeof MessageAttachmentScalarFieldEnum)[keyof typeof MessageAttachmentScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly buyerCompanyId: "buyerCompanyId";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly rfqId: "rfqId";
    readonly quoteId: "quoteId";
    readonly hsCode: "hsCode";
    readonly title: "title";
    readonly specification: "specification";
    readonly quantity: "quantity";
    readonly buyerUnitPriceMinor: "buyerUnitPriceMinor";
    readonly manufacturerUnitPriceMinor: "manufacturerUnitPriceMinor";
    readonly buyerTotalMinor: "buyerTotalMinor";
    readonly manufacturerTotalMinor: "manufacturerTotalMinor";
    readonly currency: "currency";
    readonly incoterm: "incoterm";
    readonly destinationCountry: "destinationCountry";
    readonly destinationPort: "destinationPort";
    readonly depositBps: "depositBps";
    readonly requestedShipDate: "requestedShipDate";
    readonly status: "status";
    readonly disputedFrom: "disputedFrom";
    readonly reorderOfId: "reorderOfId";
    readonly commissionBps: "commissionBps";
    readonly commissionMinor: "commissionMinor";
    readonly repeatOrder: "repeatOrder";
    readonly confirmedAt: "confirmedAt";
    readonly completedAt: "completedAt";
    readonly cancelledAt: "cancelledAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly sampleCreditMinor: "sampleCreditMinor";
    readonly contractId: "contractId";
    readonly delayAlertedAt: "delayAlertedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly color: "color";
    readonly size: "size";
    readonly quantity: "quantity";
    readonly sku: "sku";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const OrderMilestoneScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly stage: "stage";
    readonly status: "status";
    readonly plannedAt: "plannedAt";
    readonly completedAt: "completedAt";
    readonly note: "note";
    readonly noteFiltered: "noteFiltered";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderMilestoneScalarFieldEnum = (typeof OrderMilestoneScalarFieldEnum)[keyof typeof OrderMilestoneScalarFieldEnum];
export declare const MilestonePhotoScalarFieldEnum: {
    readonly id: "id";
    readonly milestoneId: "milestoneId";
    readonly fileId: "fileId";
    readonly takenAt: "takenAt";
    readonly caption: "caption";
    readonly reviewStatus: "reviewStatus";
    readonly reviewNote: "reviewNote";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
};
export type MilestonePhotoScalarFieldEnum = (typeof MilestonePhotoScalarFieldEnum)[keyof typeof MilestonePhotoScalarFieldEnum];
export declare const SampleScalarFieldEnum: {
    readonly id: "id";
    readonly round: "round";
    readonly requestNotes: "requestNotes";
    readonly requestNotesFiltered: "requestNotesFiltered";
    readonly rfqId: "rfqId";
    readonly orderId: "orderId";
    readonly type: "type";
    readonly status: "status";
    readonly quantity: "quantity";
    readonly buyerFeeMinor: "buyerFeeMinor";
    readonly currency: "currency";
    readonly courier: "courier";
    readonly trackingNumber: "trackingNumber";
    readonly shippedAt: "shippedAt";
    readonly receivedAt: "receivedAt";
    readonly buyerFeedback: "buyerFeedback";
    readonly buyerFeedbackFiltered: "buyerFeedbackFiltered";
    readonly decidedAt: "decidedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SampleScalarFieldEnum = (typeof SampleScalarFieldEnum)[keyof typeof SampleScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly capacityBookingId: "capacityBookingId";
    readonly logisticsShipmentId: "logisticsShipmentId";
    readonly reference: "reference";
    readonly payerReference: "payerReference";
    readonly proofFileId: "proofFileId";
    readonly confirmedById: "confirmedById";
    readonly unitsPerUsd: "unitsPerUsd";
    readonly amountUsdMinor: "amountUsdMinor";
    readonly settlementCurrency: "settlementCurrency";
    readonly settlementAmountMinor: "settlementAmountMinor";
    readonly releaseId: "releaseId";
    readonly factoryBankAccountId: "factoryBankAccountId";
    readonly direction: "direction";
    readonly purpose: "purpose";
    readonly amountMinor: "amountMinor";
    readonly currency: "currency";
    readonly method: "method";
    readonly provider: "provider";
    readonly providerRef: "providerRef";
    readonly status: "status";
    readonly paidAt: "paidAt";
    readonly failureReason: "failureReason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const LedgerAccountScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly companyId: "companyId";
    readonly currency: "currency";
    readonly createdAt: "createdAt";
    readonly logisticsPartnerId: "logisticsPartnerId";
};
export type LedgerAccountScalarFieldEnum = (typeof LedgerAccountScalarFieldEnum)[keyof typeof LedgerAccountScalarFieldEnum];
export declare const LedgerTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly kind: "kind";
    readonly orderId: "orderId";
    readonly capacityBookingId: "capacityBookingId";
    readonly paymentId: "paymentId";
    readonly currency: "currency";
    readonly description: "description";
    readonly idempotencyKey: "idempotencyKey";
    readonly postedAt: "postedAt";
    readonly unitsPerUsd: "unitsPerUsd";
    readonly amountUsdMinor: "amountUsdMinor";
};
export type LedgerTransactionScalarFieldEnum = (typeof LedgerTransactionScalarFieldEnum)[keyof typeof LedgerTransactionScalarFieldEnum];
export declare const EscrowLedgerEntryScalarFieldEnum: {
    readonly id: "id";
    readonly transactionId: "transactionId";
    readonly accountId: "accountId";
    readonly direction: "direction";
    readonly amountMinor: "amountMinor";
    readonly createdAt: "createdAt";
};
export type EscrowLedgerEntryScalarFieldEnum = (typeof EscrowLedgerEntryScalarFieldEnum)[keyof typeof EscrowLedgerEntryScalarFieldEnum];
export declare const InspectionScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly type: "type";
    readonly agency: "agency";
    readonly scheduledAt: "scheduledAt";
    readonly inspectedAt: "inspectedAt";
    readonly bookedById: "bookedById";
    readonly inspectorId: "inspectorId";
    readonly assignedAt: "assignedAt";
    readonly checkedInAt: "checkedInAt";
    readonly checkInDistanceM: "checkInDistanceM";
    readonly payUsdMinor: "payUsdMinor";
    readonly earnedAt: "earnedAt";
    readonly paidAt: "paidAt";
    readonly payoutReference: "payoutReference";
    readonly rating: "rating";
    readonly auditRequested: "auditRequested";
    readonly lotSize: "lotSize";
    readonly aqlLevel: "aqlLevel";
    readonly aqlMajor: "aqlMajor";
    readonly aqlMinor: "aqlMinor";
    readonly sampleSize: "sampleSize";
    readonly criticalDefects: "criticalDefects";
    readonly majorDefects: "majorDefects";
    readonly minorDefects: "minorDefects";
    readonly result: "result";
    readonly summary: "summary";
    readonly reportFileId: "reportFileId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InspectionScalarFieldEnum = (typeof InspectionScalarFieldEnum)[keyof typeof InspectionScalarFieldEnum];
export declare const InspectionPhotoScalarFieldEnum: {
    readonly id: "id";
    readonly inspectionId: "inspectionId";
    readonly fileId: "fileId";
    readonly caption: "caption";
    readonly reviewStatus: "reviewStatus";
    readonly reviewNote: "reviewNote";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
};
export type InspectionPhotoScalarFieldEnum = (typeof InspectionPhotoScalarFieldEnum)[keyof typeof InspectionPhotoScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly authorCompanyId: "authorCompanyId";
    readonly subjectCompanyId: "subjectCompanyId";
    readonly direction: "direction";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly rating: "rating";
    readonly qualityRating: "qualityRating";
    readonly communicationRating: "communicationRating";
    readonly deliveryRating: "deliveryRating";
    readonly comment: "comment";
    readonly commentFiltered: "commentFiltered";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const DisputeScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly openedById: "openedById";
    readonly assignedToId: "assignedToId";
    readonly reason: "reason";
    readonly description: "description";
    readonly descriptionFiltered: "descriptionFiltered";
    readonly status: "status";
    readonly resolution: "resolution";
    readonly refundAmountMinor: "refundAmountMinor";
    readonly resolvedAt: "resolvedAt";
    readonly resolvedById: "resolvedById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DisputeScalarFieldEnum = (typeof DisputeScalarFieldEnum)[keyof typeof DisputeScalarFieldEnum];
export declare const DisputeEvidenceScalarFieldEnum: {
    readonly id: "id";
    readonly disputeId: "disputeId";
    readonly fileId: "fileId";
    readonly note: "note";
    readonly submittedBy: "submittedBy";
    readonly uploadedById: "uploadedById";
    readonly reviewStatus: "reviewStatus";
    readonly reviewNote: "reviewNote";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
};
export type DisputeEvidenceScalarFieldEnum = (typeof DisputeEvidenceScalarFieldEnum)[keyof typeof DisputeEvidenceScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly title: "title";
    readonly body: "body";
    readonly data: "data";
    readonly readAt: "readAt";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const NotificationPreferenceScalarFieldEnum: {
    readonly userId: "userId";
    readonly category: "category";
    readonly inApp: "inApp";
    readonly email: "email";
    readonly text: "text";
};
export type NotificationPreferenceScalarFieldEnum = (typeof NotificationPreferenceScalarFieldEnum)[keyof typeof NotificationPreferenceScalarFieldEnum];
export declare const AuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly actorUserId: "actorUserId";
    readonly action: "action";
    readonly entityType: "entityType";
    readonly entityId: "entityId";
    readonly metadata: "metadata";
    readonly ip: "ip";
    readonly userAgent: "userAgent";
    readonly createdAt: "createdAt";
};
export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum];
export declare const FileAssetScalarFieldEnum: {
    readonly id: "id";
    readonly bucket: "bucket";
    readonly storageKey: "storageKey";
    readonly sanitizedKey: "sanitizedKey";
    readonly originalFilename: "originalFilename";
    readonly mimeType: "mimeType";
    readonly sizeBytes: "sizeBytes";
    readonly checksumSha256: "checksumSha256";
    readonly purpose: "purpose";
    readonly status: "status";
    readonly scanStatus: "scanStatus";
    readonly uploadedById: "uploadedById";
    readonly ownerCompanyId: "ownerCompanyId";
    readonly uploadedAt: "uploadedAt";
    readonly processingStatus: "processingStatus";
    readonly processingError: "processingError";
    readonly processedAt: "processedAt";
    readonly width: "width";
    readonly height: "height";
    readonly createdAt: "createdAt";
};
export type FileAssetScalarFieldEnum = (typeof FileAssetScalarFieldEnum)[keyof typeof FileAssetScalarFieldEnum];
export declare const ImageRenditionScalarFieldEnum: {
    readonly id: "id";
    readonly fileId: "fileId";
    readonly width: "width";
    readonly height: "height";
    readonly storageKey: "storageKey";
    readonly sizeBytes: "sizeBytes";
    readonly format: "format";
    readonly createdAt: "createdAt";
};
export type ImageRenditionScalarFieldEnum = (typeof ImageRenditionScalarFieldEnum)[keyof typeof ImageRenditionScalarFieldEnum];
export declare const ShortlistScalarFieldEnum: {
    readonly id: "id";
    readonly companyId: "companyId";
    readonly name: "name";
    readonly isDefault: "isDefault";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ShortlistScalarFieldEnum = (typeof ShortlistScalarFieldEnum)[keyof typeof ShortlistScalarFieldEnum];
export declare const ShortlistItemScalarFieldEnum: {
    readonly id: "id";
    readonly shortlistId: "shortlistId";
    readonly productId: "productId";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly note: "note";
    readonly createdAt: "createdAt";
};
export type ShortlistItemScalarFieldEnum = (typeof ShortlistItemScalarFieldEnum)[keyof typeof ShortlistItemScalarFieldEnum];
export declare const AccountWarningScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly level: "level";
    readonly violations: "violations";
    readonly issuedById: "issuedById";
    readonly note: "note";
    readonly createdAt: "createdAt";
    readonly acknowledgedAt: "acknowledgedAt";
};
export type AccountWarningScalarFieldEnum = (typeof AccountWarningScalarFieldEnum)[keyof typeof AccountWarningScalarFieldEnum];
export declare const OrderEventScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly fromStatus: "fromStatus";
    readonly toStatus: "toStatus";
    readonly actorUserId: "actorUserId";
    readonly note: "note";
    readonly createdAt: "createdAt";
};
export type OrderEventScalarFieldEnum = (typeof OrderEventScalarFieldEnum)[keyof typeof OrderEventScalarFieldEnum];
export declare const SamplePhotoScalarFieldEnum: {
    readonly id: "id";
    readonly sampleId: "sampleId";
    readonly fileId: "fileId";
    readonly reviewStatus: "reviewStatus";
    readonly reviewNote: "reviewNote";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
};
export type SamplePhotoScalarFieldEnum = (typeof SamplePhotoScalarFieldEnum)[keyof typeof SamplePhotoScalarFieldEnum];
export declare const OrderReleaseScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly trigger: "trigger";
    readonly bps: "bps";
    readonly currency: "currency";
    readonly buyerMinor: "buyerMinor";
    readonly manufacturerMinor: "manufacturerMinor";
    readonly commissionMinor: "commissionMinor";
    readonly status: "status";
    readonly dueAt: "dueAt";
    readonly releasedAt: "releasedAt";
    readonly approvedById: "approvedById";
    readonly paidAt: "paidAt";
    readonly supersededAt: "supersededAt";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly createdAt: "createdAt";
};
export type OrderReleaseScalarFieldEnum = (typeof OrderReleaseScalarFieldEnum)[keyof typeof OrderReleaseScalarFieldEnum];
export declare const ExchangeRateScalarFieldEnum: {
    readonly currency: "currency";
    readonly unitsPerUsd: "unitsPerUsd";
    readonly updatedAt: "updatedAt";
    readonly updatedById: "updatedById";
};
export type ExchangeRateScalarFieldEnum = (typeof ExchangeRateScalarFieldEnum)[keyof typeof ExchangeRateScalarFieldEnum];
export declare const PlatformSettingScalarFieldEnum: {
    readonly key: "key";
    readonly value: "value";
    readonly updatedAt: "updatedAt";
};
export type PlatformSettingScalarFieldEnum = (typeof PlatformSettingScalarFieldEnum)[keyof typeof PlatformSettingScalarFieldEnum];
export declare const ProductionLineScalarFieldEnum: {
    readonly id: "id";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly code: "code";
    readonly name: "name";
    readonly dailySamMinutes: "dailySamMinutes";
    readonly workingDays: "workingDays";
    readonly cmRateMinorPer100Min: "cmRateMinorPer100Min";
    readonly currency: "currency";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductionLineScalarFieldEnum = (typeof ProductionLineScalarFieldEnum)[keyof typeof ProductionLineScalarFieldEnum];
export declare const CapacitySlotScalarFieldEnum: {
    readonly id: "id";
    readonly lineId: "lineId";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly totalMinutes: "totalMinutes";
    readonly bookedMinutes: "bookedMinutes";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CapacitySlotScalarFieldEnum = (typeof CapacitySlotScalarFieldEnum)[keyof typeof CapacitySlotScalarFieldEnum];
export declare const SupplierClaimScalarFieldEnum: {
    readonly id: "id";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly region: "region";
    readonly tier: "tier";
    readonly brandNames: "brandNames";
    readonly evidenceFileId: "evidenceFileId";
    readonly note: "note";
    readonly status: "status";
    readonly reviewNote: "reviewNote";
    readonly reviewedAt: "reviewedAt";
    readonly reviewedById: "reviewedById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SupplierClaimScalarFieldEnum = (typeof SupplierClaimScalarFieldEnum)[keyof typeof SupplierClaimScalarFieldEnum];
export declare const CapacityBookingScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly kind: "kind";
    readonly status: "status";
    readonly buyerCompanyId: "buyerCompanyId";
    readonly createdById: "createdById";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly lineId: "lineId";
    readonly categoryId: "categoryId";
    readonly partnershipId: "partnershipId";
    readonly minutes: "minutes";
    readonly returnedMinutes: "returnedMinutes";
    readonly samPerPieceCenti: "samPerPieceCenti";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly currency: "currency";
    readonly factoryRateMinorPer100Min: "factoryRateMinorPer100Min";
    readonly buyerRateMinorPer100Min: "buyerRateMinorPer100Min";
    readonly factoryAmountMinor: "factoryAmountMinor";
    readonly buyerAmountMinor: "buyerAmountMinor";
    readonly feeBps: "feeBps";
    readonly depositBps: "depositBps";
    readonly depositMinor: "depositMinor";
    readonly cancellationTiers: "cancellationTiers";
    readonly factoryShareBps: "factoryShareBps";
    readonly note: "note";
    readonly noteFiltered: "noteFiltered";
    readonly holdExpiresAt: "holdExpiresAt";
    readonly reminderSentAt: "reminderSentAt";
    readonly factoryAcceptedAt: "factoryAcceptedAt";
    readonly depositPaidAt: "depositPaidAt";
    readonly confirmedAt: "confirmedAt";
    readonly cancelledAt: "cancelledAt";
    readonly cancelledBy: "cancelledBy";
    readonly cancelReason: "cancelReason";
    readonly refundMinor: "refundMinor";
    readonly factoryCompensationMinor: "factoryCompensationMinor";
    readonly compensationPaidAt: "compensationPaidAt";
    readonly conversionMode: "conversionMode";
    readonly convertedAt: "convertedAt";
    readonly orderId: "orderId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CapacityBookingScalarFieldEnum = (typeof CapacityBookingScalarFieldEnum)[keyof typeof CapacityBookingScalarFieldEnum];
export declare const CapacityBookingAllocationScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly slotId: "slotId";
    readonly minutes: "minutes";
};
export type CapacityBookingAllocationScalarFieldEnum = (typeof CapacityBookingAllocationScalarFieldEnum)[keyof typeof CapacityBookingAllocationScalarFieldEnum];
export declare const CapacityPartnershipScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly status: "status";
    readonly buyerCompanyId: "buyerCompanyId";
    readonly createdById: "createdById";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly lineId: "lineId";
    readonly categoryId: "categoryId";
    readonly monthlyMinutes: "monthlyMinutes";
    readonly months: "months";
    readonly startMonth: "startMonth";
    readonly samPerPieceCenti: "samPerPieceCenti";
    readonly currency: "currency";
    readonly factoryRateMinorPer100Min: "factoryRateMinorPer100Min";
    readonly buyerRateMinorPer100Min: "buyerRateMinorPer100Min";
    readonly note: "note";
    readonly noteFiltered: "noteFiltered";
    readonly declineReason: "declineReason";
    readonly acceptedAt: "acceptedAt";
    readonly cancelledAt: "cancelledAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CapacityPartnershipScalarFieldEnum = (typeof CapacityPartnershipScalarFieldEnum)[keyof typeof CapacityPartnershipScalarFieldEnum];
export declare const LogisticsPartnerScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly name: "name";
    readonly kind: "kind";
    readonly country: "country";
    readonly contactEmail: "contactEmail";
    readonly contactPhone: "contactPhone";
    readonly notes: "notes";
    readonly active: "active";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LogisticsPartnerScalarFieldEnum = (typeof LogisticsPartnerScalarFieldEnum)[keyof typeof LogisticsPartnerScalarFieldEnum];
export declare const HubScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly name: "name";
    readonly operator: "operator";
    readonly partnerId: "partnerId";
    readonly country: "country";
    readonly city: "city";
    readonly addressLine1: "addressLine1";
    readonly addressLine2: "addressLine2";
    readonly postalCode: "postalCode";
    readonly port: "port";
    readonly active: "active";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type HubScalarFieldEnum = (typeof HubScalarFieldEnum)[keyof typeof HubScalarFieldEnum];
export declare const RateCardScalarFieldEnum: {
    readonly id: "id";
    readonly partnerId: "partnerId";
    readonly mode: "mode";
    readonly originCountry: "originCountry";
    readonly originPort: "originPort";
    readonly destinationCountry: "destinationCountry";
    readonly destinationPort: "destinationPort";
    readonly unit: "unit";
    readonly containerType: "containerType";
    readonly costMinor: "costMinor";
    readonly minChargeMinor: "minChargeMinor";
    readonly currency: "currency";
    readonly transitDaysMin: "transitDaysMin";
    readonly transitDaysMax: "transitDaysMax";
    readonly validFrom: "validFrom";
    readonly validTo: "validTo";
    readonly active: "active";
    readonly notes: "notes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RateCardScalarFieldEnum = (typeof RateCardScalarFieldEnum)[keyof typeof RateCardScalarFieldEnum];
export declare const LogisticsMarginRuleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly mode: "mode";
    readonly originCountry: "originCountry";
    readonly destinationCountry: "destinationCountry";
    readonly markupBps: "markupBps";
    readonly minMarginMinor: "minMarginMinor";
    readonly active: "active";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LogisticsMarginRuleScalarFieldEnum = (typeof LogisticsMarginRuleScalarFieldEnum)[keyof typeof LogisticsMarginRuleScalarFieldEnum];
export declare const DutyRateScalarFieldEnum: {
    readonly id: "id";
    readonly hsPrefix: "hsPrefix";
    readonly destinationCountry: "destinationCountry";
    readonly rateBps: "rateBps";
    readonly note: "note";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type DutyRateScalarFieldEnum = (typeof DutyRateScalarFieldEnum)[keyof typeof DutyRateScalarFieldEnum];
export declare const LogisticsQuoteScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly status: "status";
    readonly mode: "mode";
    readonly incoterm: "incoterm";
    readonly originCountry: "originCountry";
    readonly destinationCountry: "destinationCountry";
    readonly destinationPort: "destinationPort";
    readonly insured: "insured";
    readonly weightGrams: "weightGrams";
    readonly volumeLitres: "volumeLitres";
    readonly cargoEstimated: "cargoEstimated";
    readonly provider: "provider";
    readonly rateCardId: "rateCardId";
    readonly partnerId: "partnerId";
    readonly marginRuleName: "marginRuleName";
    readonly currency: "currency";
    readonly partnerCostMinor: "partnerCostMinor";
    readonly freightMinor: "freightMinor";
    readonly insuranceMinor: "insuranceMinor";
    readonly dutyEstimateMinor: "dutyEstimateMinor";
    readonly totalMinor: "totalMinor";
    readonly transitDaysMin: "transitDaysMin";
    readonly transitDaysMax: "transitDaysMax";
    readonly validUntil: "validUntil";
    readonly acceptedAt: "acceptedAt";
    readonly createdAt: "createdAt";
    readonly consolidationId: "consolidationId";
    readonly forwarderName: "forwarderName";
    readonly forwarderContact: "forwarderContact";
    readonly forwarderReference: "forwarderReference";
};
export type LogisticsQuoteScalarFieldEnum = (typeof LogisticsQuoteScalarFieldEnum)[keyof typeof LogisticsQuoteScalarFieldEnum];
export declare const OrderPackingScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly cartons: "cartons";
    readonly piecesPerCarton: "piecesPerCarton";
    readonly grossWeightGrams: "grossWeightGrams";
    readonly netWeightGrams: "netWeightGrams";
    readonly volumeLitres: "volumeLitres";
    readonly cartonLengthCm: "cartonLengthCm";
    readonly cartonWidthCm: "cartonWidthCm";
    readonly cartonHeightCm: "cartonHeightCm";
    readonly updatedById: "updatedById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderPackingScalarFieldEnum = (typeof OrderPackingScalarFieldEnum)[keyof typeof OrderPackingScalarFieldEnum];
export declare const PickupRequestScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly hubId: "hubId";
    readonly pickupDate: "pickupDate";
    readonly status: "status";
    readonly partnerId: "partnerId";
    readonly note: "note";
    readonly noteFiltered: "noteFiltered";
    readonly scheduledAt: "scheduledAt";
    readonly collectedAt: "collectedAt";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PickupRequestScalarFieldEnum = (typeof PickupRequestScalarFieldEnum)[keyof typeof PickupRequestScalarFieldEnum];
export declare const HubReceiptScalarFieldEnum: {
    readonly id: "id";
    readonly hubId: "hubId";
    readonly orderId: "orderId";
    readonly pickupId: "pickupId";
    readonly receivedById: "receivedById";
    readonly receivedAt: "receivedAt";
    readonly cartonsExpected: "cartonsExpected";
    readonly cartonsReceived: "cartonsReceived";
    readonly grossWeightGrams: "grossWeightGrams";
    readonly condition: "condition";
    readonly repacked: "repacked";
    readonly relabelled: "relabelled";
    readonly notes: "notes";
};
export type HubReceiptScalarFieldEnum = (typeof HubReceiptScalarFieldEnum)[keyof typeof HubReceiptScalarFieldEnum];
export declare const HubReceiptPhotoScalarFieldEnum: {
    readonly id: "id";
    readonly receiptId: "receiptId";
    readonly fileId: "fileId";
    readonly createdAt: "createdAt";
};
export type HubReceiptPhotoScalarFieldEnum = (typeof HubReceiptPhotoScalarFieldEnum)[keyof typeof HubReceiptPhotoScalarFieldEnum];
export declare const ConsolidationScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly buyerCompanyId: "buyerCompanyId";
    readonly mode: "mode";
    readonly destinationCountry: "destinationCountry";
    readonly currency: "currency";
    readonly separateTotalMinor: "separateTotalMinor";
    readonly combinedTotalMinor: "combinedTotalMinor";
    readonly createdAt: "createdAt";
};
export type ConsolidationScalarFieldEnum = (typeof ConsolidationScalarFieldEnum)[keyof typeof ConsolidationScalarFieldEnum];
export declare const LogisticsShipmentScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly buyerCompanyId: "buyerCompanyId";
    readonly mode: "mode";
    readonly incoterm: "incoterm";
    readonly status: "status";
    readonly shipperMode: "shipperMode";
    readonly originHubId: "originHubId";
    readonly originCountry: "originCountry";
    readonly destinationCountry: "destinationCountry";
    readonly destinationPort: "destinationPort";
    readonly consolidationId: "consolidationId";
    readonly currency: "currency";
    readonly buyerPriceMinor: "buyerPriceMinor";
    readonly partnerCostMinor: "partnerCostMinor";
    readonly insuranceMinor: "insuranceMinor";
    readonly cartons: "cartons";
    readonly grossWeightGrams: "grossWeightGrams";
    readonly volumeLitres: "volumeLitres";
    readonly etd: "etd";
    readonly eta: "eta";
    readonly departedAt: "departedAt";
    readonly deliveredAt: "deliveredAt";
    readonly historical: "historical";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LogisticsShipmentScalarFieldEnum = (typeof LogisticsShipmentScalarFieldEnum)[keyof typeof LogisticsShipmentScalarFieldEnum];
export declare const LogisticsShipmentOrderScalarFieldEnum: {
    readonly shipmentId: "shipmentId";
    readonly orderId: "orderId";
    readonly active: "active";
    readonly cartons: "cartons";
    readonly grossWeightGrams: "grossWeightGrams";
    readonly volumeLitres: "volumeLitres";
    readonly buyerShareMinor: "buyerShareMinor";
    readonly costShareMinor: "costShareMinor";
};
export type LogisticsShipmentOrderScalarFieldEnum = (typeof LogisticsShipmentOrderScalarFieldEnum)[keyof typeof LogisticsShipmentOrderScalarFieldEnum];
export declare const ShipmentLegScalarFieldEnum: {
    readonly id: "id";
    readonly shipmentId: "shipmentId";
    readonly sequence: "sequence";
    readonly kind: "kind";
    readonly status: "status";
    readonly partnerId: "partnerId";
    readonly fromLabel: "fromLabel";
    readonly toLabel: "toLabel";
    readonly carrier: "carrier";
    readonly trackingNumber: "trackingNumber";
    readonly containerNumber: "containerNumber";
    readonly transportDocNo: "transportDocNo";
    readonly costMinor: "costMinor";
    readonly etd: "etd";
    readonly eta: "eta";
    readonly departedAt: "departedAt";
    readonly arrivedAt: "arrivedAt";
    readonly acceptedAt: "acceptedAt";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ShipmentLegScalarFieldEnum = (typeof ShipmentLegScalarFieldEnum)[keyof typeof ShipmentLegScalarFieldEnum];
export declare const ShipmentEventScalarFieldEnum: {
    readonly id: "id";
    readonly shipmentId: "shipmentId";
    readonly legId: "legId";
    readonly status: "status";
    readonly source: "source";
    readonly location: "location";
    readonly publicNote: "publicNote";
    readonly internalNote: "internalNote";
    readonly occurredAt: "occurredAt";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
};
export type ShipmentEventScalarFieldEnum = (typeof ShipmentEventScalarFieldEnum)[keyof typeof ShipmentEventScalarFieldEnum];
export declare const LogisticsDocumentScalarFieldEnum: {
    readonly id: "id";
    readonly shipmentId: "shipmentId";
    readonly type: "type";
    readonly number: "number";
    readonly issuedById: "issuedById";
    readonly createdAt: "createdAt";
};
export type LogisticsDocumentScalarFieldEnum = (typeof LogisticsDocumentScalarFieldEnum)[keyof typeof LogisticsDocumentScalarFieldEnum];
export declare const ShipmentUploadScalarFieldEnum: {
    readonly id: "id";
    readonly shipmentId: "shipmentId";
    readonly legId: "legId";
    readonly fileId: "fileId";
    readonly kind: "kind";
    readonly uploadedById: "uploadedById";
    readonly buyerVisible: "buyerVisible";
    readonly publishedAt: "publishedAt";
    readonly publishedById: "publishedById";
    readonly createdAt: "createdAt";
};
export type ShipmentUploadScalarFieldEnum = (typeof ShipmentUploadScalarFieldEnum)[keyof typeof ShipmentUploadScalarFieldEnum];
export declare const LogisticsClaimScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly shipmentId: "shipmentId";
    readonly orderId: "orderId";
    readonly disputeId: "disputeId";
    readonly legId: "legId";
    readonly type: "type";
    readonly status: "status";
    readonly description: "description";
    readonly publicNote: "publicNote";
    readonly currency: "currency";
    readonly claimedMinor: "claimedMinor";
    readonly insuredValueMinor: "insuredValueMinor";
    readonly insurerReference: "insurerReference";
    readonly compensationMinor: "compensationMinor";
    readonly insurerRecoveryMinor: "insurerRecoveryMinor";
    readonly partnerChargebackMinor: "partnerChargebackMinor";
    readonly resolution: "resolution";
    readonly createdById: "createdById";
    readonly settledById: "settledById";
    readonly settledAt: "settledAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LogisticsClaimScalarFieldEnum = (typeof LogisticsClaimScalarFieldEnum)[keyof typeof LogisticsClaimScalarFieldEnum];
export declare const OrderChargeScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly kind: "kind";
    readonly amountMinor: "amountMinor";
    readonly currency: "currency";
    readonly waived: "waived";
    readonly sampleId: "sampleId";
    readonly inspectionId: "inspectionId";
    readonly createdAt: "createdAt";
};
export type OrderChargeScalarFieldEnum = (typeof OrderChargeScalarFieldEnum)[keyof typeof OrderChargeScalarFieldEnum];
export declare const OrderFactoryChangeScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly fromProfileId: "fromProfileId";
    readonly toProfileId: "toProfileId";
    readonly fromUnitPriceMinor: "fromUnitPriceMinor";
    readonly toUnitPriceMinor: "toUnitPriceMinor";
    readonly fundedMinor: "fundedMinor";
    readonly reason: "reason";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
};
export type OrderFactoryChangeScalarFieldEnum = (typeof OrderFactoryChangeScalarFieldEnum)[keyof typeof OrderFactoryChangeScalarFieldEnum];
export declare const FactoryBankAccountScalarFieldEnum: {
    readonly id: "id";
    readonly companyId: "companyId";
    readonly holderName: "holderName";
    readonly bankName: "bankName";
    readonly bankCountry: "bankCountry";
    readonly accountNumber: "accountNumber";
    readonly swiftBic: "swiftBic";
    readonly routingCode: "routingCode";
    readonly branch: "branch";
    readonly currency: "currency";
    readonly status: "status";
    readonly reviewNote: "reviewNote";
    readonly submittedById: "submittedById";
    readonly reviewedById: "reviewedById";
    readonly reviewedAt: "reviewedAt";
    readonly createdAt: "createdAt";
};
export type FactoryBankAccountScalarFieldEnum = (typeof FactoryBankAccountScalarFieldEnum)[keyof typeof FactoryBankAccountScalarFieldEnum];
export declare const SupplyContractScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly buyerCompanyId: "buyerCompanyId";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly title: "title";
    readonly specification: "specification";
    readonly currency: "currency";
    readonly buyerUnitPriceMinor: "buyerUnitPriceMinor";
    readonly manufacturerUnitPriceMinor: "manufacturerUnitPriceMinor";
    readonly contractedQuantity: "contractedQuantity";
    readonly calledOffQuantity: "calledOffQuantity";
    readonly minCallOffQuantity: "minCallOffQuantity";
    readonly depositBps: "depositBps";
    readonly incoterm: "incoterm";
    readonly destinationCountry: "destinationCountry";
    readonly leadTimeDays: "leadTimeDays";
    readonly startsOn: "startsOn";
    readonly endsOn: "endsOn";
    readonly status: "status";
    readonly createdById: "createdById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SupplyContractScalarFieldEnum = (typeof SupplyContractScalarFieldEnum)[keyof typeof SupplyContractScalarFieldEnum];
export declare const InspectorApplicationScalarFieldEnum: {
    readonly id: "id";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly email: "email";
    readonly phone: "phone";
    readonly country: "country";
    readonly city: "city";
    readonly experienceYears: "experienceYears";
    readonly inspectionTypes: "inspectionTypes";
    readonly about: "about";
    readonly status: "status";
    readonly reviewNote: "reviewNote";
    readonly reviewedById: "reviewedById";
    readonly reviewedAt: "reviewedAt";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type InspectorApplicationScalarFieldEnum = (typeof InspectorApplicationScalarFieldEnum)[keyof typeof InspectorApplicationScalarFieldEnum];
export declare const InspectorProfileScalarFieldEnum: {
    readonly userId: "userId";
    readonly status: "status";
    readonly country: "country";
    readonly city: "city";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly serviceRadiusKm: "serviceRadiusKm";
    readonly inspectionTypes: "inspectionTypes";
    readonly dayRateUsdMinor: "dayRateUsdMinor";
    readonly certifiedAt: "certifiedAt";
    readonly ratingSum: "ratingSum";
    readonly ratingCount: "ratingCount";
    readonly payoutMethod: "payoutMethod";
    readonly payoutName: "payoutName";
    readonly payoutAccount: "payoutAccount";
    readonly payoutVerifiedAt: "payoutVerifiedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InspectorProfileScalarFieldEnum = (typeof InspectorProfileScalarFieldEnum)[keyof typeof InspectorProfileScalarFieldEnum];
export declare const PlanSubscriptionScalarFieldEnum: {
    readonly id: "id";
    readonly manufacturerProfileId: "manufacturerProfileId";
    readonly buyerCompanyId: "buyerCompanyId";
    readonly tier: "tier";
    readonly interval: "interval";
    readonly source: "source";
    readonly status: "status";
    readonly amountUsdMinor: "amountUsdMinor";
    readonly stripeCustomerId: "stripeCustomerId";
    readonly stripeSubscriptionId: "stripeSubscriptionId";
    readonly stripeCheckoutSessionId: "stripeCheckoutSessionId";
    readonly currentPeriodEnd: "currentPeriodEnd";
    readonly cancelAtPeriodEnd: "cancelAtPeriodEnd";
    readonly note: "note";
    readonly bankReference: "bankReference";
    readonly createdById: "createdById";
    readonly canceledAt: "canceledAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PlanSubscriptionScalarFieldEnum = (typeof PlanSubscriptionScalarFieldEnum)[keyof typeof PlanSubscriptionScalarFieldEnum];
export declare const PlanInvoiceScalarFieldEnum: {
    readonly id: "id";
    readonly subscriptionId: "subscriptionId";
    readonly stripeInvoiceId: "stripeInvoiceId";
    readonly amountMinor: "amountMinor";
    readonly currency: "currency";
    readonly paidAt: "paidAt";
    readonly periodEnd: "periodEnd";
    readonly createdAt: "createdAt";
};
export type PlanInvoiceScalarFieldEnum = (typeof PlanInvoiceScalarFieldEnum)[keyof typeof PlanInvoiceScalarFieldEnum];
export declare const OutboundMessageScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly channel: "channel";
    readonly to: "to";
    readonly type: "type";
    readonly body: "body";
    readonly status: "status";
    readonly error: "error";
    readonly providerRef: "providerRef";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OutboundMessageScalarFieldEnum = (typeof OutboundMessageScalarFieldEnum)[keyof typeof OutboundMessageScalarFieldEnum];
export declare const LeadScalarFieldEnum: {
    readonly id: "id";
    readonly kind: "kind";
    readonly status: "status";
    readonly name: "name";
    readonly email: "email";
    readonly company: "company";
    readonly country: "country";
    readonly phone: "phone";
    readonly message: "message";
    readonly source: "source";
    readonly handledById: "handledById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type LeadScalarFieldEnum = (typeof LeadScalarFieldEnum)[keyof typeof LeadScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>;
export type ListEnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumTextChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TextChannel'>;
export type ListEnumTextChannelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TextChannel[]'>;
export type EnumCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Currency'>;
export type ListEnumCurrencyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Currency[]'>;
export type EnumCompanyRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyRole'>;
export type ListEnumCompanyRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyRole[]'>;
export type EnumUserTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserTokenType'>;
export type ListEnumUserTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserTokenType[]'>;
export type EnumCompanyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyType'>;
export type ListEnumCompanyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyType[]'>;
export type EnumOnboardingStepFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OnboardingStep'>;
export type ListEnumOnboardingStepFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OnboardingStep[]'>;
export type EnumKycStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KycStatus'>;
export type ListEnumKycStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KycStatus[]'>;
export type EnumCompanyDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyDocumentType'>;
export type ListEnumCompanyDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompanyDocumentType[]'>;
export type EnumReviewStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewState'>;
export type ListEnumReviewStateFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewState[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumBuyerBusinessTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BuyerBusinessType'>;
export type ListEnumBuyerBusinessTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BuyerBusinessType[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type EnumPlanTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanTier'>;
export type ListEnumPlanTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanTier[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumCertificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CertificationType'>;
export type ListEnumCertificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CertificationType[]'>;
export type EnumCertificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CertificationStatus'>;
export type ListEnumCertificationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CertificationStatus[]'>;
export type EnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus'>;
export type ListEnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus[]'>;
export type EnumMediaReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaReviewStatus'>;
export type ListEnumMediaReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaReviewStatus[]'>;
export type EnumIncotermFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Incoterm'>;
export type ListEnumIncotermFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Incoterm[]'>;
export type EnumRfqStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RfqStatus'>;
export type ListEnumRfqStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RfqStatus[]'>;
export type EnumRfqInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RfqInvitationStatus'>;
export type ListEnumRfqInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RfqInvitationStatus[]'>;
export type EnumRfqAttachmentKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RfqAttachmentKind'>;
export type ListEnumRfqAttachmentKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RfqAttachmentKind[]'>;
export type EnumQuoteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuoteStatus'>;
export type ListEnumQuoteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuoteStatus[]'>;
export type EnumConversationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationType'>;
export type ListEnumConversationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ConversationType[]'>;
export type ListEnumContactFlagFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContactFlag[]'>;
export type EnumContactFlagFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContactFlag'>;
export type EnumModerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationStatus'>;
export type ListEnumModerationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ModerationStatus[]'>;
export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;
export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>;
export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>;
export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>;
export type EnumMilestoneStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MilestoneStage'>;
export type ListEnumMilestoneStageFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MilestoneStage[]'>;
export type EnumMilestoneStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MilestoneStatus'>;
export type ListEnumMilestoneStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MilestoneStatus[]'>;
export type EnumSampleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SampleType'>;
export type ListEnumSampleTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SampleType[]'>;
export type EnumSampleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SampleStatus'>;
export type ListEnumSampleStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SampleStatus[]'>;
export type EnumPaymentDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentDirection'>;
export type ListEnumPaymentDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentDirection[]'>;
export type EnumPaymentPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentPurpose'>;
export type ListEnumPaymentPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentPurpose[]'>;
export type EnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod'>;
export type ListEnumPaymentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentMethod[]'>;
export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>;
export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>;
export type EnumLedgerAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LedgerAccountType'>;
export type ListEnumLedgerAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LedgerAccountType[]'>;
export type EnumLedgerTransactionKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LedgerTransactionKind'>;
export type ListEnumLedgerTransactionKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LedgerTransactionKind[]'>;
export type EnumEntryDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntryDirection'>;
export type ListEnumEntryDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntryDirection[]'>;
export type EnumInspectionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InspectionType'>;
export type ListEnumInspectionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InspectionType[]'>;
export type EnumInspectionResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InspectionResult'>;
export type ListEnumInspectionResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InspectionResult[]'>;
export type EnumReviewDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewDirection'>;
export type ListEnumReviewDirectionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewDirection[]'>;
export type EnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus'>;
export type ListEnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus[]'>;
export type EnumDisputeReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeReason'>;
export type ListEnumDisputeReasonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeReason[]'>;
export type EnumDisputeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeStatus'>;
export type ListEnumDisputeStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeStatus[]'>;
export type EnumDisputePartyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeParty'>;
export type ListEnumDisputePartyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DisputeParty[]'>;
export type EnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType'>;
export type ListEnumNotificationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationType[]'>;
export type EnumNotificationCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationCategory'>;
export type ListEnumNotificationCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NotificationCategory[]'>;
export type EnumFilePurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FilePurpose'>;
export type ListEnumFilePurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FilePurpose[]'>;
export type EnumFileStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FileStatus'>;
export type ListEnumFileStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FileStatus[]'>;
export type EnumScanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScanStatus'>;
export type ListEnumScanStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScanStatus[]'>;
export type EnumImageProcessingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImageProcessingStatus'>;
export type ListEnumImageProcessingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ImageProcessingStatus[]'>;
export type EnumWarningLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WarningLevel'>;
export type ListEnumWarningLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WarningLevel[]'>;
export type EnumReleaseTriggerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReleaseTrigger'>;
export type ListEnumReleaseTriggerFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReleaseTrigger[]'>;
export type EnumReleaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReleaseStatus'>;
export type ListEnumReleaseStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReleaseStatus[]'>;
export type EnumProductionLineStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductionLineStatus'>;
export type ListEnumProductionLineStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductionLineStatus[]'>;
export type EnumCapacitySlotStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacitySlotStatus'>;
export type ListEnumCapacitySlotStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacitySlotStatus[]'>;
export type EnumSupplierClaimRegionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupplierClaimRegion'>;
export type ListEnumSupplierClaimRegionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupplierClaimRegion[]'>;
export type EnumSupplierClaimTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupplierClaimTier'>;
export type ListEnumSupplierClaimTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupplierClaimTier[]'>;
export type EnumSupplierClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupplierClaimStatus'>;
export type ListEnumSupplierClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupplierClaimStatus[]'>;
export type EnumCapacityBookingKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacityBookingKind'>;
export type ListEnumCapacityBookingKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacityBookingKind[]'>;
export type EnumCapacityBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacityBookingStatus'>;
export type ListEnumCapacityBookingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacityBookingStatus[]'>;
export type EnumCapacityBookingActorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacityBookingActor'>;
export type ListEnumCapacityBookingActorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacityBookingActor[]'>;
export type EnumCapacityConversionModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacityConversionMode'>;
export type ListEnumCapacityConversionModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacityConversionMode[]'>;
export type EnumCapacityPartnershipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacityPartnershipStatus'>;
export type ListEnumCapacityPartnershipStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CapacityPartnershipStatus[]'>;
export type EnumLogisticsPartnerKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsPartnerKind'>;
export type ListEnumLogisticsPartnerKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsPartnerKind[]'>;
export type EnumHubOperatorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HubOperator'>;
export type ListEnumHubOperatorFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HubOperator[]'>;
export type EnumLogisticsModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsMode'>;
export type ListEnumLogisticsModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsMode[]'>;
export type EnumRateUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RateUnit'>;
export type ListEnumRateUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RateUnit[]'>;
export type EnumContainerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContainerType'>;
export type ListEnumContainerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ContainerType[]'>;
export type EnumLogisticsQuoteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsQuoteStatus'>;
export type ListEnumLogisticsQuoteStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsQuoteStatus[]'>;
export type EnumPickupStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PickupStatus'>;
export type ListEnumPickupStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PickupStatus[]'>;
export type EnumHubReceiptConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HubReceiptCondition'>;
export type ListEnumHubReceiptConditionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HubReceiptCondition[]'>;
export type EnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsShipmentStatus'>;
export type ListEnumLogisticsShipmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsShipmentStatus[]'>;
export type EnumShipmentLegKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentLegKind'>;
export type ListEnumShipmentLegKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentLegKind[]'>;
export type EnumShipmentLegStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentLegStatus'>;
export type ListEnumShipmentLegStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentLegStatus[]'>;
export type EnumShipmentEventSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentEventSource'>;
export type ListEnumShipmentEventSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentEventSource[]'>;
export type EnumLogisticsDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsDocumentType'>;
export type ListEnumLogisticsDocumentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsDocumentType[]'>;
export type EnumShipmentUploadKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentUploadKind'>;
export type ListEnumShipmentUploadKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentUploadKind[]'>;
export type EnumLogisticsClaimTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsClaimType'>;
export type ListEnumLogisticsClaimTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsClaimType[]'>;
export type EnumLogisticsClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsClaimStatus'>;
export type ListEnumLogisticsClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LogisticsClaimStatus[]'>;
export type EnumOrderChargeKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderChargeKind'>;
export type ListEnumOrderChargeKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderChargeKind[]'>;
export type EnumBankAccountStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BankAccountStatus'>;
export type ListEnumBankAccountStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BankAccountStatus[]'>;
export type EnumSupplyContractStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupplyContractStatus'>;
export type ListEnumSupplyContractStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SupplyContractStatus[]'>;
export type EnumInspectorApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InspectorApplicationStatus'>;
export type ListEnumInspectorApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InspectorApplicationStatus[]'>;
export type EnumInspectorStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InspectorStatus'>;
export type ListEnumInspectorStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InspectorStatus[]'>;
export type EnumSubscriptionPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionPlan'>;
export type ListEnumSubscriptionPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionPlan[]'>;
export type EnumPlanIntervalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanInterval'>;
export type ListEnumPlanIntervalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PlanInterval[]'>;
export type EnumSubscriptionSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionSource'>;
export type ListEnumSubscriptionSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionSource[]'>;
export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>;
export type ListEnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus[]'>;
export type EnumOutboundMessageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OutboundMessageStatus'>;
export type ListEnumOutboundMessageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OutboundMessageStatus[]'>;
export type EnumLeadKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadKind'>;
export type ListEnumLeadKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadKind[]'>;
export type EnumLeadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadStatus'>;
export type ListEnumLeadStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'LeadStatus[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    session?: Prisma.SessionOmit;
    userToken?: Prisma.UserTokenOmit;
    codeSequence?: Prisma.CodeSequenceOmit;
    company?: Prisma.CompanyOmit;
    companyDocument?: Prisma.CompanyDocumentOmit;
    buyerProfile?: Prisma.BuyerProfileOmit;
    manufacturerProfile?: Prisma.ManufacturerProfileOmit;
    category?: Prisma.CategoryOmit;
    certification?: Prisma.CertificationOmit;
    product?: Prisma.ProductOmit;
    productPriceTier?: Prisma.ProductPriceTierOmit;
    productImage?: Prisma.ProductImageOmit;
    factoryPhoto?: Prisma.FactoryPhotoOmit;
    capacityMonth?: Prisma.CapacityMonthOmit;
    rfq?: Prisma.RfqOmit;
    rfqInvitation?: Prisma.RfqInvitationOmit;
    rfqAttachment?: Prisma.RfqAttachmentOmit;
    quote?: Prisma.QuoteOmit;
    marginRule?: Prisma.MarginRuleOmit;
    conversation?: Prisma.ConversationOmit;
    conversationParticipant?: Prisma.ConversationParticipantOmit;
    message?: Prisma.MessageOmit;
    messageAttachment?: Prisma.MessageAttachmentOmit;
    order?: Prisma.OrderOmit;
    orderItem?: Prisma.OrderItemOmit;
    orderMilestone?: Prisma.OrderMilestoneOmit;
    milestonePhoto?: Prisma.MilestonePhotoOmit;
    sample?: Prisma.SampleOmit;
    payment?: Prisma.PaymentOmit;
    ledgerAccount?: Prisma.LedgerAccountOmit;
    ledgerTransaction?: Prisma.LedgerTransactionOmit;
    escrowLedgerEntry?: Prisma.EscrowLedgerEntryOmit;
    inspection?: Prisma.InspectionOmit;
    inspectionPhoto?: Prisma.InspectionPhotoOmit;
    review?: Prisma.ReviewOmit;
    dispute?: Prisma.DisputeOmit;
    disputeEvidence?: Prisma.DisputeEvidenceOmit;
    notification?: Prisma.NotificationOmit;
    notificationPreference?: Prisma.NotificationPreferenceOmit;
    auditLog?: Prisma.AuditLogOmit;
    fileAsset?: Prisma.FileAssetOmit;
    imageRendition?: Prisma.ImageRenditionOmit;
    shortlist?: Prisma.ShortlistOmit;
    shortlistItem?: Prisma.ShortlistItemOmit;
    accountWarning?: Prisma.AccountWarningOmit;
    orderEvent?: Prisma.OrderEventOmit;
    samplePhoto?: Prisma.SamplePhotoOmit;
    orderRelease?: Prisma.OrderReleaseOmit;
    exchangeRate?: Prisma.ExchangeRateOmit;
    platformSetting?: Prisma.PlatformSettingOmit;
    productionLine?: Prisma.ProductionLineOmit;
    capacitySlot?: Prisma.CapacitySlotOmit;
    supplierClaim?: Prisma.SupplierClaimOmit;
    capacityBooking?: Prisma.CapacityBookingOmit;
    capacityBookingAllocation?: Prisma.CapacityBookingAllocationOmit;
    capacityPartnership?: Prisma.CapacityPartnershipOmit;
    logisticsPartner?: Prisma.LogisticsPartnerOmit;
    hub?: Prisma.HubOmit;
    rateCard?: Prisma.RateCardOmit;
    logisticsMarginRule?: Prisma.LogisticsMarginRuleOmit;
    dutyRate?: Prisma.DutyRateOmit;
    logisticsQuote?: Prisma.LogisticsQuoteOmit;
    orderPacking?: Prisma.OrderPackingOmit;
    pickupRequest?: Prisma.PickupRequestOmit;
    hubReceipt?: Prisma.HubReceiptOmit;
    hubReceiptPhoto?: Prisma.HubReceiptPhotoOmit;
    consolidation?: Prisma.ConsolidationOmit;
    logisticsShipment?: Prisma.LogisticsShipmentOmit;
    logisticsShipmentOrder?: Prisma.LogisticsShipmentOrderOmit;
    shipmentLeg?: Prisma.ShipmentLegOmit;
    shipmentEvent?: Prisma.ShipmentEventOmit;
    logisticsDocument?: Prisma.LogisticsDocumentOmit;
    shipmentUpload?: Prisma.ShipmentUploadOmit;
    logisticsClaim?: Prisma.LogisticsClaimOmit;
    orderCharge?: Prisma.OrderChargeOmit;
    orderFactoryChange?: Prisma.OrderFactoryChangeOmit;
    factoryBankAccount?: Prisma.FactoryBankAccountOmit;
    supplyContract?: Prisma.SupplyContractOmit;
    inspectorApplication?: Prisma.InspectorApplicationOmit;
    inspectorProfile?: Prisma.InspectorProfileOmit;
    planSubscription?: Prisma.PlanSubscriptionOmit;
    planInvoice?: Prisma.PlanInvoiceOmit;
    outboundMessage?: Prisma.OutboundMessageOmit;
    lead?: Prisma.LeadOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
