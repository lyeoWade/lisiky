//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function getCur(obj, name)
{
	//问题
	if(name=='opacity')
	{
		var cur=Math.round(parseFloat(getStyle(obj, name))*100);
	}
	else
	{
		var cur=parseInt(getStyle(obj, name));
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

function startMove(obj, json, options)
{
	var times={
		veryslow:	5000,
		slow:		2000,
		normal:		1000,
		fast:		700,
		veryfast:	300
	};
	
	options=options||{};
	options.time=options.time||700;
	options.type=options.type||'buffer';
	
	if(typeof options.time=='string')
	{
		if(times[options.time])
		{
			options.time=times[options.time];
		}
		else
		{
			options.time=700;
		}
	}
	
	var count=parseInt(options.time/30);
	var start={};
	var dis={};
	
	for(var i in json)
	{
		start[i]=getCur(obj, i);
		dis[i]=json[i]-start[i];
	}
	
	var n=0;
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		var cur;
		
		for(var i in json)
		{
			switch(options.type)
			{
				case 'linear':
					cur=start[i]+dis[i]*n/count;
					break;
				case 'buffer':
					var a=1-n/count;
					cur=start[i]+dis[i]*(1-a*a*a);
					break;
			}
			if(i=='opacity')
			{
				obj.style.filter='alpha(opacity:'+cur+')';
				obj.style.opacity=cur/100;
			}
			else
			{
				obj.style[i]=cur+'px';
			}
		}
		
		if(n==count)
		{
			clearInterval(obj.timer);
			options.end && options.end();
		}
	}, 30);
}