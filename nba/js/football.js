


/*
	英超，西甲，德甲，意甲，法甲，中超
*/




$(function(){
	var reqkey=["英超","西甲","意甲","法甲","德甲","中超"];
	
	for(var i=0; i<reqkey.length; i++){
		(function(index){
			
			var oLineWarp=document.createElement('div');
			oLineWarp.className='line-warp';
			oLineWarp.id='LineWarp'+index;
			
			$('.football-content').append(oLineWarp);
			console.log();
			adddata(reqkey[index],"#LineWarp"+index,1);	
		})(i);	
	}
	TTab();	
	
});


function adddata(tag,domName,saicheng){
	
	$.ajax({
		url:"web/football.php",
		type:"POST",
		beforeSend:function(){
			loading();
		},
		data:"act=league&league="+tag,
		success: function(data){
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();
			
			var AnalData=eval('('+data+')');
			
			if(AnalData.error_code==0){
				var SelectSeveralRounds,tabstitle;
				var oScore=AnalData.result.views.jifenbang;
				var oShes=AnalData.result.views.sheshoubang;
				console.log(oScore)
				if(saicheng==1){
					SelectSeveralRounds=AnalData.result.views.saicheng1;
					tabstitle=AnalData.result.tabs.saicheng1;
				}else{
					SelectSeveralRounds=AnalData.result.views.saicheng2;
					//console.log(SelectSeveralRounds)
					tabstitle=AnalData.result.tabs.saicheng2;
				}
				
				var allHtml='',rankScore='',listHtml='',rankSS='';
				for(var i=0; i<SelectSeveralRounds.length; i++){
					var kill=SelectSeveralRounds[i];
					listHtml+='<div class="list-one"><div class="list-team">\
							  <a href="'+kill.c4T1URL+'" style="background: url() no-repeat center 8px;" class="home-team" target="_blank">'+kill.c4T1+'</a>\
							  <a href="javascript:;" class="score">'+kill.c4R+'</a>\
							  <a href="'+kill.c4T2URL+'" style="background: url() no-repeat center 8px;" class="guest-team" target="_blank">'+kill.c4T2+'</a></div>\
							  <div class="Added"><a href="'+kill.c51Link+'" target="_blank">'+kill.c51+'</a>\
							  <a href="'+kill.c52Link+'" target="_blank">'+kill.c52+'</a></div></div>';
				};
				var moerHtml='';
				if(SelectSeveralRounds.length==9){
					moerHtml='';
				}else if(SelectSeveralRounds.length==10){
					moerHtml='<div class="list-tow"></div>'
				}else if(SelectSeveralRounds.length==8){
					moerHtml='<div class="list-one"></div>'
				}
				//rankScore 积分排名
				
				for(var i=0; i<oScore.length; i++){
					rankScore+='<li><span class="rk_order">'+oScore[i].c1+'</span>\
								<span class="jf_team"><a href="'+oScore[i].c2L+'"  target="_blank">'+oScore[i].c2+'</a></span>\
								<span class="jf_team">'+oScore[i].c3+'</span>\
								<span class="rk_win">'+oScore[i].c41+'</span>\
								<span class="rk_result">'+oScore[i].c6+'</span></li>';
				}
				for(var i=0; i<oShes.length; i++){
					rankSS+='<li><span class="rk_order">'+oShes[i].c1+'</span>\
								<span class="jf_team"><a href="'+oShes[i].c2L+'"  target="_blank">'+oShes[i].c2+'</a></span>\
								<span class="jf_team"><a href="'+oShes[i].c3L+'"  target="_blank">'+oShes[i].c3+'</a></span>\
								<span class="rk_win">'+oShes[i].c4+'</span>\
								<span class="rk_result">'+oShes[i].c5+'</span></li>';
				}
				
				allHtml='<div class="line-warp"><div class="line-top"><a href="javascript:;" class="t">'+AnalData.result.key+'</a>\
						<div class="list-drop"><span class="list-show" warpid="'+domName+'" LeagueName="'+AnalData.result.key+'">'+tabstitle+'</span>\
						<div class="drop"><a href="javascript:;">'+AnalData.result.tabs.saicheng1+'</a>\
						<a href="javascript:;">'+AnalData.result.tabs.saicheng2+'</a></div></div>\
						<div class="fr t-tab"><a href="javascript:;" class="active">'+AnalData.result.tabs.jifenbang+'</a>\
						<a href="javascript:;">'+AnalData.result.tabs.sheshoubang+'</a></div></div>\
						<div class="line-list-warp clearfix"><div class="line-list fl">'+listHtml+''+moerHtml+'</div>\
						<div class="rank-warp fr"><div class="score-rank tab-rank">\
								<ul><li class="title-rank">\
										<span class="rk_order">排名</span>\
										<span class="jf_team">球队</span>\
										<span class="jf_team">场次</span>\
										<span class="rk_win">胜</span>\
										<span class="rk_result">积分</span>\
								</li>'+rankScore+'</ul></div>\
							<div class="jf_rank tab-rank" style="display:none;">\
								<ul><li class="title-rank">\
										<span class="rk_order">排名</span>\
										<span class="jf_team">球员	</span>\
										<span class="jf_team">球队	</span>\
										<span class="rk_win">进球	</span>\
										<span class="rk_result">点球</span>\
								</li>'+rankSS+'</ul></div>\
							</div></div></div>';
				$(domName).append(allHtml);
				
				olistShowWidth();
			}else{
				alert('加载失败,请刷新！');	
			}
		}	
	});	
}


function olistShowWidth(){
	var olistShow=$('.list-show');
	
	var olistShowWidth=olistShow.innerWidth();
	
	var oD=$('.drop');
	
	oD.css('width',olistShowWidth+'px');
		
	//点击显示第几轮
	
	for(var i=0; i<olistShow.length; i++){
		(function(index){
			olistShow.eq(index).on('click',function(event){
				oD.eq(index).css('display','block');
				event.stopPropagation(); 
			});
			$(document.body).on('click',function(){
				oD.eq(index).css('display','none');
			});
		})(i);
	}
	
	// 选择第几轮
	for(var i=0;i<oD.length; i++){
		(function(index){
			var oList=oD[index].getElementsByTagName('a');
			control(oList,index);
		})(i)	
	};

	function control(oList,index){
		//alert(oList)
		for(var i=0;i<oList.length; i++){
			(function(ind){
				oList[ind].onclick=function(){
					
					var rund=$(this).html();
					
					olistShow.eq(index).html(rund);	
					//ajax 请求
					var name=olistShow.eq(index).attr('leaguename');
					var Wid=olistShow.eq(index).attr('warpid');
					$(Wid).empty();
					adddata(name,Wid,(ind+1));
				};
			})(i)	
		}
	}
	
	
	//积分排名
	
	$('.t-tab').each(function(index, element) {
		var oBtn=$('.t-tab').eq(index).find('a');
		var oBox=$('.rank-warp').eq(index).find('.tab-rank');
		for(var i=0; i<oBtn.length; i++){
			(function(ind){
				oBtn[ind].onclick=function(){
					for(var i=0; i<oBtn.length; i++){
						oBtn[i].className='';
						oBox[i].style.display='none';	
					}
					this.className="active";
					oBox[ind].style.display='block';	
				}	
			})(i)	
		}
	});
	
}




function TTab(){
	var oTab=$('.t-tab');
	
	for(var i=0; i<oTab.length; i++){
		(function(index){
			var oBtn=oTab[index].getElementsByTagName('a');
			
			//alert(oBtn.length)	
		})(i)	
	}
}



















