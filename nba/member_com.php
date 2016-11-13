<?php 
	$userid=$_COOKIE['userid'];
	

	

	if($userid){
		if($_GET['id'] && $_GET['id']!=$userid){
	        $mysql=mysql_query("SELECT * FROM member WHERE id=".$_GET['id']) or die("查询用户失败1:".mysql_error());
	        $mysqlRow=mysql_query("select * from ( SELECT @rownum:=@rownum+1 PM, userid, montnpercent From (SELECT @rownum:=0,k.* FROM monthrank k  ORDER BY montnpercent desc limit 50) t ) t where t.userid='".$_GET['id']."'");

	        $mysqlweekRow=mysql_query("select * from ( SELECT @rownum:=@rownum+1 PM, userid, weekpercent From (SELECT @rownum:=0,k.* FROM weekrank k  ORDER BY weekpercent desc limit 50) t ) t where t.userid='".$_GET['id']."'");

	        $mysqlquarRow=mysql_query("select * from ( SELECT @rownum:=@rownum+1 PM, userid, quarterpercent From (SELECT @rownum:=0,k.* FROM quarterrank k  ORDER BY quarterpercent desc limit 50) t ) t where t.userid='".$_GET['id']."'");

	        $mysqlkeyRow=mysql_query("select * from ( SELECT @rownum:=@rownum+1 PM, userid, keypercent From (SELECT @rownum:=0,k.* FROM keyrank k  ORDER BY keypercent desc limit 50) t ) t where t.userid='".$_GET['id']."'");

	       	setcookie("visitor",'yes');

	        // $mysqlRow=mysql_query("select * from ( SELECT @rownum:=@rownum+1 PM, userid, montnpercent From (SELECT @rownum:=0,k.* FROM monthrank k  ORDER BY montnpercent desc limit 50) t ) t where t.userid='".$_GET['id']."'");
	    }else{
	        $mysql=mysql_query("SELECT * FROM member WHERE id=".$userid) or die("查询用户失败2:".mysql_error());


	        $mysqlRow=mysql_query("select * from ( SELECT @rownum:=@rownum+1 PM, userid, montnpercent From (SELECT @rownum:=0,k.* FROM monthrank k  ORDER BY montnpercent desc limit 10) t ) t where t.userid='".$userid."'");

	        $mysqlweekRow=mysql_query("select * from ( SELECT @rownum:=@rownum+1 PM, userid, weekpercent From (SELECT @rownum:=0,k.* FROM weekrank k  ORDER BY weekpercent desc limit 50) t ) t where t.userid='".$userid."'");

	        $mysqlquarRow=mysql_query("select * from ( SELECT @rownum:=@rownum+1 PM, userid, quarterpercent From (SELECT @rownum:=0,k.* FROM quarterrank k  ORDER BY quarterpercent desc limit 50) t ) t where t.userid='".$userid."'");

	         $mysqlkeyRow=mysql_query("select * from ( SELECT @rownum:=@rownum+1 PM, userid, keypercent From (SELECT @rownum:=0,k.* FROM keyrank k  ORDER BY keypercent desc limit 50) t ) t where t.userid='".$userid."'");

	         setcookie("visitor","",time()-100);

	    }

		$list = array();

		while(@$row = mysql_fetch_assoc($mysql)){
			$list[] = $row;
		}
	}else{
		echo '<script>window.location.href="unlogin.php";</script>';
	};
?>