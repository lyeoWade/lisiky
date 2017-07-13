<?php
	session_start();
	include('../php/com.php');
	//header("Content-type:text/html;charset=utf-8");
	$mobile=$_POST['mobile'];
	$password=$_POST['password'];
	
	$checkname=mysql_query("SELECT * FROM username WHERE phone='".$mobile."'") or die("对比失败:".mysql_error());
	
	$log_row=mysql_fetch_array($checkname);
	if($log_row){
		if($password==$log_row[4]){
			echo '{error:0,des:"登陆成功,跳转中...",username:"'.$log_row['name'].'",phone:"'.$log_row['phone'].'",id:"'.$log_row['id'].'"}';
			$_SESSION['username']=$username;
			$_SESSION['pwd']=$log_row[4];
		}else{
			echo '{error:1,des:"密码错误"}';
		}
	}else{
		echo '{error:1,des:"没有此用户!!!"}';
	}
?>