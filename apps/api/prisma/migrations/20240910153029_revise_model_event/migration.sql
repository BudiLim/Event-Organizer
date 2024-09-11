/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Event` table. All the data in the column will be lost.
  - Added the required column `eventDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellEndDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellEndTime` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `date`,
    DROP COLUMN `time`,
    ADD COLUMN `eventDate` DATETIME(3) NOT NULL,
    ADD COLUMN `eventTime` DATETIME(3) NOT NULL,
    ADD COLUMN `sellEndDate` DATETIME(3) NOT NULL,
    ADD COLUMN `sellEndTime` DATETIME(3) NOT NULL;
