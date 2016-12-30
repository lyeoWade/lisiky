//版权 北京智能社©, 保留所有权利
function getStyle(obj, name)
{
	return obj.currentStyle?obj.currentStyle[name]:getComputedStyle(obj, false)[name];
}

function startMove(obj, name, iTarget)
{
	iTarget=parseInt(iTarget);
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var cur=parseInt(getStyle(obj, name));
		
		if(isNaN(cur))
		{
			switch(name)
			{
				case 'top':
					cur=obj.offsetTop;
					break;
				case 'left':
					cur=obj.offsetLeft;
					break;
				case 'width':
					cur=obj.offsetWidth;
					break;
				case 'height':
					cur=obj.offsetHeight;
					break;
			}
		}
		
		var speed=(iTarget-cur)/12.89;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		
		if(cur==iTarget)
		{
			clearInterval(obj.timer);
			
			alert(new Date().getTime()-start);
		}
		else
		{
			obj.style[name]=cur+speed+'px';
			console.log(iTarget);
		}
	}, 30);
}