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
<link rel="stylesheet" href="css/font-awesome.min.css">

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
				<?php include 'member_head.php'; ?>
				<div class="user-warp clearfix">
					<div class="user_data fl">
						<div class="user_pic">
							<h1>个人中心</h1>
							<ul class="user_data_list" id="user_data_list">
								<li><a href="my_wealth.html" class="xg-u" >我的财富</a></li>
                                <li><a href="my_integral.html" class="xg-u" >我的积分</a></li>
                                <li><a href="my_collection.html" class="xg-u " >我的收藏</a></li>
                                <li class="active"><a href="my_article.html" class="xg-u" >文章管理</a></li>
                                <li><a href="my_guess.html" class="xg-u" >篮球竞猜</a></li>
                                <li><a href="my_data.html" class="xg-u" >资料中心</a></li>
							</ul>
						</div>
					</div>
					<div class="user-con fl">
                        <div class="user-head">
                            <h2 class="fl">我的文章</h2>
                            <ul class="article-status fl">
                                <li><a href="my_article.html?id=1">已审核</a></li>
                                <li><a href="my_article.html?id=2">审核中</a></li>
                                <li><a href="my_article.html?id=3">未通过</a></li>
                            </ul>
                            <div class="push-article fr">
                                <a href="push_article">发布文章</a>
                            </div>
                        </div>
                        <div class="article-list">
                            <ul class="clearfix">
                                <?php 
                                    // id 文章类型的id 审核中 通过 和未通过
                                    $id=$_GET['id'];
                                    if (!isset($id)) {
                                     $id='1';
                                    };

                                    if($id==''){
                                        $setsql=" ";
                                    }else{
                                        $setsql="and status='".$id."'";
                                    };
                                    
                                    $perNumber=30; //每页显示的记录数
                                    $page=$_GET['page']; //获得当前的页面值
                                    //echo $page;
                                    $count=mysql_query("select count(*) from blong_arclist WHERE userid='".$userid."' ".$setsql." "); //获得记录总数
                                    $rs=mysql_fetch_array($count); 
                                    $totalNumber=$rs[0]; //总数 
                                    $totalPage=ceil($totalNumber/$perNumber); //计算出总页数
                                    if (!isset($page)) {
                                     $page=1;
                                    } //如果没有值,则赋值1

                                    //分页跳转的页面 my_article.php?id=1&page=1
                                    $targetLink='my_article.html?id='.$id.'&';
                                    // $targetLink='news.html?id='.$id.'&';
                                    $startCount=($page-1)*$perNumber; //分页开始,根据此方法计算出开始的记录

                                    //$query=mysql_query("SELECT * FROM blong_arclist WHERE userid='".$userid."' ".$setsql." ") or die('查询失败'.mysql_error());
                                    $query=mysql_query("select * from blong_arclist WHERE userid='".$userid."' ".$setsql." order by datatime desc limit $startCount,$perNumber"); //根据前面的计算出开始的记录和记录数
                                   
                                    //echo $targetLink;
                                    $handHtml='';
                                    
                                        while(@$row=mysql_fetch_array($query)){

                                        if($row['status']=='1'){
                                            $StatusClass='success';
                                            $infoMsg="已通过";
                                            $handHtml='<a href="javascript:;" class="deleteList" arcid="'.$row['id'].'">删除</a>';
                                        }else if($row['status']=='2' ){
                                            $StatusClass='info';
                                            $infoMsg="审核中";
                                            $handHtml='<a href="javascript:;" class="deleteNotUseList" arcid="'.$row['id'].'">删除</a>';
                                        }else if($row['status']=='3'){
                                            $StatusClass='error';
                                            $infoMsg="未通过";
                                            $handHtml='<a href="push_article_'.$row['id'].'" arcid="'.$row['id'].'">修改</a><a href="javascript:;"  class="deleteNotUseList" arcid="'.$row['id'].'">删除</a>';
                                        }

                                    
                                ?>
                                <li>
                                    <span class="<?php echo $StatusClass?> arcstatus"><i class="icon-circle "></i><?php echo $infoMsg?></span>
                                    <a href="content_<?php echo $row['id']?>.html" target="_blank"><?php echo $row['title']?></a>
                                    
                                    <span class="time"><i class="icon-time"></i><?php echo $row['datatime']?></span>

                                    <span class="setting"><i class="icon-cog"></i>设置
                                        <div class="settingDrop">
                                            <em></em>
                                            <?php echo $handHtml;?>
                                        </div>
                                    </span>
                                    
                                </li>
                                <?php }?>
                            </ul>
                            <div class="page">
                                <div class="page-list" id="pages" title="">
                                   <?php include 'page.php'; ?>
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
<div class="h30"></div>
<div class="h30"></div>


<div class="" style="height:40px; width:100%;"></div>
<div class="foot-warp" style="position:relative;">
	<?php  include 'foot.php';?>
</div>
<script src="js/jquery.js"></script>
<script src="js/comjs.js"></script>
<script src="js/my_article.js"></script>
</body>
</html>
