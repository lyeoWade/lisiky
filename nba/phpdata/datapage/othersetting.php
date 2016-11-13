<?php
	include 'com.php';
	date_default_timezone_set("Asia/Hong_Kong");
	$type=htmlspecialchars($_POST['type']);
	$keyword=htmlspecialchars($_POST['keyword']);
	$keyword1=htmlspecialchars($_POST['keyword1']);
	$keyword2=htmlspecialchars($_POST['keyword2']);
	$keyword3=htmlspecialchars($_POST['keyword3']);
	$description=htmlspecialchars($_POST['description']);
	$videoTag=htmlspecialchars($_POST['videoTag']);
	$newsTag=htmlspecialchars($_POST['newsTag']);
	$contactQQ=htmlspecialchars($_POST['contactQQ']);
	$fLink=htmlspecialchars($_POST['fLink']);
	$statement1=htmlspecialchars($_POST['statement1']);
	$statement2=htmlspecialchars($_POST['statement2']);
	
	switch ($type) {
		//视频
		case 'GetOtherSetting':
			$GetOtherSetting="SELECT * FROM othersetting";
			$query=mysql_query($GetOtherSetting) or die("获取失败:".mysql_error());
			if($query){
				while ($row=mysql_fetch_array($query)) {
					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"keyword"=>$row['keyword'],"keyword1"=>$row['keyword1'],"keyword2"=>$row['keyword2'],"keyword3"=>$row['keyword3'],"description"=>$row['description'],"videoTag"=>$row['videoTag'],"newsTag"=>$row['newsTag'],"contactQQ"=>$row['contactQQ'],"fLink"=>$row['fLink'],"statement1"=>$row['statement1'],"statement2"=>$row['statement2']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
			break;
		case 'UpdateOtherSetting':
			$UpdateOtherSetting='UPDATE othersetting SET keyword="'.$keyword.'",keyword1="'.$keyword1.'",keyword2="'.$keyword2.'",keyword3="'.$keyword3.'",description="'.$description.'",videoTag="'.$videoTag.'",newsTag="'.$newsTag.'",contactQQ="'.$contactQQ.'",fLink="'.$fLink.'",statement1="'.$statement1.'",statement2="'.$statement2.'"  WHERE id=1';
				$query=mysql_query($UpdateOtherSetting) or die("更新失败:".mysql_error());
			if($query){
				echo_status(array("respondCode"=>"0","respondMsg"=>"更新成功！"));
				
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"更新失败"));
			}
			break;
		default:
			# code...
			break;
	}
?>