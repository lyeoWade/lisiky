//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');

http.createServer(function (req, res){
	//req.url	->	'/a.html'
	
	//'www/a.html'
	fs.readFile('www'+req.url, 'utf-8', function (err, data){
		if(err)
		{
			res.write('404');
		}
		else
		{
			res.write(data);
			console.log('a');
		}
	});
	
	res.end();
	console.log('b');
}).listen(8080);