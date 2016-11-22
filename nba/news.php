<?php
	include "phpdata/datapage/com.php";
    $id=$_GET['id'];
    
    if (!isset($id)) {
     $id='';
    };

    if($id){
		$setNewType="type_id='".$id."'";
	}

	if($id==''){
		$setsql="WHERE status!=2 and status!=3 ";
	}else{
		$setsql=" WHERE status!=2 and status!=3 and ".$setNewType." ";
	};
	//echo $setsql;
	//die();
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>新闻中心&nbsp;-&nbsp;极限数据网,新闻中心搜罗球场内外各种新闻!</title>
<meta name="keywords" content="极限数据网-NBA实时新闻,NBA心水推荐,NBA花边新闻,NBA直播,NBA场外新闻,NBA比赛前瞻,NBA丑闻,NBA伤病指南" />
<meta name="description" content="极限数据网,为球迷提供专业的数据分析,盘口分析,伤病信息,以及各个球星视频下载,NBA比赛前瞻分析专业的球对数据对比,球员分析,透彻解析每一场比赛。我们的极限直播中心平均每天提供60场以上的直播信号,供球迷观看,让你享受畅快的比赛快感,进球的激情！" />
<link href="css/index.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">
<script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>
</head>
<body>
<?php include "userhead.php";?>
<div class="h30"></div>
<div class="h30"></div>
<div class="content clearfix">
	<div class="fl content-right">
		<div class="content-box-warps">
			<div class="newtitle">所有的<?php 
				$id=$_GET['id']; //获得当前的页面值
				if($id==''){
					$type="新闻资讯";
				}else if($id==1){
            		$type="篮球新闻";
            	}else if($id==2){
            		$type="足球新闻";
            	}else if($id==3){
            		$type="实时新闻";
            	}else if($id==4){
            		$type="神棍区文章";
            	}else if($id==5){
            		$type="推荐文章";
            	}else if($id==6){
            		$type="篮球心水";
            	}else if($id==7){
            		$type="足球心水";
            	}
            	echo '<span style="color:#f00;">'.$type.'</span>';
			?></div>


			<?php 
                $perNumber=20; //每页显示的记录数
                $page=$_GET['page']; //获得当前的页面值
                $count=mysql_query("select count(*) from blong_arclist ".$setsql." "); //获得记录总数
                $rs=mysql_fetch_array($count); 
                $totalNumber=$rs[0]; //总数 
                $totalPage=ceil($totalNumber/$perNumber); //计算出总页数
                if (!isset($page)) {
                 $page=1;
                } //如果没有值,则赋值1
                
                //分页跳转的页面
                $targetLink='news.html?id='.$id.'&';
                $startCount=($page-1)*$perNumber; //分页开始,根据此方法计算出开始的记录
                $result=mysql_query("select * from blong_arclist ".$setsql." order by datatime desc limit $startCount,$perNumber"); //根据前面的计算出开始的记录和记录数


                while ($row=mysql_fetch_array($result)) {
                	if($row["type_id"]==1){
                		$type="篮球新闻";
                	}else if($row["type_id"]==2){
                		$type="足球新闻";
                	}else if($row["type_id"]==3){
                		$type="实时新闻";
                	}else if($row["type_id"]==4){
                		$type="神棍区";
                	}else if($row["type_id"]==5){
                		$type="推荐文章";
                	}else if($row["type_id"]==6){
                		$type="篮球心水";
                	}else if($row["type_id"]==7){
                		$type="足球心水";
                	}
                ?>
                <section class="content-list">
	                <div class="h2_box">
	                	<h2><a  title="<?php echo $row['title']?>" target="_blank"  href="content_<?php echo $row['id']?>.html"><?php echo $row['title']?></a></h2>
	                	<p class="info-title">所属栏目:<a href="news.html"><?php echo $type;?></a><span><?php echo $row['datatime']?></span></p>
	                </div>
	                <div class="clearfix warp_c">
	               		<div class="descripion fl">
	               			<p class="des"><?php echo $row['descption']?></p>
	               		</div>
	                </div>
	                <div class="clearfix list_info">
	                	<p class="fr"><a title="" href="content_<?php echo $row['id']?>.html" target="_blank">阅读全文</a></p>
	                </div>
                </section>
            <?php
                };
            ?>
		</div>
	    <div class="page">
	    	<div class="page-list" id="pages"  title="">
	    		<?php include 'page.php'; ?>
	    	</div>
	    </div>
	  </div>

    <aside class="fr">
    	<div class="new-articl">
			<h2>标签云</h2>
			<div class="tag-clouds">
				<a href="news.html?id=1">篮球新闻</a>
				<a href="news.html?id=2">足球新闻</a>
				<a href="news.html?id=3">实时新闻</a>
				<a href="news.html?id=4">神棍区</a>
				<a href="news.html?id=5">推荐文章</a>
				<a href="news.html?id=6">篮球心水</a>
				<a href="news.html?id=7">足球心水</a>
			</div>
		</div>
		<?php include 'hotArc.php'; ?>
		<div class="new-articl">
			<!-- <div class="adimg">
				<a  href="http://www.well188.net/aff.php?vid=45499&url=reg.php" title="吉祥坊备用网址,吉祥坊,吉祥坊手机官网" target="_blank"><img src="img/01.gif" /></a>
				
			</div>
			<div class="adimg">
				<a  href="http://www.well188.net/aff.php?vid=45499&url=reg.php" title="吉祥坊备用网址,吉祥坊,吉祥坊手机官网" target="_blank"><img src="img/01.gif" /></a>
				
			</div>
			
			<div class="adimg2">
			    <a target="_blank" title="韦德国际,伟德国际,伟德国际备用网址','吉祥坊|吉祥坊合作伙伴|吉祥坊合作|吉祥坊官网|吉祥坊备用网址|吉祥坊手机官网" href="http://aff.weideaff.com/processing/clickthrgh.asp?btag=a_2994b_6"><img src="img/wd2.gif" /></a>
			</div> -->
		</div>	
    </aside>
</div>
<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp">
	<?php  include 'foot.php';?>
</div>
<script src="js/comjs.js"></script>
<script type="text/javascript" src="js/news.js"></script>

<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"2","bdPos":"right","bdTop":"164.5"},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
</body>
</html>
