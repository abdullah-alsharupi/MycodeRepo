-- AlterTable
ALTER TABLE `patient` ADD COLUMN `doctorBack` DATETIME(3) NULL,
    ADD COLUMN `gender` ENUM('female', 'male') NULL;
