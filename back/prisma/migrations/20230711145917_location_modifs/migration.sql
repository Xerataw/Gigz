/*
  Warnings:

  - You are about to drop the column `city_id` on the `artist` table. All the data in the column will be lost.
  - You are about to drop the column `city_id` on the `host` table. All the data in the column will be lost.
  - You are about to drop the `city` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `artist` DROP FOREIGN KEY `artist_ibfk_1`;

-- DropForeignKey
ALTER TABLE `host` DROP FOREIGN KEY `host_ibfk_3`;

-- AlterTable
ALTER TABLE `artist` DROP COLUMN `city_id`,
    ADD COLUMN `city` VARCHAR(255) NULL,
    ADD COLUMN `latitude` VARCHAR(255) NULL,
    ADD COLUMN `longitude` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `host` DROP COLUMN `city_id`,
    ADD COLUMN `city` VARCHAR(255) NULL,
    ADD COLUMN `latitude` VARCHAR(255) NULL,
    ADD COLUMN `longitude` VARCHAR(255) NULL;

-- DropTable
DROP TABLE `city`;
