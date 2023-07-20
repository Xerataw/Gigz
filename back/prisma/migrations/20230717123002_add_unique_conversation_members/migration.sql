/*
  Warnings:

  - A unique constraint covering the columns `[creator_id,member_id]` on the table `conversation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `creator_id_member_id` ON `conversation`(`creator_id`, `member_id`);
