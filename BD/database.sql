-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: localhost    Database: LavalExperienceDB
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ei_feedback`
--

DROP TABLE IF EXISTS `ei_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ei_feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `sanction_given` varchar(45) DEFAULT NULL,
  `pretask_form` varchar(500) DEFAULT NULL,
  `posttask_forms` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ei_feedback`
--

LOCK TABLES `ei_feedback` WRITE;
/*!40000 ALTER TABLE `ei_feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `ei_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ei_feelings_screenshots`
--

DROP TABLE IF EXISTS `ei_feelings_screenshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ei_feelings_screenshots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `feeling` varchar(45) DEFAULT NULL,
  `source` longtext,
  `date` datetime DEFAULT NULL,
  `emotion_detected` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ei_feelings_screenshots`
--

LOCK TABLES `ei_feelings_screenshots` WRITE;
/*!40000 ALTER TABLE `ei_feelings_screenshots` DISABLE KEYS */;
/*!40000 ALTER TABLE `ei_feelings_screenshots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ei_reactions_screenshots`
--

DROP TABLE IF EXISTS `ei_reactions_screenshots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ei_reactions_screenshots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `seconds_after_reveal` int(11) DEFAULT NULL,
  `source` longtext COLLATE utf8_unicode_ci,
  `date` datetime DEFAULT NULL,
  `emotion_detected` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ei_reactions_screenshots`
--

LOCK TABLES `ei_reactions_screenshots` WRITE;
/*!40000 ALTER TABLE `ei_reactions_screenshots` DISABLE KEYS */;
/*!40000 ALTER TABLE `ei_reactions_screenshots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ei_results`
--

DROP TABLE IF EXISTS `ei_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ei_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `task_questions` varchar(500) DEFAULT NULL,
  `task_answers` varchar(500) DEFAULT NULL,
  `task_cheats` varchar(500) DEFAULT NULL,
  `time_to_answer` varchar(500) DEFAULT NULL,
  `second_trial` tinyint(4) NOT NULL DEFAULT '0',
  `sanction_given` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ei_results`
--

LOCK TABLES `ei_results` WRITE;
/*!40000 ALTER TABLE `ei_results` DISABLE KEYS */;
/*!40000 ALTER TABLE `ei_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kayahararesults`
--

DROP TABLE IF EXISTS `kayahararesults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kayahararesults` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `videoname` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `videotype` varchar(15) DEFAULT NULL,
  `input` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dateExperience` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kayahararesults`
--

LOCK TABLES `kayahararesults` WRITE;
/*!40000 ALTER TABLE `kayahararesults` DISABLE KEYS */;
/*!40000 ALTER TABLE `kayahararesults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kayaharavideos`
--

DROP TABLE IF EXISTS `kayaharavideos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kayaharavideos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `changement` tinyint(1) NOT NULL,
  `changementTime` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kayaharavideos`
--

LOCK TABLES `kayaharavideos` WRITE;
/*!40000 ALTER TABLE `kayaharavideos` DISABLE KEYS */;
/*!40000 ALTER TABLE `kayaharavideos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(10) NOT NULL,
  `email` varchar(60) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `userStatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-08 15:15:08
