/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Account`;

-- CreateTable
CREATE TABLE `account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `creation_date` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `phone_number` VARCHAR(255) NOT NULL,
    `email_validated` TINYINT NOT NULL DEFAULT 0,

    UNIQUE INDEX `Account_email_key`(`email`),
    UNIQUE INDEX `phone_number`(`phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `genre_id` INTEGER NOT NULL,

    INDEX `genre_id`(`genre_id`),
    UNIQUE INDEX `account_id_genre_id`(`account_id`, `genre_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artist` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NULL,
    `spotify_link` VARCHAR(255) NULL,
    `instagram_link` VARCHAR(255) NULL,
    `facebook_link` VARCHAR(255) NULL,
    `soundcloud_link` VARCHAR(255) NULL,
    `youtube_link` VARCHAR(255) NULL,
    `apple_music_link` VARCHAR(255) NULL,
    `website_link` VARCHAR(255) NULL,
    `deezer_link` VARCHAR(255) NULL,
    `city_id` INTEGER NULL,

    INDEX `city_id`(`city_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capacity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `max` INTEGER UNSIGNED NOT NULL,
    `color` VARCHAR(7) NOT NULL,
    `bg_color` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `host` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NULL,
    `website_link` VARCHAR(255) NULL,
    `facebook_link` VARCHAR(255) NULL,
    `instagram_link` VARCHAR(255) NULL,
    `capacity_id` INTEGER NOT NULL,
    `host_type_id` INTEGER NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `city_id` INTEGER NOT NULL,

    INDEX `capacity_id`(`capacity_id`),
    INDEX `host_type_id`(`host_type_id`),
    INDEX `city_id`(`city_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `host_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `color` VARCHAR(7) NOT NULL,
    `bg_color` VARCHAR(7) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `liked_account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `liker_account` INTEGER NOT NULL,
    `liked_account` INTEGER NOT NULL,

    INDEX `liked_account`(`liked_account`),
    UNIQUE INDEX `liker_account_liked_account`(`liker_account`, `liked_account`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invisible_mode` TINYINT NOT NULL DEFAULT 0,
    `dark_mode` ENUM('enabled', 'disabled', 'auto') NOT NULL DEFAULT 'disabled',
    `account_id` INTEGER NOT NULL,

    INDEX `account_id`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `latitude` DECIMAL(10, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    INDEX `country_region_name`(`country_id`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `code` VARCHAR(10) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account_genre` ADD CONSTRAINT `account_genre_ibfk_3` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_genre` ADD CONSTRAINT `account_genre_ibfk_4` FOREIGN KEY (`genre_id`) REFERENCES `genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artist` ADD CONSTRAINT `artist_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `host` ADD CONSTRAINT `host_ibfk_1` FOREIGN KEY (`capacity_id`) REFERENCES `capacity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `host` ADD CONSTRAINT `host_ibfk_2` FOREIGN KEY (`host_type_id`) REFERENCES `host_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `host` ADD CONSTRAINT `host_ibfk_3` FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `liked_account` ADD CONSTRAINT `liked_account_ibfk_1` FOREIGN KEY (`liker_account`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `liked_account` ADD CONSTRAINT `liked_account_ibfk_2` FOREIGN KEY (`liked_account`) REFERENCES `account`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `settings` ADD CONSTRAINT `settings_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
