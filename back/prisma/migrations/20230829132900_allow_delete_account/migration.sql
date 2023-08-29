-- DropForeignKey
ALTER TABLE `artist` DROP FOREIGN KEY `artist_ibfk_2`;

-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `conversation_ibfk_1`;

-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `conversation_ibfk_2`;

-- DropForeignKey
ALTER TABLE `conversation` DROP FOREIGN KEY `conversation_ibfk_3`;

-- DropForeignKey
ALTER TABLE `gallery` DROP FOREIGN KEY `gallery_ibfk_1`;

-- DropForeignKey
ALTER TABLE `host` DROP FOREIGN KEY `host_ibfk_4`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_ibfk_1`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_ibfk_2`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_ibfk_3`;

-- AlterTable
ALTER TABLE `gallery` MODIFY `account_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `artist` ADD CONSTRAINT `artist_ibfk_2` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `host` ADD CONSTRAINT `host_ibfk_4` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gallery` ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `conversation_ibfk_3` FOREIGN KEY (`latest_message_id`) REFERENCES `message`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_3` FOREIGN KEY (`conversation_id`) REFERENCES `conversation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
