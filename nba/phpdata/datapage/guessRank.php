<?php 
	include "com.php";

	//得到总场次
	//$mysqlRank=mysql_query("SELECT userid,SUM(1) FROM guesslist GROUP BY userid");

	//得到胜利的场次
	//$mysqlRank=mysql_query("SELECT userid,SUM(isRight) FROM guesslist GROUP BY userid");
	//echo count($mysqlRank);


	//echo  strtotime ( "-1 week") ;

	//select * from `article` where date_sub(curdate(), INTERVAL 7 DAY) <= date(`add_time`);


	//近7天内 败场 SUM(1 and isRight='0' and date_sub(curdate(), INTERVAL 2 DAY) <= date(`guessTime`))
	//近7天内 胜场 SUM(1 and isRight='1' and date_sub(curdate(), INTERVAL 2 DAY) <= date(`guessTime`))
	//近7天内 总数 SUM(1 and date_sub(curdate(), INTERVAL 2 DAY) <= date(`guessTime`))

	//近30天内 总数 SUM(1 and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
	//近30天内 胜场 SUM(1 and isRight='1' and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
	//近30天内 败场 SUM(1 and isRight='0' and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
	//得到重点的胜利场次

	$type=$_POST['type'];

	switch ($type) {
		case 'UpdateRank':
				
				// $mysqlRank=mysql_query("SELECT userid,SUM(isKey)
				// 	,SUM(isKey and isRight='1')
				// 	,SUM(isKey and isRight='0')
				// 	,SUM(1)
				// 	,SUM(1 and isRight='1')
				// 	,SUM(1 and isRight='0')
				// 	,SUM(1 and date_sub(curdate(), INTERVAL 7 DAY) <= date(`guessTime`))
				// 	,SUM(1 and isRight='1' and date_sub(curdate(), INTERVAL 7 DAY) <= date(`guessTime`))
				// 	,SUM(1 and isRight='0' and date_sub(curdate(), INTERVAL 7 DAY) <= date(`guessTime`))
				// 	,SUM(1 and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
				// 	,SUM(1 and isRight='1' and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
				// 	,SUM(1 and isRight='0' and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
				// 	,SUM(1 and date_sub(curdate(), INTERVAL 90 DAY) <= date(`guessTime`))
				// 	,SUM(1 and isRight='1' and date_sub(curdate(), INTERVAL 90 DAY) <= date(`guessTime`))
				// 	,SUM(1 and isRight='0' and date_sub(curdate(), INTERVAL 90 DAY) <= date(`guessTime`))
				// 	 FROM guesslist  GROUP BY userid");

				// while ($rows=mysql_fetch_array($mysqlRank)) {
				// 	# code...
				// 	$num=mysql_num_rows(mysql_query("SELECT * FROM guessrank WHERE userid =".$rows['userid']." "));
				// 	//echo $rows[2];

				// 	if($num==0){
				// 		mysql_query("INSERT INTO guessrank ( userid , monthKeyAll,monthKeyWin,monthKeyFail,allNum,allNumWin,allNumFail,weekAll,weekWin,weekFail,monthAll,monthWin,monthFail,quarterAll,quarterWin,quarterFail
				// 			) VALUES ( 
				// 			'{$rows['userid']}','{$rows[1]}','{$rows[2]}','{$rows[3]}','{$rows[4]}','{$rows[5]}','{$rows[6]}','{$rows[7]}','{$rows[8]}','{$rows[9]}','{$rows[10]}','{$rows[11]}','{$rows[12]}','{$rows[13]}','{$rows[14]}','{$rows[15]}')");
				// 	}else{
				// 		//echo $rows[2];
				// 		mysql_query("UPDATE guessrank SET monthKeyAll=".$rows[1].",monthKeyWin=".$rows[2].",monthKeyFail=".$rows[3].",allNum=".$rows[4].",allNumWin=".$rows['5'].",allNumFail=".$rows['6'].",weekAll=".$rows['7'].",weekWin=".$rows['8'].",weekFail=".$rows['9'].",monthAll=".$rows['10'].",monthWin=".$rows['11'].",monthFail=".$rows['12'].",quarterAll=".$rows['13'].",quarterWin=".$rows['14'].",quarterFail=".$rows['15']." WHERE userid=".$rows[0]." " ) or die('更新失败'.mysql_error());
				// 	};
				// }


				//更新重榜
				$keyRank=mysql_query("SELECT userid
					,SUM(isKey and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
					,SUM(isKey and isRight='1' and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
					,SUM(isKey and isRight='2' and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
					 FROM guesslist  GROUP BY userid HAVING SUM(isKey and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))>1 ");

				//不符合条件的从表中删除
				$keyRankLess=mysql_query("SELECT userid
					,SUM(1 and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
					 FROM guesslist  GROUP BY userid HAVING SUM(1 and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))<=1 ");
				while ($keyRankLessRow=mysql_fetch_array($keyRankLess)) {

					mysql_query("DELETE FROM keyrank WHERE  userid =".$keyRankLessRow['userid']." ");
				};

				while ($rowsKeyRank=mysql_fetch_array($keyRank)) {
					//print_r($rowsKeyRank);
					$num=mysql_num_rows(mysql_query("SELECT * FROM keyrank WHERE userid =".$rowsKeyRank['userid']." "));

					$All=$rowsKeyRank[1]-($rowsKeyRank[1]-$rowsKeyRank[3]-$rowsKeyRank[2]);
					$per=$rowsKeyRank[2]/$All;

					if($num==0){
						mysql_query("INSERT INTO keyrank ( userid , keyAll,keyWin,keyFail,keypercent
							) VALUES ( 
							'{$rowsKeyRank['userid']}','{$rowsKeyRank[1]}','{$rowsKeyRank[2]}','{$rowsKeyRank[3]}','{$per}')");
					}else{
						mysql_query("UPDATE keyrank SET keyAll=".$rowsKeyRank[1].",keyWin=".$rowsKeyRank[2].",keyFail=".$rowsKeyRank[3].",keypercent=".$per." WHERE userid=".$rowsKeyRank[0]." " ) or die('更新失败'.mysql_error());
					};			
				}






				//更新周榜
				$mysqlWeekRank=mysql_query("SELECT userid
					,SUM(1 and date_sub(curdate(), INTERVAL 7 DAY) <= date(`guessTime`))
					,SUM(1 and isRight='1' and date_sub(curdate(), INTERVAL 7 DAY) <= date(`guessTime`))
					,SUM(1 and isRight='2' and date_sub(curdate(), INTERVAL 7 DAY) <= date(`guessTime`))
					 FROM guesslist  GROUP BY userid HAVING SUM(1 and date_sub(curdate(), INTERVAL 7 DAY) <= date(`guessTime`))>3 ");

				$mysqlWeekRankLess=mysql_query("SELECT userid
					,SUM(1 and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
					 FROM guesslist  GROUP BY userid HAVING SUM(1 and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))<=3 ");
				while ($mysqlWeekRankLessRow=mysql_fetch_array($mysqlWeekRankLess)) {

					mysql_query("DELETE FROM weekrank WHERE  userid =".$mysqlWeekRankLessRow['userid']." ");
				};

				while ($rowsWeekRank=mysql_fetch_array($mysqlWeekRank)) {

					$num=mysql_num_rows(mysql_query("SELECT * FROM weekrank WHERE userid =".$rowsWeekRank['userid']." "));

					$All=$rowsWeekRank[1]-($rowsWeekRank[1]-$rowsWeekRank[3]-$rowsWeekRank[2]);
					$per=$rowsWeekRank[2]/$All;

					if($num==0){
						mysql_query("INSERT INTO weekrank ( userid , weekAll,weekWin,weekFail,weekpercent
							) VALUES ( 
							'{$rowsWeekRank['userid']}','{$rowsWeekRank[1]}','{$rowsWeekRank[2]}','{$rowsWeekRank[3]}','{$per}')");
					}else{
						mysql_query("UPDATE weekrank SET weekAll=".$rowsWeekRank[1].",weekWin=".$rowsWeekRank[2].",weekFail=".$rowsWeekRank[3].",weekpercent=".$per." WHERE userid=".$rowsWeekRank[0]." " ) or die('更新失败'.mysql_error());
					};			
				}






				//更新yue榜
				$mysqlMonthRank=mysql_query("SELECT userid
					,SUM(1 and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
					,SUM(1 and isRight='1' and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
					,SUM(1 and isRight='2' and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
					 FROM guesslist  GROUP BY userid HAVING SUM(1 and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))>3 ");

				$mysqlMonthRankLess=mysql_query("SELECT userid
					,SUM(1 and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))
					 FROM guesslist  GROUP BY userid HAVING SUM(1 and date_sub(curdate(), INTERVAL 30 DAY) <= date(`guessTime`))<=3 ");
				while ($mysqlMonthRankLessRow=mysql_fetch_array($mysqlMonthRankLess)) {

					mysql_query("DELETE FROM monthrank WHERE  userid =".$mysqlMonthRankLessRow['userid']." ");
				};

				while ($rowsMonthRank=mysql_fetch_array($mysqlMonthRank)) {

					$num=mysql_num_rows(mysql_query("SELECT * FROM monthrank WHERE userid =".$rowsMonthRank['userid']." "));

					$All=$rowsMonthRank[1]-($rowsMonthRank[1]-$rowsMonthRank[3]-$rowsMonthRank[2]);
					$per=$rowsMonthRank[2]/$All;

					if($num==0){
						mysql_query("INSERT INTO monthrank ( userid , monthAll,monthWin,monthFail,montnpercent
							) VALUES ( 
							'{$rowsMonthRank['userid']}','{$rowsMonthRank[1]}','{$rowsMonthRank[2]}','{$rowsMonthRank[3]}','{$per}')");
					}else{
						mysql_query("UPDATE monthrank SET monthAll=".$rowsMonthRank[1].",monthWin=".$rowsMonthRank[2].",monthFail=".$rowsMonthRank[3].",montnpercent=".$per." WHERE userid=".$rowsMonthRank[0]." " ) or die('更新失败'.mysql_error());
					};	

					//print_r($rowsMonthRank);			
				}
				






				//更新季榜
				$mysqlquarterRank=mysql_query("SELECT userid
					,SUM(1 and date_sub(curdate(), INTERVAL 90 DAY) <= date(`guessTime`))
					,SUM(1 and isRight='1' and date_sub(curdate(), INTERVAL 90 DAY) <= date(`guessTime`))
					,SUM(1 and isRight='2' and date_sub(curdate(), INTERVAL 90 DAY) <= date(`guessTime`))
					 FROM guesslist  GROUP BY userid HAVING SUM(1 and date_sub(curdate(), INTERVAL 90 DAY) <= date(`guessTime`))>3 ");

				$mysqlquarterRankLess=mysql_query("SELECT userid
					,SUM(1 and date_sub(curdate(), INTERVAL 90 DAY) <= date(`guessTime`))
					 FROM guesslist  GROUP BY userid HAVING SUM(1 and date_sub(curdate(), INTERVAL 90 DAY) <= date(`guessTime`))<=3 ");
				while ($mysqlquarterRankLessRow=mysql_fetch_array($mysqlquarterRankLess)) {

					mysql_query("DELETE FROM quarterrank WHERE  userid =".$mysqlquarterRankLessRow['userid']." ");
				};

				while ($rowsQuarterRank=mysql_fetch_array($mysqlquarterRank)) {

					$num=mysql_num_rows(mysql_query("SELECT * FROM quarterrank WHERE userid =".$rowsQuarterRank['userid']." "));

					$All=$rowsQuarterRank[1]-($rowsQuarterRank[1]-$rowsQuarterRank[3]-$rowsQuarterRank[2]);
					$per=$rowsQuarterRank[2]/$All;

					if($num==0){
						mysql_query("INSERT INTO quarterrank ( userid , quarterAll,quarterWin,quarterFail,quarterpercent
							) VALUES ( 
							'{$rowsQuarterRank['userid']}','{$rowsQuarterRank[1]}','{$rowsQuarterRank[2]}','{$rowsQuarterRank[3]}','{$per}')");
					}else{
						mysql_query("UPDATE quarterrank SET quarterAll=".$rowsQuarterRank[1].",quarterWin=".$rowsQuarterRank[2].",quarterFail=".$rowsQuarterRank[3].",quarterpercent=".$per." WHERE userid=".$rowsQuarterRank[0]." " ) or die('更新失败'.mysql_error());
					};		
				};

			break;
		
		default:
			# code...
			break;
	}
	//,SUM(OrderPrice)
	
?>