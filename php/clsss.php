<?php 
	class demo{
		public $str="demo测试";

		function demoFn(){
			echo "这是这个函数的一个方法";
		}
	};

	$obj=new demo();

	//echo $obj->str;

	echo $obj->demoFn();
?>