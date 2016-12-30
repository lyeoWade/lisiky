//版权 北京智能社©, 保留所有权利

var http=require('http');

http.createServer(function (){		//回调函数——有人访问
	console.log('有人请求了');
}).listen(8090);
