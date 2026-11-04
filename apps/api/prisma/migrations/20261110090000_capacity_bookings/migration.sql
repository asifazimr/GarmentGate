-- CreateEnum
CREATE TYPE "CapacityBookingKind" AS ENUM ('SLOT', 'LINE', 'PARTNERSHIP');

-- CreateEnum
CREATE TYPE "CapacityBookingStatus" AS ENUM ('HELD', 'CONFIRMED', 'IN_PRODUCTION', 'COMPLETED', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CapacityBookingActor" AS ENUM ('BUYER', 'FACTORY', 'STAFF', 'SYSTEM');

-- CreateEnum
CREATE TYPE "CapacityConversionMode" AS ENUM ('CMT', 'FULL_PACKAGE');

-- CreateEnum
CREATE TYPE "CapacityPartnershipStatus" AS ENUM ('REQUESTED', 'ACTIVE', 'DECLINED', 'CANCELLED', 'ENDED');

-- AlterTable
ALTER TABLE "ledger_transactions" ADD COLUMN     "capacityBookingId" UUID;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "capacityBookingId" UUID,
ALTER COLUMN "orderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "rfqs" ADD COLUMN     "capacityBookingId" UUID;

-- CreateTable
CREATE TABLE "capacity_bookings" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "kind" "CapacityBookingKind" NOT NULL,
    "status" "CapacityBookingStatus" NOT NULL DEFAULT 'HELD',
    "buyerCompanyId" UUID NOT NULL,
    "createdById" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "lineId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "partnershipId" UUID,
    "minutes" INTEGER NOT NULL,
    "returnedMinutes" INTEGER NOT NULL DEFAULT 0,
    "samPerPieceCenti" INTEGER,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "currency" "Currency" NOT NULL,
    "factoryRateMinorPer100Min" INTEGER NOT NULL,
    "buyerRateMinorPer100Min" INTEGER NOT NULL,
    "factoryAmountMinor" BIGINT NOT NULL,
    "buyerAmountMinor" BIGINT NOT NULL,
    "feeBps" INTEGER NOT NULL,
    "depositBps" INTEGER NOT NULL,
    "depositMinor" BIGINT NOT NULL,
    "cancellationTiers" JSONB NOT NULL,
    "factoryShareBps" INTEGER NOT NULL,
    "note" TEXT,
    "noteFiltered" TEXT,
    "holdExpiresAt" TIMESTAMP(3) NOT NULL,
    "reminderSentAt" TIMESTAMP(3),
    "factoryAcceptedAt" TIMESTAMP(3),
    "depositPaidAt" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "cancelledBy" "CapacityBookingActor",
    "cancelReason" TEXT,
    "refundMinor" BIGINT,
    "factoryCompensationMinor" BIGINT,
    "compensationPaidAt" TIMESTAMP(3),
    "conversionMode" "CapacityConversionMode",
    "convertedAt" TIMESTAMP(3),
    "orderId" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capacity_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capacity_booking_allocations" (
    "id" UUID NOT NULL,
    "bookingId" UUID NOT NULL,
    "slotId" UUID NOT NULL,
    "minutes" INTEGER NOT NULL,

    CONSTRAINT "capacity_booking_allocations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capacity_partnerships" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "status" "CapacityPartnershipStatus" NOT NULL DEFAULT 'REQUESTED',
    "buyerCompanyId" UUID NOT NULL,
    "createdById" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "lineId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "monthlyMinutes" INTEGER NOT NULL,
    "months" INTEGER NOT NULL,
    "startMonth" DATE NOT NULL,
    "samPerPieceCenti" INTEGER,
    "currency" "Currency" NOT NULL,
    "factoryRateMinorPer100Min" INTEGER NOT NULL,
    "buyerRateMinorPer100Min" INTEGER NOT NULL,
    "note" TEXT,
    "noteFiltered" TEXT,
    "declineReason" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capacity_partnerships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "capacity_bookings_code_key" ON "capacity_bookings"("code");

-- CreateIndex
CREATE UNIQUE INDEX "capacity_bookings_orderId_key" ON "capacity_bookings"("orderId");

-- CreateIndex
CREATE INDEX "capacity_bookings_buyerCompanyId_status_idx" ON "capacity_bookings"("buyerCompanyId", "status");

-- CreateIndex
CREATE INDEX "capacity_bookings_manufacturerProfileId_status_idx" ON "capacity_bookings"("manufacturerProfileId", "status");

-- CreateIndex
CREATE INDEX "capacity_bookings_status_holdExpiresAt_idx" ON "capacity_bookings"("status", "holdExpiresAt");

-- CreateIndex
CREATE INDEX "capacity_bookings_partnershipId_idx" ON "capacity_bookings"("partnershipId");

-- CreateIndex
CREATE INDEX "capacity_booking_allocations_slotId_idx" ON "capacity_booking_allocations"("slotId");

-- CreateIndex
CREATE UNIQUE INDEX "capacity_booking_allocations_bookingId_slotId_key" ON "capacity_booking_allocations"("bookingId", "slotId");

-- CreateIndex
CREATE UNIQUE INDEX "capacity_partnerships_code_key" ON "capacity_partnerships"("code");

-- CreateIndex
CREATE INDEX "capacity_partnerships_buyerCompanyId_status_idx" ON "capacity_partnerships"("buyerCompanyId", "status");

-- CreateIndex
CREATE INDEX "capacity_partnerships_manufacturerProfileId_status_idx" ON "capacity_partnerships"("manufacturerProfileId", "status");

-- CreateIndex
CREATE INDEX "ledger_transactions_capacityBookingId_postedAt_idx" ON "ledger_transactions"("capacityBookingId", "postedAt");

-- CreateIndex
CREATE INDEX "payments_capacityBookingId_status_idx" ON "payments"("capacityBookingId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "rfqs_capacityBookingId_key" ON "rfqs"("capacityBookingId");

-- AddForeignKey
ALTER TABLE "rfqs" ADD CONSTRAINT "rfqs_capacityBookingId_fkey" FOREIGN KEY ("capacityBookingId") REFERENCES "capacity_bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_capacityBookingId_fkey" FOREIGN KEY ("capacityBookingId") REFERENCES "capacity_bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ledger_transactions" ADD CONSTRAINT "ledger_transactions_capacityBookingId_fkey" FOREIGN KEY ("capacityBookingId") REFERENCES "capacity_bookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_bookings" ADD CONSTRAINT "capacity_bookings_buyerCompanyId_fkey" FOREIGN KEY ("buyerCompanyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_bookings" ADD CONSTRAINT "capacity_bookings_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_bookings" ADD CONSTRAINT "capacity_bookings_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_bookings" ADD CONSTRAINT "capacity_bookings_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "production_lines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_bookings" ADD CONSTRAINT "capacity_bookings_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_bookings" ADD CONSTRAINT "capacity_bookings_partnershipId_fkey" FOREIGN KEY ("partnershipId") REFERENCES "capacity_partnerships"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_bookings" ADD CONSTRAINT "capacity_bookings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_booking_allocations" ADD CONSTRAINT "capacity_booking_allocations_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "capacity_bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_booking_allocations" ADD CONSTRAINT "capacity_booking_allocations_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "capacity_slots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_partnerships" ADD CONSTRAINT "capacity_partnerships_buyerCompanyId_fkey" FOREIGN KEY ("buyerCompanyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_partnerships" ADD CONSTRAINT "capacity_partnerships_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_partnerships" ADD CONSTRAINT "capacity_partnerships_manufacturerProfileId_fkey" FOREIGN KEY ("manufacturerProfileId") REFERENCES "manufacturer_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_partnerships" ADD CONSTRAINT "capacity_partnerships_lineId_fkey" FOREIGN KEY ("lineId") REFERENCES "production_lines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_partnerships" ADD CONSTRAINT "capacity_partnerships_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


-- Hand-written rules Prisma can't express.
ALTER TABLE "capacity_bookings"
  ADD CONSTRAINT "capacity_bookings_minutes_check" CHECK ("minutes" > 0 AND "returnedMinutes" >= 0 AND "returnedMinutes" <= "minutes"),
  ADD CONSTRAINT "capacity_bookings_dates_check" CHECK ("endDate" >= "startDate"),
  ADD CONSTRAINT "capacity_bookings_rates_check"
    CHECK ("factoryRateMinorPer100Min" > 0 AND "buyerRateMinorPer100Min" >= "factoryRateMinorPer100Min"),
  ADD CONSTRAINT "capacity_bookings_amounts_check"
    CHECK ("factoryAmountMinor" > 0 AND "buyerAmountMinor" >= "factoryAmountMinor"
           AND "depositMinor" > 0 AND "depositMinor" <= "buyerAmountMinor"),
  ADD CONSTRAINT "capacity_bookings_bps_check"
    CHECK ("feeBps" BETWEEN 0 AND 10000 AND "depositBps" BETWEEN 1 AND 10000 AND "factoryShareBps" BETWEEN 0 AND 10000),
  ADD CONSTRAINT "capacity_bookings_settlement_check"
    CHECK ("refundMinor" IS NULL OR ("refundMinor" >= 0 AND "refundMinor" + COALESCE("factoryCompensationMinor", 0) <= "depositMinor"));

ALTER TABLE "capacity_booking_allocations"
  ADD CONSTRAINT "capacity_booking_allocations_minutes_check" CHECK ("minutes" > 0);

ALTER TABLE "capacity_partnerships"
  ADD CONSTRAINT "capacity_partnerships_terms_check"
    CHECK ("monthlyMinutes" > 0 AND "months" BETWEEN 6 AND 12
           AND "factoryRateMinorPer100Min" > 0 AND "buyerRateMinorPer100Min" >= "factoryRateMinorPer100Min");

-- Every payment belongs to an order, a capacity booking, or both (a booking deposit carried into its order).
ALTER TABLE "payments"
  ADD CONSTRAINT "payments_owner_check" CHECK ("orderId" IS NOT NULL OR "capacityBookingId" IS NOT NULL);
