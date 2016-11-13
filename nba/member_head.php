<?php foreach($list as $info): ?>
<div class="user-t-warp clearfix">
	<ul class=" myinfo fl">
		<li>
		<div class="user-t-uesrPic"><a href=""><img src="img/111.jpg" /></a></div>
		<div class="user-t-userInfo">
			<p class="user-t-name"><?php echo $info['username'];?></p>
			<!-- <p class="user-t-vip">普通会员</p> -->
		</div>
		</li>
		<li><a href=""><span>我的金币</span><strong><?php echo $info['gold'];?></strong></a></li>
		<li><a href=""><span>我的积分</span><strong><?php echo $info['integral'];?></strong></a></li>
		<li><a href=""><span>关注度  </span><strong><?php echo $info['attention'];?></strong></a></li>
	</ul>

	<div class="fr bangd">
		<ul class="clearfix">
			<li>
				<span>月重榜</span>
				<?php 
					$mun=mysql_num_rows($mysqlkeyRow);
					if($mun==0){echo '<strong id="keyrank" keyrank="">-</strong>';}
					while(@$mysqlRowNum = mysql_fetch_assoc($mysqlkeyRow)){
						//print_r();
						echo '<strong id="keyrank" keyrank="'.$mysqlRowNum['PM'].'">'.$mysqlRowNum['PM'].'</strong>';
					}
				?>
			</li>
			<li>
				<span>周榜</span>
				<?php 
					$mun=mysql_num_rows($mysqlweekRow);
					if($mun==0){echo '<strong id="weekrank" weekrank="">-</strong>';}

					while(@$mysqlRowNum = mysql_fetch_assoc($mysqlweekRow)){
						echo '<strong id="weekrank" weekrank="'.$mysqlRowNum['PM'].'">'.$mysqlRowNum['PM'].'</strong>';
					}
				?>
			</li>
			<li>
				<span>月榜</span>
				<?php 
					$mun=mysql_num_rows($mysqlRow);
					if($mun==0){echo '<strong id="monthrank" monthrank="">-</strong>';}
					while(@$mysqlRowNum = mysql_fetch_assoc($mysqlRow)){
						//print_r();
						echo '<strong id="monthrank" monthrank="'.$mysqlRowNum['PM'].'">'.$mysqlRowNum['PM'].'</strong>';
					}
				?>
			</li>
			<li>
				<span>季榜</span>
				<?php 
					$mun=mysql_num_rows($mysqlquarRow);
					if($mun==0){echo '<strong id="quarterrank" quarterrank="">-</strong>';}
					while(@$mysqlRowNum = mysql_fetch_assoc($mysqlquarRow)){
						//print_r();
						echo '<strong id="quarterrank" quarterrank="'.$mysqlRowNum['PM'].'">'.$mysqlRowNum['PM'].'</strong>';
					}
				?>
			</li>
			
		</ul>
	</div>
</div>
<?php endforeach; ?>