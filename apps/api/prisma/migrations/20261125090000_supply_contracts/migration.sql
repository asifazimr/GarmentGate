-- CreateEnum
CREATE TYPE "SupplyContractStatus" AS ENUM ('ACTIVE', 'ENDED', 'CANCELLED');

-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "merchandiserId" UUID;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "contractId" UUID;

-- CreateTable
CREATE TABLE "supply_contracts" (
    "id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "buyerCompanyId" UUID NOT NULL,
    "manufacturerProfileId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "specification" TEXT NOT NULL,
    "currency" "Currency" NOT NULL,
    "buyerUnitPriceMinor" INTEGER NOT NULL,
    "manufacturerUnitPriceMinor" INTEGER NOT NULL,
    "contractedQuantity" INTEGER NOT NULL,
    "calledOffQuantity" INTEGER NOT NULL DEFAULT 0,
    "minCallOffQuantity" INTEGER NOT NULL DEFAULT 1,
    "depositBps" INTEGER NOT NULL DEFAULT 3000,
    "incoterm" "Incoterm" NOT NULL,
    "destinationCountry" CHAR(2) NOT NULL,
    "leadTimeDays" INTEGER NOT NULL,
    "startsOn" DATE NOT NULL,
    "endsOn" DATE NOT NULL,
    "status" "SupplyContractStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdById" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supply_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "supply_contracts_code_key" ON "supply_contracts"("code");

-- CreateIndex
CREATE INDEX "supply_contracts_buyerCompanyId_status_idx" ON "supply_contracts"("buyerCompanyId", "status");

-- CreateIndex
CREATE INDEX "supply_contracts_manufacturerProfileId_status_idx" ON "supply_contracts"("manufacturerProfileId", "status");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "supply_contracts"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- Hand-written: sane contracts; the volume is never overdrawn (call-offs claim it conditionally).
ALTER TABLE "supply_contracts" ADD CONSTRAINT "supply_contracts_check" CHECK (
  "buyerUnitPriceMinor" >= "manufacturerUnitPriceMinor"
  AND "manufacturerUnitPriceMinor" > 0
  AND "contractedQuantity" > 0
  AND "calledOffQuantity" >= 0 AND "calledOffQuantity" <= "contractedQuantity"
  AND "minCallOffQuantity" >= 1
  AND "depositBps" BETWEEN 0 AND 10000
  AND "leadTimeDays" >= 0
  AND "endsOn" >= "startsOn"
);
