<?php
	include "com.php";
	$type         = $_POST['type'];
	$userid       = $_POST['userid'];
	$targetId       = $_POST['targetId'];
	$linkname       = $_POST['linkname'];

	$nowpage       = $_POST['nowpage'];
	$PageSize       = $_POST['PageSize'];
	date_default_timezone_set("Asia/Hong_Kong");
	$datatime=date('y-m-d H:i:s',time());
	switch ($type) {
		case 'isCollection':
			//判断是否收藏
			$query=mysql_query("SELECT * FROM collectionVideo WHERE userid='".$userid."' and targetid='".$targetId."'") or die('查询失败'.mysql_error());
			$num=mysql_num_rows($query);
			if($num==0){
				echo_status(array('respondCode'=>'1','respondMsg'=>'收藏视频'));
			}else{
				echo_status(array('respondCode'=>'0','respondMsg'=>'已收藏'));	
			}
		break;
		case 'collection':
			//收藏视频
			$INSERT="INSERT INTO collectionVideo ( userid , targetid , linkname ,datatime) VALUES ( '{$userid}','{$targetId}','{$linkname}' ,'{$datatime}')";

			$AddOneArticle=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddOneArticle){
				echo_status(array('respondCode'=>'0','respondMsg'=>'已收藏'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'收藏失败'));	
			}
		break;
		case 'CancelCollection':
			$deletes=mysql_query("DELETE FROM collectionVideo WHERE userid = ".$userid." and targetid=".$targetId."") or die('删除失败'.mysql_error());

			if($deletes){
				echo_status(array('respondMsg'=>'收藏视频','respondCode'=>'0'));	
			}else{
				echo_status(array('respondMsg'=>'删除失败','respondCode'=>'1'));	
			};
		break;
		case 'getCollectionList':
			# 收藏列表...
			$AddOneOnlineInfo="SELECT * FROM collectionVideo  WHERE userid=".$userid." ORDER BY datatime DESC limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			
			$total = mysql_fetch_array(mysql_query("SELECT count(*) FROM collectionVideo  WHERE userid=".$userid." ORDER BY datatime DESC"));//查询数据库中一共有多少条数据  
				
			$Total = $total[0]; 

			$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
			//var_dump($query);
			$i=0;
			$result=array();
			while ($row=mysql_fetch_array($query)) {

				$SelectVideo=mysql_fetch_array(mysql_query("SELECT * FROM video  WHERE id=".$row['targetid']));

				$result[$i]="{'id':'".$row["id"]."','datatime':'".$row["datatime"]."','videoDetail':'".$row["linkname"]."','title':'".$SelectVideo["title"]."','thumPic':'".$SelectVideo["thumPic"]."','Vid':'".$SelectVideo["id"]."'}";
				$i++;
			}
			$arr=json_encode($result);
			echo '{"result":'.$arr.',"Total":'.$Total.'}';

			break;
		default:
			# code...
		break;
	}

?>