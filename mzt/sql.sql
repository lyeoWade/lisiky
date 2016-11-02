-- phpMyAdmin SQL Dump
-- version 2.11.6
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 09 月 06 日 14:47
-- 服务器版本: 5.0.51
-- PHP 版本: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- 数据库: `dqt`
--

-- --------------------------------------------------------

--
-- 表的结构 `imagearr`
--

CREATE TABLE `imagearr` (
  `id` int(11) NOT NULL auto_increment,
  `title` varchar(100) NOT NULL,
  `columns` varchar(2) NOT NULL,
  `pushtime` datetime NOT NULL,
  `frequency` int(10) NOT NULL,
  `coverpic` varchar(255) NOT NULL,
  `pic` text NOT NULL,
  `tag` varchar(10) NOT NULL,
  `note` varchar(12) NOT NULL,
  `user` varchar(15) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `imagearr`
--


-- --------------------------------------------------------

--
-- 表的结构 `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(10) NOT NULL,
  `ename` varchar(20) NOT NULL,
  `createTime` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `tag`
--

