-- AlterTable
ALTER TABLE `host` MODIFY `name` VARCHAR(255) NULL,
    MODIFY `capacity_id` INTEGER NULL,
    MODIFY `host_type_id` INTEGER NULL,
    MODIFY `address` VARCHAR(255) NULL,
    MODIFY `city_id` INTEGER NULL;
