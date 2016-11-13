<?php

include "com.php";
date_default_timezone_set('Asia/Shanghai');
	
$t=date('Y-m-d H:i:s');
$type=$_POST['type'];
$team=$_POST['team'];
$player=$_POST['player'];
$timetable=$_POST['timetable'];
$reason=$_POST['reason'];
$state=$_POST['state'];

$ids=$_POST['id'];  

//"act=NbaInj&team="+oTeam+"&timetable="+oTime.val()+"&reason="+oReason.val()+"&state="+oState.val()+"&player="+oPlayer.val();
switch($type){
	case 'NbaInj':
		
		$sql="INSERT INTO injuries_nba ( 
			team , player , state  , reason , timetable ,datetime
		) VALUES ( 
			'{$team}','{$player}','{$state}','{$reason}' , '{$timetable}' , '{$t}'
		)";
		$error=mysql_query($sql) or die("插入错误:".mysql_error());
		if($sql){
			echo '"发布成功"';
		}else{
			echo '"发布失败"';
		}
	break;
	case 'deletes':
			deletesfn('injuries_nba',$ids);
	break;	
}


?>