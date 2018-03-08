-- MySQL dump 10.13  Distrib 5.5.57, for debian-linux-gnu (x86_64)
--
-- Host: 0.0.0.0    Database: my_schema
-- ------------------------------------------------------
-- Server version	5.5.57-0ubuntu0.14.04.1

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
-- Table structure for table `tl`
--

DROP TABLE IF EXISTS `tl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tl` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `TLdate` varchar(20) DEFAULT NULL,
  `name` varchar(80) DEFAULT NULL,
  `topic` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tl`
--

LOCK TABLES `tl` WRITE;
/*!40000 ALTER TABLE `tl` DISABLE KEYS */;
INSERT INTO `tl` VALUES (1,'2017-01-06','Dr.Swarna Ravindra Babu(Founder & CEO) Coovum Smart system & Service pvt ltd. ch','Internet of Things'),(2,'2017-01-12','Ms.Jasmine Folz (AUKBC) Research, MIT, Chennai','Anthropology & FOSS'),(3,'2017-02-06','Mr.Sivakumar, Bangalore','Analytics & Banking'),(4,'2017-03-17','Dr.G.Sudha Sadasivam, PSG College of Technology, Coimbatore','Cloud Computing'),(5,'2017-03-17','Mr.Felix Manosh(CEO), Flixy Games Pvt. Ltd.','Virtual Workshop'),(6,'2017-03-17','Mr.Anirudh Kasturi, Seniour Game Developer, Flixy Games Pvt Ltd.','Game Designing & Devlopment'),(7,'2017-03-17','Siddrathan Denamsetti(Founder), TeamSID, Flixy Games Pvt Ltd.','Augmented Reality'),(8,'2017-08-02','Zahid Vaseen, Pallavi Kar','Technical Session in MATLAB'),(9,'2017-08-10','Krishna Prasanth','University Engg.Management'),(10,'2017-08-24','K.Valliganthan','Short Film Development'),(11,'2017-09-13','Vikram Kumar','Application of MATLAB to Various Streams of Engg.');
/*!40000 ALTER TABLE `tl` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-03-08  9:21:34
