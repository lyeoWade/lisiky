
<?php
	
	session_start();
	
	include('../datapage/com.php');
	//header("Content-type:text/html;charset=utf-8");
	$username=$_POST['username'];
	$password=$_POST['password'];
	
	$checkname=mysql_query("SELECT * FROM login_h WHERE username='".$username."'") or die("对比失败:".mysql_error());
	
	$log_row=mysql_fetch_array($checkname);
	if($log_row){
		if($password==$log_row[2]){
			echo '{error:0,des:"登陆成功,跳转中...",username:"'.$username.'",id:"'.$log_row['id'].'"}';
			$_SESSION['username']=$username;
			$_SESSION['pwd']=$log_row[2];
		}else{
			echo '{error:1,des:"密码错误"}';
		}
	}else{
		echo '{error:1,des:"没有此用户!!!"}';
	}
	
	
?>