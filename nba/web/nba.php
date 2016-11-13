<?php
	header('Content-type:text/html;charset=utf-8');
	include "../phpdata/datapage/com.php";
	//格式化时间
	date_default_timezone_set('Asia/Shanghai');
	$datenow=date("H");//获取小时

	$nextday=date("Y-m-d",strtotime('+1 days'));//获取下一天
	
	$act=$_POST['act'];
	$type=$_POST['type'];
	$times=$_POST['time'];
	
	//echo $datenow;
	switch ($act) {
		case 'list':
			if($type=='default'){
				if($datenow>=16){
					//默认列表
				   getNextdata($nextday);
				}else{
					//默认列表
				    getdata($times);
				};
			}else if($type=='click'){
				 getdata($times);
			}
			break;
		default:
			# code...
			break;
	};
	function getNextdata($nextday){

		$sqls="SELECT * FROM basketball_agena WHERE ptime like '%$nextday%'  order by ptime ASC";
	    $getAgenaQuery=mysql_query($sqls) or die("查询失败·:".mysql_error());
	    datas($getAgenaQuery,$nextday);
	};

	function datas($getAgenaQuery,$t){
		$i=0;
		$result=array();
		while($row=mysql_fetch_array($getAgenaQuery)){
			$hometeam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["homeid"]."'")) or die("查询主队失败:".mysql_error());
			$guestteam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["guestid"]."'")) or die("查询客队失败:".mysql_error());
			$hTeam=$hometeam["team"];
			// echo  $hTeam;
			//获取直播地址

			$getOnlineLinkSql=mysql_query("SELECT * FROM online WHERE  PlayTime like '%$t%' and  hteam='".$hTeam."'");

			if($getOnlineLinkSql){
				$getOnlineLink=mysql_fetch_array($getOnlineLinkSql);
			}else{
				$getOnlineLink='';
			}
			//得到默认的第一个地址
			$FirstUrlPos=stripos($getOnlineLink['LiveSignalIn'],'|||');
			//echo $FirstUrlPos;

			$FirstUrl=substr($getOnlineLink['LiveSignalIn'],0,$FirstUrlPos);
			//echo $FirstUrl;
			//比分 四节之和
			$homescore=$row["firsthomescore"]+$row["secondhomescore"]+$row["thirdhomescore"]+$row["fourthhomescore"]+$row["hot1"]+$row["hot2"]+$row["hot3"]+$row["hot4"]+$row["hot5"];
			$guestscore=$row["firstguestscore"]+$row["secondguestscore"]+$row["thirdguestscore"]+$row["fourthguestscore"]+$row["got1"]+$row["got2"]+$row["got3"]+$row["got4"]+$row["got5"];
			 $result[$i]="{'id':'".$row["id"]."','league':'".$row["league"]."',
			 	'hometeam':'".$hometeam["team"]."','hometeamLink':'".$hometeam["homelink"]."',
			 	'guestteam':'".$guestteam["team"]."','guestteamLink':'".$guestteam["homelink"]."',
			 	'homelogo':'".$hometeam["logo"]."','guestlogo':'".$guestteam["logo"]."','ptime':'".$row["ptime"]."',
			 	'l1':'".$row["l1"]."','b1':'".$row["b1"]."',
			 	'analysis':'".$row["analysis"]."','homescore':'".$homescore."','guestscore':'".$guestscore."','isend':'".$row["isend"]."','onlineId':'".$getOnlineLink["id"]."','onlineLink':'".$FirstUrl."'}";
			$i++;
		};
		$a=json_encode($result);
		echo '{"result":'.$a.',"counts":'.count($result).'}';
	};
	function getdata($times){
		$sqls="SELECT * FROM basketball_agena WHERE ptime like '%$times%'  order by ptime ASC";
	    $getAgenaQuery=mysql_query($sqls) or die("查询失败·:".mysql_error());
		datas($getAgenaQuery,$times);
	};
?>