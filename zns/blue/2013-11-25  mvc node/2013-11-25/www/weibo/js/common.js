//版权 北京智能社©, 保留所有权利

define(function (require, exports, module){
	exports.jsonp=function (url, data, cbName, fnSucc)
	{
		var fnName='jsonp_'+Math.random();
		fnName=fnName.replace('.', '');
		
		window[fnName]=function ()
		{
			fnSucc.apply(null, arguments);
			
			oHead.removeChild(oS);
			window[fnName]=null;
		};
		
		data[cbName]=fnName;
		var arr=[];
		for(var i in data)
		{
			arr.push(i+'='+data[i]);
		}
		
		var oS=document.createElement('script');
		
		oS.src=url+'?'+arr.join('&');
		
		var oHead=document.getElementsByTagName('head')[0];
		oHead.appendChild(oS);
	};
	exports.ajax=function (url, fnSucc, fnFaild)
	{
		//1.创建Ajax对象
		if(window.XMLHttpRequest)
		{
			var oAjax=new XMLHttpRequest();
		}
		else
		{
			var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		//2.连接服务器（打开和服务器的连接）
		oAjax.open('GET', url, true);
		
		
		//3.发送
		oAjax.send();
		
		//4.接收
		oAjax.onreadystatechange=function ()
		{
			if(oAjax.readyState==4)
			{
				if(oAjax.status==200)
				{
					//alert('成功了：'+oAjax.responseText);
					fnSucc(oAjax.responseText);
				}
				else
				{
					//alert('失败了');
					if(fnFaild)
					{
						fnFaild();
					}
				}
			}
		};
	};
	exports.json2url=function (json)
	{
		json.t=Math.random();
		
		var arr=[];
		for(var i in json)
		{
			arr.push(i+'='+json[i]);
		}
		
		return arr.join('&');
	};
	exports.parseJson=function (str)
	{
		return (new Function('return '+str))();
	};
	exports.dupEle=function (obj, data)
	{
		var oTmp=document.createElement('div');
		
		oTmp.innerHTML=obj.outerHTML.replace(/\{\$[\w\-]+\}/g, function (s){
			var name=s.substring(2, s.length-1);
			
			return data[name];
		});
		
		return oTmp.children[0];
	};
});