/*
智能社© - http://www.zhinengshe.com/

微博：@北京智能社
微信：zhi_neng_she

最具深度的前端开发培训机构 HTML+CSS/JS/HTML5
*/


function getStyle(obj, attr)
{
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, false)[attr];
}

function startMove(obj, json, fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		doMove(obj, json, fn);
	}, 30);
}

function doMove(obj, json, fn)
{
	var attr='';
	var iCur=0;

	var iStop=0;
	
	for(attr in json)
	{
		if(attr=='opacity')
		{
			iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
		}
		else
		{
			iCur=parseInt(getStyle(obj, attr));
		}
		
		var iSpeed=(json[attr]-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		if(iCur!=json[attr])
		{
			iStop++;
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
				
				document.title=obj.style.opacity;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
	}
	
	if(iStop==0)
	{
		clearInterval(obj.timer);
		if(fn)
		{
			fn();
		}
	}
}

window.onload=function ()
{
	var oDiv=document.getElementById('play');
	var oOl=oDiv.getElementsByTagName('ol')[0];
	var oUl=oDiv.getElementsByTagName('ul')[0];
	var aLiBtn=oOl.getElementsByTagName('li');
	var aLiAds=oUl.getElementsByTagName('li');
	var iNow=0;
	var timer=null;
	var i=0;
	
	for(i=0;i<aLiBtn.length;i++)
	{
		aLiBtn[i].index=i;
		aLiBtn[i].onmouseover=function ()
		{
			iNow=this.index;
			
			tab();
		};
	}
	
	function tab()
	{
		for(i=0;i<aLiBtn.length;i++)
		{
			aLiBtn[i].className='';
			startMove(aLiAds[i], {opacity:0});
		}
		
		aLiBtn[iNow].className='active';
		startMove(aLiAds[iNow], {opacity:100});
	}
	
	oDiv.onmouseover=function ()
	{
		clearInterval(timer);
	};
	
	oDiv.onmouseout=function ()
	{
		timer=setInterval(function (){
			iNow=(iNow+1)%aLiBtn.length;
			
			tab();
		}, 4000);
	};
	
	oDiv.onmouseout();
};