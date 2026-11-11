export declare const Role: {
    readonly BUYER: "BUYER";
    readonly MANUFACTURER: "MANUFACTURER";
    readonly ADMIN: "ADMIN";
    readonly INSPECTOR: "INSPECTOR";
    readonly PARTNER: "PARTNER";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly DEACTIVATED: "DEACTIVATED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const CompanyRole: {
    readonly OWNER: "OWNER";
    readonly MEMBER: "MEMBER";
};
export type CompanyRole = (typeof CompanyRole)[keyof typeof CompanyRole];
export declare const UserTokenType: {
    readonly EMAIL_VERIFICATION: "EMAIL_VERIFICATION";
    readonly PASSWORD_RESET: "PASSWORD_RESET";
};
export type UserTokenType = (typeof UserTokenType)[keyof typeof UserTokenType];
export declare const CompanyType: {
    readonly BUYER: "BUYER";
    readonly MANUFACTURER: "MANUFACTURER";
};
export type CompanyType = (typeof CompanyType)[keyof typeof CompanyType];
export declare const KycStatus: {
    readonly NOT_SUBMITTED: "NOT_SUBMITTED";
    readonly PENDING_REVIEW: "PENDING_REVIEW";
    readonly VERIFIED: "VERIFIED";
    readonly REJECTED: "REJECTED";
};
export type KycStatus = (typeof KycStatus)[keyof typeof KycStatus];
export declare const OnboardingStep: {
    readonly COMPANY_INFO: "COMPANY_INFO";
    readonly PROFILE: "PROFILE";
    readonly DOCUMENTS: "DOCUMENTS";
    readonly SUBMITTED: "SUBMITTED";
};
export type OnboardingStep = (typeof OnboardingStep)[keyof typeof OnboardingStep];
export declare const BuyerBusinessType: {
    readonly BRAND: "BRAND";
    readonly RETAILER: "RETAILER";
    readonly IMPORTER: "IMPORTER";
    readonly WHOLESALER: "WHOLESALER";
    readonly SOURCING_AGENT: "SOURCING_AGENT";
    readonly OTHER: "OTHER";
};
export type BuyerBusinessType = (typeof BuyerBusinessType)[keyof typeof BuyerBusinessType];
export declare const CompanyDocumentType: {
    readonly BUSINESS_LICENSE: "BUSINESS_LICENSE";
    readonly EXPORT_REGISTRATION: "EXPORT_REGISTRATION";
    readonly TAX_CERTIFICATE: "TAX_CERTIFICATE";
    readonly BANK_LETTER: "BANK_LETTER";
    readonly ID_PROOF: "ID_PROOF";
    readonly OTHER: "OTHER";
};
export type CompanyDocumentType = (typeof CompanyDocumentType)[keyof typeof CompanyDocumentType];
export declare const ReviewState: {
    readonly PENDING: "PENDING";
    readonly VERIFIED: "VERIFIED";
    readonly REJECTED: "REJECTED";
};
export type ReviewState = (typeof ReviewState)[keyof typeof ReviewState];
export declare const CertificationType: {
    readonly BSCI_AMFORI: "BSCI_AMFORI";
    readonly WRAP: "WRAP";
    readonly SEDEX_SMETA: "SEDEX_SMETA";
    readonly OEKO_TEX_100: "OEKO_TEX_100";
    readonly GOTS: "GOTS";
    readonly GRS: "GRS";
    readonly BCI: "BCI";
    readonly ISO_9001: "ISO_9001";
    readonly ISO_14001: "ISO_14001";
    readonly SA8000: "SA8000";
    readonly FAIR_TRADE: "FAIR_TRADE";
    readonly HIGG_FEM: "HIGG_FEM";
    readonly OTHER: "OTHER";
};
export type CertificationType = (typeof CertificationType)[keyof typeof CertificationType];
export declare const CertificationStatus: {
    readonly PENDING: "PENDING";
    readonly VERIFIED: "VERIFIED";
    readonly REJECTED: "REJECTED";
    readonly EXPIRED: "EXPIRED";
};
export type CertificationStatus = (typeof CertificationStatus)[keyof typeof CertificationStatus];
export declare const Currency: {
    readonly USD: "USD";
    readonly EUR: "EUR";
    readonly GBP: "GBP";
    readonly BDT: "BDT";
    readonly INR: "INR";
    readonly VND: "VND";
    readonly TRY: "TRY";
    readonly PKR: "PKR";
    readonly CNY: "CNY";
};
export type Currency = (typeof Currency)[keyof typeof Currency];
export declare const Incoterm: {
    readonly EXW: "EXW";
    readonly FCA: "FCA";
    readonly FOB: "FOB";
    readonly CFR: "CFR";
    readonly CIF: "CIF";
    readonly CPT: "CPT";
    readonly CIP: "CIP";
    readonly DAP: "DAP";
    readonly DPU: "DPU";
    readonly DDP: "DDP";
};
export type Incoterm = (typeof Incoterm)[keyof typeof Incoterm];
export declare const ProductStatus: {
    readonly DRAFT: "DRAFT";
    readonly PENDING_REVIEW: "PENDING_REVIEW";
    readonly PUBLISHED: "PUBLISHED";
    readonly ARCHIVED: "ARCHIVED";
};
export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];
export declare const RfqStatus: {
    readonly DRAFT: "DRAFT";
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
    readonly AWARDED: "AWARDED";
    readonly CANCELLED: "CANCELLED";
};
export type RfqStatus = (typeof RfqStatus)[keyof typeof RfqStatus];
export declare const RfqInvitationStatus: {
    readonly INVITED: "INVITED";
    readonly VIEWED: "VIEWED";
    readonly DECLINED: "DECLINED";
    readonly QUOTED: "QUOTED";
};
export type RfqInvitationStatus = (typeof RfqInvitationStatus)[keyof typeof RfqInvitationStatus];
export declare const RfqAttachmentKind: {
    readonly TECH_PACK: "TECH_PACK";
    readonly REFERENCE_IMAGE: "REFERENCE_IMAGE";
    readonly SIZE_CHART: "SIZE_CHART";
    readonly OTHER: "OTHER";
};
export type RfqAttachmentKind = (typeof RfqAttachmentKind)[keyof typeof RfqAttachmentKind];
export declare const QuoteStatus: {
    readonly SUBMITTED: "SUBMITTED";
    readonly UNDER_REVIEW: "UNDER_REVIEW";
    readonly OFFERED: "OFFERED";
    readonly ACCEPTED: "ACCEPTED";
    readonly REJECTED: "REJECTED";
    readonly WITHDRAWN: "WITHDRAWN";
    readonly EXPIRED: "EXPIRED";
};
export type QuoteStatus = (typeof QuoteStatus)[keyof typeof QuoteStatus];
export declare const ConversationType: {
    readonly BUYER_PLATFORM: "BUYER_PLATFORM";
    readonly MANUFACTURER_PLATFORM: "MANUFACTURER_PLATFORM";
    readonly SUPPORT: "SUPPORT";
};
export type ConversationType = (typeof ConversationType)[keyof typeof ConversationType];
export declare const ContactFlag: {
    readonly EMAIL: "EMAIL";
    readonly PHONE: "PHONE";
    readonly URL: "URL";
    readonly SOCIAL_HANDLE: "SOCIAL_HANDLE";
    readonly OBFUSCATED_CONTACT: "OBFUSCATED_CONTACT";
    readonly OTHER: "OTHER";
};
export type ContactFlag = (typeof ContactFlag)[keyof typeof ContactFlag];
export declare const ModerationStatus: {
    readonly CLEAN: "CLEAN";
    readonly FLAGGED: "FLAGGED";
    readonly REVIEWED_OK: "REVIEWED_OK";
    readonly REVIEWED_BLOCKED: "REVIEWED_BLOCKED";
};
export type ModerationStatus = (typeof ModerationStatus)[keyof typeof ModerationStatus];
export declare const OrderStatus: {
    readonly DRAFT: "DRAFT";
    readonly SAMPLING: "SAMPLING";
    readonly SAMPLE_APPROVED: "SAMPLE_APPROVED";
    readonly DEPOSIT_PENDING: "DEPOSIT_PENDING";
    readonly IN_PRODUCTION: "IN_PRODUCTION";
    readonly QC: "QC";
    readonly READY_TO_SHIP: "READY_TO_SHIP";
    readonly SHIPPED: "SHIPPED";
    readonly DELIVERED: "DELIVERED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly DISPUTED: "DISPUTED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const MilestoneStage: {
    readonly ORDER_CONFIRMED: "ORDER_CONFIRMED";
    readonly FABRIC_SOURCING: "FABRIC_SOURCING";
    readonly CUTTING: "CUTTING";
    readonly SEWING: "SEWING";
    readonly FINISHING: "FINISHING";
    readonly PACKING: "PACKING";
    readonly READY_FOR_INSPECTION: "READY_FOR_INSPECTION";
    readonly SHIPPED: "SHIPPED";
};
export type MilestoneStage = (typeof MilestoneStage)[keyof typeof MilestoneStage];
export declare const MilestoneStatus: {
    readonly PENDING: "PENDING";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly DELAYED: "DELAYED";
};
export type MilestoneStatus = (typeof MilestoneStatus)[keyof typeof MilestoneStatus];
export declare const SampleType: {
    readonly CATALOG: "CATALOG";
    readonly PROTO: "PROTO";
    readonly FIT: "FIT";
    readonly SIZE_SET: "SIZE_SET";
    readonly PRE_PRODUCTION: "PRE_PRODUCTION";
    readonly TOP: "TOP";
    readonly SHIPMENT: "SHIPMENT";
};
export type SampleType = (typeof SampleType)[keyof typeof SampleType];
export declare const SampleStatus: {
    readonly REQUESTED: "REQUESTED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly SHIPPED: "SHIPPED";
    readonly RECEIVED: "RECEIVED";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type SampleStatus = (typeof SampleStatus)[keyof typeof SampleStatus];
export declare const PaymentDirection: {
    readonly INBOUND: "INBOUND";
    readonly OUTBOUND: "OUTBOUND";
};
export type PaymentDirection = (typeof PaymentDirection)[keyof typeof PaymentDirection];
export declare const PaymentPurpose: {
    readonly DEPOSIT: "DEPOSIT";
    readonly BALANCE: "BALANCE";
    readonly SAMPLE_FEE: "SAMPLE_FEE";
    readonly PAYOUT: "PAYOUT";
    readonly REFUND: "REFUND";
    readonly LOGISTICS: "LOGISTICS";
    readonly INSURANCE_RECOVERY: "INSURANCE_RECOVERY";
    readonly INSPECTION_FEE: "INSPECTION_FEE";
};
export type PaymentPurpose = (typeof PaymentPurpose)[keyof typeof PaymentPurpose];
export declare const PaymentMethod: {
    readonly BANK_TRANSFER: "BANK_TRANSFER";
    readonly CARD: "CARD";
    readonly LETTER_OF_CREDIT: "LETTER_OF_CREDIT";
};
export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly SUCCEEDED: "SUCCEEDED";
    readonly FAILED: "FAILED";
    readonly CANCELLED: "CANCELLED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const LedgerAccountType: {
    readonly PLATFORM_CASH: "PLATFORM_CASH";
    readonly BUYER_ESCROW: "BUYER_ESCROW";
    readonly MANUFACTURER_PAYABLE: "MANUFACTURER_PAYABLE";
    readonly PLATFORM_REVENUE: "PLATFORM_REVENUE";
    readonly PARTNER_PAYABLE: "PARTNER_PAYABLE";
    readonly INSPECTOR_PAYABLE: "INSPECTOR_PAYABLE";
};
export type LedgerAccountType = (typeof LedgerAccountType)[keyof typeof LedgerAccountType];
export declare const LedgerTransactionKind: {
    readonly DEPOSIT: "DEPOSIT";
    readonly HOLD: "HOLD";
    readonly RELEASE: "RELEASE";
    readonly REFUND: "REFUND";
    readonly COMMISSION: "COMMISSION";
    readonly PAYOUT: "PAYOUT";
    readonly CLAIM: "CLAIM";
    readonly SUBSCRIPTION: "SUBSCRIPTION";
};
export type LedgerTransactionKind = (typeof LedgerTransactionKind)[keyof typeof LedgerTransactionKind];
export declare const EntryDirection: {
    readonly DEBIT: "DEBIT";
    readonly CREDIT: "CREDIT";
};
export type EntryDirection = (typeof EntryDirection)[keyof typeof EntryDirection];
export declare const InspectionType: {
    readonly PRE_PRODUCTION: "PRE_PRODUCTION";
    readonly DURING_PRODUCTION: "DURING_PRODUCTION";
    readonly PRE_SHIPMENT: "PRE_SHIPMENT";
    readonly CONTAINER_LOADING: "CONTAINER_LOADING";
};
export type InspectionType = (typeof InspectionType)[keyof typeof InspectionType];
export declare const InspectionResult: {
    readonly PENDING: "PENDING";
    readonly PASS: "PASS";
    readonly FAIL: "FAIL";
    readonly ON_HOLD: "ON_HOLD";
};
export type InspectionResult = (typeof InspectionResult)[keyof typeof InspectionResult];
export declare const ReviewStatus: {
    readonly PENDING_MODERATION: "PENDING_MODERATION";
    readonly PUBLISHED: "PUBLISHED";
    readonly HIDDEN: "HIDDEN";
};
export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];
export declare const DisputeReason: {
    readonly QUALITY: "QUALITY";
    readonly QUANTITY: "QUANTITY";
    readonly LATE_DELIVERY: "LATE_DELIVERY";
    readonly NOT_AS_DESCRIBED: "NOT_AS_DESCRIBED";
    readonly PAYMENT: "PAYMENT";
    readonly OTHER: "OTHER";
};
export type DisputeReason = (typeof DisputeReason)[keyof typeof DisputeReason];
export declare const DisputeStatus: {
    readonly OPEN: "OPEN";
    readonly UNDER_REVIEW: "UNDER_REVIEW";
    readonly RESOLVED_FOR_BUYER: "RESOLVED_FOR_BUYER";
    readonly RESOLVED_FOR_MANUFACTURER: "RESOLVED_FOR_MANUFACTURER";
    readonly SETTLED: "SETTLED";
    readonly CLOSED: "CLOSED";
};
export type DisputeStatus = (typeof DisputeStatus)[keyof typeof DisputeStatus];
export declare const NotificationType: {
    readonly EMAIL_VERIFIED: "EMAIL_VERIFIED";
    readonly KYC_SUBMITTED: "KYC_SUBMITTED";
    readonly KYC_APPROVED: "KYC_APPROVED";
    readonly KYC_REJECTED: "KYC_REJECTED";
    readonly RFQ_INVITATION: "RFQ_INVITATION";
    readonly QUOTE_RECEIVED: "QUOTE_RECEIVED";
    readonly QUOTE_OFFERED: "QUOTE_OFFERED";
    readonly ORDER_UPDATE: "ORDER_UPDATE";
    readonly MILESTONE_UPDATE: "MILESTONE_UPDATE";
    readonly QC_RESULT: "QC_RESULT";
    readonly MESSAGE_RECEIVED: "MESSAGE_RECEIVED";
    readonly PAYMENT_UPDATE: "PAYMENT_UPDATE";
    readonly DISPUTE_UPDATE: "DISPUTE_UPDATE";
    readonly REVIEW_RECEIVED: "REVIEW_RECEIVED";
    readonly SYSTEM: "SYSTEM";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const NotificationCategory: {
    readonly QUOTES: "QUOTES";
    readonly MESSAGES: "MESSAGES";
    readonly ORDERS: "ORDERS";
    readonly QC: "QC";
    readonly PAYMENTS: "PAYMENTS";
    readonly DISPUTES: "DISPUTES";
    readonly REVIEWS: "REVIEWS";
    readonly ACCOUNT: "ACCOUNT";
};
export type NotificationCategory = (typeof NotificationCategory)[keyof typeof NotificationCategory];
export declare const ReviewDirection: {
    readonly BUYER_TO_MANUFACTURER: "BUYER_TO_MANUFACTURER";
    readonly MANUFACTURER_TO_BUYER: "MANUFACTURER_TO_BUYER";
};
export type ReviewDirection = (typeof ReviewDirection)[keyof typeof ReviewDirection];
export declare const DisputeParty: {
    readonly BUYER: "BUYER";
    readonly MANUFACTURER: "MANUFACTURER";
    readonly STAFF: "STAFF";
};
export type DisputeParty = (typeof DisputeParty)[keyof typeof DisputeParty];
export declare const FilePurpose: {
    readonly KYC_DOCUMENT: "KYC_DOCUMENT";
    readonly CERTIFICATION: "CERTIFICATION";
    readonly PRODUCT_IMAGE: "PRODUCT_IMAGE";
    readonly FACTORY_PHOTO: "FACTORY_PHOTO";
    readonly TECH_PACK: "TECH_PACK";
    readonly MESSAGE_ATTACHMENT: "MESSAGE_ATTACHMENT";
    readonly MILESTONE_PHOTO: "MILESTONE_PHOTO";
    readonly SAMPLE_PHOTO: "SAMPLE_PHOTO";
    readonly PAYMENT_PROOF: "PAYMENT_PROOF";
    readonly INSPECTION_REPORT: "INSPECTION_REPORT";
    readonly SHIPMENT_DOCUMENT: "SHIPMENT_DOCUMENT";
    readonly INSPECTION_PHOTO: "INSPECTION_PHOTO";
    readonly HUB_PHOTO: "HUB_PHOTO";
    readonly LOGISTICS_DOCUMENT: "LOGISTICS_DOCUMENT";
    readonly DISPUTE_EVIDENCE: "DISPUTE_EVIDENCE";
    readonly SUPPLIER_CLAIM_EVIDENCE: "SUPPLIER_CLAIM_EVIDENCE";
    readonly AVATAR: "AVATAR";
    readonly OTHER: "OTHER";
};
export type FilePurpose = (typeof FilePurpose)[keyof typeof FilePurpose];
export declare const ImageProcessingStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly READY: "READY";
    readonly FAILED: "FAILED";
};
export type ImageProcessingStatus = (typeof ImageProcessingStatus)[keyof typeof ImageProcessingStatus];
export declare const MediaReviewStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type MediaReviewStatus = (typeof MediaReviewStatus)[keyof typeof MediaReviewStatus];
export declare const FileStatus: {
    readonly PENDING_UPLOAD: "PENDING_UPLOAD";
    readonly UPLOADED: "UPLOADED";
    readonly REJECTED: "REJECTED";
};
export type FileStatus = (typeof FileStatus)[keyof typeof FileStatus];
export declare const ScanStatus: {
    readonly PENDING: "PENDING";
    readonly CLEAN: "CLEAN";
    readonly INFECTED: "INFECTED";
};
export type ScanStatus = (typeof ScanStatus)[keyof typeof ScanStatus];
export declare const WarningLevel: {
    readonly WARNING: "WARNING";
    readonly FINAL_WARNING: "FINAL_WARNING";
};
export type WarningLevel = (typeof WarningLevel)[keyof typeof WarningLevel];
export declare const ReleaseTrigger: {
    readonly PRODUCTION_START: "PRODUCTION_START";
    readonly QC_PASSED: "QC_PASSED";
    readonly SHIPPED: "SHIPPED";
    readonly DELIVERED: "DELIVERED";
    readonly COMPLETED: "COMPLETED";
    readonly CLAIM_WINDOW: "CLAIM_WINDOW";
};
export type ReleaseTrigger = (typeof ReleaseTrigger)[keyof typeof ReleaseTrigger];
export declare const ReleaseStatus: {
    readonly SCHEDULED: "SCHEDULED";
    readonly DUE: "DUE";
    readonly RELEASED: "RELEASED";
    readonly PAID: "PAID";
    readonly CANCELLED: "CANCELLED";
};
export type ReleaseStatus = (typeof ReleaseStatus)[keyof typeof ReleaseStatus];
export declare const ProductionLineStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly PAUSED: "PAUSED";
    readonly RETIRED: "RETIRED";
};
export type ProductionLineStatus = (typeof ProductionLineStatus)[keyof typeof ProductionLineStatus];
export declare const CapacitySlotStatus: {
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
};
export type CapacitySlotStatus = (typeof CapacitySlotStatus)[keyof typeof CapacitySlotStatus];
export declare const SupplierClaimRegion: {
    readonly EU: "EU";
    readonly UK: "UK";
    readonly US: "US";
    readonly CANADA: "CANADA";
    readonly JAPAN: "JAPAN";
    readonly AUSTRALIA: "AUSTRALIA";
    readonly MIDDLE_EAST: "MIDDLE_EAST";
    readonly OTHER: "OTHER";
};
export type SupplierClaimRegion = (typeof SupplierClaimRegion)[keyof typeof SupplierClaimRegion];
export declare const SupplierClaimTier: {
    readonly MAJOR: "MAJOR";
    readonly ESTABLISHED: "ESTABLISHED";
};
export type SupplierClaimTier = (typeof SupplierClaimTier)[keyof typeof SupplierClaimTier];
export declare const SupplierClaimStatus: {
    readonly PENDING: "PENDING";
    readonly VERIFIED: "VERIFIED";
    readonly REJECTED: "REJECTED";
};
export type SupplierClaimStatus = (typeof SupplierClaimStatus)[keyof typeof SupplierClaimStatus];
export declare const CapacityBookingKind: {
    readonly SLOT: "SLOT";
    readonly LINE: "LINE";
    readonly PARTNERSHIP: "PARTNERSHIP";
};
export type CapacityBookingKind = (typeof CapacityBookingKind)[keyof typeof CapacityBookingKind];
export declare const CapacityBookingStatus: {
    readonly HELD: "HELD";
    readonly CONFIRMED: "CONFIRMED";
    readonly IN_PRODUCTION: "IN_PRODUCTION";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly EXPIRED: "EXPIRED";
};
export type CapacityBookingStatus = (typeof CapacityBookingStatus)[keyof typeof CapacityBookingStatus];
export declare const CapacityBookingActor: {
    readonly BUYER: "BUYER";
    readonly FACTORY: "FACTORY";
    readonly STAFF: "STAFF";
    readonly SYSTEM: "SYSTEM";
};
export type CapacityBookingActor = (typeof CapacityBookingActor)[keyof typeof CapacityBookingActor];
export declare const CapacityConversionMode: {
    readonly CMT: "CMT";
    readonly FULL_PACKAGE: "FULL_PACKAGE";
};
export type CapacityConversionMode = (typeof CapacityConversionMode)[keyof typeof CapacityConversionMode];
export declare const CapacityPartnershipStatus: {
    readonly REQUESTED: "REQUESTED";
    readonly ACTIVE: "ACTIVE";
    readonly DECLINED: "DECLINED";
    readonly CANCELLED: "CANCELLED";
    readonly ENDED: "ENDED";
};
export type CapacityPartnershipStatus = (typeof CapacityPartnershipStatus)[keyof typeof CapacityPartnershipStatus];
export declare const LogisticsMode: {
    readonly SAMPLE_COURIER: "SAMPLE_COURIER";
    readonly DOMESTIC: "DOMESTIC";
    readonly SEA_FCL: "SEA_FCL";
    readonly SEA_LCL: "SEA_LCL";
    readonly AIR: "AIR";
    readonly DDP: "DDP";
    readonly HANDOVER: "HANDOVER";
};
export type LogisticsMode = (typeof LogisticsMode)[keyof typeof LogisticsMode];
export declare const LogisticsPartnerKind: {
    readonly FORWARDER: "FORWARDER";
    readonly COURIER: "COURIER";
    readonly TRUCKING: "TRUCKING";
    readonly CUSTOMS_BROKER: "CUSTOMS_BROKER";
};
export type LogisticsPartnerKind = (typeof LogisticsPartnerKind)[keyof typeof LogisticsPartnerKind];
export declare const RateUnit: {
    readonly PER_KG: "PER_KG";
    readonly PER_CBM: "PER_CBM";
    readonly PER_CONTAINER: "PER_CONTAINER";
    readonly FLAT: "FLAT";
};
export type RateUnit = (typeof RateUnit)[keyof typeof RateUnit];
export declare const ContainerType: {
    readonly GP20: "GP20";
    readonly GP40: "GP40";
    readonly HC40: "HC40";
};
export type ContainerType = (typeof ContainerType)[keyof typeof ContainerType];
export declare const HubOperator: {
    readonly GARMENT_GATE: "GARMENT_GATE";
    readonly PARTNER: "PARTNER";
};
export type HubOperator = (typeof HubOperator)[keyof typeof HubOperator];
export declare const LogisticsQuoteStatus: {
    readonly OFFERED: "OFFERED";
    readonly ACCEPTED: "ACCEPTED";
    readonly SUPERSEDED: "SUPERSEDED";
};
export type LogisticsQuoteStatus = (typeof LogisticsQuoteStatus)[keyof typeof LogisticsQuoteStatus];
export declare const PickupStatus: {
    readonly REQUESTED: "REQUESTED";
    readonly SCHEDULED: "SCHEDULED";
    readonly COLLECTED: "COLLECTED";
    readonly RECEIVED: "RECEIVED";
    readonly CANCELLED: "CANCELLED";
};
export type PickupStatus = (typeof PickupStatus)[keyof typeof PickupStatus];
export declare const HubReceiptCondition: {
    readonly GOOD: "GOOD";
    readonly DAMAGED: "DAMAGED";
    readonly SHORT: "SHORT";
    readonly OVER: "OVER";
};
export type HubReceiptCondition = (typeof HubReceiptCondition)[keyof typeof HubReceiptCondition];
export declare const LogisticsShipmentStatus: {
    readonly PLANNED: "PLANNED";
    readonly BOOKED: "BOOKED";
    readonly IN_TRANSIT: "IN_TRANSIT";
    readonly AT_DESTINATION: "AT_DESTINATION";
    readonly CUSTOMS: "CUSTOMS";
    readonly OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY";
    readonly DELIVERED: "DELIVERED";
    readonly EXCEPTION: "EXCEPTION";
    readonly CANCELLED: "CANCELLED";
};
export type LogisticsShipmentStatus = (typeof LogisticsShipmentStatus)[keyof typeof LogisticsShipmentStatus];
export declare const ShipmentLegKind: {
    readonly FACTORY_TO_HUB: "FACTORY_TO_HUB";
    readonly HUB_TO_PORT: "HUB_TO_PORT";
    readonly PORT_TO_PORT: "PORT_TO_PORT";
    readonly PORT_TO_BUYER: "PORT_TO_BUYER";
    readonly HUB_HANDOVER: "HUB_HANDOVER";
};
export type ShipmentLegKind = (typeof ShipmentLegKind)[keyof typeof ShipmentLegKind];
export declare const ShipmentLegStatus: {
    readonly PENDING: "PENDING";
    readonly BOOKED: "BOOKED";
    readonly IN_TRANSIT: "IN_TRANSIT";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type ShipmentLegStatus = (typeof ShipmentLegStatus)[keyof typeof ShipmentLegStatus];
export declare const LogisticsDocumentType: {
    readonly COMMERCIAL_INVOICE: "COMMERCIAL_INVOICE";
    readonly PACKING_LIST: "PACKING_LIST";
    readonly BILL_OF_LADING: "BILL_OF_LADING";
    readonly ORIGINAL_BILL_OF_LADING: "ORIGINAL_BILL_OF_LADING";
    readonly CERTIFICATE_OF_ORIGIN: "CERTIFICATE_OF_ORIGIN";
    readonly INSURANCE_CERTIFICATE: "INSURANCE_CERTIFICATE";
    readonly SHIPPING_LABEL: "SHIPPING_LABEL";
    readonly CARTON_MARKING: "CARTON_MARKING";
};
export type LogisticsDocumentType = (typeof LogisticsDocumentType)[keyof typeof LogisticsDocumentType];
export declare const ShipmentEventSource: {
    readonly STAFF: "STAFF";
    readonly PARTNER: "PARTNER";
    readonly FACTORY: "FACTORY";
    readonly SYSTEM: "SYSTEM";
};
export type ShipmentEventSource = (typeof ShipmentEventSource)[keyof typeof ShipmentEventSource];
export declare const ShipmentUploadKind: {
    readonly BILL_OF_LADING: "BILL_OF_LADING";
    readonly AIRWAY_BILL: "AIRWAY_BILL";
    readonly PROOF_OF_DELIVERY: "PROOF_OF_DELIVERY";
    readonly PHOTO: "PHOTO";
    readonly OTHER: "OTHER";
};
export type ShipmentUploadKind = (typeof ShipmentUploadKind)[keyof typeof ShipmentUploadKind];
export declare const LogisticsClaimType: {
    readonly LOSS: "LOSS";
    readonly DAMAGE: "DAMAGE";
    readonly SHORTAGE: "SHORTAGE";
    readonly DELAY: "DELAY";
};
export type LogisticsClaimType = (typeof LogisticsClaimType)[keyof typeof LogisticsClaimType];
export declare const LogisticsClaimStatus: {
    readonly OPEN: "OPEN";
    readonly SUBMITTED: "SUBMITTED";
    readonly SETTLED: "SETTLED";
    readonly REJECTED: "REJECTED";
};
export type LogisticsClaimStatus = (typeof LogisticsClaimStatus)[keyof typeof LogisticsClaimStatus];
export declare const OrderChargeKind: {
    readonly SAMPLE_FEE: "SAMPLE_FEE";
    readonly INSPECTION_FEE: "INSPECTION_FEE";
};
export type OrderChargeKind = (typeof OrderChargeKind)[keyof typeof OrderChargeKind];
export declare const BankAccountStatus: {
    readonly PENDING_REVIEW: "PENDING_REVIEW";
    readonly VERIFIED: "VERIFIED";
    readonly REJECTED: "REJECTED";
    readonly REPLACED: "REPLACED";
};
export type BankAccountStatus = (typeof BankAccountStatus)[keyof typeof BankAccountStatus];
export declare const SupplyContractStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly ENDED: "ENDED";
    readonly CANCELLED: "CANCELLED";
};
export type SupplyContractStatus = (typeof SupplyContractStatus)[keyof typeof SupplyContractStatus];
export declare const InspectorApplicationStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type InspectorApplicationStatus = (typeof InspectorApplicationStatus)[keyof typeof InspectorApplicationStatus];
export declare const InspectorStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
};
export type InspectorStatus = (typeof InspectorStatus)[keyof typeof InspectorStatus];
export declare const PlanTier: {
    readonly FREE: "FREE";
    readonly PRO: "PRO";
    readonly PREMIUM: "PREMIUM";
};
export type PlanTier = (typeof PlanTier)[keyof typeof PlanTier];
export declare const PlanInterval: {
    readonly MONTH: "MONTH";
    readonly YEAR: "YEAR";
};
export type PlanInterval = (typeof PlanInterval)[keyof typeof PlanInterval];
export declare const SubscriptionSource: {
    readonly STRIPE: "STRIPE";
    readonly MANUAL: "MANUAL";
};
export type SubscriptionSource = (typeof SubscriptionSource)[keyof typeof SubscriptionSource];
export declare const SubscriptionStatus: {
    readonly INCOMPLETE: "INCOMPLETE";
    readonly ACTIVE: "ACTIVE";
    readonly PAST_DUE: "PAST_DUE";
    readonly CANCELED: "CANCELED";
};
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
export declare const SubscriptionPlan: {
    readonly PRO: "PRO";
    readonly PREMIUM: "PREMIUM";
    readonly PLUS: "PLUS";
};
export type SubscriptionPlan = (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan];
export declare const TextChannel: {
    readonly SMS: "SMS";
    readonly WHATSAPP: "WHATSAPP";
};
export type TextChannel = (typeof TextChannel)[keyof typeof TextChannel];
export declare const OutboundMessageStatus: {
    readonly QUEUED: "QUEUED";
    readonly SENT: "SENT";
    readonly DELIVERED: "DELIVERED";
    readonly FAILED: "FAILED";
    readonly SKIPPED: "SKIPPED";
};
export type OutboundMessageStatus = (typeof OutboundMessageStatus)[keyof typeof OutboundMessageStatus];
export declare const LeadKind: {
    readonly SALES: "SALES";
    readonly ENTERPRISE: "ENTERPRISE";
    readonly LOGISTICS_PARTNER: "LOGISTICS_PARTNER";
    readonly MANUFACTURER: "MANUFACTURER";
    readonly SUPPORT: "SUPPORT";
    readonly PRESS: "PRESS";
};
export type LeadKind = (typeof LeadKind)[keyof typeof LeadKind];
export declare const LeadStatus: {
    readonly NEW: "NEW";
    readonly CONTACTED: "CONTACTED";
    readonly CLOSED: "CLOSED";
};
export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];
