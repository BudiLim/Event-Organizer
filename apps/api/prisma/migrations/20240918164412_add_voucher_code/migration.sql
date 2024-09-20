/*
  Warnings:

  - A unique constraint covering the columns `[voucherCode]` on the table `Discount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `voucherCode` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Discount` ADD COLUMN `voucherCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Discount_voucherCode_key` ON `Discount`(`voucherCode`);
