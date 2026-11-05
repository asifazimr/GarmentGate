-- CreateEnum
CREATE TYPE "LogisticsQuoteStatus" AS ENUM ('OFFERED', 'ACCEPTED', 'SUPERSEDED');

-- AlterEnum
ALTER TYPE "PaymentPurpose" ADD VALUE 'LOGISTICS';

-- CreateTable
CREATE TABLE "logistics_quotes" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "status" "LogisticsQuoteStatus" NOT NULL DEFAULT 'OFFERED',
    "mode" "LogisticsMode" NOT NULL,
    "incoterm" "Incoterm" NOT NULL,
    "originCountry" CHAR(2) NOT NULL,
    "destinationCountry" CHAR(2) NOT NULL,
    "destinationPort" TEXT,
    "insured" BOOLEAN NOT NULL,
    "weightGrams" INTEGER NOT NULL,
    "volumeLitres" INTEGER NOT NULL,
    "cargoEstimated" BOOLEAN NOT NULL,
    "provider" TEXT NOT NULL,
    "rateCardId" UUID,
    "partnerId" UUID,
    "marginRuleName" TEXT,
    "currency" "Currency" NOT NULL,
    "partnerCostMinor" BIGINT NOT NULL,
    "freightMinor" BIGINT NOT NULL,
    "insuranceMinor" BIGINT NOT NULL,
    "dutyEstimateMinor" BIGINT NOT NULL DEFAULT 0,
    "totalMinor" BIGINT NOT NULL,
    "transitDaysMin" INTEGER NOT NULL,
    "transitDaysMax" INTEGER NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "logistics_quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "logistics_quotes_orderId_status_idx" ON "logistics_quotes"("orderId", "status");

-- AddForeignKey
ALTER TABLE "logistics_quotes" ADD CONSTRAINT "logistics_quotes_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Hand-written rules Prisma can't express.
ALTER TABLE "logistics_quotes"
  ADD CONSTRAINT "logistics_quotes_amounts_check"
    CHECK ("partnerCostMinor" >= 0 AND "freightMinor" >= "partnerCostMinor" AND "insuranceMinor" >= 0
           AND "dutyEstimateMinor" >= 0
           AND "totalMinor" = "freightMinor" + "insuranceMinor" + "dutyEstimateMinor"),
  ADD CONSTRAINT "logistics_quotes_cargo_check" CHECK ("weightGrams" > 0 AND "volumeLitres" >= 0),
  ADD CONSTRAINT "logistics_quotes_transit_check" CHECK ("transitDaysMax" >= "transitDaysMin");

-- At most one accepted shipping quote per order.
CREATE UNIQUE INDEX "logistics_quotes_one_accepted"
  ON "logistics_quotes" ("orderId") WHERE "status" = 'ACCEPTED';
