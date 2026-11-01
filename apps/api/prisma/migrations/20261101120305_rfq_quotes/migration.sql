-- AlterEnum
ALTER TYPE "OrderStatus" ADD VALUE 'DRAFT';

-- AlterTable
ALTER TABLE "rfq_attachments" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reviewNote" TEXT,
ADD COLUMN     "reviewStatus" "MediaReviewStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "reviewedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "rfqs" ADD COLUMN     "titleFiltered" TEXT;

-- Existing titles were written before filtering existed: filter-on-read falls back to them.
UPDATE "rfqs" SET "titleFiltered" = "title" WHERE "titleFiltered" IS NULL;
