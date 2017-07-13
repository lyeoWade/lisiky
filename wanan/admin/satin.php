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
	//=str_replace("\r\n","",$text);
	//echo $desc;
	$isrecommend  =htmlspecialchars($_POST['isrecommend']);
	$newbanner    =htmlspecialchars($_POST['newbanner']);
	$keywords     =htmlspecialchars($_POST['keywords']);
	$content      =urlencode($_POST['content']);

	$plpval       =htmlspecialchars(str_replace("\r\n", "", $_POST['plpval'])); //$_POST['plpval'];
	$picture      =$_POST['picurl'];
	$satintype    =$_POST['satintype'];
	$username     =htmlspecialchars($_POST['username']);
	$satintype      =$_POST['satintype'];
	$nowpage      =$_POST['nowpage']; //当前第几页
	$PageSize     =$_POST['PageSize']; //每一页多少条
	date_default_timezone_set('Asia/Shanghai');
	$Sid=$_POST['id'];
	$satinid=$_POST['satinid'];
	$commentid=$_POST['commentid'];
	
	$userid=$_POST['userid'];
	$commenttypeid=$_POST['commenttypeid'];
	$targetid=$_POST['targetid'];
	$ConmentTypeIdForZan=$_POST['typeZanid'];
	$ConmentTypeIdForCai=$_POST['typeZanid'];

	$ManagerType=$_POST['ManagerType'];
	//echo $title;
	/*
		$status -->1 通过  2-->审核
		$ManagerType->1管理员  2->用户
	*/
	$tt=date('Y-m-d H:i:s');
	if($ManagerType==2){
		$pageview=0;
		$status=2; 
		$isrecommend=1;
	}else if($ManagerType==1){
		$pageview=100;
		$status=1; 
	}

	switch($type){
		// case 'list'://文章列表
		// 	if($newtype){
		// 		$setNewType="and type_id='".$newtype."'";
		// 	}
		// 	if($title){
		// 		$newTitle="and title like '%$title%'";
		// 	};
		// 	if($username){
		// 		$newUsername="and username='".$username."'";
		// 	};

		// 	if($newtype=='' && $title=='' && $username==''){
		// 		$setsql="";
		// 	}else{
		// 		$setsql=" WHERE 1 ".$setNewType." ".$newTitle." ".$newUsername." ";
		// 	};
		// 	//echo $setsql;
		// 	//拼接条件查询字符串
		// 	$z_sql="SELECT * FROM blong_arclist ".$setsql." order by datatime desc  limit ".($nowpage - 1) * $PageSize.",".$PageSize;

		// 	$query=mysql_query($z_sql);

		// 	$total = mysql_fetch_array(mysql_query("select count(*) from blong_arclist ".$setsql.""));//查询数据库中一共有多少条数据  
		// 	$Total = $total[0]; 

		// 	$i=0;
		// 	$result=array();
		// 	while($row=mysql_fetch_array($query)){

		// 		// $firstIndex=strpos($row["article"],'src="');
		// 		// $lastIndex=strpos($row["article"],'title');
		// 		// //echo ("/".$firstIndex.'---'.$lastIndex);
		// 		// $substrStr=substr($row["article"],$firstIndex,$lastIndex);


		// 		preg_match('/<img.+src=\"?(.+\.(jpg|gif|bmp|bnp|png))\"?.+>/i',$row["article"],$match);
		// 		//echo $match[1];

		// 		$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','descption':'".$row["descption"]."','banner':'".$row["bannerimg"]."','datatime':'".$row["datatime"]."','keywords':'".$row["keywords"]."','page_view':'".$row["page_view"]."','username':'".$row["username"]."','isrecommend':'".$row["isrecommend"]."','newtype':'".$row["type_id"]."','userid':'".$row["userid"]."','status':'".$row["status"]."','thumb':'".$match[1]."'}";
		// 		$i++;
		// 	};
		// 	$a=json_encode($result);
		// 	echo '{"result":'.$a.',"Total":'.$Total.'}';
		// break;
		// case 'DeleteOneArclist': //删除一篇文章
		// 	deletesfn('blong_arclist',$id);
		// break;


		// case 'DeleteOneArclist': //删除一篇文章
		// 	deletesfn('blong_arclist',$id);
		// break;

		// case 'userDeleteNotUseArticle': //删除一篇文章
		// 	$userid      =$_POST['userid'];
		// 	$arcid      =$_POST['arcid'];
		// 	//if(){}
		// 	$checkSql=mysql_query("SELECT * FROM blong_arclist  WHERE id = ".$arcid."");
		// 	$row=mysql_fetch_array($checkSql);
		// 	if($row){
		// 		if($row['userid']==$userid){
		// 			$deletes=mysql_query("DELETE FROM blong_arclist WHERE id = ".$arcid."") or die('删除失败'.mysql_error());

		// 			if($deletes){
		// 				echo_status(array('msg'=>'删除成功','code'=>'0'));
		// 				//扣除积分80%
		// 			}else{
		// 				echo_status(array('msg'=>'删除失败','code'=>'1'));	
		// 			};
		// 		};
		// 	}else{
		// 		echo_status(array('msg'=>'删除失败,请联系客服;','code'=>'1'));
		// 	}
		// break;

		// case 'userDeleteArticle':
		// 	$userid      =$_POST['userid'];
		// 	$arcid      =$_POST['arcid']; //当前第几页
		// 	//if(){}
		// 	$checkSql=mysql_query("SELECT * FROM blong_arclist  WHERE id = ".$arcid."");
		// 	$row=mysql_fetch_array($checkSql);
		// 	if($row){
		// 		if($row['userid']==$userid){
		// 			$deletes=mysql_query("DELETE FROM blong_arclist WHERE id = ".$arcid."") or die('删除失败'.mysql_error());

		// 			if($deletes){
		// 				mysql_query("UPDATE member SET integral=integral-40 WHERE id=".$userid);
		// 				echo_status(array('msg'=>'删除成功','code'=>'0'));
		// 				//扣除积分80%
		// 			}else{
		// 				echo_status(array('msg'=>'删除失败','code'=>'1'));	
		// 			};
		// 		};
		// 	}else{
		// 		echo_status(array('msg'=>'删除失败,请联系客服;','code'=>'1'));
		// 	}
		// break;

		
		// 	//echo '{"result":'.$query.',"counts":'.count($result).'}';
		case 'pushOneSatin': //添加一篇文章 
			$INSERT="INSERT INTO satin ( userid , content , picture  , satintype , zan , cai , shoucang , pushtime , comment ) VALUES ( '{$userid}','{$content}','{$picture}','{$satintype}' , '0', '0', '0' ,'{$tt}' , '0')";

			$AddOneArticle=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddOneArticle){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;

		case 'Pushplp': //漂流瓶 
			$INSERT="INSERT INTO plp ( userid , content , zan  , pushtime ) VALUES ( '{$userid}','{$plpval}','{$zan}','{$tt}')";

			$AddOnePlp=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddOnePlp){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;
		case 'GetPlpList':
			$z_sql="SELECT * FROM plp order by pushtime asc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);
			$total = mysql_fetch_array(mysql_query("select count(*) from plp"));
			$Total = $total[0]; 
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				$userSql=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['userid']));
				$result[$i]="{'id':'".$row["id"]."','content':'".urldecode($row["content"])."','zan':'".$row["zan"]."','username':'".$userSql['username']."','pic':'".$userSql["pic"]."','pushtime':'".$row["pushtime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		// case 'UpdataOneArticle': //更新一篇文章
		// 	//echo $content;
		// 	$UpdataOneArticle="UPDATE blong_arclist SET title='".$title."',descption='".$desc."',article='".$content."',keywords='".$keywords."',bannerimg='".$newbanner."',isrecommend='".$isrecommend."',type_id='".$newtype."'  WHERE id=".$Sid;
		// 	$UpdataONE=mysql_query($UpdataOneArticle) or die('更新失败:'.mysql_error());
		// 	if($UpdataONE){
		// 		echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
		// 	}else{
		// 		echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
		// 	}
		// break;
		// case 'UpdataOneUserArticle': //更新一篇文章
		// 	//echo $content;
		// 	$UpdataOneArticle="UPDATE blong_arclist SET title='".$title."',descption='".$desc."',article='".$content."',keywords='".$keywords."',type_id='".$newtype."',status='".$status."'  WHERE id=".$Sid;

		// 	$UpdataONE=mysql_query($UpdataOneArticle) or die('更新失败:'.mysql_error());
		// 	if($UpdataONE){
		// 		echo_status(array('respondCode'=>'0','respondMsg'=>'更新成功'));	
		// 	}else{
		// 		echo_status(array('respondCode'=>'1','respondMsg'=>'更新失败'));	
		// 	}
		// break;
		// case 'Through': //通过则给发布文章的用户增加50积分 
		// 	$userid=$_POST['userid'];
		// 	$Updatastatus="UPDATE blong_arclist SET status='1' WHERE id=".$Sid;
		// 	mysql_query("UPDATE member SET integral = integral+50 WHERE id = '".$userid."' ");

		// 	$UpdataONE=mysql_query($Updatastatus) or die('插入失败:'.mysql_error());
		// 	if($UpdataONE){
		// 		echo_status(array('respondCode'=>'0','respondMsg'=>'更新成功'));	
		// 	}else{
		// 		echo_status(array('respondCode'=>'1','respondMsg'=>'更新失败'));	
		// 	}
		// 	break;
		// case 'refuse': //拒绝 状态码为3
		// 	$userid=$_POST['userid'];
			
		// 	$Updatastatus="UPDATE blong_arclist SET status='3' WHERE id=".$Sid;

		// 	$UpdataONE=mysql_query($Updatastatus) or die('插入失败:'.mysql_error());
		// 	if($UpdataONE){
		// 		echo_status(array('respondCode'=>'0','respondMsg'=>'更新成功'));	
		// 	}else{
		// 		echo_status(array('respondCode'=>'1','respondMsg'=>'更新失败'));	
		// 	}

		// 	break;
		//获取一条段子
		case 'GetOneSatin':
			$GetOneSatin="SELECT * FROM satin WHERE id=".$satinid;
			$query=mysql_query($GetOneSatin) or die("获取失败:".mysql_error());
			if($query){
				while ($row=mysql_fetch_array($query)) {
					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"username"=>$row['username'],"userid"=>$row['userid'],"content"=>urldecode($row['content']),"picture"=>$row['picture'],"satintype"=>$row['satintype'],"zan"=>$row['zan'],"cai"=>$row['cai'],"comment"=>$row['comment'],"shoucang"=>$row['shoucang'],"pushtime"=>$row['pushtime']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
		break;
		//获取段子列表
		case 'GetSatinList':
			if($satintype){
				$setNewType="and satintype='".$satintype."'";
			}

			if($satintype==''){
				$setsql="";
			}else{
				$setsql=" WHERE 1 ".$setNewType." ";
			};
			//拼接条件查询字符串
			$z_sql="SELECT * FROM satin ".$setsql." order by pushtime desc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);
			$total = mysql_fetch_array(mysql_query("select count(*) from satin ".$setsql.""));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 
			//echo $query;
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				//获取平论条数
				$commentNum=mysql_fetch_array(mysql_query("select count(*) from comment WHERE typeid=1 and targetid='".$row["id"]."'"));
				
				$userInfo=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id='".$row["userid"]."'"));

				//echo $userInfo.'-'.$i.'-'.$row["id"].'////';
				
				$result[$i]="{'id':'".$row["id"]."','zuozhe':'".$userInfo[1]."','userpic':'".$userInfo["pic"]."','content':'".urldecode($row["content"])."','picture':'".$row["picture"]."','zan':'".$row["zan"]."','cai':'".$row["cai"]."','comment':'".$commentNum[0]."','sc':'".$row["shoucang"]."','pushtime':'".$row["pushtime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
			break;
		case 'satinZan':
			// 段子列表赞
			//$query=mysql_query("UPDATE satin SET zan = zan+1 WHERE id = '".$satinid."' ");
			
			if($ConmentTypeIdForZan=='undefined'){
				$query=mysql_query("UPDATE satin SET zan = zan+1 WHERE id = '".$satinid."' ");
			}else{
				//echo $ConmentTypeIdForZan.'--'.$satinid;
				$query=mysql_query("UPDATE comment SET zan = zan+1 WHERE typeid='".$ConmentTypeIdForZan."' and id = '".$satinid."' ");
			}
			
			//var_dump($query);
			if($query){ 
				 echo_status(array('respondCode'=>'0','respondMsg'=>'点赞成功'));
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'点赞失败'));
			}
		break;
		case 'satinCai':
			// 段子列表踩
			if($ConmentTypeIdForCai=='undefined'){
				$query=mysql_query("UPDATE satin SET cai = cai+1 WHERE id = '".$satinid."' ");
			}else{
				$query=mysql_query("UPDATE comment SET cai = cai+1 WHERE typeid='".$ConmentTypeIdForCai."' and id = '".$satinid."' ");
			}
			
			if($query){ 
				 echo_status(array('respondCode'=>'0','respondMsg'=>'很给力的一脚！'));
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'脚折了，没踩成功！'));
			}
		break;
		//获取评论列表
		/*typeid  1
			1->段子
			2->陪你入睡
			3->图片
		*/
		case 'GetCommentList':

			if($commenttypeid==''){
				echo '{"result":"获取失败"}';
			}else{
				$setsql=" WHERE typeid='".$commenttypeid."' and targetid='".$targetid."' ";
			};

			//echo $setsql;

			//拼接条件查询字符串
			$z_sql="SELECT * FROM comment ".$setsql." order by commenttime desc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);
			//var_dump($query);
			$total = mysql_fetch_array(mysql_query("select count(*) from comment ".$setsql.""));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				$userSql=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$row['cuserid']));
				$result[$i]="{'id':'".$row["id"]."','targetid':'".$row["targetid"]."','typeid':'".$row["typeid"]."','content':'".$row["content"]."','picture':'".$row["picture"]."','zan':'".$row["zan"]."','cai':'".$row["cai"]."','username':'".$userSql['username']."','pic':'".$userSql["pic"]."','commenttime':'".$row["commenttime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		//新增评论
		case 'SatinCommentPush':
			$INSERT="INSERT INTO comment ( content , targetid , typeid  , cuserid , zan , cai , commenttime ) VALUES ( '{$content}','{$targetid}','{$commenttypeid}','{$userid}' , '0', '0', '{$tt}' )";

			$AddOneArticle=mysql_query($INSERT) or die('插入失败:'.mysql_error());
			if($AddOneArticle){
				echo_status(array('respondCode'=>'0','respondMsg'=>'评论成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'评论失败'));	
			}
		break;
		
	};
?>