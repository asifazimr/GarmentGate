-- AlterEnum
ALTER TYPE "SampleType" ADD VALUE 'CATALOG';

-- AlterTable
ALTER TABLE "rfqs" ADD COLUMN     "productId" UUID;

-- CreateTable
CREATE TABLE "shortlists" (
    "id" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shortlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shortlist_items" (
    "id" UUID NOT NULL,
    "shortlistId" UUID NOT NULL,
    "productId" UUID,
    "manufacturerProfileId" UUID,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shortlist_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shortlists_companyId_name_key" ON "shortlists"("companyId", "name");

-- CreateIndex
CREATE INDEX "shortlist_items_shortlistId_createdAt_idx" ON "shortlist_items"("shortlistId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "shortlist_items_shortlistId_productId_key" ON "shortlist_items"("shortlistId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "shortlist_items_shortlistId_manufacturerProfileId_key" ON "shortlist_items"("shortlistId", "manufacturerProfileId");

-- AddForeignKey
ALTER TABLE "rfqs" ADD CONSTRAINT "rfqs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shortlists" ADD CONSTRAINT "shortlists_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shortlist_items" ADD CONSTRAINT "shortlist_items_shortlistId_fkey" FOREIGN KEY ("shortlistId") REFERENCES "shortlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shortlist_items" ADD CONSTRAINT "shortlist_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shortlist_items" ADD CONSTRAINT "shortlist_items_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Hand-written integrity rules
ALTER TABLE "shortlist_items" ADD CONSTRAINT "shortlist_items_exactly_one_target"
  CHECK ((("productId" IS NOT NULL)::int + ("manufacturerProfileId" IS NOT NULL)::int) = 1);
-- At most one default shortlist per company
CREATE UNIQUE INDEX "shortlists_one_default_per_company" ON "shortlists" ("companyId") WHERE "isDefault";
