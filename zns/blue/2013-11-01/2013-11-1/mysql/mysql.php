<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="author" content="智能社 - zhinengshe.com" />
<meta name="copyright" content="智能社 - zhinengshe.com" />
<title>智能社 - www.zhinengshe.com</title>
<style>

</style>
</head>

<body>
<?php
//1.连接
mysql_connect('localhost', 'root', '');

//2.选择库
mysql_select_db('20131101');

//3.发送请求
$res=mysql_query('SELECT * FROM user_table');

//4.接收结果
while($row=mysql_fetch_row($res))
{
	echo $row[0].'|'.$row[1].'<br>';
}

/*
$row=mysql_fetch_row($res);

echo $row[0].'|'.$row[1];


$row=mysql_fetch_row($res);

echo $row[0].'|'.$row[1];
*/
?>
</body>
</html>













