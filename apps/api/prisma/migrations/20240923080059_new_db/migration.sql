/*
  Warnings:

  - You are about to drop the column `eventId` on the `feedback` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `feedback` DROP FOREIGN KEY `Feedback_eventId_fkey`;

-- AlterTable
ALTER TABLE `feedback` DROP COLUMN `eventId`;
