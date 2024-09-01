/*
  Warnings:

  - The values [Music Experience,Event Organizer] on the enum `User_userType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `userType` ENUM('Experience', 'Organizer') NOT NULL;
