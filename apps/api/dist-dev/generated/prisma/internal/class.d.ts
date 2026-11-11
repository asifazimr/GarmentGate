import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.PrismaClientConstructorArgs<Options>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get session(): Prisma.SessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userToken(): Prisma.UserTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get codeSequence(): Prisma.CodeSequenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get company(): Prisma.CompanyDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get companyDocument(): Prisma.CompanyDocumentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get buyerProfile(): Prisma.BuyerProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get manufacturerProfile(): Prisma.ManufacturerProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get category(): Prisma.CategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get certification(): Prisma.CertificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get product(): Prisma.ProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productPriceTier(): Prisma.ProductPriceTierDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productImage(): Prisma.ProductImageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get factoryPhoto(): Prisma.FactoryPhotoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get capacityMonth(): Prisma.CapacityMonthDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rfq(): Prisma.RfqDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rfqInvitation(): Prisma.RfqInvitationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rfqAttachment(): Prisma.RfqAttachmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get quote(): Prisma.QuoteDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get marginRule(): Prisma.MarginRuleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get conversation(): Prisma.ConversationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get conversationParticipant(): Prisma.ConversationParticipantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get message(): Prisma.MessageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get messageAttachment(): Prisma.MessageAttachmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get order(): Prisma.OrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get orderItem(): Prisma.OrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get orderMilestone(): Prisma.OrderMilestoneDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get milestonePhoto(): Prisma.MilestonePhotoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get sample(): Prisma.SampleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ledgerAccount(): Prisma.LedgerAccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get ledgerTransaction(): Prisma.LedgerTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get escrowLedgerEntry(): Prisma.EscrowLedgerEntryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get inspection(): Prisma.InspectionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get inspectionPhoto(): Prisma.InspectionPhotoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get review(): Prisma.ReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get dispute(): Prisma.DisputeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get disputeEvidence(): Prisma.DisputeEvidenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get notificationPreference(): Prisma.NotificationPreferenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get auditLog(): Prisma.AuditLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get fileAsset(): Prisma.FileAssetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get imageRendition(): Prisma.ImageRenditionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get shortlist(): Prisma.ShortlistDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get shortlistItem(): Prisma.ShortlistItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get accountWarning(): Prisma.AccountWarningDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get orderEvent(): Prisma.OrderEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get samplePhoto(): Prisma.SamplePhotoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get orderRelease(): Prisma.OrderReleaseDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get exchangeRate(): Prisma.ExchangeRateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get platformSetting(): Prisma.PlatformSettingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get productionLine(): Prisma.ProductionLineDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get capacitySlot(): Prisma.CapacitySlotDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get supplierClaim(): Prisma.SupplierClaimDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get capacityBooking(): Prisma.CapacityBookingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get capacityBookingAllocation(): Prisma.CapacityBookingAllocationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get capacityPartnership(): Prisma.CapacityPartnershipDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get logisticsPartner(): Prisma.LogisticsPartnerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get hub(): Prisma.HubDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get rateCard(): Prisma.RateCardDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get logisticsMarginRule(): Prisma.LogisticsMarginRuleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get dutyRate(): Prisma.DutyRateDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get logisticsQuote(): Prisma.LogisticsQuoteDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get orderPacking(): Prisma.OrderPackingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get pickupRequest(): Prisma.PickupRequestDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get hubReceipt(): Prisma.HubReceiptDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get hubReceiptPhoto(): Prisma.HubReceiptPhotoDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get consolidation(): Prisma.ConsolidationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get logisticsShipment(): Prisma.LogisticsShipmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get logisticsShipmentOrder(): Prisma.LogisticsShipmentOrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get shipmentLeg(): Prisma.ShipmentLegDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get shipmentEvent(): Prisma.ShipmentEventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get logisticsDocument(): Prisma.LogisticsDocumentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get shipmentUpload(): Prisma.ShipmentUploadDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get logisticsClaim(): Prisma.LogisticsClaimDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get orderCharge(): Prisma.OrderChargeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get orderFactoryChange(): Prisma.OrderFactoryChangeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get factoryBankAccount(): Prisma.FactoryBankAccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get supplyContract(): Prisma.SupplyContractDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get inspectorApplication(): Prisma.InspectorApplicationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get inspectorProfile(): Prisma.InspectorProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get planSubscription(): Prisma.PlanSubscriptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get planInvoice(): Prisma.PlanInvoiceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get outboundMessage(): Prisma.OutboundMessageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get lead(): Prisma.LeadDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
