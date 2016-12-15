//版权 北京智能社©, 保留所有权利

var http=require('http');
var fs=require('fs');
var mysql=require('mysql');
var common=require('./lib/common.js');

var db=mysql.createConnection({host: 'localhost', user: 'root', password: '', database: '20131127'});

http.createServer(function (req, res){
	var POST={};
	var GET={};
	var url='';
	
	//POST
	var sPost='';
	
	req.addListener('data', function (s){
		sPost+=s;
	});
	req.addListener('end', function (){
		//post数据
		POST=common.url2json(sPost);
		
		//get数据
		if(req.url.indexOf('?')!=-1)
		{
			var arr=req.url.split('?');
			url=arr[0];
			GET=common.url2json(arr[1]);
		}
		else
		{
			url=req.url;
		}
		
		//-----------------------------
		//数据准备好了——正式
		
		function snd(json)
		{
			res.write(GET.cb+'('+JSON.stringify(json)+')');
			res.end();
		}
		
		if(url=='/user')	//接口
		{
			switch(GET.act)
			{
				case 'reg':
					db.query("SELECT * FROM user_table WHERE username='"+GET.user+"'", function (err, data){
						if(err)
						{
							snd({error: 1, desc: "数据库错误"});
						}
						else
						{
							if(data.length)
							{
								snd({error: 1, desc: "此用户名已被注册，可直接登录"});
							}
							else
							{
								db.query("INSERT INTO user_table VALUES('"+GET.user+"', '"+GET.pass+"')", function (err, data){
									if(err)
									{
										snd({error: 1, desc: "数据库错误"});
									}
									else
									{
										snd({error: 0, desc: "注册成功"});
									}
								});
							}
						}
					});
					break;
				case 'login':
					db.query("SELECT * FROM user_table WHERE username='"+GET.user+"'", function (err, data){
						if(err)
						{
							snd({error: 1, desc: "数据库有错"});
						}
						else
						{
							if(data.length==0)
							{
								snd({error: 1, desc: "此用户未注册"});
							}
							else
							{
								if(data[0].password==GET.pass)
								{
									snd({error: 0, desc: "登录成功"});
								}
								else
								{
									snd({error: 1, desc: "用户名或密码有误"});
								}
							}
						}
					});
					break;
				default:
					snd({error: 1, desc: "未知的act"});
			}
		}
		else				//读文件
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
		
		
	});
}).listen(8080);