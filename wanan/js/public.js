

function Wanan(){
	//alert(123)

	this.userdatas=this.getCookie('userinfo');
	this.isLogin();
	this.IsPC("m/home.html");
}

Wanan.prototype.isLogin=function(){
	var _this=this; 
	var pic='';
	if(_this.userdatas){
		var obj=eval('('+_this.userdatas+')');
		if(obj.pic==""){
			pic="images/default.jpg";
		}else{
			pic=obj.pic;
		}
		$('.login-wrap').removeClass('show').addClass('hide');
		$('.login-end').removeClass('hide').addClass('show').html('<a target="_blank" href="member.html?id='+obj.id+'"><img src="'+pic+'"><span>'+obj.username+'</span></a>');
	}
}

Wanan.prototype.checkeUser=function(fn){
	var _this=this;
	if(!this.userdatas){
		_this.createLayer({
			text:"请登录之后再操作哦^_^!",
			handle:1
		});
		return false;
	}else{
		fn&&fn()
	}
}

//播放器

Wanan.prototype.Aduio=function(){

	var _this=this,
		PageSize=5,
		nowpage=1,
		ismedia=0;

	// var datas=[
	// 		{
	// 			"title":"最美的时光遇见你",
	// 			"pic":"images/4.jpg",
	// 			"src":"source/zuimeideshiguangyudaoni.mp3",
	// 			"author":"楚颜",
	// 			"authorid":"564",
	// 			"zan":"231",
	// 			"comment":"12",
	// 			"shoucang":"6"
	// 		},
	// 		{
	// 			"title":"致Mr.Wrong",
	// 			"pic":"images/5.jpg",
	// 			"src":"source/zhi.mp3",
	// 			"author":"楚颜2",
	// 			"authorid":"564",
	// 			"zan":"3242",
	// 			"comment":"231",
	// 			"shoucang":"63"
	// 		},
	// 		{
	// 			"title":"和我一个约定",
	// 			"pic":"images/2.jpg",
	// 			"src":"source/hewoyigeyueding.mp3",
	// 			"author":"楚颜3",
	// 			"authorid":"564",
	// 			"zan":"55",
	// 			"comment":"6",
	// 			"shoucang":"1"
	// 		},
	// 		{
	// 			"title":"理想",
	// 			"pic":"images/6.jpg",
	// 			"src":"source/lixiang.mp3",
	// 			"author":"赵雷",
	// 			"authorid":"22223",
	// 			"zan":"12367",
	// 			"comment":"2365",
	// 			"shoucang":"234"
	// 		}
	// 	]

		_this.wananIndex(PageSize,nowpage,ismedia,function (str){
			var data=eval('('+str+')'),
				shtml='';
			
			var oAudio=document.getElementById('audio'),
			oImg=$('.audio-img-wrap img');
			//alert(datas);
			var random=0;
			

			if(data.Total>0){
				//alert(data.result.length)
				for(var i=0; i<data.result.length; i++){
					var datas=data.result;
					//console.log(datas[0]);
					initAudio(random);
					//初始化
					function initAudio(random){

						var k=eval('('+datas[random]+')')
						$('.audio-img-wrap img').attr('src',k.mediacoverpic);
						$('#audio').attr('src',k.media);
						$('.audio-title').html('<h3>'+k.title+'</h3><p>作者:<a target="_blank" href="member.html?id='+k.authorid+'">'+k.zuozhe+'</a></p>\
							<p class="handles"><span class="zan">('+k.zan+')</span><span class="cai"><i class="comment"></i>('+k.comment+')</span><span class="shoucang">('+k.sc+')</span></p>');					
					};



				}
			}


			
			

			//
			$('.paly-btn').on('click',function(){
				if(oAudio.paused){
					oAudio.play();
					$(this).removeClass('play').addClass('pause');
					oImg.css({"animation":"musicpic 5s infinite linear"});
					
				}else{
					oAudio.pause();
					$(this).removeClass('pause').addClass('play');
					oImg.css({"animation":"0"});
				}		
				
			});

			$('.audio-change a').on('click',function(){
				var randomNum=_this.random(0,datas.length);
				initAudio(randomNum);
			})


			//播放结束之后
			endedPlay();

			function endedPlay(){	
				oAudio.addEventListener('ended',function(){
					var randomNum=_this.random(0,datas.length);
					initAudio(randomNum);	
				},false);
			};
		});
}
//首页banner
Wanan.prototype.getBanner=function(){

	$.ajax({
		url:"admin/pushArc.php",
		type:"POST",
		data:"type=getbanner",
		beforeSend: function(data){
				loading();
		},
		success:function(data){
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();
			var d=eval('('+data+')');
			//console.log(d)
			var oUlHtml='',
				oTitleHtml='';
			for(var i=0; i<d.result.length; i++){
				var resultobj=eval('('+d.result[i]+')');
				oUlHtml+='<li><a target="_blank" href="content.html?id='+resultobj.id+'" target="_blank"><img src="'+resultobj.banner+'" alt="'+resultobj.title+'"></a></li>';
				oTitleHtml+='<a target="_blank" href="content.html?id='+resultobj.id+'" target="_blank">'+resultobj.title+'</a>';
			}
			$('.banner-ul').html(oUlHtml).animate({'opacity':1});
			$('.font-wrap p').html(oTitleHtml);
			banner();
		}
	})
}
function banner(){
	var $oBanner=$('.banner');
	var $oBannerul=$('.banner-ul');
	var $oLi=$('.banner-ul li');
	//var $oPrev=$('.prev');
	//var $oNext=$('.next');
	var $oBtnWarp=$('.font-wrap ol');
	var $oTitle=$('.font-wrap p a');
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

	var $oBtn=$('.font-wrap ol li');
	// int 默认选项
	int();
	function int(){
		$oLi.eq(0).addClass('showli').css({'z-index':'10'});
		$oBtn.eq(0).addClass('active');
		$oTitle.eq(0).addClass('show')
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
		$oTitle.removeClass('show');
		$oTitle.eq(iNow).addClass('show');
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
//漂流瓶
Wanan.prototype.plp=function(){

	var oPlpbtn=$_('#plpbtn'),
		_this=this,
		oPushText=$_('.push-text');
	oPlpbtn.onclick=function(){
		_this.checkeUser();

		var userInfo=eval('('+_this.userdatas+')');
		var datas="type=Pushplp&userid="+userInfo.id+"&plpval="+encodeURIComponent(oPushText.value.replace(/[\n]/ig,'。'));
		_this.oAjax('admin/satin.php',datas,function(str){
			var obj=eval('('+str+')');
			if(obj.respondCode==0){
				_this.createLayer({
					text:"漂流瓶已扔出!",
					handle:1
				});
				oPushText.value='';
				_this.GetPlpList(1,50);
			}
		},function(str){

		});
	}
}
Wanan.prototype.GetPlpList=function(nowpage,PageSize){

	var _this=this;

	var datas="type=GetPlpList&nowpage="+nowpage+"&PageSize="+PageSize;
	_this.oAjax('admin/satin.php',datas,function(str){
		var obj=eval('('+str+')');

		if(obj.Total>0){
			var sHtml='';
			$('.roll-content').html('');
			for(var i=0; i<obj.Total; i++){
				var oDatas=eval('('+obj.result[i]+')');
				console.log(oDatas);
				sHtml+='<div class="wanan-now-line"><div class="wanan-now-thumb"><img src="'+oDatas.pic+'"></div>\
			  			<div class="line-info">\
			  						<div class="line-username">\
			  							<a href="">'+oDatas.username+'</a><span>'+oDatas.pushtime+'</span>\
										<div class="line-handle handles fr"><span class="zan">('+oDatas.zan+')</span></div>\
			  						</div>\
			  						<div class="line-content">'+decodeURIComponent(oDatas.content)+'</div></div></div>';

			}
			$('.roll-content').html(sHtml);


			var oBox=getByClass(document,'wanan-roll');
			var oBarBox=getByClass(document,'wanan-bar-roll');

			_this.roll(oBox,oBarBox,0);
		}else{

		}
	},function(str){
		
	});
}
Wanan.prototype.oAjax=function(url,datas,sfn,ffn,loadfn){
	$.ajax({
		url:url,
		type:"POST",
		beforeSend:function(str){
			loadfn&&loadfn(str);
		},
		data:datas,
		success:function(str){
			sfn(str);
		},
		error:function(str){
			ffn&&ffn();
		}
	})
}
Wanan.prototype.AduioOne=function(k){

	var _this=this,
		PageSize=5,
		nowpage=1,
		ismedia=0;


	var oAudio=document.getElementById('audio'),
	oImg=$('.audio-img-wrap img');
	//alert(datas);
	//var random=0;
	
	initAudio(k);
	//初始化
	function initAudio(k){

		//var k=eval('('+datas[random]+')')
		$('.audio-img-wrap img').attr('src',k.mediacoverpic);
		$('#audio').attr('src',k.media);
		try{
			_this.createAnalysers(oAudio);	

			setInterval(function(){
				nowTime(oAudio);
			},1000);
		}catch(e){

		}
		
	};


	
	

	//
	$('.paly-btn').on('click',function(){
		if(oAudio.paused){
			oAudio.play();
			$(this).removeClass('play').addClass('pause');
			oImg.css({"animation":"musicpic 5s infinite linear"});
			
		}else{
			oAudio.pause();
			$(this).removeClass('pause').addClass('play');
			oImg.css({"animation":"0"});
		}		
		
	});

	var progressBox=document.getElementById('progress');
	var progress=document.getElementById('progress').children[0];
	function nowTime(obj){
		//当前播放时间
		//播放进度
		var scale = obj.currentTime/obj.duration;
		//console.log(scale)
		progress.style.width = scale * 540 + 'px';
		
	}


	//播放结束之后
	endedPlay();

	function endedPlay(){	
		oAudio.addEventListener('ended',function(){
			//var randomNum=_this.random(0,datas.length);
			initAudio(k);	
		},false);
	};
}
//创建音频
Wanan.prototype.createAnalysers=function(obj){ 
	//音频文件接口：用来监听音乐的播放
	window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;
	var _this=this;
	var actx = new AudioContext();  //创建一个音乐对象
	// 创建一个音频节点
	var analyser = actx.createAnalyser();
	//创建音乐媒体源节点
	var audioSrc = actx.createMediaElementSource(obj);

	//console.log(audioSrc)
	//将媒体源节点与分析机制链接
	audioSrc.connect(analyser);
	
	//将分析机制与目标点链接（扬声器）
	analyser.connect(actx.destination);

	console.log(analyser);
	var num = 100;     
	var can = $_(".audio-info");

	var cxt = can.getContext("2d");
	color = cxt.createLinearGradient(can.width*0.2,0,can.width*0.2,150);
	color.addColorStop(0,"#fff");
	color.addColorStop(0.5,"#f00");
	color.addColorStop(1,"#ccc");
	colorf = cxt.createLinearGradient(can.width*.2,150,can.width*.2,250);
	colorf.addColorStop(0,"#ccc");
	colorf.addColorStop(0.5,"#f00");
	colorf.addColorStop(1,"#fff");
	draw();
	function draw(){
		//创建一个与音乐频次等长的数组 【自动转换为0-255之间的数子】
		var voicehigh = new Uint8Array(analyser.frequencyBinCount);
		//将分析出来的音频数据添加到数组里面
		analyser.getByteFrequencyData(voicehigh);
		//console.log(voicehigh);
		var step = Math.round(voicehigh.length/num);
		cxt.clearRect(0,0,can.width,can.height);
		cxt.globalAlpha = 0.3;//透明度
		cxt.beginPath();
		for(var i=0;i<num;i++){
			var value = (voicehigh[step*i])/2;
			cxt.fillStyle = color;
			cxt.fillRect(i*10+can.width*0.2,150,7,-value+1);
			cxt.fillRect(can.width*0.2-(i-1)*10,150,7,-value+1); 
			cxt.fillStyle = colorf;       
			cxt.fillRect(i*10+can.width*0.2,150,7,value+1);
			cxt.fillRect(can.width*0.2-(i-1)*10,150,7,value+1);
		}
		cxt.closePath();
		requestAnimationFrame(draw);
	}
}


Wanan.prototype.satinPush=function(){
	var _this=this;
	$('.satin-btn').on('click',function(){
		var oContent=encodeURIComponent($('#satincontent').val());
					 //encodeURIComponent
		var iUserId=eval('('+_this.userdatas+')'),
			$picArr=$('#uploader').attr('imageSrc'),
			picurl='',
			satintype=1;
			if($picArr!=undefined){
				picurl=$picArr.replace(/\\/g,'/');
			}
		//alert(oContent+'-'+picurl)
		if(oContent=='' && picurl==''){
			_this.createLayer({
				text:"总得干点什么吧？",
				handle:1
			});
			return false;
		};

		if(oContent.length<6){
			_this.createLayer({
				text:"你确定这是一个段子？",
				handle:1
			});
			return false;
		}

		if(picurl==''){
			satintype=1;
		}else{
			satintype=2;
		}
		//alert(oContent)
		//return false;
		$.ajax({
			url:"admin/satin.php",
			type:"POST",
			data:"type=pushOneSatin&userid="+iUserId.id+"&content="+oContent+"&satintype="+satintype+"&picurl="+picurl,
			success:function(str){
				console.log(str);
				var data=eval('('+str+')');
				if(data.respondCode==0){
					_this.createLayer({
						text:data.respondMsg,
						handle:1
					},function(){
						history.go(0);
					});

				}else{
					_this.createLayer({
						text:data.respondMsg,
						handle:1
					});
				}
			}
		})
		//alert($picArr);


	});

}

Wanan.prototype.satin=function(){
	var nowpage=1,
		PageSize=20,
		satintype=1,
		_this=this;
	satinList(nowpage,PageSize,satintype);

	function satinList(nowpage,PageSize,satintype){
		$.ajax({
			type:"POST",
			url:"admin/satin.php",
			data:"type=GetSatinList&nowpage="+nowpage+"&PageSize="+PageSize+"&satintype="+satintype,
			beforeSend: function(data){
				loading();
			},
			success:function(data){
				$('.layer_loading').css('display','none');
				$(".layer_loading").remove();
			//success:function(data){
				var datas=eval('('+data+')');
				console.log(datas)
				if(datas.Total!=0){
					var shtml='',imgbox='',picarr='';

					for(var i=0; i<datas.result.length; i++){
						var strs=eval('('+datas.result[i]+')');
						//console.log(strs.picture)
						var picUrl='';
						if(strs.picture!=''){
							var picArr=strs.picture.split(',');
							
							for(var j=0; j<picArr.length; j++){
								picUrl+='<img src="'+picArr[j]+'"/>';
							}
						}
						imgbox='<div class="imgbox">'+picUrl+'</div>';
						shtml+='<div class="satin-line"><div class="satin-thumb">\
								<img src="'+strs.userpic+'">\
								<div class="satin-line-username">\
									<a target="_blank" href="">'+strs.zuozhe+'</a>\
									<span>'+strs.pushtime+'</span></div></div>\
								<div class="satin-line-info"><div class="satin-line-content">\
									<a target="_blank" href="satincontent.html?id='+strs.id+'">'+strs.content+''+imgbox+'</a>\
								</div><div class="satin-line-handle ">\
									<div class="fl"><span class="zan-btn" satinid='+strs.id+'><i class="zan"></i>'+strs.zan+'</span>\
								<span  class="cai-btn" satinid='+strs.id+'><i class="cai"></i>'+strs.cai+'</span>\
								<span class="shoucang-btn" satinid='+strs.id+'><i class="shoucang"></i>'+strs.sc+'</span></div>\
								<div class="fr"><span class="comment-btn"><a target="_blank" href="satincontent.html?id='+strs.id+'"><i class="comment"></i>'+strs.comment+'</a></span></div>\
								</div></div></div>';
					}
					if(datas.Total>1){
						$('.satin-list').append(shtml);
						//alert(nowpage*PageSize+'-'+datas.Total);
						$('#loadmore').attr('nowpage',nowpage)
						if(nowpage*PageSize>=datas.Total){
							//alert('来了')
							$('.load-more').css('display','none')
						}
					}else{
						$('.satin-list').append(shtml);
						$('.load-more').css('display','none')
					}

					_this.SatinZan('.zan-btn');
					_this.SatinCai('.cai-btn');
				}
			}
		});	
	}

	$('#loadmore').on('click',function(){
		nowpage++;
		//var num=$('#loadmore').attr('nowpage');
		var typeid=$(this).attr('typeid');
		satinList(nowpage,PageSize,typeid);
	});

	$('.satin-tag-wrap a').on('click',function(){
		nowpage=1,
		PageSize=20;
		$('.satin-tag-wrap a').removeClass('active')
		$(this).addClass('active');
		var satintypes=$(this).attr('typeid');
		//清空
		$('.satin-list').html('');
		$('.load-more').css('display','block');
		$('#loadmore').attr('typeid',satintypes);
		$('#loadmore').attr('nowpage',1);
		satinList(nowpage,PageSize,satintypes);
	});
};


Wanan.prototype.GetCommentList=function(commenttypeid){
	var nowpage=1,
		PageSize=20,
		_this=this,
		targetid=this.geturldata(window.location.href).id;
	GetCommentList(nowpage,PageSize,targetid,commenttypeid);

	function GetCommentList(nowpage,PageSize,targetid,commenttypeid){
		$.ajax({
			type:"POST",
			url:"admin/satin.php",
			data:"type=GetCommentList&nowpage="+nowpage+"&PageSize="+PageSize+"&targetid="+targetid+"&commenttypeid="+commenttypeid,
			success:function(data){
				var datas=eval('('+data+')');
				console.log(datas)
				$('.all-num').html('('+datas.Total+')');
				if(datas.Total!=0){
					var shtml='';
					for(var i=0; i<datas.result.length; i++){
						var strs=eval('('+datas.result[i]+')');
						if(strs.pic==''){
							strs.pic="images/4.jpg";
						};
						shtml+='<div class="comment-line">\
						<div class="comment-user-pic">\
							<img src="'+strs.pic+'"></div>\
						<div class="comment-user-wrap">\
							<div class="comment-user-info clearfix">\
								<div class="fl comment-username"><p>'+strs.username+'</p><p>'+strs.commenttime+'</p></div>\
								<div class="fr comment-handle">\
									<span class="comment-zan-btn" satinid="'+strs.id+'"><i class="zan"></i>'+strs.zan+'</span>\
									<span class="comment-cai-btn" satinid="'+strs.id+'"><i class="cai"></i>'+strs.cai+'</span>\
									</div></div>\
							<div class="comment-user-content">'+decodeURIComponent(strs.content)+'</div></div></div>';
					}
					if(datas.Total>1){
						$('.all-comment-list').append(shtml);
						$('#loadmore').attr('nowpage',nowpage)
						if(nowpage*PageSize>=datas.Total){
							$('.load-more').css('display','none');
						}
					}else{
						$('.all-comment-list').append(shtml);
						$('.load-more').css('display','none')
					}

					_this.SatinZan('.comment-zan-btn',commenttypeid);
					_this.SatinCai('.comment-cai-btn',commenttypeid);
				}else{
					$('.all-comment-list').html("暂无评论");
					$('.load-more').css('display','none')
				}
			}
		});	
	}

	$('#loadmore').on('click',function(){
		nowpage++;
		//var num=$('#loadmore').attr('nowpage');
		GetCommentList(nowpage,PageSize,targetid,commenttypeid);
	});

	$('.satin-tag-wrap a').on('click',function(){
		nowpage=1,
		PageSize=20;
		$('.satin-tag-wrap a').removeClass('active')
		$(this).addClass('active');
		//清空
		$('.all-comment-list').html('');
		$('.load-more').css('display','block');
		$('#loadmore').attr('nowpage',1);
		GetCommentList(nowpage,PageSize,targetid,commenttypeid);
	});
	
};

Wanan.prototype.SatinZan=function(ele,typeid){
	var This=this;
	$(ele).on('click',function(){
		var satinid=$(this).attr('satinid');
		var _this=$(this);
		if($(this).attr('isable')==undefined){


			var datas="type=satinZan&typeZanid="+typeid+"&satinid="+satinid;

			console.log(datas);
			$.ajax({
				type:"POST",
				url:"admin/satin.php",
				data:datas,
				success:function(data){
					var datas=eval('('+data+')');
					console.log(datas)
					if(datas.respondCode==0){
						_this.html('<i class="zan-active"></i>'+(parseInt(_this.text())+1)).css('color','#f46').attr('isable','1');
						
						This.createLayer({
							text:'点赞成功！',
							handle:1
						});
					}else{
						alert(datas.respondMsg)
					}
				}
			});	
		}
	})
}
Wanan.prototype.SatinCai=function(ele,typeid){
	$(ele).on('click',function(){
		var satinid=$(this).attr('satinid');
		var _this=$(this);
		if($(this).attr('isable')==undefined){

			var datas="type=satinCai&typeZanid="+typeid+"&satinid="+satinid;
			$.ajax({
				type:"POST",
				url:"admin/satin.php",
				data:datas,
				success:function(data){
					var datas=eval('('+data+')');
					console.log(datas)
					if(datas.respondCode==0){
						_this.html('<i class="cai-active"></i>'+(parseInt(_this.text())+1)).css('color','#4c8b22').attr('isable','1');
					}else{
						alert(datas.respondMsg)
					}
				}
			});	
		}
	})
};

//获取段子详情
Wanan.prototype.GetOneSatin=function(){
	var _this=this;
	var satinid=_this.geturldata(window.location.href).id;

	
	$.ajax({
		type:"POST",
		url:"admin/satin.php",
		data:"type=GetOneSatin&satinid="+satinid,
		beforeSend: function(data){
			loading();
		},
		success:function(data){
			$('.layer_loading').css('display','none');
			$(".layer_loading").remove();
			var oData=eval('('+data+')');
			if(oData.respondCode==0){
				
				
				$('.satin-line-username').html('<a target="_blank" href="member.html?id='+satinid+'">'+oData.username+'</a><span>'+oData.pushtime+'</span>');
				var picUrl='';
				if(oData.picture!=''){
					var picArr=oData.picture.split(',');
					
					for(var j=0; j<picArr.length; j++){
						picUrl+='<img src="'+picArr[j]+'"/>';
					}
				}
				imgbox='<div class="imgbox">'+picUrl+'</div>';
				$('.satin-line-content').html(oData.content+imgbox);
				$('.satin-line-j').html('<span class="zan-btn" satinid='+oData.id+'><i class="zan"></i>'+oData.zan+'</span>\
								<span class="cai-btn" satinid='+oData.id+'><i class="cai"></i>'+oData.cai+'</span>\
								<span class="shoucang-btn" satinid='+oData.id+'><i class="shoucang"></i>'+oData.shoucang+'</span>');

				_this.SatinZan('.zan-btn');
				_this.SatinCai('.cai-btn');
			}else{
				alert(oData.respondMsg)
			}
			//console.log(oData)
		}
	});	
}

//评论

Wanan.prototype.SatinComment=function(commenttypeid){
	var _this=this;
	var oText=$_('.satin-push-textarea');
	var allNum=140;

	//获取当前用户信息  头像 id
	var userdatas=this.getCookie('userinfo');
	var obj=eval('('+userdatas+')');
	if(obj.pic){
		$('.user-pic img').attr('src',obj.pic);
	}else{
		$('.user-pic img').attr('src',"images/default.jpg");
	}

	_this.oinput(oText,function(){
		$_('#fontnum').innerHTML=allNum-oText.value.length;
		if(parseInt($_('#fontnum').innerHTML)<=0){
			$_('#fontnum').style.color='red';
		}else{
			$_('#fontnum').style.color='#969696';
		}
	});


	//pinglun




	$('.satin-push-btn').on('click',function(){

		if(parseInt($_('#fontnum').innerHTML)<=0){
			return false;
		}

		if(oText.value==''){
			return false;
		}

		/*
			content
			userid	  评论用户id
			targetid  段子id
			time
			typeid    
		*/

		var cuserid=eval('('+_this.userdatas+')');
		if(!cuserid){
			_this.createLayer({
				text:"请登录之后再评论",
				handle:1
			});
			return false;
		}
		//console.log(cuserid);
		var tsrgetid=_this.geturldata(window.location.href).id;
		var datas="type=SatinCommentPush&content="+oText.value+"&userid="+cuserid.id+"&targetid="+tsrgetid+"&commenttypeid="+commenttypeid;
		$.ajax({
			type:"POST",
			url:"admin/satin.php",
			data:datas,
			success:function(str){
				console.log(str);
				var oDatas=eval('('+str+')');
				if(oDatas.respondCode==0){
					
					var oBox=getByClass(document,'all-comment-list')[0];
					oBox.innerHTML='';
					
					_this.GetCommentList(commenttypeid);

					oText.value='';
				}else{

				}

				_this.createLayer({
					text:oDatas.respondMsg,
					handle:1
				});
			}
		})

	});
};


Wanan.prototype.GetArcList=function(ismedias){
	var nowpage=1,
		PageSize=20,
		_this=this;
		//alert(ismedias)
	GetArcList(nowpage,PageSize,ismedias);

	function GetArcList(nowpage,PageSize,ismedias){
		$.ajax({
			type:"POST",
			url:"admin/pushArc.php",
			data:"type=GetArcList&nowpage="+nowpage+"&PageSize="+PageSize+"&ismedias="+ismedias,
			beforeSend: function(data){
				loading();
			},
			success:function(data){
				$('.layer_loading').css('display','none');
				$(".layer_loading").remove();
				var datas=eval('('+data+')');
				console.log(datas)
				$('.all-num').html('('+datas.Total+')');
				if(datas.Total!=0){
					var shtml='';
					for(var i=0; i<datas.result.length; i++){
						var strs=eval('('+datas.result[i]+')');
						if(strs.coverpic==''){
							strs.coverpic="images/default.jpg";
						};
						shtml+='<div class="wanan-line line-style-'+_this.random(1,8)+'">\
					<div class="img-wrap"><img src="'+strs.coverpic+'"></div>\
					<div class="wanan-line-content">\
							<h2 class=""><a target="_blank" href="content.html?id='+strs.id+'">'+strs.title+'</a></h2>\
						<div class="author"><p>来源:<a target="_blank" href="member.html?authorid='+strs.authorid+'">'+strs.zuozhe+'</a></p></div>	  					<div class="desc">'+strs.description+'</div>	  					<div class="info"><p class="fl">发布时间:'+strs.pushtime+'</p><p class="fr">阅读:0 &nbsp; 评论:'+strs.comment+'</p></div></div></div>';
					}
					if(datas.Total>1){
						$('.wananlist-l-content').append(shtml);
						$('.moreList a').attr('nowpage',nowpage)
						if(nowpage*PageSize>=datas.Total){
							$('.moreList').css('display','none');
						}
					}else{
						$('.wananlist-l-content').append(shtml);
						$('.moreList').css('display','none')
					}

					//_this.SatinZan('.comment-zan-btn',commenttypeid);
					//_this.SatinCai('.comment-cai-btn',commenttypeid);
				}
			}
		});	
	}

	$('.moreList a').on('click',function(){
		nowpage++;
		GetArcList(nowpage,PageSize,ismedias);
	});

	$('.wananlist-l-t a').on('click',function(){
		$('.wananlist-l-t a').removeClass('active');
		$(this).addClass('active');

		var hash=$(this)[0].dataset.hash;
		window.location.hash=hash;

		if(hash=="voice"){
			ismedias=0;
		}else{
			ismedias="";
		}
		
		nowpage=1,
		PageSize=20;
		//清空
		$('.wananlist-l-content').html('');
		$('.moreList').css('display','block');
		$('.moreList a').attr('nowpage',1);
		GetArcList(nowpage,PageSize,ismedias);
	});
};
//写段子  写文章公用模块
Wanan.prototype.Write=function(obj,url){
	var _this=this;
	obj.onclick=function(){
		_this.checkeUser(function(){
			window.location.href=url;
		});
	}
}
Wanan.prototype.GetOneArc=function(){
	var _this=this,
		id   =_this.geturldata(window.location.href).id;
	$.ajax({
		type:"POST",
		url:"admin/pushArc.php",
		data:"type=GetOneArc&id="+id,
		success:function(data){
			var datas=eval('('+data+')');
			console.log(datas);
			$('.all-num').html('('+datas.Total+')');
			if(datas.Total!=0){
				if(datas.ismedia==1){
					$('.audio-wrap-box').css('display','none');
				}
				$('.arc-box').html(datas.content);
				_this.AduioOne(datas);
				$('.title h1').html(datas.title);
				$('.c-author').html('<span>'+datas.username+'</span>');
				$('.c-pushtime').html('<span>'+datas.pushtime+'</span>');
				$('.c-comment').html('<a target="_blank" href="#comment">('+datas.comment+')</a>');
			};
		}
	});	
}
Wanan.prototype.GetHotArcList=function(ismedias){
	var nowpage=1,
		PageSize=10,
		_this=this;
	GetHotList();

	function GetHotList(){
		$.ajax({
			type:"POST",
			url:"admin/pushArc.php",
			data:"type=GetHotList",
			success:function(data){
				var datas=eval('('+data+')');
				console.log(datas);
				$('.all-num').html('('+datas.Total+')');
				if(datas.Total!=0){
					var shtml='';
					for(var i=0; i<datas.result.length; i++){
						var strs=eval('('+datas.result[i]+')');
						
						shtml+='<a target="_blank" href="content.html?id='+strs.id+'">'+strs.title+'</a>';
					}
					
					$('.arcList').html(shtml)
				}
			}
		});	
	}

};
Wanan.prototype.reg=function(){

	var oName=$("#name");
	
	var oPass=$("#password");
	var oRepass=$("#repassword");
	var oEmail=$("#email");
	var _this=this;
	$('#regsub').on("click",function(){
		
		if(oName.val()==""){
			oName.parent().find('span').removeClass('success');
			oName.parent().find('span').html('用户名不能为空！').addClass('error');
			return;
		}else if(!/^[0-9a-zA-Z_\\u4e00-\\u9fa5]{2,16}$/.test(oName.val())){
			oName.parent().find('span').removeClass('success');
			oName.parent().find('span').html('请输入2-16位汉字字母数字下划线').addClass('error');
			return;
		}else{
			oName.parent().find('span').html('填写正确！').addClass('success');
		}
		if(oPass.val()==""){
			oPass.parent().find('span').removeClass('success');
			oPass.parent().find('span').html('密码不能为空！').addClass('error');
			return;
		}else if(!/^.{6,12}$/.test(oPass.val())){
			oPass.parent().find('span').removeClass('success');
			oPass.parent().find('span').html('用户名只能是6-12位任何字符！').addClass('error');
			return;
		}else{
			oPass.parent().find('span').html('填写正确！').addClass('success');
		}
		if(oRepass.val()==""){
			oRepass.parent().find('span').html('请确认密码！').addClass('error');
			return;
		}else if(oRepass.val()!=oPass.val()){
			oRepass.parent().find('span').html('两次密码不一致！').addClass('error');
			return;
		}else{
			oRepass.parent().find('span').html('两次密码一致！').addClass('success');
		}

		if(oEmail.val()==""){
			oEmail.parent().find('span').removeClass('success');
			oEmail.parent().find('span').html('邮箱不能为空,非常重要！').addClass('error');
			return;
		}else if(!/^([a-zA-Z0-9_])+\@([a-zA-Z0-9\-]{1,5})\.([a-zA-Z0-9]{2,4})+$/.test(oEmail.val())){
			oEmail.parent().find('span').removeClass('success');
			oEmail.parent().find('span').html('邮箱不正确！').addClass('error');
			return;
		}else{
			oEmail.parent().find('span').html('输入正确！').addClass('success');
		}
		
		$.ajax({
			type:"POST",
			url:"admin/reg.php",
			data:"act=reg&username="+oName.val()+"&password="+oPass.val()+"&email="+oEmail.val(),
			success:function(data){
				var oData=eval('('+data+')');
				if(oData.error==0){
					console.log(oData);
					window.location.href='index.html';
					_this.setCookie('userinfo',data,1);	
				}else if(oData.error==1){
					alert(oData.des)	
				}
			}
		});	
	});	
}
Wanan.prototype.login=function(){
	var oName=$("#name");
	
	var oPass=$("#password");
	var _this=this;
	$('#regsub').on("click",function(){
		
		if(oName.val()==""){
			oName.parent().find('span').removeClass('success');
			oName.parent().find('span').html('用户名不能为空！').addClass('error');
			return;
		}else if(!/^[0-9a-zA-Z_\u4e00-\u9fa5]{2,16}$/.test(oName.val())){
			oName.parent().find('span').removeClass('success');
			oName.parent().find('span').html('请输入2-16位汉字字母数字下划线').addClass('error');
			return;
		}else{
			oName.parent().find('span').html('填写正确！').addClass('success');
		}
		if(oPass.val()==""){
			oPass.parent().find('span').removeClass('success');
			oPass.parent().find('span').html('密码不能为空！').addClass('error');
			return;
		}else if(!/^.{6,12}$/.test(oPass.val())){
			oPass.parent().find('span').removeClass('success');
			oPass.parent().find('span').html('用户名只能是6-12位任何字符！').addClass('error');
			return;
		}else{
			oPass.parent().find('span').html('填写正确！').addClass('success');
		}
		

		$.ajax({
			type:"POST",
			url:"admin/reg.php",
			data:"act=login&username="+oName.val()+"&password="+oPass.val(),
			success:function(data){
				var oData=eval('('+data+')');
				if(oData.error==0){
					history.go(-1);
					_this.setCookie('userinfo',data,1);	
				}else if(oData.error==1){
					alert(oData.des)	
				}
			}
		});	
	});	
}

Wanan.prototype.tableSwitch=function(){
	var oBtn=$_('.push-select-wrap').getElementsByTagName('a');
	var oC=$_('.push-bar');
	var _this=this;

	for(var i=0; i<oBtn.length; i++){
		oBtn[i].onclick=function(){
			var hash=this.dataset.hash;
			window.location.hash=hash;
			$(oBtn).removeClass('active');
			$(this).addClass('active');
			for(var j=0; j<oC.length; j++){				
				oC[j].style.display="none";
				if(hash==oC[j].dataset.hash){
					oC[j].style.display="block";
				}
			}
			
		}
	}

	var defaultHash=window.location.hash.substring(1)||"article";

	for(var j=0; j<oC.length; j++){			
		
		
		oC[j].style.display="none";

		if(defaultHash==oC[j].dataset.hash){
			$(oBtn).eq(j).addClass('active');
			oC[j].style.display="block";
		}else{
			$(oBtn).eq(j).removeClass('active');
		}
	}
}
//发布文章

Wanan.prototype.pushArc=function(){

	var _this=this,
		$articleFmFileBtn   =$('.article-fm-file-btn'),
		$articleFmFile      =$('#article-fm-file'),
		$articleFmPic       =$('.article-fm-pic'),
		$articleFmFileMark  =$('.article-fm-file-mark');
	var $audiouploadpic     =$('#audiouploadpic'),
		$audiouploadmark	=$('.audiouploadmark'),
		$uploadAudioPicBtn  =$('.upload-audio-pic-btn'),
		$fileAudioUploadPic =$('.file-audio-upload-pic');
	_this.uploadImg($articleFmFileBtn,$articleFmFile,$articleFmPic,$articleFmFileMark);
	_this.uploadImg($uploadAudioPicBtn,$audiouploadpic,$fileAudioUploadPic,$audiouploadmark);


	var $uploadbannerbtn =$('.uploadbannerbtn'),
		$isBanner        =$('#isBanner'),
		$bannerShowWrap  =$('.banner-show-wrap'),
		$bannerMarkWrap  =$('.banner-mark-wrap');
	_this.uploadImg($uploadbannerbtn,$isBanner,$bannerShowWrap,$bannerMarkWrap);
	$('#isrecommend').on('click',function(){
		if($('#isrecommend').is(':checked')){
			$('.isrecommendbanner').removeClass('hide').addClass('show');
		}else{
			$('.isrecommendbanner').removeClass('show').addClass('hide');
		}
	});

	//我有音频

	$('#isaudioupload').on('click',function(){
		if($('#isaudioupload').is(':checked')){
			$('.haveaudio').removeClass('hide').addClass('show');
		}else{
			$('.haveaudio').removeClass('show').addClass('hide');
		}
	});
	//上传音频
	$('.audiouploadbtn').on('click',function(){
		$(this).html('上传中...');
	    var oFile=$('#audioupload').get(0).files[0];
	    console.log(oFile);

	    uploadeAudio(oFile,function(d){

	    	console.log(d)
		    if(d.code==1){
		        _this.createLayer({
					text:d.msg,
					handle:1
				});
		        return false;
		    }else  if(d.code==3){
		        _this.createLayer({
					text:d.msg,
					handle:1
				});
		        return false;
		    }else{
		       //sBox.html('<img src="server/'+d.url+'" />');
		       _this.createLayer({
					text:d.msg,
					handle:1
				});
		       $('.audiouploadbtn').html('上传').attr('audiosrc','server/'+d.url);
		    };
	    });
	});

	$('#audioupload').on('change',function(){
	    $('.audiouploadmarktip').html($(this).val());
	});


	$('.arc-btn').on('click',function(){

		//alert(eval('('+_this.userdatas+')'))
		var $title=$('.arctitle').val(),
			$desc=$('.desc').val(),
			$articleFmPic=$('.article-fm-pic img'),
			$bannerShowWrap=$('.banner-show-wrap img'),
			$audio=$('.audiouploadbtn'),
			$fileAudioUploadPic=$('.file-audio-upload-pic img'),
			content=encodeURIComponent(UE.getEditor('container').getContent()),
			fmt='',
			bannerpic='',
			audiopic='',
			audiosource='',
			authorid=eval('('+_this.userdatas+')').id,
			ismedia=1,
			isrecommend=1,
			isexamine=0;
			//alert($articleFmPic.attr('src'));

			if($title=="" || content==""){
				_this.createLayer({
					text:"标题和内容为必填项",
					handle:1
				});
				return false;
			}


			if($desc==''){
				$desc=UE.getEditor('container').getContentTxt().substring(0,140);
			}

			//alert($desc+'......////....'+content);

			//return false;
			if($articleFmPic.attr('src')!=undefined){
				fmt=$articleFmPic.attr('src');
			}

			

			//如果勾选了banner
			if($('#isrecommend').is(':checked')){
				if($bannerShowWrap.attr('src')!=undefined){
					bannerpic=$bannerShowWrap.attr('src');
					isrecommend=0; //0 表示推荐
				}else{
					_this.createLayer({
						text:"请上传banner图片",
						handle:1
					});

					return false;
				}
			}

			//如果选择了
			if($('#isaudioupload').is(':checked')){
				audiosource=$audio.attr('audiosrc');
				audiopic=$fileAudioUploadPic.attr('src');
				if(audiosource==undefined){
					_this.createLayer({
						text:"请上传音频文件",
						handle:1
					});
					return false;
				}

				if(audiopic==undefined){
					_this.createLayer({
						text:"请上传音频文件封面图",
						handle:1
					});
					return false;
				}
				ismedia=0; //有音频文件
				isexamine=1; //需要审核之后在发表
			}

		var datas="type=pushArcticle&title="+$title+"&desc="+$desc+"&banner="+bannerpic+"&content="+content+"&coverpic="+fmt+"&authorid="+authorid+"&media="+audiosource+"&mediacoverpic="+audiopic+"&isrecommend="+isrecommend+"&ismedia="+ismedia+"&isexamine="+isexamine;
		$.ajax({
			type:"POST",
			url:"admin/pushArc.php",
			data:datas,
			success:function(data){

				console.log(data)
				var oData=eval('('+data+')');
				if(oData.respondCode==0){
					_this.createLayer({
						text:oData.respondMsg,
						handle:1
					});
					history.go(0);
				}else{
					_this.createLayer({
						text:oData.respondMsg,
						handle:1
					});
				}
			}
		});	
	})
};



Wanan.prototype.uploadImg=function(cBtn,tFile,sBox,sMark){
	var _this=this;
	cBtn.on('click',function(){
		$(this).html('上传中...');
	    var oFile=tFile.get(0).files[0];
	    console.log(oFile);

	    uploades(oFile,function(d){
		    if(d.code==1){
		        _this.createLayer({
					text:d.msg,
					handle:1
				});
		        return false;
		    }else if(d.code==2){
		    	_this.createLayer({
					text:d.msg,
					handle:1
				});
		        return false;
		    }else if(d.code==3){
		    	_this.createLayer({
					text:d.msg,
					handle:1
				});
		        return false;
		    }else{
		    	_this.createLayer({
					text:d.msg,
					handle:1
				});
		       sBox.html('<img src="server/'+d.url+'" />');
		       cBtn.html('上传');
		    };
	    });
	});
	tFile.on('change',function(){
	    sMark.html($(this).val());
	});
}


//首页晚安理想版块

Wanan.prototype.wananIndex=function(PageSize,nowpage,ismedia,cbfn){
	//
	$.ajax({
		type:"POST",
		url:"admin/pushArc.php",
		data:"type=GetArcList&PageSize="+PageSize+"&nowpage="+nowpage+"&ismedias="+ismedia,
		success:function(data){
			cbfn&&cbfn(data)
		}
	});	
};

Wanan.prototype.getBannerList=function(){
	$.ajax({
		type:"POST",
		url:"admin/pushArc.php",
		data:"type=GetBannerList",
		success:function(data){
			//console.log(data);//cbfn&&cbfn(data)
		}
	});
}

Wanan.prototype.oinput=function(obj,fn){

	if(document.getElementsByClassName){
		if(window.navigator.userAgent.indexOf('MSIE 9')!=-1){
			obj.onfocus=function(){
				this.timer=setInterval(function(){
					fn && fn()//document.title=obj.value.length;
				},40)
			};
			obj.onblur=function(){
				clearInterval(this.timer);
			}
		}else{
			obj.oninput=function(){
				fn&&fn();
			};
		}
	}else{
		obj.onpropertychange=function(){
		    fn&&fn();//document.title=obj.value.length;
		};
	};
};

Wanan.prototype.setCookie=function(name, value, iDay){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	
	document.cookie=name+'='+value+';expires='+oDate;
}
Wanan.prototype.getCookie=function (name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	}
}
Wanan.prototype.removeCookie=function (name){
	setCookie(name, '1', -1);
}

Wanan.prototype.random=function(n,m){
	return parseInt(Math.random()*(m - n +1)+n);
}
Wanan.prototype.geturldata=function (url){
	if(url.indexOf('?')!=-1){
		var urldata=url.split('?')[1].split('&');
		var result=[];
		var c=[];
		for(var i=0; i<urldata.length; i++){
			a=urldata[i].split('=');
			c+=result.concat('"'+urldata[i]+'",')
		};
		var laststr=c.replace(/=/g,'":"');//;
		var aaa='{'+laststr.substring(0,laststr.lastIndexOf(','))+'}';
		return JSON.parse(aaa);
	}
};

Wanan.prototype.getPos=function(obj){
	var l=0,t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return{
		left:l,
		top:t
	}
}

//拖拽
Wanan.prototype.drags=function(ele,option){
	
	var obj=document.getElementById(ele),
		_this=this;
	obj.onmousedown=function(ev){
		
		
		var oEvent=ev||event;
		
		var disX=oEvent.clientX-this.offsetLeft;
		var disY=oEvent.clientY-this.offsetTop;

		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var t=oEvent.clientY-disY;
			var l=oEvent.clientX-disX;
			
			obj.style.left=l+150+'px';
			obj.style.top=t+150+'px';

			return false;
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		}

		if(option){
			option.cancelBubble1.onmousedown=function(ev){
				var oEvent=ev||event;
				oEvent.cancelBubble=true;	
			};
		}

	};

}

Wanan.prototype.createLayer=function(option,fn){

	var oLayer=document.createElement('div');
		oLayer.id='drag';
		oLayer.className='layer';
		oLayer.innerHTML='<div class="layer-wrap">\
			<h2>温馨提示</h2>\
			<div class="layer-wrap-box"><p></p></div>\
			<div class="layer-btn-wrap" id="layer-btn">\
				<a target="_blank" href="javascript:;">确定</a>\
				<a target="_blank" href="javascript:;" class="cancel">取消</a>\
			</div></div>';
		//console.log(oLayer.offsetTop+'-'+document.body.scrollTop)
		var h=window.screen.height;
		var oT=document.body.scrollTop||document.documentElement.scrollTop;
		var t=(h/2-180);
		oLayer.style.top=t+oT+'px';
	document.body.appendChild(oLayer);

	var oText=$('.layer-wrap-box p');
	var oHandel=$('.layer-btn-wrap');
	option.text=option.text||'请填写参数';
	oText.html(option.text);

	option.handle=option.handle||'';
	if(option.handle==1){
		oHandel.addClass('hide');
	};

	setTimeout(function(){
		document.body.removeChild(oLayer);
		fn&&fn();
	},1500);

	


	var c1=document.getElementById('layer-btn');
	oSatin.drags('drag',{'cancelBubble1':c1});

};


//换行转义



//scroll

Wanan.prototype.roll=function(oBox,oBarBox,index){
	var oSc=oBox[index].children[0];
	var oBar=oBarBox[index].children[0];
	// 初始化滚动条	
	var speed=30;	
	//alert(oSc.offsetHeight+'-'+oBox[index].offsetHeight)
	if(oSc.offsetHeight<=oBox[index].offsetHeight){
		oBarBox[index].style.display="none";
		return false;
	}else{
		oBarBox[index].style.display="block";
	};

	var b=true;
	if(window.navigator.userAgent.indexOf('Firefox')!=-1) // 判断浏览器  分别加事件
	{	
		oSc.addEventListener('DOMMouseScroll',wheelFn,false); // DOMMouseScroll
	}
	else
	{
		oSc.onmousewheel=wheelFn; 
	};
	
	function wheelFn(ev)
	{
		var oEvent=ev||event; 
		var down=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0; // 判断滚动的方向 火狐和chrome不一致
		//true 向下滚
		if(down){
			var t=oBar.offsetTop+speed;  //初始化滚动的值
			Scroll(t);
			
		}else{
			var t=oBar.offsetTop-speed;
			Scroll(t);
		};
		function Scroll(t){
			if(t<0){
				t=0;b=false;
			}else if(t>oBarBox[index].offsetHeight-oBar.offsetHeight) // 如果运动了的 值大于父级-子集的差值 那么就运动完了
			{
				t=oBarBox[index].offsetHeight-oBar.offsetHeight;
				b=false;
			}else{
				b=true;
			}
			startMove(oBar,{top:t});//小条的运动
			
			
			var scale=-(t/(oBar.offsetHeight-oBarBox[index].offsetHeight));	 //取百分比
			startMove(oSc,{top:-(oSc.offsetHeight-oBox[index].offsetHeight)*scale});
		};
		// 阻止默认事件
		if(b){
			return false;
			oEvent&&oEvent.preventDefault();
		}else{
			return true;
			if(oEvent.preventDefault){
				oEvent.preventDefault=false;
			}
		}
		
	};
}

function getEle(str, aParent){
	var arr=str.match(/\S+/g);
	var aParent=aParent||[document];
	var aChild=[];
	for(var i=0;i<arr.length;i++)
	{
		aChild=_getByStr(aParent, arr[i]);
		aParent=aChild;
	};
	return aChild;
};

function getByClass(oParent, sClass){
	
	if(document.addEventListener)
	{
		return oParent.getElementsByClassName(sClass);
	};
	
	var aEle=oParent.getElementsByTagName('*');
	var re=new RegExp('\\b'+sClass+'\\b');
	var result=[];
	
	for(var i=0;i<aEle.length;i++)
	{
		if(re.test(aEle[i].className))
		{
			result.push(aEle[i]);
		}
	};

	return result;
};
//运动
function getStyle(obj,name){ return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name]}

function getCur(obj,name)
{

	
	if(name=='opacity')
	{
		var child=Math.round(parseFloat(getStyle(obj,name))*100)
	}else
	{
		var child=parseInt(getStyle(obj,name));
	}
	
	if(isNaN(child))
	{
		switch(name)
		{
			case 'top':
			return obj.offsetTop;
			case 'left':
			return obj.offsetLeft;
			case 'width':
			return obj.offsetWidth;
			case 'height':
			return obj.offsetHeight;
		}
	}
	return child;
}
function _getByStr(aParent, str)
{
	var aChild=[];	//结果
	
	for(var i=0;i<aParent.length;i++)
	{
		switch(str.charAt(0))
		{
			case '#':
				var obj=document.getElementById(str.substring(1));
				aChild.push(obj);
				break;
			case '.':
				var arr=getByClass(aParent[i], str.substring(1));
				
				for(var j=0;j<arr.length;j++)
				{
					aChild.push(arr[j]);
				}
				break;
			default:
				//li.box
				if(/^\w+\.\w+$/.test(str))
				{
					var aStr=str.split('.');
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					var re=new RegExp('\\b'+aStr[1]+'\\b');
					
					for(var j=0;j<arr.length;j++)
					{
						if(re.test(arr[j].className))
						{
							aChild.push(arr[j]);
						};
					};
				}
				//li#li1
				else if(/^\w+#\w+$/.test(str))
				{
					var aStr=str.split('#');
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].id==aStr[1])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//input[type=bbxxx]
				else if(/^\w+\[\w+=.+\]$/.test(str))
				{
					var aStr=str.split(/\[|=|\]/g);
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					for(var j=0;j<arr.length;j++)
					{
						if(arr[j].getAttribute(aStr[1])==aStr[2])
						{
							aChild.push(arr[j]);
						}
					}
				}
				//input:first	li:eq(12)
				else if(/^\w+:[a-z]+(\(.+\))?$/.test(str))
				{
					var aStr=str.split(/:|\(|\)/g);
					var arr=aParent[i].getElementsByTagName(aStr[0]);
					switch(aStr[1])
					{
						case 'eq':
							var n=parseInt(aStr[2]);
							
							aChild.push(arr[n]);
							break;
						case 'first':
							aChild.push(arr[0]);
							break;
						case 'odd':
							for(var j=1;j<arr.length;j+=2)
							{
								aChild.push(arr[j]);
							}
							break;
					}
				}
				
				//li
				else
				{
					var arr=aParent[i].getElementsByTagName(str);
					
					for(var j=0;j<arr.length;j++)
					{
						aChild.push(arr[j]);
					}
				}
				break;
		}
	};
	return aChild;
};

function $_(arg)
{
	var elements=[],bSelect;	
	switch(typeof arg)
	{
		case 'function':	
			$_.tool.ready(arg);
			break;
		case 'string':	 
			elements=$_.browser.ie678?getEle(arg):document.querySelectorAll(arg);
			break;
		case 'object':		
			if(arg instanceof Array)
			{
				elements=arg;
			}
			else
			{
				elements.push(arg);
			};
			break;
	};
	if(elements.length==1)
	{
		return elements[0];
		if(bSelect==window.frameElement)$_.tool.ask();
	};
	return elements;
};
function startMove(obj,json,options)
{
	options =options||{};
	options.time=options.time ||700;
	options.type=options.type ||'buffer';	
	var timer={
		veryslow:5000,
		slow:3000,
		normal:2000,
		fast:1000,
		veryfast:500
		}
	
	if(typeof options.time=='string')
	{
		if(timer[options.time])
		{
			options.time=timer[options.time];
		}else
		{
			options.time=1000;
		}
	}
	
	var first={}
	var count=parseInt(options.time/30);
	var dis={};
	
	for(var i in json)
	{
		first[i]=getCur(obj,i);
		dis[i]=json[i]-first[i];
	}
	
	clearInterval(obj.timer);
	var n=0;
	window.speedX=0;
	window.elaType=0;
	obj.timer=setInterval(function(){
			n++
			var wade;
			
			for(var i in json)
			{
				switch (options.type)
				{
					case  'linear':
					wade=first[i]+dis[i]*n/count;
					break;
					case 'buffer':
					var a=1-n/count;
					wade=first[i]+dis[i]*(1-a*a*a);
					break;
					case 'StoF':
					var a=n/count;
					wade=first[i]+dis[i]*(a*a*a);
					break;
					case 'TX':
					speedX+=(json[i]-elaType)/5;
					speedX*=0.7;
					elaType+=speedX;
					wade=Math.round(elaType);
					break;
				}
				
				if(i=='opacity')
				{
					obj.style.opacity=wade/100;
					obj.style.filter='alpha(opacity='+wade*100+')';
				}else
				{
					obj.style[i]=wade+'px';
				}
			}
			if(options.type=='TX')
			{
				if(Math.round(elaType)==json[i] && Math.round(speedX)==0)
				{
					clearInterval(obj.timer)
					options.fn && options.fn();
				}
			}else
			{
				if(count==n)
				{
					clearInterval(obj.timer)
					options.fn && options.fn();
				}
			}
		},30)
};


Wanan.prototype.IsPC=function(url){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    //alert()
    if(!flag)window.location.href=url;
}

//上传
function uploades(obj,fn){
	var xhr=new XMLHttpRequest();
	//console.log(oFile.files[0]);
	xhr.onload=function(){
		console.log(this.responseText)
		var d = JSON.parse(this.responseText);
		// console.log(d)
		fn&&fn(d);
	}
	xhr.open('post','server/post_file.php',true);
	xhr.setRequestHeader('X-Request-With', 'XMLHttpRequest');
	var oFormData=new FormData();
	oFormData.append('file',obj);
	xhr.send(oFormData);
}
//上传
function uploadeAudio(obj,fn){
	var xhr=new XMLHttpRequest();
	//console.log(oFile.files[0]);
	xhr.onload=function(){
		console.log(this.responseText)
		var d = JSON.parse(this.responseText);
		// console.log(d)
		fn&&fn(d);
	}
	xhr.open('post','server/post_file_2.php',true);
	xhr.setRequestHeader('X-Request-With', 'XMLHttpRequest');
	var oFormData=new FormData();
	oFormData.append('file',obj);
	xhr.send(oFormData);
}



//////////// 浏览器检测相关
$_.browser={};
$_.browser.userAgent=window.navigator.userAgent.toLowerCase();
$_.browser.ie=!!document.all;
$_.browser.ie6=!window.XMLHttpRequest;
$_.browser.ie678=!document.getElementsByClassName;
$_.browser.ie9=$_.browser.userAgent.indexOf('msie 9')!=-1;
$_.browser.ie6789=$_.browser.ie678||$_.browser.ie9;
$_.browser.ie10=$_.browser.userAgent.indexOf('msie 10')!=-1;
$_.browser.ie11=$_.browser.userAgent.indexOf('trident')!=-1&&$_.browser.userAgent.indexOf('rv:11')!=-1;
$_.browser.chrome=$_.browser.userAgent.indexOf('chrome')!=-1;
$_.browser.ff=$_.browser.userAgent.indexOf('firefox')!=-1;


function loading(){
	
	var oLoayer=document.createElement('div');
	oLoayer.className='layer_loading';
	
	oLoayer.innerHTML='<div id="load"><div>加</div><div>载</div><div>中</div><div>,</div><div>请</div><div>稍</div><div>后</div></div>';
	document.body.appendChild(oLoayer);
};
