/*
  Warnings:

  - Added the required column `profile_type` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` ADD COLUMN `profile_type` ENUM('host', 'artist') NOT NULL;
