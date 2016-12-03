<?php 
    include "phpdata/datapage/com.php";
    //isrecommend 0 推荐
    $getBannerStr="SELECT  * FROM blong_arclist  WHERE isrecommend='0' order by datatime desc LiMIT 0,6";
    $query=mysql_query($getBannerStr) or die("查询失败啦啦啦啦！");
    $fontTitle=array();
    $bannerId=array();
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>极限数据网&nbsp;-&nbsp;一个做篮球数据分析的网站！</title>
<meta name="keywords" content="极限数据网,NBA数据分析,NBA心水推荐,英超直播,NBA直播,NBA视频集锦,NBA比赛前瞻,NBA实时伤病信息,NBA伤病" />
<meta name="description" content="极限数据网,为球迷提供专业的数据分析,盘口分析,伤病信息,以及各个球星视频下载,NBA比赛前瞻分析专业的球对数据对比,球员分析,透彻解析每一场比赛。我们的极限直播中心平均每天提供60场以上的直播信号,供球迷观看,让你享受畅快的比赛快感,进球的激情！" />
<link href="css/index.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">
<script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>
</head>
<body>
<div class="h30"></div>
<?php include "userhead.php";?>
<div class="banner clearfix">
  <div class="banner-warp fl">
    <div class="banner-ulwarp">
      <ul class="bannerul">
      <?php 
        while($row=mysql_fetch_array($query)){
          //var_dump($row);
          array_push($fontTitle, $row['title']);
          array_push($bannerId, $row['id']);
      ?>
      <li><a href="content_<?php echo $row['id']?>.html" target="_blank"><img src="<?php echo substr($row["bannerimg"],3);?>" title="<?php echo $row['title']?>"></a></li>
      <?php 
        };
      ?>
      </ul>
      <div class="nextprev"><span class="prev"></span> <span class="next"></span> </div>
    </div>
    <ol class="btnol">
    </ol>
    <div class="banner-title">
      <?php 
          for($i=0; $i<count($fontTitle); $i++){
              echo '<a href="content_'.$bannerId[$i].'.html" title="'.$fontTitle[$i].'">'.$fontTitle[$i].'</a>';
          };
      ?>
    </div>
  </div>
  <div class="BreakingNews fr">
    <ol class="columnwrap">
      <li class="active"><a href="">即时新闻</a></li>
      <li><a href="">伤病更新</a></li>
    </ol>
    <div class="Newswarp">  
      <div class="newswraptab tabswitch">
        <ul>
          
          <li class="clearfix">
          <span>[&nbsp;即时&nbsp;]</span>
          <?php 
            $query=mysql_query("SELECT * FROM blong_arclist WHERE status=1 and type_id!=6 order by datatime desc LiMIT 0,4") or die('查询失败'.mysql_error());
            while (@$row=mysql_fetch_array($query)) {
              echo '<a href="content_'.$row['id'].'.html" title="'.$row['title'].'">'.mb_substr($row['title'],0,13,"utf-8").'</a>';
            };
          ?>
          </li>
          <?php 
            $arr=array('勇士','骑士','马刺','湖人','快船','火箭','雷霆');
            $class=array('shityellow','meihong','red','throuthblue','shityellow','blueshot','red','blueshot');
            for($i=0; $i<count($arr); $i++){

          ?>
          <li class="clearfix"><span class="<?php echo $class[$i]?>">[&nbsp;<?php echo $arr[$i]?>&nbsp;]</span>
              <?php 
                $query=mysql_query("SELECT * FROM blong_arclist WHERE status=1 and keywords like '%$arr[$i]%' or title like '%$arr[$i]%' order by datatime desc LiMIT 2,1") or die('查询失败'.mysql_error());

                while (@$row=mysql_fetch_array($query)) {
                  echo '<a target="_blank" href="content_'.$row['id'].'.html" title="'.$row['title'].'">'.mb_substr($row['title'],0,26,"utf-8").'</a>';
                };
              ?>
          </li>
          <?php }; ?>
        </ul>

        <ul>
          <?php 
            $arr=array('神棍','心水');
            $typeid=array('4','6');
            $class=array('warning','blueshot');
            for($i=0; $i<count($arr); $i++){
          ?>
          <li class="clearfix"><span class="<?php echo $class[$i]?>">[&nbsp;<?php echo $arr[$i]?>&nbsp;]</span>

            <?php 
                $query=mysql_query("SELECT * FROM blong_arclist WHERE status=1 and type_id='".$typeid[$i]."' order by datatime desc LiMIT 0,1") or die('查询失败'.mysql_error());
                while (@$row=mysql_fetch_array($query)) {
                  echo '<a target="_blank" href="content_'.$row['id'].'.html"  title="'.$row['title'].'">'.mb_substr($row['title'],0,13,"utf-8").'</a>';
                };
              ?>


          </li>
          <?php }; ?>
        </ul>
      </div>
      <div class="injuries_nba tabswitch" style="display: none;">
        <ul>
          <?php 
            $injuries_nba=mysql_query("SELECT * FROM injuries_nba order by datetime desc LiMIT 0,5") or die('查询失败'.mysql_error());
            while (@$row=mysql_fetch_array($injuries_nba)) {
              //var_dump($row);// $row;
              echo '<li><span>[&nbsp;'.$row['player'].'&nbsp;]</span><a target="_blank" href="Injuries.html">'.$row['reason'].'</a></li>';
            };
          ?>
          
        </ul>
      </div>

    </div>
  </div>
</div>

<script type="text/javascript">
  $(function(){
    $('.columnwrap li').on('mouseenter',function(){
      //alert($(this).index())
      $('.columnwrap li').removeClass('active');
      $(this).addClass('active');
      $('.tabswitch').css('display','none');
     $('.tabswitch').eq($(this).index()).css('display','block');
    })
  });
</script>


<!-- 视频-->
<div class="videowarp content">
  <div class="videowarp-head">
    <h2 class="fl"><i class="icon icon-play-circle"></i>视频推荐</h2>
    <a href="video.html" target="_blank" class="fr more">更多 +</a>
  </div>
  <div class="videolist clearfix">
    <div class="videoplay fl">
      <div class="videoplay-warp">
        <?php 
          $query=mysql_query("SELECT * FROM video WHERE sourceSite='ls' order by updatetime desc LiMIT 0,1") or die('查询失败'.mysql_error());
          while (@$row=mysql_fetch_array($query)) {
            $infoArr=explode("\n",$row['videoUrl']);
            $ListArr=explode("|||",$infoArr[0]);
            $VidIndexLast=strripos($ListArr[0],'/');
            $dotIndex=strripos($ListArr[0],'.h');
            $Vid=substr($ListArr[0],$VidIndexLast+1,($dotIndex-$VidIndexLast-1));
           // var_dump($Vid);
        ?>
        <div style="width: 420px; height:280px; ">
          <iframe width="420" height="280" border='none' src="http://player.letvcdn.com/lc07_p/201604/13/15/43/15/newplayer/LetvPlayer.swf?pccsUrl=http://www.le.com/cmsdata/playerapi/pccs_PlayerSDK_20160414.xml&vid=<?php echo $Vid;?>&barrage=1&ark=844&share=0&p2=14&ch=lesports&preload=1&autoMute=0&forceCallback=1&camera=0&p1=1&forceCDN=1&callbackJs=vjs_callback_146159900403948&hostnamestr=le"></iframe>
        </div>
        <p><a  target="_blank" href="videoDetail_<?php echo $row['id'];?>.html"><?php echo $row['title'];?></a></p>
        <?php }?>
      </div>
    </div>

    <div class="videolistmore fl">
      <ul class="clearfix">
        <?php 
          $query=mysql_query("SELECT * FROM video order by updatetime desc LiMIT 1,6") or die('查询失败'.mysql_error());
          while (@$row=mysql_fetch_array($query)) {
           // var_dump($row)
        ?>
        <li><a  target="_blank" href="videoDetail_<?php echo $row['id'];?>.html" title="<?php echo $row['title'];?>"><img src="<?php echo substr($row['thumPic'],3);?>" alt=""><span><?php echo $row['title'];?></span></a></li>
        <?php 
          }
        ?>
      </ul>
    </div>
  </div>
</div>

<div class="content clearfix">
  <div class="fl content-right">
    <div class="content-box-warps">
      
      <?php 
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
        $perNumber=30; //每页显示的记录数
        $page=$_GET['page']; //获得当前的页面值
        //echo $page;
        $count=mysql_query("select count(*) from blong_arclist ".$setsql." "); //获得记录总数
        $rs=mysql_fetch_array($count); 
        $totalNumber=$rs[0]; //总数 
        $totalPage=ceil($totalNumber/$perNumber); //计算出总页数
        if (!isset($page)) {
         $page=1;
        } //如果没有值,则赋值1
         
        //分页跳转的页面
        $targetLink='index';
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
      <div class="page-list" id="pages">
        <?php include 'page2.php'; ?>
      </div>
    </div>
  </div>
  <aside class="fr">
    <?php include 'hotArc.php'; ?>
    <?php include 'recom.php';?>
    <div class="new-articl side-ad-warp"> </div>
  </aside>
</div>
<!-- <script src="js/pagelist.js"></script> -->
<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp">
  <?php  include 'foot.php';?>
</div>
<script src="js/comjs.js"></script> 
<script type="text/javascript" src="js/index.js"></script>
<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"2","bdPos":"right","bdTop":"164.5"},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
</body>
</html>