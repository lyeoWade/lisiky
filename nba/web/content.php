


<?php
$page=$_POST['page'];
$act=$_POST['act'];
include "../phpdata/datapage/com.php";
date_default_timezone_set('Asia/Shanghai');
	
$t=date('Y-m-d H:i:s');

$userid=$_POST['userid'];
$pageid=$_POST['pageid'];
$content=$_POST['content'];

switch($act){
	case 'getContent':
		$zsql="SELECT * FROM blong_arclist  WHERE id= ".$page;
		// 更新浏览量
		mysql_query("UPDATE blong_arclist SET page_view = page_view+1 WHERE id = '".$page."' ");
		$query=mysql_query($zsql);
		$row=mysql_fetch_array($query);
		if($row){ 
			 echo_status(array('respondCode'=>'0','respondMsg'=>'获取成功','title'=>$row["title"],times=>$row["datatime"],newtype=>$row["type_id"],articl=>$row["article"],pageview=>$row["page_view"],keywords=>$row["keywords"],));
		}else{
			echo_status(array('respondCode'=>'1','respondMsg'=>'获取失败'));
		}
	break;
	
	case 'conment':
		$sql="INSERT INTO comment ( content , c_time , user_id , arc_id ) VALUES ( '{$content}','{$t}','{$userid}','$pageid')";
		$desc=mysql_query($sql) or die("插入错误:".mysql_error());
		if($desc){
			echo '{"rcode":"1","desc":"发布成功"}';	
		}else{
			echo '{"rcode":"0","desc":"发布失败"}';	
		}
	break;
	
	// 评论
	case 'conmentList':
		$z_sql="SELECT * FROM comment  WHERE arc_id=".$pageid." order by c_time desc";
	    $sql=mysql_query($z_sql) or die ("查询失败");
		//$z_sql="SELECT * FROM comment  WHERE arc_id=".$pageid." order by datatime desc";
	    $i=0;
		$result=array();
		
		while($row=mysql_fetch_array($sql)){
			
			$c_username=mysql_fetch_array(mysql_query("SELECT * FROM blong_logon WHERE id='".$row["user_id"]."'"));
			
			$result[$i]="{'id':'".$row["id"]."','content':'".$row["content"]."','times':'".$row["c_time"]."','username':'".$c_username["username"]."','userid':'".$row["user_id"]."'}";
			$i++;
			
		};
		
		$a=str_replace('\n',"<br/>",json_encode($result));
		echo '{"result":'.$a.',"counts":'.count($result).'}';
	  
	break;
}
?>