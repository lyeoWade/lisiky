<?php
	header('Cache-control:private,must-revalidate');
	header("Content-type: text/html; charset=utf-8"); 

	include "com.php";
	$type         = $_POST['type'];
	$id           = $_POST['id'];
	$title        =htmlspecialchars($_POST['title']);
	//$desc         =htmlspecialchars($_POST['description']);
	//$desc         =str_replace("\r\n","",$desc);
	$desc = str_replace("\r\n", "", $_POST['description']); 
	$isrecommend  =htmlspecialchars($_POST['isrecommend']);
	$newbanner    =htmlspecialchars($_POST['newbanner']);
	$keywords     =htmlspecialchars($_POST['keywords']);
	$content      =$_POST['content'];
	$contentSol   =preg_replace("/\s*/", "", $_POST['contentSol']);
	$typeid   	  =$_POST['typeid'];
	$thumbnail     =htmlspecialchars($_POST['thumbnail']);
	$username     =htmlspecialchars($_POST['username']);		
	$newtype      =$_POST['newtype'];
	$nowpage      =$_POST['nowpage']; //当前第几页
	$PageSize     =$_POST['PageSize']; //每一页多少条
	date_default_timezone_set('Asia/Shanghai');
	$Sid=$_POST['id'];
	$userid=$_POST['userid'];
	$ManagerType=$_POST['ManagerType'];
	//echo $title;
	/*
		$status -->1 通过  2-->审核
		$ManagerType->1管理员  2->用户
	*/
	$tt=date('Y-m-d H:i:s');

	$spare=0;

	switch($type){
		case 'list'://文章列表
			if($newtype){
				$setNewType="and type_id='".$newtype."'";
			}
			if($title){
				$newTitle="and title like '%$title%'";
			};
			if($username){
				$newUsername="and username='".$username."'";
			};

			if($newtype=='' && $title=='' && $username==''){
				$setsql="";
			}else{
				$setsql=" WHERE 1 ".$setNewType." ".$newTitle." ".$newUsername." ";
			};
			//echo $setsql;
			//拼接条件查询字符串
			$z_sql="SELECT * FROM blong_arclist ".$setsql." order by datatime desc  limit ".($nowpage - 1) * $PageSize.",".$PageSize;

			$query=mysql_query($z_sql);

			$total = mysql_fetch_array(mysql_query("select count(*) from blong_arclist ".$setsql.""));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
				preg_match('/<img.+src=\"?(.+\.(jpg|gif|bmp|bnp|png))\"?.+>/i',$row["article"],$match);
				//echo $match[1];

				$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','descption':'".$row["descption"]."','banner':'".$row["bannerimg"]."','datatime':'".$row["datatime"]."','keywords':'".$row["keywords"]."','page_view':'".$row["page_view"]."','username':'".$row["username"]."','isrecommend':'".$row["isrecommend"]."','newtype':'".$row["type_id"]."','userid':'".$row["userid"]."','status':'".$row["status"]."','thumb':'".$match[1]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;

		case 'userDeleteNotUseArticle': //删除一篇文章
			$userid      =$_POST['userid'];
			$arcid      =$_POST['arcid'];
			//if(){}
			$checkSql=mysql_query("SELECT * FROM blong_arclist  WHERE id = ".$arcid."");
			$row=mysql_fetch_array($checkSql);
			if($row){
				if($row['userid']==$userid){
					$deletes=mysql_query("DELETE FROM blong_arclist WHERE id = ".$arcid."") or die('删除失败'.mysql_error());

					if($deletes){
						echo_status(array('msg'=>'删除成功','code'=>'0'));
						//扣除积分80%
					}else{
						echo_status(array('msg'=>'删除失败','code'=>'1'));	
					};
				};
			}else{
				echo_status(array('msg'=>'删除失败,请联系客服;','code'=>'1'));
			}
		break;

		case 'getProDetail':
			$GetOneArticleInfo="SELECT * FROM product WHERE id=".$Sid;
			$query=mysql_query($GetOneArticleInfo) or die("获取失败:".mysql_error());
			if($query){
				while ($row=mysql_fetch_array($query)) {
					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"title"=>$row['title'],"thumbnail"=>$row['thumbnail'],"content"=>$row['content'],"pushtime"=>$row['pushtime'],"user"=>$row['user']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
		break;
		case 'AddProject': //添加一篇文章 
			$INSERT="INSERT INTO product ( title , thumbnail , content ,typeid , pushtime , user ,spare) VALUES ( '{$title}','{$thumbnail}','{$content}','{$typeid}','{$tt}' ,'{$username}' ,'{$spare}')";
			$AddProject=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddProject){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;
		//获取产品列表  
		case 'getProList':
			//拼接条件查询字符串
			$z_sql="SELECT * FROM product WHERE typeid='".$typeid."' order by pushtime desc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);
			$total = mysql_fetch_array(mysql_query("select count(*) from product WHERE typeid='".$typeid."' "));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
				$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','content':'".$row["content"]."','thumbnail':'".$row["thumbnail"]."','pushtime':'".$row["pushtime"]."','user':'".$row["user"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		case 'deletePro': //删除一篇文章
			deletesfn('product',$id);
		break;



		case 'UpdateLC':
			//更新流程
			$update="UPDATE product SET content='".$content."',pushtime='".$tt."',user='".$username."',spare='".$spare."' WHERE id=".$id;
			$query=mysql_query($update) or die("更新失败:".mysql_error());

			if($query){
				echo_status(array('responseCode'=>'0','responseMsg'=>'更新成功'));	
			}else{
				echo_status(array('responseCode'=>'1','responseMsg'=>'更新失败'));	
			}
			break;

		case 'getAboutUs':
			$GetOneArticleInfo="SELECT * FROM about";
			$query=mysql_query($GetOneArticleInfo) or die("获取失败:".mysql_error());
			if($query){
				while ($row=mysql_fetch_array($query)) {
					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"user"=>$row['user'],"content"=>$row['content'],"pushtime"=>$row['pushtime']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
		break;
		case 'UpdateAboutUs':
			$update="UPDATE about SET content='".$content."',pushtime='".$tt."',user='".$username."',spare='".$spare."' WHERE id=".$id;
			$query=mysql_query($update) or die("更新失败:".mysql_error());
			
			if($query){
				echo_status(array('responseCode'=>'0','responseMsg'=>'更新成功'));	
			}else{
				echo_status(array('responseCode'=>'1','responseMsg'=>'更新失败'));	
			}
			break;

		case 'AddSol': //添加方案 
			$INSERT="INSERT INTO sol ( title , pic , description , pushtime , user ) VALUES ( '{$title}','{$thumbnail}','{$contentSol}','{$tt}' ,'{$username}')";
			$AddProject=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddProject){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;
		//获取方案列表  
		case 'getSolList':
			//拼接条件查询字符串
			$z_sql="SELECT * FROM sol order by pushtime desc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);
			$total = mysql_fetch_array(mysql_query("select count(*) from sol"));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
				$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','description':'".$row["description"]."','pic':'".$row["pic"]."','pushtime':'".$row["pushtime"]."','user':'".$row["user"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		case 'deleteSol': //删除方案
			deletesfn('sol',$id);
		break;
		case 'AddZZ': //添加方案 
			$INSERT="INSERT INTO zz ( title , pic  , pushtime , user ) VALUES ( '{$title}','{$thumbnail}','{$tt}' ,'{$username}')";
			$AddProject=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddProject){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;
		//获取方案列表  
		case 'getZZList':
			//拼接条件查询字符串
			$z_sql="SELECT * FROM zz order by pushtime desc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);
			$total = mysql_fetch_array(mysql_query("select count(*) from zz"));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
				$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','pic':'".$row["pic"]."','pushtime':'".$row["pushtime"]."','user':'".$row["user"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		case 'deleteZZ': //删除资质
			deletesfn('zz',$id);
		break;


	};
?>