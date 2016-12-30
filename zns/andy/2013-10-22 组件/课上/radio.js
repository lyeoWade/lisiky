


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

