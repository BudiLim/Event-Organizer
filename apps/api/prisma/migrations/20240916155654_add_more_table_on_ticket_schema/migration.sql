-- AlterTable
ALTER TABLE `Ticket` ADD COLUMN `cancellationReason` VARCHAR(191) NULL,
    ADD COLUMN `discountAmount` DOUBLE NULL,
    ADD COLUMN `discountCode` VARCHAR(191) NULL,
    ADD COLUMN `paymentMethod` VARCHAR(191) NULL,
    ADD COLUMN `seatNumber` VARCHAR(191) NULL,
    ADD COLUMN `section` VARCHAR(191) NULL,
    MODIFY `status` ENUM('Active', 'Expired', 'Cancelled') NOT NULL DEFAULT 'Active';
