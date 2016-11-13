<?php
	include "phpdata/datapage/com.php";
    include "member_com.php";
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link href="css/reg.css" type="text/css" rel="stylesheet" />
<link href="css/reset.css" type="text/css" rel="stylesheet" />
<title>个人中心-极限数据</title>
<meta name="keywords" content="极限数据网,NBA数据,足球数据,西甲,中超,意甲,德甲,詹姆斯,科比,韦德,比赛前瞻，实时伤病信息，科比，詹姆斯" />
<meta name="description" content="极限数据网，分享NBA各方面数据，足球数据，NBA实时伤病信息，CBA实时伤病，英超实时伤病。竞彩指南中心,NBA伤病指南,极数据给你最精准的数据分析" />
<script src="js/jquery.min.js"></script>
<script src="js/com.js"></script>
<link rel="bookmark"  type="image/x-icon"  href="favicon.ico"/>
<link rel="shortcut icon" href="favicon.ico">

<link rel="stylesheet" type="text/css" href="css/coms.css">

<link rel="stylesheet" type="text/css" href="css/centercom.css">
<link rel="stylesheet" type="text/css" href="css/usercenter.css">
<link rel="stylesheet" type="text/css" href="css/font-awesome.css">
<style type="text/css">
    
.guesserror{
    font-weight:bold;
    color: green;
}
.guesssuccess{
   font-weight:bold;
    color: #f00;
}
.guessping{
    font-weight:bold;
    color: blue
}
</style>
</head>

<body>
<canvas style='position:fixed; left:0; top:0'></canvas>


<?php include "userhead.php";?>


<div class="h30"></div>
<div class="h30"></div>
<div class="h30"></div>

<div id="user-info">
	
</div>
<!-- 个人中心 -->
<div class="userCenter clearfix" style="position:relative;">
	<div class="user_content" id="userWarp">
		<div class="user-center">
			<div class="user-t-center clearfix">

				<?php
                    // echo $_GET['id'];
                    if($_GET['id'] && $_GET['id']!=$_COOKIE['userid']){
                        include 'guest_member_head.php';
                        echo "<div id='userid' targetid='".$_GET['id']."'></div>";

                    }else{
                        include 'member_head.php';

                        echo "<div id='userid' targetid='".$_COOKIE['userid']."'></div>";
                    } 
                ?>
				<div class="user-warp clearfix">
					
                    <div class="user_data fl">
						<div class="user_pic">
							<h1>个人中心</h1>
							<ul class="user_data_list" id="user_data_list">
                                <?php
                                    if($_GET['id'] && $_GET['id']!=$_COOKIE['userid']){
                                        //include 'guest_member_head.php';

                                        echo '<li><a href="my_article'.$_GET['id'].'.html"  >文章管理</a></li>
                                              <li class="active"><a href="my_guess'.$_GET['id'].'.html" >篮球竞猜</a></li>';
                                    }else{
                                        //include 'member_head.php';

                                        echo ' <li><a href="my_wealth.html"  >我的财富</a></li>
                                            <li><a href="my_integral.html"  >我的积分</a></li>
                                            <li><a href="my_collection.html" class="xg-u " >我的收藏</a></li>
                                            <li><a href="my_article.html"  >文章管理</a></li>
                                            <li class="active"><a href="my_guess.html" >篮球竞猜</a></li>
                                            <li><a href="my_data.html"  >资料中心</a></li>';
                                    } 
                                ?>
                               
                            </ul>
						</div>
					</div>

					<div class="user-myway fl">
						<h2>篮球竞猜</h2>
                        <div class="colums">
                             <?php
                                if($_GET['id'] && $_GET['id']!=$_COOKIE['userid']){
                                    //include 'guest_member_head.php';

                                    echo '<a href="my_guess'.$_GET['id'].'.html" class="active">最新竞猜</a>
                                            <a href="my_history_guess'.$_GET['id'].'.html">历史竞猜</a>';
                                }else{
                                    //include 'member_head.php';

                                    echo '<a href="my_guessList.html" class="active">最新竞猜</a>
                                            <a href="my_history_guess.html">历史竞猜</a>
                                            <a href="follow.html">我的关注</a>
                                            <a href="viewlog.html">查看记录</a>';
                                } 
                            ?>
                        	
                        </div>
						<div class="gusetwarp">
                        	<!-- 最新竞猜 -->
                        	<div class="newguestwarp">

                            	<div class="line">
                                    	<div class="line_type">
                                        	<p class="fl gust-type-t">全场让分</p>
                                            <p class="fr">
                                            	<!-- <span>总<i>12</i></span>
                                                <span>胜<i class="red">8</i></span>
                                                <span>走<i class="blue">2</i></span>
                                                <span>负<i class="green">2</i></span>
                                                <span>胜率<i class="red">78%</i></span> -->
                                            </p>
                                        </div>
                                    	<table class="table-warp">
                                    		<thead>
                                    			<tr>
                                    				<th>赛事</th>
                                    				<th>比赛时间</th>
                                    				<th>主队</th>
                                    				<th>比分</th>
                                    				<th>客队</th>
                                    				<th>盘口</th>
                                    				<th>竞猜详细</th>
                                    			</tr>
                                    		</thead>
                                    		<tbody id="qr">
                                    			<tr>
                                                <td colspan="7">暂无竞猜,<a href="guessList.html" target="_blank">去竞猜</a></td>
                                            </tr>
                                    		</tbody>
                                    	</table>
                                </div>
                                <div class="line">
                                	<div class="line_type">
                                    	<p class="fl gust-type-t">全场大小</p>
                                        <p class="fr">
                                        	<!-- <span>总<i>12</i></span>
                                            <span>胜<i class="red">8</i></span>
                                            <span>走<i class="blue">2</i></span>
                                            <span>负<i class="green">2</i></span>
                                            <span>胜率<i class="red">78%</i></span> -->
                                        </p>
                                    </div>
                                	<table class="table-warp">
                                		<thead>
                                			<tr>
                                				<th>赛事</th>
                                				<th>比赛时间</th>
                                				<th>主队</th>
                                				<th>比分</th>
                                				<th>客队</th>
                                				<th>盘口</th>
                                				<th>竞猜详细</th>
                                			</tr>
                                		</thead>
                                		<tbody id="qd">
                                			<tr>
                                                <td colspan="7">暂无竞猜,<a href="guessList.html" target="_blank">去竞猜</a></td>
                                            </tr>
                                		</tbody>
                                	</table>
                                </div>
                                
                                
                                <div class="line">
                                	<div class="line_type">
                                    	<p class="fl gust-type-t">半场让分</p>
                                        <p class="fr">
                                        	<!-- <span>总<i>12</i></span>
                                            <span>胜<i class="red">8</i></span>
                                            <span>走<i class="blue">2</i></span>
                                            <span>负<i class="green">2</i></span>
                                            <span>胜率<i class="red">78%</i></span> -->
                                        </p>
                                    </div>
                                	<table class="table-warp">
                                		<thead>
                                			<tr>
                                				<th>赛事</th>
                                				<th>比赛时间</th>
                                				<th>主队</th>
                                				<th>比分</th>
                                				<th>客队</th>
                                				<th>盘口</th>
                                				<th>竞猜详细</th>
                                			</tr>
                                		</thead>
                                		<tbody id="banrang">
                                			<tr>
                                                <td colspan="7">暂无竞猜,<a href="guessList.html" target="_blank">去竞猜</a></td>
                                            </tr>
                                		</tbody>
                                	</table>
                                </div>
                                
                                <div class="line">
                                	<div class="line_type">
                                    	<p class="fl gust-type-t">半场大小</p>
                                        <p class="fr">
                                        	<!-- <span>总<i>12</i></span>
                                            <span>胜<i class="red">8</i></span>
                                            <span>走<i class="blue">2</i></span>
                                            <span>负<i class="green">2</i></span>
                                            <span>胜率<i class="red">78%</i></span> -->
                                        </p>
                                    </div>
                                	<table class="table-warp">
                                		<thead>
                                			<tr>
                                				<th>赛事</th>
                                				<th>比赛时间</th>
                                				<th>主队</th>
                                				<th>比分</th>
                                				<th>客队</th>
                                				<th>盘口</th>
                                				<th>竞猜详细</th>
                                			</tr>
                                		</thead>
                                		<tbody id="bd">
                                			<tr>
                                				<td colspan="7">暂无竞猜,<a href="guessList.html" target="_blank">去竞猜</a></td>
                                			</tr>
                                			
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
		

</div>






<!-- js引用包 --> 
<script src='js/jquery.js'></script> 
<!-- 
<script type="text/javascript" src="js/user_bg.js"></script>
 -->
<div class="h30"></div>
<div class="h30"></div>

<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp" style="position:relative;">
	<?php  include 'foot.php';?>
</div>
<script src="js/comjs.js"></script>
<script src="js/my_guess.js"></script>
</body>
</html>
