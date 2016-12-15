// JavaScript Document

function getByClass(oParent,sClass)
{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sClass);
	}
	else
	{
		var arr=[];
		var aEle = oParent.getElementsByTagName('*');
		for(var i=0; i<aEle.length; i++)
		{
			if(aEle[i].className.indexOf(sClass)!=-1)
			{
				arr.push(aEle[i]);
			};
		};
		return arr;
	};
};



function moveLeft(obj,old,now)
{
	clearInterval(obj.timer);
	
	obj.timer = setInterval(function(){
		var iSpeed=(now-old)/10;
		iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		if(now==old)
		{
			clearInterval(obj.timer);
		}
		else
		{
			old+=iSpeed;
			obj.style.left = old+'px';
		};
		
	},30);
};



function Douto(n)
{
	var n = parseInt(n);
	return n<10?'0'+n:n;
};


function oTimer(_oDate,_oDiv_Cont)
{
	var _oDiv_Cont;
	var s,d,h,m;
	function tick()
	{
		var oOld=new Date();
				
		var s=parseInt((_oDate-oOld)/1000);
		
		if(s<=0)
		{
			clearInterval(timer1);
			_oDiv_Cont.innerHTML = '活动已经结束，下次在来呀！';
			return;
		};
		
		var d=Douto(s/86400);
		s%=86400;
		
		var h=Douto(s/3600);
		s%=3600;
		
		var m=Douto(s/60);
		s = Douto(s%=60);
		
		_oDiv_Cont.innerHTML = '距离结束：<b>'+h+'</b>时<b>'+m+'</b>分<b>'+s+'</b>秒';

	};

	var timer1=setInterval(tick,1000);
	tick(); 
};





	function moveFlash(oCp_Wrap)
	{
			var oCp_Wrap_Prev = getByClass(oCp_Wrap,'prev')[0];
			var oCp_Wrap_Next = getByClass(oCp_Wrap,'next')[0];

			var oCp_Pic = getByClass(oCp_Wrap,'cp_pic')[0];
			var oCp_Pic_Ul = oCp_Pic.getElementsByTagName('ul')[0];
			var oCp_Pic_Ul_Li = oCp_Pic_Ul.getElementsByTagName('li');
			
			
			var iNum=0;
			var n=5;
			
			oCp_Pic_Ul.innerHTML+=oCp_Pic_Ul.innerHTML;
			oCp_Pic_Ul.style.width=oCp_Pic_Ul_Li.length*(oCp_Pic_Ul_Li[0].offsetWidth+22) + 'px';
			
			
			
			oCp_Wrap_Next.onclick=function()
			{
				
				
				if(iNum==oCp_Pic_Ul_Li.length/2)
				{
					iNum=0;
				};
				
				moveLeft(oCp_Pic_Ul,-iNum*(oCp_Pic_Ul_Li[0].offsetWidth+22),-(iNum+n)*(oCp_Pic_Ul_Li[0].offsetWidth+22));
				
				iNum+=n;
				
			};
			
			
			oCp_Wrap_Prev.onclick=function()
			{
				if(iNum==0)
				{
					iNum=oCp_Pic_Ul_Li.length/2;
				};
				
				moveLeft(oCp_Pic_Ul,-iNum*(oCp_Pic_Ul_Li[0].offsetWidth+22),-(iNum-n)*(oCp_Pic_Ul_Li[0].offsetWidth+22));
				iNum-=n;
			};
	};




window.onload=function()
{
	var oQ_Price = document.getElementById('q_price');
	var oTab = getByClass(oQ_Price,'n_tab')[0];
	var oTab_Btn = getByClass(oTab,'btn');
	
	var oCp_body = document.getElementById('cp_body');
	var oCp_Wrap = getByClass(oCp_body,'cp_wrap');
	
	
	var aEnd_Time = getByClass(oTab,'end_p');

	oTimer(new Date(2013,8,28,23),aEnd_Time[0]);
	oTimer(new Date(2013,8,28,23,20),aEnd_Time[1]);
	oTimer(new Date(2013,8,28,23,40),aEnd_Time[2]);
	oTimer(new Date(2013,8,28,24),aEnd_Time[3]);
	
	
	for(var i=0; i<oTab_Btn.length; i++)
	{
		oTab_Btn[i].index=i;
		oTab_Btn[i].onmouseover=function()
		{
			for(var i=0; i<oTab_Btn.length; i++)
			{
				oTab_Btn[i].className='btn';
				getByClass(oTab_Btn[i],'now_time')[0].style.display='block';
				getByClass(oTab_Btn[i],'end_time')[0].style.display='none';
				oCp_Wrap[i].style.display='none';
			};
			
			this.className='btn w200';
			getByClass(oTab_Btn[this.index],'now_time')[0].style.display='none';
			getByClass(oTab_Btn[this.index],'end_time')[0].style.display='block';
			oCp_Wrap[this.index].style.display='block';
		};
	};
	
	

	for(var i=0; i<oCp_Wrap.length; i++)
	{
		moveFlash(oCp_Wrap[i]);
	};
	
	
	
};


















