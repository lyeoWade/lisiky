
<?php
include('com.php');

$t=date('Y-m-d H:i:s');
$act=$_POST['act'];
$ids=$_POST['id'];

//获取评论列表 返回给前端-----------

switch($act){
	case 'list':
		$sql="SELECT * FROM comment ";
		$sql_query=mysql_query($sql);
		
		$i=0;
		$result=array();
		
		
		while($row=mysql_fetch_array($sql_query)){
			
			$getId=mysql_fetch_array(mysql_query("select * from blong_arclist WHERE id=".$row["arc_id"]));
			
			
			$result[$i]="{'id':'".$row["id"]."','content':'".$row["content"]."','targetId':'".$row["arc_id"]."'}";
			$i++;
			
			
		}
		$returned=str_replace('\n',"", json_encode($result));
		
		echo '{"result":'.$returned.',"counts":'.count($result).'}';
		
		
	break;
	
	case 'deletes':
		$deletes=mysql_query("DELETE FROM comment WHERE id = ".$ids."") or die('2'.mysql_error());
		if($deletes){
			echo '{"des":"1"}';	
		}else{
			echo '{"des":"0"}';	
		}
	break;
}
	

?>