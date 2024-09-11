/*
  Warnings:

  - You are about to drop the column `amount` on the `Discount` table. All the data in the column will be lost.
  - You are about to drop the column `discountAmount` on the `Promotion` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountCode` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quotaAvailable` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quotaUsed` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Discount` DROP COLUMN `amount`,
    ADD COLUMN `discountVoucher` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Promotion` DROP COLUMN `discountAmount`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `discountCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `quotaAvailable` VARCHAR(191) NOT NULL,
    ADD COLUMN `quotaUsed` VARCHAR(191) NOT NULL;
