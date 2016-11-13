<?php
	include "phpdata/datapage/com.php";
	date_default_timezone_set('Asia/Shanghai');
						
	$t=date('Y-m-d H:i:s');
	$zsql="SELECT * FROM blong_arclist WHERE id= ".$_GET['id'];
	// 更新浏览量
	mysql_query("UPDATE blong_arclist SET page_view = page_view+1 WHERE id = '".$_GET['id']."' ");

	$query=mysql_query($zsql);
	$row=mysql_fetch_array($query);
	if($row){
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
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title><?php echo $row["title"] ?>！极限数据网&nbsp;-&nbsp;一个做篮球数据分析的网站！</title>
<meta name="keywords" content="极限数据网&nbsp;-&nbsp;NBA数据分析,NBA心水推荐,英超直播,NBA直播,NBA视频集锦,NBA比赛前瞻,NBA实时伤病信息,NBA伤病指南" />
<meta name="description" content="极限数据网,为球迷提供专业的数据分析,盘口分析,伤病信息,以及各个球星视频下载,NBA比赛前瞻分析专业的球对数据对比,球员分析,透彻解析每一场比赛。我们的极限直播中心平均每天提供60场以上的直播信号,供球迷观看,让你享受畅快的比赛快感,进球的激情！" />
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">
<meta name="description" content="" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<link href="css/com.css" type="text/css" rel="stylesheet" />
<link href="css/index.css" type="text/css" rel="stylesheet" />
<script src="js/jquery.js"></script>
<script src="js/com.js"></script>
</head>
<body>
<div class="h30"></div>
<div class="h30"></div>
<header>
	<nav class="nav-main clearfix">
    	<ul class="fl nav">
            <li class="logo"><a href="index.html">I LOVE NBA</a></li>
            <li class=""><a href="index.html" class="">首页</a></li>
            <li><a href="nba.html" class="active">篮球专区</a></li>
            <li><a href="news.html">体育新闻</a></li>
            <li><a href="video.html">极限视频</a></li>
            <li><a href="Injuries.html">NBA伤病</a></li>
            <li><a href="online.html">极限直播</a></li>
            <li><a href="recommendarticles.html">推荐文章</a></li>
        </ul>
		<ul class="login">
			<li><a href="register.html">注册</a></li>
			<li><a href="login">登录</a></li>
		</ul>
        
		<div class="search-box fr">
        	
        </div>
    </nav>
</header>
<div class="h30"></div>

<div class="content clearfix">
	<div class="fl content-right ">
		<div class="content-box-warp">
				<section class="content-warp classstyle">
                    <div class="content-head">
						<h1><?php echo $row["title"] ?></h1>
						<p><span class="times">Time:<?php echo $row["datatime"] ?></span><span class="view">Views: <?php echo $row["page_view"] ?> </span><span class="lanmu">Column:<a href="news.html?id=<?php echo $row["type_id"]; ?>"><?php echo $type ?></a></span></p>
					</div>
					<div class="content_descripion">
						<?php echo $row["article"] ?>
                        <p style="margin:30px 0; "><span style="">扫描加入群讨论:</span><img src="img/1443085999712.png" style="width:180px !important; "></p>
					</div>
					<div class="contentshare">
						<div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a><a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧">百度贴吧</a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友">QQ好友</a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网">豆瓣网</a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网">人人网</a><a href="#" class="bds_isohu" data-cmd="isohu" title="分享到我的搜狐">我的搜狐</a><a href="#" class="bds_more" data-cmd="more">分享到：</a></div>
						<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{"bdSize":16},"image":{"viewList":["qzone","tsina","tieba","tqq","weixin","sqq","douban","renren","mshare","isohu","duitang"],"viewText":"分享到：","viewSize":"24"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tieba","tqq","weixin","sqq","douban","renren","mshare","isohu","duitang"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
					</div>
					<?php 
					}else{
						//echo_status(array('respondCode'=>'1','respondMsg'=>'获取失败'));
					}
					?>
				</section>
		</div>
		<div class="mtb15">
			<a target="_blank" href="http://aff.weideaff.com/processing/clickthrgh.asp?btag=a_2994b_6"><img src="img/wd.gif" title="韦德国际,伟德国际,伟德国际备用网址','吉祥坊|吉祥坊合作伙伴|吉祥坊合作|吉祥坊官网|吉祥坊备用网址|吉祥坊手机官网" /></a>
		</div>
      	<div class="conment">
			<h2 class="conment_title">给我一个回复</h2>
			<div class="conment_warp">
				<div class="conment_text_warp">
                	<textarea class="textarea"></textarea>
                    <div class="submit_warp clearfix">
                        <input type="button" value="评论" class="comment_btn_cls" id="comment_btn" />
                        <p class="push_tip">sadasd</p>
                    </div>
                </div>
                <div class="conment_list_box">
                	<ul>
                    	
                    </ul>
                </div>
			</div>
		</div>
    </div>
	
    <script>
	
	</script>
    
    <aside class="fr">
    	<!-- <div class="new-articl">
            <h2>最新发布</h2>
            <ul class="arc-list newArc">  
            </ul>
        </div> -->
        <?php include 'hotArc.php'; ?>
        <?php include 'recom.php'; ?>

        <div class="new-articl  side-ad-warp">

        </div>	
        
    </aside>
</div>
<div class="" style="height:200px; width:100%;"></div>

<div class="foot-warp">
    <?php  include 'foot.php';?>
</div>

<script src="js/comjs.js"></script>
<script src="js/content.js"></script>
</body>
</html>
