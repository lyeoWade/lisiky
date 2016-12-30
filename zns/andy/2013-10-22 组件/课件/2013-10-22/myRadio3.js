(function(){
	window.addMyRadio=function()
	{
		var aInput=document.getElementsByTagName('input');  //
		var arr=[];  // 存找到的name值                   
		for(var i=0;i<aInput.length;i++)
		{
			//addradio
			if(aInput[i].getAttribute('addradio'))  // 如果aInput里面有我们自定义的属性   有就继续执行
			{
				//addRadio(aInput[i].name);
				if(!findSame(arr,aInput[i].name)) // 从这个name里面找相同的   如果arr里面的和aInput[i].name的name不同
				//那么就将aInput[i].name忘arr里面塞
				{
					arr.push(aInput[i].name); 
					// 那么就将aInput[i].name往arr里面塞  arr 里面放name 
					//然后每一次就和arr里面放 并且和第二次比较  第三次和里面比较
					addRadio(aInput[i].name);  // addRadio执行aInput[i].name
				}
			}	
		}
	};
	function findSame(_arr,str)  // 
	{
		for(var i=0;i<_arr.length;i++)
		{
			if(str==_arr[i])
			{
				return true	
			}	
		}
		return false;
	};
	
	function addRadio(name)
	{
		var aSex=document.getElementsByName(name);
		var radioArr=[];
		
		for(var i=0;i<aSex.length;i++)
		{
			var newSpan=document.createElement('span');
			newSpan.className='radio_off';	
			aSex[i].parentNode.insertBefore(newSpan,aSex[i]);
			aSex[i].style.display='none';
			radioArr.push(newSpan);
			(function(index){
				newSpan.onclick=function()
				{
					for(var i=0;i<radioArr.length;i++)
					{
						radioArr[i].className='radio_off';
					};
					this.className='radio_on';
					aSex[index].checked=true;
				};
			})(i);
			
		};
		
		
		
	};
	
	var oLink=document.createElement('link');
	oLink.type='text/css';
	oLink.rel='stylesheet';
	oLink.href='myRadio.css';
	var head=document.getElementsByTagName('head')[0];
	head.appendChild(oLink);	
})();