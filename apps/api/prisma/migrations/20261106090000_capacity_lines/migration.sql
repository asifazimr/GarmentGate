-- CreateEnum
CREATE TYPE "ProductionLineStatus" AS ENUM ('ACTIVE', 'PAUSED', 'RETIRED');

-- CreateEnum
CREATE TYPE "CapacitySlotStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "SupplierClaimRegion" AS ENUM ('EU', 'UK', 'US', 'CANADA', 'JAPAN', 'AUSTRALIA', 'MIDDLE_EAST', 'OTHER');

-- CreateEnum
CREATE TYPE "SupplierClaimTier" AS ENUM ('MAJOR', 'ESTABLISHED');

-- CreateEnum
CREATE TYPE "SupplierClaimStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- AlterEnum
ALTER TYPE "FilePurpose" ADD VALUE 'SUPPLIER_CLAIM_EVIDENCE';

-- CreateTable
CREATE TABLE "production_lines" (
    "id" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dailySamMinutes" INTEGER NOT NULL,
    "workingDays" INTEGER[],
    "cmRateMinorPer100Min" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "status" "ProductionLineStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "production_lines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capacity_slots" (
    "id" UUID NOT NULL,
    "lineId" UUID NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "totalMinutes" INTEGER NOT NULL,
    "bookedMinutes" INTEGER NOT NULL DEFAULT 0,
    "status" "CapacitySlotStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capacity_slots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_claims" (
    "id" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "region" "SupplierClaimRegion" NOT NULL,
    "tier" "SupplierClaimTier" NOT NULL,
    "brandNames" TEXT[],
    "evidenceFileId" UUID,
    "note" TEXT,
    "status" "SupplierClaimStatus" NOT NULL DEFAULT 'PENDING',
    "reviewNote" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewedById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supplier_claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductionLineCategories" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ProductionLineCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "production_lines_manufacturerProfileId_status_idx" ON "production_lines"("manufacturerProfileId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "production_lines_manufacturerProfileId_code_key" ON "production_lines"("manufacturerProfileId", "code");

-- CreateIndex
CREATE INDEX "capacity_slots_lineId_startDate_idx" ON "capacity_slots"("lineId", "startDate");

-- CreateIndex
CREATE INDEX "capacity_slots_status_startDate_idx" ON "capacity_slots"("status", "startDate");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_claims_evidenceFileId_key" ON "supplier_claims"("evidenceFileId");

-- CreateIndex
CREATE INDEX "supplier_claims_manufacturerProfileId_status_idx" ON "supplier_claims"("manufacturerProfileId", "status");

-- CreateIndex
CREATE INDEX "supplier_claims_status_createdAt_idx" ON "supplier_claims"("status", "createdAt");

-- CreateIndex
CREATE INDEX "_ProductionLineCategories_B_index" ON "_ProductionLineCategories"("B");

-- AddForeignKey
ALTER TABLE "production_lines" ADD CONSTRAINT "production_lines_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_slots" ADD CONSTRAINT "capacity_slots_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "production_lines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_claims" ADD CONSTRAINT "supplier_claims_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_claims" ADD CONSTRAINT "supplier_claims_evidenceFileId_fkey" FOREIGN KEY ("evidenceFileId") REFERENCES "file_assets"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_claims" ADD CONSTRAINT "supplier_claims_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductionLineCategories" ADD CONSTRAINT "_ProductionLineCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductionLineCategories" ADD CONSTRAINT "_ProductionLineCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "production_lines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ── Rules Prisma can't express ─────────────────────────────────────────────

ALTER TABLE "production_lines"
  ADD CONSTRAINT "production_lines_daily_minutes_check" CHECK ("dailySamMinutes" > 0),
  ADD CONSTRAINT "production_lines_cm_rate_check" CHECK ("cmRateMinorPer100Min" > 0),
  ADD CONSTRAINT "production_lines_working_days_check"
    CHECK (cardinality("workingDays") BETWEEN 1 AND 7 AND "workingDays" <@ ARRAY[1,2,3,4,5,6,7]);

-- Booked minutes never exceed what was opened (the last line of defence against double booking).
ALTER TABLE "capacity_slots"
  ADD CONSTRAINT "capacity_slots_dates_check" CHECK ("endDate" >= "startDate"),
  ADD CONSTRAINT "capacity_slots_minutes_check"
    CHECK ("totalMinutes" > 0 AND "bookedMinutes" >= 0 AND "bookedMinutes" <= "totalMinutes");

-- Open slots of one line never overlap, so a day's capacity can't be offered twice.
CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE "capacity_slots"
  ADD CONSTRAINT "capacity_slots_no_overlap"
  EXCLUDE USING gist ("lineId" WITH =, daterange("startDate", "endDate", '[]') WITH &&)
  WHERE ("status" = 'OPEN');
