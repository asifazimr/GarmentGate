import * as runtime from "@prisma/client/runtime/client";
export const PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export const PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export const PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export const PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export const PrismaClientValidationError = runtime.PrismaClientValidationError;
export const sql = runtime.sqltag;
export const empty = runtime.empty;
export const join = runtime.join;
export const raw = runtime.raw;
export const Sql = runtime.Sql;
export const Decimal = runtime.Decimal;
export const getExtensionContext = runtime.Extensions.getExtensionContext;
export const prismaVersion = {
    client: "7.10.1",
    engine: "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8"
};
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    User: 'User',
    Session: 'Session',
    UserToken: 'UserToken',
    CodeSequence: 'CodeSequence',
    Company: 'Company',
    CompanyDocument: 'CompanyDocument',
    BuyerProfile: 'BuyerProfile',
    ManufacturerProfile: 'ManufacturerProfile',
    Category: 'Category',
    Certification: 'Certification',
    Product: 'Product',
    ProductPriceTier: 'ProductPriceTier',
    ProductImage: 'ProductImage',
    FactoryPhoto: 'FactoryPhoto',
    CapacityMonth: 'CapacityMonth',
    Rfq: 'Rfq',
    RfqInvitation: 'RfqInvitation',
    RfqAttachment: 'RfqAttachment',
    Quote: 'Quote',
    MarginRule: 'MarginRule',
    Conversation: 'Conversation',
    ConversationParticipant: 'ConversationParticipant',
    Message: 'Message',
    MessageAttachment: 'MessageAttachment',
    Order: 'Order',
    OrderItem: 'OrderItem',
    OrderMilestone: 'OrderMilestone',
    MilestonePhoto: 'MilestonePhoto',
    Sample: 'Sample',
    Payment: 'Payment',
    LedgerAccount: 'LedgerAccount',
    LedgerTransaction: 'LedgerTransaction',
    EscrowLedgerEntry: 'EscrowLedgerEntry',
    Inspection: 'Inspection',
    InspectionPhoto: 'InspectionPhoto',
    Review: 'Review',
    Dispute: 'Dispute',
    DisputeEvidence: 'DisputeEvidence',
    Notification: 'Notification',
    NotificationPreference: 'NotificationPreference',
    AuditLog: 'AuditLog',
    FileAsset: 'FileAsset',
    ImageRendition: 'ImageRendition',
    Shortlist: 'Shortlist',
    ShortlistItem: 'ShortlistItem',
    AccountWarning: 'AccountWarning',
    OrderEvent: 'OrderEvent',
    SamplePhoto: 'SamplePhoto',
    OrderRelease: 'OrderRelease',
    ExchangeRate: 'ExchangeRate',
    PlatformSetting: 'PlatformSetting',
    ProductionLine: 'ProductionLine',
    CapacitySlot: 'CapacitySlot',
    SupplierClaim: 'SupplierClaim',
    CapacityBooking: 'CapacityBooking',
    CapacityBookingAllocation: 'CapacityBookingAllocation',
    CapacityPartnership: 'CapacityPartnership',
    LogisticsPartner: 'LogisticsPartner',
    Hub: 'Hub',
    RateCard: 'RateCard',
    LogisticsMarginRule: 'LogisticsMarginRule',
    DutyRate: 'DutyRate',
    LogisticsQuote: 'LogisticsQuote',
    OrderPacking: 'OrderPacking',
    PickupRequest: 'PickupRequest',
    HubReceipt: 'HubReceipt',
    HubReceiptPhoto: 'HubReceiptPhoto',
    Consolidation: 'Consolidation',
    LogisticsShipment: 'LogisticsShipment',
    LogisticsShipmentOrder: 'LogisticsShipmentOrder',
    ShipmentLeg: 'ShipmentLeg',
    ShipmentEvent: 'ShipmentEvent',
    LogisticsDocument: 'LogisticsDocument',
    ShipmentUpload: 'ShipmentUpload',
    LogisticsClaim: 'LogisticsClaim',
    OrderCharge: 'OrderCharge',
    OrderFactoryChange: 'OrderFactoryChange',
    FactoryBankAccount: 'FactoryBankAccount',
    SupplyContract: 'SupplyContract',
    InspectorApplication: 'InspectorApplication',
    InspectorProfile: 'InspectorProfile',
    PlanSubscription: 'PlanSubscription',
    PlanInvoice: 'PlanInvoice',
    OutboundMessage: 'OutboundMessage',
    Lead: 'Lead'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const UserScalarFieldEnum = {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    logisticsPartnerId: 'logisticsPartnerId',
    status: 'status',
    locale: 'locale',
    phoneE164: 'phoneE164',
    phoneVerifiedAt: 'phoneVerifiedAt',
    pendingPhone: 'pendingPhone',
    phoneCodeHash: 'phoneCodeHash',
    phoneCodeExpiresAt: 'phoneCodeExpiresAt',
    phoneCodeAttempts: 'phoneCodeAttempts',
    textChannel: 'textChannel',
    displayCurrency: 'displayCurrency',
    firstName: 'firstName',
    lastName: 'lastName',
    emailVerifiedAt: 'emailVerifiedAt',
    lastLoginAt: 'lastLoginAt',
    suspendedReason: 'suspendedReason',
    suspendedAt: 'suspendedAt',
    companyId: 'companyId',
    companyRole: 'companyRole',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const SessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    familyId: 'familyId',
    refreshTokenHash: 'refreshTokenHash',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    replacedById: 'replacedById',
    ip: 'ip',
    userAgent: 'userAgent',
    createdAt: 'createdAt',
    lastUsedAt: 'lastUsedAt'
};
export const UserTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    usedAt: 'usedAt',
    createdAt: 'createdAt'
};
export const CodeSequenceScalarFieldEnum = {
    prefix: 'prefix',
    lastValue: 'lastValue'
};
export const CompanyScalarFieldEnum = {
    id: 'id',
    type: 'type',
    legalName: 'legalName',
    tradeName: 'tradeName',
    country: 'country',
    city: 'city',
    addressLine1: 'addressLine1',
    addressLine2: 'addressLine2',
    postalCode: 'postalCode',
    registrationNumber: 'registrationNumber',
    taxId: 'taxId',
    website: 'website',
    merchandiserId: 'merchandiserId',
    phone: 'phone',
    yearEstablished: 'yearEstablished',
    onboardingStep: 'onboardingStep',
    kycStatus: 'kycStatus',
    kycSubmittedAt: 'kycSubmittedAt',
    kycReviewedAt: 'kycReviewedAt',
    kycReviewedById: 'kycReviewedById',
    kycRejectionReason: 'kycRejectionReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const CompanyDocumentScalarFieldEnum = {
    id: 'id',
    companyId: 'companyId',
    type: 'type',
    fileId: 'fileId',
    status: 'status',
    documentNumber: 'documentNumber',
    expiresAt: 'expiresAt',
    rejectionReason: 'rejectionReason',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const BuyerProfileScalarFieldEnum = {
    id: 'id',
    companyId: 'companyId',
    publicCode: 'publicCode',
    plusActive: 'plusActive',
    businessType: 'businessType',
    annualVolumePcs: 'annualVolumePcs',
    typicalOrderQuantityPcs: 'typicalOrderQuantityPcs',
    targetMarkets: 'targetMarkets',
    sourcingNeeds: 'sourcingNeeds',
    sourcingNeedsFiltered: 'sourcingNeedsFiltered',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ManufacturerProfileScalarFieldEnum = {
    id: 'id',
    companyId: 'companyId',
    publicCode: 'publicCode',
    latitude: 'latitude',
    longitude: 'longitude',
    planTier: 'planTier',
    searchBoost: 'searchBoost',
    headline: 'headline',
    about: 'about',
    aboutFiltered: 'aboutFiltered',
    monthlyCapacityPcs: 'monthlyCapacityPcs',
    moqPcs: 'moqPcs',
    sampleLeadTimeDays: 'sampleLeadTimeDays',
    productionLeadTimeMinDays: 'productionLeadTimeMinDays',
    productionLeadTimeMaxDays: 'productionLeadTimeMaxDays',
    machinery: 'machinery',
    workforceSize: 'workforceSize',
    factorySizeSqm: 'factorySizeSqm',
    exportMarkets: 'exportMarkets',
    performanceScore: 'performanceScore',
    onTimeDeliveryBps: 'onTimeDeliveryBps',
    qcPassBps: 'qcPassBps',
    reviewCount: 'reviewCount',
    ratingAvgX100: 'ratingAvgX100',
    qualityAvgX100: 'qualityAvgX100',
    communicationAvgX100: 'communicationAvgX100',
    onTimeAvgX100: 'onTimeAvgX100',
    isListed: 'isListed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CategoryScalarFieldEnum = {
    id: 'id',
    slug: 'slug',
    name: 'name',
    parentId: 'parentId',
    sortOrder: 'sortOrder',
    createdAt: 'createdAt'
};
export const CertificationScalarFieldEnum = {
    id: 'id',
    manufacturerProfileId: 'manufacturerProfileId',
    type: 'type',
    customName: 'customName',
    certificateNumber: 'certificateNumber',
    issuedAt: 'issuedAt',
    expiresAt: 'expiresAt',
    fileId: 'fileId',
    status: 'status',
    verifiedAt: 'verifiedAt',
    rejectionReason: 'rejectionReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ProductScalarFieldEnum = {
    id: 'id',
    manufacturerProfileId: 'manufacturerProfileId',
    categoryId: 'categoryId',
    title: 'title',
    description: 'description',
    descriptionFiltered: 'descriptionFiltered',
    fabric: 'fabric',
    composition: 'composition',
    gsm: 'gsm',
    moqPcs: 'moqPcs',
    leadTimeDays: 'leadTimeDays',
    currency: 'currency',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
};
export const ProductPriceTierScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    minQty: 'minQty',
    manufacturerUnitPriceMinor: 'manufacturerUnitPriceMinor',
    buyerUnitPriceMinor: 'buyerUnitPriceMinor'
};
export const ProductImageScalarFieldEnum = {
    id: 'id',
    productId: 'productId',
    fileId: 'fileId',
    sortOrder: 'sortOrder',
    alt: 'alt',
    reviewStatus: 'reviewStatus',
    reviewNote: 'reviewNote',
    reviewedAt: 'reviewedAt'
};
export const FactoryPhotoScalarFieldEnum = {
    id: 'id',
    manufacturerProfileId: 'manufacturerProfileId',
    fileId: 'fileId',
    caption: 'caption',
    sortOrder: 'sortOrder',
    reviewStatus: 'reviewStatus',
    reviewNote: 'reviewNote',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt'
};
export const CapacityMonthScalarFieldEnum = {
    id: 'id',
    manufacturerProfileId: 'manufacturerProfileId',
    month: 'month',
    availablePcs: 'availablePcs',
    externalBookedPcs: 'externalBookedPcs',
    note: 'note',
    updatedAt: 'updatedAt'
};
export const RfqScalarFieldEnum = {
    id: 'id',
    code: 'code',
    buyerCompanyId: 'buyerCompanyId',
    createdById: 'createdById',
    categoryId: 'categoryId',
    title: 'title',
    titleFiltered: 'titleFiltered',
    description: 'description',
    descriptionFiltered: 'descriptionFiltered',
    quantity: 'quantity',
    targetUnitPriceMinor: 'targetUnitPriceMinor',
    currency: 'currency',
    deadline: 'deadline',
    requiredDeliveryDate: 'requiredDeliveryDate',
    incoterm: 'incoterm',
    destinationCountry: 'destinationCountry',
    productId: 'productId',
    capacityBookingId: 'capacityBookingId',
    status: 'status',
    publishedAt: 'publishedAt',
    headStartEndsAt: 'headStartEndsAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const RfqInvitationScalarFieldEnum = {
    id: 'id',
    rfqId: 'rfqId',
    manufacturerProfileId: 'manufacturerProfileId',
    status: 'status',
    invitedAt: 'invitedAt',
    visibleAt: 'visibleAt',
    notifiedAt: 'notifiedAt',
    respondedAt: 'respondedAt',
    declineReason: 'declineReason'
};
export const RfqAttachmentScalarFieldEnum = {
    id: 'id',
    rfqId: 'rfqId',
    fileId: 'fileId',
    kind: 'kind',
    reviewStatus: 'reviewStatus',
    reviewNote: 'reviewNote',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt'
};
export const QuoteScalarFieldEnum = {
    id: 'id',
    rfqId: 'rfqId',
    manufacturerProfileId: 'manufacturerProfileId',
    manufacturerUnitPriceMinor: 'manufacturerUnitPriceMinor',
    buyerUnitPriceMinor: 'buyerUnitPriceMinor',
    currency: 'currency',
    leadTimeDays: 'leadTimeDays',
    moqPcs: 'moqPcs',
    validUntil: 'validUntil',
    notes: 'notes',
    notesFiltered: 'notesFiltered',
    status: 'status',
    marginRuleId: 'marginRuleId',
    pricedById: 'pricedById',
    pricedAt: 'pricedAt',
    offeredAt: 'offeredAt',
    decidedAt: 'decidedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const MarginRuleScalarFieldEnum = {
    id: 'id',
    name: 'name',
    markupBps: 'markupBps',
    minMarginPerUnitMinor: 'minMarginPerUnitMinor',
    commissionBps: 'commissionBps',
    repeatCommissionBps: 'repeatCommissionBps',
    categoryId: 'categoryId',
    companyId: 'companyId',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ConversationScalarFieldEnum = {
    id: 'id',
    type: 'type',
    companyId: 'companyId',
    subject: 'subject',
    rfqId: 'rfqId',
    orderId: 'orderId',
    disputeId: 'disputeId',
    lastMessageAt: 'lastMessageAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ConversationParticipantScalarFieldEnum = {
    conversationId: 'conversationId',
    userId: 'userId',
    joinedAt: 'joinedAt',
    lastReadAt: 'lastReadAt'
};
export const MessageScalarFieldEnum = {
    id: 'id',
    conversationId: 'conversationId',
    senderId: 'senderId',
    originalContent: 'originalContent',
    filteredContent: 'filteredContent',
    relayedFromId: 'relayedFromId',
    flagged: 'flagged',
    flagReasons: 'flagReasons',
    moderationStatus: 'moderationStatus',
    editedAt: 'editedAt',
    createdAt: 'createdAt'
};
export const MessageAttachmentScalarFieldEnum = {
    id: 'id',
    messageId: 'messageId',
    fileId: 'fileId',
    displayName: 'displayName',
    flagged: 'flagged',
    flagReasons: 'flagReasons',
    scannedAt: 'scannedAt'
};
export const OrderScalarFieldEnum = {
    id: 'id',
    code: 'code',
    buyerCompanyId: 'buyerCompanyId',
    manufacturerProfileId: 'manufacturerProfileId',
    rfqId: 'rfqId',
    quoteId: 'quoteId',
    hsCode: 'hsCode',
    title: 'title',
    specification: 'specification',
    quantity: 'quantity',
    buyerUnitPriceMinor: 'buyerUnitPriceMinor',
    manufacturerUnitPriceMinor: 'manufacturerUnitPriceMinor',
    buyerTotalMinor: 'buyerTotalMinor',
    manufacturerTotalMinor: 'manufacturerTotalMinor',
    currency: 'currency',
    incoterm: 'incoterm',
    destinationCountry: 'destinationCountry',
    destinationPort: 'destinationPort',
    depositBps: 'depositBps',
    requestedShipDate: 'requestedShipDate',
    status: 'status',
    disputedFrom: 'disputedFrom',
    reorderOfId: 'reorderOfId',
    commissionBps: 'commissionBps',
    commissionMinor: 'commissionMinor',
    repeatOrder: 'repeatOrder',
    confirmedAt: 'confirmedAt',
    completedAt: 'completedAt',
    cancelledAt: 'cancelledAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sampleCreditMinor: 'sampleCreditMinor',
    contractId: 'contractId',
    delayAlertedAt: 'delayAlertedAt'
};
export const OrderItemScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    color: 'color',
    size: 'size',
    quantity: 'quantity',
    sku: 'sku'
};
export const OrderMilestoneScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    stage: 'stage',
    status: 'status',
    plannedAt: 'plannedAt',
    completedAt: 'completedAt',
    note: 'note',
    noteFiltered: 'noteFiltered',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const MilestonePhotoScalarFieldEnum = {
    id: 'id',
    milestoneId: 'milestoneId',
    fileId: 'fileId',
    takenAt: 'takenAt',
    caption: 'caption',
    reviewStatus: 'reviewStatus',
    reviewNote: 'reviewNote',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt'
};
export const SampleScalarFieldEnum = {
    id: 'id',
    round: 'round',
    requestNotes: 'requestNotes',
    requestNotesFiltered: 'requestNotesFiltered',
    rfqId: 'rfqId',
    orderId: 'orderId',
    type: 'type',
    status: 'status',
    quantity: 'quantity',
    buyerFeeMinor: 'buyerFeeMinor',
    currency: 'currency',
    courier: 'courier',
    trackingNumber: 'trackingNumber',
    shippedAt: 'shippedAt',
    receivedAt: 'receivedAt',
    buyerFeedback: 'buyerFeedback',
    buyerFeedbackFiltered: 'buyerFeedbackFiltered',
    decidedAt: 'decidedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PaymentScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    capacityBookingId: 'capacityBookingId',
    logisticsShipmentId: 'logisticsShipmentId',
    reference: 'reference',
    payerReference: 'payerReference',
    proofFileId: 'proofFileId',
    confirmedById: 'confirmedById',
    unitsPerUsd: 'unitsPerUsd',
    amountUsdMinor: 'amountUsdMinor',
    settlementCurrency: 'settlementCurrency',
    settlementAmountMinor: 'settlementAmountMinor',
    releaseId: 'releaseId',
    factoryBankAccountId: 'factoryBankAccountId',
    direction: 'direction',
    purpose: 'purpose',
    amountMinor: 'amountMinor',
    currency: 'currency',
    method: 'method',
    provider: 'provider',
    providerRef: 'providerRef',
    status: 'status',
    paidAt: 'paidAt',
    failureReason: 'failureReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const LedgerAccountScalarFieldEnum = {
    id: 'id',
    type: 'type',
    companyId: 'companyId',
    currency: 'currency',
    createdAt: 'createdAt',
    logisticsPartnerId: 'logisticsPartnerId'
};
export const LedgerTransactionScalarFieldEnum = {
    id: 'id',
    kind: 'kind',
    orderId: 'orderId',
    capacityBookingId: 'capacityBookingId',
    paymentId: 'paymentId',
    currency: 'currency',
    description: 'description',
    idempotencyKey: 'idempotencyKey',
    postedAt: 'postedAt',
    unitsPerUsd: 'unitsPerUsd',
    amountUsdMinor: 'amountUsdMinor'
};
export const EscrowLedgerEntryScalarFieldEnum = {
    id: 'id',
    transactionId: 'transactionId',
    accountId: 'accountId',
    direction: 'direction',
    amountMinor: 'amountMinor',
    createdAt: 'createdAt'
};
export const InspectionScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    type: 'type',
    agency: 'agency',
    scheduledAt: 'scheduledAt',
    inspectedAt: 'inspectedAt',
    bookedById: 'bookedById',
    inspectorId: 'inspectorId',
    assignedAt: 'assignedAt',
    checkedInAt: 'checkedInAt',
    checkInDistanceM: 'checkInDistanceM',
    payUsdMinor: 'payUsdMinor',
    earnedAt: 'earnedAt',
    paidAt: 'paidAt',
    payoutReference: 'payoutReference',
    rating: 'rating',
    auditRequested: 'auditRequested',
    lotSize: 'lotSize',
    aqlLevel: 'aqlLevel',
    aqlMajor: 'aqlMajor',
    aqlMinor: 'aqlMinor',
    sampleSize: 'sampleSize',
    criticalDefects: 'criticalDefects',
    majorDefects: 'majorDefects',
    minorDefects: 'minorDefects',
    result: 'result',
    summary: 'summary',
    reportFileId: 'reportFileId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const InspectionPhotoScalarFieldEnum = {
    id: 'id',
    inspectionId: 'inspectionId',
    fileId: 'fileId',
    caption: 'caption',
    reviewStatus: 'reviewStatus',
    reviewNote: 'reviewNote',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt'
};
export const ReviewScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    authorCompanyId: 'authorCompanyId',
    subjectCompanyId: 'subjectCompanyId',
    direction: 'direction',
    manufacturerProfileId: 'manufacturerProfileId',
    rating: 'rating',
    qualityRating: 'qualityRating',
    communicationRating: 'communicationRating',
    deliveryRating: 'deliveryRating',
    comment: 'comment',
    commentFiltered: 'commentFiltered',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const DisputeScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    openedById: 'openedById',
    assignedToId: 'assignedToId',
    reason: 'reason',
    description: 'description',
    descriptionFiltered: 'descriptionFiltered',
    status: 'status',
    resolution: 'resolution',
    refundAmountMinor: 'refundAmountMinor',
    resolvedAt: 'resolvedAt',
    resolvedById: 'resolvedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const DisputeEvidenceScalarFieldEnum = {
    id: 'id',
    disputeId: 'disputeId',
    fileId: 'fileId',
    note: 'note',
    submittedBy: 'submittedBy',
    uploadedById: 'uploadedById',
    reviewStatus: 'reviewStatus',
    reviewNote: 'reviewNote',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt'
};
export const NotificationScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    type: 'type',
    title: 'title',
    body: 'body',
    data: 'data',
    readAt: 'readAt',
    createdAt: 'createdAt'
};
export const NotificationPreferenceScalarFieldEnum = {
    userId: 'userId',
    category: 'category',
    inApp: 'inApp',
    email: 'email',
    text: 'text'
};
export const AuditLogScalarFieldEnum = {
    id: 'id',
    actorUserId: 'actorUserId',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    metadata: 'metadata',
    ip: 'ip',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
};
export const FileAssetScalarFieldEnum = {
    id: 'id',
    bucket: 'bucket',
    storageKey: 'storageKey',
    sanitizedKey: 'sanitizedKey',
    originalFilename: 'originalFilename',
    mimeType: 'mimeType',
    sizeBytes: 'sizeBytes',
    checksumSha256: 'checksumSha256',
    purpose: 'purpose',
    status: 'status',
    scanStatus: 'scanStatus',
    uploadedById: 'uploadedById',
    ownerCompanyId: 'ownerCompanyId',
    uploadedAt: 'uploadedAt',
    processingStatus: 'processingStatus',
    processingError: 'processingError',
    processedAt: 'processedAt',
    width: 'width',
    height: 'height',
    createdAt: 'createdAt'
};
export const ImageRenditionScalarFieldEnum = {
    id: 'id',
    fileId: 'fileId',
    width: 'width',
    height: 'height',
    storageKey: 'storageKey',
    sizeBytes: 'sizeBytes',
    format: 'format',
    createdAt: 'createdAt'
};
export const ShortlistScalarFieldEnum = {
    id: 'id',
    companyId: 'companyId',
    name: 'name',
    isDefault: 'isDefault',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ShortlistItemScalarFieldEnum = {
    id: 'id',
    shortlistId: 'shortlistId',
    productId: 'productId',
    manufacturerProfileId: 'manufacturerProfileId',
    note: 'note',
    createdAt: 'createdAt'
};
export const AccountWarningScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    level: 'level',
    violations: 'violations',
    issuedById: 'issuedById',
    note: 'note',
    createdAt: 'createdAt',
    acknowledgedAt: 'acknowledgedAt'
};
export const OrderEventScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    fromStatus: 'fromStatus',
    toStatus: 'toStatus',
    actorUserId: 'actorUserId',
    note: 'note',
    createdAt: 'createdAt'
};
export const SamplePhotoScalarFieldEnum = {
    id: 'id',
    sampleId: 'sampleId',
    fileId: 'fileId',
    reviewStatus: 'reviewStatus',
    reviewNote: 'reviewNote',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt'
};
export const OrderReleaseScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    trigger: 'trigger',
    bps: 'bps',
    currency: 'currency',
    buyerMinor: 'buyerMinor',
    manufacturerMinor: 'manufacturerMinor',
    commissionMinor: 'commissionMinor',
    status: 'status',
    dueAt: 'dueAt',
    releasedAt: 'releasedAt',
    approvedById: 'approvedById',
    paidAt: 'paidAt',
    supersededAt: 'supersededAt',
    manufacturerProfileId: 'manufacturerProfileId',
    createdAt: 'createdAt'
};
export const ExchangeRateScalarFieldEnum = {
    currency: 'currency',
    unitsPerUsd: 'unitsPerUsd',
    updatedAt: 'updatedAt',
    updatedById: 'updatedById'
};
export const PlatformSettingScalarFieldEnum = {
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
};
export const ProductionLineScalarFieldEnum = {
    id: 'id',
    manufacturerProfileId: 'manufacturerProfileId',
    code: 'code',
    name: 'name',
    dailySamMinutes: 'dailySamMinutes',
    workingDays: 'workingDays',
    cmRateMinorPer100Min: 'cmRateMinorPer100Min',
    currency: 'currency',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CapacitySlotScalarFieldEnum = {
    id: 'id',
    lineId: 'lineId',
    startDate: 'startDate',
    endDate: 'endDate',
    totalMinutes: 'totalMinutes',
    bookedMinutes: 'bookedMinutes',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SupplierClaimScalarFieldEnum = {
    id: 'id',
    manufacturerProfileId: 'manufacturerProfileId',
    region: 'region',
    tier: 'tier',
    brandNames: 'brandNames',
    evidenceFileId: 'evidenceFileId',
    note: 'note',
    status: 'status',
    reviewNote: 'reviewNote',
    reviewedAt: 'reviewedAt',
    reviewedById: 'reviewedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CapacityBookingScalarFieldEnum = {
    id: 'id',
    code: 'code',
    kind: 'kind',
    status: 'status',
    buyerCompanyId: 'buyerCompanyId',
    createdById: 'createdById',
    manufacturerProfileId: 'manufacturerProfileId',
    lineId: 'lineId',
    categoryId: 'categoryId',
    partnershipId: 'partnershipId',
    minutes: 'minutes',
    returnedMinutes: 'returnedMinutes',
    samPerPieceCenti: 'samPerPieceCenti',
    startDate: 'startDate',
    endDate: 'endDate',
    currency: 'currency',
    factoryRateMinorPer100Min: 'factoryRateMinorPer100Min',
    buyerRateMinorPer100Min: 'buyerRateMinorPer100Min',
    factoryAmountMinor: 'factoryAmountMinor',
    buyerAmountMinor: 'buyerAmountMinor',
    feeBps: 'feeBps',
    depositBps: 'depositBps',
    depositMinor: 'depositMinor',
    cancellationTiers: 'cancellationTiers',
    factoryShareBps: 'factoryShareBps',
    note: 'note',
    noteFiltered: 'noteFiltered',
    holdExpiresAt: 'holdExpiresAt',
    reminderSentAt: 'reminderSentAt',
    factoryAcceptedAt: 'factoryAcceptedAt',
    depositPaidAt: 'depositPaidAt',
    confirmedAt: 'confirmedAt',
    cancelledAt: 'cancelledAt',
    cancelledBy: 'cancelledBy',
    cancelReason: 'cancelReason',
    refundMinor: 'refundMinor',
    factoryCompensationMinor: 'factoryCompensationMinor',
    compensationPaidAt: 'compensationPaidAt',
    conversionMode: 'conversionMode',
    convertedAt: 'convertedAt',
    orderId: 'orderId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CapacityBookingAllocationScalarFieldEnum = {
    id: 'id',
    bookingId: 'bookingId',
    slotId: 'slotId',
    minutes: 'minutes'
};
export const CapacityPartnershipScalarFieldEnum = {
    id: 'id',
    code: 'code',
    status: 'status',
    buyerCompanyId: 'buyerCompanyId',
    createdById: 'createdById',
    manufacturerProfileId: 'manufacturerProfileId',
    lineId: 'lineId',
    categoryId: 'categoryId',
    monthlyMinutes: 'monthlyMinutes',
    months: 'months',
    startMonth: 'startMonth',
    samPerPieceCenti: 'samPerPieceCenti',
    currency: 'currency',
    factoryRateMinorPer100Min: 'factoryRateMinorPer100Min',
    buyerRateMinorPer100Min: 'buyerRateMinorPer100Min',
    note: 'note',
    noteFiltered: 'noteFiltered',
    declineReason: 'declineReason',
    acceptedAt: 'acceptedAt',
    cancelledAt: 'cancelledAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const LogisticsPartnerScalarFieldEnum = {
    id: 'id',
    code: 'code',
    name: 'name',
    kind: 'kind',
    country: 'country',
    contactEmail: 'contactEmail',
    contactPhone: 'contactPhone',
    notes: 'notes',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const HubScalarFieldEnum = {
    id: 'id',
    code: 'code',
    name: 'name',
    operator: 'operator',
    partnerId: 'partnerId',
    country: 'country',
    city: 'city',
    addressLine1: 'addressLine1',
    addressLine2: 'addressLine2',
    postalCode: 'postalCode',
    port: 'port',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const RateCardScalarFieldEnum = {
    id: 'id',
    partnerId: 'partnerId',
    mode: 'mode',
    originCountry: 'originCountry',
    originPort: 'originPort',
    destinationCountry: 'destinationCountry',
    destinationPort: 'destinationPort',
    unit: 'unit',
    containerType: 'containerType',
    costMinor: 'costMinor',
    minChargeMinor: 'minChargeMinor',
    currency: 'currency',
    transitDaysMin: 'transitDaysMin',
    transitDaysMax: 'transitDaysMax',
    validFrom: 'validFrom',
    validTo: 'validTo',
    active: 'active',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const LogisticsMarginRuleScalarFieldEnum = {
    id: 'id',
    name: 'name',
    mode: 'mode',
    originCountry: 'originCountry',
    destinationCountry: 'destinationCountry',
    markupBps: 'markupBps',
    minMarginMinor: 'minMarginMinor',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const DutyRateScalarFieldEnum = {
    id: 'id',
    hsPrefix: 'hsPrefix',
    destinationCountry: 'destinationCountry',
    rateBps: 'rateBps',
    note: 'note',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const LogisticsQuoteScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    status: 'status',
    mode: 'mode',
    incoterm: 'incoterm',
    originCountry: 'originCountry',
    destinationCountry: 'destinationCountry',
    destinationPort: 'destinationPort',
    insured: 'insured',
    weightGrams: 'weightGrams',
    volumeLitres: 'volumeLitres',
    cargoEstimated: 'cargoEstimated',
    provider: 'provider',
    rateCardId: 'rateCardId',
    partnerId: 'partnerId',
    marginRuleName: 'marginRuleName',
    currency: 'currency',
    partnerCostMinor: 'partnerCostMinor',
    freightMinor: 'freightMinor',
    insuranceMinor: 'insuranceMinor',
    dutyEstimateMinor: 'dutyEstimateMinor',
    totalMinor: 'totalMinor',
    transitDaysMin: 'transitDaysMin',
    transitDaysMax: 'transitDaysMax',
    validUntil: 'validUntil',
    acceptedAt: 'acceptedAt',
    createdAt: 'createdAt',
    consolidationId: 'consolidationId',
    forwarderName: 'forwarderName',
    forwarderContact: 'forwarderContact',
    forwarderReference: 'forwarderReference'
};
export const OrderPackingScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    cartons: 'cartons',
    piecesPerCarton: 'piecesPerCarton',
    grossWeightGrams: 'grossWeightGrams',
    netWeightGrams: 'netWeightGrams',
    volumeLitres: 'volumeLitres',
    cartonLengthCm: 'cartonLengthCm',
    cartonWidthCm: 'cartonWidthCm',
    cartonHeightCm: 'cartonHeightCm',
    updatedById: 'updatedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PickupRequestScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    hubId: 'hubId',
    pickupDate: 'pickupDate',
    status: 'status',
    partnerId: 'partnerId',
    note: 'note',
    noteFiltered: 'noteFiltered',
    scheduledAt: 'scheduledAt',
    collectedAt: 'collectedAt',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const HubReceiptScalarFieldEnum = {
    id: 'id',
    hubId: 'hubId',
    orderId: 'orderId',
    pickupId: 'pickupId',
    receivedById: 'receivedById',
    receivedAt: 'receivedAt',
    cartonsExpected: 'cartonsExpected',
    cartonsReceived: 'cartonsReceived',
    grossWeightGrams: 'grossWeightGrams',
    condition: 'condition',
    repacked: 'repacked',
    relabelled: 'relabelled',
    notes: 'notes'
};
export const HubReceiptPhotoScalarFieldEnum = {
    id: 'id',
    receiptId: 'receiptId',
    fileId: 'fileId',
    createdAt: 'createdAt'
};
export const ConsolidationScalarFieldEnum = {
    id: 'id',
    code: 'code',
    buyerCompanyId: 'buyerCompanyId',
    mode: 'mode',
    destinationCountry: 'destinationCountry',
    currency: 'currency',
    separateTotalMinor: 'separateTotalMinor',
    combinedTotalMinor: 'combinedTotalMinor',
    createdAt: 'createdAt'
};
export const LogisticsShipmentScalarFieldEnum = {
    id: 'id',
    code: 'code',
    buyerCompanyId: 'buyerCompanyId',
    mode: 'mode',
    incoterm: 'incoterm',
    status: 'status',
    shipperMode: 'shipperMode',
    originHubId: 'originHubId',
    originCountry: 'originCountry',
    destinationCountry: 'destinationCountry',
    destinationPort: 'destinationPort',
    consolidationId: 'consolidationId',
    currency: 'currency',
    buyerPriceMinor: 'buyerPriceMinor',
    partnerCostMinor: 'partnerCostMinor',
    insuranceMinor: 'insuranceMinor',
    cartons: 'cartons',
    grossWeightGrams: 'grossWeightGrams',
    volumeLitres: 'volumeLitres',
    etd: 'etd',
    eta: 'eta',
    departedAt: 'departedAt',
    deliveredAt: 'deliveredAt',
    historical: 'historical',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const LogisticsShipmentOrderScalarFieldEnum = {
    shipmentId: 'shipmentId',
    orderId: 'orderId',
    active: 'active',
    cartons: 'cartons',
    grossWeightGrams: 'grossWeightGrams',
    volumeLitres: 'volumeLitres',
    buyerShareMinor: 'buyerShareMinor',
    costShareMinor: 'costShareMinor'
};
export const ShipmentLegScalarFieldEnum = {
    id: 'id',
    shipmentId: 'shipmentId',
    sequence: 'sequence',
    kind: 'kind',
    status: 'status',
    partnerId: 'partnerId',
    fromLabel: 'fromLabel',
    toLabel: 'toLabel',
    carrier: 'carrier',
    trackingNumber: 'trackingNumber',
    containerNumber: 'containerNumber',
    transportDocNo: 'transportDocNo',
    costMinor: 'costMinor',
    etd: 'etd',
    eta: 'eta',
    departedAt: 'departedAt',
    arrivedAt: 'arrivedAt',
    acceptedAt: 'acceptedAt',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const ShipmentEventScalarFieldEnum = {
    id: 'id',
    shipmentId: 'shipmentId',
    legId: 'legId',
    status: 'status',
    source: 'source',
    location: 'location',
    publicNote: 'publicNote',
    internalNote: 'internalNote',
    occurredAt: 'occurredAt',
    createdById: 'createdById',
    createdAt: 'createdAt'
};
export const LogisticsDocumentScalarFieldEnum = {
    id: 'id',
    shipmentId: 'shipmentId',
    type: 'type',
    number: 'number',
    issuedById: 'issuedById',
    createdAt: 'createdAt'
};
export const ShipmentUploadScalarFieldEnum = {
    id: 'id',
    shipmentId: 'shipmentId',
    legId: 'legId',
    fileId: 'fileId',
    kind: 'kind',
    uploadedById: 'uploadedById',
    buyerVisible: 'buyerVisible',
    publishedAt: 'publishedAt',
    publishedById: 'publishedById',
    createdAt: 'createdAt'
};
export const LogisticsClaimScalarFieldEnum = {
    id: 'id',
    code: 'code',
    shipmentId: 'shipmentId',
    orderId: 'orderId',
    disputeId: 'disputeId',
    legId: 'legId',
    type: 'type',
    status: 'status',
    description: 'description',
    publicNote: 'publicNote',
    currency: 'currency',
    claimedMinor: 'claimedMinor',
    insuredValueMinor: 'insuredValueMinor',
    insurerReference: 'insurerReference',
    compensationMinor: 'compensationMinor',
    insurerRecoveryMinor: 'insurerRecoveryMinor',
    partnerChargebackMinor: 'partnerChargebackMinor',
    resolution: 'resolution',
    createdById: 'createdById',
    settledById: 'settledById',
    settledAt: 'settledAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const OrderChargeScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    kind: 'kind',
    amountMinor: 'amountMinor',
    currency: 'currency',
    waived: 'waived',
    sampleId: 'sampleId',
    inspectionId: 'inspectionId',
    createdAt: 'createdAt'
};
export const OrderFactoryChangeScalarFieldEnum = {
    id: 'id',
    orderId: 'orderId',
    fromProfileId: 'fromProfileId',
    toProfileId: 'toProfileId',
    fromUnitPriceMinor: 'fromUnitPriceMinor',
    toUnitPriceMinor: 'toUnitPriceMinor',
    fundedMinor: 'fundedMinor',
    reason: 'reason',
    createdById: 'createdById',
    createdAt: 'createdAt'
};
export const FactoryBankAccountScalarFieldEnum = {
    id: 'id',
    companyId: 'companyId',
    holderName: 'holderName',
    bankName: 'bankName',
    bankCountry: 'bankCountry',
    accountNumber: 'accountNumber',
    swiftBic: 'swiftBic',
    routingCode: 'routingCode',
    branch: 'branch',
    currency: 'currency',
    status: 'status',
    reviewNote: 'reviewNote',
    submittedById: 'submittedById',
    reviewedById: 'reviewedById',
    reviewedAt: 'reviewedAt',
    createdAt: 'createdAt'
};
export const SupplyContractScalarFieldEnum = {
    id: 'id',
    code: 'code',
    buyerCompanyId: 'buyerCompanyId',
    manufacturerProfileId: 'manufacturerProfileId',
    title: 'title',
    specification: 'specification',
    currency: 'currency',
    buyerUnitPriceMinor: 'buyerUnitPriceMinor',
    manufacturerUnitPriceMinor: 'manufacturerUnitPriceMinor',
    contractedQuantity: 'contractedQuantity',
    calledOffQuantity: 'calledOffQuantity',
    minCallOffQuantity: 'minCallOffQuantity',
    depositBps: 'depositBps',
    incoterm: 'incoterm',
    destinationCountry: 'destinationCountry',
    leadTimeDays: 'leadTimeDays',
    startsOn: 'startsOn',
    endsOn: 'endsOn',
    status: 'status',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const InspectorApplicationScalarFieldEnum = {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    phone: 'phone',
    country: 'country',
    city: 'city',
    experienceYears: 'experienceYears',
    inspectionTypes: 'inspectionTypes',
    about: 'about',
    status: 'status',
    reviewNote: 'reviewNote',
    reviewedById: 'reviewedById',
    reviewedAt: 'reviewedAt',
    userId: 'userId',
    createdAt: 'createdAt'
};
export const InspectorProfileScalarFieldEnum = {
    userId: 'userId',
    status: 'status',
    country: 'country',
    city: 'city',
    latitude: 'latitude',
    longitude: 'longitude',
    serviceRadiusKm: 'serviceRadiusKm',
    inspectionTypes: 'inspectionTypes',
    dayRateUsdMinor: 'dayRateUsdMinor',
    certifiedAt: 'certifiedAt',
    ratingSum: 'ratingSum',
    ratingCount: 'ratingCount',
    payoutMethod: 'payoutMethod',
    payoutName: 'payoutName',
    payoutAccount: 'payoutAccount',
    payoutVerifiedAt: 'payoutVerifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PlanSubscriptionScalarFieldEnum = {
    id: 'id',
    manufacturerProfileId: 'manufacturerProfileId',
    buyerCompanyId: 'buyerCompanyId',
    tier: 'tier',
    interval: 'interval',
    source: 'source',
    status: 'status',
    amountUsdMinor: 'amountUsdMinor',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    stripeCheckoutSessionId: 'stripeCheckoutSessionId',
    currentPeriodEnd: 'currentPeriodEnd',
    cancelAtPeriodEnd: 'cancelAtPeriodEnd',
    note: 'note',
    bankReference: 'bankReference',
    createdById: 'createdById',
    canceledAt: 'canceledAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const PlanInvoiceScalarFieldEnum = {
    id: 'id',
    subscriptionId: 'subscriptionId',
    stripeInvoiceId: 'stripeInvoiceId',
    amountMinor: 'amountMinor',
    currency: 'currency',
    paidAt: 'paidAt',
    periodEnd: 'periodEnd',
    createdAt: 'createdAt'
};
export const OutboundMessageScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    channel: 'channel',
    to: 'to',
    type: 'type',
    body: 'body',
    status: 'status',
    error: 'error',
    providerRef: 'providerRef',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const LeadScalarFieldEnum = {
    id: 'id',
    kind: 'kind',
    status: 'status',
    name: 'name',
    email: 'email',
    company: 'company',
    country: 'country',
    phone: 'phone',
    message: 'message',
    source: 'source',
    handledById: 'handledById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const NullableJsonNullValueInput = {
    DbNull: DbNull,
    JsonNull: JsonNull
};
export const JsonNullValueInput = {
    JsonNull: JsonNull
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
export const JsonNullValueFilter = {
    DbNull: DbNull,
    JsonNull: JsonNull,
    AnyNull: AnyNull
};
export const defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map