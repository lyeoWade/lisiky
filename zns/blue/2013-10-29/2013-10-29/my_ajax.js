//版权 北京智能社©, 保留所有权利

function ajax(url, fnSucc, fnFaild)
{
	//1.创建Ajax对象
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHttp');
	}
	
	//2.连接
	//open('方法', 'url', 异步)
	oAjax.open('get', url, true);
	
	//3.发送请求
	oAjax.send();
	
	//4.接收数据
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)		//完成
		{
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				fnSucc && fnSucc(oAjax.responseText);
			}
			else
			{
				fnFaild && fnFaild();
			}
		}
	};
}