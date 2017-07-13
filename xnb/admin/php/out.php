<?php
	session_start();
	unset($_SESSION['username']);
	unset($_SESSION['password']);
	
	
	session_destroy();	
	include('../datapage/com.php');
	
	header("Content-type:text/html;charset=utf-8");
	
	echo '{error:0,des:"退出成功！！！"}';
?>