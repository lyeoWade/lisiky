//版权 北京智能社©, 保留所有权利

var http=require('http');

http.createServer(function (request, response){
	switch(request.url)
	{
		case '/a.html':
			response.write('abccccc22222222');
			response.end();
			break;
		case '/b.html':
			response.write('rtwrt3454');
			response.end();
			break;
		case '/c.html':
			response.write('<html><head><title>试试</title></head><body><div style="width:300px; height:300px; background: red;"></div></body></html>');
			response.end();
			break;
		default:
			response.write('404');
			response.end();
	}
}).listen(8080);