-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-11-30 11:33:13
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
-- 表的结构 `user_info`
--

CREATE TABLE IF NOT EXISTS `user_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) NOT NULL COMMENT 'openid',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `nickname` varchar(200) NOT NULL COMMENT '昵称',
  `sex` varchar(1) NOT NULL COMMENT '性别',
  `headimgurl` varchar(1000) NOT NULL COMMENT '头像地址',
  `refresh_token` varchar(100) NOT NULL COMMENT 'refresh_token',
  `mcsl` int(11) NOT NULL DEFAULT '0' COMMENT '牧草数量',
  `ljjj` int(11) NOT NULL COMMENT '累计奖金',
  `md5key` varchar(100) NOT NULL COMMENT 'md5分享唯一码',
  `time_create` datetime NOT NULL COMMENT '创建时间',
  `time_update` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid_2` (`openid`),
  KEY `openid` (`openid`),
  KEY `phone` (`phone`),
  KEY `phone_2` (`phone`),
  KEY `md5key` (`md5key`)
) ENGINE=InnoDB  DEFAULT CHARSET=gb2312 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `user_info`
--

INSERT INTO `user_info` (`id`, `openid`, `phone`, `nickname`, `sex`, `headimgurl`, `refresh_token`, `mcsl`, `ljjj`, `md5key`, `time_create`, `time_update`) VALUES
(1, 'sfsfsfsdsf', '15223322863', 'sdfsdfsdfsdfff', '1', 'http://wx.qlogo.cn/mmopen/xnpYjSZNgnuXbrcv3wdrrORicsLQET5cqEciahndUswqnHZfBKaGrfqmBoMaSsD3PkgEv2oicvPWW8iaxNGEf3BpuqpbiaYCbtPicY/0', 'sdfsdfsfsfff', 74269, 0, '', '2016-08-11 00:00:00', '2016-08-24 00:00:00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
