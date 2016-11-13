
$(function(){
	var oDate=new Date();
	var oDay=oDate.getDate();
	var oMonth=oDate.getMonth()+1;
	var oYear=oDate.getFullYear();
	var oNowDate=oYear+'-'+toZero(oMonth)+'-'+toZero(oDay);
	//alert(oNowDate)
	getGameList(oNowDate,'default');
	
	//选择日期
	$('.gameul li').on('click',function(){
		//alert($(this).index())
		var t=$(this).find('strong').html();
		$('.gameul li').removeClass('active');
		$(this).addClass('active');
		getGameList(t,'click');
	});

	function getGameList(t,type){
		$.ajax({
			url:"web/nba.php",
			type:"post",
			beforeSend: function(data){
				loading();
			},
			data:"type="+type+"&act=list&time="+t,
			success:function(data){
				$('.layer_loading').css('display','none');
				$(".layer_loading").remove();
				var jsons=eval('('+data+')');
				//console.log(data)
				if(jsons.counts==0){
					$('#listul').html("今日没有比赛。").css('border-bottom','1px solid #eff2f7');
					$('#endgame').empty();
				}else{
					var htmls='',endhtml='';
					$('#listul').empty();
					for(var i=0; i<jsons.result.length; i++){
						var lastdata=eval('('+jsons.result[i]+')');

						var s;
						//判断比分
						if(lastdata.score==''){
							s='-';
						}else{
							s=lastdata.homescore+'-'+lastdata.guestscore;
						};
						//时间
						$('#dataday').html(lastdata.ptime.substring(0,11));
						//直播显示
						var playHtml='',onlineLink='';
						if(lastdata.onlineLink){
							//var moreSingle=lastdata.onlineLink.replace(/&/g,'fuck0');
							//onlineLink=encodeURIComponent(lastdata.onlineLink.split('|||')[0]);
							console.log(lastdata.onlineLink);
							playHtml='<a target="_blank" href="onlineDetail.html?id='+lastdata.onlineId+'&sburl='+lastdata.onlineLink+'" class="socre w125"><span>'+s+'</span><s><i class="fa fa-play-circle"></i>&nbsp;观看直播</s></a>';
						}else{
							playHtml='<a href="javascript:;" class="socre w125"><span>'+s+'</span></a>';
						}
						//
						if(lastdata.isend=='true'){
							endhtml+='<li><div class="gamewarp clearfix">\
	                        <a href="" class="time w85 red">已结束</a>\
	                        <a href="javascript:;" class="stage w125">'+lastdata.league+'常规赛</a>\
	                        <a href="'+lastdata.hometeamLink+'" target="_blank" class="home w200"><img src="'+lastdata.homelogo+'">'+lastdata.hometeam+'</a>\
	                        <a href="javascript:;" class="socre w125"><span class="endsocre">'+s+'</span></a>\
	                        <a href="'+lastdata.guestteamLink+'" target="_blank" class="guest w200">'+lastdata.guestteam+'<img src="'+lastdata.guestlogo+'"></a>\
	                        <a href="javascript:;" class="handicap w125">让分:'+lastdata.l1+'<br/>大小:'+lastdata.b1+'</a>\
	                        <a href="javascript:;" class="analysis w78">分析</a></div>\
	                    	<div class="AnalysisDropdown" >'+lastdata.analysis+'</div></li>' 
						}else{
							htmls+='<li class=""><div class="gamewarp clearfix">\
	                        <a href="" class="time w85">'+lastdata.ptime.substring(11)+'</a>\
	                        <a href="javascript:;" class="stage w125">'+lastdata.league+'常规赛</a>\
	                        <a href="'+lastdata.hometeamLink+'" target="_blank" class="home w200"><img src="'+lastdata.homelogo+'">'+lastdata.hometeam+'</a>'+playHtml+'\
	                        <a href="'+lastdata.guestteamLink+'" target="_blank" class="guest w200">'+lastdata.guestteam+'<img src="'+lastdata.guestlogo+'"></a>\
	                        <a href="javascript:;" class="handicap w125">让分:'+lastdata.l1+'<br/>大小:'+lastdata.b1+'</a>\
	                        <a href="javascript:;" class="analysis w78">分析</a></div>\
	                    	<div class="AnalysisDropdown" >'+lastdata.analysis+'</div></li>' 
						};
					}
					
					$('#listul').html(htmls);
					$('#endgame').html('<ul class="listul">'+endhtml+'</ul>');

					if ($('#endgame ul li').length>0) {
						if ($('#listul li').length==0) {
							$('#listul').css('display','none')
						}else{
							$('#listul').css('display','block')
						};
					}else{
						$('#endgame ul').css('display','none')
						$('#listul').css('display','block')
					};
				}
				console.log(jsons.result);
			},
			error:function(){

			},
			complete:function(){
				dropdowns();
				
			}
		});
	}
	

	//alert($('#endgame li').length)


});
function dropdowns(){
	var oAnalysis=$('.listul li');
	//var oAnalysisDropdown=$('.AnalysisDropdown');
	oAnalysis.on('mouseenter',function(){
		var oAnalysisDropdown=$(this).find('.AnalysisDropdown');
		var oAnalysis=$(this).find('.analysis');
		oAnalysis.addClass('active');
		oAnalysisDropdown.css({'display':'block'});

		var oPlayBtn=$(this).find('.socre s');
		oPlayBtn.css({'display':'block'});

	});
	oAnalysis.on('mouseleave',function(){
		var oAnalysisDropdown=$(this).find('.AnalysisDropdown');
		var oAnalysis=$(this).find('.analysis');
		oAnalysis.removeClass('active');
		oAnalysisDropdown.css({'display':'none'});

		var oPlayBtn=$(this).find('.socre s');
		oPlayBtn.css({'display':'none'});
	});
};




