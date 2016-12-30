<?php
	class My{
		public $name;

		function aaa(){
			echo 'php';
		}
	}

	$myClass=new My();
	echo $myClass->name="我爱php";
	echo $myClass->aaa();
?>