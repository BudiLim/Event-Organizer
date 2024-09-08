/*
  Warnings:

  - You are about to drop the `PointsHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PointsHistory` DROP FOREIGN KEY `PointsHistory_userId_fkey`;

-- DropTable
DROP TABLE `PointsHistory`;
