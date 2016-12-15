<?php
$user=$_GET['user'];
$pass=$_GET['pass'];
$cb=$_GET['cb'];

if($user=='blue' && $pass=='123456')
{
	//echo $cb.'(0, "登录成功")';
	echo $cb.'("0|成功")';
}
else
{
	//echo $cb.'(1, "用户名或密码有误")';
	echo $cb.'("1|用户名或密码有误")';
}
?>