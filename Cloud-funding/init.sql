-- MySQL dump 10.13  Distrib 8.2.0, for macos12.6 (x86_64)
--
-- Host: localhost    Database: cloud_funding
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('3d8bde63-be49-40f5-9595-524f7bd4f2f3','6f40a6e449dd0c66b7b03c5767249ff7dbd53cc557de8e225a4030068b82f781','2024-03-01 23:11:24.905','20240301231124_init2',NULL,NULL,'2024-03-01 23:11:24.739',1),('730a3f90-dadf-45dd-a9f9-898ee7c4b87d','166e676b3b49f00a04ef67b9aed54f75c4ad8a395e4f5860c1e9da31b90d569b','2024-03-01 23:11:23.130','20240301223654_init',NULL,NULL,'2024-03-01 23:11:22.269',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Charity`
--

DROP TABLE IF EXISTS `Charity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Charity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amountRaised` double DEFAULT NULL,
  `charityAmount` double NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userRefId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Charity_userRefId_fkey` (`userRefId`),
  CONSTRAINT `Charity_userRefId_fkey` FOREIGN KEY (`userRefId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Charity`
--

LOCK TABLES `Charity` WRITE;
/*!40000 ALTER TABLE `Charity` DISABLE KEYS */;
/*!40000 ALTER TABLE `Charity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Company`
--

DROP TABLE IF EXISTS `Company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Company` (
  `panNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `equityAmount` double NOT NULL,
  `equityPercentage` double NOT NULL,
  `startDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `description` varchar(1024) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` datetime(3) NOT NULL,
  `endDate` datetime(3) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `companyDescription` varchar(2048) COLLATE utf8mb4_unicode_ci NOT NULL,
  `establishment` datetime(3) NOT NULL,
  `valuation` double NOT NULL,
  `document` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` tinyint(1) NOT NULL DEFAULT '0',
  `userRefId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`panNumber`),
  UNIQUE KEY `Company_panNumber_key` (`panNumber`),
  KEY `Company_userRefId_fkey` (`userRefId`),
  CONSTRAINT `Company_userRefId_fkey` FOREIGN KEY (`userRefId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Company`
--

LOCK TABLES `Company` WRITE;
/*!40000 ALTER TABLE `Company` DISABLE KEYS */;
INSERT INTO `Company` VALUES ('12426721222','Emergency Funding xitto',150000,40,'2024-03-01 23:12:28.735','Full description about the company','2024-03-01 23:12:28.735','2024-02-01 18:15:00.000','Company Name','https://res.cloudinary.com/dbqbgk6td/image/upload/v1709318283/logo/yn22tinuwxtksxxzjlmt.jpg','Company description','2019-12-31 18:15:00.000',100,'https://res.cloudinary.com/dbqbgk6td/image/upload/v1709318477/pdf/elnkunaixlrczkn2rmx2.pdf',0,'clt99qwlp00012isq68joefoe'),('12426722','Emergency Funding xitto2',150000,40,'2024-03-01 23:12:39.239','Full description about the company','2024-03-01 23:12:39.239','2024-02-01 18:15:00.000','Company Name','https://res.cloudinary.com/dbqbgk6td/image/upload/v1709318283/logo/yn22tinuwxtksxxzjlmt.jpg','Company description','2019-12-31 18:15:00.000',100,'https://res.cloudinary.com/dbqbgk6td/image/upload/v1709318477/pdf/elnkunaixlrczkn2rmx2.pdf',0,'clt99qwlp00012isq68joefoe'),('12426724','Emergency Funding xitto3',150000,40,'2024-03-01 23:16:32.899','Full description about the company','2024-03-01 23:17:34.226','2024-02-01 18:15:00.000','Company Name','https://res.cloudinary.com/dbqbgk6td/image/upload/v1709318283/logo/yn22tinuwxtksxxzjlmt.jpg','Company description','2019-12-31 18:15:00.000',100,'https://res.cloudinary.com/dbqbgk6td/image/upload/v1709318477/pdf/elnkunaixlrczkn2rmx2.pdf',1,'clt99qv2200002isqpwqljk5e');
/*!40000 ALTER TABLE `Company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Proposal`
--

DROP TABLE IF EXISTS `Proposal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Proposal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userRefId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `equityPercentage` double NOT NULL,
  `equityAmount` double NOT NULL,
  `proposalTime` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `companyPan` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Proposal_userRefId_fkey` (`userRefId`),
  CONSTRAINT `Proposal_userRefId_fkey` FOREIGN KEY (`userRefId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Proposal`
--

LOCK TABLES `Proposal` WRITE;
/*!40000 ALTER TABLE `Proposal` DISABLE KEYS */;
INSERT INTO `Proposal` VALUES (1,'clt99qwlp00012isq68joefoe',10,1000,'2024-03-01 23:12:07.724','12426721222');
/*!40000 ALTER TABLE `Proposal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contactNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('ADMIN','USER') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  `avatarURL` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `suspended` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_contactNumber_key` (`contactNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('clt99qv2200002isqpwqljk5e','Admin Parsad','itsmeyoursujan@gmail.com','123456789','$2b$10$XlRb./CoTVWMYsE1VnmWVOuLsaw38QXcw25dOwwFMIy1xHz5rcFRm','ADMIN','2024-03-01 23:11:39.194','2024-03-01 23:11:39.194',NULL,0),('clt99qwlp00012isq68joefoe','A B','test123@gmail.com','1233','$2b$10$7kK9qPX5qgOKOkLgt5YdvOaJDymL37e4rOnKf8F41twXsXobniKHK','USER','2024-03-01 23:11:41.198','2024-03-01 23:11:41.198',NULL,0);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-02  5:43:56
