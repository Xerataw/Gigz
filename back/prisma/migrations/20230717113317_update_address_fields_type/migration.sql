/*
  Warnings:

  - You are about to alter the column `latitude` on the `artist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Float`.
  - You are about to alter the column `longitude` on the `artist` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Float`.
  - You are about to alter the column `latitude` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Float`.
  - You are about to alter the column `longitude` on the `host` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Float`.

*/
-- AlterTable
ALTER TABLE `artist` MODIFY `latitude` FLOAT NULL,
    MODIFY `longitude` FLOAT NULL;

-- AlterTable
ALTER TABLE `host` MODIFY `latitude` FLOAT NULL,
    MODIFY `longitude` FLOAT NULL;
