<?php

	include "../phpdata/datapage/com.php";
	
	$act     = $_POST['act'];
	$typeid  = $_POST['typeid'];
	$hotid  = $_POST['hotid'];
	$tag     = $_POST['typename'];
	$nowpage =$_POST['nowpage']; //当前第几页
	$PageSize=$_POST['PageSize']; //每一页多少条
	switch($act){
		case 'list':
			//$z_sql="SELECT * FROM blong_arclist WHERE type_id=1 order by datatime desc limit ($nowpage - 1) * $PageSize, $PageSize";
			$z_sql="SELECT * FROM blong_arclist order by datatime desc limit ".($nowpage - 1) * $PageSize.",".$PageSize;
			$query=mysql_query($z_sql);

			//$total = mysql_fetch_array(mysql_query("select count(*) from blong_arclist where type_id=1"));//查询数据库中一共有多少条数据 
			$total = mysql_fetch_array(mysql_query("select count(*) from blong_arclist"));//查询数据库中一共有多少条数据
			$Total = $total[0];  

			$i=0;
			$result=array();
			if($query){
				while($row=mysql_fetch_array($query)){
					$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','descption':'".$row["descption"]."','banner':'".$row["bannerimg"]."','datatime':'".$row["datatime"]."','keywords':'".$row["keywords"]."','page_view':'".$row["page_view"]."','isrecommend':'".$row["isrecommend"]."','newtype':'".$row["type_id"]."'}";
					$i++;
				};
			}
			

			$a=json_encode($result);
			echo '{"result":'.$a.',"Total":'.$Total.'}';
		break;	
		case 'rightsidelist':
			//右边热门文章
			$z_sql="SELECT * FROM blong_arclist order by page_view desc limit 1,10";
			$query=mysql_query($z_sql);
			$i=0;
			$result=array();
			//echo $query;
			while($row=mysql_fetch_array($query)){
				
				$navs=mysql_fetch_array(mysql_query("SELECT * FROM blong_arctype WHERE id=".$row["type_id"].""));
				
				$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','des':'".$row["descption"]."','nav':'".$navs["typename"]."','navid':'".$navs["id"]."','bannerimg':'".$row["bannerimg"]."','times':'".$row["datatime"]."','columnUrl':'".$navs["url"]."','typeid':'".$navs["id"]."'}";
				$i++;
			};
			$a=json_encode($result);
			//var_dump($a);
			echo '{"result":'.$a.',"counts":'.count($result).'}';
		break;
		case 'nav':
			$nav_sql="SELECT * FROM  blong_arctype";
			
			$query=mysql_query($nav_sql);
			$i=0;
			$result=array();
			
			while($row=mysql_fetch_array($query)){
				$result[$i]="{'id':'".$row["id"]."','nav':'".$row["typename"]."','url':'".$row["url"]."'}";
				$i++;
			}
			
			echo '{"a":'.json_encode($result).'}';
		break;
		case 'tag':
			$tag_sql="SELECT * FROM blong_tag ";
			$query=mysql_query($tag_sql);
			//$tag_row=mysql_fetch_array($query);
			$i=0;
			$result=array();
			while($tag_row=mysql_fetch_array($query)){
				$result[$i]="{'id':'".$tag_row["id"]."','tag':'".$tag_row["tag_value"]."'}";
				$i++;
			};
			echo json_encode($result);
		break;
		case 'taglist':
			
			$z_sql="SELECT * FROM blong_arclist  WHERE type_tag='".$tag."' order by datatime desc";
			
			$query=mysql_query($z_sql);

			$i=0;
			
			$result=array();
			
			
			while($row=mysql_fetch_array($query)){
				
				$result[$i]="{'id':'".$row["id"]."','title':'".$row["title"]."','des':'".$row["descption"]."','img':'".$row["url"]."'}";
				
				$i++;
			};
			$a=json_encode($result);

			echo '{"result":'.$a.',"counts":'.count($result).'}';
		break;	
		case 'recommend':
			$recommend_sql="SELECT * FROM blong_arclist WHERE type_id = 10 order by page_view desc limit 0,10";
			$query=mysql_query($recommend_sql);
			//$tag_row=mysql_fetch_array($query);
			$i=0;
			$result=array();
			while($recommend_row=mysql_fetch_array($query)){
				$result[$i]="{'id':'".$recommend_row["id"]."','title':'".$recommend_row["title"]."'}";
				$i++;
			};
			echo json_encode($result);			
		break;
		case 'getbanner':
			$getBannerStr="SELECT  * FROM blong_arclist  WHERE bannerimg like '%phpdata%' order by datatime desc LiMIT 5";
			//$getBannerStr="SELECT * FROM blong_arclist LiMIT 5";
			$query=mysql_query($getBannerStr) or die("查询失败啦啦啦啦！");
			$i=0;
			$result=array();
			while($recommend_row=mysql_fetch_array($query)){
				$result[$i]="{'id':'".$recommend_row["id"]."',
				'bannerimg':'".$recommend_row["bannerimg"]."',
				'title':'".$recommend_row["title"]."'}";
				$i++;
			};
			$a=json_encode($result);

			echo '{"result":'.$a.',"counts":'.count($result).'}';
		break;
	}
	
?>