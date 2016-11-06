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
		case 'GetImageList':
			//echo "324435";
			// $tagListSql=mysql_query("SELECT * FROM imagearr order by pushtime DESC") or die(mysql_error());
			// $i=0;
			// $result=array();
			// while ($row=mysql_fetch_array($tagListSql)) {
			// 	$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','columns':'".$row["columns"]."','pushtime':'".$row["pushtime"]."','frequency':'".$row["frequency"]."','coverpic':'".$row["coverpic"]."','pic':'".$row["pic"]."','tag':'".$row["tag"]."','note':'".$row["note"]."','user':'".$row["user"]."'}";
			// 	$i++;
			// }
			// $a=json_encode($result);
			// echo '{"result":'.$a.'}';


			$id=$_GET['id'];
          	echo $id;
	        if (!isset($id)) {
	          $id='';
	        };
	        $perNumber=5; //每页显示的记录数
	        $page=$_POST['page']; //获得当前的页面值
	        //echo $page;
	        $count=mysql_query("select count(*) from imagearr ".$setsql." "); //获得记录总数
	        $rs=mysql_fetch_array($count); 
	        $totalNumber=$rs[0]; //总数 
	        $totalPage=ceil($totalNumber/$perNumber); //计算出总页数
	        if (!isset($page)) {
	         $page=1;
	        } //如果没有值,则赋值1
	        
	        $startCount=($page-1)*$perNumber; //分页开始,根据此方法计算出开始的记录

	        $tagListSql=mysql_query("select * from imagearr ".$setsql." order by pushtime desc limit $startCount,$perNumber"); //根据前面的计算出开始的记录和记录数
	        $i=0;
			$result=array();
	        while ($row=mysql_fetch_array($tagListSql)) {
	        	$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','columns':'".$row["columns"]."','pushtime':'".$row["pushtime"]."','frequency':'".$row["frequency"]."','coverpic':'".$row["coverpic"]."','pic':'".$row["pic"]."','tag':'".$row["tag"]."','note':'".$row["note"]."','user':'".$row["user"]."'}";
				$i++;
	        };
	        $a=json_encode($result);
			echo '{"result":'.$a.'}';

		break;
		case 'tagList':
			//echo "324435";

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