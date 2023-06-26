-- AddForeignKey
ALTER TABLE `city` ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`country_id`) REFERENCES `country`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
