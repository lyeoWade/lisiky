<?php
	header('Cache-control:private,must-revalidate');
	header("Content-type: text/html; charset=utf-8"); 
	
	include "com.php";
	
	$type=$_POST['type'];
	$day=$_POST['day'];
	//赛节
	$firsthomescore=$_POST['firsthomescore'];
	$secondhomescore=$_POST['secondhomescore'];
	$thirdhomescore=$_POST['thirdhomescore'];
	$fourthhomescore=$_POST['fourthhomescore'];
	$firstguestscore=$_POST['firstguestscore'];
	$secondguestscore=$_POST['secondguestscore'];
	$thirdguestscore=$_POST['thirdguestscore'];
	$fourthguestscore=$_POST['fourthguestscore'];



	$hot1=$_POST['hot1'];
	$hot2=$_POST['hot2'];
	$hot3=$_POST['hot3'];
	$hot4=$_POST['hot4'];
	$hot5=$_POST['hot5'];
	$got1=$_POST['got1'];
	$got2=$_POST['got2'];
	$got3=$_POST['got3'];
	$got4=$_POST['got4'];
	$got5=$_POST['got5'];
	$isend=$_POST['isend'];
	//echo $hot1;
	$ids=$_POST['id'];

	//查询修改比分
	$playday=$_POST['playday'];
	switch ($type) {
		case 'getgameList':
			$getgameList="SELECT * FROM basketball_agena WHERE ptime like '%$day%' ";

			$query=mysql_query($getgameList) or die('查询失败'.mysql_error());
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
			 
				$hometeam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["homeid"]."'")) or die("查询主队失败:".mysql_error());
				$guestteam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["guestid"]."'")) or die("查询客队失败:".mysql_error());
				
				//$result[$i]=$hometeam["team"];
				$result[$i]="{'id':'".$row["id"]."','league':'".$row["league"]."','hometeam':'".$hometeam["team"]."','guestteam':'".$guestteam["team"]."','ptime':'".$row["ptime"]."','firsthomescore':'".$row["firsthomescore"]."','secondhomescore':'".$row["secondhomescore"]."','thirdhomescore':'".$row["thirdhomescore"]."','fourthhomescore':'".$row["fourthhomescore"]."','hot1':'".$row["hot1"]."','hot2':'".$row["hot2"]."','hot3':'".$row["hot3"]."','hot4':'".$row["hot4"]."','hot5':'".$row["hot5"]."','firstguestscore':'".$row["firstguestscore"]."','secondguestscore':'".$row["secondguestscore"]."','thirdguestscore':'".$row["thirdguestscore"]."','fourthguestscore':'".$row["fourthguestscore"]."','got1':'".$row["got1"]."','got2':'".$row["got2"]."','got3':'".$row["got3"]."','got4':'".$row["got4"]."','got5':'".$row["got5"]."','isend':'".$row["isend"]."'}"; 	
				$i++;
			}
			//echo $result;
			$a=json_encode($result);
			echo '{"result":'.$a.',"counts":'.count($result).'}';
			break;
		case 'updatescore':
				$updatescore="UPDATE basketball_agena SET firsthomescore='".$firsthomescore."',secondhomescore='".$secondhomescore."',thirdhomescore='".$thirdhomescore."',fourthhomescore='".$fourthhomescore."',hot1='".$hot1."',hot2='".$hot2."',hot3='".$hot3."',hot4='".$hot4."',hot5='".$hot5."',firstguestscore='".$firstguestscore."',secondguestscore='".$secondguestscore."',thirdguestscore='".$thirdguestscore."',fourthguestscore='".$fourthguestscore."',got1='".$got1."',got2='".$got2."',got3='".$got3."',got4='".$got4."',got5='".$got5."',isend='".$isend."' WHERE id=".$ids;	

				$updateGuessList=mysql_query("UPDATE guesslist SET isend = '".$isend."' WHERE  gameid = '".$ids."'");

				

				$upquery=mysql_query($updatescore) or die('更新失败'.mysql_error());
				// echo $upquery;
				if($upquery){
					echo_status(array('code'=>'0','msg'=>'更新成功'));	
				}else{
					echo_status(array('code'=>'1','msg'=>'更新失败'));	
				}
			break;
		case 'searchgame':
				$game="SELECT * FROM basketball_agena WHERE ptime like '%$playday%'";
				$query=mysql_query($game) or die('查询失败'.mysql_error());
				$i=0;
				$result=array();
				while($row=mysql_fetch_array($query)){
				 
					$hometeam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["homeid"]."'")) or die("查询主队失败:".mysql_error());
					$guestteam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["guestid"]."'")) or die("查询客队失败:".mysql_error());
					
					//$result[$i]=$hometeam["team"];
					$result[$i]="{'id':'".$row["id"]."','league':'".$row["league"]."','hometeam':'".$hometeam["team"]."','guestteam':'".$guestteam["team"]."','ptime':'".$row["ptime"]."','firsthomescore':'".$row["firsthomescore"]."','secondhomescore':'".$row["secondhomescore"]."','thirdhomescore':'".$row["thirdhomescore"]."','fourthhomescore':'".$row["fourthhomescore"]."','hot1':'".$row["hot1"]."','hot2':'".$row["hot2"]."','hot3':'".$row["hot3"]."','hot4':'".$row["hot4"]."','hot5':'".$row["hot5"]."','firstguestscore':'".$row["firstguestscore"]."','secondguestscore':'".$row["secondguestscore"]."','thirdguestscore':'".$row["thirdguestscore"]."','fourthguestscore':'".$row["fourthguestscore"]."','got1':'".$row["got1"]."','got2':'".$row["got2"]."','got3':'".$row["got3"]."','got4':'".$row["got4"]."','got5':'".$row["got5"]."'}"; 	
					$i++;
				}
				//echo $result;
				$a=json_encode($result);
				echo '{"result":'.$a.',"counts":'.count($result).'}';
				break;
		default:
			# code...
			break;
	}

?>