<div class="hotvideo">
    <h3>热门集锦</h3>
    <ul id="sidehotvideo">
	<?php 
		$AddOneOnlineInfo="SELECT * FROM Video ORDER BY view DESC limit 0,10";
		$query=mysql_query($AddOneOnlineInfo) or die("获取失败:".mysql_error());
		$i=0;
		$result=array();
		while ($row=mysql_fetch_array($query)) {
	?>
	<li><a target="_blank" title="<?php echo $row['title']?>" href="videoDetail_<?php echo $row['id'] ?>.html"><?php echo $row['title']?></a></li>
	<?php } ?> 
    </ul>
</div>