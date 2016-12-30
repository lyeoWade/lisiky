//版权 北京智能社©, 保留所有权利

var http=require('http');
var common=require('./common.js');

http.createServer(function (req, res){
	var str='';
	var POST={};
	
	//data事件——有post数据到达的时候	发生多次
	req.addListener('data', function (sData){
		str+=sData;
	});
	
	//当所有post数据都到达的时候		一次
	req.addListener('end', function (){
		POST=common.url2json(str);
		console.log(POST);
	});
	
	res.end();
}).listen(8080);