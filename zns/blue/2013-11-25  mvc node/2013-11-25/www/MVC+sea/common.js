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
});