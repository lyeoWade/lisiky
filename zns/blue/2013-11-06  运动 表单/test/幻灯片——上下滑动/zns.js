/*
智能社© - http://www.zhinengshe.com/

微博：@北京智能社
微信：zhi_neng_she

最具深度的前端开发培训机构 HTML+CSS/JS/HTML5
*/


function getStyle(obj, name)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}

function startMove(obj, attr, iTarget)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var iCur=0;
		
		if(attr=='opacity')
		{
			//iCur=parseFloat(getStyle(obj, attr))*100;
			iCur=Math.round(parseFloat(getStyle(obj, attr))*100);
		}
		else
		{
			iCur=parseInt(getStyle(obj, attr));
		}
		
		var iSpeed=(iTarget-iCur)/4;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		if(iCur==iTarget)
		{
			clearInterval(obj.timer);
		}
		else
		{
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
				
				document.getElementById('txt1').value=obj.style.opacity;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
	}, 30);
}

window.onload=function ()
{
	var oPlay=document.getElementById('play');
	var aBtn=oPlay.getElementsByTagName('ol')[0].getElementsByTagName('li');
	var oUl=oPlay.getElementsByTagName('ul')[0];
	var iNow=0;
	var i=0;
	
	for(i=0;i<aBtn.length;i++)
	{
		aBtn[i].index=i;
		aBtn[i].onmouseover=function ()
		{
			iNow=this.index;
			
			tab();
		};
	}
	
	function tab()
	{
		for(i=0;i<aBtn.length;i++)
		{
			aBtn[i].className='';
		}
		aBtn[iNow].className='active';
		//oUl.style.top=-150*this.index+'px';
		startMove(oUl, 'top', -150*iNow);
	}
	
	function next()
	{
		iNow++;
		if(iNow==aBtn.length)
		{
			iNow=0;
		}
		
		tab();
	}
	
	var timer=setInterval(next, 3000);
	oPlay.onmouseover=function ()
	{
		clearInteval(timer);
	};
	oPlay.onmouseout=function ()
	{
		clearInteval(timer);
		timer=setInterval(next, 3000);
	};
};