<?php if($page>=4 && $totalPage>=6){ ?>
<li><a href="<?php echo $targetLink;?>page=1">首页</a></li>
<?php }; if($page>=2){ ?>
<li><a href="<?php echo $targetLink;?>page=<?php echo $page - 1; ?>">上一页</a></li>
<?php  }; if($totalPage<=5){
        for($i=1; $i<=$totalPage; $i++){
            if($page==$i){
?>
        <li class="active"><a href="<?php echo $targetLink;?>page=<?php echo $i;?>"><?php echo $i ;?></a></li>
<?php 
    }else{
?>
        <li class=""><a href="<?php echo $targetLink;?>page=<?php echo $i;?>"><?php echo $i ;?></a></li>
<?php   
    }
}
}else { 
for($i=1; $i<=5; $i++){
    if($page==1 || $page==2){
        if($page==$i){
?>
<li class="active"><a href="<?php echo $targetLink;?>page=<?php echo $i;?>"><?php echo $i ;?></a></li>
<?php 
        }else{
?>
    <li class=""><a href="<?php echo $targetLink;?>page=<?php echo $i;?>"><?php echo $i ;?></a></li>
<?php
    }//if...else...
}else if(($totalPage - $page)==0 || ($page-$totalPage)==1){
        if( ($totalPage - $page) ==0 && $i==5){
?>
    <li class="active"><a href="<?php echo $targetLink;?>page=<?php echo $totalPage-5+$i;?>"><?php echo $totalPage-5+$i ;?></a></li>
<?php
    }else if(($totalPage - $page) ==1 && $i==4){
?>
 <li class="active"><a href="<?php echo $targetLink;?>page=<?php echo $totalPage-5+$i;?>"><?php echo $totalPage-5+$i ;?></a></li>

<?php 
    }else{
?>
     <li class=""><a href="<?php echo $targetLink;?>page=<?php echo $totalPage-5+$i;?>"><?php echo $totalPage-5+$i ;?></a></li>
<?php 
    }
}else{
    if($i==3){
?>
  <li class="active"><a href="<?php echo $targetLink;?>page=<?php echo $page-3+$i;?>"><?php echo $page-3+$i;?></a></li>
<?php 
    }else{
?>
<li class=""><a href="<?php echo $targetLink;?>page=<?php echo $page-3+$i;?>"><?php echo $page-3+$i;?></a></li>
<?php 
    }
}
?>
<?php 
}//for
}; if(($totalPage-$page)>=1){ ?>
<li><a href="<?php echo $targetLink;?>page=<?php echo $page+1; ?>">下一页</a></li>
<?php }; if(($totalPage-$page)>=3){ ?>
<li><a href="<?php echo $targetLink;?>page=<?php echo $totalPage; ?>">尾页</a></li>
<?php };?>
