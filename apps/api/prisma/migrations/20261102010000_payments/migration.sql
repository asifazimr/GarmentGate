-- CreateEnum
CREATE TYPE "ReleaseTrigger" AS ENUM ('PRODUCTION_START', 'QC_PASSED', 'SHIPPED', 'DELIVERED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ReleaseStatus" AS ENUM ('SCHEDULED', 'DUE', 'RELEASED', 'PAID', 'CANCELLED');

-- AlterEnum
ALTER TYPE "FilePurpose" ADD VALUE 'PAYMENT_PROOF';

-- AlterTable
ALTER TABLE "ledger_transactions" ADD COLUMN     "amountUsdMinor" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "unitsPerUsd" DECIMAL(20,10) NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "amountUsdMinor" BIGINT,
ADD COLUMN     "confirmedById" UUID,
ADD COLUMN     "payerReference" TEXT,
ADD COLUMN     "proofFileId" UUID,
ADD COLUMN     "reference" TEXT,
ADD COLUMN     "releaseId" UUID,
ADD COLUMN     "settlementAmountMinor" BIGINT,
ADD COLUMN     "settlementCurrency" "Currency",
ADD COLUMN     "unitsPerUsd" DECIMAL(20,10);

-- CreateTable
CREATE TABLE "order_releases" (
    "id" UUID NOT NULL,
    "orderId" UUID NOT NULL,
    "trigger" "ReleaseTrigger" NOT NULL,
    "bps" INTEGER NOT NULL,
    "currency" "Currency" NOT NULL,
    "buyerMinor" BIGINT NOT NULL,
    "manufacturerMinor" BIGINT NOT NULL,
    "commissionMinor" BIGINT NOT NULL,
    "status" "ReleaseStatus" NOT NULL DEFAULT 'SCHEDULED',
    "dueAt" TIMESTAMP(3),
    "releasedAt" TIMESTAMP(3),
    "approvedById" UUID,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_releases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exchange_rates" (
    "currency" "Currency" NOT NULL,
    "unitsPerUsd" DECIMAL(20,10) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedById" UUID,

    CONSTRAINT "exchange_rates_pkey" PRIMARY KEY ("currency")
);

-- CreateTable
CREATE TABLE "platform_settings" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platform_settings_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE INDEX "order_releases_status_idx" ON "order_releases"("status");

-- CreateIndex
CREATE UNIQUE INDEX "order_releases_orderId_trigger_key" ON "order_releases"("orderId", "trigger");

-- CreateIndex
CREATE UNIQUE INDEX "payments_reference_key" ON "payments"("reference");

-- CreateIndex
CREATE UNIQUE INDEX "payments_proofFileId_key" ON "payments"("proofFileId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_releaseId_key" ON "payments"("releaseId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_proofFileId_fkey" FOREIGN KEY ("proofFileId") REFERENCES "file_assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_confirmedById_fkey" FOREIGN KEY ("confirmedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_releaseId_fkey" FOREIGN KEY ("releaseId") REFERENCES "order_releases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_releases" ADD CONSTRAINT "order_releases_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_releases" ADD CONSTRAINT "order_releases_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;


-- Existing transactions were all in USD at rate 1: their USD value is their debit total.
UPDATE "ledger_transactions" t SET "amountUsdMinor" = s.total
  FROM (SELECT "transactionId", SUM("amountMinor") AS total FROM "escrow_ledger_entries" WHERE "direction" = 'DEBIT' GROUP BY "transactionId") s
 WHERE s."transactionId" = t."id";

-- Platform accounts have no company: (type, companyId, currency) alone doesn't stop duplicates
-- because NULLs never collide in a unique index.
CREATE UNIQUE INDEX "ledger_accounts_platform_key" ON "ledger_accounts" ("type", "currency") WHERE "companyId" IS NULL;

-- A transaction is in one currency, and so are all the accounts it touches.
CREATE FUNCTION assert_ledger_entry_currency() RETURNS trigger AS $$
DECLARE
  tx_currency "Currency";
  account_currency "Currency";
BEGIN
  SELECT "currency" INTO tx_currency FROM "ledger_transactions" WHERE "id" = NEW."transactionId";
  SELECT "currency" INTO account_currency FROM "ledger_accounts" WHERE "id" = NEW."accountId";
  IF tx_currency IS DISTINCT FROM account_currency THEN
    RAISE EXCEPTION 'Ledger entry in % posted to a % account', tx_currency, account_currency;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER escrow_ledger_entries_currency
  BEFORE INSERT ON "escrow_ledger_entries"
  FOR EACH ROW EXECUTE FUNCTION assert_ledger_entry_currency();

-- Release amounts are never negative and add up within themselves.
ALTER TABLE "order_releases" ADD CONSTRAINT "order_releases_amounts" CHECK (
  "buyerMinor" >= 0 AND "manufacturerMinor" >= 0 AND "commissionMinor" >= 0
  AND "buyerMinor" = "manufacturerMinor" + "commissionMinor"
);
ALTER TABLE "exchange_rates" ADD CONSTRAINT "exchange_rates_positive" CHECK ("unitsPerUsd" > 0);
