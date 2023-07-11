/*
  Warnings:

  - You are about to drop the column `is_profile_picture` on the `gallery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `gallery` DROP COLUMN `is_profile_picture`;

-- CreateTable
CREATE TABLE `profile_pictures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `media` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `account_id`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `profile_pictures` ADD CONSTRAINT `profile_pictures_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
