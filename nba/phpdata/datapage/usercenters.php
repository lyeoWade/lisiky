<?php
	
	session_start();
	
	include('../datapage/com.php');
	header("Content-type:text/html;charset=utf-8");
	
	
	if($_SESSION['username']==''){
		//echo $_SESSION['username'];
		echo '{error:1,des:"非法登录！！！"}';
	}else{
		echo '{error:0,des:"'.$_SESSION['username'].'"}';
	}
?>