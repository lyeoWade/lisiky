<?php
	include "com.php";


	$gameid=$_POST['gameid'];

	$getAgenaData=mysql_query("SELECT * FROM basketball_agena WHERE id=".$gameid."");

	$AgenaNum=mysql_num_rows($getAgenaData);
	
	//echo $AgenaNum;

	if($AgenaNum>0){
		while ($row=mysql_fetch_array($getAgenaData)) {
			$banchangZhuDui=$row['secondhomescore']+$row['firsthomescore'];
			$banchangKeDui=$row['secondguestscore']+$row['firstguestscore'];
			
			/*
			大小分 1大分 2小分 3走水  让分 1主胜 2客负 3走水
			*/

			$bcAllScore=$banchangZhuDui+$banchangKeDui;
			if($bcAllScore>$row['bb1']){
				//更新半场大小的结果
				
				mysql_query("UPDATE guesslist SET isRight='1' WHERE gameid=".$gameid." and guesstype='2' and  guessdetail='o'");

				mysql_query("UPDATE guesslist SET isRight='2' WHERE gameid=".$gameid." and guesstype='2' and  guessdetail='u'");
				//echo 123;
				//增加猜对的积分

				$mysqlId=mysql_query("SELECT * FROM guesslist WHERE gameid=".$gameid." and guesstype='2' and  guessdetail='o' ");

				while ($rowsobj=mysql_fetch_array($mysqlId)){	

					mysql_query("UPDATE member SET integral=integral+100 WHERE id='".$rowsobj['userid']."' ");
				};

			}else if($bcAllScore<$row['bb1']){
				//更新半场大小的结果
				mysql_query("UPDATE guesslist SET isRight='1' WHERE gameid=".$gameid." and  guesstype='2' and guessdetail='u'");
				mysql_query("UPDATE guesslist SET isRight='2' WHERE gameid=".$gameid." and  guesstype='2' and guessdetail='o'");


				$mysqlIdu=mysql_query("SELECT * FROM guesslist WHERE gameid=".$gameid." and guesstype='2' and  guessdetail='u' ");

				while ($rowsobju=mysql_fetch_array($mysqlIdu)){	

					mysql_query("UPDATE member SET integral=integral+100 WHERE id='".$rowsobju['userid']."' ");
				};
				
			}else if($bcAllScore==$row['bb1']){
				mysql_query("UPDATE guesslist SET isRight='3' WHERE gameid=".$gameid." and guesstype='2' ");
			}

			//半场让分
			
			//echo $banchangZhuDui-$banchangKeDui;
			if(($banchangZhuDui-$banchangKeDui)>$row['lb1']){
				//更新半场大小的结果
				mysql_query("UPDATE guesslist SET isRight='1' WHERE gameid=".$gameid." and guesstype='1' and  guessdetail='h'");

				mysql_query("UPDATE guesslist SET isRight='2' WHERE gameid=".$gameid." and guesstype='1' and  guessdetail='g'");


				$mysqlIdh=mysql_query("SELECT * FROM guesslist WHERE gameid=".$gameid." and guesstype='1' and  guessdetail='h' ");

				while ($rowsobjh=mysql_fetch_array($mysqlIdh)){	

					mysql_query("UPDATE member SET integral=integral+100 WHERE id='".$rowsobjh['userid']."' ");
				};

			}else if(($banchangZhuDui-$banchangKeDui)<$row['lb1']){
				//更新半场大小的结果
				//echo $row['lb1'];
				mysql_query("UPDATE guesslist SET isRight='1' WHERE gameid=".$gameid." and  guesstype='1' and guessdetail='g'");
				mysql_query("UPDATE guesslist SET isRight='2' WHERE gameid=".$gameid." and  guesstype='1' and guessdetail='h'");

				$mysqlIdg=mysql_query("SELECT * FROM guesslist WHERE gameid=".$gameid." and guesstype='1' and  guessdetail='g' ");

				while ($rowsobjg=mysql_fetch_array($mysqlIdg)){	

					mysql_query("UPDATE member SET integral=integral+100 WHERE id='".$rowsobjg['userid']."' ");
				};
			}else if(($banchangZhuDui-$banchangKeDui)==$row['lb1']){
				mysql_query("UPDATE guesslist SET isRight='3' WHERE gameid=".$gameid." and guesstype='1' ");
			}



			$qcZhuDui=$row['secondhomescore']+$row['firsthomescore']+$row['thirdhomescore']+$row['fourthhomescore']+$row['hot1']+$row['hot2']+$row['hot3']+$row['hot4']+$row['hot5'];
			$qcKeDui=$row['secondguestscore']+$row['firstguestscore']+$row['thirdguestscore']+$row['fourthguestscore']+$row['got1']+$row['got2']+$row['got3']+$row['got4']+$row['got5'];

			
			/*
			大小分 1大分 2小分 3走水  让分 1主胜 2客负 3走水
			*/


			$qcAllScore=$qcZhuDui+$qcKeDui;
			if($qcAllScore>$row['b1']){
				//更新半场大小的结果
				mysql_query("UPDATE guesslist SET isRight='1' WHERE gameid=".$gameid." and guesstype='4' and  guessdetail='o'");
				mysql_query("UPDATE guesslist SET isRight='2' WHERE gameid=".$gameid." and guesstype='4' and  guessdetail='u'");


				$mysqlIdqo=mysql_query("SELECT * FROM guesslist WHERE gameid=".$gameid." and guesstype='4' and  guessdetail='o' ");

				while ($rowsobjqo=mysql_fetch_array($mysqlIdqo)){	

					mysql_query("UPDATE member SET integral=integral+100 WHERE id='".$rowsobjqo['userid']."' ");
				};
			}else if($qcAllScore<$row['bb1']){
				//更新半场大小的结果
				mysql_query("UPDATE guesslist SET isRight='1' WHERE gameid=".$gameid." and  guesstype='4' and guessdetail='u'");
				mysql_query("UPDATE guesslist SET isRight='2' WHERE gameid=".$gameid." and  guesstype='4' and guessdetail='o'");


				$mysqlIdqu=mysql_query("SELECT * FROM guesslist WHERE gameid=".$gameid." and guesstype='4' and  guessdetail='u' ");

				while ($rowsobjqu=mysql_fetch_array($mysqlIdqu)){	

					mysql_query("UPDATE member SET integral=integral+100 WHERE id='".$rowsobjqu['userid']."' ");
				};
			}else if($qcAllScore==$row['bb1']){
				mysql_query("UPDATE guesslist SET isRight='3' WHERE gameid=".$gameid." and guesstype='4' ");
			}

			if(($qcZhuDui-$qcKeDui)>$row['l1']){
				//更新半场大小的结果
				mysql_query("UPDATE guesslist SET isRight='1' WHERE gameid=".$gameid." and guesstype='3' and  guessdetail='h'");
				mysql_query("UPDATE guesslist SET isRight='2' WHERE gameid=".$gameid." and guesstype='3' and  guessdetail='g'");


				$mysqlIdqh=mysql_query("SELECT * FROM guesslist WHERE gameid=".$gameid." and guesstype='3' and  guessdetail='h' ");

				while ($rowsobjqh=mysql_fetch_array($mysqlIdqh)){	

					mysql_query("UPDATE member SET integral=integral+100 WHERE id='".$rowsobjqh['userid']."' ");
				};
			}else if(($qcZhuDui-$qcKeDui)<$row['lb1']){
				//更新半场大小的结果
				//echo $row['lb1'];
				mysql_query("UPDATE guesslist SET isRight='1' WHERE gameid=".$gameid." and  guesstype='3' and guessdetail='g'");
				mysql_query("UPDATE guesslist SET isRight='2' WHERE gameid=".$gameid." and  guesstype='3' and guessdetail='h'");


				$mysqlIdqg=mysql_query("SELECT * FROM guesslist WHERE gameid=".$gameid." and guesstype='3' and  guessdetail='g' ");

				while ($rowsobjqh=mysql_fetch_array($mysqlIdqg)){	

					mysql_query("UPDATE member SET integral=integral+100 WHERE id='".$rowsobjqh['userid']."' ");
				};
			}else if(($qcZhuDui-$qcKeDui)==$row['lb1']){
				mysql_query("UPDATE guesslist SET isRight='3' WHERE gameid=".$gameid." and guesstype='3' ");
			}

			mysql_query("UPDATE basketball_agena SET isBalance='1' WHERE id=".$gameid."" );

			echo_status(array("respondCode"=>"0","respondMsg"=>"更新成功"));

			/*
				排行榜
				查询guessList表
			*/
			//getResult
		};
	}else{
		echo_status(array("respondCode"=>"1","respondMsg"=>"获取失败"));
	};
?>