//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');

http.createServer(function (req, res){
	//req.url	->	'/a.html'
	console.log(req.url);
	
	//'www/a.html'
	fs.readFile('www'+req.url, function (err, data){
		if(err)
		{
			res.write('404');
		}
		else
		{
			res.write(data);
		}
		res.end();
	});
}).listen(8080);