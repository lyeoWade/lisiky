<?php
    include "phpdata/datapage/com.php";
    date_default_timezone_set('Asia/Shanghai');
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit" />
<link href="css/reg.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<title>竞猜排行榜-NBA竞猜,篮球竞猜,篮球赛程,NBA竞彩推荐,足球竞猜推荐</title>
<meta name="keywords" content="极限数据网,NBA数据,足球数据,西甲,中超,意甲,德甲,詹姆斯,科比,韦德,比赛前瞻，实时伤病信息，科比，詹姆斯" />
<meta name="description" content="极限数据网，分享NBA各方面数据，足球数据，NBA实时伤病信息，CBA实时伤病，英超实时伤病。竞彩指南中心,NBA伤病指南,极数据给你最精准的数据分析" />
<script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">

<link rel="stylesheet" type="text/css" href="css/coms.css">

<link rel="stylesheet" type="text/css" href="css/centercom.css">
<link rel="stylesheet" type="text/css" href="css/usercenter.css">
<link rel="stylesheet" type="text/css" href="css/guess.css">
<link rel="stylesheet" type="text/css" href="css/font-awesome.css">

</head>

<body>
<canvas style='position:fixed; left:0; top:0'></canvas>

<?php include "userhead.php";?>

<div class="h30"></div>
<div class="h30"></div>


<!-- 个人中心 -->
<div class="userCenter clearfix" style="position:relative;">
		<div class="user_data fl">
			<!-- 头像 -->
			<div class="user_pic">
				<h2 class="titleh2">篮球竞猜盘</h2>
				<ul class="user_data_list" id="user_data_list">
					<li><a href="guessList.html"><i class="fa fa-angle-right"></i>竞猜首页</a></li>
                    <li><a href="keyrank.html"><i class="fa fa-angle-right"></i>重点排行</a></li>
                    <li><a href="weekrank.html"><i class="fa fa-angle-right"></i>周排行榜</a></li>
                    <li class="active"><a href="monthrank.html"><i class="fa fa-angle-right"></i>月排行榜</a></li>
                    <li><a href="quarterrank.html"><i class="fa fa-angle-right"></i>季排行榜</a></li>
                    <li><a href=""><i class="fa fa-angle-right"></i>竞猜规则</a></li>
				</ul>
			</div>
		</div>
		<div class="user_content fr" id="userWarp">
			<div class="user-center">
				<div class="user-t-center clearfix">
					<div class="fr user-t-warp-right">
						

						<!-- 我的物流 -->
						<div class="user-myway">
							<h2>月排行榜</h2>
                            <div class="colums">
                                
                            </div>
							<div class="gusetwarp">
                            	<!-- 最新竞猜 -->
                            	<div class="newguestwarp guessrank">

                                    <table>
                                        <thead>
                                            <tr>
                                                <th>排名</th>
                                                <th>玩家</th>
                                                <th>总</th>
                                                <th>胜</th>
                                                <th>走</th>
                                                <th>负</th>
                                                <th>胜率</th>
                                                <th>关注度</th>
                                                <th>查看</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbody">
                                            <?php 
                                                $mysql=mysql_query("SELECT * FROM monthrank order by montnpercent desc") or die("查询失败.");
                                                $i=1;
                                                while ($mysqlRow=mysql_fetch_array($mysql)) {
                                                    //$userId=
                                                    $member=mysql_fetch_array(mysql_query("SELECT * FROM member WHERE id=".$mysqlRow['userid'].""));
                                            ?>
                                            <tr>
                                                <td class="ranknum w50"><?php echo $i;?></td>
                                                <td class="w210 guessusername"><a href="my_guess<?php echo $mysqlRow['userid']; ?>.html"><img src="img/user.jpg"><?php echo $member['username']; ?></a></td>
                                                <td class="w50"><?php echo $mysqlRow['monthAll'];?></td>
                                                <td class="w50 red ranknum"><?php echo $mysqlRow['monthWin'];?></td>
                                                <td class="w50"><?php echo $mysqlRow['monthAll']-$mysqlRow['monthWin']-$mysqlRow['monthFail'];?></td>
                                                <td class="w50"><?php echo $mysqlRow['monthFail'];?></td>
                                                <td class="w100 ranknum red"><?php echo $mysqlRow['montnpercent']*100;?>%</td>
                                                <td class="w120 attention"><a href="javascript:
                                                ;"><i class="fa fa-plus"></i>&nbsp;关注</a><span><?php echo $member['attention']; ?></span></td>
                                                <td class="w70"><a href=""><i class="fa fa-search"></i></a></td>
                                            </tr>
                                            
                                            <?php $i++; } ;?>
                                            
                                        </tbody>
                                    </table>

                                </div>
                                
                            </div>
                            
						</div>
					</div>
					
				</div>
			</div>
		</div>
</div>

<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>

<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp" style="position:relative;">
    <?php  include 'foot.php';?>
</div>
<script src="js/comjs.js"></script>
<div id="d" style="display: none;"></div>
<script type="text/javascript" src="js/guess.js"></script>
<script>
window.onload=function(){

    var oTr=document.getElementById('tbody').getElementsByTagName('tr');
    chengeColor(oTr);
}
</script>
</body>
</html>
