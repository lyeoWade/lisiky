<?php
$act=$_GET['act'];
$user=$_GET['user'];
$pass=$_GET['pass'];

mysql_connect('localhost', 'root', '');
mysql_select_db('20131101');

switch($act)
{
	case 'login':
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
		break;
	case 'add':
		$res=mysql_query("SELECT * FROM user_table WHERE username='".$user."'");
		$row=mysql_fetch_row($res);
		
		if($row)
		{
			echo '{error: 1, desc: "用户名已存在"}';
		}
		else
		{
			mysql_query("INSERT INTO user_table VALUES('".$user."', '".$pass."')");
			
			echo '{error: 0, desc: "注册成功"}';
		}
		break;
	default:
		echo '{error: 1, desc: "参数错误"}';
}






















?>