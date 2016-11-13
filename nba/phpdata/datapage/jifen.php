<?php

include "com.php";
//data:"act=addScore&team="+oTeam.val()+"&number="+oNumber.val()+"&score="+oScore.val()+"&win="+oWin.val()+"&ping="+oPingju.val()+"&lose="+oLose.val()+"&ballin="+oBallin.val()+"&loseball="+oLoseball.val()+"&winball="+oWinball.val()+"&league="+oLeague+"&season="+oSeason+""
$act=$_POST["act"];
$team=$_POST["team"];
$number=$_POST["number"];
$score=$_POST["score"];
$win=$_POST["win"];
$ping=$_POST["ping"];
$lose=$_POST["lose"];
$ballin=$_POST["ballin"];
$loseball=$_POST["loseball"];
$winball=$_POST["winball"];
$league=$_POST["league"];
$season=$_POST["season"];

switch($act){
	case 'addScore': //添加
		
		$sql="INSERT INTO jifen ( 
		team , num , Integral  , win , ping , lose , ball ,loseball , winball,league ,season
		) VALUES ( 
		'{$team}','{$number}','{$score}','{$win}' , '{$ping}' ,'{$lose}' , '{$ballin}', '{$loseball}', '{$winball}', '{$league}', '{$season}'
		)";
		
		$error=mysql_query($sql) or die("插入错误:".mysql_error());
		
		if($error){
			echo '"发布成功"';
		}else{
			echo '"发布失败"';
		}
	break;
}


?>