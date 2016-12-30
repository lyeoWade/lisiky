<?php
$user=$_GET['user'];
$pass=$_GET['pass'];

//1.连接
mysql_connect('localhost', 'root', '');

//2.选择库
mysql_select_db('20131101');

//3.请求
$res=mysql_query("SELECT * FROM user_table WHERE username='".$user."'");

//4.接收
if($res)
{
	$row=mysql_fetch_row($res);
}

if($row)
{
	if($pass==$row[1])
	{
		echo '{error: 0, desc: "登录成功"}';
	}
	else
	{
		echo '{error: 1, desc: "用户名或密码有误"}';
	}
}
else
{
	//没找到数据
	echo '{error: 1, desc: "用户名不存在"}';
}






















?>