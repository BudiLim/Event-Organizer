/*
  Warnings:

  - You are about to alter the column `isPaidEvent` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Event` MODIFY `isPaidEvent` ENUM('Free', 'Paid') NOT NULL;
