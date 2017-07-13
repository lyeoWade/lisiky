<?php
	$conn=mysql_connect('localhost','root','') or die("数据库连接失败");
	mysql_select_db('wanan') or die("数据库查询失败".mysql_error());;
	
	
	
	// $conn=mysql_connect('www.ilovenba.cn','wadebing333','74113991') or die("数据库连接失败");
	// mysql_select_db('wadebing333') or die("数据库查询失败".mysql_error());

	mysql_query("SET NAMES UTF8") or die("字符编码设置失败".mysql_error());

	function echo_status($str){

		echo json_encode($str);
		exit;
	};
	function echo_status2($str){
		
		echo json_encode($str);
	};
	//删除
	function deletesfn($table,$ID){
		$deletes=mysql_query("DELETE FROM ".$table." WHERE id = ".$ID."") or die('删除失败'.mysql_error());
		if($deletes){
			echo_status(array('msg'=>'删除成功','code'=>'0'));	
		}else{
			echo_status(array('msg'=>'删除失败','code'=>'1'));	
		};
	};	

?>