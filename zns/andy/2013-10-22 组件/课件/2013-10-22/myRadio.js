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
	//type="text/css" rel="stylesheet"
	var oLink=document.createElement('link');
	oLink.type='text/css';
	oLink.rel='stylesheet';
	oLink.href='myRadio.css';
	var head=document.getElementsByTagName('head')[0];
	head.appendChild(oLink);
	
};