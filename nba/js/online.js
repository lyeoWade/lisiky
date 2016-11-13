$(function(){

	var oDay=new Date();
	var year=oDay.getFullYear();
	var oM=oDay.getMonth()+1;
	var oD=oDay.getDate();
	//alert(weekNow)
	$.ajax({
		url:'phpdata/datapage/online.php',
		type:"POST",
		data:"type=GetOnlineList",
		success:function(str){
			var oData=eval('('+str+')');
			console.log(oData);
			var oList1='',oList2='',oList3='',oList4='',oList5='',oList6='',oList7='';

			for(var i=0; i<oData.result.length;i++){
				var obj=eval('('+oData.result[i]+')');
				var times=obj.PlayTime.substring(0,10);
				if(times==getDay(0)){
					oList1+=cHtml();
				}else if(times==getDay(1)){
					oList2+=cHtml();
				}else if(times==getDay(2)){
					oList3+=cHtml();
				}else if(times==getDay(3)){
					oList4+=cHtml();
				}else if(times==getDay(4)){
					oList5+=cHtml();
				}else if(times==getDay(5)){
					oList6+=cHtml();
				}else if(times==getDay(6)){
					oList7+=cHtml();
				}
				function cHtml(){
					var descentions='';
					if(obj.descention==''){
						descentions='';
					}else{
						descentions='<div class="firelineWarp"><p><a href="" class="tip">火线速递:</a>'+obj.descention+'</p></div>';
					};
					return '<li label="篮球,NBA,76人,鹈鹕" id="saishi68656" data-time="2016-04-06 07:00">\
                    <span class="ptime">'+obj.PlayTime.substring(10,16)+'</span> \
                    <b class="leag">'+obj.league+'</b> \
                    <span class="home">'+obj.hteam+'</span> \
                    <span style="font-weight: bold; margin: 0 10px;"> - </span> \
                    <span class="guest">'+obj.gteam+'</span> \
                    <a href="onlineDetail.html?id='+obj.id+'" target="_blank" class="tip">'+obj.onlineName+'</a> \
                    <a href="'+obj.LiveScores+'" target="_blank">比分直播</a>  \
                    <a href="'+obj.LiveText+'" target="_blank">文字直播</a>\
                    <a class="onlineurl" target="_blank">在线投注</a>'+descentions+'</li>';	
                    //<a class="qqtx"target="_blank" title="添加提醒后，开赛前5分钟，QQ会发送消息提醒您"><img style="display:inline !important;vertical-align:middle; height: 16px; width:50px;margin-top: -2px; " src="http://i.gtimg.cn/snsapp/app/bee/widget/img/icon3.png"></a>		
				}
			}
			var All='';
			var arrList=[oList1,oList2,oList3,oList4,oList5,oList6,oList7];
			for(var i=0; i<7; i++){
				All+='<div class="onlineList" id="newvideo"><h3>'+getDay(i)+'&nbsp;星期'+getWeek(i)+'&nbsp;极限直播表</h3><div class="videoList"><ul id="videoListUl">'+arrList[i]+'</ul></div></div>';
			};
			//console.log(All)
			$('.onlineWarpList').html(All);
			drop();
			
			for(var i=0; i<$('.onlineurl').length; i++){
				$('.onlineurl').attr('href',oTargeturl[randoms(0,oTargeturl.length-1)]);
			};

			
		}
	});


/*	$.ajax({
		url:'phpdata/datapage/online.php',
		type:"POST",
		data:"type=GetVideoOnlineList",
		success:function(str){
			var oData=eval('('+str+')');
			if(oData.counts>0){
				var newjjHtml='';
				for(var i=0; i<oData.result.length; i++){
					var obj=eval('('+oData.result[i]+')');
					console.log(obj)
					newjjHtml+='<a target="_blank" href="videoDetail.html?id='+obj.id+'">'+obj.title+'</a> <span>|</span>';
				}
				$('#newjj').html('<a href="video.html" target="_blank" class="keynote">篮球集锦</a> '+newjjHtml+'<a href="video.html" target="_blank">[更多集锦] </a>');
			};
		}
	});*/
	//sidehotvideo();
});

function drop(){
	$('.onlineList h3,.hotvideo h3').on('click',function(){
		var $drop=$(this).parents('.onlineList,.hotvideo').find('.videoList').eq(0);
		$drop.toggle();
	})
}

/*
	*/