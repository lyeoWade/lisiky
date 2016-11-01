//依赖tool.js

function SetMap(options){
	this.loadCss(); //初始化样式
	options=options||{};
	var _this=this;

	options.obj=options.obj||'MapWrapBox';

	this.oBox=options.obj;//document.getElementById('box');
	
	this.loadImage(options.ImageUrl,function(){
		_this.createMap(options.obj,this.src);
		_this.oImg=document.getElementById('img');
		_this.oBlowUp=document.getElementById('blowUp');
		_this.oNarrow=document.getElementById('narrow');
		_this.init();
		_this.dragMap();
		_this.BlowUp();
		_this.Narrow();
		_this.contextmeunHandle();
	});

	this.FullBg();
}


SetMap.prototype.loadImage=function(url, callback) { 
	var img = new Image(); //创建一个Image对象，实现图片的预下载 
	img.src = url; 
	if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数 
		callback.call(img); 
		return; // 直接返回，不用再处理onload事件 
	} 
	img.onload = function () { //图片下载完毕时异步调用callback函数。 
		callback.call(img);//将回调函数的this替换为Image对象 
	}; 
}; 

SetMap.prototype.init=function (){
	//图片小于最小值时
	if(this.oImg.offsetWidth<this.oBox.offsetWidth){
		this.oImg.style.width=this.oBox.offsetWidth+10+'px';
	}
	
	//初始化图片的位置
	this.oImg.style.width=this.oImg.offsetWidth+'px';
	this.oImg.style.height=this.oImg.offsetHeight+'px';
	this.oImg.style.left=-(this.oImg.offsetWidth-this.oBox.offsetWidth)/2+'px';
	this.oImg.style.top=-(this.oImg.offsetHeight-this.oBox.offsetHeight)/2+'px';
}
SetMap.prototype.dragMap=function(){
	var disX=0;
	var disY=0;
	var _this=this;
	this.oImg.onmousedown=function(ev){
		var oEvent=ev||event;
		disX=oEvent.clientX-_this.oImg.offsetLeft
		disY=oEvent.clientY-_this.oImg.offsetTop;
		
		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var L=oEvent.clientX-disX;
			var T=oEvent.clientY-disY;

			if(L>=0){
				L=0;
			}else if(L<=-(Math.abs(_this.oImg.offsetWidth)-_this.oBox.offsetWidth)){
				L=-(Math.abs(_this.oImg.offsetWidth)-_this.oBox.offsetWidth);
			}

			if(T>=0){
				T=0;
			}else if(T<=-(Math.abs(_this.oImg.offsetHeight)-_this.oBox.offsetHeight)){
				T=-(Math.abs(_this.oImg.offsetHeight)-_this.oBox.offsetHeight);
			}
			_this.oImg.style.left=L+'px';
			_this.oImg.style.top=T+'px';
			return false;
		}
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
		}
	}
}
SetMap.prototype.BlowUp=function(){
	var _this=this;
	//初始值
	var oImgW=_this.oImg.offsetWidth;
	var oImgH=_this.oImg.offsetHeight;
	this.oBlowUp.onclick=function(){
		//每一次增加的值
		var narrowValueWidth=_this.oImg.offsetWidth*0.1;
		var narrowValueHeight=_this.oImg.offsetHeight*0.1;
		//最大值2倍
		if((_this.oImg.offsetHeight-_this.oBox.offsetHeight)>=oImgH*2){
			return false;
		}

		if((_this.oImg.offsetWidth-_this.oBox.offsetWidth)>=oImgW*2){
			return false;
		}

		var L=_this.oImg.offsetLeft;
		var T=_this.oImg.offsetTop;

		var scaleL=L/(_this.oImg.offsetWidth-_this.oBox.offsetWidth);
		var scaleT=T/(_this.oImg.offsetHeight-_this.oBox.offsetHeight);
		
		_this.oImg.style.width=_this.oImg.offsetWidth+narrowValueWidth+'px';
		_this.oImg.style.height=_this.oImg.offsetHeight+narrowValueHeight+'px';
		_this.oImg.style.left=_this.oImg.offsetLeft+narrowValueWidth*scaleL+'px';
		_this.oImg.style.top=_this.oImg.offsetTop+narrowValueHeight*scaleT+'px';
		//_this.init();

	}
}
SetMap.prototype.Narrow=function(){
	var _this=this;
	this.oNarrow.onclick=function(){
		//alert(213)
		//每一次缩小的值
		var narrowValueWidth=_this.oImg.offsetWidth*0.1;
		var narrowValueHeight=_this.oImg.offsetHeight*0.1;
		//判断最小值
		if((_this.oImg.offsetHeight-_this.oBox.offsetHeight)<=narrowValueHeight){
			return false;
		}
		if(_this.oImg.offsetTop>=-narrowValueHeight){
			return false;
		}
		if(_this.oImg.offsetLeft>=-narrowValueWidth){
			return false;
		}
		if((_this.oImg.offsetWidth-_this.oBox.offsetWidth)<=narrowValueWidth){
			return false;
		}

		var L=_this.oImg.offsetLeft;
		var T=_this.oImg.offsetTop;

		var scaleL=L/(_this.oImg.offsetWidth-_this.oBox.offsetWidth);
		var scaleT=T/(_this.oImg.offsetHeight-_this.oBox.offsetHeight);
		
		console.log(scaleL);
		
		_this.oImg.style.height=_this.oImg.offsetHeight-narrowValueHeight+'px';
		_this.oImg.style.width=_this.oImg.offsetWidth-narrowValueWidth+'px';
		
		_this.oImg.style.left=_this.oImg.offsetLeft-narrowValueWidth*scaleL+'px';
		_this.oImg.style.top=_this.oImg.offsetTop-narrowValueHeight*scaleT+'px';
	}
}
//右键菜单
SetMap.prototype.contextmeunHandle=function(){

	this.oImg.oncontextmenu=function(ev){
		var oEvent=ev||event;
		createList(oEvent);
		return false;
	}
	document.body.onclick=function(){
		var oL=document.getElementById('meunList');
		if(oL){
			document.body.removeChild(oL);
		}
	};

	//创建列表
	function createList(oEvent){
		var oL=document.getElementById('meunList');
		if(oL){
			document.body.removeChild(oL);
		}
		var oDiv=document.createElement('div');
		oDiv.id="meunList";
		document.body.appendChild(oDiv);
		oDiv.style.left=oEvent.clientX+'px';
		oDiv.style.top=oEvent.clientY+'px';

		oDiv.innerHTML+='<a href="">添加坐标</a><a href="">添加坐标</a><a href="">添加坐标</a>';
	}
}

// SetMap.prototype.createMapWrap=function(obj){
	
// }

SetMap.prototype.createMap=function(obj,src){
	obj.innerHTML+='<img id="img" src="'+src+'" />\
		<div class="zoomwrap">\
		<a href="javascript:;" id="blowUp">+</a>\
		<a href="javascript:;" id="narrow">-</a></div>';
}
SetMap.prototype.loadCss=function(){
	var oLink=document.createElement('link');
	oLink.href="mapcss.css";
	oLink.rel="stylesheet";
	oLink.type="text/css";
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oLink);
}
SetMap.prototype.FullBg=function(){
	var oBg=document.createElement('div');
	oBg.id="FullBg_bg";
	document.body.appendChild(oBg);
}
function getPos(obj){
	var l=0,t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {
		left:l,
		top:t
	}
};