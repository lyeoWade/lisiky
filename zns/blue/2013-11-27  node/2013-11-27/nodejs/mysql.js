//版权 北京智能社©, 保留所有权利

var mysql=require('mysql');

//1.连接、选择
var db=mysql.createConnection({host: 'localhost', user: 'root', password: '', database: '20131127'});

//2.查询、请求
db.query('SELECT * FROM user_table', function (err, data){
	//console.log(err);
	if(err)
	{
		console.log('数据库出错');
	}
	else
	{
		console.log(data);
	}
});