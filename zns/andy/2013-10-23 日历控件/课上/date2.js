// JavaScript Document

function RlDate(id)
{
	var oInput=document.getElementById(id);
	var odivHTML='<ul class="name"><li><span ></span><a href="javascript:;" class="a1">上月</a>';
        odivHTML+='<a href="javascript:;"  class="a2">下月</a></li></ul>';
  		odivHTML+='<ul class="week"><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li><li>七</li></ul>';
   		odivHTML+='<ul class="dateUl"></ul>';
	var oDiv=document.createElement('div');
	oDiv.innerHTML=odivHTML;
	oDiv.className='dateDiv';
	document.body.appendChild(oDiv);
	
	oDiv.style.left=getPos(oInput).left+'px';
	oDiv.style.top=getPos(oInput).top+oInput.offsetHeight+'px';
	oDiv.style.display='none';
	var oUl=oDiv.children;
	oInput.onclick=function(ev)
	{
		var oEvent=ev||event;
		oEvent.cancelBubble=true;
		oDiv.style.display='block';	
	}
	document.onclick=function()
	{
		oDiv.style.display='none';	
	}
	function MonthDay()
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oDate.setMonth(oDate.getMonth()+1);
		oDate.setDate(0);
		
		return oDate.getDate();
	}
	
	function weekFirst()
	{
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oDate.setDate(1);
		return oDate.getDay();
	}
	function RLDate()
	{
			oUl[2].innerHTML='';
			var week=weekFirst();
			if(week==0){ week=7};
			week--;
			for(var i=0; i<week; i++)
			{
				var aLi=document.createElement('li');
				oUl[2].appendChild(aLi);
			}
			var Nday=MonthDay();
			
			for(var i=0; i<Nday; i++)
			{
				var aLi=document.createElement('li');
				aLi.innerHTML=i+1;
				oUl[2].appendChild(aLi);
			}
			
			var oLi=oUl[2].getElementsByTagName('li');
			
			for(var i=0; i<oLi.length; i++)
			{
				oLi[i].onclick=function()
				{
					oInput.value=''
				}
			}
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+iNow);
			var nowDay=oDate.getDate();
			for(var i=0; i<oLi.length; i++)
			{
				oLi[i].onclick=function()
				{
					oInput.value=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月'+this.innerHTML;
				}
			}
			if(iNow<0)
			{
				for(var i=0; i<oLi.length; i++)
				{
					oLi[i].className='ccc';	
				}
			}else if(iNow==0)
			{
				for(var i=0; i<oLi.length; i++)
				{
					if(oLi[i].innerHTML<nowDay)
					{
					oLi[i].className='ccc';	
					}
					else if(oLi[i].innerHTML==nowDay)
					{
						oLi[i].className='red';
					}else if(i%7==5||i%7==6)
					{
						oLi[i].className='sun';
					}
				}
			}else
			{
				for(var i=0; i<oLi.length; i++)
				{
					if(i%7==5||i%7==6)
					{
						oLi[i].className='sun';
					}
			
				}
			}

			//'++'
			var oSpan=oUl[0].getElementsByTagName('span')[0];
			oSpan.innerHTML=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月' ;
	}
	var iNow=0;
	RLDate();
	var oPrve=oUl[0].getElementsByTagName('a')[0];
	var oNext=oUl[0].getElementsByTagName('a')[1];
	oNext.onclick=function(ev)
	{
		var oEvent=ev||event;
		oEvent.cancelBubble=true;
		iNow++;
		RLDate();
	}
	oPrve.onclick=function(ev)
	{
		var oEvent=ev||event;
		oEvent.cancelBubble=true;
		iNow--;
		RLDate();
	}
	function getPos(obj)
	{
		var l=0;
		var t=0;
		while(obj)
		{
			l+=obj.offsetLeft;
			t+=obj.offsetTop;
			obj=obj.offsetParent;
		}
		return { left:l,top:t }
	}
}




var oLink=document.createElement('link');
	oLink.rel='stylesheet';
	oLink.type='text/css';
	oLink.href='date.css';
var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oLink);
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// JavaScript Document
