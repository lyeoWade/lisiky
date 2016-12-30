//版权 北京智能社©, 保留所有权利

//var timer=null;

function startMove(obj, iTarget)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
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
			clearInterval(obj.timer);
		}
		else
		{
			obj.style.width=obj.offsetWidth+speed+'px';
		}
	}, 30);
}