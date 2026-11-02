-- CreateEnum
CREATE TYPE "NotificationCategory" AS ENUM ('QUOTES', 'MESSAGES', 'ORDERS', 'QC', 'PAYMENTS', 'DISPUTES', 'REVIEWS', 'ACCOUNT');

-- CreateEnum
CREATE TYPE "ReviewDirection" AS ENUM ('BUYER_TO_MANUFACTURER', 'MANUFACTURER_TO_BUYER');

-- CreateEnum
CREATE TYPE "DisputeParty" AS ENUM ('BUYER', 'MANUFACTURER', 'STAFF');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "NotificationType" ADD VALUE 'MILESTONE_UPDATE';
ALTER TYPE "NotificationType" ADD VALUE 'QC_RESULT';
ALTER TYPE "NotificationType" ADD VALUE 'REVIEW_RECEIVED';

-- DropIndex
DROP INDEX "shipments_orderId_idx";

-- AlterTable
ALTER TABLE "conversations" ADD COLUMN     "disputeId" UUID;

-- AlterTable
ALTER TABLE "dispute_evidence" ADD COLUMN     "reviewNote" TEXT,
ADD COLUMN     "reviewStatus" "MediaReviewStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "submittedBy" "DisputeParty" NOT NULL,
ADD COLUMN     "uploadedById" UUID NOT NULL;

-- AlterTable
ALTER TABLE "disputes" ADD COLUMN     "resolvedById" UUID;

-- AlterTable
ALTER TABLE "manufacturer_profiles" ADD COLUMN     "communicationAvgX100" INTEGER,
ADD COLUMN     "onTimeAvgX100" INTEGER,
ADD COLUMN     "qcPassBps" INTEGER,
ADD COLUMN     "qualityAvgX100" INTEGER,
ADD COLUMN     "ratingAvgX100" INTEGER,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "direction" "ReviewDirection" NOT NULL,
ADD COLUMN     "subjectCompanyId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "notification_preferences" (
    "userId" UUID NOT NULL,
    "category" "NotificationCategory" NOT NULL,
    "inApp" BOOLEAN NOT NULL,
    "email" BOOLEAN NOT NULL,

    CONSTRAINT "notification_preferences_pkey" PRIMARY KEY ("userId","category")
);

-- CreateIndex
CREATE INDEX "conversations_disputeId_idx" ON "conversations"("disputeId");

-- CreateIndex
CREATE INDEX "reviews_subjectCompanyId_direction_idx" ON "reviews"("subjectCompanyId", "direction");

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_subjectCompanyId_fkey" FOREIGN KEY ("subjectCompanyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "disputes" ADD CONSTRAINT "disputes_resolvedById_fkey" FOREIGN KEY ("resolvedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dispute_evidence" ADD CONSTRAINT "dispute_evidence_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_preferences" ADD CONSTRAINT "notification_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Hand-written: one mediation thread per side per dispute.
CREATE UNIQUE INDEX "conversations_dispute_thread_key"
  ON "conversations" ("type", "companyId", "disputeId") WHERE "disputeId" IS NOT NULL;

-- Hand-written: at most one open dispute per order.
CREATE UNIQUE INDEX "disputes_one_open_per_order"
  ON "disputes" ("orderId") WHERE "status" IN ('OPEN', 'UNDER_REVIEW');

-- Hand-written: nobody reviews their own company (ratings are range-checked since init).
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_subject_not_author" CHECK ("authorCompanyId" <> "subjectCompanyId");
