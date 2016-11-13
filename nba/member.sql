-- phpMyAdmin SQL Dump
-- version 2.11.2.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 04 月 26 日 11:05
-- 服务器版本: 5.0.45
-- PHP 版本: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- 数据库: `ilovenba`
--

-- --------------------------------------------------------

--
-- 表的结构 `member`
--

CREATE TABLE `member` (
  `id` int(5) NOT NULL auto_increment,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `repassword` varchar(20) NOT NULL,
  `QQ` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `avatar` varchar(200) NOT NULL,
  `gold` int(200) NOT NULL,
  `integral` int(250) NOT NULL,
  `attention` int(250) NOT NULL,
  `rank` int(20) NOT NULL,
  `warit` varchar(200) NOT NULL,
  `warit2` varchar(200) NOT NULL,
  `warit3` varchar(200) NOT NULL,
  `warit4` varchar(200) NOT NULL,
  `regtime` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=23 ;

--
-- 导出表中的数据 `member`
--

INSERT INTO `member` (`id`, `username`, `password`, `repassword`, `QQ`, `email`, `nickname`, `avatar`, `gold`, `integral`, `attention`, `rank`, `warit`, `warit2`, `warit3`, `warit4`, `regtime`) VALUES
(22, 'wadebing', '111111', '111111', '513632023', '513632023@qq.com', '空杯', '', 5000, 80000, 9985, 5, '', '', '', '', '2016-04-26 16:30:37');
