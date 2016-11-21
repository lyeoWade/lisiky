<?php
include "phpdata/datapage/com.php";
$fontTitle=array();
$bannerId=array();
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>极限视频&nbsp;-&nbsp;极限数据网,给您最全是体育视频,让您重温球场经典!</title>
<meta name="keywords" content="极限数据网,NBA视频,NBA比赛录像,nba视频集锦,nba视频直播吧,nba视频直播热火,nba 视频,nba视频直播湖人,nba十佳球" />
<meta name="description" content="极限视频,给用户提供精彩的,有价值的比赛视频,我们高效,快速的为您推送精彩NBA,足球,篮球,世界杯比赛视频地址,给你方便快捷舒适的感受！" />
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
    
    <div class="videoLeft fl">
        <div class="videoBanner">
              <div class="bannerbox">
                  <ul class="videobannerUl">
                  	<?php
                    	$AddOneOnlineInfo="SELECT * FROM Video WHERE isChecked=1 ORDER BY updatetime DESC limit 0,8";
						$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
						$i=0;
						$result=array();
						while ($row=mysql_fetch_array($query)) {
                            array_push($fontTitle, $row['title']);
                            array_push($bannerId, $row['id']);
					?>
                    <li><a target="_blank" href="videoDetail_<?php echo $row["id"]?>.html"><img src="<?php echo substr($row["bannerUrl"],3)?>" title="<?php echo $row["title"]?>" alt="<?php echo $row["title"]?>"></a></li>
                    <?php }; ?>
                  </ul>
                  <p class="textWarp">

                    <?php 
                        for($i=0; $i<count($fontTitle); $i++){
                            echo '<a href="videoDetail_'.$bannerId[$i].'.html" title="'.$fontTitle[$i].'">'.$fontTitle[$i].'</a>' ;
                        };
                    ?>
                    
                   <!-- <a href="">22222</a>
                    <a href="">33333</a> -->
                  </p>
                <div class="nextprev">
                    <span class="prev" style="display: none;"></span>
                    <span class="next" style="display: none;"></span>
                </div>
               
                
                <div class="bannerMark"><s></s></div>
              </div>
        </div> 
        <div class="VideoListWarp">
            <div class="videoListHead clearfix">
                <h2 class="fl">视频列表</h2>
                 <div class="hotTag fl">
                   <!--  <span>韦德</span>
                    <span>科比</span>
                    <span>詹姆斯</span>
                    <span>乔丹</span>
                    <span>林书豪</span>
                    <span>麦迪</span>
                    <span>姚明</span>
                    <span>加内特</span>
                    <span>杜兰特</span>
                    <span>利拉德</span> -->
                </div>
                <div class="search fr">
                    <input type="text" value="" class="text" id="searchVideo" placeholder="科比">
                    <span id="searchVideoBtn">搜索</span>
                </div>
            </div>
            <div class="VideoList">
                <ul class="VideoListUl">
                   <?php 
                        $perNumber=30; //每页显示的记录数
                        $page=$_GET['page']; //获得当前的页面值
                        $count=mysql_query("select count(*) from Video"); //获得记录总数
                        $rs=mysql_fetch_array($count); 
                        $totalNumber=$rs[0]; //总数 
                        $totalPage=ceil($totalNumber/$perNumber); //计算出总页数
                        
                        if (!isset($page)) {
                         $page=1;
                        } //如果没有值,则赋值1
                        //分页跳转的页面
                        $targetLink='video.html?';
                        $startCount=($page-1)*$perNumber; //分页开始,根据此方法计算出开始的记录
                        $result=mysql_query("select * from Video  ORDER BY updatetime DESC limit $startCount,$perNumber"); //根据前面的计算出开始的记录和记录数
                        while ($row=mysql_fetch_array($result)) {
                         echo '<li><a target="_blank" href="videoDetail_'.$row["id"].'.html" class="fl"><img src="'.substr($row["thumPic"],3).'"></a><a target="_blank" href="videoDetail_'.$row["id"].'.html" class="fl title slh"><span>'.$row["title"].'</span><span class="descri">'.$row["descention"].'</span></a><a target="_blank" href="videoDetail_'.$row["id"].'.html" class="fr"><span class="playBtn"></span></a></li>';
                        };
                    ?>
                </ul>
            </div>
            <div class="page">
                <ul class="page-list" id="pages">
                    <?php include 'page.php'; ?>
                </ul>
            </div>
            <div class="mainAdwidth">
                <br/>
                <a href="http://aff.weide8aff.com/processing/clickthrgh.asp?btag=a_2994b_10" target="_blank"><img src="img/b2.gif"></a>
                <a href="http://aff.weide8aff.com/processing/clickthrgh.asp?btag=a_2994b_7" target="_blank"><img src="img/b3.gif"></a>
            </div>
        </div>
    </div>
    <div class="rightside1 fr">
        <!-- 热门视频 -->

        <?php include 'hotvideo.php'; ?>

        <div id="siderAd">
            <!-- <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=45499&url=promo.php" target="_blank"><img src="img/01.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=337016" target="_blank"><img src="img/02.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=345427" target="_blank"><img src="img/03.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://aff.weide8aff.com/processing/clickthrgh.asp?btag=a_2994b_5" target="_blank"><img src="img/b4.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://www.williamhillph.com/?a=A000127" target="_blank"><img src="img/w1.jpg" /></a>
            </div> -->
        </div>
    </div><!-- ad -->
</div>
<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp">
	<?php  include 'foot.php';?>
</div>
<script src="js/comjs.js"></script>
<script src="js/video.js"></script>

<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"2","bdPos":"right","bdTop":"164.5"},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
</body>
</html>
