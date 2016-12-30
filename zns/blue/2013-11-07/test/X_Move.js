function getStyle(obj,name){ return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj,false)[name]}
function getCur(obj,name)
{
	//var cur=null;
	if(name=='opacity')
	{
		var	cur=Math.round(parseFloat(getStyle(obj,name))*100);
	}else
	{
		var	cur=parseInt(getStyle(obj,name));
	}
	if(isNaN(cur))
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
	return cur;
}
function stratMove(obj,name,iTarget,options)//options  是一个json
{
	// 考虑用户没有传options这个参数 
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'buffer'
			//如果没有传options这个参数  那么就执行 {options.time:700,options.type:'buffer'  }
	
	// 给时间固定几个常用的值		
	
	var timers={
		'faster':300,
		'fast':1000,
		'normal':2000,
		'slow':3000,
		'Veryslow':4000
		}
	
	if(typeof options.time=='string')
	{
		if(timers[options.time])
		{
			options.time=timers[options.time];
		}else
		{
		options.time=2000;	
		}
	}
	
	var count=parseInt(options.time/30);
	
	var first=getCur(obj,name);
	
	var dis=iTarget-first;
	
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		var cur
		switch(options.type)
		{
			case 'linear':
				wade=n*dis/count;
				//obj.style[name]=first+n*dis/count+'px';
				break;
			case 'buffer':
				var a=(1-n/count);
				wade=dis*(1-a*a*a)
				//obj.style[name]=first+ dis*(1-a*a*a) +'px';
				break;
			case 'FtoS': // 快到慢
				var a=n/count;
				wade=dis*a*a*a;
			default:
		}
		if(name=='opacity')
		{
			obj.style.opacity=wade/100;
			obj.style.fitler='alpha(opacity='+wade+')';
		}else
		{
			obj.style[name]=first+wade+'px';			
		}
		if(n==count)
		{
			clearInterval(obj.timer)
		}
		},30);
}