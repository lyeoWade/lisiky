//版权 北京智能社©, 保留所有权利

var http=require('http');
var common=require('./common.js');

http.createServer(function (req, res){
	console.log(req.url);
	//req.url	->	/a?user=blue&pass=123456
	
	//处理GET数据
	var GET={};
	
	if(req.url.indexOf('?')!=-1)
	{
		var arr=req.url.split('?');
		var url=arr[0];
		
		GET=common.url2json(arr[1]);
	}
	else
	{
		var url=req.url;
	}
	
	console.log('地址：', url, '，数据：', GET);
	
	
	
	res.write('');
	res.end();
}).listen(8080);