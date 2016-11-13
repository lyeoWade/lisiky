<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>

<body>

<?php
	header("Content-type:text/html;charset=utf-8");
	
	$username=$_POST['username'];
	$password=$_POST['password'];
	$repassword=$_POST['repassword'];
	$qq=$_POST['qq'];
	$email=$_POST['email'];
	$act=$_POST['act'];
	
	$log_name=$_POST["login_name"];
	$log_pass=$_POST["login_pass"];
		
	
	date_default_timezone_set('Asia/Shanghai');
	
	$t=date('Y-m-d H:i:s');
	
	include("../phpdata/datapage/com.php");
	
	
	switch ($act){
		
		case 'reg':
		
		// 判断是否已注册
		$res=mysql_query("SELECT * FROM blong_logon WHERE username='".$username."'") or die("对比失败:".mysql_error());
		
		$row=mysql_fetch_array($res);//依次调用 mysql_fetch_row() 将返回结果集中的下一行，如果没有更多行则返回 FALSE。
		
		if($row){ //找到了 已经注册了
			echo "{error:1,des:'用户名已被注册!'}";	
		}else{
			// 之后注册
			$sql="INSERT INTO blong_logon ( username , password , repassword , QQ , email , regtime ) VALUES ( '{$username}','{$password}','{$repassword}','{$qq}','$email','$t')";
			mysql_query($sql) or die("插入错误:".mysql_error());
			
			echo "{error:0,des:'注册成功'}";
		};
		break;
		
		
		case 'login':
		// 判断是否已注册
		$log_res=mysql_query("SELECT * FROM blong_logon WHERE username='".$log_name."'") or die("对比失败:".mysql_error());
		
		$log_row=mysql_fetch_array($log_res);//依次调用 mysql_fetch_row() 将返回结果集中的下一行，如果没有更多行则返回 FALSE。
		//var_dump($log_row);	
		//setcookie('username',$log_row[1],time()+3600,'/');
		//setcookie('userid',$log_row[0],time()+3600,'/');
		
		if($log_row){ 
			
			if($log_pass==$log_row[2]){

				echo "{error:0,des:'登陆成功!'}";
			}else{
				echo "{error:1,des:'用户名或者密码错误!'}";		
			}
		}else{
			echo "{error:1,des:'对不起,没有此用户!'}";
		};
		
	};
	
		
	
?>

</body>
</html>