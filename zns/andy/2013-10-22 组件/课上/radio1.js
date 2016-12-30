(function(){
	
	window.XhbRadio=function()
	{
		var aInput=document.getElementsByTagName('input');
		
		var arr=[];
		
		for(var i=0; i<aInput.length; i++)
		{
			if(aInput[i].getAttribute('wade')) // 从获取到的所有的input里面找到了我们自定义的属性wade
			{
				if(!findarr(arr,aInput[i].name))// 从数组里比较aInput[i]的name  如果bu相同者继续
				{
					arr.push(aInput[i].name);//将不同的aInput[i].name添加到数组里面去
					Radio(aInput[i].name)//并且调用Radio
				}
			}
		}
		
	}
	
	function findarr(arr,n)
	{
		for(var i=0; i<arr.length; i++)
		{
			if(arr[i]==n)
			{
				return true;
			}
		}
		return false;
	}
	
	function Radio(name)
	{
		var oInput=document.getElementsByName(name);
		var radioArr=[];
		for(var i=0; i<oInput.length; i++)
		{
			var oSpan=document.createElement('span');
			oSpan.className='show';
			oInput[i].parentNode.insertBefore(oSpan,oInput[i]);// oSpan 这里的得到的 oSpan不是一个数组
			radioArr.push(oSpan);
			(function(index){
				oSpan.onclick=function()
				{
					for(var i=0; i<radioArr.length; i++)
					{
						radioArr[i].className='show'
					}
					this.className='hide';
					oInput[index].checked=true;
				}
				})(i)
		}
	}
	var oLink=document.createElement('link');
	oLink.rel='stylesheet';
	oLink.type='text/css';
	oLink.href='radio.css';
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oLink);
	

})()


