export const Role = {
    BUYER: 'BUYER',
    MANUFACTURER: 'MANUFACTURER',
    ADMIN: 'ADMIN',
    INSPECTOR: 'INSPECTOR',
    PARTNER: 'PARTNER'
};
export const UserStatus = {
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED',
    DEACTIVATED: 'DEACTIVATED'
};
export const CompanyRole = {
    OWNER: 'OWNER',
    MEMBER: 'MEMBER'
};
export const UserTokenType = {
    EMAIL_VERIFICATION: 'EMAIL_VERIFICATION',
    PASSWORD_RESET: 'PASSWORD_RESET'
};
export const CompanyType = {
    BUYER: 'BUYER',
    MANUFACTURER: 'MANUFACTURER'
};
export const KycStatus = {
    NOT_SUBMITTED: 'NOT_SUBMITTED',
    PENDING_REVIEW: 'PENDING_REVIEW',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED'
};
export const OnboardingStep = {
    COMPANY_INFO: 'COMPANY_INFO',
    PROFILE: 'PROFILE',
    DOCUMENTS: 'DOCUMENTS',
    SUBMITTED: 'SUBMITTED'
};
export const BuyerBusinessType = {
    BRAND: 'BRAND',
    RETAILER: 'RETAILER',
    IMPORTER: 'IMPORTER',
    WHOLESALER: 'WHOLESALER',
    SOURCING_AGENT: 'SOURCING_AGENT',
    OTHER: 'OTHER'
};
export const CompanyDocumentType = {
    BUSINESS_LICENSE: 'BUSINESS_LICENSE',
    EXPORT_REGISTRATION: 'EXPORT_REGISTRATION',
    TAX_CERTIFICATE: 'TAX_CERTIFICATE',
    BANK_LETTER: 'BANK_LETTER',
    ID_PROOF: 'ID_PROOF',
    OTHER: 'OTHER'
};
export const ReviewState = {
    PENDING: 'PENDING',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED'
};
export const CertificationType = {
    BSCI_AMFORI: 'BSCI_AMFORI',
    WRAP: 'WRAP',
    SEDEX_SMETA: 'SEDEX_SMETA',
    OEKO_TEX_100: 'OEKO_TEX_100',
    GOTS: 'GOTS',
    GRS: 'GRS',
    BCI: 'BCI',
    ISO_9001: 'ISO_9001',
    ISO_14001: 'ISO_14001',
    SA8000: 'SA8000',
    FAIR_TRADE: 'FAIR_TRADE',
    HIGG_FEM: 'HIGG_FEM',
    OTHER: 'OTHER'
};
export const CertificationStatus = {
    PENDING: 'PENDING',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED',
    EXPIRED: 'EXPIRED'
};
export const Currency = {
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    BDT: 'BDT',
    INR: 'INR',
    VND: 'VND',
    TRY: 'TRY',
    PKR: 'PKR',
    CNY: 'CNY'
};
export const Incoterm = {
    EXW: 'EXW',
    FCA: 'FCA',
    FOB: 'FOB',
    CFR: 'CFR',
    CIF: 'CIF',
    CPT: 'CPT',
    CIP: 'CIP',
    DAP: 'DAP',
    DPU: 'DPU',
    DDP: 'DDP'
};
export const ProductStatus = {
    DRAFT: 'DRAFT',
    PENDING_REVIEW: 'PENDING_REVIEW',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED'
};
export const RfqStatus = {
    DRAFT: 'DRAFT',
    OPEN: 'OPEN',
    CLOSED: 'CLOSED',
    AWARDED: 'AWARDED',
    CANCELLED: 'CANCELLED'
};
export const RfqInvitationStatus = {
    INVITED: 'INVITED',
    VIEWED: 'VIEWED',
    DECLINED: 'DECLINED',
    QUOTED: 'QUOTED'
};
export const RfqAttachmentKind = {
    TECH_PACK: 'TECH_PACK',
    REFERENCE_IMAGE: 'REFERENCE_IMAGE',
    SIZE_CHART: 'SIZE_CHART',
    OTHER: 'OTHER'
};
export const QuoteStatus = {
    SUBMITTED: 'SUBMITTED',
    UNDER_REVIEW: 'UNDER_REVIEW',
    OFFERED: 'OFFERED',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    WITHDRAWN: 'WITHDRAWN',
    EXPIRED: 'EXPIRED'
};
export const ConversationType = {
    BUYER_PLATFORM: 'BUYER_PLATFORM',
    MANUFACTURER_PLATFORM: 'MANUFACTURER_PLATFORM',
    SUPPORT: 'SUPPORT'
};
export const ContactFlag = {
    EMAIL: 'EMAIL',
    PHONE: 'PHONE',
    URL: 'URL',
    SOCIAL_HANDLE: 'SOCIAL_HANDLE',
    OBFUSCATED_CONTACT: 'OBFUSCATED_CONTACT',
    OTHER: 'OTHER'
};
export const ModerationStatus = {
    CLEAN: 'CLEAN',
    FLAGGED: 'FLAGGED',
    REVIEWED_OK: 'REVIEWED_OK',
    REVIEWED_BLOCKED: 'REVIEWED_BLOCKED'
};
export const OrderStatus = {
    DRAFT: 'DRAFT',
    SAMPLING: 'SAMPLING',
    SAMPLE_APPROVED: 'SAMPLE_APPROVED',
    DEPOSIT_PENDING: 'DEPOSIT_PENDING',
    IN_PRODUCTION: 'IN_PRODUCTION',
    QC: 'QC',
    READY_TO_SHIP: 'READY_TO_SHIP',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    DISPUTED: 'DISPUTED'
};
export const MilestoneStage = {
    ORDER_CONFIRMED: 'ORDER_CONFIRMED',
    FABRIC_SOURCING: 'FABRIC_SOURCING',
    CUTTING: 'CUTTING',
    SEWING: 'SEWING',
    FINISHING: 'FINISHING',
    PACKING: 'PACKING',
    READY_FOR_INSPECTION: 'READY_FOR_INSPECTION',
    SHIPPED: 'SHIPPED'
};
export const MilestoneStatus = {
    PENDING: 'PENDING',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    DELAYED: 'DELAYED'
};
export const SampleType = {
    CATALOG: 'CATALOG',
    PROTO: 'PROTO',
    FIT: 'FIT',
    SIZE_SET: 'SIZE_SET',
    PRE_PRODUCTION: 'PRE_PRODUCTION',
    TOP: 'TOP',
    SHIPMENT: 'SHIPMENT'
};
export const SampleStatus = {
    REQUESTED: 'REQUESTED',
    IN_PROGRESS: 'IN_PROGRESS',
    SHIPPED: 'SHIPPED',
    RECEIVED: 'RECEIVED',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
};
export const PaymentDirection = {
    INBOUND: 'INBOUND',
    OUTBOUND: 'OUTBOUND'
};
export const PaymentPurpose = {
    DEPOSIT: 'DEPOSIT',
    BALANCE: 'BALANCE',
    SAMPLE_FEE: 'SAMPLE_FEE',
    PAYOUT: 'PAYOUT',
    REFUND: 'REFUND',
    LOGISTICS: 'LOGISTICS',
    INSURANCE_RECOVERY: 'INSURANCE_RECOVERY',
    INSPECTION_FEE: 'INSPECTION_FEE'
};
export const PaymentMethod = {
    BANK_TRANSFER: 'BANK_TRANSFER',
    CARD: 'CARD',
    LETTER_OF_CREDIT: 'LETTER_OF_CREDIT'
};
export const PaymentStatus = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    SUCCEEDED: 'SUCCEEDED',
    FAILED: 'FAILED',
    CANCELLED: 'CANCELLED'
};
export const LedgerAccountType = {
    PLATFORM_CASH: 'PLATFORM_CASH',
    BUYER_ESCROW: 'BUYER_ESCROW',
    MANUFACTURER_PAYABLE: 'MANUFACTURER_PAYABLE',
    PLATFORM_REVENUE: 'PLATFORM_REVENUE',
    PARTNER_PAYABLE: 'PARTNER_PAYABLE',
    INSPECTOR_PAYABLE: 'INSPECTOR_PAYABLE'
};
export const LedgerTransactionKind = {
    DEPOSIT: 'DEPOSIT',
    HOLD: 'HOLD',
    RELEASE: 'RELEASE',
    REFUND: 'REFUND',
    COMMISSION: 'COMMISSION',
    PAYOUT: 'PAYOUT',
    CLAIM: 'CLAIM',
    SUBSCRIPTION: 'SUBSCRIPTION'
};
export const EntryDirection = {
    DEBIT: 'DEBIT',
    CREDIT: 'CREDIT'
};
export const InspectionType = {
    PRE_PRODUCTION: 'PRE_PRODUCTION',
    DURING_PRODUCTION: 'DURING_PRODUCTION',
    PRE_SHIPMENT: 'PRE_SHIPMENT',
    CONTAINER_LOADING: 'CONTAINER_LOADING'
};
export const InspectionResult = {
    PENDING: 'PENDING',
    PASS: 'PASS',
    FAIL: 'FAIL',
    ON_HOLD: 'ON_HOLD'
};
export const ReviewStatus = {
    PENDING_MODERATION: 'PENDING_MODERATION',
    PUBLISHED: 'PUBLISHED',
    HIDDEN: 'HIDDEN'
};
export const DisputeReason = {
    QUALITY: 'QUALITY',
    QUANTITY: 'QUANTITY',
    LATE_DELIVERY: 'LATE_DELIVERY',
    NOT_AS_DESCRIBED: 'NOT_AS_DESCRIBED',
    PAYMENT: 'PAYMENT',
    OTHER: 'OTHER'
};
export const DisputeStatus = {
    OPEN: 'OPEN',
    UNDER_REVIEW: 'UNDER_REVIEW',
    RESOLVED_FOR_BUYER: 'RESOLVED_FOR_BUYER',
    RESOLVED_FOR_MANUFACTURER: 'RESOLVED_FOR_MANUFACTURER',
    SETTLED: 'SETTLED',
    CLOSED: 'CLOSED'
};
export const NotificationType = {
    EMAIL_VERIFIED: 'EMAIL_VERIFIED',
    KYC_SUBMITTED: 'KYC_SUBMITTED',
    KYC_APPROVED: 'KYC_APPROVED',
    KYC_REJECTED: 'KYC_REJECTED',
    RFQ_INVITATION: 'RFQ_INVITATION',
    QUOTE_RECEIVED: 'QUOTE_RECEIVED',
    QUOTE_OFFERED: 'QUOTE_OFFERED',
    ORDER_UPDATE: 'ORDER_UPDATE',
    MILESTONE_UPDATE: 'MILESTONE_UPDATE',
    QC_RESULT: 'QC_RESULT',
    MESSAGE_RECEIVED: 'MESSAGE_RECEIVED',
    PAYMENT_UPDATE: 'PAYMENT_UPDATE',
    DISPUTE_UPDATE: 'DISPUTE_UPDATE',
    REVIEW_RECEIVED: 'REVIEW_RECEIVED',
    SYSTEM: 'SYSTEM'
};
export const NotificationCategory = {
    QUOTES: 'QUOTES',
    MESSAGES: 'MESSAGES',
    ORDERS: 'ORDERS',
    QC: 'QC',
    PAYMENTS: 'PAYMENTS',
    DISPUTES: 'DISPUTES',
    REVIEWS: 'REVIEWS',
    ACCOUNT: 'ACCOUNT'
};
export const ReviewDirection = {
    BUYER_TO_MANUFACTURER: 'BUYER_TO_MANUFACTURER',
    MANUFACTURER_TO_BUYER: 'MANUFACTURER_TO_BUYER'
};
export const DisputeParty = {
    BUYER: 'BUYER',
    MANUFACTURER: 'MANUFACTURER',
    STAFF: 'STAFF'
};
export const FilePurpose = {
    KYC_DOCUMENT: 'KYC_DOCUMENT',
    CERTIFICATION: 'CERTIFICATION',
    PRODUCT_IMAGE: 'PRODUCT_IMAGE',
    FACTORY_PHOTO: 'FACTORY_PHOTO',
    TECH_PACK: 'TECH_PACK',
    MESSAGE_ATTACHMENT: 'MESSAGE_ATTACHMENT',
    MILESTONE_PHOTO: 'MILESTONE_PHOTO',
    SAMPLE_PHOTO: 'SAMPLE_PHOTO',
    PAYMENT_PROOF: 'PAYMENT_PROOF',
    INSPECTION_REPORT: 'INSPECTION_REPORT',
    SHIPMENT_DOCUMENT: 'SHIPMENT_DOCUMENT',
    INSPECTION_PHOTO: 'INSPECTION_PHOTO',
    HUB_PHOTO: 'HUB_PHOTO',
    LOGISTICS_DOCUMENT: 'LOGISTICS_DOCUMENT',
    DISPUTE_EVIDENCE: 'DISPUTE_EVIDENCE',
    SUPPLIER_CLAIM_EVIDENCE: 'SUPPLIER_CLAIM_EVIDENCE',
    AVATAR: 'AVATAR',
    OTHER: 'OTHER'
};
export const ImageProcessingStatus = {
    PENDING: 'PENDING',
    PROCESSING: 'PROCESSING',
    READY: 'READY',
    FAILED: 'FAILED'
};
export const MediaReviewStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
};
export const FileStatus = {
    PENDING_UPLOAD: 'PENDING_UPLOAD',
    UPLOADED: 'UPLOADED',
    REJECTED: 'REJECTED'
};
export const ScanStatus = {
    PENDING: 'PENDING',
    CLEAN: 'CLEAN',
    INFECTED: 'INFECTED'
};
export const WarningLevel = {
    WARNING: 'WARNING',
    FINAL_WARNING: 'FINAL_WARNING'
};
export const ReleaseTrigger = {
    PRODUCTION_START: 'PRODUCTION_START',
    QC_PASSED: 'QC_PASSED',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    COMPLETED: 'COMPLETED',
    CLAIM_WINDOW: 'CLAIM_WINDOW'
};
export const ReleaseStatus = {
    SCHEDULED: 'SCHEDULED',
    DUE: 'DUE',
    RELEASED: 'RELEASED',
    PAID: 'PAID',
    CANCELLED: 'CANCELLED'
};
export const ProductionLineStatus = {
    ACTIVE: 'ACTIVE',
    PAUSED: 'PAUSED',
    RETIRED: 'RETIRED'
};
export const CapacitySlotStatus = {
    OPEN: 'OPEN',
    CLOSED: 'CLOSED'
};
export const SupplierClaimRegion = {
    EU: 'EU',
    UK: 'UK',
    US: 'US',
    CANADA: 'CANADA',
    JAPAN: 'JAPAN',
    AUSTRALIA: 'AUSTRALIA',
    MIDDLE_EAST: 'MIDDLE_EAST',
    OTHER: 'OTHER'
};
export const SupplierClaimTier = {
    MAJOR: 'MAJOR',
    ESTABLISHED: 'ESTABLISHED'
};
export const SupplierClaimStatus = {
    PENDING: 'PENDING',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED'
};
export const CapacityBookingKind = {
    SLOT: 'SLOT',
    LINE: 'LINE',
    PARTNERSHIP: 'PARTNERSHIP'
};
export const CapacityBookingStatus = {
    HELD: 'HELD',
    CONFIRMED: 'CONFIRMED',
    IN_PRODUCTION: 'IN_PRODUCTION',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    EXPIRED: 'EXPIRED'
};
export const CapacityBookingActor = {
    BUYER: 'BUYER',
    FACTORY: 'FACTORY',
    STAFF: 'STAFF',
    SYSTEM: 'SYSTEM'
};
export const CapacityConversionMode = {
    CMT: 'CMT',
    FULL_PACKAGE: 'FULL_PACKAGE'
};
export const CapacityPartnershipStatus = {
    REQUESTED: 'REQUESTED',
    ACTIVE: 'ACTIVE',
    DECLINED: 'DECLINED',
    CANCELLED: 'CANCELLED',
    ENDED: 'ENDED'
};
export const LogisticsMode = {
    SAMPLE_COURIER: 'SAMPLE_COURIER',
    DOMESTIC: 'DOMESTIC',
    SEA_FCL: 'SEA_FCL',
    SEA_LCL: 'SEA_LCL',
    AIR: 'AIR',
    DDP: 'DDP',
    HANDOVER: 'HANDOVER'
};
export const LogisticsPartnerKind = {
    FORWARDER: 'FORWARDER',
    COURIER: 'COURIER',
    TRUCKING: 'TRUCKING',
    CUSTOMS_BROKER: 'CUSTOMS_BROKER'
};
export const RateUnit = {
    PER_KG: 'PER_KG',
    PER_CBM: 'PER_CBM',
    PER_CONTAINER: 'PER_CONTAINER',
    FLAT: 'FLAT'
};
export const ContainerType = {
    GP20: 'GP20',
    GP40: 'GP40',
    HC40: 'HC40'
};
export const HubOperator = {
    GARMENT_GATE: 'GARMENT_GATE',
    PARTNER: 'PARTNER'
};
export const LogisticsQuoteStatus = {
    OFFERED: 'OFFERED',
    ACCEPTED: 'ACCEPTED',
    SUPERSEDED: 'SUPERSEDED'
};
export const PickupStatus = {
    REQUESTED: 'REQUESTED',
    SCHEDULED: 'SCHEDULED',
    COLLECTED: 'COLLECTED',
    RECEIVED: 'RECEIVED',
    CANCELLED: 'CANCELLED'
};
export const HubReceiptCondition = {
    GOOD: 'GOOD',
    DAMAGED: 'DAMAGED',
    SHORT: 'SHORT',
    OVER: 'OVER'
};
export const LogisticsShipmentStatus = {
    PLANNED: 'PLANNED',
    BOOKED: 'BOOKED',
    IN_TRANSIT: 'IN_TRANSIT',
    AT_DESTINATION: 'AT_DESTINATION',
    CUSTOMS: 'CUSTOMS',
    OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
    DELIVERED: 'DELIVERED',
    EXCEPTION: 'EXCEPTION',
    CANCELLED: 'CANCELLED'
};
export const ShipmentLegKind = {
    FACTORY_TO_HUB: 'FACTORY_TO_HUB',
    HUB_TO_PORT: 'HUB_TO_PORT',
    PORT_TO_PORT: 'PORT_TO_PORT',
    PORT_TO_BUYER: 'PORT_TO_BUYER',
    HUB_HANDOVER: 'HUB_HANDOVER'
};
export const ShipmentLegStatus = {
    PENDING: 'PENDING',
    BOOKED: 'BOOKED',
    IN_TRANSIT: 'IN_TRANSIT',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED'
};
export const LogisticsDocumentType = {
    COMMERCIAL_INVOICE: 'COMMERCIAL_INVOICE',
    PACKING_LIST: 'PACKING_LIST',
    BILL_OF_LADING: 'BILL_OF_LADING',
    ORIGINAL_BILL_OF_LADING: 'ORIGINAL_BILL_OF_LADING',
    CERTIFICATE_OF_ORIGIN: 'CERTIFICATE_OF_ORIGIN',
    INSURANCE_CERTIFICATE: 'INSURANCE_CERTIFICATE',
    SHIPPING_LABEL: 'SHIPPING_LABEL',
    CARTON_MARKING: 'CARTON_MARKING'
};
export const ShipmentEventSource = {
    STAFF: 'STAFF',
    PARTNER: 'PARTNER',
    FACTORY: 'FACTORY',
    SYSTEM: 'SYSTEM'
};
export const ShipmentUploadKind = {
    BILL_OF_LADING: 'BILL_OF_LADING',
    AIRWAY_BILL: 'AIRWAY_BILL',
    PROOF_OF_DELIVERY: 'PROOF_OF_DELIVERY',
    PHOTO: 'PHOTO',
    OTHER: 'OTHER'
};
export const LogisticsClaimType = {
    LOSS: 'LOSS',
    DAMAGE: 'DAMAGE',
    SHORTAGE: 'SHORTAGE',
    DELAY: 'DELAY'
};
export const LogisticsClaimStatus = {
    OPEN: 'OPEN',
    SUBMITTED: 'SUBMITTED',
    SETTLED: 'SETTLED',
    REJECTED: 'REJECTED'
};
export const OrderChargeKind = {
    SAMPLE_FEE: 'SAMPLE_FEE',
    INSPECTION_FEE: 'INSPECTION_FEE'
};
export const BankAccountStatus = {
    PENDING_REVIEW: 'PENDING_REVIEW',
    VERIFIED: 'VERIFIED',
    REJECTED: 'REJECTED',
    REPLACED: 'REPLACED'
};
export const SupplyContractStatus = {
    ACTIVE: 'ACTIVE',
    ENDED: 'ENDED',
    CANCELLED: 'CANCELLED'
};
export const InspectorApplicationStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
};
export const InspectorStatus = {
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED'
};
export const PlanTier = {
    FREE: 'FREE',
    PRO: 'PRO',
    PREMIUM: 'PREMIUM'
};
export const PlanInterval = {
    MONTH: 'MONTH',
    YEAR: 'YEAR'
};
export const SubscriptionSource = {
    STRIPE: 'STRIPE',
    MANUAL: 'MANUAL'
};
export const SubscriptionStatus = {
    INCOMPLETE: 'INCOMPLETE',
    ACTIVE: 'ACTIVE',
    PAST_DUE: 'PAST_DUE',
    CANCELED: 'CANCELED'
};
export const SubscriptionPlan = {
    PRO: 'PRO',
    PREMIUM: 'PREMIUM',
    PLUS: 'PLUS'
};
export const TextChannel = {
    SMS: 'SMS',
    WHATSAPP: 'WHATSAPP'
};
export const OutboundMessageStatus = {
    QUEUED: 'QUEUED',
    SENT: 'SENT',
    DELIVERED: 'DELIVERED',
    FAILED: 'FAILED',
    SKIPPED: 'SKIPPED'
};
export const LeadKind = {
    SALES: 'SALES',
    ENTERPRISE: 'ENTERPRISE',
    LOGISTICS_PARTNER: 'LOGISTICS_PARTNER',
    MANUFACTURER: 'MANUFACTURER',
    SUPPORT: 'SUPPORT',
    PRESS: 'PRESS'
};
export const LeadStatus = {
    NEW: 'NEW',
    CONTACTED: 'CONTACTED',
    CLOSED: 'CLOSED'
};
//# sourceMappingURL=enums.js.map