/*
  Warnings:

  - Made the column `account_id` on table `profile_pictures` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `profile_pictures` DROP FOREIGN KEY `profile_pictures_ibfk_1`;

-- AlterTable
ALTER TABLE `profile_pictures` MODIFY `account_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `profile_pictures` ADD CONSTRAINT `profile_pictures_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
