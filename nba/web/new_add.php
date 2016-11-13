<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>

<body>

<?php
include "../phpdata/datapage/com.php";

$num = 10; //返回数量

$url = 'http://api.huceo.com/tiyu/other/?key=f742a347ec8690345a4af45d2510ba1c&num='.$num.'';

$ch = curl_init();  
$timeout = 5;
curl_setopt ($ch, CURLOPT_URL, $url);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$file_contents = curl_exec($ch);
curl_close($ch);
//  var_dump(json_decode($file_contents ));
$json = json_decode($file_contents,true);
$result=array();
$i = 0;
if($json['code'] == 200){
	//echo var_dump($json);
	while ($i < $num ){
	   $title = $json['newslist'][$i]['title']; //文章标题
	   $desc =  $json['newslist'][$i]['description']; //文章描述
	   $time =   $json['newslist'][$i]['ctime'];  //封面图片
	   $url =   $json['newslist'][$i]['url'];  //文章链接
	   
	  $pdSql=mysql_query("SELECT title FROM blong_arclist WHERE title ='".$title."'") or die ("查询失败".mysql_error());
	  
	  $row=mysql_fetch_array($pdSql);
	  
	 // echo $row['title'];
	  
	  if($row['title']){ //如果找到 就不插入
			echo '有了';
	   }else{
		   //$sql="INSERT INTO blong_arclist ( title , time , url,description) VALUES ( '{$title}','{$time}','{$url}','{$desc}')";
		   
		   //将获取到的数据插入到blong_arclist中便于管理 (一个表)
		   
		   $sql="INSERT INTO blong_arclist ( title , descption , article  , datatime , type_id , type_tag , page_view,url) VALUES ( '{$title}','{$desc}','{-}','{$time}' , '5' , '{-}' , '100','{$url}')";
			$error=mysql_query($sql) or die("插入错误:".mysql_error());
			if($error){
				echo '"发布成功"';
			}else{
				echo '"发布失败"';
			}
	   }
	   $i++;
	} 
}else{
    echo "返回错误，状态码：".$json['code'];
}
?>
</body>
</html>
