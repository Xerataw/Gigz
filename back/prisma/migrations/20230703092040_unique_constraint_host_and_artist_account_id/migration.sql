/*
  Warnings:

  - A unique constraint covering the columns `[account_id]` on the table `artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id]` on the table `host` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `account_id` ON `artist`(`account_id`);

-- CreateIndex
CREATE UNIQUE INDEX `account_id` ON `host`(`account_id`);
