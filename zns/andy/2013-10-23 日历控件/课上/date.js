// JavaScript Document
function RlDate(id)
{
	
	var oInput=document.getElementById(id)
	
	//创建DIV
	var oDiv=document.createElement('div');
	var oDivHtml='<ul class="name"><li><span></span><a href="javascript:;"  class="a1">上月</a><a href="javascript:;"  class="a2">下月</a></li></ul>';
    oDivHtml+='<ul class="week"><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>七</li></ul>';
    oDivHtml+='<ul class="dateUl"></ul>';
	oDiv.innerHTML=oDivHtml;
	oDiv.className='dateDiv';
	document.body.appendChild(oDiv);
	
	
	oDiv.style.top=getPos(oInput).top+oInput.offsetHeight+'px';
	oDiv.style.left=getPos(oInput).left+'px';
	oDiv.style.display='none';
	/*var oDateDiv=document.getElementById('dateDiv');
	var oUl=oDateDiv.children;
	
	// 算出每个月多少天
	
	function Mday()
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oDate.setMonth(oDate.getMonth()+1);
		oDate.setDate(0);
		return oDate.getDate(); // 其实这是取到本月的最后那一天
	}
	function firstDay()
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oDate.setDate(1);
		
		return oDate.getDay();
	}
	
	function Month()
	{
		oUl[2].innerHTML='';	
		var week=firstDay()
		if(week==0)week=7;
		week--;
		
		for(var i=0; i<week; i++)
		{
			var bLi=document.createElement('li');
			oUl[2].appendChild(bLi);
		}
		
		var DDate=Mday();
		
		for(var i=0; i<DDate; i++)
		{
			var aLi=document.createElement('li');
			aLi.innerHTML=i+1;
			oUl[2].appendChild(aLi);
		}
		
		var Li=oUl[2].children;
		
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		var day=oDate.getDate();
		if(iNow<0)
		{
			for(var i=0; i<Li.length; i++)
			{
					Li[i].className='ccc';
			}
		}else if(iNow==0)
		{
			for(var i=0; i<Li.length; i++)
			{
				if(Li[i].innerHTML<day)
				{
					Li[i].className='ccc';
				}else if(Li[i].innerHTML==day)
				{
					Li[i].className='red';
				}else if(i%7==5 || i%7==6)
				{
					Li[i].className='sun';
				}
			}
		}else
		{
			for(var i=0; i<Li.length; i++)
			{
				if(i%7==5 || i%7==6)
				{
					Li[i].className='sun';
				}
			}
		}
		var oSpan=oUl[0].getElementsByTagName('span')[0];
		
		oSpan.innerHTML=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月';
	}
	
	var iNow=0;
	Month();
	
	
	var oPre=document.getElementById('pre');
	var oNext=document.getElementById('next');
	
	oNext.onclick=function()
	{
		iNow++;
		Month();
	};
	oPre.onclick=function()
	{
		iNow--;
		Month();
	};*/
	
	oInput.onclick=function(ev)
	{
		var oEvent=ev||event;
		oEvent.cancelBubble =true;
		oDiv.style.display='block';
	}
	

	var aUl=oDiv.children;
	
	//取每个月多少天   将时间调到下个月第一天
	function MonthDay()
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oDate.setMonth(oDate.getMonth()+1);
		oDate.setDate(0);
		
		return oDate.getDate(); //得到上个月最后一天  得到当前月的天数
	}
	
	function firstDay()
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oDate.setDate(1);
		return oDate.getDay();
	}
	
	function RlXHB()
	{
		aUl[2].innerHTML='';
		
		var week=firstDay();
	
		if(week==0)
		{
			week=7;
		}
		week--;//求出第一天前面的空格
		for(var i=0; i<week; i++)
		{
			var aLi=document.createElement('li');
			aUl[2].appendChild(aLi)
		}
		var nDate=MonthDay();
		
		for(var i=0; i<nDate; i++)
		{
			var aLi=document.createElement('li');
			aLi.innerHTML=i+1;
			aUl[2].appendChild(aLi)
		}
		//找到当前天数  将当前天的前面变灰  当前天标记  星期六、七变色
		
		var aLi=aUl[2].children;
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		var day=oDate.getDate();
		
		if(iNow<0)
		{
			for(var i=0; i<aLi.length; i++)
			{
				aLi[i].className='ccc';
			}
		}else if(iNow==0)
		{
			for(var i=0; i<aLi.length; i++)
			{
				aLi[i].onclick=function()
				{
					oInput.value=oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+this.innerHTML;
					oDiv.style.display='none';
				}
				if(aLi[i].innerHTML<day)
				{
					aLi[i].className='ccc';
				}else if(aLi[i].innerHTML==day)
				{
					aLi[i].className='red';
				}else if(i%7==5 || i%7==6)
				{
					aLi[i].className='sun';
				}
			}
		}else
		{
			for(var i=0; i<aLi.length; i++)
			{
				if(i%7==5 || i%7==6)
				{
					aLi[i].className='sun';
				}
			}
		}
		
		document.onclick=function()
		{
			oDiv.style.display='none';
		}
		var oSpan1=aUl[0].getElementsByTagName('span')[0];
		oSpan1.innerHTML=oDate.getFullYear()+'年'+tozero((oDate.getMonth()+1))+'月';
	}
	
	var oPrev=aUl[0].getElementsByTagName('a')[0];
	var oNext=aUl[0].getElementsByTagName('a')[1];
	
	var iNow=0;
	RlXHB();
	oPrev.onclick=function(ev)
	{
		var oEvent=ev||event;
		oEvent.cancelBubble=true;
		iNow--;
		RlXHB();
	}
	
	oNext.onclick=function(ev)
	{
		var oEvent=ev||event;
		oEvent.cancelBubble=true;
		iNow++;
		RlXHB();
	}
	
	function tozero(n){ return n<10?'0'+n:n}
	
	function getPos(obj)
	{
		var l=0;
		var t=0;
		if(obj)
		{
			l+=obj.offsetLeft;
			t+=obj.offsetTop;
			obj=obj.offsetParent;	
		}
		return {left:l,top:t};
	};
}


 var oLink=document.createElement('link');
 oLink.rel='stylesheet';
 oLink.type='text/css';
 oLink.href='date.css';
 var oHead=document.getElementsByTagName('head')[0];
 oHead.appendChild(oLink);


