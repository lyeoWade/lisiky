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
	var fnName='wade'+Math.random();// 随机用户名
	
	fnName=fnName.replace('.',''); // 小数点去掉
	date.cb=fnName;// 变成回调函数
	window[fnName]=function(json) // 
	{
		fns&fns(json);
		oHead.removeChild(oS);
	}
	var str=url+'?'+jsonUrl(date); // 拼地址
	var oS=document.createElement('script'); // 
	oS.src=str;
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}
