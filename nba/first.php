
<?php
	include "phpdata/datapage/com.php";
	$times=date("Y-m-d");
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">


<title>NBA今日首发名单&nbsp;-&nbsp;极限数据网,一个做篮球数据分析的网站!</title>
<meta name="keywords" content="极限数据网,NBA首发,骑士首发,NBA首发名单,NBA实时伤病信息,NBA伤病指南,湖人队伤病名单,火箭伤病名单" />
<meta name="description" content="极限数据网,为球迷提供专业的数据分析,盘口分析,伤病信息,以及各个球星视频下载,NBA比赛前瞻分析专业的球对数据对比,球员分析,透彻解析每一场比赛。我们的极限直播中心平均每天提供60场以上的直播信号,供球迷观看,让你享受畅快的比赛快感,进球的激情！" />

<link href="css/reg.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<link href="css/first.css" type="text/css" rel="stylesheet" />
<script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">
</head>
<body>
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
<div class="h30"></div>
<div class="firstwarp ">
	<div class="firstTitle">
		<h1><?php echo $times; ?> &nbsp;NBA首发名单</h1>
		<p>一般赛前1小时左右球队公布首发名单</p>
		<p>伤停/首发消息均来自国内外可靠的体育媒体、NBA记者以及球队官方，快速准确，但也难免偶尔官方出现错误或者教练临时调整，望各位见谅。</p>
        <p style="color: red;">最新首发信息,请加群:517478004</p>
		<div class="firstshare">
			<!-- JiaThis Button BEGIN -->
			<div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a><a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧">百度贴吧</a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友">QQ好友</a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网">豆瓣网</a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网">人人网</a><a href="#" class="bds_isohu" data-cmd="isohu" title="分享到我的搜狐">我的搜狐</a><a href="#" class="bds_more" data-cmd="more">分享到：</a></div>
			<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{"bdSize":16},"image":{"viewList":["qzone","tsina","tieba","tqq","weixin","sqq","douban","renren","mshare","isohu","duitang"],"viewText":"分享到：","viewSize":"24"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tieba","tqq","weixin","sqq","douban","renren","mshare","isohu","duitang"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
			<!-- JiaThis Button END -->
		</div>
	</div>

	<div class="teamList">
		<div class="teamListWarp clearfix">
			<?php 
			
			$first="SELECT * FROM first WHERE playtime like '%$times%' order by playtime ASC";
			$query=mysql_query($first);
			while($row=mysql_fetch_array($query)){
			?>

			<div class="col-list clearfix">
				<div class="col-title">
					<a href="javascript:;" class="w100 slh fl"><?php echo $row['hometeam'];?><i>(主)</i></a>
					<span class="w90 fl"><?php echo substr($row['playtime'],0,10);?></span>
					<a href="javascript:;" class="w100 slh fl"><i>(客)</i><?php echo $row['guestteam'];?></a>
				</div>
				<div class="player clearfix">
					<div class="fl playerwarp">
						<span><?php echo $row['hC'];?></span>
						<span><?php echo $row['hPF'];?></span>
						<span><?php echo $row['hSF'];?></span>
						<span><?php echo $row['hSG'];?></span>
						<span><?php echo $row['hPG'];?></span>
					</div>
					<div class="fl playerwarp">
						<span><?php echo $row['gC'];?></span>
						<span><?php echo $row['gPF'];?></span>
						<span><?php echo $row['gSF'];?></span>
						<span><?php echo $row['gSG'];?></span>
						<span><?php echo $row['gPG'];?></span>
					</div>
				</div>
			</div>

			<?php							
			};
			?>
		</div>
	</div>
</div>
<div class="h30"></div>
<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp">
<?php include 'foot.php';?>
</div>

<script src="js/comjs.js"></script>
<!-- <script src="js/first.js"></script> -->
</body>
</html>
