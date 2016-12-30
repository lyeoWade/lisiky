function znsDate(id)
{
	var oTex=document.getElementById(id);
	//创建DIV
	var oBox=document.createElement('div');
	
	oBox.className='dateDiv';	
	var s='<ul class="name"><li><span>2013年10月</span><a href="javascript:;" class="a1">上月</a><a href="javascript:;" class="a2">下月</a></li></ul><ul class="week"><li>一</li>';	
	s+='<li>二</li>';
	s+='<li>三</li>';
	s+='<li>四</li>';
	s+='<li>五</li>';
	s+='<li>六</li>';
	s+='<li>七</li></ul><ul class="dateUl"></ul>';
	oBox.innerHTML=s;
	
	document.body.appendChild(oBox);
	
	oBox.style.top=getPos(oTex).top+oTex.offsetHeight+'px';
	oBox.style.left=getPos(oTex).left+'px';
	oBox.style.display='none';
	
	var aUl=oBox.children;
	
	//文本框点击后日历显示 
	oTex.onclick=function()
	{
		oBox.style.display='block';
		return false;
	};
	
	oTex.onmousedown=function()
	{
		//oBox.style.display='block';
		return false;
	};
	
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
	////////////加载日历LI
/*	*/
	function nowDays()
	   {
		   var oDate=new Date();
		   //将日期先调到下个月，再将天数调为0 回到上个月最后一天
		   oDate.setMonth(oDate.getMonth()+iNow);
		   oDate.setMonth(oDate.getMonth()+1,0); 
		   //oDate.setDate(0);
		   return oDate.getDate();
	   };
   
   // 算出本月第一天是星期几
   function firstDay()
   {
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		oDate.setDate(1);
	    return oDate.getDay();
		 // 0-6   星期天是0
   };
	function dateFn()
	{
	   //每次进来之前都要清空
	   
	   aUl[2].innerHTML='';	
	   
		
	  //接收本月第一天是星期几
	   var firstWeek=firstDay();
	   if(firstWeek==0)firstWeek=7;
	   firstWeek--;
	   
	   //塞空白日期的LI
	   for(var i=0;i<firstWeek;i++)
		{
			var oLi=document.createElement('li');
			aUl[2].appendChild(oLi);
		}
	   
	   
		//接收本月有几天
		var oDate=new Date();
		oDate.setMonth(oDate.getMonth()+iNow);
		var d=oDate.getDate();
		
		
		var days=nowDays();
		
		//根据本月有多少天创建LI
		for(var i=0;i<days;i++)
		{
			var oLi=document.createElement('li');
			oLi.innerHTML=i+1;
			aUl[2].appendChild(oLi);
			oLi.onclick=function()
			{
				if(this.className=='ccc')
				{
					alert('日期已过');
					return;
				}
				oTex.value=oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+this.innerHTML;
				oBox.style.display='none';
			};
		};
		
		//获取所有日期的LI
		var aLi=aUl[2].children;
		
		//判断是上个月还是下个月还是本月
		
		
		if(iNow<0)
		{
			//上个月
			for(var i=0;i<aLi.length;i++)
			{
				aLi[i].className='ccc';	
			};
		}
		else if(iNow==0)
		{
				
			for(var i=0;i<aLi.length;i++)
			{
				if(aLi[i].innerHTML<d)
				{
					//过去的日期变灰
					aLi[i].className='ccc';	
				}	
				else if(aLi[i].innerHTML==d)
				{
					//当天
					aLi[i].className='red';		
				}
				else if(i%7==5||i%7==6)
				{
					//星期六星期天
					aLi[i].className='sun';	
				}
				
			}
		}
		else
		{
							
			for(var i=0;i<aLi.length;i++)
			{
				if(i%7==5||i%7==6)
				{
					//星期六星期天
					aLi[i].className='sun';	
				}
				
			}
	
		}
		
		//改日期标题
		var oS=oBox.getElementsByTagName('span')[0];
		oS.innerHTML=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月';
	};
	
	
	
	
	
	var iNow=0;
	dateFn();
	//上月下月
	var oPre=oBox.getElementsByTagName('a')[0];
	var oNext=oBox.getElementsByTagName('a')[1];
	
	oNext.onclick=function()
	{
		iNow++;
		dateFn();
	};
	
	oPre.onclick=function()
	{
		iNow--;
		dateFn();
	};
		
};

////////加载CSS
var oLink=document.createElement('link');
oLink.href='date.css';
oLink.rel='stylesheet';
oLink.type='text/css';
document.getElementsByTagName('head')[0].appendChild(oLink);