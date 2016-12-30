//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');
var mysql=require('mysql');

var db=mysql.createConnection({host: 'localhost', user: 'root', password: '', database: '20131205'});

http.createServer(function (req, res){
	var GET={};
	
	if(req.url.indexOf('?')!=-1)
	{
		var arr=req.url.split('?');
		
		var url=arr[0];
		
		var arr2=arr[1].split('&');
		
		for(var i=0;i<arr2.length;i++)
		{
			var arr3=arr2[i].split('=');
			
			GET[arr3[0]]=arr3[1];
		}
	}
	else
	{
		var url=req.url;
	}
	
	if(url=='/get')
	{
		var n=parseInt(GET.page);
		
		if(isNaN(n) || n<1)
		{
			n=1;
		}
		
		var PAGE_SIZE=10;
		var start=(n-1)*PAGE_SIZE;
		
		db.query('SELECT * FROM images LIMIT '+start+','+PAGE_SIZE, function (err, data){
			if(err)
			{
				res.write('{error: 1, desc: "数据库有错"}');
			}
			else
			{
				res.write('{error: 0, data: '+JSON.stringify(data)+'}');
			}
			
			res.end();
		});
	}
	else
	{
		fs.readFile('www'+url, function (err, data){
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
	}
}).listen(8080);