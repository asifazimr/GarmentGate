-- CreateEnum
CREATE TYPE "LogisticsClaimType" AS ENUM ('LOSS', 'DAMAGE', 'SHORTAGE', 'DELAY');

-- CreateEnum
CREATE TYPE "LogisticsClaimStatus" AS ENUM ('OPEN', 'SUBMITTED', 'SETTLED', 'REJECTED');

-- AlterEnum
ALTER TYPE "LedgerTransactionKind" ADD VALUE 'CLAIM';

-- AlterEnum
ALTER TYPE "PaymentPurpose" ADD VALUE 'INSURANCE_RECOVERY';

-- CreateTable
CREATE TABLE "logistics_claims" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "shipmentId" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "disputeId" UUID,
    "legId" UUID,
    "type" "LogisticsClaimType" NOT NULL,
    "status" "LogisticsClaimStatus" NOT NULL DEFAULT 'OPEN',
    "description" TEXT NOT NULL,
    "publicNote" TEXT,
    "currency" "Currency" NOT NULL,
    "claimedMinor" BIGINT NOT NULL,
    "insuredValueMinor" BIGINT NOT NULL,
    "insurerReference" TEXT,
    "compensationMinor" BIGINT NOT NULL DEFAULT 0,
    "insurerRecoveryMinor" BIGINT NOT NULL DEFAULT 0,
    "partnerChargebackMinor" BIGINT NOT NULL DEFAULT 0,
    "resolution" TEXT,
    "createdById" UUID NOT NULL,
    "settledById" UUID,
    "settledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "logistics_claims_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "logistics_claims_code_key" ON "logistics_claims"("code");

-- CreateIndex
CREATE UNIQUE INDEX "logistics_claims_disputeId_key" ON "logistics_claims"("disputeId");

-- CreateIndex
CREATE INDEX "logistics_claims_orderId_idx" ON "logistics_claims"("orderId");

-- CreateIndex
CREATE INDEX "logistics_claims_shipmentId_idx" ON "logistics_claims"("shipmentId");

-- CreateIndex
CREATE INDEX "logistics_claims_status_createdAt_idx" ON "logistics_claims"("status", "createdAt");

-- AddForeignKey
ALTER TABLE "logistics_claims" ADD CONSTRAINT "logistics_claims_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "logistics_shipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics_claims" ADD CONSTRAINT "logistics_claims_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics_claims" ADD CONSTRAINT "logistics_claims_disputeId_fkey" FOREIGN KEY ("disputeId") REFERENCES "disputes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logistics_claims" ADD CONSTRAINT "logistics_claims_legId_fkey" FOREIGN KEY ("legId") REFERENCES "shipment_legs"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- Hand-written: amounts are sane and settlement never exceeds what the claim allows.
ALTER TABLE "logistics_claims" ADD CONSTRAINT "logistics_claims_amounts_check" CHECK (
  "claimedMinor" > 0
  AND "insuredValueMinor" >= 0
  AND "compensationMinor" >= 0 AND "compensationMinor" <= "claimedMinor"
  AND "insurerRecoveryMinor" >= 0 AND "insurerRecoveryMinor" <= "insuredValueMinor"
  AND "partnerChargebackMinor" >= 0
);

-- One live claim per order.
CREATE UNIQUE INDEX "logistics_claims_one_open" ON "logistics_claims"("orderId")
  WHERE "status" IN ('OPEN', 'SUBMITTED');
