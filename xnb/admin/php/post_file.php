<?php
header('Content-type:text/html; charset="utf-8"');
date_default_timezone_set("Asia/Hong_Kong");
$upload_dir = '../../images/uploads/';
 
if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
	exit_status(array('code'=>1,'msg'=>'错误提交方式'));
}
$nowtime=strtotime(date("Y-m-d H:i:s"));
//echo $nowtime;
//array_key_exists() 函数检查某个数组中是否存在指定的键名，如果键名存在则返回 true，如果键名不存在则返回 false
if(array_key_exists('file',$_FILES) && $_FILES['file']['error'] == 0 ){
	$pic = $_FILES['file'];
	//var_dump($nowtime.$pic['name']);
	if(move_uploaded_file($pic['tmp_name'], $upload_dir.$nowtime.$pic['name'])){

		//echo '213123132';
		exit_status(array('code'=>0,'msg'=>'上传成功','url'=>$upload_dir.$nowtime.$pic['name']));
		//echo $nowtime;
	}
}else{
	exit_status(array('code'=>1,'msg'=>'出现了一些错误'));
}
//echo $_FILES['file']['error'];

function exit_status($str){
	echo json_encode($str);
	exit;
}
?>