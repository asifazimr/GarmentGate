/*
  Warnings:

  - Added the required column `displayName` to the `message_attachments` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WarningLevel" AS ENUM ('WARNING', 'FINAL_WARNING');

-- AlterTable
ALTER TABLE "message_attachments" ADD COLUMN     "displayName" TEXT NOT NULL DEFAULT 'attachment',
ADD COLUMN     "flagReasons" "ContactFlag"[],
ADD COLUMN     "flagged" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scannedAt" TIMESTAMP(3);

-- Existing attachments: show the file's stored name; new rows always set it.
UPDATE "message_attachments" ma SET "displayName" = f."originalFilename" FROM "file_assets" f WHERE f."id" = ma."fileId";
ALTER TABLE "message_attachments" ALTER COLUMN "displayName" DROP DEFAULT;

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "relayedFromId" UUID;

-- CreateTable
CREATE TABLE "account_warnings" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "level" "WarningLevel" NOT NULL,
    "violations" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acknowledgedAt" TIMESTAMP(3),

    CONSTRAINT "account_warnings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "account_warnings_userId_createdAt_idx" ON "account_warnings"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "account_warnings" ADD CONSTRAINT "account_warnings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- One thread per side per RFQ / order: the buyer's thread and each factory's thread.
CREATE UNIQUE INDEX "conversations_rfq_thread_key"
  ON "conversations" ("type", "companyId", "rfqId") WHERE "rfqId" IS NOT NULL AND "orderId" IS NULL;
CREATE UNIQUE INDEX "conversations_order_thread_key"
  ON "conversations" ("type", "companyId", "orderId") WHERE "orderId" IS NOT NULL;
