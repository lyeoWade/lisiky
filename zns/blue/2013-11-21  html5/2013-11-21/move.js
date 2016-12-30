//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	var value=obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
	
	if(name=='opacity')
	{
		value=Math.round(parseFloat(value)*100);
	}
	else
	{
		value=parseInt(value);
	}
	
	return value;
}

function startMove(obj, json, options)
{
	//-1.参数
	options=options||{};
	options.time=options.time||250;
	options.type=options.type||'buffer';
	
	//0.起点、距离
	var start={};
	var dis={};
	var count=parseInt(options.time/30);
	var n=0;
	
	for(var i in json)
	{
		start[i]=getStyle(obj, i);
		dis[i]=json[i]-start[i];
	}
	
	//1.关-开
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		for(var i in json)
		{
			var cur=0;
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