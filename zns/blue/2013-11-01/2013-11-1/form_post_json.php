<?php
$user=$_GET['user'];
$pass=$_GET['pass'];
$cb=$_GET['cb'];

if($user=='blue' && $pass=='123456')
{
	echo $cb.'({error: 0, desc: "登录成功"})';
}
else
{
	echo $cb.'({error: 1, desc: "用户名或密码错误"})';
}
?>