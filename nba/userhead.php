
<header>
  <nav class="nav-main clearfix">
    <ul class="fl nav">
      <li class="logo"><a href="index.html">I LOVE NBA</a></li>
      <li class=""><a href="index.html" class="">首页</a></li>
      <li><a href="nba.html">篮球专区</a></li>
      <li><a href="news.html">体育新闻</a></li>
      <li><a href="video.html">极限视频</a></li>
      <li><a href="Injuries.html">NBA伤病</a></li>
      <li><a href="online.html">极限直播</a></li>
      <!-- <li><a href="guessList.html">竞猜中心</a></li> -->
    </ul>
    
    <!--登录 -->

    <ul class="login">
    <?php
		$userid=$_COOKIE['userid'];

		if($userid){
			$mysql=mysql_query("SELECT * FROM member WHERE id=".$userid) or die("查询用户失败:".mysql_error());
			if(@$row=mysql_fetch_array($mysql)){
				echo '<li class="avatar"><a href="house"><img src="'.$row['avatar'].'" /></a>
						<div class="userdrop">
							<strong>'.$row['username'].'</strong>
							<a href="house">个人中心</a>
							<a href="house">我的财富</a>
							<a href="house">我的积分</a>
							<a href="house">我的资料</a>
							<a href="javascript:;" id="out">退出</a>
						</div>
				</li>';
			}
			
		}else{
			echo '<li><a href="register.html">注册</a></li><li><a href="login">登录</a></li>';  
		};
	    
	?>
    </ul>
    <div class="search-box fr"> </div>
  </nav>
</header>

