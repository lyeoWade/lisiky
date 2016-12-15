//版权 北京智能社©, 保留所有权利
function json2url(json)  
{
	var arr=[];
	
	for(var i in json)
	{
		arr.push(i+'='+json[i]);
	}
	
	return arr.join('&');
}

function jsonp(url, data, fnSucc)
{
	var fnName='jsonp_'+Math.random();// 给script标签起一个随机的名字  没有缓存
	fnName=fnName.replace('.', ''); //上面的随机数包含了.   这里将.去掉
	
	data.cb=fnName;  //规定cb的函数名
	
	window[fnName]=function (json) 
	{
		fnSucc && fnSucc(json); //如果成功就返回一个函数  具体的dom操作
		
		oHead.removeChild(oS);  //并且用完script标签之后将其删掉
	};
	
	var str=url+'?'+json2url(data);  //拼接script的地址  url=http://suggestion.baidu.com/su?  
	
	var oS=document.createElement('script');
	
	oS.src=str;
	
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}