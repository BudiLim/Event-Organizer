/*
  Warnings:

  - You are about to alter the column `quotaAvailable` on the `Promotion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `quotaUsed` on the `Promotion` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[discountCode]` on the table `Promotion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Promotion` MODIFY `quotaAvailable` INTEGER NOT NULL,
    MODIFY `quotaUsed` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Promotion_discountCode_key` ON `Promotion`(`discountCode`);
