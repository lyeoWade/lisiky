
<?php
include('com.php');

$t=date('Y-m-d H:i:s');
$act=$_POST['act'];
// 返回给前端-----------
$ids=$_POST['id'];

switch($act){

	case 'list':
		$sql="SELECT * FROM contact ";
		$sql_query=mysql_query($sql);
		
		$i=0;
		$result=array();
		
		
		while($row=mysql_fetch_array($sql_query)){
			
			$result[$i]="{'id':'".$row["id"]."','content':'".$row["content"]."','name':'".$row["name"]."','tel':'".$row["tel"]."','email':'".$row["email"]."','qq':'".$row["QQ"]."'}";
			$i++;
			
			
		}
		//$returned=str_replace('\n',"", json_encode($result));
		echo '{"result":'.json_encode($result).',"counts":'.count($result).'}';
		
		
	break;
	
	case 'deletes':
		$deletes=mysql_query("DELETE FROM contact WHERE id = ".$ids."") or die('2'.mysql_error());
		if($deletes){
			echo '{"des":"1"}';	
		}else{
			echo '{"des":"0"}';	
		}
	break;
}
	

?>