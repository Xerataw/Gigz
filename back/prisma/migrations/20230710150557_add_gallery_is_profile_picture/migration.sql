/*
  Warnings:

  - You are about to drop the column `profile_picture` on the `artist` table. All the data in the column will be lost.
  - You are about to drop the column `profile_picture` on the `host` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `artist` DROP COLUMN `profile_picture`;

-- AlterTable
ALTER TABLE `gallery` ADD COLUMN `is_profile_picture` TINYINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `host` DROP COLUMN `profile_picture`;
