// JavaScript Document
//http://suggestion.baidu.com/su?wd=a&cb=json_093344348622486


function jsonUrl(json)
{
	var arr=[];
	
	for(var i in json)
	{
		arr.push(i+'='+json[i]);
	}
	return arr.join('&');
}


function jsonp(url,date,fns)
{
	
	var fnName='wade'+Math.random();
	
	fnName=fnName.replace('.','');
	date.cb=fnName;
	window[fnName]=function(json)
	{
		fns&fns(json);
		oHead.removeChild(oS);
	}
	var str=url+'?'+jsonUrl(date);
	var oS=document.createElement('script');
	oS.src=str;
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}









