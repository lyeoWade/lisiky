-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-11-30 11:51:47
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `syzb_db`
--

-- --------------------------------------------------------

--
-- 表的结构 `db_syzb_js_nh`
--

CREATE TABLE IF NOT EXISTS `db_syzb_js_nh` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID自增',
  `DDMS` varchar(500) NOT NULL COMMENT '订单描述',
  `YHJH` double NOT NULL COMMENT '已优惠价格',
  `FKJH` double NOT NULL COMMENT '付款价格',
  `YDSJ` date NOT NULL COMMENT '预定时间',
  `FKSJ` date NOT NULL COMMENT '付款时间',
  `CJSJ` int(11) NOT NULL COMMENT '成交时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 COMMENT='年货订单表' AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
