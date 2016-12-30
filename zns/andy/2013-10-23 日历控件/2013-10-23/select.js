
function liveSelet(name)
{
	 var Select=document.getElementsByName(name)[0];
	

		var oSeletDiv=document.createElement('div');
		oSeletDiv.className='selectDiv';
		Select.parentNode.insertBefore(oSeletDiv,Select);
		
		//span
		var oSpan=document.createElement('span');
		oSpan.innerHTML=Select.options[Select.selectedIndex].text;
		oSeletDiv.appendChild(oSpan);
		
		var b=true;
		oSpan.onclick=function(ev)
		{
			var oEvent=ev||event;
			oEvent.cancelBubble=true;
			if(b)
			{
				oUl.style.display='block';
				b=false;
			}	
			else
			{
				oUl.style.display='none';
				b=true;
			};
			
			return false;
		};
		
		/*document.onclick=function()
		{
			oUl.style.display='none';
			b=true;	
		};*/
		//得写兼容绑定
		document.addEventListener('click',function()
		{
			oUl.style.display='none';
			b=true;	
		},false);
		
		oSpan.onmousedown=function()
		{
			return false;
		};

		
		//ul
		var oUl=document.createElement('ul');
		oSeletDiv.appendChild(oUl);
		//li
		for(var i=0;i<Select.options.length;i++)
		{
			var oLi=document.createElement('li');
			oUl.appendChild(oLi);	
			oLi.innerHTML=Select.options[i].text;
			
			//li 点击
			oLi.index=i;
			oLi.onclick=function()
			{
				oSpan.innerHTML=this.innerHTML;
				oUl.style.display='none';
				b=true;
				Select.selectedIndex=this.index;
			};		
		}
		
		//select隐藏
		Select.style.display='none';
		
};
var oLink=document.createElement('link');
oLink.type='text/css';
oLink.rel='stylesheet';
oLink.href='select.css';
var head=document.getElementsByTagName('head')[0];
head.appendChild(oLink);	
