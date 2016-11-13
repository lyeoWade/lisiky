<?php 
	include "com.php";
	$type         = $_POST['type'];
	$userid       = $_POST['userid'];

	switch ($type) {
		case 'getUserInfo':
			$query=mysql_query("SELECT * FROM member WHERE id=".$userid."") or die(mysql_error());
			if($query){
				while ($row=mysql_fetch_array($query)) {
					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"username"=>$row['username'],"QQ"=>$row['QQ'],"email"=>$row['email'],"phone"=>$row['phone'],"nickname	"=>$row['nickname'],"avatar"=>$row['avatar']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
		break;
		
		default:
			# code...
			break;
	}
?>