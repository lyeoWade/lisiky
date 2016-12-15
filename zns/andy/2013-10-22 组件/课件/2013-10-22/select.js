
function liveSelet(name)
{
		var Select=document.getElementsByName(name)[0];
		var oSeletDiv=document.createElement('div');
		oSeletDiv.className='selectDiv';
		Select.parentNode.insertBefore(oSeletDiv,Select);
		//span
		var oSpan=document.createElement('span');
		oSpan.innerHTML=Select.options[Select.selectedIndex].text; //Select.selectedIndex  默认值
		oSeletDiv.appendChild(oSpan);
		//ul
		var oUl=document.createElement('ul');
		
		var b=true;
		oSpan.onclick=function()
		{
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
		
		oSpan.onmousedown=function()
		{
			return false;
		};

		
		
		oSeletDiv.appendChild(oUl);
		//li
		for(var i=0;i<Select.options.length;i++)// 新建li 的长度等于 Select.options.length 
		{
			var oLi=document.createElement('li');
			oUl.appendChild(oLi);	
			oLi.innerHTML=Select.options[i].text; // li里面的内容等于select.options下面的值
			
			//li 点击
			oLi.index=i;
			oLi.onclick=function()
			{
				oSpan.innerHTML=this.innerHTML;
				oUl.style.display='none';
				b=true;
				Select.selectedIndex=this.index;
				//Select.options[this.index].selected=true;
			};		
		}
		
		//select隐藏
		//Select.style.display='none';
		/**/
};
var oLink=document.createElement('link');
oLink.type='text/css';
oLink.rel='stylesheet';
oLink.href='select.css';
var head=document.getElementsByTagName('head')[0];
head.appendChild(oLink);	
