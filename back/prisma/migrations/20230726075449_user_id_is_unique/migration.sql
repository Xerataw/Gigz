/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_id` ON `account`(`user_id`);
