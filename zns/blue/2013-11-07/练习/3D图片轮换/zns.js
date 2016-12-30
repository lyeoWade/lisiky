/*
智能社© - http://www.zhinengshe.com/

微博：@北京智能社
微信：zhi_neng_she

最具深度的前端开发培训机构 HTML+CSS/JS/HTML5
*/


var g_iNow=1;
var g_aPosition=[];
var g_aSize=[];
var g_aOldPosition=[];
var g_aEvent=[gotoLeft, null, gotoRight];

var g_aLi=null;
var g_oTimer=null;

var g_iMinAlpha=30;
var g_iMinScale=90;
var g_iMaxTop=20;
var g_aUrls=[];

var g_oTimerOut=null;

var g_oTimerAuto=null;

window.onload=function ()
{
	var oUl=document.getElementById('znsRotatePic');
	g_aLi=oUl.getElementsByTagName('li');
	var oBtn=document.getElementById('btn_next');
	
	var i=0;
	
	for(i=0;i<g_aLi.length;i++)
	{
		g_aPosition[i]={};
		g_aPosition[i].x=g_aLi[i].offsetLeft;
		g_aPosition[i].y=g_aLi[i].offsetTop;
		
		g_aSize[i]={};
		g_aSize[i].w=g_aLi[i].getElementsByTagName('img')[0].offsetWidth;
		g_aSize[i].h=g_aLi[i].getElementsByTagName('img')[0].offsetHeight;
		if(i!=1)
		{
			g_aSize[i].w/=g_iMinScale/100;
			g_aSize[i].h/=g_iMinScale/100;
		}
		
		g_aUrls.push(g_aLi[i].getElementsByTagName('a')[0].href);
	}
	
	g_aLi[0].getElementsByTagName('a')[0].href='javascript:void(0);';
	g_aLi[2].getElementsByTagName('a')[0].href='javascript:void(0);';
	
	g_oTimerAuto=setInterval(gotoRight,3000);
	
	bindEvent();
};

function doGotoImg()
{
	var speed=0;
	var alpha=0;
	var scale=0;
	var bComplete=true;
	var oImg=null;
	var top=0;
	var f=0.0;
	
	var i=0;
	
	for(i=0;i<g_aLi.length;i++)
	{
		oImg=g_aLi[i].getElementsByTagName('img')[0];
		//x轴速度
		speed=(g_aPosition[i].x-g_aLi[i].offsetLeft)/5;
		
		if(speed>0)
		{
			speed=Math.ceil(speed);
		}
		else
		{
			speed=Math.floor(speed);
		}
		
		if(speed!=0)
		{
			bComplete=false;
			g_aLi[i].style.left=g_aLi[i].offsetLeft+speed+'px';
		}
		else
		{
			g_aLi[i].style.left=g_aPosition[i].x+'px';
		}
		
		if(g_iNow==i)
		{
			f=Math.abs(g_aPosition[i].x-g_aLi[i].offsetLeft)/Math.abs(g_aOldPosition[i].x-g_aPosition[i].x);
			alpha=100-f*g_iMinAlpha;
			scale=100-f*(100-g_iMinScale);
			top=Math.floor(g_iMaxTop*f);
		}
		else
		{
			f=Math.abs(g_aPosition[i].x-g_aLi[i].offsetLeft)/Math.abs(g_aOldPosition[i].x-g_aPosition[i].x);
			alpha=f*(100-g_iMinAlpha)+g_iMinAlpha;
			scale=f*(100-g_iMinScale)+g_iMinScale;
			top=Math.ceil(g_iMaxTop*(1-f));
		}
		
		oImg.style.top=top+'px';
		oImg.style.width=g_aSize[i].w*scale/100+'px';
		oImg.style.height=g_aSize[i].h*scale/100+'px';
		//alert(i+":"+alpha);
		
		oImg.style.filter="alpha(opacity="+alpha+")";
		oImg.style.opacity=alpha/100;
		
		//y轴速度
		speed=(g_aPosition[i].y-g_aLi[i].offsetTop)/5;
		
		if(speed>0)
		{
			speed=Math.ceil(speed);
		}
		else
		{
			speed=Math.floor(speed);
		}
		
		if(speed!=0)
		{
			bComplete=false;
			g_aLi[i].style.top=g_aLi[i].offsetTop+speed+'px';
		}
		else
		{
			g_aLi[i].style.top=g_aPosition[i].y+'px';
		}
	}
	
	if(bComplete)
	{
		clearInterval(g_oTimer);
		g_oTimer=null;
	}
}

Array.prototype.shiftLeft=function ()
{
	var vValue=this[0];
	var i=0;
	
	for(i=1;i<this.length;i++)
	{
		this[i-1]=this[i];
	}
	
	this[this.length-1]=vValue;
};

Array.prototype.shiftRight=function ()
{
	var vValue=this[this.length-1];
	var i=0;
	
	for(i=this.length-1;i>0;i--)
	{
		this[i]=this[i-1];
	}
	
	this[0]=vValue;
};

Array.prototype.dump=function ()
{
	var result=[];
	var i=0;
	
	for(i=0;i<this.length;i++)
	{
		result.push(this[i]);
	}
	
	return result;
};

function gotoImg(bToLeft)
{
	var i=0;
	var index=0;
	
	clearInterval(g_oTimerAuto);
	g_oTimerAuto=setInterval(gotoRight,3000);
	
	g_aOldPosition=g_aPosition.dump();
	
	if(bToLeft)
	{
		g_aPosition.shiftLeft();
		g_aEvent.shiftLeft();
		g_iNow=(g_iNow+g_aPosition.length-1)%g_aPosition.length;
	}
	else
	{
		g_aPosition.shiftRight();
		g_aEvent.shiftRight();
		g_iNow=(g_iNow+1)%g_aPosition.length;
	}
	
	bindEvent();
	
	if(g_oTimer)
	{
		clearInterval(g_oTimer);
	}
	g_oTimer=setInterval(doGotoImg, 30);
	
	for(i=0;i<g_aPosition.length;i++)
	{
		if(g_iNow==i)
		{
			index=i;
			g_aLi[i].style.zIndex=2;
			g_aLi[i].getElementsByTagName('img')[0].className='';
			
			if(g_oTimerOut)
			{
				clearTimeout(g_oTimerOut);
			}
			g_oTimerOut=setTimeout
			(
				function ()
				{
					g_aLi[index].getElementsByTagName('a')[0].href=g_aUrls[index];
					g_oTimerOut=null;
				},200
			);
		}
		else
		{
			g_aLi[i].style.zIndex=1;
			g_aLi[i].getElementsByTagName('img')[0].className='unactive';
			g_aLi[i].getElementsByTagName('a')[0].href='javascript:void(0);';
		}
	}
}

function gotoRight()
{
	gotoImg(false);
}

function gotoLeft()
{
	gotoImg(true);
}

function bindEvent()
{
	var i=0;
	
	for(i=0;i<g_aLi.length;i++)
	{
		g_aLi[i].getElementsByTagName('img')[0].onmousedown=g_aEvent[i];
	}
}