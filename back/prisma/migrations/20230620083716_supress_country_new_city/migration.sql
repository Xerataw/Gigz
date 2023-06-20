/*
  Warnings:

  - You are about to drop the column `country_id` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `city` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `city` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(45)`.
  - You are about to drop the `country` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `artist` DROP FOREIGN KEY `artist_ibfk_1`;

-- DropForeignKey
ALTER TABLE `city` DROP FOREIGN KEY `city_ibfk_1`;

-- DropForeignKey
ALTER TABLE `host` DROP FOREIGN KEY `host_ibfk_3`;

-- DropIndex
DROP INDEX `country_region_name` ON `city`;

-- AlterTable
ALTER TABLE `account` MODIFY `phone_number` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `city` DROP COLUMN `country_id`,
    DROP COLUMN `latitude`,
    DROP COLUMN `longitude`,
    ADD COLUMN `latitude_deg` FLOAT NULL,
    ADD COLUMN `latitude_dms` VARCHAR(8) NULL,
    ADD COLUMN `latitude_grd` VARCHAR(8) NULL,
    ADD COLUMN `longitude_deg` FLOAT NULL,
    ADD COLUMN `longitude_dms` VARCHAR(9) NULL,
    ADD COLUMN `longitude_grd` VARCHAR(9) NULL,
    ADD COLUMN `zip_code` VARCHAR(255) NULL,
    MODIFY `name` VARCHAR(45) NULL;

-- DropTable
DROP TABLE `country`;

-- CreateIndex
CREATE INDEX `ville_code_postal` ON `city`(`zip_code`);

-- CreateIndex
CREATE INDEX `ville_longitude_latitude_deg` ON `city`(`longitude_deg`, `latitude_deg`);

-- CreateIndex
CREATE INDEX `ville_nom_reel` ON `city`(`name`);

-- AddForeignKey
ALTER TABLE `artist` ADD CONSTRAINT `artist_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `host` ADD CONSTRAINT `host_ibfk_3` FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
