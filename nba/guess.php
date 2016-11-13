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
<title>比赛竞猜-NBA竞猜,篮球竞猜,篮球赛程,NBA竞彩推荐,足球竞猜推荐</title>
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
<link rel="stylesheet" type="text/css" href="phpdata/css/web_cack.css">


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
					<li class="active"><a href="guessList.html"><i class="fa fa-angle-right"></i>竞猜首页</a></li>
                    <li><a href="keyrank.html"><i class="fa fa-angle-right"></i>重点排行</a></li>
                    <li><a href="weekrank.html"><i class="fa fa-angle-right"></i>周排行榜</a></li>
                    <li><a href="monthrank.html"><i class="fa fa-angle-right"></i>月排行榜</a></li>
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
							<h2>篮球竞猜列表</h2>
                            <div class="colums">
                                <a href="">上日赛果</a>
                            	<a href="" class="active">最新竞猜</a>
                                <a href="">下日赛事</a>
                            </div>
							<div class="gusetwarp">
                            	<!-- 最新竞猜 -->
                            	<div class="newguestwarp">
                                    <?php
                                    $type=$_POST['type'];
                                    $datenow=date("H");
                                    
                                    $nowday=date("Y-m-d");
                                    
                                   // echo date('Y-m-d H:i');

                                     //echo date('w');
                                    $nextday=date("Y-m-d",strtotime('+1 days'));
                                    //echo $nextday;
                                    if($datenow>=12){ //当时间大于12点时  显示当天12点以后到下一天12的数据
                                        $getAgena="SELECT * FROM basketball_agena WHERE isGuess='0' and guessTime like '%$nextday%' order by ptime ASC";
                                    }else{
                                         $getAgena="SELECT * FROM basketball_agena WHERE isGuess='0' and guessTime like '%$nowday%'  order by ptime ASC";
                                    }
                                    
                                    $getAgenaQuery=mysql_query($getAgena) or die("查询失败:".mysql_error());
                                        
                                    $i=0;
                                    $i=mysql_num_rows($getAgenaQuery);

                                    if($i==0){
                                    ?>

                                    <div class="nulldata"><?php echo "暂无数据;";?></div>

                                    <?php        
                                        }else{
                                            while($row=mysql_fetch_array($getAgenaQuery)){
                                                
                                                //更新比赛  如果当天时间过了中午11点 就更新显示下一天的数据
                                                // 如果还有当天没有结束的比赛则显示在最前面 
                                                $hometeam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["homeid"]."'")) or die("查询主队失败:".mysql_error());
                                                $guestteam=mysql_fetch_array(mysql_query("SELECT * FROM basketball_team WHERE id='".$row["guestid"]."'")) or die("查询客队失败:".mysql_error());

                                                //$HalfTimeScore
                                               // echo $row['l1'];
                                                $homeScore=$row["firsthomescore"]+$row["secondhomescore"]+$row["thirdhomescore"]+$row["fourthhomescore"]+$row["hot1"]+$row["hot2"]+$row["hot3"]+$row["hot4"]+$row["hot5"];

                                                $guestscore=$row["firstguestscore"]+$row["secondguestscore"]+$row["thirdguestscore"]+$row["fourthguestscore"]+$row["got1"]+$row["got2"]+$row["got3"]+$row["got4"]+$row["got5"];


                                                //echo strtotime($row['ptime'])-strtotime(date('Y-m-d H:i'));

                                                //如果小于赛前5分钟则不能竞猜
                                                if((strtotime($row['ptime'])-strtotime(date('Y-m-d H:i')))<=300){

                                                ?>
                                                <table border="1" class="g_tb" gameid="<?php echo $row['id'];?>">
                                                 <thead>
                                                     <tr> <!-- style="background: #1fb5ad; color: #fff;" -->
                                                         <th colspan="2" class="w100 leagueColorxina textleft"><?php echo $row["league"]; ?>   
                                                         <span>
                                                         <?php if($row["isend"]=='true'){
                                                            echo "已结束";
                                                            }; ?>    
                                                         </span> </th>
                                                         <th>半场</th>
                                                         <th>半场让分</th>
                                                         <th>半场大小</th>
                                                         <th>全场</th>
                                                         <th>全场让分</th>
                                                         <th>全场大小</th>
                                                         <th>数据</th>
                                                     </tr>
                                                 </thead> 
                                                 <tbody>
                                                     <tr>
                                                         <td rowspan="2" width="80"><?php echo $row["ptime"]; ?></td>
                                                         <td class="slh"><a href=""><?php echo $hometeam["team"]; ?></a></td>
                                                         <td class="fontw scorered "><?php echo $row["firsthomescore"]+$row["secondhomescore"]; ?></td>
                                                         <td>   
                                                            <div class="p_td">
                                                                <span class="p_l">
                                                                <?php
                                                                    //半场让分
                                                                    if($row['lb1']>=0){
                                                                        echo $row['lb1'];
                                                                    }
                                                                ?>
                                                                </span>
                                                                
                                                            </div>
                                                         </td>
                                                         <td>
                                                            <div class="p_td">
                                                                <span class="p_l">大分&nbsp;<?php echo $row["bb1"]; ?></span>
                                                            </div>
                                                         </td>
                                                         <td class="fontw scorered "><?php echo $homeScore; ?></td>
                                                         <td>
                                                            <div class="p_td">
                                                                <span class="p_l"><?php
                                                                    //全场让分
                                                                    if($row['l1']>=0){
                                                                        echo $row['l1'];
                                                                    }
                                                                ?></span>
                                                            </div>
                                                         </td>
                                                         <td>
                                                            <div class="p_td">
                                                                <span class="p_l">大分&nbsp;<?php echo $row["b1"]; ?></span>
                                                            </div>
                                                         </td>
                                                         <td rowspan="2" class="w70 datarow">
                                                            <a href="">数据分析</a>
                                                            <a href="">查看高手</a>
                                                         </td>
                                                     </tr>
                                                     <tr>
                                                         <td class="w130"><a href=""><?php echo $guestteam["team"]; ?></a></td>
                                                         <td class="fontw scorered "><?php echo $row["firstguestscore"]+$row["secondguestscore"]; ?></td>
                                                         <td>
                                                            <div class="p_td">
                                                                <span class="p_l">
                                                                    <?php 
                                                                        //半场让分
                                                                        if($row['lb1']<0){
                                                                            echo $row['lb1'];
                                                                        }
                                                                    ?>
                                                                </span>
                                                            </div>
                                                         </td>
                                                         <td>
                                                            <div class="p_td">
                                                                <span class="p_l">小分&nbsp;<?php echo $row["bb1"]; ?></span>
                                                            </div>
                                                         </td>
                                                         <td class="fontw scorered "><?php echo $guestscore; ?></td>
                                                         <td>
                                                            <div class="p_td">
                                                                <span class="p_l"><?php 
                                                                     //全场让分
                                                                    if($row['l1']<0){
                                                                        echo $row['l1'];
                                                                    }
                                                                ?></span>
                                                            </div>
                                                         </td>
                                                         <td>
                                                            <div class="p_td">
                                                                <span class="p_l">小分&nbsp;<?php echo $row["b1"]; ?></span>
                                                            </div>
                                                         </td>
                                                     </tr>
                                                 </tbody>  
                                                </table>
                                        
                                        <?php
                                                }else{

                                                
                                        ?>
                                        

                                        <table border="1" class="g_tb" gameid="<?php echo $row['id'];?>">
                                         <thead>
                                             <tr> <!-- style="background: #1fb5ad; color: #fff;" -->
                                                 <th colspan="2" class="w100 leagueColorxina textleft"><?php echo $row["league"]; ?>   
                                                 <span>
                                                 <?php if($row["isend"]=='true'){
                                                    echo "已结束";
                                                    }; ?>    
                                                 </span> </th>
                                                 <th>半场</th>
                                                 <th>半场让分</th>
                                                 <th>半场大小</th>
                                                 <th>全场</th>
                                                 <th>全场让分</th>
                                                 <th>全场大小</th>
                                                 <th>数据</th>
                                             </tr>
                                         </thead> 
                                         <tbody>
                                             <tr>
                                                 <td rowspan="2" width="80"><?php echo $row["ptime"]; ?></td>
                                                 <td class="slh"><a href=""><?php echo $hometeam["team"]; ?></a></td>
                                                 <td class="fontw scorered "><?php echo $row["firsthomescore"]+$row["secondhomescore"]; ?></td>
                                                 <td>   
                                                    <div class="p_td">
                                                        <span class="p_l">
                                                        <?php
                                                            //半场让分
                                                            if($row['lb1']>=0){
                                                                echo $row['lb1'];
                                                            }
                                                        ?>
                                                        </span>
                                                        <a href="javascript:;" class="touchBtn tipTag" data-mod="1,<?php echo $row['id']?>,h,<?php echo $row['guessTime']?>,<?php echo $row['lb1']?>">主</a>
                                                    </div>
                                                 </td>
                                                 <td>
                                                    <div class="p_td">
                                                        <span class="p_l">大分&nbsp;<?php echo $row["bb1"]; ?></span>
                                                        <a href="javascript:;" class="touchBtn" data-mod="2,<?php echo $row['id']?>,o,<?php echo $row['guessTime']?>,<?php echo $row['bb1']?>" class="active">大</a>
                                                    </div>
                                                 </td>
                                                 <td class="fontw scorered "><?php echo $homeScore; ?></td>
                                                 <td>
                                                    <div class="p_td">
                                                        <span class="p_l"><?php
                                                            //全场让分
                                                            if($row['l1']>=0){
                                                                echo $row['l1'];
                                                            }
                                                        ?></span>
                                                        <a href="javascript:;" class="touchBtn"  data-mod="3,<?php echo $row['id']?>,h,<?php echo $row['guessTime']?>,<?php echo $row['l1']?>">主</a>
                                                    </div>
                                                 </td>
                                                 <td>
                                                    <div class="p_td">
                                                        <span class="p_l">大分&nbsp;<?php echo $row["b1"]; ?></span>
                                                        <a href="javascript:;" class="touchBtn"  data-mod="4,<?php echo $row['id']?>,o,<?php echo $row['guessTime']?>,<?php echo $row['b1']?>">大</a>
                                                    </div>
                                                 </td>
                                                 <td rowspan="2" class="w70 datarow">
                                                    <a href="">数据分析</a>
                                                    <a href="">查看高手</a>
                                                 </td>
                                             </tr>
                                             <tr>
                                                 <td class="w130"><a href=""><?php echo $guestteam["team"]; ?></a></td>
                                                 <td class="fontw scorered "><?php echo $row["firstguestscore"]+$row["secondguestscore"]; ?></td>
                                                 <td>
                                                    <div class="p_td">
                                                        <span class="p_l">
                                                            <?php 
                                                                //半场让分
                                                                if($row['lb1']<0){
                                                                    echo $row['lb1'];
                                                                }
                                                            ?>
                                                        </span>
                                                        <a href="javascript:;" class="touchBtn"  data-mod="1,<?php echo $row['id']?>,g,<?php echo $row['guessTime']?>,<?php echo $row['lb1']?>">客</a>
                                                    </div>
                                                 </td>
                                                 <td>
                                                    <div class="p_td">
                                                        <span class="p_l">小分&nbsp;<?php echo $row["bb1"]; ?></span>
                                                        <a href="javascript:;" class="touchBtn"  data-mod="2,<?php echo $row['id']?>,u,<?php echo $row['guessTime']?>,<?php echo $row['bb1']?>">小</a>
                                                    </div>
                                                 </td>
                                                 <td class="fontw scorered "><?php echo $guestscore; ?></td>
                                                 <td>
                                                    <div class="p_td">
                                                        <span class="p_l"><?php 
                                                             //全场让分
                                                            if($row['l1']<0){
                                                                echo $row['l1'];
                                                            }
                                                        ?></span>
                                                        <a href="javascript:;" class="touchBtn"  data-mod="3,<?php echo $row['id']?>,g,<?php echo $row['guessTime']?>,<?php echo $row['l1']?>">客</a>
                                                    </div>
                                                 </td>
                                                 <td>
                                                    <div class="p_td">
                                                        <span class="p_l">小分&nbsp;<?php echo $row["b1"]; ?></span>
                                                        <a href="javascript:;" class="touchBtn"  data-mod="4,<?php echo $row['id']?>,u,<?php echo $row['guessTime']?>,<?php echo $row['b1']?>">小</a>
                                                    </div>
                                                 </td>
                                             </tr>
                                         </tbody>  
                                        </table>


                                        <?php
                                                }
                                            }
                                    }
                                      

                                    ?>
                                    
                                    

                                </div>
                                
                            </div>
                            
						</div>
					</div>
					
				</div>
			</div>
		</div>
</div>

<!-- 在比赛开始前5分钟禁止竞猜 -->


<!-- 
<div id="leayerGuess">
    <div class="lwrap">
        <h2>您确定提交此竞猜结果吗？</h2>
        <p class="guessdetail">大小竞猜  大  2.5</p>
        <p class="important"><input type="checkbox" />设置为重点竞猜<b>将扣除您5个金币！</b></p>
        <div class="subBtn">
            <a href="javascript:;" class="sureBtn">确定</a>
            <a href="javascript:;" class="cancleBtn">取消</a>
        </div>
    </div>
</div>
 -->

<!-- js引用包 
<script src='js/jquery.js'></script> 
<script type="text/javascript" src="js/user_bg.js"></script>
--> 
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
</body>
</html>
