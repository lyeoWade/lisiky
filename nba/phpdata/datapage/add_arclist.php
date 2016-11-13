

<?php
	
	header('Cache-control:private,must-revalidate');
	header("Content-type: text/html; charset=utf-8"); 
	
	include "com.php";
	
	$title=$_POST['title'];
	$desc=htmlspecialchars($_POST['desc']);
	$desc=str_replace("\r\n","",$desc);
	$content=$_POST['content'];
	//$file=$_POST['filename'];
	$typetag=$_POST['tag'];
	
	$nav=$_POST['radio'];
	
	date_default_timezone_set('Asia/Shanghai');
	
	$tt=date('Y-m-d H:i:s');

	$pageview=100;

	$sql="INSERT INTO blong_arclist ( title , descption , article  , datatime , type_id , type_tag , page_view , bannerimg) VALUES ( '{$title}','{$desc}','{$content}','{$tt}' , '{$nav}' ,'{$typetag}' , '{$pageview}','{$bannerimg}')";

	$error=mysql_query($sql) or die("--插入错误:".mysql_error());
	
	if($error){
		echo '发布成功';
	}else{
		echo '发布失败';
		
	}
	
?>