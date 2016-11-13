<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="css/reg.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<title>我爱NBA,NBA,足球赛事新闻，赛程，NBA竞彩推荐，足球竞猜推荐</title>
<meta name="keywords" content="极限数据,NBA数据,NBA分析,NBA心水,NBA推荐,英超直播,NBA直播,NBA视频集锦,NBA比赛前瞻,NBA实时伤病信息,NBA伤病" />
<meta name="description" content="极限数据网,为球迷提供专业的数据分析,盘口分析,伤病信息,以及各个球星视频下载,NBA比赛前瞻分析专业的球对数据对比,球员分析,透彻解析每一场比赛。我们的极限直播中心平均每天提供60场以上的直播信号,供球迷观看,让你享受畅快的比赛快感,进球的激情！" /><script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">
<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
<link href="css/usercenter.css" type="text/css" rel="stylesheet" />
</head>
<body>
<?php include "userhead.php";?>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div id="unlogin">
    <div class="unlogintip">
        <i class="fa fa-warning-sign"></i>
        <h1>您需要登录后才能继续操作或浏览,现在将转入登录页面</h1>
        <p><a href="login" id="blankBtn">5秒后,自动跳转</a></p>
    </div>
</div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp">
    <?php  include 'foot.php';?>
</div>

<script>
    window.onload=function(){
        var oBlankBtn=document.getElementById('blankBtn');
        var i=4;
        setInterval(function(){
            oBlankBtn.innerHTML=i+'秒后,自动跳转';
            i--;
            if(i==0){
               window.location.href='login';
            }
        },1000)
    };
</script>
</body>
</html>
