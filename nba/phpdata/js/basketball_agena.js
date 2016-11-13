

$(function(){
	exchange();
	ajaxPost();
	
	getAgena(getnowday());
	getteam('NBA');
	
	selectagena();

});

function getnowday(){
	var oDate=new Date();
	var oDay=oDate.getDate();
	var oMonth=oDate.getMonth()+1;
	var oYear=oDate.getFullYear();
	var oNowDate=oYear+'-'+toZero(oMonth)+'-'+toZero(oDay);
	return oNowDate;
}
//选择联赛 改变球队

function exchange(){

	$('#leagueList').on('change',function(){
		var oKeywords=$(this).val();
		getteam(oKeywords);
	});

};


function getteam(oKeywords){
	$.ajax({
		type:"POST",
		url:"datapage/basketball_team.php",
		data:"type=getteam&keyword="+oKeywords,
		success:function(str){
			var oData=eval('('+str+')');
			if(oData.counts!=0){
				var teams='';
				for(var i=0; i<oData.result.length; i++){
					var lastpase=eval('('+oData.result[i]+')');
					teams+='<option value="'+lastpase.id+'">'+lastpase.team+':'+lastpase.id+'</option>';
				}
				$('#homeId').html(teams);
				$('#guestId').html(teams);
			}else{
				$('#guestId').html('<option value="暂无数据！">暂无数据！</option>')
				$('#homeId').html('<option value="暂无数据！">暂无数据！</option>');
			}
			//console.log(oData)
		},
		complete:function(){

		}
	});
}

//发布赛程
function ajaxPost(){
	$('#surebtn').on('click',function(){
		//alert($('#guestId').val());

		//alert($('#seasons').val())
		//return false;
		var isGuess=$('#isGuess').val();
		var $guessTime=$('#guessTime').val();
		var gTime='';
		if($('#isGuess').val()==0){ //0 ->推荐
			gTime=$guessTime;
		}else{// 1->不推荐
			gTime='';
		}


		//$('#isMoney').val()  
		
		var datas="type=AddAgena&league="+$('#leagueList').val()+"&homeId="+$('#homeId').val()+"&guestId="+$('#guestId').val()+"&seasons="+$('#seasons').val()+"&ptime="+$('#ptime').val()+"&l1="+$('#l1').val()+"&b1="+$('#b1').val()+"&lb1="+$('#lb1').val()+"&bb1="+$('#bb1').val()+"&isend="+$('#isend').val()+"&summary="+$('#summary').val()+"&isMoney="+$('#isMoney').val()+"&isGuess="+isGuess+"&guessTime="+gTime+"&analysis="+getContent();
		//alert(datas);
		//return false;
		$.ajax({
			url:"datapage/basketball_team.php",
			type:"POST",
			data:datas,
			success:function(bdata){
				console.log(bdata)
				var cbdata=eval('('+bdata+')');
				if(cbdata.code==0){

					alert(cbdata.msg);
					getAgena(getnowday());
					
				}else{
					alert(cbdata.msg);
				}
				//console.log(bdata)
			}
		});
	});

};


//选择列表赛程

function selectagena(){
	$('#searchslist').on('click',function(){
		var vals=$('#ptime2').val();
		getAgena(vals);
	})
}


//获取列表 
function  getAgena(times){
	//alert($('#seasonAgenaList').val())
	$.ajax({
		url:"datapage/basketball_team.php",
		type:"POST",
		data:"type=getAgena&times="+times,
		success:function(bdata){
			console.log(bdata)
			var cbdata=eval('('+bdata+')');

			if(cbdata.counts>0){
				var Liststr='';
				for(var i=0; i<cbdata.result.length; i++){
					
					var newjson=eval('('+cbdata.result[i]+')');
					var jshtml='';
					if(newjson.l1=='')newjson.l1='-';
					if(newjson.b1=='')newjson.b1='-';
					if(newjson.lb1=='')newjson.lb1='-';
					if(newjson.bb1=='')newjson.bb1='-';
					if(newjson.homescore=='')newjson.homescore='-';
					if(newjson.guestscore=='')newjson.guestscore='-';
					
					if(newjson.isBalance!=1){ jshtml='<a href="javascript:;" gameid="'+newjson.id+'"  class="btn btn-sm jiesuan">结算</a>'; }
					Liststr+='<li><div class="w3 pull-left">'+newjson.id+'</div>';

	                Liststr+='<div class="w10 atc_title pull-left"><a href="../content.html?page='+newjson.id+'" target="_blank">'+newjson.league+'</a></div>';

	                Liststr+='<div class="w10 pull-left slh"><a href="'+newjson.hometeamLink+'" target="_blank">'+newjson.hometeam+'</a>&nbsp;&nbsp;VS&nbsp;&nbsp;<a href="'+newjson.guestteamLink+'" target="_blank">'+newjson.guestteam+'</a></div>';

	                Liststr+='<div class="w10 pull-left">'+newjson.season+'</div>';
					Liststr+='<div class="w15 pull-left">'+newjson.ptime+'</div>';
					Liststr+='<div class="w5 pull-left red">'+newjson.l1+'</div>';
					Liststr+='<div class="w5 pull-left red">'+newjson.b1+'</div>';
					Liststr+='<div class="w5 pull-left red">'+newjson.lb1+'</div>';
					Liststr+='<div class="w5 pull-left red">'+newjson.bb1+'</div>';
					Liststr+='<div class="w5 pull-left red">&nbsp;'+newjson.homescore+'</div>';
					Liststr+='<div class="w5 pull-left red">&nbsp;'+newjson.guestscore+'</div>';

	                Liststr+='<div class="handle pull-left w15"><a href="javascript:;" tagid="'+newjson.id+'">删除</a><a href="basketball_agena_edit.html?id='+newjson.id+'">修改</a>';
	                Liststr+=''+jshtml+'</li>';	
				};
				$('.list_box').html(Liststr);
			}else{
				console.log("无数据！");
				$('.list_box').html("<p style='text-align:center; color:red; line-height:60px;'>暂无数据！！！</p>");
			}
			
			//console.log(bdata)
		},
		complete:function(){
			//列表加载完成之后才执行
			Delete('deletes','datapage/basketball_team.php',function(){
				//getAgena();
				getAgena(getnowday());
			});
			//editfn();

			jiesuan();
		}
	});

};



//结算


function jiesuan(){
	$('.jiesuan').on('click',function(){
		var gameid=$(this).attr('gameid');

		if(confirm("你确定要更新吗？请确定比赛已经结束！确定后讲无法更改！")){
			$.ajax({
				url:"datapage/getResult.php",
				type:"POST",
				data:"gameid="+gameid,
				success:function(data){
					console.log(data);
					var cbdata=eval('('+data+')');
					if(cbdata.respondCode==0){
						alert(cbdata.respondMsg);
						getAgena(getnowday());
					}else{
						alert(cbdata.respondMsg);
					}
				}
			});
		}
		 
	});
};








































