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
		
	//tab4();
	tabShow();
	ThereTab('there_tab','tabs_item_x');
	ThereTab('thereTab2','xxx')
	ThereTab('movie','movieShow')
	ThereTab('house','houseContent')
	ThereTab('money','moneyContent')
	ThereTab('edu','eduContent')
	ThereTab('readX','readX_1')
	ThereTab('tecloX','tecloX_1')
	ThereTab('phonX','phonX_1')
	ThereTab('historyX','historyX_1')
	ThereTab('nationalX','nationalX_1')
	ThereTab('seeGameX','seeGameX_1')
	ThereTab('metionX','metionX_1')
	ThereTab('styleX','styleX_1')
	ThereTab('photoX','photoX_1')
	ThereTab('collectionX','collectionX_1')
	ThereTab('LikeX','LikeX_1')
	ThereTab('videoX','videoX_1')
	ThereTab('tab_4X','tab_4X_1')
	taobao('taobaoX','taobaoX_1')
	taobao('taobaoX2','taobaoX2_1')
/**/	taobao('tttX','tttX_1')
	//taobao();
	taobaoAd();
	HistoryPic();
	jDbar()
	taoBaoBar();
	cnxh()
	wade();
	gameX('gameX','xxxxxxx','x_3')
	gameX('phonX','yingyong','yingyong3')
}

function wade()
{
	var oCT1=document.getElementById('c_t1');
	var oPrev=getByClass(oCT1,'photo_prev')[0];
	var oNext=getByClass(oCT1,'photo_next')[0];
	var oUl=oCT1.getElementsByTagName('ul')[0];
	var aLi=oUl.getElementsByTagName('li');
	
	
	var oCT2=document.getElementById('c_t2');
	var aBtn=oCT2.children;
	
	var oUl1=oCT2.getElementsByTagName('ul')[0];
	var aLi1=oUl1.getElementsByTagName('li');
	var n=0;
    aBtn[1].onclick=function()
	{
		 next(oUl1,aLi1)
	}
	aBtn[0].onclick=function()
	{
		prev(oUl1,aLi1)
	}
	oNext.onclick=function()
	{
		 next(oUl,aLi)
	}
	oPrev.onclick=function()
	{
		prev(oUl,aLi)
	}
	function next(objUl,objLi)
	{
		n++;
		objUl.style.left=-objLi[0].offsetWidth*n+'px';
		if(n==objLi.length-5)
		{
			n=0;
		}
	}
	
	function prev(objUl,objLi)
	{
		if(n==0)
		{
			n=objLi.length-5;
		}
		n--;
		objUl.style.left=-objLi[0].offsetWidth*n+'px';
	}
	
	
}



function cnxh()
{
	var oDrop=document.getElementById('drop');
	var aBtn=oDrop.getElementsByTagName('a');
	var iBtn=oDrop.getElementsByTagName('i');
	var oCon=document.getElementById('contentt');
	var iCon=oCon.children;
	
	var n=0;
	
	for(var i=0; i<iBtn.length; i++)
	{
		iBtn[i].index=i;
		iBtn[i].onmouseover=function()
		{
			n=this.index;
			move();
			
		}
	}
	
	function move()
	{
		for(var i=0; i<iBtn.length; i++)
			{
				iCon[i].className='comList hide';
				iBtn[i].className='';
			}
			iBtn[n].className='active';
			iCon[n].className='comList';
			
	}
	
	aBtn[1].onclick=function()
	{
		n++;
		if(n==iBtn.length)
		{
			n=0;
			
			
		}
		move();
	}
	
	aBtn[0].onclick=function()
	{
		
		if(n==0)
		{
			//console.log(123);
			n=iBtn.length;
		}
		n--;
		move();
	}
}


function taoBaoBar()
{
	var oTaoBao=document.getElementById('taobaoBar');
	var oTbTab=getByClass(oTaoBao,'tb_tab')[0];
	var aDiv=oTbTab.children;
	
	var oTbNb=getByClass(oTaoBao,'tb_nb')[0];
	var aBtn=oTbNb.children;
	
	for(var i=0; i<aBtn.length; i++)
	{
		aBtn[i].index=i;
		aBtn[i].onmouseover=function()
		{
			for(var i=0; i<aBtn.length; i++)
			{
				aDiv[i].className='tb_frame clearfix';
				aBtn[i].className='';	
			}
			this.className='active';
			aDiv[this.index].className='tb_frame clearfix show';
		}
	}
	
	
}

function jDbar()
{
	var oJd=document.getElementById('jd');
	var oPrev=getByClass(oJd,'jd_showPrev')[0];
	var oNext=getByClass(oJd,'jd_showNext')[0];
	var oCon=getByClass(oJd,'jd_container')[0];
	var oUl=oCon.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	
	var iNow=0;
	//alert(aLi[0].offsetWidth)
	oNext.onclick=function()
	{
		iNow++;
		oUl.style.left=-iNow*aLi[0].offsetWidth+'px';
		if(iNow==aLi.length-3)
		{
			iNow=0
		}
	}
	
	oPrev.onclick=function()
	{
		if(iNow==0)
		{
			iNow=aLi.length-3;
		}
		iNow--;
		oUl.style.left=-iNow*aLi[0].offsetWidth+'px';
		
		document.title=iNow;
	}
}

function gameX(id,sClass1,sClass2)
{
	var oGameX=document.getElementById(id);
	var oX=getByClass(oGameX,sClass1)[0];
	var aSpan=oX.children;
	var oX3=getByClass(oGameX,sClass2)[0];
	var oCon=oX3.getElementsByTagName('div');
	for(var i=0; i<aSpan.length; i++)
	{
		aSpan[i].index=i;
		aSpan[i].onmouseover=function()
		{
			for(var i=0; i<aSpan.length; i++)
			{
				
				oCon[i].className='tabs_item';
				aSpan[i].className='contNav_item';
			}
			this.className='contNav_item active';
			oCon[this.index].className='tabs_item show';
		}
	}
}


function change()
{
		var oPlece=document.getElementById('aplece');
		var oSpanp=oPlece.getElementsByTagName('span')[0];
		var aInput=oPlece.getElementsByTagName('input')[0];
		var oListp=document.getElementById('list_p');
		var aLi=oListp.getElementsByTagName('ul')[0].getElementsByTagName('a');
		
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

function taobao(id,sClass)
{
	var oThereTab=document.getElementById(id);
	var oUl=oThereTab.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	var aTabsItem=getByClass(oThereTab,sClass)[0].getElementsByTagName('li');
	var iNow=0;
	var timer=null;
	for(var i=0; i<aLi.length; i++)
	{
		aTabsItem[i].index=i;
		aTabsItem[i].onmouseover=function()
		{
			auto();
			iNow=this.index;
		}
	}
	
	function auto()
	{
		for(var i=0; i<aTabsItem.length; i++)
			{
					aTabsItem[i].className='';			
			}
			aTabsItem[iNow].className='active';
			
			oUl.style.left=-iNow*aLi[0].offsetWidth+'px';
	}
	
	timer=setInterval(DoMove,1000);
	oThereTab.onmouseover=function()
	{
		clearInterval(timer);
	}
	oThereTab.onmouseout=function()
	{
		timer=setInterval(DoMove,1000);
	}
	function DoMove()
	{
		if(iNow==aTabsItem.length-1)
		{
			iNow=0;
		}else
		{
			iNow++;
		}
		
		auto();
	}
	
}


function taobaoAd()
{
	var oBox=document.getElementById('taobaoSide');
	var aBtn= getByClass(oBox,'taobao_nb')[0].children;
	var aImg= getByClass(oBox,'taobaoImg')[0].children;
	var aBar= getByClass(oBox,'taobaoBar')[0];
	var arr=[['屌丝逆袭之地','123'],['梵蒂冈房价高i','884'],['给很感慨','876'],['录音梵蒂冈','345'],['大大大改哈狗帮','1245'],['u哟佛挡杀佛','2314'],['大锅饭hdv人','231'],['u偶if的郭德纲的人员','6879'],['撒飒飒','46357'],['哈佛很深刻放大镜','345']];
	for(var i=0; i<aBtn.length; i++)
	{
		aBtn[i].index=i;
		aBtn[i].onmouseover=function()
		{
			for(var i=0; i<aBtn.length; i++)
			{
				aBtn[i].className='';
				aImg[i].className='';
			}
			
			this.className='active';
			aImg[this.index].className='show';
			aBar.innerHTML='<h3>'+arr[this.index][0]+'</h3><span>$'+arr[this.index][1]+'</span>';
		}
	}
}

function HistoryPic()
{
	var oHisTory=document.getElementById('history_pic');
	var oImgbox=getByClass(oHisTory,'contList_Imgbox')[0];
	var aImg=oImgbox.children;
	var oLeft=getByClass(oHisTory,'contList_leftbtn')[0];
	var oRight=getByClass(oHisTory,'contList_rightbtn')[0];
	var iNow=0;
	oRight.onclick=function()
	{
		iNow++;
		oImgbox.style.left=-iNow*aImg[0].offsetWidth+'px';
		
		if(iNow==aImg.length-1)
		{
			iNow=-1;
		}
	}
	oLeft.onclick=function()
	{
		
		if(iNow==0)
		{
			iNow=aImg.length;
		}
		iNow--;
		oImgbox.style.left=-iNow*aImg[0].offsetWidth+'px';
		
		
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






