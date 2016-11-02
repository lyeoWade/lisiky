<?php
	//header("Content-type: text/html; charset=utf-8"); 

	include "com.php";
	$type         = $_POST['type'];
	$id           = $_POST['id'];
	
	$title        =htmlspecialchars($_POST['title']);

	$desc = str_replace("\r\n", "", $_POST['description']); 
	//echo $desc;
	$column  =htmlspecialchars($_POST['column']);
	$frequency    =68;
	$username  =htmlspecialchars($_POST['username']);
	$coverpic    =htmlspecialchars($_POST['coverpic']);
	$pic  =$_POST['pic'];
	$tag    =htmlspecialchars($_POST['tag']);
	$etag    =htmlspecialchars($_POST['ename']);
	date_default_timezone_set('Asia/Shanghai');
	$tt=date('Y-m-d H:i:s');


	switch($type){
		case 'AddOneImageList': //添加一篇文章
			$INSERT="INSERT INTO imagearr (title , columns, pushtime , frequency , user , coverpic , pic , note ,tag ) VALUES ('{$title}' , '{$column}', '{$tt}' , '{$frequency}', '{$username}', '{$coverpic}' ,'{$pic}', '{$desc}' , '{$tag}')";
			$AddOneArticle=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddOneArticle){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;


		case 'AddOneTag': //新增标签
			$INSERT="INSERT INTO tag (name , ename, createTime ) VALUES ('{$tag}' , '{$etag}', '{$tt}' )";
			$AddOneArticle=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddOneArticle){
				echo_status(array('respondCode'=>'0','respondMsg'=>'新增成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'新增失败'));	
			}
		break;
		case 'tagList':
			$tagListSql=mysql_query("SELECT * FROM tag") or die(mysql_error());
			$i=0;
			$result=array();
			while ($row=mysql_fetch_array($tagListSql)) {
				$result[$i]="{'id':'".$row["id"]."','name':'".$row["name"]."','ename':'".$row["ename"]."','createTime':'".$row["createTime"]."'}";
				$i++;
			}
			$a=json_encode($result);
			echo '{"result":'.$a.'}';
		break;
		
	};
?>