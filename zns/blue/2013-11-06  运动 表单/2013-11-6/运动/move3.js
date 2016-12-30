//版权 北京智能社©, 保留所有权利

function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function startMove(obj, name, iTarget)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		
		var cur=parseInt(getStyle(obj, name));
		
		if(cur<iTarget)
		{
			var speed=10;
		}
		else
		{
			var speed=-10;
		}
		
		if(Math.abs(cur-iTarget)<Math.abs(speed))
		{
			clearInterval(obj.timer);
			
			obj.style[name]=iTarget+'px';
		}
		else
		{
			obj.style[name]=cur+speed+'px';
		}
	}, 30);
}