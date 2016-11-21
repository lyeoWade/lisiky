<?php
    include "phpdata/datapage/com.php";

     $AddOneOnlineInfo="SELECT * FROM Video WHERE id=".$_GET['id'];
    $query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
    mysql_query("UPDATE Video SET view = view+1 WHERE id = '".$_GET['id']."' ");
    if($query){
        while ($row=mysql_fetch_array($query)) {
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title><?php echo $row['title']?>&nbsp;-&nbsp;极限数据网,给您最全是体育视频,让您重温球场经典!</title>

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
<body  targetId="<?php echo $row['id']?>">
<div class="h30"></div>
<div class="h30"></div>

<header>
	<nav class="nav-main clearfix">
    	<ul class="fl nav">
            <li class="logo"><a href="index.html">I LOVE NBA</a></li>
            <li class=""><a href="index.html" class="">首页</a></li>
            <li><a href="nba.html">篮球专区</a></li>
            <li><a href="news.html">体育新闻</a></li>
            <li><a href="video.html" class="active">极限视频</a></li>
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

<div class="center clearfix">
    <div class="mainAdwidth">
         <!-- <a href="http://aff.weide8aff.com/processing/clickthrgh.asp?btag=a_2994b_4" target="_blank"><img src="img/b2.gif" /></a>
         <br/>
         <br/> -->
    </div>
    <div class="videoLeft fl">
        
        <div class="VideoDetail">
            <div class="Videohead">
                <h1><?php echo $row['title'] ;?></h1>
                <p><?php echo $row['updatetime'];?> &nbsp;&nbsp; 已有<?php echo $row['view'];?>人观看 <a href="javascript:;" id="collectionVideo"></a></p>
            </div>
            <div class="VideoContent">
                <?php 
                    $infoArr=explode("\n",$row['videoUrl']);
                    if(count($infoArr)>1){
                ?>
                <div class="MoreList"><ul>
                <?php
                        foreach($infoArr as $u){
                            $strarr = explode("|||",$u);
                ?>
                    <li>
                        <a href="javascript:;" targetUrl="<?php echo $strarr[0];?>"  class="img newopen"><img src="<?php echo substr($row['thumPic'],3)?>"></a>
                        <a href="javascript:;" targetUrl="<?php echo $strarr[0];?>"  class="t newopen"><?php echo $strarr[1];?></a>
                        <a href="javascript:;" targetUrl="<?php echo $strarr[0];?>"  class="play fr newopen"></a>
                    </li>
                <?php
                        }
                ?>
                </ul> </div>
                <?php
                    }else{
                        $ListArr=explode("|||",$infoArr[0]);
                        //var_dump($ListArr[0]);
                        
                        //来源 QQ

                        if($row['sourceSite']=='qq'){
                            $VidIndex=strpos($ListArr[0],'?');
                            if($VidIndex==false){//没找到?
                                $VidIndexLast=strripos($ListArr[0],'/');
                                $dotIndex=strripos($ListArr[0],'.h');
                                $Vid=substr($ListArr[0],$VidIndexLast+1,($dotIndex-$VidIndexLast-1));
                                //$Vid=substr($ListArr[0],$VidIndexLast+1,-5);
                                //http://v.qq.com/page/a/k/s/a0189ai0wks.html

                ?>
                        <!-- QQ新版 -->
                        <div class="onlyOne">
                            <div class="clickEle">
                                <iframe width="750" height="510" border='none' src="http://v.qq.com/iframe/player.html?vid=<?php echo $Vid; ?>&width=750&height=510&tiny=0"></iframe>
                            </div>
                            <p><a href="javascript:;" class="newopen" id="showClick" targetUrl="<?php echo $ListArr[0];?>">[播放不了?  PC窗口/PAD观看]</a></p>
                        </div> 
                <?php 
                            }else{
                                $VidIndexLast=strpos($ListArr[0],'=');
                                $Vid=substr($ListArr[0],$VidIndexLast+1);
                           
                ?>
                <!-- QQ新版 -->
                    <div class="onlyOne">
                        <div class="clickEle">
                            <iframe width="750" height="510" border='none' src="http://v.qq.com/iframe/player.html?vid=<?php echo $Vid; ?>&width=750&height=510&tiny=0"></iframe>
                        </div>
                        <p><a href="javascript:;" class="newopen" id="showClick" targetUrl="<?php echo $ListArr[0];?>">[播放不了?  PC窗口/PAD观看]</a></p>
                    </div> 
                <?php
                            }
                            //判断其他来源 {}else if(){}
                        }else if($row['sourceSite']=='ls'){
                            $VidIndexLast=strripos($ListArr[0],'/');
                            $dotIndex=strripos($ListArr[0],'.h');
                            $Vid=substr($ListArr[0],$VidIndexLast+1,($dotIndex-$VidIndexLast-1));
                ?>
                    <div class="onlyOne">
                        <div class="clickEle">
                            <iframe width="750" height="510" border='none' src="http://player.letvcdn.com/lc07_p/201604/13/15/43/15/newplayer/LetvPlayer.swf?pccsUrl=http://www.le.com/cmsdata/playerapi/pccs_PlayerSDK_20160414.xml&vid=<?php echo $Vid;?>&barrage=1&ark=844&share=0&p2=14&ch=lesports&preload=1&autoMute=0&forceCallback=1&camera=0&p1=1&forceCDN=1&callbackJs=vjs_callback_146159900403948&hostnamestr=le"></iframe>
                        </div>
                        <p><a href="javascript:;" class="newopen" id="showClick" targetUrl="<?php echo $ListArr[0];?>">[播放不了?  PC窗口/PAD观看]</a></p>
                    </div>
                <?php
                            //echo $VidIndexLast.'-'.$dotIndex.'-'.$Vid;
                        }else{

                ?>
                <!-- 站外播放  -->
                    <div class="onlyOne">
                        <div class="clickEles">
                            <a targetUrl="<?php echo $ListArr[0];?>" class="newopen"  href="javascript:;">
                                <img src="<?php echo substr($row['thumPic'],3)?>" id="thumbVideo" />
                                <img src="img/play.png" id="playicon" />
                            </a>
                        </div>
                        <p><a href="javascript:;" class="newopen" id="showClick" targetUrl="<?php echo $ListArr[0];?>">[播放不了?  PC窗口/PAD观看]</a></p>
                    </div> 
                <?php
                        }
                    };
                ?>
                <div id="share">
                    <!-- JiaThis Button BEGIN -->
                    <div class="bdsharebuttonbox"><a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间">QQ空间</a><a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博">新浪微博</a><a href="#" class="bds_tieba" data-cmd="tieba" title="分享到百度贴吧">百度贴吧</a><a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博">腾讯微博</a><a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信">微信</a><a href="#" class="bds_sqq" data-cmd="sqq" title="分享到QQ好友">QQ好友</a><a href="#" class="bds_douban" data-cmd="douban" title="分享到豆瓣网">豆瓣网</a><a href="#" class="bds_renren" data-cmd="renren" title="分享到人人网">人人网</a><a href="#" class="bds_mshare" data-cmd="mshare" title="分享到一键分享">一键分享</a><a href="#" class="bds_isohu" data-cmd="isohu" title="分享到我的搜狐">我的搜狐</a><a href="#" class="bds_more" data-cmd="more">分享到：</a></div>
<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{"bdSize":16},"image":{"viewList":["qzone","tsina","tieba","tqq","weixin","sqq","douban","renren","mshare","isohu","duitang"],"viewText":"分享到：","viewSize":"24"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tieba","tqq","weixin","sqq","douban","renren","mshare","isohu","duitang"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
                    <!-- JiaThis Button END -->
                </div>
            </div>


        </div>

        <div class="moreVideo">
            <h2>相关视频</h2>
            <div class="moreVideowrap">
                <ul class="clearfix">
                    <?php 
                        if($row['tag']){
                            $keywords=explode("|",$row['tag']);
                            $keyword=$keywords[0];
                        }else{
                            $keyword='十佳球';
                        }
                        $videomore=mysql_query("SELECT * FROM video WHERE title like '%$keyword%' order by view desc limit 0,12");
                        $videoNum=mysql_num_rows($videomore);
                        if($videoNum==0){
                            echo '暂无数据;';
                        }else{
                            while (@$row=mysql_fetch_array($videomore)) {
                               // var_dump($row);
                    ?>
                            <li><a href="videoDetail_<?php echo $row['id'];?>.html"><img src="<?php echo substr($row['thumPic'],3);?>" title="<?php echo $row['title'];?>"><span><?php echo $row['title'];?></span></a></li>
                    <?php
                            }
                        }
                        
                    ?>
                    

                </ul>
            </div>
        </div>
        <?php
                
                     }
                }else{
                    echo "获取失败";
                };
            ?>
        <div class="mainAdwidth">
            <!-- <br/>
            <br/>
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=337016" target="_blank"><img src="img/a2.gif" /></a>
            </div>
               <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=345427 " target="_blank"><img src="img/a3.gif" /></a>
            </div>
            <div class="sideAd">
                <a href="http://www.well188.com/aff.php?vid=45499 " target="_blank"><img src="img/a1.gif" /></a>
            </div> -->
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
                <a href="http://www.well188.com/aff.php?vid=345427 " target="_blank"><img src="img/03.gif" /></a>
            </div> -->
        </div>
    </div><!-- ad -->
</div>
<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp">
	<?php  include 'foot.php';?>
</div>
<script src="js/comjs.js"></script>
<script src="js/videoDetail.js"></script>
</body>
</html>
