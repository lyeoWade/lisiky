<?php
	
	header("Content-Type: text/html; charset=utf-8");  	

	include "../phpdata/datapage/com.php";

	date_default_timezone_set('Asia/Shanghai');

	$type=$_POST['type'];
	$datenow=date("H");
	//echo $datenow;  // 小时
    //$nextday=date("Y-m-d",strtotime('+1 years'));
    $nextday=date("Y-m-d",strtotime('+1 days'));
    
    $week=date('w');
    /*
		guesstype
			1->半场让分
			2->半场大小
			3->全场让分
			4->全场大小 
		guessdetail
			1

		isKey
			0-->普通
			1-->重点
    */

	$gameid=$_POST['id'];
	$userid=$_POST['userid'];
	$guesstype=$_POST['guesstype'];
	$guessdetail=$_POST['guessdetail'];
	$guessTime=$_POST['guessTime'];
	$pankou=$_POST['pankou'];
	$isRight=0;
	$updatetime=date("Y-m-d H:i:s");

	$isKey=$_POST['isKey'];
	/* 
	isRight 	默认0
				正确:1
				错误:2
				走水:3

	updatetime  -->竞猜时间

	isKey --->1表示有重点竞猜 0表示没有
	*/

	//echo $guessdetail;
	switch($type){
		case 'basketball':
			//获取篮球竞猜的数据 赛程
		if($datenow>=12){ //当时间大于12点时  显示当天12点以后到下一天12的数据
			$getAgena="SELECT * FROM basketball_agena WHERE ptime like '%$nextday%'  order by ptime ASC";
			$getAgenaQuery=mysql_query($getAgena) or die("查询失败:".mysql_error());
			
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($getAgenaQuery)){
				
				//更新比赛  如果当天时间过了中午11点 就更新显示下一天的数据
				// 如果还有当天没有结束的比赛则显示在最前面 
				$hometeam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["homeid"]."'")) or die("查询主队失败:".mysql_error());
				$guestteam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["guestid"]."'")) or die("查询客队失败:".mysql_error());
				
				//$result[$i]=$hometeam["team"];
				 $result[$i]="{'id':'".$row["id"]."','league':'".$row["league"]."',
				 	'hometeam':'".$hometeam["team"]."','hometeamLink':'".$hometeam["homelink"]."',
				 	'guestteam':'".$guestteam["team"]."','guestteamLink':'".$guestteam["homelink"]."',
				 	'season':'".$row["season"]."','ptime':'".$row["ptime"]."','l1':'".$row["l1"]."',
				 	'l2':'".$row["l2"]."','l3':'".$row["l3"]."','b1':'".$row["b1"]."',
				 	'b2':'".$row["b2"]."','b3':'".$row["b3"]."','lb1':'".$row["lb1"]."',
				 	'lb2':'".$row["lb2"]."','lb3':'".$row["lb3"]."',
				 	'bb1':'".$row["bb1"]."','bb2':'".$row["bb2"]."',
				 	'bb3':'".$row["bb3"]."','score':'".$row["score"]."'}";	
				$i++;
			}
			//echo $result;
			$a=json_encode($result);
			echo '{"result":'.$a.',"counts":'.count($result).'}';
		}
		break;
		case 'myGuessList':
			//我的竞猜列表
            $guestList=mysql_query("SELECT * FROM guesslist WHERE userid='".$userid."' and guessTime like '%$guessTime%' ") or die("查询竞猜列表:".mysql_error());

            $i=0;
			$result=array();
			
			$numguesslist=mysql_num_rows($guestList);

			if($numguesslist==0){
				echo_status(array('respondMsg'=>'暂无竞猜','respondCode'=>'1'));
			}else{
	 			while($rowList=mysql_fetch_array($guestList)){
	                //print_r($rowList);
	 				
	                $game=mysql_fetch_array(mysql_query("SELECT * FROM basketball_agena WHERE id='".$rowList["gameid"]."'")) or die("查询赛程失败:".mysql_error());

	                $hometeam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$game["homeid"]."'")) or die("查询球队失败:".mysql_error());
	                $guestteam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$game["guestid"]."'")) or die("查询球队失败:".mysql_error());
	                $homescoreBan=$game["firsthomescore"]+$game["secondhomescore"];
	                $guestscoreBan=$game["firstguestscore"]+$game["secondguestscore"];
	                $homescore=$game["firsthomescore"]+$game["secondhomescore"]+$game["thirdhomescore"]+$game["fourthhomescore"]+$game["hot1"]+$game["hot2"]+$game["hot3"]+$game["hot4"]+$game["hot5"];
	                $guestscore=$game["firstguestscore"]+$game["secondguestscore"]+$game["thirdguestscore"]+$game["fourthguestscore"]+$game["got1"]+$game["got2"]+$game["got3"]+$game["got4"]+$game["got5"];


	                $result[$i]="{'id':'".$rowList["id"]."','gameid':'".$rowList["gameid"]."','userid':'".$rowList["userid"]."','guesstype':'".$rowList["guesstype"]."','guessdetail':'".$rowList["guessdetail"]."','isend':'".$rowList["isend"]."','pankou':'".$rowList["pankou"]."','isKey':'".$rowList["isKey"]."','isRight':'".$rowList["isRight"]."','ptime':'".$game["ptime"]."','league':'".$game["league"]."','homescore':'".$homescore."','guestscore':'".$guestscore."','homescoreBan':'".$homescoreBan."','guestscoreBan':'".$guestscoreBan."','hometeam':'".$hometeam["team"]."','guestteam':'".$guestteam["team"]."'}";
					 $i++;
	            };
	            //echo $result;
				$resultArr=json_encode($result);
				echo '{"result":'.$resultArr.'}';
			}
           
			break;

		case 'checkIsGuess':
			//判断该项目是否竞猜
			$query=mysql_query("SELECT * FROM guesslist WHERE gameid=".$gameid." and userid=".$userid." and guesstype=".$guesstype."") or die("查询失败,".mysql_error());
			$num=mysql_num_rows($query);

			//判断该项目是否竞猜
			if($num>0){
				echo_status(array('respondMsg'=>'请勿重复提交','respondCode'=>'1'));
			}else{
				//没有竞猜  判断还有没有竞猜次数 一天一场重点竞猜次数

				//判断是否重点竞猜 1表示有重点竞猜 0表示没有
				$isKeyquery=mysql_query("SELECT * FROM guesslist WHERE guessTime like '%$guessTime%' and userid=".$userid." and isKey='1' ") or die("查询失败,".mysql_error());
				$isKeynum=mysql_num_rows($isKeyquery);

				
				//周末10次竞猜机会
				//平常7场
				//echo $week;
				if($week==0 || $week==6){
					//周末 //判断条件  userid  guessTime (属于那一天的竞猜场次)
					$weekquery=mysql_query("SELECT * FROM guesslist WHERE guessTime like '%$guessTime%' and userid=".$userid." ") or die("查询失败,".mysql_error());
					$weekNum=mysql_num_rows($weekquery);
					//echo $weekNum;
					if($weekNum>10){
						//次数用完
						echo_status(array('respondCode'=>'1','respondMsg'=>'今日次数已用完','guessNum'=>0));
						exit;
					}else{
						//可用次数
						if($isKeynum>0){
							echo_status(array('respondMsg'=>'每天只能一场重点竞猜','isKey'=>'0','guessNum'=>10-$weekNum,'respondCode'=>'0'));
						}else{
							echo_status(array('respondMsg'=>'今日还能竞猜-','isKey'=>'1','guessNum'=>10-$weekNum,'respondCode'=>'0'));
						}
						//echo_status2(array('respondCode'=>'0','respondMsg'=>'今日还能竞猜','guessNum'=>10-$weekNum));
					}
				}else{
					//平常时间竞猜
					$normalquery=mysql_query("SELECT * FROM guesslist WHERE guessTime like '%$guessTime%' and userid=".$userid." ") or die("查询失败,".mysql_error());
					$normalNum=mysql_num_rows($normalquery);

					//
					//echo  $normalNum;

					if($normalNum>=7){
						//次数用完
						echo_status(array('respondCode'=>'1','respondMsg'=>'您今日竞猜次数已用完','guessNum'=>0));
						
					}else{
						//可用次数
						if($isKeynum>0){
							echo_status(array('respondMsg'=>'每天只能一场重点竞猜','isKey'=>'0','respondCode'=>'0','guessNum'=>7-$normalNum));
						}else{
							echo_status(array('respondMsg'=>'今日还能竞猜','isKey'=>'1','guessNum'=>7-$normalNum,'respondCode'=>'0'));
						}
						//echo_status2(array('respondCode'=>'0','respondMsg'=>'今日还能竞猜','guessNum'=>7-$weekNum));
					}
				};

				
			}
		break;
		case 'checkGold':
			$checkQuery=mysql_query("SELECT * FROM member WHERE id=".$userid);
			//echo $checkQuery;
			while ($row=mysql_fetch_array($checkQuery)) {
				echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","gold"=>$row['gold']));
			}
		break;
		case 'guessOneGame':
			//竞猜一场比赛 重点扣除5金币
			if($isKey=='1'){
				mysql_query("UPDATE member SET gold=gold-5 WHERE id=".$userid);
			}
			//获取比赛时间
			$ptimes=mysql_fetch_array(mysql_query("SELECT * FROM basketball_agena WHERE id=".$gameid." ")) or die("查询失败,".mysql_error());
			$ptime=$ptimes['ptime'];

			$guessGame="INSERT INTO guesslist ( gameid , userid , guesstype  , guessdetail,isRight,updatetime,isKey,guessTime,pankou,ptime) VALUES ( '{$gameid}','{$userid}','{$guesstype}','{$guessdetail}','{$isRight}','{$updatetime}','{$isKey}','{$guessTime}','{$pankou}','{$ptime}') ";

			$AddOneGuess=mysql_query($guessGame) or die('插入失败:'.mysql_error());
			if($AddOneGuess){
				echo_status(array('respondCode'=>'0','respondMsg'=>'竞猜成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'竞猜失败'));	
			}
		break;
		case 'guessHistory':
			//我的历史竞猜 参数

			if($isKey=='1'){
				$searchKey="and  isKey='".$isKey."'";
			}else{
				$searchKey="and guesstype='".$guessdetail."'";
			}
			
			if($isKey=='' && $guessdetail==''){
				$searchKey='';
			};

			// if($guessdetail==''){
			// 	$searchKey='';
			// }else{
			// 	$searchKey="and guesstype='".$guessdetail."'";
			// };

			// 全部  u o h g isKey
            $guestList=mysql_query("SELECT * FROM guesslist WHERE userid='".$userid."' ".$searchKey." order by ptime desc") or die("查询竞猜列表:".mysql_error());
            $i=0;
			$result=array();
			
			$numguesslist=mysql_num_rows($guestList);

			if($numguesslist==0){
				echo_status(array('respondMsg'=>'暂无竞猜','respondCode'=>'1'));
			}else{
	 			while($rowList=mysql_fetch_array($guestList)){
	                //print_r($rowList);

	                $game=mysql_fetch_array(mysql_query("SELECT * FROM basketball_agena WHERE id='".$rowList["gameid"]."'")) or die("查询赛程失败:".mysql_error());

	                $hometeam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$game["homeid"]."'")) or die("查询球队失败:".mysql_error());
	                $guestteam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$game["guestid"]."'")) or die("查询球队失败:".mysql_error());

	                $homescoreBan=$game["firsthomescore"]+$game["secondhomescore"];
	                $guestscoreBan=$game["firstguestscore"]+$game["secondguestscore"];
	                $homescore=$game["firsthomescore"]+$game["secondhomescore"]+$game["thirdhomescore"]+$game["fourthhomescore"]+$game["hot1"]+$game["hot2"]+$game["hot3"]+$game["hot4"]+$game["hot5"];
	                $guestscore=$game["firstguestscore"]+$game["secondguestscore"]+$game["thirdguestscore"]+$game["fourthguestscore"]+$game["got1"]+$game["got2"]+$game["got3"]+$game["got4"]+$game["got5"];


	                $result[$i]="{'id':'".$rowList["id"]."','gameid':'".$rowList["gameid"]."','userid':'".$rowList["userid"]."','guesstype':'".$rowList["guesstype"]."','seenum':'".$rowList["seenum"]."','guessdetail':'".$rowList["guessdetail"]."','isend':'".$rowList["isend"]."','pankou':'".$rowList["pankou"]."','isKey':'".$rowList["isKey"]."','isRight':'".$rowList["isRight"]."','ptime':'".$rowList["ptime"]."','league':'".$game["league"]."','homescore':'".$homescore."','guestscore':'".$guestscore."','homescoreBan':'".$homescoreBan."','guestscoreBan':'".$guestscoreBan."','hometeam':'".$hometeam["team"]."','guestteam':'".$guestteam["team"]."'}";
					$i++;
	            };
	            //echo $result;
				$resultArr=json_encode($result);
				echo '{"result":'.$resultArr.'}';
			}
       
		break;
	}

?>