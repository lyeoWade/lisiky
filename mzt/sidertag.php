<!-- <?php 
    //include "dqt/php/com.php";
?>  -->
<div class="widgets_hot">
  <h3>热门标签</h3>
  <span>
    <?php 
      $sql=mysql_query("SELECT * FROM tag ") or die(mysql_error());

      while ($row=mysql_fetch_array($sql)) {
        echo '<a href="tag.html?keywords='.$row['name'].'" target="_blank" class="pink">'.$row['name'].'</a>';
      }
    ?>
  </span>
</div>
<!-- <script src="http://e.e708.net/cpc/diy/index.php?78285_4_20_2_d70000_260|260_" charset="gb2312"></script>
<div style="width: 100%; height: 10px; background: #EEE;"></div>
 -->
<div class="widgets_top">
      <h3>
          排行榜
      </h3>
      
       <?php 
            $numdata=mysql_query("SELECT * FROM imagearr order by rand() limit  4");
            while($rand=mysql_fetch_array($numdata)){
            //var_dump($rand);
      ?>
      <a href="content.html?id=<?php echo $rand['id']?>" target="_blank">
          <img width="115" height="115" alt="<?php echo $rand['title']?>" src="<?php echo $seaverSrc.substr($rand['coverpic'],3)?>">
      </a>
      <?php 
        };
      ?>
  </div>
  <div class="widgets_fix" id="widgets_fix" style="position: static; top: 70px;">
      <script type="text/javascript">
          /*右边悬停广告*/
          var cpro_id = "u2760943";
      </script>
      <script type="text/javascript" src="http://cpro.baidustatic.com/cpro/ui/c.js"></script>
      <dl class="widgets_like" id="like">
          <dt>
              <span class="on" id="guess">
                  猜你喜欢
              </span>
              <span id="love" class="">
                  网友最爱
              </span>
          </dt>
          <?php 
            $numdata=mysql_query("SELECT * FROM imagearr order by rand() limit  10");
            while($rand=mysql_fetch_array($numdata)){
              
          ?>
            <dd class="">
                <a href="content.html?id=<?php echo $rand['id']?>" target="_blank">
                    <?php echo $rand['title']?>
                </a>
            </dd>
          <?php 
            //var_dump($rand);
            };
          ?>
          

          <?php 
            $numdata=mysql_query("SELECT * FROM imagearr order by rand() limit  10");
            while($rand=mysql_fetch_array($numdata)){
              
          ?>
          <dd class="no">
                <a href="content.html?id=<?php echo $rand['id']?>" target="_blank">
                    <?php echo $rand['title']?>
                </a>
            </dd>
          <?php 
            //var_dump($rand);
            };
          ?>
      </dl>
  </div>
  </div>