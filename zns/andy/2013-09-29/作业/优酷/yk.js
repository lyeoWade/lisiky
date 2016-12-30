// JavaScript Document


window.onload=function()
{
	 HeadOver();
     HeadOver2();
	 scrollTopX();
	 tabSwitch2('teleplayXXX','boxXXX','content_com_left fl showq','content_com_left fl hide','active');
	 tabSwitch2('tel_head_ul','tel_contab','line showq','line hide','activeaaa')
	 tabSwitch2('tel_tit_ul','boxX_3','content_com_left fl showq','content_com_left fl hide','active')
	 tabSwitch2('tel_head_dsj','tel_con_X','line showq','line hide','activeaaa')
	 tabSwitch2('tel_tit_XXX_3','wade_XXX','showq','hide','active')
	 
	 tabSwitch2('zongyi_tab_head','zongyi_tab','content_com_left fl showq','content_com_left fl hide','active')
	 
	 tabSwitch2('tel_head_XXX','wade_XX','line showq','line hide','activeaaa')
	 
	 tabSwitch2('yule_XXX','yule_li','showq','hide','active')
	 
	 tabSwitch2('music_X','music_list','showq','hide','active')
	 
	 tabSwitch2('music_rank_XX','wade_XXXX','line showq','line hide','activeaaa')
	 
	 tabSwitch2('fad_XXX','fad_X_3','showq','hide','active')
	 tabSwitch2('user_XXX','user_x','showq','hide','active')
	 
	 tabSwitch('small_tabSwitch1','center_bottom','show');
	 tabSwitch('original_title1','orig_content_left_top','showq');
	// tabSwitch('teleplayXXX','boxXXX','showq');
	HeadOver3('content_com_bottom_ul');
	HeadOver3('c_1');
	HeadOver3('c_2');
	HeadOver3('c_3');
	HeadOver3('c_4');
	HeadOver3('c_5');
	HeadOver3('d_1');
	HeadOver3('d_2');
	HeadOver3('d_3');
	HeadOver3('d_4');
	HeadOver3('d_5');
	HeadOver3('v_1');
	HeadOver3('v_2');
	HeadOver3('v_3');
	HeadOver3('v_4');
	HeadOver3('cc_1');
	HeadOver3('cc_2');
	HeadOver3('cc_3');
	HeadOver3('cc_4');
	HeadOver3('cc_5');
	
	HeadOver3('dd_1');
	HeadOver3('dd_2');
	HeadOver3('dd_3');
	HeadOver3('dd_4');
	HeadOver3('dd_5');
	
	
	HeadOver3('z_1');
	HeadOver3('z_2');
	HeadOver3('z_3');
	HeadOver3('z_4');
	HeadOver3('zz_1');
	HeadOver3('zz_2');
	HeadOver3('zz_3');
	HeadOver3('zz_4');
	
	HeadOver3('life_js_XXX');
	HeadOver3('fathion');
	HeadOver3('mab');
	HeadOver3('car_js_xxx');
	HeadOver3('tec');
	HeadOver3('game');
	
	tabMove();
}



function tabMove()
{
	var oTabMove=document.getElementById('tabMove');
	var oUl=oTabMove.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	var aBtn=oTabMove.getElementsByTagName('i')[0].parentNode;
	
	//alert(aBtn.parentNode.className);
	
	aBtn.onclick=function()
	{
		clearInterval(oUl.timer);
		oUl.timer=setInterval(function(){
			var iSpeed=5;
			if(oUl.offsetLeft<=-300)
			{
				clearInterval(oUl.timer);
			}else
			{
				iSpeed+=5;
				oUl.style.left=-iSpeed+oUl.offsetLeft+'px'
			}
			
			},30);
		
		
	}
}







function HeadOver()
{
	var oUl=document.getElementById('ul_log');
	var aLi=oUl.children;
	for(var i=0; i<aLi.length; i++)
	{
		aLi[i].onmouseover=function()
		{
			var a_Div=this.getElementsByTagName('div')[0];
			a_Div.style.display='block';
		}
		aLi[i].onmouseout=function()
		{
			var a_Div=this.getElementsByTagName('div')[0];
			a_Div.style.display='none';
		}
	}
}

function HeadOver2()
{
	var oUl=document.getElementById('dl_list');
	var aLi=oUl.children;
	for(var i=0; i<aLi.length; i++)
	{
		aLi[i].onmouseover=function()
		{
			var a_Div=this.getElementsByTagName('div')[0];
			a_Div.style.display='block';
		}
		aLi[i].onmouseout=function()
		{
			var a_Div=this.getElementsByTagName('div')[0];
			a_Div.style.display='none';
		}
	}
}
/*function HeadOver4(sClass)
{
	var oUl=getByClass(document,sClass)[0];
	var aLi2=oUl.children[0];
	aLi2.onmouseover=function()
			{
				//alert(this.className);
				var aA=this.children[1];
				var a_Div=this.children[2];
				a_Div.style.display='block';
				aA.style.display='none';
			}
			
			aLi2.onmouseout=function()
			{
				var aA=this.children[1];
				var a_Div=this.children[2];
				a_Div.style.display='none';
				aA.style.display='block';
			}
}
*/
function HeadOver3(sClass)
{
	var oUl=getByClass(document,sClass)[0];
	var aLi=oUl.children;
		for(var i=0; i<aLi.length; i++)
		{
			aLi[i].onmouseover=function()
			{
				//alert(this.className);
				var aA=this.children[1];
				var a_Div=this.children[2];
				a_Div.style.display='block';
				aA.style.display='none';
			}
			aLi[i].onmouseout=function()
			{
				var aA=this.children[1];
				var a_Div=this.children[2];
				a_Div.style.display='none';
				aA.style.display='block';
			}
		}
	
	
}



function tabSwitch(class1,class2,sClss1)
{
	var oSmallTabSwitch1=getByClass(document,class1)[0];
	var aChild=oSmallTabSwitch1.children;
	var oCenterBottom=getByClass(document,class2)[0];
	var aChild2=oCenterBottom.children;
	
	for(var i=0; i<aChild.length; i++)
	{
		aChild[i].index=i;
		aChild[i].onmouseover=function()
		{
			for(var i=0; i<aChild.length; i++)
			{
				
				aChild[i].className='';
				aChild2[i].className='hide';
			}
			this.className='active';
			aChild2[this.index].className=sClss1;
		}
	}
	
}

function tabSwitch2(class1,class2,sClass1,sClass2,sClass3)
{
	var oSmallTabSwitch1=getByClass(document,class1)[0];
	var aChild=oSmallTabSwitch1.children;
	var oCenterBottom=getByClass(document,class2)[0];
	var aChild2=oCenterBottom.children;
	
	for(var i=0; i<aChild.length; i++)
	{
		aChild[i].index=i;
		aChild[i].onmouseover=function()
		{
			
			//alert(123);
			for(var i=0; i<aChild.length; i++)
			{
				
				aChild[i].className='';
				aChild2[i].className=sClass2;
			}
			this.className=sClass3;
			aChild2[this.index].className=sClass1;
		}
	}
	
}




function getByClass(oParent,sClass)
{
		var aEle=oParent.getElementsByTagName('*');
		var result=[];
		var re=new RegExp('\\b'+sClass+'\\b','i');
		
		for(var i=0; i<aEle.length; i++)
		{
			if(re.test(aEle[i].className))
			{
				result.push(aEle[i]);
			}
		}
		
		return result;
}













function scrollTopX()
{
	var timer=null;
	
	var oBtn=document.getElementById('scrollTop');
	
	bindEvent(window,'scroll',function(){
		
		if(document.documentElement.scrollTop||document.body.scrollTop>50)
		{
			oBtn.style.display='block';
		}else
		{
			oBtn.style.display='none';
		}
		
		});
	
	var bKg=true;
	
	window.onscroll=function()
	{
		if(!bKg)
		{
			clearInterval(timer)
		}
		bKg=false;
	}
	
	oBtn.onclick=function()
	{
		Move(0);
	}
	
	function Move(iTarget)
	{
		clearInterval(timer);
		timer=setInterval(function(){
			
			var scrllTop=document.documentElement.scrollTop||document.body.scrollTop;
			var ispeed=(iTarget-scrllTop)/8;
			if(scrllTop<=iTarget)
			{
				clearInterval(timer);
			}else
			{
				bKg=true;
				document.documentElement.scrollTop=document.body.scrollTop=ispeed+scrllTop;
			}
			},30);
	}
}

function bindEvent(obj,events,fn)
{
	if(obj.addEventListener)
	{
		obj.addEventListener(events,fn,false);
	}else
	{
		obj.attachEvent('on'+events,fn);
	}
}
























































