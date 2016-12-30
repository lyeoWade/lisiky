/*
智能社© - http://www.zhinengshe.com/

微博：@北京智能社
微信：zhi_neng_she

最具深度的前端开发培训机构 HTML+CSS/JS/HTML5
*/


var iTarget=0;
var g_timer=[];

window.onload=function ()
{
	var oNav=document.getElementById('nav');
	var aH2=oNav.getElementsByTagName('h2');
	var aUl=oNav.getElementsByTagName('ul');
	var i=0;
	
	for(i=0;i<aH2.length;i++)
	{
		aUl[i].index=i;
		
		aH2[i].onclick=function ()
		{
			var oUl=this.parentNode.getElementsByTagName('ul')[0];
			var aLis=oUl.getElementsByTagName('li');
			
			if(this.className == 'active')
			{
				hideMenu(oUl);
				this.className='';
			}
			else
			{
				for(i=0;i<aUl.length;i++)
				{
					hideMenu(aUl[i]);
					aH2[i].className='';
				}
				showMenu(oUl);
				this.className='active';
			}
		};
	}
}

function hideMenu(oUl)
{
	if(g_timer[oUl.index])
	{
		clearInterval(g_timer[oUl.index]);
	}
	g_timer[oUl.index]=setInterval("collesUl("+oUl.index+")", 30);
}

function showMenu(oUl)
{
	var aLis=oUl.getElementsByTagName('li');
	
	oUl.style.display='block';
	
	iTarget=aLis[0].offsetHeight*aLis.length;
	
	if(g_timer[oUl.index])
	{
		clearInterval(g_timer[oUl.index]);
	}
	g_timer[oUl.index] = setInterval("scaleUl("+oUl.index+")", 30);
}

function collesUl(index)
{
	var oNav=document.getElementById('nav');
	var aUl=oNav.getElementsByTagName('ul');
	var speed=Math.ceil((aUl[index].offsetHeight-0)/5);
	var h=aUl[index].offsetHeight-speed;
	
	if(h<=0)
	{
		aUl[index].style.height=0+'px';
		aUl[index].style.display='none';
		
		clearInterval(g_timer[index]);
		g_timer[index]=null;
	}
	else
	{
		aUl[index].style.height=h+'px';
	}
}

function scaleUl(index)
{
	var oNav=document.getElementById('nav');
	var aUl=oNav.getElementsByTagName('ul');
	var speed=Math.ceil((iTarget-aUl[index].offsetHeight)/5);
	var h=aUl[index].offsetHeight+speed;
	
	if(h >= iTarget)
	{
		aUl[index].style.height=iTarget+'px';
		
		clearInterval(g_timer[index]);
		g_timer[index]=null;
	}
	else
	{
		aUl[index].style.height=h+'px';
	}
}