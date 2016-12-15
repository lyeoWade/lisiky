/*

By : 可怜兮兮

*/
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
				}
				
				if(i=='opacity')
				{
					obj.style.opacity=wade/100;
					obj.style.filter='alpha(opacity='+wade+')';
				}else
				{
					obj.style[i]=wade+'px';
				}
			}
			
		
				if(count==n)
				{
					clearInterval(obj.timer)
					options.fn && options.fn();
				}
		
		},30)
}














