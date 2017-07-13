const http=require('http');
const servers=http.createServer(function(req,res){
	console.log("请求中。。。。。");
	switch(req.url){
		case "/1.html":
			res.write('<div style="width: 100px; height: 100px; background: #f00;" onClick="alert(1231)">asdasd</div>');
			res.end();
		break;
		case "/2.html":
			res.write('sdgcdjknclafy');
			res.end();
		break;
		default:
			res.write('404');
			res.end();
		break;
	}
	// res.write("21331"+req.url);
	// res.end();
});
servers.listen(8088);


