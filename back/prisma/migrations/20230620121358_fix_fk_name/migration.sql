-- DropForeignKey
ALTER TABLE `artist` DROP FOREIGN KEY `artist_account_id_fk`;

-- DropForeignKey
ALTER TABLE `host` DROP FOREIGN KEY `host_account_id_fk`;

-- AddForeignKey
ALTER TABLE `artist` ADD CONSTRAINT `artist_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `host` ADD CONSTRAINT `host_ibfk_4` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `artist` RENAME INDEX `account_id` TO `artist_ibfk_2`;

-- RenameIndex
ALTER TABLE `host` RENAME INDEX `account_id` TO `host_ibfk_4`;
