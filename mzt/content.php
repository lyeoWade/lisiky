<?php 
    include "dqt/php/com.php";
    
    mysql_query("UPDATE imagearr SET frequency=frequency+1  WHERE id = ".$_GET['id']);

    $GetOneArticleInfo="SELECT * FROM imagearr WHERE id=".$_GET['id'];
    $query=mysql_query($GetOneArticleInfo) or die("获取失败:".mysql_error());

    $num = mysql_num_rows($query);
    if(!$num == 0){
      while ($row=mysql_fetch_array($query)) {

        switch ($row['columns']) {
          case '1':
            $columns="性感妹子";
            break;
          case '2':
            $columns="清纯妹子";
            break;
          case '3':
            $columns="丝袜美腿";
            break;
          case '4':
            $columns="性感动图";
            break;
          default:
            # code...
            break;
        }

        $arr=explode(",",$row['pic']);
        setcookie('imgdata', $row['pic'], time()+3600);
?> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Cache-Control" content="no-transform">
<meta http-equiv="Cache-Control" content="no-siteapp">
<meta name="applicable-device" content="pc">
<title><?php echo $row['title']?> - <?php echo $columns?> - 妹子图</title>
<meta name="keywords" content="">
<meta name="description" content="<?php echo $row['title']?> - 妹子图每日分享最新最全最优质的美女图片">
<meta name="renderer" content="webkit">
<link href="css/main.css" rel="stylesheet" type="text/css">

</head>
<body columns="<?php echo $row['columns']?>">

<?php include "header.php";?>

<div class="main clearfix">

  <?php include "topad.php";?>
   <div class="content">
      <div class="currentpath">当前位置:<a href="http://www.images007.com/">第七图</a> » <a href="http://www.images007.com/xinggan" rel="category tag"><?php echo $columns?></a> » <?php echo $row['title']?></div>
      <h2 class="main-title"><?php echo $row['title']?></h2>
      <div class="main-meta">
         <span>分类：<a href="http://www.images007.com/xinggan" rel="category tag"><?php echo $columns?></a></span>
         <span>发布于<?php echo $row['pushtime']?></span>
         <span><?php echo $row['frequency']?>次浏览</span>
      </div>
      <script type="text/javascript">
          /*图片排行 嵌入*/
          var cpro_id = "u2760936";
      </script>
      <script type="text/javascript" src="http://cpro.baidustatic.com/cpro/ui/c.js"></script>

      
            <div class="main-image">
              <ul>
                  <?php 
                    echo '<li id="imgdata"><img src="'.$seaverSrc.substr($arr[0],6).'" img-data=""/></li>';
                  ?>
              </ul>

              <div style="display: none;" >
                <?php echo $row['note'];?>
              </div>

            </div>
            
      <div class="pagenavi">
         <a href="javascript:;" id="prevpic"><span>«上一张</span></a>

         <a href="javascript:;" id="nextpic"><span>下一张»</span></a>      
      </div>

      <script type="text/javascript">
          /*自适应 创建于 2016/9/12*/
          var cpro_psid = "u2760865";
      </script>
      <script type="text/javascript" src="http://su.bdimg.com/static/dspui/js/f.js"></script>


      <script type="text/javascript">
    /*图加*/
    var cpro_id = "u2760895";
</script>
<script type="text/javascript" src="http://cpro.baidustatic.com/cpro/ui/i.js"></script>

      <div class="main-tags">

        <span>相关标签:</span>
        <?php 
          $tagArr=explode('-',$row['tag']);
          foreach($tagArr as $oneTag){
            echo '<a href="tag.html?keywords='.$oneTag.'" target="_blank">'.$oneTag.'</a>';
          };
        ?>
      </div>

      <?php 
        }
      }else{
        
      }
      ?>
      <dl class="hotlist">
        <!--  -->
        <div style="width: 100%; height: 20px;"></div>

        <dt>推荐妹子</dt>

        <?php 
          $numdata=mysql_query("SELECT * FROM imagearr order by rand() limit  9");
          while($rand=mysql_fetch_array($numdata)){
            
        ?>
        <dd>
            <a href="content.html?id=<?php echo $rand['id']?>" target="_blank">
                <img width="236"  alt="<?php echo $rand['title']?>" src="<?php echo $seaverSrc.substr($rand['coverpic'],3)?>" data-original="images/8.jpg" style="display: inline;">
            </a>
            <span>
                <a href="content.html?id=<?php echo $rand['id']?>" target="_blank"><?php echo $rand['title']?></a>
            </span>
            <span class="time"><?php echo $rand['pushtime']?></span>
            <span class="view"><?php echo $rand['frequency']?>次</span>
        </dd>
        
        <?php 
          //var_dump($rand);
          };
        ?>

      </dl>
      <script type="text/javascript">
    /*内容页最底部*/
    var cpro_id = "u2763227";
</script>
<script type="text/javascript" src="http://cpro.baidustatic.com/cpro/ui/c.js"></script>
   </div>
   <div class="sidebar">
      <div class="widgets_ad">☞&nbsp;<span>公告</span>&nbsp;<small>欢迎大家访问第七图,我们会带给大家高质量的美图；</small>
    </div>
      <?php include 'sidertag.php'; ?>
   </div>
</div>

<?php include 'foot.php'; ?>

<script type="text/javascript" src="js/jquery.js"></script>

<script type="text/javascript">

window.onload=function(){
  var oNext=document.getElementById('nextpic');
  var oPrev=document.getElementById('prevpic');
  var oImgUrlArr=getCookie('imgdata').split(',');
  var oImg=document.getElementById('imgdata').getElementsByTagName('img')[0];
  var i=1;

  document.onkeyup=function(ev){
    if(ev.keyCode==39){
      next()
    }else if(ev.keyCode==37){
      prev();
    }
  }
  oNext.onclick=function(){
    next();
  }

  function next(){
    oImg.src=oImgUrlArr[i].substring(6);
    i++;

    if(i>=oImgUrlArr.length){
      alert('此图集已经浏览完成！');
      i=0;
    }
  }
  oPrev.onclick=function(){
    //alert(123);
    prev();
    
  }
  function prev(){
    oImg.src=oImgUrlArr[i].substring(6);
    i--;
    if(i<=0){
      alert('此图集已经浏览完成！');
      i=oImgUrlArr.length-1;
    }
  }
  console.log(getCookie('imgdata'));
}
function getCookie(cookiename){
  var result;
  var mycookie = document.cookie;
  var start2 = mycookie.indexOf(cookiename + "=");
  if (start2 > -1) {
    start = mycookie.indexOf("=", start2) + 1;
    var end = mycookie.indexOf(";", start);

    if (end == -1) {
      end = mycookie.length;
    }
    result = unescape(mycookie.substring(start, end));
  }

  return result;
}
function setCookie(name, value, Hours){
  var oDate=new Date();
  var oh=oDate.getHours()+Hours;
  oDate.setHours(oh);
  //alert(oDate)
  document.cookie=name+'='+value+';expires='+oDate;
}


function removeCookie(name)
{
  setCookie(name, 'undefined', -10);
}

</script>



</body>
</html>