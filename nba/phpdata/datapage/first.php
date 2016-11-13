<?php
	include "com.php";
	date_default_timezone_set("Asia/Hong_Kong");
	$type=$_POST['type'];
	
	//$type='addfirst';
	$times=$_POST['times'];

	//insert
	$league=$_POST['league'];
	$ptime=$_POST['ptime'];
	$hometeam=$_POST['hometeam'];
	$hC=$_POST['hC'];
	$hPF=$_POST['hPF'];
	$hSF=$_POST['hSF'];
	$hSG=$_POST['hSG'];
	$hPG=$_POST['hPG'];
	$guestteam=$_POST['guestteam'];
	$gC=$_POST['gC'];
	$gPF=$_POST['gPF'];
	$gSF=$_POST['gSF'];
	$gSG=$_POST['gSG'];
	$gPG=$_POST['gPG'];
	$id=$_POST['id'];
	//$times='2016-03-05';

	//$type='default';
	switch ($type) {
		case 'default':
			//先查询first这个表有没有当天的数据 没有就添加有就忽略

			//一定要先添加赛程再进入首发的那个页面
			$isExist=mysql_fetch_array(mysql_query("SELECT * FROM first WHERE playtime like '%$times%'"));
			if(!$isExist){ //如果没有查到就添加
				$selectsql="SELECT * FROM basketball_agena WHERE ptime like '%$times%' order by ptime desc";
				$query=mysql_query($selectsql) or die('查询错误'.mysql_error());
				echo '{"respondMsg":"0"}';
				$i=0;
				$result=array();
				while($row=mysql_fetch_array($query)){
					//echo $row;
					$hometeam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["homeid"]."'")) or die("查询主队失败:".mysql_error());
					$guestteam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["guestid"]."'")) or die("查询客队失败:".mysql_error());

					$into="INSERT INTO first ( 
						league ,playtime,hometeam,hC,hPF,hSF,hSG,hPG,guestteam,gC,gPF,gSF,gSG,gPG
						) VALUES (
						'".$row["league"]."','".$row["ptime"]."','".$hometeam["team"]."','' , ''
						 ,'' ,'', '', '".$guestteam["team"]."','', '', '','', ''
						)";
					
					mysql_query($into) or die("插入错误:".mysql_error());
					$i++;
				};
			}else{ //如果有了 就展示出来
				$selectFirst="SELECT * FROM first WHERE playtime like '%$times%' order by playtime desc";
				//$sqllist="SELECT * FROM basketball_team order by lose asc";
				$query=mysql_query($selectFirst) or die("解析错误:".mysql_error());
				$i=0;
				$result=array();
				while($row=mysql_fetch_array($query)){
					$result[$i]="{'id':'".$row["id"]."','league':'".$row["league"]."','hometeam':'".$row["hometeam"]."','hC':'".$row["hC"]."','hPF':'".$row["hPF"]."','hSF':'".$row["hSF"]."','hSG':'".$row["hSG"]."','hPG':'".$row["hPG"]."','guestteam':'".$row["guestteam"]."','gC':'".$row["gC"]."','gPF':'".$row["gPF"]."','gSF':'".$row["gSF"]."','gSG':'".$row["gSG"]."','gPG':'".$row["gPG"]."','playtime':'".$row["playtime"]."'}";
					$i++;
				};
				$a=json_encode($result);
				echo '{"result":'.$a.',"counts":'.count($result).'}';
			}
			break;
		case 'add':

			$update="UPDATE first SET league='".$league."',playtime='".$ptime."',hometeam='".$hometeam."',hC='".$hC."',hPF='".$hPF."',hSF='".$hSF."',hSG='".$hSG."',hPG='".$hPG."',guestteam='".$guestteam."',gC='".$gC."',gPF='".$gPF."',gSF='".$gSF."',gSG='".$gSG."',gPG='".$gPG."' WHERE id=".$id;

			$query=mysql_query($update) or die("更新失败:".mysql_error());

			if($query){
				echo_status(array('code'=>'0','msg'=>'更新成功'));	
			}else{
				echo_status(array('code'=>'1','msg'=>'更新失败'));	
			}


		break;
		default:
			# code...
			break;
	}
?>