

$(function(){



//getBanner();
banner();
});




//banner

function getBanner(){

	$.ajax({
		url:"web/get_arclist.php",
		type:"POST",
		data:"act=getbanner",
		beforeSend: function(data){
				loading();
		},
		success:function(data){
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();
			var d=eval('('+data+')');
			//console.log(d.result[0]);
			var oUlHtml='';
			var oTitleHtml='';
			for(var i=0; i<d.result.length; i++){
				//var a=
				var resultobj=eval('('+d.result[i]+')');
				//console.log(resultobj.bannerimg)
				oUlHtml+='<li><a href="content.html?page='+resultobj.id+'" target="_blank"><img src="'+resultobj.bannerimg+'" alt="'+resultobj.title+'"></a></li>';
				oTitleHtml+='<a href="content.html?page='+resultobj.id+'" target="_blank">'+resultobj.title+'</a>';
			}
			$('.bannerul').html(oUlHtml).animate({'opacity':1});
			$('.banner-title').html(oTitleHtml);
			banner();
		}
	})

}


function banner(){
	var $oBanner=$('.banner');
	var $oBannerul=$('.bannerul');
	var $oLi=$('.bannerul li');
	var $oPrev=$('.prev');
	var $oNext=$('.next');
	var $oBtnWarp=$('.btnol');
	var $oTitle=$('.banner-title a');
	var $oNext=$('.nextprev .next');
	var $oPrev=$('.nextprev .prev');
	//创建按钮
	createBtn();
	function createBtn(){
		var oFrag=document.createDocumentFragment(); //文档碎片
		for (var i = 0; i < $oLi.length; i++) {
			var oLi=document.createElement('li');
			oFrag.appendChild(oLi)
		};
		$oBtnWarp.append(oFrag);
	}

	var $oBtn=$('.btnol li');
	// int 默认选项
	int();
	function int(){
		$oLi.eq(0).addClass('show').css({'z-index':'10'});
		$oBtn.eq(0).addClass('active');
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

	$oBtn.on('click',function(){
		iNow=$(this).index();
		mianfn(iNow);
	});	

	function mianfn(){
		$oBtn.removeClass('active');
		$oBtn.eq(iNow).addClass('active');
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













