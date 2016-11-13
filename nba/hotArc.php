<div class="new-articl">
  <h2>热门新闻</h2>
  <ul class=" arc-list">
	<?php
		//右边热门文章
		$z_sql="SELECT * FROM blong_arclist order by page_view desc limit 1,10";
		$query=mysql_query($z_sql);
		$i=0;
		$result=array();
		while($row=mysql_fetch_array($query)){
	?>
	<li><a class="slh" target="_blank" href="content_<?php echo $row['id'] ?>.html" title="<?php echo $row['title'] ?>"><?php echo $row['title'] ?></a></li>
	<?php }; ?>
  </ul>
</div>