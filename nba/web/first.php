<?php

	include "../phpdata/datapage/com.php";
	
	$type     = $_POST['type'];
	$times     = $_POST['times'];
	//echo $hotid;
	switch($type){
		case 'first':
			$first="SELECT * FROM first WHERE playtime like '%$times%' order by playtime ASC";
			$query=mysql_query($first);
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
				
				$result[$i]="{'id':'".$row["id"]."','hometeam':'".$row["hometeam"]."','guestteam':'".$row["guestteam"]."','hC':'".$row["hC"]."','hPF':'".$row["hPF"]."','hSF':'".$row["hSF"]."','hSG':'".$row["hSG"]."','hPG':'".$row["hPG"]."','gC':'".$row["gC"]."','gPF':'".$row["gPF"]."','gSF':'".$row["gSF"]."','gSG':'".$row["gSG"]."','gPG':'".$row["gPG"]."','playtime':'".$row["playtime"]."','league':'".$row["league"]."'}";
				$i++;									
			};
			$a=json_encode($result);
			//var_dump($a);
			echo '{"result":'.$a.',"counts":'.count($result).'}';
		break;
	};
?>