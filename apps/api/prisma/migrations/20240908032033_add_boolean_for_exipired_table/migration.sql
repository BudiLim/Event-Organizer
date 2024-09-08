-- AlterTable
ALTER TABLE `Points` ADD COLUMN `expired` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Referral` ADD COLUMN `expired` BOOLEAN NOT NULL DEFAULT false;
