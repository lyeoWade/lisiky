// JavaScript Document


window.onload=function()
{
	var oBanner=document.getElementById('banner');
	var aBtn=oBanner.getElementsByTagName('a');
	var oDiv=oBanner.children[0];
	for(var i=0; i<aBtn.length; i++)
	{
		aBtn[i].onmouseover=function()
		{
			oDiv.style.display='block'
			setTimeout(function(){
				
				oDiv.style.display='none'
				
				},3000);
			var oSpan=this.getElementsByTagName('span')[0];
			//console.log(oSpan.length);
			oSpan.onclick=function()
			{
				for(var j=0; j<aBtn.length; j++)
				{
					aBtn[j].style.display='none';
				}
			}
		}
		
	}
	
	var oHeader=document.getElementById('header');
	var aLi=oHeader.getElementsByTagName('li');
	var oClo=document.getElementById('clo');
	var oLog=document.getElementById('log');
	for(var i=0; i<aLi.length; i++)
	{
		aLi[i].onmouseover=function()
		{
			var oDiv=this.getElementsByTagName('div')[0];
			this.style.background='#E9E9E9';
			if(oDiv)
			{
				oDiv.style.display='block';
			}
		}
		
		aLi[i].onmouseout=function()
		{
			var oDiv=this.getElementsByTagName('div')[0];
			this.style.background='#fcfcfc';
			if(oDiv)
			{
				oDiv.style.display='none';
			}
		}
	}
	oClo.onclick=function()
	{
		oLog.style.display='none';
	}
	
	
	var oChose=document.getElementById('choise');
	var btnInput=document.getElementById('inputbtn')
	var oBtn=btnInput.getElementsByTagName('input');
	var aInput=oChose.getElementsByTagName('input');
		n=0;
		oBtn[0].onclick=function()
		{
			
			for(var i=0; i<aInput.length; i++)
			{
				aInput[i].checked=true;
			}
			n=aInput.length;
			for(var i=0; i<aInput.length; i++)
			{
				aInput[i].onclick=function()
				{
					if(this.checked==true)
					{
						n++
					}else
					{
						n--;
					}
					
					if(n==i)
					{
						oBtn[0].checked=true;
					}else
					{
						oBtn[0].checked=false;
					}
				
			
					document.title=n;
				}		
			}
		}
		
	
		
		oBtn[1].onclick=function()
		{
			for(var i=0; i<aInput.length; i++)
			{
				if(aInput[i].checked==true)
				{
					aInput[i].checked=false;
				}else
				{
					aInput[i].checked=true;
				}
			}
		}
		
		
		
		oBtn[2].onclick=function()
		{
			for(var i=0; i<aInput.length; i++)
			{
				aInput[i].checked=false;
			}
			oBtn[0].checked=false;
		}
		
		
	change();
		
	
}


function change()
{
		var oPlece=document.getElementById('aplece');
		var oSpanp=oPlece.getElementsByTagName('span')[0];
		var aInput=oPlece.getElementsByTagName('input')[0];
		var oListp=document.getElementById('list_p');
		var aLi=oListp.getElementsByTagName('ul')[0].getElementsByTagName('a');
		//alert(aLi.length);
		
		
			
		
		aInput.onfocus=function()
		{
			if(oSpanp.innerHTML=='请输入文字')
			{
				oSpanp.innerHTML=''
			}
			oListp.style.display='block';
			for(var i=0; i<aLi.length; i++)
			{
				aLi[i].onmouseover=function()
				{
						aInput.value=this.innerHTML;
				}
				if(aInput.value!='')
				{
					oSpanp.innerHTML='';
				}
			}
			
		}
		
		aInput.onblur=function()
		{
			oListp.style.display='none';
			if(aInput.value=='')
			{
				oSpanp.innerHTML='请输入文字';
			}
		}
		
	
}























