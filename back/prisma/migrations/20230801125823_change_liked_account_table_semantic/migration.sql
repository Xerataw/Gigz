/*
  Warnings:

  - You are about to drop the column `liked_account` on the `liked_account` table. All the data in the column will be lost.
  - You are about to drop the column `liker_account` on the `liked_account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[liker_account_id,liked_account_id]` on the table `liked_account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `liked_account_id` to the `liked_account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `liker_account_id` to the `liked_account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `liked_account` DROP FOREIGN KEY `liked_account_ibfk_1`;

-- DropForeignKey
ALTER TABLE `liked_account` DROP FOREIGN KEY `liked_account_ibfk_2`;

-- DropIndex
DROP INDEX `liker_account_liked_account` ON `liked_account`;

-- AlterTable
ALTER TABLE `liked_account` DROP COLUMN `liked_account`,
    DROP COLUMN `liker_account`,
    ADD COLUMN `liked_account_id` INTEGER NOT NULL,
    ADD COLUMN `liker_account_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `liked_account` ON `liked_account`(`liked_account_id`);

-- CreateIndex
CREATE UNIQUE INDEX `liker_account_liked_account` ON `liked_account`(`liker_account_id`, `liked_account_id`);

-- AddForeignKey
ALTER TABLE `liked_account` ADD CONSTRAINT `liked_account_ibfk_1` FOREIGN KEY (`liker_account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `liked_account` ADD CONSTRAINT `liked_account_ibfk_2` FOREIGN KEY (`liked_account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
