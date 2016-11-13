<?php


include "../phpdata/datapage/com.php";
$type=$_POST['type'];
$searchtype=$_POST['searchtype'];

//"act=NbaInj&team="+oTeam+"&timetable="+oTime.val()+"&reason="+oReason.val()+"&state="+oState.val()+"&player="+oPlayer.val();

switch($type){
	case 'injuries':
		if($searchtype=='times'){
			$sql=" SELECT * FROM injuries_nba order by datetime desc ";
			
		}else{
			$sql=" SELECT * FROM injuries_nba WHERE team='".$searchtype."' order by datetime desc ";	
		} 
		$query=mysql_query($sql) or die("查询失败:".mysql_error());
		$i=0;
		$result=array();
		//echo $query;
		while($row=mysql_fetch_array($query)){
			$result[$i]="{'id':'".$row["id"]."','team':'".$row["team"]."','player':'".$row["player"]."','state':'".$row["state"]."','timetable':'".$row["timetable"]."','reason':'".$row["reason"]."'}";
			$i++;
		};
		
		$a=json_encode($result);
		echo '{"result":'.$a.',"counts":'.count($result).'}';
		
	break;	
}


?>