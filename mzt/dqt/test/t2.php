<?php
	class My{
		public $name;
		
		function game(){
			echo '玩游戏';
		}
		function movie(){
			echo '看电影';
		}
		function code(){
			echo '编程';
		}
	}

	$myClass=new My();
	echo $myClass->name="我爱php";
	echo $myClass->aaa();
?>