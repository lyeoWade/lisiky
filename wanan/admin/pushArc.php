<?php
	header('Cache-control:private,must-revalidate');
	header("Content-type: text/html; charset=utf-8"); 

	include "com.php";
	$type         = $_POST['type'];
	$id           = $_POST['id'];
	$title        =htmlspecialchars($_POST['title']);
	$description = str_replace("\r\n", "", $_POST['desc']); 
	$isrecommend  =htmlspecialchars($_POST['isrecommend']);
	$coverpic    =htmlspecialchars($_POST['coverpic']);
	$authorid     =htmlspecialchars($_POST['authorid']);
	$content      =urlencode($_POST['content']);

	//echo $content;
	$media      =$_POST['media'];
	$banner      =$_POST['banner'];
	$mediacoverpic    =$_POST['mediacoverpic'];
	$ismedia     =htmlspecialchars($_POST['ismedia']);
	$ismedias     =$_POST['ismedias'];
	$isexamine      =$_POST['isexamine'];


	$nowpage      =$_POST['nowpage']; //当前第几页
	$PageSize     =$_POST['PageSize']; //每一页多少条
	date_default_timezone_set('Asia/Shanghai');
	$Sid=$_POST['id'];
	$userid=$_POST['userid'];

	$tt=date('Y-m-d H:i:s');

	switch($type){
		case 'pushArcticle': //添加一篇文章 
			$INSERT="INSERT INTO wanan ( 
					title , coverpic , description  ,banner, content , authorid , pageview , media , mediacoverpic, ismedia , isrecommend  , isexamine , zan  , shoucang , pushtime , comment 
					) VALUES ( 
					'{$title}','{$coverpic}','{$description}','{$banner}','{$content}','{$authorid}','0','{$media}','{$mediacoverpic}','{$ismedia}','{$isrecommend}' , '{$isexamine}', '0', '0' ,'{$tt}' , '0'
					)";

			$AddOneArticle=mysql_query($INSERT) or die('插入失败:'.mysql_error());

			if($AddOneArticle){
				echo_status(array('respondCode'=>'0','respondMsg'=>'发布成功'));	
			}else{
				echo_status(array('respondCode'=>'1','respondMsg'=>'发布失败'));	
			}
		break;
		
		//获取晚安理想列表

		case 'GetArcList':
			//echo "231";
			if($ismedias==0){
				$setNewType="and ismedia='".$ismedias."'";
			}
			
			//echo $setNewType;

			if($ismedias==''){
				$setsql="";
			}else{
				$setsql=" WHERE 1 ".$setNewType." ";
			};
			//拼接条件查询字符串
			$z_sql="SELECT * FROM wanan ".$setsql." order by pushtime desc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			//echo $z_sql;
			$query=mysql_query($z_sql);
			$total = mysql_fetch_array(mysql_query("select count(*) from wanan ".$setsql.""));//查询数据库中一共有多少条数据  
			$Total = $total[0]; 
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){
				//获取平论条数
				$commentNum=mysql_fetch_array(mysql_query("select count(*) from comment WHERE typeid=2 and targetid='".$row["id"]."'"));
				
				$userInfo=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id='".$row["authorid"]."'"));

				$result[$i]="{'id':'".$row["id"]."','zuozhe':'".$userInfo[1]."','authorid':'".$row["authorid"]."','userpic':'".$userInfo["pic"]."','content':'".urldecode($row["content"])."','title':'".$row["title"]."','coverpic':'".$row["coverpic"]."','description':'".$row["description"]."','pageview':'".$row["pageview"]."','media':'".$row["media"]."','mediacoverpic':'".$row["mediacoverpic"]."','ismedia':'".$row["ismedia"]."','isrecommend':'".$row["isrecommend"]."','isexamine':'".$row["isexamine"]."','zan':'".$row["zan"]."','cai':'".$row["cai"]."','comment':'".$commentNum[0]."','sc':'".$row["shoucang"]."','pushtime':'".$row["pushtime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;
		
		case 'GetHotList':
			//拼接条件查询字符串
			$z_sql="SELECT * FROM wanan order by comment desc limit 0,10";
			$query=mysql_query($z_sql);
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','pushtime':'".$row["pushtime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.'}';
		break;

		case 'getbanner':
			//拼接条件查询字符串
			$z_sql="SELECT * FROM wanan WHERE isrecommend=0 order by pushtime desc limit 0,5";
			$query=mysql_query($z_sql);
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				$result[$i]="{'id':'".$row["id"]."','banner':'".$row["banner"]."','title':'".$row["title"]."','pushtime':'".$row["pushtime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.'}';
		break;
		case 'GetOneArc':
			$GetOne="SELECT * FROM wanan WHERE id=".$id;
			//var_dump($GetOne);
			$query=mysql_query($GetOne) or die("获取失败:".mysql_error());
			
			if($query){
				while ($row=mysql_fetch_array($query)) {
					$commentNum=mysql_fetch_array(mysql_query("select count(*) from comment WHERE typeid=2 and targetid='".$row["id"]."'"));
					
					$userInfo=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id='".$row["authorid"]."'"));

					echo_status(array("respondCode"=>"0","respondMsg"=>"数据获取成功！","id"=>$row['id'],"title"=>$row['title'],"username"=>$userInfo[1],"userid"=>$row['authorid'],"content"=>urldecode($row['content']),"picture"=>$row['picture'],"coverpic"=>$row['coverpic'],"media"=>$row['media'],"mediacoverpic"=>$row['mediacoverpic'],"isrecommend"=>$row['isrecommend'],"isexamine"=>$row['isexamine'],"ismedia"=>$row['ismedia'],"isrecommend"=>$row['isrecommend'],"zan"=>$row['zan'],"cai"=>$row['cai'],"comment"=>$commentNum[0],"shoucang"=>$row['shoucang'],"pushtime"=>$row['pushtime']));
				}
			}else{
				echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
			}
		break;

		case 'GetBannerList':
			//拼接条件查询字符串
			$z_sql="SELECT * FROM wanan WHERE isrecommend=0 order by pushtime desc limit 0,5";
			$query=mysql_query($z_sql);
			$i=0;
			$result=array();
			while($row=mysql_fetch_array($query)){

				$result[$i]="{'id':'".$row["id"]."','banner':'".$row["banner"]."','title':'".$row["title"]."','pushtime':'".$row["pushtime"]."'}";
				$i++;
			};
			$a=json_encode($result);
			echo '{"result":'.$a.'}';
		break;
	};
?>