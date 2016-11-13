<meta charset="utf-8" />
<?php
	include "com.php";
	date_default_timezone_set("Asia/Hong_Kong");

	$sql="SELECT * FROM basketball_agena WHERE league='NBA' ";

	$query=mysql_query($sql) or die("解析错误:".mysql_error());
	$i=0;
	$result=array();
	while ($row=mysql_fetch_array($query)) {
		if($row["isend"]=='true'){
			$result[$i]="{'id':'".$row["id"]."','isend':'".$row["isend"].",'homeid':'".$row["homeid"]."','guestid':'".$row["guestid"]."'}";
			$i++;
		}
	}
	$a=json_encode($result);
	echo $a;
	

?>