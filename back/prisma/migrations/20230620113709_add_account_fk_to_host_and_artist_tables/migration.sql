/*
  Warnings:

  - Added the required column `account_id` to the `artist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `host` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `artist` ADD COLUMN `account_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `host` ADD COLUMN `account_id` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `account_id` ON `artist`(`account_id`);

-- CreateIndex
CREATE INDEX `account_id` ON `host`(`account_id`);

-- AddForeignKey
ALTER TABLE `artist` ADD CONSTRAINT `artist_account_id_fk` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `host` ADD CONSTRAINT `host_account_id_fk` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
