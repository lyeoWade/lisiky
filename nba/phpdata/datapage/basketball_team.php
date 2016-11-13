<?php

	include "com.php";
	date_default_timezone_set("Asia/Hong_Kong");
	$type=$_POST['type'];
	$league=$_POST['league'];
	$team=$_POST['team'];
	$homelink=$_POST['homelink'];
	$season=$_POST['season'];
	$coach=$_POST['coach'];
	$win=$_POST['win'];
	$lose=$_POST['lose'];
	$logo=$_POST['logo'];
	//后台列表展示
	$leagueList=$_POST['leagueList'];
	$seasonList=$_POST['seasonList'];
	
	//echo $seasonList;
	
	//新增赛程
	$homeId=$_POST['homeId'];
	$guestId=$_POST['guestId'];
	$seasons=$_POST['seasons'];
	$ptime=$_POST['ptime'];
	$l1=$_POST['l1'];
	$b1=$_POST['b1'];
	$lb1=$_POST['lb1'];
	$bb1=$_POST['bb1'];
	$analysis=$_POST['analysis'];
	$isend=$_POST['isend'];
	$sivision=$_POST['sivision'];

	$isGuess=$_POST['isGuess']; //是否竞猜
	$guessTime=$_POST['guessTime']; //竞猜日期

	$isMoney=$_POST['isMoney']; //竞猜日期
	//赛节
	$firsthomescore=0;
	$secondhomescore=0;
	$thirdhomescore=0;
	$fourthhomescore=0;
	$firstguestscore=0;
	$secondguestscore=0;
	$thirdguestscore=0;
	$fourthguestscore=0;

	$hot1=0;
	$hot2=0;
	$hot3=0;
	$hot4=0;
	$hot5=0;
	$got1=0;
	$got2=0;
	$got3=0;
	$got4=0;
	$got5=0;
	$isBalance=0;
	$summary=$_POST['summary'];
	//发布或者修改的标识
	$method=$_POST['method'];
	//获取list

	$ids=$_POST['id']; //比赛的id 
	$agenaList=$_POST['agenaList'];
	$seasonAgenaList=$_POST['seasonAgenaList'];
	// nowtime
	$nowtime=date("Y-m-d H:i:s");


	$times=$_POST['times'];
	//查询球队
	//echo $times;
	$keyword=$_POST['keyword'];
	switch($type){
		case 'basketball':
			//插入篮球数据
			if($method==''){ //如果method为空 说明没有id 是新增加
				$into="INSERT INTO basketball_team ( 
				league ,team,logo,homelink,season,coach,sivision,win,lose
				) VALUES (
				'{$league}','{$team}','{$logo}','{$homelink}' , '{$season}'
				 ,'{$coach}' ,'{$sivision}', '{$win}', '{$lose}'
				)";
				$query=mysql_query($into) or die("插入错误:".mysql_error());
			
				if($query){
					echo_status(array('code'=>'0','msg'=>'发布成功'));	
				}else{
					echo_status(array('code'=>'1','msg'=>'发布失败'));	
				}
			}else{
				$update='UPDATE basketball_team SET league="'.$league.'",team="'.$team.'",logo="'.$logo.'",homelink="'.$homelink.'",season="'.$season.'",coach="'.$coach.'",sivision="'.$sivision.'",win="'.$win.'",lose="'.$lose.'" WHERE id='.$method;
				$query=mysql_query($update) or die("更新失败:".mysql_error());

				if($query){
					echo_status(array('code'=>'0','msg'=>'更新成功'));	
				}else{
					echo_status(array('code'=>'1','msg'=>'更新失败'));	
				}
			}
		break;	
		
		case 'list':
			$sqllist="SELECT * FROM basketball_team WHERE league='".$leagueList."' and season='".$seasonList."' order by lose asc";
			//$sqllist="SELECT * FROM basketball_team order by lose asc";
			$query=mysql_query($sqllist) or die("解析错误:".mysql_error());
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
				$result[$i]="{'id':'".$row["id"]."','league':'".$row["league"]."','team':'".$row["team"]."','logo':'".$row["logo"]."','homelink':'".$row["homelink"]."','season':'".$row["season"]."','sivision':'".$row["sivision"]."','coach':'".$row["coach"]."','win':'".$row["win"]."','lose':'".$row["lose"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"counts":'.count($result).'}';
			
		break;
		//赛程添加
		case 'AddAgena':
			// 添加赛程
			$agena="INSERT INTO basketball_agena (
				league , homeid , guestid , season , ptime , l1  , b1  ,lb1 ,bb1,analysis,isend,nowtime , firsthomescore,secondhomescore,thirdhomescore,fourthhomescore,firstguestscore,secondguestscore,thirdguestscore,fourthguestscore,hot1,hot2,hot3,hot4,hot5,got1,got2,got3,got4,got5,summary,isMoney,isGuess,guessTime
			) VALUES (
			'{$league}','{$homeId}','{$guestId}','{$seasons}' , '{$ptime}','{$l1}', '{$b1}','{$lb1}' , '{$bb1}','{$analysis}','{$isend}' ,'{$nowtime}','{$firsthomescore}','{$secondhomescore}','{$thirdhomescore}','{$fourthhomescore}','{$firstguestscore}','{$secondguestscore}','{$thirdguestscore}','{$fourthguestscore}','{$hot1}','{$hot2}','{$hot3}','{$hot4}','{$hot5}','{$got1}','{$got2}','{$got3}','{$got4}','{$got5}','{$summary}','{$isMoney}','{$isGuess}','{$guessTime}'
			)";
			$agenaQuery=mysql_query($agena) or die("~~插入错误:".mysql_error());
			if($agenaQuery){
				echo_status(array('code'=>'0','msg'=>'发布成功'));	
			}else{
				echo_status(array('code'=>'1','msg'=>'发布失败'));	
			}
		break;


		case 'agena':

			// 添加赛程
			if($method==''){
				$agena="INSERT INTO basketball_agena (
					league , homeid , guestid , season , ptime , l1  , b1  ,lb1 ,bb1,analysis,isend,nowtime , firsthomescore,secondhomescore,thirdhomescore,fourthhomescore,firstguestscore,secondguestscore,thirdguestscore,fourthguestscore,hot1,hot2,hot3,hot4,hot5,got1,got2,got3,got4,got5,summary,isBalance
				) VALUES (
				'{$league}','{$homeId}','{$guestId}','{$seasons}' , '{$ptime}','{$l1}', '{$b1}','{$lb1}' , '{$bb1}','{$analysis}','{$isend}' ,'{$nowtime}','{$firsthomescore}','{$secondhomescore}','{$thirdhomescore}','{$fourthhomescore}','{$firstguestscore}','{$secondguestscore}','{$thirdguestscore}','{$fourthguestscore}','{$hot1}','{$hot2}','{$hot3}','{$hot4}','{$hot5}','{$got1}','{$got2}','{$got3}','{$got4}','{$got5}','{$summary}','{$isBalance}'
				)";
				$agenaQuery=mysql_query($agena) or die("~~插入错误:".mysql_error());

				if($agenaQuery){
					echo_status(array('code'=>'0','msg'=>'发布成功'));	
				}else{
					echo_status(array('code'=>'1','msg'=>'发布失败'));	
				}
			}else{
				
			}
		break;
		//获取赛程
		case 'getAgena':

			$getAgena="SELECT * FROM basketball_agena WHERE ptime like '%$times%' order by ptime desc";
			$getAgenaQuery=mysql_query($getAgena) or die("查询失败:".mysql_error());

			$i=0;
			$result=array();
			while($row=mysql_fetch_array($getAgenaQuery)){
				$hometeam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["homeid"]."'")) or die("查询主队失败:".mysql_error());
				$guestteam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["guestid"]."'")) or die("查询客队失败:".mysql_error());
				
				$homescore=$row["firsthomescore"]+$row["secondhomescore"]+$row["thirdhomescore"]+$row["fourthhomescore"]+$row["hot1"]+$row["hot2"]+$row["hot3"]+$row["hot4"]+$row["hot5"];
				$guestscore=$row["firstguestscore"]+$row["secondguestscore"]+$row["thirdguestscore"]+$row["fourthguestscore"]+$row["got1"]+$row["got2"]+$row["got3"]+$row["got4"]+$row["got5"];
				//$result[$i]=$hometeam["team"];
				 $result[$i]="{'id':'".$row["id"]."','league':'".$row["league"]."',
				 	'hometeam':'".$hometeam["team"]."','hometeamLink':'".$hometeam["homelink"]."',
				 	'homeid':'".$row["homeid"]."','guestid':'".$row["guestid"]."',
				 	'guestteam':'".$guestteam["team"]."','guestteamLink':'".$guestteam["homelink"]."',
				 	'season':'".$row["season"]."','ptime':'".$row["ptime"]."','l1':'".$row["l1"]."',
				 	'b1':'".$row["b1"]."','lb1':'".$row["lb1"]."','bb1':'".$row["bb1"]."',
				 	'analysis':'".$row["analysis"]."','isend':'".$row["isend"]."','homescore':'".$homescore."','guestscore':'".$guestscore."','summary':'".$row["summary"]."','isBalance':'".$row["isBalance"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"counts":'.count($result).'}';
			
		break;
		case 'deletes':
			deletesfn('basketball_agena',$ids);
		break;
		case 'deletesTeam':
			deletesfn('basketball_team',$ids);
		break;
		case 'edits':
			# code...
		break;
		case 'getteam':
			$Select="SELECT * FROM basketball_team WHERE league='".$keyword."' order by id desc";
			$SelectQuery=mysql_query($Select) or die("查询失败:".mysql_error());

			$i=0;
			$result=array();
			while($row=mysql_fetch_array($SelectQuery)){
				 $result[$i]="{'id':'".$row["id"]."','team':'".$row["team"]."'}";
				$i++;
			}
			$a=json_encode($result);
			echo '{"result":'.$a.',"counts":'.count($result).'}';
		break;
		case 'GetOneAgena':
			$getOneAgena=mysql_query("SELECT * FROM basketball_agena WHERE id=".$ids."");

			$AgenaNum=mysql_num_rows($getOneAgena);

			if($AgenaNum==1){
				while ($rows=mysql_fetch_array($getOneAgena)) {
					echo_status(array('responseCode'=>'0','responseMsg'=>'获取赛程成功','league'=>$rows['league'],'homeid'=>$rows['homeid'],'guestid'=>$rows['guestid'],'season'=>$rows['season'],'ptime'=>$rows['ptime'],'l1'=>$rows['l1'],'b1'=>$rows['b1'],'lb1'=>$rows['lb1'],'bb1'=>$rows['bb1'],'analysis'=>$rows['analysis'],'isend'=>$rows['isend'],'firsthomescore'=>$rows['firsthomescore'],'secondhomescore'=>$rows['secondhomescore'],'thirdhomescore'=>$rows['thirdhomescore'],'fourthhomescore'=>$rows['fourthhomescore'],'firstguestscore'=>$rows['firstguestscore'],'secondguestscore'=>$rows['secondguestscore'],'thirdguestscore'=>$rows['thirdguestscore'],'fourthguestscore'=>$rows['fourthguestscore'],'hot1'=>$rows['hot1'],'hot2'=>$rows['hot2'],'hot3'=>$rows['hot3'],'hot4'=>$rows['hot4'],'hot5'=>$rows['hot5'],'got1'=>$rows['got1'],'got2'=>$rows['got2'],'got3'=>$rows['got3'],'got4'=>$rows['got4'],'got5'=>$rows['got5'],'summary'=>$rows['summary'],'isMoney'=>$rows['isMoney'],'isGuess'=>$rows['isGuess'],'guessTime'=>$rows['guessTime']));
				}

				/*
				 ,  ,  ,  ,  ,   ,   , ,,,,nowtime , ,,,,,,,,,,,,,,,,,,,,,*/ 
			}else{
				echo_status(array('responseCode'=>'1','responseMsg'=>'获取赛程失败'));	
			}
			break;

		case 'UpdateOneAgean':
			//更新赛程
			$update="UPDATE basketball_agena SET league='".$league."',homeid='".$homeId."',guestid='".$guestId."',season='".$seasons."',ptime='".$ptime."',l1='".$l1."',b1='".$b1."',lb1='".$lb1."',bb1='".$bb1."',isGuess='".$isGuess."',guessTime='".$guessTime."',isMoney='".$isMoney."',summary='".$summary."',analysis='".$analysis."',isend='".$isend."' WHERE id=".$ids;
			
			$query=mysql_query($update) or die("更新失败:".mysql_error());

			if($query){
				echo_status(array('responseCode'=>'0','responseMsg'=>'更新成功'));	
			}else{
				echo_status(array('responseCode'=>'1','responseMsg'=>'更新失败'));	
			}
			break;
	}
	

	
	
?>