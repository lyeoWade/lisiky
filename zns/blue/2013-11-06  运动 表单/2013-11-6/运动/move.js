//版权 北京智能社©, 保留所有权利

var timer=null;

function startMove(obj, iTarget)
{
	clearInterval(timer);
	timer=setInterval(function (){
		if(obj.offsetWidth<iTarget)
		{
			var speed=10;
		}
		else
		{
			var speed=-10;
		}
		
		if(obj.offsetWidth==iTarget)
		{
			clearInterval(timer);
		}
		else
		{
			obj.style.width=obj.offsetWidth+speed+'px';
		}
	}, 30);
}