-- MySQL dump 10.13  Distrib 5.7.31, for Linux (x86_64)
--
-- Host: localhost    Database: LavalExperienceDB
-- ------------------------------------------------------
-- Server version	5.7.31-0ubuntu0.18.04.1

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
-- Table structure for table `KayaharaResults`
--

DROP TABLE IF EXISTS `KayaharaResults`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `KayaharaResults` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `videoname` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `videotype` varchar(15) DEFAULT NULL,
  `input` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `dateExperience` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `KayaharaResults`
--

LOCK TABLES `KayaharaResults` WRITE;
/*!40000 ALTER TABLE `KayaharaResults` DISABLE KEYS */;
INSERT INTO `KayaharaResults` VALUES (33,'grezrzeg','continuous1','continuous','[]','29-07-2020-18:18:50'),(35,'j','','intermittent','[]','29-07-2020-18:20:39'),(36,'j','','intermittent','[]','29-07-2020-18:20:57'),(37,'j','','intermittent','[]','29-07-2020-18:21:01'),(38,'j','intermittent1','intermittent','[{\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"right\"}, {\"time\": 0, \"direction\": \"left\"}, {\"time\": 98.141, \"direction\": \"left\"}]','29-07-2020-18:21:07'),(39,'j','continuous1','continuous','[]','29-07-2020-18:22:44');
/*!40000 ALTER TABLE `KayaharaResults` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `KayaharaVideos`
--

DROP TABLE IF EXISTS `KayaharaVideos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `KayaharaVideos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `changement` tinyint(1) NOT NULL,
  `changementTime` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `KayaharaVideos`
--

LOCK TABLES `KayaharaVideos` WRITE;
/*!40000 ALTER TABLE `KayaharaVideos` DISABLE KEYS */;
INSERT INTO `KayaharaVideos` VALUES (1,'trial1','https://www.youtube.com/watch?v=C6kW-3rSOP8&feature=youtu.be','[\'left\', \'left\', \'right\', \'right\', \'left\', \'right\', \'left\', \'right\', \'left\', \'right\', \'right\', \'left\', \'left\', \'left\', \'left\', \'right\', \'right\', \'left\', \'right\', \'left\', \'left\', \'right\', \'left\', \'right\', \'left\', \'right\', \'left\', \'right\', \'right\', \'left\', \'right\', \'right\', \'left\', \'right\', \'right\', \'right\', \'right\', \'left\', \'right\', \'right\', \'right\', \'right\', \'left\', \'right\', \'right\', \'left\', \'left\', \'left\', \'left\', \'right\']',0,NULL),(2,'intermittent1','https://youtu.be/mlReyrsQ8KI','[\'left\', \'left\', \'left\', \'right\', \'left\', \'right\', \'left\', \'left\', \'right\', \'left\', \'right\', \'left\', \'right\', \'right\', \'left\', \'right\', \'right\', \'right\', \'right\', \'left\', \'right\', \'left\', \'right\', \'right\', \'right\', \'right\', \'left\', \'left\', \'right\', \'right\']',30,NULL),(3,'continuous1','https://youtu.be/D9239f_cea4','[\'left\', \'right\', \'left\', \'right\', \'left\', \'right\']',5,'[129, 292, 828, 954, 1695, 2232]');
/*!40000 ALTER TABLE `KayaharaVideos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `nationality` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `sexe` varchar(10) NOT NULL,
  `age` varchar(20) CHARACTER SET utf32 COLLATE utf32_unicode_ci NOT NULL,
  `main` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `vue` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('j','france','homme','<10','droitier','tbv'),('rzea','france','homme','<10','droitier','tbv'),('test','france','homme','<10','droitier','tbv'),('terezt','france','homme','<10','droitier','tbv'),('grezrzeg','france','homme','<10','droitier','tbv');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-02 12:41:12
