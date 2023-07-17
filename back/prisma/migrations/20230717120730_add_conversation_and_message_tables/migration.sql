-- CreateTable
CREATE TABLE `conversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `creator_id` INTEGER NOT NULL,
    `member_id` INTEGER NOT NULL,
    `creation_date` DATETIME(0) NOT NULL,
    `latest_message_id` INTEGER NULL,
    `update_date` DATETIME(0) NOT NULL,

    INDEX `creator_id`(`creator_id`),
    INDEX `latest_message_id`(`latest_message_id`),
    INDEX `member_id`(`member_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender_id` INTEGER NOT NULL,
    `recipient_id` INTEGER NOT NULL,
    `conversation_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `send_date` DATETIME(0) NOT NULL,
    `seen` TINYINT NOT NULL DEFAULT 0,

    INDEX `conversation_id`(`conversation_id`),
    INDEX `recipient_id`(`recipient_id`),
    INDEX `sender_id`(`sender_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `conversation_ibfk_2` FOREIGN KEY (`member_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `conversation` ADD CONSTRAINT `conversation_ibfk_3` FOREIGN KEY (`latest_message_id`) REFERENCES `message`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`recipient_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `message` ADD CONSTRAINT `message_ibfk_3` FOREIGN KEY (`conversation_id`) REFERENCES `conversation`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
