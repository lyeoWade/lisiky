<?php 
    include "phpdata/datapage/com.php";
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>极限直播&nbsp;-&nbsp;极限数据网,直播中心提供最全面的直播信号,不漏一场您期待的比赛!</title>
<meta name="keywords" content="极限数据网-NBA直播,中超直播,西甲直播,欧冠直播,德甲直播,五大联赛直播,CBA直播" />
<meta name="description" content="极限数据网,为球迷提供专业的数据分析,盘口分析,伤病信息,以及各个球星视频下载,NBA比赛前瞻分析专业的球对数据对比,球员分析,透彻解析每一场比赛。我们的极限直播中心平均每天提供60场以上的直播信号,供球迷观看,让你享受畅快的比赛快感,进球的激情！" />
<link href="css/reg.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">
<link rel="stylesheet" type="text/css" href="css/online.css">
<script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>
<script src="js/contact.js"></script>
</head>
<body>
<div class="h30"></div>
<div class="h30"></div>
<?php include "userhead.php";?>
<div class="center clearfix">
    <div class="onlineWarp fl">
        <!-- hot video -->
        <div class="mainAdwidth">
            <div class="sideAd">
                <a href="http://aff.weide8aff.com/processing/clickthrgh.asp?btag=a_2994b_4" target="_blank"><img src="img/b3.gif" /></a>
            </div>
        </div>
        <div class="hotvideo" id="">
            <h3>最新集锦</h3>
            <div class="videoList" id="newjj">
            	<a href="video.html" target="_blank" class="keynote">篮球集锦</a>
                <?php 
					$AddOneOnlineInfo="SELECT * FROM Video  ORDER BY updatetime DESC limit 0,15";
					$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
					$i=0;
					$result=array();
					while ($row=mysql_fetch_array($query)) {
				?>
				<a target="_blank" href="videoDetail_<?php echo $row["id"]?>.html"><?php echo $row["title"]?></a> <span>|</span>
				<?php } ?>
                <a href="video.html" target="_blank">[更多集锦] </a>
            </div>
        </div>
        <div class="mainAdwidth">
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=337016" target="_blank"><img src="img/a2.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=345427 " target="_blank"><img src="img/a3.gif" /></a>
            </div>
        </div>
        <div class="onlineWarpList">
            
            <!-- <div class="onlineList" id="newvideo">
                <h3>2016年03月16日 星期三   极限数据直播表</h3>
                <div class="videoList">
                    <ul id="videoListUl">
                        <li label="篮球,NBA,76人,鹈鹕" id="saishi68656" data-time="2016-04-06 07:00">
                        <span class="ptime">07:00</span> 
                        <b class="leag">NBA常规赛</b> 
                        <span class="home">凯尔特人</span> 
                        <img class="homelogo" src="http://duihui.tu.qiumibao.com/nba/76ren.png"> 
                        <span style="font-weight: bold; margin: 0 10px;"> - </span> 
                        <img class="guestlogo" src="http://duihui.tu.qiumibao.com/nba/tihu.png"> 
                        <span class="guest">步行者</span> 
                        <a href="/zhibo/nba/2016/040676renvstihu.htm" target="_blank" class="tip">体育直播 Feed2all From</a> 
                        <a href="http://www.zhibo8.cc/shouji.htm" target="_blank">比分直播</a>  
                        <a href="http://www.188bifen.com/lanqiubifen.htm" target="_blank">文字直播</a>
                        <a href="http://www.188bifen.com/lanqiubifen.htm" target="_blank">在线投注</a>
                        <a class="qqtx"target="_blank" title="添加提醒后，开赛前5分钟，QQ会发送消息提醒您"><img style="display:inline !important;vertical-align:middle; height: 16px; width:50px;margin-top: -2px; " src="http://i.gtimg.cn/snsapp/app/bee/widget/img/icon3.png"></a>
                        <div class="firelineWarp">
                            <p><a href="" class="tip">火线速递:</a> 3月16日19点30分，2016赛季亚冠联赛H组第3轮广州恒大淘宝主场与浦和红宝石的比赛，将在广州天河体育场进行。2013年恒大与浦和亚冠分在同一小组，恒大主场3-0、客场2-3。值得一提的是，恒大2013年首夺亚冠冠军，14场比赛仅负一场，对手就是浦和。恒大4年亚冠与日本球队交锋17次，战绩为10胜4平3负，主场战绩为7胜1平1负。</p>
                        </div>
                        </li>
                        
                    </ul>
                </div>
            </div> --> 
             
        </div>
        <div class="mainAdwidth">
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=45499&url=promo.php" target="_blank"><img src="img/a1.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=337016" target="_blank"><img src="img/a2.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=345427 " target="_blank"><img src="img/a3.gif" /></a>
            </div>
        </div>
    </div>
    <div class="rightside1 fl">
        <!-- 热门视频 -->
        
        <?php include 'hotvideo.php'; ?>

        <div id="siderAd">
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=45499&url=promo.php" target="_blank"><img src="img/01.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=337016" target="_blank"><img src="img/02.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=345427 " target="_blank"><img src="img/03.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://aff.weide8aff.com/processing/clickthrgh.asp?btag=a_2994b_4" target="_blank"><img src="img/b4.gif" /></a>
            </div>
        </div>
    </div><!-- ad -->
</div>
<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp">
<?php  include 'foot.php';?>
</div>


<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"2","bdPos":"right","bdTop":"164.5"},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>

<script src="js/comjs.js"></script>
<script src="js/online.js"></script>
</body>
</html>