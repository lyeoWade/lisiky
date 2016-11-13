$(function(){

	//获取当天球队
	var oDate=new Date();
	var times=oDate.getFullYear()+'-'+toZero(oDate.getMonth()+1)+'-'+toZero(oDate.getDate());
	$.ajax({
		type:"POST",
		url:"web/first.php",
		data:"type=first&times="+times,
		beforeSend: function(data){
			loading();
		},
		success:function(data){
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();
			var datas=eval('('+data+')');
			if(datas.counts==0){
				$('.teamListWarp').html('今日没有比赛！')
			}else{
				var sHtml='';
				for(var i=0; i<datas.result.length; i++){
					var obj=eval('('+datas.result[i]+')');
					console.log(obj)
					sHtml+='<div class="col-list clearfix"><div class="col-title">\
							<a href="javascript:;" class="w100 slh fl">'+obj.hometeam.substring(0,5)+'<i>(主)</i></a>\
							<span class="w90 fl">'+obj.playtime.substring(11)+'</span>\
							<a href="javascript:;" class="w100 slh fl"><i>(客)</i>'+obj.guestteam.substring(0,5)+'</a></div>\
							<div class="player clearfix"><div class="fl playerwarp">\
							<span>'+obj.hC+'</span><span>'+obj.hPF+'</span><span>'+obj.hPG+'</span><span>'+obj.hSF+'</span><span>'+obj.hSG+'</span>\
							</div><div class="fl playerwarp">\
							<span>'+obj.gC+'</span><span>'+obj.gPF+'</span><span>'+obj.gPG+'</span><span>'+obj.gSF+'</span><span>'+obj.gSG+'</span>\
							</div></div></div>'
				}
				$('.teamListWarp').html(sHtml)
			}
		}
	});	
	
});



