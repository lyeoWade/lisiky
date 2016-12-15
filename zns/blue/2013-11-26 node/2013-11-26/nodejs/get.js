//版权 北京智能社©, 保留所有权利

var http=require('http');

http.createServer(function (req, res){
	console.log(req.url);
	//req.url	->	/a?user=blue&pass=123456
	
	//处理GET数据
	var GET={};
	
	if(req.url.indexOf('?')!=-1)
	{
		var arr=req.url.split('?');
		//arr[0]->地址
		//arr[1]->数据
		
		var url=arr[0];
		var sData=arr[1];
		
		var arr2=sData.split('&');
		//arr2=>['user=blue', 'pass=123456']
		
		for(var i=0;i<arr2.length;i++)
		{
			var arr3=arr2[i].split('=');
			//arr3[0]	->	'user'	名字
			//arr3[1]	->	'blue'	值
			
			GET[arr3[0]]=arr3[1];
		}
	}
	else
	{
		var url=req.url;
	}
	
	console.log('地址：', url, '，数据：', GET);
	
	
	
	res.write('');
	res.end();
}).listen(8080);