/*
  Warnings:

  - You are about to drop the column `update_date` on the `conversation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `conversation` DROP COLUMN `update_date`,
    MODIFY `creation_date` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);
