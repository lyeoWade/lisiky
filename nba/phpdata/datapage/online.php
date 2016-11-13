<?php
	include 'com.php';
	date_default_timezone_set("Asia/Hong_Kong");
	$type=$_POST['type'];
	$LiveSignalIn=htmlspecialchars($_POST['LiveSignalIn']);
	$LiveSignalOut=htmlspecialchars($_POST['LiveSignalOut']);
	$leagueList=$_POST['leagueList'];
	$hteam=$_POST['hteam'];
	$gteam=$_POST['gteam'];
	$pTime=$_POST['pTime'];
	$onlineName=htmlspecialchars($_POST['onlineName']);
	$LiveText=htmlspecialchars($_POST['LiveText']);
	$ScoreLive=htmlspecialchars($_POST['ScoreLive']);
	$descention=htmlspecialchars($_POST['descention']);
	$isend=$_POST['isend'];
	$onlineOneId=$_POST['id'];

	$title=htmlspecialchars($_POST['title']);
	$desc=htmlspecialchars($_POST['desc']);
	$videoUrl=htmlspecialchars($_POST['videoUrl']);
	$tag=htmlspecialchars($_POST['tag']);
	$column=htmlspecialchars($_POST['column']);
	$bannerUrl=htmlspecialchars($_POST['bannerUrl']);
	$thumPic=htmlspecialchars($_POST['thumPic']);
	$isChecked=htmlspecialchars($_POST['isChecked']);
	$source=htmlspecialchars($_POST['source']);
	$sourceSite=$_POST['sourceSite'];
	$view=100;
	//h--从1到12小时 H---从0到23的小时
	$updatetime=date('y-m-d H:i:s',time());


	//后台直播列表查询条件
	$username       =$_POST['username'];
	$playtime       =$_POST['playtime'];
	$playStatus     =$_POST['playStatus'];

	$keywords     =$_POST['keywords'];
	//$username="xiahaibing";
	//$playtime="2016-03-26";
	//$playStatus='1';
	$nowpage      =$_POST['nowpage']; //当前第几页
	$PageSize     =$_POST['PageSize']; //每一页多少条

	
	switch ($type) {
		case 'AddOneOnlineInfo':
			$AddOneOnlineInfo="INSERT INTO online 
			(LiveSignalIn,LiveSignalOut,league,hteam,gteam,PlayTime,descention,onlineName,LiveText,LiveScores,source,isend) VALUES 
			('{$LiveSignalIn}','{$LiveSignalOut}','{$leagueList}','{$hteam}','{$gteam}','{$pTime}','{$descention}','{$onlineName}','{$LiveText}','{$ScoreLive}','{$source}','{$isend}')";
			$query=mysql_query($AddOneOnlineInfo) or die("插入错误:".mysql_error());
			if($query){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
			break;
		case 'GetOnlineList':
			$AddOneOnlineInfo="SELECT * FROM online WHERE isend='1' AND DATE_FORMAT(PlayTime,'%Y-%m-%d')  BETWEEN '".date('Y-m-d')."' AND '".date("Y-m-d",strtotime('+7 days'))."' ORDER BY PlayTime ASC";
			$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
			$i=0;
			$result=array();
			while ($row=mysql_fetch_array($query)) {
				 $result[$i]="{'id':'".$row["id"]."','PlayTime':'".$row["PlayTime"]."','hteam':'".$row["hteam"]."','gteam':'".$row["gteam"]."','league':'".$row["league"]."','LiveText':'".$row["LiveText"]."','descention':'".$row["descention"]."','LiveScores':'".$row["LiveScores"]."','onlineName':'".$row["onlineName"]."','source':'".$row["source"]."'}";
				$i++;
			}
			$arr=json_encode($result);
			echo '{"result":'.$arr.',"counts":'.count($result).'}';
			break;
		case 'GetOnlineListBack':

			if($username){
				$newUsername="and source='".$username."'";
			}else{
				$newUsername="";
			};
			if($playtime){
				$newPlaytime="and PlayTime like '%$playtime%'";
			}else{
				$newPlaytime="";
			};

			if($playStatus=='3'){//状态为空 
				if($playStatus=='' && $newUsername=='' && $newPlaytime=''){
					$setsql='';
				}else{
					$setsql=" WHERE 1 ".$newPlaytime." ".$newUsername." ";
				}
				$AddOneOnlineInfo="SELECT * FROM online ".$setsql."  ORDER BY PlayTime ASC limit ".($nowpage - 1) * $PageSize.",".$PageSize;
				$total = mysql_fetch_array(mysql_query("select count(*) from online  ".$setsql." ORDER BY PlayTime ASC"));//查询数据库中一共有多少条数据  
				$Total = $total[0]; 
			}else if($playStatus=='0'){//已结束  获取isend(已结束所有的数据)
				//echo $playStatus;
				$newPlayStatus="and isend='".$playStatus."'";
				$setsql=" WHERE 1 ".$newPlaytime." ".$newPlayStatus." ".$newUsername." ";
					//echo $setsql;
				$AddOneOnlineInfo="SELECT * FROM online ".$setsql."  ORDER BY PlayTime ASC limit ".($nowpage - 1) * $PageSize.",".$PageSize;

				$total = mysql_fetch_array(mysql_query("select count(*) from online  ".$setsql." ORDER BY PlayTime ASC"));//查询数据库中一共有多少条数据  
				
				$Total = $total[0]; 
			}else if($playStatus=='1'){ //未结束  获取接下来7天的数据
				if($newPlaytime=='' && $newUsername==''){
					$newPlayStatus="and isend='".$playStatus."'";
					$setsql=" WHERE 1 ".$newPlaytime." ".$newPlayStatus." ".$newUsername." ";
					//echo $setsql;
					$AddOneOnlineInfo="SELECT * FROM online ".$setsql." AND DATE_FORMAT(PlayTime,'%Y-%m-%d')  BETWEEN '".date('Y-m-d')."' AND '".date("Y-m-d",strtotime('+7 days'))."' ORDER BY PlayTime ASC limit ".($nowpage - 1) * $PageSize.",".$PageSize;

					$total = mysql_fetch_array(mysql_query("select count(*) from online  ".$setsql." AND DATE_FORMAT(PlayTime,'%Y-%m-%d')  BETWEEN '".date('Y-m-d')."' AND '".date("Y-m-d",strtotime('+7 days'))."' ORDER BY PlayTime ASC"));//查询数据库中一共有多少条数据  
					
				}else{
					$newPlayStatus="and isend='".$playStatus."'";
					$setsql=" WHERE 1 ".$newPlaytime." ".$newPlayStatus." ".$newUsername." ";
						//echo $setsql;
					$AddOneOnlineInfo="SELECT * FROM online ".$setsql."  ORDER BY PlayTime ASC limit ".($nowpage - 1) * $PageSize.",".$PageSize;

					$total = mysql_fetch_array(mysql_query("select count(*) from online  ".$setsql." ORDER BY PlayTime ASC"));//查询数据库中一共有多少条数据  
					
				}
				
				$Total = $total[0]; 
			}

			$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
			//$row=mysql_fetch_array($query)
			$i=0;
			$result=array();
			while ($row=mysql_fetch_array($query)) {
				 $result[$i]="{'id':'".$row["id"]."','PlayTime':'".$row["PlayTime"]."','hteam':'".$row["hteam"]."','gteam':'".$row["gteam"]."','league':'".$row["league"]."','LiveText':'".$row["LiveText"]."','descention':'".$row["descention"]."','LiveScores':'".$row["LiveScores"]."','onlineName':'".$row["onlineName"]."','source':'".$row["source"]."','isend':'".$row["isend"]."'}";
				$i++;
			}
			$arr=json_encode($result);
			echo '{"result":'.$arr.',"Total":'.$Total.'}';
			break;
		case 'GetOneListInfo':
			$AddOneOnlineInfo="SELECT * FROM online WHERE id=".$onlineOneId;
			$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
			if($query){
				while ($row=mysql_fetch_array($query)) {
					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"LiveSignalIn"=>$row['LiveSignalIn'],"LiveSignalOut"=>$row['LiveSignalOut'],"PlayTime"=>$row['PlayTime'],"hteam"=>$row['hteam'],"gteam"=>$row['gteam'],"league"=>$row['league'],"LiveText"=>$row['LiveText'],"LiveScores"=>$row['LiveScores'],"onlineName"=>$row['onlineName'],"descention"=>$row['descention'],"source"=>$row['source']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
			
			//echo '{"result":'.$query.',"counts":'.count($result).'}';
			break;
		case 'UpdateOneOnlineInfo':
			$UpdateOneOnlineInfo='UPDATE online SET LiveSignalOut="'.$LiveSignalOut.'",LiveSignalIn="'.$LiveSignalIn.'",league="'.$leagueList.'",hteam="'.$hteam.'",gteam="'.$gteam.'",PlayTime="'.$pTime.'",descention="'.$descention.'",onlineName="'.$onlineName.'",LiveText="'.$LiveText.'",LiveScores="'.$ScoreLive.'",source="'.$source.'",isend="'.$isend.'" WHERE id='.$onlineOneId;
				$query=mysql_query($UpdateOneOnlineInfo) or die("更新失败:".mysql_error());
			if($query){
				echo_status(array("respondCode"=>"0","respondMsg"=>"更新成功！"));
				
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"更新失败"));
			}
			
			//echo '{"result":'.$query.',"counts":'.count($result).'}';
			break;
		case 'DeleteOneOnlineInfo':
			deletesfn('online',$onlineOneId);
			
			//echo '{"result":'.$query.',"counts":'.count($result).'}';
			break;
		//结束一场比赛
		case 'EndOneGame':
			$EndOneGame='UPDATE online SET isend=0  WHERE id='.$onlineOneId;
				$query=mysql_query($EndOneGame) or die("更新失败:".mysql_error());
			if($query){
				echo_status(array("respondCode"=>"0","respondMsg"=>"更新成功！"));
				
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"更新失败"));
			}
			break;
		//视频
		case 'AddOneVideo':
			$AddOneVideo="INSERT INTO Video ( title, descention , videoUrl , tag , videoColumn, bannerUrl, thumPic, isChecked , view ,updatetime,source ,sourceSite) VALUES ('{$title}','{$desc}','{$videoUrl}','{$tag}','{$column}','{$bannerUrl}','{$thumPic}','{$isChecked}','{$view}' ,'{$updatetime}','{$source}' , '{$sourceSite}')";

			$query=mysql_query($AddOneVideo) or die("插入错误:".mysql_error());
			if($query){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
			break;
		case 'GetVideoOnlineList':
			$AddOneOnlineInfo="SELECT * FROM Video  ORDER BY updatetime DESC limit 0,15";
			$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
			$i=0;
			$result=array();
			while ($row=mysql_fetch_array($query)) {
				 $result[$i]="{'id':'".$row["id"]."','updatetime':'".$row["updatetime"]."','title':'".$row["title"]."','descention':'".$row["descention"]."','tag':'".$row["tag"]."','view':'".$row["view"]."','source':'".$row["source"]."'}";
				$i++;
			}
			$arr=json_encode($result);
			echo '{"result":'.$arr.',"counts":'.count($result).'}';
			break;
		case 'GetVideoList':
			if($username){
				$newUsername="and source='".$username."'";
			}
			if($playtime){
				$newPlaytime="and updatetime like '%$playtime%'";
			}
			if($keywords){
				$newKeywords="and title like '%$keywords%' or tag like'%$keywords%'";
			}
			$setsql=" WHERE 1 ".$newPlaytime." ".$newUsername." ".$newKeywords." ";

			$AddOneOnlineInfo="SELECT * FROM Video  ".$setsql." ORDER BY updatetime DESC limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			
			$total = mysql_fetch_array(mysql_query("select count(*) from Video  ".$setsql." ORDER BY updatetime DESC"));//查询数据库中一共有多少条数据  
				
			$Total = $total[0]; 
			$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
			$i=0;
			$result=array();
			while ($row=mysql_fetch_array($query)) {
				 $result[$i]="{'id':'".$row["id"]."','updatetime':'".$row["updatetime"]."','title':'".$row["title"]."','descention':'".$row["descention"]."','tag':'".$row["tag"]."','view':'".$row["view"]."','source':'".$row["source"]."','videoColumn':'".$row["videoColumn"]."','bannerUrl':'".$row["bannerUrl"]."','thumPic':'".$row["thumPic"]."','isChecked':'".$row["isChecked"]."'}";
				$i++;
			}
			$arr=json_encode($result);
			echo '{"result":'.$arr.',"Total":'.$Total.'}';
			break;
		case 'GetOneVideoInfo':
			$AddOneOnlineInfo="SELECT * FROM Video WHERE id=".$onlineOneId;
			$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
			mysql_query("UPDATE Video SET view = view+1 WHERE id = '".$onlineOneId."' ");
			if($query){
				while ($row=mysql_fetch_array($query)) {
					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"title"=>$row['title'],"videoUrl"=>$row['videoUrl'],"tag"=>$row['tag'],"view"=>$row['view'],"source"=>$row['source'],"videoColumn"=>$row['videoColumn'],"bannerUrl"=>$row['bannerUrl'],"thumPic"=>$row['thumPic'],"isChecked"=>$row['isChecked'],"updatetime"=>$row['updatetime'],"descention"=>$row['descention'],"source"=>$row['source'],"sourceSite"=>$row['sourceSite']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
			break;
			//echo '{"result":'.$query.',"counts":'.count($result).'}';
		case 'UpdateOneVideoInfo':
			$UpdateOneOnlineInfo='UPDATE Video SET title="'.$title.'",videoUrl="'.$videoUrl.'",tag="'.$tag.'",videoColumn="'.$column.'",bannerUrl="'.$bannerUrl.'",thumPic="'.$thumPic.'",descention="'.$desc.'",isChecked="'.$isChecked.'",source="'.$source.'" ,sourceSite="'.$sourceSite.'"  WHERE id='.$onlineOneId;
				$query=mysql_query($UpdateOneOnlineInfo) or die("更新失败:".mysql_error());
			if($query){
				echo_status(array("respondCode"=>"0","respondMsg"=>"更新成功！"));
				
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"更新失败"));
			}
			break;
		case 'DeleteOneVideoInfo':
			deletesfn('Video',$onlineOneId);
			break;
		case 'GetVideoBannerList':
			$AddOneOnlineInfo="SELECT * FROM Video WHERE isChecked=1 ORDER BY updatetime DESC limit 0,8";
			$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
			$i=0;
			$result=array();
			while ($row=mysql_fetch_array($query)) {
				 $result[$i]="{'id':'".$row["id"]."','updatetime':'".$row["updatetime"]."','title':'".$row["title"]."','descention':'".$row["descention"]."','tag':'".$row["tag"]."','view':'".$row["view"]."','source':'".$row["source"]."','videoColumn':'".$row["videoColumn"]."','bannerUrl':'".$row["bannerUrl"]."','thumPic':'".$row["thumPic"]."','isChecked':'".$row["isChecked"]."'}";
				$i++;
			}
			$arr=json_encode($result);
			echo '{"result":'.$arr.',"counts":'.count($result).'}';
			break;
		case 'GetVideoHotList':
			$AddOneOnlineInfo="SELECT * FROM Video ORDER BY view DESC limit 0,10";
			$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
			$i=0;
			$result=array();
			while ($row=mysql_fetch_array($query)) {
				 $result[$i]="{'id':'".$row["id"]."','updatetime':'".$row["updatetime"]."','title':'".$row["title"]."','descention':'".$row["descention"]."','tag':'".$row["tag"]."','view':'".$row["view"]."','source':'".$row["source"]."','videoColumn':'".$row["videoColumn"]."','bannerUrl':'".$row["bannerUrl"]."','thumPic':'".$row["thumPic"]."','isChecked':'".$row["isChecked"]."'}";
				$i++;
			}
			$arr=json_encode($result);
			echo '{"result":'.$arr.',"counts":'.count($result).'}';
		break;
		default:
			# code...
			break;
	}
?>