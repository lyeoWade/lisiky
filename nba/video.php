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
<div class="main-content clearfix">
    
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
    </div>
    <div class="rightside1 fr">
        <!-- 热门视频 -->
        <div class="BreakingNews fr">
            <ol class="columnwrap">
              <li class="active"><a href="">十佳球</a></li>
              <li class=""><a href="">视频下载</a></li>
            </ol>
            <div class="Newswarp">  
              <div class="newswraptab tabswitch" style="display: block;">
                <ul>
                  <li class="clearfix">
                  <span>[&nbsp;即时&nbsp;]</span>
                  <a href="content_281.html" title="啊实打实的">啊实打实的</a><a href="content_277.html" title="勇士勇士勇士勇士勇士勇士勇士勇士勇士勇士勇士勇士">勇士勇士勇士勇士勇士勇士勇</a><a href="content_276.html" title="马刺马刺马刺马刺马刺">马刺马刺马刺马刺马刺</a><a href="content_275.html" title="骑士骑士骑士骑士骑士骑士骑士骑士骑士骑士骑士v">骑士骑士骑士骑士骑士骑士骑</a>          </li>
                            <li class="clearfix"><span class="shityellow">[&nbsp;勇士&nbsp;]</span>
                      <a target="_blank" href="content_239.html" title="卡莱尔：勇士是可以被击败的">卡莱尔：勇士是可以被击败的</a>          </li>
                            <li class="clearfix"><span class="meihong">[&nbsp;骑士&nbsp;]</span>
                      <a target="_blank" href="content_175.html" title="骑士103：106灰熊，托尼阿伦26分，詹姆斯28+9+5，">骑士103：106灰熊，托尼阿伦26分，詹姆斯28+</a>          </li>
                            <li class="clearfix"><span class="red">[&nbsp;马刺&nbsp;]</span>
                      <a target="_blank" href="content_242.html" title="科尔：球队的很多做法模仿了马刺">科尔：球队的很多做法模仿了马刺</a>          </li>
                            <li class="clearfix"><span class="throuthblue">[&nbsp;湖人&nbsp;]</span>
                                </li>
                            <li class="clearfix"><span class="shityellow">[&nbsp;快船&nbsp;]</span>
                                </li>
                            <li class="clearfix"><span class="blueshot">[&nbsp;火箭&nbsp;]</span>
                      <a target="_blank" href="content_150.html" title="火箭将签下迈克尔-比斯利">火箭将签下迈克尔-比斯利</a>          </li>
                            <li class="clearfix"><span class="red">[&nbsp;雷霆&nbsp;]</span>
                      <a target="_blank" href="content_129.html" title="官方：雷霆掘金完成2换1交易，雷霆送出奥古斯丁、诺瓦克换来弗">官方：雷霆掘金完成2换1交易，雷霆送出奥古斯丁、诺瓦</a>          </li>
                          </ul>
              </div>
              <div class="injuries_nba tabswitch" style="display: none;">
                <ul>
                  <li><span>[&nbsp;安东尼-戴维斯&nbsp;]</span><a target="_blank" href="Injuries.html">膝伤和肩伤</a></li><li><span>[&nbsp;安德鲁-博古特&nbsp;]</span><a target="_blank" href="Injuries.html">左脚大脚趾</a></li><li><span>[&nbsp;钱德勒-帕森斯&nbsp;]</span><a target="_blank" href="Injuries.html">右腿筋</a></li><li><span>[&nbsp;安东尼-戴维斯&nbsp;]</span><a target="_blank" href="Injuries.html">左膝</a></li><li><span>[&nbsp;杰里米-埃文斯&nbsp;]</span><a target="_blank" href="Injuries.html">右肩关节唇</a></li>          
                </ul>
              </div>

            </div>
          </div>
    </div><!-- ad -->
</div>


<div class="center clearfix">
    
    <div class="videoLeft fl">
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
                
            </div>
        </div>
    </div>
    <div class="rightside1 fr">
        <?php include 'hotvideo.php'; ?>
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
