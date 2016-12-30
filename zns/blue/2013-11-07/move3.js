//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function getCur(obj, name)// 处理值的问题
{
	//问题
	if(name=='opacity')
	{
		var cur=Math.round(parseFloat(getStyle(obj, name))*100);// Math.round()处理  0.0010000000001;
	}
	else
	{
		var cur=parseInt(getStyle(obj, name));  // parseInt处理px
	}
	
	if(isNaN(cur)) // 如果没有定义属性  即 属性的值为auto  
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

function startMove(obj, name, iTarget, options)
{
	var times={
		veryslow:	5000,
		slow:		2000,
		normal:		1000,
		fast:		700,
		veryfast:	300
	};
	
	options=options||{}; // 如果传了options 就执行options  没传这不执行
	options.time=options.time||700; // options.time   默认 700
	options.type=options.type||'buffer';
	
	if(typeof options.time=='string')  // 如果 options.time的类型为string  
	{
		if(times[options.time])  // 并且options.time 是times下面的值
		{
			options.time=times[options.time]; //那么options.time就等于 times下面对应的options.time
		}
		else
		{
			options.time=700; // 如果传错了(参数错误 ， 拼写错误) 默认700
		}
	}
	
	var count=parseInt(options.time/30);
	var start=getCur(obj, name);
	var dis=iTarget-start;
	
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		switch(options.type)
		{
			case 'linear':
				wade=start+dis*n/count;
				break;
			case 'buffer':
				var a=1-n/count;
				wade=start+dis*(1-a*a*a);
				break;
		}
		
		if(name=='opacity')
		{
			obj.style.filter='alpha(opacity:'+wade+')';
			obj.style.opacity=wade/100;
		}
		else
		{
			obj.style[name]=wade+'px';
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
		}
	}, 30);
}