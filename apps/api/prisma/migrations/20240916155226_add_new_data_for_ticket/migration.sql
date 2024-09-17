/*
  Warnings:

  - You are about to alter the column `status` on the `Ticket` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - Added the required column `quantity` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `totalPrice` DOUBLE NOT NULL,
    MODIFY `status` ENUM('Active', 'Expired') NOT NULL DEFAULT 'Active';
