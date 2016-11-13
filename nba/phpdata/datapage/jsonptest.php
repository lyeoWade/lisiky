<?php  
	include 'com.php';
	date_default_timezone_set("Asia/Hong_Kong");

	$jsonp=$_GET['callback'];

	$AddOneOnlineInfo="SELECT * FROM Video  ORDER BY updatetime DESC limit 0,15";
	$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
	$i=0;
	$result=array();
	while ($row=mysql_fetch_array($query)) {
		 $result[$i]="{'id':'".$row["id"]."','updatetime':'".$row["updatetime"]."','title':'".$row["title"]."','descention':'".$row["descention"]."','tag':'".$row["tag"]."','view':'".$row["view"]."','source':'".$row["source"]."'}";
		$i++;
	}
	$arr=json_encode($result);

	echo $jsonp.'({"result":'.$arr.',"counts":'.count($result).'})';

?>