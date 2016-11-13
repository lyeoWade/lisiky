<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>NBA资讯网-NBA,足球赛事新闻，赛程，NBA竞彩推荐，足球竞猜推荐</title>
<meta name="keywords" content="NBA,NBA推荐,足球,西甲,中超,意甲,德甲,詹姆斯,科比,韦德" />
<meta name="description" content="" />

</head>

<body>
<form class="form-horizontal"  role="form" enctype="multipart/form-data" action="echo.php" method="POST">
	<input type="radio" value="noe" name="r" >

	<input type="hidden" name="MAX_FILE_SIZE" value="1000000" />
	<input type="file" class="files" name="filename" />
	<input type="submit" value="确定">


</form>

<?php
	// $r=$_POST['r'];

	// echo $r;
	
	echo var_dump($_FILES);
	echo '<br/>';
	echo '<br/>';

	echo print_r($_FILES["filename"]["name"]);
	echo '<br/>';
	echo '<br/>';
	if(is_uploaded_file($_FILES["filename"]["tmp_name"])){
		// echo "有临时存放文件夹";

		if(!move_uploaded_file($_FILES["filename"]["tmp_name"],'images/'.$_FILES["filename"]["name"])){
			echo "移动失败";
		}else{
			echo "成功@！";
		}
	}else{
		echo "没有临时存放文件夹！";
	}

	echo print_r($_FILES["filename"]["name"]);
?>
</body>
</html>