-- AlterEnum
ALTER TYPE "LogisticsMode" ADD VALUE 'HANDOVER';

-- AlterEnum
ALTER TYPE "ShipmentLegKind" ADD VALUE 'HUB_HANDOVER';

-- AlterTable
ALTER TABLE "logistics_quotes" ADD COLUMN     "forwarderContact" TEXT,
ADD COLUMN     "forwarderName" TEXT,
ADD COLUMN     "forwarderReference" TEXT;


-- Hand-written: a hand-over names the buyer's forwarder.
ALTER TABLE "logistics_quotes" ADD CONSTRAINT "logistics_quotes_handover_forwarder"
  CHECK ("mode"::text <> 'HANDOVER' OR "forwarderName" IS NOT NULL);
