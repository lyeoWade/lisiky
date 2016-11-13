

$(function(){
	// 获取默认比赛列表---当天的比赛不管什么联赛
	getGameList();

	searchs();
});

function getGameList(){
	var oDate=new Date();
	var day=oDate.getFullYear()+'-'+toZero(oDate.getMonth()+1)+'-'+toZero(oDate.getDate());
	$.ajax({
		url:"datapage/updatescore.php",
		data:"type=getgameList&day="+day,
		type:"POST",
		success:function(data){
			//console.log(data);
			var oD=eval('('+data+')');
			console.log(oD)
			if(oD.counts<=0){

			}else{
				var shtml='';
				for (var i = 0; i < oD.result.length; i++) {
					var l=eval('('+oD.result[i]+')');
					var isCheched=''
					if(l.isend=='true'){
						isCheched='<option value="false">未结束</option><option value="true" selected>已结束</option>';
					}else{
						isCheched='<option value="false" selected>未结束</option><option value="true" >已结束</option>';
					}
					shtml+='<div class="first-col  clearfix"><div class="time gameinfo fl"><span class="league">'+l.league+'</span>---<span class="ptime" playtime="'+l.ptime+'">'+l.ptime.substring(10)+'</span></div>\
						<ul class="fl updatescore"><li>\
						<input type="text" hometeam="'+l.hometeam+'" value="'+l.hometeam+'" class="h" disabled="">\
						<input type="text" class="firsthomescore" name="firsthomescore"  placeholder="第一节" value="'+l.firsthomescore+'">\
						<input type="text" placeholder="第二节" name="secondhomescore" class="secondhomescore" value="'+l.secondhomescore+'">\
						<input type="text" placeholder="第三节" name="thirdhomescore" class="thirdhomescore" value="'+l.thirdhomescore+'">\
						<input type="text" placeholder="第四节" name="fourthhomescore" class="fourthhomescore" value="'+l.fourthhomescore+'">\
						<input type="text" placeholder="加时1" class="hot1" value="'+l.hot1+'">\
						<input type="text" placeholder="加时2" class="hot2" value="'+l.hot2+'">\
						<input type="text" placeholder="加时3" class="hot3" value="'+l.hot3+'">\
						<input type="text" placeholder="加时4" class="hot4" value="'+l.hot4+'">\
						<input type="text" placeholder="加时5" class="hot5" value="'+l.hot5+'"></li><li>\
						<input type="text" guestteam="'+l.guestteam+'" value="'+l.guestteam+'" class="h" disabled="">\
						<input type="text" class="firstguestscore" name="firstguestscore"  placeholder="第一节" value="'+l.firstguestscore+'">\
						<input type="text" placeholder="第二节" name="secondguestscore" class="secondguestscore" value="'+l.secondguestscore+'">\
						<input type="text" placeholder="第三节" name="thirdguestscore" class="thirdguestscore" value="'+l.thirdguestscore+'">\
						<input type="text" placeholder="第四节" name="fourthguestscore" class="fourthguestscore" value="'+l.fourthguestscore+'"'+l.fourthguestscore+'>\
						<input type="text" placeholder="加时1" class="got1" value="'+l.got1+'">\
						<input type="text" placeholder="加时2" class="got2" value="'+l.got2+'">\
						<input type="text" placeholder="加时3" class="got3" value="'+l.got3+'">\
						<input type="text" placeholder="加时4" class="got4" value="'+l.got4+'">\
						<input type="text" placeholder="加时5" class="got5" value="'+l.got5+'"></li></ul>\
						<div class="surebtn fl"><input type="button" dataid="'+l.id+'" class="surebtnBtn fl" value="更新">\
							<select class=" leagueList fl" id="isend">'+isCheched+'\
                            </select>\
						</div></div>';
				};
				$('#gamebox').html(shtml);
			}
		},
		complete:function(){
			editScore();
		}
	});
}


//选择日期修改比分

function searchs(){
	var oBtn=$('#searchs');

	oBtn.on('click',function(){
		var oLeagueListVal=$('#leagueList').val();
		var oPtimeVal=$('#ptime').val();
		$.ajax({
			url:'datapage/updatescore.php',
			type:'POST',
			data:'type=searchgame&league='+oLeagueListVal+'&playday='+oPtimeVal,
			success:function(str){
				var oData=eval('('+str+')');
				console.log(oData)
				if(oData.counts<=0){
					$('#gamebox').html('<p style="text-align:center; color:red;">没有添加赛程</p>');
				}else{
					var shtml='';
					for (var i = 0; i < oData.result.length; i++) {
						var l=eval('('+oData.result[i]+')');
						var isCheched=''
						if(l.isend=='true'){
							isCheched='<option value="false">未结束</option><option value="true" selected>已结束</option>';
						}else{
							isCheched='<option value="false" selected>未结束</option><option value="true" >已结束</option>';
						}
						shtml+='<div class="first-col  clearfix"><div class="time gameinfo fl"><span class="league">'+l.league+'</span>---<span class="ptime" playtime="'+l.ptime+'">'+l.ptime.substring(10)+'</span></div>\
						<ul class="fl updatescore"><li>\
						<input type="text" hometeam="'+l.hometeam+'" value="'+l.hometeam+'" class="h" disabled="">\
						<input type="text" class="firsthomescore" name="firsthomescore"  placeholder="第一节" value="'+l.firsthomescore+'">\
						<input type="text" placeholder="第二节" name="secondhomescore" class="secondhomescore" value="'+l.secondhomescore+'">\
						<input type="text" placeholder="第三节" name="thirdhomescore" class="thirdhomescore" value="'+l.thirdhomescore+'">\
						<input type="text" placeholder="第四节" name="fourthhomescore" class="fourthhomescore" value="'+l.fourthhomescore+'">\
						<input type="text" placeholder="加时1" class="hot1" value="'+l.hot1+'">\
						<input type="text" placeholder="加时2" class="hot2" value="'+l.hot2+'">\
						<input type="text" placeholder="加时3" class="hot3" value="'+l.hot3+'">\
						<input type="text" placeholder="加时4" class="hot4" value="'+l.hot4+'">\
						<input type="text" placeholder="加时5" class="hot5" value="'+l.hot5+'"></li><li>\
						<input type="text" guestteam="'+l.guestteam+'" value="'+l.guestteam+'" class="h" disabled="">\
						<input type="text" class="firstguestscore" name="firstguestscore"  placeholder="第一节" value="'+l.firstguestscore+'">\
						<input type="text" placeholder="第二节" name="secondguestscore" class="secondguestscore" value="'+l.secondguestscore+'">\
						<input type="text" placeholder="第三节" name="thirdguestscore" class="thirdguestscore" value="'+l.thirdguestscore+'">\
						<input type="text" placeholder="第四节" name="fourthguestscore" class="fourthguestscore" value="'+l.fourthguestscore+'"'+l.fourthguestscore+'>\
						<input type="text" placeholder="加时1" class="got1" value="'+l.got1+'">\
						<input type="text" placeholder="加时2" class="got2" value="'+l.got2+'">\
						<input type="text" placeholder="加时3" class="got3" value="'+l.got3+'">\
						<input type="text" placeholder="加时4" class="got4" value="'+l.got4+'">\
						<input type="text" placeholder="加时5" class="got5" value="'+l.got5+'"></li></ul>\
						<div class="surebtn fl"><input type="button" dataid="'+l.id+'" class="surebtnBtn fl" value="更新">\
							<select class="fl leagueList" id="isend">'+isCheched+'\
                            </select>\
						</div></div>';
					};
					$('#gamebox').html(shtml)
				}
			},
			error:function(){

			},
			complete:function(){
				editScore();
			}
		})
	});
}

function editScore(){

	$('.surebtnBtn').on('click',function(){

		var firsthomescore=$(this).parents('.first-col').find('.firsthomescore').val();
		var secondhomescore=$(this).parents('.first-col').find('.secondhomescore').val();
		var thirdhomescore=$(this).parents('.first-col').find('.thirdhomescore').val();
		var fourthhomescore=$(this).parents('.first-col').find('.fourthhomescore').val();
		
		var hot1=$(this).parents('.first-col').find('.hot1').val();
		var hot2=$(this).parents('.first-col').find('.hot2').val();
		var hot3=$(this).parents('.first-col').find('.hot3').val();
		var hot4=$(this).parents('.first-col').find('.hot4').val();
		var hot5=$(this).parents('.first-col').find('.hot5').val();

		var firstguestscore=$(this).parents('.first-col').find('.firstguestscore').val();
		var secondguestscore=$(this).parents('.first-col').find('.secondguestscore').val();
		var thirdguestscore=$(this).parents('.first-col').find('.thirdguestscore').val();
		var fourthguestscore=$(this).parents('.first-col').find('.fourthguestscore').val();

		var got1=$(this).parents('.first-col').find('.got1').val();
		var got2=$(this).parents('.first-col').find('.got2').val();
		var got3=$(this).parents('.first-col').find('.got3').val();
		var got4=$(this).parents('.first-col').find('.got4').val();
		var got5=$(this).parents('.first-col').find('.got5').val();

		var isend=$(this).parents('.first-col').find('#isend').val();

		//alert(isend)
		var gameid=$(this).attr('dataid');
		//alert(gameid)

		var datas="type=updatescore&firsthomescore="+firsthomescore+"&secondhomescore="+secondhomescore+"&thirdhomescore="+thirdhomescore+"&fourthhomescore="+fourthhomescore+"&hot1="+hot1+"&hot2="+hot2+"&hot3="+hot3+"&hot4="+hot4+"&hot5="+hot5+"&firstguestscore="+firstguestscore+"&secondguestscore="+secondguestscore+"&thirdguestscore="+thirdguestscore+"&fourthguestscore="+fourthguestscore+"&got1="+got1+"&got2="+got2+"&got3="+got3+"&got4="+got4+"&got5="+got5+"&isend="+isend+"&id="+gameid;

		//console.log(datas)
		$.ajax({
			url:"datapage/updatescore.php",
			type:"POST",
			data:datas,
			success:function(data){
				console.log(data);
				var cbdata=eval('('+data+')');
				if(cbdata.code==0){
					alert(cbdata.msg);
				}else{
					alert(cbdata.msg);
				}
			}
		});
	})
}



