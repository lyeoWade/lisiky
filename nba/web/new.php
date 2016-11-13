<?php
header("Content-Type: text/html; charset=utf-8");  	

include "../phpdata/datapage/com.php";

$act=$_POST['act'];

switch($act){
	case 'newlist':
	
		$z_sql="SELECT * FROM news order by time desc";
		$sql=mysql_query($z_sql) or die ("查询失败");
		//$z_sql="SELECT * FROM comment  WHERE arc_id=".$pageid." order by datatime desc";
		$i=0;
		$result=array();
		while($row=mysql_fetch_array($sql)){
			
			$result[$i]="{'title':'".$row["title"]."','times':'".$row["time"]."','desc':'".$row["description"]."','url':'".$row["url"]."'}";
			$i++;
		};
		$a=str_replace('\n',"<br/>",json_encode($result));
		echo '{"result":'.$a.',"counts":'.count($result).'}';

	break;
}


?>