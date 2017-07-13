var http=require('http');
var server=http.createServer(function(req,res){

	console.log("有人请求了"+req.url)
	res.write('4444');
	res.end();
}).listen(8088);