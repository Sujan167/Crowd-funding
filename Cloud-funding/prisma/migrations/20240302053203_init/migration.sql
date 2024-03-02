-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contactNumber` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `avatarURL` VARCHAR(191) NULL,
    `suspended` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_contactNumber_key`(`contactNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `panNumber` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `equityAmount` DOUBLE NOT NULL,
    `equityPercentage` DOUBLE NOT NULL,
    `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(1024) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `companyDescription` VARCHAR(2048) NOT NULL,
    `establishment` DATETIME(3) NOT NULL,
    `valuation` DOUBLE NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `userRefId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Company_panNumber_key`(`panNumber`),
    PRIMARY KEY (`panNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Proposal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRefId` VARCHAR(191) NOT NULL,
    `companyPan` VARCHAR(191) NOT NULL,
    `equityPercentage` DOUBLE NOT NULL,
    `equityAmount` DOUBLE NOT NULL,
    `proposalTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Charity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `amountRaised` DOUBLE NULL,
    `charityAmount` DOUBLE NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `userRefId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Intrested` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userRefId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_userRefId_fkey` FOREIGN KEY (`userRefId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Proposal` ADD CONSTRAINT `Proposal_userRefId_fkey` FOREIGN KEY (`userRefId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Charity` ADD CONSTRAINT `Charity_userRefId_fkey` FOREIGN KEY (`userRefId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Intrested` ADD CONSTRAINT `Intrested_userRefId_fkey` FOREIGN KEY (`userRefId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
