//版权 北京智能社©, 保留所有权利

var fs=require('fs');	//File System

//fs.readFile('文件名'[, '编码'], 回调函数);
fs.readFile('server.js', 'utf-8', function (err, data){
	//console.log(err);
	if(err)
	{
		console.log('读取出错');
	}
	else
	{
		console.log(data);
	}
});