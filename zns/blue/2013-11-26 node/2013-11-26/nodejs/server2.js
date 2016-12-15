//版权 北京智能社©, 保留所有权利

var http=require('http');

http.createServer(function (request, response){
	console.log('有人请求了：'+request.url);
	
	//request		请求		浏览器->服务器	输入
	//response		响应		服务器->浏览器	输出
	
	response.write('abc');
	response.end();
}).listen(8080);