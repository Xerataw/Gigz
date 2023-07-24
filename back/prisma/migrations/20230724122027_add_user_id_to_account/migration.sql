/*
  Warnings:

  - Added the required column `user_id` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profile_pictures` DROP FOREIGN KEY `profile_pictures_ibfk_1`;

-- AlterTable
ALTER TABLE `account` ADD COLUMN `user_id` VARCHAR(36) NOT NULL;

-- AlterTable
ALTER TABLE `profile_pictures` MODIFY `account_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `profile_pictures` ADD CONSTRAINT `profile_pictures_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
