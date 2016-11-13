<?php
include "../phpdata/datapage/com.php";
$act=$_POST["act"];

switch($act){
	case 'click':
		//$zsql="SELECT * FROM clicks  WHERE id= ".$page;
		//$sql = "UPDATE `表` SET `字段` = 字段+1 WHERE `id` = ".$id;
		// 更新浏览量
		mysql_query("UPDATE clicks SET Clicks=Clicks+1  WHERE id = 1");
		
		echo $act;
	break;
}
?>