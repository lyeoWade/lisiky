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
			oBtn[2].checked=false;
			oBtn[1].checked=false;
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
			oBtn[0].checked=false;
			oBtn[2].checked=false;
		}
		
		
		
		oBtn[2].onclick=function()
		{
			for(var i=0; i<aInput.length; i++)
			{
				aInput[i].checked=false;
			}
			oBtn[0].checked=false;
			oBtn[1].checked=false;
		}
		
		
	change();
		
	tab4();
	tabShow();
	ThereTab('there_tab','tabs_item_x');
	ThereTab('thereTab2','xxx')
	ThereTab('movie','movieShow')
	ThereTab('house','houseContent')
	ThereTab('money','moneyContent')
	ThereTab('edu','eduContent')
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

function tab4()
{
	var oTab4=document.getElementById('tab_4');
	var aBtn=oTab4.children[0].children;
	var oUl=oTab4.children[1].children; 
	for(var i=0; i<aBtn.length; i++)
	{
		aBtn[i].index=i;
		aBtn[i].onmouseover=function()
		{
			for(var i=0; i<aBtn.length; i++)
			{
				aBtn[i].children[0].className='';
				oUl[i].className='item';
			}
			this.children[0].className='active';
			oUl[this.index].className='show';	
		}
	}
	//alert(aBtn.length)
}

function tabShow()
{
	var oShow=document.getElementById('show');
	var aBtn=oShow.children;
	var oShowContent=document.getElementById('show_content');
	var aDiv=oShowContent.children;
	for(var i=0; i<aBtn.length; i++)
	{
		aBtn[i].index=i;
		aBtn[i].onmouseover=function()
		{
			for(var i=0; i<aBtn.length; i++)
			{
				aBtn[i].className='';
				aDiv[i].className='tabs_item';
			}
			this.className='active';
			aDiv[this.index].className='show';	
		}
	}
}


function ThereTab(id,classs)
{
	var oThereTab=document.getElementById(id);
	var aLi=oThereTab.getElementsByTagName('ul')[0].children;
	var aTabsItem=getByClass(oThereTab,classs)[0].children;
	/*var n=0;
	
	for(var i=0; i<aLi.length; i++)
	{
		ali[i].index=i;
		aLi[i].onmouseover=function()
		{
			aTabsItem[n].className='tabs_item';
			aLi[n].className='noBl';
			
			aTabsItem[this.index].className='show';
			aLi[this.index].className='active';
			n=this.index
		}
	}*/
	
	//alert(oTwo.length)
	for(var i=0; i<aLi.length; i++)
	{
		aLi[i].index=i;
		aLi[i].onmouseover=function()
		{
			for(var i=0; i<aLi.length; i++)
			{
					aLi[i].className='';
					aTabsItem[i].className='tabs_item';		
			}
			this.className='active';
			aTabsItem[this.index].className='show';
			
		}
	}
}















function getByClass(oParent,sClass)
{
	var aEle=document.getElementsByTagName('*');
	var re=new RegExp('\\b'+sClass+'\\b','i');
	var result=[];
	for(var i=0; i<aEle.length; i++)
	{
		if(re.test(aEle[i].className))
		{
			result.push(aEle[i])
		}
	}
	return result;
}






