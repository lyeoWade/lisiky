<?php 
    include "phpdata/datapage/com.php";
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">

<title>NBA篮球极限数据&nbsp;-&nbsp;极限数据网,篮球数据大分析,给您最精准的重点分析!</title>
<meta name="keywords" content="极限数据网,NBA数据分析,NBA心水推荐,NBA直播,NBA对阵分析,NBA比赛前瞻,NBA实时伤病信息,NBA伤病指南" />
<meta name="description" content="极限数据网,为球迷提供专业的数据分析,盘口分析,伤病信息,以及各个球星视频下载,NBA比赛前瞻分析专业的球对数据对比,球员分析,透彻解析每一场比赛。我们的极限直播中心平均每天提供60场以上的直播信号,供球迷观看,让你享受畅快的比赛快感,进球的激情！" />
<link href="css/index.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<link href="css/bascketball.css" type="text/css" rel="stylesheet" />
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>

<link rel="shortcut icon" href="favicon.ico">
<script src="js/jquery.js"></script>
<script src="js/com.js"></script>
<link href="css/coms.css" type="text/css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
</head>
<body>
<div class="h54"></div>
<?php include "userhead.php";?>
<div class="fastnav">
    <ul class="clearfix">
        <li class="fl inj"><a href="Injuries.html">
            <div class="icon">
                <i class="fa fa-user"></i>
            </div>
            <div class="title fr">
                <h2>实时伤病</h2>
                <span>第一手伤病信息</span>
            </div>
        </a></li>
        <li class="fl tuijian"><a href="news.html?id=6">
            <div class="icon">
                <i class="fa fa-thumbs-o-up"></i>
            </div>
            <div class="title fr">
                <h2>心水推荐</h2>
                <span>大师强势推荐</span>
            </div>
        </a></li>
        <li class="fl jixian"><a href="javascript:;">
            <div class="icon">
                <i class="fa fa-subscript"></i>
            </div>
            <div class="title fr">
                <h2>极限数据</h2>
                <span>对数据挖根刨低</span>
            </div>
        </a></li>
        <li class="fl more"><a href="NBAfirst.html">
            <div class="icon">
                <i class="fa fa-bell"></i>
            </div>
            <div class="title fr">
                <h2>今日首发</h2>
                <span>第一时间获知首发名单</span>
            </div>
        </a></li>
    </ul>
</div>
<!-- NBA -->

<div class="content gamelist">
    <div class="gameday-warp">
        <div class="game-head">
            <ul class="gameul clearfix">
                
            </ul>
            <a href="javascript:;" class="prev"></a>
            <a href="javascript:;" class="next"></a>
        </div>
        <div class="gamelist-warp">
            <h3 id="dataday">-</h3>
                
            <ul class="listul" id="listul">
            </ul>
            <div id="endgame">
                
            </div>

        </div>
    </div>
</div> 
<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp">
    <?php  include 'foot.php';?>
</div>
<script src="js/comjs.js"></script>
<script type="text/javascript" src="js/nba.js"></script>
<script type="text/javascript">
initday();
function initday(){

    var iNow=0;
    //算出本月有多少天，放多少个LI
   function nowDays()
   {
       var oDate=new Date();
       //将日期先调到下个月，再将天数调为0 回到上个月最后一天
       oDate.setMonth(oDate.getMonth()+iNow);
       oDate.setMonth(oDate.getMonth()+1,0); 
       //oDate.setDate(0);
       return oDate.getDate();
   };
   // 算出本月第一天是星期几
   function firstDay()
   {
        var oDate=new Date();
        oDate.setMonth(oDate.getMonth()+iNow);
         oDate.setDate(1);
         return oDate.getDay();
         // 0-6   星期天是0
   };
    var oDate=new Date();
    var oUl=document.querySelectorAll('.gameul')[0];
    //接收本月第一天是星期几
   var firstWeek=firstDay();
   if(firstWeek==0)firstWeek=7;
   firstWeek--;
    //接收本月有几天
    var days=nowDays();
    
    //根据本月有多少天创建LI
    var k=firstWeek+1;
    var weeks=['一','二','三','四','五','六','日'];
    var strhtml='';
    for(var i=0;i<days;i++)
    {
        strhtml+='<li day="'+(i+1)+'"><span>星期'+weeks[k-1]+'</span><strong>'+oDate.getFullYear()+'-'+toZero((oDate.getMonth()+1))+'-'+toZero((i+1))+'</strong></li>';
        if(k<7)k++
        else k=1 
    };
    
    oUl.innerHTML=strhtml+'<li day="1"><span>星期'+weeks[k-1]+'</span><strong>'+oDate.getFullYear()+'-'+toZero((oDate.getMonth()+2))+'-'+toZero(1)+'</strong></li><li day="2"><span>星期'+weeks[k]+'</span><strong>'+oDate.getFullYear()+'-'+toZero((oDate.getMonth()+2))+'-'+toZero(2)+'</strong></li><li day="3"><span>星期'+weeks[k+1]+'</span><strong>'+oDate.getFullYear()+'-'+toZero((oDate.getMonth()+2))+'-'+toZero(3)+'</strong></li>';
};

//日期的效果
dateeffect();
function dateeffect(){
    var oUl=document.querySelectorAll('.gameul')[0];
    
    var aLi=oUl.children;
    var oDate=new Date();
    var oDay=oDate.getDate();
    var oHours=oDate.getHours();
    oUl.style.width=(aLi[0].offsetWidth+17)*aLi.length+'px';

    oUl.style.left=-(aLi[0].offsetWidth+17)*(oDay-4)+20+'px';
    //默认显示当天的  当当日的时间超过下午4点 那么现实下一日的比赛
    for(var i=0; i<aLi.length; i++){
        var oDateDay=aLi[i].getAttribute('day');
        if(oDateDay==oDay){
            if(oHours>=16){
                aLi[i+1].className='active';
                 oUl.style.left=-(aLi[0].offsetWidth+17)*(oDay-3)+20+'px';
            }else{
                aLi[i].className='active';
            }           
        }
    };
};

$(function(){
    var oPrev=$('.prev');
    var oNext=$('.next');
    var oLi=$('.gameul li');
    var AllWidth=$('.gameul').width();
    var oW=$('.gameul li').width()+17;
    var oDate=new Date();
    var iNow=oDate.getDate()-3;
    oPrev.on('click',function(){
        if(iNow<=0){
            return;
        }else{
            iNow--;
        }
        $('.gameul').stop().animate({'left':-iNow*oW});
    });
    oNext.on('click',function(){
        if(iNow>=oLi.length-7){
            return;
        }else{
            iNow++;
        }
        $('.gameul').stop().animate({'left':-iNow*oW});
    });
});
</script>

<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"slide":{"type":"slide","bdImg":"2","bdPos":"right","bdTop":"164.5"},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"16"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
</body>
</html>
