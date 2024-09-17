/*
  Warnings:

  - The values [SingleBand,GroupBand,DiscJorkey] on the enum `Event_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `category` ENUM('SINGLEBAND', 'GROUPBAND', 'DISC_JORKEY') NOT NULL;
