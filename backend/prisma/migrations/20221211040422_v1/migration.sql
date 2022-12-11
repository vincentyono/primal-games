/*
  Warnings:

  - You are about to drop the `_userfriends` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_userfriends` DROP FOREIGN KEY `_UserFriends_A_fkey`;

-- DropForeignKey
ALTER TABLE `_userfriends` DROP FOREIGN KEY `_UserFriends_B_fkey`;

-- DropTable
DROP TABLE `_userfriends`;

-- CreateTable
CREATE TABLE `friend_list` (
    `id` VARCHAR(191) NOT NULL,
    `a_id` VARCHAR(191) NOT NULL,
    `b_id` VARCHAR(191) NOT NULL,
    `accepted` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `game_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `friend_list` ADD CONSTRAINT `friend_list_a_id_fkey` FOREIGN KEY (`a_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friend_list` ADD CONSTRAINT `friend_list_b_id_fkey` FOREIGN KEY (`b_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
