<?php
$user=$_GET['user'];
$pass=$_GET['pass'];

if($user=='blue' && $pass=='123456')
{
	echo '{error: 0, desc: "登录成功"}';
}
else
{
	echo '{error: 1, desc: "用户名或密码错误"}';
}
?>