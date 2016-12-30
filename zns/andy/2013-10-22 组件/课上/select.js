// JavaScript Document

function selected(name)
{
	var oS=document.getElementsByName(name)[0];
	
	// 创建div
	var oDiv = document.createElement('div');
	oDiv.className='selectDiv';
	oS.parentNode.insertBefore(oDiv,oS);
	
	//创建span
	
	var oSpan=document.createElement('span');
	oSpan.innerHTML=oS.options[oS.selectedIndex].text;
	oDiv.appendChild(oSpan);
	//创建Ul
	var oUl=document.createElement('ul');
	
	oDiv.appendChild(oUl);
	//创建li  ？？ 根据有多少个option的值创建多少个li
	//console.log(oS.options.length)
	for(var i=0; i<oS.options.length; i++)
	{
		var aLi=document.createElement('li');
		aLi.innerHTML=oS.options[i].text;
		oUl.appendChild(aLi)
		
		aLi.index=i;
		aLi.onclick=function()//同时要变化option的值
		{
			oSpan.innerHTML=this.innerHTML; 
			oUl.style.display='none';
			bKg=true;
			//oS.options[this.index].selected=true;
			oS.selectedIndex=this.index;
		}
		
	}
	
	
	//给oSpan加点击
	var bKg=true;
	oSpan.onclick=function()
	{
		if(bKg)
		{
			oUl.style.display='block';
			bKg=false;
		}else
		{
			oUl.style.display='none';
			bKg=true;	
		}
	}
	oSpan.onmousedown=function(){ return false}
	
	/*
	var oBox=document.getElementById('box');
	var oSpan=oBox.children[0];
	var oUl=oBox.children[1];
	var aLi=oUl.children;
	var bKg=true;
	oSpan.onclick=function()
	{
		if(bKg)
		{
			oUl.style.display='block';
			bKg=false;
		}else
		{
			oUl.style.display='none';
			bKg=true;
		}	
	}
	oSpan.onmousedown=function()
	{
		return false;
	}
	
	for(var i=0; i<aLi.length; i++)
	{
		aLi[i].index=i;
		aLi[i].onclick=function()
		{
			oSpan.innerHTML=this.innerHTML;
			oUl.style.display='none';
			bKg=true;
			oS.options[this.index].selected=true;
		}
	}*/
}

var oLink=document.createElement('link');
oLink.href='select.css';
oLink.rel='stylesheet';
oLink.type='text/css';
var oHead=document.getElementsByTagName('head')[0];
oHead.appendChild(oLink);
