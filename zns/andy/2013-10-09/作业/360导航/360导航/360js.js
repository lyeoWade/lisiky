
// JavaScript Document

window.onload=function()
{
	navMove();
	login();
	Otimer()
	sideTab('sider_Warp')
	sideTab('sb')
	sideTab('sbnishi')
	sideTab('sbns')
	search1();
	searchlist();
	fxnxh();
	ssq();
	bottom2();
	icodown();
	Skin();
	backTop();
	browserCheck()
	addsiTe()
}

function addsiTe()
{
	
	var oCySet=document.getElementById('cy_set2');
	var oAppend=document.getElementById('append_li');
	
	var oUloAppend=oCySet.getElementsByTagName('ul')[0];
	var aLiUl=oUloAppend.children;
	
	var oAppendBtn=getByClass(document,'append_btn')[0];
	var oMark=document.getElementById('mark');
	var oLayer=getByClass(document,'layer')[0];
	var oLayerTop=getByClass(oLayer,'lay_top')[0];
		oLayerTop.onmousedown=function(ev)
	{
		var oEvent=ev||event;
		var disX=oEvent.clientX-oLayer.offsetLeft-500;
		var disY=oEvent.clientY-oLayer.offsetTop;
		document.onmousemove=function(ev)
		{
			var oEvent=ev||event;
			oLayer.style.left=oEvent.clientX-disX+'px';
			oLayer.style.top=oEvent.clientY-disY+'px';
			
			return false;
		}
		document.onmouseup=function()
		{
			document.onmousemove=null;
			document.onmouseup=null;
		}
		return false;
	}
	
	var oClose=getByClass(oLayer,'close')[0];
	
	var oSiteName=getByClass(oLayer,'siteName')[0];
	var oSiteUrl=getByClass(oLayer,'siteUrl')[0];
	var oSiteBtn=getByClass(oLayer,'siteBtn')[0];
	var oMySate=getByClass(oLayer,'mySate')[0];
	var oUlMy=oMySate.getElementsByTagName('ul')[0];
	var aP=oUlMy.getElementsByTagName('p')[0];
	oSiteBtn.onclick=function()
	{
		var aLi=document.createElement('li');
		var aLi2=document.createElement('li');
		aP.innerHTML='';
		aLi2.innerHTML+='<a href="http://'+oSiteUrl.value+'">'+oSiteName.value+'</a>';
		aLi.innerHTML+='<a href="http://'+oSiteUrl.value+'">'+oSiteName.value+'</a>';
		oUlMy.appendChild(aLi);
		
		if(aLiUl.length==0)
		{
			oUloAppend.appendChild(aLi2);
		}else
		{
			oUloAppend.insertBefore(aLi2,aLiUl[0]);
		}
		
		
	}
	

	
	onFocus(oSiteName,'如:360搜索');
	onFocus(oSiteUrl,'如：www.so.com');

	
	oAppendBtn.onclick=function()
	{
		oMark.style.display='block';
		oLayer.style.display='block';
		//oSiteName.focus();
	}
	oClose.onclick=function()
	{
		oMark.style.display='none';
		oLayer.style.display='none';
	}
	
	
}



function fadeIn(obj){
	
	var iCur = getStyle(obj,'opacity');
	if(iCur==1){ return false; }
	
	var value = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = 5;
		if(value == 100){
			clearInterval(obj.timer);
		}
		else{
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}
	},30);
	
};

 function fadeOut(obj){
	
	var iCur = getStyle(obj,'opacity');
	if(iCur==0){ return false; }
	
	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = -5;
		if(value == 0){
			clearInterval(obj.timer);
		}
		else{
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity='+value+')';
		}
	},30);
	
};



function browserCheck()
{
	var oBrowser=window.navigator.userAgent;
	var oSetHome=document.getElementById('setHome');
	
	oSetHome.onclick=function()
	{
		if(oBrowser.indexOf("MSIE")!=-1)
		{
			oSetHome.href="Inde/360home.html#wade";
		}else if(oBrowser.indexOf("Chrome")!=-1)
		{
			oSetHome.href="Inde/360home.html#cb";
		}else if(oBrowser.indexOf("Firefox")!=-1)
		{
			oSetHome.href="Inde/360home.html#LBj";
		} 
		
	}
}


function Skin()
{
	var oSkinX=document.getElementById('skinX');
	var oChangeSkin=document.getElementById('changeSkin');
	var oScrollUp=getByClass(oChangeSkin,'scrollUp')[0];
	
	var bKg=false;
	
	oSkinX.onclick=function()
	{
		if(bKg)
		{
			oChangeSkin.style.display='none';
			bKg=false;
		}
		else
		{
			oChangeSkin.style.display='block'; 
			bKg=true;
		}
		
	}
	
	oScrollUp.onclick=function()
	{
		oChangeSkin.style.display='none';
		bKg=false;
	}
	
	var arrBg=['img/bgSkin.png','img/bgSkin2.png','img/bgSkin3.png','img/bgSkin4.png','img/bgSkin5.png',
	'img/bgSkin6.png','img/bgSkin7.png','img/bgSkin8.png','img/bgSkin9.png'];
	
	var oHeader=document.getElementById('header');
	var oList1=getByClass(oChangeSkin,'List1')[0];
	var oNobg=getByClass(oChangeSkin,'nobg')[0];
	var aLi=oList1.getElementsByTagName('li');
	for(var i=0; i<aLi.length; i++)
	{
		aLi[i].index=i;
		aLi[i].onclick=function()
		{
			oHeader.style.background='url(img/bgSkin_'+(this.index+1)+'.png)';
			//background:url(img/bgSkin_1.png)
		}
	}
	oNobg.onclick=function()
	{
		oHeader.style.background='';	
	}
	
}

function backTop()
{
	var oDate=document.getElementById('beate');
	var oBackTop=document.getElementById('backTop');
	var timer=null;
	
	myEvent(window,'scroll',function(){
		
		if(document.documentElement.scrollTop||document.body.scrollTop<=100 ||
		 document.documentElement.scrollTop||document.body.scrollTop>=1600)
		{
			oBackTop.style.display='none';
		}else
		{
			oBackTop.style.display='block';
		}
		
		});
	var bKg=true;
	window.onscroll=function()
	{
		if(!bKg)
		{
			clearInterval(timer);
		}
		bKg=false;
	}
	
	oBackTop.onclick=function()
	{
		move(0)
	}
/**/oDate.onclick=function()
	{
		//alert(123)
		move(1000)
	}
	function move(Target)
	{
		clearInterval(timer);
		
		timer=setInterval(function(){
			
			var oScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			
			var iSpeed=(Target -oScrollTop)/8;
			
			if(oScrollTop<=Target)
			{
				clearInterval(timer);
			}else
			{
				bKg=true
				document.documentElement.scrollTop=document.body.scrollTop=iSpeed+oScrollTop;	
			}
			
			},30);
		
	}
}

function icodown()
{
	var oIco=getByClass(document,'ico_down');
	var len=oIco.length; 
	var timer=null;
	
	for(var i=0; i<len; i++)
	{
		oIco[i].onmouseover=function()
		{
			clearInterval(timer);
			var a_Div=this.children[0];
			
			a_Div.className='ico_list';
		}
		
		oIco[i].onmouseout=function()
		{
			var a_Div=this.children[0];
			timer=setTimeout(function(){
				a_Div.className='ico_list hide';
				},500);
			
		}
	}
}




function bottom2()
{
	var oBottom=document.getElementById('bottom2');
	var oHeadList=getByClass(oBottom,'head_list')[0];
	var oLiList=oHeadList.getElementsByTagName('ul')[0].children;
	var oBWarp=getByClass(oBottom,'bottom_warp')[0];
	var oChild=oBWarp.children;
	
	var oPrev=getByClass(oBottom,'bottom_prev')[0];
	var oNext=getByClass(oBottom,'bottom_next')[0];
	var len=oLiList.length;
	
	var iNow=0;
	
	for(var i=0; i<len; i++)
	{
		oLiList[i].index=i;
		oLiList[i].onclick=function()
		{
			iNow=this.index;
			show()
		}
	}
	oPrev.onclick=function()
	{
		if(iNow==0)
		{
			iNow=oLiList.length-1;
		}else
		{
			iNow--;
		}
		show()
	}
	oNext.onclick=function()
	{
		if(iNow==oLiList.length-1)
		{
			iNow=0;
		}else
		{
			iNow++;
		}
		
		show()
	}
	
	function show()
	{
		for(var i=0; i<len; i++)
		{
			oLiList[i].className='';
			oChild[i].className='bottom_item hide';
		}
		oLiList[iNow].className='active'
		oChild[iNow].className='bottom_item show';
	}
}
function ssq()
{
	var oBox=document.getElementById('wade_bing');
	var oUl=oBox.children[0].children[0];
	var aLi=oUl.children;
	var oWarpBox=getByClass(oBox,'warp_box')[0];
	var oUlW=oWarpBox.getElementsByTagName('ul');
	var len=aLi.length;
	for(var i=0; i<len; i++)
	{
		aLi[i].index=i;
		aLi[i].onclick=function()
		{
			if(this.className!='active')
			{
				for(var i=0; i<len; i++)
				{
					oUlW[i].className='cp_ssq hide';
					aLi[i].className='';
				}
				this.className='active';
				oUlW[this.index].className='cp_ssq show';
				return false;
			}
			
		}
	}
	
	var aBtn=document.getElementById('cp_btn');
	var oNum=getByClass(oBox,'number')[0];
	var oP=oNum.getElementsByTagName('p')[0];
	var odiv=oNum.getElementsByTagName('div')[0];
	var oRed=getByClass(oNum,'colorRed')[0];
	
	aBtn.onclick=function()
	{
		var timer=setInterval(function(){
			
			var cparr=[];
			while(cparr.length<6)
			{
				var num=tozero(toran(1,32));
				if(!findarr(num,cparr))
				{
					
					cparr[cparr.length]=num;	
				}
				
			}
			oP.innerHTML='<span>'+cparr.join('</span><span>')+'</span>';
			odiv.innerHTML=tozero(toran(1,16));
			
			},30);
			
			setTimeout(function(){
				clearInterval(timer);
				},300);
	}
}

/*发现你喜欢*/
function fxnxh()
{
	var oFxnxh=document.getElementById('fxnxh');
	var oSeeBtn=getByClass(oFxnxh,'see_btn')[0];
	var oPrev=oSeeBtn.children[0];
	var oNext=oSeeBtn.children[2];
	
	var aLiOl=oSeeBtn.children[1].getElementsByTagName('li');
	
	var oSeeBox=getByClass(oFxnxh,'see_box')[0];
	var oDiv=oSeeBox.children;
	
	var len=aLiOl.length;
	
	var iNow=0;
	var iNow2=0;
	for(var i=0; i<len; i++)
	{
		aLiOl[i].index=i;
		aLiOl[i].onclick=function()
		{
			iNow=this.index;
			show()
			aaa();
		}
		aaa();
	}
	

	
	oPrev.onclick=function()
	{
		if(iNow==oDiv.length-1)
		{
			iNow=0;
		}else
		{
			iNow++;
		}
		show();
		aaa();	
	}
	function show()
	{
		for(var i=0; i<len; i++)
			{
				oDiv[i].className='item hide';
				aLiOl[i].className='';
			}
			oDiv[iNow].className='item show';
			aLiOl[iNow].className='active';
	}
	oNext.onclick=function()
	{
		if(iNow==0)
		{
			iNow=oDiv.length-1;
		}else
		{
			iNow--;
		}
		show();
		aaa();
	}
	
		function aaa()
	{
		if(oDiv[iNow].className=='item show')
		{
			var a_Div=oDiv[iNow].children;
			for(var j=0; j<a_Div.length; j++)
			{
				a_Div[j].onmouseover=function()
				{
					var oHyh=getByClass(this,'hyh')[0];
					var oUlList=getByClass(this,'list_ul')[0];
					var oUlX=oUlList.children;
					oHyh.onclick=function()
					{
						if(iNow2==oUlX.length-1)
						{
							iNow2=0;
						}else
						{
							iNow2++;
						}
						for(var k=0; k<oUlX.length; k++)
						{
							oUlX[k].className='hide';
						}
						oUlX[iNow2].className='show';
					}
				}
			}
		}
	}
}


function searchlist()
{
	var oSearchB=document.getElementById('search_b');
	var oList_x=getByClass(oSearchB,'list_x')[0];
	var oForm=document.getElementById('form2');
	var oSubTxt=getByClass(oForm,'ser_text')[0];
	var oSub=getByClass(oForm,'btn_sub')[0];
	
	
	var oList=getByClass(oSearchB,'list_xxxx')[0];
	var oListABtn=oList.children;
	var oIcoBtn=getByClass(oSearchB,'ico_btn')[0];
	
	var oI=oIcoBtn.getElementsByTagName('i')[0];
	var oSearchIco=getByClass(oSearchB,'secrch_ico')[0];
	var Ico_child=oSearchIco.children[0];
	//alert(Ico_child.className);
	var bKg=true;
	oIcoBtn.onclick=function(ev)
	{
		
		
		if(bKg==true)
		{	
			oList.style.display='block';
			oI.className='up_ico';
			bKg=false;
		}else
		{
			oI.className='down_ico';
			bKg=true;
			oList.style.display='none';
		}
		var oEvent=ev||event;
		oEvent.cancelBubble=true;
	}
	
	
	var arr=[
		{
			className:'zonghe_bg',
			action:'http://so.360.cn/s',
			name:'q',
			subName:'综合搜索'
		},
		{
			className:'youdao_bg',
			action:'http://www.youdao.com/search',
			name:'q',
			subName:'有道搜索'
		},
		{
			className:'a360_bg',
			action:'http://www.so.com/s',
			name:'q',
			subName:'360搜索'
		},
		{
			className:'bing_bg',
			action:'http://cn.bing.com/search',
			name:'q',
			subName:'必应搜索'
		},
		{
			className:'google_bg',
			action:'http://www.google.com.hk/search',
			name:'q',
			subName:'谷歌搜索'
		},
		{
			className:'baidu_bg',
			action:'http://www.baidu.com/s',
			name:'wd',
			subName:'百度搜索'
		}
		
		]
	
	var len=oListABtn.length;
	for(var i=0; i<len; i++)
	{
		oListABtn[i].index=i;
		oListABtn[i].onclick=function()
		{
			var oIac=this.getElementsByTagName('i')[0];
			Ico_child.className=arr[this.index]['className'];//.className;
			oForm.action=arr[this.index]['action'];
			oSubTxt.name=arr[this.index]['name'];
			oSub.value=arr[this.index]['subName'];
			if(bKg==false)
			{
				oList.style.display='none';
				bKg=true;
			}else
			{
				oList.style.display='block';
				bKg=false;
			}
			
			//alert(arr[this.index]['className'])
		}
	}
	

	
	myEvent(document,'click',function(){
		
		oList.style.display='none';
		
		oI.className='down_ico';
		
		bKg=true;
		});
	
}

function search1()
{
	var oForm=document.getElementById('form2');
	var oSer=getByClass(oForm,'ser_text')[0];
	var oDiv=getByClass(oForm,'search_rank')[0];
	var aA=oDiv.getElementsByTagName('a');
	oSer.onfocus=function()
	{
		
		oDiv.style.display='block';
		for(var i=0; i<aA.length; i++)
		{
			aA[i].onclick=function(ev)
			{
				var oEvent=ev||event;
				var oSpan=this.getElementsByTagName('span')[0];
				oSer.value=oSpan.innerHTML;
				oDiv.style.display='none';
				oEvent.cancelBubble=true;
			}

		}
	
	}
	oSer.onclick=function(ev)
	{
		var oEvent=ev||event;
		oEvent.cancelBubble=true;
	}
	

	
	myEvent(document,'click',function(){
		
		oDiv.style.display='none';
		
		});
	
}


function sideTab(id)
{
	var oSiderWarp=document.getElementById(id);
	var oWarpHead=getByClass(oSiderWarp,'warp_head')[0];
	var oWarpBox=getByClass(oSiderWarp,'warp_box')[0];
	var aCon=oWarpBox.children;
	var aBtnLi=oWarpHead.getElementsByTagName('li');
	//alert(aCon.length);
	var timer=null;
	var iNow=0;
	var len=aBtnLi.length;
	for(var i=0; i<len; i++)
	{
		aBtnLi[i].index=i;
		aBtnLi[i].onclick=function occ()
		{
			if(this.className!='active')
			{
				iNow=this.index;
				gon();
				return false;
			}
			
		}
	}
	
	
	
	function gon()
	{
		for(var i=0; i<len; i++)
		{
			aCon[i].className='warp_w hide';
			aBtnLi[i].className=''	
		}
		aBtnLi[iNow].className='active';
		aCon[iNow].className='warp_w show'
	}
	
	var iNow2=0;
	var timer2=null;
	for(var i=0; i<aCon.length; i++)
	{
		aCon[i].onmouseover=function()
		{
			var oPrve=getByClass(this,'pic_prve')[0];
			var oNext=getByClass(this,'pic_next')[0];
			var oPicTab=getByClass(this,'pic_tab')[0];
			var oUl=oPicTab.getElementsByTagName('ul')[0];
			var aLi=oUl.children;
			if(oPicTab)
			{
				oPicTab.onmouseover=function()
					{
						oNext.className='pic_next op4';
						oPrve.className='pic_prve op4';
						oNext.onclick=function()
						{
							if(iNow2==0)
							{
								iNow2=aLi.length-1;
							}else
							{
								iNow2--
							}
							
							oUl.style.left=-iNow2*aLi[0].offsetWidth+'px';	
						}
						oPrve.onclick=function()
						{
							if(iNow2==aLi.length-1)
							{
								iNow2=0;
							}else
							{
								iNow2++
							}
							oUl.style.left=-iNow2*aLi[0].offsetWidth+'px';;
							
						}
					}
					oPicTab.onmouseout=function()
					{
						oNext.className='pic_next';
						oPrve.className='pic_prve';
					}
			}
		}
				
	}

	timer=setInterval(autoPlay,10000);
	oSiderWarp.onmouseover=function()
	{
		clearInterval(timer);
	}
	oSiderWarp.onmouseout=function()
	{
		timer=setInterval(autoPlay,10000);
	}
	
	function autoPlay()
	{
		if(iNow==aBtnLi.length-1)
		{
			iNow=0;
		}else
		
		{
			iNow++;
		}
		gon();
		
	}
				
	
}


function Otimer()
{
	
	var oTimer=getByClass(document,'timer')[0];
	var oRili=getByClass(document,'rili')[0];

	setInterval(clock,1000)
	clock();
	function clock()
	{
		var oDate=new Date();
	
		var oMonth=tozero(oDate.getMonth()+1);
		var oDay=tozero(oDate.getDate());
		var oHours=tozero(oDate.getHours());
		var oMinute=tozero(oDate.getMinutes());
		var oSe=tozero(oDate.getSeconds());
	//	+oSe+'秒'
		oTimer.getElementsByTagName('span')[0].innerHTML=oMonth+'月'+oDay+'日'+oHours+'时'+oMinute+'分';
		oRili.children[0].innerHTML=oMonth+'月';
		oRili.children[1].innerHTML=oDay+'日';
	}
	
}

/*登录*/
function login()
{
	var oEmial=document.getElementById('emaill');
	var oText=getByClass(oEmial,'text')[0];
	var oEmailActive=getByClass(oEmial,'email_active')[0];
	var oTrue=getByClass(oEmial,'true')[0];
	
	
	oText.onclick=function(ev)
	{
		var oEvent=ev||event;
		oEmailActive.style.display='block';
		oTrue.focus();
			
		oEvent.cancelBubble=true;
	}
	oEmailActive.onclick=function(ev)
	{
		var oEvent=ev||event;
		oEvent.cancelBubble=true;
	}
	myEvent(document,'click',function(){
		oEmailActive.style.display='none';
		})
}
/*菜单*/
function navMove()
{
	var oNav=document.getElementById('nav_ul');
	var aLi=oNav.getElementsByTagName('li');
	var oDiv=oNav.getElementsByTagName('div');
	var leg=aLi.length;
	
	for(var i=0; i<oDiv.length; i++)
	{
		var a=toran(1,225)
		var b=toran(1,225);
		var c=toran(1,225);
		oDiv[i].style.background='rgb('+a+','+b+','+c+')';
	}
	for(var i=0; i<leg; i++)
	{
		aLi[i].index=i;
		aLi[i].timer=null;
		aLi[i].top=false; //表示还没有到达顶部
		
		document.onkeydown=function(ev)
		{
			var oEvent=ev||event;
				if(oEvent.keyCode>48 && oEvent.keyCode<58)
				{
					aa(aLi[oEvent.keyCode-49]); // aLi[i]=aLi[oEvent.keyCode-49]
				}	
			
		}
		
		document.onkeyup=function(ev)
		{
			var oEvent=ev||event;
				if(oEvent.keyCode>48 && oEvent.keyCode<58)
				{
					down(aLi[oEvent.keyCode-49])
				}	
		}
		
		
		
		aLi[i].onmouseover=function()
		{
			aa(this);
		}
		aLi[i].onmouseout=function()
		{
			down(this)
		}
		function aa(li)
		{
			var a_Div=li.getElementsByTagName('div')[0];
			clearInterval(li.timer)
			var _this=li;
			li.timer=setInterval(function(){
				if(a_Div.offsetTop==0)
				{
					clearInterval(_this.timer)
					a_Div.style.top='0';
					_this.top=true;
				}else
				{
					a_Div.style.top=a_Div.offsetTop-4+'px';
				}
				
				},30);
					
		};
		
		function down(li)
		{
			var iSpeed;
			if(li.top!=true)
			{
				iSpeed=-4;
			}else
			{
				iSpeed=4;
			}
			var a_Div=li.getElementsByTagName('div')[0];
			clearInterval(li.timer)
			var _this=li;
			li.timer=setInterval(function(){
				
				if(a_Div.offsetTop==36)
				{
					clearInterval(_this.timer)
					_this.top=false;
				}else
				{
					a_Div.style.top=a_Div.offsetTop+iSpeed+'px'
					console.log('aaaa')
				}
				
				if(a_Div.offsetTop<=0)
				{
					iSpeed=4;
				}
				
				},30);
		}
		
	
	}
}

/*function navMove()
{
	var oNav=document.getElementById('nav_ul');
	var aLi=oNav.getElementsByTagName('li');
	var oDiv=oNav.getElementsByTagName('div');
	var leg=aLi.length;
	
	for(var i=0; i<oDiv.length; i++)
	{
		var a=toran(1,225)
		var b=toran(1,225);
		var c=toran(1,225);
		oDiv[i].style.background='rgb('+a+','+b+','+c+')';
	}
	for(var i=0; i<leg; i++)
	{
		aLi[i].index=i;
		aLi[i].timer=null;
		aLi[i].top=false; //表示还没有到达顶部
		
		
		aLi[i].onmouseover=function()
		{
			var a_Div=this.getElementsByTagName('div')[0];
			clearInterval(this.timer)
			var _this=this;
			this.timer=setInterval(function(){
				if(a_Div.offsetTop==0)
				{
					clearInterval(_this.timer)
					a_Div.style.top='0';
					_this.top=true;
				}else
				{
					a_Div.style.top=a_Div.offsetTop-4+'px';
				}
				},30);
		}
		

		aLi[i].onmouseout=function()
		{
			var iSpeed;
			if(this.top!=true)
			{
				iSpeed=-4;
			}else
			{
				iSpeed=4;
			}
			
			
			var a_Div=this.getElementsByTagName('div')[0];
			clearInterval(this.timer)
			var _this=this;
			this.timer=setInterval(function(){
				
				if(a_Div.offsetTop==36)
				{
					clearInterval(_this.timer)
					_this.top=false;
				}else
				{
					a_Div.style.top=a_Div.offsetTop+iSpeed+'px'
					//console.log('aaaa')
				}
				
				if(a_Div.offsetTop<=0)
				{
					iSpeed=4;
				}
				
				},30);
			//down(this)
		}
	}
}*/
































//去从
function findarr(n,arr)
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


//事件绑定

function myEvent(obj,events,fn)
{
	if(obj.attachEvent)
	{
		obj.attachEvent('on'+events,fn);
	}else
	{
		obj.addEventListener(events,fn,false)
	}
}



//补0

function tozero(n){return n<10?'0'+n:n}
//取随机数
function toran(n,m)
{
	return parseInt(Math.random()*(m-n+1)+n);
}
//获取class
function getByClass(oParent,sClass)
{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sClass);
	}else
	{
		var aEle=oParent.getElementsByTagName('*');
		var re=new RegExp('\\b'+sClass+'\\b','i');
		var arr=[];
		var len=aEle.length;
		for(var i=0; i<len; i++)
		{
			if(re.test(aEle[i].className))
			{
				arr.push(aEle[i])
			}
		}
		
		return arr;
	}
}


/*行间*/
function getStyle(obj,attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}else
	{
		return getComputedStyle(obj,false)[attr]
	}
}

function onFocus(obj,str)
{
	obj.onfocus=function()
	{
		if(this.value==str)
		{
			this.value='';
		}
	}
	
	obj.onblur=function()
	{
		if(this.value=='')
		{
			this.value=str;
		}
	}
	
}