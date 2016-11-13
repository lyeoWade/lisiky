$(function(){
	//var userid=getCookie('userid');

	var userid=$('#userid').attr('targetid');
	initPage(userid);
	getGuessHistoryList(userid);


});

//初始化竞猜页面
function initPage(userid){

	var oDate=new Date();

	var guessTime='';
	if(oDate.getHours()>=12){
		guessTime=oDate.getFullYear()+'-'+toZero(oDate.getMonth()+1)+'-'+toZero(parseInt(oDate.getDate()+1));
	}else{
		guessTime=oDate.getFullYear()+'-'+toZero(oDate.getMonth()+1)+'-'+toZero(oDate.getDate());
	}

	$.ajax({
		url:'web/guess.php',
		type:"POST",
		data:'type=myGuessList&guessTime='+guessTime+'&userid='+userid+'',
		success:function(str){
			
			var sData=eval('('+str+')');
			var br='',bd='',qr='',qd='';
			//console.log(sData);
			if(sData.respondCode==1){
				//$('.newguestwarp').html('<p class="nodata"><a href="guess.html">暂无竞猜,去竞猜</a></p>');
				
			}else{
				for(var i=0; i<sData.result.length; i++){
					var oListArr=eval('('+sData.result[i]+')');
					console.log(oListArr);
					var guessWhatHtml='',isKeyHtml='',isRightClass='',score='';

					if(getCookie('visitor')=='yes'){
						if($('#keyrank').attr('keyrank')<=80 || $('#weekrank').attr('weekrank')<=80 || $('#monthrank').attr('monthrank')<=80 || $('#quarterrank').attr('quarterrank')<=80 ){
							guessWhatHtml="<a href='javascript:;' class='see'>查看</a>";
						}else{
							switch(oListArr.guessdetail){
								case 'h':
									guessWhatHtml="主胜";
								break;
								case 'g':
									guessWhatHtml="客胜";
								break;
								case 'o':
									guessWhatHtml="大分";
								break;
								case 'u':
									guessWhatHtml="小分";
								break;
							}
						}
					}

					// switch(oListArr.guessdetail){
					// 	case 'h':
					// 		guessWhatHtml="<a href='javascript:;' class='see'>查看</a>";
					// 	break;
					// 	case 'g':
					// 		guessWhatHtml="<a href='javascript:;' class='see'>查看</a>";
					// 	break;
					// 	case 'o':
					// 		guessWhatHtml="<a href='javascript:;' class='see'>查看</a>";
					// 	break;
					// 	case 'u':
					// 		guessWhatHtml="<a href='javascript:;' class='see'>查看</a>";
					// 	break;
					// }

					// switch(oListArr.guessdetail){
					// 	case 'h':
					// 		guessWhatHtml="主胜";
					// 	break;
					// 	case 'g':
					// 		guessWhatHtml="客胜";
					// 	break;
					// 	case 'o':
					// 		guessWhatHtml="大分";
					// 	break;
					// 	case 'u':
					// 		guessWhatHtml="小分";
					// 	break;
					// }

					if(oListArr.isKey==1){
						isKeyHtml='<i class="importantZan fa fa-thumbs-up"></i>';
					}else{
						isKeyHtml='';
					}

					/* 
					isRight 	默认0
								正确:1
								错误:2
								走水:3
					*/
					


					if(oListArr.isRight==2){

						isRightClass='guesserror';
					}else if(oListArr.isRight==1){
						isRightClass='guesssuccess';
					}else if(oListArr.isRight==3){
						isRightClass='guessping';
					}


					switch(oListArr.guesstype){
						case '1':
							score=oListArr.homescoreBan+'-'+oListArr.guestscoreBan;
							br+=Html();
                            $('#banrang').html(br);
						break;
						case '2':
							score=oListArr.homescoreBan+'-'+oListArr.guestscoreBan;
							bd+=Html();
                            $('#bd').html(bd);
						break;
						case '3':
							 score=oListArr.homescore+'-'+oListArr.guestscore;
							qr+=Html();
                            $('#qr').html(qr);
                           
						break;
						case '4':
							score=oListArr.homescore+'-'+oListArr.guestscore;
							qd+=Html();
                            $('#qd').html(qd);
						break;
					}
					
					function Html(){
						return '<tr><td class="w150">'+oListArr.league+'</td><td class="w150">'+oListArr.ptime+'</td><td class="w150">'+oListArr.hometeam+'</td><td class="w150 scorered fw">'+score+'</td>\
                                <td class="w150">'+oListArr.guestteam+'</td><td class="w150">'+oListArr.pankou+'</td><td class="w150 '+isRightClass+'">'+guessWhatHtml+''+isKeyHtml+'</td></tr>';
					};
				}
				
			}
			
		}
	})
}




//点击see按钮发送请求
// 首先查找查看竞猜表内有没有这条数据  如果没有 则判断金额是否充足
// 充足  扣钱 ， 更新状态 




/* 竞猜历史 */

function getGuessHistoryList(userid){
	var guessdetail='',isKey='';//,userid=getCookie('userid');

	initHistoryPage(userid,guessdetail,isKey);

	$('.choicewrap .guessTypeTag').on('click',function(){
		guessdetail=$(this).attr('guessType');
		isKey='';
		initHistoryPage(userid,guessdetail,isKey);
	})

	$('.choicewrap .isKey').on('click',function(){
		isKey=$(this).attr('isKey');
		guessdetail='';
		initHistoryPage(userid,guessdetail,isKey);
	});

}


function initHistoryPage(userid,guessdetail,isKey){

	$.ajax({
		url:'web/guess.php',
		type:'POST',
		data:'type=guessHistory&userid='+userid+'&guessdetail='+guessdetail+'&isKey='+isKey,
		success:function(str){
			
			var sData=eval('('+str+')');
			var br='',bd='',qr='',qd='';
			if(sData.respondCode==1){
				$('#history').html('<tr><td colspan="8"><a target="_blank" href="guessList.html">暂无竞猜,去竞猜</a></td></tr>');
			}else{
				var guessWhatHtml='',isKeyHtml='',allHtml='',typeGuessTip='',isRightClass='',score='';
				for(var i=0; i<sData.result.length; i++){
					var oListArr=eval('('+sData.result[i]+')');
					//console.log(oListArr);
					if(oListArr.guesstype==1){
						typeGuessTip="半场让分";
						score=oListArr.homescoreBan+'-'+oListArr.guestscoreBan;
					}else if(oListArr.guesstype==2){
						typeGuessTip="半场大小";
						score=oListArr.homescoreBan+'-'+oListArr.guestscoreBan;
					}else if(oListArr.guesstype==3){
						typeGuessTip="全场让分";
						score=oListArr.homescore+'-'+oListArr.guestscore;
					}else if(oListArr.guesstype==4){
						typeGuessTip="全场大小";
						score=oListArr.homescore+'-'+oListArr.guestscore;
					};

					// if(oListArr.isRight==0){
					// 	isRightClass='guesserror';
					// }else if(oListArr.isRight==1){
					// 	isRightClass='guesssuccess';
					// }else{
					// 	isRightClass='guessping';
					// }

					/* 
					isRight 	默认0
								正确:1
								错误:2
								走水:3
					*/
					
					if(oListArr.isRight==2){
						isRightClass='guesserror';
					}else if(oListArr.isRight==1){
						isRightClass='guesssuccess';
					}else if(oListArr.isRight==3){
						isRightClass='guessping';
					}


					switch(oListArr.guessdetail){
						case 'h':
							guessWhatHtml=oListArr.hometeam;
						break;
						case 'g':
							guessWhatHtml=oListArr.guestteam;
						break;
						case 'o':
							guessWhatHtml="大分";
						break;
						case 'u':
							guessWhatHtml="小分";
						break;
					}

					if(oListArr.isKey==1){
						isKeyHtml='<i class="importantZan fa fa-thumbs-up"></i>';
					}else{
						isKeyHtml='';
					}
					allHtml+='<tr><td class="w150">'+oListArr.league+'</td><td class="w150">'+oListArr.ptime+'</td><td class="w150"><a href="javascript:;">'+oListArr.hometeam+'</a></td><td class="w150 scorered fw">'+score+'</td>\
                        <td class="w150"><a href="javascript:;">'+oListArr.guestteam+'</a></td><td class="w150">'+typeGuessTip+'&nbsp;'+oListArr.pankou+'</td><td class="w150 '+isRightClass+'">'+guessWhatHtml+'('+oListArr.seenum+')'+isKeyHtml+'</td></tr>';
				}

				$('#history').html(allHtml);
				
			}
		}
	});
}