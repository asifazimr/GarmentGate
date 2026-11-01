-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BUYER', 'MANUFACTURER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DEACTIVATED');

-- CreateEnum
CREATE TYPE "CompanyRole" AS ENUM ('OWNER', 'MEMBER');

-- CreateEnum
CREATE TYPE "UserTokenType" AS ENUM ('EMAIL_VERIFICATION', 'PASSWORD_RESET');

-- CreateEnum
CREATE TYPE "CompanyType" AS ENUM ('BUYER', 'MANUFACTURER');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('NOT_SUBMITTED', 'PENDING_REVIEW', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "OnboardingStep" AS ENUM ('COMPANY_INFO', 'PROFILE', 'DOCUMENTS', 'SUBMITTED');

-- CreateEnum
CREATE TYPE "BuyerBusinessType" AS ENUM ('BRAND', 'RETAILER', 'IMPORTER', 'WHOLESALER', 'SOURCING_AGENT', 'OTHER');

-- CreateEnum
CREATE TYPE "CompanyDocumentType" AS ENUM ('BUSINESS_LICENSE', 'EXPORT_REGISTRATION', 'TAX_CERTIFICATE', 'BANK_LETTER', 'ID_PROOF', 'OTHER');

-- CreateEnum
CREATE TYPE "ReviewState" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CertificationType" AS ENUM ('BSCI_AMFORI', 'WRAP', 'SEDEX_SMETA', 'OEKO_TEX_100', 'GOTS', 'GRS', 'BCI', 'ISO_9001', 'ISO_14001', 'SA8000', 'FAIR_TRADE', 'HIGG_FEM', 'OTHER');

-- CreateEnum
CREATE TYPE "CertificationStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'BDT', 'INR', 'VND', 'TRY', 'PKR', 'CNY');

-- CreateEnum
CREATE TYPE "Incoterm" AS ENUM ('EXW', 'FCA', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "RfqStatus" AS ENUM ('DRAFT', 'OPEN', 'CLOSED', 'AWARDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "RfqInvitationStatus" AS ENUM ('INVITED', 'VIEWED', 'DECLINED', 'QUOTED');

-- CreateEnum
CREATE TYPE "RfqAttachmentKind" AS ENUM ('TECH_PACK', 'REFERENCE_IMAGE', 'SIZE_CHART', 'OTHER');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'OFFERED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ConversationType" AS ENUM ('BUYER_PLATFORM', 'MANUFACTURER_PLATFORM', 'SUPPORT');

-- CreateEnum
CREATE TYPE "ContactFlag" AS ENUM ('EMAIL', 'PHONE', 'URL', 'SOCIAL_HANDLE', 'OBFUSCATED_CONTACT', 'OTHER');

-- CreateEnum
CREATE TYPE "ModerationStatus" AS ENUM ('CLEAN', 'FLAGGED', 'REVIEWED_OK', 'REVIEWED_BLOCKED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING_DEPOSIT', 'CONFIRMED', 'IN_PRODUCTION', 'QUALITY_CHECK', 'READY_TO_SHIP', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "MilestoneStage" AS ENUM ('ORDER_CONFIRMED', 'FABRIC_SOURCING', 'CUTTING', 'SEWING', 'FINISHING', 'PACKING', 'READY_FOR_INSPECTION', 'SHIPPED');

-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELAYED');

-- CreateEnum
CREATE TYPE "SampleType" AS ENUM ('PROTO', 'FIT', 'SIZE_SET', 'PRE_PRODUCTION', 'TOP', 'SHIPMENT');

-- CreateEnum
CREATE TYPE "SampleStatus" AS ENUM ('REQUESTED', 'IN_PROGRESS', 'SHIPPED', 'RECEIVED', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PaymentDirection" AS ENUM ('INBOUND', 'OUTBOUND');

-- CreateEnum
CREATE TYPE "PaymentPurpose" AS ENUM ('DEPOSIT', 'BALANCE', 'SAMPLE_FEE', 'PAYOUT', 'REFUND');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BANK_TRANSFER', 'CARD', 'LETTER_OF_CREDIT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'SUCCEEDED', 'FAILED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "LedgerAccountType" AS ENUM ('PLATFORM_CASH', 'BUYER_ESCROW', 'MANUFACTURER_PAYABLE', 'PLATFORM_REVENUE');

-- CreateEnum
CREATE TYPE "LedgerTransactionKind" AS ENUM ('DEPOSIT', 'HOLD', 'RELEASE', 'REFUND', 'COMMISSION', 'PAYOUT');

-- CreateEnum
CREATE TYPE "EntryDirection" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "InspectionType" AS ENUM ('PRE_PRODUCTION', 'DURING_PRODUCTION', 'PRE_SHIPMENT', 'CONTAINER_LOADING');

-- CreateEnum
CREATE TYPE "InspectionResult" AS ENUM ('PENDING', 'PASS', 'FAIL', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "ShipmentMode" AS ENUM ('SEA', 'AIR', 'ROAD', 'RAIL', 'COURIER');

-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('PENDING', 'BOOKED', 'IN_TRANSIT', 'AT_PORT', 'CUSTOMS', 'DELIVERED', 'EXCEPTION');

-- CreateEnum
CREATE TYPE "ShipmentDocumentType" AS ENUM ('COMMERCIAL_INVOICE', 'PACKING_LIST', 'BILL_OF_LADING', 'AIRWAY_BILL', 'CERTIFICATE_OF_ORIGIN', 'INSPECTION_CERTIFICATE', 'OTHER');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING_MODERATION', 'PUBLISHED', 'HIDDEN');

-- CreateEnum
CREATE TYPE "DisputeReason" AS ENUM ('QUALITY', 'QUANTITY', 'LATE_DELIVERY', 'NOT_AS_DESCRIBED', 'PAYMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "DisputeStatus" AS ENUM ('OPEN', 'UNDER_REVIEW', 'RESOLVED_FOR_BUYER', 'RESOLVED_FOR_MANUFACTURER', 'SETTLED', 'CLOSED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('EMAIL_VERIFIED', 'KYC_SUBMITTED', 'KYC_APPROVED', 'KYC_REJECTED', 'RFQ_INVITATION', 'QUOTE_RECEIVED', 'QUOTE_OFFERED', 'ORDER_UPDATE', 'MESSAGE_RECEIVED', 'PAYMENT_UPDATE', 'DISPUTE_UPDATE', 'SYSTEM');

-- CreateEnum
CREATE TYPE "FilePurpose" AS ENUM ('KYC_DOCUMENT', 'CERTIFICATION', 'PRODUCT_IMAGE', 'TECH_PACK', 'MESSAGE_ATTACHMENT', 'MILESTONE_PHOTO', 'INSPECTION_REPORT', 'SHIPMENT_DOCUMENT', 'DISPUTE_EVIDENCE', 'AVATAR', 'OTHER');

-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('PENDING_UPLOAD', 'UPLOADED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ScanStatus" AS ENUM ('PENDING', 'CLEAN', 'INFECTED');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "locale" TEXT NOT NULL DEFAULT 'en',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "companyId" UUID,
    "companyRole" "CompanyRole",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "familyId" UUID NOT NULL,
    "refreshTokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "replacedById" UUID,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_tokens" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" "UserTokenType" NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "code_sequences" (
    "prefix" TEXT NOT NULL,
    "lastValue" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "code_sequences_pkey" PRIMARY KEY ("prefix")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" UUID NOT NULL,
    "type" "CompanyType" NOT NULL,
    "legalName" TEXT NOT NULL,
    "tradeName" TEXT,
    "country" CHAR(2) NOT NULL,
    "city" TEXT,
    "addressLine1" TEXT,
    "addressLine2" TEXT,
    "postalCode" TEXT,
    "registrationNumber" TEXT,
    "taxId" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "yearEstablished" INTEGER,
    "onboardingStep" "OnboardingStep" NOT NULL DEFAULT 'PROFILE',
    "kycStatus" "KycStatus" NOT NULL DEFAULT 'NOT_SUBMITTED',
    "kycSubmittedAt" TIMESTAMP(3),
    "kycReviewedAt" TIMESTAMP(3),
    "kycReviewedById" UUID,
    "kycRejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_documents" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "type" "CompanyDocumentType" NOT NULL,
    "fileId" UUID NOT NULL,
    "status" "ReviewState" NOT NULL DEFAULT 'PENDING',
    "documentNumber" TEXT,
    "expiresAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buyer_profiles" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "publicCode" TEXT NOT NULL,
    "businessType" "BuyerBusinessType",
    "annualVolumePcs" INTEGER,
    "typicalOrderQuantityPcs" INTEGER,
    "targetMarkets" TEXT[],
    "sourcingNeeds" TEXT,
    "sourcingNeedsFiltered" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buyer_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufacturer_profiles" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "publicCode" TEXT NOT NULL,
    "headline" TEXT,
    "about" TEXT,
    "aboutFiltered" TEXT,
    "monthlyCapacityPcs" INTEGER,
    "moqPcs" INTEGER,
    "sampleLeadTimeDays" INTEGER,
    "productionLeadTimeMinDays" INTEGER,
    "productionLeadTimeMaxDays" INTEGER,
    "machinery" JSONB,
    "workforceSize" INTEGER,
    "factorySizeSqm" INTEGER,
    "exportMarkets" TEXT[],
    "performanceScore" INTEGER NOT NULL DEFAULT 0,
    "onTimeDeliveryBps" INTEGER,
    "isListed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "manufacturer_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" UUID,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certifications" (
    "id" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "type" "CertificationType" NOT NULL,
    "customName" TEXT,
    "certificateNumber" TEXT,
    "issuedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "fileId" UUID,
    "status" "CertificationStatus" NOT NULL DEFAULT 'PENDING',
    "verifiedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "descriptionFiltered" TEXT,
    "fabric" TEXT,
    "composition" TEXT,
    "gsm" INTEGER,
    "moqPcs" INTEGER NOT NULL,
    "leadTimeDays" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_price_tiers" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "minQty" INTEGER NOT NULL,
    "manufacturerUnitPriceMinor" INTEGER NOT NULL,
    "buyerUnitPriceMinor" INTEGER NOT NULL,

    CONSTRAINT "product_price_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "alt" TEXT,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rfqs" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "buyerCompanyId" UUID NOT NULL,
    "createdById" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionFiltered" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "targetUnitPriceMinor" INTEGER,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "deadline" TIMESTAMP(3) NOT NULL,
    "requiredDeliveryDate" TIMESTAMP(3),
    "incoterm" "Incoterm",
    "destinationCountry" CHAR(2),
    "status" "RfqStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rfqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rfq_invitations" (
    "id" UUID NOT NULL,
    "rfqId" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "status" "RfqInvitationStatus" NOT NULL DEFAULT 'INVITED',
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondedAt" TIMESTAMP(3),
    "declineReason" TEXT,

    CONSTRAINT "rfq_invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rfq_attachments" (
    "id" UUID NOT NULL,
    "rfqId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "kind" "RfqAttachmentKind" NOT NULL,

    CONSTRAINT "rfq_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" UUID NOT NULL,
    "rfqId" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "manufacturerUnitPriceMinor" INTEGER NOT NULL,
    "buyerUnitPriceMinor" INTEGER,
    "currency" "Currency" NOT NULL,
    "leadTimeDays" INTEGER NOT NULL,
    "moqPcs" INTEGER,
    "validUntil" TIMESTAMP(3),
    "notes" TEXT,
    "notesFiltered" TEXT,
    "status" "QuoteStatus" NOT NULL DEFAULT 'SUBMITTED',
    "marginRuleId" UUID,
    "pricedById" UUID,
    "pricedAt" TIMESTAMP(3),
    "offeredAt" TIMESTAMP(3),
    "decidedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "margin_rules" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "markupBps" INTEGER NOT NULL,
    "minMarginPerUnitMinor" INTEGER,
    "categoryId" UUID,
    "companyId" UUID,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "margin_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" UUID NOT NULL,
    "type" "ConversationType" NOT NULL,
    "companyId" UUID NOT NULL,
    "subject" TEXT NOT NULL,
    "rfqId" UUID,
    "orderId" UUID,
    "lastMessageAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_participants" (
    "conversationId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastReadAt" TIMESTAMP(3),

    CONSTRAINT "conversation_participants_pkey" PRIMARY KEY ("conversationId","userId")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" UUID NOT NULL,
    "conversationId" UUID NOT NULL,
    "senderId" UUID NOT NULL,
    "originalContent" TEXT NOT NULL,
    "filteredContent" TEXT NOT NULL,
    "flagged" BOOLEAN NOT NULL DEFAULT false,
    "flagReasons" "ContactFlag"[],
    "moderationStatus" "ModerationStatus" NOT NULL DEFAULT 'CLEAN',
    "editedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_attachments" (
    "id" UUID NOT NULL,
    "messageId" UUID NOT NULL,
    "fileId" UUID NOT NULL,

    CONSTRAINT "message_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "buyerCompanyId" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "rfqId" UUID,
    "quoteId" UUID,
    "title" TEXT NOT NULL,
    "specification" TEXT,
    "quantity" INTEGER NOT NULL,
    "buyerUnitPriceMinor" INTEGER NOT NULL,
    "manufacturerUnitPriceMinor" INTEGER NOT NULL,
    "buyerTotalMinor" BIGINT NOT NULL,
    "manufacturerTotalMinor" BIGINT NOT NULL,
    "currency" "Currency" NOT NULL,
    "incoterm" "Incoterm" NOT NULL,
    "destinationCountry" CHAR(2) NOT NULL,
    "destinationPort" TEXT,
    "depositBps" INTEGER NOT NULL DEFAULT 3000,
    "requestedShipDate" TIMESTAMP(3),
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING_DEPOSIT',
    "confirmedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sku" TEXT,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_milestones" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "stage" "MilestoneStage" NOT NULL,
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "plannedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "note" TEXT,
    "noteFiltered" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milestone_photos" (
    "id" UUID NOT NULL,
    "milestoneId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "buyerVisible" BOOLEAN NOT NULL DEFAULT false,
    "takenAt" TIMESTAMP(3),
    "caption" TEXT,

    CONSTRAINT "milestone_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "samples" (
    "id" UUID NOT NULL,
    "rfqId" UUID,
    "orderId" UUID,
    "type" "SampleType" NOT NULL,
    "status" "SampleStatus" NOT NULL DEFAULT 'REQUESTED',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "buyerFeeMinor" INTEGER,
    "currency" "Currency",
    "courier" TEXT,
    "trackingNumber" TEXT,
    "shippedAt" TIMESTAMP(3),
    "receivedAt" TIMESTAMP(3),
    "buyerFeedback" TEXT,
    "buyerFeedbackFiltered" TEXT,
    "decidedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "samples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "direction" "PaymentDirection" NOT NULL,
    "purpose" "PaymentPurpose" NOT NULL,
    "amountMinor" BIGINT NOT NULL,
    "currency" "Currency" NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "provider" TEXT,
    "providerRef" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledger_accounts" (
    "id" UUID NOT NULL,
    "type" "LedgerAccountType" NOT NULL,
    "companyId" UUID,
    "currency" "Currency" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ledger_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ledger_transactions" (
    "id" UUID NOT NULL,
    "kind" "LedgerTransactionKind" NOT NULL,
    "orderId" UUID,
    "paymentId" UUID,
    "currency" "Currency" NOT NULL,
    "description" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ledger_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "escrow_ledger_entries" (
    "id" UUID NOT NULL,
    "transactionId" UUID NOT NULL,
    "accountId" UUID NOT NULL,
    "direction" "EntryDirection" NOT NULL,
    "amountMinor" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "escrow_ledger_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspections" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "type" "InspectionType" NOT NULL,
    "agency" TEXT,
    "scheduledAt" TIMESTAMP(3),
    "inspectedAt" TIMESTAMP(3),
    "aqlLevel" TEXT,
    "aqlMajor" TEXT,
    "aqlMinor" TEXT,
    "sampleSize" INTEGER,
    "criticalDefects" INTEGER,
    "majorDefects" INTEGER,
    "minorDefects" INTEGER,
    "result" "InspectionResult" NOT NULL DEFAULT 'PENDING',
    "summary" TEXT,
    "reportFileId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipments" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "mode" "ShipmentMode" NOT NULL,
    "status" "ShipmentStatus" NOT NULL DEFAULT 'PENDING',
    "carrier" TEXT,
    "trackingNumber" TEXT,
    "containerNumber" TEXT,
    "transportDocNo" TEXT,
    "originPort" TEXT,
    "destinationPort" TEXT,
    "cartons" INTEGER,
    "grossWeightKg" INTEGER,
    "etd" TIMESTAMP(3),
    "eta" TIMESTAMP(3),
    "shippedAt" TIMESTAMP(3),
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipment_documents" (
    "id" UUID NOT NULL,
    "shipmentId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "type" "ShipmentDocumentType" NOT NULL,
    "buyerVisible" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipment_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "authorCompanyId" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "qualityRating" INTEGER,
    "communicationRating" INTEGER,
    "deliveryRating" INTEGER,
    "comment" TEXT,
    "commentFiltered" TEXT,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING_MODERATION',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disputes" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "openedById" UUID NOT NULL,
    "assignedToId" UUID,
    "reason" "DisputeReason" NOT NULL,
    "description" TEXT NOT NULL,
    "descriptionFiltered" TEXT NOT NULL,
    "status" "DisputeStatus" NOT NULL DEFAULT 'OPEN',
    "resolution" TEXT,
    "refundAmountMinor" BIGINT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "disputes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dispute_evidence" (
    "id" UUID NOT NULL,
    "disputeId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dispute_evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "data" JSONB,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" UUID NOT NULL,
    "actorUserId" UUID,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "metadata" JSONB,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "file_assets" (
    "id" UUID NOT NULL,
    "bucket" TEXT NOT NULL,
    "storageKey" TEXT NOT NULL,
    "sanitizedKey" TEXT,
    "originalFilename" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "checksumSha256" TEXT,
    "purpose" "FilePurpose" NOT NULL,
    "status" "FileStatus" NOT NULL DEFAULT 'PENDING_UPLOAD',
    "scanStatus" "ScanStatus" NOT NULL DEFAULT 'PENDING',
    "uploadedById" UUID,
    "ownerCompanyId" UUID,
    "uploadedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BuyerCategories" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_BuyerCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ManufacturerCategories" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ManufacturerCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_companyId_idx" ON "users"("companyId");

-- CreateIndex
CREATE INDEX "users_role_status_idx" ON "users"("role", "status");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refreshTokenHash_key" ON "sessions"("refreshTokenHash");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "sessions_familyId_idx" ON "sessions"("familyId");

-- CreateIndex
CREATE INDEX "sessions_expiresAt_idx" ON "sessions"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_tokens_tokenHash_key" ON "user_tokens"("tokenHash");

-- CreateIndex
CREATE INDEX "user_tokens_userId_type_idx" ON "user_tokens"("userId", "type");

-- CreateIndex
CREATE INDEX "user_tokens_expiresAt_idx" ON "user_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "companies_type_kycStatus_idx" ON "companies"("type", "kycStatus");

-- CreateIndex
CREATE INDEX "companies_kycStatus_kycSubmittedAt_idx" ON "companies"("kycStatus", "kycSubmittedAt");

-- CreateIndex
CREATE INDEX "companies_country_idx" ON "companies"("country");

-- CreateIndex
CREATE UNIQUE INDEX "company_documents_fileId_key" ON "company_documents"("fileId");

-- CreateIndex
CREATE INDEX "company_documents_companyId_type_idx" ON "company_documents"("companyId", "type");

-- CreateIndex
CREATE INDEX "company_documents_status_idx" ON "company_documents"("status");

-- CreateIndex
CREATE UNIQUE INDEX "buyer_profiles_companyId_key" ON "buyer_profiles"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "buyer_profiles_publicCode_key" ON "buyer_profiles"("publicCode");

-- CreateIndex
CREATE UNIQUE INDEX "manufacturer_profiles_companyId_key" ON "manufacturer_profiles"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "manufacturer_profiles_publicCode_key" ON "manufacturer_profiles"("publicCode");

-- CreateIndex
CREATE INDEX "manufacturer_profiles_isListed_performanceScore_idx" ON "manufacturer_profiles"("isListed", "performanceScore");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_parentId_idx" ON "categories"("parentId");

-- CreateIndex
CREATE UNIQUE INDEX "certifications_fileId_key" ON "certifications"("fileId");

-- CreateIndex
CREATE INDEX "certifications_manufacturerProfileId_type_idx" ON "certifications"("manufacturerProfileId", "type");

-- CreateIndex
CREATE INDEX "certifications_status_expiresAt_idx" ON "certifications"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "products_manufacturerProfileId_status_idx" ON "products"("manufacturerProfileId", "status");

-- CreateIndex
CREATE INDEX "products_categoryId_status_idx" ON "products"("categoryId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "product_price_tiers_productId_minQty_key" ON "product_price_tiers"("productId", "minQty");

-- CreateIndex
CREATE UNIQUE INDEX "product_images_fileId_key" ON "product_images"("fileId");

-- CreateIndex
CREATE INDEX "product_images_productId_sortOrder_idx" ON "product_images"("productId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "rfqs_code_key" ON "rfqs"("code");

-- CreateIndex
CREATE INDEX "rfqs_buyerCompanyId_status_idx" ON "rfqs"("buyerCompanyId", "status");

-- CreateIndex
CREATE INDEX "rfqs_status_deadline_idx" ON "rfqs"("status", "deadline");

-- CreateIndex
CREATE INDEX "rfqs_categoryId_idx" ON "rfqs"("categoryId");

-- CreateIndex
CREATE INDEX "rfq_invitations_manufacturerProfileId_status_idx" ON "rfq_invitations"("manufacturerProfileId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "rfq_invitations_rfqId_manufacturerProfileId_key" ON "rfq_invitations"("rfqId", "manufacturerProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "rfq_attachments_fileId_key" ON "rfq_attachments"("fileId");

-- CreateIndex
CREATE INDEX "rfq_attachments_rfqId_idx" ON "rfq_attachments"("rfqId");

-- CreateIndex
CREATE INDEX "quotes_rfqId_status_idx" ON "quotes"("rfqId", "status");

-- CreateIndex
CREATE INDEX "quotes_manufacturerProfileId_status_idx" ON "quotes"("manufacturerProfileId", "status");

-- CreateIndex
CREATE INDEX "quotes_status_createdAt_idx" ON "quotes"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "quotes_rfqId_manufacturerProfileId_key" ON "quotes"("rfqId", "manufacturerProfileId");

-- CreateIndex
CREATE INDEX "margin_rules_active_companyId_categoryId_idx" ON "margin_rules"("active", "companyId", "categoryId");

-- CreateIndex
CREATE INDEX "conversations_companyId_lastMessageAt_idx" ON "conversations"("companyId", "lastMessageAt");

-- CreateIndex
CREATE INDEX "conversations_rfqId_idx" ON "conversations"("rfqId");

-- CreateIndex
CREATE INDEX "conversations_orderId_idx" ON "conversations"("orderId");

-- CreateIndex
CREATE INDEX "conversation_participants_userId_idx" ON "conversation_participants"("userId");

-- CreateIndex
CREATE INDEX "messages_conversationId_createdAt_idx" ON "messages"("conversationId", "createdAt");

-- CreateIndex
CREATE INDEX "messages_flagged_moderationStatus_idx" ON "messages"("flagged", "moderationStatus");

-- CreateIndex
CREATE INDEX "messages_senderId_createdAt_idx" ON "messages"("senderId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "message_attachments_fileId_key" ON "message_attachments"("fileId");

-- CreateIndex
CREATE INDEX "message_attachments_messageId_idx" ON "message_attachments"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_code_key" ON "orders"("code");

-- CreateIndex
CREATE UNIQUE INDEX "orders_quoteId_key" ON "orders"("quoteId");

-- CreateIndex
CREATE INDEX "orders_buyerCompanyId_status_idx" ON "orders"("buyerCompanyId", "status");

-- CreateIndex
CREATE INDEX "orders_manufacturerProfileId_status_idx" ON "orders"("manufacturerProfileId", "status");

-- CreateIndex
CREATE INDEX "orders_status_createdAt_idx" ON "orders"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "order_items_orderId_color_size_key" ON "order_items"("orderId", "color", "size");

-- CreateIndex
CREATE UNIQUE INDEX "order_milestones_orderId_stage_key" ON "order_milestones"("orderId", "stage");

-- CreateIndex
CREATE UNIQUE INDEX "milestone_photos_fileId_key" ON "milestone_photos"("fileId");

-- CreateIndex
CREATE INDEX "milestone_photos_milestoneId_idx" ON "milestone_photos"("milestoneId");

-- CreateIndex
CREATE INDEX "samples_orderId_type_idx" ON "samples"("orderId", "type");

-- CreateIndex
CREATE INDEX "samples_rfqId_idx" ON "samples"("rfqId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_providerRef_key" ON "payments"("providerRef");

-- CreateIndex
CREATE INDEX "payments_orderId_status_idx" ON "payments"("orderId", "status");

-- CreateIndex
CREATE INDEX "payments_status_createdAt_idx" ON "payments"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ledger_accounts_type_companyId_currency_key" ON "ledger_accounts"("type", "companyId", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "ledger_transactions_idempotencyKey_key" ON "ledger_transactions"("idempotencyKey");

-- CreateIndex
CREATE INDEX "ledger_transactions_orderId_postedAt_idx" ON "ledger_transactions"("orderId", "postedAt");

-- CreateIndex
CREATE INDEX "escrow_ledger_entries_accountId_createdAt_idx" ON "escrow_ledger_entries"("accountId", "createdAt");

-- CreateIndex
CREATE INDEX "escrow_ledger_entries_transactionId_idx" ON "escrow_ledger_entries"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "inspections_reportFileId_key" ON "inspections"("reportFileId");

-- CreateIndex
CREATE INDEX "inspections_orderId_type_idx" ON "inspections"("orderId", "type");

-- CreateIndex
CREATE INDEX "inspections_result_scheduledAt_idx" ON "inspections"("result", "scheduledAt");

-- CreateIndex
CREATE INDEX "shipments_orderId_idx" ON "shipments"("orderId");

-- CreateIndex
CREATE INDEX "shipments_trackingNumber_idx" ON "shipments"("trackingNumber");

-- CreateIndex
CREATE INDEX "shipments_status_eta_idx" ON "shipments"("status", "eta");

-- CreateIndex
CREATE UNIQUE INDEX "shipment_documents_fileId_key" ON "shipment_documents"("fileId");

-- CreateIndex
CREATE INDEX "shipment_documents_shipmentId_idx" ON "shipment_documents"("shipmentId");

-- CreateIndex
CREATE INDEX "reviews_manufacturerProfileId_status_idx" ON "reviews"("manufacturerProfileId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_orderId_authorCompanyId_key" ON "reviews"("orderId", "authorCompanyId");

-- CreateIndex
CREATE INDEX "disputes_orderId_idx" ON "disputes"("orderId");

-- CreateIndex
CREATE INDEX "disputes_status_createdAt_idx" ON "disputes"("status", "createdAt");

-- CreateIndex
CREATE INDEX "disputes_assignedToId_status_idx" ON "disputes"("assignedToId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "dispute_evidence_fileId_key" ON "dispute_evidence"("fileId");

-- CreateIndex
CREATE INDEX "dispute_evidence_disputeId_idx" ON "dispute_evidence"("disputeId");

-- CreateIndex
CREATE INDEX "notifications_userId_readAt_createdAt_idx" ON "notifications"("userId", "readAt", "createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_entityType_entityId_idx" ON "audit_logs"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "audit_logs_actorUserId_createdAt_idx" ON "audit_logs"("actorUserId", "createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_action_createdAt_idx" ON "audit_logs"("action", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "file_assets_storageKey_key" ON "file_assets"("storageKey");

-- CreateIndex
CREATE INDEX "file_assets_ownerCompanyId_purpose_idx" ON "file_assets"("ownerCompanyId", "purpose");

-- CreateIndex
CREATE INDEX "file_assets_status_createdAt_idx" ON "file_assets"("status", "createdAt");

-- CreateIndex
CREATE INDEX "_BuyerCategories_B_index" ON "_BuyerCategories"("B");

-- CreateIndex
CREATE INDEX "_ManufacturerCategories_B_index" ON "_ManufacturerCategories"("B");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_tokens" ADD CONSTRAINT "user_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_kycReviewedById_fkey" FOREIGN KEY ("kycReviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_documents" ADD CONSTRAINT "company_documents_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_documents" ADD CONSTRAINT "company_documents_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "buyer_profiles" ADD CONSTRAINT "buyer_profiles_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manufacturer_profiles" ADD CONSTRAINT "manufacturer_profiles_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_price_tiers" ADD CONSTRAINT "product_price_tiers_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfqs" ADD CONSTRAINT "rfqs_buyerCompanyId_fkey" FOREIGN KEY ("buyerCompanyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfqs" ADD CONSTRAINT "rfqs_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfqs" ADD CONSTRAINT "rfqs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_invitations" ADD CONSTRAINT "rfq_invitations_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "rfqs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_invitations" ADD CONSTRAINT "rfq_invitations_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_attachments" ADD CONSTRAINT "rfq_attachments_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "rfqs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_attachments" ADD CONSTRAINT "rfq_attachments_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "rfqs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_marginRuleId_fkey" FOREIGN KEY ("marginRuleId") REFERENCES "margin_rules"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_pricedById_fkey" FOREIGN KEY ("pricedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "margin_rules" ADD CONSTRAINT "margin_rules_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "margin_rules" ADD CONSTRAINT "margin_rules_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "rfqs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participants" ADD CONSTRAINT "conversation_participants_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_participants" ADD CONSTRAINT "conversation_participants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_attachments" ADD CONSTRAINT "message_attachments_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_attachments" ADD CONSTRAINT "message_attachments_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_buyerCompanyId_fkey" FOREIGN KEY ("buyerCompanyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "rfqs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "quotes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_milestones" ADD CONSTRAINT "order_milestones_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestone_photos" ADD CONSTRAINT "milestone_photos_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "order_milestones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestone_photos" ADD CONSTRAINT "milestone_photos_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "samples" ADD CONSTRAINT "samples_rfqId_fkey" FOREIGN KEY ("rfqId") REFERENCES "rfqs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "samples" ADD CONSTRAINT "samples_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger_accounts" ADD CONSTRAINT "ledger_accounts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger_transactions" ADD CONSTRAINT "ledger_transactions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger_transactions" ADD CONSTRAINT "ledger_transactions_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "escrow_ledger_entries" ADD CONSTRAINT "escrow_ledger_entries_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "ledger_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "escrow_ledger_entries" ADD CONSTRAINT "escrow_ledger_entries_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "ledger_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_reportFileId_fkey" FOREIGN KEY ("reportFileId") REFERENCES "file_assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_documents" ADD CONSTRAINT "shipment_documents_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "shipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipment_documents" ADD CONSTRAINT "shipment_documents_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_authorCompanyId_fkey" FOREIGN KEY ("authorCompanyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_openedById_fkey" FOREIGN KEY ("openedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_evidence" ADD CONSTRAINT "dispute_evidence_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "disputes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_evidence" ADD CONSTRAINT "dispute_evidence_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_assets" ADD CONSTRAINT "file_assets_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "file_assets" ADD CONSTRAINT "file_assets_ownerCompanyId_fkey" FOREIGN KEY ("ownerCompanyId") REFERENCES "companies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuyerCategories" ADD CONSTRAINT "_BuyerCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "buyer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BuyerCategories" ADD CONSTRAINT "_BuyerCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManufacturerCategories" ADD CONSTRAINT "_ManufacturerCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ManufacturerCategories" ADD CONSTRAINT "_ManufacturerCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ─────────────────────────────────────────────────────────────────────────────
-- Integrity rules Prisma cannot express (hand-written)
-- ─────────────────────────────────────────────────────────────────────────────

-- Money and quantities
ALTER TABLE "escrow_ledger_entries" ADD CONSTRAINT "escrow_ledger_entries_amount_positive" CHECK ("amountMinor" > 0);
ALTER TABLE "payments" ADD CONSTRAINT "payments_amount_positive" CHECK ("amountMinor" > 0);
ALTER TABLE "product_price_tiers" ADD CONSTRAINT "product_price_tiers_valid"
  CHECK ("minQty" > 0 AND "manufacturerUnitPriceMinor" > 0 AND "buyerUnitPriceMinor" >= "manufacturerUnitPriceMinor");
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_prices_valid"
  CHECK ("manufacturerUnitPriceMinor" > 0 AND ("buyerUnitPriceMinor" IS NULL OR "buyerUnitPriceMinor" >= "manufacturerUnitPriceMinor"));
ALTER TABLE "orders" ADD CONSTRAINT "orders_amounts_valid"
  CHECK ("quantity" > 0 AND "manufacturerUnitPriceMinor" > 0 AND "buyerUnitPriceMinor" >= "manufacturerUnitPriceMinor"
         AND "depositBps" BETWEEN 0 AND 10000);
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_quantity_positive" CHECK ("quantity" > 0);
ALTER TABLE "rfqs" ADD CONSTRAINT "rfqs_quantity_positive" CHECK ("quantity" > 0);
ALTER TABLE "margin_rules" ADD CONSTRAINT "margin_rules_markup_non_negative" CHECK ("markupBps" >= 0);
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_ratings_range" CHECK (
  "rating" BETWEEN 1 AND 5
  AND ("qualityRating" IS NULL OR "qualityRating" BETWEEN 1 AND 5)
  AND ("communicationRating" IS NULL OR "communicationRating" BETWEEN 1 AND 5)
  AND ("deliveryRating" IS NULL OR "deliveryRating" BETWEEN 1 AND 5));
ALTER TABLE "manufacturer_profiles" ADD CONSTRAINT "manufacturer_profiles_score_range" CHECK ("performanceScore" BETWEEN 0 AND 100);
ALTER TABLE "samples" ADD CONSTRAINT "samples_has_parent" CHECK ("rfqId" IS NOT NULL OR "orderId" IS NOT NULL);
ALTER TABLE "users" ADD CONSTRAINT "users_email_lowercase" CHECK ("email" = lower(btrim("email")));

-- Every ledger transaction must balance (debits = credits), checked at COMMIT so
-- all entries of a transaction can be inserted first.
CREATE FUNCTION assert_ledger_transaction_balanced() RETURNS trigger AS $$
DECLARE
  imbalance NUMERIC;
BEGIN
  SELECT COALESCE(SUM(CASE WHEN "direction" = 'DEBIT' THEN "amountMinor" ELSE -"amountMinor" END), 0)
    INTO imbalance
    FROM "escrow_ledger_entries"
   WHERE "transactionId" = NEW."transactionId";
  IF imbalance <> 0 THEN
    RAISE EXCEPTION 'Ledger transaction % is unbalanced by %', NEW."transactionId", imbalance;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER escrow_ledger_entries_balanced
  AFTER INSERT OR UPDATE ON "escrow_ledger_entries"
  DEFERRABLE INITIALLY DEFERRED
  FOR EACH ROW EXECUTE FUNCTION assert_ledger_transaction_balanced();

-- Ledger entries are append-only.
CREATE FUNCTION forbid_ledger_mutation() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'escrow_ledger_entries is append-only; post a reversing transaction instead';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER escrow_ledger_entries_append_only
  BEFORE UPDATE OR DELETE ON "escrow_ledger_entries"
  FOR EACH ROW EXECUTE FUNCTION forbid_ledger_mutation();

-- Relayed chat: a participant is either an ADMIN or a member of the conversation's company,
-- and the company type must match the conversation type. Buyers and manufacturers can never
-- share a thread.
CREATE FUNCTION assert_conversation_participant_allowed() RETURNS trigger AS $$
DECLARE
  conv_type "ConversationType";
  conv_company UUID;
  company_type "CompanyType";
  user_role "Role";
  user_company UUID;
BEGIN
  SELECT c."type", c."companyId", co."type" INTO conv_type, conv_company, company_type
    FROM "conversations" c JOIN "companies" co ON co."id" = c."companyId"
   WHERE c."id" = NEW."conversationId";
  SELECT u."role", u."companyId" INTO user_role, user_company
    FROM "users" u WHERE u."id" = NEW."userId";

  IF conv_type = 'BUYER_PLATFORM' AND company_type <> 'BUYER' THEN
    RAISE EXCEPTION 'BUYER_PLATFORM conversation must belong to a buyer company';
  END IF;
  IF conv_type = 'MANUFACTURER_PLATFORM' AND company_type <> 'MANUFACTURER' THEN
    RAISE EXCEPTION 'MANUFACTURER_PLATFORM conversation must belong to a manufacturer company';
  END IF;
  IF user_role <> 'ADMIN' AND user_company IS DISTINCT FROM conv_company THEN
    RAISE EXCEPTION 'User % may not join conversation % (company mismatch)', NEW."userId", NEW."conversationId";
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER conversation_participants_allowed
  BEFORE INSERT OR UPDATE ON "conversation_participants"
  FOR EACH ROW EXECUTE FUNCTION assert_conversation_participant_allowed();
