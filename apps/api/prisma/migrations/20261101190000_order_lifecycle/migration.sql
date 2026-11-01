-- Order lifecycle: DRAFT → SAMPLING → SAMPLE_APPROVED → DEPOSIT_PENDING → IN_PRODUCTION → QC
-- → READY_TO_SHIP → SHIPPED → DELIVERED → COMPLETED (+ CANCELLED, DISPUTED).
-- Old values map onto the new ones: PENDING_DEPOSIT → DEPOSIT_PENDING, CONFIRMED (deposit in)
-- → IN_PRODUCTION, QUALITY_CHECK → QC.

ALTER TYPE "FilePurpose" ADD VALUE 'SAMPLE_PHOTO';

CREATE TYPE "OrderStatus_new" AS ENUM ('DRAFT', 'SAMPLING', 'SAMPLE_APPROVED', 'DEPOSIT_PENDING', 'IN_PRODUCTION', 'QC', 'READY_TO_SHIP', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED', 'DISPUTED');
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING (
  CASE "status"::text
    WHEN 'PENDING_DEPOSIT' THEN 'DEPOSIT_PENDING'
    WHEN 'CONFIRMED' THEN 'IN_PRODUCTION'
    WHEN 'QUALITY_CHECK' THEN 'QC'
    ELSE "status"::text
  END
)::"OrderStatus_new";
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'DRAFT';

ALTER TABLE "orders" ADD COLUMN "disputedFrom" "OrderStatus",
ADD COLUMN "reorderOfId" UUID;
ALTER TABLE "orders" ADD CONSTRAINT "orders_reorderOfId_fkey" FOREIGN KEY ("reorderOfId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "samples" ADD COLUMN "requestNotes" TEXT,
ADD COLUMN "requestNotesFiltered" TEXT,
ADD COLUMN "round" INTEGER NOT NULL DEFAULT 1;

-- Milestone media: an explicit review state replaces the buyerVisible flag.
ALTER TABLE "milestone_photos" ADD COLUMN "reviewStatus" "MediaReviewStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "reviewNote" TEXT,
ADD COLUMN "reviewedAt" TIMESTAMP(3),
ADD COLUMN "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
UPDATE "milestone_photos" SET "reviewStatus" = 'APPROVED' WHERE "buyerVisible";
ALTER TABLE "milestone_photos" DROP COLUMN "buyerVisible";

CREATE TABLE "order_events" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "fromStatus" "OrderStatus",
    "toStatus" "OrderStatus" NOT NULL,
    "actorUserId" UUID,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "order_events_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "order_events_orderId_createdAt_idx" ON "order_events"("orderId", "createdAt");
ALTER TABLE "order_events" ADD CONSTRAINT "order_events_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "order_events" ADD CONSTRAINT "order_events_actorUserId_fkey" FOREIGN KEY ("actorUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE TABLE "sample_photos" (
    "id" UUID NOT NULL,
    "sampleId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "reviewStatus" "MediaReviewStatus" NOT NULL DEFAULT 'PENDING',
    "reviewNote" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "sample_photos_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "sample_photos_fileId_key" ON "sample_photos"("fileId");
CREATE INDEX "sample_photos_sampleId_idx" ON "sample_photos"("sampleId");
ALTER TABLE "sample_photos" ADD CONSTRAINT "sample_photos_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "samples"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "sample_photos" ADD CONSTRAINT "sample_photos_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file_assets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
