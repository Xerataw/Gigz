-- CreateTable
CREATE TABLE `gallery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `media` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `account_id_media`(`account_id`, `media`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `gallery` ADD CONSTRAINT `gallery_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
