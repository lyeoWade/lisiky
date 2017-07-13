
/*
主要标签
<audio src="URL" > 你的浏览器不支持HTML5播放器 </audio>
 
方法
audio.play()            //播放当前歌曲
audio.pause()           //暂停当前歌曲
audio.load()            //重新加载歌曲，更改src后用于重新加载歌曲
 
属性
audio.duration          //获取歌曲总时间，用于显示播放时间和制作进度条
audio.currentTime       //获取和设置歌曲时间，用于显示当前播放时间和点击进度条改变播放时间
auido.buffered.length   //获取已缓冲区域的个数，如果还未全部缓冲完成，当用户跳跃播放时，会产生多个缓冲区域
audio.buffered.end()    //获取已缓冲的时间，用于制作缓冲进度条
audio.volume            //设置音量
auido.muted             //设置和判断是否静音
 
事件
timeupdate              //当前歌曲播放时间变化时，播放时间和播放进度条变化得靠这个事件
ended                   //当前歌曲播放结束时
canplay                 //当前歌曲可以播放时
*/
window.onload=function(){
	var a=new Audio();


};

function Audio(){
	this.oAudio=document.getElementById('audio');
	this.oPaus=document.getElementById('paus');
	//初始化一个歌词
	this.txt = data[0].lrc;
	//console.log(data);
	//title
	this.timer=null;
	this.oTitles=document.getElementsByClassName('titles')[0];
	this.tList=$_('.list-warp');
	//时间 进度条
	this.oStartTime=document.getElementsByClassName('startTime')[0];
	this.durationTime=document.getElementsByClassName('durationTime')[0];
	this.oLinePro=document.getElementsByClassName('line-pro')[0];
	this.oLineProgress=document.getElementsByClassName('line-progress')[0];
	this.oDot=document.getElementsByClassName('dots')[0];
	
	
	//loop
	this.Loop=document.getElementsByClassName('loop')[0];
	this.LoopWarp=document.getElementsByClassName('loop-list')[0];
	this.LoopList=this.LoopWarp.getElementsByTagName('span');
	this.disX=0;
	this.iNow=0;
	this.nexpreDis=0;
	//歌词tag
	this.lrcWarp=$_('.lrc-warp');
	
	// 设置时间
	this.oVirtual=document.getElementById('Virtual');
	
	this.templeteList(data);

	this.musicLen=data.length;

	this.oList=document.getElementsByClassName('list-warp')[0];
	this.aLi=this.oList.getElementsByTagName('li');
	this.len=this.aLi.length;

	this.init();
	this.oPausAndPlay();
	
	this.dbPlay();
	this.DragProgress();
	this.nextMusic();
	this.prevMusic();
	this.loop();
	
	this.volume();


};
Audio.prototype.init=function(){
	var _this=this;

	for(var i=0; i<_this.len; i++){
		
		(function(index){
			var oRes=_this.aLi[index].getAttribute('res');
			var oAs=document.createElement('audio');

			oAs.src=data[i].src;
			_this.oVirtual.appendChild(oAs);
			oAs.addEventListener('canplay',function(){
				oAs.setAttribute('time',oAs.duration);
				// 初始化列表
				var oAS=_this.oVirtual.getElementsByTagName('audio');
				var oA=_this.aLi[index].getElementsByTagName('a')[0];
				var oTime=_this.aLi[index].getElementsByClassName('times')[0];
				var oT=oAS[index].getAttribute('time');
				oA.innerHTML=data[index].singInfo;
				oTime.innerHTML=_this.curentTimes(oT);
			},false);
		})(i)
	};
}
Audio.prototype.oPausAndPlay=function(){
	var _this=this;
	this.oPaus.onclick=function(){
		if(_this.oAudio.paused){
			_this.oAudio.play();
			_this.oPaus.className='paused';
		}else{
			_this.oAudio.pause();
			_this.oPaus.className='end';
		}	
	};
}
Audio.prototype.dbPlay=function(){
	var _this=this;
	for(var i=0; i<_this.len; i++){
		(function(index){
			_this.aLi[index].ondblclick=function(){
				_this.iNow=index;
				_this.playCol(_this.iNow);
				//document.title=_this.iNow;
			}	
		})(i)	
	};
}

Audio.prototype.nextMusic=function(){
	var _this=this;
	var oNext=$_('.next');
	oNext.onclick=function(){
		_this.iNow++;
		if(_this.iNow>=_this.musicLen){
			_this.iNow=_this.musicLen-1;
		}
		_this.playCol(_this.iNow);
	}	
}
Audio.prototype.prevMusic=function(){
	var _this=this;
	var oPrev=$_('.prev');
	oPrev.onclick=function(){
		_this.iNow--;
		if(_this.iNow<=0)_this.iNow=0;
		_this.playCol(_this.iNow);
	}	
}
//播放控制体
Audio.prototype.playCol=function(iNow){
	//alert(iNow)
	var _this=this;
	//console.log(_this.iNow)
	
	var oRes=_this.aLi[iNow].getAttribute('res');
	_this.aLi[iNow].b=true;
	_this.oAudio.src=data[iNow].src;
	_this.oTitles.innerHTML=oRes;
	_this.txt=data[iNow].lrc;

	//console.log(_this.txt)

	_this.loadlrc();//同步歌词
	//当前歌曲播放的时间
	_this.timer = setInterval(function(){
		_this.nowTime(_this.oAudio)	
	},1000);
	
	
	_this.oAudio.addEventListener('canplay',function(){
		_this.durationTime.innerHTML=_this.curentTimes(_this.oAudio.duration)
		if(_this.aLi[iNow].b){
			for(var j=0; j<_this.len; j++){
				removeClass(_this.aLi[j],'active');
			}
			addClass(_this.aLi[iNow],'active');
			
			if(_this.oAudio.paused){
				_this.oAudio.play();
				_this.oPaus.className='paused';
			}
		}

		_this.createAnalysers();
	},false);
}

//调整播放进度
Audio.prototype.DragProgress=function(){
	var _this=this;
	drag(_this.oLinePro,_this.oDot,function(scals){
		_this.oAudio.currentTime=scals * _this.oAudio.duration;
		_this.nowTime(_this.oAudio);
	},1.5);
}

//循环控制
Audio.prototype.loop=function(){
	var _this=this;
	/*
		循环 每次播放结束之后都要判断一次循环的模式			
		选择之后不管	
	*/
	//this.Loop


	var b=true;
	bind(_this.Loop, 'click', function(ev){
		ev.cancelBubble=true;
		 if(b){
			_this.LoopWarp.style.display='block';	 
			b=false;
		 }else{
			_this.LoopWarp.style.display='none';	
			 b=true;
		 }
	});
	bind(document.body, 'click', function(){
		_this.LoopWarp.style.display='none';	
		b=true;
	});
	
	for(var i=0; i<this.LoopList.length; i++){
		(function(index){
			bind(_this.LoopList[index],'click',function(){
				for(var i=0; i<_this.LoopList.length; i++){
					_this.LoopList[i].className='';
				}
				this.className='active';
			});
		})(i);
	};
	endedPlay();
	
	//播放结束之后判断循环模式
	
	function endedPlay(){
		
		_this.oAudio.addEventListener('ended',function(){
			
			_this.oAudio.pause();
			_this.oPaus.className='end';
			
			for(var i=0; i<_this.LoopList.length; i++){
				(function(index){
					if(_this.LoopList[index].className=='active'){
						var oTypePlay=_this.LoopList[index].getAttribute('loopType');
						TypePlay(oTypePlay);
					};
					
				})(i)
			};
			
		},false);
	};
	function TypePlay(oTypePlay){
		switch(oTypePlay){
			case 'SinglePlay':
				//单曲播放
				return false;
			break;
			case 'SingleCycle':
				//单曲循环
				loops();
			break;
			case 'SequentialPlay':
				//顺序播放
				SequentialPlay();
			break;
			case 'ListLoop':
				//列表循环
				ListLoop();
			break;
			case 'RandomPlay':
				//随机播放
				RandomPlay();
			break;	
			case 'AutomaticSwitchingList':
				//自动切换列表
			break;	
			default:
				alert('错了');
		};	
	}
	//列表循环
	function ListLoop(){
		
		_this.iNow++;
	//	console.log(_this.iNow)
		if(_this.iNow>=_this.len){
			_this.iNow=0;	
		}
		_this.playCol(_this.iNow);
	};
	
	//单曲循环
	function loops(){
		_this.iNow=_this.iNow;
		_this.playCol(_this.iNow);
	};
	
	// 顺序播放
	function SequentialPlay(){
		//console.log(_this.iNow);
		_this.iNow++;
		
		if(_this.iNow>=_this.len){
			_this.oAudio.pause();
			_this.oPaus.className='end';
			//console.log(123)
			return false;	
		}else{
			_this.playCol(_this.iNow);	
		}
	}
	
	// 随机播放  随机iNow的值 
	function RandomPlay(){
		_this.iNow=roundNum(0,_this.len-1);
		//console.log(_this.iNow)
		_this.playCol(_this.iNow);
	}
	
}

Audio.prototype.volume=function (){
	var _this=this;
	this.oVolume=document.getElementById('volumeid');
	this.oVolumeWarp=document.getElementsByClassName('volume-warp')[0];
	this.oVolumeLine=document.getElementsByClassName('volume-line')[0];
	this.oVolumeDot=document.getElementsByClassName('volume-dot')[0];
	this.oVolumePro=document.getElementsByClassName('volume-pro')[0];
	
	
	_this.oVolumeWarp.onmouseover=_this.oVolume.onmouseover=function(){
		_this.oVolumeWarp.style.display='block';
	}
	_this.oVolumeWarp.onmouseout=_this.oVolume.onmouseout=function(){
		_this.oVolumeWarp.style.display='none';
	}
	//初始化
	
	_this.oAudio.volume=0.3;
	_this.oVolumePro.style.width=18+'px';
	_this.oVolumeDot.style.left=18+'px';
	
	drag(_this.oVolumeLine,_this.oVolumeDot,function(scals){
		
		_this.oAudio.volume=scals;
		
		_this.oVolumeDot.style.left=_this.oVolumePro.offsetWidth+'px';
		
		if(_this.oAudio.volume==0){
			
			_this.oVolume.className='volume-close';
			
		}else if(_this.oAudio.volume<=0.5){
			_this.oVolume.className='volume-m';
		}else{
			_this.oVolume.className='volume';
		}
		
		//_this.nowTime(_this.oAudio);
		console.log(_this.oAudio.volume);
	},1);
	
	
	
	// 未完成 点击声音图标 控制是否静音  点击选择音量 点击选择播放进度	
}
Audio.prototype.templeteList=function(data){
	var shtml="";
	for(var i=0; i<data.length; i++){
		shtml+='<li res="'+data[i].singInfo+'"><a href="javascript:;"></a><i class="times"></i><div class="o-options"><span class="add-Album"></span><span class="delete-music"></span></div> </li>';
	}
	this.tList.innerHTML=shtml;	
}
Audio.prototype.loadlrc=function(){
	var _this=this;
	var lrc=_this.txt;
	

	var lrcArr = lrc.split("[");

	var lrchtml='';
	for(var i=0; i<lrcArr.length; i++){
		var arr1=lrcArr[i].split(']');
		var times=arr1[0];
		var oneLrc=arr1[1];

		//转化为时间戳
		var times1=times.split('.');
		var times2=times1[0].split(':');
		var tstamp=times2[0]*60+times2[1]*1;//时间转为秒  可以精确至毫秒

		

		if(arr1[1]){
			lrchtml+='<li id="tstamp'+tstamp+'">'+arr1[1]+'</li>';
		}
	}
	_this.lrcWarp.innerHTML=lrchtml;

	var oLi=_this.lrcWarp.children;
	var currtime=0;
	for(var j=0; j<oLi.length; j++){
		oLi[j].style.display='none';
	}

	//timeupdate 播放位置发生改变时触发

	_this.oAudio.addEventListener('timeupdate',function(){
		currtime=parseInt(this.currentTime); //

		if(document.getElementById("tstamp"+currtime)){
			for(var i=0; i<oLi.length; i++){
				oLi[i].style.display='none';
			}
			document.getElementById("tstamp"+currtime).style.display='block';
		}

		//console.log(currtime);
	});
	//console.log(lrcArr)
}
//创建音频
Audio.prototype.createAnalysers=function(){ 
	//音频文件接口：用来监听音乐的播放
	window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;
	var _this=this;
	var actx = new AudioContext();  //创建一个音乐对象
	// 创建一个音频节点
	var analyser = actx.createAnalyser();
	//创建音乐媒体源节点
	var audioSrc = actx.createMediaElementSource(_this.oAudio);

	//console.log(audioSrc)
	//将媒体源节点与分析机制链接
	audioSrc.connect(analyser);
	
	//将分析机制与目标点链接（扬声器）
	analyser.connect(actx.destination);

	console.log(analyser);
	var num = 100;     
	var can = $_("#Voice");

	var cxt = can.getContext("2d");
	color = cxt.createLinearGradient(can.width*0.5,0,can.width*0.5,150);
	color.addColorStop(0,"#fff");
	color.addColorStop(0.5,"#f00");
	color.addColorStop(1,"#ccc");
	colorf = cxt.createLinearGradient(can.width*.5,150,can.width*.5,250);
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
			cxt.fillRect(i*10+can.width*0.5,150,7,-value+1);
			cxt.fillRect(can.width*0.5-(i-1)*10,150,7,-value+1); 
			cxt.fillStyle = colorf;       
			cxt.fillRect(i*10+can.width*0.5,150,7,value+1);
			cxt.fillRect(can.width*0.5-(i-1)*10,150,7,value+1);
		}
		cxt.closePath();
		requestAnimationFrame(draw);
	}
}
Audio.prototype.nowTime=function (obj){
	//当前播放时间
	this.oStartTime.innerHTML = this.curentTimes(obj.currentTime);
	
	this.oDot.style.display='block';
	//播放进度
	var scale = obj.currentTime/obj.duration;
	
	this.oLineProgress.style.width = scale * 290 + 'px';
	
	this.oDot.style.left=this.oLineProgress.offsetWidth+'px';
}
Audio.prototype.curentTimes=function(n){
	var nn=parseInt(n);
	var m=parseInt(nn/60);
	var mm=nn%60;
	var s=parseInt(mm);
	
	return toZero(m)+':'+toZero(s);
}
	
	
	
	







