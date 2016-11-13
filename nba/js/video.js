$(function(){
	videoTag();
	var playtime='',username='',PageSize=30,nowpage=1,keywords='';
	//列表
	//getVideoList(playtime,username,keywords,PageSize,nowpage);

	$('#searchVideoBtn').on('click',function(){
		//playtime=$('#pTime').val();
		keywords=$('#searchVideo').val();
		getVideoList(playtime,username,keywords,PageSize,nowpage);
	});
	var oSpan=$('.hotTag span');
	oSpan.on('click',function(){
		keywords=$(this).html();
		getVideoList(playtime,username,keywords,PageSize,nowpage);
	})
	//getBanner();
	videoBanner();
	//sidehotvideo(); //热门视频
});

//获取视频标签

function videoTag(){
	var videoArr='',hotTag='';
	if(seeting().videoTag){
		videoArr=seeting().videoTag.split('、');
		for(var i=0; i<videoArr.length; i++){
			hotTag+='<span tag="'+videoArr[i]+'">'+videoArr[i]+'</span>'
		}
	}
	$('.hotTag').html(hotTag);
};
function getVideoList(playtime,username,keywords,PageSize,nowpage){
		$.ajax({
		url:"phpdata/datapage/online.php",
		type:"POST",
		data:"type=GetVideoList&PageSize="+PageSize+"&nowpage="+nowpage+"&playtime="+playtime+"&username="+username+"&keywords="+keywords+"",
		success: function(str){
			console.log(str)
			var oData=$.parseJSON(str);
			if(oData.Total==0){

				$('.VideoListUl').html("<p style='text-align:center;line-height:80px;'>暂无数据！</p>").animate({opacity:1});

				pagination(oData.Total,PageSize,nowpage,function(nowpage){
					getVideoList(playtime,username,keywords,PageSize,nowpage);
				})
			}else{
				var newjjHtml='';
				for(var i=0; i<oData.result.length; i++){
					console.log(oData.result[i])
					var oNewData=eval('('+oData.result[i]+')');
					newjjHtml+='<li><a target="_blank" href="videoDetail_'+oNewData.id+'.html" class="fl"><img src="'+oNewData.thumPic.substring(3)+'"></a>\
							<a target="_blank" href="videoDetail_'+oNewData.id+'.html" class="fl title slh"><span>'+oNewData.title+'</span>\
							<span class="descri">'+oNewData.descention+'</span></a>\
	                        <a target="_blank" href="videoDetail_'+oNewData.id+'.html" class="fr"><span class="playBtn"></span></a></li>';
				}
				
				$('.VideoListUl').html(newjjHtml).animate({opacity:1});
				
				pagination(oData.Total,PageSize,nowpage,function(nowpage){
					getVideoList(playtime,username,keywords,PageSize,nowpage);
				})
			}
			
		},
		error: function(){
			
		}	
	});	
};


function getBanner(){
	//获取热门视频
	$.ajax({
		url:'phpdata/datapage/online.php',
		type:"POST",
		beforeSend:function(){
			$('.videobannerUl').html('<p style="width:100%; margin:50px 0; height:70px;background:url(img/preload.gif) no-repeat center center;" ></p>')
		},
		data:"type=GetVideoBannerList",
		success:function(str){
			var oData=eval('('+str+')');
			console.log(oData)
			if(oData.counts>0){
				var videobannerUl='',textWarp='';
				for(var i=0; i<oData.result.length; i++){
					var obj=eval('('+oData.result[i]+')');
					console.log(obj)
					videobannerUl+='<li><a target="_blank" href="videoDetail.html?id='+obj.id+'"><img src="'+obj.bannerUrl.substring(3)+'"></a></li>';
					textWarp+='<a target="_blank" href="videoDetail.html?id='+obj.id+'">'+obj.title+'</a>';
				}
				$('.videobannerUl').html(videobannerUl);
				$('.textWarp').html(textWarp)
			};
			

		}
	});
}

//banner
function videoBanner(){

	var $oBanner=$('.bannerbox');
	var $oBannerul=$('.videobannerUl');
	var $oLi=$('.videobannerUl li');
	var $oPrev=$('.prev');
	var $oNext=$('.next');
	//var $oBtnWarp=$('.btnol');
	var $oTitle=$('.textWarp a');
	var $oNext=$('.nextprev .next');
	var $oPrev=$('.nextprev .prev');

	//var $oBtn=$('.btnol li');
	// int 默认选项
	int();
	function int(){
		$oLi.eq(0).addClass('show').css({'z-index':'10'});
		//$oBtn.eq(0).addClass('active');
		$oTitle.eq(0).addClass('active')
	}
	// 

	var iNow=0;
	var timer=null;
	var iMinzIndex=1;
	timer=setInterval(play,5000);

	// 左右按钮
	$oNext.on('click',function(){
		play();
	})
	$oPrev.on('click',function(){
		prev();
	})
	function play(){
		if(iNow>=$oLi.length-1){
			iNow=0;
		}else{
			iNow++
		}
		mianfn();
	}
	function prev(){
		if(iNow<=0){
			iNow=$oLi.length-1;
		}else{
			iNow--
		}
		mianfn();
	}

	// $oBtn.on('click',function(){
	// 	iNow=$(this).index();
	// 	mianfn(iNow);
	// });	

	function mianfn(){
		//$oBtn.removeClass('active');
		//$oBtn.eq(iNow).addClass('active');
		$oLi.stop().animate({opacity:0});
		$oLi.eq(iNow).stop().animate({opacity:1}).css({
			"z-index":iMinzIndex++
		});
		$oTitle.removeClass('active');
		$oTitle.eq(iNow).addClass('active');
	}

	$oBanner.on('mouseenter',function(){
		clearInterval(timer);
		$('.nextprev span').css({'display':'block'})
	});
	$oBanner.on('mouseleave',function(){
		timer=setInterval(play,3000);
		$('.nextprev span').css({'display':'none'})
	});

}
